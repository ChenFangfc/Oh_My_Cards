/**
 * Structural checks on the catalog, run before any ruleset is published.
 *
 * Installed apps replace their whole rulebook with whatever the feed serves,
 * so a duplicated id, a choice row pointing at nothing, or a cap the engine
 * cannot parse goes straight into every wallet. Errors here fail CI; warnings
 * are review prompts that also feed the freshness report.
 *
 *   pnpm --dir scripts cards:lint
 */
import { access } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { CARD_IMAGE_DIR, readCatalog } from "./catalog-io";
import type { CardBenefitPeriod, CatalogCard } from "./types";

export type LintLevel = "error" | "warning";

export interface LintIssue {
  level: LintLevel;
  code:
    | "DUPLICATE_ID"
    | "DEFAULT_CATEGORY"
    | "RATE_OUT_OF_RANGE"
    | "BAD_CHOICE"
    | "BAD_BENEFIT_PERIOD"
    | "BAD_AVAILABILITY"
    | "BAD_FIELD"
    | "MISSING_IMAGE"
    | "STALE_CALENDAR"
    | "MISSING_BENEFIT_PERIOD"
    | "UNPARSED_CAP";
  cardId: number;
  cardName: string;
  detail: string;
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
const CHOICE_MODES = [
  "user-selected",
  "automatic-top-spend",
  "rotating-calendar",
];
const CHOICE_RESETS = [
  "month",
  "quarter",
  "year",
  "anniversary",
  "never",
  "unknown",
];
const AVAILABILITY = ["open", "closed-to-new-applicants", "discontinued"];
const MARKET_CURRENCY: Record<string, string> = {
  US: "USD",
  Canada: "CAD",
  "Hong Kong": "HKD",
  Singapore: "SGD",
};

/** Same pattern the engine's parseSpendCap uses; a cap it cannot read is not enforced. */
const ENGINE_CAP =
  /(?:up to|first)\s+\$([0-9,]+)\s*(?:\/|\s+per\s+)?(month|monthly|quarter|quarterly|yr|year|annual|annually)/i;
const CAP_LIKE = /(?:up to|first)\s+(?:[A-Z]{1,3})?\$\s*[0-9]/i;

/** Wording that says a credit renews more often than once a year. */
const SUB_ANNUAL_CADENCE =
  /\b(?:monthly|per month|each month|every month|a month|quarterly|per quarter|each quarter|semi-?annual(?:ly)?|twice a year|every six months|jan(?:uary)?\s*[-–]\s*jun(?:e)?)\b/i;

function currentQuarterLabel(today: Date): string {
  return `Q${Math.floor(today.getMonth() / 3) + 1} ${today.getFullYear()}`;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function lintCatalog(
  cards: CatalogCard[],
  today = new Date(),
): Promise<LintIssue[]> {
  const issues: LintIssue[] = [];
  const push = (
    level: LintLevel,
    code: LintIssue["code"],
    card: CatalogCard,
    detail: string,
  ) =>
    issues.push({ level, code, cardId: card.id, cardName: card.name, detail });

  const seenCards = new Map<number, string>();
  const seenCategories = new Map<number, string>();
  const seenBenefits = new Map<number, string>();

  for (const card of cards) {
    if (seenCards.has(card.id)) {
      push(
        "error",
        "DUPLICATE_ID",
        card,
        `card id ${card.id} also used by ${seenCards.get(card.id)}`,
      );
    }
    seenCards.set(card.id, card.name);

    if (!card.name?.trim() || !card.issuer?.trim() || !card.network?.trim()) {
      push("error", "BAD_FIELD", card, "name, issuer and network are required");
    }
    if (!(card.annualFee >= 0)) {
      push(
        "error",
        "BAD_FIELD",
        card,
        `annualFee ${card.annualFee} is not a non-negative number`,
      );
    }
    if (card.sourceUrl && !/^https:\/\//.test(card.sourceUrl)) {
      push(
        "warning",
        "BAD_FIELD",
        card,
        `sourceUrl is not https: ${card.sourceUrl}`,
      );
    }
    if (card.lastReviewedAt) {
      const reviewed = new Date(card.lastReviewedAt);
      if (
        Number.isNaN(reviewed.getTime()) ||
        reviewed.getTime() > today.getTime() + 86_400_000
      ) {
        push(
          "error",
          "BAD_FIELD",
          card,
          `lastReviewedAt "${card.lastReviewedAt}" is invalid or in the future`,
        );
      }
    }
    const expectedCurrency = MARKET_CURRENCY[card.market ?? "US"];
    if (
      card.currency &&
      expectedCurrency &&
      card.currency !== expectedCurrency
    ) {
      push(
        "warning",
        "BAD_FIELD",
        card,
        `${card.market} card priced in ${card.currency}`,
      );
    }
    if (card.availability && !AVAILABILITY.includes(card.availability)) {
      push(
        "error",
        "BAD_AVAILABILITY",
        card,
        `unknown availability "${card.availability}"`,
      );
    }
    if (
      card.availability &&
      card.availability !== "open" &&
      !card.availabilityChangedAt
    ) {
      push(
        "warning",
        "BAD_AVAILABILITY",
        card,
        "closed product has no availabilityChangedAt",
      );
    }

    // ---- earning rows
    const defaults = card.cashbackCategories.filter((row) => row.isDefault);
    if (defaults.length !== 1) {
      push(
        "error",
        "DEFAULT_CATEGORY",
        card,
        `${defaults.length} default (base-rate) rows; exactly one is required`,
      );
    }
    for (const row of card.cashbackCategories) {
      if (seenCategories.has(row.id)) {
        push(
          "error",
          "DUPLICATE_ID",
          card,
          `category id ${row.id} also used on ${seenCategories.get(row.id)}`,
        );
      }
      seenCategories.set(row.id, card.name);
      if (row.cardId !== card.id) {
        push(
          "error",
          "BAD_FIELD",
          card,
          `category ${row.id} belongs to card ${row.cardId}`,
        );
      }
      if (!(row.rate >= 0 && row.rate <= 0.3)) {
        push(
          "error",
          "RATE_OUT_OF_RANGE",
          card,
          `"${row.category}" rate ${row.rate} is outside 0–0.3`,
        );
      }
      if (CAP_LIKE.test(row.category) && !ENGINE_CAP.test(row.category)) {
        push(
          "warning",
          "UNPARSED_CAP",
          card,
          `"${row.category}" reads like a spend cap the engine cannot parse; write it as "(up to $N/month|quarter|year)"`,
        );
      }
    }

    // ---- choice rows
    for (const choice of card.categoryChoices ?? []) {
      const row = card.cashbackCategories.find(
        (entry) => entry.id === choice.categoryId,
      );
      if (!row) {
        push(
          "error",
          "BAD_CHOICE",
          card,
          `choice points at missing category ${choice.categoryId}`,
        );
        continue;
      }
      if (!CHOICE_MODES.includes(choice.mode)) {
        push(
          "error",
          "BAD_CHOICE",
          card,
          `unknown choice mode "${choice.mode}"`,
        );
      }
      if (!CHOICE_RESETS.includes(choice.resets)) {
        push(
          "error",
          "BAD_CHOICE",
          card,
          `unknown choice reset "${choice.resets}"`,
        );
      }
      if (!(choice.picks >= 1) || !choice.options.length) {
        push(
          "error",
          "BAD_CHOICE",
          card,
          `"${row.category}" needs picks >= 1 and at least one option`,
        );
      }
      if (choice.mode === "rotating-calendar") {
        const quarter = currentQuarterLabel(today);
        const current = choice.options.find((option) =>
          option.startsWith(quarter),
        );
        if (!current) {
          push(
            "warning",
            "STALE_CALENDAR",
            card,
            `rotating calendar has no ${quarter} entry; cardholders cannot pick this quarter`,
          );
        } else if (
          /not (?:yet )?announced|tbd|to be announced/i.test(current)
        ) {
          push(
            "warning",
            "STALE_CALENDAR",
            card,
            `${quarter} still says "${current}"`,
          );
        }
      }
    }

    // ---- benefits
    for (const benefit of card.benefits) {
      if (seenBenefits.has(benefit.id)) {
        push(
          "error",
          "DUPLICATE_ID",
          card,
          `benefit id ${benefit.id} also used on ${seenBenefits.get(benefit.id)}`,
        );
      }
      seenBenefits.set(benefit.id, card.name);
      if (benefit.cardId !== card.id) {
        push(
          "error",
          "BAD_FIELD",
          card,
          `benefit ${benefit.id} belongs to card ${benefit.cardId}`,
        );
      }
      if (benefit.annualValue != null && !(benefit.annualValue >= 0)) {
        push(
          "error",
          "BAD_FIELD",
          card,
          `"${benefit.name}" has a negative or invalid value`,
        );
      }
      if (benefit.period && !BENEFIT_PERIODS.includes(benefit.period)) {
        push(
          "error",
          "BAD_BENEFIT_PERIOD",
          card,
          `"${benefit.name}" has unknown period "${benefit.period}"`,
        );
      }
      if (
        benefit.period === "multi-year" &&
        !(Number(benefit.periodYears) > 0)
      ) {
        push(
          "warning",
          "BAD_BENEFIT_PERIOD",
          card,
          `"${benefit.name}" is multi-year without periodYears (4 assumed)`,
        );
      }
      const benefitText = `${benefit.name} ${benefit.description}`;
      if (
        !benefit.period &&
        (benefit.annualValue ?? 0) > 0 &&
        SUB_ANNUAL_CADENCE.test(benefitText) &&
        /credit|\$\d/i.test(benefitText) &&
        // Insurance perks mention "your monthly phone bill"; they renew nothing.
        !/protection|insurance|coverage|warranty/i.test(benefitText)
      ) {
        push(
          "warning",
          "MISSING_BENEFIT_PERIOD",
          card,
          `"${benefit.name}" sounds monthly/quarterly/semi-annual but has no period, so it is tracked once a year`,
        );
      }
    }

    // ---- artwork
    if (card.cardImageUrl?.startsWith("/card-images/")) {
      const file = path.join(
        CARD_IMAGE_DIR,
        card.cardImageUrl.slice("/card-images/".length),
      );
      if (!(await fileExists(file))) {
        push(
          "error",
          "MISSING_IMAGE",
          card,
          `cardImageUrl ${card.cardImageUrl} has no file`,
        );
      }
    }
  }

  return issues;
}

async function main(): Promise<void> {
  const { cards } = await readCatalog();
  const issues = await lintCatalog(cards);
  const errors = issues.filter((issue) => issue.level === "error");
  const warnings = issues.filter((issue) => issue.level === "warning");

  for (const issue of [...errors, ...warnings]) {
    process.stdout.write(
      `${issue.level === "error" ? "ERROR  " : "warning"} #${issue.cardId} ${issue.cardName} [${issue.code}] ${issue.detail}\n`,
    );
  }
  process.stdout.write(
    `\n${cards.length} cards · ${errors.length} error(s) · ${warnings.length} warning(s)\n`,
  );
  if (errors.length) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  await main();
}
