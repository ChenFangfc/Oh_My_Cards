import { Link, useLocation } from "wouter";
import {
  Activity,
  CreditCard,
  Database,
  Settings,
  Sparkles,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/app-icon";
import { t } from "@/lib/i18n";
import { useAppUpdate } from "@/lib/app-update";

// Labels are English keys, translated where they render.
const NAV_ITEMS = [
  { href: "/wallet", label: "My Wallet", icon: Wallet },
  { href: "/suggest", label: "Smart Suggest", icon: Sparkles },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/cards", label: "Card Library", icon: CreditCard },
  { href: "/data", label: "Data", icon: Database },
];

interface SidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

function navItemClass(isActive: boolean) {
  return cn(
    "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-primary text-primary-foreground shadow-[var(--app-shadow-soft)]"
      : "text-sidebar-foreground/68 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  );
}

export function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  const [location] = useLocation();
  const pathname = location.split("?")[0];
  const { phase } = useAppUpdate();
  // A quiet dot on the gear while an update waits for the user.
  const updateWaiting =
    phase.kind === "available" ||
    phase.kind === "ready" ||
    phase.kind === "web-ready";
  const settingsActive = pathname === "/settings";

  return (
    <aside
      className={cn(
        "h-full w-64 flex-shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar",
        mobile ? "flex" : "hidden md:flex",
      )}
    >
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <h1 className="flex items-center gap-2 text-lg font-semibold text-sidebar-foreground">
          <AppIcon className="h-7 w-7 shadow-[var(--app-shadow-soft)]" />
          <span className="tracking-tight">Oh My Cards</span>
        </h1>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/wallet" && pathname === "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={onNavigate}
              className={navItemClass(isActive)}
            >
              <item.icon className="h-4 w-4" />
              {t(item.label)}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <Link
          href="/settings"
          aria-current={settingsActive ? "page" : undefined}
          onClick={onNavigate}
          className={navItemClass(settingsActive)}
        >
          <span className="relative flex">
            <Settings className="h-4 w-4" />
            {updateWaiting ? (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-500 ring-2",
                  settingsActive ? "ring-primary" : "ring-sidebar",
                )}
              />
            ) : null}
          </span>
          {t("Settings")}
          {updateWaiting ? (
            <span className="sr-only">{t("(update available)")}</span>
          ) : null}
        </Link>
      </div>
    </aside>
  );
}
