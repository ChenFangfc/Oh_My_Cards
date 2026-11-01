import { useMutation, useQuery } from "@tanstack/react-query";
import { BUILTIN_CARDS, BUILTIN_RULESET_VERSION } from "./catalog";
import { CreditCardNetwork } from "../generated/api.schemas";
import type {
  AddToWalletBody,
  BenefitPeriodState,
  BenefitUsage,
  CardBenefit,
  CardBenefitPeriod,
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
/**
 * Published card rules live under their own key. They used to sit inside the
 * user's state, which put a ~450 KB catalog through JSON.parse and full
 * normalization on every single read — several times per render.
 */
const CATALOG_OVERRIDE_KEY = "oh-my-card:catalog-override:v1";
/** When the app last asked the rules feed for news, and what it heard. */
const RULES_STATUS_KEY = "oh-my-card:rules-status:v1";
/** `2026.11.01.13`: the UTC day the catalog last changed, then a serial. */
const RULESET_VERSION_PATTERN = /^(\d{4})\.(\d{2})\.(\d{2})\.(\d{1,6})$/;
/**
 * Publishing stamps the day's UTC date, so a version far ahead of the device's
 * clock is bogus — and, since rules only move forward, it would otherwise
 * block every real update until that date.
 */
const MAX_RULESET_VERSION_LEAD_MS = 7 * 24 * 60 * 60 * 1000;
/** The published feed is about 0.5 MB; anything far larger is not one. */
const MAX_CARD_RULES_CHARS = 8 * 1024 * 1024;
/** What a card without (or with an unusable) colour is painted with. */
const DEFAULT_CARD_COLOR = "linear-gradient(135deg, #1e3a5f, #2d6a9f)";
const STORAGE_DB_NAME = "oh-my-cards-local-data";
const STORAGE_DB_VERSION = 1;
const STORAGE_STORE_NAME = "state";
const STORAGE_RECORD_KEY = "primary";
const BACKUP_APP_NAME = "Oh My Cards";
const BACKUP_FORMAT_VERSION = 1;
/**
 * Highest rules-payload schema this build understands. A feed published for a
 * newer app (one whose rules carry semantics this build would misread) is
 * skipped rather than applied half-understood.
 */
export const SUPPORTED_RULES_SCHEMA = 2;

// ---- UI text -------------------------------------------------------------------

export type UiTextVars = Record<string, string | number>;
export type UiTextTranslator = (text: string, vars?: UiTextVars) => string;

function fillUiText(text: string, vars?: UiTextVars): string {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match,
  );
}

let uiTextTranslator: UiTextTranslator = fillUiText;

/**
 * Sentences built here (recommendation notes, errors shown in toasts) are
 * English templates with {placeholders}. The app hands over its translator so
 * they follow the UI language; card rules themselves stay as published.
 */
export function setUiTextTranslator(translator: UiTextTranslator | null): void {
  uiTextTranslator = translator ?? fillUiText;
}

function uiText(text: string, vars?: UiTextVars): string {
  return uiTextTranslator(text, vars);
}

/** An Error whose message follows the UI language. */
function uiError(text: string, vars?: UiTextVars): Error {
  return new Error(uiText(text, vars));
}

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
  /** Mirrors the most recent use; kept so older builds can still read a backup. */
  used: boolean;
  usedAt?: string | null;
  /**
   * Every time the benefit was marked used. A monthly credit is used up to
   * twelve times a year, so a single flag cannot say how much of it was
   * captured — this log is what the current period and the annual-fee
   * progress are both read from.
   */
  history?: string[] | null;
}

export interface CatalogOverride {
  version: string;
  cards: CreditCard[];
  notes?: string;
  publishedAt?: string;
}

export interface LocalState {
  schemaVersion: 1;
  ruleSetVersion: string;
  /**
   * Legacy location of downloaded card rules. Read once to migrate them to
   * their own storage key; never written any more.
   */
  catalogOverride?: CatalogOverride | null;
  nextWalletCardId: number;
  nextTransactionId: number;
  walletCards: LocalWalletCard[];
  transactions: Transaction[];
  benefitUsage: LocalBenefitUsage[];
  /** Stamped on every write; decides which storage backend is newer at boot. */
  updatedAt?: string | null;
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
    // Backups are files from anywhere: an object where a name belongs would
    // crash every page that renders it.
    cardName: typeof value.cardName === "string" ? value.cardName : undefined,
    merchantName: typeof value.merchantName === "string" ? value.merchantName : null,
    locationName: typeof value.locationName === "string" ? value.locationName : null,
    latitude: toNullableFiniteNumber(value.latitude),
    longitude: toNullableFiniteNumber(value.longitude),
  };
}

function normalizeBenefitUsageRecord(
  value: Partial<LocalBenefitUsage>,
): LocalBenefitUsage | null {
  const walletCardId = toFiniteNumber(value.walletCardId, -1);
  const benefitId = toFiniteNumber(value.benefitId, -1);
  if (walletCardId <= 0 || benefitId <= 0) return null;

  const usedAt = toTrimmedString(value.usedAt) || null;
  const history = normalizeBenefitHistory(value.history);

  // Records written before the usage log existed carry only the flag. A use
  // without a date was counted as "used this year", so it is dated now — the
  // closest reading that keeps today's screen unchanged.
  if (!history.length && value.used) {
    history.push(usedAt && isValidDateString(usedAt) ? usedAt : new Date().toISOString());
  }

  const latest = history[history.length - 1] ?? null;
  return {
    walletCardId,
    benefitId,
    used: history.length > 0,
    usedAt: latest,
    history,
  };
}

const MAX_BENEFIT_HISTORY = 120;

function isValidDateString(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime());
}

function normalizeBenefitHistory(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const dates = value
    .map((entry) => toTrimmedString(entry))
    .filter((entry) => entry && isValidDateString(entry))
    .map((entry) => new Date(entry).toISOString());
  return [...new Set(dates)].sort().slice(-MAX_BENEFIT_HISTORY);
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

  // Only known fields are kept. Card rules are not user data and live under
  // their own key, so a legacy copy in here is dropped; anything else in a
  // backup file would ride along into storage unchecked.
  const updatedAt =
    typeof parsed.updatedAt === "string" || parsed.updatedAt === null
      ? { updatedAt: parsed.updatedAt }
      : {};

  return {
    ...defaultState(),
    ...updatedAt,
    schemaVersion: 1,
    ruleSetVersion:
      typeof parsed.ruleSetVersion === "string"
        ? parsed.ruleSetVersion
        : BUILTIN_RULESET_VERSION,
    nextWalletCardId,
    nextTransactionId,
    walletCards,
    transactions,
    benefitUsage,
  };
}

/**
 * A stored override replaces the entire catalog, so a corrupted or hand-edited
 * one would crash every page that prices a card. Anything that does not survive
 * normalization is dropped in favour of the built-in rules.
 */
