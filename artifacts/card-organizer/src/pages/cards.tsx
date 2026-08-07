import { useListCards, useAddToWallet, useListWallet, type CreditCard } from "@workspace/api-client-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Plus,
  Check,
  ChevronDown,
  Search,
  SlidersHorizontal,
  CreditCard as CreditCardIcon,
  TriangleAlert,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getListWalletQueryKey } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { type ReactNode, useDeferredValue, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CardArt, IssuerBrandChip, NetworkBadge } from "@/components/bank-logo";
import { formatAnnualFee, formatCardAmount } from "@/lib/card-format";
import {
  formatCompactEarnRate,
  formatCompactRewardCategory,
} from "@/lib/reward-display";
import { cn } from "@/lib/utils";

type CardTypeId =
  | "travel"
  | "flight"
  | "hotel"
  | "dining"
  | "grocery"
  | "gas"
  | "cashback"
  | "business"
  | "retail"
  | "student";

type FilterOption = {
  id: string;
  label: string;
  count: number;
};

/**
 * Catalog-only fields that are not part of the shared CreditCard wire type.
 * Read defensively — every one of them is optional in the catalog.
 */
type CatalogCard = CreditCard & {
  market?: string | null;
  sourceUrl?: string | null;
  availability?: string | null;
  availabilityChangedAt?: string | null;
};

const PAGE_SIZE = 24;

/** Scroll depth past which the filter panel collapses on its own. */
const COLLAPSE_SCROLL_THRESHOLD = 24;

const CARD_TYPES: Array<{ id: CardTypeId; label: string }> = [
  { id: "travel", label: "Travel" },
  { id: "flight", label: "Flight" },
  { id: "hotel", label: "Hotel" },
  { id: "dining", label: "Dining" },
  { id: "grocery", label: "Grocery" },
  { id: "gas", label: "Gas" },
  { id: "cashback", label: "Cashback" },
  { id: "business", label: "Business" },
  { id: "retail", label: "Retail" },
  { id: "student", label: "Student" },
];

const MARKET_ORDER = ["US", "Canada", "Hong Kong", "Singapore"];

const AVAILABILITY_LABELS: Record<string, string> = {
  "closed-to-new-applicants": "Closed to new applicants",
  discontinued: "No longer offered",
};

const BANK_MATCHERS: Array<{ label: string; match: (issuer: string) => boolean }> = [
  { label: "American Express", match: (issuer) => issuer.includes("american express") },
  { label: "Bank of America", match: (issuer) => issuer.includes("bank of america") },
  { label: "Capital One", match: (issuer) => issuer.includes("capital one") },
  { label: "Wells Fargo", match: (issuer) => issuer.includes("wells fargo") },
  { label: "Chase", match: (issuer) => issuer.includes("chase") },
  { label: "Citi", match: (issuer) => issuer.includes("citi") },
  { label: "Discover", match: (issuer) => issuer.includes("discover") },
  { label: "U.S. Bank", match: (issuer) => issuer.includes("us bank") || issuer.includes("u.s. bank") },
  { label: "Barclays", match: (issuer) => issuer.includes("barclays") },
  { label: "Fidelity", match: (issuer) => issuer.includes("fidelity") || issuer.includes("elan") },
  { label: "SoFi", match: (issuer) => issuer.includes("sofi") },
  { label: "Venmo", match: (issuer) => issuer.includes("venmo") },
  { label: "Alliant", match: (issuer) => issuer.includes("alliant") },
  { label: "Navy Federal", match: (issuer) => issuer.includes("navy federal") },
  { label: "AAA", match: (issuer) => issuer.includes("aaa") },
  { label: "FNBO", match: (issuer) => issuer.includes("fnbo") },
  { label: "PenFed", match: (issuer) => issuer.includes("penfed") },
  { label: "Bread Financial", match: (issuer) => issuer.includes("bread financial") },
  { label: "Verizon", match: (issuer) => issuer.includes("verizon") },
  { label: "Lowe's", match: (issuer) => issuer.includes("lowe") },
  { label: "PNC", match: (issuer) => issuer.includes("pnc") },
  { label: "TD", match: (issuer) => issuer.includes("td bank") || issuer.includes("td canada") },
  { label: "RBC", match: (issuer) => issuer.includes("rbc") },
  { label: "Scotiabank", match: (issuer) => issuer.includes("scotiabank") },
  { label: "BMO", match: (issuer) => issuer.includes("bmo") },
  { label: "CIBC", match: (issuer) => issuer.includes("cibc") },
  { label: "Rogers Bank", match: (issuer) => issuer.includes("rogers") },
  { label: "MBNA", match: (issuer) => issuer.includes("mbna") },
  { label: "National Bank", match: (issuer) => issuer.includes("national bank") },
  { label: "Apple", match: (issuer) => issuer.includes("apple") || issuer.includes("goldman sachs") },
  { label: "Robinhood", match: (issuer) => issuer.includes("robinhood") },
  { label: "PayPal", match: (issuer) => issuer.includes("paypal") || issuer.includes("synchrony") },
  { label: "Bilt", match: (issuer) => issuer.includes("bilt") },
  { label: "BECU", match: (issuer) => issuer.includes("becu") },
  { label: "HSBC", match: (issuer) => issuer.includes("hsbc") },
  { label: "Standard Chartered", match: (issuer) => issuer.includes("standard chartered") },
  { label: "Hang Seng", match: (issuer) => issuer.includes("hang seng") },
  { label: "DBS", match: (issuer) => issuer.includes("dbs") },
  { label: "UOB", match: (issuer) => issuer.includes("uob") || issuer.includes("united overseas bank") },
  { label: "OCBC", match: (issuer) => issuer.includes("ocbc") },
];

