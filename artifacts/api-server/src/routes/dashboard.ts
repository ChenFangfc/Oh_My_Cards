import { Router } from "express";
import { db } from "@workspace/db";
import {
  transactionsTable,
  walletCardsTable,
  creditCardsTable,
  cardBenefitsTable,
  benefitUsageTable,
  cashbackCategoriesTable,
} from "@workspace/db";
import { eq, sum, count, or } from "drizzle-orm";

const router = Router();

router.get("/dashboard/summary", async (req, res) => {
  const walletCards = await db.select().from(walletCardsTable);
  const walletCardIds = walletCards.map((w) => w.id);

  const [totalCashbackResult] = await db
    .select({ total: sum(transactionsTable.cashbackEarned) })
    .from(transactionsTable);

  const [totalTransactionsResult] = await db
    .select({ count: count() })
    .from(transactionsTable);

  const creditCards = await db
    .select()
    .from(creditCardsTable)
    .where(
      walletCards.length > 0
        ? or(
            ...walletCards.map((w) => eq(creditCardsTable.id, w.cardId)),
          )
        : eq(creditCardsTable.id, -1),
    );

  const totalAnnualFees = creditCards.reduce(
    (acc, c) => acc + Number(c.annualFee),
    0,
  );

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const allTransactions = await db.select().from(transactionsTable);
  const thisMonthCashback = allTransactions
    .filter((t) => t.date >= startOfMonth)
    .reduce((acc, t) => acc + Number(t.cashbackEarned), 0);

  let totalBenefitValue = 0;
  let unusedBenefitsCount = 0;

  if (walletCards.length > 0) {
    for (const wc of walletCards) {
      const benefits = await db
        .select()
        .from(cardBenefitsTable)
        .where(eq(cardBenefitsTable.cardId, wc.cardId));

      const usages = await db
        .select()
        .from(benefitUsageTable)
        .where(eq(benefitUsageTable.walletCardId, wc.id));

      const usedBenefitIds = new Set(
        usages.filter((u) => u.used).map((u) => u.benefitId),
      );

      for (const benefit of benefits) {
        totalBenefitValue += benefit.annualValue
          ? Number(benefit.annualValue)
          : 0;
        if (!usedBenefitIds.has(benefit.id)) {
          unusedBenefitsCount++;
        }
      }
    }
  }

  res.json({
    totalCashbackEarned: Number(totalCashbackResult?.total ?? 0),
    totalCardsInWallet: walletCards.length,
    totalTransactions: Number(totalTransactionsResult?.count ?? 0),
    totalAnnualFees,
    totalBenefitValue,
    unusedBenefitsCount,
    thisMonthCashback,
  });
});

router.get("/dashboard/cashback-by-category", async (req, res) => {
  const transactions = await db.select().from(transactionsTable);

  const categoryMap = new Map<
    string,
    { totalSpent: number; totalCashback: number; count: number }
  >();

  for (const t of transactions) {
    const cat = t.category;
    const existing = categoryMap.get(cat) ?? {
      totalSpent: 0,
      totalCashback: 0,
      count: 0,
    };
    existing.totalSpent += Number(t.amount);
    existing.totalCashback += Number(t.cashbackEarned);
    existing.count++;
    categoryMap.set(cat, existing);
  }

  const result = Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    totalSpent: data.totalSpent,
    totalCashback: data.totalCashback,
    transactionCount: data.count,
  }));

  res.json(result.sort((a, b) => b.totalCashback - a.totalCashback));
});

