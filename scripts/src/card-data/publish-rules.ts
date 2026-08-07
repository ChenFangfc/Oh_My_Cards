/**
 * Publishes the catalog as a standalone rules feed that installed apps can pull
 * without waiting for a new build.
 *
 * `local-first.ts` already ships `checkForCardRulesUpdate()`, which fetches a
 * manifest, compares versions and swaps in a new catalog. Nothing currently
 * writes that manifest and `VITE_CARD_RULES_MANIFEST_URL` is unset, so the code
 * path is dormant. This script emits the two files it expects into the app's
 * public directory so they deploy alongside the site:
 *
 *   public/card-rules/manifest.json   { version, url, notes, publishedAt, sha256 }
 *   public/card-rules/<version>.json  { version, publishedAt, cards: [...] }
 *
 * Versioned filenames mean a cached manifest can never point at mutated rules.
 *
 *   pnpm --dir scripts cards:publish
 */
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { REPO_ROOT, readCatalog } from "./catalog-io";

const OUTPUT_DIR = path.join(
  REPO_ROOT,
  "artifacts",
  "card-organizer",
  "public",
  "card-rules",
);

async function main(): Promise<void> {
  const notes = process.argv
    .find((arg) => arg.startsWith("--notes="))
    ?.split("=")
    .slice(1)
    .join("=");

  const { cards, rulesetVersion } = await readCatalog();
  const publishedAt = new Date().toISOString();

  // `inWallet` is per-device state; publishing it would leak a default into
  // every client and it is recomputed on load anyway.
  const payload = {
    version: rulesetVersion,
    publishedAt,
    cards: cards.map(({ inWallet: _inWallet, ...card }) => card),
  };

  const body = `${JSON.stringify(payload)}\n`;
  const digest = createHash("sha256").update(body).digest("hex");

  const manifest = {
    version: rulesetVersion,
    url: `./${rulesetVersion}.json`,
    notes: notes ?? `Card rules ${rulesetVersion} (${cards.length} cards).`,
    publishedAt,
    sha256: digest,
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(path.join(OUTPUT_DIR, `${rulesetVersion}.json`), body, "utf8");
  await writeFile(
    path.join(OUTPUT_DIR, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  process.stderr.write(
    `Published ${cards.length} cards as ruleset ${rulesetVersion}\n` +
      `  ${path.relative(REPO_ROOT, OUTPUT_DIR)}/manifest.json\n` +
      `  ${path.relative(REPO_ROOT, OUTPUT_DIR)}/${rulesetVersion}.json (sha256 ${digest.slice(0, 16)}...)\n\n` +
      `Set VITE_CARD_RULES_MANIFEST_URL=<site base>/card-rules/manifest.json at build time to activate in-app updates.\n`,
  );
}

await main();
