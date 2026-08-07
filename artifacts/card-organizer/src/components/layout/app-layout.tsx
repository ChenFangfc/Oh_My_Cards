import { ReactNode, useState } from "react";
import { Sidebar } from "./sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppIcon } from "@/components/app-icon";

export function AppLayout({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="h-14 shrink-0 border-b border-card-border flex items-center px-4 md:px-6 bg-card/95 backdrop-blur sticky top-0 z-10 md:hidden">
          <Sheet open={navOpen} onOpenChange={setNavOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 w-64"
              aria-describedby={undefined}
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Sidebar mobile onNavigate={() => setNavOpen(false)} />
            </SheetContent>
          </Sheet>
          <h1 className="font-semibold text-lg ml-4 flex items-center gap-2">
            <AppIcon className="h-7 w-7" />
            Oh My Cards
          </h1>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:p-6 md:pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
