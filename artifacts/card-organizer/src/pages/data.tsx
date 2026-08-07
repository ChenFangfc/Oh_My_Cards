import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getCurrentRuleSetVersion,
  getLocalDataStorageSummary,
  importLocalDataBackup,
  serializeLocalDataBackup,
  useListCards,
  type LocalDataBackup,
} from "@workspace/api-client-react";
import {
  Database,
  Download,
  HardDrive,
  ShieldCheck,
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

type SaveFileHandle = {
  createWritable: () => Promise<{
    write: (data: Blob | string) => Promise<void>;
    close: () => Promise<void>;
  }>;
};

type OpenFileHandle = {
  getFile: () => Promise<File>;
};

type FilePickerWindow = Window & {
  showSaveFilePicker?: (options?: {
    suggestedName?: string;
    types?: Array<{
      description: string;
      accept: Record<string, string[]>;
    }>;
  }) => Promise<SaveFileHandle>;
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

function backupFileName(): string {
  return `oh-my-cards-backup-${new Date().toISOString().slice(0, 10)}.json`;
}

function filePickerOptions() {
  return {
    types: [
      {
        description: "Oh My Cards Backup",
        accept: {
          "application/json": [".json"],
        },
      },
    ],
  };
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
    throw new Error("Backup file is not valid JSON.");
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

function formatCounts(
  cards: number | null,
  transactions: number | null,
  separator = " · ",
): string {
  if (cards === null || transactions === null) return "Unknown contents";
  const cardLabel = cards === 1 ? "card" : "cards";
  const transactionLabel = transactions === 1 ? "transaction" : "transactions";
  return `${cards} ${cardLabel}${separator}${transactions.toLocaleString("en-US")} ${transactionLabel}`;
}

export default function Data() {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [summary, setSummary] = useState(() => getLocalDataStorageSummary());
  const [pendingImport, setPendingImport] = useState<PendingImport | null>(null);
  const [undoSnapshot, setUndoSnapshot] = useState<string | null>(null);

  const catalogQuery = useListCards();
  const ruleSetVersion = getCurrentRuleSetVersion();

  const refreshData = () => {
    setSummary(getLocalDataStorageSummary());
    void queryClient.invalidateQueries();
  };

  const downloadBackupFile = () => {
    const backup = serializeLocalDataBackup();
    const blob = new Blob([backup], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = backupFileName();
    document.body.append(anchor);
    anchor.click();
    // Firefox/Safari start the transfer after the click handler returns, so the
    // object URL has to outlive this tick or the download is cancelled.
    window.setTimeout(() => {
      anchor.remove();
      URL.revokeObjectURL(url);
    }, 60_000);
  };

  const restoreSnapshot = (snapshot: string) => {
    try {
      importLocalDataBackup(snapshot);
      setUndoSnapshot(null);
      refreshData();
      toast({
        title: "Import undone",
        description: "The data from before the import is back in this browser.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Undo failed",
        description:
          error instanceof Error
            ? error.message
            : "Could not restore the previous data.",
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
        " and ",
      );
      toast({
        title: "Backup imported",
        description: exportedAt
          ? `Restored ${counts}, exported on ${exportedAt.toLocaleDateString()}.`
          : `Restored ${counts}.`,
        action: (
          <ToastAction
            altText="Undo this import"
            onClick={() => restoreSnapshot(snapshot)}
          >
            Undo
          </ToastAction>
        ),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Import failed",
        description:
          error instanceof Error ? error.message : "Could not read backup file.",
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
        title: "Import failed",
        description:
          error instanceof Error
            ? error.message
            : "Could not read backup file.",
      });
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleExportBackup = async () => {
    const picker = window as FilePickerWindow;
    if (!picker.showSaveFilePicker) {
      downloadBackupFile();
      toast({ title: "Backup exported" });
      return;
    }

    try {
      const handle = await picker.showSaveFilePicker({
        suggestedName: backupFileName(),
        ...filePickerOptions(),
      });
      const writable = await handle.createWritable();
      await writable.write(
        new Blob([serializeLocalDataBackup()], { type: "application/json" }),
      );
      await writable.close();
      toast({ title: "Backup exported" });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast({
        variant: "destructive",
        title: "Save failed",
        description:
          error instanceof Error ? error.message : "Could not save local file.",
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
        ...filePickerOptions(),
      });
      const file = await handle.getFile();
      setPendingImport(readBackupPreview(await file.text()));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast({
        variant: "destructive",
        title: "Load failed",
        description:
          error instanceof Error ? error.message : "Could not load local file.",
      });
    }
  };

  const catalogCount = catalogQuery.isError ? (
    "Unavailable"
  ) : catalogQuery.data ? (
    `${catalogQuery.data.length.toLocaleString("en-US")} cards`
  ) : (
    <Skeleton className="h-4 w-20" />
  );

  const storageRows: Array<{ label: string; value: React.ReactNode }> = [
    {
      label: "Card rules version",
      value: summary.hasCatalogOverride
        ? `${ruleSetVersion} (updated rules)`
        : `${ruleSetVersion} (built-in rules)`,
    },
    { label: "Card catalog", value: catalogCount },
    {
      label: "Wallet cards",
      value: summary.walletCardCount.toLocaleString("en-US"),
    },
    {
      label: "Transactions",
      value: summary.transactionCount.toLocaleString("en-US"),
    },
    {
      label: "Benefits marked used",
      value: `${summary.usedBenefitCount.toLocaleString("en-US")} of ${summary.benefitUsageCount.toLocaleString("en-US")}`,
    },
    {
      label: "Storage",
      value: `${summary.storageKey} · IndexedDB ${summary.databaseName}`,
    },
  ];

  return (
    <div className="max-w-3xl space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight md:text-[28px]">
            <Database className="h-6 w-6 text-foreground" />
            Data
          </h2>
          <p className="mt-1 text-muted-foreground">
            Manage the private data saved in this browser.
          </p>
        </div>
      </div>

      <Card className="shadow-[var(--app-shadow-soft)]">
        <CardContent className="p-5 md:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base font-semibold text-foreground">
                Backup & Restore
              </div>
              <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                Export a local JSON backup, or import one you saved earlier.
                Your app data stays in this browser unless you export it.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button
                  onClick={handleExportBackup}
                  className="justify-start gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
                <Button
                  variant="outline"
                  onClick={() => void handleImportBackup()}
                  className="justify-start gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Import Data
                </Button>
              </div>
            </div>
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
          <div className="mt-5 rounded-2xl bg-secondary/60 px-4 py-3 text-sm leading-6 text-muted-foreground">
            Data is saved locally through browser storage. Importing a backup
            replaces the data currently stored in this browser.
          </div>
          {undoSnapshot ? (
            <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-card-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-muted-foreground">
                The data replaced by the last import is still available until
                you leave this page.
              </p>
              <Button
                variant="outline"
                onClick={() => restoreSnapshot(undoSnapshot)}
                className="shrink-0 justify-start gap-2"
              >
                <Undo2 className="h-4 w-4" />
                Undo import
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card className="shadow-[var(--app-shadow-soft)]">
        <CardContent className="p-5 md:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-foreground">
              <HardDrive className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base font-semibold text-foreground">
                What is stored here
              </div>
              <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                The card rules and the data this browser holds right now.
              </p>
              <dl className="mt-5 divide-y divide-card-border text-sm">
                {storageRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2"
                  >
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="min-w-0 break-words text-right font-medium tabular-nums text-foreground">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={pendingImport !== null}
        onOpenChange={(open) => {
          if (!open) setPendingImport(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Replace the data in this browser?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Importing overwrites every wallet card, transaction, nickname,
              credit limit and benefit record saved here. A copy of the current
              data is kept for this visit so you can undo straight after.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <dl className="grid gap-2 rounded-2xl bg-secondary/60 px-4 py-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">Replacing</dt>
              <dd className="font-medium text-foreground">
                {formatCounts(
                  summary.walletCardCount,
                  summary.transactionCount,
                )}
              </dd>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">With backup</dt>
              <dd className="font-medium text-foreground">
                {formatCounts(
                  pendingImport?.walletCardCount ?? null,
                  pendingImport?.transactionCount ?? null,
                )}
              </dd>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">Backup exported</dt>
              <dd className="font-medium text-foreground">
                {pendingImport?.exportedAt
                  ? pendingImport.exportedAt.toLocaleDateString()
                  : "Unknown date"}
              </dd>
            </div>
          </dl>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingImport) runImport(pendingImport);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Replace Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