router.get("/dashboard/best-card-for-category", async (req, res) => {
  const walletCards = await db.select().from(walletCardsTable);
  const creditCards = await db.select().from(creditCardsTable);
  const allCategories = await db.select().from(cashbackCategoriesTable);

  const creditCardMap = new Map(creditCards.map((c) => [c.id, c]));

  const categoryBestMap = new Map<
    string,
    { walletCardId: number; cardName: string; cashbackRate: number }
  >();

  for (const wc of walletCards) {
    const card = creditCardMap.get(wc.cardId);
    if (!card) continue;

    const categories = allCategories.filter((c) => c.cardId === wc.cardId);

    for (const cat of categories) {
      if (cat.isDefault) continue;
      const existing = categoryBestMap.get(cat.category);
      const rate = Number(cat.rate);
      if (!existing || rate > existing.cashbackRate) {
        categoryBestMap.set(cat.category, {
          walletCardId: wc.id,
          cardName: card.name,
          cashbackRate: rate,
        });
      }
    }
  }

  const result = Array.from(categoryBestMap.entries()).map(
    ([category, data]) => ({
      category,
      walletCardId: data.walletCardId,
      cardName: data.cardName,
      cashbackRate: data.cashbackRate,
    }),
  );

  res.json(result.sort((a, b) => b.cashbackRate - a.cashbackRate));
});

router.get("/dashboard/unused-benefits", async (req, res) => {
  const walletCards = await db.select().from(walletCardsTable);
  const creditCards = await db.select().from(creditCardsTable);
  const creditCardMap = new Map(creditCards.map((c) => [c.id, c]));

  const result: Array<{
    benefitId: number;
    walletCardId: number;
    cardName: string;
    name: string;
    description: string;
    annualValue: number | null;
  }> = [];

  for (const wc of walletCards) {
    const card = creditCardMap.get(wc.cardId);
    if (!card) continue;

    const benefits = await db
      .select()
      .from(cardBenefitsTable)
      .where(eq(cardBenefitsTable.cardId, wc.cardId));

    const usages = await db
      .select()
      .from(benefitUsageTable)
      .where(eq(benefitUsageTable.walletCardId, wc.id));

    const usedBenefitIds = new Set(
      usages.filter((u) => u.used).map((u) => u.benefitId),
    );

    for (const benefit of benefits) {
      if (!usedBenefitIds.has(benefit.id)) {
        result.push({
          benefitId: benefit.id,
          walletCardId: wc.id,
          cardName: card.name,
          name: benefit.name,
          description: benefit.description,
          annualValue: benefit.annualValue ? Number(benefit.annualValue) : null,
        });
      }
    }
  }

  res.json(result);
});

// ─── Billing cycle helpers ───────────────────────────────────────────────

function daysInMonth(year: number, monthIdx: number): number {
  return new Date(year, monthIdx + 1, 0).getDate();
}

