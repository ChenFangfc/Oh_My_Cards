/**
 * Prints how each choice-bearing card resolves before and after a selection,
 * so the mechanic can be inspected against the real catalog.
 */
import {
  resolveCashbackCategory,
  type CategoryChoiceContext,
} from "@workspace/api-client-react";
import type { CreditCard } from "@workspace/api-client-react";
import { readCatalog } from "./catalog-io";

const walletCard = {
  id: 1,
  cardId: 0,
  addedAt: "2026-01-01T12:00:00.000Z",
};

function pct(rate: number | undefined): string {
  return rate === undefined ? "—" : `${(rate * 100).toFixed(0)}%`;
}

async function main(): Promise<void> {
  const { cards } = await readCatalog();
  const withChoices = cards.filter((card) => card.categoryChoices?.length);

  process.stdout.write(`${withChoices.length} cards carry a choice rule\n\n`);

  for (const card of withChoices) {
    const subject = card as unknown as CreditCard;
    process.stdout.write(`#${card.id} ${card.name}\n`);

    for (const choice of card.categoryChoices ?? []) {
      const row = card.cashbackCategories.find((c) => c.id === choice.categoryId);
      process.stdout.write(
        `   ${choice.mode} · pick ${choice.picks} of ${choice.options.length} · resets ${choice.resets}\n` +
          `   row: ${pct(row?.rate)} ${row?.category}\n`,
      );

      if (choice.mode === "automatic-top-spend") {
        // Simulate spend concentrated in the first option.
        const target = choice.options[0]!;
        const context: CategoryChoiceContext = {
          walletCard,
          state: {
            transactions: [
              {
                id: 1,
                walletCardId: 1,
                transactionType: "purchase",
                description: "",
                amount: 500,
                category: target,
                cashbackEarned: 0,
                cashbackRate: 0,
                date: new Date().toISOString(),
              },
            ],
          } as unknown as CategoryChoiceContext["state"],
        };
        const resolved = resolveCashbackCategory(subject, target, context);
        process.stdout.write(
          `   spend concentrated in "${target}" -> ${pct(resolved?.rate)}\n`,
        );
        continue;
      }

      const option = choice.options[0]!;
      const base = resolveCashbackCategory(subject, option, { walletCard });
      const picked = resolveCashbackCategory(subject, option, {
        walletCard: {
          ...walletCard,
          selectedCategories: { [choice.categoryId]: [option] },
        },
      });
      process.stdout.write(
        `   "${option}": unselected ${pct(base?.rate)} -> selected ${pct(picked?.rate)}\n`,
      );
    }
    process.stdout.write("\n");
  }
}

await main();
