import {
  useGetDashboardSummary,
  useGetUnusedBenefits,
  useGetUsedBenefits,
  useListWallet,
  useListTransactions,
  useMarkBenefitUnused,
  useMarkBenefitUsed,
  useRemoveFromWallet,
  useUpdateWalletCard,
  useGetBillingCycles,
  getListWalletQueryKey,
  getGetDashboardSummaryQueryKey,
  getGetUnusedBenefitsQueryKey,
  getGetUsedBenefitsQueryKey,
  getGetBillingCyclesQueryKey,
  getGetSpendingStatsQueryKey,
  getListTransactionsQueryKey,
  type CreditCard as CreditCardData,
} from "@workspace/api-client-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Trash2,
  Circle,
  CreditCard,
  DollarSign,
  Gift,
  Wallet as WalletIcon,
  TrendingUp,
  Settings2,
  AlertCircle,
  CalendarClock,
  ExternalLink,
  PanelRightOpen,
  ReceiptText,
  RotateCcw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ToastAction } from "@/components/ui/toast";
import { CardArt, IssuerBrandChip, NetworkBadge } from "@/components/bank-logo";
import {
  formatAnnualFee,
  formatCardAmount,
  getCardCurrency,
} from "@/lib/card-format";
import {
  formatCompactEarnRate,
  formatCompactRewardCategory,
  formatCompactRewardTotal,
} from "@/lib/reward-display";
import { cn } from "@/lib/utils";
import {
  type ComponentType,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

type DetailedCreditCard = CreditCardData & {
  sourceUrl?: string | null;
  lastReviewedAt?: string | null;
  dataConfidence?: string | null;
  market?: string | null;
  rewardRuleNotes?: string[] | null;
};

type CashbackPeriod = "1m" | "3m" | "6m" | "12m";

const CASHBACK_PERIODS: Array<{
  id: CashbackPeriod;
  label: string;
  months: number;
  helper: string;
}> = [
  { id: "1m", label: "1M", months: 1, helper: "Past Month" },
  { id: "3m", label: "3M", months: 3, helper: "Past 3 Months" },
  { id: "6m", label: "6M", months: 6, helper: "Past 6 Months" },
  { id: "12m", label: "1Y", months: 12, helper: "Past Year" },
];

function getCashbackPeriodStart(period: CashbackPeriod): Date {
  const selectedPeriod =
    CASHBACK_PERIODS.find((item) => item.id === period) ?? CASHBACK_PERIODS[3];
  const start = new Date();
  start.setMonth(start.getMonth() - selectedPeriod.months);
  return start;
}

function daysInMonth(year: number, monthIdx: number): number {
  return new Date(year, monthIdx + 1, 0).getDate();
}

function nextDayOfMonth(day: number, today = new Date()): Date {
  const normalizedToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const build = (year: number, month: number) =>
    new Date(year, month, Math.min(day, daysInMonth(year, month)));
  let next = build(normalizedToday.getFullYear(), normalizedToday.getMonth());
  if (next < normalizedToday) {
    const nextMonth = normalizedToday.getMonth() + 1;
    next = build(
      nextMonth > 11
        ? normalizedToday.getFullYear() + 1
        : normalizedToday.getFullYear(),
      nextMonth > 11 ? 0 : nextMonth,
    );
  }
  return next;
}

function daysUntil(date: Date, today = new Date()): number {
  const normalizedToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  return Math.ceil((date.getTime() - normalizedToday.getTime()) / 86400000);
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isTransactionOnOrAfter(dateInput: string, start: Date): boolean {
  return startOfLocalDay(new Date(dateInput)) >= startOfLocalDay(start);
}

function isTransactionOnOrBefore(dateInput: string, end: Date): boolean {
  return startOfLocalDay(new Date(dateInput)) <= startOfLocalDay(end);
}

function matchesWalletCardId(
  transaction: { walletCardId?: unknown },
  walletCardId: number,
): boolean {
  return Number(transaction.walletCardId) === walletCardId;
}

function getCardRewardKind(
  card: DetailedCreditCard,
): "cash back" | "points" | "miles" {
  if (card.rewardType === "points") return "points";
  if (card.rewardType === "miles") return "miles";
  if (card.rewardType === "cashback") return "cash back";

  const text = `${card.name} ${card.signupBonus ?? ""}`.toLowerCase();

  if (
    text.includes("cash back") ||
    text.includes("cashback") ||
    text.includes("cash rewards")
  ) {
    return "cash back";
  }
  if (text.includes("mile")) return "miles";
  if (text.includes("point") || text.includes("rewards")) return "points";
  return "cash back";
}

function getRewardUnitValueCents(card: DetailedCreditCard): number {
  return card.rewardUnitValueCents && card.rewardUnitValueCents > 0
    ? card.rewardUnitValueCents
    : 1;
}

function formatCardRewardTotal(
  card: DetailedCreditCard,
  rewardValue: number,
): string {
  const kind = getCardRewardKind(card);
  if (kind === "cash back") {
    return `${formatCardAmount(card, rewardValue)} Cash Back`;
  }

  const unitValueCents = getRewardUnitValueCents(card);
  const units = Math.round((rewardValue * 100) / unitValueCents).toLocaleString(
    "en-US",
  );
  const unitName =
    card.rewardUnitName ?? (kind === "miles" ? "Miles" : "Points");
  return `${units} ${unitName}`;
}

function formatEarnRate(card: DetailedCreditCard, rate: number): string {
  const multiplier = rate * 100;
  const value = Number.isInteger(multiplier)
    ? multiplier.toFixed(0)
    : multiplier.toFixed(1);
  return getCardRewardKind(card) === "cash back" ? `${value}%` : `${value}x`;
}

function getAnnualFeeTone(percent: number, covered: boolean) {
  const progressFill =
    "linear-gradient(90deg, #F6C85F 0%, #DCD978 42%, #A8D98A 72%, #7BCFA6 100%)";

  if (covered) {
    return {
      panel:
        "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/50 dark:bg-emerald-950/15",
      text: "text-emerald-900 dark:text-emerald-200",
      fill: progressFill,
    };
  }

  if (percent >= 50) {
    return {
      panel:
        "border-amber-200 bg-amber-50/40 dark:border-amber-900/50 dark:bg-amber-950/15",
      text: "text-amber-900 dark:text-amber-200",
      fill: progressFill,
    };
  }

  return {
    panel:
      "border-amber-200 bg-amber-50/35 dark:border-amber-900/50 dark:bg-amber-950/15",
    text: "text-amber-900 dark:text-amber-200",
    fill: progressFill,
  };
}

function formatEstimatedAmount(
  amount: number | null | undefined,
  card?: DetailedCreditCard,
): string | null {
  if (!amount || amount <= 0) return null;

  const hasFraction = !Number.isInteger(amount);
  const currency = card ? getCardCurrency(card) : "USD";
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  }).format(amount);

  return `Est. Value ${formatted}`;
}

function formatCompactCardAmount(
  card: DetailedCreditCard,
  amount: number,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: getCardCurrency(card),
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(amount);
}

type VisualTone = "neutral" | "value" | "fee" | "attention";

const TONE_STYLES: Record<
  VisualTone,
  {
    border: string;
    icon: string;
    value: string;
    badge: string;
    soft: string;
  }
