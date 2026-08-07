import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-w-0 justify-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="w-full max-w-md border-card-border bg-card shadow-[var(--app-shadow-soft)]">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-foreground">
            <Compass aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              We couldn't find that page
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The link may be out of date. Your wallet, cards, and activity are
              all still here.
            </p>
          </div>
          <Link
            href="/wallet"
            className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Back to My Wallet
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
