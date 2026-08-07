/**
 * Card-data freshness checker.
 *
 * Crawls every card's official `sourceUrl`, compares what it finds against both
 * the catalog and the previous crawl, and writes a report plus a new snapshot.
 *
 * It deliberately does NOT edit `catalog.ts`. Issuer pages are noisy enough
 * (regional offers, A/B tests, marketing copy that mentions other cards' fees)
 * that auto-applying extracted numbers would corrupt reward math. The job of
 * this script is to make a human or an agent look at the right ~15 cards
 * instead of all 182.
 *
 *   pnpm --dir scripts cards:check
 *   pnpm --dir scripts cards:check -- --only=1,2,8 --stale-days=90
 */
import { mkdir, writeFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import path from "node:path";
import {
  CARD_IMAGE_DIR,
  STATE_DIR,
  readCatalog,
  readJsonIfExists,
} from "./catalog-io";
import { fetchPage, mapWithConcurrency, sha256 } from "./fetcher";
import {
  countWatchTerms,
  diffTermCounts,
  extractFacts,
  htmlToText,
  stableText,
} from "./extract";
import type {
  CardSnapshot,
  CatalogCard,
  Finding,
  FreshnessReport,
} from "./types";
import { renderMarkdownReport } from "./report";

const SNAPSHOT_PATH = path.join(STATE_DIR, "snapshots.json");
const REPORT_JSON_PATH = path.join(STATE_DIR, "freshness-report.json");
const REPORT_MD_PATH = path.join(STATE_DIR, "freshness-report.md");

const DEFAULT_STALE_DAYS = 90;
const DEFAULT_CONCURRENCY = 6;

interface Options {
  only: Set<number> | null;
  staleDays: number;
  concurrency: number;
  skipCrawl: boolean;
}

function parseOptions(argv: string[]): Options {
  const get = (name: string): string | undefined =>
    argv.find((arg) => arg.startsWith(`--${name}=`))?.split("=").slice(1).join("=");

  const only = get("only");

  return {
    only: only
      ? new Set(
          only
            .split(",")
            .map((value) => Number(value.trim()))
            .filter(Number.isFinite),
        )
      : null,
    staleDays: Number(get("stale-days") ?? DEFAULT_STALE_DAYS),
    concurrency: Number(get("concurrency") ?? DEFAULT_CONCURRENCY),
    skipCrawl: argv.includes("--skip-crawl"),
  };
}

function daysBetween(from: string, to: Date): number {
  const parsed = Date.parse(from);
  if (Number.isNaN(parsed)) return Number.POSITIVE_INFINITY;
  return Math.floor((to.getTime() - parsed) / 86_400_000);
}

/**
 * A page mentioning several fees (comparison tables, "other cards you may
 * like") is normal. Only complain when NONE of the candidates matches.
 */
function feeMismatch(card: CatalogCard, candidates: number[]): boolean {
  if (!candidates.length) return false;
  return !candidates.some(
    (candidate) => Math.abs(candidate - card.annualFee) < 0.01,
  );
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function checkCardImage(card: CatalogCard): Promise<Finding | null> {
  if (!card.cardImageUrl) {
    return {
      kind: "MISSING_CARD_IMAGE",
      severity: "low",
      cardId: card.id,
      cardName: card.name,
      issuer: card.issuer,
      detail: "Card has no cardImageUrl.",
    };
  }

  const relative = card.cardImageUrl.replace(/^\/card-images\//, "");
  if (relative === card.cardImageUrl) return null; // Remote URL, not a local file.

  const exists = await fileExists(path.join(CARD_IMAGE_DIR, relative));
  if (exists) return null;

  return {
    kind: "MISSING_CARD_IMAGE",
    severity: "medium",
    cardId: card.id,
    cardName: card.name,
    issuer: card.issuer,
    detail: `cardImageUrl points at ${card.cardImageUrl} but public/card-images/${relative} does not exist.`,
  };
}

async function main(): Promise<void> {
  const options = parseOptions(process.argv.slice(2));
  const now = new Date();

  const { cards, rulesetVersion } = await readCatalog();
  const targets = options.only
    ? cards.filter((card) => options.only!.has(card.id))
    : cards;

  await mkdir(STATE_DIR, { recursive: true });

  const previousSnapshots =
    (await readJsonIfExists<Record<string, CardSnapshot>>(SNAPSHOT_PATH)) ?? {};
  const findings: Finding[] = [];
  const snapshots: Record<string, CardSnapshot> = { ...previousSnapshots };

  // ---- Static checks that never need the network -------------------------

  for (const card of targets) {
    if (!card.sourceUrl) {
      findings.push({
        kind: "MISSING_SOURCE_URL",
        severity: "high",
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        detail: "Card has no sourceUrl, so its terms can never be re-verified.",
      });
    }

    const age = card.lastReviewedAt
      ? daysBetween(card.lastReviewedAt, now)
      : Number.POSITIVE_INFINITY;

    if (age > options.staleDays) {
      findings.push({
        kind: "STALE_REVIEW",
        severity: age > options.staleDays * 2 ? "medium" : "low",
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        detail: `Last reviewed ${card.lastReviewedAt ?? "never"} (${
          Number.isFinite(age) ? `${age} days ago` : "unknown"
        }); review budget is ${options.staleDays} days.`,
      });
    }

    if (card.dataConfidence === "needs-review") {
      findings.push({
        kind: "LOW_CONFIDENCE",
        severity: "medium",
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        detail:
          'dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.',
      });
    }

    const imageFinding = await checkCardImage(card);
    if (imageFinding) findings.push(imageFinding);
  }

  // ---- Crawl -------------------------------------------------------------

  let reachable = 0;
  const crawlable = options.skipCrawl
    ? []
    : targets.filter((card): card is CatalogCard & { sourceUrl: string } =>
        Boolean(card.sourceUrl),
      );

  if (crawlable.length) {
    process.stderr.write(
      `Crawling ${crawlable.length} source pages at concurrency ${options.concurrency}...\n`,
    );
  }

  await mapWithConcurrency(crawlable, options.concurrency, async (card) => {
    const result = await fetchPage(card.sourceUrl);
    const key = String(card.id);
    const previous = previousSnapshots[key];

    const snapshot: CardSnapshot = {
      cardId: card.id,
      cardName: card.name,
      url: card.sourceUrl,
      checkedAt: now.toISOString(),
      status: result.status,
      error: result.error,
      finalUrl: result.finalUrl,
      etag: result.etag,
      lastModified: result.lastModified,
    };

    if (result.status === "ERR") {
      findings.push({
        kind: "PAGE_GONE",
        severity: "medium",
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        url: card.sourceUrl,
        detail: `Request failed after retries: ${result.error}`,
      });
      snapshots[key] = snapshot;
      return;
    }

    if (result.status === 404 || result.status === 410) {
      findings.push({
        kind: "PAGE_GONE",
        severity: "high",
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        url: card.sourceUrl,
        detail: `Source page returns HTTP ${result.status}. The product was probably renamed or retired.`,
      });
      snapshots[key] = snapshot;
      return;
    }

    if (result.status !== 200) {
      findings.push({
        kind: "PAGE_BLOCKED",
        severity: "low",
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        url: card.sourceUrl,
        detail: `Source page returns HTTP ${result.status}; automated checks cannot cover this card.`,
      });
      snapshots[key] = snapshot;
      return;
    }

    reachable += 1;

    const text = htmlToText(result.body ?? "");
    const normalized = stableText(text);
    const facts = extractFacts(text);

    snapshot.rawHash = sha256(result.body ?? "");
    snapshot.textHash = sha256(normalized);
    snapshot.textLength = text.length;
    snapshot.extracted = facts;
    snapshot.termCounts = countWatchTerms(normalized);
    snapshots[key] = snapshot;

    if (facts.looksBlocked) {
      findings.push({
        kind: "PAGE_BLOCKED",
        severity: "low",
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        url: card.sourceUrl,
        detail:
          "Page returned 200 but the body looks like a bot wall or JS shell, so extraction is unreliable.",
      });
      return;
    }

    // A redirect that lands on a different path usually means the product page
    // moved or the product folded into another one.
    if (
      result.finalUrl &&
      new URL(result.finalUrl).pathname.replace(/\/$/, "") !==
        new URL(card.sourceUrl).pathname.replace(/\/$/, "")
    ) {
      findings.push({
        kind: "PAGE_REDIRECTED",
        severity: "medium",
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        url: card.sourceUrl,
        detail: `sourceUrl redirects to ${result.finalUrl}. Update sourceUrl, and check whether the product changed.`,
        observedValue: result.finalUrl,
      });
    }

    if (facts.looksDiscontinued) {
      findings.push({
        kind: "PRODUCT_DISCONTINUED",
        severity: "high",
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        url: card.sourceUrl,
        detail:
          'Page contains "no longer accepting applications" style language. Confirm and mark the card closed.',
      });
    }

    if (feeMismatch(card, facts.annualFeeCandidates)) {
      // One unambiguous number on the page is a strong signal. Several numbers
      // means the page is comparing products, and the extractor cannot tell
      // which one belongs to this card — worth a look, not worth an alarm.
      const unambiguous = facts.annualFeeCandidates.length === 1;

      findings.push({
        kind: "ANNUAL_FEE_MISMATCH",
        severity: unambiguous ? "high" : "medium",
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        url: card.sourceUrl,
        detail: unambiguous
          ? "The page states a single annual fee and it does not match the catalog."
          : "Several fee figures on the page, none matching the catalog. Likely a comparison rail — confirm manually.",
        catalogValue: String(card.annualFee),
        observedValue: facts.annualFeeCandidates.join(", "),
      });
    }

    if (
      previous?.textHash &&
      previous.textHash !== snapshot.textHash &&
      previous.termCounts
    ) {
      const changedTerms = diffTermCounts(
        previous.termCounts,
        snapshot.termCounts,
      );
      if (changedTerms.length) {
        findings.push({
          kind: "CONTENT_CHANGED",
          severity: "medium",
          cardId: card.id,
          cardName: card.name,
          issuer: card.issuer,
          url: card.sourceUrl,
          detail: `Page text changed since ${previous.checkedAt.slice(0, 10)} in terms that affect card rules.`,
          changedTerms,
        });
      }
    }
  });

  // ---- Report ------------------------------------------------------------

  const severityRank = { high: 0, medium: 1, low: 2 } as const;
  findings.sort(
    (left, right) =>
      severityRank[left.severity] - severityRank[right.severity] ||
      left.cardId - right.cardId,
  );

  const reviewAges = cards
    .map((card) => (card.lastReviewedAt ? daysBetween(card.lastReviewedAt, now) : null))
    .filter((value): value is number => value !== null && Number.isFinite(value))
    .sort((left, right) => left - right);

  const report: FreshnessReport = {
    generatedAt: now.toISOString(),
    rulesetVersion,
    cardCount: cards.length,
    crawled: crawlable.length,
    reachable,
    findings,
    stats: {
      byKind: countBy(findings, (finding) => finding.kind),
      bySeverity: countBy(findings, (finding) => finding.severity),
      stalestReviewDate: cards
        .map((card) => card.lastReviewedAt ?? "")
        .filter(Boolean)
        .sort()[0] ?? "unknown",
      medianReviewAgeDays: reviewAges.length
        ? reviewAges[Math.floor(reviewAges.length / 2)]!
        : 0,
    },
  };

  await writeFile(SNAPSHOT_PATH, `${JSON.stringify(snapshots, null, 1)}\n`, "utf8");
  await writeFile(REPORT_JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(REPORT_MD_PATH, renderMarkdownReport(report), "utf8");

  process.stderr.write(
    `\n${findings.length} findings ` +
      `(${report.stats.bySeverity.high ?? 0} high, ` +
      `${report.stats.bySeverity.medium ?? 0} medium, ` +
      `${report.stats.bySeverity.low ?? 0} low)\n` +
      `Report: ${REPORT_MD_PATH}\n`,
  );

  // Non-zero exit makes the CI job visibly fail when something needs attention.
  if ((report.stats.bySeverity.high ?? 0) > 0) process.exitCode = 1;
}

function countBy<T>(items: T[], key: (item: T) => string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const bucket = key(item);
    counts[bucket] = (counts[bucket] ?? 0) + 1;
  }
  return counts;
}

await main();
