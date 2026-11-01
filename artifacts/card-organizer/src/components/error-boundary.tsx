import { Component, type ReactNode } from "react";
import { resetDownloadedCardRules } from "@workspace/api-client-react";
import { t } from "@/lib/i18n";

interface ErrorBoundaryState {
  failed: boolean;
}

/**
 * Without this, a render error anywhere leaves a blank window with no way out
 * (release builds have no devtools). The user's data is untouched either way.
 * Downloaded card rules are the one input that changes without an app update,
 * so they get their own reset.
 */
export class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  private resetCardRules = () => {
    try {
      resetDownloadedCardRules();
    } catch {
      // Reload regardless: built-in rules still apply if the reset failed.
    }
    window.location.reload();
  };

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div
        role="alert"
        className="flex min-h-dvh items-center justify-center bg-background p-6 text-foreground"
      >
        <div className="max-w-sm space-y-4 text-center">
          <h1 className="text-lg font-semibold">{t("Something went wrong")}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t(
              "Your data is still on this device. Reload to try again; if this keeps happening, reset the downloaded card rules.",
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t("Reload")}
            </button>
            <button
              type="button"
              onClick={this.resetCardRules}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-4 text-sm font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t("Reset card rules")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
