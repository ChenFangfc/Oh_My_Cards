import type { ExtractedFacts } from "./types";

/**
 * Issuer pages embed session ids, CSRF tokens, A/B buckets and timestamps that
 * change on every request. Hashing the raw body would report a change every
 * run, so everything below strips markup and volatile tokens before hashing.
 */
export function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function stableText(text: string): string {
  return text
    .toLowerCase()
    // Dates, times, session ids and long digit runs churn independently of terms.
    .replace(/\b\d{4}-\d{2}-\d{2}\b/g, "<date>")
    .replace(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, "<date>")
    .replace(/\b\d{1,2}:\d{2}(:\d{2})?\b/g, "<time>")
    .replace(/\b[0-9a-f]{16,}\b/g, "<hex>")
    .replace(/\b\d{9,}\b/g, "<num>")
    .replace(/\s+/g, " ")
    .trim();
}

const DISCONTINUED_PHRASES = [
  "no longer accepting applications",
  "no longer available to new applicants",
  "not currently accepting applications",
  "this card is no longer available",
  "this product is no longer offered",
  "we are no longer offering",
  "closed to new applicants",
  "product has been discontinued",
];

const BLOCKED_PHRASES = [
  "access denied",
  "request blocked",
  "enable javascript",
  "please enable cookies",
  "are you a robot",
  "unusual traffic",
  "reference #",
];

function parseAmount(raw: string): number {
  return Number(raw.replace(/,/g, ""));
}

const CURRENCY = String.raw`(?:\$|hk\$|s\$|us\$|sgd|hkd|cad|usd)`;
const AMOUNT = String.raw`([\d,]+(?:\.\d{1,2})?)`;

/** "annual fee: $95", "annual fee of $95", "annual fee $95" */
const FEE_FORWARD = new RegExp(
  String.raw`annual fee\s*(?:of|is|:|=|–|-)?\s*${CURRENCY}\s?${AMOUNT}`,
  "g",
);
/** "$95 annual fee", "$95 per year annual fee" */
const FEE_REVERSE = new RegExp(
  String.raw`${CURRENCY}\s?${AMOUNT}\s*(?:per year|a year|/year|yearly)?\s*annual fee`,
  "g",
);

/**
 * "$0 intro annual fee for the first year, then $150" is on most co-brand
 * pages. Without this guard the promotional $0 reads as the real fee, which
 * was the single largest source of false positives when this was measured
 * against all 182 live pages.
 */
const PROMOTIONAL = /\b(intro|introductory|first year|first-year|1st year|waived)\b/;

function extractAnnualFees(lower: string): number[] {
  const values: number[] = [];

  for (const pattern of [FEE_FORWARD, FEE_REVERSE]) {
    pattern.lastIndex = 0;
    for (const match of lower.matchAll(pattern)) {
      const index = match.index ?? 0;
      const before = lower.slice(Math.max(0, index - 45), index);
      const after = lower.slice(index + match[0].length, index + match[0].length + 45);
      if (PROMOTIONAL.test(before) || PROMOTIONAL.test(after)) continue;

      const value = parseAmount(match[1]!);
      if (Number.isFinite(value) && value >= 0 && value <= 20_000) {
        values.push(value);
      }
    }
  }

  return values;
}

export function extractFacts(text: string): ExtractedFacts {
  const lower = text.toLowerCase();

  const feeMatches = extractAnnualFees(lower);

  // A bare "no annual fee" is deliberately NOT treated as $0. Measured across
  // all 182 source pages, 61 of them contain that phrase in a comparison rail
  // about a *different* card — including the $895 Amex Platinum page.

  const rateCandidates = [
    ...lower.matchAll(
      /\b(\d+(?:\.\d+)?)\s?(?:x|%)\s+(?:points?|miles?|cash ?back|back)\b/g,
    ),
  ]
    .map((match) => match[0].trim())
    .slice(0, 40);

  const creditCandidates = [
    ...lower.matchAll(/(?:\$|hk\$|s\$)\s?([\d,]+)[^.$]{0,40}?(?:statement )?credit/g),
  ]
    .map((match) => parseAmount(match[1]!))
    .filter((value) => Number.isFinite(value) && value > 0 && value <= 5_000);

  return {
    annualFeeCandidates: [...new Set(feeMatches)]
      .filter((value) => Number.isFinite(value) && value >= 0 && value <= 20_000)
      .sort((left, right) => left - right),
    rateCandidates: [...new Set(rateCandidates)],
    creditCandidates: [...new Set(creditCandidates)].sort((l, r) => l - r),
    looksDiscontinued: DISCONTINUED_PHRASES.some((phrase) =>
      lower.includes(phrase),
    ),
    // A real product page is long; a short page full of bot-wall language is not.
    looksBlocked:
      text.length < 1_200 &&
      BLOCKED_PHRASES.some((phrase) => lower.includes(phrase)),
  };
}

/** Terms whose appearance/disappearance between crawls is worth a human look. */
const WATCH_TERMS = [
  "annual fee",
  "statement credit",
  "points",
  "miles",
  "cash back",
  "bonus",
  "no longer",
  "discontinued",
  "welcome offer",
  "lounge",
  "global entry",
  "tsa precheck",
  "foreign transaction",
  "authorized user",
  "priority pass",
];

/**
 * Reduces a page to the handful of numbers a diff actually needs.
 *
 * Storing full page text would mean committing ~4 MB of prose to git on every
 * biweekly run. These counts are a few hundred bytes per card, carry the same
 * signal, and make each snapshot self-sufficient.
 */
export function countWatchTerms(text: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const term of WATCH_TERMS) {
    counts[term] = countOccurrences(text, term);
  }
  return counts;
}

/**
 * A raw hash diff says "something moved". This says *what* moved, which is the
 * difference between a report a human will read and one they will mute.
 */
export function diffTermCounts(
  before: Record<string, number>,
  after: Record<string, number>,
): string[] {
  const changed: string[] = [];

  for (const term of WATCH_TERMS) {
    const beforeCount = before[term] ?? 0;
    const afterCount = after[term] ?? 0;
    if (beforeCount !== afterCount) {
      changed.push(`${term} (${beforeCount} -> ${afterCount})`);
    }
  }

  return changed;
}

function countOccurrences(haystack: string, needle: string): number {
  let count = 0;
  let index = haystack.indexOf(needle);
  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }
  return count;
}
