import { useMutation, useQuery } from "@tanstack/react-query";
import { BUILTIN_CARDS, BUILTIN_RULESET_VERSION } from "./catalog";
import { CreditCardNetwork } from "../generated/api.schemas";
import type {
  AddToWalletBody,
  BenefitUsage,
  CardCategoryChoice,
  CardCategoryChoiceReset,
  CashbackCategory,
  BestCardForCategory,
  BillingCycle,
  CardSuggestion,
  CategoryCashback,
  CreateTransactionBody,
  CreditCard,
  DashboardSummary,
  ListCardsParams,
  ListTransactionsParams,
  PurchaseContext,
  SpendingStats,
  SpendingStatsPeriod,
  SuggestedCard,
  Transaction,
  UnusedBenefit,
  UpdateWalletCardBody,
  WalletCard,
} from "../generated/api.schemas";

const STORAGE_KEY = "oh-my-card:local-state:v1";
const STORAGE_DB_NAME = "oh-my-cards-local-data";
const STORAGE_DB_VERSION = 1;
const STORAGE_STORE_NAME = "state";
const STORAGE_RECORD_KEY = "primary";
const BACKUP_APP_NAME = "Oh My Cards";
const BACKUP_FORMAT_VERSION = 1;

export interface LocalWalletCard {
  id: number;
  cardId: number;
  addedAt: string;
  nickname?: string | null;
  statementClosingDay?: number | null;
  paymentDueDay?: number | null;
  creditLimit?: number | null;
  openedAt?: string | null;
  /**
   * Chosen options for the card's selectable bonus categories, keyed by the
   * `cashbackCategories` row id they fill in.
   */
  selectedCategories?: Record<number, string[]> | null;
}

export interface LocalBenefitUsage {
  walletCardId: number;
  benefitId: number;
  used: boolean;
  usedAt?: string | null;
}

export interface LocalState {
  schemaVersion: 1;
  ruleSetVersion: string;
  catalogOverride?: {
    version: string;
    cards: CreditCard[];
    notes?: string;
    publishedAt?: string;
  } | null;
  nextWalletCardId: number;
  nextTransactionId: number;
  walletCards: LocalWalletCard[];
  transactions: Transaction[];
  benefitUsage: LocalBenefitUsage[];
}

export interface LocalDataBackup {
  app: typeof BACKUP_APP_NAME;
  formatVersion: typeof BACKUP_FORMAT_VERSION;
  exportedAt: string;
  ruleSetVersion: string;
  state: LocalState;
}

export interface LocalDataStorageSummary {
  storageKey: string;
  databaseName: string;
  ruleSetVersion: string;
  walletCardCount: number;
  transactionCount: number;
  benefitUsageCount: number;
  usedBenefitCount: number;
  hasCatalogOverride: boolean;
}

const queryKeys = {
  health: ["local", "health"] as const,
  cards: (params?: ListCardsParams) =>
    ["local", "cards", params ?? {}] as const,
  card: (id: number) => ["local", "card", id] as const,
  wallet: ["local", "wallet"] as const,
  transactions: (params?: ListTransactionsParams) =>
    ["local", "transactions", params ?? {}] as const,
  benefits: (id: number) => ["local", "benefits", id] as const,
  summary: ["local", "dashboard", "summary"] as const,
  cashbackByCategory: ["local", "dashboard", "cashback-by-category"] as const,
  bestCardForCategory: [
    "local",
    "dashboard",
    "best-card-for-category",
  ] as const,
  billingCycles: ["local", "dashboard", "billing-cycles"] as const,
  spendingStats: ["local", "dashboard", "spending-stats"] as const,
  unusedBenefits: ["local", "dashboard", "unused-benefits"] as const,
  usedBenefits: ["local", "dashboard", "used-benefits"] as const,
};

export const getHealthCheckQueryKey = () => queryKeys.health;
export const getListCardsQueryKey = (params?: ListCardsParams) =>
  queryKeys.cards(params);
export const getGetCardQueryKey = (id: number) => queryKeys.card(id);
export const getListWalletQueryKey = () => queryKeys.wallet;
export const getListTransactionsQueryKey = (params?: ListTransactionsParams) =>
  queryKeys.transactions(params);
export const getListCardBenefitsQueryKey = (id: number) =>
  queryKeys.benefits(id);
export const getGetDashboardSummaryQueryKey = () => queryKeys.summary;
export const getGetCashbackByCategoryQueryKey = () =>
  queryKeys.cashbackByCategory;
export const getGetBestCardForCategoryQueryKey = () =>
  queryKeys.bestCardForCategory;
export const getGetBillingCyclesQueryKey = () => queryKeys.billingCycles;
export const getGetSpendingStatsQueryKey = () => queryKeys.spendingStats;
export const getGetUnusedBenefitsQueryKey = () => queryKeys.unusedBenefits;
export const getGetUsedBenefitsQueryKey = () => queryKeys.usedBenefits;

function defaultState(): LocalState {
  return {
    schemaVersion: 1,
    ruleSetVersion: BUILTIN_RULESET_VERSION,
    nextWalletCardId: 1,
    nextTransactionId: 1,
    walletCards: [],
    transactions: [],
    benefitUsage: [],
  };
}

function canUseLocalStorage(): boolean {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

function canUseIndexedDb(): boolean {
  return (
    typeof window !== "undefined" && typeof window.indexedDB !== "undefined"
  );
}

function toFiniteNumber(value: unknown, fallback = 0): number {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toNullableFiniteNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeDayOfMonth(value: unknown): number | null {
  const number = toNullableFiniteNumber(value);
  if (number === null) return null;
  const day = Math.trunc(number);
  return day >= 1 && day <= 31 ? day : null;
}

function matchesWalletCardId(
  record: { walletCardId?: unknown },
  walletCardId: number,
): boolean {
  return toFiniteNumber(record.walletCardId, -1) === walletCardId;
}

function normalizeWalletCardRecord(
  value: Partial<LocalWalletCard>,
): LocalWalletCard | null {
  const id = toFiniteNumber(value.id, -1);
  const cardId = toFiniteNumber(value.cardId, -1);
  if (id <= 0 || cardId <= 0) return null;

  const addedAt = value.addedAt ? new Date(value.addedAt) : new Date();

  return {
    id,
    cardId,
    addedAt: Number.isNaN(addedAt.getTime())
      ? new Date().toISOString()
      : addedAt.toISOString(),
    nickname: toTrimmedString(value.nickname) || null,
    statementClosingDay: normalizeDayOfMonth(value.statementClosingDay),
    paymentDueDay: normalizeDayOfMonth(value.paymentDueDay),
    creditLimit: toNullableFiniteNumber(value.creditLimit),
    openedAt: toTrimmedString(value.openedAt) || null,
    selectedCategories: normalizeSelectedCategories(value.selectedCategories),
  };
}

function normalizeSelectedCategories(
  value: unknown,
): Record<number, string[]> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const normalized: Record<number, string[]> = {};
  for (const [key, options] of Object.entries(value)) {
    const categoryId = Number(key);
    if (!Number.isInteger(categoryId) || categoryId <= 0) continue;
    if (!Array.isArray(options)) continue;

    const cleaned = [
      ...new Set(
        options
          .map((option) => toTrimmedString(option))
          .filter((option) => option.length > 0),
      ),
    ];
    if (cleaned.length) normalized[categoryId] = cleaned;
  }

  return Object.keys(normalized).length ? normalized : null;
}

function normalizeTransactionRecord(value: Partial<Transaction>): Transaction {
  const date = value.date ? new Date(value.date) : new Date();
  const transactionType =
    value.transactionType === "payment" ? "payment" : "purchase";
  const rawCategory = toTrimmedString(value.category);
  const category =
    rawCategory || (transactionType === "payment" ? "Payment" : "Other");
  const rawDescription = toTrimmedString(value.description);

  return {
    id: toFiniteNumber(value.id),
    walletCardId: toFiniteNumber(value.walletCardId, -1),
    transactionType,
    description:
      rawDescription || (transactionType === "payment" ? "Payment" : category),
    amount: toFiniteNumber(value.amount),
    category,
    cashbackEarned: toFiniteNumber(value.cashbackEarned),
    cashbackRate: toFiniteNumber(value.cashbackRate),
    date: Number.isNaN(date.getTime())
      ? new Date().toISOString()
      : date.toISOString(),
    cardName: value.cardName,
    merchantName: value.merchantName ?? null,
    locationName: value.locationName ?? null,
    latitude: value.latitude ?? null,
    longitude: value.longitude ?? null,
  };
}

function normalizeBenefitUsageRecord(
  value: Partial<LocalBenefitUsage>,
): LocalBenefitUsage | null {
  const walletCardId = toFiniteNumber(value.walletCardId, -1);
  const benefitId = toFiniteNumber(value.benefitId, -1);
  if (walletCardId <= 0 || benefitId <= 0) return null;

  return {
    walletCardId,
    benefitId,
    used: Boolean(value.used),
    usedAt: toTrimmedString(value.usedAt) || null,
  };
}

function normalizeLocalState(parsed: Partial<LocalState>): LocalState {
  const walletCards = Array.isArray(parsed.walletCards)
    ? parsed.walletCards
        .map((walletCard) => normalizeWalletCardRecord(walletCard))
        .filter(
          (walletCard): walletCard is LocalWalletCard => walletCard !== null,
        )
    : [];
  const rawTransactions = Array.isArray(parsed.transactions)
    ? parsed.transactions
        .map((transaction) => normalizeTransactionRecord(transaction))
        .filter((transaction) => transaction.walletCardId > 0)
    : [];

  // Ids address a transaction for deletion, so duplicates (or the 0 that a
  // record with no id normalizes to) would make one delete remove several.
  const usedTransactionIds = new Set<number>();
  let nextFreeTransactionId =
    rawTransactions.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  const transactions = rawTransactions.map((transaction) => {
    if (transaction.id > 0 && !usedTransactionIds.has(transaction.id)) {
      usedTransactionIds.add(transaction.id);
      return transaction;
    }
    const id = nextFreeTransactionId;
    nextFreeTransactionId += 1;
    usedTransactionIds.add(id);
    return { ...transaction, id };
  });
  const benefitUsage = Array.isArray(parsed.benefitUsage)
    ? parsed.benefitUsage
        .map((usage) => normalizeBenefitUsageRecord(usage))
        .filter((usage): usage is LocalBenefitUsage => usage !== null)
    : [];
  const nextWalletCardId = Math.max(
    toFiniteNumber(parsed.nextWalletCardId, 1),
    walletCards.reduce((max, walletCard) => Math.max(max, walletCard.id), 0) +
      1,
  );
  const nextTransactionId = Math.max(
    toFiniteNumber(parsed.nextTransactionId, 1),
    transactions.reduce(
      (max, transaction) => Math.max(max, transaction.id),
      0,
    ) + 1,
  );

  return {
    ...defaultState(),
    ...parsed,
    schemaVersion: 1,
    ruleSetVersion: parsed.ruleSetVersion ?? BUILTIN_RULESET_VERSION,
    nextWalletCardId,
    nextTransactionId,
    walletCards,
    transactions,
    benefitUsage,
    catalogOverride: normalizeCatalogOverride(parsed.catalogOverride),
  };
}

/**
 * A stored override replaces the entire catalog, so a corrupted or hand-edited
 * one would crash every page that prices a card. Anything that does not survive
 * normalization is dropped in favour of the built-in rules.
 */
function normalizeCatalogOverride(
  override: LocalState["catalogOverride"],
): LocalState["catalogOverride"] {
  if (!override?.version || !Array.isArray(override.cards)) return null;

  try {
    const cards = normalizeRemoteCatalog(override.cards);
    return cards.length ? { ...override, cards } : null;
  } catch {
    return null;
  }
}

function openLocalDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!canUseIndexedDb()) {
      reject(new Error("IndexedDB is not available."));
      return;
    }

    const request = window.indexedDB.open(STORAGE_DB_NAME, STORAGE_DB_VERSION);
    request.onerror = () => {
      reject(request.error ?? new Error("Could not open local data store."));
    };
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORAGE_STORE_NAME)) {
        db.createObjectStore(STORAGE_STORE_NAME);
      }
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

async function readIndexedDbState(): Promise<LocalState | null> {
  if (!canUseIndexedDb()) return null;

  const db = await openLocalDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORAGE_STORE_NAME, "readonly");
    const store = transaction.objectStore(STORAGE_STORE_NAME);
    const request = store.get(STORAGE_RECORD_KEY);

    request.onerror = () => {
      db.close();
      reject(request.error ?? new Error("Could not read local data store."));
    };
    request.onsuccess = () => {
      db.close();
      const value = request.result as Partial<LocalState> | undefined;
      if (!value || value.schemaVersion !== 1) {
        resolve(null);
        return;
      }
      resolve(normalizeLocalState(value));
    };
  });
}

async function writeIndexedDbState(state: LocalState): Promise<void> {
  if (!canUseIndexedDb()) return;

  const db = await openLocalDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORAGE_STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORAGE_STORE_NAME);
    const request = store.put(state, STORAGE_RECORD_KEY);

    request.onerror = () => {
      db.close();
      reject(request.error ?? new Error("Could not write local data store."));
    };
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(
        transaction.error ?? new Error("Could not commit local data store."),
      );
    };
  });
}

function queueIndexedDbWrite(state: LocalState): void {
  void writeIndexedDbState(state).catch(() => {
    // localStorage remains the synchronous source of truth for this session.
  });
}

function readLocalStorageState(): LocalState | null {
  if (!canUseLocalStorage()) return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<LocalState>;
    if (parsed.schemaVersion !== 1) return null;
    return normalizeLocalState(parsed);
  } catch {
    return null;
  }
}

/**
 * Last state this tab wrote, used only when no storage backend is readable.
 *
 * Reads have to be synchronous because every query hook is synchronous, but
 * neither backend is guaranteed: private-mode Safari throws on localStorage
 * writes, and IndexedDB is async. This fallback keeps such a session usable
 * instead of silently discarding every mutation while reporting success.
 *
 * It is deliberately NOT a cache in front of localStorage. Serving it ahead of
 * storage made a second tab keep its boot-time snapshot forever, so its next
 * write clobbered everything the first tab had saved in between.
 */
let lastWrittenState: LocalState | null = null;

/** Set when a write could not reach any durable backend. */
let persistenceFailure: string | null = null;

export function getPersistenceFailure(): string | null {
  return persistenceFailure;
}

function readState(): LocalState {
  return readLocalStorageState() ?? lastWrittenState ?? defaultState();
}

function writeState(state: LocalState): void {
  const normalized = normalizeLocalState(state);
  lastWrittenState = normalized;

  let storedSomewhere = false;

  if (canUseLocalStorage()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      storedSomewhere = true;
      persistenceFailure = null;
    } catch (error) {
      // Quota is the common case. IndexedDB has a far larger budget, so the
      // write below may still succeed — do not bail out here.
      persistenceFailure =
        error instanceof Error && error.name === "QuotaExceededError"
          ? "Browser storage is full. Export a backup and remove old transactions."
          : "This browser blocked local storage. Data will not survive a reload.";
    }
  }

  if (canUseIndexedDb()) {
    queueIndexedDbWrite(normalized);
    storedSomewhere = true;
  }

  if (!storedSomewhere) {
    persistenceFailure =
      "No browser storage is available. Data will be lost when this tab closes.";
  }
}

async function requestPersistentBrowserStorage(): Promise<void> {
  if (typeof navigator === "undefined" || !navigator.storage?.persist) return;

  try {
    await navigator.storage.persist();
  } catch {
    // Persistence is a browser-level best effort; backups remain the durable fallback.
  }
}

/**
 * Hydrates the in-memory state before the first render.
 *
 * This runs on the boot path, so it must never reject and never hang: a
 * rejected promise here leaves a blank page, and an IndexedDB request that
 * never settles (a blocked upgrade, a suspended tab) does the same.
 */
export async function initializeLocalDataStore(): Promise<void> {
  try {
    const localStorageState = readLocalStorageState();
    if (localStorageState) {
      lastWrittenState = localStorageState;
    } else {
      const indexedDbState = await withTimeout(readIndexedDbState(), 3_000);
      if (indexedDbState) {
        lastWrittenState = indexedDbState;
        try {
          window.localStorage?.setItem(
            STORAGE_KEY,
            JSON.stringify(indexedDbState),
          );
        } catch {
          // Mirroring back is an optimisation, not a requirement.
        }
      }
    }

    await withTimeout(requestPersistentBrowserStorage(), 3_000);
    await withTimeout(writeIndexedDbState(readState()), 3_000);
  } catch {
    // Rendering with an empty wallet beats not rendering at all.
  }
}

