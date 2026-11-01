import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  clearLocalData,
  getLocalDataStorageSummary,
  importLocalDataBackup,
  serializeLocalDataBackup,
  serializeTransactionsCsv,
  type LocalDataBackup,
} from "@workspace/api-client-react";
import {
  ArrowRight,
  Database,
  Download,
  FileSpreadsheet,
  HardDrive,
  ShieldCheck,
  Trash2,
  Undo2,
  Upload,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { DetailRows, SectionCard } from "@/components/section-card";
import { useToast } from "@/hooks/use-toast";
import { deviceNoun, isDesktopApp, saveTextFile } from "@/lib/desktop";
import { formatFullDate, t, tn } from "@/lib/i18n";

type OpenFileHandle = {
  getFile: () => Promise<File>;
};

type FilePickerWindow = Window & {
  showOpenFilePicker?: (options?: {
    multiple?: boolean;
    types?: Array<{
      description: string;
      accept: Record<string, string[]>;
    }>;
  }) => Promise<OpenFileHandle[]>;
};

type PendingImport = {
  text: string;
  exportedAt: Date | null;
  walletCardCount: number | null;
  transactionCount: number | null;
};

function todayStamp(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function parseBackupDate(value: unknown): Date | null {
  if (typeof value !== "string") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Reads the counts shown in the confirmation dialog without writing anything.
 * Full validation still happens in `importLocalDataBackup` once confirmed.
 */
function readBackupPreview(text: string): PendingImport {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(t("Backup file is not valid JSON."));
  }

  const backup = parsed as Partial<LocalDataBackup> | null;
  const walletCards = backup?.state?.walletCards;
  const transactions = backup?.state?.transactions;

  return {
    text,
    exportedAt: parseBackupDate(backup?.exportedAt),
    walletCardCount: Array.isArray(walletCards) ? walletCards.length : null,
    transactionCount: Array.isArray(transactions) ? transactions.length : null,
  };
}

/** "3 cards · 120 transactions", or "3 cards and 120 transactions" in a sentence. */
function formatCounts(
  cards: number | null,
  transactions: number | null,
  style: "list" | "sentence" = "list",
): string {
  if (cards === null || transactions === null) return t("Unknown contents");
  const vars = {
    cards: tn(cards, "{count} card", "{count} cards"),
    transactions: tn(transactions, "{count} transaction", "{count} transactions", {
      count: transactions.toLocaleString("en-US"),
    }),
  };
  return style === "sentence"
    ? t("{cards} and {transactions}", vars)
    : `${vars.cards} · ${vars.transactions}`;
}

export default function Data() {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [summary, setSummary] = useState(() => getLocalDataStorageSummary());
  const [pendingImport, setPendingImport] = useState<PendingImport | null>(null);
  const [undoSnapshot, setUndoSnapshot] = useState<string | null>(null);
  const device = deviceNoun();

  const refreshData = () => {
    setSummary(getLocalDataStorageSummary());
    void queryClient.invalidateQueries();
  };

  const restoreSnapshot = (snapshot: string) => {
    try {
      importLocalDataBackup(snapshot);
      setUndoSnapshot(null);
      refreshData();
      toast({
        title: t("Restored"),
        description: t("The data from before the change is back on {device}.", {
          device,
        }),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("Undo failed"),
        description:
          error instanceof Error
            ? error.message
            : t("Could not restore the previous data."),
      });
    }
  };

  const runImport = (pending: PendingImport) => {
    const snapshot = serializeLocalDataBackup();

    try {
      const backup = importLocalDataBackup(pending.text);
      setUndoSnapshot(snapshot);
      refreshData();

      const exportedAt = parseBackupDate(backup.exportedAt);
      const counts = formatCounts(
        backup.state.walletCards.length,
        backup.state.transactions.length,
        "sentence",
      );
      toast({
        title: t("Backup imported"),
        description: exportedAt
          ? t("Restored {counts}, exported on {date}.", {
              counts,
              date: formatFullDate(exportedAt),
            })
          : t("Restored {counts}.", { counts }),
        action: (
          <ToastAction
            altText={t("Undo this import")}
            onClick={() => restoreSnapshot(snapshot)}
          >
            {t("Undo")}</ToastAction>
        ),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("Import failed"),
        description:
          error instanceof Error ? error.message : t("Could not read backup file."),
      });
    } finally {
      setPendingImport(null);
    }
  };

  const handleImportUpload = async (file: File | undefined) => {
    if (!file) return;

    try {
      setPendingImport(readBackupPreview(await file.text()));
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("Import failed"),
        description:
          error instanceof Error
            ? error.message
            : t("Could not read backup file."),
      });
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleSave = async (
    kind: "backup" | "csv",
  ): Promise<void> => {
    try {
      const outcome = await saveTextFile(
        kind === "backup"
          ? {
              suggestedName: `oh-my-cards-backup-${todayStamp()}.json`,
              contents: serializeLocalDataBackup(),
              mimeType: "application/json",
              description: t("Oh My Cards Backup"),
              extensions: ["json"],
            }
          : {
              suggestedName: `oh-my-cards-transactions-${todayStamp()}.csv`,
              contents: serializeTransactionsCsv(),
              mimeType: "text/csv",
              description: t("CSV Spreadsheet"),
              extensions: ["csv"],
            },
      );
      if (outcome === "saved") {
        toast({
          title:
            kind === "backup"
              ? t("Backup exported")
              : t("Transactions exported"),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("Save failed"),
        description:
          error instanceof Error ? error.message : t("Could not save the file."),
      });
    }
  };

  const handleImportBackup = async () => {
    const picker = window as FilePickerWindow;
    if (!picker.showOpenFilePicker) {
      inputRef.current?.click();
      return;
    }

    try {
      const [handle] = await picker.showOpenFilePicker({
        multiple: false,
        types: [
          {
            description: t("Oh My Cards Backup"),
            accept: { "application/json": [".json"] },
          },
        ],
      });
      const file = await handle.getFile();
      setPendingImport(readBackupPreview(await file.text()));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast({
        variant: "destructive",
        title: t("Load failed"),
        description:
          error instanceof Error ? error.message : t("Could not load local file."),
      });
    }
  };

  const handleDeleteAll = () => {
    const snapshot = serializeLocalDataBackup();
    clearLocalData();
    setUndoSnapshot(snapshot);
    refreshData();
    toast({
      title: t("All data deleted"),
      description: t("Nothing from your wallet is stored on {device} now.", {
        device,
      }),
      action: (
        <ToastAction
          altText={t("Undo deleting all data")}
          onClick={() => restoreSnapshot(snapshot)}
        >
          {t("Undo")}</ToastAction>
      ),
    });
  };

  const storageRows: Array<{ label: string; value: React.ReactNode }> = [
    {
      label: t("Wallet cards"),
      value: summary.walletCardCount.toLocaleString("en-US"),
    },
    {
      label: t("Transactions"),
      value: summary.transactionCount.toLocaleString("en-US"),
    },
    {
      label: t("Benefit records"),
      value: summary.benefitUsageCount.toLocaleString("en-US"),
    },
    {
      label: t("Stored in"),
      value: isDesktopApp()
        ? t("App storage on this Mac")
        : t("This browser's local storage"),
    },
  ];

  return (
    <div className="max-w-3xl space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-balance md:text-[28px]">
          <Database aria-hidden="true" className="h-6 w-6 text-foreground" />
          {t("Data")}</h2>
        <p className="mt-1 text-muted-foreground">
          {t("Your wallet and transactions are saved on {device} and nowhere else.", {
            device,
          })}
        </p>
      </div>

      <SectionCard
        icon={<ShieldCheck className="h-5 w-5" />}
        iconClassName="bg-primary/20 text-primary"
        title={t("Backup & Restore")}
        description={t(
          "Export a backup file to move to another device, or import one you saved earlier. Nothing leaves {device} unless you export it.",
          { device },
        )}
      >
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Button
            onClick={() => void handleSave("backup")}
            className="justify-start gap-2"
          >
            <Download className="h-4 w-4" />
            {t("Export Backup")}</Button>
          <Button
            variant="outline"
            onClick={() => void handleImportBackup()}
            className="justify-start gap-2"
          >
            <Upload className="h-4 w-4" />
            {t("Import Backup")}</Button>
          <Button
            variant="outline"
            onClick={() => void handleSave("csv")}
            disabled={summary.transactionCount === 0}
            className="justify-start gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            {t("Export CSV")}</Button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(event) =>
            void handleImportUpload(event.target.files?.[0])
          }
        />
        <p className="mt-4 rounded-2xl bg-secondary/60 px-4 py-3 text-sm leading-6 text-muted-foreground">
          {t(
            "Importing a backup replaces the data currently stored on {device}. The CSV export lists every transaction for a spreadsheet; it can't be imported back.",
            { device },
          )}
        </p>
        {undoSnapshot ? (
          <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-card-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-muted-foreground">
              {t("The data replaced by your last change is still available until you leave this page.")}</p>
            <Button
              variant="outline"
              onClick={() => restoreSnapshot(undoSnapshot)}
              className="shrink-0 justify-start gap-2"
            >
              <Undo2 className="h-4 w-4" />
              {t("Undo")}</Button>
          </div>
        ) : null}
      </SectionCard>

      <SectionCard
        icon={<HardDrive className="h-5 w-5" />}
        iconClassName="bg-secondary text-foreground"
        title={t("What is stored here")}
        description={t("Everything below lives only on {device}.", { device })}
      >
        <DetailRows rows={storageRows} />
        <Link
          href="/settings#card-rules"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("Card rules and app updates are in Settings")}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </SectionCard>

      <SectionCard
        icon={<Trash2 className="h-5 w-5" />}
        iconClassName="bg-destructive/10 text-destructive"
        title={t("Delete All Data")}
        description={t(
          "Removes every wallet card, transaction and benefit record from {device}. Export a backup first if you might want it back.",
          { device },
        )}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="mt-4 gap-2 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
              disabled={
                summary.walletCardCount === 0 &&
                summary.transactionCount === 0 &&
                summary.benefitUsageCount === 0
              }
            >
              <Trash2 className="h-4 w-4" />
              {t("Delete All Data…")}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("Delete everything on {device}?", { device })}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t(
                  "{counts} will be removed. You can undo right after, but once you leave this page only an exported backup can bring them back.",
                  {
                    counts: formatCounts(
                      summary.walletCardCount,
                      summary.transactionCount,
                    ),
                  },
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("Keep My Data")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAll}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {t("Delete Everything")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SectionCard>

      <AlertDialog
        open={pendingImport !== null}
        onOpenChange={(open) => {
          if (!open) setPendingImport(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("Replace the data on {device}?", { device })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("Importing overwrites every wallet card, transaction, nickname, credit limit and benefit record saved here. A copy of the current data is kept for this visit so you can undo straight after.")}</AlertDialogDescription>
          </AlertDialogHeader>
          <dl className="grid gap-2 rounded-2xl bg-secondary/60 px-4 py-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">{t("Replacing")}</dt>
              <dd className="font-medium text-foreground">
                {formatCounts(
                  summary.walletCardCount,
                  summary.transactionCount,
                )}
              </dd>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">{t("With backup")}</dt>
              <dd className="font-medium text-foreground">
                {formatCounts(
                  pendingImport?.walletCardCount ?? null,
                  pendingImport?.transactionCount ?? null,
                )}
              </dd>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">{t("Backup exported")}</dt>
              <dd className="font-medium text-foreground">
                {pendingImport?.exportedAt
                  ? formatFullDate(pendingImport.exportedAt)
                  : t("Unknown date")}
              </dd>
            </div>
          </dl>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingImport) runImport(pendingImport);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("Replace Data")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
