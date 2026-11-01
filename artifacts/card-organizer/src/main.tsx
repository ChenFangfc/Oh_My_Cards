import { Fragment, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import {
  initializeLocalDataStore,
  setUiTextTranslator,
} from "@workspace/api-client-react";
import App from "./App";
import { ErrorBoundary } from "@/components/error-boundary";
import {
  getAppView,
  installExternalLinkHandler,
  isDesktopApp,
} from "@/lib/desktop";
import { markWebUpdateReady } from "@/lib/app-update";
import { t, useLocale } from "@/lib/i18n";
import { capturePwaInstallPrompt } from "@/lib/pwa-install";
import "./index.css";

/**
 * Re-renders everything when the language changes. Strings are translated
 * as components render, so a fresh tree is the simplest way to get them all.
 */
function LocaleRoot({ children }: { children: ReactNode }) {
  const locale = useLocale();
  return <Fragment key={locale}>{children}</Fragment>;
}

function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LocaleRoot>{children}</LocaleRoot>
    </ThemeProvider>
  );
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !import.meta.env.PROD) return;
  // The desktop build ships its assets locally and serves them from a Tauri
  // scheme where registration always rejects.
  if (isDesktopApp()) return;

  const register = () => {
    let hasController = Boolean(navigator.serviceWorker.controller);

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!hasController) {
        hasController = true;
        return;
      }
      markWebUpdateReady();
    });

    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}service-worker.js`, {
        updateViaCache: "none",
      })
      .then((registration) => registration.update())
      .catch(() => {
        // Offline caching is an enhancement; the app runs fine without it.
      });
  };

  // This runs after `await initializeLocalDataStore()`, by which point `load`
  // has usually already fired — waiting for it unconditionally meant the
  // service worker never registered and the app was never actually offline
  // capable, despite advertising itself as such.
  if (document.readyState === "complete") {
    register();
  } else {
    window.addEventListener("load", register, { once: true });
  }
}

async function bootstrap() {
  // The browser offers installation once, early; keep it for Settings.
  capturePwaInstallPrompt();
  // Sentences the reward engine builds follow the UI language too.
  setUiTextTranslator(t);
  await initializeLocalDataStore();
  installExternalLinkHandler();
  const container = document.getElementById("root")!;

  // The desktop app's menu bar panel loads this same page in its own window.
  if (getAppView() === "quick") {
    document.documentElement.classList.add("quick-panel");
    if (isDesktopApp()) document.documentElement.classList.add("native-panel");
    const { default: QuickPanelRoot } = await import("./quick/quick-panel");
    createRoot(container).render(
      <Providers>
        <ErrorBoundary>
          <QuickPanelRoot />
        </ErrorBoundary>
      </Providers>,
    );
    return;
  }

  createRoot(container).render(
    <Providers>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Providers>,
  );

  registerServiceWorker();
}

void bootstrap();
