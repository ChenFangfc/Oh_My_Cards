import { useState } from "react";
import { Download, RotateCw, Sparkles, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  checkForAppUpdate,
  dismissUpdatePrompt,
  installAppUpdate,
  restartToUpdate,
  useAppUpdate,
} from "@/lib/app-update";
import { t } from "@/lib/i18n";

/**
 * A small card that floats in from the bottom of the content area when an
 * update needs the user: to say yes (automatic updates off), or to restart
 * once one is installed. Background downloads stay silent.
 *
 * It sits at the left of the content area so it never covers toasts, which
 * stack at the bottom right.
 */
export function UpdatePrompt() {
  const { phase, dismissedFor } = useAppUpdate();
  // Progress and failures only show for a download started from this card.
  const [following, setFollowing] = useState(false);

  const key =
    phase.kind === "available" || phase.kind === "downloading"
      ? phase.update.version
      : phase.kind === "ready"
        ? phase.version
        : phase.kind === "web-ready"
          ? "web"
          : null;
  if (key !== null && key === dismissedFor) return null;

  let icon = <Sparkles className="h-4 w-4" />;
  let title: string;
  let body: string;
  let primary: { label: string; onClick: () => void } | null = null;
  let progress: number | null = null;

  switch (phase.kind) {
    case "available":
      icon = <Download className="h-4 w-4" />;
      title = t("Update available");
      body = t("Oh My Cards {version} is ready to download.", {
        version: phase.update.version,
      });
      primary = {
        label: t("Update"),
        onClick: () => {
          setFollowing(true);
          void installAppUpdate();
        },
      };
      break;
    case "downloading":
      if (!following) return null;
      icon = <Download className="h-4 w-4" />;
      title = t("Downloading update…");
      body = t("You can keep working; this takes a moment.");
      progress =
        phase.total && phase.total > 0
          ? Math.min(100, (phase.received / phase.total) * 100)
          : null;
      break;
    case "ready":
      icon = <RotateCw className="h-4 w-4" />;
      title = t("Update ready");
      body = t("Restart to finish updating to {version}. Your data stays as it is.", {
        version: phase.version,
      });
      primary = { label: t("Restart Now"), onClick: () => void restartToUpdate() };
      break;
    case "web-ready":
      title = t("New version available");
      body = t("Reload to start using it.");
      primary = { label: t("Reload"), onClick: () => void restartToUpdate() };
      break;
    case "error":
      if (!following) return null;
      icon = <TriangleAlert className="h-4 w-4" />;
      title = t("Update failed");
      body = phase.message;
      primary = {
        label: t("Try Again"),
        onClick: () => void checkForAppUpdate({ manual: true }),
      };
      break;
    default:
      return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 animate-in fade-in slide-in-from-bottom-2 duration-300 sm:inset-x-auto sm:left-4 sm:w-[22rem] md:left-[calc(16rem+1.5rem)]"
    >
      <div className="rounded-2xl border border-card-border bg-card p-4 text-card-foreground shadow-[var(--app-shadow-card)]">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-5">{title}</p>
            <p className="mt-0.5 text-pretty text-[13px] leading-5 text-muted-foreground">
              {body}
            </p>
            {phase.kind === "downloading" ? (
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={
                    progress === null
                      ? "h-full w-1/3 animate-pulse rounded-full bg-primary"
                      : "h-full rounded-full bg-primary transition-[width] duration-300"
                  }
                  style={progress === null ? undefined : { width: `${progress}%` }}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setFollowing(false);
              // Hiding the progress must not also hide "ready" for this version.
              if (phase.kind !== "downloading") dismissUpdatePrompt();
            }}
          >
            {phase.kind === "downloading" ? t("Hide") : t("Later")}
          </Button>
          {primary ? (
            <Button size="sm" onClick={primary.onClick}>
              {primary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
