import { useState } from "react";
import { cn } from "@/lib/utils";

type IssuerBrand = {
  name: string;
  bg: string;
  fg: string;
  abbr: string;
  match: (issuer: string) => boolean;
};

function resolvePublicAssetUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^(https?:|data:|blob:)/.test(url)) return url;
  if (url.startsWith("/")) {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    return `${base}${url}`;
  }
  return `${import.meta.env.BASE_URL}${url}`;
}

const ISSUER_BRANDS: IssuerBrand[] = [
  {
    name: "American Express",
    bg: "#016FD0",
    fg: "#fff",
    abbr: "AMEX",
    match: (issuer) => issuer.includes("american express"),
  },
  {
    name: "Bank of America",
    bg: "#E31837",
    fg: "#fff",
    abbr: "BofA",
    match: (issuer) => issuer.includes("bank of america"),
  },
  {
    name: "Capital One",
    bg: "#C8102E",
    fg: "#fff",
    abbr: "C1",
    match: (issuer) => issuer.includes("capital one"),
  },
  {
    name: "Wells Fargo",
    bg: "#D71E28",
    fg: "#fff",
    abbr: "WF",
    match: (issuer) => issuer.includes("wells fargo"),
  },
  {
    name: "Chase",
    bg: "#117ACA",
    fg: "#fff",
    abbr: "Chase",
    match: (issuer) => issuer.includes("chase"),
  },
  {
    name: "Citi",
    bg: "#003B84",
    fg: "#fff",
    abbr: "Citi",
    match: (issuer) => issuer.includes("citi"),
  },
  {
    name: "Discover",
    bg: "#F76529",
    fg: "#fff",
    abbr: "Disc",
    match: (issuer) => issuer.includes("discover"),
  },
  {
    name: "U.S. Bank",
    bg: "#003087",
    fg: "#fff",
    abbr: "USB",
    match: (issuer) => issuer.includes("us bank") || issuer.includes("u.s. bank"),
  },
  {
    name: "Barclays",
    bg: "#00AEEF",
    fg: "#fff",
    abbr: "Barc",
    match: (issuer) => issuer.includes("barclays"),
  },
  {
    name: "Fidelity",
    bg: "#00843D",
    fg: "#fff",
    abbr: "Fid",
    match: (issuer) => issuer.includes("fidelity") || issuer.includes("elan"),
  },
  {
    name: "SoFi",
    bg: "#00A6A6",
    fg: "#052E2E",
    abbr: "SoFi",
    match: (issuer) => issuer.includes("sofi"),
  },
  {
    name: "Venmo",
    bg: "#0074DE",
    fg: "#fff",
    abbr: "Venmo",
    match: (issuer) => issuer.includes("venmo"),
  },
  {
    name: "Alliant",
    bg: "#174A9C",
    fg: "#fff",
    abbr: "All",
    match: (issuer) => issuer.includes("alliant"),
  },
  {
    name: "Navy Federal",
    bg: "#003D5B",
    fg: "#fff",
    abbr: "NFCU",
    match: (issuer) => issuer.includes("navy federal"),
  },
  {
    name: "AAA",
    bg: "#C8102E",
    fg: "#fff",
    abbr: "AAA",
    match: (issuer) => issuer.includes("aaa"),
  },
  {
    name: "FNBO",
    bg: "#006847",
    fg: "#fff",
    abbr: "FNBO",
    match: (issuer) => issuer.includes("fnbo"),
  },
  {
    name: "PenFed",
    bg: "#003D79",
    fg: "#fff",
    abbr: "PenFed",
    match: (issuer) => issuer.includes("penfed"),
  },
  {
    name: "Bread Financial",
    bg: "#3F1A78",
    fg: "#fff",
    abbr: "Bread",
    match: (issuer) => issuer.includes("bread financial"),
  },
  {
    name: "Verizon",
    bg: "#111111",
    fg: "#fff",
    abbr: "VZ",
    match: (issuer) => issuer.includes("verizon"),
  },
  {
    name: "Lowe's",
    bg: "#004990",
    fg: "#fff",
    abbr: "Lowe's",
    match: (issuer) => issuer.includes("lowe"),
  },
  {
    name: "PNC",
    bg: "#F06400",
    fg: "#fff",
    abbr: "PNC",
    match: (issuer) => issuer.includes("pnc"),
  },
  {
    name: "TD",
    bg: "#008A00",
    fg: "#fff",
    abbr: "TD",
    match: (issuer) => issuer.includes("td bank") || issuer.includes("td canada"),
  },
  {
    name: "RBC",
    bg: "#0051A5",
    fg: "#fff",
    abbr: "RBC",
    match: (issuer) => issuer.includes("rbc"),
  },
  {
    name: "Scotiabank",
    bg: "#EC111A",
    fg: "#fff",
    abbr: "Scotia",
    match: (issuer) => issuer.includes("scotiabank"),
  },
  {
    name: "BMO",
    bg: "#0075BE",
    fg: "#fff",
    abbr: "BMO",
    match: (issuer) => issuer.includes("bmo"),
  },
  {
    name: "CIBC",
    bg: "#A40046",
    fg: "#fff",
    abbr: "CIBC",
    match: (issuer) => issuer.includes("cibc"),
  },
  {
    name: "Rogers Bank",
    bg: "#DA291C",
    fg: "#fff",
    abbr: "Rogers",
    match: (issuer) => issuer.includes("rogers"),
  },
  {
    name: "MBNA",
    bg: "#007A33",
    fg: "#fff",
    abbr: "MBNA",
    match: (issuer) => issuer.includes("mbna"),
  },
  {
    name: "National Bank",
    bg: "#E31B23",
    fg: "#fff",
    abbr: "NBC",
    match: (issuer) => issuer.includes("national bank"),
  },
  {
    name: "Apple",
    bg: "#222222",
    fg: "#fff",
    abbr: "Apple",
    match: (issuer) => issuer.includes("apple") || issuer.includes("goldman sachs"),
  },
  {
    name: "Robinhood",
    bg: "#00C805",
    fg: "#001B00",
    abbr: "RH",
    match: (issuer) => issuer.includes("robinhood"),
  },
  {
    name: "PayPal",
    bg: "#003087",
    fg: "#fff",
    abbr: "PayPal",
    match: (issuer) => issuer.includes("paypal") || issuer.includes("synchrony"),
  },
  {
    name: "Bilt",
    bg: "#111827",
    fg: "#fff",
    abbr: "Bilt",
    match: (issuer) => issuer.includes("bilt"),
  },
  {
    name: "BECU",
    bg: "#006747",
    fg: "#fff",
    abbr: "BECU",
    match: (issuer) => issuer.includes("becu"),
  },
  {
    name: "HSBC",
    bg: "#DB0011",
    fg: "#fff",
    abbr: "HSBC",
    match: (issuer) => issuer.includes("hsbc"),
  },
  {
    name: "Standard Chartered",
    bg: "#0473EA",
    fg: "#fff",
    abbr: "SC",
    match: (issuer) => issuer.includes("standard chartered"),
  },
  {
    name: "Hang Seng",
    bg: "#005EB8",
    fg: "#fff",
    abbr: "HSB",
    match: (issuer) => issuer.includes("hang seng"),
  },
  {
    name: "DBS",
    bg: "#C8102E",
    fg: "#fff",
    abbr: "DBS",
    match: (issuer) => issuer.includes("dbs"),
  },
  {
    name: "UOB",
    bg: "#005EB8",
    fg: "#fff",
    abbr: "UOB",
    match: (issuer) => issuer.includes("uob") || issuer.includes("united overseas bank"),
  },
  {
    name: "OCBC",
    bg: "#D71920",
    fg: "#fff",
    abbr: "OCBC",
    match: (issuer) => issuer.includes("ocbc"),
  },
];

