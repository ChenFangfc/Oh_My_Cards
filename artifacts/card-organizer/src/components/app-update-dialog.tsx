import { useEffect, useState } from "react";
import { check, type Update } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const SKIPPED_VERSION_KEY = "oh-my-card:update-skipped-version";

type UpdateState =
  | { status: "idle" }
  | { status: "available"; update: Update }
  | { status: "downloading"; update: Update; progress: number | null }
  | { status: "error"; message: string };

function isTauriRuntime(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

export function AppUpdateDialog() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<UpdateState>({ status: "idle" });

  useEffect(() => {
    if (!isTauriRuntime()) return;

    let cancelled = false;

    async function checkForUpdate() {
      try {
        const update = await check({ target: "macos-universal" });
        if (!update || cancelled) return;

        const skippedVersion = localStorage.getItem(SKIPPED_VERSION_KEY);
        if (skippedVersion === update.version) return;

        setState({ status: "available", update });
        setOpen(true);
      } catch {
        // Update checks should never block the local app.
      }
    }

    void checkForUpdate();

    return () => {
      cancelled = true;
    };
  }, []);

  const update =
    state.status === "available" || state.status === "downloading"
      ? state.update
      : null;

  const handleUpdate = async () => {
    if (!update) return;

    try {
      let downloaded = 0;
      let total = 0;
      setState({ status: "downloading", update, progress: null });

      await update.downloadAndInstall((event) => {
        if (event.event === "Started") {
          total = event.data.contentLength ?? 0;
          setState({ status: "downloading", update, progress: total > 0 ? 0 : null });
        }
        if (event.event === "Progress") {
          downloaded += event.data.chunkLength;
          setState({
            status: "downloading",
            update,
            progress: total > 0 ? Math.min(100, (downloaded / total) * 100) : null,
          });
        }
        if (event.event === "Finished") {
          setState({ status: "downloading", update, progress: 100 });
        }
      });

      await relaunch();
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Update failed.",
      });
    }
  };

  const handleSkipVersion = () => {
    if (update) localStorage.setItem(SKIPPED_VERSION_KEY, update.version);
    setOpen(false);
  };

  if (!update && state.status !== "error") return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {state.status === "error" ? "Update failed" : "Update available"}
          </DialogTitle>
          <DialogDescription>
            {state.status === "error"
              ? state.message
              : `Version ${update?.version} is ready to install.`}
          </DialogDescription>
        </DialogHeader>

        {update?.body && (
          <div className="rounded-md border bg-muted/40 p-3 text-sm whitespace-pre-wrap max-h-48 overflow-auto">
            {update.body}
          </div>
        )}

        {state.status === "downloading" && (
          <div className="space-y-2">
            <Progress value={state.progress ?? undefined} />
            <p className="text-xs text-muted-foreground">
              {state.progress == null
                ? "Downloading update..."
                : `${Math.round(state.progress)}% downloaded`}
            </p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          {state.status === "error" ? (
            <Button onClick={() => setOpen(false)}>Close</Button>
          ) : (
            <>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={state.status === "downloading"}
              >
                Ignore
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSkipVersion}
                disabled={state.status === "downloading"}
              >
                Skip this version
              </Button>
              <Button
                type="button"
                onClick={handleUpdate}
                disabled={state.status === "downloading"}
              >
                Update
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
