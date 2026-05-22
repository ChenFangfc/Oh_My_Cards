import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  importLocalDataBackup,
  serializeLocalDataBackup,
} from "@workspace/api-client-react";
import { Database, Download, ShieldCheck, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export default function Data() {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const refreshData = () => {
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
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const importBackupText = async (text: string) => {
    const backup = importLocalDataBackup(text);
    refreshData();
    toast({
      title: "Backup imported",
      description: `Restored data exported on ${new Date(backup.exportedAt).toLocaleDateString()}.`,
    });
  };

  const handleImportUpload = async (file: File | undefined) => {
    if (!file) return;

    try {
      await importBackupText(await file.text());
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
      await importBackupText(await file.text());
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
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary-dark">
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
          <div className="mt-5 rounded-2xl bg-[var(--color-surface-warm)] px-4 py-3 text-sm leading-6 text-muted-foreground">
            Data is saved locally through browser storage. Importing a backup
            replaces the data currently stored in this browser.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