function resolveIssuerBrand(issuer: string): IssuerBrand | null {
  const normalized = issuer.toLowerCase();
  return ISSUER_BRANDS.find((brand) => brand.match(normalized)) ?? null;
}

interface BankLogoProps {
  /**
   * Kept for call-site compatibility only. Issuer artwork is drawn locally so
   * that browsing the catalog never discloses which issuers a user is looking
   * at to a third-party logo host, and so logos still render offline.
   */
  logoUrl?: string | null;
  issuer: string;
  size?: "sm" | "md";
  className?: string;
}

export function BankLogo({ issuer, size = "md", className }: BankLogoProps) {
  const brand = resolveIssuerBrand(issuer);
  const dim = size === "sm" ? "h-6 w-6 text-[9px]" : "h-8 w-8 text-[10px]";

  if (brand) {
    return (
      <div
        role="img"
        aria-label={`${brand.name} logo`}
        className={cn(
          dim,
          "shrink-0 rounded-md flex items-center justify-center font-bold tracking-tight leading-none ring-1 ring-black/5",
          className,
        )}
        style={{ backgroundColor: brand.bg, color: brand.fg }}
      >
        {brand.abbr.length <= 3 ? (
          <span className={size === "sm" ? "text-[10px]" : "text-xs"}>{brand.abbr}</span>
        ) : (
          <span className="text-[8px] font-extrabold">{brand.abbr}</span>
        )}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${issuer} logo`}
      className={cn(
        dim,
        "shrink-0 rounded-md bg-white/20 flex items-center justify-center text-white font-bold backdrop-blur-sm border border-white/30",
        className,
      )}
    >
      <span className="text-xs">{issuer.slice(0, 2).toUpperCase()}</span>
    </div>
  );
}

export function IssuerBrandChip({ issuer }: BankLogoProps) {
  return (
    <BankLogo
      issuer={issuer}
      size="md"
      className="h-8 w-8 rounded-sm shadow-sm ring-1 ring-black/10"
    />
  );
}

export function NetworkBadge({ network }: { network: string }) {
  return (
    <span className="inline-flex h-7 shrink-0 items-center rounded-md border border-white/45 bg-white/85 px-2 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur-md dark:bg-slate-950/70 dark:text-slate-100">
      {network}
    </span>
  );
}

interface CardArtProps {
  cardImageUrl?: string | null;
  color?: string | null;
  alt: string;
  className?: string;
  imageClassName?: string;
  imageBackground?: string;
  /** Rendered when the card image fails to load or isn't provided. */
  fallback: React.ReactNode;
  /**
   * Issuer + network info rendered as a floating top-row badge ALWAYS,
   * whether the image loads or not. Provides consistent branding on
   * every card.
   */
  issuer?: string;
  /** @see BankLogoProps.logoUrl — accepted for call-site compatibility, never fetched. */
  logoUrl?: string | null;
  network?: string;
}

/**
 * Displays the actual credit card product image when available,
 * falling back to the gradient + branded badge layout otherwise.
 * The bank logo + network badge always appear in the top corners
 * (over a subtle scrim) so cards are identifiable at a glance.
 */
export function CardArt({
  cardImageUrl,
  color,
  alt,
  className = "",
  imageClassName,
  imageBackground = "#0f172a",
  fallback,
  issuer,
  network,
}: CardArtProps) {
  // Tracks the URL that failed rather than a boolean, so a later card rendered
  // by the same component instance still gets a chance to load its own art.
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const resolvedCardImageUrl = resolvePublicAssetUrl(cardImageUrl);
  const showImage =
    resolvedCardImageUrl && resolvedCardImageUrl !== failedImageUrl;
  const showOverlayBadges = showImage && (issuer || network);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: showImage
          ? imageBackground
          : color || "linear-gradient(135deg, #1e3a5f, #2d6a9f)",
      }}
    >
      {showImage ? (
        <img
          src={resolvedCardImageUrl}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailedImageUrl(resolvedCardImageUrl)}
          className={cn(
            "absolute inset-0 h-full w-full object-contain p-3 drop-shadow-md",
            imageClassName,
          )}
        />
      ) : (
        fallback
      )}
      {showOverlayBadges && (
        <div className="absolute inset-x-0 top-0 p-3 z-10 pointer-events-none">
          <div className="relative flex items-start justify-between gap-3">
            {issuer ? (
              <IssuerBrandChip issuer={issuer} />
            ) : (
              <span />
            )}
            {network ? <NetworkBadge network={network} /> : null}
          </div>
        </div>
      )}
    </div>
  );
}
