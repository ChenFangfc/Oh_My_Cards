/**
 * Shows which logged-transaction categories a proposed bonus-row label would
 * be credited for, before that label goes into a patch.
 *
 * The reward engine matches spend to a bonus row through tags derived from the
 * row's wording, so a label that reads fine to a person ("Lyft rides") can
 * still resolve to nothing, or to more than intended. Run this on every new or
 * renamed label:
 *
 *   pnpm --dir scripts cards:labels -- "Gas and EV Charging" "Lyft" \
 *     "Groceries (up to $6,000/year)"
 */
import {
  TRANSACTION_CATEGORIES,
  resolveCashbackCategory,
} from "@workspace/api-client-react";
import type { CreditCard } from "@workspace/api-client-react";

const CAP_PATTERN =
  /(?:up to|first)\s+\$([0-9,]+)\s*(?:\/|\s+per\s+)?(month|monthly|quarter|quarterly|yr|year|annual|annually)/i;

function probeCard(label: string): CreditCard {
  return {
    id: 1,
    name: "Label probe",
    issuer: "Probe",
    network: "Visa",
    annualFee: 0,
    signupBonus: null,
    signupBonusValue: null,
    color: "",
    logoUrl: null,
    cardImageUrl: null,
    inWallet: false,
    cashbackCategories: [
      { id: 1, cardId: 1, category: label, rate: 0.05, isDefault: false },
      { id: 2, cardId: 1, category: "Other", rate: 0.01, isDefault: true },
    ],
    benefits: [],
  } as CreditCard;
}

const labels = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));

if (!labels.length) {
  process.stderr.write('Usage: cards:labels -- "<label>" ["<label>" ...]\n');
  process.exitCode = 2;
} else {
  for (const label of labels) {
    const card = probeCard(label);
    const covered = TRANSACTION_CATEGORIES.filter(
      (category) => resolveCashbackCategory(card, category)?.id === 1,
    );
    const cap = label.match(CAP_PATTERN);

    process.stdout.write(`"${label}"\n`);
    process.stdout.write(
      covered.length
        ? `  credited for: ${covered.join(", ")}\n`
        : "  credited for: nothing — no logged category reaches this row (Smart Suggest may still match it from free text)\n",
    );
    process.stdout.write(
      cap
        ? `  spend cap: $${cap[1]} per ${cap[2]}\n`
        : "  spend cap: none detected\n",
    );
  }
}