async function withTimeout<T>(
  work: Promise<T>,
  ms: number,
): Promise<T | null> {
  return Promise.race([
    work,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]).catch(() => null);
}

export function createLocalDataBackup(): LocalDataBackup {
  const state = readState();
  return {
    app: BACKUP_APP_NAME,
    formatVersion: BACKUP_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    ruleSetVersion: getCurrentRuleSetVersion(),
    state,
  };
}

export function serializeLocalDataBackup(): string {
  return `${JSON.stringify(createLocalDataBackup(), null, 2)}\n`;
}

export function importLocalDataBackup(
  input: string | LocalDataBackup,
): LocalDataBackup {
  let backup: LocalDataBackup;

  if (typeof input === "string") {
    try {
      backup = JSON.parse(input) as LocalDataBackup;
    } catch {
      throw new Error("Backup file is not valid JSON.");
    }
  } else {
    backup = input;
  }

  if (
    backup.app !== BACKUP_APP_NAME ||
    backup.formatVersion !== BACKUP_FORMAT_VERSION
  ) {
    throw new Error("Backup file is not compatible with Oh My Cards.");
  }
  if (!backup.state || backup.state.schemaVersion !== 1) {
    throw new Error("Backup file is missing a valid local state.");
  }

  const state = normalizeLocalState(backup.state);
  writeState(state);

  return {
    ...backup,
    state,
  };
}

export function getLocalDataStorageSummary(): LocalDataStorageSummary {
  const state = readState();
  return {
    storageKey: STORAGE_KEY,
    databaseName: STORAGE_DB_NAME,
    ruleSetVersion: getCurrentRuleSetVersion(),
    walletCardCount: state.walletCards.length,
    transactionCount: state.transactions.length,
    benefitUsageCount: state.benefitUsage.length,
    usedBenefitCount: state.benefitUsage.filter((usage) => usage.used).length,
    hasCatalogOverride: Boolean(getCatalogOverride(state)),
  };
}

function compareRuleSetVersions(left: string, right: string): number {
  const leftParts = left.split(/[.-]/).map((part) => Number(part));
  const rightParts = right.split(/[.-]/).map((part) => Number(part));
  const length = Math.max(leftParts.length, rightParts.length);

  for (let index = 0; index < length; index += 1) {
    const leftValue = Number.isFinite(leftParts[index]) ? leftParts[index] : 0;
    const rightValue = Number.isFinite(rightParts[index])
      ? rightParts[index]
      : 0;
    if (leftValue !== rightValue) return leftValue - rightValue;
  }

  return 0;
}

function getCatalogOverride(
  state = readState(),
): LocalState["catalogOverride"] {
  const override = state.catalogOverride;
  if (!override?.cards?.length) return null;
  return compareRuleSetVersions(override.version, BUILTIN_RULESET_VERSION) >= 0
    ? override
    : null;
}

function getCatalog(): CreditCard[] {
  const state = readState();
  const walletCardIds = new Set(state.walletCards.map((w) => w.cardId));
  const catalog = getCatalogOverride(state)?.cards ?? BUILTIN_CARDS;
  return catalog.map((card) => ({
    ...card,
    inWallet: walletCardIds.has(card.id),
  }));
}

export interface CardRulesManifest {
  version: string;
  url: string;
  notes?: string;
  publishedAt?: string;
  /** sha256 of the rules payload, as published by `cards:publish`. */
  sha256?: string;
}

export interface CardRulesUpdateResult {
  updated: boolean;
  version: string;
  notes?: string;
}

export function getCurrentRuleSetVersion(): string {
  return getCatalogOverride()?.version ?? BUILTIN_RULESET_VERSION;
}

/** Exposed for tests: this is the one place a published ruleset can lose data. */
export function normalizeRemoteCatalogForTests(value: unknown): CreditCard[] {
  return normalizeRemoteCatalog(value);
}

function normalizeRemoteCatalog(value: unknown): CreditCard[] {
  const cards = Array.isArray(value)
    ? value
    : Array.isArray((value as { cards?: unknown })?.cards)
      ? (value as { cards: unknown[] }).cards
      : null;

  if (!cards)
    throw new Error("Card rules response must contain a cards array.");

  return cards.map((card, index) => {
    const candidate = card as Partial<CreditCard>;
    const metadata = card as {
      market?: unknown;
      currency?: unknown;
      sourceUrl?: unknown;
      imageSourceUrl?: unknown;
      lastReviewedAt?: unknown;
      dataConfidence?: unknown;
    };
    if (!candidate.name || !candidate.issuer || !candidate.network) {
      throw new Error(`Card at index ${index} is missing required fields.`);
    }
    if (!Array.isArray(candidate.cashbackCategories)) {
      throw new Error(`Card ${candidate.name} is missing cashback categories.`);
    }
    if (!Array.isArray(candidate.benefits)) {
      throw new Error(`Card ${candidate.name} is missing benefits.`);
    }

    const cardId = candidate.id ?? index + 1;

    // Spread first, then coerce. Rebuilding from a fixed field list silently
    // dropped every field added since it was written — rewardUnitValueCents,
    // rewardType, categoryChoices — which would corrupt rates and disable
    // choice categories the moment a published ruleset was applied.
    return {
      ...candidate,
      ...metadata,
      id: cardId,
      name: candidate.name,
      issuer: candidate.issuer,
      network: candidate.network,
      annualFee: Number(candidate.annualFee ?? 0),
      signupBonus: candidate.signupBonus ?? null,
      signupBonusValue:
        candidate.signupBonusValue == null
          ? null
          : Number(candidate.signupBonusValue),
      color: candidate.color ?? "linear-gradient(135deg, #1e3a5f, #2d6a9f)",
      logoUrl: candidate.logoUrl ?? null,
      cardImageUrl: candidate.cardImageUrl ?? null,
      rewardUnitValueCents:
        candidate.rewardUnitValueCents == null
          ? null
          : Number(candidate.rewardUnitValueCents),
      cashbackCategories: candidate.cashbackCategories.map(
        (category, catIndex) => ({
          id: category.id ?? catIndex + 1,
          cardId: category.cardId ?? cardId,
          category: category.category,
          rate: Number(category.rate),
          isDefault: Boolean(category.isDefault),
        }),
      ),
      benefits: candidate.benefits.map((benefit, benefitIndex) => ({
        id: benefit.id ?? benefitIndex + 1,
        cardId: benefit.cardId ?? cardId,
        name: benefit.name,
        description: benefit.description,
        annualValue:
          benefit.annualValue == null ? null : Number(benefit.annualValue),
      })),
      categoryChoices: Array.isArray(candidate.categoryChoices)
        ? candidate.categoryChoices.filter(
            (choice) =>
              typeof choice?.categoryId === "number" &&
              Array.isArray(choice.options),
          )
        : undefined,
      inWallet: false,
    } as CreditCard;
  });
}

async function sha256Hex(value: string): Promise<string | null> {
  if (typeof crypto === "undefined" || !crypto.subtle) return null;

  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function checkForCardRulesUpdate(
  manifestUrl: string,
): Promise<CardRulesUpdateResult> {
  const manifestResponse = await fetch(manifestUrl, { cache: "no-store" });
  if (!manifestResponse.ok) {
    throw new Error(
      `Could not fetch card rules manifest: ${manifestResponse.status}`,
    );
  }

  const manifest = (await manifestResponse.json()) as CardRulesManifest;
  if (!manifest.version || !manifest.url) {
    throw new Error("Card rules manifest must include version and url.");
  }

  const currentVersion = getCurrentRuleSetVersion();
  // Only ever move forward. An older manifest — stale CDN copy, rolled-back
  // deploy — must not downgrade rules the app already has.
  if (compareRuleSetVersions(manifest.version, currentVersion) <= 0) {
    return { updated: false, version: currentVersion };
  }

  const pageUrl =
    typeof window !== "undefined" ? window.location.href : undefined;
  const manifestOrigin = new URL(manifestUrl, pageUrl).origin;
  const rulesUrl = new URL(manifest.url, new URL(manifestUrl, pageUrl));
  // The payload replaces every reward rule in the app, so it has to come from
  // the same origin as the manifest that vouched for it.
  if (rulesUrl.origin !== manifestOrigin) {
    throw new Error("Card rules must be served from the manifest's origin.");
  }

  const rulesResponse = await fetch(rulesUrl.toString(), { cache: "no-store" });
  if (!rulesResponse.ok) {
    throw new Error(`Could not fetch card rules: ${rulesResponse.status}`);
  }

  const body = await rulesResponse.text();
  if (manifest.sha256) {
    const digest = await sha256Hex(body);
    if (digest && digest !== manifest.sha256) {
      throw new Error("Card rules failed their integrity check.");
    }
  }

  const cards = normalizeRemoteCatalog(JSON.parse(body));
  if (!cards.length) throw new Error("Card rules contained no cards.");

  const state = readState();
  writeState({
    ...state,
    ruleSetVersion: manifest.version,
    catalogOverride: {
      version: manifest.version,
      notes: manifest.notes,
      publishedAt: manifest.publishedAt,
      cards,
    },
  });

  return {
    updated: true,
    version: manifest.version,
    notes: manifest.notes,
  };
}

function getCard(cardId: number): CreditCard | undefined {
  return getCatalog().find((card) => card.id === cardId);
}

function sortByDateDesc(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * The categories a logged transaction can carry.
 *
 * Every entry must be resolvable by `getCategoryTags`, because that is how a
 * transaction is matched to a card's bonus category. Adding a label here only
 * helps if the catalog actually prices that kind of spend.
 */
export const TRANSACTION_CATEGORIES = [
  "Groceries",
  "Online Groceries",
  "Warehouse Clubs",
  "Dining",
  "Food Delivery",
  "Gas",
  "EV Charging",
  "Transit",
  "Rideshare",
  "Travel",
  "Flights",
  "Hotels",
  "Rental Cars",
  "Entertainment",
  "Streaming",
  "Drugstores",
  "Home Improvement",
  "Office Supplies",
  "Phone and Internet",
  "Utilities",
  "Online Retail",
  "Advertising",
  "Shipping",
  "Rent",
  "Fitness",
  "Other",
] as const;

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

/**
 * Tags describing *what* was bought. A catalog category and a transaction have
 * to agree on at least one of these before any bonus rate can apply.
 */
const SUBJECT_TAGS = new Set([
  "grocery",
  "dining",
  "food_delivery",
  "gas",
  "ev_charging",
  "transit",
  "rideshare",
  "travel",
  "airfare",
  "hotel",
  "rental_car",
  "entertainment",
  "streaming",
  "drugstore",
  "home_improvement",
  "office_supplies",
  "phone",
  "utilities",
  "online_retail",
  "advertising",
  "shipping",
  "rent",
  "fitness",
  "warehouse_club",
]);

/**
 * Tags that narrow a bonus to a channel, merchant or brand. A plain logged
 * transaction says nothing about any of these, so a catalog category carrying
 * one it did not ask for must not win — "10x hotels via Capital One Travel"
 * cannot be assumed for a hotel stay booked anywhere else.
 *
 */
const NARROWING_TAGS = new Set([
  "travel_portal",
  "chase_travel",
  "capital_one_travel",
  "amex_travel",
  "citi_travel",
  "travel_center",
  "renowned_hotels",
  "ota",
  "expedia_group",
  "online",
  "mobile_wallet",
  "apple_pay",
  "foreign",
  "business",
  "amazon",
  "whole_foods",
  "walmart",
  "target",
  "apple",
  "nike",
  "ace_hardware",
  "booking_com",
  "paypal",
  "verizon",
  "uber",
  "lyft",
  "marriott",
  "hilton",
  "hyatt",
  "ihg",
  "wyndham",
  "choice",
  "united",
  "delta",
  "american_airlines",
  "southwest",
  "alaska",
  "hawaiian",
  "jetblue",
  "air_canada",
  "cathay",
  "citi_nights",
]);

/**
 * `getCategoryTags` adds the umbrella `travel` tag alongside the specific one,
 * so "Flights booked direct" and "Hotels" both carry it. Treating that as an
 * ordinary shared subject would let a flights-only bonus pay out on a hotel
 * stay, so travel is matched through {@link travelSubjectsOverlap} instead.
 */
const TRAVEL_SUBTYPE_TAGS = new Set(["airfare", "hotel", "rental_car"]);

function partitionTags(tags: string[]): {
  subjects: Set<string>;
  narrowing: Set<string>;
} {
  const subjects = new Set<string>();
  const narrowing = new Set<string>();

  for (const tag of tags) {
    if (SUBJECT_TAGS.has(tag)) subjects.add(tag);
    if (NARROWING_TAGS.has(tag)) narrowing.add(tag);
  }

  return { subjects, narrowing };
}

function hasTravelSubtype(subjects: Set<string>): boolean {
  return [...TRAVEL_SUBTYPE_TAGS].some((tag) => subjects.has(tag));
}

/**
 * A bonus written as plain "Travel" covers every kind of trip, but one written
 * as "Flights" covers only flights — and a transaction logged as plain "Travel"
 * cannot be assumed to be either.
 */
function travelSubjectsOverlap(
  category: Set<string>,
  transaction: Set<string>,
): boolean {
  const categorySubtypes = hasTravelSubtype(category);
  const transactionSubtypes = hasTravelSubtype(transaction);

  if (categorySubtypes && transactionSubtypes) {
    return [...TRAVEL_SUBTYPE_TAGS].some(
      (tag) => category.has(tag) && transaction.has(tag),
    );
  }

  // Generic on the category side is a wildcard; generic on the transaction side
  // is an unknown, and an unknown must not claim a narrower bonus.
  if (!categorySubtypes && category.has("travel")) {
    return transactionSubtypes || transaction.has("travel");
  }

  return false;
}

/**
 * Decides whether a card's bonus category covers a logged transaction.
 *
 * The catalog writes categories the way issuers do — "Groceries (US
 * supermarkets, up to $6,000/yr)", "Restaurants worldwide", "Flights and
 * Hotels" — so comparing those strings to a transaction's category by equality
 * matched almost nothing and silently paid the default rate instead. Matching
 * on derived tags is what makes those categories reachable.
 */
function categoryCovers(
  categoryLabel: string,
  transactionLabel: string,
): boolean {
  const category = partitionTags(getCategoryTags(categoryLabel));
  const transaction = partitionTags(getCategoryTags(transactionLabel));

  if (!category.subjects.size || !transaction.subjects.size) return false;

  const sharesNonTravelSubject = [...category.subjects].some(
    (tag) =>
      tag !== "travel" &&
      !TRAVEL_SUBTYPE_TAGS.has(tag) &&
      transaction.subjects.has(tag),
  );

  if (
    !sharesNonTravelSubject &&
    !travelSubjectsOverlap(category.subjects, transaction.subjects)
  ) {
    return false;
  }

  // A category naming both a portal and direct booking covers either channel,
  // so its portal tags stop being a restriction.
  const coversAnyChannel = getCategoryTags(categoryLabel).includes(
    "direct_booking",
  );

  return [...category.narrowing].every((tag) => {
    if (coversAnyChannel && PORTAL_TAGS.includes(tag)) return true;
    if (coversAnyChannel && tag === "travel_portal") return true;
    return transaction.narrowing.has(tag);
  });
}

/**
 * Picks the best-paying bonus category on `card` for a transaction, falling
 * back to the card's default category.
 *
 * Ties break toward the more specific category (more matched subject tags) so
 * that "Online Groceries" beats a plain grocery bonus for an online order at
 * equal rates.
 */
/**
 * What a choice-bearing category needs in order to be resolvable.
 *
 * Without it — the card library, a card the user does not hold — a category
 * like "Choice Category" cannot be known to apply, so it is skipped rather
 * than credited.
 */
export interface CategoryChoiceContext {
  walletCard?: LocalWalletCard | null;
  state?: LocalState;
  onDate?: Date;
  /** The purchase being priced, which counts toward an automatic choice. */
  pending?: { category: string; amount: number };
}

function choicePeriodStart(
  reset: CardCategoryChoiceReset,
  onDate: Date,
  walletCard?: LocalWalletCard | null,
): Date {
  if (reset === "month") {
    return new Date(onDate.getFullYear(), onDate.getMonth(), 1);
  }
  if (reset === "quarter") return getQuarterStart(onDate);
  if (reset === "year") return new Date(onDate.getFullYear(), 0, 1);
  if (reset === "anniversary" && walletCard) {
    return cycleStartForAnnualFee(walletCard, onDate);
  }
  return new Date(0);
}

/**
 * Works out which options are currently earning the bonus.
 *
 * For a user-selected choice that is whatever the cardholder saved. For an
 * automatic one the issuer applies the bonus to the eligible categories you
 * spent the most in, which the app can derive from its own transaction log —
 * including the purchase being priced right now, since that spend counts too.
 */
function getActiveChoiceOptions(
  choice: CardCategoryChoice,
  context: CategoryChoiceContext,
): string[] {
  const { walletCard, state } = context;
  if (!walletCard) return [];

  if (choice.mode !== "automatic-top-spend") {
    const selected = walletCard.selectedCategories?.[choice.categoryId] ?? [];
    return selected.filter((option) => choice.options.includes(option));
  }

  if (!state) return [];

  const onDate = context.onDate ?? new Date();
  const periodStart = choicePeriodStart(choice.resets, onDate, walletCard);
  const totals = new Map<string, number>();

  const credit = (label: string, amount: number) => {
    for (const option of choice.options) {
      if (!categoryCovers(option, label)) continue;
      totals.set(option, (totals.get(option) ?? 0) + amount);
    }
  };

  for (const transaction of state.transactions) {
    if (!matchesWalletCardId(transaction, walletCard.id)) continue;
    if (!isPurchaseTransaction(transaction)) continue;
    if (!isInLocalDateRange(transaction.date, periodStart, onDate)) continue;
    credit(transaction.category, transaction.amount);
  }
  if (context.pending) {
    credit(context.pending.category, context.pending.amount);
  }

  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, Math.max(1, choice.picks))
    .map(([option]) => option);
}

/** The options a card's choice row is currently earning on, for display. */
export function getChoiceCategoryState(
  card: CreditCard,
  context: CategoryChoiceContext,
): Array<{ choice: CardCategoryChoice; active: string[] }> {
  return (card.categoryChoices ?? []).map((choice) => ({
    choice,
    active: getActiveChoiceOptions(choice, context),
  }));
}

export function resolveCashbackCategory(
  card: CreditCard,
  category: string,
  context: CategoryChoiceContext = {},
) {
  return getCashbackCategory(card, category, context);
}

function getCashbackCategory(
  card: CreditCard,
  category: string,
  context: CategoryChoiceContext = {},
) {
  const fallback = card.cashbackCategories.find((c) => c.isDefault) ?? null;
  const label = category.trim();
  if (!label) return fallback;

  const choicesByCategoryId = new Map(
    (card.categoryChoices ?? []).map((choice) => [choice.categoryId, choice]),
  );

  /**
   * A choice row's own name ("Choice Category") describes no spend, so it can
   * only match through whichever options are currently active.
   */
  const rowApplies = (row: CashbackCategory): boolean => {
    const choice = choicesByCategoryId.get(row.id);
    if (!choice) return categoryCovers(row.category, label);

    return getActiveChoiceOptions(choice, context).some((option) =>
      categoryCovers(option, label),
    );
  };

  const exact = card.cashbackCategories.find(
    (c) =>
      c.category.toLowerCase() === label.toLowerCase() &&
      !c.isDefault &&
      !choicesByCategoryId.has(c.id),
  );
  if (exact) return exact;

  const transactionSubjects = partitionTags(getCategoryTags(label)).subjects;

  const candidates = card.cashbackCategories
    .filter((c) => !c.isDefault && rowApplies(c))
    .map((c) => {
      const subjects = partitionTags(getCategoryTags(c.category)).subjects;
      const overlap = [...subjects].filter((tag) =>
        transactionSubjects.has(tag),
      ).length;
      return { category: c, overlap };
    })
    .sort(
      (a, b) =>
        b.category.rate - a.category.rate ||
        b.overlap - a.overlap ||
        a.category.category.localeCompare(b.category.category),
    );

  const best = candidates[0]?.category;
  if (!best) return fallback;

  // A "bonus" that pays no better than the default is not a bonus, and
  // treating it as one would wrongly subject the spend to that row's cap.
  if (fallback && best.rate <= fallback.rate) return fallback;

  return best;
}

function getCashbackRate(cardId: number, category: string): number {
  const card = getCard(cardId);
  if (!card) return 0;

  return getCashbackCategory(card, category)?.rate ?? 0;
}

function getRewardUnitValueMultiplier(card: CreditCard): number {
  const valueCents = card.rewardUnitValueCents ?? 1;
  return valueCents > 0 ? valueCents : 1;
}

interface ParsedSpendCap {
  amount: number;
  period: "month" | "quarter" | "year";
}

function parseSpendCap(category: string): ParsedSpendCap | null {
  const normalized = category.toLowerCase();
  const match = normalized.match(
    /(?:up to|first)\s+\$([0-9,]+)\s*(?:\/|\s+per\s+)?(month|monthly|quarter|quarterly|yr|year|annual|annually)/,
  );
  if (!match) return null;

  const amount = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) return null;

  const rawPeriod = match[2];
  const period = rawPeriod.startsWith("month")
    ? "month"
    : rawPeriod.startsWith("quarter")
      ? "quarter"
      : "year";

  return { amount, period };
}

