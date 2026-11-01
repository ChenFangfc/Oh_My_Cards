/**
 * Applies a reviewed set of catalog corrections.
 *
 * The freshness checker produces a review queue; a human or agent turns that
 * queue into an explicit patch file, and this script applies it. Keeping the
 * patch separate from the crawler is the whole point: nothing reaches
 * `catalog.ts` without someone naming the exact change and its source.
 *
 * Patch format (JSON):
 * {
 *   "rulesetVersion": "2026.08.06.1",          // optional, else auto-derived
 *   "patches": [
 *     {
 *       "cardId": 1,
 *       "reviewedAt": "2026-08-06",             // optional, defaults to today
 *       "source": "https://media.chase.com/...",// recorded as sourceUrl when given
 *       "set": { "annualFee": 95 },             // shallow field assignment
 *       "categories": {
 *         "upsert": [{ "category": "Gas and EV Charging", "rate": 0.03 }],
 *         "remove": ["Old Category Name"],
 *         "rename": [{ "from": "X", "to": "Y" }]
 *       },
 *       "benefits": {
 *         "rename": [{ "from": "Old Credit Name", "to": "New Credit Name" }],  // keeps id + usage
 *         "upsert": [{ "name": "Annual Hotel Credit", "description": "...", "annualValue": 100,
 *                      "period": "cardmember-year" }],   // period: see CardBenefitPeriod
 *         "remove": ["10% Anniversary Points Boost"]
 *       }
 *     }
 *   ]
 * }
 *
 *   pnpm --dir scripts cards:apply -- --patch=path/to/patch.json
 *   pnpm --dir scripts cards:apply -- --patch=... --dry-run
 */
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import {
  REPO_ROOT,
  nextRulesetVersion,
  readCatalog,
  writeCatalog,
} from "./catalog-io";
import type {
  CardBenefit,
  CardBenefitPeriod,
  CashbackCategory,
  CatalogCard,
} from "./types";

interface CategoryPatch {
  category: string;
  rate?: number;
  isDefault?: boolean;
}

interface BenefitPatch {
  name: string;
  description?: string;
  annualValue?: number | null;
  /** Renewal cadence; omit to leave an existing benefit's period unchanged. */
  period?: CardBenefitPeriod;
  periodYears?: number;
}

const BENEFIT_PERIODS: readonly CardBenefitPeriod[] = [
  "monthly",
  "quarterly",
  "semiannual",
  "calendar-year",
  "cardmember-year",
  "multi-year",
  "one-time",
];

/**
 * Declares how a bonus row that names no fixed kind of spend gets filled in.
 * Keyed by the category's label rather than its id so a patch stays readable
 * and survives the row being renumbered.
 */
interface ChoicePatch {
  category: string;
  mode: "user-selected" | "automatic-top-spend" | "rotating-calendar";
  picks: number;
  resets: "month" | "quarter" | "year" | "anniversary" | "never" | "unknown";
  options: string[];
}

interface CardPatch {
  cardId: number;
  reviewedAt?: string;
  keepReviewDate?: boolean;
  source?: string;
  confidence?: "official" | "needs-review";
  set?: Partial<CatalogCard>;
  categories?: {
    upsert?: CategoryPatch[];
    remove?: string[];
    rename?: Array<{ from: string; to: string }>;
  };
  benefits?: {
    upsert?: BenefitPatch[];
    remove?: string[];
    /**
     * Renames keep the benefit's id, so usage people already logged against it
     * stays attached. Remove-and-add would orphan that history.
     */
    rename?: Array<{ from: string; to: string }>;
  };
  choices?: ChoicePatch[];
}

interface PatchFile {
  rulesetVersion?: string;
  /**
   * For maintenance patches (value clean-ups, relabels) that change data
   * without anyone re-checking the issuer's terms. Bumping lastReviewedAt for
   * those would hide genuinely stale cards from the freshness report.
   */
  keepReviewDate?: boolean;
  patches: CardPatch[];
}

/**
 * Category and benefit ids are globally unique across the catalog and are
 * referenced by stored benefit-usage rows, so new rows must never reuse one.
 */
