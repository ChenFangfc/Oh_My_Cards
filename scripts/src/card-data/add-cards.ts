/**
 * Adds reviewed new products to the catalog.
 *
 * `apply-updates` only edits cards that exist. A new product arrives as a full
 * card object (see card-data/new-cards-*.json); this assigns it a card id and
 * fresh category/benefit ids — ids are global and referenced by stored usage,
 * so they must never be reused — downloads its official card art, and appends
 * it to BUILTIN_CARDS.
 *
 *   pnpm --dir scripts cards:add -- --file=card-data/new-cards-2026-10-31-chase.json --dry-run
 *   pnpm --dir scripts cards:add -- --file=... [--skip-images]
 *
 * Choice rows: a new card's `categoryChoices[].categoryId` cannot point at an
 * id that does not exist yet, so give the choice a `category` label naming its
 * row instead (or leave exactly one row whose label says "pick"/"choice").
 */
import { execFile } from "node:child_process";
import { access, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import {
  CARD_IMAGE_DIR,
  REPO_ROOT,
  nextRulesetVersion,
  readCatalog,
  writeCatalog,
} from "./catalog-io";
import { lintCatalog } from "./lint-catalog";
import type { CardCategoryChoice, CatalogCard } from "./types";

const run = promisify(execFile);
const MAX_IMAGE_WIDTH = 720;

type NewCardChoice = Partial<CardCategoryChoice> & { category?: string };
type NewCard = Omit<CatalogCard, "categoryChoices"> & {
  categoryChoices?: NewCardChoice[];
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[®™]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function commandExists(command: string): Promise<boolean> {
  try {
    await run("/usr/bin/which", [command]);
    return true;
  } catch {
    return false;
  }
}

function extensionFor(contentType: string | null, url: string): string {
  const type = contentType?.split(";")[0].trim().toLowerCase();
  if (type === "image/png") return "png";
  if (type === "image/jpeg") return "jpg";
  if (type === "image/webp") return "webp";
  if (type === "image/avif") return "avif";
  const fromUrl = url.split("?")[0].match(/\.(png|jpe?g|webp|avif)$/i)?.[1];
  return fromUrl ? fromUrl.toLowerCase().replace("jpeg", "jpg") : "png";
}

/**
 * Downloads card art and, when `cwebp` is installed, shrinks it to a WebP no
 * wider than the largest size the app ever displays. Returns the public path.
 */
async function downloadCardImage(
  card: NewCard,
  id: number,
): Promise<string | null> {
  const source = card.imageSourceUrl;
  if (!source) return null;

  const response = await fetch(source, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
      accept: "image/avif,image/webp,image/png,image/jpeg,*/*;q=0.8",
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${source}`);
  const contentType = response.headers.get("content-type");
  if (contentType && !contentType.startsWith("image/")) {
    throw new Error(`${source} returned ${contentType}, not an image`);
  }

  const base = `${id}-${slugify(card.name)}`;
  const raw = path.join(
    CARD_IMAGE_DIR,
    `${base}.${extensionFor(contentType, source)}`,
  );
  await writeFile(raw, Buffer.from(await response.arrayBuffer()));

  if ((await commandExists("cwebp")) && !raw.endsWith(".avif")) {
    const webp = path.join(CARD_IMAGE_DIR, `${base}.webp`);
    const temp = `${webp}.tmp`;
    await run("cwebp", [
      "-quiet",
      "-q",
      "86",
      "-resize",
      String(MAX_IMAGE_WIDTH),
      "0",
      raw,
      "-o",
      temp,
    ]);
    if (raw !== webp) await unlink(raw);
    await rename(temp, webp);
    return `/card-images/${path.basename(webp)}`;
  }
  return `/card-images/${path.basename(raw)}`;
}

function resolveChoiceRow(
  card: CatalogCard,
  choice: NewCardChoice,
): number | null {
  if (choice.category) {
    const row = card.cashbackCategories.find(
      (entry) =>
        entry.category.toLowerCase() === choice.category!.toLowerCase(),
    );
    return row?.id ?? null;
  }
  const existing = card.cashbackCategories.find(
    (entry) => entry.id === choice.categoryId,
  );
  if (existing) return existing.id;
  const bonusRows = card.cashbackCategories.filter((entry) => !entry.isDefault);
  // One bonus row is unambiguous; otherwise look for the row that says so.
  const candidates =
    bonusRows.length === 1
      ? bonusRows
      : bonusRows.filter((entry) =>
          /\b(?:pick(?:ed|s)?|choices?|choose|chosen|select(?:ed)?|top)\b/i.test(entry.category),
        );
  return candidates.length === 1 ? candidates[0].id : null;
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const file = argv
    .find((arg) => arg.startsWith("--file="))
    ?.split("=")
    .slice(1)
    .join("=");
  const dryRun = argv.includes("--dry-run");
  const skipImages = argv.includes("--skip-images");
  if (!file) {
    process.stderr.write(
      "Usage: cards:add -- --file=<new-cards.json> [--dry-run] [--skip-images]\n",
    );
    process.exitCode = 2;
    return;
  }

  let filePath = path.resolve(process.cwd(), file);
  try {
    await access(filePath);
  } catch {
    filePath = path.resolve(REPO_ROOT, file);
  }

  const incoming = JSON.parse(await readFile(filePath, "utf8")) as NewCard[];
  const { cards, rulesetVersion } = await readCatalog();
  let nextCardId = Math.max(...cards.map((card) => card.id)) + 1;
  let nextCategoryId =
    Math.max(
      ...cards.flatMap((card) => card.cashbackCategories.map((row) => row.id)),
    ) + 1;
  let nextBenefitId =
    Math.max(
      ...cards.flatMap((card) => card.benefits.map((benefit) => benefit.id)),
    ) + 1;
  const today = new Date().toISOString().slice(0, 10);
  const added: CatalogCard[] = [];

  for (const proposal of incoming) {
    const duplicate = cards.find(
      (card) =>
        card.name.trim().toLowerCase() === proposal.name.trim().toLowerCase(),
    );
    if (duplicate) {
      process.stderr.write(
        `skip "${proposal.name}": already #${duplicate.id}\n`,
      );
      continue;
    }

    const id = nextCardId++;
    const card: CatalogCard = {
      ...proposal,
      id,
      inWallet: false,
      lastReviewedAt: proposal.lastReviewedAt ?? today,
      cashbackCategories: proposal.cashbackCategories.map((row) => ({
        ...row,
        id: nextCategoryId++,
        cardId: id,
      })),
      benefits: proposal.benefits.map((benefit) => ({
        ...benefit,
        id: nextBenefitId++,
        cardId: id,
      })),
      categoryChoices: undefined,
    };

    if (proposal.categoryChoices?.length) {
      card.categoryChoices = proposal.categoryChoices.map((choice) => {
        const rowId = resolveChoiceRow(card, choice);
        if (rowId == null) {
          throw new Error(
            `"${proposal.name}": cannot tell which row a choice belongs to; add a "category" label`,
          );
        }
        const { category: _label, ...rest } = choice;
        return { ...(rest as CardCategoryChoice), categoryId: rowId };
      });
    } else {
      delete card.categoryChoices;
    }

    if (!dryRun && !skipImages) {
      try {
        card.cardImageUrl =
          (await downloadCardImage(proposal, id)) ?? card.cardImageUrl ?? null;
      } catch (error) {
        process.stderr.write(
          `  ! art for "${proposal.name}" not downloaded: ${(error as Error).message}\n`,
        );
        card.cardImageUrl = null;
      }
    }

    added.push(card);
    process.stderr.write(
      `#${id} ${card.name} — ${card.cashbackCategories.length} rows, ${card.benefits.length} benefits${
        card.cardImageUrl ? `, art ${card.cardImageUrl}` : ""
      }\n`,
    );
  }

  const next = [...cards, ...added];
  const errors = (await lintCatalog(next)).filter(
    (issue) =>
      issue.level === "error" && added.some((card) => card.id === issue.cardId),
  );
  for (const issue of errors) {
    process.stderr.write(
      `  ERROR #${issue.cardId} ${issue.cardName}: ${issue.detail}\n`,
    );
  }
  if (errors.length && !dryRun) {
    throw new Error("New cards failed lint; nothing written.");
  }

  const version = nextRulesetVersion(rulesetVersion);
  process.stderr.write(
    `\n${added.length} card(s) ${dryRun ? "would be " : ""}added; ruleset ${rulesetVersion} -> ${version}\n`,
  );
  if (!dryRun && added.length)
    await writeCatalog(next, { rulesetVersion: version });
}

await main();
