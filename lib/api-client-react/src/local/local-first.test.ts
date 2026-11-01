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
  benefitPeriodsForTests,
  getBenefitPeriodValue,
  resolveCashbackCategory,
  normalizeRemoteCatalogForTests,
  planQuickEntry,
  suggestCardForPurchase,
  summarizeCardRuleChanges,
  type CategoryChoiceContext,
  type LocalState,
  type LocalWalletCard,
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

  it("does not read the word \"choice\" as a hotel", () => {
    // Bank of America's grocery row says it shares a cap "with choice
    // category"; the hotel matcher used to read that as Choice Hotels and pay
    // 2% on every hotel stay.
    assert.equal(rateFor(23, "Hotels"), 0.01);
    assert.equal(rateFor(107, "Hotels"), 0.01);
  });

  it("only pays below the default through a row that names the purchase", () => {
    for (const entry of BUILTIN_CARDS) {
      const subject = entry as unknown as CreditCard;
      const fallback = subject.cashbackCategories.find((row) => row.isDefault);
      if (!fallback) continue;

      for (const category of TRANSACTION_CATEGORIES) {
        const resolved = resolveCashbackCategory(subject, category);
        if ((resolved?.rate ?? 0) >= fallback.rate) continue;
        // A lower rate is legitimate only as an explicit exception row.
        assert.ok(
          resolved && !resolved.isDefault && resolved.rate > 0,
          `#${entry.id} ${entry.name} / ${category} resolved below its default rate`,
        );
      }
    }
  });

  it("reaches merchant-specific bonuses through the merchant name", () => {
    const at = (cardId: number, category: string, merchant: string) =>
      resolveCashbackCategory(card(cardId), category, { purchaseText: merchant })?.rate ?? 0;

    // United Explorer: United purchases earn more than other flights.
    assert.ok(at(27, "Flights", "United Airlines") > rateFor(27, "Flights"));
    // Sapphire Preferred: 5x through Chase Travel, 2x on travel booked elsewhere.
    assert.equal(at(1, "Travel", "Chase Travel"), 0.05);
    assert.equal(at(1, "Travel", "Expedia"), 0.02);
    // A merchant can narrow a purchase, never turn dinner into a flight.
    assert.equal(at(1, "Dining", "United Club"), rateFor(1, "Dining"));
    // "United States" is a country, not an airline.
    assert.equal(at(27, "Other", "United States Postal Service"), rateFor(27, "Other"));
  });

  it("credits a capped everything-rate row on every purchase", () => {
    // Amex Blue Business Plus: 2x on all purchases up to $50,000 a year.
    for (const category of ["Dining", "Gas", "Office Supplies", "Other"]) {
      assert.equal(rateFor(90, category), 0.02, category);
    }
  });

  it("honours an exception row that earns less than the base rate", () => {
    const flatTwo = {
      ...card(1),
      id: 901,
      cashbackCategories: [
        { id: 9101, cardId: 901, category: "Rent", rate: 0.01, isDefault: false },
        { id: 9102, cardId: 901, category: "Other", rate: 0.02, isDefault: true },
      ],
      categoryChoices: undefined,
    } as unknown as CreditCard;
    assert.equal(resolveCashbackCategory(flatTwo, "Rent")?.rate, 0.01);
    assert.equal(resolveCashbackCategory(flatTwo, "Dining")?.rate, 0.02);
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

function walletState(
  walletCards: Array<Partial<LocalWalletCard> & { id: number; cardId: number }>,
): LocalState {
  return {
    schemaVersion: 1,
    ruleSetVersion: "test",
    nextWalletCardId: walletCards.length + 1,
    nextTransactionId: 1,
    walletCards: walletCards.map((walletCard) => ({
      addedAt: "2026-01-01T12:00:00.000Z",
      ...walletCard,
    })),
    transactions: [],
    benefitUsage: [],
  };
}

function availabilityOf(cardId: number): string {
  const found = BUILTIN_CARDS.find((entry) => entry.id === cardId) as
    | { availability?: string }
    | undefined;
  return found?.availability ?? "open";
}

describe("smart suggest", () => {
  // Bank of America Customized Cash: row 77 is the 3% choice category.
  const boaWithGas = walletState([
    { id: 1, cardId: 23, selectedCategories: { 77: ["Gas and EV charging stations"] } },
  ]);

  it("prices a held choice card at the category the cardholder picked", () => {
    const result = suggestCardForPurchase({ description: "Gas at Shell", amount: 40 }, boaWithGas);
    assert.equal(result.bestWalletCard?.cardId, 23);
    assert.equal(result.bestWalletCard?.rewardRate, 0.03);
    assert.equal(result.bestWalletCard?.matchedCategory, "Gas and EV charging stations");
  });

  it("does not let the choice row's own wording claim other spend", () => {
    // The row label mentions groceries; groceries earn 2%, not the 3% choice rate.
    const groceries = suggestCardForPurchase(
      { description: "Groceries at Kroger", amount: 80 },
      boaWithGas,
    );
    assert.equal(groceries.bestWalletCard?.rewardRate, 0.02);

    const hotel = suggestCardForPurchase(
      { description: "Hotel stay", amount: 300 },
      boaWithGas,
    );
    assert.equal(hotel.bestWalletCard?.rewardRate, 0.01);
  });

  it("earns the base rate on a choice card with nothing selected", () => {
    const state = walletState([{ id: 1, cardId: 23 }]);
    const result = suggestCardForPurchase({ description: "Gas at Shell" }, state);
    assert.equal(result.bestWalletCard?.rewardRate, 0.01);
    assert.equal(result.bestWalletCard?.isDefaultRate, true);
  });

  it("applies an automatic top-spend bonus to a held card", () => {
    // Citi Custom Cash: the purchase being priced makes dining the top category.
    const state = walletState([{ id: 1, cardId: 7 }]);
    const result = suggestCardForPurchase(
      { description: "Dinner at a restaurant", amount: 40 },
      state,
    );
    assert.equal(result.bestWalletCard?.cardId, 7);
    assert.equal(result.bestWalletCard?.rewardRate, 0.05);
  });

  it("never recommends a card that no longer takes applications", () => {
    const empty = walletState([]);
    for (const description of ["Dinner at a restaurant", "Groceries", "Gas at Shell", "Rent"]) {
      const result = suggestCardForPurchase({ description, amount: 100 }, empty);
      for (const suggestion of [result.bestOverallCard, ...(result.overallAlternatives ?? [])]) {
        if (!suggestion) continue;
        assert.equal(
          availabilityOf(suggestion.cardId),
          "open",
          `${description}: recommended closed card ${suggestion.cardName}`,
        );
      }
    }
  });

  it("still ranks a closed card the user already holds", () => {
    const state = walletState([{ id: 1, cardId: 7 }]);
    const result = suggestCardForPurchase({ description: "Groceries", amount: 50 }, state);
    assert.equal(result.bestWalletCard?.cardId, 7);
  });

  it("keeps online-only bonuses off in-store purchases", () => {
    const state = walletState([{ id: 1, cardId: 1 }]);
    const kroger = suggestCardForPurchase({ description: "Groceries at Kroger" }, state);
    assert.notEqual(kroger.bestWalletCard?.matchedCategory, "Online Groceries");
    const online = suggestCardForPurchase(
      { description: "Instacart online grocery order" },
      state,
    );
    assert.equal(online.bestWalletCard?.matchedCategory, "Online Groceries");
  });

  it("lets a generic travel bonus cover a hotel stay, but not the reverse", () => {
    const state = walletState([{ id: 1, cardId: 1 }]);
    const hotel = suggestCardForPurchase({ description: "Hotel stay at Hilton" }, state);
    assert.equal(hotel.bestWalletCard?.matchedCategory, "Travel");
    assert.equal(hotel.bestWalletCard?.rewardRate, 0.02);

    // Amex Platinum's 5x is for flights; it must not pay on a hotel or a "trip".
    const plat = walletState([{ id: 1, cardId: 9 }]);
    for (const description of ["Hotel stay at Hilton", "Weekend trip"]) {
      const result = suggestCardForPurchase({ description }, plat);
      assert.ok((result.bestWalletCard?.rewardRate ?? 0) < 0.05, description);
    }
    const flight = suggestCardForPurchase({ description: "Flight to NYC booked direct with Delta" }, plat);
    assert.equal(flight.bestWalletCard?.rewardRate, 0.05);
  });

  it("explains an empty wallet instead of leaving the message blank", () => {
    const result = suggestCardForPurchase({ description: "Coffee" }, walletState([]));
    assert.equal(result.bestWalletCard, null);
    assert.ok(result.reasoning.length > 0);
  });
});

describe("benefit renewal periods", () => {
  const { isUsedInCurrentPeriod, valueCaptured, normalizeUsage } = benefitPeriodsForTests;
  const walletCard: LocalWalletCard = {
    id: 1,
    cardId: 9,
    addedAt: "2025-01-01T12:00:00.000Z",
    openedAt: "2025-06-15",
  };

  function usage(history: string[]) {
    return {
      walletCardId: 1,
      benefitId: 1,
      used: history.length > 0,
      usedAt: history[history.length - 1] ?? null,
      history,
    };
  }

  const local = (y: number, m: number, d: number) => new Date(y, m - 1, d, 12);

  it("resets a monthly credit at the start of the next month", () => {
    const monthly = { annualValue: 120, period: "monthly" as const };
    const record = usage([local(2026, 3, 15).toISOString()]);
    assert.equal(isUsedInCurrentPeriod(record, monthly, walletCard, local(2026, 3, 31)), true);
    assert.equal(isUsedInCurrentPeriod(record, monthly, walletCard, local(2026, 4, 1)), false);
  });

  it("keeps a semiannual credit used for the rest of its half-year", () => {
    const semiannual = { annualValue: 300, period: "semiannual" as const };
    const record = usage([local(2026, 2, 10).toISOString()]);
    assert.equal(isUsedInCurrentPeriod(record, semiannual, walletCard, local(2026, 6, 30)), true);
    assert.equal(isUsedInCurrentPeriod(record, semiannual, walletCard, local(2026, 7, 1)), false);
  });

  it("resets a cardmember-year credit on the account anniversary", () => {
    const anniversary = { annualValue: 100 };
    const record = usage([local(2026, 7, 1).toISOString()]);
    assert.equal(isUsedInCurrentPeriod(record, anniversary, walletCard, local(2027, 6, 14)), true);
    assert.equal(isUsedInCurrentPeriod(record, anniversary, walletCard, local(2027, 6, 15)), false);
  });

  it("holds a four-year credit until four years after it was used", () => {
    const globalEntry = { annualValue: 30, period: "multi-year" as const, periodYears: 4 };
    const record = usage([local(2024, 5, 1).toISOString()]);
    assert.equal(isUsedInCurrentPeriod(record, globalEntry, walletCard, local(2027, 12, 1)), true);
    assert.equal(isUsedInCurrentPeriod(record, globalEntry, walletCard, local(2028, 6, 1)), false);
    assert.equal(getBenefitPeriodValue(globalEntry), 120);
  });

  it("counts captured value once per period, not once per click", () => {
    const monthly = { annualValue: 120, period: "monthly" as const };
    const record = usage([
      local(2026, 1, 5).toISOString(),
      local(2026, 1, 20).toISOString(),
      local(2026, 2, 3).toISOString(),
      local(2026, 3, 9).toISOString(),
    ]);
    assert.equal(
      valueCaptured(record, monthly, walletCard, local(2026, 1, 1), local(2026, 12, 31)),
      30,
    );
    assert.equal(
      valueCaptured(record, monthly, walletCard, local(2026, 2, 1), local(2026, 12, 31)),
      20,
    );
  });

  it("migrates a used flag written before the usage log existed", () => {
    const migrated = normalizeUsage({ walletCardId: 1, benefitId: 2, used: true, usedAt: null });
    assert.ok(migrated);
    assert.equal(migrated.history?.length, 1);
    assert.equal(migrated.used, true);

    const unused = normalizeUsage({ walletCardId: 1, benefitId: 2, used: false });
    assert.deepEqual(unused?.history, []);
  });

  it("survives a published ruleset", () => {
    const source = BUILTIN_CARDS.slice(0, 1).map(({ inWallet: _inWallet, ...entry }) => ({
      ...entry,
      benefits: entry.benefits.map((benefit) => ({ ...benefit, period: "monthly" })),
    }));
    const [normalized] = normalizeRemoteCatalogForTests(source);
    assert.ok(normalized.benefits.every((benefit) => benefit.period === "monthly"));
  });
});

describe("rules change summary", () => {
  it("names what changed for each card", () => {
    const before = BUILTIN_CARDS.slice(0, 3).map((entry) => entry as unknown as CreditCard);
    const [first, second, third] = before;
    const after = [
      {
        ...first,
        annualFee: first.annualFee + 50,
        cashbackCategories: first.cashbackCategories.map((row, index) =>
          index === 0 ? { ...row, rate: row.rate + 0.01 } : row,
        ),
        benefits: [
          ...first.benefits,
          { id: 99999, cardId: first.id, name: "New Test Credit", description: "", annualValue: 50 },
        ],
      },
      { ...second, availability: "closed-to-new-applicants" } as CreditCard,
      { ...third, id: 999, name: "Brand New Card" },
    ];

    const summary = summarizeCardRuleChanges(before, after);
    assert.deepEqual(summary.added, ["Brand New Card"]);
    assert.deepEqual(summary.removed, [third.name]);

    const firstChange = summary.changed.find((change) => change.cardId === first.id);
    assert.ok(firstChange);
    assert.ok(firstChange.details.some((detail) => detail.startsWith("annual fee")));
    assert.ok(firstChange.details.some((detail) => detail.includes("→")));
    assert.ok(firstChange.details.includes("new benefit: New Test Credit"));

    const secondChange = summary.changed.find((change) => change.cardId === second.id);
    assert.deepEqual(secondChange?.details, ["closed to new applicants"]);
  });

  it("reports nothing for identical rulesets", () => {
    const cards = BUILTIN_CARDS.map((entry) => entry as unknown as CreditCard);
    const summary = summarizeCardRuleChanges(cards, cards);
    assert.deepEqual(summary, { added: [], removed: [], changed: [] });
  });
});

describe("quick entry", () => {
  const wallet = walletState([
    { id: 1, cardId: 1, nickname: "Daily driver" },
    { id: 2, cardId: 23, selectedCategories: { 77: ["Gas and EV charging stations"] } },
  ]);

  it("reads amount, category and merchant from one line", () => {
    const plan = planQuickEntry("45 dinner at nopa", {}, wallet);
    assert.equal(plan.amount, 45);
    assert.equal(plan.category, "Dining");
    assert.equal(plan.merchantName, "Nopa");
    assert.equal(plan.description, "Dinner");
    assert.equal(plan.categoryDetected, true);
  });

  it("ranks the wallet with the same pricing a saved purchase gets", () => {
    const dinner = planQuickEntry("$45 dinner", {}, wallet);
    assert.equal(dinner.options[0].label, "Daily driver");
    assert.equal(dinner.options[0].rewardRate, 0.03);
    // 3x at the catalog's 1.25 cents per point.
    assert.equal(dinner.options[0].cashbackEarned, 1.6875);

    const gas = planQuickEntry("60 shell gas", {}, wallet);
    assert.equal(gas.category, "Gas");
    // Bank of America pays its chosen 3% gas category, not the 1% base…
    const boa = gas.options.find((option) => option.walletCardId === 2);
    assert.equal(boa?.rewardRate, 0.03);
    // …and still ranks below Sapphire Preferred's 3x points worth 1.25 cents.
    assert.equal(gas.options[0].walletCardId, 1);
  });

  it("understands shorthand and merchant-only entries", () => {
    assert.equal(planQuickEntry("1.2k flight to tokyo", {}, wallet).amount, 1200);
    assert.equal(planQuickEntry("instacart 82.40", {}, wallet).category, "Online Groceries");
    const costco = planQuickEntry("$120 costco gas", {}, wallet);
    assert.equal(costco.category, "Gas");
    assert.equal(costco.merchantName, "Costco");
  });

  it("lets the user correct the category", () => {
    const plan = planQuickEntry("45 nopa", { category: "Dining" }, wallet);
    assert.equal(plan.category, "Dining");
    const unknown = planQuickEntry("45 nopa", {}, wallet);
    assert.equal(unknown.category, "Other");
    assert.equal(unknown.categoryDetected, false);
  });

  it("prices without an amount but reports no earnings", () => {
    const plan = planQuickEntry("dinner", {}, wallet);
    assert.equal(plan.amount, null);
    assert.equal(plan.options[0].cashbackEarned, null);
    assert.ok(plan.options[0].cashbackRate > 0);
  });

  it("reads Chinese entries the same way", () => {
    const coffee = planQuickEntry("星巴克咖啡 45", {}, wallet);
    assert.equal(coffee.amount, 45);
    assert.equal(coffee.category, "Dining");
    assert.equal(coffee.description, "星巴克咖啡");

    const dinner = planQuickEntry("晚饭45块", {}, wallet);
    assert.equal(dinner.amount, 45);
    assert.equal(dinner.category, "Dining");
    assert.equal(dinner.description, "晚饭");

    const gas = planQuickEntry("Costco 加油 ¥120", {}, wallet);
    assert.equal(gas.amount, 120);
    assert.equal(gas.category, "Gas");
    assert.equal(gas.merchantName, "Costco");
    // Priced like the English entry: BoA's chosen 3% gas category applies.
    const boa = gas.options.find((option) => option.walletCardId === 2);
    assert.equal(boa?.rewardRate, 0.03);

    assert.equal(planQuickEntry("外卖 30", {}, wallet).category, "Food Delivery");
    assert.equal(planQuickEntry("买菜 82.4元", {}, wallet).category, "Groceries");
  });
});
