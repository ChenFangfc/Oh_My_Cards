import {
  type RefObject,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import {
  TRANSACTION_CATEGORIES,
  planQuickEntry,
  refreshLocalCaches,
  useCreateTransaction,
  useDeleteTransaction,
  useGetBillingCycles,
  useGetSpendingStats,
  useGetUnusedBenefits,
  useListWallet,
  useMarkBenefitUsed,
  type BillingCycle,
  type QuickEntryOption,
  type Transaction,
  type WalletCard,
} from "@workspace/api-client-react";
import {
  AlertCircle,
  BadgeDollarSign,
  CalendarClock,
  Check,
  CornerDownLeft,
  Gift,
  Plus,
  Undo2,
} from "lucide-react";
import { AppIcon } from "@/components/app-icon";
import {
  buildUpcomingItems,
  relativeDay,
  startOfToday,
  type UpcomingItem,
} from "@/components/upcoming-panel";
import { formatCardAmount, getCardCurrency } from "@/lib/card-format";
import {
  announceDataChanged,
  hideQuickPanel,
  isDesktopApp,
  onDataChangedElsewhere,
  onDesktopEvent,
  openMainWindow,
  setMenuBarStatus,
} from "@/lib/desktop";
import { formatCompactEarnRate } from "@/lib/reward-display";
import { cn } from "@/lib/utils";
import { formatMonthName, syncLocale, t, tn } from "@/lib/i18n";

/** How many wallet cards the quick log offers for one purchase. */
const MAX_OPTIONS = 4;
/** How many "Coming up" items fit under the log without scrolling. */
const MAX_UPCOMING = 3;
/** A payment this close (or overdue) puts a count beside the menu bar icon. */
const BADGE_DAYS = 3;

const panelQueryClient: QueryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.readOnly) return;
      void panelQueryClient.invalidateQueries({ queryKey: ["local"] });
      // The main window is a separate webview with its own caches.
      announceDataChanged();
    },
  }),
});

function money(currency: string, amount: number): string {
  return formatCardAmount({ annualFee: 0, currency }, amount);
}