function makeIdAllocator(cards: CatalogCard[]): {
  nextCategoryId: () => number;
  nextBenefitId: () => number;
} {
  let maxCategory = 0;
  let maxBenefit = 0;

  for (const card of cards) {
    for (const category of card.cashbackCategories) {
      maxCategory = Math.max(maxCategory, category.id);
    }
    for (const benefit of card.benefits) {
      maxBenefit = Math.max(maxBenefit, benefit.id);
    }
  }

  return {
    nextCategoryId: () => (maxCategory += 1),
    nextBenefitId: () => (maxBenefit += 1),
  };
}

function sameLabel(left: string, right: string): boolean {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

function applyCardPatch(
  card: CatalogCard,
  patch: CardPatch,
  allocate: ReturnType<typeof makeIdAllocator>,
  today: string,
  log: (message: string) => void,
): void {
  if (patch.set) {
    const fields = card as unknown as Record<string, unknown>;
    for (const [key, value] of Object.entries(patch.set)) {
      const previous = fields[key];
      if (JSON.stringify(previous) === JSON.stringify(value)) continue;
      fields[key] = value;
      log(`  ${key}: ${JSON.stringify(previous)} -> ${JSON.stringify(value)}`);
    }
  }

  for (const rename of patch.categories?.rename ?? []) {
    const target = card.cashbackCategories.find((entry) =>
      sameLabel(entry.category, rename.from),
    );
    if (!target) {
      log(`  ! category rename skipped, "${rename.from}" not found`);
      continue;
    }
    log(`  category renamed: "${target.category}" -> "${rename.to}"`);
    target.category = rename.to;
  }

  for (const remove of patch.categories?.remove ?? []) {
    const before = card.cashbackCategories.length;
    card.cashbackCategories = card.cashbackCategories.filter(
      (entry) => !sameLabel(entry.category, remove),
    );
    log(
      before === card.cashbackCategories.length
        ? `  ! category remove skipped, "${remove}" not found`
        : `  category removed: "${remove}"`,
    );
  }

  for (const upsert of patch.categories?.upsert ?? []) {
    const existing = card.cashbackCategories.find((entry) =>
      sameLabel(entry.category, upsert.category),
    );

    if (existing) {
      if (upsert.rate !== undefined && existing.rate !== upsert.rate) {
        log(`  category "${existing.category}": ${existing.rate} -> ${upsert.rate}`);
        existing.rate = upsert.rate;
      }
      if (upsert.isDefault !== undefined) existing.isDefault = upsert.isDefault;
      continue;
    }

    const added: CashbackCategory = {
      id: allocate.nextCategoryId(),
      cardId: card.id,
      category: upsert.category,
      rate: upsert.rate ?? 0,
      isDefault: upsert.isDefault ?? false,
    };
    card.cashbackCategories.push(added);
    log(`  category added: "${added.category}" @ ${added.rate}`);
  }

  for (const rename of patch.benefits?.rename ?? []) {
    const target = card.benefits.find((entry) => sameLabel(entry.name, rename.from));
    if (!target) {
      log(`  ! benefit rename skipped, "${rename.from}" not found`);
      continue;
    }
    log(`  benefit renamed: "${target.name}" -> "${rename.to}"`);
    target.name = rename.to;
  }

  for (const remove of patch.benefits?.remove ?? []) {
    const before = card.benefits.length;
    card.benefits = card.benefits.filter((entry) => !sameLabel(entry.name, remove));
    log(
      before === card.benefits.length
        ? `  ! benefit remove skipped, "${remove}" not found`
        : `  benefit removed: "${remove}"`,
    );
  }

  for (const upsert of patch.benefits?.upsert ?? []) {
    if (upsert.period !== undefined && !BENEFIT_PERIODS.includes(upsert.period)) {
      log(`  ! benefit "${upsert.name}" skipped, unknown period "${upsert.period}"`);
      continue;
    }

    const existing = card.benefits.find((entry) => sameLabel(entry.name, upsert.name));

    if (existing) {
      if (upsert.period !== undefined && existing.period !== upsert.period) {
        log(`  benefit "${existing.name}": period ${existing.period ?? "(default)"} -> ${upsert.period}`);
        existing.period = upsert.period;
      }
      if (upsert.periodYears !== undefined && existing.periodYears !== upsert.periodYears) {
        existing.periodYears = upsert.periodYears;
      }
      if (upsert.description !== undefined && existing.description !== upsert.description) {
        existing.description = upsert.description;
        log(`  benefit "${existing.name}": description updated`);
      }
      if (upsert.annualValue !== undefined && existing.annualValue !== upsert.annualValue) {
        log(
          `  benefit "${existing.name}": ${existing.annualValue} -> ${upsert.annualValue}`,
        );
        existing.annualValue = upsert.annualValue;
      }
      continue;
    }

    const added: CardBenefit = {
      id: allocate.nextBenefitId(),
      cardId: card.id,
      name: upsert.name,
      description: upsert.description ?? "",
      annualValue: upsert.annualValue ?? null,
      ...(upsert.period ? { period: upsert.period } : {}),
      ...(upsert.periodYears ? { periodYears: upsert.periodYears } : {}),
    };
    card.benefits.push(added);
    log(`  benefit added: "${added.name}" ($${added.annualValue ?? 0})`);
  }

  for (const choicePatch of patch.choices ?? []) {
    const row = card.cashbackCategories.find((entry) =>
      sameLabel(entry.category, choicePatch.category),
    );
    if (!row) {
      log(`  ! choice skipped, category "${choicePatch.category}" not found`);
      continue;
    }

    const choice = {
      categoryId: row.id,
      mode: choicePatch.mode,
      picks: choicePatch.picks,
      resets: choicePatch.resets,
      options: choicePatch.options,
    };

    card.categoryChoices = [
      ...(card.categoryChoices ?? []).filter(
        (entry) => entry.categoryId !== row.id,
      ),
      choice,
    ].sort((a, b) => a.categoryId - b.categoryId);

    log(
      `  choice set: "${row.category}" ${choice.mode}, pick ${choice.picks} of ${choice.options.length}`,
    );
  }

  if (patch.source) card.sourceUrl = patch.source;
  if (patch.confidence) card.dataConfidence = patch.confidence;
  if (!patch.keepReviewDate) card.lastReviewedAt = patch.reviewedAt ?? today;
}

async function resolveExisting(candidate: string): Promise<string | null> {
  for (const option of [
    path.resolve(process.cwd(), candidate),
    path.resolve(REPO_ROOT, candidate),
  ]) {
    try {
      await access(option);
      return option;
    } catch {
      // Try the next base.
    }
  }
  return null;
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const patchPath = argv
    .find((arg) => arg.startsWith("--patch="))
    ?.split("=")
    .slice(1)
    .join("=");
  const dryRun = argv.includes("--dry-run");

  if (!patchPath) {
    process.stderr.write("Usage: cards:apply -- --patch=<file.json> [--dry-run]\n");
    process.exitCode = 2;
    return;
  }

  // pnpm runs this with cwd=scripts/, so a repo-relative path like
  // `.omx/card-data/patch.json` has to fall back to the repo root.
  const resolvedPatchPath = await resolveExisting(patchPath);
  if (!resolvedPatchPath) {
    process.stderr.write(`Patch file not found: ${patchPath}\n`);
    process.exitCode = 2;
    return;
  }

  const patchFile = JSON.parse(
    await readFile(resolvedPatchPath, "utf8"),
  ) as PatchFile;
  const { cards, rulesetVersion } = await readCatalog();
  const byId = new Map(cards.map((card) => [card.id, card]));
  const allocate = makeIdAllocator(cards);
  const today = new Date().toISOString().slice(0, 10);

  let applied = 0;
  const lines: string[] = [];

  for (const patch of patchFile.patches) {
    const card = byId.get(patch.cardId);
    if (!card) {
      lines.push(`#${patch.cardId} NOT FOUND — skipped`);
      continue;
    }

    lines.push(`#${card.id} ${card.name}`);
    applyCardPatch(
      card,
      { ...patch, keepReviewDate: patch.keepReviewDate ?? patchFile.keepReviewDate },
      allocate,
      today,
      (message) => lines.push(message),
    );
    applied += 1;
  }

  const nextVersion =
    patchFile.rulesetVersion ?? nextRulesetVersion(rulesetVersion);

  lines.push("", `ruleset ${rulesetVersion} -> ${nextVersion}`);
  lines.push(`${applied} cards patched${dryRun ? " (dry run, nothing written)" : ""}`);
  process.stderr.write(`${lines.join("\n")}\n`);

  if (!dryRun) await writeCatalog(cards, { rulesetVersion: nextVersion });
}

await main();