function spendCapPeriodStart(
  date: Date,
  period: ParsedSpendCap["period"],
): Date {
  if (period === "month") {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  if (period === "quarter") {
    return getQuarterStart(date);
  }
  return new Date(date.getFullYear(), 0, 1);
}

function normalizeCapGroup(category: string, cap: ParsedSpendCap): string {
  const normalized = category.toLowerCase();
  const hasSharedCapLanguage =
    normalized.includes("combined") ||
    normalized.includes("with ") ||
    normalized.includes("two chosen");

  if (hasSharedCapLanguage) {
    if (normalized.includes("two chosen")) {
      return `${cap.period}:${cap.amount}:two-chosen`;
    }
    if (
      cap.amount >= 100000 &&
      /(advertising|shipping|travel|internet|cable|phone)/.test(normalized)
    ) {
      return `${cap.period}:${cap.amount}:business-bonus`;
    }
    if (/(office|internet|cable|phone|telecom)/.test(normalized)) {
      return `${cap.period}:${cap.amount}:office-telecom`;
    }
    if (/(ev charging|eligible gas|costco gas)/.test(normalized)) {
      return `${cap.period}:${cap.amount}:fuel-ev`;
    }
    if (
      /(gas|restaurant|dining|grocery|groceries|supermarket|wholesale)/.test(
        normalized,
      )
    ) {
      return `${cap.period}:${cap.amount}:everyday`;
    }
    return `${cap.period}:${cap.amount}:combined`;
  }
  return `${cap.period}:${cap.amount}:${normalized.replace(/\([^)]*\)/g, "").trim()}`;
}

function transactionMatchesSpendCapGroup(
  card: CreditCard,
  transaction: Transaction,
  capGroup: string,
  context: CategoryChoiceContext = {},
): boolean {
  const category = getCashbackCategory(card, transaction.category, context);
  const cap = category ? parseSpendCap(category.category) : null;
  if (!category || !cap) return false;
  return normalizeCapGroup(category.category, cap) === capGroup;
}

function isPaymentTransaction(transaction: Transaction): boolean {
  return (
    transaction.transactionType === "payment" ||
    transaction.category.toLowerCase() === "payment"
  );
}

function isPurchaseTransaction(transaction: Transaction): boolean {
  return !isPaymentTransaction(transaction);
}

function getQuarterStart(date: Date): Date {
  return new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 1);
}

function calculateCashback(
  state: LocalState,
  walletCard: LocalWalletCard,
  card: CreditCard,
  data: CreateTransactionBody,
  transactionDate: Date,
): { cashbackEarned: number; cashbackRate: number } {
  if (!Number.isFinite(data.amount) || data.amount <= 0) {
    return { cashbackEarned: 0, cashbackRate: 0 };
  }

  const choiceContext: CategoryChoiceContext = {
    walletCard,
    state,
    onDate: transactionDate,
    pending: { category: data.category, amount: data.amount },
  };
  const matchedCategory = getCashbackCategory(
    card,
    data.category,
    choiceContext,
  );
  const defaultCategory = getDefaultCategory(card);
  const cashbackRate = matchedCategory?.rate ?? defaultCategory?.rate ?? 0;
  const spendCap = matchedCategory
    ? parseSpendCap(matchedCategory.category)
    : null;
  const unitValueMultiplier = getRewardUnitValueMultiplier(card);
  const baseRate = defaultCategory?.rate ?? 0;

  if (matchedCategory && spendCap && cashbackRate > baseRate) {
    const periodStart = spendCapPeriodStart(transactionDate, spendCap.period);
    const capGroup = normalizeCapGroup(matchedCategory.category, spendCap);
    const cappedSpendUsed = state.transactions
      .filter(
        (transaction) =>
          matchesWalletCardId(transaction, walletCard.id) &&
          isPurchaseTransaction(transaction) &&
          isInLocalDateRange(transaction.date, periodStart, transactionDate) &&
          transactionMatchesSpendCapGroup(
            card,
            transaction,
            capGroup,
            choiceContext,
          ),
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const capRemaining = Math.max(0, spendCap.amount - cappedSpendUsed);
    const bonusAmount = Math.min(data.amount, capRemaining);
    const baseAmount = data.amount - bonusAmount;
    // Spend past the cap drops to the card's own default rate, which is 2% on
    // cards like Citi Double Cash — not a universal 1%.
    const rawReward = bonusAmount * cashbackRate + baseAmount * baseRate;
    const cashbackEarned = Number((rawReward * unitValueMultiplier).toFixed(4));

    return {
      cashbackEarned,
      cashbackRate: Number((cashbackEarned / data.amount).toFixed(4)),
    };
  }

  const effectiveCashbackRate = cashbackRate * unitValueMultiplier;
  return {
    cashbackRate: Number(effectiveCashbackRate.toFixed(4)),
    cashbackEarned: Number((data.amount * effectiveCashbackRate).toFixed(4)),
  };
}

/**
 * A bare `YYYY-MM-DD` parses as UTC midnight, which reads back as the previous
 * day everywhere west of Greenwich. Reading the calendar fields directly keeps
 * an anniversary on the date the user typed, in every timezone.
 */
function parseCalendarDate(value: string): Date {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return new Date(value);

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function cycleStartForAnnualFee(
  walletCard: LocalWalletCard,
  today = new Date(),
): Date {
  const anchor = parseCalendarDate(walletCard.openedAt ?? walletCard.addedAt);
  if (Number.isNaN(anchor.getTime())) return startOfLocalDay(today);

  const anchorMonth = anchor.getMonth();
  const anchorDay = anchor.getDate();

  // `dateOnDayOfMonth` clamps into the target month, so a Feb 29 anniversary
  // lands on Feb 28 in a common year rather than rolling into March.
  let cycleStart = dateOnDayOfMonth(
    today.getFullYear(),
    anchorMonth,
    anchorDay,
  );
  if (cycleStart > startOfLocalDay(today)) {
    cycleStart = dateOnDayOfMonth(
      today.getFullYear() - 1,
      anchorMonth,
      anchorDay,
    );
  }
  return cycleStart;
}

/**
 * Stands in for a card the active catalog no longer contains — a discontinued
 * product, or a rules update that dropped the row. Without it, one unresolvable
 * wallet entry threw and rendered the entire wallet as empty.
 */
function placeholderCard(cardId: number): CreditCard {
  return {
    id: cardId,
    name: "Unavailable card",
    issuer: "Unknown",
    network: CreditCardNetwork.Visa,
    annualFee: 0,
    signupBonus: null,
    signupBonusValue: null,
    color: "linear-gradient(135deg, #4b5563, #6b7280)",
    logoUrl: null,
    cardImageUrl: null,
    cashbackCategories: [],
    benefits: [],
    inWallet: true,
    rewardRuleNotes: [
      "This card is not in the current card rules, so its rewards cannot be calculated. Your transactions and settings for it are unchanged.",
    ],
  } as CreditCard;
}

function buildWalletCard(
  walletCard: LocalWalletCard,
  state = readState(),
): WalletCard {
  const card = getCard(walletCard.cardId) ?? placeholderCard(walletCard.cardId);

  const cardTransactions = state.transactions.filter((t) =>
    matchesWalletCardId(t, walletCard.id),
  );
  const totalCashbackEarned = cardTransactions.reduce(
    (sum, t) => sum + t.cashbackEarned,
    0,
  );
  const currentYearStart = cycleStartForAnnualFee(walletCard);
  const currentYearCashback = cardTransactions
    .filter((t) => isOnOrAfterLocalDate(t.date, currentYearStart))
    .reduce((sum, t) => sum + t.cashbackEarned, 0);

  const activeChoiceCategories: Record<number, string[]> = {};
  for (const { choice, active } of getChoiceCategoryState(card, {
    walletCard,
    state,
  })) {
    activeChoiceCategories[choice.categoryId] = active;
  }

  return {
    ...walletCard,
    totalCashbackEarned,
    currentYearCashback,
    activeChoiceCategories,
    card: { ...card, inWallet: true },
  };
}

/**
 * Wallet cards denominated in the currency most of the wallet uses.
 *
 * Benefit values cannot be summed across currencies, so the dashboard totals
 * and the benefit lists must both narrow to the same population or the count
 * on the tile will not match the list behind it.
 */
function inDominantCurrency(walletCards: WalletCard[]): WalletCard[] {
  const counts = new Map<string, number>();
  for (const walletCard of walletCards) {
    const currency = getCardCurrency(walletCard.card) ?? "USD";
    counts.set(currency, (counts.get(currency) ?? 0) + 1);
  }

  const dominant =
    [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "USD";
  return walletCards.filter(
    (walletCard) => (getCardCurrency(walletCard.card) ?? "USD") === dominant,
  );
}

function listWalletCards(state = readState()): WalletCard[] {
  return state.walletCards.map((walletCard) =>
    buildWalletCard(walletCard, state),
  );
}

function ensureBenefitUsageRows(
  state: LocalState,
  walletCardId: number,
): LocalBenefitUsage[] {
  const walletCard = state.walletCards.find((w) => w.id === walletCardId);
  if (!walletCard) return state.benefitUsage;

  const card = getCard(walletCard.cardId);
  if (!card) return state.benefitUsage;

  const existing = new Set(
    state.benefitUsage
      .filter((u) => u.walletCardId === walletCardId)
      .map((u) => u.benefitId),
  );

  const missing = card.benefits
    .filter((benefit) => !existing.has(benefit.id))
    .map((benefit) => ({
      walletCardId,
      benefitId: benefit.id,
      used: false,
      usedAt: null,
    }));

  return missing.length > 0
    ? [...state.benefitUsage, ...missing]
    : state.benefitUsage;
}

/**
 * Whether a benefit counts as used *in the current benefit year*.
 *
 * Card benefits are annual allowances that reset on the account anniversary.
 * Treating the stored `used` flag as permanent made every credit vanish from
 * the unused list the first time it was claimed and never come back.
 */
function isBenefitUsedThisYear(
  usage: LocalBenefitUsage,
  walletCard: LocalWalletCard | undefined,
): boolean {
  if (!usage.used) return false;
  if (!walletCard) return usage.used;
  if (!usage.usedAt) return true;

  return isOnOrAfterLocalDate(usage.usedAt, cycleStartForAnnualFee(walletCard));
}

function buildBenefitUsage(
  usage: LocalBenefitUsage,
  state = readState(),
): BenefitUsage {
  const walletCard = state.walletCards.find((w) => w.id === usage.walletCardId);
  const benefit = getCard(walletCard?.cardId ?? -1)?.benefits.find(
    (b) => b.id === usage.benefitId,
  );
  const used = isBenefitUsedThisYear(usage, walletCard);

  return {
    benefitId: usage.benefitId,
    walletCardId: usage.walletCardId,
    name: benefit?.name ?? "Unknown Benefit",
    description: benefit?.description ?? "",
    annualValue: benefit?.annualValue ?? null,
    used,
    usedAt: used ? (usage.usedAt ?? null) : null,
  };
}

export function useHealthCheck() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: async () => ({ status: "ok" }),
  });
}

