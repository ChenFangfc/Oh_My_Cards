import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppIcon } from "@/components/app-icon";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="h-14 shrink-0 border-b border-card-border flex items-center px-4 md:px-6 bg-card/95 backdrop-blur sticky top-0 z-10 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar mobile />
            </SheetContent>
          </Sheet>
          <h1 className="font-semibold text-lg ml-4 flex items-center gap-2">
            <AppIcon className="h-7 w-7" />
            Oh My Cards
          </h1>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
