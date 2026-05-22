import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppLayout } from "@/components/layout/app-layout";
import Cards from "@/pages/cards";
import Wallet from "@/pages/wallet";
import Activity from "@/pages/activity";
import Suggest from "@/pages/suggest";
import Data from "@/pages/data";
import { AppUpdateDialog } from "@/components/app-update-dialog";
import { CardRulesUpdater } from "@/components/card-rules-updater";

const queryClient = new QueryClient();

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
        </WouterRouter>
        <CardRulesUpdater />
        <AppUpdateDialog />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