function dominantCurrency(walletCards: WalletCard[] | undefined): string {
  const counts = new Map<string, number>();
  for (const walletCard of walletCards ?? []) {
    const currency = getCardCurrency(walletCard.card);
    counts.set(currency, (counts.get(currency) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "USD";
}

/** Matches the panel's system material (light/dark) to the app's theme. */
function useWindowAppearance() {
  const { theme } = useTheme();

  useEffect(() => {
    if (!isDesktopApp()) return;
    const appearance = theme === "light" || theme === "dark" ? theme : null;
    void getCurrentWebviewWindow()
      .setTheme(appearance)
      .catch(() => {
        // Cosmetic only.
      });
  }, [theme]);
}

/**
 * A small count beside the menu bar icon while a payment is overdue or due
 * within a few days. Nothing else earns a badge: monthly credits lapse every
 * month, and a number that is always there stops meaning anything.
 */
function useMenuBarBadge(
  billingCycles: BillingCycle[] | undefined,
  walletCards: WalletCard[] | undefined,
) {
  useEffect(() => {
    if (!isDesktopApp() || !billingCycles || !walletCards) return;
    const names = new Map(
      walletCards.map((walletCard) => [
        walletCard.id,
        walletCard.nickname || walletCard.card.name,
      ]),
    );
    const urgent = billingCycles.filter(
      (cycle) =>
        cycle.isOverdue ||
        (cycle.daysUntilDue <= BADGE_DAYS && cycle.statementBalance > 0.005),
    );
    const [first] = urgent;
    const card = first ? (names.get(first.walletCardId) ?? t("Card")) : "";
    const tooltip = !first
      ? "Oh My Cards"
      : urgent.length > 1
        ? t("Oh My Cards — {count} payments due soon", { count: urgent.length })
        : first.isOverdue
          ? t("Oh My Cards — {card} payment is overdue", { card })
          : first.daysUntilDue <= 0
            ? t("Oh My Cards — {card} payment is due today", { card })
            : tn(
                first.daysUntilDue,
                "Oh My Cards — {card} payment is due in {count} day",
                "Oh My Cards — {card} payment is due in {count} days",
                { card },
              );
    void setMenuBarStatus(
      urgent.length ? String(urgent.length) : null,
      tooltip,
    ).catch(() => {
      // The icon itself still works without the count.
    });
  }, [billingCycles, walletCards]);
}

type LogStatus =
  | { kind: "logged"; transaction: Transaction; summary: string }
  | { kind: "error"; message: string };

function QuickLog({
  inputRef,
  walletCount,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  walletCount: number;
}) {
  const [text, setText] = useState("");
  const [categoryOverride, setCategoryOverride] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [status, setStatus] = useState<LogStatus | null>(null);
  const createTransaction = useCreateTransaction();
  const deleteTransaction = useDeleteTransaction();
  const deferredText = useDeferredValue(text);

  // Recomputed when the wallet changes too, so a card added in the main
  // window shows up here without retyping.
  const plan = useMemo(
    () =>
      deferredText.trim()
        ? planQuickEntry(deferredText, { category: categoryOverride })
        : null,
    [deferredText, categoryOverride, walletCount],
  );
  const options = plan?.options.slice(0, MAX_OPTIONS) ?? [];
  const selected =
    options.find((option) => option.walletCardId === selectedId) ??
    options[0] ??
    null;
  const canLog = Boolean(
    plan?.amount && selected && !createTransaction.isPending,
  );

  const submit = () => {
    if (!plan?.amount || !selected) return;
    const amountLabel = money(selected.currency, plan.amount);
    createTransaction.mutate(
      {
        data: {
          walletCardId: selected.walletCardId,
          transactionType: "purchase",
          amount: plan.amount,
          category: plan.category,
          description: plan.description,
          merchantName: plan.merchantName,
          date: new Date().toISOString(),
        },
      },
      {
        onSuccess: (transaction) => {
          const earned =
            transaction.cashbackEarned > 0
              ? ` · +${money(selected.currency, transaction.cashbackEarned)}`
              : "";
          setStatus({
            kind: "logged",
            transaction,
            summary:
              (plan.merchantName
                ? t("{amount} at {merchant} on {card}", {
                    amount: amountLabel,
                    merchant: plan.merchantName,
                    card: selected.label,
                  })
                : t("{amount} on {card}", {
                    amount: amountLabel,
                    card: selected.label,
                  })) + earned,
          });
          setText("");
          setCategoryOverride(null);
          setSelectedId(null);
        },
        onError: (error) =>
          setStatus({
            kind: "error",
            message:
              error instanceof Error ? error.message : t("Couldn't log that."),
          }),
      },
    );
  };

  const undo = (transaction: Transaction) => {
    deleteTransaction.mutate(
      { id: transaction.id },
      { onSuccess: () => setStatus(null) },
    );
  };

  const moveSelection = (step: number) => {
    if (!options.length || !selected) return;
    const index = options.findIndex(
      (option) => option.walletCardId === selected.walletCardId,
    );
    const next = options[(index + step + options.length) % options.length];
    setSelectedId(next.walletCardId);
  };

  if (walletCount === 0) {
    return (
      <div className="mx-3 rounded-xl border border-black/10 bg-black/[0.03] p-4 text-sm dark:border-white/10 dark:bg-white/[0.05]">
        <p className="font-medium">{t("Add the cards you carry first")}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {t("Then log a purchase here in one line, and see which card earns the most.")}</p>
        <button
          type="button"
          onClick={() => void openMainWindow("/cards")}
          className="mt-3 inline-flex h-8 items-center rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("Browse Card Library")}</button>
      </div>
    );
  }

  return (
    <section aria-label={t("Log a purchase")} className="px-3">
      <div className="flex h-11 items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3 focus-within:ring-2 focus-within:ring-ring dark:border-white/10 dark:bg-white/[0.07]">
        <Plus
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-muted-foreground"
        />
        <input
          ref={inputRef}
          autoFocus
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setStatus(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              submit();
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              moveSelection(1);
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              moveSelection(-1);
            }
          }}
          aria-label={t("Purchase, e.g. 45 dinner at Nopa")}
          placeholder={t("45 dinner at Nopa…")}
          autoComplete="off"
          spellCheck={false}
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/70"
        />
        <kbd
          aria-hidden="true"
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-black/10 text-muted-foreground dark:border-white/15",
            canLog ? "opacity-100" : "opacity-40",
          )}
        >
          <CornerDownLeft className="h-3.5 w-3.5" />
        </kbd>
      </div>

      {plan ? (
        <>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
            {/* A native select sizes itself to its longest option; the
                visible chip sizes to the chosen one, with the select laid
                invisibly over it to keep the native menu. */}
            <label
              className={cn(
                "relative inline-flex h-7 items-center rounded-md border pl-2 pr-5 font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                plan.categoryDetected
                  ? "border-black/10 bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.08]"
                  : "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200",
              )}
              title={
                plan.categoryDetected
                  ? t("Category")
                  : t("Couldn't tell the category — pick one")
              }
            >
              <span aria-hidden="true">{t(plan.category)}</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground"
              >
                ▾
              </span>
              <select
                aria-label={t("Category")}
                value={plan.category}
                onChange={(event) => setCategoryOverride(event.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0 focus:outline-none"
              >
                {TRANSACTION_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {t(category)}
                  </option>
                ))}
              </select>
            </label>
            <span
              className={cn(
                "inline-flex h-7 items-center rounded-md px-2 font-semibold tabular-nums",
                plan.amount
                  ? "bg-black/[0.04] dark:bg-white/[0.08]"
                  : "bg-amber-500/10 text-amber-900 dark:text-amber-200",
              )}
            >
              {plan.amount && selected
                ? money(selected.currency, plan.amount)
                : t("Add an amount")}
            </span>
            {plan.merchantName ? (
              <span className="inline-flex h-7 max-w-[11rem] items-center truncate rounded-md bg-black/[0.04] px-2 dark:bg-white/[0.08]">
                {plan.merchantName}
              </span>
            ) : null}
          </div>

          <ul
            role="radiogroup"
            aria-label={t("Card to use")}
            className="mt-2 space-y-0.5"
          >
            {options.map((option, index) => (
              <CardOption
                key={option.walletCardId}
                option={option}
                isBest={index === 0}
                isSelected={selected?.walletCardId === option.walletCardId}
                onSelect={() => {
                  setSelectedId(option.walletCardId);
                  inputRef.current?.focus();
                }}
              />
            ))}
          </ul>

          <button
            type="button"
            disabled={!canLog}
            onClick={submit}
            className="mt-2 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[13px] font-semibold text-primary-foreground transition-opacity disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {createTransaction.isPending
              ? t("Logging…")
              : plan.amount && selected
                ? t("Log {amount} on {card}", {
                    amount: money(selected.currency, plan.amount),
                    card: selected.label,
                  })
                : t("Add an amount to log")}
          </button>
        </>
      ) : (
        <p className="mt-2 px-1 text-xs leading-relaxed text-muted-foreground">
          {t("Type what you bought — “$120 Costco gas”, “18 lunch at Tartine”. Enter logs it on the card that earns the most; ↑↓ picks another.")}</p>
      )}

      <div role="status" aria-live="polite" className="min-h-0">
        {status?.kind === "logged" ? (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-2.5 py-2 text-xs text-emerald-900 dark:text-emerald-200">
            <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            <span className="min-w-0 flex-1 truncate">
              {t("Logged {summary}", { summary: status.summary })}
            </span>
            <button
              type="button"
              onClick={() => undo(status.transaction)}
              disabled={deleteTransaction.isPending}
              className="inline-flex shrink-0 items-center gap-1 font-semibold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Undo2 aria-hidden="true" className="h-3 w-3" />
              {t("Undo")}</button>
          </div>
        ) : status?.kind === "error" ? (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-destructive/10 px-2.5 py-2 text-xs text-destructive">
            <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            <span className="min-w-0 flex-1">{status.message}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function CardOption({
  option,
  isBest,
  isSelected,
  onSelect,
}: {
  option: QuickEntryOption;
  isBest: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const rewardCard = {
    annualFee: 0,
    currency: option.currency,
    rewardType: option.rewardType ?? null,
    rewardUnitName: option.rewardUnitName,
  };

  return (
    <li>
      <button
        type="button"
        role="radio"
        aria-checked={isSelected}
        onClick={onSelect}
        className={cn(
          "flex h-9 w-full items-center gap-2 rounded-lg px-2.5 text-left text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isSelected
            ? "bg-black/[0.06] dark:bg-white/[0.10]"
            : "hover:bg-black/[0.03] dark:hover:bg-white/[0.05]",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border",
            isSelected
              ? "border-primary bg-primary"
              : "border-muted-foreground/50",
          )}
        >
          {isSelected ? (
            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
          ) : null}
        </span>
        <span className="min-w-0 flex-1 truncate font-medium">
          {option.label}
        </span>
        {isBest ? (
          <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-600/30 dark:text-emerald-300">
            {t("Best")}</span>
        ) : null}
        <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
          {formatCompactEarnRate(rewardCard, option.rewardRate)}
        </span>
        <span className="w-16 shrink-0 text-right text-xs font-semibold tabular-nums">
          {option.cashbackEarned != null
            ? `+${money(option.currency, option.cashbackEarned)}`
            : ""}
        </span>
      </button>
    </li>
  );
}

const UPCOMING_ICONS = {
  payment: CalendarClock,
  fee: BadgeDollarSign,
  credit: Gift,
} as const;

function UpcomingList({ items }: { items: UpcomingItem[] }) {
  const markUsed = useMarkBenefitUsed();
  const today = startOfToday();

  return (
    <section aria-label={t("Coming up")} className="px-3">
      <h2 className="px-1 text-[11px] font-semibold text-muted-foreground">
        {t("Coming up")}</h2>
      {items.length === 0 ? (
        <p className="px-1 py-2 text-xs text-muted-foreground">
          {t("Nothing due this week. Enjoy it.")}</p>
      ) : (
        <ul className="mt-1 space-y-0.5">
          {items.map((item) => {
            const Icon = item.overdue ? AlertCircle : UPCOMING_ICONS[item.kind];
            const benefitId = item.benefitId;
            return (
              <li
                key={item.key}
                className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5"
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                    item.overdue
                      ? "bg-rose-500/15 text-rose-800 dark:text-rose-200"
                      : item.kind === "credit"
                        ? "bg-emerald-500/12 text-emerald-800 dark:text-emerald-200"
                        : "bg-black/[0.05] text-foreground dark:bg-white/[0.08]",
                  )}
                >
                  <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium">
                    {item.title}
                  </span>
                  <span className="block truncate text-[11px] tabular-nums text-muted-foreground">
                    {item.detail}
                  </span>
                </span>
                {item.kind === "credit" && benefitId != null ? (
                  <button
                    type="button"
                    disabled={markUsed.isPending}
                    onClick={() =>
                      markUsed.mutate({ id: item.walletCardId, benefitId })
                    }
                    className="shrink-0 rounded-md border border-black/10 px-2 py-1 text-[11px] font-semibold hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-white/15 dark:hover:bg-white/[0.06]"
                    aria-label={t("Mark {benefit} used", { benefit: item.title })}
                  >
                    {t("Used")}</button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void openMainWindow("/wallet")}
                    className={cn(
                      "shrink-0 rounded-md px-1.5 py-1 text-[11px] font-semibold tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      item.overdue
                        ? "text-rose-800 dark:text-rose-200"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-label={t("{item}: open in Oh My Cards", { item: item.title })}
                  >
                    {relativeDay(item.date, today, item.overdue)}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function QuickPanel() {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();
  const { data: walletCards } = useListWallet();
  const { data: billingCycles } = useGetBillingCycles();
  const { data: unusedBenefits } = useGetUnusedBenefits();
  const { data: stats } = useGetSpendingStats();

  const refresh = useCallback(() => {
    refreshLocalCaches();
    void queryClient.invalidateQueries({ queryKey: ["local"] });
  }, [queryClient]);

  useEffect(() => {
    const stopShown = onDesktopEvent("quick-panel-shown", () => {
      // The language may have been changed in the main window while hidden;
      // a change re-mounts the panel, which focuses its own input.
      syncLocale();
      refresh();
      // The theme may have been changed in the main window while hidden.
      try {
        const stored = localStorage.getItem("theme");
        if (stored && stored !== theme) setTheme(stored);
      } catch {
        // Keep the current theme.
      }
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    });
    const stopChanged = onDataChangedElsewhere(refresh);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        void hideQuickPanel();
      } else if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "o"
      ) {
        event.preventDefault();
        void openMainWindow();
      }
    };
    window.addEventListener("keydown", handleKey);
    // Due dates and credit periods roll over while the panel sits hidden.
    const hourly = window.setInterval(refresh, 60 * 60 * 1000);
    return () => {
      stopShown();
      stopChanged();
      window.removeEventListener("keydown", handleKey);
      window.clearInterval(hourly);
    };
  }, [refresh, setTheme, theme]);

  useWindowAppearance();
  useMenuBarBadge(billingCycles, walletCards);

  const upcoming = useMemo(
    () =>
      buildUpcomingItems(walletCards, billingCycles, unusedBenefits).slice(
        0,
        MAX_UPCOMING,
      ),
    [billingCycles, unusedBenefits, walletCards],
  );
  const currency = dominantCurrency(walletCards);
  const month = formatMonthName(new Date());

  return (
    <div className="flex h-full flex-col text-foreground">
      <header className="flex items-center gap-2 px-4 pb-1.5 pt-3">
        <AppIcon className="h-5 w-5 rounded-[5px]" />
        <span className="text-[13px] font-semibold">Oh My Cards</span>
        {stats && (walletCards?.length ?? 0) > 0 ? (
          <span className="ml-auto truncate text-[11px] tabular-nums text-muted-foreground">
            {stats.thisMonth.transactionCount === 0 ? (
              t("Nothing logged in {month} yet", { month })
            ) : (
              <>
                {t("{month}: {amount} spent", {
                  month,
                  amount: money(currency, stats.thisMonth.totalSpent),
                })}{" "}
                ·{" "}
                <span className="text-emerald-800 dark:text-emerald-300">
                  +{money(currency, stats.thisMonth.totalCashback)}
                </span>
              </>
            )}
          </span>
        ) : null}
      </header>

      {/* pt-1 gives the input's focus ring room: overflow-y-auto clips
          anything drawn outside this box. */}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pb-3 pt-1">
        {walletCards ? (
          <QuickLog inputRef={inputRef} walletCount={walletCards.length} />
        ) : null}
        {(walletCards?.length ?? 0) > 0 ? (
          <UpcomingList items={upcoming} />
        ) : null}
      </div>

      <footer className="flex items-center justify-between border-t border-black/10 px-3 py-2 dark:border-white/10">
        <button
          type="button"
          onClick={() => void openMainWindow()}
          className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs font-semibold hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-white/[0.06]"
        >
          {t("Open Oh My Cards")}<kbd className="text-[10px] font-medium text-muted-foreground">
            ⌘O
          </kbd>
        </button>
        <span className="text-[11px] text-muted-foreground">{t("esc to close")}</span>
      </footer>
    </div>
  );
}

/**
 * The menu bar panel: a one-line purchase log priced by the same engine as the
 * full app, and the few things due soon. Everything else stays in the main
 * window, one click away.
 */
export default function QuickPanelRoot() {
  return (
    <QueryClientProvider client={panelQueryClient}>
      <QuickPanel />
    </QueryClientProvider>
  );
}
