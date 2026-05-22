import {
  pgTable,
  serial,
  text,
  numeric,
  boolean,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const networkEnum = pgEnum("network", [
  "Visa",
  "Mastercard",
  "Amex",
  "Discover",
]);

export const creditCardsTable = pgTable("credit_cards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  network: networkEnum("network").notNull(),
  annualFee: numeric("annual_fee", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  signupBonus: text("signup_bonus"),
  signupBonusValue: numeric("signup_bonus_value", { precision: 10, scale: 2 }),
  color: text("color").notNull().default("linear-gradient(135deg, #1e3a5f, #2d6a9f)"),
  logoUrl: text("logo_url"),
  cardImageUrl: text("card_image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cashbackCategoriesTable = pgTable("cashback_categories", {
  id: serial("id").primaryKey(),
  cardId: integer("card_id")
    .notNull()
    .references(() => creditCardsTable.id, { onDelete: "cascade" }),
  category: text("category").notNull(),
  rate: numeric("rate", { precision: 5, scale: 4 }).notNull(),
  isDefault: boolean("is_default").notNull().default(false),
});

export const cardBenefitsTable = pgTable("card_benefits", {
  id: serial("id").primaryKey(),
  cardId: integer("card_id")
    .notNull()
    .references(() => creditCardsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  annualValue: numeric("annual_value", { precision: 10, scale: 2 }),
});

export const walletCardsTable = pgTable("wallet_cards", {
  id: serial("id").primaryKey(),
  cardId: integer("card_id")
    .notNull()
    .references(() => creditCardsTable.id, { onDelete: "cascade" }),
  addedAt: timestamp("added_at").notNull().defaultNow(),
  nickname: text("nickname"),
  statementClosingDay: integer("statement_closing_day"),
  paymentDueDay: integer("payment_due_day"),
  creditLimit: numeric("credit_limit", { precision: 10, scale: 2 }),
  openedAt: timestamp("opened_at"),
});

export const transactionsTable = pgTable("transactions", {
  id: serial("id").primaryKey(),
  walletCardId: integer("wallet_card_id")
    .notNull()
    .references(() => walletCardsTable.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  cashbackEarned: numeric("cashback_earned", { precision: 10, scale: 4 }).notNull(),
  cashbackRate: numeric("cashback_rate", { precision: 5, scale: 4 }).notNull(),
  date: timestamp("date").notNull().defaultNow(),
  merchantName: text("merchant_name"),
  locationName: text("location_name"),
  latitude: numeric("latitude", { precision: 9, scale: 6 }),
  longitude: numeric("longitude", { precision: 9, scale: 6 }),
});

export const benefitUsageTable = pgTable("benefit_usage", {
  id: serial("id").primaryKey(),
  walletCardId: integer("wallet_card_id")
    .notNull()
    .references(() => walletCardsTable.id, { onDelete: "cascade" }),
  benefitId: integer("benefit_id")
    .notNull()
    .references(() => cardBenefitsTable.id, { onDelete: "cascade" }),
  used: boolean("used").notNull().default(false),
  usedAt: timestamp("used_at"),
});

export const insertCreditCardSchema = createInsertSchema(creditCardsTable).omit(
  { id: true, createdAt: true },
);
export const insertCashbackCategorySchema = createInsertSchema(
  cashbackCategoriesTable,
).omit({ id: true });
export const insertCardBenefitSchema = createInsertSchema(
  cardBenefitsTable,
).omit({ id: true });
export const insertWalletCardSchema = createInsertSchema(
  walletCardsTable,
).omit({ id: true, addedAt: true });
export const insertTransactionSchema = createInsertSchema(
  transactionsTable,
).omit({ id: true });
export const insertBenefitUsageSchema = createInsertSchema(
  benefitUsageTable,
).omit({ id: true });

export type CreditCard = typeof creditCardsTable.$inferSelect;
export type InsertCreditCard = z.infer<typeof insertCreditCardSchema>;
export type CashbackCategory = typeof cashbackCategoriesTable.$inferSelect;
export type CardBenefit = typeof cardBenefitsTable.$inferSelect;
export type WalletCard = typeof walletCardsTable.$inferSelect;
export type InsertWalletCard = z.infer<typeof insertWalletCardSchema>;
export type Transaction = typeof transactionsTable.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type BenefitUsage = typeof benefitUsageTable.$inferSelect;
