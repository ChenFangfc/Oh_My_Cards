import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { refreshLocalCaches } from "@workspace/api-client-react";
import {
  announceDataChanged,
  applyStoredQuickShortcut,
  isDesktopApp,
  isMenuBarEnabled,
  onDataChangedElsewhere,
  onDesktopEvent,
  setMenuBarEnabled,
  setNativeMenuLabels,
} from "@/lib/desktop";
import { startAppUpdateChecks } from "@/lib/app-update";
import { onLocaleChange, t, useLocale } from "@/lib/i18n";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppLayout } from "@/components/layout/app-layout";
import Cards from "@/pages/cards";
import Wallet from "@/pages/wallet";
import Activity from "@/pages/activity";
import Suggest from "@/pages/suggest";
import Data from "@/pages/data";
import Settings from "@/pages/settings";
import { CardRulesUpdater } from "@/components/card-rules-updater";
import { UpdatePrompt } from "@/components/update-prompt";
import { useTheme } from "next-themes";

/**
 * Every view is derived from one local state, so a change made anywhere can
 * move numbers everywhere: a new choice category re-prices past transactions,
 * which moves the dashboard totals, which moves the annual-fee progress.
 * Invalidating per call site kept missing one of those, so any successful
 * write refreshes every local query. They are synchronous and cheap.
 */
const queryClient: QueryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.readOnly) return;
      void queryClient.invalidateQueries({ queryKey: ["local"] });
      // The menu bar panel is a separate webview with its own caches.
      announceDataChanged();
    },
  }),
});

// Some cached results carry sentences built in the old language.
onLocaleChange(() => void queryClient.invalidateQueries());

function RedirectTo({ to }: { to: string }) {
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);

  return null;
}

function RedirectToWallet() {
  return <RedirectTo to="/wallet" />;
}

function RedirectToActivity() {
  return <RedirectTo to="/activity" />;
}

function RedirectToActivityTransactions() {
  return <RedirectTo to="/activity" />;
}

/**
 * The browser chrome follows the app's theme, not just the OS: choosing Dark
 * on a light-mode Mac left a light title bar over a dark app.
 */
function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const color = resolvedTheme === "dark" ? "#121921" : "#F7F4EE";
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.removeAttribute("media");
      meta.setAttribute("content", color);
    }
  }, [resolvedTheme]);

  return null;
}

/**
 * Keeps the main window in step with the menu bar panel: a purchase logged
 * there shows up here, and the panel's links open the right page here.
 */
function DesktopBridge() {
  const [, navigate] = useLocation();
  const client = useQueryClient();
  const locale = useLocale();

  // Native menus are drawn by macOS, outside the webview.
  useEffect(() => {
    void setNativeMenuLabels({
      open: t("Open Oh My Cards"),
      quick: t("Quick Log…"),
      quit: t("Quit Oh My Cards"),
      settings: t("Settings…"),
    }).catch(() => {
      // Labels stay in English.
    });
  }, [locale]);

  useEffect(() => startAppUpdateChecks(), []);

  useEffect(() => {
    if (!isDesktopApp()) return;
    void setMenuBarEnabled(isMenuBarEnabled()).catch(() => {
      // The menu bar icon is optional.
    });
    void applyStoredQuickShortcut();
    const stopNavigate = onDesktopEvent<string>("navigate", (path) => {
      if (typeof path === "string" && path.startsWith("/")) navigate(path);
    });
    const stopChanged = onDataChangedElsewhere(() => {
      refreshLocalCaches();
      void client.invalidateQueries({ queryKey: ["local"] });
    });
    return () => {
      stopNavigate();
      stopChanged();
    };
  }, [client, navigate]);

  return null;
}

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Wallet} />
        <Route path="/dashboard" component={RedirectToWallet} />
        <Route path="/cards" component={Cards} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/activity" component={Activity} />
        <Route path="/data" component={Data} />
        <Route path="/settings" component={Settings} />
        <Route path="/transactions" component={RedirectToActivityTransactions} />
        <Route path="/analytics" component={RedirectToActivity} />
        <Route path="/suggest" component={Suggest} />
        <Route path="/benefits" component={RedirectToWallet} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
          <DesktopBridge />
        </WouterRouter>
        <CardRulesUpdater />
        <ThemeColorSync />
        <UpdatePrompt />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
