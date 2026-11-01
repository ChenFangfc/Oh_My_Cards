import { useState, useEffect } from "react";
import { useSuggestCard } from "@workspace/api-client-react";
import type {
  CardSuggestion,
  SuggestedCard,
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CreditCard, ReceiptText, Sparkles, Wallet } from "lucide-react";
import { Link } from "wouter";
import { CardArt } from "@/components/bank-logo";
import {
  formatCompactEarnRate,
  formatCompactRewardCategory,
  getCompactRewardUnitName,
} from "@/lib/reward-display";
import { formatCardAmount } from "@/lib/card-format";
import { getLocale, t } from "@/lib/i18n";

const STORAGE_KEY = "smart-suggest:show-upgrades";

// Purchases the engine understands in either language.
const EXAMPLES_ZH = [
  "星巴克咖啡",
  "Costco 加油和买菜",
  "直接在 United 官网订去东京的机票",
  "在 Expedia 订凯悦酒店",
  "Uber Eats 外卖晚餐",
  "Shell 加油",
  "用 Apple Pay 在 Apple Store 买 iPad",
  "Netflix 订阅",
];

const EXAMPLES = [
  "Coffee at Starbucks",
  "Costco gas and groceries",
  "United flight to Tokyo booked direct",
  "Hyatt hotel on Expedia",
  "Uber Eats dinner",
  "Gas at Shell",
  "Apple Store iPad with Apple Pay",
  "Netflix subscription",
];

/**
 * Cash-equivalent unit names that do not literally say "cash": Target's
 * "Discount", "Verizon Dollars", "DBS$". These earn a percentage, not a
 * multiplier, so they must not render as "5x".
 */
const CASHBACK_UNIT_PATTERN = /cash|discount|dollar|rebate|\$/i;

/**
 * Shapes a SuggestedCard for the shared reward-display / card-format helpers.
 * `rewardType` is read defensively because the wire type does not carry it yet;
 * until it does, the unit name is the only available signal. `annualFee` is
 * required by the helper's parameter type but never read by the calls below.
 */
function toRewardCard(card: SuggestedCard) {
  const explicitType = (card as { rewardType?: "cashback" | "points" | "miles" | null }).rewardType;
  const unit = card.rewardUnitName ?? "Cash Back";
  return {
    annualFee: 0,
    currency: card.currency,
    rewardType: explicitType ?? (CASHBACK_UNIT_PATTERN.test(unit) ? ("cashback" as const) : null),
    rewardUnitName: card.rewardUnitName,
  };
}

function formatRewardRate(card: SuggestedCard) {
  const rewardCard = toRewardCard(card);
  const rawRate = card.rewardRate ?? card.cashbackRate;
  return `${formatCompactEarnRate(rewardCard, rawRate)} ${getCompactRewardUnitName(rewardCard)}`;
}

function formatSuggestedAmount(card: SuggestedCard, amount: number) {
  return formatCardAmount(toRewardCard(card), amount);
}

function SuggestedCardArt({
  card,
  className,
}: {
  card: SuggestedCard;
  className?: string;
}) {
  return (
    <CardArt
      cardImageUrl={card.cardImageUrl}
      color={card.color}
      alt={card.cardName}
      className={className}
      imageClassName="p-0"
      imageBackground="transparent"
      fallback={
        <span className="flex h-full w-full items-center justify-center px-2 text-center text-xs font-medium text-white">
          {card.cardName}
        </span>
      }
    />
  );
}