function normalizeCatalogOverride(
  override: LocalState["catalogOverride"],
): CatalogOverride | null {
  if (!override?.version || !Array.isArray(override.cards)) return null;
  // Written by an older build, or tampered with: fall back to built-in rules,
  // and the next check downloads a good copy.
  if (!isWellFormedRuleSetVersion(override.version)) return null;

  try {
    const cards = normalizeRemoteCatalog(override.cards);
    return cards.length
      ? {
          ...override,
          cards,
          notes: typeof override.notes === "string" ? override.notes : undefined,
          publishedAt:
            typeof override.publishedAt === "string" ? override.publishedAt : undefined,
        }
      : null;
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
      if (value.catalogOverride) adoptLegacyCatalogOverride(value.catalogOverride);
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

/**
 * The last raw string read from (or written to) localStorage, and what it
 * normalized to. Every query hook reads state synchronously, often several
 * times per render, so re-parsing an unchanged string each time was pure
 * waste. Keying the cache on the stored text itself keeps it honest across
 * tabs: another tab's write changes the text, which misses the cache.
 */
let cachedStateRaw: string | null = null;
let cachedState: LocalState | null = null;

function readLocalStorageState(): LocalState | null {
  if (!canUseLocalStorage()) return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    if (raw === cachedStateRaw && cachedState) return cachedState;

    const parsed = JSON.parse(raw) as Partial<LocalState>;
    if (parsed.schemaVersion !== 1) return null;

    const state = normalizeLocalState(parsed);
    let storedRaw = raw;
    if (parsed.catalogOverride) {
      // One-time move of downloaded rules out of the user's state.
      adoptLegacyCatalogOverride(parsed.catalogOverride);
      storedRaw = JSON.stringify(state);
      try {
        window.localStorage.setItem(STORAGE_KEY, storedRaw);
      } catch {
        storedRaw = raw;
      }
    }

    cachedStateRaw = storedRaw;
    cachedState = state;
    return state;
  } catch {
    return null;
  }
}

let catalogOverrideLoaded = false;
let catalogOverrideValue: CatalogOverride | null = null;
let catalogOverrideListenerAttached = false;

function attachCatalogOverrideListener(): void {
  if (catalogOverrideListenerAttached || typeof window === "undefined") return;
  catalogOverrideListenerAttached = true;
  // Another tab may download newer rules; drop the in-memory copy so this tab
  // picks them up on its next read instead of pricing with stale ones.
  window.addEventListener("storage", (event) => {
    if (event.key === CATALOG_OVERRIDE_KEY || event.key === null) {
      catalogOverrideLoaded = false;
    }
  });
}

function readStoredCatalogOverride(): CatalogOverride | null {
  if (catalogOverrideLoaded) return catalogOverrideValue;
  attachCatalogOverrideListener();

  if (canUseLocalStorage()) {
    try {
      const raw = window.localStorage.getItem(CATALOG_OVERRIDE_KEY);
      catalogOverrideValue = raw
        ? normalizeCatalogOverride(JSON.parse(raw) as CatalogOverride)
        : null;
    } catch {
      catalogOverrideValue = null;
    }
  }
  // Without localStorage the override only ever lives in memory, so whatever
  // this session downloaded stays in effect until it closes.
  catalogOverrideLoaded = true;
  return catalogOverrideValue;
}

function writeStoredCatalogOverride(override: CatalogOverride | null): void {
  catalogOverrideValue = override;
  catalogOverrideLoaded = true;
  if (!canUseLocalStorage()) return;

  try {
    if (override) {
      window.localStorage.setItem(CATALOG_OVERRIDE_KEY, JSON.stringify(override));
    } else {
      window.localStorage.removeItem(CATALOG_OVERRIDE_KEY);
    }
  } catch {
    // Quota: the rules stay in memory for this session and are re-downloaded
    // on the next launch. Built-in rules remain the floor either way.
  }
}

/**
 * Drops this window's read caches. The desktop app runs two webviews (the
 * main window and the menu bar panel) over one storage; when the other one
 * writes, this one must not keep serving what it read before.
 */
export function refreshLocalCaches(): void {
  cachedStateRaw = null;
  cachedState = null;
  catalogOverrideLoaded = false;
}

function adoptLegacyCatalogOverride(legacy: unknown): void {
  const override = normalizeCatalogOverride(legacy as LocalState["catalogOverride"]);
  if (!override) return;

  const current = readStoredCatalogOverride();
  if (current && compareRuleSetVersions(current.version, override.version) >= 0) {
    return;
  }
  writeStoredCatalogOverride(override);
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

/**
 * Set when the latest write could not reach localStorage (usually quota).
 * localStorage then still holds an older state, and reading it would quietly
 * undo the change the user just made, so this session reads its own last
 * write until a localStorage write succeeds again.
 */
let localStorageStale = false;

function readState(): LocalState {
  if (localStorageStale && lastWrittenState) return lastWrittenState;
  return readLocalStorageState() ?? lastWrittenState ?? defaultState();
}

function writeState(state: LocalState): void {
  const normalized = {
    ...normalizeLocalState(state),
    updatedAt: new Date().toISOString(),
  };
  lastWrittenState = normalized;

  let storedSomewhere = false;

  if (canUseLocalStorage()) {
    try {
      const raw = JSON.stringify(normalized);
      window.localStorage.setItem(STORAGE_KEY, raw);
      cachedStateRaw = raw;
      cachedState = normalized;
      localStorageStale = false;
      storedSomewhere = true;
      persistenceFailure = null;
    } catch (error) {
      // Quota is the common case. IndexedDB has a far larger budget, so the
      // write below may still succeed — do not bail out here.
      localStorageStale = true;
      persistenceFailure =
        error instanceof Error && error.name === "QuotaExceededError"
          ? uiText("Browser storage is full. Export a backup and remove old transactions.")
          : uiText("This browser blocked local storage. Data will not survive a reload.");
    }
  }

  if (canUseIndexedDb()) {
    queueIndexedDbWrite(normalized);
    storedSomewhere = true;
  }

  if (!storedSomewhere) {
    persistenceFailure = uiText(
      "No browser storage is available. Data will be lost when this tab closes.",
    );
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
    const indexedDbState = await withTimeout(readIndexedDbState(), 3_000);

    // Both backends are written on every change, but a localStorage write can
    // fail on quota while IndexedDB succeeds. Whichever saw the latest write
    // wins, so a full localStorage cannot roll the wallet back on reload.
    const indexedDbIsNewer =
      indexedDbState !== null &&
      (localStorageState === null ||
        (indexedDbState.updatedAt ?? "") > (localStorageState.updatedAt ?? ""));

    if (indexedDbIsNewer && indexedDbState) {
      lastWrittenState = indexedDbState;
      try {
        const raw = JSON.stringify(indexedDbState);
        window.localStorage?.setItem(STORAGE_KEY, raw);
        cachedStateRaw = raw;
        cachedState = indexedDbState;
      } catch {
        localStorageStale = true;
      }
    } else if (localStorageState) {
      lastWrittenState = localStorageState;
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
      throw uiError("Backup file is not valid JSON.");
    }
  } else {
    backup = input;
  }

  if (
    backup.app !== BACKUP_APP_NAME ||
    backup.formatVersion !== BACKUP_FORMAT_VERSION
  ) {
    throw uiError("Backup file is not compatible with Oh My Cards.");
  }
  if (!backup.state || backup.state.schemaVersion !== 1) {
    throw uiError("Backup file is missing a valid local state.");
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
    hasCatalogOverride: Boolean(getCatalogOverride()),
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

/** Downloaded rules, but only while they are newer than the ones built in. */
function getCatalogOverride(): CatalogOverride | null {
  const override = readStoredCatalogOverride();
  if (!override?.cards?.length) return null;
  return compareRuleSetVersions(override.version, BUILTIN_RULESET_VERSION) >= 0
    ? override
    : null;
}

function activeCatalogCards(): CreditCard[] {
  return getCatalogOverride()?.cards ?? (BUILTIN_CARDS as unknown as CreditCard[]);
}

/**
 * id → card for the active catalog. Rebuilt only when the catalog array itself
 * changes; looking a card up used to copy all 182 cards first.
 */
let catalogIndex: { source: CreditCard[]; byId: Map<number, CreditCard> } | null =
  null;

function getCatalogIndex(): Map<number, CreditCard> {
  const cards = activeCatalogCards();
  if (!catalogIndex || catalogIndex.source !== cards) {
    catalogIndex = {
      source: cards,
      byId: new Map(cards.map((card) => [card.id, card])),
    };
  }
  return catalogIndex.byId;
}

function getCatalog(): CreditCard[] {
  const state = readState();
  const walletCardIds = new Set(state.walletCards.map((w) => w.cardId));
  return activeCatalogCards().map((card) => ({
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
  /** Rules payload schema; absent means 1. See SUPPORTED_RULES_SCHEMA. */
  schema?: number;
}

/** What changed between two rulesets, in terms a cardholder cares about. */
export interface CardRulesChangeSummary {
  added: string[];
  removed: string[];
  /** One line per changed card, e.g. "Amex Gold: annual fee $325 → $350". */
  changed: Array<{ cardId: number; name: string; details: string[] }>;
}

export interface CardRulesUpdateResult {
  updated: boolean;
  version: string;
  notes?: string;
  changes?: CardRulesChangeSummary;
  /** Names of wallet cards whose rules changed in this update. */
  walletCardsChanged?: string[];
}

export interface CardRulesStatus {
  /** Last time the feed was asked, successful or not. */
  lastCheckedAt: string | null;
  lastOutcome: "updated" | "up-to-date" | "error" | "skipped" | null;
  lastError: string | null;
  /** The most recent update that was actually applied. */
  lastUpdate: {
    version: string;
    appliedAt: string;
    notes?: string;
    changes?: CardRulesChangeSummary;
  } | null;
}

const EMPTY_RULES_STATUS: CardRulesStatus = {
  lastCheckedAt: null,
  lastOutcome: null,
  lastError: null,
  lastUpdate: null,
};

let rulesStatusMemory: CardRulesStatus = EMPTY_RULES_STATUS;

export function getCardRulesStatus(): CardRulesStatus {
  if (!canUseLocalStorage()) return rulesStatusMemory;
  try {
    const raw = window.localStorage.getItem(RULES_STATUS_KEY);
    if (!raw) return rulesStatusMemory;
    const parsed = JSON.parse(raw) as Partial<CardRulesStatus>;
    return { ...EMPTY_RULES_STATUS, ...parsed };
  } catch {
    return rulesStatusMemory;
  }
}

function writeCardRulesStatus(patch: Partial<CardRulesStatus>): CardRulesStatus {
  const next = { ...getCardRulesStatus(), ...patch };
  rulesStatusMemory = next;
  if (canUseLocalStorage()) {
    try {
      window.localStorage.setItem(RULES_STATUS_KEY, JSON.stringify(next));
    } catch {
      // Status is informational only.
    }
  }
  return next;
}

export function getCurrentRuleSetVersion(): string {
  return getCatalogOverride()?.version ?? BUILTIN_RULESET_VERSION;
}

export function getBuiltinRuleSetVersion(): string {
  return BUILTIN_RULESET_VERSION;
}

/** Exposed for tests: this is the one place a published ruleset can lose data. */
export function normalizeRemoteCatalogForTests(value: unknown): CreditCard[] {
  return normalizeRemoteCatalog(value);
}

function isWellFormedRuleSetVersion(version: unknown): version is string {
  if (typeof version !== "string") return false;
  const match = RULESET_VERSION_PATTERN.exec(version);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function isRuleSetVersionTooFarAhead(version: string, now = Date.now()): boolean {
  const [year, month, day] = version.split(".").map(Number);
  return Date.UTC(year, month - 1, day) - now > MAX_RULESET_VERSION_LEAD_MS;
}

/** A link or image the feed points at: http(s), or a path on this site. */
function safeFeedUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const url = value.trim();
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const { protocol } = new URL(url);
    return protocol === "https:" || protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

/** Card colours are CSS backgrounds; one that loads a resource is refused. */
function safeCardColor(value: unknown): string {
  return typeof value === "string" && !/url\s*\(|expression\s*\(|image-set\s*\(/i.test(value)
    ? value
    : DEFAULT_CARD_COLOR;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Card fields shown as text; anything but text (or nothing) is malformed. */
const OPTIONAL_CARD_TEXT_FIELDS = [
  "rewardType",
  "rewardProgram",
  "rewardUnitName",
  "rewardValuationDescription",
  "market",
  "currency",
  "lastReviewedAt",
  "dataConfidence",
] as const;

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
    // Wrong types are as fatal as missing fields: these strings are lower-cased,
    // matched and rendered all over the app, so one bad card would crash pages.
    if (
      !isNonEmptyString(candidate.name) ||
      !isNonEmptyString(candidate.issuer) ||
      !isNonEmptyString(candidate.network)
    ) {
      throw new Error(`Card at index ${index} is missing required fields.`);
    }
    if (!Array.isArray(candidate.cashbackCategories)) {
      throw new Error(`Card ${candidate.name} is missing cashback categories.`);
    }
    if (!Array.isArray(candidate.benefits)) {
      throw new Error(`Card ${candidate.name} is missing benefits.`);
    }

    const cardId = candidate.id ?? index + 1;
    const annualFee = Number(candidate.annualFee ?? 0);
    if (!Number.isFinite(annualFee)) {
      throw new Error(`Card ${candidate.name} has an invalid annual fee.`);
    }
    if (candidate.signupBonus != null && typeof candidate.signupBonus !== "string") {
      throw new Error(`Card ${candidate.name} has an invalid signup bonus.`);
    }
    for (const field of OPTIONAL_CARD_TEXT_FIELDS) {
      const text = (card as Record<string, unknown>)[field];
      if (text != null && typeof text !== "string") {
        throw new Error(`Card ${candidate.name} has an invalid ${field}.`);
      }
    }
    const notes = (card as { rewardRuleNotes?: unknown }).rewardRuleNotes;
    if (
      notes != null &&
      !(Array.isArray(notes) && notes.every((note) => typeof note === "string"))
    ) {
      throw new Error(`Card ${candidate.name} has invalid reward notes.`);
    }

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
      annualFee,
      signupBonus: candidate.signupBonus ?? null,
      signupBonusValue:
        candidate.signupBonusValue == null
          ? null
          : Number(candidate.signupBonusValue),
      color: safeCardColor(candidate.color),
      logoUrl: safeFeedUrl(candidate.logoUrl),
      cardImageUrl: safeFeedUrl(candidate.cardImageUrl),
      sourceUrl: safeFeedUrl(metadata.sourceUrl),
      imageSourceUrl: safeFeedUrl(metadata.imageSourceUrl),
      rewardUnitValueCents:
        candidate.rewardUnitValueCents == null
          ? null
          : Number(candidate.rewardUnitValueCents),
      // Rows are spread first for the same reason as the card itself: a field
      // a newer ruleset adds (a benefit's renewal period, say) must survive.
      cashbackCategories: candidate.cashbackCategories.map(
        (category, catIndex) => {
          if (
            !isNonEmptyString(category?.category) ||
            !Number.isFinite(Number(category.rate))
          ) {
            throw new Error(`Card ${candidate.name} has a malformed reward row.`);
          }
          return {
            ...category,
            id: category.id ?? catIndex + 1,
            cardId: category.cardId ?? cardId,
            category: category.category,
            rate: Number(category.rate),
            isDefault: Boolean(category.isDefault),
          };
        },
      ),
      benefits: candidate.benefits.map((benefit, benefitIndex) => {
        if (
          !isNonEmptyString(benefit?.name) ||
          (benefit.description != null && typeof benefit.description !== "string")
        ) {
          throw new Error(`Card ${candidate.name} has a malformed benefit.`);
        }
        const annualValue =
          benefit.annualValue == null ? null : Number(benefit.annualValue);
        return {
          ...benefit,
          id: benefit.id ?? benefitIndex + 1,
          cardId: benefit.cardId ?? cardId,
          name: benefit.name,
          description: benefit.description,
          annualValue: annualValue != null && Number.isFinite(annualValue) ? annualValue : null,
        };
      }),
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

function formatRuleMoney(card: CreditCard, amount: number): string {
  const currency = getCardCurrency(card) ?? "USD";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return String(amount);
  }
}

function formatRulePercent(rate: number): string {
  return `${Number((rate * 100).toFixed(2))}%`;
}

/**
 * Describes how `next` differs from `previous`, limited to what changes a
 * cardholder's numbers: fees, earn rates, benefits and availability.
 */
export function summarizeCardRuleChanges(
  previous: CreditCard[],
  next: CreditCard[],
): CardRulesChangeSummary {
  const before = new Map(previous.map((card) => [card.id, card]));
  const after = new Map(next.map((card) => [card.id, card]));
  const summary: CardRulesChangeSummary = { added: [], removed: [], changed: [] };

  for (const card of next) {
    const old = before.get(card.id);
    if (!old) {
      summary.added.push(card.name);
      continue;
    }

    const details: string[] = [];
    if (old.name !== card.name) {
      details.push(uiText("renamed from {name}", { name: old.name }));
    }
    if (old.annualFee !== card.annualFee) {
      details.push(
        uiText("annual fee {from} → {to}", {
          from: formatRuleMoney(old, old.annualFee),
          to: formatRuleMoney(card, card.annualFee),
        }),
      );
    }

    const oldRates = new Map(old.cashbackCategories.map((row) => [row.category, row.rate]));
    const newRates = new Map(card.cashbackCategories.map((row) => [row.category, row.rate]));
    for (const [label, rate] of newRates) {
      const oldRate = oldRates.get(label);
      if (oldRate === undefined) {
        details.push(
          uiText("new: {rate} {category}", {
            rate: formatRulePercent(rate),
            category: label,
          }),
        );
      }
      else if (oldRate !== rate) {
        details.push(`${label} ${formatRulePercent(oldRate)} → ${formatRulePercent(rate)}`);
      }
    }
    for (const label of oldRates.keys()) {
      if (!newRates.has(label)) {
        details.push(uiText("removed: {category}", { category: label }));
      }
    }

    const oldBenefits = new Map(old.benefits.map((benefit) => [benefit.name, benefit]));
    const newBenefitNames = new Set(card.benefits.map((benefit) => benefit.name));
    for (const benefit of card.benefits) {
      const previousBenefit = oldBenefits.get(benefit.name);
      if (!previousBenefit) details.push(`new benefit: ${benefit.name}`);
      else if ((previousBenefit.annualValue ?? 0) !== (benefit.annualValue ?? 0)) {
        details.push(`${benefit.name} value changed`);
      }
    }
    for (const name of oldBenefits.keys()) {
      if (!newBenefitNames.has(name)) details.push(`benefit removed: ${name}`);
    }

    const oldAvailability = (old as CreditCardMetadata).availability ?? "open";
    const newAvailability = (card as CreditCardMetadata).availability ?? "open";
    if (oldAvailability !== newAvailability) {
      details.push(
        newAvailability === "open"
          ? "open to new applicants again"
          : newAvailability === "discontinued"
            ? "no longer offered"
            : "closed to new applicants",
      );
    }

    if (details.length) summary.changed.push({ cardId: card.id, name: card.name, details });
  }

  for (const card of previous) {
    if (!after.has(card.id)) summary.removed.push(card.name);
  }

  return summary;
}

let rulesCheckInFlight: Promise<CardRulesUpdateResult> | null = null;

/**
 * Asks the rules feed for a newer ruleset and installs it.
 *
 * Concurrent calls share one request: the app checks on launch, on focus and
 * on a timer, and two overlapping downloads would race to write the same key.
 */
export function checkForCardRulesUpdate(
  manifestUrl: string,
): Promise<CardRulesUpdateResult> {
  if (!rulesCheckInFlight) {
    rulesCheckInFlight = runCardRulesUpdate(manifestUrl).finally(() => {
      rulesCheckInFlight = null;
    });
  }
  return rulesCheckInFlight;
}

async function runCardRulesUpdate(
  manifestUrl: string,
): Promise<CardRulesUpdateResult> {
  const checkedAt = new Date().toISOString();

  try {
    const result = await fetchAndInstallCardRules(manifestUrl);
    writeCardRulesStatus({
      lastCheckedAt: checkedAt,
      lastOutcome: result.updated ? "updated" : "up-to-date",
      lastError: null,
      ...(result.updated
        ? {
            lastUpdate: {
              version: result.version,
              appliedAt: checkedAt,
              notes: result.notes,
              changes: result.changes,
            },
          }
        : {}),
    });
    return result;
  } catch (error) {
    writeCardRulesStatus({
      lastCheckedAt: checkedAt,
      lastOutcome: "error",
      lastError: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

async function fetchAndInstallCardRules(
  manifestUrl: string,
): Promise<CardRulesUpdateResult> {
  const manifestResponse = await fetch(manifestUrl, { cache: "no-store" });
  if (!manifestResponse.ok) {
    throw uiError("Could not fetch card rules manifest: {status}", {
      status: manifestResponse.status,
    });
  }

  const manifest = (await manifestResponse.json()) as CardRulesManifest;
  if (!manifest.version || !manifest.url || typeof manifest.url !== "string") {
    throw uiError("Card rules manifest must include version and url.");
  }
  if (
    !isWellFormedRuleSetVersion(manifest.version) ||
    isRuleSetVersionTooFarAhead(manifest.version)
  ) {
    throw uiError("Card rules have an invalid version.");
  }
  const notes = typeof manifest.notes === "string" ? manifest.notes : undefined;
  const publishedAt =
    typeof manifest.publishedAt === "string" ? manifest.publishedAt : undefined;

  const currentVersion = getCurrentRuleSetVersion();
  // Only ever move forward. An older manifest — stale CDN copy, rolled-back
  // deploy — must not downgrade rules the app already has.
  if (compareRuleSetVersions(manifest.version, currentVersion) <= 0) {
    return { updated: false, version: currentVersion };
  }
  if ((manifest.schema ?? 1) > SUPPORTED_RULES_SCHEMA) {
    throw uiError(
      "Newer card rules need a newer version of the app. Update Oh My Cards to get them.",
    );
  }

  const pageUrl =
    typeof window !== "undefined" ? window.location.href : undefined;
  const manifestOrigin = new URL(manifestUrl, pageUrl).origin;
  const rulesUrl = new URL(manifest.url, new URL(manifestUrl, pageUrl));
  // The payload replaces every reward rule in the app, so it has to come from
  // the same origin as the manifest that vouched for it.
  if (rulesUrl.origin !== manifestOrigin) {
    throw uiError("Card rules must be served from the manifest's origin.");
  }

  const rulesResponse = await fetch(rulesUrl.toString(), { cache: "no-store" });
  if (!rulesResponse.ok) {
    throw uiError("Could not fetch card rules: {status}", {
      status: rulesResponse.status,
    });
  }

  const body = await rulesResponse.text();
  if (body.length > MAX_CARD_RULES_CHARS) {
    throw uiError("Card rules download is too large.");
  }
  if (manifest.sha256) {
    const digest = await sha256Hex(body);
    if (digest && digest !== manifest.sha256) {
      throw uiError("Card rules failed their integrity check.");
    }
  }

  const payload = JSON.parse(body) as { version?: unknown; schema?: unknown };
  if (typeof payload.version === "string" && payload.version !== manifest.version) {
    throw uiError("Card rules payload does not match its manifest version.");
  }
  if (Number(payload.schema ?? 1) > SUPPORTED_RULES_SCHEMA) {
    throw uiError(
      "Newer card rules need a newer version of the app. Update Oh My Cards to get them.",
    );
  }

  const cards = normalizeRemoteCatalog(payload);
  if (!cards.length) throw uiError("Card rules contained no cards.");
  // A truncated or half-published feed would silently drop cards people hold.
  if (cards.length < Math.floor(activeCatalogCards().length * 0.8)) {
    throw uiError("Card rules look incomplete; keeping the current rules.");
  }

  const previousCards = activeCatalogCards();
  const changes = summarizeCardRuleChanges(previousCards, cards);
  writeStoredCatalogOverride({
    version: manifest.version,
    notes,
    publishedAt,
    cards,
  });

  const state = readState();
  writeState({ ...state, ruleSetVersion: manifest.version });

  const heldCardIds = new Set(state.walletCards.map((walletCard) => walletCard.cardId));
  const walletCardsChanged = changes.changed
    .filter((change) => heldCardIds.has(change.cardId))
    .map((change) => change.name);

  return {
    updated: true,
    version: manifest.version,
    notes,
    changes,
    walletCardsChanged,
  };
}

function getCard(cardId: number): CreditCard | undefined {
  return getCatalogIndex().get(cardId);
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
/**
 * Logged categories too broad to say what was bought; for these the merchant
 * is the better signal ("Other" at "Hilton Garden Inn" is a hotel stay).
 */
const GENERIC_TRANSACTION_CATEGORIES = new Set(["travel", "other"]);

/**
 * Chinese purchase words, glossed into the English the matchers read, so
 * "星巴克咖啡 45" and "Costco 加油" find the same cards as their English
 * versions. Glosses are appended for matching only; what the user typed is
 * what gets saved.
 */
const CHINESE_PURCHASE_GLOSSES: Array<[string, string]> = [
  // Dining
  ["外卖", "food delivery"],
  ["送餐", "food delivery"],
  ["餐厅", "restaurant"],
  ["饭店", "restaurant"],
  ["餐馆", "restaurant"],
  ["吃饭", "dining"],
  ["聚餐", "dining"],
  ["下馆子", "dining"],
  ["早午餐", "brunch"],
  ["早餐", "breakfast"],
  ["早饭", "breakfast"],
  ["午餐", "lunch"],
  ["午饭", "lunch"],
  ["晚餐", "dinner"],
  ["晚饭", "dinner"],
  ["夜宵", "dining"],
  ["宵夜", "dining"],
  ["火锅", "restaurant"],
  ["烧烤", "restaurant"],
  ["奶茶", "coffee"],
  ["咖啡", "coffee"],
  ["星巴克", "starbucks"],
  ["麦当劳", "mcdonald"],
  ["肯德基", "kfc"],
  ["汉堡", "burger"],
  ["披萨", "pizza"],
  ["寿司", "sushi"],
  ["拉面", "ramen"],
  // Groceries and warehouse clubs
  ["超市", "supermarket"],
  ["买菜", "groceries"],
  ["菜市场", "groceries"],
  ["杂货", "groceries"],
  ["生鲜", "groceries"],
  ["好市多", "costco"],
  ["开市客", "costco"],
  ["仓储会员店", "warehouse club"],
  ["沃尔玛", "walmart"],
  ["全食", "whole foods"],
  ["亚马逊", "amazon"],
  // Gas and charging
  ["加油站", "gas"],
  ["加油", "gas"],
  ["油费", "gas"],
  ["汽油", "gasoline"],
  ["充电桩", "ev charging"],
  ["充电", "ev charging"],
  // Travel
  ["机票", "flight"],
  ["航班", "flight"],
  ["飞机", "flight"],
  ["美联航", "united airlines"],
  ["联合航空", "united airlines"],
  ["达美", "delta airlines"],
  ["美国航空", "american airlines"],
  ["美航", "american airlines"],
  ["西南航空", "southwest airlines"],
  ["阿拉斯加航空", "alaska airlines"],
  ["国泰", "cathay"],
  ["酒店", "hotel"],
  ["宾馆", "hotel"],
  ["旅馆", "hotel"],
  ["民宿", "airbnb"],
  ["住宿", "lodging"],
  ["万豪", "marriott"],
  ["希尔顿", "hilton"],
  ["凯悦", "hyatt"],
  ["洲际", "ihg"],
  ["租车", "rental car"],
  ["官网", "booked direct"],
  ["直接订", "booked direct"],
  ["直订", "booked direct"],
  ["旅行", "travel"],
  ["旅游", "travel"],
  ["度假", "vacation"],
  // Getting around
  ["打车", "rideshare"],
  ["网约车", "rideshare"],
  ["优步", "uber"],
  ["出租车", "taxi"],
  ["地铁", "transit"],
  ["公交", "transit"],
  ["火车", "train ticket"],
  ["通勤", "commute"],
  // Bills and subscriptions
  ["流媒体", "streaming"],
  ["网飞", "netflix"],
  ["视频会员", "streaming"],
  ["话费", "phone bill"],
  ["手机费", "phone bill"],
  ["网费", "internet"],
  ["宽带", "internet"],
  ["水电", "utilities"],
  ["电费", "electric bill"],
  ["水费", "utility bill"],
  ["燃气费", "utility bill"],
  ["房租", "rent"],
  ["租金", "rent"],
  // Everything else
  ["药店", "pharmacy"],
  ["药房", "pharmacy"],
  ["买药", "pharmacy"],
  ["家装", "home improvement"],
  ["装修", "home improvement"],
  ["五金", "home improvement"],
  ["办公用品", "office supplies"],
  ["文具", "office supplies"],
  ["快递", "shipping"],
  ["健身房", "gym"],
  ["健身", "fitness"],
  ["瑜伽", "yoga"],
  ["网购", "online shopping"],
  ["网上", "online order"],
  ["线上", "online order"],
  ["苹果支付", "apple pay"],
  ["苹果店", "apple store"],
  ["香港", "hong kong"],
  ["新加坡", "singapore"],
  ["加拿大", "canada"],
  ["日本", "japan"],
  ["东京", "tokyo"],
  ["欧洲", "europe"],
  ["国外", "overseas"],
  ["海外", "overseas"],
  ["境外", "overseas"],
];

const HAS_CJK = /[\u3400-\u9fff]/;

function glossChinesePurchaseText(text: string): string {
  if (!HAS_CJK.test(text)) return text;
  const glosses = new Set<string>();
  for (const [term, gloss] of CHINESE_PURCHASE_GLOSSES) {
    if (text.includes(term)) glosses.add(gloss);
  }
  return glosses.size ? `${text} ${[...glosses].join(" ")}` : text;
}

/** Tags read from a merchant name or note, minus brand words used as words. */
function getPurchaseTextTags(text: string): string[] {
  let cleaned = glossChinesePurchaseText(text).toLowerCase();
  // "Shipping to the United States" is not United Airlines.
  for (const entry of AMBIGUOUS_TERMS) {
    cleaned = cleaned.replace(new RegExp(entry.notWhen.source, "g"), " ");
  }
  return getCategoryTags(cleaned);
}

/**
 * What a logged transaction says about itself: its category, plus the
 * merchant and note the user typed. The merchant contributes brand and channel
 * tags — "Flights" at "United Airlines" can reach a United bonus, "Rideshare"
 * at "Lyft" a Lyft bonus — which the bare category never could. It only adds
 * *what was bought* when the category itself is generic.
 */
function getTransactionTags(label: string, purchaseText?: string | null): string[] {
  const tags = new Set(getCategoryTags(label));
  const text = purchaseText?.trim();
  if (!text) return [...tags];

  const fromText = partitionTags(getPurchaseTextTags(text));
  for (const tag of fromText.narrowing) tags.add(tag);
  if (GENERIC_TRANSACTION_CATEGORIES.has(label.trim().toLowerCase())) {
    for (const tag of fromText.subjects) tags.add(tag);
  }
  return [...tags];
}

function transactionPurchaseText(
  transaction: Pick<Transaction, "merchantName" | "description" | "category">,
): string {
  return [transaction.merchantName, transaction.description]
    .filter((part): part is string => Boolean(part) && part !== transaction.category)
    .join(" ");
}

function categoryCovers(
  categoryLabel: string,
  transactionLabel: string,
  purchaseText?: string | null,
): boolean {
  const category = partitionTags(getCategoryTags(categoryLabel));
  const transaction = partitionTags(getTransactionTags(transactionLabel, purchaseText));

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
  /** Merchant and note of the purchase, for merchant-specific bonuses. */
  purchaseText?: string | null;
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

/**
 * A non-default row that covers every purchase — "Business Purchases (up to
 * $50,000/yr)" on Amex Blue Business — is a capped base rate. Its label names
 * no kind of spend, so the subject matcher could never select it and those
 * cards were priced at the post-cap 1% on everything.
 */
function isCatchAllBonusRow(row: CashbackCategory): boolean {
  if (row.isDefault) return false;
  const tags = getCategoryTags(row.category);
  return tags.includes("default") && partitionTags(tags).subjects.size === 0;
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
    if (!choice) {
      return (
        isCatchAllBonusRow(row) ||
        categoryCovers(row.category, label, context.purchaseText)
      );
    }

    return getActiveChoiceOptions(choice, context).some((option) =>
      categoryCovers(option, label, context.purchaseText),
    );
  };

  const exact = card.cashbackCategories.find(
    (c) =>
      c.category.toLowerCase() === label.toLowerCase() &&
      !c.isDefault &&
      !choicesByCategoryId.has(c.id),
  );
  // The verbatim row wins outright unless the merchant names a brand or
  // channel, which may unlock something better ("Travel" at "Chase Travel").
  const merchantNarrows =
    Boolean(context.purchaseText?.trim()) &&
    partitionTags(getPurchaseTextTags(context.purchaseText!)).narrowing.size > 0;
  if (exact && !merchantNarrows) return exact;

  const transactionSubjects = partitionTags(
    getTransactionTags(label, context.purchaseText),
  ).subjects;

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

  const fallbackRate = fallback?.rate ?? 0;
  const best = candidates[0]?.category;
  if (!best) return fallback;
  if (!fallback || best.rate > fallbackRate) return best;

  // Some rows are exceptions that earn *less* than the base rate — Bilt
  // Palladium pays 2x everywhere but 1x on rent. Those must win over the
  // fallback, or rent would be credited at 2x. The most specific one applies.
  const reduced = candidates
    .filter((candidate) => candidate.category.rate < fallbackRate)
    .sort(
      (a, b) =>
        b.overlap - a.overlap || a.category.rate - b.category.rate,
    )[0]?.category;
  if (reduced) return reduced;

  // A "bonus" that pays exactly the default is not a bonus, and treating it as
  // one would wrongly subject the spend to that row's cap.
  return fallback;
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
  const category = getCashbackCategory(card, transaction.category, {
    ...context,
    purchaseText: transactionPurchaseText(transaction),
  });
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
    purchaseText: transactionPurchaseText({
      merchantName: data.merchantName ?? null,
      description: data.description,
      category: data.category,
    }),
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

  const now = new Date();
  const usageByBenefitId = new Map(
    state.benefitUsage
      .filter((usage) => usage.walletCardId === walletCard.id)
      .map((usage) => [usage.benefitId, usage]),
  );
  const usedBenefitIds: number[] = [];
  const benefitPeriods: Record<number, BenefitPeriodState> = {};
  let currentYearBenefitValue = 0;
  for (const benefit of card.benefits) {
    const usage = usageByBenefitId.get(benefit.id);
    benefitPeriods[benefit.id] = getBenefitPeriodState(benefit, walletCard, now);
    if (usage && isBenefitUsedInCurrentPeriod(usage, benefit, walletCard, now)) {
      usedBenefitIds.push(benefit.id);
    }
    if (usage) {
      currentYearBenefitValue += getBenefitValueCaptured(
        usage,
        benefit,
        walletCard,
        currentYearStart,
        now,
      );
    }
  }

  return {
    ...walletCard,
    totalCashbackEarned,
    currentYearCashback,
    activeChoiceCategories,
    usedBenefitIds,
    currentYearBenefitValue: Number(currentYearBenefitValue.toFixed(2)),
    benefitPeriods,
    card: { ...card, inWallet: true },
  };
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

const BENEFIT_PERIODS: readonly CardBenefitPeriod[] = [
  "monthly",
  "quarterly",
  "semiannual",
  "calendar-year",
  "cardmember-year",
  "multi-year",
  "one-time",
];

type BenefitRenewal = Pick<CardBenefit, "annualValue" | "period" | "periodYears">;

export function getBenefitPeriod(benefit: BenefitRenewal): CardBenefitPeriod {
  const period = benefit.period;
  return period && BENEFIT_PERIODS.includes(period) ? period : "cardmember-year";
}

function getBenefitPeriodYears(benefit: BenefitRenewal): number {
  const years = Number(benefit.periodYears);
  return Number.isFinite(years) && years > 0 ? years : 4;
}

/**
 * Value of a single period's allowance. `annualValue` is per year, so a
 * monthly credit is a twelfth of it, and a credit renewed every four years
 * (stored amortized) is worth four years' share on the one occasion it pays.
 */
export function getBenefitPeriodValue(benefit: BenefitRenewal): number | null {
  const annual = benefit.annualValue;
  if (!annual || annual <= 0) return null;

  switch (getBenefitPeriod(benefit)) {
    case "monthly":
      return Number((annual / 12).toFixed(2));
    case "quarterly":
      return Number((annual / 4).toFixed(2));
    case "semiannual":
      return Number((annual / 2).toFixed(2));
    case "multi-year":
      return Number((annual * getBenefitPeriodYears(benefit)).toFixed(2));
    default:
      return annual;
  }
}

function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

/**
 * The renewal window that contains `onDate`, as [start, end). `end` is null
 * for an allowance that never renews. Multi-year windows hang off the last
 * use, since that is when the clock starts for a Global Entry style credit.
 */
function getBenefitWindow(
  benefit: BenefitRenewal,
  walletCard: LocalWalletCard | undefined,
  onDate: Date,
  history: string[] = [],
): { start: Date; end: Date | null } {
  const year = onDate.getFullYear();
  const month = onDate.getMonth();

  switch (getBenefitPeriod(benefit)) {
    case "monthly": {
      const start = new Date(year, month, 1);
      return { start, end: addMonths(start, 1) };
    }
    case "quarterly": {
      const start = getQuarterStart(onDate);
      return { start, end: addMonths(start, 3) };
    }
    case "semiannual": {
      const start = new Date(year, month < 6 ? 0 : 6, 1);
      return { start, end: addMonths(start, 6) };
    }
    case "calendar-year":
      return { start: new Date(year, 0, 1), end: new Date(year + 1, 0, 1) };
    case "one-time":
      return { start: new Date(0), end: null };
    case "multi-year": {
      const years = getBenefitPeriodYears(benefit);
      const spanMs = years * 365.25 * 86_400_000;
      const lastUse = history
        .map((entry) => new Date(entry))
        .filter((date) => date.getTime() <= onDate.getTime())
        .sort((a, b) => b.getTime() - a.getTime())[0];
      if (lastUse && onDate.getTime() - lastUse.getTime() < spanMs) {
        return { start: lastUse, end: new Date(lastUse.getTime() + spanMs) };
      }
      return { start: new Date(onDate.getTime() - spanMs), end: null };
    }
    case "cardmember-year":
    default: {
      if (!walletCard) {
        return { start: new Date(year, 0, 1), end: new Date(year + 1, 0, 1) };
      }
      const start = cycleStartForAnnualFee(walletCard, onDate);
      const anchor = parseCalendarDate(walletCard.openedAt ?? walletCard.addedAt);
      const end = Number.isNaN(anchor.getTime())
        ? new Date(start.getFullYear() + 1, start.getMonth(), start.getDate())
        : dateOnDayOfMonth(start.getFullYear() + 1, anchor.getMonth(), anchor.getDate());
      return { start, end };
    }
  }
}

function usageHistory(usage: LocalBenefitUsage): string[] {
  if (usage.history?.length) return usage.history;
  // Normalization fills history from the legacy flag; this covers a record
  // built in memory without passing through it.
  return usage.used ? [usage.usedAt ?? new Date().toISOString()] : [];
}

function isWithinWindow(dateInput: string, window: { start: Date; end: Date | null }): boolean {
  const time = new Date(dateInput).getTime();
  if (Number.isNaN(time)) return false;
  return time >= window.start.getTime() && (window.end === null || time < window.end.getTime());
}

/**
 * Whether a benefit has been used in its *current* renewal period.
 *
 * A monthly credit used in March is unused again on April 1; an anniversary-
 * year credit resets on the account anniversary. Treating the stored flag as
 * permanent made every credit vanish from the unused list after its first use.
 */
function isBenefitUsedInCurrentPeriod(
  usage: LocalBenefitUsage,
  benefit: BenefitRenewal,
  walletCard: LocalWalletCard | undefined,
  onDate = new Date(),
): boolean {
  const history = usageHistory(usage);
  if (!history.length) return false;
  const window = getBenefitWindow(benefit, walletCard, onDate, history);
  return history.some((entry) => isWithinWindow(entry, window));
}

function getBenefitPeriodState(
  benefit: BenefitRenewal,
  walletCard: LocalWalletCard | undefined,
  onDate = new Date(),
  usage?: LocalBenefitUsage,
): BenefitPeriodState {
  const window = getBenefitWindow(
    benefit,
    walletCard,
    onDate,
    usage ? usageHistory(usage) : [],
  );
  return {
    period: getBenefitPeriod(benefit),
    periodValue: getBenefitPeriodValue(benefit),
    resetsAt: window.end ? window.end.toISOString() : null,
  };
}

/**
 * How much of a benefit was actually captured between two dates: one period's
 * allowance for every distinct period with a recorded use. This is what lets
 * a $25/month credit count as $200 toward the annual fee after eight months,
 * not $300 after one click.
 */
function getBenefitValueCaptured(
  usage: LocalBenefitUsage,
  benefit: BenefitRenewal,
  walletCard: LocalWalletCard | undefined,
  since: Date,
  until: Date,
): number {
  const perPeriod = getBenefitPeriodValue(benefit);
  if (!perPeriod) return 0;

  const periodStarts = new Set<number>();
  for (const entry of usageHistory(usage)) {
    const date = new Date(entry);
    if (Number.isNaN(date.getTime())) continue;
    if (date < startOfLocalDay(since) || date > until) continue;
    const window = getBenefitWindow(benefit, walletCard, date, [entry]);
    periodStarts.add(window.start.getTime());
  }
  return periodStarts.size * perPeriod;
}

/** Exposed for tests: renewal windows are where a credit can be double-counted. */
export const benefitPeriodsForTests = {
  isUsedInCurrentPeriod: isBenefitUsedInCurrentPeriod,
  valueCaptured: getBenefitValueCaptured,
  normalizeUsage: normalizeBenefitUsageRecord,
};

function buildBenefitUsage(
  usage: LocalBenefitUsage,
  state = readState(),
): BenefitUsage {
  const walletCard = state.walletCards.find((w) => w.id === usage.walletCardId);
  const benefit = getCard(walletCard?.cardId ?? -1)?.benefits.find(
    (b) => b.id === usage.benefitId,
  );
  const renewal: BenefitRenewal = benefit ?? { annualValue: null };
  const now = new Date();
  const used = isBenefitUsedInCurrentPeriod(usage, renewal, walletCard, now);

  return {
    benefitId: usage.benefitId,
    walletCardId: usage.walletCardId,
    name: benefit?.name ?? "Unknown Benefit",
    description: benefit?.description ?? "",
    annualValue: benefit?.annualValue ?? null,
    used,
    usedAt: used ? (usage.usedAt ?? null) : null,
    ...getBenefitPeriodState(renewal, walletCard, now, usage),
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
      if (!card) throw uiError("Card not found");
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
      if (!getCard(data.cardId)) throw uiError("Card not found");
      if (state.walletCards.some((w) => w.cardId === data.cardId)) {
        throw uiError("Card already in wallet");
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
      if (!existing) throw uiError("Wallet card not found");

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
        throw uiError("Wallet card not found");
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
        merchantName: transaction.merchantName ?? null,
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
      if (amount <= 0) throw uiError("Amount must be greater than zero");

      const walletCard = state.walletCards.find((w) => w.id === walletCardId);
      if (!walletCard) throw uiError("Wallet card not found");

      const card = getCard(walletCard.cardId);
      if (!card) throw uiError("Card not found");

      const transactionType = data.transactionType ?? "purchase";
      const category =
        transactionType === "payment" ? "Payment" : data.category;
      const transactionDate = new Date(data.date ?? new Date().toISOString());
      if (Number.isNaN(transactionDate.getTime())) {
        throw uiError("Transaction date is not a valid date");
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

/**
 * What logging this purchase would earn, priced exactly as the engine will
 * price it: spend caps already consumed this period, automatic top-spend
 * choices, and the card's point valuation. The log form previews with this so
 * the number it shows is the number that gets saved.
 */
export function estimateTransactionReward(input: {
  walletCardId: number;
  category: string;
  amount: number;
  date?: string;
  merchantName?: string | null;
  description?: string | null;
  /** The transaction being edited, which must not count against its own cap. */
  excludeTransactionId?: number;
}): { cashbackEarned: number; cashbackRate: number } | null {
  const stored = readState();
  const state =
    input.excludeTransactionId == null
      ? stored
      : {
          ...stored,
          transactions: stored.transactions.filter(
            (transaction) => transaction.id !== input.excludeTransactionId,
          ),
        };
  const walletCard = state.walletCards.find((w) => w.id === input.walletCardId);
  if (!walletCard) return null;
  const card = getCard(walletCard.cardId);
  if (!card) return null;

  const date = input.date ? new Date(input.date) : new Date();
  if (Number.isNaN(date.getTime())) return null;

  return calculateCashback(
    state,
    walletCard,
    card,
    {
      walletCardId: walletCard.id,
      amount: input.amount,
      category: input.category,
      description: input.description?.trim() || input.category,
      merchantName: input.merchantName ?? null,
    },
    date,
  );
}

export const useUpdateTransaction = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateTransactionBody>;
    }) => {
      const state = readState();
      const existing = state.transactions.find((t) => t.id === id);
      if (!existing) throw uiError("Transaction not found");

      const walletCardId =
        data.walletCardId != null
          ? toFiniteNumber(data.walletCardId, -1)
          : existing.walletCardId;
      const walletCard = state.walletCards.find((w) => w.id === walletCardId);
      if (!walletCard) throw uiError("Wallet card not found");
      const card = getCard(walletCard.cardId);

      const amount =
        data.amount != null ? toFiniteNumber(data.amount) : existing.amount;
      if (amount <= 0) throw uiError("Amount must be greater than zero");

      const transactionType =
        data.transactionType ?? existing.transactionType ?? "purchase";
      const category =
        transactionType === "payment"
          ? "Payment"
          : toTrimmedString(data.category) ||
            (existing.category === "Payment" ? "Other" : existing.category);
      const date = data.date ? new Date(data.date) : new Date(existing.date);
      if (Number.isNaN(date.getTime())) {
        throw uiError("Transaction date is not a valid date");
      }
      const isPayment = transactionType === "payment";

      const updated: Transaction = {
        ...existing,
        walletCardId,
        transactionType,
        amount,
        category,
        date: date.toISOString(),
        description: toTrimmedString(data.description) || existing.description,
        cardName: card?.name ?? existing.cardName,
        merchantName: isPayment
          ? null
          : "merchantName" in data
            ? (data.merchantName ?? null)
            : (existing.merchantName ?? null),
        locationName: isPayment
          ? null
          : "locationName" in data
            ? (data.locationName ?? null)
            : (existing.locationName ?? null),
        latitude: isPayment
          ? null
          : "latitude" in data
            ? (data.latitude ?? null)
            : (existing.latitude ?? null),
        longitude: isPayment
          ? null
          : "longitude" in data
            ? (data.longitude ?? null)
            : (existing.longitude ?? null),
      };

      // Moving a purchase between cards or dates changes cap consumption on
      // both sides, so both histories are replayed.
      let nextState = recalculateCardCashback(
        {
          ...state,
          transactions: state.transactions.map((t) => (t.id === id ? updated : t)),
        },
        walletCardId,
      );
      if (existing.walletCardId !== walletCardId) {
        nextState = recalculateCardCashback(nextState, existing.walletCardId);
      }
      writeState(nextState);

      return nextState.transactions.find((t) => t.id === id) ?? updated;
    },
  });

function csvCell(value: unknown): string {
  const text = value == null ? "" : String(value);
  // Leading =, +, - or @ makes spreadsheets evaluate the cell as a formula.
  const safe = /^[=+\-@]/.test(text) ? `'${text}` : text;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

/** Every logged transaction as CSV, newest first, for spreadsheets or taxes. */
export function serializeTransactionsCsv(): string {
  const state = readState();
  const walletById = new Map(state.walletCards.map((w) => [w.id, w]));
  const header = [
    "Date",
    "Card",
    "Type",
    "Category",
    "Merchant",
    "Description",
    "Amount",
    "Currency",
    "Reward Value",
    "Effective Rate",
    "Location",
  ];
  const rows = sortByDateDesc(state.transactions).map((transaction) => {
    const walletCard = walletById.get(transaction.walletCardId);
    const card = walletCard ? getCard(walletCard.cardId) : undefined;
    const isPayment = isPaymentTransaction(transaction);
    return [
      transaction.date.slice(0, 10),
      walletCard?.nickname || card?.name || transaction.cardName || "",
      isPayment ? "Payment" : "Purchase",
      transaction.category,
      transaction.merchantName ?? "",
      transaction.description,
      transaction.amount.toFixed(2),
      (card && getCardCurrency(card)) ?? "USD",
      isPayment ? "" : transaction.cashbackEarned.toFixed(2),
      isPayment ? "" : `${(transaction.cashbackRate * 100).toFixed(2)}%`,
      transaction.locationName ?? "",
    ];
  });
  return `${[header, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n")}\r\n`;
}

/**
 * Removes every wallet card, transaction and benefit record from this device.
 * Downloaded card rules are kept: they are public data, not the user's.
 */
export function clearLocalData(): void {
  writeState({
    ...defaultState(),
    ruleSetVersion: getCurrentRuleSetVersion(),
  });
}

/**
 * Drops downloaded card rules and goes back to the ones built into the app.
 * The way out if a published ruleset ever breaks rendering; the next rules
 * check downloads a fresh copy.
 */
export function resetDownloadedCardRules(): void {
  writeStoredCatalogOverride(null);
  const state = readState();
  writeState({ ...state, ruleSetVersion: BUILTIN_RULESET_VERSION });
}

export const useDeleteTransaction = () =>
  useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const state = readState();
      const removed = state.transactions.find((t) => t.id === id);
      if (!removed) throw uiError("Transaction not found");

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
  const walletCard = state.walletCards.find((w) => w.id === walletCardId);
  const benefit = getCard(walletCard?.cardId ?? -1)?.benefits.find(
    (entry) => entry.id === benefitId,
  );
  const renewal: BenefitRenewal = benefit ?? { annualValue: null };
  const now = new Date();

  const nextUsages = withRows.benefitUsage.map((usage) => {
    if (usage.walletCardId !== walletCardId || usage.benefitId !== benefitId) {
      return usage;
    }

    const history = usageHistory(usage);
    const window = getBenefitWindow(renewal, walletCard, now, history);
    let nextHistory: string[];
    if (used) {
      // One use per period: a second click in the same month is a no-op
      // rather than a second $25 toward the annual fee.
      nextHistory = history.some((entry) => isWithinWindow(entry, window))
        ? history
        : [...history, now.toISOString()];
    } else {
      // "Mark unused" undoes this period only; earlier months stay captured.
      nextHistory = history.filter((entry) => !isWithinWindow(entry, window));
    }

    const latest = nextHistory[nextHistory.length - 1] ?? null;
    return {
      ...usage,
      used: nextHistory.length > 0,
      usedAt: latest,
      history: nextHistory,
    };
  });
  const found = nextUsages.some(
    (usage) =>
      usage.walletCardId === walletCardId && usage.benefitId === benefitId,
  );
  if (!found) throw uiError("Benefit usage not found");

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

      // Values only add up within one currency, but a count does not care:
      // counting every card keeps the tile in step with the benefit lists,
      // which list every card's benefits.
      let totalBenefitValue = 0;
      let unusedBenefitsCount = 0;
      for (const walletCard of walletCards) {
        const usedBenefitIds = new Set(walletCard.usedBenefitIds ?? []);
        const counted = countedWalletCardIds.has(walletCard.id);
        for (const benefit of walletCard.card.benefits) {
          if (!benefit.annualValue) continue;
          if (counted) totalBenefitValue += benefit.annualValue;
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

function listBenefitsByUse(used: boolean): UnusedBenefit[] {
  const state = readState();
  const now = new Date();
  const result: UnusedBenefit[] = [];

  // Every card is listed, whatever its currency: each entry carries its own
  // currency, and dropping a Hong Kong card's benefits from a mostly-US wallet
  // left its "Mark used" button doing nothing visible.
  for (const walletCard of listWalletCards(state)) {
    const localCard = state.walletCards.find((card) => card.id === walletCard.id);
    const usedBenefitIds = new Set(walletCard.usedBenefitIds ?? []);
    const usageByBenefit = new Map(
      state.benefitUsage
        .filter((usage) => usage.walletCardId === walletCard.id)
        .map((usage) => [usage.benefitId, usage]),
    );

    for (const benefit of walletCard.card.benefits) {
      // A "No Annual Fee" style row carries no allowance to spend, so listing
      // it as an unused benefit is just noise on the dashboard.
      if (!used && !benefit.annualValue) continue;
      if (usedBenefitIds.has(benefit.id) !== used) continue;

      result.push({
        benefitId: benefit.id,
        walletCardId: walletCard.id,
        cardName: walletCard.nickname || walletCard.card.name,
        name: benefit.name,
        description: benefit.description,
        annualValue: benefit.annualValue ?? null,
        currency: getCardCurrency(walletCard.card) ?? "USD",
        ...getBenefitPeriodState(
          benefit,
          localCard,
          now,
          usageByBenefit.get(benefit.id),
        ),
      });
    }
  }

  // Soonest-expiring first: a monthly credit about to lapse matters more than
  // an annual one with eleven months to go.
  return result.sort((a, b) => {
    const aReset = a.resetsAt ? new Date(a.resetsAt).getTime() : Number.MAX_SAFE_INTEGER;
    const bReset = b.resetsAt ? new Date(b.resetsAt).getTime() : Number.MAX_SAFE_INTEGER;
    return aReset - bReset || (b.annualValue ?? 0) - (a.annualValue ?? 0);
  });
}

export function useGetUnusedBenefits() {
  return useQuery({
    queryKey: queryKeys.unusedBenefits,
    queryFn: async (): Promise<UnusedBenefit[]> => listBenefitsByUse(false),
  });
}

export function useGetUsedBenefits() {
  return useQuery({
    queryKey: queryKeys.usedBenefits,
    queryFn: async (): Promise<UnusedBenefit[]> => listBenefitsByUse(true),
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
  /** For a choice row: the option that covers this purchase. */
  choiceOption?: string;
  /** For a choice row: why the option applies (selected, top spend, ...). */
  choiceNote?: string;
};

/** What a choice row needs to be resolved while ranking a purchase. */
interface SuggestionChoiceContext {
  walletCard: LocalWalletCard | null;
  state: LocalState;
  amount: number | null;
}

type CreditCardMetadata = CreditCard & {
  market?: string | null;
  currency?: string | null;
  availability?: "open" | "closed-to-new-applicants" | "discontinued" | null;
};

/** Whether someone who does not hold this card could still apply for it. */
function isOpenToNewApplicants(card: CreditCard): boolean {
  return ((card as CreditCardMetadata).availability ?? "open") === "open";
}

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
    terms: ["instacart", "amazon fresh", "grocery delivery", "online groceries"],
    tags: ["grocery", "online"],
    purchaseType: "grocery",
    channel: "online",
    weight: 100,
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
    // Amazon is a merchant some cards reward by name (Prime Visa), not just
    // generic online shopping.
    terms: ["amazon", "amazon.com"],
    tags: ["amazon", "online_retail", "online"],
    merchant: "Amazon",
    purchaseType: "online_retail",
    channel: "online",
    weight: 90,
  },
  {
    terms: [
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
  // A plain "Travel" bonus covers every kind of trip; scored low enough that
  // a row naming the actual subtype still outranks it.
  travel: 50,
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

/**
 * Longer than any real purchase line. Text is cut to this before parsing: the
 * amount patterns backtrack quadratically, so a pasted wall of digits would
 * otherwise freeze the page on every keystroke.
 */
const MAX_PURCHASE_TEXT = 500;

function parsePurchaseContext(
  fullDescription: string,
  explicitAmount: number | null,
  availableCategories: Set<string>,
): ParsedPurchaseContext {
  const description = fullDescription.slice(0, MAX_PURCHASE_TEXT);
  const text = glossChinesePurchaseText(description).toLowerCase().trim();
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
  // Bare "choice" is not a hotel: Bank of America's "Choice Category" (and the
  // grocery row that shares its cap) used to pick up hotel tags from it and
  // pay their bonus on every hotel stay.
  if (
    /hotel|hilton|hyatt|marriott|ihg|wyndham|choice (?:privileges|hotels)|bonvoy|stays|lodging|vrbo/.test(
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
  // "Online Groceries" is not a Kroger run: an online-only row needs a
  // purchase that was actually made online.
  if (categoryTags.has("online") && !contextTags.has("online")) {
    return null;
  }
  // Same travel rule as the transaction matcher: a flights row cannot pay on a
  // hotel stay, and an unspecified "trip" cannot claim a flights-only bonus.
  const categorySubtypes = [...TRAVEL_SUBTYPE_TAGS].filter((tag) => categoryTags.has(tag));
  const contextSubtypes = [...TRAVEL_SUBTYPE_TAGS].filter((tag) => contextTags.has(tag));
  const sharesNonTravelSubject = [...categoryTags].some(
    (tag) =>
      SUBJECT_TAGS.has(tag) &&
      tag !== "travel" &&
      !TRAVEL_SUBTYPE_TAGS.has(tag) &&
      contextTags.has(tag),
  );
  if (categorySubtypes.length && !sharesNonTravelSubject) {
    if (!contextSubtypes.length) return null;
    if (!categorySubtypes.some((tag) => contextTags.has(tag))) return null;
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

/**
 * Scores a row whose bonus is a cardholder pick or the period's top category.
 *
 * Its own label ("Choice Category (... combined with groceries ...)") names
 * no spend — scoring that text matched groceries and hotels at the choice
 * rate — so only the options can match. For a card in the wallet those are the
 * options actually in effect; for a card the user does not hold, any option
 * they could pick counts, except an issuer calendar nobody can predict.
 */
function scoreChoiceRowForPurchase(
  row: CreditCard["cashbackCategories"][number],
  choice: CardCategoryChoice,
  context: ParsedPurchaseContext,
  choiceContext: SuggestionChoiceContext,
): CategoryMatch | null {
  const { walletCard, state, amount } = choiceContext;
  const automatic = choice.mode === "automatic-top-spend";

  let candidates: string[];
  if (walletCard && !automatic) {
    candidates = getActiveChoiceOptions(choice, { walletCard, state });
  } else if (!walletCard && choice.mode === "rotating-calendar") {
    return null;
  } else {
    candidates = choice.options;
  }

  let best: CategoryMatch | null = null;
  for (const option of candidates) {
    const match = scoreCategoryForPurchase({ ...row, category: option }, context);
    if (!match) continue;

    if (walletCard && automatic) {
      // The bonus goes to the period's biggest categories, counting this
      // purchase too — so it applies only if this purchase leaves the option
      // among them.
      const active = getActiveChoiceOptions(choice, {
        walletCard,
        state,
        pending: { category: option, amount: amount ?? 0 },
      });
      if (!active.includes(option)) continue;
    }

    if (!best || match.score > best.score) {
      best = {
        ...match,
        category: row,
        choiceOption: option,
        choiceNote: (() => {
          // Issuer option names translate where a translation exists.
          const vars = { option: uiText(option) };
          if (walletCard) {
            return automatic
              ? uiText("{option} is this period's top category", vars)
              : uiText("Your selected category: {option}", vars);
          }
          return automatic
            ? uiText("Earns the bonus if {option} is your top category", vars)
            : uiText("Earns the bonus if you choose {option}", vars);
        })(),
      };
    }
  }
  return best;
}

function findBestCategoryMatch(
  card: CreditCard,
  context: ParsedPurchaseContext,
  choiceContext: SuggestionChoiceContext,
): CategoryMatch | null {
  const choicesByCategoryId = new Map(
    (card.categoryChoices ?? []).map((choice) => [choice.categoryId, choice]),
  );

  return (
    card.cashbackCategories
      .map((category) => {
        const choice = choicesByCategoryId.get(category.id);
        return choice
          ? scoreChoiceRowForPurchase(category, choice, context, choiceContext)
          : scoreCategoryForPurchase(category, context);
      })
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
  if (card.rewardType === "miles") return uiText("Miles");
  if (card.rewardType === "points") return uiText("Points");
  return card.rewardUnitName ?? uiText("Cash Back");
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
    return uiText("{amount} Cash Back", { amount: value });
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
  // Choice rows only resolve with the wallet entry in hand; without it a
  // purchase logged under the chosen category never counted toward the cap.
  const capContext: CategoryChoiceContext = walletCard
    ? { walletCard, state, onDate: now }
    : {};
  const cappedSpendUsed = walletCard
    ? state.transactions
        .filter(
          (transaction) =>
            matchesWalletCardId(transaction, walletCard.id) &&
            isPurchaseTransaction(transaction) &&
            isInLocalDateRange(transaction.date, periodStart, now) &&
            transactionMatchesSpendCapGroup(card, transaction, capGroup, capContext),
        )
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    : 0;
  const capRemaining = Math.max(0, spendCap.amount - cappedSpendUsed);
  const capLabel = uiText("{amount} per {period}", {
    amount: `$${spendCap.amount.toLocaleString("en-US")}`,
    period: uiText(spendCap.period),
  });

  if (capRemaining <= 0) {
    rulesApplied.push(
      uiText("{cap} cap already used — earning the base rate", { cap: capLabel }),
    );
    return { rawRate: defaultRate, rulesApplied };
  }

  if (amount == null || amount <= 0) {
    rulesApplied.push(
      uiText("Bonus rate applies to the first {amount} left under the {cap} cap", {
        amount: `$${capRemaining.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
        cap: capLabel,
      }),
    );
    return { rawRate: category.rate, rulesApplied };
  }

  const bonusAmount = Math.min(amount, capRemaining);
  const baseAmount = amount - bonusAmount;
  const rawReward = bonusAmount * category.rate + baseAmount * defaultRate;
  const rawRate = rawReward / amount;

  rulesApplied.push(
    capRemaining >= amount
      ? uiText("Within {cap} cap", { cap: capLabel })
      : uiText("Cap split: {amount} at bonus rate", {
          amount: `$${bonusAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
        }),
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
  const defaultCategory = getDefaultCategory(card);
  let bestMatch = findBestCategoryMatch(card, context, {
    walletCard,
    state,
    amount,
  });
  // A capped "everything" rate (Amex Blue Business 2% to $50K) beats any
  // specific match that pays less; the cap itself is applied below.
  const catchAll = card.cashbackCategories
    .filter(isCatchAllBonusRow)
    .sort((a, b) => b.rate - a.rate)[0];
  if (
    catchAll &&
    catchAll.rate > (defaultCategory?.rate ?? 0) &&
    (!bestMatch || bestMatch.category.rate < catchAll.rate)
  ) {
    bestMatch = {
      category: catchAll,
      score: 45,
      matchedTags: [],
      reason: `${catchAll.category} applies to every purchase.`,
    };
  }
  // A "bonus" that pays exactly the base rate is not a bonus, and treating it
  // as one would wrongly subject the purchase to that row's cap. A row that
  // pays *less* is an exception (rent on a flat-2x card) and stands.
  const categoryMatch =
    bestMatch && defaultCategory && bestMatch.category.rate === defaultCategory.rate
      ? null
      : bestMatch;
  // A card with no priced categories cannot be ranked, but it must not take
  // down the whole suggestion list either.
  const effective = categoryMatch?.category ??
    defaultCategory ?? {
      id: -1,
      cardId: card.id,
      category: "Other",
      rate: 0,
      isDefault: true,
    };
  const isDefaultRate = !categoryMatch;
  const matchedCategory = categoryMatch?.choiceOption
    ? categoryMatch.choiceOption
    : getSuggestedCategoryLabel(effective, context, isDefaultRate);
  const capped = isDefaultRate
    ? { rawRate: effective.rate, rulesApplied: [] as string[] }
    : applySpendCapToRate(state, walletCard, card, effective, amount);
  const rawRate = capped.rawRate;
  const rulesApplied = categoryMatch?.choiceNote
    ? [categoryMatch.choiceNote, ...capped.rulesApplied]
    : capped.rulesApplied;
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
    return uiText("No cards available to evaluate.");
  if (!bestWalletCard) {
    return uiText(
      "Add the cards you carry to My Wallet and this will tell you which one to use.",
    );
  }
  return "";
}

/** Purchase tags in the order they decide a logged category. */
const QUICK_ENTRY_CATEGORIES: Array<[string, TransactionCategory]> = [
  ["ev_charging", "EV Charging"],
  ["gas", "Gas"],
  ["food_delivery", "Food Delivery"],
  ["dining", "Dining"],
  ["warehouse_club", "Warehouse Clubs"],
  ["grocery", "Groceries"],
  ["airfare", "Flights"],
  ["hotel", "Hotels"],
  ["rental_car", "Rental Cars"],
  ["rideshare", "Rideshare"],
  ["transit", "Transit"],
  ["streaming", "Streaming"],
  ["drugstore", "Drugstores"],
  ["home_improvement", "Home Improvement"],
  ["office_supplies", "Office Supplies"],
  ["phone", "Phone and Internet"],
  ["utilities", "Utilities"],
  ["advertising", "Advertising"],
  ["shipping", "Shipping"],
  ["rent", "Rent"],
  ["fitness", "Fitness"],
  ["entertainment", "Entertainment"],
  ["online_retail", "Online Retail"],
  ["travel", "Travel"],
];

function inferTransactionCategory(tags: Set<string>): TransactionCategory | null {
  if (tags.has("grocery") && tags.has("online")) return "Online Groceries";
  return QUICK_ENTRY_CATEGORIES.find(([tag]) => tags.has(tag))?.[1] ?? null;
}

/** The amount in a one-line entry, and the text with that amount taken out. */
function takeQuickAmount(input: string): { amount: number | null; rest: string } {
  // Chinese runs words and numbers together ("晚饭45", "45块"); spacing them
  // lets the patterns below see the number on its own.
  const text = input
    .slice(0, MAX_PURCHASE_TEXT)
    .replace(/([\u3400-\u9fff])(?=[0-9])/g, "$1 ")
    .replace(/([0-9])(?=[\u3400-\u9fff])/g, "$1 ");
  const patterns = [
    /(?:hk\$|s\$|us\$|c\$|\$|¥|￥)\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)\s*(k)?\b/i,
    /\b([0-9][0-9,]*(?:\.[0-9]{1,2})?)\s*(k)?\s*(?:dollars?|bucks|usd|hkd|sgd|cad)\b/i,
    /\b([0-9][0-9,]*(?:\.[0-9]{1,2})?)\s*(k)?\s*(?:美元|美金|块钱|块|元|刀|港币|港元|加元|新币)/,
    // A bare number standing on its own: "45 dinner at Nopa".
    /(?:^|\s)([0-9][0-9,]*(?:\.[0-9]{1,2})?)(k)?(?=\s|$)/i,
  ];
  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (!match) continue;
    const amount = Number(match[1].replace(/,/g, "")) * (match[2] ? 1_000 : 1);
    if (!Number.isFinite(amount) || amount <= 0) continue;
    const rest = `${text.slice(0, match.index)} ${text.slice(match.index + match[0].length)}`
      .replace(/\s+/g, " ")
      .trim();
    return { amount: Number(amount.toFixed(2)), rest };
  }
  return { amount: null, rest: text.trim() };
}

function tidyName(value: string): string {
  const trimmed = value.trim().replace(/[.,;:!]+$/, "");
  // Typed in lowercase: capitalise each word ("nopa" -> "Nopa"); otherwise
  // keep the user's own capitalisation ("iPhone", "AT&T").
  return trimmed === trimmed.toLowerCase()
    ? trimmed.replace(/\b([a-z])/g, (letter) => letter.toUpperCase())
    : trimmed;
}

export interface QuickEntryOption {
  walletCardId: number;
  /** Nickname, or the card's name. */
  label: string;
  cardName: string;
  currency: string;
  rewardType: CreditCard["rewardType"] | null;
  rewardUnitName: string | null;
  /** Value earned on this purchase, in the card's currency; null without an amount. */
  cashbackEarned: number | null;
  /** Value earned per unit spent, after the card's point valuation. */
  cashbackRate: number;
  /** The earn rate in the card's own units (3x, 3%). */
  rewardRate: number;
}

export interface QuickEntryPlan {
  amount: number | null;
  category: TransactionCategory;
  /** False when nothing in the text named a category and "Other" was assumed. */
  categoryDetected: boolean;
  merchantName: string | null;
  description: string;
  /** Wallet cards, best for this purchase first. */
  options: QuickEntryOption[];
}

/**
 * Reads a one-line entry ("45 dinner at Nopa", "$120 Costco gas") into the
 * fields a logged purchase needs, and ranks the wallet for it.
 *
 * Each card is priced through the same function that prices a saved
 * transaction — caps used this period, chosen categories, merchant bonuses —
 * so the number shown next to a card is the number that gets recorded.
 */
export function planQuickEntry(
  text: string,
  options: { category?: string | null; date?: string } = {},
  state: LocalState = readState(),
): QuickEntryPlan {
  const { amount, rest } = takeQuickAmount(text);
  const catalogLabels = new Set(
    getCatalog().flatMap((card) => card.cashbackCategories.map((row) => row.category)),
  );
  const context = parsePurchaseContext(text, amount, catalogLabels);

  let merchantName: string | null = context.merchant ?? null;
  let remainder = rest;
  const at = /\s*(?:\bat\b|@|\bfrom\b)\s+(.+)$/i.exec(rest);
  if (at && at[1].trim()) {
    merchantName = tidyName(at[1]);
    remainder = rest.slice(0, at.index).trim();
  }

  const detected = inferTransactionCategory(new Set(context.tags));
  const override = TRANSACTION_CATEGORIES.find(
    (category) => category === options.category,
  );
  const category: TransactionCategory = override ?? detected ?? "Other";
  const description =
    (remainder && tidyName(remainder.charAt(0).toUpperCase() + remainder.slice(1))) ||
    merchantName ||
    category;

  const date = options.date ? new Date(options.date) : new Date();
  const pricedAmount = amount ?? 100;
  const ranked = state.walletCards
    .map((walletCard): QuickEntryOption | null => {
      const card = getCard(walletCard.cardId);
      if (!card) return null;
      const priced = calculateCashback(
        state,
        walletCard,
        card,
        {
          walletCardId: walletCard.id,
          amount: pricedAmount,
          category,
          description,
          merchantName,
        },
        date,
      );
      return {
        walletCardId: walletCard.id,
        label: walletCard.nickname || card.name,
        cardName: card.name,
        currency: getCardCurrency(card) ?? "USD",
        rewardType: card.rewardType ?? null,
        rewardUnitName: card.rewardUnitName ?? null,
        cashbackEarned: amount == null ? null : priced.cashbackEarned,
        cashbackRate: priced.cashbackRate,
        rewardRate: Number(
          (priced.cashbackRate / getRewardUnitValueMultiplier(card)).toFixed(4),
        ),
      };
    })
    .filter((option): option is QuickEntryOption => option !== null)
    // Rates, not amounts: a HK$ card and a US$ card cannot be compared on
    // what they earn in their own currencies.
    .sort((a, b) => b.cashbackRate - a.cashbackRate);

  return {
    amount,
    category,
    categoryDetected: Boolean(override ?? detected),
    merchantName: merchantName ?? null,
    description,
    options: ranked,
  };
}

export interface SuggestCardInput {
  description: string;
  amount?: number | null;
}

/**
 * Ranks the wallet and the card library for one purchase described in free
 * text. Pure apart from reading local state, so it can be tested directly.
 */
export function suggestCardForPurchase(
  data: SuggestCardInput,
  state: LocalState = readState(),
): CardSuggestion {
  const amount =
    data.amount != null && Number.isFinite(data.amount) ? data.amount : null;
  const cards = getCatalog();
  const walletCards = state.walletCards.map((walletCard) => ({
    local: walletCard,
    card: getCard(walletCard.cardId) ?? placeholderCard(walletCard.cardId),
  }));
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
        walletCard.local,
        parsedContext,
        effectiveAmount,
      ),
    )
    .sort(compareSuggestedCards);
  // A card that no longer takes applications is useless advice to someone who
  // does not already hold it.
  const overallSuggestions = marketScopedCards
    .filter(
      (card) => rawWalletByCardId.has(card.id) || isOpenToNewApplicants(card),
    )
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
      topLibraryCards[0].cashbackRate > bestWalletCard.cashbackRate + 0.0001),
  );
  const detectedCategory = getDetectedCategoryLabel(
    parsedContext,
    walletSuggestions.length > 0 ? walletSuggestions : overallSuggestions,
  );
  const reasoning = buildSuggestionReasoning(bestWalletCard, bestOverallCard);
  const clarifyingQuestion =
    parsedContext.missingContext.length > 0
      ? uiText("Add {detail} for a sharper recommendation.", {
          detail: uiText(parsedContext.missingContext[0]),
        })
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
      .slice(0, 4),
    overallAlternatives: topLibraryCards,
    clarifyingQuestion,
    parserMode: "local-rule-engine",
  };
}

export const useSuggestCard = () =>
  useMutation({
    // Ranking a purchase writes nothing, so it must not trigger the global
    // refresh that follows every data-changing mutation.
    meta: { readOnly: true },
    mutationFn: async ({
      data,
    }: {
      data: SuggestCardInput;
    }): Promise<CardSuggestion> => suggestCardForPurchase(data),
  });
