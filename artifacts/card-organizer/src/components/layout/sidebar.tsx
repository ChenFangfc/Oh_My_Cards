import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Activity,
  CreditCard,
  Database,
  Download,
  Wallet,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/app-icon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NAV_ITEMS = [
  { href: "/wallet", label: "My Wallet", icon: Wallet },
  { href: "/suggest", label: "Smart Suggest", icon: Sparkles },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/cards", label: "Card Library", icon: CreditCard },
  { href: "/data", label: "Data", icon: Database },
];

interface SidebarProps {
  mobile?: boolean;
}

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandaloneApp() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator &&
      Boolean(
        (window.navigator as Navigator & { standalone?: boolean }).standalone,
      ))
  );
}

export function Sidebar({ mobile = false }: SidebarProps) {
  const [location] = useLocation();
  const { toast } = useToast();
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const pathname = location.split("?")[0];

  useEffect(() => {
    setIsStandalone(isStandaloneApp());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => {
      setInstallPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (isStandalone) return;

    if (!installPrompt) {
      toast({
        title: "Install from your browser",
        description:
          "Use the install icon in the address bar if it is available.",
      });
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setInstallPrompt(null);
      setIsStandalone(true);
    }
  };

  return (
    <aside
      className={cn(
        "h-screen w-64 flex-shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar",
        mobile ? "flex" : "hidden md:flex",
      )}
    >
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <h1 className="font-semibold text-lg text-sidebar-foreground flex items-center gap-2">
          <AppIcon className="h-7 w-7 shadow-[var(--app-shadow-soft)]" />
          <span className="tracking-tight">Oh My Cards</span>
        </h1>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/wallet" && pathname === "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-[var(--app-shadow-soft)]"
                  : "text-sidebar-foreground/68 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <Button
          type="button"
          variant={isStandalone ? "secondary" : "outline"}
          onClick={() => void handleInstall()}
          disabled={isStandalone}
          className="w-full justify-start gap-2 rounded-xl"
        >
          <Download className="h-4 w-4" />
          {isStandalone ? "Installed" : "Install App"}
        </Button>
      </div>
    </aside>
  );
}
