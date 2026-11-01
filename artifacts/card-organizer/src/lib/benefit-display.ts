import { differenceInCalendarDays } from "date-fns";
import { formatFullDate, formatMonthDay, t } from "@/lib/i18n";
import type { CardBenefitPeriod } from "@workspace/api-client-react";
import { formatCardAmount } from "@/lib/card-format";

type CurrencyCard = { annualFee: number; currency?: string | null };

function compactAmount(card: CurrencyCard, amount: number): string {
  return formatCardAmount(card, amount).replace(/\.00$/, "");
}

/**
 * How often an allowance renews, with its per-period value where that is the
 * number people actually think in ("$25/mo", not "$300/yr").
 * Returns null for the default once-a-cardmember-year cadence.
 */
export function formatBenefitCadence(
  card: CurrencyCard,
  period: CardBenefitPeriod | null | undefined,
  periodValue: number | null | undefined,
  periodYears?: number | null,
): string | null {
  const value = periodValue ? compactAmount(card, periodValue) : null;
  switch (period) {
    case "monthly":
      return value ? t("{amount}/mo", { amount: value }) : t("Monthly");
    case "quarterly":
      return value ? t("{amount}/quarter", { amount: value }) : t("Quarterly");
    case "semiannual":
      return value ? t("{amount} each half-year", { amount: value }) : t("Twice a year");
    case "calendar-year":
      return t("Calendar year");
    case "multi-year":
      return t("Every {count} years", { count: periodYears ?? 4 });
    case "one-time":
      return t("One time");
    default:
      return null;
  }
}

/** "Resets Nov 1" / "Resets tomorrow"; null when the allowance never resets. */
export function formatBenefitReset(
  resetsAt: string | null | undefined,
  today = new Date(),
): string | null {
  if (!resetsAt) return null;
  const date = new Date(resetsAt);
  if (Number.isNaN(date.getTime())) return null;

  const days = differenceInCalendarDays(date, today);
  if (days <= 0) return t("Resets today");
  if (days === 1) return t("Resets tomorrow");
  return t("Resets {date}", {
    date: days > 300 ? formatFullDate(date) : formatMonthDay(date),
  });
}

/** Days until an allowance resets, or null when it never does. */
export function daysUntilReset(
  resetsAt: string | null | undefined,
  today = new Date(),
): number | null {
  if (!resetsAt) return null;
  const date = new Date(resetsAt);
  if (Number.isNaN(date.getTime())) return null;
  return differenceInCalendarDays(date, today);
}