const BANK_SCALE_ORDER: Record<string, number> = {
  Chase: 1,
  "Bank of America": 2,
  Citi: 3,
  "Wells Fargo": 4,
  HSBC: 5,
  "U.S. Bank": 6,
  "Capital One": 7,
  PNC: 8,
  "American Express": 9,
  "Standard Chartered": 10,
  RBC: 11,
  TD: 12,
  DBS: 13,
  "Hang Seng": 14,
  OCBC: 15,
  UOB: 16,
  Discover: 17,
  Barclays: 18,
  Scotiabank: 19,
  BMO: 20,
  CIBC: 21,
  "National Bank": 22,
  "Navy Federal": 23,
  Fidelity: 24,
  FNBO: 25,
  PenFed: 26,
  Alliant: 27,
  "Bread Financial": 28,
  SoFi: 29,
  Apple: 30,
  PayPal: 31,
  Venmo: 32,
  Verizon: 33,
  "Lowe's": 34,
  AAA: 35,
  "Rogers Bank": 36,
  MBNA: 37,
  BECU: 38,
  Robinhood: 39,
  Bilt: 40,
};

/** Keys must match `card.name` in the catalog exactly, otherwise the boost silently never applies. */
const POPULAR_CARD_RANKS: Record<string, number> = {
  "Chase Sapphire Preferred": 1,
  "Chase Sapphire Reserve": 2,
  "American Express Gold Card": 3,
  "American Express Platinum": 4,
  "Capital One Venture X": 5,
  "Chase Freedom Unlimited": 6,
  "Chase Freedom Flex": 7,
  "Citi Double Cash": 8,
  "Bilt Mastercard": 9,
  "Apple Card": 10,
  "Wells Fargo Active Cash": 11,
  "Wells Fargo Autograph": 12,
  "Citi Custom Cash": 13,
  "Discover it Cash Back": 14,
  "Capital One Savor Rewards": 15,
  "Capital One Venture Rewards": 16,
  "Amex Blue Cash Preferred": 17,
  "Amex Blue Cash Everyday": 18,
  "Prime Visa": 19,
  "Costco Anywhere Visa by Citi": 20,
  "American Express Business Gold": 21,
  "American Express Business Platinum": 22,
  "Chase Ink Business Preferred": 23,
  "Chase Ink Business Cash": 24,
  "Chase Ink Business Unlimited": 25,
  "United Explorer Card": 26,
  "Southwest Rapid Rewards Priority": 27,
  "World of Hyatt Credit Card": 28,
  "Marriott Bonvoy Boundless": 29,
  "Hilton Honors American Express Aspire": 30,
  "Delta SkyMiles Gold American Express": 31,
  "Delta SkyMiles Platinum American Express": 32,
  "Citi Strata Premier": 33,
  "US Bank Cash+": 34,
  "Bank of America Customized Cash Rewards": 35,
  "Bank of America Premium Rewards": 36,
  "PayPal Cashback Mastercard": 37,
  "Robinhood Gold Card": 38,
  "American Express Green Card": 39,
  "Capital One Venture X Business": 40,
  "BECU Cash Back Visa": 92,
  "HSBC Red Credit Card": 93,
  "DBS Live Fresh Visa": 94,
  "UOB One Card": 95,
  "OCBC 365 Credit Card": 96,
  "Citi Cash Back Card (Singapore)": 97,
  "HSBC Revolution Credit Card": 98,
  "HSBC Visa Signature Card": 99,
  "Standard Chartered Cathay Mastercard": 100,
  "Hang Seng MMPOWER World Mastercard": 101,
  "DBS Black World Mastercard": 102,
  "Citi Cash Back Card (Hong Kong)": 103,
  "BECU Low Rate Visa": 104,
  "Standard Chartered Smart Credit Card": 105,
};

