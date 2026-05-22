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

export function formatCompactEarnRate(card: RewardCard, rate: number): string {
  const multiplier = rate * 100;
  const value = Number.isInteger(multiplier) ? multiplier.toFixed(0) : multiplier.toFixed(1);
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

export function formatCompactRewardCategory(category: string): string {
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
    [/capital one entertainment/i, "Entertainment"],
    [/amazon business.*whole foods/i, "Amazon & Whole Foods"],
    [/expedia.*hotels\.com.*vrbo/i, "Expedia Group"],
    [/restaurants.*food delivery|dining.*food delivery/i, "Dining & Delivery"],
    [/restaurants.*worldwide/i, "Restaurants"],
    [/gas.*transit.*ride share|gas.*transit.*rideshare/i, "Gas & Transit"],
    [/local transit.*commuting|local transit|transit.*rideshare|rideshare.*transit|gas.*transit/i, "Transit"],
    [/gas.*ev charging/i, "Gas & EV"],
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
    if (pattern.test(normalized)) return label;
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

  return toTitleCase(compact || lower || category);
}
