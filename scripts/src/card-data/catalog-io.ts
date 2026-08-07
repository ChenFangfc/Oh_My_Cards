import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CatalogCard } from "./types";

const HERE = path.dirname(fileURLToPath(import.meta.url));

export const REPO_ROOT = path.resolve(HERE, "..", "..", "..");
export const CATALOG_PATH = path.join(
  REPO_ROOT,
  "lib",
  "api-client-react",
  "src",
  "local",
  "catalog.ts",
);
export const CARD_IMAGE_DIR = path.join(
  REPO_ROOT,
  "artifacts",
  "card-organizer",
  "public",
  "card-images",
);
/**
 * Tracked in git on purpose: `snapshots.json` is the baseline the next crawl
 * diffs against, so it has to survive between CI runs. `.omx/` is gitignored
 * and would silently reset the baseline every time.
 */
export const STATE_DIR = path.join(REPO_ROOT, "card-data");

const CARDS_MARKER = "export const BUILTIN_CARDS = ";
const VERSION_MARKER = "export const BUILTIN_RULESET_VERSION = ";

/**
 * `catalog.ts` holds a `JSON.stringify(cards, null, 2)` array between a
 * `const` marker and a `satisfies` clause. Slicing it out by bracket matching
 * round-trips byte-for-byte, which keeps rewrite diffs limited to real changes.
 */
function sliceCardsJson(source: string): { start: number; end: number } {
  const markerIndex = source.indexOf(CARDS_MARKER);
  if (markerIndex < 0) {
    throw new Error(`Could not find "${CARDS_MARKER}" in catalog.ts`);
  }

  const start = markerIndex + CARDS_MARKER.length;
  if (source[start] !== "[") {
    throw new Error("BUILTIN_CARDS is not an array literal.");
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];

    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === "\\") {
      escaped = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;

    if (char === "[") depth += 1;
    else if (char === "]") {
      depth -= 1;
      if (depth === 0) return { start, end: index + 1 };
    }
  }

  throw new Error("Unbalanced brackets in BUILTIN_CARDS.");
}

export interface Catalog {
  cards: CatalogCard[];
  rulesetVersion: string;
  source: string;
}

export async function readCatalog(
  catalogPath = CATALOG_PATH,
): Promise<Catalog> {
  const source = await readFile(catalogPath, "utf8");
  const { start, end } = sliceCardsJson(source);
  const cards = JSON.parse(source.slice(start, end)) as CatalogCard[];

  const versionIndex = source.indexOf(VERSION_MARKER);
  const rulesetVersion =
    versionIndex < 0
      ? "0.0.0"
      : (source
          .slice(versionIndex + VERSION_MARKER.length)
          .match(/"([^"]+)"/)?.[1] ?? "0.0.0");

  return { cards, rulesetVersion, source };
}

/** Rewrites BUILTIN_CARDS (and optionally the ruleset version) in place. */
export async function writeCatalog(
  cards: CatalogCard[],
  options: { rulesetVersion?: string; catalogPath?: string } = {},
): Promise<void> {
  const catalogPath = options.catalogPath ?? CATALOG_PATH;
  const source = await readFile(catalogPath, "utf8");
  const { start, end } = sliceCardsJson(source);

  let next =
    source.slice(0, start) +
    JSON.stringify(cards, null, 2) +
    source.slice(end);

  if (options.rulesetVersion) {
    next = next.replace(
      new RegExp(`(${VERSION_MARKER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})"[^"]*"`),
      `$1"${options.rulesetVersion}"`,
    );
  }

  await writeFile(catalogPath, next, "utf8");
}

/** `2026.08.06.1`, bumping the trailing serial when the date is unchanged. */
export function nextRulesetVersion(current: string, today = new Date()): string {
  const datePart = [
    today.getUTCFullYear(),
    String(today.getUTCMonth() + 1).padStart(2, "0"),
    String(today.getUTCDate()).padStart(2, "0"),
  ].join(".");

  if (!current.startsWith(`${datePart}.`)) return `${datePart}.1`;

  const serial = Number(current.slice(datePart.length + 1)) || 0;
  return `${datePart}.${serial + 1}`;
}

export async function readJsonIfExists<T>(filePath: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(filePath, "utf8")) as T;
  } catch {
    return null;
  }
}