> = {
  neutral: {
    border: "border-t-card-border",
    icon: "bg-secondary text-foreground",
    value: "text-foreground",
    badge: "bg-secondary text-foreground",
    soft: "bg-secondary/45",
  },
  value: {
    border: "border-t-emerald-200",
    icon: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200",
    value: "text-emerald-900 dark:text-emerald-200",
    badge:
      "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200",
    soft: "bg-emerald-50/50 dark:bg-emerald-950/15",
  },
  fee: {
    border: "border-t-amber-200",
    icon: "bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200",
    value: "text-amber-900 dark:text-amber-200",
    badge:
      "bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200",
    soft: "bg-amber-50/50 dark:bg-amber-950/15",
  },
  attention: {
    border: "border-t-rose-200",
    icon: "bg-rose-50 text-rose-900 dark:bg-rose-950/30 dark:text-rose-200",
    value: "text-rose-900 dark:text-rose-200",
    badge: "bg-rose-50 text-rose-900 dark:bg-rose-950/30 dark:text-rose-200",
    soft: "bg-rose-50/50 dark:bg-rose-950/15",
  },
};

interface BillingSettingsDialogProps {
  walletCardId: number;
  cardName: string;
  trigger?: ReactNode;
  initial: {
    nickname: string | null | undefined;
    statementClosingDay: number | null | undefined;
    paymentDueDay: number | null | undefined;
    creditLimit: number | null | undefined;
    openedAt: string | null | undefined;
  };
}

