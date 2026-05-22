type CardFeeFields = {
  annualFee: number;
  currency?: string | null;
};

export function getCardCurrency(card: CardFeeFields): "USD" | "CAD" | "HKD" | "SGD" {
  if (card.currency === "CAD") return "CAD";
  if (card.currency === "HKD") return "HKD";
  if (card.currency === "SGD") return "SGD";
  return "USD";
}

export function formatAnnualFee(
  card: CardFeeFields,
  options: { includePeriod?: boolean } = {},
) {
  if (card.annualFee === 0) return "No Fee";

  const hasFraction = !Number.isInteger(card.annualFee);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: getCardCurrency(card),
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  }).format(card.annualFee);

  return options.includePeriod ? `${formatted}/yr` : formatted;
}

export function formatCardAmount(card: CardFeeFields, amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: getCardCurrency(card),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