export function useListCards(params?: ListCardsParams) {
  return useQuery({
    queryKey: queryKeys.cards(params),
    queryFn: async () => {
      let cards = getCatalog();

      if (params?.search) {
        const search = params.search.toLowerCase();
        cards = cards.filter(
          (card) =>
            card.name.toLowerCase().includes(search) ||
            card.issuer.toLowerCase().includes(search),
        );
      }

      if (params?.category) {
        const category = params.category.toLowerCase();
        cards = cards.filter((card) =>
          card.cashbackCategories.some(
            (cashback) => cashback.category.toLowerCase() === category,
          ),
        );
      }

      return cards;
    },
  });
}

export function useGetCard(id: number) {
  return useQuery({
    queryKey: queryKeys.card(id),
    queryFn: async () => {
      const card = getCard(id);
      if (!card) throw new Error("Card not found");
      return card;
    },
  });
}

export function useListWallet() {
  return useQuery({
    queryKey: queryKeys.wallet,
    queryFn: async () => listWalletCards(),
  });
}

export const useAddToWallet = () =>
  useMutation({
    mutationFn: async ({ data }: { data: AddToWalletBody }) => {
      const state = readState();
      if (!getCard(data.cardId)) throw new Error("Card not found");
      if (state.walletCards.some((w) => w.cardId === data.cardId)) {
        throw new Error("Card already in wallet");
      }

      const walletCard: LocalWalletCard = {
        id: state.nextWalletCardId,
        cardId: data.cardId,
        addedAt: new Date().toISOString(),
        nickname: null,
        statementClosingDay: null,
        paymentDueDay: null,
        creditLimit: null,
        openedAt: null,
      };

      writeState({
        ...state,
        nextWalletCardId: state.nextWalletCardId + 1,
        walletCards: [...state.walletCards, walletCard],
      });

      return buildWalletCard(walletCard);
    },
  });

export const useUpdateWalletCard = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateWalletCardBody;
    }) => {
      const state = readState();
      const existing = state.walletCards.find((w) => w.id === id);
      if (!existing) throw new Error("Wallet card not found");

      const next: LocalWalletCard = {
        ...existing,
        ...data,
        nickname:
          "nickname" in data ? (data.nickname ?? null) : existing.nickname,
        statementClosingDay:
          "statementClosingDay" in data
            ? (data.statementClosingDay ?? null)
            : existing.statementClosingDay,
        paymentDueDay:
          "paymentDueDay" in data
            ? (data.paymentDueDay ?? null)
            : existing.paymentDueDay,
        creditLimit:
          "creditLimit" in data
            ? (data.creditLimit ?? null)
            : existing.creditLimit,
        openedAt:
          "openedAt" in data ? (data.openedAt ?? null) : existing.openedAt,
        selectedCategories:
          "selectedCategories" in data
            ? normalizeSelectedCategories(data.selectedCategories)
            : existing.selectedCategories,
      };

      if (
        next.statementClosingDay != null &&
        (next.statementClosingDay < 1 || next.statementClosingDay > 31)
      ) {
        throw new Error("statementClosingDay must be between 1 and 31");
      }
      if (
        next.paymentDueDay != null &&
        (next.paymentDueDay < 1 || next.paymentDueDay > 31)
      ) {
        throw new Error("paymentDueDay must be between 1 and 31");
      }
      if (next.creditLimit != null && next.creditLimit < 0) {
        throw new Error("creditLimit must be a non-negative number");
      }

      // Only a changed choice selection affects pricing, and only from the
      // start of the period it applies to — a rename or a credit-limit edit
      // must not touch recorded cashback at all.
      const choiceChanged =
        JSON.stringify(existing.selectedCategories ?? null) !==
        JSON.stringify(next.selectedCategories ?? null);

      const withCard = {
        ...state,
        walletCards: state.walletCards.map((w) => (w.id === id ? next : w)),
      };
      const nextState = choiceChanged
        ? recalculateCardCashback(
            withCard,
            id,
            earliestChoicePeriodStart(getCard(next.cardId), next),
          )
        : withCard;
      writeState(nextState);

      return buildWalletCard(next, nextState);
    },
  });

export const useRemoveFromWallet = () =>
  useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const state = readState();
      if (!state.walletCards.some((w) => w.id === id)) {
        throw new Error("Wallet card not found");
      }

      writeState({
        ...state,
        walletCards: state.walletCards.filter((w) => w.id !== id),
        transactions: state.transactions.filter(
          (t) => !matchesWalletCardId(t, id),
        ),
        benefitUsage: state.benefitUsage.filter((u) => u.walletCardId !== id),
      });
      return undefined;
    },
  });

export function useListTransactions(params?: ListTransactionsParams) {
  return useQuery({
    queryKey: queryKeys.transactions(params),
    queryFn: async () => {
      const state = readState();
      let transactions = state.transactions;
      if (params?.walletCardId) {
        const walletCardId = params.walletCardId;
        transactions = transactions.filter((t) =>
          matchesWalletCardId(t, walletCardId),
        );
      }
      if (params?.category) {
        transactions = transactions.filter(
          (t) => t.category === params.category,
        );
      }
      return sortByDateDesc(transactions);
    },
  });
}

/**
 * Recomputes cashback for one card's purchases in date order.
 *
 * Spend caps make each purchase's rate depend on everything logged before it,
 * so a rate recorded once at insert time goes stale as soon as the history
 * changes — backdating a purchase, or deleting one that had consumed the cap,
 * would otherwise leave every later transaction frozen at the wrong rate.
 */
/**
 * Start of the current period for the card's soonest-resetting choice row.
 *
 * A new selection takes effect from the period it belongs to, so that is how
 * far back a re-price may reach.
 */
function earliestChoicePeriodStart(
  card: CreditCard | undefined,
  walletCard: LocalWalletCard,
  onDate = new Date(),
): Date | undefined {
  const choices = card?.categoryChoices ?? [];
  if (!choices.length) return undefined;

  const starts = choices.map((choice) =>
    choicePeriodStart(choice.resets, onDate, walletCard).getTime(),
  );
  return new Date(Math.max(...starts));
}

function recalculateCardCashback(
  state: LocalState,
  walletCardId: number,
  /**
   * Transactions before this date keep the rate they were recorded at, but
   * still count toward cap consumption. Changing a choice category must not
   * retroactively re-price months the old selection was actually earning.
   */
  since?: Date,
): LocalState {
  const walletCard = state.walletCards.find((w) => w.id === walletCardId);
  if (!walletCard) return state;

  const card = getCard(walletCard.cardId);
  if (!card) return state;

  const ordered = state.transactions
    .filter((t) => matchesWalletCardId(t, walletCardId))
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime() || a.id - b.id,
    );

  const recalculated = new Map<number, Transaction>();
  const replayed: Transaction[] = [];

  for (const transaction of ordered) {
    if (since && !isOnOrAfterLocalDate(transaction.date, since)) {
      replayed.push(transaction);
      continue;
    }

    if (isPaymentTransaction(transaction)) {
      recalculated.set(transaction.id, {
        ...transaction,
        cashbackEarned: 0,
        cashbackRate: 0,
      });
      replayed.push(transaction);
      continue;
    }

    const { cashbackEarned, cashbackRate } = calculateCashback(
      { ...state, transactions: replayed },
      walletCard,
      card,
      {
        walletCardId,
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description,
      },
      new Date(transaction.date),
    );

    const next = { ...transaction, cashbackEarned, cashbackRate };
    recalculated.set(transaction.id, next);
    replayed.push(next);
  }

  return {
    ...state,
    transactions: state.transactions.map(
      (transaction) => recalculated.get(transaction.id) ?? transaction,
    ),
  };
}

export const useCreateTransaction = () =>
  useMutation({
    mutationFn: async ({ data }: { data: CreateTransactionBody }) => {
      const state = readState();
      const walletCardId = toFiniteNumber(data.walletCardId, -1);
      const amount = toFiniteNumber(data.amount);
      if (amount <= 0) throw new Error("Amount must be greater than zero");

      const walletCard = state.walletCards.find((w) => w.id === walletCardId);
      if (!walletCard) throw new Error("Wallet card not found");

      const card = getCard(walletCard.cardId);
      if (!card) throw new Error("Card not found");

      const transactionType = data.transactionType ?? "purchase";
      const category =
        transactionType === "payment" ? "Payment" : data.category;
      const transactionDate = new Date(data.date ?? new Date().toISOString());
      if (Number.isNaN(transactionDate.getTime())) {
        throw new Error("Transaction date is not a valid date");
      }

      const transaction: Transaction = {
        id: state.nextTransactionId,
        walletCardId,
        transactionType,
        description: data.description,
        amount,
        category,
        cashbackEarned: 0,
        cashbackRate: 0,
        date: transactionDate.toISOString(),
        cardName: card.name,
        merchantName: data.merchantName ?? null,
        locationName: data.locationName ?? null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
      };

      const nextState = recalculateCardCashback(
        {
          ...state,
          nextTransactionId: state.nextTransactionId + 1,
          transactions: [...state.transactions, transaction],
        },
        walletCardId,
      );
      writeState(nextState);

      return (
        nextState.transactions.find((t) => t.id === transaction.id) ??
        transaction
      );
    },
  });

export const useDeleteTransaction = () =>
  useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const state = readState();
      const removed = state.transactions.find((t) => t.id === id);
      if (!removed) throw new Error("Transaction not found");

      writeState(
        recalculateCardCashback(
          {
            ...state,
            transactions: state.transactions.filter((t) => t.id !== id),
          },
          removed.walletCardId,
        ),
      );
      return undefined;
    },
  });

export function useListCardBenefits(id: number) {
  return useQuery({
    queryKey: queryKeys.benefits(id),
    queryFn: async () => {
      const state = readState();
      const withRows = {
        ...state,
        benefitUsage: ensureBenefitUsageRows(state, id),
      };
      if (withRows.benefitUsage !== state.benefitUsage) writeState(withRows);
      return withRows.benefitUsage
        .filter((usage) => usage.walletCardId === id)
        .map((usage) => buildBenefitUsage(usage, withRows));
    },
  });
}

function markBenefit(
  walletCardId: number,
  benefitId: number,
  used: boolean,
): BenefitUsage {
  const state = readState();
  const withRows = {
    ...state,
    benefitUsage: ensureBenefitUsageRows(state, walletCardId),
  };
  const updatedAt = used ? new Date().toISOString() : null;
  const nextUsages = withRows.benefitUsage.map((usage) =>
    usage.walletCardId === walletCardId && usage.benefitId === benefitId
      ? { ...usage, used, usedAt: updatedAt }
      : usage,
  );
  const found = nextUsages.some(
    (usage) =>
      usage.walletCardId === walletCardId && usage.benefitId === benefitId,
  );
  if (!found) throw new Error("Benefit usage not found");

  const nextState = { ...withRows, benefitUsage: nextUsages };
  writeState(nextState);
  return buildBenefitUsage(
    nextUsages.find(
      (usage) =>
        usage.walletCardId === walletCardId && usage.benefitId === benefitId,
    )!,
    nextState,
  );
}

export const useMarkBenefitUsed = () =>
  useMutation({
    mutationFn: async ({ id, benefitId }: { id: number; benefitId: number }) =>
      markBenefit(id, benefitId, true),
  });

export const useMarkBenefitUnused = () =>
  useMutation({
    mutationFn: async ({ id, benefitId }: { id: number; benefitId: number }) =>
      markBenefit(id, benefitId, false),
  });

