import { useState } from "react";
import { cn } from "@/lib/utils";

type IssuerBrand = {
  name: string;
  bg: string;
  fg: string;
  abbr: string;
  logoUrl: string;
  logoNeedsBacking?: boolean;
  match: (issuer: string) => boolean;
};

function brandLogo(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

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
    logoUrl: brandLogo("americanexpress.com"),
    logoNeedsBacking: false,
    match: (issuer) => issuer.includes("american express"),
  },
  {
    name: "Bank of America",
    bg: "#E31837",
    fg: "#fff",
    abbr: "BofA",
    logoUrl: brandLogo("bankofamerica.com"),
    match: (issuer) => issuer.includes("bank of america"),
  },
  {
    name: "Capital One",
    bg: "#C8102E",
    fg: "#fff",
    abbr: "C1",
    logoUrl: brandLogo("www.capitalone.com"),
    match: (issuer) => issuer.includes("capital one"),
  },
  {
    name: "Wells Fargo",
    bg: "#D71E28",
    fg: "#fff",
    abbr: "WF",
    logoUrl: brandLogo("wellsfargo.com"),
    logoNeedsBacking: false,
    match: (issuer) => issuer.includes("wells fargo"),
  },
  {
    name: "Chase",
    bg: "#117ACA",
    fg: "#fff",
    abbr: "Chase",
    logoUrl: brandLogo("chase.com"),
    match: (issuer) => issuer.includes("chase"),
  },
  {
    name: "Citi",
    bg: "#003B84",
    fg: "#fff",
    abbr: "Citi",
    logoUrl: brandLogo("citi.com"),
    match: (issuer) => issuer.includes("citi"),
  },
  {
    name: "Discover",
    bg: "#F76529",
    fg: "#fff",
    abbr: "Disc",
    logoUrl: brandLogo("discover.com"),
    match: (issuer) => issuer.includes("discover"),
  },
  {
    name: "U.S. Bank",
    bg: "#003087",
    fg: "#fff",
    abbr: "USB",
    logoUrl: brandLogo("usbank.com"),
    match: (issuer) => issuer.includes("us bank") || issuer.includes("u.s. bank"),
  },
  {
    name: "Barclays",
    bg: "#00AEEF",
    fg: "#fff",
    abbr: "Barc",
    logoUrl: brandLogo("barclaycardus.com"),
    match: (issuer) => issuer.includes("barclays"),
  },
  {
    name: "Fidelity",
    bg: "#00843D",
    fg: "#fff",
    abbr: "Fid",
    logoUrl: brandLogo("fidelity.com"),
    match: (issuer) => issuer.includes("fidelity") || issuer.includes("elan"),
  },
  {
    name: "SoFi",
    bg: "#00A6A6",
    fg: "#052E2E",
    abbr: "SoFi",
    logoUrl: brandLogo("sofi.com"),
    match: (issuer) => issuer.includes("sofi"),
  },
  {
    name: "Venmo",
    bg: "#0074DE",
    fg: "#fff",
    abbr: "Venmo",
    logoUrl: brandLogo("venmo.com"),
    match: (issuer) => issuer.includes("venmo"),
  },
  {
    name: "Alliant",
    bg: "#174A9C",
    fg: "#fff",
    abbr: "All",
    logoUrl: brandLogo("alliantcreditunion.org"),
    match: (issuer) => issuer.includes("alliant"),
  },
  {
    name: "Navy Federal",
    bg: "#003D5B",
    fg: "#fff",
    abbr: "NFCU",
    logoUrl: brandLogo("navyfederal.org"),
    match: (issuer) => issuer.includes("navy federal"),
  },
  {
    name: "AAA",
    bg: "#C8102E",
    fg: "#fff",
    abbr: "AAA",
    logoUrl: brandLogo("aaa.com"),
    match: (issuer) => issuer.includes("aaa"),
  },
  {
    name: "FNBO",
    bg: "#006847",
    fg: "#fff",
    abbr: "FNBO",
    logoUrl: brandLogo("fnbo.com"),
    match: (issuer) => issuer.includes("fnbo"),
  },
  {
    name: "PenFed",
    bg: "#003D79",
    fg: "#fff",
    abbr: "PenFed",
    logoUrl: brandLogo("penfed.org"),
    match: (issuer) => issuer.includes("penfed"),
  },
  {
    name: "Bread Financial",
    bg: "#3F1A78",
    fg: "#fff",
    abbr: "Bread",
    logoUrl: brandLogo("breadfinancial.com"),
    match: (issuer) => issuer.includes("bread financial"),
  },
  {
    name: "Verizon",
    bg: "#111111",
    fg: "#fff",
    abbr: "VZ",
    logoUrl: brandLogo("verizon.com"),
    match: (issuer) => issuer.includes("verizon"),
  },
  {
    name: "Lowe's",
    bg: "#004990",
    fg: "#fff",
    abbr: "Lowe's",
    logoUrl: brandLogo("lowes.com"),
    match: (issuer) => issuer.includes("lowe"),
  },
  {
    name: "PNC",
    bg: "#F06400",
    fg: "#fff",
    abbr: "PNC",
    logoUrl: brandLogo("pnc.com"),
    match: (issuer) => issuer.includes("pnc"),
  },
  {
    name: "TD",
    bg: "#008A00",
    fg: "#fff",
    abbr: "TD",
    logoUrl: brandLogo("td.com"),
    logoNeedsBacking: false,
    match: (issuer) => issuer.includes("td bank") || issuer.includes("td canada"),
  },
  {
    name: "RBC",
    bg: "#0051A5",
    fg: "#fff",
    abbr: "RBC",
    logoUrl: brandLogo("rbcroyalbank.com"),
    match: (issuer) => issuer.includes("rbc"),
  },
  {
    name: "Scotiabank",
    bg: "#EC111A",
    fg: "#fff",
    abbr: "Scotia",
    logoUrl: brandLogo("scotiabank.com"),
    logoNeedsBacking: false,
    match: (issuer) => issuer.includes("scotiabank"),
  },
  {
    name: "BMO",
    bg: "#0075BE",
    fg: "#fff",
    abbr: "BMO",
    logoUrl: brandLogo("bmo.com"),
    logoNeedsBacking: false,
    match: (issuer) => issuer.includes("bmo"),
  },
  {
    name: "CIBC",
    bg: "#A40046",
    fg: "#fff",
    abbr: "CIBC",
    logoUrl: brandLogo("cibc.com"),
    match: (issuer) => issuer.includes("cibc"),
  },
  {
    name: "Rogers Bank",
    bg: "#DA291C",
    fg: "#fff",
    abbr: "Rogers",
    logoUrl: brandLogo("rogersbank.com"),
    match: (issuer) => issuer.includes("rogers"),
  },
  {
    name: "MBNA",
    bg: "#007A33",
    fg: "#fff",
    abbr: "MBNA",
    logoUrl: brandLogo("mbna.ca"),
    match: (issuer) => issuer.includes("mbna"),
  },
  {
    name: "National Bank",
    bg: "#E31B23",
    fg: "#fff",
    abbr: "NBC",
    logoUrl: brandLogo("nbc.ca"),
    match: (issuer) => issuer.includes("national bank"),
  },
  {
    name: "Apple",
    bg: "#222222",
    fg: "#fff",
    abbr: "Apple",
    logoUrl: brandLogo("apple.com"),
    match: (issuer) => issuer.includes("apple") || issuer.includes("goldman sachs"),
  },
  {
    name: "Robinhood",
    bg: "#00C805",
    fg: "#001B00",
    abbr: "RH",
    logoUrl: brandLogo("robinhood.com"),
    logoNeedsBacking: false,
    match: (issuer) => issuer.includes("robinhood"),
  },
  {
    name: "PayPal",
    bg: "#003087",
    fg: "#fff",
    abbr: "PayPal",
    logoUrl: brandLogo("paypal.com"),
    match: (issuer) => issuer.includes("paypal") || issuer.includes("synchrony"),
  },
  {
    name: "Bilt",
    bg: "#111827",
    fg: "#fff",
    abbr: "Bilt",
    logoUrl: brandLogo("biltrewards.com"),
    match: (issuer) => issuer.includes("bilt"),
  },
  {
    name: "BECU",
    bg: "#006747",
    fg: "#fff",
    abbr: "BECU",
    logoUrl: brandLogo("becu.org"),
    match: (issuer) => issuer.includes("becu"),
  },
  {
    name: "HSBC",
    bg: "#DB0011",
    fg: "#fff",
    abbr: "HSBC",
    logoUrl: brandLogo("hsbc.com"),
    logoNeedsBacking: false,
    match: (issuer) => issuer.includes("hsbc"),
  },
  {
    name: "Standard Chartered",
    bg: "#0473EA",
    fg: "#fff",
    abbr: "SC",
    logoUrl: brandLogo("sc.com"),
    match: (issuer) => issuer.includes("standard chartered"),
  },
  {
    name: "Hang Seng",
    bg: "#005EB8",
    fg: "#fff",
    abbr: "HSB",
    logoUrl: brandLogo("hangseng.com"),
    match: (issuer) => issuer.includes("hang seng"),
  },
  {
    name: "DBS",
    bg: "#C8102E",
    fg: "#fff",
    abbr: "DBS",
    logoUrl: brandLogo("dbs.com"),
    match: (issuer) => issuer.includes("dbs"),
  },
  {
    name: "UOB",
    bg: "#005EB8",
    fg: "#fff",
    abbr: "UOB",
    logoUrl: brandLogo("uob.com.sg"),
    match: (issuer) => issuer.includes("uob") || issuer.includes("united overseas bank"),
  },
  {
    name: "OCBC",
    bg: "#D71920",
    fg: "#fff",
    abbr: "OCBC",
    logoUrl: brandLogo("ocbc.com"),
    match: (issuer) => issuer.includes("ocbc"),
  },
];

