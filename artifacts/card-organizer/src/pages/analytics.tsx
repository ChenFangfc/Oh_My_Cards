import { useMemo, useState } from "react";
import {
  getGetBillingCyclesQueryKey,
  getGetCashbackByCategoryQueryKey,
  getGetDashboardSummaryQueryKey,
  getGetSpendingStatsQueryKey,
  getListTransactionsQueryKey,
  getListWalletQueryKey,
  useCreateTransaction,
  useDeleteTransaction,
  useGetSpendingStats,
  useListTransactions,
  useListWallet,
} from "@workspace/api-client-react";
import type {
  SpendingStatsPeriod,
  Transaction,
  WalletCard,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  BarChart3,
  Building2,
  CalendarDays,
  CreditCard,
  DollarSign,
  Loader2,
  MapPin,
  Plus,
  Receipt,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const PERIOD_LABELS = {
  thisMonth: "This Month",
  thisQuarter: "This Quarter",
  thisYear: "This Year",
  lifetime: "Lifetime",
} as const;

type PeriodKey = keyof typeof PERIOD_LABELS;

const PERIOD_ORDER = Object.keys(PERIOD_LABELS) as PeriodKey[];

const COLORS = [
  "#7DDCD6",
  "#9CCCF2",
  "#F6C85F",
  "#94A3B8",
  "#34D399",
  "#60A5FA",
  "#F59E0B",
  "#64748B",
];

const CATEGORIES = [
  "Groceries",
  "Dining",
  "Travel",
  "Gas",
  "Entertainment",
  "Streaming",
  "Online Groceries",
  "Flights",
  "Hotels",
  "Rental Cars",
  "Other",
];

const transactionSchema = z
  .object({
    transactionType: z.enum(["purchase", "payment"]).default("purchase"),
    walletCardId: z.coerce.number().min(1, "Please select a card"),
    date: z.string().min(1, "Date is required"),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    category: z.string().optional(),
    merchantName: z.string().optional(),
    description: z.string().optional(),
    locationName: z.string().optional(),
    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.transactionType === "purchase" && !data.category) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Category is required",
        path: ["category"],
      });
    }
  });

type TransactionFormValues = z.infer<typeof transactionSchema>;

type TrendPoint = {
  key: string;
  label: string;
  totalSpent: number;
  totalCashback: number;
};

type CategorySpendPoint = {
  category: string;
  totalSpent: number;
  transactionCount: number;
};

interface AnalyticsProps {
  embedded?: boolean;
}

function formatMoney(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n < 100 ? 2 : 0,
  });
}

function formatRate(value: number): string {
  return `${value.toFixed(2)}%`;
}

function toDateInputValue(date = new Date()): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function parseDateInput(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return new Date().toISOString();
  return new Date(year, month - 1, day, 12).toISOString();
}

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getDayKey(date: Date): string {
  return `${getMonthKey(date)}-${String(date.getDate()).padStart(2, "0")}`;
}

function monthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short" });
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

function getPeriodStart(period: PeriodKey, now = new Date()): Date | null {
  if (period === "thisMonth") return new Date(now.getFullYear(), now.getMonth(), 1);
  if (period === "thisQuarter") {
    return new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
  }
  if (period === "thisYear") return new Date(now.getFullYear(), 0, 1);
  return null;
}

function isTransactionInPeriod(transaction: Transaction, period: PeriodKey): boolean {
  const date = new Date(transaction.date);
  const start = getPeriodStart(period);
  return !start || date >= start;
}

