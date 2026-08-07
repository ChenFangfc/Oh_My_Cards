/**
 * Early-warning watcher for card-rule changes.
 *
 * Product pages tell you what a card *is*. Newsrooms and the tracking blogs
 * tell you it *changed*, usually days before the product page is rewritten and
 * always in prose a crawler can act on. This script pulls a handful of feeds,
 * matches headlines against the 182 card names and their issuers, and reports
 * hits since the last run.
 *
 * It is cheap enough to run daily, unlike the full crawl.
 *
 *   pnpm --dir scripts cards:watch
 *   pnpm --dir scripts cards:watch -- --since=2026-05-21
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { STATE_DIR, readCatalog, readJsonIfExists } from "./catalog-io";
import { fetchPage, mapWithConcurrency } from "./fetcher";
import { htmlToText } from "./extract";
import type { CatalogCard } from "./types";

const SEEN_PATH = path.join(STATE_DIR, "newsroom-seen.json");
const REPORT_PATH = path.join(STATE_DIR, "newsroom-report.md");

interface Feed {
  name: string;
  url: string;
  /** Issuers this feed can speak for; used to boost weak name matches. */
  issuers: string[];
}

/**
 * Community trackers only. Chase and Amex newsrooms were both probed and
 * neither publishes a usable RSS feed (media.chase.com/rss/news 404s;
 * americanexpress.com/en-us/newsroom/rss.xml returns HTML with no items), so
 * their announcements arrive here via the blogs that cover them within hours.
 */
const FEEDS: Feed[] = [
  { name: "Doctor of Credit", url: "https://www.doctorofcredit.com/feed/", issuers: [] },
  { name: "Frequent Miler", url: "https://frequentmiler.com/feed/", issuers: [] },
  { name: "One Mile at a Time", url: "https://onemileatatime.com/feed/", issuers: [] },
];

/** Words that turn a card mention into a rules change worth reviewing. */
const CHANGE_SIGNALS = [
  "annual fee",
  "increase",
  "increasing",
  "refresh",
  "revamp",
  "overhaul",
  "new benefits",
  "changes",
  "changing",
  "devalu",
  "discontinu",
  "no longer",
  "removes",
  "removing",
  "adds",
  "earn rate",
  "bonus categor",
  "credit",
  "shutting down",
  "relaunch",
];

interface FeedItem {
  title: string;
  link: string;
  published: string;
  feed: string;
}

function decodeEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

/**
 * Deliberately regex-based rather than a dependency: these feeds are plain
 * RSS 2.0 / Atom and adding an XML parser to a workspace with a 1-day
 * minimum-release-age supply-chain policy is not worth it for five feeds.
 */
function parseFeed(xml: string, feedName: string): FeedItem[] {
  const blocks = [
    ...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi),
    ...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi),
  ].map((match) => match[0]);

  return blocks.flatMap((block) => {
    const title = decodeEntities(
      block.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "",
    );
    if (!title) return [];

    const link =
      decodeEntities(block.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1] ?? "") ||
      block.match(/<link[^>]*href="([^"]+)"/i)?.[1] ||
      "";

    const published = decodeEntities(
      block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i)?.[1] ??
        block.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i)?.[1] ??
        block.match(/<published[^>]*>([\s\S]*?)<\/published>/i)?.[1] ??
        "",
    );

    const description = htmlToText(
      block.match(/<description[^>]*>([\s\S]*?)<\/description>/i)?.[1] ??
        block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)?.[1] ??
        "",
    );

    return [{ title: `${title} ${description}`.slice(0, 600), link, published, feed: feedName }];
  });
}

const ISSUER_PREFIX =
  /^(chase|citi|american express|amex|capital one|bank of america|wells fargo|u\.?s\.? bank|discover|barclays|td|pnc|navy federal|penfed|sofi|bmo|rbc|cibc|hsbc|dbs|uob|ocbc|standard chartered|hang seng|scotiabank)\s+/;

/**
 * Card names embed their issuer ("Chase Sapphire Preferred") but headlines
 * often drop it ("Sapphire Preferred gets a refresh"). Matching the stripped
 * tail alone is too loose, though — "Bank of America Travel Rewards" reduces to
 * "travel rewards", which appears in almost any card review. So a stripped-name
 * hit additionally requires the issuer to be named somewhere in the item.
 */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Substring matching is not good enough here: "america" is inside "American
 * Express", which made every Amex article look like a Bank of America hit.
 */
