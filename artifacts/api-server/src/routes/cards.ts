import { Router } from "express";
import { db } from "@workspace/db";
import {
  creditCardsTable,
  cashbackCategoriesTable,
  cardBenefitsTable,
  walletCardsTable,
} from "@workspace/db";
import { eq, ilike, or } from "drizzle-orm";
import { ListCardsQueryParams } from "@workspace/api-zod";

const router = Router();

async function buildCard(
  card: typeof creditCardsTable.$inferSelect,
  walletCardIds: Set<number>,
) {
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

  return {
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
    logoUrl: card.logoUrl ?? null,
    cardImageUrl: card.cardImageUrl ?? null,
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
    inWallet: walletCardIds.has(card.id),
  };
}

router.get("/cards", async (req, res) => {
  const parsed = ListCardsQueryParams.safeParse(req.query);
  const { search, category } = parsed.success ? parsed.data : {};

  let query = db.select().from(creditCardsTable).$dynamic();
  if (search) {
    query = query.where(
      or(
        ilike(creditCardsTable.name, `%${search}%`),
        ilike(creditCardsTable.issuer, `%${search}%`),
      ),
    );
  }

  const cards = await query;
  const walletCards = await db.select().from(walletCardsTable);
  const walletCardIdSet = new Set(walletCards.map((w) => w.cardId));

  let results = await Promise.all(
    cards.map((card) => buildCard(card, walletCardIdSet)),
  );

  if (category) {
    results = results.filter((c) =>
      c.cashbackCategories.some(
        (cat) => cat.category.toLowerCase() === category.toLowerCase(),
      ),
    );
  }

  res.json(results);
});

router.get("/cards/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid card ID" });
    return;
  }

  const [card] = await db
    .select()
    .from(creditCardsTable)
    .where(eq(creditCardsTable.id, id))
    .limit(1);

  if (!card) {
    res.status(404).json({ error: "Card not found" });
    return;
  }

  const walletCards = await db.select().from(walletCardsTable);
  const walletCardIdSet = new Set(walletCards.map((w) => w.cardId));

  res.json(await buildCard(card, walletCardIdSet));
});

export default router;