function buildTrendData(
  transactions: Transaction[],
  period: PeriodKey,
): TrendPoint[] {
  const now = new Date();
  const points: TrendPoint[] = [];
  const pointMap = new Map<string, TrendPoint>();
  const addPoint = (key: string, label: string) => {
    const point = { key, label, totalSpent: 0, totalCashback: 0 };
    points.push(point);
    pointMap.set(key, point);
  };

  if (period === "thisMonth") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    for (let day = new Date(start); day <= now; day.setDate(day.getDate() + 1)) {
      addPoint(getDayKey(day), String(day.getDate()));
    }
  } else if (period === "thisQuarter") {
    const start = getPeriodStart("thisQuarter", now)!;
    for (
      let weekStart = new Date(start), index = 1;
      weekStart <= now;
      weekStart.setDate(weekStart.getDate() + 7), index += 1
    ) {
      addPoint(`w${index}`, `W${index}`);
    }
  } else {
    const purchaseTransactions = transactions.filter(isPurchaseTransaction);
    const earliest =
      period === "lifetime" && purchaseTransactions.length > 0
        ? purchaseTransactions
            .map((transaction) => new Date(transaction.date))
            .sort((a, b) => a.getTime() - b.getTime())[0]
        : new Date(now.getFullYear(), 0, 1);
    const start = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
    for (
      let month = new Date(start);
      month <= now;
      month.setMonth(month.getMonth() + 1)
    ) {
      addPoint(
        getMonthKey(month),
        period === "lifetime"
          ? month.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
          : monthLabel(month),
      );
    }
  }

  for (const transaction of transactions) {
    if (!isPurchaseTransaction(transaction) || !isTransactionInPeriod(transaction, period)) {
      continue;
    }
    const date = new Date(transaction.date);
    let key: string;
    if (period === "thisMonth") {
      key = getDayKey(date);
    } else if (period === "thisQuarter") {
      const start = getPeriodStart("thisQuarter", now)!;
      const weekIndex = Math.floor((date.getTime() - start.getTime()) / 604_800_000) + 1;
      key = `w${weekIndex}`;
    } else {
      key = getMonthKey(date);
    }

    const point = pointMap.get(key);
    if (!point) continue;
    point.totalSpent = Number((point.totalSpent + transaction.amount).toFixed(2));
    point.totalCashback = Number(
      (point.totalCashback + transaction.cashbackEarned).toFixed(2),
    );
  }

  return points;
}

function buildCategorySpendData(
  transactions: Transaction[],
  period: PeriodKey,
  walletCardId: string,
): CategorySpendPoint[] {
  const categoryMap = new Map<string, CategorySpendPoint>();

  for (const transaction of transactions) {
    if (!isPurchaseTransaction(transaction) || !isTransactionInPeriod(transaction, period)) {
      continue;
    }
    if (walletCardId !== "all" && transaction.walletCardId !== Number(walletCardId)) {
      continue;
    }

    const existing = categoryMap.get(transaction.category) ?? {
      category: transaction.category,
      totalSpent: 0,
      transactionCount: 0,
    };
    existing.totalSpent += transaction.amount;
    existing.transactionCount += 1;
    categoryMap.set(transaction.category, existing);
  }

  return Array.from(categoryMap.values())
    .map((point) => ({
      ...point,
      totalSpent: Number(point.totalSpent.toFixed(2)),
    }))
    .sort((a, b) => b.totalSpent - a.totalSpent);
}

function invalidateActivityData(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: getListTransactionsQueryKey() });
  queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
  queryClient.invalidateQueries({ queryKey: getListWalletQueryKey() });
  queryClient.invalidateQueries({ queryKey: getGetSpendingStatsQueryKey() });
  queryClient.invalidateQueries({ queryKey: getGetBillingCyclesQueryKey() });
  queryClient.invalidateQueries({ queryKey: getGetCashbackByCategoryQueryKey() });
}

