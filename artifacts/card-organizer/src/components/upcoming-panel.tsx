import { useMemo, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import type {
  BillingCycle,
  UnusedBenefit,
  WalletCard,
} from "@workspace/api-client-react";
import {
  AlertCircle,
  BadgeDollarSign,
  CalendarClock,
  Gift,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatAnnualFee, formatCardAmount } from "@/lib/card-format";
import { cn } from "@/lib/utils";
import { formatMonthDay, t, tn } from "@/lib/i18n";

/** How far ahead each kind of item is worth surfacing. */
const PAYMENT_WINDOW_DAYS = 10;
const ANNUAL_FEE_WINDOW_DAYS = 30;
const CREDIT_WINDOW_DAYS = 10;
const COLLAPSED_COUNT = 4;

export type UpcomingKind = "payment" | "fee" | "credit";

export interface UpcomingItem {
  key: string;
  kind: UpcomingKind;
  walletCardId: number;
  /** For credits: which benefit, so it can be marked used in place. */
  benefitId?: number;
  date: Date;
  title: string;
  detail: string;
  overdue?: boolean;
}

interface UpcomingPanelProps {
  walletCards?: WalletCard[];
  billingCycles?: BillingCycle[];
  unusedBenefits?: UnusedBenefit[];
  onOpenBilling: (walletCardId: number) => void;
  onOpenDetails: (walletCardId: number) => void;
}

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/** Next account anniversary on or after today, from an opened-on calendar day. */
function nextAnniversary(openedAt: string, today: Date): Date | null {
  const [year, month, day] = openedAt.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return null;
  const build = (y: number) =>
    new Date(y, month - 1, Math.min(day, new Date(y, month, 0).getDate()));
  const thisYear = build(today.getFullYear());
  return thisYear >= today ? thisYear : build(today.getFullYear() + 1);
}

export function relativeDay(
  date: Date,
  today: Date,
  overdue?: boolean,
): string {
  const days = differenceInCalendarDays(date, today);
  if (overdue) {
    const late = Math.abs(days);
    return late <= 0 ? t("Overdue") : t("{count}d overdue", { count: late });
  }
  if (days <= 0) return t("Today");
  if (days === 1) return t("Tomorrow");
  return t("In {count} days", { count: days });
}

const KIND_STYLES: Record<
  UpcomingKind,
  { icon: typeof CalendarClock; tone: string }
> = {
  payment: {
    icon: CalendarClock,
    tone: "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  },
  fee: {
    icon: BadgeDollarSign,
    tone: "bg-secondary text-foreground",
  },
  credit: {
    icon: Gift,
    tone: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
  },
};

/**
 * The dated things worth acting on soon, most urgent first. Shared by the
 * wallet's "Coming up" panel and the menu bar panel so both always agree.
 */
export function buildUpcomingItems(
  walletCards: WalletCard[] | undefined,
  billingCycles: BillingCycle[] | undefined,
  unusedBenefits: UnusedBenefit[] | undefined,
): UpcomingItem[] {
  const today = startOfToday();
  const cardsById = new Map((walletCards ?? []).map((card) => [card.id, card]));
  const result: UpcomingItem[] = [];

  for (const cycle of billingCycles ?? []) {
    const walletCard = cardsById.get(cycle.walletCardId);
    if (!walletCard) continue;
    const label = walletCard.nickname || walletCard.card.name;
    const owed =
      cycle.statementBalance > 0
        ? cycle.statementBalance
        : (cycle.totalBalance ?? 0);

    if (cycle.isOverdue && cycle.previousDueDate) {
      result.push({
        key: `payment-${cycle.walletCardId}`,
        kind: "payment",
        walletCardId: cycle.walletCardId,
        date: new Date(cycle.previousDueDate),
        title: t("{card} payment overdue", { card: label }),
        detail: t("{amount} statement balance", {
          amount: formatCardAmount(walletCard.card, cycle.statementBalance),
        }),
        overdue: true,
      });
      continue;
    }
    if (owed <= 0.005 || cycle.daysUntilDue > PAYMENT_WINDOW_DAYS) continue;
    result.push({
      key: `payment-${cycle.walletCardId}`,
      kind: "payment",
      walletCardId: cycle.walletCardId,
      date: new Date(cycle.nextDueDate),
      title: t("{card} payment due", { card: label }),
      detail:
        cycle.statementBalance > 0
          ? t("{amount} statement balance", {
              amount: formatCardAmount(walletCard.card, owed),
            })
          : t("{amount} balance", {
              amount: formatCardAmount(walletCard.card, owed),
            }),
    });
  }

  for (const walletCard of walletCards ?? []) {
    if (walletCard.card.annualFee <= 0 || !walletCard.openedAt) continue;
    const renewal = nextAnniversary(walletCard.openedAt, today);
    if (!renewal) continue;
    if (differenceInCalendarDays(renewal, today) > ANNUAL_FEE_WINDOW_DAYS)
      continue;

    const recovered =
      (walletCard.currentYearCashback ?? 0) +
      (walletCard.currentYearBenefitValue ?? 0);
    const percent = Math.round((recovered / walletCard.card.annualFee) * 100);
    result.push({
      key: `fee-${walletCard.id}`,
      kind: "fee",
      walletCardId: walletCard.id,
      date: renewal,
      title: t("{card} annual fee", {
        card: walletCard.nickname || walletCard.card.name,
      }),
      detail: t("{fee} posts {date} · {percent}% earned back this year", {
        fee: formatAnnualFee(walletCard.card),
        date: formatMonthDay(renewal),
        percent,
      }),
    });
  }

  for (const benefit of unusedBenefits ?? []) {
    if (!benefit.resetsAt) continue;
    const resets = new Date(benefit.resetsAt);
    const days = differenceInCalendarDays(resets, today);
    if (days < 0 || days > CREDIT_WINDOW_DAYS) continue;
    const walletCard = cardsById.get(benefit.walletCardId);
    if (!walletCard) continue;
    const value = benefit.periodValue ?? benefit.annualValue;
    result.push({
      key: `credit-${benefit.walletCardId}-${benefit.benefitId}`,
      kind: "credit",
      walletCardId: benefit.walletCardId,
      benefitId: benefit.benefitId,
      // The last usable day is the day before the reset.
      date: new Date(
        resets.getFullYear(),
        resets.getMonth(),
        resets.getDate() - 1,
      ),
      title: benefit.name,
      detail: [
        benefit.cardName,
        value
          ? t("{amount} unused", {
              amount: formatCardAmount(walletCard.card, value),
            })
          : null,
        t("use by {date}", {
          date: formatMonthDay(
            new Date(resets.getFullYear(), resets.getMonth(), resets.getDate() - 1),
          ),
        }),
      ]
        .filter(Boolean)
        .join(" · "),
    });
  }

  return result.sort(
    (a, b) =>
      Number(Boolean(b.overdue)) - Number(Boolean(a.overdue)) ||
      a.date.getTime() - b.date.getTime(),
  );
}

/**
 * The few dated things worth acting on this week or month: a payment coming
 * due, an annual fee about to post, a credit about to reset unused. Each one
 * was already computed somewhere in the wallet, but scattered across card
 * tiles where a lapsing $25 credit was easy to miss.
 */
export function UpcomingPanel({
  walletCards,
  billingCycles,
  unusedBenefits,
  onOpenBilling,
  onOpenDetails,
}: UpcomingPanelProps) {
  const [expanded, setExpanded] = useState(false);

  const items = useMemo(
    () => buildUpcomingItems(walletCards, billingCycles, unusedBenefits),
    [billingCycles, unusedBenefits, walletCards],
  );

  if (!items.length) return null;

  const today = startOfToday();
  const visible = expanded ? items : items.slice(0, COLLAPSED_COUNT);
  const hidden = items.length - visible.length;

  return (
    <Card className="shadow-[var(--app-shadow-soft)]">
      <CardContent className="p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-foreground">{t("Coming up")}</h3>
          <span className="text-xs tabular-nums text-muted-foreground">
            {tn(items.length, "{count} item", "{count} items")}
          </span>
        </div>
        <ul className="grid grid-cols-1 gap-2 @2xl:grid-cols-2">
          {visible.map((item) => {
            const { icon: Icon, tone } = item.overdue
              ? {
                  icon: AlertCircle,
                  tone: "bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200",
                }
              : KIND_STYLES[item.kind];
            return (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() =>
                    item.kind === "payment"
                      ? onOpenBilling(item.walletCardId)
                      : onOpenDetails(item.walletCardId)
                  }
                  className="flex w-full items-center gap-3 rounded-xl border border-card-border bg-card px-3 py-2.5 text-left transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      tone,
                    )}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {item.title}
                    </span>
                    <span className="block truncate text-xs tabular-nums text-muted-foreground">
                      {item.detail}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold tabular-nums",
                      item.overdue
                        ? "bg-rose-100 text-rose-900 dark:bg-rose-950/60 dark:text-rose-200"
                        : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {relativeDay(item.date, today, item.overdue)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {hidden > 0 || expanded ? (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="mt-3 text-xs font-semibold text-foreground underline-offset-4 hover:underline"
          >
            {expanded ? t("Show fewer") : t("Show {count} more", { count: hidden })}
          </button>
        ) : null}
      </CardContent>
    </Card>
  );
}
