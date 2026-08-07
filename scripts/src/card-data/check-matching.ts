/**
 * Reports how each transaction category resolves against every card's bonus
 * rows, and how much of the catalog is reachable overall.
 *
 * The reward engine matches a logged transaction to a card's bonus category by
 * derived tags rather than by string equality. That matching is the single
 * point where the whole app's numbers can silently go wrong, so this makes its
 * behaviour inspectable against the real 182-card catalog.
 *
 *   pnpm --dir scripts cards:matching
 *   pnpm --dir scripts cards:matching -- --card=8
 */
import {
  TRANSACTION_CATEGORIES,
  resolveCashbackCategory,
} from "@workspace/api-client-react";
import type { CreditCard } from "@workspace/api-client-react";
import { readCatalog } from "./catalog-io";

function pct(rate: number): string {
  return `${(rate * 100).toFixed(rate * 100 < 10 ? 1 : 0)}%`;
}

async function main(): Promise<void> {
  const only = process.argv
    .find((arg) => arg.startsWith("--card="))
    ?.split("=")[1];

  const { cards } = await readCatalog();
  const targets = only
    ? cards.filter((card) => String(card.id) === only)
    : cards;

  let bonusRows = 0;
  let reachableRows = 0;
  let cappedRows = 0;
  let reachableCappedRows = 0;

  const reachedByCard = new Map<number, Set<string>>();

  for (const card of targets) {
    const reached = new Set<string>();
    for (const category of TRANSACTION_CATEGORIES) {
      const resolved = resolveCashbackCategory(
        card as unknown as CreditCard,
        category,
      );
      if (resolved && !resolved.isDefault) reached.add(resolved.category);
    }
    reachedByCard.set(card.id, reached);

    for (const row of card.cashbackCategories) {
      if (row.isDefault) continue;
      bonusRows += 1;
      const hasCap = /(?:up to|first)\s+\$[\d,]+/i.test(row.category);
      if (hasCap) cappedRows += 1;
      if (reached.has(row.category)) {
        reachableRows += 1;
        if (hasCap) reachableCappedRows += 1;
      }
    }
  }

  if (only) {
    for (const card of targets) {
      const fallback = card.cashbackCategories.find((row) => row.isDefault);
      process.stdout.write(
        `#${card.id} ${card.name} (default ${pct(fallback?.rate ?? 0)})\n`,
      );
      for (const category of TRANSACTION_CATEGORIES) {
        const resolved = resolveCashbackCategory(
          card as unknown as CreditCard,
          category,
        );
        const label =
          resolved && !resolved.isDefault
            ? `${pct(resolved.rate)}  ${resolved.category}`
            : `${pct(resolved?.rate ?? 0)}  (default)`;
        process.stdout.write(`   ${category.padEnd(20)} -> ${label}\n`);
      }
    }
    return;
  }

  const unreachable = cards.flatMap((card) =>
    card.cashbackCategories
      .filter(
        (row) => !row.isDefault && !reachedByCard.get(card.id)?.has(row.category),
      )
      .map((row) => `#${card.id} ${card.name} :: ${row.category}`),
  );

  process.stdout.write(
    [
      `cards:                 ${targets.length}`,
      `bonus rows:            ${bonusRows}`,
      `reachable:             ${reachableRows} (${((reachableRows / bonusRows) * 100).toFixed(0)}%)`,
      `capped rows:           ${cappedRows}`,
      `capped and reachable:  ${reachableCappedRows} (${((reachableCappedRows / cappedRows) * 100).toFixed(0)}%)`,
      "",
      `unreachable rows (${unreachable.length}):`,
      ...unreachable.slice(0, 60).map((line) => `  ${line}`),
      unreachable.length > 60 ? `  ... and ${unreachable.length - 60} more` : "",
      "",
    ].join("\n"),
  );
}

await main();
