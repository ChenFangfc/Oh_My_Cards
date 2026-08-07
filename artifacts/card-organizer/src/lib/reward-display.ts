import { formatCardAmount } from "@/lib/card-format";

type RewardCard = {
  annualFee: number;
  currency?: string | null;
  rewardType?: "cashback" | "points" | "miles" | null;
  rewardUnitName?: string | null;
  rewardUnitValueCents?: number | null;
};

export function getCompactRewardUnitName(card: RewardCard): string {
  const unit = card.rewardUnitName?.toLowerCase() ?? "";

  if (card.rewardType === "cashback") return "Cash Back";
  if (card.rewardType === "miles" || unit.includes("mile")) return "Miles";
  if (card.rewardType === "points" || unit.includes("point")) return "Points";
  if (unit.includes("cash back")) return "Cash Back";
  if (unit.includes("daily cash") || unit.includes("rewardcash")) return "Cash";
  if (unit.includes("cash dollar")) return "Cash";
  if (unit.includes("dollar")) return "Dollars";

  return card.rewardUnitName ?? "Rewards";
}

export function formatCompactRewardTotal(card: RewardCard, rewardValue: number): string {
  if (card.rewardType === "cashback") {
    return `${formatCardAmount(card, rewardValue)} Cash Back`;
  }

  const valueCents = card.rewardUnitValueCents && card.rewardUnitValueCents > 0
    ? card.rewardUnitValueCents
    : 1;
  const units = Math.round((rewardValue * 100) / valueCents).toLocaleString("en-US");
  return `${units} ${getCompactRewardUnitName(card)}`;
}

function formatEarnRateValue(rate: number): string {
  // Round in integer space first: rate * 100 leaves float dust (0.14 -> 14.000000000000002).
  const percent = Math.round(rate * 1e6) / 1e4;
  return String(Number(percent.toFixed(2)));
}

export function formatCompactEarnRate(card: RewardCard, rate: number): string {
  const earnsRewards = Boolean(card.rewardType ?? card.rewardUnitName);
  if (!earnsRewards || !Number.isFinite(rate) || rate <= 0) return "—";

  const value = formatEarnRateValue(rate);
  return card.rewardType === "cashback" ? `${value}%` : `${value}x`;
}

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      if (/^[A-Z0-9&/$]+$/.test(word)) return word;
      return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
    })
    .join(" ");
}

const SPEND_CAP_PATTERN = /\b(?:up to|first)\s+([A-Za-z]{0,3}\$)\s*([\d,]+)\s*(?:\/|\s+per\s+)?(month|monthly|quarter|quarterly|yr|year|annual|annually)?/i;

const CAP_PERIOD_LABELS: Array<[RegExp, string]> = [
  [/^month/i, "/mo"],
  [/^quarter/i, "/qtr"],
  [/^(?:yr|year|annual)/i, "/yr"],
];

function formatCapAmount(symbol: string, digits: string): string {
  const amount = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) return "";
  if (amount >= 1_000_000) return `${symbol}${Number((amount / 1_000_000).toFixed(1))}M`;
  if (amount >= 1_000) return `${symbol}${Number((amount / 1_000).toFixed(1))}k`;
  return `${symbol}${amount}`;
}

/** Compact form of a spending cap, e.g. "$6k/yr", so caps survive label normalization. */
function extractSpendCap(category: string): string {
  const match = SPEND_CAP_PATTERN.exec(category);
  if (!match) return "";

  const amount = formatCapAmount(match[1], match[2]);
  if (!amount) return "";

  const period = CAP_PERIOD_LABELS.find(([pattern]) => pattern.test(match[3] ?? ""))?.[1] ?? "";
  return `${amount}${period}`;
}

function withSpendCap(label: string, cap: string): string {
  if (!cap || label.includes("$")) return label;
  return `${label} · to ${cap}`;
}

