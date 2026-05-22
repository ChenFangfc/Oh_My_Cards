import {
  useListTransactions,
  useDeleteTransaction,
  useCreateTransaction,
  useListWallet,
} from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Trash2,
  Plus,
  Receipt,
  Sparkles,
  MapPin,
  Loader2,
  Building2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  getListTransactionsQueryKey,
  getGetDashboardSummaryQueryKey,
  getListWalletQueryKey,
  getGetSpendingStatsQueryKey,
  getGetBillingCyclesQueryKey,
} from "@workspace/api-client-react";
import { useState, useMemo } from "react";
import { format } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";

const transactionSchema = z.object({
  transactionType: z.enum(["purchase", "payment"]).default("purchase"),
  walletCardId: z.coerce.number().min(1, "Please select a card"),
  description: z.string().optional(),
  merchantName: z.string().optional(),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  category: z.string().optional(),
  locationName: z.string().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
}).superRefine((data, ctx) => {
  if (data.transactionType === "purchase" && !data.category) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Category is required",
      path: ["category"],
    });
  }
  if (data.transactionType === "purchase" && !data.description?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Description is required",
      path: ["description"],
    });
  }
});

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

interface TransactionsProps {
  embedded?: boolean;
}

export default function Transactions({ embedded = false }: TransactionsProps = {}) {
  const { data: transactions, isLoading } = useListTransactions();
  const { data: walletCards } = useListWallet();
  const deleteTx = useDeleteTransaction();
  const createTx = useCreateTransaction();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [locating, setLocating] = useState(false);

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionType: "purchase",
      walletCardId: 0,
      description: "",
      merchantName: "",
      amount: 0,
      category: "",
      locationName: "",
      latitude: null,
      longitude: null,
    },
  });

  const watchedTransactionType = form.watch("transactionType");
  const isPaymentMode = watchedTransactionType === "payment";
  const watchedCategory = form.watch("category");
  const watchedCardId = form.watch("walletCardId");
  const watchedLat = form.watch("latitude");
  const watchedLng = form.watch("longitude");

  const bestCardForCategory = useMemo(() => {
    if (isPaymentMode || !watchedCategory || !walletCards || walletCards.length === 0) return null;
    let best: { walletCardId: number; cardName: string; rate: number } | null =
      null;
    for (const wc of walletCards) {
      const categories = wc.card.cashbackCategories;
      const match = categories.find(
        (c) =>
          c.category.toLowerCase() === watchedCategory.toLowerCase() &&
          !c.isDefault,
      );
      const defaultRate = categories.find((c) => c.isDefault);
      const rate = match ? match.rate : (defaultRate?.rate ?? 0);
      if (!best || rate > best.rate) {
        best = { walletCardId: wc.id, cardName: wc.card.name, rate };
      }
    }
    return best;
  }, [isPaymentMode, watchedCategory, walletCards]);

  const selectedCardRate = useMemo(() => {
    if (isPaymentMode || !watchedCardId || !watchedCategory || !walletCards) return null;
    const wc = walletCards.find((w) => w.id === Number(watchedCardId));
    if (!wc) return null;
    const match = wc.card.cashbackCategories.find(
      (c) =>
        c.category.toLowerCase() === watchedCategory.toLowerCase() &&
        !c.isDefault,
    );
    const defaultRate = wc.card.cashbackCategories.find((c) => c.isDefault);
    return match ? match.rate : (defaultRate?.rate ?? 0);
  }, [isPaymentMode, watchedCardId, watchedCategory, walletCards]);

  const watchedAmount = form.watch("amount");
  const estimatedCashback =
    !isPaymentMode && selectedCardRate && watchedAmount > 0
      ? (Number(watchedAmount) * selectedCardRate).toFixed(2)
      : null;

  const captureLocation = () => {
    if (!("geolocation" in navigator)) {
      toast({
        variant: "destructive",
        title: "Location not supported",
        description: "Your browser doesn't expose geolocation.",
      });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        form.setValue("latitude", pos.coords.latitude);
        form.setValue("longitude", pos.coords.longitude);
        // Pre-fill location name with coordinates as a placeholder
        if (!form.getValues("locationName")) {
          form.setValue(
            "locationName",
            `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
          );
        }
        setLocating(false);
        toast({
          title: "Location captured",
          description: `Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}`,
        });
      },
      (err) => {
        setLocating(false);
        toast({
          variant: "destructive",
          title: "Could not get location",
          description: err.message,
        });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  };

  const handleDelete = (id: number) => {
    deleteTx.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getListTransactionsQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetDashboardSummaryQueryKey(),
          });
          queryClient.invalidateQueries({ queryKey: getListWalletQueryKey() });
          queryClient.invalidateQueries({
            queryKey: getGetSpendingStatsQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetBillingCyclesQueryKey(),
          });
          toast({ title: "Transaction deleted" });
        },
        onError: () =>
          toast({
            variant: "destructive",
            title: "Error deleting transaction",
          }),
      },
    );
  };

  const onSubmit = (values: z.infer<typeof transactionSchema>) => {
    const isPayment = values.transactionType === "payment";
    createTx.mutate(
      {
        data: {
          walletCardId: values.walletCardId,
          transactionType: values.transactionType,
          description: values.description?.trim() || (isPayment ? "Payment" : "Purchase"),
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
          queryClient.invalidateQueries({
            queryKey: getListTransactionsQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetDashboardSummaryQueryKey(),
          });
          queryClient.invalidateQueries({ queryKey: getListWalletQueryKey() });
          queryClient.invalidateQueries({
            queryKey: getGetSpendingStatsQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetBillingCyclesQueryKey(),
          });
          toast({ title: isPayment ? "Payment recorded" : "Transaction logged successfully" });
          setIsOpen(false);
          form.reset();
        },
        onError: () =>
          toast({
            variant: "destructive",
            title: isPayment ? "Error recording payment" : "Error logging transaction",
          }),
      },
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div
        className={
          embedded
            ? "flex justify-end"
            : "flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        }
      >
        {!embedded && (
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">
              Transactions
            </h2>
            <p className="text-muted-foreground mt-1">
              Log your spending and see how much cashback you earned.
            </p>
          </div>
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Log Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isPaymentMode ? "Record Payment" : "Log Purchase"}</DialogTitle>
              <DialogDescription>
                {isPaymentMode
                  ? "Record a card payment so due balances and available credit stay current."
                  : "Add a recent transaction to calculate earned rewards."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pt-4"
              >
                <div className="grid grid-cols-2 gap-2 rounded-lg bg-secondary/60 p-1">
                  {[
                    { value: "purchase", label: "Purchase" },
                    { value: "payment", label: "Payment" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        form.setValue("transactionType", option.value as "purchase" | "payment");
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
                      className={`h-8 rounded-md text-sm font-semibold transition-colors ${
                        watchedTransactionType === option.value
                          ? "bg-card text-foreground shadow-[var(--app-shadow-soft)]"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        {isPaymentMode ? (
                          <FormControl>
                            <Input value="Payment" disabled />
                          </FormControl>
                        ) : (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CATEGORIES.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {bestCardForCategory && watchedCategory && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800 p-3 flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">
                        Best card for {watchedCategory}:
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 ml-1">
                        {bestCardForCategory.cardName} (
                        {(bestCardForCategory.rate * 100).toFixed(1)}% back)
                      </span>
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="walletCardId"
                    render={({ field }) => (
                      <FormItem>
                      <FormLabel>{isPaymentMode ? "Card Paid" : "Card Used"}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={
                          field.value ? String(field.value) : undefined
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a card from wallet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {walletCards?.map((wc) => {
                            const match = wc.card.cashbackCategories.find(
                              (c) =>
                                watchedCategory &&
                                c.category.toLowerCase() ===
                                  watchedCategory.toLowerCase() &&
                                !c.isDefault,
                            );
                            const def = wc.card.cashbackCategories.find(
                              (c) => c.isDefault,
                            );
                            const rate = match
                              ? match.rate
                              : (def?.rate ?? 0);
                            const isBest =
                              bestCardForCategory?.walletCardId === wc.id;
                            return (
                              <SelectItem key={wc.id} value={String(wc.id)}>
                                <span className="flex items-center gap-2">
                                  {wc.nickname || wc.card.name}
                                  {!isPaymentMode && watchedCategory && (
                                    <span
                                      className={`text-xs font-medium ${
                                        isBest
                                          ? "text-emerald-600"
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      {(rate * 100).toFixed(1)}%
                                      {isBest ? " (best)" : ""}
                                    </span>
                                  )}
                                </span>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {estimatedCashback && (
                  <div className="rounded-lg border bg-muted/40 p-3 flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Estimated cashback
                    </span>
                    <span className="font-bold text-emerald-600">
                      +${estimatedCashback}
                    </span>
                  </div>
                )}

                {!isPaymentMode ? (
                  <FormField
                    control={form.control}
                    name="merchantName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Merchant</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Trader Joe's, Delta Airlines"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}

                <FormField
                  control={form.control}
                  name="description"
                    render={({ field }) => (
                      <FormItem>
                      <FormLabel>{isPaymentMode ? "Note" : "Description"}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={isPaymentMode ? "Optional payment note" : "What did you buy?"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!isPaymentMode ? (
                  <FormField
                    control={form.control}
                    name="locationName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Location (optional)</FormLabel>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs gap-1"
                            onClick={captureLocation}
                            disabled={locating}
                          >
                            {locating ? (
                              <>
                                <Loader2 className="h-3 w-3 animate-spin" /> Locating...
                              </>
                            ) : (
                              <>
                                <MapPin className="h-3 w-3" /> Use my location
                              </>
                            )}
                          </Button>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="e.g. SoHo, NYC or store address"
                            {...field}
                          />
                        </FormControl>
                        {watchedLat !== null && watchedLat !== undefined && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> Coordinates saved (
                            {watchedLat.toFixed(4)}, {watchedLng?.toFixed(4)})
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}

                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createTx.isPending}>
                    {createTx.isPending
                      ? isPaymentMode
                        ? "Recording..."
                        : "Logging..."
                      : isPaymentMode
                        ? "Record Payment"
                        : "Log Transaction"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !transactions || transactions.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center">
              <Receipt className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium">No transactions yet</h3>
              <p className="text-muted-foreground text-sm max-w-sm mt-1">
                Log your first purchase or payment to keep rewards, balances,
                and available credit current.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground uppercase text-xs tracking-wider border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Merchant / Description</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Card</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                  <th className="px-6 py-4 font-medium text-right">Earned</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {transactions.map((tx) => {
                  const isPayment =
                    tx.transactionType === "payment" ||
                    tx.category.toLowerCase() === "payment";

                  return (
                  <tr
                    key={tx.id}
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {format(new Date(tx.date), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium flex items-center gap-2">
                        {tx.merchantName && (
                          <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        {tx.merchantName || tx.description}
                      </div>
                      {tx.merchantName && tx.description && (
                        <div className="text-xs text-muted-foreground">
                          {tx.description}
                        </div>
                      )}
                      {tx.locationName && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3" /> {tx.locationName}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 capitalize">
                      <Badge
                        variant="outline"
                        className={`text-xs font-normal ${
                          isPayment
                            ? "border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-200"
                            : "bg-background"
                        }`}
                      >
                        {tx.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {tx.cardName}
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-medium tabular-nums ${
                        isPayment ? "text-sky-800 dark:text-sky-200" : ""
                      }`}
                    >
                      {isPayment ? "-" : ""}${tx.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-emerald-600 font-medium tabular-nums bg-emerald-50/30 dark:bg-emerald-950/20">
                      {isPayment ? (
                        <span className="text-muted-foreground">-</span>
                      ) : (
                        <>
                          +${tx.cashbackEarned.toFixed(2)}{" "}
                          <span className="text-[10px] text-muted-foreground ml-1">
                            ({(tx.cashbackRate * 100).toFixed(1)}%)
                          </span>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(tx.id)}
                        disabled={deleteTx.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
