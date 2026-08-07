/**
 * Tests for the reward engine.
 *
 * The category matcher is the single point where every number in the app can
 * go quietly wrong: it used to compare a transaction's category to the
 * catalog's by string equality, which matched 30% of bonus rows and left every
 * spend cap unreachable. These cases pin the behaviour that replaced it.
 *
 *   pnpm --dir lib/api-client-react test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BUILTIN_CARDS } from "./catalog";
import {
  TRANSACTION_CATEGORIES,
  resolveCashbackCategory,
  normalizeRemoteCatalogForTests,
  type CategoryChoiceContext,
} from "./local-first";
import type { CreditCard } from "../generated/api.schemas";

function card(id: number): CreditCard {
  const found = BUILTIN_CARDS.find((entry) => entry.id === id);
  assert.ok(found, `catalog is missing card ${id}`);
  return found as unknown as CreditCard;
}

function rateFor(cardId: number, category: string): number {
  return resolveCashbackCategory(card(cardId), category)?.rate ?? 0;
}

function labelFor(cardId: number, category: string): string {
  return resolveCashbackCategory(card(cardId), category)?.category ?? "";
}

describe("category matching", () => {
  it("matches catalog rows whose names carry qualifiers", () => {
    // "Groceries (US supermarkets, up to $6,000/yr)" on Blue Cash Preferred.
    assert.equal(rateFor(10, "Groceries"), 0.06);
    // "U.S. supermarkets (up to $25,000/yr)" and "Restaurants worldwide" on
    // Amex Gold — every bonus row on this card used to fall through to 1%.
    assert.equal(rateFor(8, "Groceries"), 0.04);
    assert.equal(rateFor(8, "Dining"), 0.04);
  });

  it("still matches rows that are already verbatim", () => {
    assert.equal(rateFor(1, "Dining"), 0.03);
    assert.equal(rateFor(10, "Streaming"), 0.06);
  });

  it("falls back to the card's default rate, not to zero", () => {
    // Sapphire Preferred prices online groceries only, so in-store groceries
    // correctly earn the catch-all rate.
    assert.equal(rateFor(1, "Groceries"), 0.01);
    assert.equal(rateFor(1, "Other"), 0.01);
    // Venture X earns 2x on everything outside its portal-only bonuses.
    assert.equal(rateFor(12, "Dining"), 0.02);
  });

  it("does not award portal-only bonuses to purchases made elsewhere", () => {
    // 10x hotels requires booking through Capital One Travel.
    assert.equal(rateFor(12, "Hotels"), 0.02);
    // 5x requires Chase Travel; a plain trip gets the generic 2x travel row.
    assert.equal(labelFor(1, "Travel"), "Travel");
    assert.equal(rateFor(1, "Travel"), 0.02);
  });

  it("keeps a bonus for one kind of travel off the others", () => {
    // Amex Gold earns 3x on flights; its hotel bonus is Amex Travel only.
    assert.equal(rateFor(8, "Flights"), 0.03);
    assert.equal(rateFor(8, "Hotels"), 0.01);
    // Sapphire Reserve's 4x covers flights and hotels, but not car rentals.
    assert.equal(rateFor(2, "Flights"), 0.04);
    assert.equal(rateFor(2, "Hotels"), 0.04);
    assert.equal(rateFor(2, "Rental Cars"), 0.01);
  });

  it("treats a generic travel bonus as covering every travel subtype", () => {
    for (const category of ["Travel", "Flights", "Hotels", "Rental Cars"]) {
      assert.equal(rateFor(1, category), 0.02, category);
    }
  });

  it("does not let an online-only bonus pay out in store", () => {
    assert.equal(labelFor(1, "Online Groceries"), "Online Groceries");
    assert.equal(rateFor(1, "Online Groceries"), 0.03);
    assert.equal(rateFor(1, "Groceries"), 0.01);
  });

  it("reads Bank of America's choice card from the catalog, not a hardcode", () => {
    // The engine used to invent 3%/6% across gas, dining, travel and online at
    // once. The real card pays 2% at grocery stores and wholesale clubs.
    assert.equal(rateFor(23, "Groceries"), 0.02);
    assert.equal(rateFor(23, "Warehouse Clubs"), 0.02);
    assert.equal(rateFor(23, "Gas"), 0.01);
    assert.equal(rateFor(23, "Dining"), 0.01);
    assert.equal(rateFor(23, "Travel"), 0.01);
  });

  it("never returns a bonus row that pays less than the default", () => {
    for (const entry of BUILTIN_CARDS) {
      const subject = entry as unknown as CreditCard;
      const fallback = subject.cashbackCategories.find((row) => row.isDefault);
      if (!fallback) continue;

      for (const category of TRANSACTION_CATEGORIES) {
        const resolved = resolveCashbackCategory(subject, category);
        assert.ok(
          (resolved?.rate ?? 0) >= fallback.rate,
          `#${entry.id} ${entry.name} / ${category} resolved below its default rate`,
        );
      }
    }
  });

  it("reaches the spend caps the catalog encodes", () => {
    const capped = BUILTIN_CARDS.flatMap((entry) =>
      (entry.cashbackCategories as { category: string; isDefault: boolean }[])
        .filter(
          (row) => !row.isDefault && /(?:up to|first)\s+\$[\d,]+/i.test(row.category),
        )
        .map((row) => ({ id: entry.id, name: entry.name, label: row.category })),
    );

    const reached = capped.filter(({ id, label }) =>
      TRANSACTION_CATEGORIES.some(
        (category) => labelFor(id, category) === label,
      ),
    );

    // Every capped row was unreachable before the matcher change, so the caps
    // were never enforced at all.
    assert.ok(
      reached.length / capped.length > 0.6,
      `only ${reached.length}/${capped.length} capped categories are reachable`,
    );
  });
});

describe("choice categories", () => {
  const CHOICE_OPTIONS = ["Gas", "Online Retail", "Dining", "Drugstores"];

  function choiceCard(mode: "user-selected" | "automatic-top-spend", picks = 1) {
    return {
      ...card(1),
      id: 900,
      name: "Test Choice Card",
      cashbackCategories: [
        { id: 9001, cardId: 900, category: "Choice Category", rate: 0.03, isDefault: false },
        { id: 9002, cardId: 900, category: "Other", rate: 0.01, isDefault: true },
      ],
      categoryChoices: [
        {
          categoryId: 9001,
          mode,
          picks,
          resets: "month" as const,
          options: CHOICE_OPTIONS,
        },
      ],
    } as unknown as CreditCard;
  }

  const walletCard = {
    id: 1,
    cardId: 900,
    addedAt: "2026-01-01T12:00:00.000Z",
  };

  it("earns the base rate while nothing is selected", () => {
    const subject = choiceCard("user-selected");
    for (const category of ["Gas", "Dining", "Online Retail"]) {
      assert.equal(
        resolveCashbackCategory(subject, category, { walletCard })?.rate,
        0.01,
        category,
      );
    }
  });

  it("earns the bonus only on the selected option", () => {
    const subject = choiceCard("user-selected");
    const context = {
      walletCard: { ...walletCard, selectedCategories: { 9001: ["Gas"] } },
    };

    assert.equal(resolveCashbackCategory(subject, "Gas", context)?.rate, 0.03);
    assert.equal(resolveCashbackCategory(subject, "Dining", context)?.rate, 0.01);
  });

  it("honours more than one pick", () => {
    const subject = choiceCard("user-selected", 2);
    const context = {
      walletCard: {
        ...walletCard,
        selectedCategories: { 9001: ["Gas", "Dining"] },
      },
    };

    assert.equal(resolveCashbackCategory(subject, "Gas", context)?.rate, 0.03);
    assert.equal(resolveCashbackCategory(subject, "Dining", context)?.rate, 0.03);
    assert.equal(
      resolveCashbackCategory(subject, "Online Retail", context)?.rate,
      0.01,
    );
  });

  it("ignores a saved option the issuer does not offer", () => {
    const subject = choiceCard("user-selected");
    const context = {
      walletCard: { ...walletCard, selectedCategories: { 9001: ["Hotels"] } },
    };
    assert.equal(resolveCashbackCategory(subject, "Hotels", context)?.rate, 0.01);
  });

  it("derives an automatic choice from the period's biggest category", () => {
    const subject = choiceCard("automatic-top-spend");
    const onDate = new Date(2026, 7, 20);
    const state = {
      transactions: [
        { id: 1, walletCardId: 1, transactionType: "purchase", description: "", amount: 400, category: "Dining", cashbackEarned: 0, cashbackRate: 0, date: new Date(2026, 7, 3, 12).toISOString() },
        { id: 2, walletCardId: 1, transactionType: "purchase", description: "", amount: 90, category: "Gas", cashbackEarned: 0, cashbackRate: 0, date: new Date(2026, 7, 5, 12).toISOString() },
      ],
    } as unknown as CategoryChoiceContext["state"];

    const context = { walletCard, state, onDate };
    assert.equal(resolveCashbackCategory(subject, "Dining", context)?.rate, 0.03);
    assert.equal(resolveCashbackCategory(subject, "Gas", context)?.rate, 0.01);
  });

  it("counts the purchase being priced toward an automatic choice", () => {
    const subject = choiceCard("automatic-top-spend");
    const onDate = new Date(2026, 7, 20);
    const state = { transactions: [] } as unknown as CategoryChoiceContext["state"];

    // First purchase of the period makes its own category the top one.
    assert.equal(
      resolveCashbackCategory(subject, "Gas", {
        walletCard,
        state,
        onDate,
        pending: { category: "Gas", amount: 60 },
      })?.rate,
      0.03,
    );
  });

  it("leaves choice categories unresolved without a wallet card", () => {
    const subject = choiceCard("user-selected");
    assert.equal(resolveCashbackCategory(subject, "Gas")?.rate, 0.01);
  });
});

describe("remote catalog normalization", () => {
  it("preserves every field a published ruleset carries", () => {
    // Rebuilding cards from a fixed field list dropped rewardUnitValueCents,
    // rewardType and categoryChoices, which would silently corrupt rates and
    // disable choice categories on the next deploy.
    const source = BUILTIN_CARDS.map(({ inWallet: _inWallet, ...card }) => card);
    const normalized = normalizeRemoteCatalogForTests(source);

    assert.equal(normalized.length, source.length);

    const withMultiplier = source.filter(
      (card) => typeof card.rewardUnitValueCents === "number",
    );
    assert.ok(withMultiplier.length > 40, "fixture should exercise multipliers");

    for (const original of source) {
      const result = normalized.find((card) => card.id === original.id);
      assert.ok(result, `card ${original.id} survived`);
      assert.equal(result.rewardUnitValueCents, original.rewardUnitValueCents ?? null);
      assert.equal(result.rewardType, original.rewardType);
      assert.equal(result.rewardUnitName, original.rewardUnitName);
      assert.deepEqual(result.rewardRuleNotes, original.rewardRuleNotes);
      assert.deepEqual(result.categoryChoices, original.categoryChoices);
    }
  });

  it("keeps every choice-bearing card's choices", () => {
    const source = BUILTIN_CARDS.map(({ inWallet: _inWallet, ...card }) => card);
    const expected = source.filter((card) => card.categoryChoices?.length).length;
    const actual = normalizeRemoteCatalogForTests(source).filter(
      (card) => card.categoryChoices?.length,
    ).length;

    assert.ok(expected > 0, "fixture should contain choice cards");
    assert.equal(actual, expected);
  });
});

describe("transaction categories", () => {
  it("has no duplicates", () => {
    assert.equal(
      new Set(TRANSACTION_CATEGORIES).size,
      TRANSACTION_CATEGORIES.length,
    );
  });

  it("resolves every category against every card without throwing", () => {
    for (const entry of BUILTIN_CARDS) {
      for (const category of TRANSACTION_CATEGORIES) {
        resolveCashbackCategory(entry as unknown as CreditCard, category);
      }
    }
  });

  it("survives a card with no priced categories", () => {
    const empty = {
      ...(BUILTIN_CARDS[0] as unknown as CreditCard),
      cashbackCategories: [],
    };
    assert.equal(resolveCashbackCategory(empty, "Dining"), null);
  });
});