function getPrimaryBank(issuer: string): string {
  const normalized = issuer.toLowerCase();
  return BANK_MATCHERS.find((bank) => bank.match(normalized))?.label ?? issuer.split("/")[0].trim();
}

function hasAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function getCardTypes(text: string): CardTypeId[] {
  const types = new Set<CardTypeId>();

  if (hasAny(text, [
    "travel",
    "airline",
    "flight",
    "hotel",
    "rental car",
    "airport",
    "lounge",
    "global entry",
    "tsa precheck",
    "nexus",
    "foreign transaction",
    "passport",
    "avion",
    "aeroplan",
  ])) types.add("travel");

  if (hasAny(text, [
    "airline",
    "airline tickets",
    "flights",
    "flight",
    "delta",
    "united",
    "southwest",
    "american airlines",
    "aadvantage",
    "alaska airlines",
    "jetblue",
    "trueblue",
    "hawaiian",
    "hawaiianmiles",
    "cathay",
    "asia miles",
    "aeroplan",
    "air canada",
    "free checked bag",
    "priority boarding",
    "companion ticket",
  ])) types.add("flight");

  if (hasAny(text, [
    "hotel",
    "hotels",
    "marriott",
    "bonvoy",
    "hyatt",
    "hilton",
    "ihg",
    "wyndham",
    "choice hotels",
  ])) types.add("hotel");

  if (hasAny(text, ["dining", "restaurant", "restaurants"])) types.add("dining");
  if (hasAny(text, ["grocery", "groceries", "supermarket", "supermarkets", "wholesale clubs"])) types.add("grocery");
  if (hasAny(text, ["gas", "fuel", "ev charging"])) types.add("gas");

  if (hasAny(text, [
    "cash back",
    "cashback",
    "cash rewards",
    "cash unlimited",
    "cash plus",
    "cash rebate",
    "rewardcash",
    "+fun dollars",
    "active cash",
    "double cash",
    "custom cash",
    "all purchases",
    "rotating categories",
  ])) types.add("cashback");

  if (hasAny(text, ["business", "ink business"])) types.add("business");
  if (hasAny(text, [
    "amazon",
    "costco",
    "target",
    "walmart",
    "apple purchases",
    "apple pay",
    "online retail",
    "online shopping",
    "retail",
    "paypal",
  ])) types.add("retail");
  if (hasAny(text, ["student"])) types.add("student");

  return Array.from(types);
}

function getCardMarket(card: CreditCard): string {
  return (card as CatalogCard).market ?? "US";
}

function getCardAvailability(card: CreditCard): string {
  return (card as CatalogCard).availability ?? "open";
}

/**
 * Everything derived from a single card that the filter, sort and search passes
 * need. Built once per catalog load so no keystroke ever re-serializes a card.
 */
type CardMeta = {
  bank: string;
  market: string;
  availability: string;
  types: CardTypeId[];
  nameText: string;
  issuerText: string;
  categoryText: string;
  fullText: string;
  score: number;
};

