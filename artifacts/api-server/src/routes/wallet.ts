import { Router } from "express";
import { db } from "@workspace/db";
import {
  walletCardsTable,
  creditCardsTable,
  cashbackCategoriesTable,
  cardBenefitsTable,
  transactionsTable,
  benefitUsageTable,
} from "@workspace/db";
import { eq, sum, and, gte } from "drizzle-orm";
import { AddToWalletBody, UpdateWalletCardBody } from "@workspace/api-zod";

const router = Router();

async function buildWalletCard(
  walletCard: typeof walletCardsTable.$inferSelect,
) {
  const [card] = await db
    .select()
    .from(creditCardsTable)
    .where(eq(creditCardsTable.id, walletCard.cardId))
    .limit(1);

  if (!card) throw new Error(`Card ${walletCard.cardId} not found`);

  const [categories, benefits] = await Promise.all([
    db
      .select()
      .from(cashbackCategoriesTable)
      .where(eq(cashbackCategoriesTable.cardId, card.id)),
    db
      .select()
      .from(cardBenefitsTable)
      .where(eq(cardBenefitsTable.cardId, card.id)),
  ]);

  const [cashbackResult] = await db
    .select({ total: sum(transactionsTable.cashbackEarned) })
    .from(transactionsTable)
    .where(eq(transactionsTable.walletCardId, walletCard.id));

  const totalCashbackEarned = Number(cashbackResult?.total ?? 0);

  // Compute the start of the current annual-fee cycle: the most recent
  // anniversary of openedAt (falling back to addedAt if not set).
  const anchor = walletCard.openedAt ?? walletCard.addedAt;
  const now = new Date();
  const anchorMonth = anchor.getMonth();
  const anchorDay = anchor.getDate();
  // Clamp to last day of target month so Feb 29 anchors don't roll into March
  // in non-leap years, and Jan 31 anchors don't roll into March in February.
  const clampDay = (year: number, month: number, day: number) => {
    const last = new Date(year, month + 1, 0).getDate();
    return Math.min(day, last);
  };
  const cycleStart = new Date(
    now.getFullYear(),
    anchorMonth,
    clampDay(now.getFullYear(), anchorMonth, anchorDay),
    0,
    0,
    0,
    0,
  );
  if (cycleStart > now) {
    const prevYear = cycleStart.getFullYear() - 1;
    cycleStart.setFullYear(prevYear);
    cycleStart.setDate(clampDay(prevYear, anchorMonth, anchorDay));
  }

  const [yearResult] = await db
    .select({ total: sum(transactionsTable.cashbackEarned) })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.walletCardId, walletCard.id),
        gte(transactionsTable.date, cycleStart),
      ),
    );

  const currentYearCashback = Number(yearResult?.total ?? 0);

  return {
    id: walletCard.id,
    cardId: walletCard.cardId,
    addedAt: walletCard.addedAt.toISOString(),
    totalCashbackEarned,
    currentYearCashback,
    nickname: walletCard.nickname ?? null,
    statementClosingDay: walletCard.statementClosingDay ?? null,
    paymentDueDay: walletCard.paymentDueDay ?? null,
    creditLimit: walletCard.creditLimit ? Number(walletCard.creditLimit) : null,
    openedAt: walletCard.openedAt ? walletCard.openedAt.toISOString() : null,
    card: {
      id: card.id,
      name: card.name,
      issuer: card.issuer,
      network: card.network,
      annualFee: Number(card.annualFee),
      signupBonus: card.signupBonus ?? null,
      signupBonusValue: card.signupBonusValue
        ? Number(card.signupBonusValue)
        : null,
      color: card.color,
      cashbackCategories: categories.map((c) => ({
        id: c.id,
        cardId: c.cardId,
        category: c.category,
        rate: Number(c.rate),
        isDefault: c.isDefault,
      })),
      benefits: benefits.map((b) => ({
        id: b.id,
        cardId: b.cardId,
        name: b.name,
        description: b.description,
        annualValue: b.annualValue ? Number(b.annualValue) : null,
      })),
      inWallet: true,
    },
  };
}

router.get("/wallet", async (req, res) => {
  const walletCards = await db.select().from(walletCardsTable);
  const result = await Promise.all(walletCards.map(buildWalletCard));
  res.json(result);
});

router.post("/wallet", async (req, res) => {
  const parsed = AddToWalletBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { cardId } = parsed.data;

  const [existingCard] = await db
    .select()
    .from(creditCardsTable)
    .where(eq(creditCardsTable.id, cardId))
    .limit(1);

  if (!existingCard) {
    res.status(404).json({ error: "Card not found" });
    return;
  }

  const [existing] = await db
    .select()
    .from(walletCardsTable)
    .where(eq(walletCardsTable.cardId, cardId))
    .limit(1);

  if (existing) {
    res.status(409).json({ error: "Card already in wallet" });
    return;
  }

  const [walletCard] = await db
    .insert(walletCardsTable)
    .values({ cardId })
    .returning();

  res.status(201).json(await buildWalletCard(walletCard));
});

router.patch("/wallet/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid wallet card ID" });
    return;
  }

  const parsed = UpdateWalletCardBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error });
    return;
  }

  const [existing] = await db
    .select()
    .from(walletCardsTable)
    .where(eq(walletCardsTable.id, id))
    .limit(1);

  if (!existing) {
    res.status(404).json({ error: "Wallet card not found" });
    return;
  }

  const updates: Record<string, unknown> = {};
  const body = parsed.data;
  if ("nickname" in body) updates.nickname = body.nickname ?? null;
  if ("statementClosingDay" in body) {
    const v = body.statementClosingDay;
    if (v !== null && v !== undefined && (v < 1 || v > 31)) {
      res.status(400).json({ error: "statementClosingDay must be between 1 and 31" });
      return;
    }
    updates.statementClosingDay = v ?? null;
  }
  if ("paymentDueDay" in body) {
    const v = body.paymentDueDay;
    if (v !== null && v !== undefined && (v < 1 || v > 31)) {
      res.status(400).json({ error: "paymentDueDay must be between 1 and 31" });
      return;
    }
    updates.paymentDueDay = v ?? null;
  }
  if ("creditLimit" in body) {
    const v = body.creditLimit;
    if (v !== null && v !== undefined && (!Number.isFinite(v) || v < 0)) {
      res.status(400).json({ error: "creditLimit must be a non-negative number" });
      return;
    }
    updates.creditLimit =
      v === null || v === undefined ? null : v.toString();
  }
  if ("openedAt" in body) {
    const v = body.openedAt;
    if (v === null || v === undefined) {
      updates.openedAt = null;
    } else {
      const d = new Date(v);
      if (isNaN(d.getTime())) {
        res.status(400).json({ error: "openedAt must be a valid date" });
        return;
      }
      updates.openedAt = d;
    }
  }

  const [updated] = await db
    .update(walletCardsTable)
    .set(updates)
    .where(eq(walletCardsTable.id, id))
    .returning();

  res.json(await buildWalletCard(updated));
});

router.delete("/wallet/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid wallet card ID" });
    return;
  }

  const [existing] = await db
    .select()
    .from(walletCardsTable)
    .where(eq(walletCardsTable.id, id))
    .limit(1);

  if (!existing) {
    res.status(404).json({ error: "Wallet card not found" });
    return;
  }

  await db.delete(walletCardsTable).where(eq(walletCardsTable.id, id));
  res.status(204).send();
});

export default router;
