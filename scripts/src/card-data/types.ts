export type CardMarket = "US" | "Canada" | "Hong Kong" | "Singapore";
export type CardRuleCurrency = "USD" | "CAD" | "HKD" | "SGD";
export type CardRuleDataConfidence = "official" | "needs-review";
export type CardAvailability =
  | "open"
  | "closed-to-new-applicants"
  | "discontinued";

export interface CashbackCategory {
  id: number;
  cardId: number;
  category: string;
  rate: number;
  isDefault: boolean;
}

export interface CardBenefit {
  id: number;
  cardId: number;
  name: string;
  description: string;
  annualValue: number | null;
}

export type CardCategoryChoiceMode =
  | "user-selected"
  | "automatic-top-spend"
  | "rotating-calendar";

export interface CardCategoryChoice {
  categoryId: number;
  mode: CardCategoryChoiceMode;
  picks: number;
  resets: "month" | "quarter" | "year" | "anniversary" | "never" | "unknown";
  options: string[];
}

export interface CatalogCard {
  id: number;
  name: string;
  issuer: string;
  network: string;
  annualFee: number;
  signupBonus: string | null;
  signupBonusValue: number | null;
  color: string;
  logoUrl: string | null;
  cardImageUrl: string | null;
  rewardType?: string;
  rewardProgram?: string | null;
  rewardUnitName?: string | null;
  rewardUnitValueCents?: number | null;
  rewardValuationDescription?: string | null;
  rewardRuleNotes?: string[];
  cashbackCategories: CashbackCategory[];
  categoryChoices?: CardCategoryChoice[];
  benefits: CardBenefit[];
  inWallet: boolean;
  market?: CardMarket;
  currency?: CardRuleCurrency;
  sourceUrl?: string;
  imageSourceUrl?: string | null;
  lastReviewedAt?: string;
  dataConfidence?: CardRuleDataConfidence;
  availability?: CardAvailability;
  availabilityChangedAt?: string;
}

/** One crawl observation for a single card source page. */
export interface CardSnapshot {
  cardId: number;
  cardName: string;
  url: string;
  checkedAt: string;
  status: number | "ERR";
  error?: string;
  /** Final URL after redirects, when it differs from `url`. */
  finalUrl?: string;
  etag?: string | null;
  lastModified?: string | null;
  /** sha256 of the raw response body. Flaps on every A/B token, so it is only a weak signal. */
  rawHash?: string;
  /** sha256 of the boilerplate-stripped visible text. The signal we actually trust. */
  textHash?: string;
  textLength?: number;
  extracted?: ExtractedFacts;
  /** Occurrences of each watched term, so the next run can say what changed. */
  termCounts?: Record<string, number>;
}

export interface ExtractedFacts {
  /** Dollar/local-currency amounts appearing next to the words "annual fee". */
  annualFeeCandidates: number[];
  /** Multipliers appearing next to earn language, e.g. `5x`, `3%`. */
  rateCandidates: string[];
  /** Statement-credit dollar amounts found on the page. */
  creditCandidates: number[];
  /** Page says the product is closed to new applicants. */
  looksDiscontinued: boolean;
  /** Page looks like a bot wall / JS shell rather than real product content. */
  looksBlocked: boolean;
}

export type FindingKind =
  | "PAGE_GONE"
  | "PAGE_REDIRECTED"
  | "PAGE_BLOCKED"
  | "PRODUCT_DISCONTINUED"
  | "ANNUAL_FEE_MISMATCH"
  | "CONTENT_CHANGED"
  | "MISSING_SOURCE_URL"
  | "MISSING_CARD_IMAGE"
  | "STALE_REVIEW"
  | "LOW_CONFIDENCE";

export type Severity = "high" | "medium" | "low";

export interface Finding {
  kind: FindingKind;
  severity: Severity;
  cardId: number;
  cardName: string;
  issuer: string;
  detail: string;
  url?: string;
  /** Keyword hits that changed between snapshots, when the finding is CONTENT_CHANGED. */
  changedTerms?: string[];
  catalogValue?: string;
  observedValue?: string;
}

export interface FreshnessReport {
  generatedAt: string;
  rulesetVersion: string;
  cardCount: number;
  crawled: number;
  reachable: number;
  findings: Finding[];
  stats: {
    byKind: Record<string, number>;
    bySeverity: Record<string, number>;
    stalestReviewDate: string;
    medianReviewAgeDays: number;
  };
}