function buildCardMeta(card: CreditCard): CardMeta {
  const nameText = card.name.toLowerCase();
  const issuerText = `${card.issuer} ${card.network}`.toLowerCase();
  const categoryText = card.cashbackCategories
    .map((category) => category.category)
    .join(" ")
    .toLowerCase();
  const fullText = [
    nameText,
    issuerText,
    (card.signupBonus ?? "").toLowerCase(),
    categoryText,
    ...card.benefits.flatMap((benefit) => [benefit.name.toLowerCase(), benefit.description.toLowerCase()]),
  ].join(" ");

  const bank = getPrimaryBank(card.issuer);
  const types = getCardTypes(fullText);
  const market = getCardMarket(card);
  const bankRank = BANK_SCALE_ORDER[bank] ?? 60;
  const bestRewardRate = Math.max(0, ...card.cashbackCategories.map((category) => category.rate));
  let score = 15_000 - bankRank * 80;

  score += ({
    US: 1_600,
    Canada: 900,
    "Hong Kong": 550,
    Singapore: 550,
  } as Record<string, number>)[market] ?? 500;

  if (types.includes("travel")) score += 450;
  if (types.includes("cashback")) score += 400;
  if (types.includes("business")) score += 250;
  if (types.includes("flight")) score += 220;
  if (types.includes("hotel")) score += 180;
  if (card.annualFee === 0) score += 150;
  if ((card.signupBonusValue ?? 0) >= 750) score += 180;
  else if ((card.signupBonusValue ?? 0) >= 500) score += 120;
  else if ((card.signupBonusValue ?? 0) >= 200) score += 60;
  if (bestRewardRate >= 0.05) score += 220;
  else if (bestRewardRate >= 0.03) score += 120;

  const explicitRank = POPULAR_CARD_RANKS[card.name];
  if (explicitRank != null) {
    score += Math.max(0, 24_000 - explicitRank * 220);
  }

  return { bank, market, availability: getCardAvailability(card), types, nameText, issuerText, categoryText, fullText, score };
}

/**
 * Higher is a better match. Benefit prose still matches so the result set is
 * unchanged, but it ranks below anything that matched the card's own identity.
 */
function getSearchRelevance(meta: CardMeta, term: string): number {
  if (term.length === 0) return 0;
  if (meta.nameText.startsWith(term)) return 5;
  if (meta.nameText.includes(term)) return 4;
  if (meta.issuerText.includes(term)) return 3;
  if (meta.categoryText.includes(term)) return 2;
  if (meta.fullText.includes(term)) return 1;
  return 0;
}

function findScrollParent(node: HTMLElement | null): HTMLElement | null {
  let current = node?.parentElement ?? null;
  while (current) {
    const overflowY = window.getComputedStyle(current).overflowY;
    if (overflowY === "auto" || overflowY === "scroll") return current;
    current = current.parentElement;
  }
  return null;
}

interface FilterGroupProps {
  label: string;
  allLabel: string;
  options: FilterOption[];
  selected: string | null;
  onSelect: (id: string | null) => void;
  action?: ReactNode;
}

