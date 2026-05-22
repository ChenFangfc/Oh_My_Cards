import { Router } from "express";
import { db } from "@workspace/db";
import {
  transactionsTable,
  walletCardsTable,
  creditCardsTable,
  cashbackCategoriesTable,
} from "@workspace/db";
import { eq, and } from "drizzle-orm";
import {
  ListTransactionsQueryParams,
  CreateTransactionBody,
  DeleteTransactionParams,
} from "@workspace/api-zod";

const router = Router();

async function getCashbackRate(
  walletCardId: number,
  category: string,
): Promise<number> {
  const [walletCard] = await db
    .select()
    .from(walletCardsTable)
    .where(eq(walletCardsTable.id, walletCardId))
    .limit(1);

  if (!walletCard) return 0;

  const categories = await db
    .select()
    .from(cashbackCategoriesTable)
    .where(eq(cashbackCategoriesTable.cardId, walletCard.cardId));

  const match = categories.find(
    (c) => c.category.toLowerCase() === category.toLowerCase() && !c.isDefault,
  );
  if (match) return Number(match.rate);

  const defaultRate = categories.find((c) => c.isDefault);
  return defaultRate ? Number(defaultRate.rate) : 0;
}

router.get("/transactions", async (req, res) => {
  const parsed = ListTransactionsQueryParams.safeParse(req.query);
  const { walletCardId, category } = parsed.success ? parsed.data : {};

  let conditions = [];
  if (walletCardId) {
    conditions.push(eq(transactionsTable.walletCardId, walletCardId));
  }
  if (category) {
    conditions.push(eq(transactionsTable.category, category));
  }

  const transactions =
    conditions.length > 0
      ? await db
          .select()
          .from(transactionsTable)
          .where(and(...conditions))
      : await db.select().from(transactionsTable);

  const walletCards = await db.select().from(walletCardsTable);
  const creditCards = await db.select().from(creditCardsTable);

  const walletCardMap = new Map(walletCards.map((w) => [w.id, w]));
  const creditCardMap = new Map(creditCards.map((c) => [c.id, c]));

  const result = transactions.map((t) => {
    const walletCard = walletCardMap.get(t.walletCardId);
    const creditCard = walletCard
      ? creditCardMap.get(walletCard.cardId)
      : undefined;
    return {
      id: t.id,
      walletCardId: t.walletCardId,
      description: t.description,
      amount: Number(t.amount),
      category: t.category,
      cashbackEarned: Number(t.cashbackEarned),
      cashbackRate: Number(t.cashbackRate),
      date: t.date.toISOString(),
      cardName: creditCard?.name ?? "Unknown Card",
      merchantName: t.merchantName ?? null,
      locationName: t.locationName ?? null,
      latitude: t.latitude !== null ? Number(t.latitude) : null,
      longitude: t.longitude !== null ? Number(t.longitude) : null,
    };
  });

  res.json(result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
});

router.post("/transactions", async (req, res) => {
  const parsed = CreateTransactionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error });
    return;
  }

  const {
    walletCardId,
    description,
    amount,
    category,
    date,
    merchantName,
    locationName,
    latitude,
    longitude,
  } = parsed.data;

  const [walletCard] = await db
    .select()
    .from(walletCardsTable)
    .where(eq(walletCardsTable.id, walletCardId))
    .limit(1);

  if (!walletCard) {
    res.status(404).json({ error: "Wallet card not found" });
    return;
  }

  const cashbackRate = await getCashbackRate(walletCardId, category);
  const cashbackEarned = amount * cashbackRate;

  const [transaction] = await db
    .insert(transactionsTable)
    .values({
      walletCardId,
      description,
      amount: amount.toString(),
      category,
      cashbackEarned: cashbackEarned.toString(),
      cashbackRate: cashbackRate.toString(),
      date: date ? new Date(date) : new Date(),
      merchantName: merchantName ?? null,
      locationName: locationName ?? null,
      latitude: latitude !== null && latitude !== undefined ? latitude.toString() : null,
      longitude: longitude !== null && longitude !== undefined ? longitude.toString() : null,
    })
    .returning();

  const [creditCard] = await db
    .select()
    .from(creditCardsTable)
    .where(eq(creditCardsTable.id, walletCard.cardId))
    .limit(1);

  res.status(201).json({
    id: transaction.id,
    walletCardId: transaction.walletCardId,
    description: transaction.description,
    amount: Number(transaction.amount),
    category: transaction.category,
    cashbackEarned: Number(transaction.cashbackEarned),
    cashbackRate: Number(transaction.cashbackRate),
    date: transaction.date.toISOString(),
    cardName: creditCard?.name ?? "Unknown Card",
    merchantName: transaction.merchantName ?? null,
    locationName: transaction.locationName ?? null,
    latitude:
      transaction.latitude !== null ? Number(transaction.latitude) : null,
    longitude:
      transaction.longitude !== null ? Number(transaction.longitude) : null,
  });
});

router.delete("/transactions/:id", async (req, res) => {
  const parsed = DeleteTransactionParams.safeParse(req.params);
  const id = parsed.success ? parsed.data.id : Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid transaction ID" });
    return;
  }

  const [existing] = await db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.id, id))
    .limit(1);

  if (!existing) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }

  await db.delete(transactionsTable).where(eq(transactionsTable.id, id));
  res.status(204).send();
});

export default router;