function resolveIssuerBrand(issuer: string): IssuerBrand | null {
  const normalized = issuer.toLowerCase();
  return ISSUER_BRANDS.find((brand) => brand.match(normalized)) ?? null;
}

interface BankLogoProps {
  logoUrl?: string | null;
  issuer: string;
  size?: "sm" | "md";
  className?: string;
}

export function BankLogo({ logoUrl, issuer, size = "md", className }: BankLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const brand = resolveIssuerBrand(issuer);
  const imageUrl = brand?.logoUrl ?? logoUrl;
  const dim = size === "sm" ? "h-6 w-6 text-[9px]" : "h-8 w-8 text-[10px]";

  if (imageUrl && !imgFailed) {
    return (
      <img
        src={imageUrl}
        alt={`${brand?.name ?? issuer} logo`}
        onError={() => setImgFailed(true)}
        className={cn(
          dim,
          "shrink-0 rounded-md bg-white object-contain p-1 ring-1 ring-black/5",
          className,
        )}
      />
    );
  }

  if (brand) {
    return (
      <div
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

export function IssuerBrandChip({ logoUrl, issuer }: BankLogoProps) {
  const brand = resolveIssuerBrand(issuer);
  const logoClassName = brand?.logoNeedsBacking === false
    ? "h-8 w-8 rounded-sm bg-transparent p-0 shadow-sm ring-0"
    : "h-8 w-8 rounded-sm bg-white p-1 shadow-sm ring-1 ring-black/10";

  return (
    <BankLogo
      logoUrl={logoUrl}
      issuer={issuer}
      size="md"
      className={logoClassName}
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
  logoUrl,
  network,
}: CardArtProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const resolvedCardImageUrl = resolvePublicAssetUrl(cardImageUrl);
  const showImage = resolvedCardImageUrl && !imgFailed;
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
          onError={() => setImgFailed(true)}
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
              <IssuerBrandChip logoUrl={logoUrl ?? null} issuer={issuer} />
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