function CardResult({
  title,
  card,
  amount,
  icon,
  highlight,
}: {
  title: string;
  card: SuggestedCard;
  amount: number | null;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <Card
      className={
        highlight
          ? "overflow-hidden rounded-[24px] border-primary/35 bg-card shadow-[0_18px_48px_rgba(17,24,32,0.08)]"
          : "overflow-hidden rounded-[22px] border-card-border bg-card"
      }
    >
      <CardHeader className="border-b border-card-border/70 bg-secondary/25 p-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle as="h2" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {icon}
            {title}
          </CardTitle>
          {card.walletCardId == null && (
            <Badge
              variant="outline"
              className="rounded-full bg-card px-2.5 text-[11px] font-medium"
            >
              {t("Not in wallet")}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 @md:grid-cols-[144px_minmax(0,1fr)]">
          <SuggestedCardArt
            card={card}
            className="aspect-[1.586/1] w-full max-w-[170px] rounded-xl md:max-w-none"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-start gap-3">
              <div className="min-w-0">
                <div className="truncate text-lg font-semibold leading-tight text-foreground">
                  {card.cardName}
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">
                  {card.issuer} - {card.network}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {card.isDefaultRate ? t("Base Earning") : t("Reward Match")}
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground">
                  {t("{rate} on {category}", {
                    rate: formatRewardRate(card),
                    category: formatCompactRewardCategory(card.matchedCategory),
                  })}
                </div>
              </div>
              {amount != null && card.expectedCashback != null ? (
                <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-right text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">
                    {t("Expected Value")}</div>
                  <div className="text-xl font-semibold tabular-nums">
                    {formatSuggestedAmount(card, card.expectedCashback)}
                  </div>
                </div>
              ) : null}
            </div>

            {amount != null && card.expectedCashback != null && (
              <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t("{reward} on {amount}", {
                  reward:
                    card.rewardEstimate ??
                    t("{amount} estimated value", {
                      amount: formatSuggestedAmount(card, card.expectedCashback),
                    }),
                  amount: formatSuggestedAmount(card, amount),
                })}
              </div>
            )}
            {card.rulesApplied?.length ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {card.rulesApplied.map((rule) => (
                  <Badge
                    key={rule}
                    variant="outline"
                    className="rounded-full bg-background text-[11px]"
                  >
                    {rule}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BetterCardsPanel({
  cards,
  amount,
}: {
  cards: SuggestedCard[];
  amount: number | null;
}) {
  if (!cards.length) return null;

  return (
    <Card className="overflow-hidden rounded-[22px] border-card-border bg-card">
      <CardHeader className="border-b border-card-border/70 bg-secondary/25 p-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle as="h2" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            {t("Better Card")}</CardTitle>
          <Badge
            variant="outline"
            className="rounded-full bg-card px-2.5 text-[11px] font-medium"
          >
            {t("Not in wallet")}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 p-4 @xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={`better-card-${card.cardId}`}
            className="min-w-0 rounded-2xl border border-card-border bg-secondary/20 p-3"
          >
            <SuggestedCardArt
              card={card}
              className="mb-3 aspect-[1.586/1] w-full rounded-xl"
            />
            <div className="truncate text-sm font-semibold text-foreground">
              {card.cardName}
            </div>
            <div className="mt-1 truncate text-xs text-muted-foreground">
              {card.issuer} - {card.network}
            </div>
            <div className="mt-3 text-xs font-semibold text-foreground">
              <span className="text-muted-foreground">
                {card.isDefaultRate ? t("Base earning: ") : t("Reward match: ")}
              </span>
              {t("{rate} on {category}", {
                rate: formatRewardRate(card),
                category: formatCompactRewardCategory(card.matchedCategory),
              })}
            </div>
            {amount != null && card.expectedCashback != null ? (
              <div className="mt-2 text-sm font-semibold tabular-nums text-emerald-800 dark:text-emerald-300">
                {t("{amount} value", {
                  amount: formatSuggestedAmount(card, card.expectedCashback),
                })}
              </div>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/**
 * The rest of the wallet, ranked for this purchase. The engine always worked
 * these out; showing them answers "and if I'd rather not use that card?".
 */
function WalletRankingPanel({
  cards,
  amount,
}: {
  cards: SuggestedCard[];
  amount: number | null;
}) {
  if (!cards.length) return null;

  return (
    <Card className="overflow-hidden rounded-[22px] border-card-border bg-card">
      <CardHeader className="border-b border-card-border/70 bg-secondary/25 p-4 pb-3">
        <CardTitle
          as="h2"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
        >
          <Wallet className="h-4 w-4" />
          {t("Rest of your wallet")}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ol className="divide-y divide-card-border/70">
          {cards.map((card, index) => (
            <li
              key={`wallet-rank-${card.cardId}`}
              className="flex items-center gap-3 px-4 py-3"
            >
              <span className="w-5 shrink-0 text-right text-xs font-semibold tabular-nums text-muted-foreground">
                {index + 2}
              </span>
              <SuggestedCardArt
                card={card}
                className="aspect-[1.586/1] w-14 shrink-0 rounded-md"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">
                  {card.cardName}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {t("{rate} on {category}", {
                    rate: formatRewardRate(card),
                    category: formatCompactRewardCategory(card.matchedCategory),
                  })}
                </div>
              </div>
              {amount != null && card.expectedCashback != null ? (
                <div className="shrink-0 text-right text-sm font-semibold tabular-nums text-foreground">
                  {formatSuggestedAmount(card, card.expectedCashback)}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function ResultDisplay({
  result,
  showUpgrades,
}: {
  result: CardSuggestion;
  showUpgrades: boolean;
}) {
  const betterCards = showUpgrades
    ? (result.overallAlternatives ?? [])
        .filter((card) => card.walletCardId == null)
        .slice(0, 3)
    : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="secondary"
          className="gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {t(result.detectedCategory)}
        </Badge>
      </div>

      {result.clarifyingQuestion ? (
        <Card className="rounded-[20px] border-card-border bg-secondary/25">
          <CardContent className="p-4 text-sm leading-relaxed text-muted-foreground">
            {result.clarifyingQuestion}
          </CardContent>
        </Card>
      ) : null}

      {result.bestWalletCard ? (
        <CardResult
          title={t("Best in your wallet")}
          card={result.bestWalletCard}
          amount={result.amount ?? null}
          icon={<Wallet className="w-4 h-4" />}
          highlight
        />
      ) : (
        <Card className="rounded-[22px] border-dashed border-card-border bg-card/75">
          <CardContent className="flex flex-col items-start gap-3 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Wallet className="h-4 w-4" />
              {t("Nothing in your wallet to compare")}</div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {result.reasoning}
            </p>
            <Link
              href="/cards"
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t("Browse Card Library")}</Link>
          </CardContent>
        </Card>
      )}

      <WalletRankingPanel
        cards={result.walletAlternatives ?? []}
        amount={result.amount ?? null}
      />

      <BetterCardsPanel cards={betterCards} amount={result.amount ?? null} />
    </div>
  );
}

export default function Suggest() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [showUpgrades, setShowUpgrades] = useState(true);
  const [result, setResult] = useState<CardSuggestion | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored != null) setShowUpgrades(stored === "true");
    } catch {
      // A preference only; the default is fine.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(showUpgrades));
    } catch {
      // Private browsing can refuse writes.
    }
  }, [showUpgrades]);

  const suggest = useSuggestCard();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    const amt = amount.trim() ? Number(amount) : null;
    suggest.mutate(
      {
        data: {
          description: description.trim(),
          amount: amt != null && !isNaN(amt) ? amt : null,
        },
      },
      {
        onSuccess: (data) => setResult(data as CardSuggestion),
      },
    );
  };

  return (
    <div className="min-w-0">
      <div className="mb-5">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight md:text-[28px]">
          <Sparkles aria-hidden="true" className="h-6 w-6 text-foreground" />
          {t("Smart Suggest")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("Pick the highest-value card for the next purchase.")}</p>
      </div>

      <div className="overflow-hidden rounded-[30px] border border-card-border bg-card/95 shadow-[0_18px_48px_rgba(17,24,32,0.07)]">
        <div className="grid lg:grid-cols-[360px_minmax(0,1fr)]">
          <section className="border-b border-card-border bg-card/70 p-5 lg:sticky lg:top-0 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex items-center gap-2 text-base font-semibold">
              <ReceiptText className="h-4 w-4" />
              {t("Purchase")}</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="description"
                  className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                >
                  {t("Description")}</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("e.g. coffee, Costco groceries, United flight…")}
                  className="mt-2 h-11 rounded-2xl border-card-border bg-background px-4"
                />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(getLocale() === "zh-CN" ? EXAMPLES_ZH : EXAMPLES).map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setDescription(ex)}
                      className="rounded-full bg-secondary/75 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="amount"
                  className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                >
                  {t("Amount")}</Label>
                <Input
                  id="amount"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 50.00"
                  className="mt-2 h-11 rounded-2xl border-card-border bg-background px-4"
                />
              </div>

              <div className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/45 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <Switch
                    id="show-upgrades"
                    checked={showUpgrades}
                    onCheckedChange={setShowUpgrades}
                  />
                  <Label
                    htmlFor="show-upgrades"
                    className="cursor-pointer text-sm font-medium"
                  >
                    {t("Compare cards I don't own")}</Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!description.trim() || suggest.isPending}
                className="h-11 w-full rounded-full"
              >
                <CreditCard className="h-4 w-4" />
                {suggest.isPending ? t("Comparing cards…") : t("Suggest Card")}
              </Button>
            </form>
          </section>

          <section className="@container min-w-0 space-y-4 p-5">
            {suggest.isError && (
              <Card className="rounded-[20px] border-destructive">
                <CardContent className="py-4 text-sm text-destructive">
                  {t("Couldn't get a suggestion. Please try again.")}</CardContent>
              </Card>
            )}

            {result ? (
              <ResultDisplay result={result} showUpgrades={showUpgrades} />
            ) : (
              <Card className="rounded-[26px] border-card-border bg-card/75 shadow-[var(--app-shadow-soft)]">
                <CardContent className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-foreground">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {t("Ready for a purchase")}</div>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {t("Enter a merchant, category, travel provider, or payment method to compare your wallet against the card library.")}</p>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
