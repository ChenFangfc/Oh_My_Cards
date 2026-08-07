import type { Finding, FreshnessReport, Severity } from "./types";

const SEVERITY_LABEL: Record<Severity, string> = {
  high: "🔴 High",
  medium: "🟡 Medium",
  low: "⚪ Low",
};

const KIND_HEADING: Record<string, string> = {
  PAGE_GONE: "Source page unreachable",
  PAGE_REDIRECTED: "Source page moved",
  PAGE_BLOCKED: "Source page not machine-readable",
  PRODUCT_DISCONTINUED: "Product may be discontinued",
  ANNUAL_FEE_MISMATCH: "Annual fee disagrees with issuer page",
  CONTENT_CHANGED: "Issuer page changed since last crawl",
  MISSING_SOURCE_URL: "No source URL",
  MISSING_CARD_IMAGE: "Card image missing",
  STALE_REVIEW: "Past the review budget",
  LOW_CONFIDENCE: "Never confirmed against an issuer source",
};

/** Ordered so a reader hits the cards that can produce wrong advice first. */
const KIND_ORDER = [
  "PRODUCT_DISCONTINUED",
  "ANNUAL_FEE_MISMATCH",
  "PAGE_GONE",
  "PAGE_REDIRECTED",
  "CONTENT_CHANGED",
  "MISSING_SOURCE_URL",
  "MISSING_CARD_IMAGE",
  "LOW_CONFIDENCE",
  "PAGE_BLOCKED",
  "STALE_REVIEW",
];

function groupByKind(findings: Finding[]): Map<string, Finding[]> {
  const groups = new Map<string, Finding[]>();
  for (const finding of findings) {
    const bucket = groups.get(finding.kind) ?? [];
    bucket.push(finding);
    groups.set(finding.kind, bucket);
  }
  return groups;
}

function renderFinding(finding: Finding): string {
  const lines = [
    `- **#${finding.cardId} ${finding.cardName}** (${finding.issuer}) — ${SEVERITY_LABEL[finding.severity]}`,
    `  - ${finding.detail}`,
  ];

  if (finding.catalogValue !== undefined) {
    lines.push(
      `  - catalog: \`${finding.catalogValue}\` · page: \`${finding.observedValue ?? "-"}\``,
    );
  }
  if (finding.changedTerms?.length) {
    lines.push(`  - changed terms: ${finding.changedTerms.join(", ")}`);
  }
  if (finding.url) lines.push(`  - ${finding.url}`);

  return lines.join("\n");
}

export function renderMarkdownReport(report: FreshnessReport): string {
  const groups = groupByKind(report.findings);
  const high = report.stats.bySeverity.high ?? 0;
  const medium = report.stats.bySeverity.medium ?? 0;
  const low = report.stats.bySeverity.low ?? 0;

  const sections = KIND_ORDER.filter((kind) => groups.has(kind)).map((kind) => {
    const items = groups.get(kind)!;
    return [
      `### ${KIND_HEADING[kind] ?? kind} (${items.length})`,
      "",
      items.map(renderFinding).join("\n"),
      "",
    ].join("\n");
  });

  return [
    "# Card data freshness report",
    "",
    `Generated ${report.generatedAt} · ruleset \`${report.rulesetVersion}\``,
    "",
    "| Metric | Value |",
    "| --- | --- |",
    `| Cards in catalog | ${report.cardCount} |`,
    `| Source pages crawled | ${report.crawled} |`,
    `| Pages reachable (HTTP 200) | ${report.reachable} |`,
    `| Findings | ${report.findings.length} (${high} high / ${medium} medium / ${low} low) |`,
    `| Median review age | ${report.stats.medianReviewAgeDays} days |`,
    `| Oldest review date | ${report.stats.stalestReviewDate} |`,
    "",
    high > 0
      ? `> **${high} high-severity findings need a human decision before the next release.**`
      : "> No high-severity findings.",
    "",
    "Extracted values are *signals, not truth*. Issuer pages list other cards'",
    "fees in comparison tables and vary offers by region, so every proposed",
    "change must be confirmed against the issuer page before editing `catalog.ts`.",
    "",
    ...sections,
  ].join("\n");
}