function ActivityLogDialog({ walletCards }: { walletCards?: WalletCard[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const createTransaction = useCreateTransaction();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionType: "purchase",
      walletCardId: 0,
      date: toDateInputValue(),
      amount: 0,
      category: "",
      merchantName: "",
      description: "",
      locationName: "",
      latitude: null,
      longitude: null,
    },
  });

  const transactionType = form.watch("transactionType");
  const category = form.watch("category");
  const walletCardId = form.watch("walletCardId");
  const amount = form.watch("amount");
  const latitude = form.watch("latitude");
  const longitude = form.watch("longitude");
  const isPaymentMode = transactionType === "payment";

  const selectedCardRate = useMemo(() => {
    if (isPaymentMode || !walletCardId || !category || !walletCards) return null;
    const walletCard = walletCards.find((card) => card.id === Number(walletCardId));
    if (!walletCard) return null;
    const exactMatch = walletCard.card.cashbackCategories.find(
      (cashback) =>
        cashback.category.toLowerCase() === category.toLowerCase() &&
        !cashback.isDefault,
    );
    const defaultRate = walletCard.card.cashbackCategories.find(
      (cashback) => cashback.isDefault,
    );
    return exactMatch ? exactMatch.rate : (defaultRate?.rate ?? 0);
  }, [category, isPaymentMode, walletCardId, walletCards]);

  const estimatedCashback =
    !isPaymentMode && selectedCardRate && amount > 0
      ? Number((Number(amount) * selectedCardRate).toFixed(2))
      : null;

  const captureLocation = () => {
    if (!("geolocation" in navigator)) {
      toast({
        variant: "destructive",
        title: "Location not supported",
        description: "Your browser does not expose geolocation.",
      });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.setValue("latitude", position.coords.latitude);
        form.setValue("longitude", position.coords.longitude);
        if (!form.getValues("locationName")) {
          form.setValue(
            "locationName",
            `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          );
        }
        setLocating(false);
        toast({ title: "Location captured" });
      },
      (error) => {
        setLocating(false);
        toast({
          variant: "destructive",
          title: "Could not get location",
          description: error.message,
        });
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 60_000 },
    );
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset({
        transactionType: "purchase",
        walletCardId: 0,
        date: toDateInputValue(),
        amount: 0,
        category: "",
        merchantName: "",
        description: "",
        locationName: "",
        latitude: null,
        longitude: null,
      });
    }
  };

  const onSubmit = (values: TransactionFormValues) => {
    const isPayment = values.transactionType === "payment";
    createTransaction.mutate(
      {
        data: {
          walletCardId: values.walletCardId,
          transactionType: values.transactionType,
          date: parseDateInput(values.date),
          description:
            values.description?.trim() ||
            (isPayment ? "Payment" : values.category ?? "Purchase"),
          amount: values.amount,
          category: isPayment ? "Payment" : (values.category ?? "Other"),
          merchantName: isPayment ? null : values.merchantName?.trim() || null,
          locationName: isPayment ? null : values.locationName?.trim() || null,
          latitude: isPayment ? null : values.latitude ?? null,
          longitude: isPayment ? null : values.longitude ?? null,
        },
      },
      {
        onSuccess: () => {
          invalidateActivityData(queryClient);
          toast({ title: isPayment ? "Payment recorded" : "Transaction logged" });
          handleOpenChange(false);
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: isPayment ? "Error recording payment" : "Error logging transaction",
          });
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-10 rounded-full px-4">
          <Plus className="h-4 w-4" />
          Log Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-[28px]">
        <DialogHeader>
          <DialogTitle>{isPaymentMode ? "Record Payment" : "Log Purchase"}</DialogTitle>
          <DialogDescription>Purchase or payment details.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
            <div className="grid grid-cols-2 gap-1 rounded-2xl bg-secondary/60 p-1">
              {[
                { value: "purchase", label: "Purchase" },
                { value: "payment", label: "Payment" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    form.setValue(
                      "transactionType",
                      option.value as "purchase" | "payment",
                    );
                    if (option.value === "payment") {
                      form.setValue("category", "Payment");
                      form.setValue("merchantName", "");
                      form.setValue("locationName", "");
                      form.setValue("latitude", null);
                      form.setValue("longitude", null);
                    } else if (form.getValues("category") === "Payment") {
                      form.setValue("category", "");
                    }
                  }}
                  className={`h-9 rounded-[14px] text-sm font-semibold transition-colors ${
                    transactionType === option.value
                      ? "bg-card text-foreground shadow-[var(--app-shadow-soft)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="walletCardId"
                render={({ field }) => (
                  <FormItem className={isPaymentMode ? "sm:col-span-2" : undefined}>
                    <FormLabel>{isPaymentMode ? "Card Paid" : "Card Used"}</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select card" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {walletCards?.map((walletCard) => (
                          <SelectItem key={walletCard.id} value={String(walletCard.id)}>
                            {walletCard.nickname || walletCard.card.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isPaymentMode ? (
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((categoryName) => (
                            <SelectItem key={categoryName} value={categoryName}>
                              {categoryName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
            </div>

            {estimatedCashback != null && (
              <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                <span className="font-medium">Estimated reward</span>
                <span className="font-semibold tabular-nums">
                  +{formatMoney(estimatedCashback)}
                </span>
              </div>
            )}

            {!isPaymentMode && (
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="merchantName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex h-7 items-center">
                        <FormLabel>Merchant</FormLabel>
                      </div>
                      <FormControl>
                        <Input placeholder="e.g. Trader Joe's" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="locationName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex h-7 items-center justify-between gap-2">
                        <FormLabel>Location</FormLabel>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1 px-2 text-xs"
                          onClick={captureLocation}
                          disabled={locating}
                        >
                          {locating ? (
                            <>
                              <Loader2 className="h-3 w-3 animate-spin" />
                              Locating
                            </>
                          ) : (
                            <>
                              <MapPin className="h-3 w-3" />
                              Use Location
                            </>
                          )}
                        </Button>
                      </div>
                      <FormControl>
                        <Input placeholder="Optional" {...field} />
                      </FormControl>
                      {latitude != null && longitude != null ? (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Coordinates saved
                        </p>
                      ) : null}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isPaymentMode ? "Note" : "Description"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isPaymentMode ? "Optional payment note" : "Optional"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full"
                disabled={createTransaction.isPending}
              >
                {createTransaction.isPending
                  ? "Saving..."
                  : isPaymentMode
                    ? "Record Payment"
                    : "Log Purchase"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function SummaryTile({
  label,
  value,
  icon,
  detail,
  tone = "default",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  detail?: string;
  tone?: "default" | "green" | "gold";
}) {
  const toneClass =
    tone === "green"
      ? "bg-emerald-50 text-emerald-900"
      : tone === "gold"
        ? "bg-amber-50 text-amber-950"
        : "bg-secondary/55 text-foreground";

  return (
    <div className="rounded-[24px] border border-card-border bg-card px-4 py-4 shadow-[0_8px_24px_rgba(17,24,32,0.05)]">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        <span className={`flex h-8 w-8 items-center justify-center rounded-2xl ${toneClass}`}>
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight tabular-nums text-foreground">
        {value}
      </div>
      {detail ? <div className="mt-1 text-xs text-muted-foreground">{detail}</div> : null}
    </div>
  );
}

function PerCardRows({ period }: { period: SpendingStatsPeriod }) {
  if (period.perCard.length === 0) {
    return (
      <div className="rounded-[22px] border border-dashed border-card-border bg-secondary/25 py-10 text-center text-sm text-muted-foreground">
        No card rewards in this period.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[22px] border border-card-border">
      {period.perCard.map((row) => {
        const effectiveRate =
          row.totalSpent > 0 ? (row.totalCashback / row.totalSpent) * 100 : 0;
        return (
          <div
            key={row.walletCardId}
            className="grid gap-3 border-b border-card-border bg-card px-4 py-3 last:border-b-0 md:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(90px,auto))] md:items-center"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-foreground">
                {row.cardName}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {row.transactionCount} purchases
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Spent
              </div>
              <div className="mt-1 text-sm font-semibold tabular-nums">
                {formatMoney(row.totalSpent)}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Reward
              </div>
              <div className="mt-1 text-sm font-semibold tabular-nums text-emerald-700">
                {formatMoney(row.totalCashback)}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Rate
              </div>
              <div className="mt-1 text-sm font-semibold tabular-nums">
                {formatRate(effectiveRate)}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="h-2 rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-emerald-400"
                  style={{
                    width: `${Math.min(100, Math.max(5, effectiveRate * 18))}%`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LoggedActivityList({
  transactions,
  period,
}: {
  transactions: Transaction[];
  period: PeriodKey;
}) {
  const queryClient = useQueryClient();
  const deleteTransaction = useDeleteTransaction();
  const { toast } = useToast();

  const periodTransactions = transactions
    .filter((transaction) => isTransactionInPeriod(transaction, period));

  const handleDelete = (id: number) => {
    deleteTransaction.mutate(
      { id },
      {
        onSuccess: () => {
          invalidateActivityData(queryClient);
          toast({ title: "Activity deleted" });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error deleting activity",
          });
        },
      },
    );
  };

  if (periodTransactions.length === 0) {
    return (
      <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-[22px] border border-dashed border-card-border bg-secondary/25 p-6 text-center">
        <Receipt className="mb-3 h-8 w-8 text-muted-foreground/50" />
        <div className="text-sm font-semibold text-foreground">No logged activity</div>
        <div className="mt-1 max-w-[220px] text-xs leading-relaxed text-muted-foreground">
          No entries for this range.
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[420px] space-y-1.5 overflow-y-auto pr-1">
      {periodTransactions.map((transaction) => {
        const isPayment = isPaymentTransaction(transaction);
        const title = transaction.merchantName || transaction.description || transaction.category;
        const secondaryParts = [
          format(new Date(transaction.date), "MMM d"),
          transaction.category,
          transaction.cardName,
          transaction.locationName,
        ].filter(Boolean);
        return (
          <div
            key={transaction.id}
            className="group rounded-2xl border border-card-border bg-card px-3 py-2 transition-colors hover:bg-secondary/20"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  {transaction.merchantName ? (
                    <Building2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  ) : (
                    <Receipt className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                  <div className="truncate text-sm font-semibold text-foreground">
                    {title}
                  </div>
                </div>
                <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                  {secondaryParts.map((part, index) => (
                    <span
                      key={`${transaction.id}-${index}-${part}`}
                      className={index >= 2 ? "truncate" : "shrink-0"}
                    >
                      {index > 0 ? "/ " : ""}
                      {part}
                    </span>
                  ))}
                </div>
                {transaction.merchantName && transaction.description && transaction.description !== transaction.category ? (
                  <div className="mt-1 truncate text-xs text-muted-foreground">
                    {transaction.description}
                  </div>
                ) : null}
              </div>

              <div className="shrink-0 text-right">
                <div
                  className={`text-base font-semibold tabular-nums ${
                    isPayment ? "text-sky-800" : "text-foreground"
                  }`}
                >
                  {isPayment ? "-" : ""}{formatMoney(transaction.amount)}
                </div>
                {!isPayment && transaction.cashbackEarned > 0 ? (
                  <div className="text-xs font-semibold tabular-nums text-emerald-700">
                    +{formatMoney(transaction.cashbackEarned)}
                  </div>
                ) : null}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => handleDelete(transaction.id)}
                  disabled={deleteTransaction.isPending}
                  aria-label="Delete activity"
                >
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CategorySpendChart({
  data,
  selectedWalletCardId,
  onSelectedWalletCardIdChange,
  walletCards,
}: {
  data: CategorySpendPoint[];
  selectedWalletCardId: string;
  onSelectedWalletCardIdChange: (value: string) => void;
  walletCards?: WalletCard[];
}) {
  const totalSpent = data.reduce((sum, item) => sum + item.totalSpent, 0);

  return (
    <div className="rounded-[22px] border border-card-border bg-card p-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="text-sm font-semibold text-foreground">Spend by category</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {formatMoney(totalSpent)}
          </div>
        </div>
        <Select
          value={selectedWalletCardId}
          onValueChange={onSelectedWalletCardIdChange}
        >
          <SelectTrigger className="h-9 rounded-full bg-background sm:w-[220px]">
            <SelectValue placeholder="All cards" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cards</SelectItem>
            {walletCards?.map((walletCard) => (
              <SelectItem key={walletCard.id} value={String(walletCard.id)}>
                {walletCard.nickname || walletCard.card.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {data.length === 0 ? (
        <div className="mt-4 flex h-72 items-center justify-center rounded-[20px] border border-dashed border-card-border text-sm text-muted-foreground">
          No category spend for this range.
        </div>
      ) : (
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  formatter={(value: number) => formatMoney(value)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 16,
                    boxShadow: "0 12px 32px rgba(17, 24, 32, 0.08)",
                  }}
                />
                <Pie
                  data={data}
                  dataKey="totalSpent"
                  nameKey="category"
                  innerRadius={62}
                  outerRadius={98}
                  paddingAngle={2}
                  stroke="hsl(var(--card))"
                  strokeWidth={3}
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {data.slice(0, 8).map((item, index) => {
              const share = totalSpent > 0 ? (item.totalSpent / totalSpent) * 100 : 0;
              return (
                <div
                  key={item.category}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-background/70 px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="truncate text-sm font-semibold text-foreground">
                        {item.category}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {item.transactionCount} purchase{item.transactionCount === 1 ? "" : "s"} · {share.toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-right text-sm font-semibold tabular-nums">
                    {formatMoney(item.totalSpent)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Analytics({ embedded = false }: AnalyticsProps = {}) {
  const [periodKey, setPeriodKey] = useState<PeriodKey>("thisMonth");
  const [categoryWalletCardId, setCategoryWalletCardId] = useState("all");
  const { data, isLoading } = useGetSpendingStats();
  const { data: transactions = [] } = useListTransactions();
  const { data: walletCards } = useListWallet();

  const trendData = useMemo(
    () => buildTrendData(transactions, periodKey),
    [periodKey, transactions],
  );
  const categorySpendData = useMemo(
    () => buildCategorySpendData(transactions, periodKey, categoryWalletCardId),
    [categoryWalletCardId, periodKey, transactions],
  );

  if (isLoading || !data) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-28 w-full rounded-[28px]" />
        <Skeleton className="h-96 w-full rounded-[28px]" />
      </div>
    );
  }

  const period = data[periodKey];
  const effectiveRate =
    period.totalSpent > 0 ? (period.totalCashback / period.totalSpent) * 100 : 0;
  const trendTitle = `${PERIOD_LABELS[periodKey]} trend`;

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {!embedded && (
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight md:text-[28px]">
            <BarChart3 className="h-6 w-6 text-foreground" />
            Analytics
          </h2>
        </div>
      )}

      <section className="rounded-[30px] border border-card-border bg-card/95 p-4 shadow-[0_18px_48px_rgba(17,24,32,0.07)] md:p-5">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-semibold text-foreground">Time Range</div>
          </div>
          <Tabs value={periodKey} onValueChange={(value) => setPeriodKey(value as PeriodKey)}>
            <TabsList className="grid w-full grid-cols-4 rounded-full bg-secondary/60 p-1 md:w-[520px]">
              {PERIOD_ORDER.map((key) => (
                <TabsTrigger key={key} value={key} className="rounded-full text-xs">
                  {PERIOD_LABELS[key]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <SummaryTile
            label="Total Spent"
            value={formatMoney(period.totalSpent)}
            icon={<DollarSign className="h-4 w-4" />}
            detail={PERIOD_LABELS[periodKey]}
          />
          <SummaryTile
            label="Cash Back"
            value={formatMoney(period.totalCashback)}
            icon={<Sparkles className="h-4 w-4" />}
            detail={`Effective rate ${formatRate(effectiveRate)}`}
            tone="green"
          />
          <SummaryTile
            label="Purchases"
            value={period.transactionCount.toLocaleString("en-US")}
            icon={<Receipt className="h-4 w-4" />}
            detail="Logged purchase count"
            tone="gold"
          />
        </div>
      </section>

      <Card className="overflow-hidden rounded-[30px] border-card-border bg-card/95 shadow-[0_18px_48px_rgba(17,24,32,0.07)]">
        <CardHeader className="border-b border-card-border bg-secondary/20 px-5 py-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <CreditCard className="h-4 w-4" />
                Cashback by card
              </CardTitle>
              <div className="mt-1 text-xs text-muted-foreground">
                {PERIOD_LABELS[periodKey]}
              </div>
            </div>
            <ActivityLogDialog walletCards={walletCards} />
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-5">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
            <div className="rounded-[24px] border border-card-border bg-background/70 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">{trendTitle}</div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-[#9CCCF2]" />
                    Spent
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-[#34D399]" />
                    Cash Back
                  </span>
                  <Badge variant="outline" className="rounded-full bg-card px-2.5 py-1">
                    <CalendarDays className="mr-1 h-3.5 w-3.5" />
                    {PERIOD_LABELS[periodKey]}
                  </Badge>
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="label"
                      className="text-xs"
                      tickLine={false}
                      axisLine={false}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      yAxisId="spent"
                      tickFormatter={(value: number) => `$${value}`}
                      className="text-xs"
                      tickLine={false}
                      axisLine={false}
                      stroke="#9CCCF2"
                    />
                    <YAxis
                      yAxisId="cashback"
                      orientation="right"
                      tickFormatter={(value: number) => `$${value}`}
                      className="text-xs"
                      tickLine={false}
                      axisLine={false}
                      stroke="#34D399"
                      width={44}
                    />
                    <Tooltip
                      formatter={(value: number) => formatMoney(value)}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 16,
                        boxShadow: "0 12px 32px rgba(17, 24, 32, 0.08)",
                      }}
                    />
                    <Line
                      yAxisId="spent"
                      type="monotone"
                      dataKey="totalSpent"
                      name="Spent"
                      stroke="#9CCCF2"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      yAxisId="cashback"
                      type="monotone"
                      dataKey="totalCashback"
                      name="Cash Back"
                      stroke="#34D399"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Logged activity
                  </div>
                </div>
              </div>
              <LoggedActivityList transactions={transactions} period={periodKey} />
            </div>
          </div>

          <div className="mt-5 rounded-[24px] border border-card-border bg-background/70 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-foreground">Card breakdown</div>
              </div>
            </div>
            <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <CategorySpendChart
                data={categorySpendData}
                selectedWalletCardId={categoryWalletCardId}
                onSelectedWalletCardIdChange={setCategoryWalletCardId}
                walletCards={walletCards}
              />
              <PerCardRows period={period} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