function FilterGroup({ label, allLabel, options, selected, onSelect, action }: FilterGroupProps) {
  const showAll = selected == null;

  return (
    <div className="grid w-full min-w-0 max-w-full gap-2 overflow-hidden sm:grid-cols-[4rem_minmax(0,1fr)] sm:items-start">
      <div className="pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="flex w-full min-w-0 max-w-full items-start gap-2">
        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            aria-pressed={showAll}
            onClick={() => onSelect(null)}
            className={`inline-flex h-7 w-auto max-w-[12rem] flex-none items-center justify-start gap-1.5 overflow-hidden rounded-md border px-2.5 text-xs font-semibold whitespace-nowrap transition-colors sm:max-w-full ${
              showAll
                ? "border-primary bg-primary text-primary-foreground shadow-[var(--app-shadow-soft)]"
                : "border-card-border/80 bg-white/70 text-muted-foreground hover:border-primary/60 hover:text-foreground"
            }`}
          >
            {showAll ? <Check className="h-3.5 w-3.5 shrink-0" /> : null}
            <span className="truncate">{allLabel}</span>
          </button>
          {options.map((option) => {
            const active = selected === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(active ? null : option.id)}
                className={`inline-flex h-7 w-auto max-w-[12rem] flex-none items-center justify-start gap-1.5 overflow-hidden rounded-md border px-2.5 text-xs font-semibold whitespace-nowrap transition-colors sm:max-w-full ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-[var(--app-shadow-soft)]"
                    : "border-card-border/80 bg-white/70 text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {active ? <Check className="h-3.5 w-3.5 shrink-0" /> : null}
                <span className="min-w-0 flex-1 truncate text-left">{option.label}</span>
                <span className={active ? "ml-auto shrink-0 text-primary-foreground/70" : "ml-auto shrink-0 text-muted-foreground/70"}>{option.count}</span>
              </button>
            );
          })}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

export default function Cards() {
  const { data: cards, isLoading, isError, refetch } = useListCards();
  const { data: wallet } = useListWallet();
  const addToWallet = useAddToWallet();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<CardTypeId | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [showDiscontinued, setShowDiscontinued] = useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionsRef = useRef<Record<string, number>>({});
  const suppressScrollSaveRef = useRef(false);

  const handleAdd = (cardId: number) => {
    addToWallet.mutate(
      { data: { cardId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListWalletQueryKey() });
          toast({ title: "Added to Wallet", description: "Card successfully added to your wallet." });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Error", description: "Failed to add card to wallet." });
        }
      }
    );
  };

  const walletCardIds = new Set(wallet?.map(w => w.cardId) || []);

  const cardMeta = useMemo(() => {
    const meta = new Map<number, CardMeta>();
    for (const card of cards ?? []) {
      meta.set(card.id, buildCardMeta(card));
    }
    return meta;
  }, [cards]);

  const bankOptions = useMemo<FilterOption[]>(() => {
    const counts = new Map<string, number>();
    for (const meta of cardMeta.values()) {
      counts.set(meta.bank, (counts.get(meta.bank) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([id, count]) => ({ id, label: id, count }))
      .sort((a, b) => {
        const rankDelta = (BANK_SCALE_ORDER[a.id] ?? Number.MAX_SAFE_INTEGER) - (BANK_SCALE_ORDER[b.id] ?? Number.MAX_SAFE_INTEGER);
        if (rankDelta !== 0) return rankDelta;
        return b.count - a.count || a.label.localeCompare(b.label);
      });
  }, [cardMeta]);

  const typeOptions = useMemo<FilterOption[]>(() => {
    const counts = new Map<string, number>();
    for (const meta of cardMeta.values()) {
      for (const type of meta.types) {
        counts.set(type, (counts.get(type) ?? 0) + 1);
      }
    }
    return CARD_TYPES.map((type) => ({
      id: type.id,
      label: type.label,
      count: counts.get(type.id) ?? 0,
    })).filter((type) => type.count > 0);
  }, [cardMeta]);

  const marketOptions = useMemo<FilterOption[]>(() => {
    const counts = new Map<string, number>();
    for (const meta of cardMeta.values()) {
      counts.set(meta.market, (counts.get(meta.market) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([id, count]) => ({ id, label: id, count }))
      .sort((a, b) => {
        const orderDelta = (MARKET_ORDER.indexOf(a.id) + 1 || 99) - (MARKET_ORDER.indexOf(b.id) + 1 || 99);
        return orderDelta !== 0 ? orderDelta : a.label.localeCompare(b.label);
      });
  }, [cardMeta]);

  const retiredCount = useMemo(() => {
    let count = 0;
    for (const meta of cardMeta.values()) {
      if (meta.availability === "discontinued") count += 1;
    }
    return count;
  }, [cardMeta]);

  const deferredSearch = useDeferredValue(search);
  const searchTerm = deferredSearch.trim().toLowerCase();

  const filteredCards = useMemo(() => {
    const ranked: Array<{ card: CreditCard; relevance: number; score: number; name: string }> = [];

    for (const card of cards ?? []) {
      const meta = cardMeta.get(card.id);
      if (!meta) continue;
      if (!showDiscontinued && meta.availability === "discontinued") continue;
      if (selectedBank != null && meta.bank !== selectedBank) continue;
      if (selectedType != null && !meta.types.includes(selectedType)) continue;
      if (selectedMarket != null && meta.market !== selectedMarket) continue;

      const relevance = searchTerm.length === 0 ? 0 : getSearchRelevance(meta, searchTerm);
      if (searchTerm.length > 0 && relevance === 0) continue;

      ranked.push({ card, relevance, score: meta.score, name: card.name });
    }

    ranked.sort((a, b) => {
      if (a.relevance !== b.relevance) return b.relevance - a.relevance;
      if (a.score !== b.score) return b.score - a.score;
      return a.name.localeCompare(b.name);
    });

    return ranked.map((entry) => entry.card);
  }, [cards, cardMeta, searchTerm, selectedBank, selectedType, selectedMarket, showDiscontinued]);

  const activeFilterCount =
    (selectedBank == null ? 0 : 1) + (selectedType == null ? 0 : 1) + (selectedMarket == null ? 0 : 1);

  // Shown in place of the chip rows while collapsed, so the applied filters
  // stay visible and removable without expanding the panel.
  const activeFilterSummary = [
    selectedType
      ? {
          label: CARD_TYPES.find((type) => type.id === selectedType)?.label ?? selectedType,
          clear: () => setSelectedType(null),
        }
      : null,
    selectedMarket
      ? { label: selectedMarket, clear: () => setSelectedMarket(null) }
      : null,
    selectedBank
      ? { label: selectedBank, clear: () => setSelectedBank(null) }
      : null,
  ].filter((entry): entry is { label: string; clear: () => void } => entry !== null);
  const scrollKey = `${selectedBank ?? "all-banks"}|${selectedType ?? "all-types"}|${selectedMarket ?? "all-markets"}|${showDiscontinued}|${searchTerm}`;

  // Paging resets whenever the result set changes, without an extra render pass.
  const [pageState, setPageState] = useState({ key: scrollKey, count: PAGE_SIZE });
  const visibleCount = pageState.key === scrollKey ? pageState.count : PAGE_SIZE;
  const visibleCards = filteredCards.slice(0, visibleCount);
  const remainingCount = filteredCards.length - visibleCards.length;

  // The filter panel is four rows of chips tall, which covers most of a phone
  // screen once it sticks. It collapses itself as soon as the grid scrolls, and
  // a manual toggle overrides that until the user returns to the top — so
  // opening it to change a filter 100 cards down does not immediately re-close.
  const [isScrolled, setIsScrolled] = useState(false);
  const [manualExpanded, setManualExpanded] = useState<boolean | null>(null);
  const filtersExpanded = manualExpanded ?? !isScrolled;

  useLayoutEffect(() => {
    const scroller = findScrollParent(pageRef.current);
    if (!scroller) return;

    const syncCollapse = () => {
      const scrolled = scroller.scrollTop > COLLAPSE_SCROLL_THRESHOLD;
      setIsScrolled(scrolled);
      if (!scrolled) setManualExpanded(null);
    };

    syncCollapse();
    scroller.addEventListener("scroll", syncCollapse, { passive: true });
    return () => scroller.removeEventListener("scroll", syncCollapse);
  }, []);

  const saveCurrentScrollPosition = () => {
    const scroller = findScrollParent(pageRef.current);
    if (scroller) {
      scrollPositionsRef.current[scrollKey] = scroller.scrollTop;
    }
  };

  const prepareFilterChange = () => {
    saveCurrentScrollPosition();
    suppressScrollSaveRef.current = true;
  };

  useLayoutEffect(() => {
    const scroller = findScrollParent(pageRef.current);
    if (!scroller) return;

    const restoreScroll = () => {
      const savedTop = scrollPositionsRef.current[scrollKey] ?? 0;
      scroller.scrollTop = Math.min(savedTop, Math.max(0, scroller.scrollHeight - scroller.clientHeight));
    };

    restoreScroll();
    const frame = requestAnimationFrame(() => {
      restoreScroll();
      suppressScrollSaveRef.current = false;
    });

    const handleScroll = () => {
      if (suppressScrollSaveRef.current) return;
      scrollPositionsRef.current[scrollKey] = scroller.scrollTop;
    };
    scroller.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      suppressScrollSaveRef.current = false;
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, [scrollKey, filteredCards.length]);

  return (
    <div ref={pageRef} className="flex min-w-0 flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="min-w-0 text-2xl font-bold tracking-tight md:text-[28px]">Card Library</h2>

      {!isLoading && !isError && (
        // Negative insets on all four sides so the opaque backdrop covers the
        // page gutter. The negative `top` matters most: sticky pins to the
        // scroll container's *content* box, so `top-0` would leave its padding
        // strip uncovered and card art would scroll through it.
        <div className="sticky -top-4 z-20 -mx-4 -mt-4 bg-background px-4 pb-3 pt-4 md:-top-6 md:-mx-6 md:-mt-6 md:px-6 md:pt-6">
        <div className="w-full min-w-0 space-y-3 overflow-hidden rounded-lg border border-card-border bg-card p-3 shadow-[var(--app-shadow-soft)]">
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full min-w-0 sm:max-w-md">
              <Search aria-hidden="true" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                aria-label="Search cards or banks"
                placeholder="Search cards or banks..."
                className="pl-9 bg-card"
                value={search}
                onChange={(e) => {
                  prepareFilterChange();
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:justify-end">
              {retiredCount > 0 ? (
                <Button
                  type="button"
                  variant={showDiscontinued ? "secondary" : "ghost"}
                  size="sm"
                  aria-pressed={showDiscontinued}
                  className="h-8 px-2.5 text-xs"
                  onClick={() => {
                    prepareFilterChange();
                    setShowDiscontinued((previous) => !previous);
                  }}
                >
                  {showDiscontinued ? "Hide retired" : `Show retired (${retiredCount})`}
                </Button>
              ) : null}
              <span
                aria-live="polite"
                className="text-xs font-medium tabular-nums text-muted-foreground"
              >
                {filteredCards.length} shown
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-expanded={filtersExpanded}
                aria-controls="card-filters"
                className="h-8 gap-1 px-2 text-xs"
                onClick={() => setManualExpanded(!filtersExpanded)}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                {activeFilterCount > 0 ? (
                  <span className="rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                ) : null}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    filtersExpanded && "rotate-180",
                  )}
                />
              </Button>
            </div>
          </div>

          {!filtersExpanded && activeFilterSummary.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5 border-t border-card-border/70 pt-2">
              {activeFilterSummary.map((entry) => (
                <button
                  key={entry.label}
                  type="button"
                  aria-label={`Clear ${entry.label} filter`}
                  onClick={() => {
                    prepareFilterChange();
                    entry.clear();
                  }}
                  className="inline-flex h-7 items-center gap-1 rounded-md border border-transparent bg-primary px-2.5 text-xs font-semibold text-primary-foreground"
                >
                  {entry.label}
                  <X aria-hidden="true" className="h-3 w-3" />
                </button>
              ))}
            </div>
          ) : null}

          <div
            id="card-filters"
            hidden={!filtersExpanded}
            className="space-y-3 border-t border-card-border/70 pt-2"
          >
          <FilterGroup
            label="Type"
            allLabel="All types"
            options={typeOptions}
            selected={selectedType}
            onSelect={(type) => {
              prepareFilterChange();
              setSelectedType(type as CardTypeId | null);
            }}
            action={activeFilterCount > 0 ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => {
                  prepareFilterChange();
                  setSelectedBank(null);
                  setSelectedType(null);
                  setSelectedMarket(null);
                }}
              >
                <X className="mr-1 h-3 w-3" />
                Clear
              </Button>
            ) : null}
          />
          {marketOptions.length > 1 ? (
            <FilterGroup
              label="Market"
              allLabel="All markets"
              options={marketOptions}
              selected={selectedMarket}
              onSelect={(market) => {
                prepareFilterChange();
                setSelectedMarket(market);
              }}
            />
          ) : null}
          <FilterGroup
            label="Bank"
            allLabel="All banks"
            options={bankOptions}
            selected={selectedBank}
            onSelect={(bank) => {
              prepareFilterChange();
              setSelectedBank(bank);
            }}
          />
          </div>
        </div>
        </div>
      )}

      <div className="min-w-0">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
                <div className="h-36 bg-muted animate-pulse" />
              <CardHeader><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-1/2" /></CardHeader>
              <CardContent><Skeleton className="h-20 w-full" /></CardContent>
            </Card>
          ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/40 bg-destructive/5 py-12 text-center shadow-[var(--app-shadow-soft)]">
            <TriangleAlert className="mb-4 h-12 w-12 text-destructive opacity-70" />
            <h3 className="text-lg font-medium">Couldn't load the card library</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Your saved cards are safe. Retry to load the catalog again.
            </p>
            <Button type="button" variant="outline" className="mt-4" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-card/70 border-dashed shadow-[var(--app-shadow-soft)]">
          <CreditCardIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-lg font-medium">No cards found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleCards.map((card) => {
            const inWallet = walletCardIds.has(card.id) || card.inWallet;
            const isAdding = addToWallet.isPending && addToWallet.variables?.data.cardId === card.id;
            const catalogCard = card as CatalogCard;
            const sourceUrl = catalogCard.sourceUrl;
            const availability = getCardAvailability(card);
            const availabilityLabel = AVAILABILITY_LABELS[availability];
            return (
              <Card key={card.id} className="overflow-hidden flex flex-col transition-colors hover:border-primary/30">
                {/* Card visual: actual product image when available, gradient + branded header otherwise. */}
                <CardArt
                  cardImageUrl={card.cardImageUrl}
                  color={card.color}
                  alt={card.name}
                  className="h-44"
                  issuer={card.issuer}
                  logoUrl={card.logoUrl}
                  network={card.network}
                  fallback={
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                      <div className="relative z-10 flex justify-between items-start">
                        <IssuerBrandChip logoUrl={card.logoUrl} issuer={card.issuer} />
                        <NetworkBadge network={card.network} />
                      </div>
                      <div className="relative z-10 text-white drop-shadow">
                        <div className="text-xs font-medium opacity-75 tracking-wide uppercase mb-0.5">{card.issuer}</div>
                        <div className="font-bold text-base leading-tight">{card.name}</div>
                      </div>
                    </div>
                  }
                />

                <CardHeader className="pb-2 flex-none">
                  <div className="flex justify-between items-start gap-3">
                    <CardTitle as="h3" className="min-w-0 text-base leading-snug">
                      {sourceUrl ? (
                        <a
                          href={sourceUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="line-clamp-2 underline decoration-transparent underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {card.name}
                        </a>
                      ) : (
                        card.name
                      )}
                    </CardTitle>
                    <Badge variant={card.annualFee === 0 ? "secondary" : "outline"} className="font-numeric text-xs font-semibold">
                      {formatAnnualFee(card, { includePeriod: true })}
                    </Badge>
                  </div>
                  <CardDescription>{card.issuer}</CardDescription>
                  {availabilityLabel ? (
                    <Badge
                      variant="outline"
                      title={catalogCard.availabilityChangedAt ? `Since ${catalogCard.availabilityChangedAt}` : undefined}
                      className={cn(
                        "w-fit text-[11px] font-semibold",
                        availability === "discontinued"
                          ? "border-destructive/40 bg-destructive/10 text-destructive"
                          : "border-amber-500/40 bg-amber-500/10 text-amber-700",
                      )}
                    >
                      {availabilityLabel}
                    </Badge>
                  ) : null}
                </CardHeader>

                <CardContent className="flex-1 pb-3 text-sm space-y-3">
                  {card.signupBonus && (
                    <div className="rounded-lg border border-card-border bg-secondary/45 p-3">
                      <div className="font-semibold text-foreground text-xs mb-1">Signup Bonus</div>
                      <div className="text-muted-foreground text-xs leading-relaxed">{card.signupBonus}</div>
                      {card.signupBonusValue && (
                        <div className="text-xs mt-1 font-semibold tabular-nums text-foreground">
                          Est. Value: {formatCardAmount(card, card.signupBonusValue)}
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <div className="font-medium text-xs uppercase tracking-wider text-muted-foreground mb-2">Top Rewards</div>
                    <div className="flex flex-wrap gap-1.5">
                      {[...card.cashbackCategories]
                        .sort((a, b) => b.rate - a.rate)
                        .slice(0, 4)
                        .map(cat => (
                          <Badge key={cat.id} variant="secondary" className="bg-secondary/80 font-normal text-xs">
                            {formatCompactEarnRate(card, cat.rate)} {formatCompactRewardCategory(cat.category)}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-3 border-t border-card-border/60 bg-secondary/35">
                  <Button
                    className="w-full font-medium"
                    variant={inWallet ? "secondary" : "default"}
                    disabled={inWallet || isAdding}
                    aria-label={inWallet ? `${card.name} is already in your wallet` : `Add ${card.name} to wallet`}
                    onClick={() => handleAdd(card.id)}
                  >
                    {inWallet ? (
                      <><Check className="mr-2 h-4 w-4" /> In Wallet</>
                    ) : (
                      <><Plus className="mr-2 h-4 w-4" /> Add to Wallet</>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
          </div>
          {remainingCount > 0 ? (
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                className="min-h-11 px-6"
                onClick={() => setPageState({ key: scrollKey, count: visibleCount + PAGE_SIZE })}
              >
                Show {Math.min(PAGE_SIZE, remainingCount)} more
                <span className="ml-2 text-xs font-normal tabular-nums text-muted-foreground">
                  {remainingCount} left
                </span>
              </Button>
            </div>
          ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
