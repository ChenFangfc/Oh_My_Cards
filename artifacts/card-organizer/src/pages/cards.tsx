import { useListCards, useAddToWallet, useListWallet, type CreditCard } from "@workspace/api-client-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Check, Search, CreditCard as CreditCardIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getListWalletQueryKey } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { type ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CardArt, IssuerBrandChip, NetworkBadge } from "@/components/bank-logo";
import { formatAnnualFee, formatCardAmount } from "@/lib/card-format";
import {
  formatCompactEarnRate,
  formatCompactRewardCategory,
} from "@/lib/reward-display";

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

type CatalogCard = CreditCard & {
  market?: string | null;
  sourceUrl?: string | null;
};

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
  "Blue Cash Preferred Card from American Express": 17,
  "Blue Cash Everyday Card from American Express": 18,
  "Prime Visa": 19,
  "Costco Anywhere Visa Card by Citi": 20,
  "American Express Business Gold": 21,
  "The Business Platinum Card from American Express": 22,
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
  "U.S. Bank Cash+ Visa Signature": 34,
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

function getCardText(card: CreditCard): string {
  return [
    card.name,
    card.issuer,
    card.network,
    card.signupBonus ?? "",
    ...card.cashbackCategories.map((category) => category.category),
    ...card.benefits.flatMap((benefit) => [benefit.name, benefit.description]),
  ].join(" ").toLowerCase();
}

function hasAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function getCardTypes(card: CreditCard): CardTypeId[] {
  const text = getCardText(card);
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

function getCardPopularityScore(card: CreditCard): number {
  const bank = getPrimaryBank(card.issuer);
  const bankRank = BANK_SCALE_ORDER[bank] ?? 60;
  const types = getCardTypes(card);
  const bestRewardRate = Math.max(0, ...card.cashbackCategories.map((category) => category.rate));
  const market = getCardMarket(card);
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

  return score;
}

function compareCardsByPopularity(a: CreditCard, b: CreditCard): number {
  const scoreDelta = getCardPopularityScore(b) - getCardPopularityScore(a);
  if (scoreDelta !== 0) return scoreDelta;
  return a.name.localeCompare(b.name);
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
  const { data: cards, isLoading } = useListCards();
  const { data: wallet } = useListWallet();
  const addToWallet = useAddToWallet();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<CardTypeId | null>(null);
  const cardListRef = useRef<HTMLDivElement | null>(null);
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

  const bankOptions = useMemo<FilterOption[]>(() => {
    const counts = new Map<string, number>();
    for (const card of cards ?? []) {
      const bank = getPrimaryBank(card.issuer);
      counts.set(bank, (counts.get(bank) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([id, count]) => ({ id, label: id, count }))
      .sort((a, b) => {
        const rankDelta = (BANK_SCALE_ORDER[a.id] ?? Number.MAX_SAFE_INTEGER) - (BANK_SCALE_ORDER[b.id] ?? Number.MAX_SAFE_INTEGER);
        if (rankDelta !== 0) return rankDelta;
        return b.count - a.count || a.label.localeCompare(b.label);
      });
  }, [cards]);

  const typeOptions = useMemo<FilterOption[]>(() => {
    return CARD_TYPES.map((type) => ({
      id: type.id,
      label: type.label,
      count: (cards ?? []).filter((card) => getCardTypes(card).includes(type.id)).length,
    })).filter((type) => type.count > 0);
  }, [cards]);

  const filteredCards = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    const visibleCards = (cards ?? []).filter((card) => {
      const cardTypes = getCardTypes(card);
      const matchesSearch = searchTerm.length === 0 || getCardText(card).includes(searchTerm);
      const matchesBank = selectedBank == null || getPrimaryBank(card.issuer) === selectedBank;
      const matchesType = selectedType == null || cardTypes.includes(selectedType);
      return matchesSearch && matchesBank && matchesType;
    });

    return [...visibleCards].sort(compareCardsByPopularity);
  }, [cards, search, selectedBank, selectedType]);

  const activeFilterCount = (selectedBank == null ? 0 : 1) + (selectedType == null ? 0 : 1);
  const scrollKey = `${selectedBank ?? "all-banks"}|${selectedType ?? "all-types"}|${search.trim().toLowerCase()}`;

  const saveCurrentScrollPosition = () => {
    const scroller = cardListRef.current;
    if (scroller) {
      scrollPositionsRef.current[scrollKey] = scroller.scrollTop;
    }
  };

  const prepareFilterChange = () => {
    saveCurrentScrollPosition();
    suppressScrollSaveRef.current = true;
  };

  useLayoutEffect(() => {
    const scroller = cardListRef.current;
    if (!scroller) return;

    const key = scrollKey;
    let frame = 0;
    let secondFrame = 0;
    const restoreScroll = () => {
      const savedTop = scrollPositionsRef.current[key] ?? 0;
      scroller.scrollTop = Math.min(savedTop, Math.max(0, scroller.scrollHeight - scroller.clientHeight));
    };

    restoreScroll();
    frame = requestAnimationFrame(() => {
      restoreScroll();
      secondFrame = requestAnimationFrame(() => {
        restoreScroll();
        suppressScrollSaveRef.current = false;
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(secondFrame);
    };
  }, [scrollKey, filteredCards?.length]);

  return (
    <div className="flex h-[calc(100vh-5.5rem)] min-h-0 min-w-0 flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500 md:h-[calc(100vh-3rem)]">
      <div className="min-w-0 flex-none space-y-4">
        <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">Card Library</h2>

        {!isLoading && (
          <div className="w-full min-w-0 max-w-[calc(100vw-2rem)] space-y-3 overflow-hidden rounded-lg border border-card-border bg-card p-3 shadow-[var(--app-shadow-soft)] md:max-w-none">
            <div className="flex min-w-0 flex-col gap-2 border-b border-card-border/70 pb-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full min-w-0 sm:max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cards or banks..."
                  className="pl-9 bg-card"
                  value={search}
                  onChange={(e) => {
                    prepareFilterChange();
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground sm:text-right">
                {filteredCards.length} shown
              </span>
            </div>
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
                  }}
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear
                </Button>
              ) : null}
            />
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
        )}
      </div>

      <div
        ref={cardListRef}
        className="min-h-0 flex-1 overflow-y-auto pr-1 md:pr-2"
        onScroll={(event) => {
          if (suppressScrollSaveRef.current) return;
          scrollPositionsRef.current[scrollKey] = event.currentTarget.scrollTop;
        }}
      >
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
        ) : filteredCards?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-card/70 border-dashed shadow-[var(--app-shadow-soft)]">
          <CreditCardIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-lg font-medium">No cards found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCards?.map((card) => {
            const inWallet = walletCardIds.has(card.id) || card.inWallet;
            const sourceUrl = (card as CatalogCard).sourceUrl;
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
                    <CardTitle className="min-w-0 text-base leading-snug">
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
                      {card.cashbackCategories
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
                    disabled={inWallet || addToWallet.isPending}
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
        )}
      </div>
    </div>
  );
}