export function useGetDashboardSummary() {
  return useQuery({
    queryKey: queryKeys.summary,
    queryFn: async (): Promise<DashboardSummary> => {
      const state = readState();
      const walletCards = listWalletCards(state);

      // Adding a HK$2,000 fee to a US$95 one and printing "$2,095" is worse
      // than showing less. Totals cover the wallet's dominant currency only,
      // and say so when cards were left out.
      const currencyCounts = new Map<string, number>();
      for (const walletCard of walletCards) {
        const currency = getCardCurrency(walletCard.card) ?? "USD";
        currencyCounts.set(currency, (currencyCounts.get(currency) ?? 0) + 1);
      }
      const currency =
        [...currencyCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ??
        "USD";
      const mixedCurrency = currencyCounts.size > 1;
      const inCurrency = walletCards.filter(
        (walletCard) => (getCardCurrency(walletCard.card) ?? "USD") === currency,
      );
      const countedWalletCardIds = new Set(
        inCurrency.map((walletCard) => walletCard.id),
      );

      const totalAnnualFees = inCurrency.reduce(
        (sum, walletCard) => sum + walletCard.card.annualFee,
        0,
      );
      const totalCashbackEarned = state.transactions
        .filter((transaction) =>
          countedWalletCardIds.has(transaction.walletCardId),
        )
        .reduce((sum, transaction) => sum + transaction.cashbackEarned, 0);

      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      const now = new Date();
      const thisMonthCashback = state.transactions
        .filter(
          (transaction) =>
            countedWalletCardIds.has(transaction.walletCardId) &&
            isInLocalDateRange(transaction.date, startOfMonth, now),
        )
        .reduce((sum, transaction) => sum + transaction.cashbackEarned, 0);

      let totalBenefitValue = 0;
      let unusedBenefitsCount = 0;
      for (const walletCard of inCurrency) {
        const localCard = state.walletCards.find(
          (card) => card.id === walletCard.id,
        );
        const usedBenefitIds = new Set(
          state.benefitUsage
            .filter(
              (usage) =>
                usage.walletCardId === walletCard.id &&
                isBenefitUsedThisYear(usage, localCard),
            )
            .map((usage) => usage.benefitId),
        );
        for (const benefit of walletCard.card.benefits) {
          if (!benefit.annualValue) continue;
          totalBenefitValue += benefit.annualValue;
          if (!usedBenefitIds.has(benefit.id)) unusedBenefitsCount += 1;
        }
      }

      return {
        totalCashbackEarned,
        totalCardsInWallet: walletCards.length,
        totalTransactions: state.transactions.length,
        totalAnnualFees,
        totalBenefitValue,
        unusedBenefitsCount,
        thisMonthCashback,
        currency,
        mixedCurrency,
      };
    },
  });
}

export function useGetCashbackByCategory() {
  return useQuery({
    queryKey: queryKeys.cashbackByCategory,
    queryFn: async (): Promise<CategoryCashback[]> => {
      const categoryMap = new Map<
        string,
        { totalSpent: number; totalCashback: number; transactionCount: number }
      >();

      for (const transaction of readState().transactions.filter(
        isPurchaseTransaction,
      )) {
        const existing = categoryMap.get(transaction.category) ?? {
          totalSpent: 0,
          totalCashback: 0,
          transactionCount: 0,
        };
        existing.totalSpent += transaction.amount;
        existing.totalCashback += transaction.cashbackEarned;
        existing.transactionCount += 1;
        categoryMap.set(transaction.category, existing);
      }

      return Array.from(categoryMap.entries())
        .map(([category, data]) => ({ category, ...data }))
        .sort((a, b) => b.totalCashback - a.totalCashback);
    },
  });
}

export function useGetBestCardForCategory() {
  return useQuery({
    queryKey: queryKeys.bestCardForCategory,
    queryFn: async (): Promise<BestCardForCategory[]> => {
      const best = new Map<string, BestCardForCategory>();
      for (const walletCard of listWalletCards()) {
        for (const category of walletCard.card.cashbackCategories) {
          if (category.isDefault) continue;
          const effectiveRate =
            category.rate * getRewardUnitValueMultiplier(walletCard.card);
          const existing = best.get(category.category);
          if (!existing || effectiveRate > existing.cashbackRate) {
            best.set(category.category, {
              category: category.category,
              walletCardId: walletCard.id,
              cardName: walletCard.card.name,
              cashbackRate: Number(effectiveRate.toFixed(4)),
            });
          }
        }
      }
      return Array.from(best.values()).sort(
        (a, b) => b.cashbackRate - a.cashbackRate,
      );
    },
  });
}

function daysInMonth(year: number, monthIdx: number): number {
  return new Date(year, monthIdx + 1, 0).getDate();
}

function dateOnDayOfMonth(year: number, monthIdx: number, day: number): Date {
  return new Date(year, monthIdx, Math.min(day, daysInMonth(year, monthIdx)));
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isInLocalDateRange(
  dateInput: string,
  start: Date,
  end: Date,
): boolean {
  const date = startOfLocalDay(new Date(dateInput));
  return date >= startOfLocalDay(start) && date <= startOfLocalDay(end);
}

function isOnOrAfterLocalDate(dateInput: string, start: Date): boolean {
  return startOfLocalDay(new Date(dateInput)) >= startOfLocalDay(start);
}

function isOnOrBeforeLocalDate(dateInput: string, end: Date): boolean {
  return startOfLocalDay(new Date(dateInput)) <= startOfLocalDay(end);
}

function dueDateForCycleEnd(
  cycleEnd: Date,
  closingDay: number,
  dueDay: number,
): Date {
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

function computeBillingCycle(
  closingDay: number,
  dueDay: number,
  today = new Date(),
) {
  const y = today.getFullYear();
  const m = today.getMonth();
  let cycleEndYear = y;
  let cycleEndMonth = m;
  if (startOfLocalDay(today) > dateOnDayOfMonth(y, m, closingDay)) {
    cycleEndMonth += 1;
    if (cycleEndMonth > 11) {
      cycleEndMonth = 0;
      cycleEndYear += 1;
    }
  }

  const currentCycleEnd = dateOnDayOfMonth(
    cycleEndYear,
    cycleEndMonth,
    closingDay,
  );
  const prevCycleEndMonthRaw = cycleEndMonth - 1;
  const prevCycleEnd = dateOnDayOfMonth(
    prevCycleEndMonthRaw < 0 ? cycleEndYear - 1 : cycleEndYear,
    prevCycleEndMonthRaw < 0 ? 11 : prevCycleEndMonthRaw,
    closingDay,
  );
  const currentCycleStart = new Date(prevCycleEnd);
  currentCycleStart.setDate(currentCycleStart.getDate() + 1);

  const prevPrevEndMonthRaw = prevCycleEnd.getMonth() - 1;
  const prevPrevEnd = dateOnDayOfMonth(
    prevPrevEndMonthRaw < 0
      ? prevCycleEnd.getFullYear() - 1
      : prevCycleEnd.getFullYear(),
    prevPrevEndMonthRaw < 0 ? 11 : prevPrevEndMonthRaw,
    closingDay,
  );
  const prevCycleStart = new Date(prevPrevEnd);
  prevCycleStart.setDate(prevCycleStart.getDate() + 1);

  const previousDueDate = dueDateForCycleEnd(prevCycleEnd, closingDay, dueDay);
  const previousDueHasPassed = startOfLocalDay(today) > previousDueDate;

  return {
    currentCycleStart,
    currentCycleEnd,
    dueCycleStart: prevCycleStart,
    dueCycleEnd: prevCycleEnd,
    nextDueDate: previousDueHasPassed
      ? dueDateForCycleEnd(currentCycleEnd, closingDay, dueDay)
      : previousDueDate,
    previousDueDate,
    previousDueHasPassed,
  };
}

export function useGetBillingCycles() {
  return useQuery({
    queryKey: queryKeys.billingCycles,
    queryFn: async (): Promise<BillingCycle[]> => {
      const state = readState();
      const today = new Date();
      return state.walletCards
        .filter(
          (walletCard) =>
            walletCard.statementClosingDay && walletCard.paymentDueDay,
        )
        .map((walletCard): BillingCycle | null => {
          const card = getCard(walletCard.cardId);
          if (
            !card ||
            !walletCard.statementClosingDay ||
            !walletCard.paymentDueDay
          ) {
            return null;
          }

          const cycle = computeBillingCycle(
            walletCard.statementClosingDay,
            walletCard.paymentDueDay,
            today,
          );
          const cardTransactions = state.transactions.filter((transaction) =>
            matchesWalletCardId(transaction, walletCard.id),
          );
          const purchases = cardTransactions.filter(isPurchaseTransaction);
          const payments = cardTransactions.filter(isPaymentTransaction);
          const statementSpendBeforePayments = purchases
            .filter((t) =>
              isInLocalDateRange(
                t.date,
                cycle.dueCycleStart,
                cycle.dueCycleEnd,
              ),
            )
            .reduce((sum, t) => sum + t.amount, 0);
          // Payments from the statement period onward pay the statement down.
          // They keep counting after the due date: an unpaid statement stays
          // unpaid, and zeroing it would hide exactly the debt worth showing.
          const paymentsApplied = payments
            .filter(
              (t) =>
                isOnOrAfterLocalDate(t.date, cycle.dueCycleStart) &&
                isOnOrBeforeLocalDate(t.date, today),
            )
            .reduce((sum, t) => sum + t.amount, 0);
          const statementSpend = statementSpendBeforePayments;
          const statementBalance = Math.max(
            0,
            statementSpend - paymentsApplied,
          );
          const isOverdue =
            cycle.previousDueHasPassed && statementBalance > 0.005;
          const currentCycleSpend = purchases
            .filter(
              (t) =>
                isOnOrAfterLocalDate(t.date, cycle.currentCycleStart) &&
                isOnOrBeforeLocalDate(t.date, today),
            )
            .reduce((sum, t) => sum + t.amount, 0);
          // What is actually owed is every purchase ever logged minus every
          // payment ever logged. Restarting the sum at a cycle boundary drops
          // carried-over debt and lets an old payment cancel new spend.
          const lifetimePurchases = purchases
            .filter((t) => isOnOrBeforeLocalDate(t.date, today))
            .reduce((sum, t) => sum + t.amount, 0);
          const lifetimePayments = payments
            .filter((t) => isOnOrBeforeLocalDate(t.date, today))
            .reduce((sum, t) => sum + t.amount, 0);
          const totalBalance = Math.max(
            0,
            lifetimePurchases - lifetimePayments,
          );
          const minimumPayment =
            statementBalance <= 0
              ? 0
              : Math.min(
                  statementBalance,
                  Math.max(25, statementBalance * 0.02),
                );
          const creditLimit = walletCard.creditLimit ?? null;
          const utilization =
            creditLimit && creditLimit > 0 ? totalBalance / creditLimit : null;
          const availableCredit =
            creditLimit !== null
              ? Math.max(0, creditLimit - totalBalance)
              : null;
          // Both sides must be local midnight: measuring from a wall-clock
          // "now" to a midnight date shifts the count by a day across a DST
          // boundary, and reads as a fractional day the rest of the time.
          const daysUntilDue = Math.round(
            (startOfLocalDay(cycle.nextDueDate).getTime() -
              startOfLocalDay(today).getTime()) /
              86400000,
          );

          return {
            walletCardId: walletCard.id,
            cardName: card.name,
            nickname: walletCard.nickname ?? null,
            statementClosingDay: walletCard.statementClosingDay,
            paymentDueDay: walletCard.paymentDueDay,
            creditLimit,
            currentCycleStart: cycle.currentCycleStart.toISOString(),
            currentCycleEnd: cycle.currentCycleEnd.toISOString(),
            nextDueDate: cycle.nextDueDate.toISOString(),
            daysUntilDue,
            statementBalance: Number(statementBalance.toFixed(2)),
            isOverdue,
            previousDueDate: cycle.previousDueDate.toISOString(),
            statementSpend: Number(statementSpend.toFixed(2)),
            paymentsApplied: Number(
              Math.min(paymentsApplied, statementSpend).toFixed(2),
            ),
            currentCycleSpend: Number(currentCycleSpend.toFixed(2)),
            totalBalance: Number(totalBalance.toFixed(2)),
            availableCredit:
              availableCredit !== null
                ? Number(availableCredit.toFixed(2))
                : null,
            minimumPayment: Number(minimumPayment.toFixed(2)),
            utilization:
              utilization !== null ? Number(utilization.toFixed(4)) : null,
          };
        })
        .filter((cycle): cycle is BillingCycle => cycle !== null)
        .sort((a, b) => a.daysUntilDue - b.daysUntilDue);
    },
  });
}

function buildStatsPeriod(
  transactions: Transaction[],
  walletCards: WalletCard[],
  filter: (transaction: Transaction) => boolean,
): SpendingStatsPeriod {
  const filtered = transactions.filter(
    (transaction) => filter(transaction) && isPurchaseTransaction(transaction),
  );
  const totalSpent = filtered.reduce((sum, t) => sum + t.amount, 0);
  const totalCashback = filtered.reduce((sum, t) => sum + t.cashbackEarned, 0);
  const walletMap = new Map(walletCards.map((w) => [w.id, w]));
  const perCardMap = new Map<
    number,
    { totalSpent: number; totalCashback: number; transactionCount: number }
  >();

  for (const transaction of filtered) {
    const current = perCardMap.get(transaction.walletCardId) ?? {
      totalSpent: 0,
      totalCashback: 0,
      transactionCount: 0,
    };
    current.totalSpent += transaction.amount;
    current.totalCashback += transaction.cashbackEarned;
    current.transactionCount += 1;
    perCardMap.set(transaction.walletCardId, current);
  }

  return {
    totalSpent: Number(totalSpent.toFixed(2)),
    totalCashback: Number(totalCashback.toFixed(2)),
    transactionCount: filtered.length,
    perCard: Array.from(perCardMap.entries())
      .map(([walletCardId, data]) => ({
        walletCardId,
        cardName: walletMap.get(walletCardId)?.card.name ?? "Unknown Card",
        totalSpent: Number(data.totalSpent.toFixed(2)),
        totalCashback: Number(data.totalCashback.toFixed(2)),
        transactionCount: data.transactionCount,
      }))
      .sort((a, b) => b.totalSpent - a.totalSpent),
  };
}

export function useGetSpendingStats() {
  return useQuery({
    queryKey: queryKeys.spendingStats,
    queryFn: async (): Promise<SpendingStats> => {
      const state = readState();
      const walletCards = listWalletCards(state);
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfQuarter = new Date(
        now.getFullYear(),
        Math.floor(now.getMonth() / 3) * 3,
        1,
      );
      const startOfYear = new Date(now.getFullYear(), 0, 1);

      const monthlyTrend = [];
      for (let i = 11; i >= 0; i--) {
        const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const next = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
        const tx = state.transactions.filter((t) => {
          const date = new Date(t.date);
          return date >= start && date < next && isPurchaseTransaction(t);
        });
        monthlyTrend.push({
          month: `${start.getFullYear()}-${String(
            start.getMonth() + 1,
          ).padStart(2, "0")}`,
          totalSpent: Number(
            tx.reduce((sum, t) => sum + t.amount, 0).toFixed(2),
          ),
          totalCashback: Number(
            tx.reduce((sum, t) => sum + t.cashbackEarned, 0).toFixed(2),
          ),
        });
      }

      // "This month" must end today, not run to the end of time: a
      // future-dated transaction would otherwise inflate every period total.
      return {
        thisMonth: buildStatsPeriod(
          state.transactions,
          walletCards,
          (t) => isInLocalDateRange(t.date, startOfMonth, now),
        ),
        thisQuarter: buildStatsPeriod(
          state.transactions,
          walletCards,
          (t) => isInLocalDateRange(t.date, startOfQuarter, now),
        ),
        thisYear: buildStatsPeriod(
          state.transactions,
          walletCards,
          (t) => isInLocalDateRange(t.date, startOfYear, now),
        ),
        lifetime: buildStatsPeriod(state.transactions, walletCards, (t) =>
          isOnOrBeforeLocalDate(t.date, now),
        ),
        monthlyTrend,
      };
    },
  });
}

export function useGetUnusedBenefits() {
  return useQuery({
    queryKey: queryKeys.unusedBenefits,
    queryFn: async (): Promise<UnusedBenefit[]> => {
      const state = readState();
      const walletCards = listWalletCards(state);
      const result: UnusedBenefit[] = [];

      for (const walletCard of inDominantCurrency(walletCards)) {
        const localCard = state.walletCards.find(
          (card) => card.id === walletCard.id,
        );
        const usedBenefitIds = new Set(
          state.benefitUsage
            .filter(
              (usage) =>
                usage.walletCardId === walletCard.id &&
                isBenefitUsedThisYear(usage, localCard),
            )
            .map((usage) => usage.benefitId),
        );
        for (const benefit of walletCard.card.benefits) {
          // A "No Annual Fee" style row carries no allowance to spend, so
          // listing it as an unused benefit is just noise on the dashboard.
          if (!benefit.annualValue) continue;
          if (!usedBenefitIds.has(benefit.id)) {
            result.push({
              benefitId: benefit.id,
              walletCardId: walletCard.id,
              cardName: walletCard.card.name,
              name: benefit.name,
              description: benefit.description,
              annualValue: benefit.annualValue ?? null,
            });
          }
        }
      }

      return result;
    },
  });
}

export function useGetUsedBenefits() {
  return useQuery({
    queryKey: queryKeys.usedBenefits,
    queryFn: async (): Promise<UnusedBenefit[]> => {
      const state = readState();
      const walletCards = listWalletCards(state);
      const result: UnusedBenefit[] = [];

      for (const walletCard of inDominantCurrency(walletCards)) {
        const localCard = state.walletCards.find(
          (card) => card.id === walletCard.id,
        );
        const usedBenefitIds = new Set(
          state.benefitUsage
            .filter(
              (usage) =>
                usage.walletCardId === walletCard.id &&
                isBenefitUsedThisYear(usage, localCard),
            )
            .map((usage) => usage.benefitId),
        );
        for (const benefit of walletCard.card.benefits) {
          if (usedBenefitIds.has(benefit.id)) {
            result.push({
              benefitId: benefit.id,
              walletCardId: walletCard.id,
              cardName: walletCard.card.name,
              name: benefit.name,
              description: benefit.description,
              annualValue: benefit.annualValue ?? null,
            });
          }
        }
      }

      return result;
    },
  });
}

type MatchConfidence = "high" | "medium" | "low" | "none";

type PurchaseAlias = {
  terms: string[];
  tags: string[];
  weight: number;
  merchant?: string;
  purchaseType?: string;
  channel?: string;
  paymentMethod?: string;
  travelProvider?: string;
  location?: string;
};

/**
 * Phrases that read as a brand in one context and an ordinary word in another.
 *
 * These are checked wherever a phrase is matched against a purchase
 * description — both the alias table and the catalog-category scan, since the
 * catalog contains a bonus category named exactly "United" and would otherwise
 * price "shipping to the United States" as airfare.
 */
const AMBIGUOUS_TERMS: Array<{ term: string; notWhen: RegExp }> = [
  {
    term: "united",
    notWhen: /\bunited\s+(?:states|kingdom|nations|way|healthcare|arab)\b/,
  },
  { term: "delta", notWhen: /\bdelta\s+(?:faucet|dental|force|variant)\b/ },
  { term: "alaska", notWhen: /\balaska\s+(?:time|state|native|residents?)\b/ },
];

function termIsFalseMatch(text: string, term: string): boolean {
  const normalized = term.trim().toLowerCase();
  return AMBIGUOUS_TERMS.some(
    (entry) => entry.term === normalized && entry.notWhen.test(text),
  );
}

type ParsedPurchaseContext = PurchaseContext & {
  confidence: MatchConfidence;
  categoryHints: string[];
  score: number;
};

type CategoryMatch = {
  category: CreditCard["cashbackCategories"][number];
  score: number;
  matchedTags: string[];
  reason: string;
};

type CreditCardMetadata = CreditCard & {
  market?: string | null;
  currency?: string | null;
};

const PURCHASE_ALIASES: PurchaseAlias[] = [
  {
    terms: ["costco gas", "costco fuel"],
    tags: ["costco", "warehouse_club", "gas"],
    merchant: "Costco",
    purchaseType: "gas",
    weight: 130,
  },
  {
    terms: [
      "costco",
      "warehouse club",
      "wholesale club",
      "sam's club",
      "sams club",
      "bj's",
    ],
    tags: ["warehouse_club"],
    merchant: "Costco",
    purchaseType: "warehouse_club",
    weight: 95,
  },
  {
    terms: ["whole foods"],
    tags: ["whole_foods", "amazon", "grocery"],
    merchant: "Whole Foods",
    purchaseType: "grocery",
    weight: 110,
  },
  {
    terms: [
      "trader joe",
      "kroger",
      "safeway",
      "publix",
      "wegmans",
      "h mart",
      "h-mart",
      "99 ranch",
      "supermarket",
      "grocery",
      "groceries",
    ],
    tags: ["grocery"],
    purchaseType: "grocery",
    weight: 90,
  },
  {
    terms: ["walmart.com"],
    tags: ["walmart", "online_retail", "online"],
    merchant: "Walmart",
    purchaseType: "online_retail",
    channel: "online",
    weight: 120,
  },
  {
    terms: ["walmart"],
    tags: ["walmart", "retail"],
    merchant: "Walmart",
    purchaseType: "retail",
    weight: 95,
  },
  {
    terms: ["target circle", "target"],
    tags: ["target", "retail"],
    merchant: "Target",
    purchaseType: "retail",
    weight: 95,
  },
  {
    terms: ["amazon business", "aws"],
    tags: ["amazon", "business", "online_retail"],
    merchant: "Amazon Business",
    purchaseType: "business",
    channel: "online",
    weight: 120,
  },
  {
    terms: [
      "amazon",
      "online shopping",
      "online order",
      "online purchase",
      "ebay",
      "etsy",
      "temu",
      "shein",
    ],
    tags: ["online_retail", "online"],
    purchaseType: "online_retail",
    channel: "online",
    weight: 85,
  },
  {
    terms: [
      "apple pay",
      "mobile wallet",
      "digital wallet",
      "contactless",
      "tap to pay",
    ],
    tags: ["mobile_wallet", "apple_pay", "contactless"],
    paymentMethod: "Apple Pay",
    weight: 115,
  },
  {
    terms: ["paypal"],
    tags: ["paypal", "online"],
    paymentMethod: "PayPal",
    channel: "online",
    weight: 100,
  },
  {
    terms: [
      "apple store",
      "apple purchase",
      "apple purchases",
      "apple product",
      "apple products",
      "iphone",
      "ipad",
      "macbook",
      "mac mini",
      "imac",
      "airpods",
      "app store",
    ],
    tags: ["apple", "electronics"],
    merchant: "Apple",
    purchaseType: "electronics",
    weight: 110,
  },
  {
    terms: ["ace hardware"],
    tags: ["ace_hardware", "home_improvement"],
    merchant: "Ace Hardware",
    purchaseType: "home_improvement",
    weight: 105,
  },
  {
    terms: ["booking.com"],
    tags: ["booking_com", "hotel", "ota"],
    merchant: "Booking.com",
    purchaseType: "hotel",
    channel: "Online Travel Agency",
    weight: 110,
  },
  {
    terms: ["nike", "snkrs", "swoosh"],
    tags: ["nike", "retail"],
    merchant: "Nike",
    purchaseType: "retail",
    weight: 105,
  },
  {
    terms: [
      "uber eats",
      "uber eat",
      "doordash",
      "grubhub",
      "takeout",
      "food delivery",
    ],
    tags: ["dining", "food_delivery"],
    purchaseType: "dining",
    weight: 110,
  },
  {
    terms: ["citi nights", "citi night"],
    tags: ["dining", "citi_nights"],
    purchaseType: "dining",
    weight: 115,
  },
  {
    terms: [
      "restaurant",
      "dining",
      "dinner",
      "lunch",
      "brunch",
      "breakfast",
      "coffee",
      "starbucks",
      "chipotle",
      "mcdonald",
      "kfc",
      "burger",
      "pizza",
      "sushi",
      "ramen",
    ],
    tags: ["dining"],
    purchaseType: "dining",
    weight: 90,
  },
  {
    terms: [
      "shell",
      "chevron",
      "exxon",
      "mobil",
      "bp",
      "valero",
      "arco",
      "gas",
      "gasoline",
      "fuel",
      "petrol",
    ],
    tags: ["gas"],
    purchaseType: "gas",
    weight: 95,
  },
  {
    terms: ["ev charging", "supercharger", "chargepoint", "electrify america"],
    tags: ["ev_charging"],
    purchaseType: "ev_charging",
    weight: 105,
  },
  {
    terms: [
      "netflix",
      "hulu",
      "spotify",
      "disney+",
      "disney plus",
      "apple music",
      "apple tv+",
      "youtube premium",
      "youtube tv",
      "hbo",
      "hbo max",
      "paramount",
      "peacock",
      "audible",
      "streaming",
    ],
    tags: ["streaming", "subscription"],
    purchaseType: "streaming",
    weight: 95,
  },
  {
    terms: ["cvs", "walgreens", "rite aid", "drugstore", "pharmacy"],
    tags: ["drugstore"],
    purchaseType: "drugstore",
    weight: 90,
  },
  {
    terms: ["uber"],
    tags: ["rideshare", "transit", "uber"],
    merchant: "Uber",
    purchaseType: "rideshare",
    weight: 90,
  },
  {
    terms: ["lyft"],
    tags: ["rideshare", "transit", "lyft"],
    merchant: "Lyft",
    purchaseType: "rideshare",
    weight: 90,
  },
  {
    terms: ["rideshare"],
    tags: ["rideshare", "transit"],
    purchaseType: "rideshare",
    weight: 90,
  },
  {
    terms: [
      "subway ride",
      "metro",
      "bus",
      "train ticket",
      "amtrak",
      "transit",
      "commute",
      "taxi",
    ],
    tags: ["transit"],
    purchaseType: "transit",
    weight: 85,
  },
  {
    terms: [
      "rental car",
      "car rental",
      "hertz",
      "avis",
      "enterprise rent",
      "enterprise car",
      "budget rental",
    ],
    tags: ["rental_car", "travel"],
    purchaseType: "rental_car",
    weight: 95,
  },
  {
    terms: ["chase travel"],
    tags: ["travel", "travel_portal", "chase_travel"],
    channel: "Chase Travel",
    purchaseType: "travel",
    weight: 120,
  },
  {
    terms: ["capital one travel"],
    tags: ["travel", "travel_portal", "capital_one_travel"],
    channel: "Capital One Travel",
    purchaseType: "travel",
    weight: 120,
  },
  {
    terms: ["amex travel", "american express travel"],
    tags: ["travel", "travel_portal", "amex_travel"],
    channel: "Amex Travel",
    purchaseType: "travel",
    weight: 120,
  },
  {
    terms: ["citi travel"],
    tags: ["travel", "travel_portal", "citi_travel"],
    channel: "Citi Travel",
    purchaseType: "travel",
    weight: 120,
  },
  {
    terms: ["travel center", "bank of america travel center"],
    tags: ["travel", "travel_portal", "travel_center"],
    channel: "Travel Center",
    purchaseType: "travel",
    weight: 115,
  },
  {
    terms: ["renowned hotels", "renowned hotel", "renowned resorts"],
    tags: ["travel", "travel_portal", "renowned_hotels", "hotel"],
    channel: "Renowned Hotels and Resorts",
    purchaseType: "hotel",
    weight: 115,
  },
  {
    terms: ["expedia", "hotels.com", "vrbo", "booking.com"],
    tags: ["travel", "hotel", "ota", "expedia_group"],
    channel: "Online Travel Agency",
    purchaseType: "hotel",
    weight: 105,
  },
  {
    terms: ["book direct", "booked direct", "direct booking", "directly with"],
    tags: ["direct_booking"],
    channel: "Direct",
    weight: 90,
  },
  {
    terms: ["marriott", "bonvoy", "ritz-carlton", "ritz carlton", "st regis"],
    tags: ["hotel", "marriott"],
    merchant: "Marriott",
    purchaseType: "hotel",
    travelProvider: "Marriott",
    weight: 125,
  },
  {
    terms: ["hilton", "conrad", "waldorf"],
    tags: ["hotel", "hilton"],
    merchant: "Hilton",
    purchaseType: "hotel",
    travelProvider: "Hilton",
    weight: 125,
  },
  {
    terms: ["hyatt", "andaz", "park hyatt"],
    tags: ["hotel", "hyatt"],
    merchant: "Hyatt",
    purchaseType: "hotel",
    travelProvider: "Hyatt",
    weight: 125,
  },
  {
    terms: ["ihg", "intercontinental", "holiday inn", "kimpton"],
    tags: ["hotel", "ihg"],
    merchant: "IHG",
    purchaseType: "hotel",
    travelProvider: "IHG",
    weight: 125,
  },
  {
    terms: ["choice hotel", "choice hotels"],
    tags: ["hotel", "choice"],
    merchant: "Choice Hotels",
    purchaseType: "hotel",
    travelProvider: "Choice Hotels",
    weight: 120,
  },
  {
    terms: ["wyndham", "ramada", "days inn"],
    tags: ["hotel", "wyndham"],
    merchant: "Wyndham",
    purchaseType: "hotel",
    travelProvider: "Wyndham",
    weight: 120,
  },
  {
    terms: ["hotel", "lodging", "resort", "airbnb"],
    tags: ["hotel", "travel"],
    purchaseType: "hotel",
    weight: 85,
  },
  {
    terms: ["united airlines", "united flight", "ua flight", "united"],
    tags: ["airfare", "airline", "united"],
    merchant: "United",
    purchaseType: "airfare",
    travelProvider: "United",
    weight: 125,
  },
  {
    terms: ["delta airlines", "delta flight", "delta"],
    tags: ["airfare", "airline", "delta"],
    merchant: "Delta",
    purchaseType: "airfare",
    travelProvider: "Delta",
    weight: 125,
  },
  {
    terms: ["american airlines", "aa flight", "aadvantage"],
    tags: ["airfare", "airline", "american_airlines"],
    merchant: "American Airlines",
    purchaseType: "airfare",
    travelProvider: "American Airlines",
    weight: 125,
  },
  {
    terms: ["southwest airlines", "southwest flight", "southwest"],
    tags: ["airfare", "airline", "southwest"],
    merchant: "Southwest",
    purchaseType: "airfare",
    travelProvider: "Southwest",
    weight: 125,
  },
  {
    terms: ["alaska airlines", "alaska flight"],
    tags: ["airfare", "airline", "alaska"],
    merchant: "Alaska Airlines",
    purchaseType: "airfare",
    travelProvider: "Alaska Airlines",
    weight: 120,
  },
  {
    terms: ["hawaiian airlines", "hawaiian flight"],
    tags: ["airfare", "airline", "hawaiian"],
    merchant: "Hawaiian Airlines",
    purchaseType: "airfare",
    travelProvider: "Hawaiian Airlines",
    weight: 120,
  },
  {
    terms: ["jetblue", "jetblue flight"],
    tags: ["airfare", "airline", "jetblue"],
    merchant: "JetBlue",
    purchaseType: "airfare",
    travelProvider: "JetBlue",
    weight: 120,
  },
  {
    terms: ["air canada", "aeroplan"],
    tags: ["airfare", "airline", "air_canada"],
    merchant: "Air Canada",
    purchaseType: "airfare",
    travelProvider: "Air Canada",
    weight: 120,
  },
  {
    terms: ["cathay", "asia miles"],
    tags: ["airfare", "airline", "cathay"],
    merchant: "Cathay Pacific",
    purchaseType: "airfare",
    travelProvider: "Cathay Pacific",
    weight: 120,
  },
  {
    terms: ["flight", "airfare", "airline ticket", "plane ticket"],
    tags: ["airfare", "airline", "travel"],
    purchaseType: "airfare",
    weight: 85,
  },
  {
    terms: ["travel", "trip", "vacation"],
    tags: ["travel"],
    purchaseType: "travel",
    weight: 60,
  },
  {
    terms: ["verizon"],
    tags: ["verizon", "phone"],
    merchant: "Verizon",
    purchaseType: "phone",
    weight: 105,
  },
  {
    terms: ["phone bill", "wireless", "cell phone"],
    tags: ["phone", "wireless"],
    purchaseType: "phone",
    weight: 90,
  },
  {
    terms: ["internet", "cable", "utilities", "electric bill", "utility bill"],
    tags: ["utilities"],
    purchaseType: "utilities",
    weight: 85,
  },
  {
    terms: ["shipping", "fedex", "ups", "usps"],
    tags: ["shipping", "business"],
    purchaseType: "shipping",
    weight: 85,
  },
  {
    terms: ["office supplies", "staples", "office depot"],
    tags: ["office_supplies", "business"],
    purchaseType: "office_supplies",
    weight: 90,
  },
  {
    terms: ["advertising", "facebook ads", "google ads", "social media ads"],
    tags: ["advertising", "business"],
    purchaseType: "advertising",
    weight: 90,
  },
  {
    terms: ["home depot", "lowes", "lowe's", "home improvement"],
    tags: ["home_improvement"],
    purchaseType: "home_improvement",
    weight: 90,
  },
  {
    terms: ["gym", "fitness", "equinox", "planet fitness", "yoga", "pilates"],
    tags: ["fitness"],
    purchaseType: "fitness",
    weight: 85,
  },
  {
    terms: ["rent", "landlord"],
    tags: ["rent"],
    purchaseType: "rent",
    weight: 90,
  },
  {
    terms: ["canada", "canadian", "toronto", "vancouver", "montreal"],
    tags: ["foreign", "market_canada"],
    location: "Canada",
    weight: 75,
  },
  {
    terms: ["hong kong"],
    tags: ["foreign", "market_hong_kong"],
    location: "Hong Kong",
    weight: 75,
  },
  {
    terms: ["singapore"],
    tags: ["foreign", "market_singapore"],
    location: "Singapore",
    weight: 75,
  },
  {
    terms: [
      "tokyo",
      "japan",
      "hong kong",
      "singapore",
      "canada",
      "mexico",
      "europe",
      "international",
      "overseas",
      "foreign",
    ],
    tags: ["foreign"],
    location: "International",
    weight: 65,
  },
];

const TAG_WEIGHTS: Record<string, number> = {
  costco: 90,
  amazon: 85,
  whole_foods: 85,
  apple: 85,
  walmart: 85,
  target: 85,
  verizon: 85,
  ace_hardware: 85,
  booking_com: 85,
  nike: 85,
  united: 90,
  delta: 90,
  american_airlines: 90,
  southwest: 90,
  alaska: 85,
  hawaiian: 85,
  jetblue: 85,
  air_canada: 85,
  cathay: 85,
  marriott: 90,
  hilton: 90,
  hyatt: 90,
  ihg: 85,
  wyndham: 85,
  choice: 85,
  chase_travel: 90,
  capital_one_travel: 90,
  amex_travel: 90,
  citi_travel: 90,
  travel_center: 85,
  renowned_hotels: 85,
  expedia_group: 80,
  apple_pay: 80,
  mobile_wallet: 70,
  paypal: 70,
  warehouse_club: 65,
  gas: 60,
  ev_charging: 60,
  grocery: 55,
  dining: 55,
  food_delivery: 55,
  hotel: 55,
  airfare: 55,
  airline: 45,
  rental_car: 50,
  travel_portal: 50,
  direct_booking: 35,
  online_retail: 45,
  online: 30,
  streaming: 45,
  transit: 45,
  rideshare: 45,
  drugstore: 45,
  phone: 45,
  utilities: 40,
  office_supplies: 45,
  advertising: 45,
  shipping: 40,
  home_improvement: 45,
  rent: 45,
  foreign: 35,
  business: 25,
};

const PORTAL_TAGS = [
  "chase_travel",
  "capital_one_travel",
  "amex_travel",
  "citi_travel",
  "travel_center",
  "renowned_hotels",
];

const PROVIDER_SPECIFIC_TAGS = [
  "united",
  "delta",
  "american_airlines",
  "southwest",
  "alaska",
  "hawaiian",
  "jetblue",
  "air_canada",
  "cathay",
  "marriott",
  "hilton",
  "hyatt",
  "ihg",
  "wyndham",
  "choice",
  "uber",
  "lyft",
];

const SPECIFIC_MATCH_TAGS = new Set([
  "costco",
  "amazon",
  "whole_foods",
  "apple",
  "walmart",
  "target",
  "verizon",
  "ace_hardware",
  "booking_com",
  "nike",
  ...PROVIDER_SPECIFIC_TAGS,
]);

const GENERIC_TRAVEL_MATCH_TAGS = new Set([
  "travel",
  "hotel",
  "airfare",
  "airline",
  "direct_booking",
  "rideshare",
  "transit",
]);

function uniqueValues<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function addTag(target: Set<string>, tag: string | null | undefined) {
  if (tag) target.add(tag);
}

function formatMatchTag(tag: string): string {
  if (tag === "food_delivery") return "food delivery";
  if (tag === "citi_nights") return "Citi Nights";
  if (tag === "travel_portal") return "travel portal";
  if (tag === "uber") return "Uber";
  if (tag === "lyft") return "Lyft";
  if (tag === "ace_hardware") return "Ace Hardware";
  if (tag === "booking_com") return "Booking.com";
  return tag.replace(/_/g, " ");
}

function titleCaseWords(value: string): string {
  return value
    .split(/[_\s]+/)
    .filter(Boolean)
    .map(
      (word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`,
    )
    .join(" ");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function phraseMatches(text: string, phrase: string): boolean {
  const pattern = escapeRegExp(phrase.trim()).replace(/\s+/g, "\\s+");
  return new RegExp(`(^|[^a-z0-9])${pattern}(?=$|[^a-z0-9])`, "i").test(text);
}

/**
 * Reads a spend amount out of free text.
 *
 * Handles the currency symbols the catalog actually uses, a trailing unit
 * ("1.2k", "3 dollars") and a bare number, so "HK$800 dinner" and "spent 1.2k
 * on flights" both parse instead of silently dropping the amount and quoting an
 * uncapped rate.
 */
function parseAmountFromDescription(description: string): number | null {
  const match = description.match(
    /(?:hk\$|s\$|us\$|c\$|\$|usd|hkd|sgd|cad)\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)\s*(k|m)?/i,
  ) ??
  description.match(
    /\b([0-9][0-9,]*(?:\.[0-9]{1,2})?)\s*(k|m)?\s*(?:dollars?|bucks|usd|hkd|sgd|cad)\b/i,
  );
  if (!match) return null;

  const magnitude =
    match[2]?.toLowerCase() === "m"
      ? 1_000_000
      : match[2]?.toLowerCase() === "k"
        ? 1_000
        : 1;
  const amount = Number(match[1].replace(/,/g, "")) * magnitude;
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

function inferPurchaseType(tags: Set<string>): string | null {
  const priority = [
    "gas",
    "ev_charging",
    "airfare",
    "hotel",
    "rental_car",
    "dining",
    "warehouse_club",
    "grocery",
    "online_retail",
    "streaming",
    "drugstore",
    "transit",
    "phone",
    "utilities",
    "business",
    "travel",
    "retail",
  ];
  return priority.find((tag) => tags.has(tag)) ?? null;
}

function parsePurchaseContext(
  description: string,
  explicitAmount: number | null,
  availableCategories: Set<string>,
): ParsedPurchaseContext {
  const text = description.toLowerCase().trim();
  const tags = new Set<string>();
  const matchedTerms: string[] = [];
  const categoryHints: string[] = [];
  let score = 0;
  let merchant: string | null = null;
  let purchaseType: string | null = null;
  let channel: string | null = null;
  let paymentMethod: string | null = null;
  let travelProvider: string | null = null;
  let location: string | null = null;
  let purchaseTypeScore = 0;

  for (const entry of PURCHASE_ALIASES) {
    for (const term of entry.terms) {
      if (!phraseMatches(text, term)) continue;
      if (termIsFalseMatch(text, term)) continue;
      matchedTerms.push(term);
      const matchScore = entry.weight + term.length;
      score += matchScore;
      entry.tags.forEach((tag) => tags.add(tag));
      merchant ??= entry.merchant ?? null;
      if (entry.purchaseType && matchScore > purchaseTypeScore) {
        purchaseType = entry.purchaseType;
        purchaseTypeScore = matchScore;
      }
      channel ??= entry.channel ?? null;
      paymentMethod ??= entry.paymentMethod ?? null;
      travelProvider ??= entry.travelProvider ?? null;
      location ??= entry.location ?? null;
    }
  }

  if (/\buber\s+eats?\b/.test(text)) {
    tags.delete("rideshare");
    tags.delete("transit");
    tags.delete("uber");
    purchaseType = "dining";
  }

  if (/\b(hk|hkg)\b/.test(text)) {
    tags.add("foreign");
    tags.add("market_hong_kong");
    matchedTerms.push("hk");
    location ??= "Hong Kong";
    score += 75;
  }
  if (/\b(sg|sin)\b/.test(text)) {
    tags.add("foreign");
    tags.add("market_singapore");
    matchedTerms.push("sg");
    location ??= "Singapore";
    score += 75;
  }
  if (/\b(us|u\.s\.|usa|united states|america)\b/.test(text)) {
    tags.add("market_us");
    matchedTerms.push("us");
    location ??= "United States";
    score += 45;
  }

  for (const category of availableCategories) {
    const lower = category.toLowerCase();
    if (phraseMatches(text, lower) && !termIsFalseMatch(text, lower)) {
      categoryHints.push(category);
      score += 70 + lower.length;
      getCategoryTags(category).forEach((tag) => tags.add(tag));
    }
  }

  purchaseType ??= inferPurchaseType(tags);
  const amount = explicitAmount ?? parseAmountFromDescription(description);
  const missingContext: string[] = [];

  if (
    (tags.has("travel") || tags.has("hotel") || tags.has("airfare")) &&
    !channel
  ) {
    missingContext.push("booking channel");
  }
  if ((tags.has("online_retail") || tags.has("retail")) && !paymentMethod) {
    missingContext.push("payment method");
  }
  if (text.includes("travel") && !merchant && !travelProvider) {
    missingContext.push("merchant or provider");
  }

  const confidence: MatchConfidence =
    score >= 180 || matchedTerms.length >= 3
      ? "high"
      : score >= 90
        ? "medium"
        : score > 0
          ? "low"
          : "none";

  return {
    merchant,
    purchaseType,
    channel,
    paymentMethod,
    travelProvider,
    location,
    amount,
    tags: uniqueValues(Array.from(tags)),
    matchedTerms: uniqueValues(matchedTerms),
    missingContext: uniqueValues(missingContext),
    categoryHints: uniqueValues(categoryHints),
    confidence,
    score,
  };
}

function getCategoryTags(category: string): string[] {
  const text = category.toLowerCase();
  const tags = new Set<string>();

  if (
    /all purchases|all other|other eligible|other purchases|business purchases|other$|default/.test(
      text,
    )
  )
    addTag(tags, "default");
  if (/costco|wholesale club|warehouse/.test(text))
    addTag(tags, "warehouse_club");
  if (/whole foods/.test(text)) {
    addTag(tags, "whole_foods");
    addTag(tags, "amazon");
    addTag(tags, "grocery");
  }
  if (/amazon|aws/.test(text)) addTag(tags, "amazon");
  if (/walmart/.test(text)) addTag(tags, "walmart");
  if (/target/.test(text)) addTag(tags, "target");
  if (/apple purchases|apple store|app store/.test(text)) addTag(tags, "apple");
  if (/ace hardware/.test(text)) addTag(tags, "ace_hardware");
  if (/booking\.com/.test(text)) addTag(tags, "booking_com");
  if (/nike|snkrs|swoosh/.test(text)) addTag(tags, "nike");
  if (/apple pay/.test(text)) {
    addTag(tags, "apple_pay");
    addTag(tags, "mobile_wallet");
  }
  if (/mobile wallet|contactless/.test(text)) addTag(tags, "mobile_wallet");
  if (/paypal/.test(text)) addTag(tags, "paypal");
  if (/grocery|groceries|supermarket/.test(text)) addTag(tags, "grocery");
  if (/restaurant|dining|food delivery|eats and drinks|citi nights/.test(text))
    addTag(tags, "dining");
  if (/citi nights/.test(text)) addTag(tags, "citi_nights");
  if (/food delivery|uber eats|doordash/.test(text))
    addTag(tags, "food_delivery");
  // \b on `mobil` keeps it from firing inside "Mobile Payment".
  if (/\b(?:gas|fuel|petrol|exxon|mobil)\b/.test(text)) addTag(tags, "gas");
  if (/ev charging|chargepoint/.test(text)) addTag(tags, "ev_charging");
  if (/streaming|digital media|spotify|netflix|hulu/.test(text))
    addTag(tags, "streaming");
  if (/drugstore|pharmacy|watsons|walgreens|duane reade/.test(text))
    addTag(tags, "drugstore");
  if (/\b(?:rideshare|ride share|uber|lyft)\b/.test(text))
    addTag(tags, "rideshare");
  if (/\buber\b/.test(text)) addTag(tags, "uber");
  if (/\blyft\b/.test(text)) addTag(tags, "lyft");
  if (/\b(?:transit|commuting|commute|bus|train)\b/.test(text))
    addTag(tags, "transit");
  if (/rental car|car rentals|hertz/.test(text)) {
    addTag(tags, "rental_car");
    addTag(tags, "travel");
  }
  if (
    /hotel|hilton|hyatt|marriott|ihg|wyndham|choice|bonvoy|stays|lodging|vrbo/.test(
      text,
    )
  ) {
    addTag(tags, "hotel");
    addTag(tags, "travel");
  }
  if (/marriott|bonvoy/.test(text)) addTag(tags, "marriott");
  if (/hilton/.test(text)) addTag(tags, "hilton");
  if (/hyatt/.test(text)) addTag(tags, "hyatt");
  if (/ihg/.test(text)) addTag(tags, "ihg");
  if (/wyndham/.test(text)) addTag(tags, "wyndham");
  // "Choice Privileges" is the hotel brand; "Choice Category" is Bank of
  // America's pick-your-own-category bonus and has nothing to do with hotels.
  if (/choice (?:privileges|hotels)/.test(text)) addTag(tags, "choice");
  if (
    /flight|airline|airfare|air canada|aeroplan|united|delta|southwest|american airlines|alaska|hawaiian|jetblue|cathay/.test(
      text,
    )
  ) {
    addTag(tags, "airfare");
    addTag(tags, "airline");
    addTag(tags, "travel");
  }
  if (/united/.test(text)) addTag(tags, "united");
  if (/delta/.test(text)) addTag(tags, "delta");
  if (/american airlines|aadvantage/.test(text))
    addTag(tags, "american_airlines");
  if (/southwest|rapid rewards/.test(text)) addTag(tags, "southwest");
  if (/alaska/.test(text)) addTag(tags, "alaska");
  if (/hawaiian/.test(text)) addTag(tags, "hawaiian");
  if (/jetblue|trueblue/.test(text)) addTag(tags, "jetblue");
  if (/air canada|aeroplan/.test(text)) addTag(tags, "air_canada");
  if (/cathay|asia miles/.test(text)) addTag(tags, "cathay");
  if (/travel/.test(text)) addTag(tags, "travel");
  if (/chase travel|travel via chase/.test(text)) {
    addTag(tags, "travel_portal");
    addTag(tags, "chase_travel");
  }
  if (/capital one (?:business )?travel/.test(text)) {
    addTag(tags, "travel_portal");
    addTag(tags, "capital_one_travel");
  }
  if (/amex travel|american express travel/.test(text)) {
    addTag(tags, "travel_portal");
    addTag(tags, "amex_travel");
  }
  if (/citi travel/.test(text)) {
    addTag(tags, "travel_portal");
    addTag(tags, "citi_travel");
  }
  if (/travel center|bank of america travel center/.test(text)) {
    addTag(tags, "travel_portal");
    addTag(tags, "travel_center");
  }
  if (/renowned hotels|renowned resorts/.test(text)) {
    addTag(tags, "travel_portal");
    addTag(tags, "renowned_hotels");
    addTag(tags, "hotel");
    addTag(tags, "travel");
  }
  if (/expedia|hotels\.com|vrbo|booking\.com/.test(text)) {
    addTag(tags, "ota");
    addTag(tags, "expedia_group");
  }
  if (
    /direct flights?|direct hotels?|direct airfare|direct airline|booked direct(?:ly)?|directly with|direct flights and hotels/.test(
      text,
    )
  ) {
    addTag(tags, "direct_booking");
  }
  if (/online|digital|mobile payment/.test(text)) addTag(tags, "online");
  if (/online retail|online spend/.test(text)) addTag(tags, "online_retail");
  if (/entertainment|sports|recreation|self-care/.test(text))
    addTag(tags, "entertainment");
  if (/phone|wireless|telecom|internet|cable|satellite/.test(text))
    addTag(tags, "phone");
  if (/utilities|utility|monthly bills|bills/.test(text))
    addTag(tags, "utilities");
  if (/monthly bills|bills/.test(text)) addTag(tags, "phone");
  if (/office supplies/.test(text)) addTag(tags, "office_supplies");
  if (/advertising|social media|search advertising/.test(text))
    addTag(tags, "advertising");
  if (/shipping/.test(text)) addTag(tags, "shipping");
  if (/business/.test(text)) addTag(tags, "business");
  if (/home improvement|lowe/.test(text)) addTag(tags, "home_improvement");
  if (/fitness|gym/.test(text)) addTag(tags, "fitness");
  if (/\brent\b/.test(text)) addTag(tags, "rent");
  if (/non-u\.s\.|foreign|overseas|u\.s\. dollar/.test(text))
    addTag(tags, "foreign");
  if (/verizon/.test(text)) addTag(tags, "verizon");

  return Array.from(tags);
}

function categoryRequiresUnspecifiedPortal(
  categoryTags: Set<string>,
  contextTags: Set<string>,
) {
  if (!categoryTags.has("travel_portal")) return false;
  if (categoryTags.has("direct_booking") && contextTags.has("direct_booking")) {
    return false;
  }
  const specificPortal = PORTAL_TAGS.find((tag) => categoryTags.has(tag));
  if (specificPortal) return !contextTags.has(specificPortal);
  return !contextTags.has("travel_portal") && !contextTags.has("ota");
}

function getContextualDefaultCategoryLabel(
  context: ParsedPurchaseContext,
): string {
  const contextTags = new Set(context.tags);

  if (contextTags.has("travel_portal")) {
    return context.channel ?? "Travel Portal";
  }
  if (contextTags.has("ota")) return context.channel ?? "Online Travel Agency";
  if (contextTags.has("airfare")) {
    return contextTags.has("direct_booking") ? "Direct Airfare" : "Airfare";
  }
  if (contextTags.has("hotel")) {
    return contextTags.has("direct_booking") ? "Direct Hotel" : "Hotel";
  }
  if (contextTags.has("rental_car")) return "Rental Car";
  if (contextTags.has("gas")) return "Gas";
  if (contextTags.has("ev_charging")) return "EV Charging";
  if (contextTags.has("grocery")) return "Groceries";
  if (contextTags.has("dining")) return "Dining";
  if (contextTags.has("warehouse_club")) return "Wholesale Clubs";
  if (contextTags.has("online_retail")) return "Online Retail";
  if (contextTags.has("streaming")) return "Streaming";
  if (contextTags.has("drugstore")) return "Drugstores";
  if (contextTags.has("transit")) return "Transit";
  if (contextTags.has("rideshare")) return "Rideshare";
  if (contextTags.has("phone")) return "Phone";
  if (contextTags.has("utilities")) return "Bills";
  if (contextTags.has("office_supplies")) return "Office Supplies";
  if (contextTags.has("advertising")) return "Advertising";
  if (contextTags.has("shipping")) return "Shipping";
  if (contextTags.has("home_improvement")) return "Home Improvement";
  if (contextTags.has("rent")) return "Rent";
  if (context.purchaseType) return titleCaseWords(context.purchaseType);
  return "Base Purchases";
}

function isCatchAllCategoryLabel(category: string): boolean {
  const normalized = category.trim().toLowerCase();
  return (
    normalized === "default" ||
    normalized === "all purchases" ||
    normalized === "all eligible purchases" ||
    normalized === "all other purchases" ||
    normalized.startsWith("other")
  );
}

function getSuggestedCategoryLabel(
  category: CreditCard["cashbackCategories"][number],
  context: ParsedPurchaseContext,
  isDefaultRate: boolean,
): string {
  if (!isDefaultRate) return category.category;
  if (isCatchAllCategoryLabel(category.category)) {
    return getContextualDefaultCategoryLabel(context);
  }
  return category.category;
}

function hasProviderSpecificMismatch(
  categoryTags: Set<string>,
  contextTags: Set<string>,
  matchedTags: string[],
): boolean {
  const categoryProviders = PROVIDER_SPECIFIC_TAGS.filter((tag) =>
    categoryTags.has(tag),
  );
  if (categoryProviders.length === 0) return false;
  if (categoryProviders.some((tag) => contextTags.has(tag))) return false;

  const independentMatch = matchedTags.some(
    (tag) =>
      !PROVIDER_SPECIFIC_TAGS.includes(tag) &&
      !GENERIC_TRAVEL_MATCH_TAGS.has(tag),
  );
  return !independentMatch;
}

function scoreCategoryForPurchase(
  category: CreditCard["cashbackCategories"][number],
  context: ParsedPurchaseContext,
): CategoryMatch | null {
  if (category.isDefault) return null;

  const categoryTags = new Set(getCategoryTags(category.category));
  const contextTags = new Set(context.tags);
  let score = 0;
  const matchedTags: string[] = [];

  if (context.categoryHints.includes(category.category)) {
    score += 120;
    matchedTags.push("exact category");
  }

  for (const tag of contextTags) {
    if (!categoryTags.has(tag)) continue;
    score += TAG_WEIGHTS[tag] ?? 25;
    if (SPECIFIC_MATCH_TAGS.has(tag)) score += 90;
    matchedTags.push(tag);
  }

  if (context.purchaseType && categoryTags.has(context.purchaseType))
    score += 35;
  if (context.channel && categoryTags.has("travel_portal")) score += 15;
  if (
    context.paymentMethod &&
    (categoryTags.has("apple_pay") ||
      categoryTags.has("mobile_wallet") ||
      categoryTags.has("paypal"))
  )
    score += 20;

  if (
    contextTags.has("warehouse_club") &&
    categoryTags.has("grocery") &&
    !categoryTags.has("warehouse_club")
  ) {
    return null;
  }
  if (
    (contextTags.has("costco") ||
      contextTags.has("walmart") ||
      contextTags.has("target")) &&
    categoryTags.has("grocery") &&
    !["costco", "walmart", "target", "warehouse_club"].some((tag) =>
      categoryTags.has(tag),
    )
  ) {
    return null;
  }
  if (
    (categoryTags.has("apple_pay") || categoryTags.has("mobile_wallet")) &&
    !contextTags.has("apple_pay") &&
    !contextTags.has("mobile_wallet")
  ) {
    return null;
  }
  if (categoryTags.has("citi_nights") && !contextTags.has("citi_nights")) {
    return null;
  }
  if (hasProviderSpecificMismatch(categoryTags, contextTags, matchedTags)) {
    return null;
  }
  if (
    contextTags.has("ota") &&
    PROVIDER_SPECIFIC_TAGS.some((tag) => categoryTags.has(tag)) &&
    !categoryTags.has("ota") &&
    !categoryTags.has("expedia_group") &&
    !categoryTags.has("travel_portal")
  ) {
    return null;
  }
  if (categoryRequiresUnspecifiedPortal(categoryTags, contextTags)) {
    return null;
  }
  if (
    contextTags.has("direct_booking") &&
    categoryTags.has("travel_portal") &&
    !categoryTags.has("direct_booking")
  ) {
    return null;
  }
  if (
    categoryTags.has("direct_booking") &&
    (contextTags.has("travel_portal") || contextTags.has("ota")) &&
    !categoryTags.has("travel_portal")
  ) {
    return null;
  }

  if (score < 45) return null;

  return {
    category,
    score,
    matchedTags: uniqueValues(matchedTags),
    reason: `Matched ${uniqueValues(matchedTags).slice(0, 3).map(formatMatchTag).join(", ") || "purchase context"} for ${category.category}.`,
  };
}

function findBestCategoryMatch(
  card: CreditCard,
  context: ParsedPurchaseContext,
): CategoryMatch | null {
  return (
    card.cashbackCategories
      .map((category) => scoreCategoryForPurchase(category, context))
      .filter((match): match is CategoryMatch => match !== null)
      .sort((a, b) => {
        const scoreDelta = b.score - a.score;
        if (scoreDelta !== 0) return scoreDelta;
        return b.category.rate - a.category.rate;
      })[0] ?? null
  );
}

function getDefaultCategory(card: CreditCard) {
  const flagged = card.cashbackCategories.find((category) => category.isDefault);
  if (flagged) return flagged;

  // `reduce` without a seed throws on an empty list, which would take down
  // every page that prices this card rather than just this one row.
  return card.cashbackCategories.length
    ? card.cashbackCategories.reduce((a, b) => (a.rate <= b.rate ? a : b))
    : null;
}

function getCardMarket(card: CreditCard): string {
  return (card as CreditCardMetadata).market ?? "US";
}

function getCardCurrency(card: CreditCard): string | null {
  return (card as CreditCardMetadata).currency ?? null;
}

function getPreferredMarket(
  context: ParsedPurchaseContext,
  walletMarkets: string[],
): string {
  if (context.tags.includes("market_canada")) return "Canada";
  if (context.tags.includes("market_hong_kong")) return "Hong Kong";
  if (context.tags.includes("market_singapore")) return "Singapore";
  if (context.tags.includes("market_us")) return "US";

  // With nothing in the description to go on, the wallet is the best available
  // signal — defaulting to "US" recommended cards a Hong Kong or Singapore user
  // could not apply for. An empty or mixed wallet still needs *a* market
  // though: dropping the filter entirely offers every market at once, which is
  // worse than a wrong-but-coherent default.
  const counts = new Map<string, number>();
  for (const market of walletMarkets) {
    counts.set(market, (counts.get(market) ?? 0) + 1);
  }
  if (!counts.size) return "US";

  return [...counts.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  )[0]![0];
}

function getMarketScopedCatalog(
  cards: CreditCard[],
  context: ParsedPurchaseContext,
  walletMarkets: string[],
): CreditCard[] {
  const preferredMarket = getPreferredMarket(context, walletMarkets);
  const scopedCards = cards.filter(
    (card) => getCardMarket(card) === preferredMarket,
  );
  return scopedCards.length > 0 ? scopedCards : cards;
}

function getRewardUnitName(card: CreditCard): string {
  if (card.rewardType === "miles") return "Miles";
  if (card.rewardType === "points") return "Points";
  return card.rewardUnitName ?? "Cash Back";
}

function formatNativeRewardEstimate(
  card: CreditCard,
  amount: number | null,
  rawRate: number,
): string | null {
  if (amount == null) return null;
  if (card.rewardType === "cashback") {
    const currency = getCardCurrency(card) ?? "USD";
    const value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount * rawRate);
    return `${value} Cash Back`;
  }
  const units = Math.round(amount * rawRate * 100).toLocaleString("en-US");
  return `${units} ${getRewardUnitName(card)}`;
}

function applySpendCapToRate(
  state: LocalState,
  walletCard: LocalWalletCard | null,
  card: CreditCard,
  category: CreditCard["cashbackCategories"][number],
  amount: number | null,
): { rawRate: number; rulesApplied: string[] } {
  const rulesApplied: string[] = [];
  const spendCap = parseSpendCap(category.category);
  const defaultRate = getDefaultCategory(card)?.rate ?? 0;

  if (!spendCap || category.rate <= defaultRate) {
    return { rawRate: category.rate, rulesApplied };
  }

  // With no amount there is nothing to split across the cap, but the cap may
  // already be spent — quoting the headline rate on an exhausted category is
  // the wrong answer, so check consumption before deciding.
  const periodStart = spendCapPeriodStart(new Date(), spendCap.period);
  const capGroup = normalizeCapGroup(category.category, spendCap);
  const now = new Date();
  const cappedSpendUsed = walletCard
    ? state.transactions
        .filter(
          (transaction) =>
            matchesWalletCardId(transaction, walletCard.id) &&
            isPurchaseTransaction(transaction) &&
            isInLocalDateRange(transaction.date, periodStart, now) &&
            transactionMatchesSpendCapGroup(card, transaction, capGroup),
        )
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    : 0;
  const capRemaining = Math.max(0, spendCap.amount - cappedSpendUsed);
  const capLabel = `$${spendCap.amount.toLocaleString("en-US")} per ${spendCap.period}`;

  if (capRemaining <= 0) {
    rulesApplied.push(`${capLabel} cap already used — earning the base rate`);
    return { rawRate: defaultRate, rulesApplied };
  }

  if (amount == null || amount <= 0) {
    rulesApplied.push(
      `Bonus rate applies to the first $${capRemaining.toLocaleString("en-US", { maximumFractionDigits: 0 })} left under the ${capLabel} cap`,
    );
    return { rawRate: category.rate, rulesApplied };
  }

  const bonusAmount = Math.min(amount, capRemaining);
  const baseAmount = amount - bonusAmount;
  const rawReward = bonusAmount * category.rate + baseAmount * defaultRate;
  const rawRate = rawReward / amount;

  rulesApplied.push(
    capRemaining >= amount
      ? `Within ${capLabel} cap`
      : `Cap split: ${bonusAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })} at bonus rate`,
  );

  return { rawRate: Number(rawRate.toFixed(4)), rulesApplied };
}

function suggestedFromCard(
  state: LocalState,
  card: CreditCard,
  walletCard: LocalWalletCard | null,
  context: ParsedPurchaseContext,
  amount: number | null,
): SuggestedCard {
  const categoryMatch = findBestCategoryMatch(card, context);
  // A card with no priced categories cannot be ranked, but it must not take
  // down the whole suggestion list either.
  const effective = categoryMatch?.category ??
    getDefaultCategory(card) ?? {
      id: -1,
      cardId: card.id,
      category: "Other",
      rate: 0,
      isDefault: true,
    };
  const isDefaultRate = !categoryMatch;
  const matchedCategory = getSuggestedCategoryLabel(
    effective,
    context,
    isDefaultRate,
  );
  const { rawRate, rulesApplied } = isDefaultRate
    ? { rawRate: effective.rate, rulesApplied: [] as string[] }
    : applySpendCapToRate(state, walletCard, card, effective, amount);
  const valueMultiplier = getRewardUnitValueMultiplier(card);
  const effectiveCashbackRate = rawRate * valueMultiplier;
  const confidence = isDefaultRate
    ? context.confidence === "none"
      ? 0.2
      : 0.35
    : Math.min(
        1,
        Math.max(0.45, (categoryMatch.score + context.score * 0.25) / 220),
      );

  return {
    cardId: card.id,
    walletCardId: walletCard?.id ?? null,
    cardName: card.name,
    issuer: card.issuer,
    network: card.network,
    market: getCardMarket(card),
    currency: getCardCurrency(card),
    color: card.color ?? "linear-gradient(135deg, #1e3a5f, #2d6a9f)",
    cardImageUrl: card.cardImageUrl ?? null,
    annualFee: card.annualFee ?? 0,
    cashbackRate: Number(effectiveCashbackRate.toFixed(4)),
    rewardRate: Number(rawRate.toFixed(4)),
    rewardUnitName: getRewardUnitName(card),
    rewardEstimate: formatNativeRewardEstimate(card, amount, rawRate),
    matchedCategory,
    isDefaultRate,
    expectedCashback:
      amount != null
        ? Number((amount * effectiveCashbackRate).toFixed(2))
        : null,
    matchReason: null,
    confidence: Number(confidence.toFixed(2)),
    matchedTags: categoryMatch?.matchedTags ?? [],
    rulesApplied,
  };
}

/**
 * Ranks two candidates for a single purchase.
 *
 * Cards already in the wallet win ties outright: their annual fee is a sunk
 * cost, whereas recommending a $795-fee card the user does not hold — over one
 * they do — is only right if that one purchase justifies the fee, which no
 * single purchase does. Fee is a tie-breaker among cards not yet held, not a
 * factor in the earn rate itself.
 */
function compareSuggestedCards(a: SuggestedCard, b: SuggestedCard): number {
  const valueDelta = b.cashbackRate - a.cashbackRate;
  if (Math.abs(valueDelta) > 0.0001) return valueDelta;

  const aHeld = a.walletCardId != null;
  const bHeld = b.walletCardId != null;
  if (aHeld !== bHeld) return aHeld ? -1 : 1;

  const confidenceDelta = (b.confidence ?? 0) - (a.confidence ?? 0);
  if (Math.abs(confidenceDelta) > 0.001) return confidenceDelta;
  if (a.isDefaultRate !== b.isDefaultRate) return a.isDefaultRate ? 1 : -1;

  const feeDelta = (a.annualFee ?? 0) - (b.annualFee ?? 0);
  if (Math.abs(feeDelta) > 0.001) return feeDelta;

  return a.cardName.localeCompare(b.cardName);
}

function getDetectedCategoryLabel(
  context: ParsedPurchaseContext,
  suggestions: SuggestedCard[],
): string {
  const specific = suggestions.find((suggestion) => !suggestion.isDefaultRate);
  if (specific) return specific.matchedCategory;
  if (context.purchaseType) {
    return context.purchaseType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return "Other";
}

function buildSuggestionReasoning(
  bestWalletCard: SuggestedCard | null,
  bestOverallCard: SuggestedCard | null,
): string {
  if (!bestWalletCard && !bestOverallCard)
    return "No cards available to evaluate.";
  return "";
}

export const useSuggestCard = () =>
  useMutation({
    mutationFn: async ({
      data,
    }: {
      data: { description: string; amount?: number | null };
    }): Promise<CardSuggestion> => {
      const amount =
        data.amount != null && Number.isFinite(data.amount)
          ? data.amount
          : null;
      const state = readState();
      const cards = getCatalog();
      const walletCards = listWalletCards(state);
      const rawWalletByCardId = new Map(
        state.walletCards.map((w) => [w.cardId, w]),
      );
      const availableCategories = new Set(
        cards.flatMap((card) => card.cashbackCategories.map((c) => c.category)),
      );
      const parsedContext = parsePurchaseContext(
        data.description,
        amount,
        availableCategories,
      );
      const effectiveAmount = parsedContext.amount ?? amount;
      const marketScopedCards = getMarketScopedCatalog(
        cards,
        parsedContext,
        walletCards.map((walletCard) => getCardMarket(walletCard.card)),
      );

      const walletSuggestions = walletCards
        .map((walletCard) =>
          suggestedFromCard(
            state,
            walletCard.card,
            rawWalletByCardId.get(walletCard.cardId) ?? null,
            parsedContext,
            effectiveAmount,
          ),
        )
        .sort(compareSuggestedCards);
      const overallSuggestions = marketScopedCards
        .map((card) =>
          suggestedFromCard(
            state,
            card,
            rawWalletByCardId.get(card.id) ?? null,
            parsedContext,
            effectiveAmount,
          ),
        )
        .sort(compareSuggestedCards);

      const bestWalletCard = walletSuggestions[0] ?? null;
      const bestOverallCard = overallSuggestions[0] ?? null;
      const topLibraryCards = overallSuggestions
        .filter((suggestion) => suggestion.walletCardId == null)
        .slice(0, 3);
      const upgradeAvailable = Boolean(
        topLibraryCards[0] &&
        (!bestWalletCard ||
          topLibraryCards[0].cashbackRate >
            bestWalletCard.cashbackRate + 0.0001),
      );
      const detectedCategory = getDetectedCategoryLabel(
        parsedContext,
        walletSuggestions.length > 0 ? walletSuggestions : overallSuggestions,
      );
      const reasoning = buildSuggestionReasoning(
        bestWalletCard,
        bestOverallCard,
      );
      const clarifyingQuestion =
        parsedContext.missingContext.length > 0
          ? `Add ${parsedContext.missingContext[0]} for a sharper recommendation.`
          : null;

      return {
        description: data.description,
        amount: effectiveAmount,
        detectedCategory,
        matchConfidence: parsedContext.confidence,
        bestWalletCard,
        bestOverallCard,
        upgradeAvailable,
        reasoning,
        parsedContext: {
          merchant: parsedContext.merchant,
          purchaseType: parsedContext.purchaseType,
          channel: parsedContext.channel,
          paymentMethod: parsedContext.paymentMethod,
          travelProvider: parsedContext.travelProvider,
          location: parsedContext.location,
          amount: parsedContext.amount,
          tags: parsedContext.tags,
          matchedTerms: parsedContext.matchedTerms,
          missingContext: parsedContext.missingContext,
        },
        walletAlternatives: walletSuggestions
          .filter((suggestion) => suggestion.cardId !== bestWalletCard?.cardId)
          .slice(0, 3),
        overallAlternatives: topLibraryCards,
        clarifyingQuestion,
        parserMode: "local-rule-engine",
      };
    },
  });