function containsPhrase(haystack: string, phrase: string): boolean {
  return new RegExp(`\\b${escapeRegExp(phrase)}\\b`).test(haystack);
}

function matchesCard(card: CatalogCard, haystack: string): boolean {
  const name = card.name.toLowerCase();
  if (containsPhrase(haystack, name)) return true;

  const withoutIssuer = name.replace(ISSUER_PREFIX, "").trim();
  if (withoutIssuer === name || withoutIssuer.length < 8) return false;
  if (!containsPhrase(haystack, withoutIssuer)) return false;

  // The stripped name alone is too generic ("travel rewards", "cash rewards"),
  // so the issuer has to be named too — as a whole word.
  const issuerWords = card.issuer
    .toLowerCase()
    .split(/[\s/]+/)
    .filter((word) => word.length >= 4);

  return issuerWords.some((word) => containsPhrase(haystack, word));
}

function isRecent(published: string, since: Date): boolean {
  const parsed = Date.parse(published);
  return Number.isNaN(parsed) ? true : parsed >= since.getTime();
}

async function main(): Promise<void> {
  const sinceArg = process.argv
    .find((arg) => arg.startsWith("--since="))
    ?.split("=")[1];

  const { cards } = await readCatalog();
  await mkdir(STATE_DIR, { recursive: true });

  const seen = new Set(
    (await readJsonIfExists<string[]>(SEEN_PATH)) ?? [],
  );

  // Default window: anything published since the freshest lastReviewedAt.
  const since = sinceArg
    ? new Date(sinceArg)
    : new Date(
        cards
          .map((card) => card.lastReviewedAt ?? "")
          .filter(Boolean)
          .sort()
          .at(-1) ?? "1970-01-01",
      );

  const itemsByFeed = await mapWithConcurrency(FEEDS, 3, async (feed) => {
    const result = await fetchPage(feed.url);
    if (result.status !== 200 || !result.body) {
      process.stderr.write(
        `  ${feed.name}: unavailable (${result.status}${result.error ? ` ${result.error}` : ""})\n`,
      );
      return [];
    }
    return parseFeed(result.body, feed.name);
  });

  const hits: Array<{ item: FeedItem; cards: CatalogCard[]; signals: string[] }> = [];

  for (const item of itemsByFeed.flat()) {
    if (!isRecent(item.published, since)) continue;
    if (seen.has(item.link || item.title)) continue;

    const haystack = item.title.toLowerCase();
    const matched = cards.filter((card) => matchesCard(card, haystack));

    if (!matched.length) continue;

    const signals = CHANGE_SIGNALS.filter((signal) => haystack.includes(signal));
    if (!signals.length) continue;

    hits.push({ item, cards: matched, signals });
    seen.add(item.link || item.title);
  }

  const lines = [
    "# Card rule change watch",
    "",
    `Generated ${new Date().toISOString()} · window since ${since.toISOString().slice(0, 10)}`,
    "",
    hits.length
      ? `${hits.length} feed items mention a catalog card alongside change language.`
      : "No feed items matched a catalog card with change language in this window.",
    "",
  ];

  for (const hit of hits) {
    lines.push(
      `### ${hit.item.title.slice(0, 160)}`,
      "",
      `- feed: ${hit.item.feed} · published ${hit.item.published || "unknown"}`,
      `- cards: ${hit.cards.map((card) => `#${card.id} ${card.name}`).join(", ")}`,
      `- signals: ${hit.signals.join(", ")}`,
      hit.item.link ? `- ${hit.item.link}` : "",
      "",
    );
  }

  await writeFile(REPORT_PATH, lines.join("\n"), "utf8");
  // Bounded so the seen list cannot grow without limit across years of runs.
  await writeFile(
    SEEN_PATH,
    `${JSON.stringify([...seen].slice(-2_000), null, 1)}\n`,
    "utf8",
  );

  process.stderr.write(
    `\n${hits.length} change signals across ${cards.length} cards\nReport: ${REPORT_PATH}\n`,
  );
}

await main();
