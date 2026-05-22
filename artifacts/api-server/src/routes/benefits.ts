import { Router } from "express";
import { db } from "@workspace/db";
import {
  benefitUsageTable,
  cardBenefitsTable,
  walletCardsTable,
} from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router = Router();

async function ensureBenefitUsageRows(walletCardId: number) {
  const [walletCard] = await db
    .select()
    .from(walletCardsTable)
    .where(eq(walletCardsTable.id, walletCardId))
    .limit(1);

  if (!walletCard) return;

  const benefits = await db
    .select()
    .from(cardBenefitsTable)
    .where(eq(cardBenefitsTable.cardId, walletCard.cardId));

  const existingUsage = await db
    .select()
    .from(benefitUsageTable)
    .where(eq(benefitUsageTable.walletCardId, walletCardId));

  const existingBenefitIds = new Set(existingUsage.map((u) => u.benefitId));

  const missing = benefits.filter((b) => !existingBenefitIds.has(b.id));
  if (missing.length > 0) {
    await db.insert(benefitUsageTable).values(
      missing.map((b) => ({
        walletCardId,
        benefitId: b.id,
        used: false,
      })),
    );
  }
}

router.get("/wallet/:id/benefits", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid wallet card ID" });
    return;
  }

  await ensureBenefitUsageRows(id);

  const usages = await db
    .select()
    .from(benefitUsageTable)
    .where(eq(benefitUsageTable.walletCardId, id));

  const benefits = await db.select().from(cardBenefitsTable);
  const benefitMap = new Map(benefits.map((b) => [b.id, b]));

  const result = usages.map((u) => {
    const benefit = benefitMap.get(u.benefitId);
    return {
      benefitId: u.benefitId,
      walletCardId: u.walletCardId,
      name: benefit?.name ?? "Unknown Benefit",
      description: benefit?.description ?? "",
      annualValue: benefit?.annualValue ? Number(benefit.annualValue) : null,
      used: u.used,
      usedAt: u.usedAt ? u.usedAt.toISOString() : null,
    };
  });

  res.json(result);
});

router.post("/wallet/:id/benefits/:benefitId/use", async (req, res) => {
  const walletCardId = Number(req.params.id);
  const benefitId = Number(req.params.benefitId);

  if (isNaN(walletCardId) || isNaN(benefitId)) {
    res.status(400).json({ error: "Invalid IDs" });
    return;
  }

  await ensureBenefitUsageRows(walletCardId);

  const [usage] = await db
    .update(benefitUsageTable)
    .set({ used: true, usedAt: new Date() })
    .where(
      and(
        eq(benefitUsageTable.walletCardId, walletCardId),
        eq(benefitUsageTable.benefitId, benefitId),
      ),
    )
    .returning();

  if (!usage) {
    res.status(404).json({ error: "Benefit usage not found" });
    return;
  }

  const [benefit] = await db
    .select()
    .from(cardBenefitsTable)
    .where(eq(cardBenefitsTable.id, benefitId))
    .limit(1);

  res.json({
    benefitId: usage.benefitId,
    walletCardId: usage.walletCardId,
    name: benefit?.name ?? "Unknown",
    description: benefit?.description ?? "",
    annualValue: benefit?.annualValue ? Number(benefit.annualValue) : null,
    used: usage.used,
    usedAt: usage.usedAt ? usage.usedAt.toISOString() : null,
  });
});

router.post("/wallet/:id/benefits/:benefitId/unuse", async (req, res) => {
  const walletCardId = Number(req.params.id);
  const benefitId = Number(req.params.benefitId);

  if (isNaN(walletCardId) || isNaN(benefitId)) {
    res.status(400).json({ error: "Invalid IDs" });
    return;
  }

  const [usage] = await db
    .update(benefitUsageTable)
    .set({ used: false, usedAt: null })
    .where(
      and(
        eq(benefitUsageTable.walletCardId, walletCardId),
        eq(benefitUsageTable.benefitId, benefitId),
      ),
    )
    .returning();

  if (!usage) {
    res.status(404).json({ error: "Benefit usage not found" });
    return;
  }

  const [benefit] = await db
    .select()
    .from(cardBenefitsTable)
    .where(eq(cardBenefitsTable.id, benefitId))
    .limit(1);

  res.json({
    benefitId: usage.benefitId,
    walletCardId: usage.walletCardId,
    name: benefit?.name ?? "Unknown",
    description: benefit?.description ?? "",
    annualValue: benefit?.annualValue ? Number(benefit.annualValue) : null,
    used: usage.used,
    usedAt: usage.usedAt ? usage.usedAt.toISOString() : null,
  });
});

export default router;