function dateOnDayOfMonth(year: number, monthIdx: number, day: number): Date {
  const last = daysInMonth(year, monthIdx);
  return new Date(year, monthIdx, Math.min(day, last));
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function dueDateForCycleEnd(cycleEnd: Date, closingDay: number, dueDay: number): Date {
  let dueMonth = cycleEnd.getMonth();
  let dueYear = cycleEnd.getFullYear();
  if (dueDay <= closingDay) {
    dueMonth += 1;
    if (dueMonth > 11) {
      dueMonth = 0;
      dueYear += 1;
    }
  }
  return dateOnDayOfMonth(dueYear, dueMonth, dueDay);
}

interface CycleInfo {
  currentCycleStart: Date;
  currentCycleEnd: Date;
  nextDueDate: Date;
  prevCycleStart: Date;
  prevCycleEnd: Date;
}

function computeBillingCycle(
  closingDay: number,
  dueDay: number,
  today: Date = new Date(),
): CycleInfo {
  const y = today.getFullYear();
  const m = today.getMonth();

  // The "current cycle" ends on the closing day in the month it falls in.
  // If today is at or before this month's closing day, the current cycle ends this month.
  // Otherwise it ends next month.
  let cycleEndYear = y;
  let cycleEndMonth = m;
  const thisMonthsClosing = dateOnDayOfMonth(y, m, closingDay);
  if (today > thisMonthsClosing) {
    cycleEndMonth = m + 1;
    if (cycleEndMonth > 11) {
      cycleEndMonth = 0;
      cycleEndYear = y + 1;
    }
  }
  const currentCycleEnd = dateOnDayOfMonth(cycleEndYear, cycleEndMonth, closingDay);
  // Cycle start = the closing day of the previous cycle + 1 day
  const prevCycleEndMonthIdx = cycleEndMonth - 1;
  const prevCycleEndDate = dateOnDayOfMonth(
    prevCycleEndMonthIdx < 0 ? cycleEndYear - 1 : cycleEndYear,
    prevCycleEndMonthIdx < 0 ? 11 : prevCycleEndMonthIdx,
    closingDay,
  );
  const currentCycleStart = new Date(prevCycleEndDate);
  currentCycleStart.setDate(currentCycleStart.getDate() + 1);

  // Previous (most recently closed) cycle = the one whose end was prevCycleEndDate
  const prevCycleEnd = prevCycleEndDate;
  // The cycle BEFORE prev ended one month before prevCycleEnd (on the same closing day).
  const prevPrevEndMonthRaw = prevCycleEnd.getMonth() - 1;
  const prevPrevEndYear =
    prevPrevEndMonthRaw < 0 ? prevCycleEnd.getFullYear() - 1 : prevCycleEnd.getFullYear();
  const prevPrevEndMonth = prevPrevEndMonthRaw < 0 ? 11 : prevPrevEndMonthRaw;
  const prevPrevEnd = dateOnDayOfMonth(prevPrevEndYear, prevPrevEndMonth, closingDay);
  const prevCycleStart = new Date(prevPrevEnd);
  prevCycleStart.setDate(prevCycleStart.getDate() + 1);

  const previousDueDate = dueDateForCycleEnd(prevCycleEnd, closingDay, dueDay);
  const previousDueHasPassed = startOfLocalDay(today) > previousDueDate;
  const activeStatementCycleStart = previousDueHasPassed
    ? currentCycleStart
    : prevCycleStart;
  const activeStatementCycleEnd = previousDueHasPassed
    ? currentCycleEnd
    : prevCycleEnd;

  return {
    currentCycleStart,
    currentCycleEnd,
    nextDueDate: dueDateForCycleEnd(activeStatementCycleEnd, closingDay, dueDay),
    prevCycleStart: activeStatementCycleStart,
    prevCycleEnd: activeStatementCycleEnd,
  };
}

router.get("/dashboard/billing-cycles", async (req, res) => {
  const walletCards = await db.select().from(walletCardsTable);
  const creditCards = await db.select().from(creditCardsTable);
  const creditCardMap = new Map(creditCards.map((c) => [c.id, c]));
  const allTx = await db.select().from(transactionsTable);

  const today = new Date();
  const result = walletCards
    .filter((wc) => wc.statementClosingDay && wc.paymentDueDay)
    .map((wc) => {
      const card = creditCardMap.get(wc.cardId);
      if (!card) return null;
      const closingDay = wc.statementClosingDay!;
      const dueDay = wc.paymentDueDay!;
      const cycle = computeBillingCycle(closingDay, dueDay, today);

      const cardTx = allTx.filter((t) => t.walletCardId === wc.id);
      const statementBalance = cardTx
        .filter((t) => t.date > cycle.prevCycleStart && t.date <= cycle.prevCycleEnd)
        .reduce((acc, t) => acc + Number(t.amount), 0);
      const currentCycleSpend = cardTx
        .filter((t) => t.date > cycle.currentCycleStart && t.date <= cycle.currentCycleEnd)
        .reduce((acc, t) => acc + Number(t.amount), 0);

      const minimumPayment =
        statementBalance <= 0
          ? 0
          : Math.min(statementBalance, Math.max(25, statementBalance * 0.02));

      const creditLimit = wc.creditLimit ? Number(wc.creditLimit) : null;
      const utilization =
        creditLimit && creditLimit > 0 ? currentCycleSpend / creditLimit : null;

      const daysUntilDue = Math.ceil(
        (cycle.nextDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      return {
        walletCardId: wc.id,
        cardName: card.name,
        nickname: wc.nickname ?? null,
        statementClosingDay: closingDay,
        paymentDueDay: dueDay,
        creditLimit,
        currentCycleStart: cycle.currentCycleStart.toISOString(),
        currentCycleEnd: cycle.currentCycleEnd.toISOString(),
        nextDueDate: cycle.nextDueDate.toISOString(),
        daysUntilDue,
        statementBalance: Number(statementBalance.toFixed(2)),
        currentCycleSpend: Number(currentCycleSpend.toFixed(2)),
        minimumPayment: Number(minimumPayment.toFixed(2)),
        utilization: utilization !== null ? Number(utilization.toFixed(4)) : null,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // Sort by soonest due date first
  result.sort((a, b) => a.daysUntilDue - b.daysUntilDue);
  res.json(result);
});

router.get("/dashboard/spending-stats", async (req, res) => {
  const walletCards = await db.select().from(walletCardsTable);
  const creditCards = await db.select().from(creditCardsTable);
  const creditCardMap = new Map(creditCards.map((c) => [c.id, c]));
  const wcMap = new Map(walletCards.map((w) => [w.id, w]));
  const allTx = await db.select().from(transactionsTable);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfQuarter = new Date(
    now.getFullYear(),
    Math.floor(now.getMonth() / 3) * 3,
    1,
  );
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  function buildPeriod(filter: (t: typeof allTx[number]) => boolean) {
    const tx = allTx.filter(filter);
    const totalSpent = tx.reduce((a, t) => a + Number(t.amount), 0);
    const totalCashback = tx.reduce((a, t) => a + Number(t.cashbackEarned), 0);

    const perCardMap = new Map<
      number,
      { totalSpent: number; totalCashback: number; transactionCount: number }
    >();
    for (const t of tx) {
      const cur = perCardMap.get(t.walletCardId) ?? {
        totalSpent: 0,
        totalCashback: 0,
        transactionCount: 0,
      };
      cur.totalSpent += Number(t.amount);
      cur.totalCashback += Number(t.cashbackEarned);
      cur.transactionCount += 1;
      perCardMap.set(t.walletCardId, cur);
    }

    const perCard = Array.from(perCardMap.entries())
      .map(([walletCardId, data]) => {
        const wc = wcMap.get(walletCardId);
        const card = wc ? creditCardMap.get(wc.cardId) : undefined;
        return {
          walletCardId,
          cardName: card?.name ?? "Unknown Card",
          totalSpent: Number(data.totalSpent.toFixed(2)),
          totalCashback: Number(data.totalCashback.toFixed(2)),
          transactionCount: data.transactionCount,
        };
      })
      .sort((a, b) => b.totalSpent - a.totalSpent);

    return {
      totalSpent: Number(totalSpent.toFixed(2)),
      totalCashback: Number(totalCashback.toFixed(2)),
      transactionCount: tx.length,
      perCard,
    };
  }

  // Monthly trend - last 12 months
  const monthlyTrend: Array<{ month: string; totalSpent: number; totalCashback: number }> = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const next = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const tx = allTx.filter((t) => t.date >= d && t.date < next);
    monthlyTrend.push({
      month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      totalSpent: Number(tx.reduce((a, t) => a + Number(t.amount), 0).toFixed(2)),
      totalCashback: Number(
        tx.reduce((a, t) => a + Number(t.cashbackEarned), 0).toFixed(2),
      ),
    });
  }

  res.json({
    thisMonth: buildPeriod((t) => t.date >= startOfMonth),
    thisQuarter: buildPeriod((t) => t.date >= startOfQuarter),
    thisYear: buildPeriod((t) => t.date >= startOfYear),
    lifetime: buildPeriod(() => true),
    monthlyTrend,
  });
});

// ─── Smart Card Suggestion ─────────────────────────────────────────────────
// Maps free-text purchase descriptions (generic or specific)
// to the best-matching cashback category, then picks the highest-rate card from
// the user's wallet AND the highest-rate card across the entire library.

type AliasEntry = { aliases: string[]; categories: string[]; weight: number };

// Order matters: more specific entries appear before generic ones so that
// "Marriott" prefers "Marriott Bonvoy Hotels" over generic "Hotels".
const ALIAS_TABLE: AliasEntry[] = [
  // Hotel co-brands (very specific)
  { aliases: ["marriott", "bonvoy", "ritz-carlton", "ritz carlton", "st. regis", "st regis"], categories: ["Marriott Bonvoy Hotels"], weight: 100 },
  { aliases: ["hilton", "conrad", "waldorf"], categories: ["Hilton Hotels"], weight: 100 },
  { aliases: ["hyatt", "andaz", "park hyatt"], categories: ["Hyatt Hotels"], weight: 100 },
  { aliases: ["ihg", "intercontinental", "holiday inn", "kimpton", "crowne plaza"], categories: ["IHG Hotels"], weight: 100 },
  { aliases: ["wyndham", "ramada", "days inn"], categories: ["Wyndham Hotels & Gas"], weight: 100 },
  // Airline co-brands
  { aliases: ["united airlines", "united flight", "ua flight"], categories: ["United Purchases"], weight: 100 },
  { aliases: ["southwest airlines", "southwest flight"], categories: ["Southwest Purchases"], weight: 100 },
  { aliases: ["delta airlines", "delta flight"], categories: ["Delta Purchases"], weight: 100 },
  { aliases: ["american airlines", "aa flight"], categories: ["American Airlines Purchases"], weight: 100 },
  { aliases: ["alaska airlines", "alaska flight"], categories: ["Alaska Airlines Purchases"], weight: 100 },
  // Apple
  { aliases: ["apple store", "ipad", "iphone", "macbook", "mac mini", "imac", "airpods", "apple tv+", "app store"], categories: ["Apple Purchases"], weight: 90 },
  { aliases: ["apple pay"], categories: ["Apple Pay Purchases"], weight: 90 },
  // Generic hotels
  { aliases: ["hotel", "airbnb", "booking.com", "expedia", "hotels.com", "lodging", "resort"], categories: ["Hotels", "Marriott Bonvoy Hotels", "Hilton Hotels", "Hyatt Hotels", "IHG Hotels"], weight: 60 },
  // Generic flights
  { aliases: ["flight", "airfare", "airline ticket", "airline", "airplane ticket"], categories: ["Airline Tickets", "Flights"], weight: 60 },
  // Travel
  { aliases: ["travel", "trip", "vacation", "tour"], categories: ["Travel"], weight: 50 },
  // Dining
  { aliases: ["restaurant", "dining", "dinner", "lunch", "brunch", "breakfast", "takeout", "delivery", "doordash", "uber eats", "grubhub", "starbucks", "chipotle", "mcdonald", "kfc", "burger", "pizza", "sushi", "ramen"], categories: ["Dining", "Restaurants"], weight: 80 },
  // Groceries
  { aliases: ["grocery", "groceries", "supermarket", "costco", "walmart", "kroger", "trader joe", "whole foods", "safeway", "publix", "wegmans", "h-mart", "h mart", "99 ranch", "asian market"], categories: ["Groceries"], weight: 80 },
  // Gas
  { aliases: ["gas", "gasoline", "fuel", "shell", "chevron", "exxon", "mobil", "bp", "76", "valero", "arco"], categories: ["Gas"], weight: 80 },
  // Streaming
  { aliases: ["streaming", "netflix", "hulu", "disney+", "disney plus", "spotify", "apple music", "apple tv+", "youtube premium", "youtube tv", "hbo", "paramount", "peacock", "max", "audible"], categories: ["Streaming"], weight: 80 },
  // Online shopping
  { aliases: ["amazon", "online shopping", "ebay", "etsy", "shein", "temu", "taobao"], categories: ["Online Shopping", "Online Retail"], weight: 70 },
  // Drugstores
  { aliases: ["drugstore", "pharmacy", "cvs", "walgreens", "rite aid"], categories: ["Drugstores"], weight: 80 },
  // Transit
  { aliases: ["uber", "lyft", "taxi", "transit", "subway ride", "metro", "bus", "train ticket", "amtrak"], categories: ["Local Transit & Commuting", "Transit", "Rideshare"], weight: 80 },
  // Rental cars
  { aliases: ["rental car", "car rental", "hertz", "avis", "enterprise", "budget rental"], categories: ["Rental Cars"], weight: 80 },
  // Gym / fitness
  { aliases: ["gym", "fitness", "equinox", "planet fitness", "lifetime fitness", "yoga", "pilates"], categories: ["Fitness Clubs & Gym Memberships"], weight: 80 },
  // Home improvement
  { aliases: ["home depot", "lowes", "lowe's", "home improvement"], categories: ["Home Improvement"], weight: 80 },
];

function detectCategory(
  description: string,
  availableCategories: Set<string>,
): { category: string; confidence: "high" | "medium" | "low" | "none" } {
  const text = description.toLowerCase().trim();
  if (!text) return { category: "Other", confidence: "none" };

  const scores = new Map<string, number>();

  for (const entry of ALIAS_TABLE) {
    for (const alias of entry.aliases) {
      if (text.includes(alias.toLowerCase())) {
        // Longer aliases score higher (more specific match).
        const matchScore = entry.weight + alias.length * 2;
        for (const cat of entry.categories) {
          if (!availableCategories.has(cat)) continue;
          scores.set(cat, Math.max(scores.get(cat) ?? 0, matchScore));
        }
      }
    }
  }

  // Also try direct category name matches against the user's text.
  for (const cat of availableCategories) {
    const lc = cat.toLowerCase();
    if (text.includes(lc) || lc.includes(text)) {
      scores.set(cat, Math.max(scores.get(cat) ?? 0, 70 + lc.length));
    }
  }

  if (scores.size === 0) {
    return { category: "Other", confidence: "none" };
  }

  let best = "";
  let bestScore = -1;
  for (const [cat, score] of scores) {
    if (score > bestScore) {
      bestScore = score;
      best = cat;
    }
  }

  const confidence =
    bestScore >= 110 ? "high" : bestScore >= 80 ? "medium" : "low";
  return { category: best, confidence };
}

router.post("/dashboard/suggest-card", async (req, res) => {
  const description: string =
    typeof req.body?.description === "string" ? req.body.description : "";
  const amount: number | null =
    req.body?.amount != null && !isNaN(Number(req.body.amount))
      ? Number(req.body.amount)
      : null;

  if (!description.trim()) {
    return res.status(400).json({ error: "description is required" });
  }

  const [walletCards, creditCards, allCategories] = await Promise.all([
    db.select().from(walletCardsTable),
    db.select().from(creditCardsTable),
    db.select().from(cashbackCategoriesTable),
  ]);

  const cardById = new Map(creditCards.map((c) => [c.id, c]));
  const walletCardByCardId = new Map(walletCards.map((w) => [w.cardId, w]));

  const availableCategories = new Set(allCategories.map((c) => c.category));
  const { category: detectedCategory, confidence } = detectCategory(
    description,
    availableCategories,
  );

  // For each card, find the rate that applies to this purchase: either the
  // matched category's rate on that card, or the card's default rate.
  type CardRate = {
    cardId: number;
    rate: number;
    matchedCategory: string;
    isDefaultRate: boolean;
  };
  const rateForCard = (cardId: number): CardRate | null => {
    const cats = allCategories.filter((c) => c.cardId === cardId);
    if (cats.length === 0) return null;
    const bonus = cats.find(
      (c) => c.category === detectedCategory && !c.isDefault,
    );
    if (bonus) {
      return {
        cardId,
        rate: Number(bonus.rate),
        matchedCategory: bonus.category,
        isDefaultRate: false,
      };
    }
    const def =
      cats.find((c) => c.isDefault) ??
      cats.reduce((a, b) => (Number(a.rate) >= Number(b.rate) ? a : b));
    return {
      cardId,
      rate: Number(def.rate),
      matchedCategory: def.category,
      isDefaultRate: true,
    };
  };

  const buildSuggested = (cr: CardRate | null) => {
    if (!cr) return null;
    const card = cardById.get(cr.cardId);
    if (!card) return null;
    const wc = walletCardByCardId.get(cr.cardId);
    return {
      cardId: card.id,
      walletCardId: wc?.id ?? null,
      cardName: card.name,
      issuer: card.issuer,
      network: card.network,
      color: card.color,
      cardImageUrl: card.cardImageUrl ?? null,
      cashbackRate: cr.rate,
      matchedCategory: cr.matchedCategory,
      isDefaultRate: cr.isDefaultRate,
      expectedCashback: amount != null ? Number((amount * cr.rate).toFixed(2)) : null,
    };
  };

  // Pick the best wallet card.
  let bestWallet: CardRate | null = null;
  for (const wc of walletCards) {
    const cr = rateForCard(wc.cardId);
    if (!cr) continue;
    if (
      !bestWallet ||
      cr.rate > bestWallet.rate ||
      (cr.rate === bestWallet.rate && !cr.isDefaultRate && bestWallet.isDefaultRate)
    ) {
      bestWallet = cr;
    }
  }

  // Pick the best card across the whole library.
  let bestOverall: CardRate | null = null;
  for (const card of creditCards) {
    const cr = rateForCard(card.id);
    if (!cr) continue;
    if (
      !bestOverall ||
      cr.rate > bestOverall.rate ||
      (cr.rate === bestOverall.rate && !cr.isDefaultRate && bestOverall.isDefaultRate)
    ) {
      bestOverall = cr;
    }
  }

  const bestWalletCard = buildSuggested(bestWallet);
  const bestOverallCard = buildSuggested(bestOverall);

  const upgradeAvailable = !!(
    bestOverallCard &&
    bestOverallCard.walletCardId == null &&
    (!bestWalletCard || bestOverallCard.cashbackRate > bestWalletCard.cashbackRate)
  );

  let reasoning: string;
  if (!bestWalletCard && !bestOverallCard) {
    reasoning = "No cards available to evaluate.";
  } else if (!bestWalletCard) {
    reasoning = `You don't have any cards in your wallet yet — consider adding ${bestOverallCard!.cardName}.`;
  } else if (confidence === "none") {
    reasoning = `Couldn't pin down a specific category, so we recommend the card with the best catch-all rate: ${bestWalletCard.cardName} at ${(bestWalletCard.cashbackRate * 100).toFixed(2)}%.`;
  } else {
    const ratePct = (bestWalletCard.cashbackRate * 100).toFixed(2);
    if (bestWalletCard.isDefaultRate) {
      reasoning = `Best card in your wallet for "${detectedCategory}" is ${bestWalletCard.cardName} using its default ${ratePct}% rate.`;
    } else {
      reasoning = `${bestWalletCard.cardName} earns ${ratePct}% on ${bestWalletCard.matchedCategory} — your best wallet option.`;
    }
    if (upgradeAvailable && bestOverallCard) {
      const upPct = (bestOverallCard.cashbackRate * 100).toFixed(2);
      reasoning += ` ${bestOverallCard.cardName} would earn ${upPct}% on ${bestOverallCard.matchedCategory}.`;
    }
  }

  res.json({
    description,
    amount,
    detectedCategory,
    matchConfidence: confidence,
    bestWalletCard,
    bestOverallCard,
    upgradeAvailable,
    reasoning,
  });
});

export default router;