function BillingSettingsDialog({
  walletCardId,
  cardName,
  trigger,
  initial,
}: BillingSettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState(initial.nickname ?? "");
  const [closingDay, setClosingDay] = useState(
    initial.statementClosingDay?.toString() ?? "",
  );
  const [dueDay, setDueDay] = useState(initial.paymentDueDay?.toString() ?? "");
  const [creditLimit, setCreditLimit] = useState(
    initial.creditLimit?.toString() ?? "",
  );
  const [openedAt, setOpenedAt] = useState(
    initial.openedAt ? initial.openedAt.slice(0, 10) : "",
  );
  const update = useUpdateWalletCard();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleSave = () => {
    const closingNum = closingDay ? Number(closingDay) : null;
    const dueNum = dueDay ? Number(dueDay) : null;
    const limitNum = creditLimit ? Number(creditLimit) : null;

    if (closingNum !== null && (closingNum < 1 || closingNum > 31)) {
      toast({
        variant: "destructive",
        title: "Invalid closing day",
        description: "Must be between 1 and 31",
      });
      return;
    }
    if (dueNum !== null && (dueNum < 1 || dueNum > 31)) {
      toast({
        variant: "destructive",
        title: "Invalid due day",
        description: "Must be between 1 and 31",
      });
      return;
    }

    update.mutate(
      {
        id: walletCardId,
        data: {
          nickname: nickname.trim() || null,
          statementClosingDay: closingNum,
          paymentDueDay: dueNum,
          creditLimit: limitNum,
          openedAt: openedAt ? new Date(openedAt).toISOString() : null,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListWalletQueryKey() });
          queryClient.invalidateQueries({
            queryKey: getGetBillingCyclesQueryKey(),
          });
          toast({ title: "Billing settings saved" });
          setOpen(false);
        },
        onError: () =>
          toast({
            variant: "destructive",
            title: "Could not save settings",
          }),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Settings2 className="h-4 w-4 mr-1" /> Billing
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Billing Settings</DialogTitle>
          <DialogDescription>
            Configure {cardName} so we can compute statement balances, due
            dates, and minimum payments.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor="nickname">Nickname (optional)</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="e.g. Travel card"
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="closing">Statement closes on (day)</Label>
              <Input
                id="closing"
                type="number"
                min={1}
                max={31}
                value={closingDay}
                onChange={(e) => setClosingDay(e.target.value)}
                placeholder="e.g. 15"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="due">Payment due on (day)</Label>
              <Input
                id="due"
                type="number"
                min={1}
                max={31}
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
                placeholder="e.g. 12"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="limit">Credit limit ($)</Label>
            <Input
              id="limit"
              type="number"
              min={0}
              step="100"
              value={creditLimit}
              onChange={(e) => setCreditLimit(e.target.value)}
              placeholder="e.g. 10000"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Used to track utilization in the current cycle.
            </p>
          </div>
          <div>
            <Label htmlFor="opened">Account opened on</Label>
            <Input
              id="opened"
              type="date"
              value={openedAt}
              onChange={(e) => setOpenedAt(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Used to count down to your next annual fee charge and track
              cashback earned this cardmember year.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={update.isPending}>
            {update.isPending ? "Saving..." : "Save Settings"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface WalletSummaryStripProps {
  isLoading: boolean;
  isBenefitsLoading: boolean;
  isCashbackLoading: boolean;
  cashbackPeriod: CashbackPeriod;
  cashbackValue: number;
  isBenefitDetailsOpen: boolean;
  onCashbackPeriodChange: (period: CashbackPeriod) => void;
  onBenefitDetailsToggle: () => void;
  benefitDetailsPanel?: ReactNode;
  totalCards: number;
  usedBenefitsCount: number;
  usedBenefitValue: number;
  summary:
    | {
        totalCashbackEarned?: number;
        totalAnnualFees?: number;
        totalBenefitValue?: number;
        unusedBenefitsCount?: number;
      }
    | undefined;
}

function WalletSummaryStrip({
  isLoading,
  isBenefitsLoading,
  isCashbackLoading,
  cashbackPeriod,
  cashbackValue,
  isBenefitDetailsOpen,
  onCashbackPeriodChange,
  onBenefitDetailsToggle,
  benefitDetailsPanel,
  summary,
  totalCards,
  usedBenefitsCount,
  usedBenefitValue,
}: WalletSummaryStripProps) {
  const unusedBenefitsCount = summary?.unusedBenefitsCount ?? 0;
  const totalBenefitsCount = usedBenefitsCount + unusedBenefitsCount;
  const usedBenefitsPercent =
    totalBenefitsCount > 0
      ? Math.round((usedBenefitsCount / totalBenefitsCount) * 100)
      : 0;
  const selectedCashbackPeriod =
    CASHBACK_PERIODS.find((period) => period.id === cashbackPeriod) ??
    CASHBACK_PERIODS[3];

  return (
    <div className="grid items-stretch gap-3 md:grid-cols-3">
      <WalletSummaryTile
        title="Cards"
        value={isLoading ? <Skeleton className="h-7 w-12" /> : totalCards}
        helper={
          isLoading ? (
            "Active Wallet"
          ) : (
            <span>
              Active Wallet ·{" "}
              <span className="font-semibold text-amber-900 dark:text-amber-200">
                Total Annual Fee: ${(summary?.totalAnnualFees ?? 0).toFixed(2)}
                /yr
              </span>
            </span>
          )
        }
        icon={CreditCard}
        tone="neutral"
      />
      <WalletSummaryTile
        title="Cashback"
        value={
          isLoading || isCashbackLoading ? (
            <Skeleton className="h-7 w-20" />
          ) : (
            `$${cashbackValue.toFixed(2)}`
          )
        }
        helper={
          <div className="space-y-2">
            <div>{selectedCashbackPeriod.helper}</div>
            <div className="inline-flex w-fit max-w-full flex-wrap gap-1 rounded-md bg-secondary/60 p-1">
              {CASHBACK_PERIODS.map((period) => (
                <button
                  key={period.id}
                  type="button"
                  onClick={() => onCashbackPeriodChange(period.id)}
                  className={cn(
                    "h-6 rounded px-2 text-[11px] font-semibold transition-colors",
                    cashbackPeriod === period.id
                      ? "bg-card text-foreground shadow-[var(--app-shadow-soft)]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        }
        icon={DollarSign}
        tone="value"
      />
      <WalletSummaryTile
        title="Benefits"
        className="relative z-20"
        value={
          isLoading || isBenefitsLoading ? (
            <Skeleton className="h-7 w-20" />
          ) : (
            <button
              type="button"
              data-benefit-toggle
              className="block w-full rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={isBenefitDetailsOpen}
              onClick={onBenefitDetailsToggle}
            >
              <div className="relative h-8 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-emerald-300 transition-all"
                  style={{ width: `${usedBenefitsPercent}%` }}
                />
                <div className="relative z-10 flex h-full items-center justify-between gap-2 px-3 text-xs font-semibold tabular-nums">
                  <span className="text-emerald-950 dark:text-emerald-950">
                    {usedBenefitsCount} Used
                  </span>
                  <span className="text-muted-foreground">
                    {unusedBenefitsCount} Unused
                  </span>
                </div>
              </div>
            </button>
          )
        }
        helper={
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <span className="tabular-nums">
              Est. Used Value ${usedBenefitValue.toFixed(2)}
            </span>
            <button
              type="button"
              data-benefit-toggle
              className="font-semibold text-foreground underline-offset-4 hover:underline"
              onClick={onBenefitDetailsToggle}
            >
              {isBenefitDetailsOpen ? "Hide Details" : "View Details"}
            </button>
          </div>
        }
        icon={Gift}
        tone="neutral"
        overlay={benefitDetailsPanel}
      />
    </div>
  );
}

interface WalletSummaryTileProps {
  title: string;
  value: ReactNode;
  helper: ReactNode;
  icon: ComponentType<{ className?: string }>;
  tone: VisualTone;
  className?: string;
  footer?: ReactNode;
  overlay?: ReactNode;
}

function WalletSummaryTile({
  title,
  value,
  helper,
  icon: Icon,
  tone,
  className,
  footer,
  overlay,
}: WalletSummaryTileProps) {
  const styles = TONE_STYLES[tone];

  return (
    <Card
      className={cn(
        "h-full min-h-[148px] overflow-visible border-t-4 shadow-[var(--app-shadow-soft)]",
        styles.border,
        className,
      )}
    >
      <CardContent className="flex h-full items-start justify-between gap-4 p-4">
        <div className="flex h-full min-w-0 flex-1 flex-col">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {title}
          </div>
          <div
            className={cn(
              "mt-2 flex min-h-9 items-center text-2xl font-bold tracking-tight tabular-nums",
              styles.value,
            )}
          >
            {value}
          </div>
          <div className="mt-2 min-h-9 text-xs text-muted-foreground">
            {helper}
          </div>
          {footer}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            styles.icon,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
      {overlay ? (
        <div
          data-benefit-popover
          className="absolute right-0 top-[calc(100%+0.75rem)] z-30 w-[min(44rem,calc(100vw-3rem))] animate-in fade-in slide-in-from-top-2 duration-300"
        >
          {overlay}
        </div>
      ) : null}
    </Card>
  );
}

interface WalletBenefit {
  walletCardId: number;
  benefitId: number;
  cardName: string;
  name: string;
  description: string;
  annualValue?: number | null;
}

interface WalletBenefitsPanelProps {
  unusedBenefits: WalletBenefit[] | undefined;
  usedBenefits: WalletBenefit[] | undefined;
  isLoading: boolean;
  isPending: boolean;
  onMarkUsed: (walletCardId: number, benefitId: number) => void;
  onMarkUnused: (walletCardId: number, benefitId: number) => void;
}

function WalletBenefitsPanel({
  unusedBenefits,
  usedBenefits,
  isLoading,
  isPending,
  onMarkUsed,
  onMarkUnused,
}: WalletBenefitsPanelProps) {
  const [view, setView] = useState<"unused" | "used">("unused");

  if (isLoading) {
    return <Skeleton className="h-36 w-full rounded-2xl" />;
  }

  const unusedCount = unusedBenefits?.length ?? 0;
  const usedCount = usedBenefits?.length ?? 0;
  const activeBenefits =
    view === "unused" ? (unusedBenefits ?? []) : (usedBenefits ?? []);

  if (unusedCount + usedCount === 0) {
    return null;
  }

  return (
    <Card className="overflow-hidden shadow-[var(--app-shadow-soft)]">
      <CardContent className="p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-base font-semibold text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground">
                <Gift className="h-4 w-4" />
              </span>
              Card Benefits
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Track wallet perks and undo accidental usage updates.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-card-border bg-secondary/50 p-1">
            <button
              type="button"
              onClick={() => setView("unused")}
              className={`h-7 rounded-md px-3 text-xs font-semibold transition-colors ${
                view === "unused"
                  ? "bg-card text-foreground shadow-[var(--app-shadow-soft)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Unused {unusedCount}
            </button>
            <button
              type="button"
              onClick={() => setView("used")}
              className={`h-7 rounded-md px-3 text-xs font-semibold transition-colors ${
                view === "used"
                  ? "bg-card text-foreground shadow-[var(--app-shadow-soft)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Used {usedCount}
            </button>
          </div>
        </div>

        {activeBenefits.length === 0 ? (
          <div className="rounded-xl border border-dashed border-card-border bg-secondary/30 p-5 text-sm text-muted-foreground">
            {view === "unused"
              ? "No unused benefits right now."
              : "No benefits have been marked used yet."}
          </div>
        ) : (
          <div className="max-h-[24rem] overflow-y-auto pr-1">
            <div className="grid gap-3 sm:grid-cols-2">
              {activeBenefits.map((benefit) => {
                const estimatedValue = formatEstimatedAmount(
                  benefit.annualValue,
                );

                return (
                  <div
                    key={`${view}-${benefit.walletCardId}-${benefit.benefitId}`}
                    className={cn(
                      "rounded-xl border border-card-border bg-card p-4 shadow-[var(--app-shadow-soft)]",
                      view === "used" ? "border-l-4 border-l-card-border" : "",
                    )}
                  >
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {benefit.cardName}
                        </div>
                        <div className="mt-1 font-semibold leading-snug text-foreground">
                          {benefit.name}
                        </div>
                      </div>
                      {estimatedValue ? (
                        <Badge className="shrink-0 border-0 bg-secondary text-foreground tabular-nums hover:bg-secondary">
                          {estimatedValue}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="line-clamp-3 min-h-[3.75rem] text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                    {view === "unused" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full justify-start border-dashed text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          onMarkUsed(benefit.walletCardId, benefit.benefitId)
                        }
                        disabled={isPending}
                      >
                        <Circle className="mr-2 h-4 w-4" />
                        Mark Used
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full justify-start border-dashed text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          onMarkUnused(benefit.walletCardId, benefit.benefitId)
                        }
                        disabled={isPending}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Mark Unused
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatReviewedDate(value?: string | null): string | null {
  if (!value) return null;
  const reviewed = new Date(value);
  if (Number.isNaN(reviewed.getTime())) return null;
  return format(reviewed, "MMM d, yyyy");
}

type CardBenefitItem = DetailedCreditCard["benefits"][number];

interface WalletCardBenefitItemProps {
  benefit: CardBenefitItem;
  card: DetailedCreditCard;
  isUsed: boolean;
  isPending: boolean;
  compact?: boolean;
  onMarkUsed: () => void;
  onMarkUnused: () => void;
}

function WalletCardBenefitItem({
  benefit,
  card,
  isUsed,
  isPending,
  compact = false,
  onMarkUsed,
  onMarkUnused,
}: WalletCardBenefitItemProps) {
  const estimatedValue = formatEstimatedAmount(benefit.annualValue, card);

  return (
    <div
      className={cn(
        "rounded-lg border border-card-border bg-card px-3 py-1.5 shadow-[var(--app-shadow-soft)]",
        isUsed ? "bg-secondary/35" : "",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div
            className={cn(
              "font-semibold leading-snug text-foreground",
              compact ? "line-clamp-1 text-sm" : "text-sm",
            )}
          >
            {benefit.name}
          </div>
          <div
            className={cn(
              "mt-0.5 text-xs leading-relaxed text-muted-foreground",
              compact ? "line-clamp-2" : "",
            )}
          >
            {benefit.description}
          </div>
        </div>
        {estimatedValue ? (
          <Badge className="shrink-0 border-0 bg-secondary text-foreground tabular-nums hover:bg-secondary">
            {estimatedValue}
          </Badge>
        ) : null}
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-2">
        <span
          className={cn(
            "text-xs font-semibold",
            isUsed
              ? "text-emerald-800 dark:text-emerald-200"
              : "text-muted-foreground",
          )}
        >
          {isUsed ? "Used" : "Unused"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={isPending}
          onClick={isUsed ? onMarkUnused : onMarkUsed}
        >
          {isUsed ? (
            <>
              <RotateCcw className="mr-1 h-3.5 w-3.5" />
              Mark Unused
            </>
          ) : (
            <>
              <Circle className="mr-1 h-3.5 w-3.5" />
              Mark Used
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

interface CardRuleDetailsProps {
  card: DetailedCreditCard;
  walletCardId: number;
  usedBenefitIds: Set<number>;
  isPending: boolean;
  onMarkUsed: (walletCardId: number, benefitId: number) => void;
  onMarkUnused: (walletCardId: number, benefitId: number) => void;
}

function CardRuleDetails({
  card,
  walletCardId,
  usedBenefitIds,
  isPending,
  onMarkUsed,
  onMarkUnused,
}: CardRuleDetailsProps) {
  const rewards = [...card.cashbackCategories].sort((a, b) => {
    const rateDelta = b.rate - a.rate;
    if (rateDelta !== 0) return rateDelta;
    if (a.isDefault !== b.isDefault) return a.isDefault ? 1 : -1;
    return a.category.localeCompare(b.category);
  });
  const benefits = [...card.benefits].sort((a, b) => {
    const valueDelta = (b.annualValue ?? 0) - (a.annualValue ?? 0);
    if (valueDelta !== 0) return valueDelta;
    return a.name.localeCompare(b.name);
  });
  const reviewedAt = formatReviewedDate(card.lastReviewedAt);

  return (
    <div className="space-y-4">
      {card.rewardProgram ||
      card.rewardValuationDescription ||
      card.rewardRuleNotes?.length ? (
        <div className="rounded-lg border border-card-border bg-secondary/25 p-3">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Reward Program Notes
          </div>
          {card.rewardProgram ? (
            <div className="text-sm font-semibold text-foreground">
              {card.rewardProgram}
            </div>
          ) : null}
          {card.rewardValuationDescription ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {card.rewardValuationDescription}
            </p>
          ) : null}
          {card.rewardRuleNotes?.length ? (
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
              {card.rewardRuleNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            All Rewards
          </div>
          <Badge variant="secondary" className="rounded-full">
            {rewards.length}
          </Badge>
        </div>
        <div className="grid gap-2 lg:grid-cols-2">
          {rewards.map((category) => (
            <div
              key={category.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-card-border/80 bg-card px-3 py-2 text-sm shadow-[var(--app-shadow-soft)]"
            >
              <div className="min-w-0">
                <div className="font-medium leading-snug text-foreground">
                  {category.category}
                </div>
                {category.isDefault ? (
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    Base earning rate
                  </div>
                ) : null}
              </div>
              <div className="shrink-0 rounded-md bg-secondary px-2 py-1 text-xs font-bold tabular-nums text-muted-foreground">
                {formatEarnRate(card, category.rate)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            All Benefits
          </div>
          <Badge variant="secondary" className="rounded-full">
            {benefits.length}
          </Badge>
        </div>
        <div className="grid gap-2 lg:grid-cols-2">
          {benefits.map((benefit) => (
            <WalletCardBenefitItem
              key={benefit.id}
              benefit={benefit}
              card={card}
              isUsed={usedBenefitIds.has(benefit.id)}
              isPending={isPending}
              onMarkUsed={() => onMarkUsed(walletCardId, benefit.id)}
              onMarkUnused={() => onMarkUnused(walletCardId, benefit.id)}
            />
          ))}
        </div>
      </div>

      {card.signupBonus ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/15">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-900 dark:text-emerald-200">
            Signup Bonus
          </div>
          <div className="text-sm leading-relaxed text-foreground">
            {card.signupBonus}
          </div>
          {card.signupBonusValue ? (
            <div className="mt-1 text-xs font-semibold tabular-nums text-emerald-900 dark:text-emerald-200">
              Est. value {formatCardAmount(card, card.signupBonusValue)}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-card-border bg-secondary/30 px-3 py-2 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{card.market ?? "US"} rules</span>
          {reviewedAt ? <span>Reviewed {reviewedAt}</span> : null}
          {card.dataConfidence ? <span>{card.dataConfidence}</span> : null}
        </div>
        {card.sourceUrl ? (
          <a
            href={card.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 font-semibold text-foreground transition-colors hover:text-primary"
          >
            Official terms
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default function Wallet() {
  const { data: walletCards, isLoading } = useListWallet();
  const { data: summary, isLoading: isLoadingSummary } =
    useGetDashboardSummary();
  const { data: unusedBenefits, isLoading: isLoadingBenefits } =
    useGetUnusedBenefits();
  const { data: usedBenefits, isLoading: isLoadingUsedBenefits } =
    useGetUsedBenefits();
  const { data: transactions, isLoading: isLoadingTransactions } =
    useListTransactions();
  const { data: billingCycles } = useGetBillingCycles();
  const removeFromWallet = useRemoveFromWallet();
  const markBenefitUsed = useMarkBenefitUsed();
  const markBenefitUnused = useMarkBenefitUnused();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDetailCardId, setSelectedDetailCardId] = useState<
    number | null
  >(null);
  const [cashbackPeriod, setCashbackPeriod] = useState<CashbackPeriod>("12m");
  const [showBenefitDetails, setShowBenefitDetails] = useState(false);

  useEffect(() => {
    if (!showBenefitDetails) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (
        target.closest("[data-benefit-popover]") ||
        target.closest("[data-benefit-toggle]")
      ) {
        return;
      }
      setShowBenefitDetails(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [showBenefitDetails]);

  const usedBenefitsCount = usedBenefits?.length ?? 0;
  const usedBenefitValue = (usedBenefits ?? []).reduce(
    (sum, benefit) => sum + (benefit.annualValue ?? 0),
    0,
  );
  const usedBenefitIdsByWalletCard = useMemo(() => {
    const grouped = new Map<number, Set<number>>();

    for (const benefit of usedBenefits ?? []) {
      const benefitIds = grouped.get(benefit.walletCardId) ?? new Set<number>();
      benefitIds.add(benefit.benefitId);
      grouped.set(benefit.walletCardId, benefitIds);
    }

    return grouped;
  }, [usedBenefits]);
  const isBenefitMutationPending =
    markBenefitUsed.isPending || markBenefitUnused.isPending;
  const cashbackValue = useMemo(() => {
    const start = getCashbackPeriodStart(cashbackPeriod);

    return (transactions ?? [])
      .filter(
        (transaction) =>
          (transaction.transactionType ?? "purchase") !== "payment" &&
          new Date(transaction.date) >= start,
      )
      .reduce((sum, transaction) => sum + transaction.cashbackEarned, 0);
  }, [cashbackPeriod, transactions]);
  const rewardPeriodStart = useMemo(
    () => getCashbackPeriodStart(cashbackPeriod),
    [cashbackPeriod],
  );

  const cyclesByCard = new Map(
    (billingCycles ?? []).map((bc) => [bc.walletCardId, bc]),
  );

  const toggleCardDetails = (walletCardId: number) => {
    setSelectedDetailCardId((current) =>
      current === walletCardId ? null : walletCardId,
    );
  };

  const handleRemove = (id: number) => {
    removeFromWallet.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListWalletQueryKey() });
          queryClient.invalidateQueries({
            queryKey: getGetDashboardSummaryQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetBillingCyclesQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetSpendingStatsQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getListTransactionsQueryKey(),
          });
          toast({
            title: "Removed from Wallet",
            description: "Card successfully removed.",
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to remove card.",
          });
        },
      },
    );
  };

  const handleMarkBenefitUsed = (walletCardId: number, benefitId: number) => {
    markBenefitUsed.mutate(
      { id: walletCardId, benefitId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetUnusedBenefitsQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetUsedBenefitsQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetDashboardSummaryQueryKey(),
          });
          toast({
            title: "Benefit marked as used",
            description: "You can restore it from the Used view.",
            action: (
              <ToastAction
                altText="Undo benefit usage"
                onClick={() => handleMarkBenefitUnused(walletCardId, benefitId)}
              >
                Undo
              </ToastAction>
            ),
          });
        },
        onError: () =>
          toast({
            variant: "destructive",
            title: "Could not update benefit",
          }),
      },
    );
  };

  const handleMarkBenefitUnused = (walletCardId: number, benefitId: number) => {
    markBenefitUnused.mutate(
      { id: walletCardId, benefitId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetUnusedBenefitsQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetUsedBenefitsQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetDashboardSummaryQueryKey(),
          });
          toast({ title: "Benefit restored to unused" });
        },
        onError: () =>
          toast({
            variant: "destructive",
            title: "Could not update benefit",
          }),
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-72 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!walletCards || walletCards.length === 0) {
    return (
      <div className="flex min-h-[60vh] w-full max-w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-card px-6 py-12">
        <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center mb-6 text-foreground">
          <WalletIcon className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Your wallet is empty
        </h2>
        <p className="mb-8 max-w-[18rem] text-center leading-relaxed text-muted-foreground sm:max-w-sm">
          Add credit cards to your wallet to start tracking your cashback,
          unused benefits, and optimal spending categories.
        </p>
        <Link
          href="/cards"
          className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Browse Card Library
        </Link>
      </div>
    );
  }

  const selectedDetailCard =
    walletCards.find((walletCard) => walletCard.id === selectedDetailCardId) ??
    null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">
            My Wallet
          </h2>
        </div>
        <Link
          href="/cards"
          className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg border border-input bg-card px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Add New Card
        </Link>
      </div>

      <WalletSummaryStrip
        isLoading={isLoadingSummary}
        isBenefitsLoading={isLoadingUsedBenefits}
        isCashbackLoading={isLoadingTransactions}
        cashbackPeriod={cashbackPeriod}
        cashbackValue={cashbackValue}
        isBenefitDetailsOpen={showBenefitDetails}
        onCashbackPeriodChange={setCashbackPeriod}
        onBenefitDetailsToggle={() => setShowBenefitDetails((open) => !open)}
        benefitDetailsPanel={
          showBenefitDetails ? (
            <WalletBenefitsPanel
              unusedBenefits={unusedBenefits}
              usedBenefits={usedBenefits}
              isLoading={isLoadingBenefits || isLoadingUsedBenefits}
              isPending={isBenefitMutationPending}
              onMarkUsed={handleMarkBenefitUsed}
              onMarkUnused={handleMarkBenefitUnused}
            />
          ) : null
        }
        summary={summary}
        totalCards={walletCards.length}
        usedBenefitsCount={usedBenefitsCount}
        usedBenefitValue={usedBenefitValue}
      />

      <div className="grid gap-4 transition-all md:grid-cols-2 xl:grid-cols-3">
        {walletCards.map((walletCard) => {
          const cycle = cyclesByCard.get(walletCard.id);
          const isSelected = selectedDetailCardId === walletCard.id;
          const detailedCard = walletCard.card as DetailedCreditCard;
          const usedBenefitIds =
            usedBenefitIdsByWalletCard.get(walletCard.id) ?? new Set<number>();
          const usedBenefitValueForCard = detailedCard.benefits.reduce(
            (sum, benefit) =>
              usedBenefitIds.has(benefit.id)
                ? sum + (benefit.annualValue ?? 0)
                : sum,
            0,
          );
          const cardTransactions = (transactions ?? []).filter((transaction) =>
            matchesWalletCardId(transaction, walletCard.id),
          );
          const purchasesTotal = cardTransactions
            .filter(
              (transaction) =>
                (transaction.transactionType ?? "purchase") !== "payment",
            )
            .reduce((sum, transaction) => sum + transaction.amount, 0);
          const paymentsTotal = cardTransactions
            .filter(
              (transaction) =>
                (transaction.transactionType ?? "purchase") === "payment",
            )
            .reduce((sum, transaction) => sum + transaction.amount, 0);
          const currentOutstanding = Math.max(
            0,
            purchasesTotal - paymentsTotal,
          );
          const currentCycleBalance = cycle
            ? Math.max(
                0,
                cardTransactions
                  .filter(
                    (transaction) =>
                      isTransactionOnOrAfter(
                        transaction.date,
                        new Date(cycle.currentCycleStart),
                      ) &&
                      isTransactionOnOrBefore(transaction.date, new Date()) &&
                      (transaction.transactionType ?? "purchase") !== "payment",
                  )
                  .reduce((sum, transaction) => sum + transaction.amount, 0) -
                  cardTransactions
                    .filter(
                      (transaction) =>
                        isTransactionOnOrAfter(
                          transaction.date,
                          new Date(cycle.currentCycleStart),
                        ) &&
                        isTransactionOnOrBefore(transaction.date, new Date()) &&
                        (transaction.transactionType ?? "purchase") ===
                          "payment",
                    )
                    .reduce((sum, transaction) => sum + transaction.amount, 0),
              )
            : 0;
          const availableCredit =
            walletCard.creditLimit != null
              ? Math.max(0, walletCard.creditLimit - currentOutstanding)
              : null;
          const fallbackDueDate = walletCard.paymentDueDay
            ? nextDayOfMonth(walletCard.paymentDueDay)
            : null;
          const fallbackDaysUntilDue = fallbackDueDate
            ? daysUntil(fallbackDueDate)
            : null;
          const hasDueDay = walletCard.paymentDueDay != null;
          const hasCreditLimit = walletCard.creditLimit != null;
          const hasVisibleBillingInfo = hasDueDay || hasCreditLimit;
          const cardPeriodRewardValue = (transactions ?? [])
            .filter(
              (transaction) =>
                matchesWalletCardId(transaction, walletCard.id) &&
                (transaction.transactionType ?? "purchase") !== "payment" &&
                new Date(transaction.date) >= rewardPeriodStart,
            )
            .reduce((sum, transaction) => sum + transaction.cashbackEarned, 0);
          const topBenefits = [...detailedCard.benefits]
            .sort((a, b) => {
              const aIsUnused = !usedBenefitIds.has(a.id);
              const bIsUnused = !usedBenefitIds.has(b.id);
              if (aIsUnused !== bIsUnused) return aIsUnused ? -1 : 1;
              const valueDelta = (b.annualValue ?? 0) - (a.annualValue ?? 0);
              if (valueDelta !== 0) return valueDelta;
              return a.name.localeCompare(b.name);
            })
            .slice(0, 2);
          const effectiveCurrentBalance =
            cycle && cycle.statementBalance <= 0
              ? Math.max(cycle.totalBalance ?? 0, currentCycleBalance)
              : (cycle?.totalBalance ?? currentOutstanding);
          const effectiveAvailableCredit =
            walletCard.creditLimit != null
              ? Math.max(0, walletCard.creditLimit - effectiveCurrentBalance)
              : (cycle?.availableCredit ?? availableCredit);
          const hasStatementDue = Boolean(cycle && cycle.statementBalance > 0);
          const hasDueAmount = Boolean(
            cycle && (hasStatementDue || effectiveCurrentBalance > 0),
          );
          const isOverdue = Boolean(
            cycle && cycle.daysUntilDue < 0 && hasStatementDue,
          );
          const visibleDaysUntilDue = cycle
            ? cycle.daysUntilDue
            : fallbackDaysUntilDue;
          const isDueSoon = Boolean(
            (!cycle || hasDueAmount) &&
            visibleDaysUntilDue !== null &&
            visibleDaysUntilDue >= 0 &&
            visibleDaysUntilDue <= 5,
          );
          const dueCountdownLabel = cycle
            ? isOverdue
              ? `Overdue by ${Math.abs(cycle.daysUntilDue)} day${
                  Math.abs(cycle.daysUntilDue) === 1 ? "" : "s"
                }`
              : `Due in ${cycle.daysUntilDue} day${
                  cycle.daysUntilDue === 1 ? "" : "s"
                }`
            : hasDueDay && fallbackDueDate
              ? `Due in ${fallbackDaysUntilDue} day${
                  fallbackDaysUntilDue === 1 ? "" : "s"
                }`
              : null;
          const billingDateLabel = cycle
            ? format(new Date(cycle.nextDueDate), "MMM d")
            : hasDueDay && fallbackDueDate
              ? format(fallbackDueDate, "MMM d")
              : null;
          const showDueInfo =
            hasDueDay && (dueCountdownLabel || billingDateLabel);
          const billingPrimaryMetric = cycle
            ? {
                label: "Due Amount",
                value: formatCardAmount(
                  detailedCard,
                  hasStatementDue
                    ? cycle.statementBalance
                    : effectiveCurrentBalance,
                ),
              }
            : !showDueInfo &&
                hasCreditLimit &&
                effectiveAvailableCredit !== null
              ? {
                  label: "Available",
                  value: formatCardAmount(
                    detailedCard,
                    effectiveAvailableCredit,
                  ),
                }
              : null;
          const billingSubItems = [
            (showDueInfo || cycle) && billingDateLabel
              ? billingDateLabel
              : null,
            (showDueInfo || cycle) &&
            hasCreditLimit &&
            effectiveAvailableCredit !== null
              ? `Avail. ${formatCompactCardAmount(detailedCard, effectiveAvailableCredit)}`
              : null,
            !hasVisibleBillingInfo ? "Tap to edit" : null,
          ].filter(Boolean) as string[];
          const billingStatusLabel = showDueInfo
            ? (dueCountdownLabel ?? "Payment due")
            : hasCreditLimit
              ? "Available credit"
              : "Add billing details";
          const billingBannerClass = isOverdue
            ? "border-rose-200 bg-rose-50/80 dark:border-rose-800 dark:bg-rose-950/25"
            : isDueSoon
              ? "border-amber-200 bg-amber-50/80 dark:border-amber-800 dark:bg-amber-950/25"
              : "border-card-border bg-secondary/20";
          const billingStatusClass = isOverdue
            ? "text-rose-800 dark:text-rose-200"
            : isDueSoon
              ? "text-amber-800 dark:text-amber-200"
              : "text-foreground";
          const billingAmountClass = isOverdue
            ? "text-rose-900 dark:text-rose-200"
            : isDueSoon
              ? "text-amber-900 dark:text-amber-200"
              : "text-foreground";
          const billingIconClass = isOverdue
            ? "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200"
            : isDueSoon
              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
              : "bg-card/80 text-muted-foreground";

          return (
            <Card
              key={walletCard.id}
              className={cn(
                "relative flex flex-col overflow-hidden shadow-[var(--app-shadow-soft)] transition-colors duration-200 hover:border-primary/30",
                isSelected ? "border-primary/45 ring-1 ring-primary/25" : "",
              )}
            >
              <CardArt
                cardImageUrl={walletCard.card.cardImageUrl}
                color={walletCard.card.color}
                alt={walletCard.card.name}
                className="h-40"
                issuer={walletCard.card.issuer}
                logoUrl={walletCard.card.logoUrl}
                network={walletCard.card.network}
                fallback={
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                    <div className="relative z-10 flex justify-between items-start">
                      <IssuerBrandChip
                        logoUrl={walletCard.card.logoUrl}
                        issuer={walletCard.card.issuer}
                      />
                      <NetworkBadge network={walletCard.card.network} />
                    </div>
                    <div className="relative z-10 text-white drop-shadow">
                      <div className="text-xs font-medium opacity-75 tracking-wide uppercase mb-0.5">
                        {walletCard.card.issuer}
                      </div>
                      <div className="font-bold text-lg leading-tight">
                        {walletCard.card.name}
                      </div>
                    </div>
                  </div>
                }
              />

              <div className="flex h-[88px] items-center border-y bg-card px-5 py-4">
                <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                  <div className="min-w-0 self-center">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {walletCard.card.issuer}
                    </div>
                    <div className="mt-1 flex min-w-0 items-start gap-2 text-base font-bold leading-snug text-foreground">
                      <span className="line-clamp-2">
                        {walletCard.nickname || walletCard.card.name}
                      </span>
                      {walletCard.nickname && (
                        <span className="mt-0.5 max-w-[10rem] truncate text-xs font-normal text-muted-foreground">
                          ({walletCard.card.name})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-[5.75rem] shrink-0 text-right">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Earned
                    </div>
                    <div className="mt-1 text-lg font-extrabold leading-none tabular-nums text-emerald-900 dark:text-emerald-200">
                      {formatCardAmount(
                        detailedCard,
                        walletCard.totalCashbackEarned,
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <BillingSettingsDialog
                walletCardId={walletCard.id}
                cardName={walletCard.card.name}
                initial={{
                  nickname: walletCard.nickname,
                  statementClosingDay: walletCard.statementClosingDay,
                  paymentDueDay: walletCard.paymentDueDay,
                  creditLimit: walletCard.creditLimit,
                  openedAt: walletCard.openedAt,
                }}
                trigger={
                  <button
                    type="button"
                    className={cn(
                      "min-h-[78px] w-full border-b px-5 py-2.5 text-left transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      billingBannerClass,
                    )}
                  >
                    <div className="flex min-h-[58px] items-center gap-3">
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-[var(--app-shadow-soft)]",
                          billingIconClass,
                        )}
                      >
                        {isOverdue ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : hasCreditLimit && !showDueInfo ? (
                          <CreditCard className="h-4 w-4" />
                        ) : (
                          <CalendarClock className="h-4 w-4" />
                        )}
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <div
                          className={cn(
                            "truncate text-base font-extrabold leading-tight",
                            billingStatusClass,
                          )}
                        >
                          {billingStatusLabel}
                        </div>
                        {billingSubItems.length > 0 ? (
                          <div className="mt-1.5 flex min-w-0 items-center gap-1.5 overflow-hidden">
                            {billingSubItems.map((item, index) => (
                              <span
                                key={`${item}-${index}`}
                                className={cn(
                                  "inline-flex h-5 min-w-0 max-w-full shrink items-center rounded-md bg-card/70 px-2 text-[11px] font-semibold leading-none tabular-nums text-muted-foreground shadow-[var(--app-shadow-soft)]",
                                  index > 0 &&
                                    "bg-transparent px-0 shadow-none",
                                )}
                              >
                                <span className="truncate">{item}</span>
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      {billingPrimaryMetric ? (
                        <div className="flex w-[8.25rem] shrink-0 flex-col justify-center text-right">
                          <div className="truncate text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {billingPrimaryMetric.label}
                          </div>
                          <div
                            className={cn(
                              "mt-1 truncate text-xl font-extrabold leading-none tabular-nums",
                              billingAmountClass,
                            )}
                          >
                            {billingPrimaryMetric.value}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </button>
                }
              />

              <CardContent className="flex-1 px-5 py-4">
                {walletCard.card.annualFee > 0 ? (
                  <div className="h-[116px] transition-all">
                    {(() => {
                      const fee = walletCard.card.annualFee;
                      const cashbackEarned =
                        walletCard.currentYearCashback ?? 0;
                      const recoveredValue =
                        cashbackEarned + usedBenefitValueForCard;
                      const net = recoveredValue - fee;
                      const recouped = Math.min(recoveredValue, fee);
                      const pct = Math.min(100, (recoveredValue / fee) * 100);
                      const broken = net >= 0;
                      const annualFeeTone = getAnnualFeeTone(pct, broken);

                      const anchorIso =
                        walletCard.openedAt ?? walletCard.addedAt;
                      const anchor = new Date(anchorIso);
                      const now = new Date();
                      const today = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate(),
                      );
                      const anchorMonth = anchor.getMonth();
                      const anchorDay = anchor.getDate();
                      const clampDay = (y: number, m: number, d: number) =>
                        Math.min(d, new Date(y, m + 1, 0).getDate());
                      let nextYear = today.getFullYear();
                      let next = new Date(
                        nextYear,
                        anchorMonth,
                        clampDay(nextYear, anchorMonth, anchorDay),
                      );
                      if (next < today) {
                        nextYear += 1;
                        next = new Date(
                          nextYear,
                          anchorMonth,
                          clampDay(nextYear, anchorMonth, anchorDay),
                        );
                      }
                      const daysUntil = Math.round(
                        (next.getTime() - today.getTime()) / 86400000,
                      );
                      const hasOpenedDate = !!walletCard.openedAt;

                      return (
                        <div
                          className={`h-full rounded-md border px-3 py-2.5 ${annualFeeTone.panel}`}
                        >
                          <div className="mb-1.5 flex items-center justify-between gap-2">
                            <div className="min-w-0 truncate text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              {broken
                                ? "Net of annual fee"
                                : "Annual fee progress"}
                            </div>
                            <div
                              className={`shrink-0 text-right text-xs font-bold tabular-nums ${annualFeeTone.text}`}
                            >
                              {broken
                                ? `+${formatCardAmount(walletCard.card, net)}`
                                : `${formatCardAmount(walletCard.card, fee - recoveredValue)} left`}
                            </div>
                          </div>
                          <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className="absolute inset-0 transition-all"
                              style={{
                                background: annualFeeTone.fill,
                                clipPath: `inset(0 ${100 - pct}% 0 0)`,
                              }}
                            />
                          </div>
                          <div className="mt-1 flex justify-between text-xs text-muted-foreground tabular-nums">
                            <span>
                              {formatCardAmount(walletCard.card, recouped)}{" "}
                              covered of{" "}
                              {formatCardAmount(walletCard.card, fee)}
                            </span>
                            <span>{pct.toFixed(0)}%</span>
                          </div>
                          <div className="mt-0.5 truncate text-xs text-muted-foreground tabular-nums">
                            Includes{" "}
                            {formatCardAmount(walletCard.card, cashbackEarned)}{" "}
                            Cashback
                            {usedBenefitValueForCard > 0
                              ? ` + ${formatCardAmount(walletCard.card, usedBenefitValueForCard)} Used Benefits`
                              : ""}
                          </div>
                          <BillingSettingsDialog
                            walletCardId={walletCard.id}
                            cardName={walletCard.card.name}
                            initial={{
                              nickname: walletCard.nickname,
                              statementClosingDay:
                                walletCard.statementClosingDay,
                              paymentDueDay: walletCard.paymentDueDay,
                              creditLimit: walletCard.creditLimit,
                              openedAt: walletCard.openedAt,
                            }}
                            trigger={
                              <button
                                type="button"
                                className="mt-1.5 flex h-6 w-full items-center gap-1.5 border-t border-border/50 pt-1.5 text-left text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <CalendarClock className="h-3.5 w-3.5 shrink-0" />
                                {hasOpenedDate ? (
                                  <span className="min-w-0 truncate">
                                    Next {formatAnnualFee(walletCard.card)} fee
                                    in{" "}
                                    <span className="font-semibold text-foreground tabular-nums">
                                      {daysUntil} day
                                      {daysUntil === 1 ? "" : "s"}
                                    </span>
                                  </span>
                                ) : (
                                  <span className="min-w-0 truncate">
                                    Add account-opened date
                                  </span>
                                )}
                              </button>
                            }
                          />
                        </div>
                      );
                    })()}
                  </div>
                ) : null}

                <div
                  className={cn(
                    "min-h-[132px]",
                    walletCard.card.annualFee > 0 ? "mt-3" : "",
                  )}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <TrendingUp className="w-4 h-4 text-foreground" />
                      Top Rewards
                    </div>
                    <div className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold tabular-nums text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                      {formatCompactRewardTotal(
                        detailedCard,
                        cardPeriodRewardValue,
                      )}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {[...walletCard.card.cashbackCategories]
                      .sort((a, b) => b.rate - a.rate)
                      .slice(0, 3)
                      .map((cat) => (
                        <div
                          key={cat.id}
                          className="flex h-8 items-center justify-between gap-3 rounded-lg border border-card-border bg-card px-3 text-sm shadow-[var(--app-shadow-soft)]"
                        >
                          <span className="min-w-0 truncate font-medium text-foreground">
                            {formatCompactRewardCategory(cat.category)}
                          </span>
                          <span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-xs font-bold tabular-nums text-muted-foreground">
                            {formatCompactEarnRate(detailedCard, cat.rate)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {walletCard.card.annualFee <= 0 && topBenefits.length > 0 ? (
                  <div className="mt-5 min-h-[118px]">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Gift className="h-4 w-4 text-foreground" />
                        Key Benefits
                      </div>
                      <div className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold tabular-nums text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                        Used{" "}
                        {formatCardAmount(
                          detailedCard,
                          usedBenefitValueForCard,
                        )}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {topBenefits.map((benefit) => (
                        <WalletCardBenefitItem
                          key={benefit.id}
                          benefit={benefit}
                          card={detailedCard}
                          compact
                          isUsed={usedBenefitIds.has(benefit.id)}
                          isPending={isBenefitMutationPending}
                          onMarkUsed={() =>
                            handleMarkBenefitUsed(walletCard.id, benefit.id)
                          }
                          onMarkUnused={() =>
                            handleMarkBenefitUnused(walletCard.id, benefit.id)
                          }
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardContent>

              <CardFooter className="flex flex-wrap justify-between gap-2 border-t bg-muted/30 px-4 py-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-7 gap-1.5 px-2 text-xs font-semibold",
                      isSelected
                        ? "bg-primary/10 text-primary hover:text-primary"
                        : "text-foreground",
                    )}
                    aria-expanded={isSelected}
                    onClick={() => toggleCardDetails(walletCard.id)}
                  >
                    <PanelRightOpen className="h-4 w-4" />
                    {isSelected ? "Close" : "Details"}
                  </Button>
                  <Link
                    href="/activity"
                    className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-semibold text-foreground hover:bg-secondary hover:no-underline"
                  >
                    <ReceiptText className="h-3.5 w-3.5" />
                    Activity
                  </Link>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Remove {walletCard.card.name}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove the card from your wallet. Your
                        transactions and cashback history for this card will be
                        permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRemove(walletCard.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Remove Card
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Sheet
        open={selectedDetailCard !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedDetailCardId(null);
        }}
      >
        <SheetContent
          side="right"
          className="w-full overflow-y-auto bg-background p-0 sm:max-w-none md:w-[min(56rem,54vw)]"
        >
          {selectedDetailCard
            ? (() => {
                const detailedCard =
                  selectedDetailCard.card as DetailedCreditCard;
                const usedBenefitIds =
                  usedBenefitIdsByWalletCard.get(selectedDetailCard.id) ??
                  new Set<number>();
                const reviewedAt = formatReviewedDate(
                  detailedCard.lastReviewedAt,
                );
                const selectedPeriod =
                  CASHBACK_PERIODS.find(
                    (period) => period.id === cashbackPeriod,
                  ) ?? CASHBACK_PERIODS[3];
                const selectedCardPeriodRewardValue = (transactions ?? [])
                  .filter(
                    (transaction) =>
                      matchesWalletCardId(transaction, selectedDetailCard.id) &&
                      (transaction.transactionType ?? "purchase") !==
                        "payment" &&
                      new Date(transaction.date) >= rewardPeriodStart,
                  )
                  .reduce(
                    (sum, transaction) => sum + transaction.cashbackEarned,
                    0,
                  );
                const selectedUsedBenefitValue = detailedCard.benefits.reduce(
                  (sum, benefit) =>
                    usedBenefitIds.has(benefit.id)
                      ? sum + (benefit.annualValue ?? 0)
                      : sum,
                  0,
                );

                return (
                  <div className="min-h-full">
                    <div className="border-b border-card-border bg-card/95 p-5">
                      <SheetHeader className="pr-8">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          <span>{detailedCard.issuer}</span>
                          <span>{detailedCard.network}</span>
                          {detailedCard.market ? (
                            <span>{detailedCard.market}</span>
                          ) : null}
                        </div>
                        <SheetTitle className="text-2xl tracking-tight">
                          {selectedDetailCard.nickname || detailedCard.name}
                        </SheetTitle>
                        {selectedDetailCard.nickname ? (
                          <SheetDescription>
                            {detailedCard.name}
                          </SheetDescription>
                        ) : null}
                      </SheetHeader>
                      <div className="mt-5 grid gap-4 lg:grid-cols-[18rem_1fr]">
                        <CardArt
                          cardImageUrl={detailedCard.cardImageUrl}
                          color={detailedCard.color}
                          alt={detailedCard.name}
                          className="h-44"
                          issuer={detailedCard.issuer}
                          logoUrl={detailedCard.logoUrl}
                          network={detailedCard.network}
                          fallback={
                            <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                              <div className="relative z-10 flex items-start justify-between">
                                <IssuerBrandChip
                                  logoUrl={detailedCard.logoUrl}
                                  issuer={detailedCard.issuer}
                                />
                                <NetworkBadge network={detailedCard.network} />
                              </div>
                              <div className="relative z-10 drop-shadow">
                                <div className="text-xs font-medium uppercase tracking-wide opacity-75">
                                  {detailedCard.issuer}
                                </div>
                                <div className="text-lg font-bold leading-tight">
                                  {detailedCard.name}
                                </div>
                              </div>
                            </div>
                          }
                        />
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-lg border border-card-border bg-secondary/25 p-3">
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Annual Fee
                            </div>
                            <div className="mt-1 text-lg font-bold tabular-nums text-foreground">
                              {formatAnnualFee(detailedCard)}
                            </div>
                          </div>
                          <div className="rounded-lg border border-card-border bg-secondary/25 p-3">
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Rewards Earned
                            </div>
                            <div className="mt-1 text-lg font-bold text-emerald-900 dark:text-emerald-200">
                              {formatCardRewardTotal(
                                detailedCard,
                                selectedCardPeriodRewardValue,
                              )}
                            </div>
                            <div className="mt-1 text-xs font-medium text-muted-foreground">
                              {selectedPeriod.helper}
                            </div>
                          </div>
                          <div className="rounded-lg border border-card-border bg-secondary/25 p-3">
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Used Benefit Value
                            </div>
                            <div className="mt-1 text-lg font-bold text-emerald-900 dark:text-emerald-200">
                              {formatCardAmount(
                                detailedCard,
                                selectedUsedBenefitValue,
                              )}
                            </div>
                            <div className="mt-1 text-xs font-medium text-muted-foreground">
                              Annual estimate
                            </div>
                          </div>
                          <div className="rounded-lg border border-card-border bg-secondary/25 p-3">
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Source
                            </div>
                            <div className="mt-1 text-sm font-semibold text-foreground">
                              {reviewedAt
                                ? `Reviewed ${reviewedAt}`
                                : "Official terms"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <CardRuleDetails
                        card={detailedCard}
                        walletCardId={selectedDetailCard.id}
                        usedBenefitIds={usedBenefitIds}
                        isPending={isBenefitMutationPending}
                        onMarkUsed={handleMarkBenefitUsed}
                        onMarkUnused={handleMarkBenefitUnused}
                      />
                    </div>
                  </div>
                );
              })()
            : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