export function formatCompactRewardCategory(category: string): string {
  const spendCap = extractSpendCap(category);
  const normalized = category
    .replace(/\([^)]*\)/g, "")
    .replace(/\b(?:up to|first)\s+\$[\d,]+(?:\/|\s+per\s+)?(?:month|monthly|quarter|quarterly|yr|year|annual|annually)?/gi, "")
    .replace(/\bthrough\s+\d{1,2}\/\d{1,2}\/\d{2,4}\b/gi, "")
    .replace(/\bwith eligible [a-z ]+ service\b/gi, "")
    .replace(/\bbefore cap\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  const lower = normalized.toLowerCase();

  const directRules: Array<[RegExp, string]> = [
    [/^direct airfare$/i, "Direct Airfare"],
    [/^direct hotel$/i, "Direct Hotel"],
    [/^base purchases$/i, "Base Purchases"],
    [/^airfare$/i, "Airfare"],
    [/^hotel$/i, "Hotel"],
    [/alaska airlines.*hawaiian airlines/i, "Alaska & Hawaiian"],
    [/flights.*prepaid hotels.*amex travel/i, "Flights & Hotels"],
    [/flights booked.*amex travel/i, "Flights & Amex Travel"],
    [/prepaid rental cars.*cruises.*amex travel/i, "Cars & Cruises"],
    [/capital one business travel.*flights.*vacation rentals/i, "Flights & Vacation Rentals"],
    [/gas.*ev charging.*office supplies|gas.*ev charging.*cell phone/i, "Gas & Business"],
    [/streaming.*watsons.*ev charging/i, "Streaming & Watsons"],
    [/eligible gas|gas.*costco/i, "Eligible Gas"],
    [/gas.*ev charging/i, "Gas & EV"],
    [/eligible ev charging|ev charging/i, "EV Charging"],
    [/grocery stores.*wholesale|groceries.*wholesale/i, "Groceries & Wholesale"],
    [/groceries.*rideshare.*food delivery/i, "Groceries & Daily"],
    [/u\.s\. supermarkets|us supermarkets|supermarkets/i, "Supermarkets"],
    [/top eligible category|top.*category/i, "Top Category"],
    [/top two monthly business categories/i, "Top Business Categories"],
    [/two chosen categories|chosen.*categories/i, "Chosen Categories"],
    [/choice category/i, "Choice Category"],
    [/selected .*category|selected spending/i, "Selected Category"],
    [/capital one (business )?travel.*hotels.*rental|hotels.*rental cars.*capital one/i, "Hotels & Cars"],
    [/hotels.*rental cars|rental cars.*hotels/i, "Hotels & Cars"],
    [/prepaid hotels.*rental cars|prepaid rental cars/i, "Hotels & Cars"],
    [/citi travel/i, "Citi Travel"],
    [/amex travel/i, "Amex Travel"],
    [/chase travel/i, "Chase Travel"],
    [/bank of america travel center/i, "Travel Center"],
    [/travel via .*rewards centre/i, "Travel Portal"],
    [/capital one business travel/i, "Business Travel"],
    [/capital one entertainment/i, "Entertainment Portal"],
    [/amazon business.*whole foods/i, "Amazon & Whole Foods"],
    [/expedia.*hotels\.com.*vrbo/i, "Expedia Group"],
    [/restaurants.*food delivery|dining.*food delivery/i, "Dining & Delivery"],
    [/restaurants.*worldwide/i, "Restaurants"],
    [/gas.*transit.*ride share|gas.*transit.*rideshare/i, "Gas & Transit"],
    [/local transit.*commuting|local transit|transit.*rideshare|rideshare.*transit|gas.*transit/i, "Transit"],
    [/streaming subscriptions/i, "Streaming"],
    [/streaming.*internet.*cable.*phone|telecom.*cable.*satellite|streaming.*cable/i, "Streaming & Phone"],
    [/marketing.*advertising.*utilities/i, "Marketing & Utilities"],
    [/social media.*search advertising|marketing.*advertising/i, "Advertising"],
    [/online.*mobile payment|online.*contactless|online.*overseas/i, "Online Spend"],
    [/digital.*everyday merchants/i, "Digital Merchants"],
    [/lifestyle.*overseas spend/i, "Lifestyle & Overseas"],
    [/self-care.*sports.*recreation/i, "Lifestyle"],
    [/non-u\.s\. purchases|u\.s\. dollar purchases/i, "Foreign Spend"],
    [/large purchases/i, "Large Purchases"],
    [/all purchases|all other purchases|other eligible purchases|other purchases/i, "All Purchases"],
    [/other business purchases|business purchases/i, "Business Spend"],
    [/daily spend bonus categories/i, "Bonus Categories"],
    [/quarterly cashback tiers/i, "Quarterly Tiers"],
  ];

  for (const [pattern, label] of directRules) {
    if (pattern.test(normalized)) return withSpendCap(label, spendCap);
  }

  let compact = normalized
    .replace(/\beligible\b/gi, "")
    .replace(/\bselect(?:ed)?\b/gi, "")
    .replace(/\bpurchases?\b/gi, "")
    .replace(/\bbooked direct(?:ly)?\b/gi, "")
    .replace(/\bdirect\b/gi, "")
    .replace(/\bvia\b/gi, "")
    .replace(/\bthrough\b/gi, "")
    .replace(/\band\b/gi, "&")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s+/g, " ")
    .replace(/^[,&/\s]+|[,&/\s]+$/g, "")
    .trim();

  if (compact.length > 28 && compact.includes(",")) {
    compact = compact.split(",").slice(0, 2).join(" & ").trim();
  }
  if (compact.length > 28 && compact.includes(" / ")) {
    compact = compact.split(" / ").slice(0, 2).join(" / ").trim();
  }
  if (compact.length > 30) {
    const firstWords = compact.split(" ").slice(0, 3).join(" ");
    compact = firstWords.length >= 10 ? firstWords : compact.slice(0, 30);
  }
  compact = compact.replace(/[,&/\s]+$/g, "").trim();

  return withSpendCap(toTitleCase(compact || lower || category), spendCap);
}
