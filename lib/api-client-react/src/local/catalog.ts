import type { CreditCard } from "../generated/api.schemas";

export type CardMarket = "US" | "Canada" | "Hong Kong" | "Singapore";
export type CardRuleCurrency = "USD" | "CAD" | "HKD" | "SGD";
export type CardRuleDataConfidence = "official" | "needs-review";

/**
 * Whether the product can still be obtained.
 *
 * `closed-to-new-applicants` matters because existing cardholders keep earning
 * on these rules — the card belongs in a wallet, but recommending it to someone
 * who does not have it is useless advice.
 * `discontinued` means no accounts remain; the row exists only so an old
 * wallet entry still resolves to a name instead of vanishing.
 */
export type CardAvailability =
  | "open"
  | "closed-to-new-applicants"
  | "discontinued";

export type VerifiedCreditCard = CreditCard & {
  market?: CardMarket;
  currency?: CardRuleCurrency;
  sourceUrl?: string;
  imageSourceUrl?: string | null;
  lastReviewedAt?: string;
  dataConfidence?: CardRuleDataConfidence;
  /** Absent means "open" — only closed/retired products carry this. */
  availability?: CardAvailability;
  /** ISO date the product stopped accepting new applications. */
  availabilityChangedAt?: string;
};

export const BUILTIN_RULESET_VERSION = "2026.11.01.13";

export const BUILTIN_CARDS = [
  {
    "id": 1,
    "name": "Chase Sapphire Preferred",
    "issuer": "Chase",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "100,000 points after $5,000 spend in 3 months",
    "signupBonusValue": 1250,
    "color": "linear-gradient(135deg, #1a2744, #2d4a8c)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/01-chase-sapphire-preferred.png",
    "rewardType": "points",
    "rewardProgram": "Chase Ultimate Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.25,
    "rewardValuationDescription": "Chase Ultimate Rewards can be redeemed for cash at 1 cent per point or for higher travel value depending on card and redemption path; this app uses 1.25 cents per point for Sapphire Preferred annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates.",
      "The Peloton bonus applies only to equipment and accessory purchases over $150 made directly with Peloton, on up to $5,000 in total purchases from 4/1/2025 through 12/31/2027; this app does not enforce that lifetime cap."
    ],
    "cashbackCategories": [
      {
        "id": 280,
        "cardId": 1,
        "category": "Chase Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 281,
        "cardId": 1,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 282,
        "cardId": 1,
        "category": "Select Streaming",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 283,
        "cardId": 1,
        "category": "Online Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 284,
        "cardId": 1,
        "category": "Travel",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 285,
        "cardId": 1,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9116,
        "cardId": 1,
        "category": "Gas and EV Charging",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9117,
        "cardId": 1,
        "category": "Vacation Home Rentals",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9118,
        "cardId": 1,
        "category": "Lyft (through 9/30/2027)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9119,
        "cardId": 1,
        "category": "Peloton Equipment and Accessories (through 12/31/2027)",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 269,
        "cardId": 1,
        "name": "Annual Hotel Credit",
        "description": "Up to $100 in statement credits each account anniversary year for hotels booked through Chase Travel.",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 271,
        "cardId": 1,
        "name": "Primary Rental Car Coverage",
        "description": "Auto rental collision damage waiver can be primary when requirements are met.",
        "annualValue": 150
      },
      {
        "id": 272,
        "cardId": 1,
        "name": "Trip Cancellation / Interruption Insurance",
        "description": "Coverage for eligible prepaid travel when a covered reason applies.",
        "annualValue": null
      },
      {
        "id": 704,
        "cardId": 1,
        "name": "Global Entry / TSA PreCheck / NEXUS Credit",
        "description": "Up to $120 in statement credits toward Global Entry, TSA PreCheck or NEXUS every four years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 705,
        "cardId": 1,
        "name": "DashPass Membership",
        "description": "Complimentary DashPass when activated by 12/31/2029 (through 12/31/2029 or 12 months, whichever is longer), plus a $10 promo each calendar month on one non-restaurant DoorDash order.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 706,
        "cardId": 1,
        "name": "Emergency Evacuation and Transportation",
        "description": "Up to $100,000 in emergency evacuation and transportation coverage when a covered reason applies.",
        "annualValue": 0
      },
      {
        "id": 707,
        "cardId": 1,
        "name": "Complimentary Apple TV Subscription (1 year)",
        "description": "At least 12 months of complimentary Apple TV (Chase values it at $180) after a one-time activation on chase.com or the Chase Mobile app by 12/31/2026.",
        "annualValue": 180,
        "period": "one-time"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred",
    "imageSourceUrl": "https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 2,
    "name": "Chase Sapphire Reserve",
    "issuer": "Chase",
    "network": "Visa",
    "annualFee": 795,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #374151)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/02-chase-sapphire-reserve.png",
    "rewardType": "points",
    "rewardProgram": "Chase Ultimate Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.5,
    "rewardValuationDescription": "Chase Ultimate Rewards can be redeemed for cash at 1 cent per point or for higher travel value depending on card and redemption path; this app uses 1.50 cents per point for Sapphire Reserve annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates.",
      "The Peloton bonus applies only to equipment and accessory purchases over $150 made directly with Peloton, on up to $5,000 in total purchases from 4/1/2025 through 12/31/2027; this app does not enforce that lifetime cap."
    ],
    "cashbackCategories": [
      {
        "id": 286,
        "cardId": 2,
        "category": "Chase Travel",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 287,
        "cardId": 2,
        "category": "Flights and hotels booked direct",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 288,
        "cardId": 2,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 289,
        "cardId": 2,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9120,
        "cardId": 2,
        "category": "Lyft (through 9/30/2027)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9121,
        "cardId": 2,
        "category": "Peloton Equipment and Accessories (through 12/31/2027)",
        "rate": 0.1,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 273,
        "cardId": 2,
        "name": "Annual Travel Credit",
        "description": "Up to $300 in annual travel statement credits.",
        "annualValue": 300,
        "period": "cardmember-year"
      },
      {
        "id": 274,
        "cardId": 2,
        "name": "Airport Lounge Access",
        "description": "Priority Pass Select plus Chase Sapphire Lounge access where available.",
        "annualValue": 429
      },
      {
        "id": 275,
        "cardId": 2,
        "name": "Global Entry, TSA PreCheck or NEXUS Credit",
        "description": "One statement credit of up to $120 every four years for a Global Entry, TSA PreCheck or NEXUS application fee charged to the card.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 276,
        "cardId": 2,
        "name": "Premium Travel Protections",
        "description": "Includes trip cancellation/interruption, trip delay, baggage delay and rental car coverage.",
        "annualValue": null
      },
      {
        "id": 708,
        "cardId": 2,
        "name": "The Edit Hotel Credit",
        "description": "Up to $250 back per prepaid ('Pay Now') stay of two or more nights booked with The Edit through Chase Travel, up to $500 per calendar year.",
        "annualValue": 500,
        "period": "calendar-year"
      },
      {
        "id": 709,
        "cardId": 2,
        "name": "Sapphire Exclusive Tables Dining Credit",
        "description": "Up to $150 in statement credits January-June and up to $150 July-December at Sapphire Reserve Exclusive Tables restaurants on OpenTable.",
        "annualValue": 300,
        "period": "semiannual"
      },
      {
        "id": 710,
        "cardId": 2,
        "name": "StubHub / viagogo Credits",
        "description": "Up to $150 in statement credits January-June and up to $150 July-December on StubHub and viagogo purchases, through 12/31/2027. One-time activation required.",
        "annualValue": 300,
        "period": "semiannual"
      },
      {
        "id": 711,
        "cardId": 2,
        "name": "Apple TV and Apple Music Subscriptions",
        "description": "At least 12 months each of complimentary Apple TV and Apple Music after a one-time activation by 6/22/2027; Chase values them at $324 a year.",
        "annualValue": 324,
        "period": "one-time"
      },
      {
        "id": 712,
        "cardId": 2,
        "name": "DashPass Membership",
        "description": "Complimentary DashPass (activate by 12/31/2029) plus up to $35 in DoorDash promos each calendar month through 12/31/2029: $15 off one qualifying order and two $10 promos on non-restaurant orders.",
        "annualValue": 420,
        "period": "monthly"
      },
      {
        "id": 713,
        "cardId": 2,
        "name": "Lyft Credits",
        "description": "$10 in-app Lyft ride credit each calendar month through 9/30/2027.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 714,
        "cardId": 2,
        "name": "Peloton Membership Credits",
        "description": "Up to $10 in statement credits each month on an eligible Peloton membership through 12/31/2027. One-time activation required.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 715,
        "cardId": 2,
        "name": "IHG One Rewards Platinum Elite Status",
        "description": "Complimentary IHG One Rewards Platinum Elite status through 12/31/2027 after linking an IHG One Rewards account.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve",
    "imageSourceUrl": "https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 3,
    "name": "Chase Freedom Unlimited",
    "issuer": "Chase",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 bonus after $500 spend in 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #1e3a5f, #3b82f6)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/03-chase-freedom-unlimited.png",
    "rewardType": "cashback",
    "rewardProgram": "Chase Ultimate Rewards cash back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 10,
        "cardId": 3,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 11,
        "cardId": 3,
        "category": "Drugstores",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 12,
        "cardId": 3,
        "category": "Travel via Chase",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 13,
        "cardId": 3,
        "category": "All Purchases",
        "rate": 0.015,
        "isDefault": true
      },
      {
        "id": 9122,
        "cardId": 3,
        "category": "Lyft (through 9/30/2027)",
        "rate": 0.02,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 11,
        "cardId": 3,
        "name": "Purchase Protection",
        "description": "Coverage for new purchases for 120 days against damage or theft, up to $500 per claim",
        "annualValue": 75
      },
      {
        "id": 12,
        "cardId": 3,
        "name": "Extended Warranty",
        "description": "Extends eligible US manufacturer warranties by an additional year",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited",
    "imageSourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 4,
    "name": "Chase Freedom Flex",
    "issuer": "Chase",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "$200 bonus after $500 spend in 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #1d4ed8, #2563eb)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/04-chase-freedom-flex.webp",
    "rewardType": "cashback",
    "rewardProgram": "Chase Ultimate Rewards cash back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Rotating categories require current-quarter activation and are subject to the issuer quarterly cap before base earning applies.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 14,
        "cardId": 4,
        "category": "Rotating Categories (up to $1,500/quarter)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 15,
        "cardId": 4,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 16,
        "cardId": 4,
        "category": "Drugstores",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 17,
        "cardId": 4,
        "category": "Travel via Chase",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 18,
        "cardId": 4,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9123,
        "cardId": 4,
        "category": "Lyft (through 9/30/2027)",
        "rate": 0.02,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 14,
        "cardId": 4,
        "name": "Purchase Protection",
        "description": "New purchases protected for 120 days against damage or theft",
        "annualValue": null
      },
      {
        "id": 716,
        "cardId": 4,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on purchases abroad or with international online merchants since September 2026 (previously 3%).",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/freedom/flex",
    "imageSourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/freedom/flex",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 14,
        "mode": "rotating-calendar",
        "picks": 1,
        "resets": "quarter",
        "options": [
          "Q2 2026: Amazon and Chase Travel",
          "Q3 2026: Gas, public transit, EV charging and select live entertainment",
          "Q4 2026: Grocery stores, dining and American Red Cross donations",
          "Q1 2027: Grocery stores and top streaming services"
        ]
      }
    ]
  },
  {
    "id": 5,
    "name": "Citi Double Cash",
    "issuer": "Citi",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #1b4332, #2d6a4f)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/05-citi-double-cash.webp",
    "rewardType": "points",
    "rewardProgram": "Citi ThankYou Points",
    "rewardUnitName": "ThankYou Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Citi cards in this catalog earn ThankYou Points or cash-equivalent ThankYou rewards; this app uses 1 cent per point for cash-value calculations unless a product-specific rule says otherwise.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 19,
        "cardId": 5,
        "category": "All Purchases",
        "rate": 0.02,
        "isDefault": true
      },
      {
        "id": 9145,
        "cardId": 5,
        "category": "Citi Travel hotels, car rentals, and attractions",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 15,
        "cardId": 5,
        "name": "Citi Entertainment",
        "description": "Special access to purchase tickets to thousands of events",
        "annualValue": null
      },
      {
        "id": 822,
        "cardId": 5,
        "name": "Extended Warranty",
        "description": "Extended warranty coverage on eligible purchases made with the card; terms, conditions and coverage limits apply.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-double-cash-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-double-cash-credit-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 6,
    "name": "Citi Strata Premier",
    "issuer": "Citi",
    "network": "Mastercard",
    "annualFee": 95,
    "signupBonus": "75,000 points after $4,000 spend in 3 months",
    "signupBonusValue": 750,
    "color": "linear-gradient(135deg, #003087, #0040bb)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/06-citi-strata-premier.webp",
    "rewardType": "points",
    "rewardProgram": "Citi ThankYou Points",
    "rewardUnitName": "ThankYou Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Citi cards in this catalog earn ThankYou Points or cash-equivalent ThankYou rewards; this app uses 1 cent per point for cash-value calculations unless a product-specific rule says otherwise.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 20,
        "cardId": 6,
        "category": "Hotels",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 21,
        "cardId": 6,
        "category": "Flights",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 22,
        "cardId": 6,
        "category": "Restaurants",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 23,
        "cardId": 6,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 24,
        "cardId": 6,
        "category": "Gas and EV Charging Stations",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 25,
        "cardId": 6,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9146,
        "cardId": 6,
        "category": "Citi Travel hotels, car rentals, and attractions",
        "rate": 0.1,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 17,
        "cardId": 6,
        "name": "$100 Hotel Credit",
        "description": "$100 off a single hotel stay of $500 or more (excluding taxes and fees) booked through Citi Travel, once per calendar year.",
        "annualValue": 100,
        "period": "calendar-year"
      },
      {
        "id": 18,
        "cardId": 6,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on purchases made abroad",
        "annualValue": null
      },
      {
        "id": 19,
        "cardId": 6,
        "name": "Citi Entertainment Access",
        "description": "Presale and preferred tickets for concerts, sports, dining, and more",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-strata-premier-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-strata-premier-credit-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 7,
    "name": "Citi Custom Cash",
    "issuer": "Citi",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f3460, #16213e)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/07-citi-custom-cash.webp",
    "rewardType": "points",
    "rewardProgram": "Citi ThankYou Points",
    "rewardUnitName": "ThankYou Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Citi cards in this catalog earn ThankYou Points or cash-equivalent ThankYou rewards; this app uses 1 cent per point for cash-value calculations unless a product-specific rule says otherwise.",
    "rewardRuleNotes": [
      "Closed to new applicants since 2026-05-28. Existing cardholders keep the card and its current earning structure.",
      "The 5% bonus applies to one eligible category per billing cycle, on up to $500 of spend in that cycle."
    ],
    "cashbackCategories": [
      {
        "id": 26,
        "cardId": 7,
        "category": "Top Eligible Category (up to $500/month)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 27,
        "cardId": 7,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 20,
        "cardId": 7,
        "name": "Citi Entertainment",
        "description": "Special access to purchase tickets to thousands of events",
        "annualValue": null
      },
      {
        "id": 21,
        "cardId": 7,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on international purchases",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-custom-cash-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-custom-cash-credit-card",
    "lastReviewedAt": "2026-08-06",
    "dataConfidence": "needs-review",
    "availability": "closed-to-new-applicants",
    "availabilityChangedAt": "2026-05-28",
    "categoryChoices": [
      {
        "categoryId": 26,
        "mode": "automatic-top-spend",
        "picks": 1,
        "resets": "month",
        "options": [
          "Restaurants",
          "Gas stations",
          "Grocery stores",
          "Select travel",
          "Select transit",
          "Select streaming services",
          "Drugstores",
          "Home improvement stores",
          "Fitness clubs",
          "Live entertainment"
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "American Express Gold Card",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 325,
    "signupBonus": "As high as 100,000 Membership Rewards points after qualifying spend; see issuer page for current offer",
    "signupBonusValue": 1000,
    "color": "linear-gradient(135deg, #78350f, #d97706)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/08-american-express-gold-card.png",
    "rewardType": "points",
    "rewardProgram": "American Express Membership Rewards",
    "rewardUnitName": "Membership Rewards Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Membership Rewards redemption value varies by redemption path; this app uses a conservative 1.00 cent per point estimate for annual-fee progress and keeps earned points visible separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 290,
        "cardId": 8,
        "category": "Restaurants worldwide (up to $50,000/yr)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 291,
        "cardId": 8,
        "category": "U.S. supermarkets (up to $25,000/yr)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 292,
        "cardId": 8,
        "category": "Prepaid hotels via Amex Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 293,
        "cardId": 8,
        "category": "Flights booked direct or Amex Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 294,
        "cardId": 8,
        "category": "Prepaid rental cars and cruises via Amex Travel",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 295,
        "cardId": 8,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 277,
        "cardId": 8,
        "name": "Uber Cash",
        "description": "Up to $120 per year in monthly Uber Cash after adding the card to Uber.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 278,
        "cardId": 8,
        "name": "Dining Credit",
        "description": "Up to $120 per year in statement credits with participating dining partners.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 279,
        "cardId": 8,
        "name": "Dunkin Credit",
        "description": "Up to $84 per year in monthly statement credits at Dunkin.",
        "annualValue": 84,
        "period": "monthly"
      },
      {
        "id": 280,
        "cardId": 8,
        "name": "Resy Credit",
        "description": "Up to $100 per year in statement credits at U.S. Resy restaurants.",
        "annualValue": 100,
        "period": "semiannual"
      },
      {
        "id": 870,
        "cardId": 8,
        "name": "Hotel Collection Credit",
        "description": "$100 credit toward eligible on-property charges (such as dining or spa) on each The Hotel Collection booking of two nights or more made through AmexTravel.com or the Amex Travel App. Eligible charges vary by property.",
        "annualValue": 100
      },
      {
        "id": 871,
        "cardId": 8,
        "name": "Hertz Five Star Status",
        "description": "Complimentary upgrade to Hertz Five Star status; enrollment required.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/gold-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/gold-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 9,
    "name": "American Express Platinum",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 895,
    "signupBonus": "As high as 175,000 Membership Rewards points after qualifying spend; see issuer page for current offer",
    "signupBonusValue": 1750,
    "color": "linear-gradient(135deg, #374151, #6b7280)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/09-american-express-platinum.png",
    "rewardType": "points",
    "rewardProgram": "American Express Membership Rewards",
    "rewardUnitName": "Membership Rewards Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Membership Rewards redemption value varies by redemption path; this app uses a conservative 1.00 cent per point estimate for annual-fee progress and keeps earned points visible separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 296,
        "cardId": 9,
        "category": "Flights booked direct or Amex Travel (up to $500,000/yr)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 297,
        "cardId": 9,
        "category": "Prepaid hotels via Amex Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 298,
        "cardId": 9,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 281,
        "cardId": 9,
        "name": "Fine Hotels + Resorts / Hotel Collection Credit",
        "description": "Up to $300 in statement credits semi-annually (up to $600 per calendar year) on prepaid Fine Hotels + Resorts or The Hotel Collection bookings through American Express Travel. The Hotel Collection requires a two-night minimum stay; from January 1, 2027, Fine Hotels + Resorts bookings also need two nights to qualify.",
        "annualValue": 600,
        "period": "semiannual"
      },
      {
        "id": 282,
        "cardId": 9,
        "name": "Digital Entertainment Credit",
        "description": "Up to $300 per year in eligible digital entertainment credits.",
        "annualValue": 300,
        "period": "monthly"
      },
      {
        "id": 283,
        "cardId": 9,
        "name": "Resy Credit",
        "description": "Up to $400 per year in eligible Resy dining credits.",
        "annualValue": 400,
        "period": "quarterly"
      },
      {
        "id": 284,
        "cardId": 9,
        "name": "CLEAR Plus Credit",
        "description": "Up to $219 in statement credits per calendar year for an auto-renewing CLEAR+ membership (excluding taxes and fees).",
        "annualValue": 219,
        "period": "calendar-year"
      },
      {
        "id": 285,
        "cardId": 9,
        "name": "Airport Lounge Access",
        "description": "Access to Centurion Lounges, Priority Pass Select and other eligible lounges.",
        "annualValue": 500
      },
      {
        "id": 872,
        "cardId": 9,
        "name": "Airline Fee Credit",
        "description": "Up to $200 in statement credits per calendar year for incidental fees, such as checked bags and in-flight refreshments, charged by one selected qualifying airline.",
        "annualValue": 200,
        "period": "calendar-year"
      },
      {
        "id": 873,
        "cardId": 9,
        "name": "Uber Cash",
        "description": "$15 in Uber Cash each month plus a $20 bonus in December (up to $200 per year) for U.S. Uber rides and orders after adding the card to an Uber account.",
        "annualValue": 200,
        "period": "monthly"
      },
      {
        "id": 874,
        "cardId": 9,
        "name": "Uber One Credit",
        "description": "Up to $120 in statement credits each calendar year toward an auto-renewing Uber One membership.",
        "annualValue": 120,
        "period": "calendar-year"
      },
      {
        "id": 875,
        "cardId": 9,
        "name": "lululemon Credit",
        "description": "Up to $75 in statement credits each quarter (up to $300 per year) at U.S. lululemon retail stores (excluding outlets) and lululemon.com.",
        "annualValue": 300,
        "period": "quarterly"
      },
      {
        "id": 876,
        "cardId": 9,
        "name": "Walmart+ Credit",
        "description": "Up to $12.95 plus applicable taxes back each month on one auto-renewing monthly Walmart+ membership (up to $155 per year).",
        "annualValue": 155,
        "period": "monthly"
      },
      {
        "id": 877,
        "cardId": 9,
        "name": "Oura Ring Credit",
        "description": "Up to $200 in statement credits each calendar year toward an Oura Ring purchased at ouraring.com.",
        "annualValue": 200,
        "period": "calendar-year"
      },
      {
        "id": 878,
        "cardId": 9,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "A $120 statement credit for a Global Entry application every 4 years, or up to $85 for a five-year TSA PreCheck membership through an official enrollment provider every 4.5 years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/platinum/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/platinum/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 10,
    "name": "Amex Blue Cash Preferred",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 95,
    "signupBonus": "$250 statement credit after $3,000 spend in 6 months",
    "signupBonusValue": 250,
    "color": "linear-gradient(135deg, #1e40af, #3b82f6)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/10-amex-blue-cash-preferred.png",
    "rewardType": "cashback",
    "rewardProgram": "American Express Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Groceries (US supermarkets, up to $6,000/yr); Streaming; Transit; Gas; Other."
    ],
    "cashbackCategories": [
      {
        "id": 36,
        "cardId": 10,
        "category": "Groceries (US supermarkets, up to $6,000/yr)",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 37,
        "cardId": 10,
        "category": "Streaming",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 38,
        "cardId": 10,
        "category": "Transit",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 39,
        "cardId": 10,
        "category": "Gas",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 40,
        "cardId": 10,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 35,
        "cardId": 10,
        "name": "Return Protection",
        "description": "Up to $300 per item, $1,000 per year, if merchant won't accept return within 90 days",
        "annualValue": 50
      },
      {
        "id": 36,
        "cardId": 10,
        "name": "Purchase Protection",
        "description": "Coverage for new purchases for 90 days against theft or accidental damage",
        "annualValue": null
      },
      {
        "id": 879,
        "cardId": 10,
        "name": "$120 Disney Streaming Credit",
        "description": "Up to $10 back each month in statement credits after using the enrolled card for a subscription, including bundle subscriptions, at DisneyPlus.com, Hulu.com or Stream.ESPN.com (U.S. websites); subscription subject to auto-renewal.",
        "annualValue": 120,
        "period": "monthly"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 11,
    "name": "Amex Blue Cash Everyday",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 0,
    "signupBonus": "$200 statement credit after $2,000 spend in 6 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #0369a1, #0ea5e9)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/11-amex-blue-cash-everyday.png",
    "rewardType": "cashback",
    "rewardProgram": "American Express Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Groceries (US supermarkets, up to $6,000/yr); Online Retail (up to $6,000/yr); Gas (up to $6,000/yr); Other."
    ],
    "cashbackCategories": [
      {
        "id": 41,
        "cardId": 11,
        "category": "Groceries (US supermarkets, up to $6,000/yr)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 42,
        "cardId": 11,
        "category": "Online Retail (up to $6,000/yr)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 43,
        "cardId": 11,
        "category": "Gas (up to $6,000/yr)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 44,
        "cardId": 11,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 38,
        "cardId": 11,
        "name": "Car Rental Loss and Damage Insurance",
        "description": "Protection when you use the card to reserve and pay for your rental",
        "annualValue": null
      },
      {
        "id": 880,
        "cardId": 11,
        "name": "$84 Disney Streaming Credit",
        "description": "Up to $7 back each month in statement credits after using the enrolled card for a subscription, including bundle subscriptions, at DisneyPlus.com, Hulu.com or Stream.ESPN.com (U.S. websites); subscription subject to auto-renewal.",
        "annualValue": 84,
        "period": "monthly"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/blue-cash-everyday/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/blue-cash-everyday/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 12,
    "name": "Capital One Venture X",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 395,
    "signupBonus": "75,000 miles after $4,000 spend in 3 months",
    "signupBonusValue": 750,
    "color": "linear-gradient(135deg, #1e1b4b, #4338ca)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/12-capital-one-venture-x.webp",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates.",
      "Capital One Entertainment 5X excludes tickets bought through cardholder pre-sales or at Capital One Hall/Arena box offices."
    ],
    "cashbackCategories": [
      {
        "id": 45,
        "cardId": 12,
        "category": "Hotels (via Capital One Travel)",
        "rate": 0.1,
        "isDefault": false
      },
      {
        "id": 46,
        "cardId": 12,
        "category": "Rental Cars (via Capital One Travel)",
        "rate": 0.1,
        "isDefault": false
      },
      {
        "id": 47,
        "cardId": 12,
        "category": "Flights and vacation rentals booked through Capital One Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 48,
        "cardId": 12,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      },
      {
        "id": 9147,
        "cardId": 12,
        "category": "Capital One Entertainment purchases (online ticketing platform)",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 39,
        "cardId": 12,
        "name": "$300 Travel Credit",
        "description": "Up to $300 each account year on bookings through Capital One Travel (primary cardholder, applied at checkout).",
        "annualValue": 300,
        "period": "cardmember-year"
      },
      {
        "id": 40,
        "cardId": 12,
        "name": "10,000 Anniversary Bonus Miles",
        "description": "10,000 bonus miles every year, starting on the first account anniversary.",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 41,
        "cardId": 12,
        "name": "Priority Pass Lounge Access",
        "description": "Priority Pass lounge access for the primary cardholder (enrollment required). Since 2026-02-01 guests are no longer complimentary (reported $35 per guest) and additional cardholders need paid lounge access.",
        "annualValue": null
      },
      {
        "id": 42,
        "cardId": 12,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Up to $120 statement credit for the Global Entry or TSA PreCheck application fee, once every 4 years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 43,
        "cardId": 12,
        "name": "Capital One Lounge Access",
        "description": "Capital One Lounge and Landing access for the primary cardholder. Since 2026-02-01 guests are free only on accounts spending $75,000+ a year (2 per Lounge visit, 1 per Landing visit); otherwise guest passes cost $45 (ages 2-17: $25). Additional cardholders need paid lounge access ($125/year each).",
        "annualValue": null
      },
      {
        "id": 44,
        "cardId": 12,
        "name": "Cell Phone Protection",
        "description": "Up to $800 per claim, max 2 claims per year when you pay your cell phone bill with the card",
        "annualValue": 100
      },
      {
        "id": 823,
        "cardId": 12,
        "name": "Premier Collection Experience Credit",
        "description": "Up to $100 experience credit per stay on Premier Collection hotels and vacation rentals booked through Capital One Travel, plus daily breakfast for two, Wi-Fi, and upgrades / early check-in / late checkout when available.",
        "annualValue": null
      },
      {
        "id": 824,
        "cardId": 12,
        "name": "Lifestyle Collection Experience Credit",
        "description": "Up to $50 experience credit per stay on Lifestyle Collection hotels booked through Capital One Travel, plus Wi-Fi and upgrades / early check-in / late checkout when available.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/venture-x/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/venture-x/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review"
  },
  {
    "id": 13,
    "name": "Capital One Venture Rewards",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "75,000 miles after $4,000 spend in 3 months",
    "signupBonusValue": 750,
    "color": "linear-gradient(135deg, #312e81, #4f46e5)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/13-capital-one-venture-rewards.png",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 49,
        "cardId": 13,
        "category": "Hotels, vacation rentals and rental cars booked through Capital One Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 51,
        "cardId": 13,
        "category": "All Purchases",
        "rate": 0.02,
        "isDefault": true
      },
      {
        "id": 9148,
        "cardId": 13,
        "category": "Capital One Entertainment purchases (online ticketing platform)",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 45,
        "cardId": 13,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Up to $120 statement credit for the Global Entry or TSA PreCheck application fee, once every 4 years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 46,
        "cardId": 13,
        "name": "Travel Accident Insurance",
        "description": "Coverage when you pay for travel with the card",
        "annualValue": null
      },
      {
        "id": 47,
        "cardId": 13,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on international purchases",
        "annualValue": null
      },
      {
        "id": 825,
        "cardId": 13,
        "name": "Lifestyle Collection Experience Credit",
        "description": "$50 experience credit per stay on Lifestyle Collection hotels booked through Capital One Travel, plus room upgrades, early check-in and late checkout when available.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/venture/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/venture/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 14,
    "name": "Capital One Savor Rewards",
    "issuer": "Capital One",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "$200 cash bonus after $500 spend in 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #7c1d6f, #be185d)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/14-capital-one-savor-rewards.png",
    "rewardType": "cashback",
    "rewardProgram": "Capital One Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 299,
        "cardId": 14,
        "category": "Capital One Entertainment purchases (online ticketing platform)",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 300,
        "cardId": 14,
        "category": "Hotels, vacation rentals and rental cars booked through Capital One Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 301,
        "cardId": 14,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 302,
        "cardId": 14,
        "category": "Entertainment",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 303,
        "cardId": 14,
        "category": "Streaming",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 304,
        "cardId": 14,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 305,
        "cardId": 14,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 286,
        "cardId": 14,
        "name": "No Annual Fee",
        "description": "Current Savor Rewards product has no annual fee.",
        "annualValue": null
      },
      {
        "id": 287,
        "cardId": 14,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on purchases outside the U.S.",
        "annualValue": null
      },
      {
        "id": 288,
        "cardId": 14,
        "name": "Capital One Entertainment Access",
        "description": "Access to Capital One Entertainment tickets and elevated rewards where eligible.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/savor/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/savor/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 15,
    "name": "Capital One SavorOne",
    "issuer": "Capital One",
    "network": "Mastercard",
    "annualFee": 39,
    "signupBonus": "$200 cash bonus after $500 spend in 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #9d174d, #ec4899)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/15-capital-one-savorone.png",
    "rewardType": "cashback",
    "rewardProgram": "Capital One Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 57,
        "cardId": 15,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 58,
        "cardId": 15,
        "category": "Entertainment",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 59,
        "cardId": 15,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 60,
        "cardId": 15,
        "category": "Streaming",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 61,
        "cardId": 15,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9149,
        "cardId": 15,
        "category": "Hotels, vacation rentals and rental cars booked through Capital One Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9150,
        "cardId": 15,
        "category": "Capital One Entertainment purchases (online ticketing platform)",
        "rate": 0.08,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 51,
        "cardId": 15,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on international purchases",
        "annualValue": null
      },
      {
        "id": 52,
        "cardId": 15,
        "name": "Extended Warranty",
        "description": "Doubles the original warranty period up to one additional year",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/savorone/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/savorone/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 16,
    "name": "Capital One Quicksilver",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 cash bonus after $500 spend in 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #374151, #9ca3af)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/16-capital-one-quicksilver.png",
    "rewardType": "cashback",
    "rewardProgram": "Capital One Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 62,
        "cardId": 16,
        "category": "All Purchases",
        "rate": 0.015,
        "isDefault": true
      },
      {
        "id": 9151,
        "cardId": 16,
        "category": "Hotels, vacation rentals and rental cars booked through Capital One Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9152,
        "cardId": 16,
        "category": "Capital One Entertainment purchases (online ticketing platform)",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 53,
        "cardId": 16,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on international purchases",
        "annualValue": null
      },
      {
        "id": 54,
        "cardId": 16,
        "name": "Travel Accident Insurance",
        "description": "Coverage when you purchase travel with the card",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/quicksilver/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/quicksilver/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 17,
    "name": "Discover it Cash Back",
    "issuer": "Capital One / Discover",
    "network": "Discover",
    "annualFee": 0,
    "signupBonus": "Cashback Match — Discover matches all cash back earned in the first year",
    "signupBonusValue": 150,
    "color": "linear-gradient(135deg, #7c2d12, #ea580c)",
    "logoUrl": "https://logo.clearbit.com/discover.com",
    "cardImageUrl": "/card-images/17-discover-it-cash-back.png",
    "rewardType": "cashback",
    "rewardProgram": "Discover Cashback Bonus",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Rotating categories require current-quarter activation and are subject to the issuer quarterly cap before base earning applies.",
      "Discover bonus categories and first-year Cashback Match terms are issuer-program specific and may require activation or eligibility."
    ],
    "cashbackCategories": [
      {
        "id": 63,
        "cardId": 17,
        "category": "Rotating Categories (up to $1,500/quarter)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 64,
        "cardId": 17,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 55,
        "cardId": 17,
        "name": "Cashback Match First Year",
        "description": "Discover automatically matches all cash back earned at the end of your first year",
        "annualValue": null,
        "period": "one-time"
      },
      {
        "id": 56,
        "cardId": 17,
        "name": "Free FICO Score",
        "description": "Free FICO credit score monitoring on your statement",
        "annualValue": 20
      },
      {
        "id": 57,
        "cardId": 17,
        "name": "No Foreign Transaction Fees",
        "description": "No fee on purchases made outside the US",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.discover.com/credit-cards/cash-back/it-card/",
    "imageSourceUrl": "https://www.discover.com/credit-cards/cash-back/it-card.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review",
    "categoryChoices": [
      {
        "categoryId": 63,
        "mode": "rotating-calendar",
        "picks": 1,
        "resets": "quarter",
        "options": [
          "Q1 2026: Grocery stores, wholesale clubs and select streaming services",
          "Q2 2026: Restaurants and home improvement stores",
          "Q3 2026: Gas stations, transportation (transit) and drugstores",
          "Q4 2026: Restaurants, entertainment and utilities (incl. phone, internet and cable)"
        ]
      }
    ]
  },
  {
    "id": 18,
    "name": "Discover it Miles",
    "issuer": "Capital One / Discover",
    "network": "Discover",
    "annualFee": 0,
    "signupBonus": "Miles Match — Discover matches all miles earned in the first year",
    "signupBonusValue": 150,
    "color": "linear-gradient(135deg, #92400e, #f59e0b)",
    "logoUrl": "https://logo.clearbit.com/discover.com",
    "cardImageUrl": "/card-images/18-discover-it-miles.png",
    "rewardType": "miles",
    "rewardProgram": "Discover Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Discover Miles value varies by itinerary and redemption path; this app uses an estimated 1.00 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Discover bonus categories and first-year Cashback Match terms are issuer-program specific and may require activation or eligibility."
    ],
    "cashbackCategories": [
      {
        "id": 65,
        "cardId": 18,
        "category": "All Purchases",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 58,
        "cardId": 18,
        "name": "Miles Match First Year",
        "description": "Discover matches all miles earned at the end of your first year",
        "annualValue": null,
        "period": "one-time"
      },
      {
        "id": 59,
        "cardId": 18,
        "name": "No Foreign Transaction Fees",
        "description": "No fee on purchases made outside the US",
        "annualValue": null
      },
      {
        "id": 60,
        "cardId": 18,
        "name": "Free FICO Score",
        "description": "Free FICO credit score monitoring",
        "annualValue": 20
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.discover.com/credit-cards/travel/",
    "imageSourceUrl": "https://www.discover.com/credit-cards/travel/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 19,
    "name": "Wells Fargo Active Cash",
    "issuer": "Wells Fargo",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 cash rewards bonus after $500 spend in 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #7f1d1d, #dc2626)",
    "logoUrl": "https://logo.clearbit.com/wellsfargo.com",
    "cardImageUrl": "/card-images/19-wells-fargo-active-cash.png",
    "rewardType": "cashback",
    "rewardProgram": "Wells Fargo Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 66,
        "cardId": 19,
        "category": "All Purchases",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 61,
        "cardId": 19,
        "name": "Cell Phone Protection",
        "description": "Up to $600 protection against damage or theft when you pay your monthly bill with the card",
        "annualValue": 100
      },
      {
        "id": 62,
        "cardId": 19,
        "name": "Visa Signature Concierge",
        "description": "24/7 concierge service for dining, travel, and entertainment assistance",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/active-cash-credit-card/",
    "imageSourceUrl": "https://creditcards.wellsfargo.com/active-cash-credit-card/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 20,
    "name": "Wells Fargo Autograph",
    "issuer": "Wells Fargo",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "20,000 bonus points after $1,000 spend in 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #991b1b, #ef4444)",
    "logoUrl": "https://logo.clearbit.com/wellsfargo.com",
    "cardImageUrl": "/card-images/20-wells-fargo-autograph.png",
    "rewardType": "points",
    "rewardProgram": "Wells Fargo Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Wells Fargo Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 67,
        "cardId": 20,
        "category": "Restaurants",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 68,
        "cardId": 20,
        "category": "Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 69,
        "cardId": 20,
        "category": "Gas & EV Charging",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 70,
        "cardId": 20,
        "category": "Transit",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 71,
        "cardId": 20,
        "category": "Streaming",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 72,
        "cardId": 20,
        "category": "Phone Plans",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 73,
        "cardId": 20,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 63,
        "cardId": 20,
        "name": "Cell Phone Protection",
        "description": "Up to $600 per claim, max $1,200 per year against damage or theft",
        "annualValue": 100
      },
      {
        "id": 64,
        "cardId": 20,
        "name": "Visa Signature Concierge",
        "description": "24/7 concierge service for travel, dining, and entertainment",
        "annualValue": null
      },
      {
        "id": 65,
        "cardId": 20,
        "name": "Auto Rental Collision Damage Waiver",
        "description": "Coverage when you rent a car and pay with the card",
        "annualValue": 50
      },
      {
        "id": 846,
        "cardId": 20,
        "name": "No Foreign Transaction Fees",
        "description": "Wells Fargo charges no foreign transaction fee on Autograph Card purchases converted to U.S. dollars.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/autograph-visa-credit-card/",
    "imageSourceUrl": "https://creditcards.wellsfargo.com/autograph-visa-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 21,
    "name": "Bank of America Travel Rewards",
    "issuer": "Bank of America",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "25,000 online bonus points after $1,000 spend in 90 days",
    "signupBonusValue": 250,
    "color": "linear-gradient(135deg, #7c1d1d, #b91c1c)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/21-bank-of-america-travel-rewards.png",
    "rewardType": "points",
    "rewardProgram": "Bank of America Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Bank of America Rewards Points value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 74,
        "cardId": 21,
        "category": "All Purchases",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 66,
        "cardId": 21,
        "name": "No Annual Fee",
        "description": "No annual fee, ever",
        "annualValue": 0
      },
      {
        "id": 67,
        "cardId": 21,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on international purchases",
        "annualValue": null
      },
      {
        "id": 68,
        "cardId": 21,
        "name": "Preferred Rewards Bonus",
        "description": "BofA Rewards, which replaced Preferred Rewards in May 2026, adds a bonus on card rewards by tier: Member 10%, Preferred Plus 25% ($30,000+ in qualifying balances), Preferred Honors 50% ($100,000+), Premier 75% ($1,000,000+). Former Preferred Rewards members keep their prior card bonus for at least six months after May 2026.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/travel-rewards-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/travel-rewards-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 22,
    "name": "Bank of America Premium Rewards",
    "issuer": "Bank of America",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "60,000 online bonus points after $4,000 spend in 90 days",
    "signupBonusValue": 600,
    "color": "linear-gradient(135deg, #5b21b6, #7c3aed)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/22-bank-of-america-premium-rewards.png",
    "rewardType": "points",
    "rewardProgram": "Bank of America Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Bank of America Rewards Points value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 75,
        "cardId": 22,
        "category": "Travel & Dining",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 76,
        "cardId": 22,
        "category": "All Purchases",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 69,
        "cardId": 22,
        "name": "$100 Airline Incidental Credit",
        "description": "Up to $100 in Airline Incidental Statement Credits each calendar year for qualifying purchases such as seat upgrades, baggage fees, in-flight services and airline lounge fees.",
        "annualValue": 100,
        "period": "calendar-year"
      },
      {
        "id": 70,
        "cardId": 22,
        "name": "$100 TSA PreCheck / Global Entry Credit",
        "description": "Up to $100 in Airport Security Statement Credits toward TSA PreCheck or Global Entry application fees, every four years.",
        "annualValue": 25,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 71,
        "cardId": 22,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on international purchases",
        "annualValue": null
      },
      {
        "id": 72,
        "cardId": 22,
        "name": "Preferred Rewards Bonus",
        "description": "BofA Rewards, which replaced Preferred Rewards in May 2026, adds a bonus on card rewards by tier: Member 10%, Preferred Plus 25% ($30,000+ in qualifying balances), Preferred Honors 50% ($100,000+), Premier 75% ($1,000,000+). Former Preferred Rewards members keep their prior card bonus for at least six months after May 2026.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/premium-rewards-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/premium-rewards-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 23,
    "name": "Bank of America Customized Cash Rewards",
    "issuer": "Bank of America",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 online cash rewards bonus after $1,000 spend in 90 days",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #6d1a36, #be123c)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/23-bank-of-america-customized-cash-rewards.png",
    "rewardType": "cashback",
    "rewardProgram": "Bank of America Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "New accounts earn 6% in the choice category for the first year, then 3%. This app uses the standing 3% rate.",
      "The 3% choice category and the 2% grocery/wholesale-club rate share one $2,500 combined cap per quarter; spend beyond it earns 1%.",
      "BofA Rewards members (the program replaced Preferred Rewards in May 2026) earn a 10%-75% bonus on these rates, depending on tier."
    ],
    "cashbackCategories": [
      {
        "id": 77,
        "cardId": 23,
        "category": "Choice Category (up to $2,500/quarter combined with groceries and wholesale clubs)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 78,
        "cardId": 23,
        "category": "Grocery Stores & Wholesale Clubs (up to $2,500/quarter combined with choice category)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 79,
        "cardId": 23,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 73,
        "cardId": 23,
        "name": "Choice Category Flexibility",
        "description": "6% cash back in a choice category during the first year for eligible new accounts, then 3%; category choices include gas/EV charging, online shopping, dining, travel, drug stores, and home improvement/furnishings.",
        "annualValue": null
      },
      {
        "id": 74,
        "cardId": 23,
        "name": "Purchase Protection",
        "description": "Coverage for new purchases against damage or theft",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 77,
        "mode": "user-selected",
        "picks": 1,
        "resets": "month",
        "options": [
          "Gas and EV charging stations",
          "Online shopping including cable, internet, phone plans and streaming",
          "Dining",
          "Travel",
          "Drug stores and pharmacies",
          "Home improvement and furnishings"
        ]
      }
    ]
  },
  {
    "id": 24,
    "name": "US Bank Cash+",
    "issuer": "US Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 rewards bonus after $1,000 spend in 120 days",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #1e3a5f, #0284c7)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/24-us-bank-cash-plus.png",
    "rewardType": "cashback",
    "rewardProgram": "U.S. Bank Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle.",
      "The 5% rate applies to the first $2,000 in combined net purchases each quarter across both chosen categories; categories must be chosen every quarter, otherwise purchases earn 1%.",
      "The 2% everyday category excludes discount stores/supercenters and wholesale clubs."
    ],
    "cashbackCategories": [
      {
        "id": 80,
        "cardId": 24,
        "category": "Two Chosen Categories (up to $2,000/quarter combined)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 81,
        "cardId": 24,
        "category": "One Everyday Category",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 82,
        "cardId": 24,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9156,
        "cardId": 24,
        "category": "Prepaid air, hotel and car reservations in the U.S. Bank Travel Center",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 75,
        "cardId": 24,
        "name": "No Annual Fee",
        "description": "No annual fee ever",
        "annualValue": 0
      },
      {
        "id": 76,
        "cardId": 24,
        "name": "ExtendPay",
        "description": "Pay large purchases over time in fixed monthly installments",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/credit-cards/cash-plus-visa-signature-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/credit-cards/cash-plus-visa-signature-credit-card.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 80,
        "mode": "user-selected",
        "picks": 2,
        "resets": "quarter",
        "options": [
          "Cell phone providers",
          "Department stores",
          "Electronics stores",
          "Fast food",
          "Furniture stores",
          "Ground transportation",
          "Gym and fitness centers",
          "Home utilities",
          "Movie theaters",
          "Select clothing stores",
          "Sporting goods stores",
          "TV, internet and streaming services"
        ]
      },
      {
        "categoryId": 81,
        "mode": "user-selected",
        "picks": 1,
        "resets": "quarter",
        "options": [
          "Gas stations and EV charging stations",
          "Grocery stores and grocery delivery",
          "Restaurants"
        ]
      }
    ]
  },
  {
    "id": 25,
    "name": "US Bank Altitude Connect",
    "issuer": "US Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "20,000 bonus points after $1,000 spend in 90 days",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #155e75, #0891b2)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/25-us-bank-altitude-connect.png",
    "rewardType": "points",
    "rewardProgram": "U.S. Bank Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "U.S. Bank Rewards Points value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates.",
      "Gas/EV 4X and grocery 2X exclude discount stores/supercenters and wholesale clubs, which earn 1X."
    ],
    "cashbackCategories": [
      {
        "id": 306,
        "cardId": 25,
        "category": "Prepaid hotels and rental cars via Travel Center",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 307,
        "cardId": 25,
        "category": "Travel",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 308,
        "cardId": 25,
        "category": "Gas and EV charging (up to $1,000/quarter)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 309,
        "cardId": 25,
        "category": "Dining",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 310,
        "cardId": 25,
        "category": "Groceries",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 311,
        "cardId": 25,
        "category": "Streaming",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 312,
        "cardId": 25,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 289,
        "cardId": 25,
        "name": "No Annual Fee",
        "description": "U.S. Bank now lists the Altitude Connect annual fee as $0.",
        "annualValue": null
      },
      {
        "id": 290,
        "cardId": 25,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Statement credit for eligible application fee.",
        "annualValue": 25,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 291,
        "cardId": 25,
        "name": "Priority Pass Visits",
        "description": "Limited Priority Pass airport lounge visits after enrollment.",
        "annualValue": 99
      },
      {
        "id": 292,
        "cardId": 25,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on international purchases.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/credit-cards/altitude-connect-visa-signature-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/credit-cards/altitude-connect-visa-signature-credit-card.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 26,
    "name": "PNC Cash Unlimited",
    "issuer": "PNC Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 bonus after $1,000 spend in 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #1c3a5f, #f97316)",
    "logoUrl": "https://logo.clearbit.com/pnc.com",
    "cardImageUrl": "/card-images/26-pnc-cash-unlimited.png",
    "rewardType": "cashback",
    "rewardProgram": "PNC Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 88,
        "cardId": 26,
        "category": "All Purchases",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 80,
        "cardId": 26,
        "name": "No Annual Fee",
        "description": "No annual fee ever",
        "annualValue": 0
      },
      {
        "id": 81,
        "cardId": 26,
        "name": "Cell Phone Protection",
        "description": "Up to $800 reimbursement if your cell phone is stolen or damaged when you pay your monthly wireless bill with the card; limitations apply.",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.pnc.com/en/personal-banking/banking/credit-cards/pnc-cash-unlimited-visa-credit-card.html",
    "imageSourceUrl": "https://www.pnc.com/en/personal-banking/banking/credit-cards/pnc-cash-unlimited-visa-credit-card.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 27,
    "name": "United Explorer Card",
    "issuer": "Chase / United Airlines",
    "network": "Visa",
    "annualFee": 150,
    "signupBonus": "Earn up to 80,000 bonus miles after qualifying activities; see issuer page for current offer",
    "signupBonusValue": 750,
    "color": "linear-gradient(135deg, #002244, #0c2340)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/27-united-explorer-card.png",
    "rewardType": "miles",
    "rewardProgram": "United MileagePlus",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.2,
    "rewardValuationDescription": "United MileagePlus value varies by itinerary and redemption path; this app uses an estimated 1.20 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 89,
        "cardId": 27,
        "category": "United Purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 90,
        "cardId": 27,
        "category": "Dining",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 91,
        "cardId": 27,
        "category": "Hotels",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 92,
        "cardId": 27,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 82,
        "cardId": 27,
        "name": "Free First Checked Bag",
        "description": "Free first checked bag for you and a companion on United flights",
        "annualValue": 140
      },
      {
        "id": 83,
        "cardId": 27,
        "name": "Priority Boarding",
        "description": "Priority boarding on United-operated flights",
        "annualValue": null
      },
      {
        "id": 84,
        "cardId": 27,
        "name": "United Club Passes",
        "description": "Two one-time United Club passes each account anniversary year.",
        "annualValue": 118
      },
      {
        "id": 86,
        "cardId": 27,
        "name": "25% Back on In-Flight Purchases",
        "description": "On food, beverages, and Wi-Fi on United-operated flights",
        "annualValue": null
      },
      {
        "id": 717,
        "cardId": 27,
        "name": "Global Entry / TSA PreCheck / NEXUS Credit",
        "description": "Up to $120 statement credit every 4 years for a Global Entry, TSA PreCheck or NEXUS application fee charged to the card.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 718,
        "cardId": 27,
        "name": "United Hotels Credit",
        "description": "$50 back on each of the first two prepaid United Hotels stays per account anniversary year (up to $100).",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 719,
        "cardId": 27,
        "name": "Rideshare Credit",
        "description": "Up to $5 back each month on rideshare purchases, up to $60 per calendar year. Yearly opt-in required.",
        "annualValue": 60,
        "period": "monthly"
      },
      {
        "id": 720,
        "cardId": 27,
        "name": "Avis/Budget Travel Credit",
        "description": "$25 in United TravelBank cash on each of the first two Avis or Budget rentals booked through mileageplustravel.united.com per account anniversary year (up to $50).",
        "annualValue": 50,
        "period": "cardmember-year"
      },
      {
        "id": 721,
        "cardId": 27,
        "name": "Instacart Credit",
        "description": "$10 Instacart credit each month (up to $120 per calendar year) on purchases made directly through Instacart; ends 12/31/2027.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 722,
        "cardId": 27,
        "name": "JSX Credit",
        "description": "Up to $100 back each account anniversary year on flights booked directly with JSX.",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 723,
        "cardId": 27,
        "name": "$100 United Travel Credit (after $10,000 spend)",
        "description": "$100 in United TravelBank cash after $10,000 in card purchases each calendar year.",
        "annualValue": 100,
        "period": "calendar-year"
      },
      {
        "id": 724,
        "cardId": 27,
        "name": "10,000-Mile Award Flight Discount (after $20,000 spend)",
        "description": "A 10,000-mile discount on an eligible United award flight after $20,000 in card purchases each calendar year.",
        "annualValue": null,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/united/united-explorer",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/united/united-explorer",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 28,
    "name": "United Quest Card",
    "issuer": "Chase / United Airlines",
    "network": "Visa",
    "annualFee": 350,
    "signupBonus": "70,000 bonus miles + 500 PQP",
    "signupBonusValue": 900,
    "color": "linear-gradient(135deg, #1a3a5c, #002244)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/28-united-quest-card.png",
    "rewardType": "miles",
    "rewardProgram": "United MileagePlus",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.2,
    "rewardValuationDescription": "United MileagePlus value varies by itinerary and redemption path; this app uses an estimated 1.20 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 93,
        "cardId": 28,
        "category": "United Purchases",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 9101,
        "cardId": 28,
        "category": "Renowned Hotels and Resorts",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9102,
        "cardId": 28,
        "category": "Other Travel",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 94,
        "cardId": 28,
        "category": "Dining",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 95,
        "cardId": 28,
        "category": "Streaming",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 96,
        "cardId": 28,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 87,
        "cardId": 28,
        "name": "$200 United Travel Credit",
        "description": "$200 in United TravelBank cash after account opening and on each account anniversary, for a future United- or United Express-operated flight.",
        "annualValue": 200,
        "period": "cardmember-year"
      },
      {
        "id": 88,
        "cardId": 28,
        "name": "Free First & Second Checked Bags",
        "description": "For primary cardmember and a companion",
        "annualValue": 240
      },
      {
        "id": 90,
        "cardId": 28,
        "name": "Priority Boarding & Lounge Passes",
        "description": "Group 2 priority boarding on United-operated flights for the primary cardmember and companions on the same reservation (Chase values it at $48 per person per roundtrip). The Quest card does not include United Club one-time passes.",
        "annualValue": null
      },
      {
        "id": 725,
        "cardId": 28,
        "name": "10,000-Mile Anniversary Award Flight Discount",
        "description": "A 10,000-mile discount toward an eligible United award flight on each account anniversary, plus a second 10,000-mile discount after $20,000 in card purchases in a calendar year.",
        "annualValue": 120,
        "period": "cardmember-year"
      },
      {
        "id": 726,
        "cardId": 28,
        "name": "Renowned Hotels and Resorts Credit",
        "description": "Up to $150 in statement credits each account anniversary year on prepaid stays booked through Renowned Hotels and Resorts for United Cardmembers.",
        "annualValue": 150,
        "period": "cardmember-year"
      },
      {
        "id": 727,
        "cardId": 28,
        "name": "Rideshare Credit",
        "description": "Up to $8 back each month January-November and $12 in December on rideshare purchases (up to $100 per calendar year). Yearly opt-in required.",
        "annualValue": 100,
        "period": "monthly"
      },
      {
        "id": 728,
        "cardId": 28,
        "name": "Avis/Budget Travel Credit",
        "description": "$40 in United TravelBank cash on each of the first two Avis or Budget rentals booked through mileageplustravel.united.com per account anniversary year (up to $80).",
        "annualValue": 80,
        "period": "cardmember-year"
      },
      {
        "id": 729,
        "cardId": 28,
        "name": "Instacart Credit",
        "description": "One $10 and one $5 Instacart credit each month (up to $180 per calendar year) on purchases made directly through Instacart; ends 12/31/2027.",
        "annualValue": 180,
        "period": "monthly"
      },
      {
        "id": 730,
        "cardId": 28,
        "name": "JSX Credit",
        "description": "Up to $150 back each account anniversary year on flights booked directly with JSX.",
        "annualValue": 150,
        "period": "cardmember-year"
      },
      {
        "id": 731,
        "cardId": 28,
        "name": "Global Entry / TSA PreCheck / NEXUS Credit",
        "description": "Up to $120 statement credit every 4 years for a Global Entry, TSA PreCheck or NEXUS application fee charged to the card.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 732,
        "cardId": 28,
        "name": "1,000 Card Bonus PQP",
        "description": "1,000 Premier qualifying points each year, posted within 8 weeks of February 1 starting the calendar year after account opening.",
        "annualValue": null,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/united/united-quest",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/united",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 29,
    "name": "Southwest Rapid Rewards Plus",
    "issuer": "Chase / Southwest Airlines",
    "network": "Visa",
    "annualFee": 99,
    "signupBonus": "50,000 points",
    "signupBonusValue": 650,
    "color": "linear-gradient(135deg, #304cb2, #1a2c6b)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/29-southwest-rapid-rewards-plus.png",
    "rewardType": "points",
    "rewardProgram": "Southwest Rapid Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "Southwest Rapid Rewards value varies by redemption; this app uses an estimated 1.30 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "The 2x gas-station and grocery-store rate covers the first $5,000 in combined purchases per account anniversary year, then 1x; this app resets that cap each calendar year."
    ],
    "cashbackCategories": [
      {
        "id": 97,
        "cardId": 29,
        "category": "Southwest Purchases",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 99,
        "cardId": 29,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9124,
        "cardId": 29,
        "category": "Gas Stations and Grocery Stores (first $5,000/year combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9125,
        "cardId": 29,
        "category": "Lyft (through 12/31/2027)",
        "rate": 0.02,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 91,
        "cardId": 29,
        "name": "3,000 Anniversary Points",
        "description": "Bonus points each cardmember anniversary",
        "annualValue": 40,
        "period": "cardmember-year"
      },
      {
        "id": 93,
        "cardId": 29,
        "name": "25% Back on In-Flight Purchases",
        "description": "On in-flight Wi-Fi, drinks, and messaging",
        "annualValue": null
      },
      {
        "id": 733,
        "cardId": 29,
        "name": "Free First Checked Bag",
        "description": "First checked bag free for the cardmember and up to 8 other passengers on the same reservation (Chase: saves up to $90 round trip).",
        "annualValue": null
      },
      {
        "id": 734,
        "cardId": 29,
        "name": "10% Flight Discount Promo Code",
        "description": "A 10% promo code each cardmember anniversary (excludes Basic fares).",
        "annualValue": null,
        "period": "cardmember-year"
      },
      {
        "id": 735,
        "cardId": 29,
        "name": "Standard Seat Selection and Group 5 Boarding",
        "description": "Select a Standard seat within 48 hours of departure when available; the cardmember and up to 8 companions on the reservation board in Group 5.",
        "annualValue": null
      },
      {
        "id": 736,
        "cardId": 29,
        "name": "DashPass Membership",
        "description": "12 months of complimentary DashPass when first activated by 12/31/2027, plus $10 off one non-restaurant DoorDash order each calendar month through 12/31/2027 for memberships activated on or after 9/1/2026 (earlier activations get $10 per calendar quarter).",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 737,
        "cardId": 29,
        "name": "Instacart Credit",
        "description": "$10 Instacart credit each month while an Instacart+ member (3 months of Instacart+ complimentary), through 12/31/2027.",
        "annualValue": 120,
        "period": "monthly"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest/plus",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 30,
    "name": "Southwest Rapid Rewards Priority",
    "issuer": "Chase / Southwest Airlines",
    "network": "Visa",
    "annualFee": 229,
    "signupBonus": "50,000 points",
    "signupBonusValue": 650,
    "color": "linear-gradient(135deg, #f9b510, #e07b00)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/30-southwest-rapid-rewards-priority.png",
    "rewardType": "points",
    "rewardProgram": "Southwest Rapid Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "Southwest Rapid Rewards value varies by redemption; this app uses an estimated 1.30 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 100,
        "cardId": 30,
        "category": "Southwest Purchases",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 9110,
        "cardId": 30,
        "category": "Gas and Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 104,
        "cardId": 30,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9126,
        "cardId": 30,
        "category": "Lyft (through 12/31/2027)",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 95,
        "cardId": 30,
        "name": "7,500 Anniversary Points",
        "description": "Bonus points each year",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 738,
        "cardId": 30,
        "name": "25% Back on In-Flight Purchases",
        "description": "25% back as a statement credit on inflight purchases.",
        "annualValue": null
      },
      {
        "id": 739,
        "cardId": 30,
        "name": "Free First Checked Bag",
        "description": "First checked bag free for the cardmember and up to 8 other passengers on the same reservation (Chase: saves up to $90 round trip).",
        "annualValue": null
      },
      {
        "id": 740,
        "cardId": 30,
        "name": "Preferred Seat, Extra Legroom Upgrades and Group 5 Boarding",
        "description": "Select a Preferred seat at booking and get unlimited upgrades to an Extra Legroom seat within 48 hours of departure when available; the cardmember and up to 8 companions board in Group 5.",
        "annualValue": null
      },
      {
        "id": 741,
        "cardId": 30,
        "name": "2,500 Tier Qualifying Points per $5,000 Spent",
        "description": "2,500 A-List tier qualifying points for each $5,000 in purchases each year.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 742,
        "cardId": 30,
        "name": "DashPass Membership",
        "description": "12 months of complimentary DashPass when first activated by 12/31/2027, plus $10 off one non-restaurant DoorDash order each calendar month through 12/31/2027 for memberships activated on or after 9/1/2026 (earlier activations get $10 per calendar quarter).",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 743,
        "cardId": 30,
        "name": "Instacart Credit",
        "description": "$10 Instacart credit each month while an Instacart+ member (3 months of Instacart+ complimentary), through 12/31/2027.",
        "annualValue": 120,
        "period": "monthly"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest/priority",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 31,
    "name": "Delta SkyMiles Gold American Express",
    "issuer": "American Express / Delta",
    "network": "Amex",
    "annualFee": 150,
    "signupBonus": "50,000 bonus miles",
    "signupBonusValue": 600,
    "color": "linear-gradient(135deg, #c5a368, #8b6f3c)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/31-delta-skymiles-gold-american-express.png",
    "rewardType": "miles",
    "rewardProgram": "Delta SkyMiles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.1,
    "rewardValuationDescription": "Delta SkyMiles value varies by itinerary and redemption path; this app uses an estimated 1.10 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 105,
        "cardId": 31,
        "category": "Delta Purchases",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 106,
        "cardId": 31,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 107,
        "cardId": 31,
        "category": "Groceries",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 108,
        "cardId": 31,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 99,
        "cardId": 31,
        "name": "$200 Delta Flight Credit",
        "description": "After spending $10,000 in a calendar year",
        "annualValue": 200,
        "period": "calendar-year"
      },
      {
        "id": 100,
        "cardId": 31,
        "name": "Priority Boarding",
        "description": "Main Cabin 1 priority boarding",
        "annualValue": null
      },
      {
        "id": 101,
        "cardId": 31,
        "name": "20% Back on In-Flight Purchases",
        "description": "Statement credit on Delta in-flight purchases",
        "annualValue": 30
      },
      {
        "id": 881,
        "cardId": 31,
        "name": "Free First and Second Checked Bag",
        "description": "First checked bag free on Delta flights for the cardmember and up to 8 companions on the same reservation; the Basic Card Member's second checked bag is also free on domestic Delta flights (added 2026-06-04).",
        "annualValue": 240
      },
      {
        "id": 882,
        "cardId": 31,
        "name": "$120 Rideshare Credit",
        "description": "Up to $10 in statement credits each month on eligible U.S. rideshare purchases with select providers, available after the first card renewal; enrollment required.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 883,
        "cardId": 31,
        "name": "$100 Delta Stays Credit",
        "description": "Up to $100 back per calendar year in statement credits on prepaid hotels or vacation rentals booked through Delta Stays on delta.com.",
        "annualValue": 100,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-gold-american-express-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-gold-american-express-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 32,
    "name": "Delta SkyMiles Platinum American Express",
    "issuer": "American Express / Delta",
    "network": "Amex",
    "annualFee": 350,
    "signupBonus": "75,000 bonus miles",
    "signupBonusValue": 900,
    "color": "linear-gradient(135deg, #b8b8b8, #6e6e6e)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/32-delta-skymiles-platinum-american-express.png",
    "rewardType": "miles",
    "rewardProgram": "Delta SkyMiles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.1,
    "rewardValuationDescription": "Delta SkyMiles value varies by itinerary and redemption path; this app uses an estimated 1.10 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 109,
        "cardId": 32,
        "category": "Delta Purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 110,
        "cardId": 32,
        "category": "Hotels",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 111,
        "cardId": 32,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 112,
        "cardId": 32,
        "category": "Groceries",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 113,
        "cardId": 32,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 102,
        "cardId": 32,
        "name": "Companion Certificate",
        "description": "Each year after card renewal, a round-trip Delta Main companion certificate within the U.S. and to Mexico, the Caribbean or Central America; also redeemable toward the eligible flight portion of a Delta Vacations package. Government taxes and fees of $22-$250 apply.",
        "annualValue": 400,
        "period": "cardmember-year"
      },
      {
        "id": 104,
        "cardId": 32,
        "name": "$120 Resy Credit",
        "description": "Up to $10/month at U.S. Resy restaurants",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 105,
        "cardId": 32,
        "name": "$120 Rideshare Credit",
        "description": "Up to $10/month for U.S. rideshare",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 884,
        "cardId": 32,
        "name": "Free First and Second Checked Bag",
        "description": "First checked bag free on Delta flights for the cardmember and up to 8 companions on the same reservation; second checked bag also free on domestic Delta flights (added 2026-06-04).",
        "annualValue": 240
      },
      {
        "id": 885,
        "cardId": 32,
        "name": "MQD Headstart and MQD Boost",
        "description": "$2,500 Medallion Qualification Dollars each Medallion Qualification Year (MQD Headstart), plus $1 MQD for every $20 of eligible purchases on the card in a calendar year (MQD Boost).",
        "annualValue": null
      },
      {
        "id": 886,
        "cardId": 32,
        "name": "$150 Delta Stays Credit",
        "description": "Up to $150 back per calendar year in statement credits on prepaid hotels or vacation rentals booked through Delta Stays on delta.com.",
        "annualValue": 150,
        "period": "calendar-year"
      },
      {
        "id": 887,
        "cardId": 32,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "A $120 statement credit for a Global Entry application or up to $85 for TSA PreCheck (through an official enrollment provider) every 4 years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-platinum-american-express-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-platinum-american-express-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 33,
    "name": "Delta SkyMiles Reserve American Express",
    "issuer": "American Express / Delta",
    "network": "Amex",
    "annualFee": 650,
    "signupBonus": "100,000 bonus miles",
    "signupBonusValue": 1200,
    "color": "linear-gradient(135deg, #1a1a1a, #404040)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/33-delta-skymiles-reserve-american-express.webp",
    "rewardType": "miles",
    "rewardProgram": "Delta SkyMiles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.1,
    "rewardValuationDescription": "Delta SkyMiles value varies by itinerary and redemption path; this app uses an estimated 1.10 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 114,
        "cardId": 33,
        "category": "Delta Purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 115,
        "cardId": 33,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 107,
        "cardId": 33,
        "name": "Delta Sky Club Access",
        "description": "Complimentary access when flying Delta on the day of travel (15 visits/year)",
        "annualValue": null
      },
      {
        "id": 108,
        "cardId": 33,
        "name": "Centurion Lounge Access",
        "description": "Access when flying Delta-operated flights booked with this card",
        "annualValue": null
      },
      {
        "id": 109,
        "cardId": 33,
        "name": "Companion Certificate (First/Comfort+/Main)",
        "description": "Each year after card renewal, a round-trip companion certificate in Delta First, Delta Comfort or Delta Main within the U.S. and to Mexico, the Caribbean or Central America; also redeemable toward the eligible flight portion of a Delta Vacations package. Government taxes and fees of $22-$250 apply.",
        "annualValue": 700,
        "period": "cardmember-year"
      },
      {
        "id": 110,
        "cardId": 33,
        "name": "$240 Resy Credit",
        "description": "Up to $20/month at U.S. Resy restaurants",
        "annualValue": 240,
        "period": "monthly"
      },
      {
        "id": 111,
        "cardId": 33,
        "name": "$120 Rideshare Credit",
        "description": "Up to $10/month for U.S. rideshare",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 888,
        "cardId": 33,
        "name": "Free First and Second Checked Bag",
        "description": "First checked bag free on Delta flights worldwide; second checked bag also free on domestic Delta flights (added 2026-06-04).",
        "annualValue": null
      },
      {
        "id": 889,
        "cardId": 33,
        "name": "$200 Delta Stays Credit",
        "description": "Up to $200 back per calendar year in statement credits on prepaid hotels or vacation rentals booked through Delta Stays on delta.com.",
        "annualValue": 200,
        "period": "calendar-year"
      },
      {
        "id": 890,
        "cardId": 33,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "A statement credit every 4 years for a Global Entry application ($120), or up to $85 for a five-year TSA PreCheck membership through an official enrollment provider.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 891,
        "cardId": 33,
        "name": "MQD Headstart and MQD Boost",
        "description": "$2,500 Medallion Qualification Dollars each Medallion Qualification Year (MQD Headstart), plus $1 MQD for every $10 of purchases on the card in a calendar year (MQD Boost).",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-reserve-american-express-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-reserve-american-express-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 34,
    "name": "Citi / AAdvantage Platinum Select",
    "issuer": "Citi / American Airlines",
    "network": "Mastercard",
    "annualFee": 99,
    "signupBonus": "50,000 AAdvantage miles",
    "signupBonusValue": 650,
    "color": "linear-gradient(135deg, #d6e9f7, #a3c8e8)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/34-citi-aadvantage-platinum-select.jpg",
    "rewardType": "miles",
    "rewardProgram": "American Airlines AAdvantage",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "American Airlines AAdvantage value varies by itinerary and redemption path; this app uses an estimated 1.30 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Announced 2026-10-27, effective 2027-01-24: annual fee rises from $99 to $150 (first year still waived); adds 3x on AAdvantage Hotels and Cars bookings and 2x at gas and EV charging stations, select streaming and eligible Rides and Rails purchases; flight discount rises to $150; adds an up-to-$120 Global Entry/TSA PreCheck credit every 4 years and up to $100 a year in inflight credits. The catalog keeps today's terms until then."
    ],
    "cashbackCategories": [
      {
        "id": 116,
        "cardId": 34,
        "category": "American Airlines Purchases",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 117,
        "cardId": 34,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 118,
        "cardId": 34,
        "category": "Gas",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 119,
        "cardId": 34,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 113,
        "cardId": 34,
        "name": "Free First Checked Bag",
        "description": "Free first checked bag on domestic AA flights for you and up to 4 companions",
        "annualValue": 200
      },
      {
        "id": 114,
        "cardId": 34,
        "name": "Preferred Boarding",
        "description": "Group 5 preferred boarding on AA flights",
        "annualValue": null
      },
      {
        "id": 115,
        "cardId": 34,
        "name": "25% Back on In-Flight Purchases",
        "description": "On AA in-flight food and beverages",
        "annualValue": null
      },
      {
        "id": 116,
        "cardId": 34,
        "name": "$125 American Airlines Flight Discount",
        "description": "$125 American Airlines flight discount after $20,000 in purchases in a cardmembership year and card renewal.",
        "annualValue": 125,
        "period": "cardmember-year"
      },
      {
        "id": 826,
        "cardId": 34,
        "name": "Turo Credit",
        "description": "Up to $30 back per eligible completed Turo trip paid with the card (card linked to the Turo account), up to $180 per calendar year.",
        "annualValue": 180,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-aadvantage-platinum-select-world-elite-mastercard",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-aadvantage-platinum-select-world-elite-mastercard",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 35,
    "name": "Atmos Rewards Ascent Visa Signature",
    "issuer": "Bank of America / Alaska Airlines",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "80,000 bonus points plus a 50% flight discount code after qualifying spend; see issuer page for current offer",
    "signupBonusValue": 900,
    "color": "linear-gradient(135deg, #01426a, #00558c)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/35-atmos-rewards-ascent-visa-signature.png",
    "rewardType": "points",
    "rewardProgram": "Atmos Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.4,
    "rewardValuationDescription": "Atmos Rewards value varies by redemption; this app uses an estimated 1.40 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "The 2x bucket is Bank of America's 'gas, EV charging station, cable, streaming services and local transit (including rideshare)' category. The label says 'pay TV' for cable so the app does not also pay 2x on wireless phone bills (Phone and Internet), which the issuer does not name. Groceries earn 1x.",
      "Cardholders with an eligible Bank of America account earn a 10% bonus on points from card purchases; it is not included in the rates shown."
    ],
    "cashbackCategories": [
      {
        "id": 120,
        "cardId": 35,
        "category": "Alaska Airlines and Hawaiian Airlines purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 121,
        "cardId": 35,
        "category": "Gas, EV charging, pay TV, streaming and local transit including rideshare",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 123,
        "cardId": 35,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 117,
        "cardId": 35,
        "name": "Annual Companion Fare",
        "description": "$99 Companion Fare (plus taxes and fees from $23) each account anniversary, issued after spending $6,000 or more on purchases in the prior anniversary year. Valid on Alaska and Hawaiian Airlines flights.",
        "annualValue": 350,
        "period": "cardmember-year"
      },
      {
        "id": 118,
        "cardId": 35,
        "name": "Free First Checked Bag",
        "description": "Free checked bag and preferred boarding for you and up to 6 guests on the same reservation when the Alaska or Hawaiian Airlines flight is paid with the card.",
        "annualValue": null
      },
      {
        "id": 119,
        "cardId": 35,
        "name": "20% Back on In-Flight Purchases",
        "description": "20% back as a statement credit on Alaska and Hawaiian Airlines in-flight purchases paid with the card.",
        "annualValue": 20
      },
      {
        "id": 120,
        "cardId": 35,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": null
      },
      {
        "id": 841,
        "cardId": 35,
        "name": "Alaska Lounge+ Membership Discount",
        "description": "$100 off an annual Alaska Lounge+ membership purchased with the card.",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/alaska-airlines-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/alaska-airlines-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 36,
    "name": "Marriott Bonvoy Boundless",
    "issuer": "Chase / Marriott Bonvoy",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "3 Free Night Awards",
    "signupBonusValue": 1050,
    "color": "linear-gradient(135deg, #4a2c5a, #2d1a39)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/36-marriott-bonvoy-boundless.png",
    "rewardType": "points",
    "rewardProgram": "Marriott Bonvoy",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.7,
    "rewardValuationDescription": "Marriott Bonvoy value varies by redemption; this app uses an estimated 0.70 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "The 3x grocery, gas, and dining categories share a combined annual spend cap before base earning applies."
    ],
    "cashbackCategories": [
      {
        "id": 124,
        "cardId": 36,
        "category": "Marriott Bonvoy Hotels",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 125,
        "cardId": 36,
        "category": "Gas (up to $6,000/yr combined)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 126,
        "cardId": 36,
        "category": "Groceries (up to $6,000/yr combined)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 127,
        "cardId": 36,
        "category": "Dining (up to $6,000/yr combined)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 128,
        "cardId": 36,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 121,
        "cardId": 36,
        "name": "Annual Free Night Award",
        "description": "Each cardmember anniversary, valued up to 35,000 points",
        "annualValue": 350,
        "period": "cardmember-year"
      },
      {
        "id": 122,
        "cardId": 36,
        "name": "Automatic Silver Elite Status",
        "description": "Bonvoy Silver Elite each year",
        "annualValue": null
      },
      {
        "id": 123,
        "cardId": 36,
        "name": "15 Elite Night Credits",
        "description": "Earn 15 Elite Night Credits each year toward higher status",
        "annualValue": 120
      },
      {
        "id": 124,
        "cardId": 36,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": null
      },
      {
        "id": 744,
        "cardId": 36,
        "name": "Airline Statement Credit",
        "description": "Limited-time: $50 back after $250 in purchases directly with airlines in each of two windows (up to $100). Existing cardmembers (by 1/7/2026, one-time activation): Jan-Jun and Jul-Dec 2026. New cardmembers applying 6/4/2026-12/31/2026: 6/4-12/31/2026 and 1/1-6/30/2027.",
        "annualValue": 100,
        "period": "semiannual"
      },
      {
        "id": 745,
        "cardId": 36,
        "name": "DashPass Membership",
        "description": "12 months of complimentary DashPass when first activated by 12/31/2027, plus $10 off one non-restaurant DoorDash order each calendar quarter through 12/31/2027.",
        "annualValue": 40,
        "period": "quarterly"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/boundless",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/boundless",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 37,
    "name": "World of Hyatt Credit Card",
    "issuer": "Chase / Hyatt",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "30,000 points + up to 30,000 more after $15K spend",
    "signupBonusValue": 1100,
    "color": "linear-gradient(135deg, #2d4373, #1a2a4d)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/37-world-of-hyatt-credit-card.png",
    "rewardType": "points",
    "rewardProgram": "World of Hyatt",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.7,
    "rewardValuationDescription": "World of Hyatt value varies by redemption; this app uses an estimated 1.70 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 129,
        "cardId": 37,
        "category": "Hyatt Hotels",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 130,
        "cardId": 37,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 131,
        "cardId": 37,
        "category": "Airline Tickets",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 132,
        "cardId": 37,
        "category": "Local Transit & Commuting",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 133,
        "cardId": 37,
        "category": "Fitness Clubs & Gym Memberships",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 134,
        "cardId": 37,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 125,
        "cardId": 37,
        "name": "Free Night at Category 1-4 Hyatt",
        "description": "Awarded each cardmember anniversary",
        "annualValue": 300,
        "period": "cardmember-year"
      },
      {
        "id": 126,
        "cardId": 37,
        "name": "Automatic Discoverist Status",
        "description": "Hyatt Discoverist status each year",
        "annualValue": null
      },
      {
        "id": 127,
        "cardId": 37,
        "name": "5 Elite Night Credits",
        "description": "Plus 2 more for every $5K spent toward higher status",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/world-of-hyatt-credit-card",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/world-of-hyatt",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 38,
    "name": "IHG One Rewards Premier",
    "issuer": "Chase / IHG",
    "network": "Mastercard",
    "annualFee": 150,
    "signupBonus": "Up to 185,000 bonus points, subject to issuer terms",
    "signupBonusValue": 925,
    "color": "linear-gradient(135deg, #c0392b, #7d2018)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/38-ihg-one-rewards-premier.png",
    "rewardType": "points",
    "rewardProgram": "IHG One Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.5,
    "rewardValuationDescription": "IHG One Rewards value varies by redemption; this app uses an estimated 0.50 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "IHG's official marketing may show a higher total hotel earn rate by adding base IHG One Rewards points and elite-status bonus points; this app calculates only the credit-card earn rate.",
      "5x on all travel applies only to purchases posted through 12/31/2026; from 1/1/2027 only airline tickets bought directly from the airline and car rental agencies earn 5x and other travel earns 3x.",
      "Chase's 10/1/2026 refresh set the annual fee at $150 (was $99); existing cardmembers move to the new fee in 2027 and were notified in October 2026 of the effective date of each benefit change."
    ],
    "cashbackCategories": [
      {
        "id": 135,
        "cardId": 38,
        "category": "IHG Hotels",
        "rate": 0.1,
        "isDefault": false
      },
      {
        "id": 136,
        "cardId": 38,
        "category": "Travel (through 12/31/2026)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 137,
        "cardId": 38,
        "category": "Dining",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 138,
        "cardId": 38,
        "category": "Gas",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 139,
        "cardId": 38,
        "category": "Other",
        "rate": 0.03,
        "isDefault": true
      },
      {
        "id": 9127,
        "cardId": 38,
        "category": "Flights Booked Directly with Airlines",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9128,
        "cardId": 38,
        "category": "Car Rentals",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9129,
        "cardId": 38,
        "category": "Grocery Stores",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 128,
        "cardId": 38,
        "name": "Anniversary Free Night",
        "description": "A Free Night after each card anniversary at an IHG hotel with a redemption cap of 50,000 points; points can be added for pricier nights.",
        "annualValue": 250,
        "period": "cardmember-year"
      },
      {
        "id": 130,
        "cardId": 38,
        "name": "4th Night Free",
        "description": "When redeeming points for an award stay of 4+ nights",
        "annualValue": null
      },
      {
        "id": 131,
        "cardId": 38,
        "name": "$50 United TravelBank Cash",
        "description": "After registering the card with a MileagePlus account: $25 in United TravelBank cash for January-June and another $25 for July-December, up to $50 each calendar year. No spend requirement.",
        "annualValue": 50,
        "period": "semiannual"
      },
      {
        "id": 746,
        "cardId": 38,
        "name": "Automatic Gold Elite Status",
        "description": "Automatic IHG One Rewards Gold Elite status; Platinum Elite after $15,000 and Diamond Elite after $40,000 in purchases in a calendar year.",
        "annualValue": null
      },
      {
        "id": 747,
        "cardId": 38,
        "name": "Global Entry / TSA PreCheck / NEXUS Credit",
        "description": "Up to $120 statement credit every 4 years for a Global Entry, TSA PreCheck or NEXUS application fee charged to the card.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 748,
        "cardId": 38,
        "name": "Food and Beverage Rewards",
        "description": "A $25 Food and Beverage Reward voucher each quarter to use at IHG hotels (up to $100 a year).",
        "annualValue": 100,
        "period": "quarterly"
      },
      {
        "id": 749,
        "cardId": 38,
        "name": "Airline Statement Credit",
        "description": "$100 statement credit after $250 on flights purchased directly with an airline each calendar year, through 12/31/2027.",
        "annualValue": 100,
        "period": "calendar-year"
      },
      {
        "id": 750,
        "cardId": 38,
        "name": "DashPass Membership",
        "description": "12 months of complimentary DashPass when first activated by 12/31/2027, plus $10 off one non-restaurant DoorDash order each calendar month through 12/31/2027 for memberships activated on or after 9/1/2026 (earlier activations get $10 per calendar quarter).",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 751,
        "cardId": 38,
        "name": "Instacart Credit",
        "description": "$10 Instacart credit each month (up to $120 per calendar year) while an Instacart+ member (3 months complimentary); ends 12/31/2027.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 752,
        "cardId": 38,
        "name": "15 Elite Night Credits",
        "description": "15 Elite Night Credits at account opening and each January, plus 2 more for every $5,000 spent and 5 more after $15,000 in a calendar year.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 753,
        "cardId": 38,
        "name": "15,000 Bonus Points After $15,000 Annual Spend",
        "description": "15,000 bonus points after $15,000 in purchases each calendar year.",
        "annualValue": 75,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/premier",
    "imageSourceUrl": "https://www.ihg.com/onerewards/content/us/en/creditcard",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 39,
    "name": "Marriott Bonvoy Brilliant American Express",
    "issuer": "American Express / Marriott Bonvoy",
    "network": "Amex",
    "annualFee": 650,
    "signupBonus": "95,000 bonus points",
    "signupBonusValue": 950,
    "color": "linear-gradient(135deg, #2c2c2c, #1a1a1a)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/39-marriott-bonvoy-brilliant-american-express.png",
    "rewardType": "points",
    "rewardProgram": "Marriott Bonvoy",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.7,
    "rewardValuationDescription": "Marriott Bonvoy value varies by redemption; this app uses an estimated 0.70 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 140,
        "cardId": 39,
        "category": "Marriott Bonvoy Hotels",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 141,
        "cardId": 39,
        "category": "Restaurants",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 142,
        "cardId": 39,
        "category": "Flights",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 143,
        "cardId": 39,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 133,
        "cardId": 39,
        "name": "Annual Free Night (85K points)",
        "description": "Each cardmember anniversary, up to 85,000 Bonvoy points",
        "annualValue": 750,
        "period": "cardmember-year"
      },
      {
        "id": 134,
        "cardId": 39,
        "name": "Automatic Platinum Elite Status",
        "description": "Bonvoy Platinum Elite each year",
        "annualValue": null
      },
      {
        "id": 136,
        "cardId": 39,
        "name": "$100 Property Credit",
        "description": "On qualifying 2-night stays at The Ritz-Carlton or St. Regis",
        "annualValue": 100
      },
      {
        "id": 137,
        "cardId": 39,
        "name": "Priority Pass Lounge Access",
        "description": "Unlimited Priority Pass Select lounge access",
        "annualValue": 429
      },
      {
        "id": 892,
        "cardId": 39,
        "name": "$300 Brilliant Dining Credit",
        "description": "Up to $25 in statement credits each month (up to $300 per calendar year) for eligible purchases at restaurants worldwide.",
        "annualValue": 300,
        "period": "monthly"
      },
      {
        "id": 893,
        "cardId": 39,
        "name": "25 Elite Night Credits",
        "description": "25 Elite Night Credits each calendar year toward the next level of Marriott Bonvoy Elite status.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 894,
        "cardId": 39,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "A $120 statement credit for a Global Entry application every 4 years, or up to $85 toward a five-year TSA PreCheck membership through an official enrollment provider.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-brilliant/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-brilliant/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 40,
    "name": "Hilton Honors American Express Surpass",
    "issuer": "American Express / Hilton",
    "network": "Amex",
    "annualFee": 150,
    "signupBonus": "130,000 bonus points",
    "signupBonusValue": 650,
    "color": "linear-gradient(135deg, #002b5b, #003e80)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/40-hilton-honors-american-express-surpass.png",
    "rewardType": "points",
    "rewardProgram": "Hilton Honors",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.5,
    "rewardValuationDescription": "Hilton Honors value varies by redemption; this app uses an estimated 0.50 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 144,
        "cardId": 40,
        "category": "Hilton Hotels",
        "rate": 0.12,
        "isDefault": false
      },
      {
        "id": 145,
        "cardId": 40,
        "category": "Restaurants",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 146,
        "cardId": 40,
        "category": "Groceries",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 147,
        "cardId": 40,
        "category": "Gas",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 148,
        "cardId": 40,
        "category": "Other",
        "rate": 0.03,
        "isDefault": true
      },
      {
        "id": 9165,
        "cardId": 40,
        "category": "U.S. Online Retail",
        "rate": 0.04,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 139,
        "cardId": 40,
        "name": "Free Night Reward",
        "description": "After spending $15K in a calendar year",
        "annualValue": 300,
        "period": "calendar-year"
      },
      {
        "id": 140,
        "cardId": 40,
        "name": "Automatic Hilton Honors Gold Status",
        "description": "Bonus points and complimentary breakfast at many properties",
        "annualValue": null
      },
      {
        "id": 141,
        "cardId": 40,
        "name": "Path to Diamond Status",
        "description": "Spend $40K to earn Diamond status for the year",
        "annualValue": null
      },
      {
        "id": 895,
        "cardId": 40,
        "name": "$200 Hilton Credit",
        "description": "Up to $50 in statement credits each quarter (up to $200 per year) on purchases made directly with a property in the Hilton portfolio.",
        "annualValue": 200,
        "period": "quarterly"
      },
      {
        "id": 896,
        "cardId": 40,
        "name": "National Car Rental Emerald Club Executive Status",
        "description": "Complimentary National Car Rental Emerald Club Executive status, including Executive Area access in the U.S. and Canada; enrollment required.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/hilton-honors-surpass/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/hilton-honors-surpass/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 41,
    "name": "Hilton Honors American Express Aspire",
    "issuer": "American Express / Hilton",
    "network": "Amex",
    "annualFee": 550,
    "signupBonus": "150,000 bonus points",
    "signupBonusValue": 850,
    "color": "linear-gradient(135deg, #b89b6a, #7a663f)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/41-hilton-honors-american-express-aspire.png",
    "rewardType": "points",
    "rewardProgram": "Hilton Honors",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.5,
    "rewardValuationDescription": "Hilton Honors value varies by redemption; this app uses an estimated 0.50 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 149,
        "cardId": 41,
        "category": "Hilton Hotels",
        "rate": 0.14,
        "isDefault": false
      },
      {
        "id": 150,
        "cardId": 41,
        "category": "Flights",
        "rate": 0.07,
        "isDefault": false
      },
      {
        "id": 151,
        "cardId": 41,
        "category": "Rental Cars",
        "rate": 0.07,
        "isDefault": false
      },
      {
        "id": 152,
        "cardId": 41,
        "category": "Restaurants",
        "rate": 0.07,
        "isDefault": false
      },
      {
        "id": 153,
        "cardId": 41,
        "category": "Other",
        "rate": 0.03,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 143,
        "cardId": 41,
        "name": "Annual Free Night Reward",
        "description": "Use at virtually any Hilton property",
        "annualValue": 1000,
        "period": "cardmember-year"
      },
      {
        "id": 144,
        "cardId": 41,
        "name": "Automatic Hilton Honors Diamond Status",
        "description": "Top-tier elite status with breakfast, room upgrades, lounge access",
        "annualValue": null
      },
      {
        "id": 145,
        "cardId": 41,
        "name": "$400 Hilton Resort Credit",
        "description": "$200 semi-annually at participating Hilton resorts",
        "annualValue": 400,
        "period": "semiannual"
      },
      {
        "id": 146,
        "cardId": 41,
        "name": "$200 Flight Credit",
        "description": "$50 quarterly toward eligible flight purchases",
        "annualValue": 200,
        "period": "quarterly"
      },
      {
        "id": 897,
        "cardId": 41,
        "name": "$219 CLEAR Plus Credit",
        "description": "Up to $219 in statement credits per calendar year for an annual CLEAR+ membership paid with the card.",
        "annualValue": 219,
        "period": "calendar-year"
      },
      {
        "id": 898,
        "cardId": 41,
        "name": "Bonus Free Night Rewards at Spend Thresholds",
        "description": "Each calendar year, a Hilton Free Night Reward after $30,000 in purchases on the card and another after an additional $30,000.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 899,
        "cardId": 41,
        "name": "National Car Rental Emerald Club Executive Status",
        "description": "Complimentary National Car Rental Emerald Club Executive status, including Executive Area access in the U.S. and Canada; enrollment required.",
        "annualValue": null
      },
      {
        "id": 900,
        "cardId": 41,
        "name": "$100 Waldorf Astoria & Conrad Property Credit",
        "description": "Up to $100 credit for qualifying charges at Waldorf Astoria and Conrad properties on a two-night minimum stay booked with the card at HiltonHonorsAspireCard.com using the Aspire Card Benefit rate.",
        "annualValue": 100
      },
      {
        "id": 901,
        "cardId": 41,
        "name": "Cell Phone Protection",
        "description": "Reimbursement to repair or replace a damaged or stolen phone, up to $800 per claim and 2 approved claims per 12 months with a $50 deductible, when the prior month's wireless bill was paid with the card.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/hilton-honors-aspire/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/hilton-honors-aspire/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 42,
    "name": "Wyndham Rewards Earner+ Card",
    "issuer": "Barclays / Wyndham Rewards",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "45,000 points",
    "signupBonusValue": 450,
    "color": "linear-gradient(135deg, #00407a, #002b54)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/42-wyndham-rewards-earner-plus-card.webp",
    "rewardType": "points",
    "rewardProgram": "Wyndham Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.9,
    "rewardValuationDescription": "Wyndham Rewards value varies by redemption; this app uses an estimated 0.90 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "4X dining and grocery exclude Target and Walmart; Vacation Club purchases also earn 4X (down payments earn 1X)."
    ],
    "cashbackCategories": [
      {
        "id": 154,
        "cardId": 42,
        "category": "Hotels by Wyndham",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 155,
        "cardId": 42,
        "category": "Dining",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 156,
        "cardId": 42,
        "category": "Groceries",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 157,
        "cardId": 42,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9162,
        "cardId": 42,
        "category": "Travel incl. gas, EV charging, airfare, car rentals, rideshare, tolls and trains",
        "rate": 0.04,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 150,
        "cardId": 42,
        "name": "Automatic Wyndham Diamond Status",
        "description": "Wyndham Rewards Diamond member level for the first year, then Platinum.",
        "annualValue": null
      },
      {
        "id": 151,
        "cardId": 42,
        "name": "10% Off Award Redemptions",
        "description": "Redeem stays for 10% fewer points",
        "annualValue": 100
      },
      {
        "id": 152,
        "cardId": 42,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": null
      },
      {
        "id": 856,
        "cardId": 42,
        "name": "15,000 Anniversary Bonus Points",
        "description": "15,000 bonus points each account anniversary year after the annual fee is paid.",
        "annualValue": 135,
        "period": "cardmember-year"
      },
      {
        "id": 857,
        "cardId": 42,
        "name": "Meal Delivery Credit",
        "description": "Up to $25 in statement credits every 6 months on eligible meal delivery purchases, up to $50 per calendar year.",
        "annualValue": 50,
        "period": "semiannual"
      },
      {
        "id": 858,
        "cardId": 42,
        "name": "Annual Free Night Award",
        "description": "15,000 Wyndham Rewards points (marketed as a free night) after five qualifying nights at Hotels by Wyndham paid with the card; capped at 15,000 points per calendar year.",
        "annualValue": 135,
        "period": "calendar-year"
      },
      {
        "id": 859,
        "cardId": 42,
        "name": "National Car Rental Emerald Club Executive Status",
        "description": "Complimentary Emerald Club Executive status with National Car Rental.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.wyndhamrewardscreditcard.com/earner-plus/",
    "imageSourceUrl": "https://www.uscreditcardguide.com/barclaycard-wyndham-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 43,
    "name": "Apple Card",
    "issuer": "Goldman Sachs / Apple",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #1f2937, #4b5563)",
    "logoUrl": "https://logo.clearbit.com/apple.com",
    "cardImageUrl": "/card-images/43-apple-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "Apple Daily Cash",
    "rewardUnitName": "Daily Cash",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Apple Card earns 3% Daily Cash on purchases from Apple and select Apple Pay merchants, 2% on other Apple Pay purchases, and 1% with the titanium card or card number.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Issuer transition: on 2026-01-07 Apple and JPMorgan Chase announced that Chase will become the Apple Card issuer in approximately 24 months, subject to regulatory approvals. Until it closes, Goldman Sachs Bank USA remains the issuer; Apple says Daily Cash and the no-fee terms continue during the transition."
    ],
    "cashbackCategories": [
      {
        "id": 158,
        "cardId": 43,
        "category": "Apple Purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9001,
        "cardId": 43,
        "category": "Ace Hardware with Apple Pay",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9002,
        "cardId": 43,
        "category": "Booking.com with Apple Pay",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9003,
        "cardId": 43,
        "category": "ChargePoint with Apple Pay",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9004,
        "cardId": 43,
        "category": "Exxon and Mobil with Apple Pay",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9005,
        "cardId": 43,
        "category": "Nike with Apple Pay",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9006,
        "cardId": 43,
        "category": "Hertz with Apple Pay",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9007,
        "cardId": 43,
        "category": "Uber and Uber Eats with Apple Pay",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9008,
        "cardId": 43,
        "category": "Walgreens and Duane Reade with Apple Pay",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 159,
        "cardId": 43,
        "category": "Apple Pay Purchases",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 160,
        "cardId": 43,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 153,
        "cardId": 43,
        "name": "Daily Cash",
        "description": "Cash back is deposited daily directly to your Apple Cash account",
        "annualValue": null
      },
      {
        "id": 154,
        "cardId": 43,
        "name": "No Annual Fee",
        "description": "No annual fee, no late fees, no foreign transaction fees",
        "annualValue": null
      },
      {
        "id": 155,
        "cardId": 43,
        "name": "Financial Health Tools",
        "description": "Built-in tools to track spending, set goals, and understand interest charges",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.apple.com/apple-card/",
    "imageSourceUrl": "https://commons.wikimedia.org/wiki/File%3AApple_Card.png",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 44,
    "name": "Costco Anywhere Visa by Citi",
    "issuer": "Citi / Costco",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #005daa, #e31837)",
    "logoUrl": "https://logo.clearbit.com/costco.com",
    "cardImageUrl": "/card-images/44-costco-anywhere-visa-by-citi.webp",
    "rewardType": "cashback",
    "rewardProgram": "Costco Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Gas bought at Costco earns 5%; other eligible gas and EV charging earn 4%; both share a $7,000 combined annual cap, then 1%. The bonus row uses 4% because a logged gas purchase does not say whether it was Costco fuel.",
      "Cash back is paid once a year as a Costco credit card reward certificate after the February billing statement closes."
    ],
    "cashbackCategories": [
      {
        "id": 161,
        "cardId": 44,
        "category": "Eligible gas and EV charging (first $7,000/yr combined)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 646,
        "cardId": 44,
        "category": "Restaurants",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 163,
        "cardId": 44,
        "category": "Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 164,
        "cardId": 44,
        "category": "Costco",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 165,
        "cardId": 44,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 156,
        "cardId": 44,
        "name": "No Annual Fee with Costco Membership",
        "description": "Free as long as your Costco membership is active",
        "annualValue": 60
      },
      {
        "id": 157,
        "cardId": 44,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": null
      },
      {
        "id": 158,
        "cardId": 44,
        "name": "Damage and Theft Protection",
        "description": "Coverage on new purchases for 120 days",
        "annualValue": null
      },
      {
        "id": 159,
        "cardId": 44,
        "name": "Worldwide Car Rental Insurance",
        "description": "Secondary coverage when you rent with the card",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/costco-anywhere-visa-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-costco-anywhere-visa-credit-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 45,
    "name": "Bilt Mastercard",
    "issuer": "Wells Fargo / Bilt",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #4b5563)",
    "logoUrl": "https://logo.clearbit.com/biltrewards.com",
    "cardImageUrl": "/card-images/45-bilt-mastercard.webp",
    "rewardType": "points",
    "rewardProgram": "Bilt Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.25,
    "rewardValuationDescription": "Bilt Rewards value varies by redemption; this app uses an estimated 1.25 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "The Wells Fargo-issued Bilt Mastercard was discontinued on 2026-02-07.",
      "Its successors are the Bilt Blue ($0), Bilt Obsidian ($95) and Bilt Palladium ($495) Mastercards, issued by Column N.A. and serviced by Cardless Inc. They are separate products with different fees and earning structures.",
      "The rates below describe the retired Wells Fargo product and should not be used for planning."
    ],
    "cashbackCategories": [
      {
        "id": 166,
        "cardId": 45,
        "category": "Travel",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 167,
        "cardId": 45,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 168,
        "cardId": 45,
        "category": "Rent",
        "rate": 0.01,
        "isDefault": false
      },
      {
        "id": 169,
        "cardId": 45,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 160,
        "cardId": 45,
        "name": "Pay Rent Without Fees",
        "description": "Earn points on rent payments at no transaction cost (up to 100k pts/yr)",
        "annualValue": null
      },
      {
        "id": 161,
        "cardId": 45,
        "name": "Rent Day 2x Bonus",
        "description": "Double points on non-rent purchases on the 1st of each month",
        "annualValue": 150
      },
      {
        "id": 162,
        "cardId": 45,
        "name": "Cell Phone Protection",
        "description": "Up to $800 per claim when paying your phone bill with the card",
        "annualValue": 100
      },
      {
        "id": 163,
        "cardId": 45,
        "name": "Trip Delay & Cancellation Protection",
        "description": "Coverage on travel booked with the card",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bilt.com/card",
    "imageSourceUrl": "https://www.uscreditcardguide.com/bilt-mastercard-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review",
    "availability": "discontinued",
    "availabilityChangedAt": "2026-02-07"
  },
  {
    "id": 46,
    "name": "Robinhood Gold Card",
    "issuer": "Robinhood",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "Requires Robinhood Gold membership; no separate card annual fee",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #b8860b, #ffd700)",
    "logoUrl": "https://logo.clearbit.com/robinhood.com",
    "cardImageUrl": "/card-images/robinhood-gold-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "Robinhood Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Foreign transaction fee: accounts onboarded on or after 2026-07-01 pay 3% of each transaction made in a foreign currency. Robinhood says cardholders onboarded before that date are not affected for now.",
      "No separate card annual fee, but an active Robinhood Gold membership is required, and cash back is redeemed through a Robinhood brokerage account."
    ],
    "cashbackCategories": [
      {
        "id": 313,
        "cardId": 46,
        "category": "All purchases",
        "rate": 0.03,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 293,
        "cardId": 46,
        "name": "No Card Annual Fee",
        "description": "No separate annual fee for the card; Robinhood Gold membership is required.",
        "annualValue": null
      },
      {
        "id": 294,
        "cardId": 46,
        "name": "Visa Signature Benefits",
        "description": "Includes eligible Visa Signature travel and purchase benefits.",
        "annualValue": null
      },
      {
        "id": 295,
        "cardId": 46,
        "name": "Family Card Management",
        "description": "Tools for family card sharing and spend management.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://robinhood.com/creditcard",
    "imageSourceUrl": "https://robinhood.com/creditcard",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 47,
    "name": "Chase Ink Business Preferred",
    "issuer": "Chase",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "100,000 points after $8,000 spend in 3 months",
    "signupBonusValue": 1250,
    "color": "linear-gradient(135deg, #0b3d91, #1e6fd9)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/47-chase-ink-business-preferred.png",
    "rewardType": "points",
    "rewardProgram": "Chase Ultimate Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.25,
    "rewardValuationDescription": "Chase Ultimate Rewards value varies by redemption; this app uses an estimated 1.25 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "The 3x business categories share the issuer's $150,000 annual combined purchase cap before base earning applies."
    ],
    "cashbackCategories": [
      {
        "id": 171,
        "cardId": 47,
        "category": "Travel (up to $150,000/yr combined)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 172,
        "cardId": 47,
        "category": "Shipping (up to $150,000/yr combined)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 173,
        "cardId": 47,
        "category": "Internet/Cable/Phone (up to $150,000/yr combined)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 174,
        "cardId": 47,
        "category": "Advertising (up to $150,000/yr combined)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 175,
        "cardId": 47,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9130,
        "cardId": 47,
        "category": "Lyft (through 9/30/2027)",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 168,
        "cardId": 47,
        "name": "Cell Phone Protection",
        "description": "Up to $1,000 per claim when paying business phone bills with the card",
        "annualValue": 150
      },
      {
        "id": 169,
        "cardId": 47,
        "name": "Trip Cancellation/Interruption Insurance",
        "description": "Up to $5,000 per trip",
        "annualValue": 100
      },
      {
        "id": 170,
        "cardId": 47,
        "name": "Primary Auto Rental Coverage",
        "description": "Primary collision damage waiver on business rentals",
        "annualValue": 100
      },
      {
        "id": 171,
        "cardId": 47,
        "name": "25% Travel Bonus",
        "description": "Points worth 25% more via Chase Travel portal",
        "annualValue": 200
      },
      {
        "id": 754,
        "cardId": 47,
        "name": "DashPass Membership",
        "description": "Complimentary DashPass for at least one year when activated by 12/31/2027, plus $10 off one non-restaurant DoorDash order each calendar month while enrolled.",
        "annualValue": 120,
        "period": "monthly"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/business-preferred",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/business-preferred",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 48,
    "name": "Chase Ink Business Cash",
    "issuer": "Chase",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$350 after $3k spend, $400 more after $6k more in year 1",
    "signupBonusValue": 750,
    "color": "linear-gradient(135deg, #0d4a8a, #2d7dd2)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/48-chase-ink-business-cash.png",
    "rewardType": "cashback",
    "rewardProgram": "Chase Ultimate Rewards cash back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Office-supply and telecom 5% categories share one annual cap; gas and restaurant 2% categories share a separate annual cap."
    ],
    "cashbackCategories": [
      {
        "id": 176,
        "cardId": 48,
        "category": "Office Supplies (up to $25,000/yr combined)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 177,
        "cardId": 48,
        "category": "Internet/Cable/Phone (up to $25,000/yr combined)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 178,
        "cardId": 48,
        "category": "Gas (up to $25,000/yr combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 179,
        "cardId": 48,
        "category": "Restaurants (up to $25,000/yr combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 180,
        "cardId": 48,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9131,
        "cardId": 48,
        "category": "Lyft (through 9/30/2027)",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 172,
        "cardId": 48,
        "name": "Free Employee Cards",
        "description": "Add employee cards at no extra cost with spending limits",
        "annualValue": null
      },
      {
        "id": 173,
        "cardId": 48,
        "name": "Purchase Protection",
        "description": "Up to $10,000 per claim on new business purchases",
        "annualValue": 100
      },
      {
        "id": 174,
        "cardId": 48,
        "name": "Extended Warranty",
        "description": "Adds an extra year to U.S. manufacturer warranties of 3 years or less",
        "annualValue": null
      },
      {
        "id": 755,
        "cardId": 48,
        "name": "Instacart Credit",
        "description": "Complimentary 3-month Instacart+ membership (then $99/year unless cancelled) and a $20 Instacart credit each month while an Instacart+ member; benefits end 12/31/2027.",
        "annualValue": 240,
        "period": "monthly"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/cash",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/cash",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 49,
    "name": "Chase Ink Business Unlimited",
    "issuer": "Chase",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$750 cash back after $6,000 spend in 3 months",
    "signupBonusValue": 750,
    "color": "linear-gradient(135deg, #1f3a93, #5d8aef)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/49-chase-ink-business-unlimited.png",
    "rewardType": "cashback",
    "rewardProgram": "Chase Ultimate Rewards cash back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 181,
        "cardId": 49,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      },
      {
        "id": 9132,
        "cardId": 49,
        "category": "Lyft (through 9/30/2027)",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 175,
        "cardId": 49,
        "name": "Free Employee Cards",
        "description": "Issue employee cards with custom spending limits",
        "annualValue": null
      },
      {
        "id": 176,
        "cardId": 49,
        "name": "Purchase Protection",
        "description": "Up to $10,000 per claim on new business purchases",
        "annualValue": 100
      },
      {
        "id": 177,
        "cardId": 49,
        "name": "Auto Rental Insurance",
        "description": "Primary coverage on business rentals",
        "annualValue": null
      },
      {
        "id": 756,
        "cardId": 49,
        "name": "Instacart Credit",
        "description": "Complimentary 3-month Instacart+ membership (then $99/year unless cancelled) and a $20 Instacart credit each month while an Instacart+ member; benefits end 12/31/2027.",
        "annualValue": 240,
        "period": "monthly"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/unlimited",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/unlimited",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 50,
    "name": "Prime Visa",
    "issuer": "Chase / Amazon",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 Amazon gift card upon approval",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #0a1f44, #ff9900)",
    "logoUrl": "https://logo.clearbit.com/amazon.com",
    "cardImageUrl": "/card-images/50-prime-visa.png",
    "rewardType": "cashback",
    "rewardProgram": "Amazon Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 182,
        "cardId": 50,
        "category": "Amazon",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 183,
        "cardId": 50,
        "category": "Whole Foods",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 184,
        "cardId": 50,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 185,
        "cardId": 50,
        "category": "Gas",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 186,
        "cardId": 50,
        "category": "Local Transit and Commuting (including rideshare)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 187,
        "cardId": 50,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9133,
        "cardId": 50,
        "category": "Chase Travel",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 178,
        "cardId": 50,
        "name": "Requires Prime",
        "description": "5% rate is for active Amazon Prime members only",
        "annualValue": 0
      },
      {
        "id": 179,
        "cardId": 50,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": null
      },
      {
        "id": 180,
        "cardId": 50,
        "name": "Purchase Protection",
        "description": "120 days of damage and theft protection",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/amazon-prime-rewards",
    "imageSourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/amazon-prime-rewards",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 51,
    "name": "United Gateway Card",
    "issuer": "Chase / United Airlines",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "20,000 bonus miles after $1,000 in 3 months",
    "signupBonusValue": 240,
    "color": "linear-gradient(135deg, #0a4d8c, #1e6fd9)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/51-united-gateway-card.png",
    "rewardType": "miles",
    "rewardProgram": "United MileagePlus",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.2,
    "rewardValuationDescription": "United MileagePlus value varies by itinerary and redemption path; this app uses an estimated 1.20 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 188,
        "cardId": 51,
        "category": "United Purchases",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 189,
        "cardId": 51,
        "category": "Gas",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 190,
        "cardId": 51,
        "category": "Transit",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 191,
        "cardId": 51,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 181,
        "cardId": 51,
        "name": "No Annual Fee",
        "description": "United benefits at no yearly cost",
        "annualValue": 0
      },
      {
        "id": 182,
        "cardId": 51,
        "name": "0% Intro APR for 12 Months",
        "description": "On purchases for the first year",
        "annualValue": null
      },
      {
        "id": 183,
        "cardId": 51,
        "name": "Trip Cancellation Insurance",
        "description": "Trip cancellation/interruption coverage up to $1,500 per covered traveler and $6,000 per trip for prepaid, non-refundable passenger fares.",
        "annualValue": 75
      },
      {
        "id": 757,
        "cardId": 51,
        "name": "25% Back on United Inflight and Club Premium Drink Purchases",
        "description": "25% back as a statement credit on food, beverages and Wi-Fi on United-operated flights and on United Club premium drinks.",
        "annualValue": null
      },
      {
        "id": 758,
        "cardId": 51,
        "name": "Two Checked Bags Annually",
        "description": "Two first-standard-checked-bag benefits after $10,000 in card purchases in a calendar year.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 759,
        "cardId": 51,
        "name": "10% or More Off Award Flights",
        "description": "Save 10% or more on United flights booked with miles after $10,000 in card purchases in a calendar year.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 760,
        "cardId": 51,
        "name": "Purchase Protection",
        "description": "Covers eligible new purchases for 120 days against damage or theft, up to $500 per item.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/united/united-gateway",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/united",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 52,
    "name": "United Club Card",
    "issuer": "Chase / United Airlines",
    "network": "Visa",
    "annualFee": 695,
    "signupBonus": "80,000 bonus miles after $5,000 in 3 months",
    "signupBonusValue": 960,
    "color": "linear-gradient(135deg, #001f3f, #003366)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/52-united-club-infinite-card.png",
    "rewardType": "miles",
    "rewardProgram": "United MileagePlus",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.2,
    "rewardValuationDescription": "United MileagePlus value varies by itinerary and redemption path; this app uses an estimated 1.20 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 314,
        "cardId": 52,
        "category": "United purchases",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9103,
        "cardId": 52,
        "category": "Renowned Hotels and Resorts",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 315,
        "cardId": 52,
        "category": "Dining",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 316,
        "cardId": 52,
        "category": "Travel",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 317,
        "cardId": 52,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 296,
        "cardId": 52,
        "name": "United Club Membership",
        "description": "United Club membership for the primary cardmember and one guest (Chase: $750+ value per year); All Access membership after Premier Gold status or $50,000 in annual card spend.",
        "annualValue": 750
      },
      {
        "id": 297,
        "cardId": 52,
        "name": "Free Checked Bags",
        "description": "First and second checked bags free on eligible United-operated flights.",
        "annualValue": null
      },
      {
        "id": 298,
        "cardId": 52,
        "name": "Premier Access Travel Services",
        "description": "Eligible Premier Access check-in, security lane, boarding and baggage handling.",
        "annualValue": null
      },
      {
        "id": 299,
        "cardId": 52,
        "name": "Global Entry / TSA PreCheck / NEXUS Credit",
        "description": "Up to $120 statement credit every 4 years for a Global Entry, TSA PreCheck or NEXUS application fee charged to the card.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 761,
        "cardId": 52,
        "name": "Renowned Hotels and Resorts Credit",
        "description": "Up to $200 in statement credits each account anniversary year on prepaid stays booked through Renowned Hotels and Resorts for United Cardmembers.",
        "annualValue": 200,
        "period": "cardmember-year"
      },
      {
        "id": 762,
        "cardId": 52,
        "name": "Rideshare Credit",
        "description": "Up to $12 back each month January-November and $18 in December on rideshare purchases (up to $150 per calendar year). Enrollment required.",
        "annualValue": 150,
        "period": "monthly"
      },
      {
        "id": 763,
        "cardId": 52,
        "name": "Avis/Budget Travel Credit",
        "description": "$50 in United TravelBank cash on each of the first two Avis or Budget rentals booked through MileagePlus Travel per account anniversary year (up to $100).",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 764,
        "cardId": 52,
        "name": "Instacart Credit",
        "description": "Two $10 Instacart credits each month while an Instacart+ member (up to $240 per calendar year); ends 12/31/2027.",
        "annualValue": 240,
        "period": "monthly"
      },
      {
        "id": 765,
        "cardId": 52,
        "name": "JSX Credit",
        "description": "Up to $200 back each account anniversary year on purchases made directly with JSX.",
        "annualValue": 200,
        "period": "cardmember-year"
      },
      {
        "id": 766,
        "cardId": 52,
        "name": "1,500 Card Bonus PQP",
        "description": "1,500 Premier qualifying points each year, posted within 8 weeks of February 1 starting the calendar year after account opening.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 767,
        "cardId": 52,
        "name": "10,000-Mile Award Flight Discount (per $20,000 spend)",
        "description": "A 10,000-mile award flight discount for every $20,000 in card purchases, up to two per calendar year.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 768,
        "cardId": 52,
        "name": "25% Back on United Inflight and Club Premium Drink Purchases",
        "description": "25% back as a statement credit on food, beverages and Wi-Fi on United-operated flights and on United Club premium drinks.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/united/club-infinite",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/united",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 53,
    "name": "Southwest Rapid Rewards Premier",
    "issuer": "Chase / Southwest Airlines",
    "network": "Visa",
    "annualFee": 149,
    "signupBonus": "50,000 points after $1,000 in 3 months",
    "signupBonusValue": 700,
    "color": "linear-gradient(135deg, #d72027, #f9b612)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/53-southwest-rapid-rewards-premier.png",
    "rewardType": "points",
    "rewardProgram": "Southwest Rapid Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "Southwest Rapid Rewards value varies by redemption; this app uses an estimated 1.30 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "The 2x grocery-store and restaurant rate covers the first $8,000 in combined purchases per account anniversary year, then 1x; this app resets that cap each calendar year."
    ],
    "cashbackCategories": [
      {
        "id": 196,
        "cardId": 53,
        "category": "Southwest Purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 199,
        "cardId": 53,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9134,
        "cardId": 53,
        "category": "Grocery Stores and Restaurants (first $8,000/year combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9135,
        "cardId": 53,
        "category": "Lyft (through 12/31/2027)",
        "rate": 0.03,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 188,
        "cardId": 53,
        "name": "6,000 Anniversary Points",
        "description": "Bonus points on each cardmember anniversary",
        "annualValue": 84,
        "period": "cardmember-year"
      },
      {
        "id": 190,
        "cardId": 53,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": null
      },
      {
        "id": 769,
        "cardId": 53,
        "name": "Free First Checked Bag",
        "description": "First checked bag free for the cardmember and up to 8 other passengers on the same reservation (Chase: saves up to $90 round trip).",
        "annualValue": null
      },
      {
        "id": 770,
        "cardId": 53,
        "name": "15% Flight Discount Promo Code",
        "description": "A 15% promo code each cardmember anniversary (excludes Basic fares).",
        "annualValue": null,
        "period": "cardmember-year"
      },
      {
        "id": 771,
        "cardId": 53,
        "name": "Preferred Seat Selection and Group 5 Boarding",
        "description": "Select a Preferred seat within 48 hours of departure when available; the cardmember and up to 8 companions board in Group 5.",
        "annualValue": null
      },
      {
        "id": 772,
        "cardId": 53,
        "name": "25% Back on In-Flight Purchases",
        "description": "25% back as a statement credit on inflight purchases.",
        "annualValue": null
      },
      {
        "id": 773,
        "cardId": 53,
        "name": "DashPass Membership",
        "description": "12 months of complimentary DashPass when first activated by 12/31/2027, plus $10 off one non-restaurant DoorDash order each calendar month through 12/31/2027 for memberships activated on or after 9/1/2026 (earlier activations get $10 per calendar quarter).",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 774,
        "cardId": 53,
        "name": "Instacart Credit",
        "description": "$10 Instacart credit each month while an Instacart+ member (3 months of Instacart+ complimentary), through 12/31/2027.",
        "annualValue": 120,
        "period": "monthly"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest/premier",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 54,
    "name": "Marriott Bonvoy Bold",
    "issuer": "Chase / Marriott",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "30,000 points after $1,000 in 3 months",
    "signupBonusValue": 240,
    "color": "linear-gradient(135deg, #1c1c1c, #6d6d6d)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/54-marriott-bonvoy-bold.png",
    "rewardType": "points",
    "rewardProgram": "Marriott Bonvoy",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.7,
    "rewardValuationDescription": "Marriott Bonvoy value varies by redemption; this app uses an estimated 0.70 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 200,
        "cardId": 54,
        "category": "Marriott Stays",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 201,
        "cardId": 54,
        "category": "Groceries, rideshare, select food delivery, streaming, internet/cable/phone",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 202,
        "cardId": 54,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 191,
        "cardId": 54,
        "name": "5 Elite Night Credits",
        "description": "Toward Marriott Bonvoy elite status each calendar year.",
        "annualValue": 50
      },
      {
        "id": 192,
        "cardId": 54,
        "name": "Marriott Bonvoy Silver Status",
        "description": "Automatic mid-tier elite status",
        "annualValue": null
      },
      {
        "id": 193,
        "cardId": 54,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": null
      },
      {
        "id": 775,
        "cardId": 54,
        "name": "DashPass Membership",
        "description": "12 months of complimentary DashPass when first activated by 12/31/2027, plus $10 off one non-restaurant DoorDash order each calendar quarter through 12/31/2027.",
        "annualValue": 40,
        "period": "quarterly"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/bold",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/bold",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 55,
    "name": "IHG One Rewards Credit Card",
    "issuer": "Chase / IHG",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "80,000 points after $2,000 in 3 months",
    "signupBonusValue": 400,
    "color": "linear-gradient(135deg, #cc0000, #ff7a00)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/55-ihg-one-rewards-traveler.png",
    "rewardType": "points",
    "rewardProgram": "IHG One Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.5,
    "rewardValuationDescription": "IHG One Rewards value varies by redemption; this app uses an estimated 0.50 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "IHG's official marketing may show a higher total hotel earn rate by adding base IHG One Rewards points and elite-status bonus points; this app calculates only the credit-card earn rate.",
      "3x on utilities, internet/cable/phone and select streaming applies only to purchases posted through 12/31/2026; from 1/1/2027 they earn 2x.",
      "Formerly the IHG One Rewards Traveler Credit Card, renamed in Chase's 10/1/2026 refresh; existing cardmembers were notified in October 2026 of each change's effective date."
    ],
    "cashbackCategories": [
      {
        "id": 203,
        "cardId": 55,
        "category": "IHG Stays",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 204,
        "cardId": 55,
        "category": "Gas",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 205,
        "cardId": 55,
        "category": "Restaurants",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9106,
        "cardId": 55,
        "category": "Utilities, Internet, Cable, Phone and Select Streaming (through 12/31/2026)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 206,
        "cardId": 55,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      },
      {
        "id": 9136,
        "cardId": 55,
        "category": "Grocery Stores",
        "rate": 0.03,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 194,
        "cardId": 55,
        "name": "4th Reward Night Free",
        "description": "Redeem points for four consecutive nights and the fourth is free. From 2027 it requires $5,000 in purchases in a calendar year (then valid for the rest of that year and the next).",
        "annualValue": null
      },
      {
        "id": 195,
        "cardId": 55,
        "name": "IHG Silver Elite Status",
        "description": "Automatic Silver Elite status; Gold Elite after $15,000 in purchases in a calendar year.",
        "annualValue": null
      },
      {
        "id": 196,
        "cardId": 55,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": null
      },
      {
        "id": 776,
        "cardId": 55,
        "name": "5 Elite Night Credits",
        "description": "5 Elite Night Credits at account opening and each January.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 777,
        "cardId": 55,
        "name": "10,000 Bonus Points After $15,000 Annual Spend",
        "description": "10,000 bonus points after $15,000 in purchases each calendar year.",
        "annualValue": 50,
        "period": "calendar-year"
      },
      {
        "id": 778,
        "cardId": 55,
        "name": "DashPass Membership",
        "description": "12 months of complimentary DashPass when first activated by 12/31/2027, plus $10 off one non-restaurant DoorDash order each calendar month through 12/31/2027 for memberships activated on or after 9/1/2026 (earlier activations get $10 per calendar quarter).",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 779,
        "cardId": 55,
        "name": "Instacart Credit",
        "description": "$10 Instacart credit each month (up to $120 a year) while an Instacart+ member (3 months complimentary, then $99/year); ends 12/31/2027.",
        "annualValue": 120,
        "period": "monthly"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/one-rewards",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/ihg",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 56,
    "name": "American Express Business Gold",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 375,
    "signupBonus": "70,000 points after $10,000 spend in 3 months",
    "signupBonusValue": 1400,
    "color": "linear-gradient(135deg, #b8860b, #ffd700)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/56-american-express-business-gold.png",
    "rewardType": "points",
    "rewardProgram": "American Express Membership Rewards",
    "rewardUnitName": "Membership Rewards Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Membership Rewards redemption value varies by redemption path; this app uses a conservative 1.00 cent per point estimate for annual-fee progress and keeps earned points visible separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Top two 4x categories are selected automatically from eligible business categories each billing cycle and are capped at $150,000 in combined purchases per calendar year before base earning applies.",
      "3X applies only to flights and prepaid hotels booked on AmexTravel.com.",
      "From 2027-02-17 the 4X advertising category counts only purchases at select merchants (issuer page footnote)."
    ],
    "cashbackCategories": [
      {
        "id": 207,
        "cardId": 56,
        "category": "Top 2 Categories (up to $150,000/yr combined)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 208,
        "cardId": 56,
        "category": "Flights and prepaid hotels via Amex Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 209,
        "cardId": 56,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 197,
        "cardId": 56,
        "name": "$240 Flexible Business Credit",
        "description": "Up to $20 in statement credits each month (up to $240 per year) on eligible U.S. purchases at Grubhub, U.S. office supply stores and UPS.com shipments; enrollment required. UPS replaced FedEx on 2026-10-01.",
        "annualValue": 240,
        "period": "monthly"
      },
      {
        "id": 198,
        "cardId": 56,
        "name": "$155 Walmart+ Credit",
        "description": "Monthly statement credit for Walmart+ membership",
        "annualValue": 155,
        "period": "monthly"
      },
      {
        "id": 902,
        "cardId": 56,
        "name": "$300 ChatGPT Business Credit",
        "description": "Up to $300 in statement credits per calendar year on U.S. purchases of ChatGPT Business subscriptions (subject to auto-renewal).",
        "annualValue": 300,
        "period": "calendar-year"
      },
      {
        "id": 903,
        "cardId": 56,
        "name": "$150 Squarespace Credit",
        "description": "Up to $150 back each calendar year on U.S. Squarespace purchases; enrollment required, subscription purchases subject to auto-renewal.",
        "annualValue": 150,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-business-gold-card-amex/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-business-gold-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 207,
        "mode": "automatic-top-spend",
        "picks": 2,
        "resets": "month",
        "options": [
          "Advertising with U.S. media providers",
          "U.S. electronic goods retailers and software and cloud providers",
          "U.S. monthly wireless telephone service",
          "U.S. gas stations",
          "U.S. restaurants",
          "Transit"
        ]
      }
    ]
  },
  {
    "id": 57,
    "name": "American Express Business Platinum",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 895,
    "signupBonus": "150,000 points after $20,000 in 3 months",
    "signupBonusValue": 3000,
    "color": "linear-gradient(135deg, #c0c0c0, #f5f5f5)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/57-american-express-business-platinum.png",
    "rewardType": "points",
    "rewardProgram": "American Express Membership Rewards",
    "rewardUnitName": "Membership Rewards Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Membership Rewards redemption value varies by redemption path; this app uses a conservative 1.00 cent per point estimate for annual-fee progress and keeps earned points visible separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "5X applies only to flights and prepaid hotels booked on AmexTravel.com.",
      "2X covers eligible U.S. construction-material and hardware suppliers, electronic goods retailers, software and cloud providers, shipping providers, and single purchases of $5,000 or more, on up to $2 million of these purchases per calendar year, then 1X.",
      "From 2027-02-17 the 2X shipping category and the wireless credit apply at select merchants only (issuer page footnote).",
      "From 2027-01-01 Fine Hotels + Resorts bookings need a two-night minimum stay to count toward the $600 hotel credit."
    ],
    "cashbackCategories": [
      {
        "id": 210,
        "cardId": 57,
        "category": "Flights and prepaid hotels via Amex Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 211,
        "cardId": 57,
        "category": "U.S. construction, hardware, electronics, software & cloud, shipping and $5k+ purchases (up to $2,000,000/year combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 212,
        "cardId": 57,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 200,
        "cardId": 57,
        "name": "$200 Airline Fee Credit",
        "description": "Annual incidental airline fee credit",
        "annualValue": 200,
        "period": "calendar-year"
      },
      {
        "id": 202,
        "cardId": 57,
        "name": "$360 Indeed Credit",
        "description": "Up to $90/quarter for Indeed posts",
        "annualValue": 360,
        "period": "quarterly"
      },
      {
        "id": 204,
        "cardId": 57,
        "name": "Centurion + Priority Pass",
        "description": "Global lounge access for cardmember",
        "annualValue": 500
      },
      {
        "id": 205,
        "cardId": 57,
        "name": "35% Airline Bonus",
        "description": "Up to 1M points/year on Pay With Points flights",
        "annualValue": 350
      },
      {
        "id": 904,
        "cardId": 57,
        "name": "$150 Dell Technologies Credit",
        "description": "Up to $150 in statement credits per calendar year on U.S. purchases made directly with Dell Technologies, plus an additional $1,000 statement credit after $5,000 or more of those purchases in the same calendar year (up to $1,150 in total).",
        "annualValue": 150,
        "period": "calendar-year"
      },
      {
        "id": 905,
        "cardId": 57,
        "name": "$250 Adobe Credit",
        "description": "A $250 statement credit per calendar year after spending $600 or more on eligible U.S. Adobe purchases.",
        "annualValue": 250,
        "period": "calendar-year"
      },
      {
        "id": 906,
        "cardId": 57,
        "name": "$600 Hotel Credit",
        "description": "Up to $300 in statement credits semi-annually (up to $600 per calendar year) on prepaid Fine Hotels + Resorts or The Hotel Collection bookings through American Express Travel. The Hotel Collection requires a two-night minimum stay; from January 1, 2027, Fine Hotels + Resorts bookings also need two nights to qualify.",
        "annualValue": 600,
        "period": "semiannual"
      },
      {
        "id": 907,
        "cardId": 57,
        "name": "$200 Hilton Credit",
        "description": "Up to $50 in statement credits each quarter (up to $200 per calendar year) on eligible purchases made directly with a property in the Hilton portfolio; enrollment required.",
        "annualValue": 200,
        "period": "quarterly"
      },
      {
        "id": 908,
        "cardId": 57,
        "name": "$219 CLEAR Plus Credit",
        "description": "Up to $219 in statement credits per calendar year for an auto-renewing CLEAR+ membership (excluding taxes and fees).",
        "annualValue": 219,
        "period": "calendar-year"
      },
      {
        "id": 909,
        "cardId": 57,
        "name": "$120 Wireless Credit",
        "description": "Up to $10 in statement credits each month on wireless telephone service purchased directly from a U.S. wireless provider. From February 17, 2027, select merchants only.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 910,
        "cardId": 57,
        "name": "$300 ChatGPT Business Credit",
        "description": "Up to $300 in statement credits per calendar year on U.S. purchases of ChatGPT Business (subject to auto-renewal).",
        "annualValue": 300,
        "period": "calendar-year"
      },
      {
        "id": 911,
        "cardId": 57,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "A $120 statement credit for a Global Entry application or up to $85 for TSA PreCheck (through an official enrollment provider) every 4 years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 912,
        "cardId": 57,
        "name": "ZO Membership from Tishman Speyer",
        "description": "Complimentary ZO membership (added 2026-10-22): access to ZO Clubhouse locations in select U.S. cities with 4 guest passes per week, 4 Studio day passes per month, and up to $500 in statement credits per calendar year toward ZO event space bookings and/or a Dining Club membership.",
        "annualValue": 500,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-business-platinum-credit-card-amex/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/business-platinum-charge-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 58,
    "name": "Marriott Bonvoy Bevy American Express",
    "issuer": "American Express / Marriott",
    "network": "Amex",
    "annualFee": 250,
    "signupBonus": "85,000 points after $5,000 spend in 6 months",
    "signupBonusValue": 680,
    "color": "linear-gradient(135deg, #1a1a1a, #5e3a1d)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/58-marriott-bonvoy-bevy-american-express.png",
    "rewardType": "points",
    "rewardProgram": "Marriott Bonvoy",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.7,
    "rewardValuationDescription": "Marriott Bonvoy value varies by redemption; this app uses an estimated 0.70 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "4X at restaurants worldwide and U.S. supermarkets applies to the first $15,000 of combined purchases per calendar year, then 2X."
    ],
    "cashbackCategories": [
      {
        "id": 213,
        "cardId": 58,
        "category": "Marriott Stays",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 214,
        "cardId": 58,
        "category": "Restaurants worldwide (up to $15,000/year combined)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 215,
        "cardId": 58,
        "category": "U.S. supermarkets (up to $15,000/year combined)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 216,
        "cardId": 58,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 206,
        "cardId": 58,
        "name": "Marriott Gold Elite Status",
        "description": "Mid-tier hotel elite status",
        "annualValue": null
      },
      {
        "id": 207,
        "cardId": 58,
        "name": "15 Elite Night Credits",
        "description": "Each calendar year toward elite status",
        "annualValue": 100
      },
      {
        "id": 208,
        "cardId": 58,
        "name": "1 Free Night (50k pts)",
        "description": "After spending $15,000 in a calendar year",
        "annualValue": 300,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-bevy/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-bevy/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 59,
    "name": "Hilton Honors American Express",
    "issuer": "American Express / Hilton",
    "network": "Amex",
    "annualFee": 0,
    "signupBonus": "70,000 points after $2,000 spend in 6 months",
    "signupBonusValue": 350,
    "color": "linear-gradient(135deg, #002663, #0066b2)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/59-hilton-honors-american-express.png",
    "rewardType": "points",
    "rewardProgram": "Hilton Honors",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.5,
    "rewardValuationDescription": "Hilton Honors value varies by redemption; this app uses an estimated 0.50 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 217,
        "cardId": 59,
        "category": "Hilton Stays",
        "rate": 0.07,
        "isDefault": false
      },
      {
        "id": 218,
        "cardId": 59,
        "category": "Restaurants",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 219,
        "cardId": 59,
        "category": "Gas",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 220,
        "cardId": 59,
        "category": "Groceries",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 221,
        "cardId": 59,
        "category": "Other",
        "rate": 0.03,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 209,
        "cardId": 59,
        "name": "Hilton Honors Silver Status",
        "description": "Automatic mid-tier hotel status",
        "annualValue": null
      },
      {
        "id": 210,
        "cardId": 59,
        "name": "Path to Gold with $20k Spend",
        "description": "Spend $20,000 in a calendar year for Gold status",
        "annualValue": 100
      },
      {
        "id": 211,
        "cardId": 59,
        "name": "No Annual Fee",
        "description": "Earn Hilton points without a yearly cost",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/hilton-honors/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/hilton-honors/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 60,
    "name": "Citi Strata Card",
    "issuer": "Citi",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "30,000 bonus points after $1,000 spend in 3 months",
    "signupBonusValue": 300,
    "color": "linear-gradient(135deg, #003b70, #0066b3)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/60-citi-strata-card.webp",
    "rewardType": "points",
    "rewardProgram": "Citi ThankYou Points",
    "rewardUnitName": "ThankYou Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Citi cards in this catalog earn ThankYou Points or cash-equivalent ThankYou rewards; this app uses 1 cent per point for cash-value calculations unless a product-specific rule says otherwise.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 318,
        "cardId": 60,
        "category": "Select transit",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 319,
        "cardId": 60,
        "category": "Gas and EV charging",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 320,
        "cardId": 60,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 321,
        "cardId": 60,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 322,
        "cardId": 60,
        "category": "Self-Select Category",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 323,
        "cardId": 60,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9153,
        "cardId": 60,
        "category": "Citi Travel hotels, car rentals, and attractions",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 301,
        "cardId": 60,
        "name": "No Annual Fee",
        "description": "No annual fee for the current Citi Strata Card.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-strata-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-strata-credit-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 322,
        "mode": "user-selected",
        "picks": 1,
        "resets": "quarter",
        "options": [
          "Select streaming services",
          "Fitness clubs",
          "Live entertainment",
          "Cosmetic stores, barber shops and hair salons",
          "Pet supply stores"
        ]
      }
    ]
  },
  {
    "id": 61,
    "name": "Citi / AAdvantage MileUp",
    "issuer": "Citi / American Airlines",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "10,000 miles + $50 statement credit after $500 in 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #c8102e, #ce0e2d)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/61-citi-aadvantage-mileup.webp",
    "rewardType": "miles",
    "rewardProgram": "American Airlines AAdvantage",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "American Airlines AAdvantage value varies by itinerary and redemption path; this app uses an estimated 1.30 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 225,
        "cardId": 61,
        "category": "American Airlines",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 226,
        "cardId": 61,
        "category": "Groceries",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 227,
        "cardId": 61,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 215,
        "cardId": 61,
        "name": "No Annual Fee",
        "description": "Earn AAdvantage miles with no yearly cost",
        "annualValue": 0
      },
      {
        "id": 216,
        "cardId": 61,
        "name": "25% Inflight Savings",
        "description": "On food and beverages on American flights",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/aadvantage-mile-up-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/aadvantage-mile-up-credit-card",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
  },
  {
    "id": 62,
    "name": "Citi / AAdvantage Executive World Legend Mastercard",
    "issuer": "Citi / American Airlines",
    "network": "Mastercard",
    "annualFee": 695,
    "signupBonus": "70,000 miles after $7,000 in 3 months",
    "signupBonusValue": 1050,
    "color": "linear-gradient(135deg, #1a1a1a, #4d4d4d)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/62-citi-aadvantage-executive-world-elite.webp",
    "rewardType": "miles",
    "rewardProgram": "American Airlines AAdvantage",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "American Airlines AAdvantage value varies by itinerary and redemption path; this app uses an estimated 1.30 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Annual fee is $695 for new cardmembers from 2026-08-23 (was $595); Citi's announcement does not give the date existing cardmembers move to the new fee.",
      "After $150,000 in purchases in a calendar year, eligible American Airlines purchases earn 5 miles per $1 (instead of 4) for the rest of that year.",
      "Rebranded from World Elite to World Legend Mastercard effective 2026-08-23."
    ],
    "cashbackCategories": [
      {
        "id": 228,
        "cardId": 62,
        "category": "American Airlines",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 229,
        "cardId": 62,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9154,
        "cardId": 62,
        "category": "AAdvantage Hotels and AAdvantage Cars bookings",
        "rate": 0.12,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 217,
        "cardId": 62,
        "name": "Admirals Club Membership",
        "description": "Admirals Club membership for the primary cardmember, with access for up to 2 guests or immediate family members; Citi values it at up to $1,400 a year.",
        "annualValue": null
      },
      {
        "id": 218,
        "cardId": 62,
        "name": "First Checked Bag Free",
        "description": "For cardholder + 8 companions on AA flights",
        "annualValue": 240
      },
      {
        "id": 219,
        "cardId": 62,
        "name": "Global Entry / TSA PreCheck",
        "description": "Up to $120 credit every 4 years",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 220,
        "cardId": 62,
        "name": "Priority Boarding & Check-In",
        "description": "Group 4 boarding on American flights",
        "annualValue": null
      },
      {
        "id": 827,
        "cardId": 62,
        "name": "Lyft Credit",
        "description": "$15 back after 3 eligible Lyft rides in a calendar month, up to $180 a year.",
        "annualValue": 180,
        "period": "monthly"
      },
      {
        "id": 828,
        "cardId": 62,
        "name": "Avis / Budget Car Rental Credit",
        "description": "Up to $120 in statement credits per calendar year on eligible prepaid Avis or Budget rentals booked directly on avis.com or budget.com.",
        "annualValue": 120,
        "period": "calendar-year"
      },
      {
        "id": 829,
        "cardId": 62,
        "name": "American Airlines Vacations Credit",
        "description": "Up to $250 back January-June and up to $250 back July-December on eligible packages or experiences booked at aavacations.com.",
        "annualValue": 500,
        "period": "semiannual"
      },
      {
        "id": 830,
        "cardId": 62,
        "name": "Inflight and Admirals Club Purchase Credit",
        "description": "Up to $100 in statement credits per calendar year on eligible American Airlines inflight and Admirals Club purchases.",
        "annualValue": 100,
        "period": "calendar-year"
      },
      {
        "id": 831,
        "cardId": 62,
        "name": "inKind Dining Credit",
        "description": "Up to $100 January-June and up to $100 July-December at inKind restaurants, used by paying with the card through the inKind app.",
        "annualValue": 200,
        "period": "semiannual"
      },
      {
        "id": 832,
        "cardId": 62,
        "name": "Omni Hotels Champion Status",
        "description": "Complimentary Omni Select Guest Champion status for the primary cardmember (enrollment required).",
        "annualValue": null
      },
      {
        "id": 833,
        "cardId": 62,
        "name": "Omni Hotels Annual Free Night",
        "description": "Once per calendar year, an Omni Free Night Award after a qualifying stay of 2+ consecutive nights booked directly on omnihotels.com (Champion enrollment required).",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 834,
        "cardId": 62,
        "name": "Avis President's Club Status",
        "description": "Complimentary Avis President's Club status for enrolled primary cardmembers, available through 2028-08-31.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-aadvantage-executive-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-aadvantage-executive-credit-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 63,
    "name": "JetBlue Plus Card",
    "issuer": "Barclays / JetBlue",
    "network": "Mastercard",
    "annualFee": 99,
    "signupBonus": "60,000 TrueBlue points after $1,000 in 90 days",
    "signupBonusValue": 780,
    "color": "linear-gradient(135deg, #003876, #00a3e0)",
    "logoUrl": "https://logo.clearbit.com/jetblue.com",
    "cardImageUrl": "/card-images/63-jetblue-plus-card.webp",
    "rewardType": "points",
    "rewardProgram": "JetBlue TrueBlue",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "JetBlue TrueBlue value varies by redemption; this app uses an estimated 1.30 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 230,
        "cardId": 63,
        "category": "JetBlue Purchases",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 231,
        "cardId": 63,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 232,
        "cardId": 63,
        "category": "Groceries",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 233,
        "cardId": 63,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 221,
        "cardId": 63,
        "name": "Free First Checked Bag",
        "description": "For cardholder + up to 3 companions on JetBlue flights",
        "annualValue": 140
      },
      {
        "id": 222,
        "cardId": 63,
        "name": "5,000 Anniversary Points",
        "description": "Each cardmember year",
        "annualValue": 65,
        "period": "cardmember-year"
      },
      {
        "id": 223,
        "cardId": 63,
        "name": "Mosaic Status with $50k Spend",
        "description": "Earn Mosaic for the rest of the year",
        "annualValue": null
      },
      {
        "id": 224,
        "cardId": 63,
        "name": "10% Points Rebate",
        "description": "On every award flight redemption",
        "annualValue": null
      },
      {
        "id": 860,
        "cardId": 63,
        "name": "JetBlue Vacations Statement Credit",
        "description": "$100 statement credit after purchasing a JetBlue Vacations package of $100 or more with the card; limit one statement credit per year.",
        "annualValue": 100
      },
      {
        "id": 861,
        "cardId": 63,
        "name": "50% Inflight Savings",
        "description": "50% savings on eligible inflight purchases on JetBlue-operated flights.",
        "annualValue": null
      },
      {
        "id": 862,
        "cardId": 63,
        "name": "No Foreign Transaction Fees",
        "description": "Foreign transaction fee: 0%.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://cards.barclaycardus.com/banking/cards/jetblue-plus-card/",
    "imageSourceUrl": "https://www.uscreditcardguide.com/barclaycard-jetblue-plus-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 64,
    "name": "Hawaiian Airlines World Elite Mastercard",
    "issuer": "Barclays / Hawaiian Airlines",
    "network": "Mastercard",
    "annualFee": 99,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #6d2077, #c8102e)",
    "logoUrl": "https://logo.clearbit.com/hawaiianairlines.com",
    "cardImageUrl": "/card-images/64-hawaiian-airlines-world-elite-mastercard.png",
    "rewardType": "points",
    "rewardProgram": "Atmos Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.4,
    "rewardValuationDescription": "Atmos Rewards value varies by redemption; this app uses an estimated 1.40 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Barclays removed its own application page for this card on 2025-10-01, when HawaiianMiles folded into Alaska's Atmos Rewards program (balances converted 1:1); secondary sources (2026) report a Barclays-issued variant still offered through Bank of Hawaii. Existing accounts earn Atmos Rewards points.",
      "Alaska Airlines and Bank of America have said they are working toward Bank of America issuing all Atmos Rewards co-branded cards; no conversion date for Barclays Hawaiian accounts has been announced.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 234,
        "cardId": 64,
        "category": "Hawaiian Airlines",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 235,
        "cardId": 64,
        "category": "Gas",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 236,
        "cardId": 64,
        "category": "Dining",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 237,
        "cardId": 64,
        "category": "Groceries",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 238,
        "cardId": 64,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 225,
        "cardId": 64,
        "name": "Free First Checked Bag",
        "description": "Two free checked bags for the primary cardmember on eligible Hawaiian Airlines flights booked with the card.",
        "annualValue": null
      },
      {
        "id": 226,
        "cardId": 64,
        "name": "$100 Companion Discount",
        "description": "$100 companion discount for roundtrip travel between Hawaii and North America on Hawaiian Airlines, each account anniversary.",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 227,
        "cardId": 64,
        "name": "50% Off One-Way Companion Ticket",
        "description": "One-time 50%-off companion discount for roundtrip coach travel between Hawaii and North America on Hawaiian Airlines.",
        "annualValue": 75,
        "period": "one-time"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://yourmileagemayvary.com/2026/10/01/hawaiian-airlines-card-atmos-rewards/",
    "imageSourceUrl": "https://cards.barclaycardus.com/banking/credit-card/hawaiian-airlines/child/hcl-control/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review",
    "availability": "closed-to-new-applicants",
    "availabilityChangedAt": "2025-10-01"
  },
  {
    "id": 65,
    "name": "AAdvantage Aviator Red World Elite",
    "issuer": "Barclays / American Airlines",
    "network": "Mastercard",
    "annualFee": 99,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #b22234, #e53935)",
    "logoUrl": "https://logo.clearbit.com/barclays.com",
    "cardImageUrl": "/card-images/aadvantage-aviator-red.webp",
    "rewardType": "miles",
    "rewardProgram": "American Airlines AAdvantage",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "American Airlines AAdvantage value varies by itinerary and redemption path; this app uses an estimated 1.30 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Discontinued on 2026-04-24. All Aviator Red accounts were converted to the Citi / AAdvantage Platinum Select World Elite Mastercard (catalog #34).",
      "This row is retained only so existing wallet entries still resolve to a name."
    ],
    "cashbackCategories": [
      {
        "id": 239,
        "cardId": 65,
        "category": "American Airlines",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 240,
        "cardId": 65,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 228,
        "cardId": 65,
        "name": "First Checked Bag Free",
        "description": "For cardholder + 4 companions on AA domestic flights",
        "annualValue": 120
      },
      {
        "id": 229,
        "cardId": 65,
        "name": "Preferred Boarding",
        "description": "Group 5 boarding on American flights",
        "annualValue": null
      },
      {
        "id": 230,
        "cardId": 65,
        "name": "25% Inflight Savings",
        "description": "On food and beverages and Wi-Fi on American flights",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://cards.barclaycardus.com/",
    "imageSourceUrl": "https://financebuzz.com/credit-cards/barclaycard-aadvantage-aviator-red-world-elite-mastercard",
    "lastReviewedAt": "2026-08-06",
    "dataConfidence": "needs-review",
    "availability": "discontinued",
    "availabilityChangedAt": "2026-04-24"
  },
  {
    "id": 66,
    "name": "Aeroplan Card",
    "issuer": "Chase / Air Canada",
    "network": "Visa",
    "annualFee": 195,
    "signupBonus": "75,000 Aeroplan points after $4,000 in 3 months",
    "signupBonusValue": 1100,
    "color": "linear-gradient(135deg, #c8102e, #1a1a1a)",
    "logoUrl": "https://logo.clearbit.com/aircanada.com",
    "cardImageUrl": "/card-images/66-aeroplan-card.png",
    "rewardType": "points",
    "rewardProgram": "Aeroplan",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.4,
    "rewardValuationDescription": "Aeroplan value varies by redemption; this app uses an estimated 1.40 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Dining and grocery stores earn 3x on purchases through 12/31/2026 and 2x from 1/1/2027.",
      "The card earns 3x on Air Canada purchases; Chase's 'up to 5x' adds 2x that Air Canada awards Aeroplan 25K members on eligible flights, which this app does not count."
    ],
    "cashbackCategories": [
      {
        "id": 241,
        "cardId": 66,
        "category": "Air Canada",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 242,
        "cardId": 66,
        "category": "Dining (3x through 12/31/2026, then 2x)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 243,
        "cardId": 66,
        "category": "Grocery Stores (3x through 12/31/2026, then 2x)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 244,
        "cardId": 66,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9137,
        "cardId": 66,
        "category": "Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9138,
        "cardId": 66,
        "category": "Gas Stations",
        "rate": 0.02,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 231,
        "cardId": 66,
        "name": "Free First Checked Bag",
        "description": "On Air Canada flights for cardholder + up to 8 companions",
        "annualValue": 240
      },
      {
        "id": 232,
        "cardId": 66,
        "name": "25K Aeroplan Status",
        "description": "Automatic Aeroplan 25K status with no spending requirement: priority check-in, Zone 2 boarding, 5 eUpgrade credits a year and Star Alliance recognition.",
        "annualValue": null
      },
      {
        "id": 233,
        "cardId": 66,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": null
      },
      {
        "id": 780,
        "cardId": 66,
        "name": "Air Canada Statement Credit",
        "description": "Up to $50 in statement credits January-June and up to $50 July-December on purchases made directly with Air Canada.",
        "annualValue": 100,
        "period": "semiannual"
      },
      {
        "id": 781,
        "cardId": 66,
        "name": "Global Entry / TSA PreCheck / NEXUS Credit",
        "description": "Up to $120 statement credit every 4 years for a Global Entry, TSA PreCheck or NEXUS application fee charged to the card.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 782,
        "cardId": 66,
        "name": "DashPass Membership",
        "description": "12 months of complimentary DashPass when first activated by 12/31/2027, plus $10 off one non-restaurant DoorDash order each calendar month through 12/31/2027 for memberships activated on or after 9/1/2026 (earlier activations get $10 per calendar quarter).",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 783,
        "cardId": 66,
        "name": "15% Off Air Canada Flight Redemptions",
        "description": "Save 15% on eligible Air Canada flight rewards booked with Aeroplan points.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/aircanada/aeroplan",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/aircanada/aeroplan",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 67,
    "name": "US Bank Altitude Reserve",
    "issuer": "US Bank",
    "network": "Visa",
    "annualFee": 400,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0c3766, #2a6db1)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/67-us-bank-altitude-reserve.webp",
    "rewardType": "points",
    "rewardProgram": "U.S. Bank Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "U.S. Bank Rewards Points value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Closed to new applicants since 2024-11-11. Existing cardholders keep the card.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Since 2025-12-15 the 3X mobile-wallet rate applies only to the first $5,000 of mobile wallet purchases each billing cycle, then 1X; the app approximates the billing cycle as a calendar month.",
      "Since 2025-12-15 prepaid hotels and car rentals booked in the U.S. Bank Travel Center earn 10X and prepaid flights 5X; travel booked directly with airlines, hotels, car rentals, taxis, trains and cruise lines still earns 3X.",
      "Points are worth 1 cent each toward travel since 2025-12-15 (previously 1.5 cents)."
    ],
    "cashbackCategories": [
      {
        "id": 245,
        "cardId": 67,
        "category": "Mobile wallet purchases (first $5,000/month)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 246,
        "cardId": 67,
        "category": "Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 247,
        "cardId": 67,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9157,
        "cardId": 67,
        "category": "Prepaid hotels and car rentals in the U.S. Bank Travel Center",
        "rate": 0.1,
        "isDefault": false
      },
      {
        "id": 9158,
        "cardId": 67,
        "category": "Prepaid flights in the U.S. Bank Travel Center",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 234,
        "cardId": 67,
        "name": "$325 Travel Center Credit",
        "description": "Up to $325 in statement credits each cardmember year, now only for travel booked through the U.S. Bank Travel Center. Since 2025-12-15 general travel and dining purchases no longer qualify.",
        "annualValue": 325,
        "period": "cardmember-year"
      },
      {
        "id": 235,
        "cardId": 67,
        "name": "Priority Pass Lounge Access",
        "description": "Up to 8 free visits per year",
        "annualValue": 200
      },
      {
        "id": 236,
        "cardId": 67,
        "name": "Global Entry / TSA PreCheck",
        "description": "Up to $100 credit every 4 years",
        "annualValue": 25,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 237,
        "cardId": 67,
        "name": "Cell Phone Protection",
        "description": "Up to $600 per claim when you pay your bill with the card",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://rewards.usbank.com/benefits/card/AltitudeReserveBenefits/faqs",
    "imageSourceUrl": "https://www.cardsandpoints.com/us-bank-altitude-reserve/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review",
    "availability": "closed-to-new-applicants",
    "availabilityChangedAt": "2024-11-11"
  },
  {
    "id": 68,
    "name": "US Bank Altitude Go",
    "issuer": "US Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "20,000 points after $1,000 in 90 days",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #1a4480, #5b8def)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/68-us-bank-altitude-go.png",
    "rewardType": "points",
    "rewardProgram": "U.S. Bank Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "U.S. Bank Rewards Points value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Grocery and gas/EV charging 2X exclude discount stores/supercenters and wholesale clubs, which earn 1X."
    ],
    "cashbackCategories": [
      {
        "id": 248,
        "cardId": 68,
        "category": "Dining, takeout and restaurant delivery (up to $2,000/quarter)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 249,
        "cardId": 68,
        "category": "Streaming",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 250,
        "cardId": 68,
        "category": "Groceries",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 251,
        "cardId": 68,
        "category": "Gas and EV charging",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 252,
        "cardId": 68,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 238,
        "cardId": 68,
        "name": "$15 Streaming Credit",
        "description": "Automatic $15 statement credit per 12-month period after 11 consecutive calendar months of eligible streaming service purchases.",
        "annualValue": 15,
        "period": "cardmember-year"
      },
      {
        "id": 852,
        "cardId": 68,
        "name": "0% Intro APR for 15 Billing Cycles",
        "description": "0% intro APR on purchases and balance transfers for the first 15 billing cycles, then a variable APR.",
        "annualValue": null,
        "period": "one-time"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/credit-cards/altitude-go-visa-signature-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/credit-cards/altitude-go-visa-signature-credit-card.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 69,
    "name": "Discover it Chrome",
    "issuer": "Capital One / Discover",
    "network": "Discover",
    "annualFee": 0,
    "signupBonus": "Cashback Match — all cash back doubled in year 1",
    "signupBonusValue": 300,
    "color": "linear-gradient(135deg, #4a4a4a, #c0c0c0)",
    "logoUrl": "https://logo.clearbit.com/discover.com",
    "cardImageUrl": "/card-images/69-discover-it-chrome.png",
    "rewardType": "cashback",
    "rewardProgram": "Discover Cashback Bonus",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Discover bonus categories and first-year Cashback Match terms are issuer-program specific and may require activation or eligibility.",
      "Gas and restaurant bonus earning shares a $1,000 quarterly purchase cap before base earning applies."
    ],
    "cashbackCategories": [
      {
        "id": 253,
        "cardId": 69,
        "category": "Gas (up to $1,000/quarter combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 254,
        "cardId": 69,
        "category": "Restaurants (up to $1,000/quarter combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 255,
        "cardId": 69,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 241,
        "cardId": 69,
        "name": "Cashback Match",
        "description": "All rewards doubled at end of first year",
        "annualValue": null,
        "period": "one-time"
      },
      {
        "id": 242,
        "cardId": 69,
        "name": "No Annual Fee",
        "description": "No yearly fee, ever",
        "annualValue": 0
      },
      {
        "id": 243,
        "cardId": 69,
        "name": "Free FICO Score",
        "description": "Monitor your credit score for free",
        "annualValue": 20
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.discover.com/credit-cards/cash-back/chrome/",
    "imageSourceUrl": "https://www.discover.com/credit-cards/cash-back/chrome.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 70,
    "name": "Discover it Student Cash Back",
    "issuer": "Capital One / Discover",
    "network": "Discover",
    "annualFee": 0,
    "signupBonus": "Cashback Match — all cash back doubled in year 1",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #ff6900, #ffb000)",
    "logoUrl": "https://logo.clearbit.com/discover.com",
    "cardImageUrl": "/card-images/70-discover-it-student-cash-back.png",
    "rewardType": "cashback",
    "rewardProgram": "Discover Cashback Bonus",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Rotating categories require current-quarter activation and are subject to the issuer quarterly cap before base earning applies.",
      "Discover bonus categories and first-year Cashback Match terms are issuer-program specific and may require activation or eligibility."
    ],
    "cashbackCategories": [
      {
        "id": 256,
        "cardId": 70,
        "category": "Rotating Categories (up to $1,500/quarter)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 257,
        "cardId": 70,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 244,
        "cardId": 70,
        "name": "Cashback Match",
        "description": "All cash back doubled at end of first year",
        "annualValue": null,
        "period": "one-time"
      },
      {
        "id": 246,
        "cardId": 70,
        "name": "No Annual Fee",
        "description": "No yearly fee, ever",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.discover.com/credit-cards/student-credit-card/it-card/",
    "imageSourceUrl": "https://wallethub.com/d/discover-it-for-students-credit-card-802c",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review",
    "categoryChoices": [
      {
        "categoryId": 256,
        "mode": "rotating-calendar",
        "picks": 1,
        "resets": "quarter",
        "options": [
          "Q1 2026: Grocery stores, wholesale clubs and select streaming services",
          "Q2 2026: Restaurants and home improvement stores",
          "Q3 2026: Gas stations, transportation (transit) and drugstores",
          "Q4 2026: Restaurants, entertainment and utilities (incl. phone, internet and cable)"
        ]
      }
    ]
  },
  {
    "id": 71,
    "name": "Discover it Secured Cash Back",
    "issuer": "Capital One / Discover",
    "network": "Discover",
    "annualFee": 0,
    "signupBonus": "Cashback Match — all cash back doubled in year 1",
    "signupBonusValue": 100,
    "color": "linear-gradient(135deg, #2c3e50, #34495e)",
    "logoUrl": "https://logo.clearbit.com/discover.com",
    "cardImageUrl": "/card-images/71-discover-it-secured.png",
    "rewardType": "cashback",
    "rewardProgram": "Discover Cashback Bonus",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Rotating categories require current-quarter activation and are subject to the issuer quarterly cap before base earning applies.",
      "Discover bonus categories and first-year Cashback Match terms are issuer-program specific and may require activation or eligibility."
    ],
    "cashbackCategories": [
      {
        "id": 258,
        "cardId": 71,
        "category": "Rotating Categories (up to $1,500/quarter)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 260,
        "cardId": 71,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 247,
        "cardId": 71,
        "name": "Build Credit Securely",
        "description": "Refundable security deposit of $49, $99 or $200 (set by creditworthiness) secures a credit line of at least $200; depositing more raises the line.",
        "annualValue": 50
      },
      {
        "id": 248,
        "cardId": 71,
        "name": "Automatic Account Reviews",
        "description": "Once you establish a positive track record, the deposit is returned and the account becomes an unsecured Discover it Cash Back; Discover no longer publishes a review timeline.",
        "annualValue": null
      },
      {
        "id": 249,
        "cardId": 71,
        "name": "Free FICO Score",
        "description": "Monitor your credit score for free",
        "annualValue": 20
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.discover.com/credit-cards/secured/",
    "imageSourceUrl": "https://www.discover.com/credit-cards/secured/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review",
    "categoryChoices": [
      {
        "categoryId": 258,
        "mode": "rotating-calendar",
        "picks": 1,
        "resets": "quarter",
        "options": [
          "Q1 2026: Grocery stores, wholesale clubs and select streaming services",
          "Q2 2026: Restaurants and home improvement stores",
          "Q3 2026: Gas stations, transportation (transit) and drugstores",
          "Q4 2026: Restaurants, entertainment and utilities (incl. phone, internet and cable)"
        ]
      }
    ]
  },
  {
    "id": 72,
    "name": "Wells Fargo Reflect",
    "issuer": "Wells Fargo",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #d71e28, #ffcd11)",
    "logoUrl": "https://logo.clearbit.com/wellsfargo.com",
    "cardImageUrl": "/card-images/72-wells-fargo-reflect.png",
    "rewardType": null,
    "rewardProgram": "No ongoing purchase rewards",
    "rewardUnitName": null,
    "rewardUnitValueCents": null,
    "rewardValuationDescription": "This card is modeled as having no ongoing purchase rewards in the current official-product data.",
    "rewardRuleNotes": [
      "No ongoing rewards are modeled for purchases; use the card for financing/fee features rather than reward optimization."
    ],
    "cashbackCategories": [
      {
        "id": 261,
        "cardId": 72,
        "category": "Other",
        "rate": 0,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 250,
        "cardId": 72,
        "name": "21-Month 0% Intro APR",
        "description": "0% intro APR for 21 months from account opening on purchases and on balance transfers made within the first 120 days.",
        "annualValue": null,
        "period": "one-time"
      },
      {
        "id": 251,
        "cardId": 72,
        "name": "Cell Phone Protection",
        "description": "Up to $600 per claim with bill payment",
        "annualValue": 75
      },
      {
        "id": 252,
        "cardId": 72,
        "name": "No Annual Fee",
        "description": "No yearly fee",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/reflect-visa-credit-card/",
    "imageSourceUrl": "https://creditcards.wellsfargo.com/reflect-visa-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 73,
    "name": "Choice Privileges Select Mastercard",
    "issuer": "Wells Fargo / Choice Hotels",
    "network": "Mastercard",
    "annualFee": 95,
    "signupBonus": "60,000 points after $3,000 in 3 months",
    "signupBonusValue": 360,
    "color": "linear-gradient(135deg, #002677, #0078d4)",
    "logoUrl": "https://logo.clearbit.com/choicehotels.com",
    "cardImageUrl": "/card-images/73-choice-privileges-select-mastercard.webp",
    "rewardType": "points",
    "rewardProgram": "Choice Privileges",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.8,
    "rewardValuationDescription": "Choice Privileges value varies by redemption; this app uses an estimated 0.80 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle."
    ],
    "cashbackCategories": [
      {
        "id": 324,
        "cardId": 73,
        "category": "Choice Hotels",
        "rate": 0.1,
        "isDefault": false
      },
      {
        "id": 325,
        "cardId": 73,
        "category": "Gas and EV charging",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 326,
        "cardId": 73,
        "category": "Groceries",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 327,
        "cardId": 73,
        "category": "Phone plans",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 328,
        "cardId": 73,
        "category": "Home improvement",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 329,
        "cardId": 73,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 302,
        "cardId": 73,
        "name": "Anniversary Bonus",
        "description": "30,000 Choice Privileges points every account anniversary while the account is open, current and not in default.",
        "annualValue": 180,
        "period": "cardmember-year"
      },
      {
        "id": 303,
        "cardId": 73,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "One statement credit up to $120 every four years toward a Global Entry or TSA PreCheck application or renewal fee.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 304,
        "cardId": 73,
        "name": "No Foreign Transaction Fee",
        "description": "No foreign currency conversion/foreign transaction fee.",
        "annualValue": null
      },
      {
        "id": 305,
        "cardId": 73,
        "name": "Cell Phone Protection",
        "description": "Eligible cell phone protection when the monthly bill is paid with the card.",
        "annualValue": null
      },
      {
        "id": 847,
        "cardId": 73,
        "name": "Automatic Platinum Elite Status + Elite Qualifying Nights",
        "description": "Choice Privileges Platinum Elite status (25% bonus points on qualifying Choice stays), plus 10 Elite Qualifying Nights within 14 days of account opening and 10 more each January 1 while the account is open.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/choice-hotels-privileges-select-mastercard/",
    "imageSourceUrl": "https://www.cardsandpoints.com/tsa-precheck-credits/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 74,
    "name": "PNC Cash Rewards Visa",
    "issuer": "PNC Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 bonus after $1,000 in 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #ff6f00, #f57c00)",
    "logoUrl": "https://logo.clearbit.com/pnc.com",
    "cardImageUrl": "/card-images/74-pnc-cash-rewards-visa.png",
    "rewardType": "cashback",
    "rewardProgram": "PNC Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Gas, restaurant, and grocery bonus earning shares the issuer's annual combined purchase cap before base earning applies."
    ],
    "cashbackCategories": [
      {
        "id": 266,
        "cardId": 74,
        "category": "Gas (up to $8,000/yr combined)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 267,
        "cardId": 74,
        "category": "Restaurants (up to $8,000/yr combined)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 268,
        "cardId": 74,
        "category": "Groceries (up to $8,000/yr combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 269,
        "cardId": 74,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 256,
        "cardId": 74,
        "name": "0% Intro APR for 15 Months",
        "description": "0% intro APR for the first 15 months after account opening on balances transferred within the first 90 days. No intro APR on purchases.",
        "annualValue": null,
        "period": "one-time"
      },
      {
        "id": 257,
        "cardId": 74,
        "name": "No Annual Fee",
        "description": "No yearly fee",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.pnc.com/en/personal-banking/banking/credit-cards/pnc-cash-rewards-visa-credit-card.html",
    "imageSourceUrl": "https://www.pnc.com/en/personal-banking/banking/credit-cards/pnc-cash-rewards-visa-credit-card.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 75,
    "name": "TD Double Up Credit Card",
    "issuer": "TD Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$150 cash back after $1,000 in 90 days",
    "signupBonusValue": 150,
    "color": "linear-gradient(135deg, #008a3e, #45b07a)",
    "logoUrl": "https://logo.clearbit.com/td.com",
    "cardImageUrl": "/card-images/75-td-double-up-credit-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "TD Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 270,
        "cardId": 75,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 258,
        "cardId": 75,
        "name": "2% Cash Back Everywhere",
        "description": "Unlimited 2% Cash Back on all eligible purchases, with no rotating categories, caps or limits.",
        "annualValue": null
      },
      {
        "id": 259,
        "cardId": 75,
        "name": "0% Intro APR for 15 Billing Cycles",
        "description": "0% intro APR on balance transfers for the first 15 billing cycles when transferred within 90 days of account opening.",
        "annualValue": null,
        "period": "one-time"
      },
      {
        "id": 260,
        "cardId": 75,
        "name": "No Annual Fee",
        "description": "No yearly fee",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/double-up",
    "imageSourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/double-up",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 76,
    "name": "Target Circle Credit Card",
    "issuer": "TD Bank / Target",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #cc0000, #ff1f1f)",
    "logoUrl": "https://logo.clearbit.com/target.com",
    "cardImageUrl": "/card-images/target-circle-credit-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "Target Circle discount",
    "rewardUnitName": "Discount",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 271,
        "cardId": 76,
        "category": "Target",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 272,
        "cardId": 76,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 261,
        "cardId": 76,
        "name": "5% Off at Target",
        "description": "Every purchase at Target and Target.com",
        "annualValue": 200
      },
      {
        "id": 262,
        "cardId": 76,
        "name": "Free Shipping at Target.com",
        "description": "Most items ship free",
        "annualValue": null
      },
      {
        "id": 263,
        "cardId": 76,
        "name": "Extra 30 Days for Returns",
        "description": "Beyond Target's normal return window",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.target.com/circlecard/main",
    "imageSourceUrl": "https://www.target.com/circlecard/main",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 77,
    "name": "Capital One Walmart Rewards (legacy)",
    "issuer": "Capital One / Walmart",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0071ce, #ffc220)",
    "logoUrl": "https://logo.clearbit.com/walmart.com",
    "cardImageUrl": "/card-images/77-capital-one-walmart-rewards-legacy.webp",
    "rewardType": "cashback",
    "rewardProgram": "Capital One Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Discontinued. Applications closed 2024-05-24 and all remaining accounts were converted to the Capital One Quicksilver Cash Rewards Mastercard (catalog #16).",
      "This row is retained only so existing wallet entries still resolve to a name."
    ],
    "cashbackCategories": [
      {
        "id": 273,
        "cardId": 77,
        "category": "Walmart.com",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 274,
        "cardId": 77,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 275,
        "cardId": 77,
        "category": "Travel",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 276,
        "cardId": 77,
        "category": "Walmart In-Store",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 277,
        "cardId": 77,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 264,
        "cardId": 77,
        "name": "Special Financing on Big Purchases",
        "description": "Available on qualifying Walmart purchases",
        "annualValue": null
      },
      {
        "id": 265,
        "cardId": 77,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/quicksilver/",
    "imageSourceUrl": "https://www.cardsandpoints.com/walmart-rewards-card/",
    "lastReviewedAt": "2026-08-06",
    "dataConfidence": "needs-review",
    "availability": "discontinued",
    "availabilityChangedAt": "2024-05-24"
  },
  {
    "id": 78,
    "name": "PayPal Cashback Mastercard",
    "issuer": "Synchrony / PayPal",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #003087, #009cde)",
    "logoUrl": "https://logo.clearbit.com/paypal.com",
    "cardImageUrl": "/card-images/78-paypal-cashback-mastercard.webp",
    "rewardType": "cashback",
    "rewardProgram": "PayPal Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 278,
        "cardId": 78,
        "category": "PayPal Purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 279,
        "cardId": 78,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 266,
        "cardId": 78,
        "name": "No Annual Fee",
        "description": "No yearly fee",
        "annualValue": 0
      },
      {
        "id": 267,
        "cardId": 78,
        "name": "No Rewards Caps",
        "description": "Earn unlimited cash back",
        "annualValue": null
      },
      {
        "id": 268,
        "cardId": 78,
        "name": "Cash Back to PayPal Balance",
        "description": "Redeem rewards directly to your PayPal account",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://pep.paypal.com/us/digital-wallet/manage-money/paypal-cashback-mastercard",
    "imageSourceUrl": "https://www.uscreditcardguide.com/paypal-cashback-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 79,
    "name": "RBC Avion Visa Infinite",
    "issuer": "RBC",
    "network": "Visa",
    "annualFee": 120,
    "signupBonus": "Up to 70,000 Avion points; see issuer page for current offer timing and conditions",
    "signupBonusValue": 700,
    "color": "linear-gradient(135deg, #0a2d6b, #f2c94c)",
    "logoUrl": "https://logo.clearbit.com/rbcroyalbank.com",
    "cardImageUrl": "/card-images/79-rbc-avion-visa-infinite.webp",
    "rewardType": "points",
    "rewardProgram": "RBC Avion Rewards",
    "rewardUnitName": "Avion Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "RBC Avion Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 330,
        "cardId": 79,
        "category": "Travel",
        "rate": 0.0125,
        "isDefault": false
      },
      {
        "id": 331,
        "cardId": 79,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 306,
        "cardId": 79,
        "name": "Travel Insurance",
        "description": "Includes several travel insurance coverages when requirements are met.",
        "annualValue": null
      },
      {
        "id": 307,
        "cardId": 79,
        "name": "Mobile Device Insurance",
        "description": "Coverage for eligible mobile devices when requirements are met.",
        "annualValue": null
      },
      {
        "id": 308,
        "cardId": 79,
        "name": "Visa Infinite Benefits",
        "description": "Access to eligible Visa Infinite dining, hotel and travel benefits.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.rbcroyalbank.com/credit-cards/travel/rbc-avion-visa-infinite.html",
    "imageSourceUrl": "https://www.rbcroyalbank.com/credit-cards/travel/rbc-avion-visa-infinite.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 80,
    "name": "TD Aeroplan Visa Infinite",
    "issuer": "TD Canada Trust",
    "network": "Visa",
    "annualFee": 139,
    "signupBonus": "See issuer page for current Aeroplan welcome offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f3b2e, #0a7f4f)",
    "logoUrl": "https://logo.clearbit.com/td.com",
    "cardImageUrl": "/card-images/td-aeroplan-visa-infinite.jpg",
    "rewardType": "points",
    "rewardProgram": "Aeroplan",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.4,
    "rewardValuationDescription": "Aeroplan value varies by redemption; this app uses an estimated 1.40 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "1.5 points per $1 on gas, EV charging, groceries and purchases made directly with Air Canada (including Air Canada Vacations) applies to a combined $80,000 of those purchases per year; after that they earn 1 point per $1.",
      "Hyatt: primary cardholders earn 1.5 Aeroplan points per $1 CAD at participating Hyatt hotels and resorts from 2026-07-15 to 2029-07-15, on up to $80,000 of Hyatt spend per year (a separate cap); these points replace the base rate. The extra 1 World of Hyatt point per $1 (after linking accounts) is not modelled.",
      "The annual fee is rebated every year with a TD All-Inclusive Banking Plan."
    ],
    "cashbackCategories": [
      {
        "id": 332,
        "cardId": 80,
        "category": "Air Canada and Air Canada Vacations, bought direct (up to $80,000/year combined with gas, EV charging and groceries)",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 333,
        "cardId": 80,
        "category": "Gas, EV charging and groceries (up to $80,000/year combined)",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 335,
        "cardId": 80,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9196,
        "cardId": 80,
        "category": "Hyatt hotels and resorts (up to $80,000/year)",
        "rate": 0.015,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 309,
        "cardId": 80,
        "name": "First Checked Bag",
        "description": "Free first checked bag on eligible Air Canada itineraries.",
        "annualValue": null
      },
      {
        "id": 310,
        "cardId": 80,
        "name": "NEXUS Credit",
        "description": "Statement credit of up to $100 CAD toward a NEXUS application fee once every 48 months for each eligible cardholder (primary and additional).",
        "annualValue": 25,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 311,
        "cardId": 80,
        "name": "Travel Insurance",
        "description": "Includes eligible travel medical, trip interruption/cancellation and baggage coverages.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.td.com/ca/en/personal-banking/products/credit-cards/aeroplan/aeroplan-visa-infinite-card",
    "imageSourceUrl": "https://www.td.com/ca/en/personal-banking/products/credit-cards/aeroplan/aeroplan-visa-infinite-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 81,
    "name": "Scotiabank Passport Visa Infinite +",
    "issuer": "Scotiabank",
    "network": "Visa",
    "annualFee": 150,
    "signupBonus": "See issuer page for current Scene+ welcome offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #8a1538, #d71920)",
    "logoUrl": "https://logo.clearbit.com/scotiabank.com",
    "cardImageUrl": "/card-images/81-scotiabank-passport-visa-infinite.webp",
    "rewardType": "points",
    "rewardProgram": "Scene+ Rewards",
    "rewardUnitName": "Scene+ Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Scene+ Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "3 Scene+ points per $1 at Sobeys-family grocers (Sobeys, Safeway, IGA, Foodland and participating Co-ops, FreshCo, Chalo! FreshCo, Thrifty Foods, Rachelle Béry, Les Marchés, Voilà); 2 points per $1 at other grocery stores and on dining, entertainment and daily transit including rideshare; 1 point per $1 otherwise.",
      "The 3x and 2x rates together apply to the first $50,000 of purchases each calendar year (January 1 to December 31); after that everything earns 1 point per $1. The app tracks the Sobeys row and the 2x row against the cap separately.",
      "Hotels and car rentals booked through Scene+ Travel (powered by Expedia) earn an extra 3 points per $1 on top of the 1-point base (4 in total).",
      "An annual bonus starting at 10,000 Scene+ points is paid once $40,000 of eligible purchases is made in an account year (not modelled).",
      "No foreign transaction fees. The $150 fee is rebated with a Scotiabank Ultimate Package; Preferred Package holders get a $40 rebate after $15,000 of qualifying purchases."
    ],
    "cashbackCategories": [
      {
        "id": 336,
        "cardId": 81,
        "category": "Sobeys, Safeway, IGA, Foodland, FreshCo, Thrifty Foods and other Sobeys-family stores (up to $50,000/year combined)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 337,
        "cardId": 81,
        "category": "Other groceries, dining, entertainment, transit and rideshare (up to $50,000/year combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 340,
        "cardId": 81,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9197,
        "cardId": 81,
        "category": "Hotels and car rentals booked through Scene+ Travel (Expedia)",
        "rate": 0.04,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 312,
        "cardId": 81,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on purchases in foreign currencies.",
        "annualValue": null
      },
      {
        "id": 313,
        "cardId": 81,
        "name": "Airport Lounge Visits",
        "description": "Six complimentary lounge visits per membership year through the Visa Airport Companion Program (DragonPass), usable by the cardholder or accompanying guests; extra visits cost US$32.",
        "annualValue": 250,
        "period": "cardmember-year"
      },
      {
        "id": 314,
        "cardId": 81,
        "name": "Travel Insurance",
        "description": "Includes eligible emergency medical and trip coverage.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.scotiabank.com/ca/en/personal/credit-cards/visa/passport-infinite-card.html",
    "imageSourceUrl": "https://smarter.loans/credit-cards/scotiabank-passport-visa-infinite-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 82,
    "name": "BMO eclipse Visa Infinite",
    "issuer": "BMO",
    "network": "Visa",
    "annualFee": 120,
    "signupBonus": "See issuer page for current BMO Rewards welcome offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #005eb8, #e31837)",
    "logoUrl": "https://logo.clearbit.com/bmo.com",
    "cardImageUrl": "/card-images/82-bmo-eclipse-visa-infinite.png",
    "rewardType": "points",
    "rewardProgram": "BMO Rewards",
    "rewardUnitName": "BMO Rewards Points",
    "rewardUnitValueCents": 0.67,
    "rewardValuationDescription": "BMO Rewards value varies by redemption; this app uses an estimated 0.67 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 341,
        "cardId": 82,
        "category": "Dining",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 342,
        "cardId": 82,
        "category": "Groceries",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 343,
        "cardId": 82,
        "category": "Gas",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 344,
        "cardId": 82,
        "category": "Transit",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 345,
        "cardId": 82,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 315,
        "cardId": 82,
        "name": "Annual Lifestyle Credit",
        "description": "Up to $50 annual lifestyle credit.",
        "annualValue": 50
      },
      {
        "id": 316,
        "cardId": 82,
        "name": "Visa Infinite Benefits",
        "description": "Eligible Visa Infinite travel, dining and hotel benefits.",
        "annualValue": null
      },
      {
        "id": 317,
        "cardId": 82,
        "name": "Travel Insurance",
        "description": "Travel and purchase insurance coverages when requirements are met.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.bmo.com/main/personal/credit-cards/bmo-eclipse-visa-infinite/",
    "imageSourceUrl": "https://www.bmo.com/main/personal/credit-cards/bmo-eclipse-visa-infinite/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 83,
    "name": "CIBC Aventura Visa Infinite",
    "issuer": "CIBC",
    "network": "Visa",
    "annualFee": 139,
    "signupBonus": "Up to 60,000 Aventura Points during the first year; see issuer page for conditions",
    "signupBonusValue": 600,
    "color": "linear-gradient(135deg, #3b0d2f, #8a1f62)",
    "logoUrl": "https://logo.clearbit.com/cibc.com",
    "cardImageUrl": "/card-images/83-cibc-aventura-visa-infinite.webp",
    "rewardType": "points",
    "rewardProgram": "CIBC Aventura Rewards",
    "rewardUnitName": "Aventura Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "CIBC Aventura Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates.",
      "1.5 points per $1 on gas, EV charging (MCC 5552), grocery and drugstore purchases applies only until $80,000 of net card purchases of any kind is reached in the year; the limit resets after the December statement. The app approximates this by capping the bonus categories themselves at $80,000.",
      "2 points per $1 applies only to travel bought through the CIBC Rewards Centre (CIBC by Expedia); other travel earns 1 point per $1."
    ],
    "cashbackCategories": [
      {
        "id": 346,
        "cardId": 83,
        "category": "Travel booked through CIBC Rewards Centre (CIBC by Expedia)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 348,
        "cardId": 83,
        "category": "Gas, EV charging, groceries and drugstores (up to $80,000/year combined)",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 350,
        "cardId": 83,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 318,
        "cardId": 83,
        "name": "Airport Lounge Visits",
        "description": "Four complimentary Visa Airport Companion (DragonPass) lounge visits per membership year for the primary cardholder and guests; CIBC values them at up to $285 a year.",
        "annualValue": 285,
        "period": "cardmember-year"
      },
      {
        "id": 319,
        "cardId": 83,
        "name": "NEXUS Rebate",
        "description": "Statement credit for one NEXUS application fee every four years (CIBC values it at $160; the credit is capped at $200).",
        "annualValue": 40,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 320,
        "cardId": 83,
        "name": "Annual Fee Rebate Offer",
        "description": "One-time first-year annual fee rebate under the current offer: $139 for the primary cardholder and $50 each for up to three authorized users.",
        "annualValue": 139,
        "period": "one-time"
      },
      {
        "id": 976,
        "cardId": 83,
        "name": "Skip+ Membership",
        "description": "Free Skip+ membership ($0 delivery fees and discounted service fees on eligible orders) plus a $10 monthly voucher while an eligible CIBC card is linked to your Skip account. CIBC values the first year at $110.",
        "annualValue": 110,
        "period": "monthly"
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.cibc.com/en/personal-banking/credit-cards/all-credit-cards/aventura-visa-infinite-card.html",
    "imageSourceUrl": "https://www.cibc.com/en/personal-banking/credit-cards/all-credit-cards/aventura-visa-infinite-card.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 84,
    "name": "American Express Cobalt Card",
    "issuer": "American Express Canada",
    "network": "Amex",
    "annualFee": 191.88,
    "signupBonus": "See issuer page for current Membership Rewards welcome offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0d3f4f, #1aa0a8)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/84-american-express-cobalt-card.png",
    "rewardType": "points",
    "rewardProgram": "American Express Membership Rewards",
    "rewardUnitName": "Membership Rewards Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Membership Rewards redemption value varies by redemption path; this app uses a conservative 1.00 cent per point estimate for annual-fee progress and keeps earned points visible separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "5 points per $1 at restaurants, coffee shops, bars, stand-alone grocery stores and food or grocery delivery in Canada applies to a combined $2,500 of net purchases per calendar month (resets on the 1st); after that these earn 1 point per $1.",
      "3 points per $1 on eligible streaming subscriptions in Canada (select providers listed at americanexpress.ca/streaming); 2 points per $1 at stand-alone gas stations and on local commuter transit, taxis and ride sharing in Canada.",
      "1 bonus point per $1 on hotel and car rental bookings made through American Express Travel Online (The Hotel Collection excluded).",
      "The fee is $15.99 a month ($191.88 a year) outside Quebec; Quebec residents pay $191.88 annually. Foreign-currency purchases carry a 2.5% conversion charge."
    ],
    "cashbackCategories": [
      {
        "id": 351,
        "cardId": 84,
        "category": "Eats and drinks in Canada, including groceries and food delivery (up to $2,500/month combined)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 352,
        "cardId": 84,
        "category": "Streaming subscriptions in Canada",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 353,
        "cardId": 84,
        "category": "Gas, transit and ride share in Canada",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 354,
        "cardId": 84,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9198,
        "cardId": 84,
        "category": "Hotels and car rentals booked through American Express Travel Online",
        "rate": 0.02,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 322,
        "cardId": 84,
        "name": "No Supplementary Card Fee",
        "description": "No annual fee for additional Cobalt cards.",
        "annualValue": null
      },
      {
        "id": 977,
        "cardId": 84,
        "name": "Instacart Statement Credits",
        "description": "Up to $5 back each month (maximum $60 in a 12-month period) on Instacart orders of $10 or more in Canada; enrolment required; offer runs until 2027-12-31.",
        "annualValue": 60,
        "period": "monthly"
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.americanexpress.com/en-ca/credit-cards/cobalt-card/",
    "imageSourceUrl": "https://www.americanexpress.com/en-ca/credit-cards/cobalt-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 85,
    "name": "Rogers Red World Elite Mastercard",
    "issuer": "Rogers Bank",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #231f20, #e2231a)",
    "logoUrl": "https://logo.clearbit.com/rogersbank.com",
    "cardImageUrl": "/card-images/85-rogers-red-world-elite-mastercard.png",
    "rewardType": "cashback",
    "rewardProgram": "Rogers Bank Cash Back Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Since 2026-08-04 the accelerated rates apply only to the first $61,000 spent on the account in each annual period (reset on the account-opening or product-switch anniversary); after that everything earns the 1.5% base until the reset. The app caps the bonus rows at a combined $61,000 per calendar year, which is looser than the real limit because the real limit counts all card spend.",
      "From 2026-11-18, eligible Rogers purchases earn 5% for every cardholder, within the same annual limit: Rogers, Fido, Shaw and Comwave bill payments (not in-store), online Rogers and Fido purchases, TSC, direct Sportsnet+, CityTV+ and Discovery+ subscriptions, and the Jays Shop at Rogers Centre. The 1.5x redemption bonus on Rogers purchases ends; last redemptions 2026-11-17.",
      "2% on non-U.S.-dollar purchases requires at least one eligible Rogers, Fido, Shaw or Comwave service; without one the rate is 1.5%.",
      "From 2027-01-12 the five annual Roam Like Home days are replaced by a $75 annual roaming credit (reimbursement request required)."
    ],
    "cashbackCategories": [
      {
        "id": 355,
        "cardId": 85,
        "category": "U.S. dollar purchases (up to $61,000/year combined)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 356,
        "cardId": 85,
        "category": "Non-U.S. purchases with eligible Rogers service (up to $61,000/year combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 357,
        "cardId": 85,
        "category": "Other non-U.S. purchases",
        "rate": 0.015,
        "isDefault": true
      },
      {
        "id": 9199,
        "cardId": 85,
        "category": "Eligible Rogers purchases: Rogers, Fido, Shaw and Comwave account payments, rogers.com, fido.ca and TSC (up to $61,000/year combined)",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 325,
        "cardId": 85,
        "name": "Roam Like Home Days",
        "description": "Five Roam Like Home days at no cost each year for eligible Rogers mobile plans (Rogers values them at up to $90). Replaced on 2027-01-12 by a $75 annual roaming credit.",
        "annualValue": 90
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.rogersbank.com/en/help_centre_answers/upcoming_account_changes",
    "imageSourceUrl": "https://www.rogersbank.com/en/rogers_worldelite_mastercard_details",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 86,
    "name": "MBNA Rewards World Elite Mastercard",
    "issuer": "MBNA Canada",
    "network": "Mastercard",
    "annualFee": 120,
    "signupBonus": "Up to 30,000 MBNA Rewards points after qualifying spend and paperless enrollment",
    "signupBonusValue": 245,
    "color": "linear-gradient(135deg, #143c70, #d71920)",
    "logoUrl": "https://logo.clearbit.com/mbna.ca",
    "cardImageUrl": "/card-images/86-mbna-rewards-world-elite-mastercard.webp",
    "rewardType": "points",
    "rewardProgram": "MBNA Rewards",
    "rewardUnitName": "MBNA Rewards Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "MBNA Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "5 points per $1 on eligible restaurant, grocery, digital media, membership and household utility purchases until $50,000 is spent in that category in the calendar year; each category has its own $50,000 limit, then 1 point per $1.",
      "MBNA's 'digital media' category is shown here as streaming, music, e-books, games and apps; MBNA classifies it by merchant code.",
      "Birthday bonus: each year, 10% of the points earned in the 12 months before the primary cardholder's birthday month, up to 15,000 points."
    ],
    "cashbackCategories": [
      {
        "id": 358,
        "cardId": 86,
        "category": "Restaurants (up to $50,000/year)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 359,
        "cardId": 86,
        "category": "Groceries (up to $50,000/year)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 360,
        "cardId": 86,
        "category": "Streaming, music, e-books, games and apps (up to $50,000/year)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 361,
        "cardId": 86,
        "category": "Memberships (up to $50,000/year)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 362,
        "cardId": 86,
        "category": "Household utilities (up to $50,000/year)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 363,
        "cardId": 86,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 327,
        "cardId": 86,
        "name": "Birthday Bonus Points",
        "description": "Annual birthday bonus equal to 10% of points earned in the prior 12 months, up to 15,000 points.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 328,
        "cardId": 86,
        "name": "Travel Medical Insurance",
        "description": "Up to $2 million coverage for eligible trips for insured persons under 65.",
        "annualValue": 250
      },
      {
        "id": 329,
        "cardId": 86,
        "name": "Mobile Device Insurance",
        "description": "Eligible mobile device insurance when requirements are met.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.mbna.ca/en/credit-cards/rewards/mbna-rewards-world-elite-mastercard",
    "imageSourceUrl": "https://www.mbna.ca/en/credit-cards/rewards/mbna-rewards-world-elite-mastercard",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 87,
    "name": "National Bank World Elite Mastercard",
    "issuer": "National Bank of Canada",
    "network": "Mastercard",
    "annualFee": 150,
    "signupBonus": "Up to 35,000 rewards points in the current promotion; see issuer page for conditions",
    "signupBonusValue": 350,
    "color": "linear-gradient(135deg, #111827, #d71920)",
    "logoUrl": "https://logo.clearbit.com/nbc.ca",
    "cardImageUrl": "/card-images/87-national-bank-world-elite-mastercard.webp",
    "rewardType": "points",
    "rewardProgram": "A la carte Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "A la carte Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "5 points per $1 on groceries and restaurants applies until $2,500 of gross purchases of any kind is charged to the account in the month; after that groceries and restaurants earn 2 points per $1. The app caps the two categories at a combined $2,500 a month and then falls back to 1 point, so it is approximate in both directions.",
      "2 points per $1 on gas and EV charging, on recurring bill payments automatically charged by the merchant, and on travel booked through the À la carte Travel agency on the À la carte Rewards site.",
      "Travel expense refund: up to $150 per calendar year for airport parking, baggage fees, seat selection, airport lounge access and airline ticket upgrades charged to the card (primary cardholder; claim within 60 days)."
    ],
    "cashbackCategories": [
      {
        "id": 364,
        "cardId": 87,
        "category": "Groceries (up to $2,500/month combined)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 365,
        "cardId": 87,
        "category": "Restaurants (up to $2,500/month combined)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 366,
        "cardId": 87,
        "category": "Gas and EV charging",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 367,
        "cardId": 87,
        "category": "Recurring payments",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 368,
        "cardId": 87,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9200,
        "cardId": 87,
        "category": "Travel booked online through the À la carte Travel agency",
        "rate": 0.02,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 330,
        "cardId": 87,
        "name": "Travel Expense Reimbursement",
        "description": "Refund of up to $150 between January 1 and December 31 each year for airport parking, baggage fees, seat selection, airport lounge access and airline ticket upgrades charged to the card.",
        "annualValue": 150,
        "period": "calendar-year"
      },
      {
        "id": 331,
        "cardId": 87,
        "name": "Airport Lounge Access",
        "description": "Free, unlimited access to the National Bank Lounge at Montréal-Trudeau (YUL) with one guest and two children aged 12 or under; the lounge is temporarily relocated during renovations from 2026-10-05.",
        "annualValue": null
      },
      {
        "id": 332,
        "cardId": 87,
        "name": "Travel Insurance",
        "description": "Comprehensive travel insurance benefits when requirements are met.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.nbc.ca/personal/mastercard-credit-cards/world-elite.html",
    "imageSourceUrl": "https://www.nbc.ca/personal/mastercard-credit-cards/world-elite.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 88,
    "name": "American Express Classic Green Card",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 150,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #244234, #7fb28b)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/88-american-express-green-card.webp",
    "rewardType": "points",
    "rewardProgram": "American Express Membership Rewards",
    "rewardUnitName": "Membership Rewards Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Membership Rewards redemption value varies by redemption path; this app uses a conservative 1.00 cent per point estimate for annual-fee progress and keeps earned points visible separately.",
    "rewardRuleNotes": [
      "Closed to new applicants since 2026-07-23, when American Express removed the product page. Existing cardholders keep the card.",
      "Renamed from American Express Green Card to American Express Classic Green Card on 2026-08-20; cardholder notices said the fee, rewards and benefits did not change.",
      "Earn rates have not been re-verified against a live product page since 2026-07-23."
    ],
    "cashbackCategories": [
      {
        "id": 369,
        "cardId": 88,
        "category": "Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 370,
        "cardId": 88,
        "category": "Transit",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 371,
        "cardId": 88,
        "category": "Restaurants",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 372,
        "cardId": 88,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 333,
        "cardId": 88,
        "name": "CLEAR Plus Credit",
        "description": "Up to $219 in statement credits per calendar year for an annual CLEAR+ membership paid with the card.",
        "annualValue": 219,
        "period": "calendar-year"
      },
      {
        "id": 334,
        "cardId": 88,
        "name": "Broad Travel Rewards",
        "description": "Earns elevated Membership Rewards points across travel, transit, and restaurants.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/en-us/company/legal/cardmember-agreements/",
    "imageSourceUrl": "https://www.americanexpress.com/en-us/account/get-started/green/uncover-your-benefits",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review",
    "availability": "closed-to-new-applicants",
    "availabilityChangedAt": "2026-07-23"
  },
  {
    "id": 89,
    "name": "American Express Blue Business Cash",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 0,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0b4f8a, #5ec8e5)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/89-american-express-blue-business-cash.webp",
    "rewardType": "cashback",
    "rewardProgram": "American Express Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Business Purchases (up to $50,000/yr); Other after cap."
    ],
    "cashbackCategories": [
      {
        "id": 373,
        "cardId": 89,
        "category": "Business Purchases (up to $50,000/yr)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 374,
        "cardId": 89,
        "category": "Other after cap",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 335,
        "cardId": 89,
        "name": "No Annual Fee",
        "description": "No annual membership fee for the business cash back card.",
        "annualValue": 0
      },
      {
        "id": 336,
        "cardId": 89,
        "name": "Expanded Buying Power",
        "description": "May allow eligible purchases above the stated credit limit based on account factors.",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/en-us/business/credit-cards/blue-business-cash/44659/",
    "imageSourceUrl": "https://www.americanexpress.com/en-us/business/credit-cards/blue-business-cash/44659/",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
  },
  {
    "id": 90,
    "name": "American Express Blue Business Plus",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 0,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f172a, #4593d3)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/90-american-express-blue-business-plus.webp",
    "rewardType": "points",
    "rewardProgram": "American Express Membership Rewards",
    "rewardUnitName": "Membership Rewards Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Membership Rewards redemption value varies by redemption path; this app uses a conservative 1.00 cent per point estimate for annual-fee progress and keeps earned points visible separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Business Purchases (up to $50,000/yr); Other after cap."
    ],
    "cashbackCategories": [
      {
        "id": 375,
        "cardId": 90,
        "category": "Business Purchases (up to $50,000/yr)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 376,
        "cardId": 90,
        "category": "Other after cap",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 337,
        "cardId": 90,
        "name": "No Annual Fee",
        "description": "Earns Membership Rewards points without an annual membership fee.",
        "annualValue": 0
      },
      {
        "id": 338,
        "cardId": 90,
        "name": "Expanded Buying Power",
        "description": "Flexible purchasing power may adapt based on payment history, credit record, and other factors.",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-blue-business-plus-credit-card-amex/45137/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-blue-business-plus-credit-card-amex/45137/",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
  },
  {
    "id": 91,
    "name": "Chase Freedom Rise",
    "issuer": "Chase",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f766e, #7dd3fc)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/91-chase-freedom-rise.png",
    "rewardType": "cashback",
    "rewardProgram": "Chase Ultimate Rewards cash back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 377,
        "cardId": 91,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      },
      {
        "id": 9139,
        "cardId": 91,
        "category": "Lyft (through 9/30/2027)",
        "rate": 0.02,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 339,
        "cardId": 91,
        "name": "Credit Builder Fit",
        "description": "Positioned for new-to-credit and student applicants while still earning cash back.",
        "annualValue": 40
      },
      {
        "id": 340,
        "cardId": 91,
        "name": "No Annual Fee",
        "description": "No annual card fee.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/freedom/rise",
    "imageSourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/freedom/rise",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 92,
    "name": "Chase Slate Credit Card",
    "issuer": "Chase",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #334155, #94a3b8)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/92-chase-slate-credit-card.png",
    "rewardType": null,
    "rewardProgram": "No ongoing purchase rewards",
    "rewardUnitName": null,
    "rewardUnitValueCents": null,
    "rewardValuationDescription": "This card is modeled as having no ongoing purchase rewards in the current official-product data.",
    "rewardRuleNotes": [
      "No ongoing rewards are modeled for purchases; use the card for financing/fee features rather than reward optimization."
    ],
    "cashbackCategories": [
      {
        "id": 378,
        "cardId": 92,
        "category": "Other",
        "rate": 0,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 341,
        "cardId": 92,
        "name": "Intro APR Focus",
        "description": "Designed for low intro APR purchases and balance transfers rather than rewards.",
        "annualValue": null
      },
      {
        "id": 342,
        "cardId": 92,
        "name": "No Annual Fee",
        "description": "No annual card fee.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/no-annual-fee-credit-cards/slate-credit-cards",
    "imageSourceUrl": "https://creditcards.chase.com/no-annual-fee-credit-cards/slate-credit-cards",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 93,
    "name": "Chase Ink Business Premier",
    "issuer": "Chase",
    "network": "Mastercard",
    "annualFee": 195,
    "signupBonus": "$1,000 bonus cash back after $10,000 spend in 3 months",
    "signupBonusValue": 1000,
    "color": "linear-gradient(135deg, #111827, #2563eb)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/93-chase-ink-business-premier.png",
    "rewardType": "cashback",
    "rewardProgram": "Chase Ultimate Rewards cash back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Large-purchase bonus rates apply only to transactions meeting the listed minimum purchase amount."
    ],
    "cashbackCategories": [
      {
        "id": 379,
        "cardId": 93,
        "category": "Large Purchases $5k+",
        "rate": 0.025,
        "isDefault": false
      },
      {
        "id": 380,
        "cardId": 93,
        "category": "Other business purchases",
        "rate": 0.02,
        "isDefault": true
      },
      {
        "id": 381,
        "cardId": 93,
        "category": "Lyft through 9/30/2027",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9140,
        "cardId": 93,
        "category": "Chase Travel",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 343,
        "cardId": 93,
        "name": "High Base Business Rewards",
        "description": "Strong uncapped cash back on business purchases, with a higher rate for purchases of $5,000 or more.",
        "annualValue": null
      },
      {
        "id": 344,
        "cardId": 93,
        "name": "Pay in Full with Flex Option",
        "description": "Pay in Full card with Flex for Business APR access on eligible balances.",
        "annualValue": null
      },
      {
        "id": 784,
        "cardId": 93,
        "name": "Cell Phone Protection",
        "description": "Up to $1,000 per claim against covered theft or damage for phones on a monthly bill paid with the card; up to 3 claims per 12 months with a $100 deductible.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/premier",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/premier",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 94,
    "name": "United Business Card",
    "issuer": "Chase / United Airlines",
    "network": "Visa",
    "annualFee": 150,
    "signupBonus": "Up to 110,000 bonus miles plus 2,000 PQP after qualifying activities",
    "signupBonusValue": 1320,
    "color": "linear-gradient(135deg, #002244, #005daa)",
    "logoUrl": "https://logo.clearbit.com/united.com",
    "cardImageUrl": "/card-images/94-united-business-card.png",
    "rewardType": "miles",
    "rewardProgram": "United MileagePlus",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.2,
    "rewardValuationDescription": "United MileagePlus value varies by itinerary and redemption path; this app uses an estimated 1.20 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 382,
        "cardId": 94,
        "category": "United purchases",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 383,
        "cardId": 94,
        "category": "Gas",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 384,
        "cardId": 94,
        "category": "Dining",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 385,
        "cardId": 94,
        "category": "Office supplies",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 386,
        "cardId": 94,
        "category": "Transit",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 387,
        "cardId": 94,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 345,
        "cardId": 94,
        "name": "United Club Passes",
        "description": "Two United Club one-time passes each year.",
        "annualValue": 100
      },
      {
        "id": 346,
        "cardId": 94,
        "name": "Free Checked Bag",
        "description": "First checked bag benefit for the primary cardmember and one companion when requirements are met.",
        "annualValue": 160
      },
      {
        "id": 785,
        "cardId": 94,
        "name": "$125 United Travel Credit",
        "description": "$125 in United TravelBank cash after 5 United flight purchases of $100 or more in a calendar year.",
        "annualValue": 125,
        "period": "calendar-year"
      },
      {
        "id": 786,
        "cardId": 94,
        "name": "United Hotels Credit",
        "description": "$50 back on each of the first two prepaid United Hotels stays per account anniversary year (up to $100).",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 787,
        "cardId": 94,
        "name": "Rideshare Credit",
        "description": "Up to $8 back each month January-November and $12 in December on rideshare purchases (up to $100 per calendar year). Yearly opt-in required.",
        "annualValue": 100,
        "period": "monthly"
      },
      {
        "id": 788,
        "cardId": 94,
        "name": "Avis/Budget Travel Credit",
        "description": "$25 in United TravelBank cash on each of the first two Avis or Budget rentals booked through mileageplustravel.united.com per account anniversary year (up to $50).",
        "annualValue": 50,
        "period": "cardmember-year"
      },
      {
        "id": 789,
        "cardId": 94,
        "name": "Instacart Credit",
        "description": "$10 Instacart credit each month (up to $120 per calendar year) on purchases made directly through Instacart; ends 12/31/2027.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 790,
        "cardId": 94,
        "name": "JSX Credit",
        "description": "Up to $100 back each account anniversary year on flights booked directly with JSX.",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 791,
        "cardId": 94,
        "name": "FareLock Credit",
        "description": "Up to $25 back each account anniversary year on United FareLock purchases.",
        "annualValue": 25,
        "period": "cardmember-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/united/united-business-card",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/united/united-business-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 95,
    "name": "World of Hyatt Business Credit Card",
    "issuer": "Chase / Hyatt",
    "network": "Visa",
    "annualFee": 199,
    "signupBonus": "60,000 bonus points after $5,000 spend in 3 months",
    "signupBonusValue": 900,
    "color": "linear-gradient(135deg, #4a3a2a, #c6a15b)",
    "logoUrl": "https://logo.clearbit.com/hyatt.com",
    "cardImageUrl": "/card-images/95-world-of-hyatt-business-credit-card.png",
    "rewardType": "points",
    "rewardProgram": "World of Hyatt",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.7,
    "rewardValuationDescription": "World of Hyatt value varies by redemption; this app uses an estimated 1.70 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Business-card 2x category applies automatically to the top three eligible spend categories each quarter, plus fitness club and gym memberships."
    ],
    "cashbackCategories": [
      {
        "id": 388,
        "cardId": 95,
        "category": "Hyatt Hotels",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 389,
        "cardId": 95,
        "category": "Top 3 Quarterly Business Categories",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 390,
        "cardId": 95,
        "category": "Fitness clubs",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 391,
        "cardId": 95,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 348,
        "cardId": 95,
        "name": "Hyatt Statement Credits",
        "description": "$50 statement credit per qualifying Hyatt purchase of $50 or more, up to 2 times each account anniversary year ($100 total).",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 349,
        "cardId": 95,
        "name": "Discoverist Status",
        "description": "Complimentary World of Hyatt Discoverist status for the primary cardmember and eligible employee cards.",
        "annualValue": null
      },
      {
        "id": 350,
        "cardId": 95,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on purchases.",
        "annualValue": null
      },
      {
        "id": 792,
        "cardId": 95,
        "name": "Tier-Qualifying Night Credits",
        "description": "5 World of Hyatt tier-qualifying night credits for every $10,000 in purchases each calendar year.",
        "annualValue": null,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/world-of-hyatt/hyatt-business-card",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/world-of-hyatt/hyatt-business-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 389,
        "mode": "automatic-top-spend",
        "picks": 3,
        "resets": "quarter",
        "options": [
          "Dining",
          "Shipping",
          "Airline tickets purchased directly with the airline",
          "Local transit and commuting",
          "Social media and search engine advertising",
          "Car rental agencies",
          "Gas stations",
          "Internet, cable and phone services"
        ]
      }
    ]
  },
  {
    "id": 96,
    "name": "Southwest Rapid Rewards Performance Business",
    "issuer": "Chase / Southwest Airlines",
    "network": "Visa",
    "annualFee": 299,
    "signupBonus": "80,000 points after $5,000 spend in 3 months",
    "signupBonusValue": 1040,
    "color": "linear-gradient(135deg, #1f2f7b, #f9b000)",
    "logoUrl": "https://logo.clearbit.com/southwest.com",
    "cardImageUrl": "/card-images/96-southwest-rapid-rewards-performance-business.png",
    "rewardType": "points",
    "rewardProgram": "Southwest Rapid Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "Southwest Rapid Rewards value varies by redemption; this app uses an estimated 1.30 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 392,
        "cardId": 96,
        "category": "Southwest purchases",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 393,
        "cardId": 96,
        "category": "Direct Hotel Purchases",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 394,
        "cardId": 96,
        "category": "Rideshare and transit",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 395,
        "cardId": 96,
        "category": "Gas and Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 396,
        "cardId": 96,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 351,
        "cardId": 96,
        "name": "Seat and Upgrade Benefits",
        "description": "Complimentary Preferred seat selection and Extra Legroom upgrades when available.",
        "annualValue": null
      },
      {
        "id": 352,
        "cardId": 96,
        "name": "Free First Checked Bag",
        "description": "First checked bag free for cardmembers and eligible passengers on the same reservation.",
        "annualValue": 180
      },
      {
        "id": 793,
        "cardId": 96,
        "name": "Global Entry / TSA PreCheck / NEXUS Credit",
        "description": "Up to $120 statement credit every 4 years for a Global Entry, TSA PreCheck or NEXUS application fee charged to the card.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 794,
        "cardId": 96,
        "name": "9,000 Anniversary Points",
        "description": "9,000 bonus points each account anniversary year.",
        "annualValue": 117,
        "period": "cardmember-year"
      },
      {
        "id": 795,
        "cardId": 96,
        "name": "25% Back on In-Flight Purchases",
        "description": "25% back as a statement credit on inflight purchases.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/southwest/performance-business",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/southwest/performance-business",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 97,
    "name": "Southwest Rapid Rewards Premier Business",
    "issuer": "Chase / Southwest Airlines",
    "network": "Visa",
    "annualFee": 149,
    "signupBonus": "60,000 points after $3,000 spend in 3 months",
    "signupBonusValue": 780,
    "color": "linear-gradient(135deg, #1f2f7b, #d71920)",
    "logoUrl": "https://logo.clearbit.com/southwest.com",
    "cardImageUrl": "/card-images/97-southwest-rapid-rewards-premier-business.png",
    "rewardType": "points",
    "rewardProgram": "Southwest Rapid Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "Southwest Rapid Rewards value varies by redemption; this app uses an estimated 1.30 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Gas and restaurant bonus categories share the issuer's annual combined spend cap before base earning applies."
    ],
    "cashbackCategories": [
      {
        "id": 397,
        "cardId": 97,
        "category": "Southwest purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 398,
        "cardId": 97,
        "category": "Gas (up to $8,000/yr combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 399,
        "cardId": 97,
        "category": "Restaurants (up to $8,000/yr combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 400,
        "cardId": 97,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 354,
        "cardId": 97,
        "name": "Southwest Travel Benefits",
        "description": "Free first checked bag, selected seat benefits when available, and boarding benefit.",
        "annualValue": null
      },
      {
        "id": 355,
        "cardId": 97,
        "name": "6,000 Anniversary Points",
        "description": "6,000 bonus points each year after the cardmember anniversary.",
        "annualValue": 78,
        "period": "cardmember-year"
      },
      {
        "id": 796,
        "cardId": 97,
        "name": "15% Flight Discount Promo Code",
        "description": "A 15% promo code each cardmember anniversary (excludes Basic fares).",
        "annualValue": null,
        "period": "cardmember-year"
      },
      {
        "id": 797,
        "cardId": 97,
        "name": "25% Back on In-Flight Purchases",
        "description": "25% back as a statement credit on inflight purchases.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/southwest/premier-business",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/southwest/premier-business",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 98,
    "name": "Capital One VentureOne Rewards",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "20,000 miles after $500 spend in 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #0f766e, #7c3aed)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/98-capital-one-ventureone-rewards.webp",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 401,
        "cardId": 98,
        "category": "Hotels, vacation rentals and rental cars booked through Capital One Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 402,
        "cardId": 98,
        "category": "Other",
        "rate": 0.0125,
        "isDefault": true
      },
      {
        "id": 9155,
        "cardId": 98,
        "category": "Capital One Entertainment purchases (online ticketing platform)",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 356,
        "cardId": 98,
        "name": "No Annual Fee Travel Miles",
        "description": "Flat-rate Capital One miles with no annual fee.",
        "annualValue": 0
      },
      {
        "id": 357,
        "cardId": 98,
        "name": "Capital One Travel Tools",
        "description": "Access to travel booking tools such as price prediction, price drop protection, and price match where eligible.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/ventureone/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/ventureone/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 99,
    "name": "Capital One Venture Business",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "Up to 150,000 bonus miles after qualifying spend",
    "signupBonusValue": 1500,
    "color": "linear-gradient(135deg, #0f172a, #1d4ed8)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/99-capital-one-venture-business.webp",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 403,
        "cardId": 99,
        "category": "Hotels, vacation rentals and rental cars booked through Capital One Business Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 404,
        "cardId": 99,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      },
      {
        "id": 405,
        "cardId": 99,
        "category": "Business purchases",
        "rate": 0.02,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 359,
        "cardId": 99,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Up to $120 statement credit for the Global Entry or TSA PreCheck application fee, once every 4 years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 835,
        "cardId": 99,
        "name": "$50 Annual Capital One Business Travel Credit",
        "description": "Up to $50 each account year for bookings through Capital One Business Travel; expires on the next account-open anniversary.",
        "annualValue": 50,
        "period": "cardmember-year"
      },
      {
        "id": 836,
        "cardId": 99,
        "name": "$50 Annual Advertising/Software Statement Credit",
        "description": "Up to $50 statement credit each account year for purchases at qualifying advertising or software merchants; unused credit expires on the account-open anniversary.",
        "annualValue": 50,
        "period": "cardmember-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/venture-business/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/venture-business/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 100,
    "name": "Capital One Venture X Business",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 395,
    "signupBonus": "150,000 bonus miles after $30,000 spend in 3 months",
    "signupBonusValue": 1500,
    "color": "linear-gradient(135deg, #0c0f1f, #475569)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/100-capital-one-venture-x-business.webp",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Capital One Business Travel hotels and rental cars; Capital One Business Travel flights and vacation rentals; Other.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 406,
        "cardId": 100,
        "category": "Capital One Business Travel hotels and rental cars",
        "rate": 0.1,
        "isDefault": false
      },
      {
        "id": 407,
        "cardId": 100,
        "category": "Capital One Business Travel flights and vacation rentals",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 408,
        "cardId": 100,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 360,
        "cardId": 100,
        "name": "$300 Business Travel Credit",
        "description": "Up to $300 each account year for bookings through Capital One Business Travel; expires the day before the next account-open anniversary.",
        "annualValue": 300,
        "period": "cardmember-year"
      },
      {
        "id": 361,
        "cardId": 100,
        "name": "Airport Lounge Access",
        "description": "Capital One Lounge and Landing access plus Priority Pass (enrollment required) for the primary cardholder. Additional cardholders need paid lounge access ($125/year each, up to 4). Complimentary guests (2 per Lounge visit, 1 per Landing visit) only on accounts spending $75,000+ a year.",
        "annualValue": null
      },
      {
        "id": 362,
        "cardId": 100,
        "name": "10,000 Anniversary Miles",
        "description": "10,000 bonus miles every year starting on the first anniversary.",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 837,
        "cardId": 100,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Up to $120 statement credit for the Global Entry or TSA PreCheck application fee, once every 4 years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 838,
        "cardId": 100,
        "name": "Premier Collection Experience Credit",
        "description": "Up to $100 experience credit per booking on Premier Collection hotels and vacation rentals booked through Capital One Business Travel, plus daily breakfast for two, Wi-Fi, and upgrades / early check-in / late checkout when available.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/venture-x-business/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/venture-x-business/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 101,
    "name": "Citi Simplicity Card",
    "issuer": "Citi",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #002d72, #8bb8e8)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/101-citi-simplicity-card.webp",
    "rewardType": null,
    "rewardProgram": "No ongoing purchase rewards",
    "rewardUnitName": null,
    "rewardUnitValueCents": null,
    "rewardValuationDescription": "This card is modeled as having no ongoing purchase rewards in the current official-product data.",
    "rewardRuleNotes": [
      "No ongoing rewards are modeled for purchases; use the card for financing/fee features rather than reward optimization."
    ],
    "cashbackCategories": [
      {
        "id": 409,
        "cardId": 101,
        "category": "Other",
        "rate": 0,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 363,
        "cardId": 101,
        "name": "No Late Fees",
        "description": "Issuer positions the card around no late fees and no penalty rate.",
        "annualValue": null
      },
      {
        "id": 364,
        "cardId": 101,
        "name": "Low Intro APR",
        "description": "Designed for introductory APR purchases and balance transfers rather than rewards.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-simplicity-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-simplicity-credit-card",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 102,
    "name": "Citi Diamond Preferred Card",
    "issuer": "Citi",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #102a43, #9fb3c8)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/102-citi-diamond-preferred-card.webp",
    "rewardType": null,
    "rewardProgram": "No ongoing purchase rewards",
    "rewardUnitName": null,
    "rewardUnitValueCents": null,
    "rewardValuationDescription": "This card is modeled as having no ongoing purchase rewards in the current official-product data.",
    "rewardRuleNotes": [
      "No ongoing rewards are modeled for purchases; use the card for financing/fee features rather than reward optimization."
    ],
    "cashbackCategories": [
      {
        "id": 410,
        "cardId": 102,
        "category": "Other",
        "rate": 0,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 365,
        "cardId": 102,
        "name": "Low Intro APR",
        "description": "Focused on low introductory APR purchases and balance transfers.",
        "annualValue": null
      },
      {
        "id": 366,
        "cardId": 102,
        "name": "FICO Score and ID Protection",
        "description": "Includes free FICO Score access and Mastercard ID Theft Protection.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-diamond-preferred-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-diamond-preferred-credit-card",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 103,
    "name": "Citi Strata Elite Card",
    "issuer": "Citi",
    "network": "Mastercard",
    "annualFee": 595,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #6366f1)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/103-citi-strata-elite-card.webp",
    "rewardType": "points",
    "rewardProgram": "Citi ThankYou Points",
    "rewardUnitName": "ThankYou Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Citi cards in this catalog earn ThankYou Points or cash-equivalent ThankYou rewards; this app uses 1 cent per point for cash-value calculations unless a product-specific rule says otherwise.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 411,
        "cardId": 103,
        "category": "Citi Travel hotels, car rentals, and attractions",
        "rate": 0.12,
        "isDefault": false
      },
      {
        "id": 412,
        "cardId": 103,
        "category": "Citi Travel air",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 413,
        "cardId": 103,
        "category": "Restaurants on Citi Nights",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 414,
        "cardId": 103,
        "category": "Restaurants",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 415,
        "cardId": 103,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 367,
        "cardId": 103,
        "name": "$300 Annual Hotel Benefit",
        "description": "Up to $300 off one hotel stay of 2+ nights booked through Citi Travel, once each calendar year.",
        "annualValue": 300,
        "period": "calendar-year"
      },
      {
        "id": 368,
        "cardId": 103,
        "name": "$200 Splurge Credit",
        "description": "Up to $200 in statement credits each calendar year on up to 2 of: 1stDibs, American Airlines, Best Buy, Future Personal Training and Live Nation (exclusions apply).",
        "annualValue": 200,
        "period": "calendar-year"
      },
      {
        "id": 369,
        "cardId": 103,
        "name": "$200 Blacklane Credit",
        "description": "Up to $100 in Blacklane credits for January-June and up to $100 for July-December.",
        "annualValue": 200,
        "period": "semiannual"
      },
      {
        "id": 370,
        "cardId": 103,
        "name": "Airport Lounge Access",
        "description": "Priority Pass Select plus annual Admirals Club pass access where eligible.",
        "annualValue": 650
      },
      {
        "id": 839,
        "cardId": 103,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Up to $120 statement credit for the Global Entry or TSA PreCheck application fee, once every 4 years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-strata-elite-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-strata-elite-credit-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 104,
    "name": "Bank of America Unlimited Cash Rewards",
    "issuer": "Bank of America",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 online cash rewards bonus after $1,000 spend in 90 days",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #002776, #e31837)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/104-bank-of-america-unlimited-cash-rewards.png",
    "rewardType": "cashback",
    "rewardProgram": "Bank of America Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 416,
        "cardId": 104,
        "category": "First-year purchases",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 417,
        "cardId": 104,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 371,
        "cardId": 104,
        "name": "Preferred Rewards Boost",
        "description": "BofA Rewards, which replaced Preferred Rewards in May 2026, adds a bonus on card rewards by tier: Member 10%, Preferred Plus 25% ($30,000+ in qualifying balances), Preferred Honors 50% ($100,000+), Premier 75% ($1,000,000+). Former Preferred Rewards members keep their prior card bonus for at least six months after May 2026.",
        "annualValue": null
      },
      {
        "id": 372,
        "cardId": 104,
        "name": "Low Intro APR",
        "description": "0% intro APR for the first 15 billing cycles on purchases and on balance transfers made within 60 days of account opening.",
        "annualValue": null,
        "period": "one-time"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/unlimited-cash-back-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/unlimited-cash-back-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 105,
    "name": "BankAmericard Credit Card",
    "issuer": "Bank of America",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #1e3a8a, #cbd5e1)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/105-bankamericard-credit-card.png",
    "rewardType": null,
    "rewardProgram": "No ongoing purchase rewards",
    "rewardUnitName": null,
    "rewardUnitValueCents": null,
    "rewardValuationDescription": "This card is modeled as having no ongoing purchase rewards in the current official-product data.",
    "rewardRuleNotes": [
      "No ongoing rewards are modeled for purchases; use the card for financing/fee features rather than reward optimization."
    ],
    "cashbackCategories": [
      {
        "id": 418,
        "cardId": 105,
        "category": "Other",
        "rate": 0,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 373,
        "cardId": 105,
        "name": "Long Intro APR",
        "description": "0% intro APR for the first 21 billing cycles on purchases and on balance transfers made within 60 days of account opening.",
        "annualValue": null,
        "period": "one-time"
      },
      {
        "id": 374,
        "cardId": 105,
        "name": "No Penalty APR",
        "description": "Paying late will not automatically raise the purchase APR.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/bankamericard-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/bankamericard-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 106,
    "name": "Bank of America Premium Rewards Elite",
    "issuer": "Bank of America",
    "network": "Visa",
    "annualFee": 550,
    "signupBonus": "75,000 online bonus points after $5,000 spend in 90 days",
    "signupBonusValue": 750,
    "color": "linear-gradient(135deg, #111827, #a16207)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/106-bank-of-america-premium-rewards-elite.png",
    "rewardType": "points",
    "rewardProgram": "Bank of America Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Bank of America Rewards Points value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 419,
        "cardId": 106,
        "category": "Travel",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 420,
        "cardId": 106,
        "category": "Dining",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 421,
        "cardId": 106,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 375,
        "cardId": 106,
        "name": "$300 Airline Incidental Credit",
        "description": "Up to $300 in Airline Incidental Statement Credits each calendar year for qualifying purchases such as seat upgrades, baggage fees, airline lounge fees and in-flight services.",
        "annualValue": 300,
        "period": "calendar-year"
      },
      {
        "id": 376,
        "cardId": 106,
        "name": "$150 Lifestyle Credit",
        "description": "Up to $150 in statement credits each calendar year for lifestyle conveniences: video streaming, food delivery, fitness subscriptions and rideshare.",
        "annualValue": 150,
        "period": "calendar-year"
      },
      {
        "id": 377,
        "cardId": 106,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Up to $120 in statement credits toward Global Entry or TSA PreCheck application fees, every four years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 378,
        "cardId": 106,
        "name": "20% Airfare Points Savings",
        "description": "Redeem points for airfare through Bank of America travel channels with 20% savings where eligible.",
        "annualValue": null
      },
      {
        "id": 842,
        "cardId": 106,
        "name": "Priority Pass Select Membership",
        "description": "Up to 4 complimentary Priority Pass Select memberships for airport lounge access.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/premium-rewards-elite-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/premium-rewards-elite-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 107,
    "name": "Bank of America Customized Cash Rewards Secured",
    "issuer": "Bank of America",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #1e40af, #38bdf8)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/107-bank-of-america-customized-cash-rewards-secured.png",
    "rewardType": "cashback",
    "rewardProgram": "Bank of America Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "New accounts earn 6% in the choice category for the first year, then 3%. This app uses the standing 3% rate.",
      "The 3% choice category and the 2% grocery/wholesale-club rate share one $2,500 combined cap per quarter; spend beyond it earns 1%.",
      "Secured accounts are not eligible for a welcome bonus or an introductory APR."
    ],
    "cashbackCategories": [
      {
        "id": 422,
        "cardId": 107,
        "category": "Choice Category (up to $2,500/quarter combined with groceries and wholesale clubs)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 423,
        "cardId": 107,
        "category": "Grocery Stores & Wholesale Clubs (up to $2,500/quarter combined with choice category)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 424,
        "cardId": 107,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 379,
        "cardId": 107,
        "name": "Secured Credit Building",
        "description": "Secured card structure for building or strengthening credit while earning rewards.",
        "annualValue": 50
      },
      {
        "id": 380,
        "cardId": 107,
        "name": "Monthly Choice Category",
        "description": "Choice category can be changed once each calendar month.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/cash-back-secured-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/cash-back-secured-credit-card/",
    "lastReviewedAt": "2026-08-07",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 422,
        "mode": "user-selected",
        "picks": 1,
        "resets": "month",
        "options": [
          "Gas and EV charging stations",
          "Online shopping including cable, internet, phone plans and streaming",
          "Dining",
          "Travel",
          "Drug stores and pharmacies",
          "Home improvement and furnishings"
        ]
      }
    ]
  },
  {
    "id": 108,
    "name": "Wells Fargo Autograph Journey",
    "issuer": "Wells Fargo",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #7f1d1d, #f59e0b)",
    "logoUrl": "https://logo.clearbit.com/wellsfargo.com",
    "cardImageUrl": "/card-images/108-wells-fargo-autograph-journey.webp",
    "rewardType": "points",
    "rewardProgram": "Wells Fargo Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Wells Fargo Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 425,
        "cardId": 108,
        "category": "Hotels",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 426,
        "cardId": 108,
        "category": "Airlines",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 427,
        "cardId": 108,
        "category": "Other travel and dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 428,
        "cardId": 108,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 381,
        "cardId": 108,
        "name": "$50 Airline Statement Credit",
        "description": "One $50 statement credit each year for the first airline purchase of at least $50; after year one the 12-month credit period begins the first day of the month after the annual fee is assessed.",
        "annualValue": 50,
        "period": "cardmember-year"
      },
      {
        "id": 382,
        "cardId": 108,
        "name": "Travel Protections",
        "description": "Includes travel and purchase protection benefits described in the card guide to benefits.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/autograph-journey-visa-credit-card/",
    "imageSourceUrl": "https://creditcards.wellsfargo.com/autograph-journey-visa-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 109,
    "name": "Wells Fargo Attune",
    "issuer": "Wells Fargo",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #064e3b, #a7f3d0)",
    "logoUrl": "https://logo.clearbit.com/wellsfargo.com",
    "cardImageUrl": "/card-images/109-wells-fargo-attune.webp",
    "rewardType": "points",
    "rewardProgram": "Wells Fargo Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Wells Fargo Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Closed to new applicants since approximately 2026-06-15. Existing cardholders keep the card."
    ],
    "cashbackCategories": [
      {
        "id": 429,
        "cardId": 109,
        "category": "Self-care, sports, recreation, entertainment, and impact",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 430,
        "cardId": 109,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 383,
        "cardId": 109,
        "name": "Cell Phone Protection",
        "description": "Eligible cell phone protection when the monthly phone bill is paid with the card.",
        "annualValue": null
      },
      {
        "id": 384,
        "cardId": 109,
        "name": "No Annual Fee",
        "description": "No annual fee for the Attune World Elite Mastercard.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/",
    "imageSourceUrl": "https://creditcards.wellsfargo.com/attune-credit-card/",
    "lastReviewedAt": "2026-08-06",
    "dataConfidence": "needs-review",
    "availability": "closed-to-new-applicants",
    "availabilityChangedAt": "2026-06-15"
  },
  {
    "id": 110,
    "name": "Choice Privileges Mastercard",
    "issuer": "Wells Fargo / Choice Hotels",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "40,000 points after $1,000 spend in 3 months",
    "signupBonusValue": 240,
    "color": "linear-gradient(135deg, #002677, #5bb6e8)",
    "logoUrl": "https://logo.clearbit.com/choicehotels.com",
    "cardImageUrl": "/card-images/110-choice-privileges-mastercard.png",
    "rewardType": "points",
    "rewardProgram": "Choice Privileges",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.8,
    "rewardValuationDescription": "Choice Privileges value varies by redemption; this app uses an estimated 0.80 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle."
    ],
    "cashbackCategories": [
      {
        "id": 431,
        "cardId": 110,
        "category": "Choice Hotels",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 432,
        "cardId": 110,
        "category": "Gas",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 433,
        "cardId": 110,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 434,
        "cardId": 110,
        "category": "Phone plans and home improvement",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 435,
        "cardId": 110,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 385,
        "cardId": 110,
        "name": "No Annual Fee",
        "description": "No annual fee Choice Privileges Mastercard.",
        "annualValue": 0
      },
      {
        "id": 386,
        "cardId": 110,
        "name": "Cell Phone Protection",
        "description": "Eligible cell phone protection when the monthly phone bill is paid with the card.",
        "annualValue": null
      },
      {
        "id": 387,
        "cardId": 110,
        "name": "Choice Hotel Rewards",
        "description": "Earns Choice Privileges points for hotel stays and everyday categories.",
        "annualValue": null
      },
      {
        "id": 848,
        "cardId": 110,
        "name": "Gold Elite Status + Elite Qualifying Nights",
        "description": "10 Elite Qualifying Nights each calendar year (within 14 days of account opening, then every January 1), guaranteeing Choice Privileges Gold Elite status and its 10% bonus on qualifying stays.",
        "annualValue": null
      },
      {
        "id": 849,
        "cardId": 110,
        "name": "No Foreign Transaction Fee",
        "description": "No foreign currency conversion or foreign transaction fee.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/choice-hotel-privileges-mastercard/",
    "imageSourceUrl": "https://creditcards.wellsfargo.com/choice-privileges-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 111,
    "name": "U.S. Bank Smartly Visa Signature",
    "issuer": "U.S. Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f3b70, #45b8ac)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/111-u-s-bank-smartly-visa-signature.png",
    "rewardType": "cashback",
    "rewardProgram": "U.S. Bank Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle.",
      "The 4% row is the top Smartly tier ($100,000+ qualifying balance); lower tiers earn 2.5% ($10,000-$49,999) or 3% ($50,000-$99,999). Boosted rates apply to the first $10,000 in eligible net purchases each billing cycle (approximated as a calendar month); everything else earns 2%."
    ],
    "cashbackCategories": [
      {
        "id": 436,
        "cardId": 111,
        "category": "Smartly Earning Bonus tier, up to 4% total (first $10,000/month)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 437,
        "cardId": 111,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 388,
        "cardId": 111,
        "name": "Relationship Bonus Tiers",
        "description": "Eligible U.S. Bank Smartly relationship balances can increase cash back on the first eligible spend per billing cycle.",
        "annualValue": null
      },
      {
        "id": 389,
        "cardId": 111,
        "name": "No Annual Fee",
        "description": "No annual fee with a 2% base cash back structure.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/credit-cards/bank-smartly-visa-signature-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/credit-cards/bank-smartly-visa-signature-credit-card.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 112,
    "name": "U.S. Bank Shopper Cash Rewards Visa Signature",
    "issuer": "U.S. Bank",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #7f1d1d, #f97316)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/112-u-s-bank-shopper-cash-rewards-visa-signature.png",
    "rewardType": "cashback",
    "rewardProgram": "U.S. Bank Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Closed to new applicants since 2026-06-22. Existing cardholders keep the card and all reward categories.",
      "The official product page has been removed; this row is retained so existing wallet entries still resolve."
    ],
    "cashbackCategories": [
      {
        "id": 438,
        "cardId": 112,
        "category": "Chosen Retailers (up to $1,500/quarter)",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 439,
        "cardId": 112,
        "category": "Travel Center hotels and rental cars",
        "rate": 0.055,
        "isDefault": false
      },
      {
        "id": 440,
        "cardId": 112,
        "category": "Chosen Everyday Category (up to $1,500/quarter)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 441,
        "cardId": 112,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 390,
        "cardId": 112,
        "name": "Quarterly Retailer Choice",
        "description": "Choose two eligible retailers each quarter for elevated cash back on capped spend.",
        "annualValue": null
      },
      {
        "id": 391,
        "cardId": 112,
        "name": "Travel Center Bonus",
        "description": "Elevated cash back on eligible prepaid hotel and car reservations booked in the Rewards Center.",
        "annualValue": null
      },
      {
        "id": 392,
        "cardId": 112,
        "name": "Intro First-Year Fee",
        "description": "Low annual fee structure with first-year intro treatment per issuer terms.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/credit-cards.html",
    "imageSourceUrl": "https://www.usbank.com/credit-cards/shopper-cash-rewards-visa-signature-credit-card.html",
    "lastReviewedAt": "2026-08-06",
    "dataConfidence": "needs-review",
    "availability": "closed-to-new-applicants",
    "availabilityChangedAt": "2026-06-22"
  },
  {
    "id": 113,
    "name": "U.S. Bank Shield Visa",
    "issuer": "U.S. Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #1f2937, #64748b)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/113-u-s-bank-shield-visa.png",
    "rewardType": "cashback",
    "rewardProgram": "U.S. Bank Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Only prepaid air, hotel and car reservations booked directly in the U.S. Bank Travel Center earn rewards (4% cash back); all other purchases earn nothing.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 442,
        "cardId": 113,
        "category": "Other",
        "rate": 0,
        "isDefault": true
      },
      {
        "id": 9159,
        "cardId": 113,
        "category": "Prepaid air, hotel and car reservations in the U.S. Bank Travel Center",
        "rate": 0.04,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 393,
        "cardId": 113,
        "name": "Long Intro APR",
        "description": "0% intro APR on purchases for the first 21 billing cycles; balance transfers made within 60 days of account opening also qualify (5% balance transfer fee, $5 minimum).",
        "annualValue": null,
        "period": "one-time"
      },
      {
        "id": 394,
        "cardId": 113,
        "name": "No Annual Fee Protection Card",
        "description": "No annual fee card with a protection-oriented benefit package.",
        "annualValue": null
      },
      {
        "id": 853,
        "cardId": 113,
        "name": "$20 Annual Statement Credit",
        "description": "Automatic $20 statement credit per 12-month period after 11 consecutive calendar months of purchases, with the account in good standing.",
        "annualValue": 20,
        "period": "cardmember-year"
      },
      {
        "id": 854,
        "cardId": 113,
        "name": "Cell Phone Protection",
        "description": "Up to $600 reimbursement if your cell phone is stolen or damaged when you pay your monthly cellular bill with the card; terms and exclusions in the Guide to Benefits.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/credit-cards/shield-visa-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/credit-cards/visa-platinum-credit-card.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 114,
    "name": "U.S. Bank Business Triple Cash Rewards",
    "issuer": "U.S. Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "60,000 bonus points after $6,000 spend in 120 days",
    "signupBonusValue": 600,
    "color": "linear-gradient(135deg, #0f3b70, #22c55e)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/114-u-s-bank-business-triple-cash-rewards.png",
    "rewardType": "cashback",
    "rewardProgram": "U.S. Bank Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates.",
      "Gas and EV charging transactions over $200 earn 1%, and discount stores/supercenters and wholesale clubs are excluded from the 3% gas/EV category."
    ],
    "cashbackCategories": [
      {
        "id": 443,
        "cardId": 114,
        "category": "Travel Center hotels and rental cars",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 444,
        "cardId": 114,
        "category": "Gas, EV charging, dining, office supplies, and cell phone",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 445,
        "cardId": 114,
        "category": "Restaurants",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 446,
        "cardId": 114,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 395,
        "cardId": 114,
        "name": "Business Category Cash Back",
        "description": "Elevated cash back across common small-business operating categories.",
        "annualValue": null
      },
      {
        "id": 396,
        "cardId": 114,
        "name": "No Annual Fee",
        "description": "No annual fee and free employee cards.",
        "annualValue": 0
      },
      {
        "id": 855,
        "cardId": 114,
        "name": "$100 Annual Software Subscription Credit",
        "description": "Automatic $100 statement credit per 12-month period after 11 consecutive months of eligible software service purchases made directly with a software provider (e.g. QuickBooks, FreshBooks).",
        "annualValue": 100,
        "period": "cardmember-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/business-banking/business-credit-cards/business-triple-cash-back-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/business-banking/business-credit-cards/business-triple-cash-back-credit-card.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 115,
    "name": "U.S. Bank Business Leverage Visa Signature",
    "issuer": "U.S. Bank",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #0f3b70)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/115-u-s-bank-business-leverage-visa-signature.png",
    "rewardType": "cashback",
    "rewardProgram": "U.S. Bank Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Closed to new applicants since approximately 2026-10-11, when U.S. Bank removed the product page. Existing cardholders keep the card and its earning structure.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 447,
        "cardId": 115,
        "category": "Travel Center hotels and rental cars",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 448,
        "cardId": 115,
        "category": "Top two monthly business categories",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 449,
        "cardId": 115,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 397,
        "cardId": 115,
        "name": "Automatic Top Categories",
        "description": "Earns elevated points in the top two eligible categories each month automatically.",
        "annualValue": null
      },
      {
        "id": 398,
        "cardId": 115,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on eligible international inventory, supply, or travel expenses.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/business-banking/business-credit-cards/business-leverage-rewards-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/business-banking/business-credit-cards/business-leverage-rewards-credit-card.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review",
    "categoryChoices": [
      {
        "categoryId": 448,
        "mode": "automatic-top-spend",
        "picks": 2,
        "resets": "month",
        "options": [
          "Advertising firms",
          "Airlines",
          "Auto rental and transport providers",
          "Cable, satellite, TV and radio providers",
          "Computer service providers",
          "Computer stores",
          "Department, book and novelty stores",
          "Discount stores and wholesale clubs",
          "Drug stores and pharmacies",
          "Entertainment places",
          "Gas stations and fuel dealers",
          "Grocery stores and supermarkets",
          "Home improvement service and supply",
          "Hotels",
          "Pet supply stores",
          "Restaurants",
          "Stationery and office supply stores",
          "Telecom service providers",
          "Utility companies"
        ]
      }
    ],
    "availability": "closed-to-new-applicants",
    "availabilityChangedAt": "2026-10-11"
  },
  {
    "id": 116,
    "name": "Navy Federal cashRewards Plus",
    "issuer": "Navy Federal Credit Union",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$250 bonus cash after $2,500 spend in 90 days",
    "signupBonusValue": 250,
    "color": "linear-gradient(135deg, #0b3b60, #22c55e)",
    "logoUrl": "https://logo.clearbit.com/navyfederal.org",
    "cardImageUrl": "/card-images/116-navy-federal-cashrewards-plus.webp",
    "rewardType": "cashback",
    "rewardProgram": "Navy Federal Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 450,
        "cardId": 116,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 399,
        "cardId": 116,
        "name": "No Annual or Foreign Transaction Fees",
        "description": "No annual fee, balance transfer fee, foreign transaction fee, or cash advance fee per issuer disclosures.",
        "annualValue": null
      },
      {
        "id": 400,
        "cardId": 116,
        "name": "Balance Transfer Promo",
        "description": "1.99% intro APR for 12 months from account opening on balances transferred from non-Navy Federal cards within 60 days of opening (applications submitted by 2027-01-03); no balance transfer fee. Transferred balances do not earn rewards.",
        "annualValue": null,
        "period": "one-time"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.navyfederal.org/loans-cards/credit-cards/cash-rewards.html",
    "imageSourceUrl": "https://www.navyfederal.org/loans-cards/credit-cards/cash-rewards.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 117,
    "name": "Navy Federal More Rewards American Express",
    "issuer": "Navy Federal Credit Union",
    "network": "Amex",
    "annualFee": 0,
    "signupBonus": "20,000 bonus points after $2,000 spend in 90 days",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #003087, #0f766e)",
    "logoUrl": "https://logo.clearbit.com/navyfederal.org",
    "cardImageUrl": "/card-images/117-navy-federal-more-rewards-american-express.png",
    "rewardType": "points",
    "rewardProgram": "Navy Federal Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Navy Federal Rewards Points value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 451,
        "cardId": 117,
        "category": "Restaurants and food delivery",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 452,
        "cardId": 117,
        "category": "Supermarkets",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 453,
        "cardId": 117,
        "category": "Gas and transit",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 454,
        "cardId": 117,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 401,
        "cardId": 117,
        "name": "No Annual Fee",
        "description": "No annual fee for the Navy Federal More Rewards American Express Card.",
        "annualValue": 0
      },
      {
        "id": 402,
        "cardId": 117,
        "name": "Everyday Category Coverage",
        "description": "Broad elevated rewards across dining, supermarkets, gas, and transit.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.navyfederal.org/loans-cards/credit-cards/more-rewards.html",
    "imageSourceUrl": "https://www.navyfederal.org/loans-cards/credit-cards/more-rewards.html",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 118,
    "name": "Navy Federal Visa Signature Flagship Rewards",
    "issuer": "Navy Federal Credit Union",
    "network": "Visa",
    "annualFee": 49,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #0ea5e9)",
    "logoUrl": "https://logo.clearbit.com/navyfederal.org",
    "cardImageUrl": "/card-images/118-navy-federal-visa-signature-flagship-rewards.webp",
    "rewardType": "points",
    "rewardProgram": "Navy Federal Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Navy Federal Rewards Points value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Closed to new applicants since 2026-09-10, when Navy Federal launched the Flagship Premier Visa Signature ($95 annual fee; 4X travel, 3X dining, 1X other) in its place. Existing Flagship Rewards cardholders can keep the card or switch to Flagship Premier without a new application.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 455,
        "cardId": 118,
        "category": "Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 456,
        "cardId": 118,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 403,
        "cardId": 118,
        "name": "Amazon Prime Credit",
        "description": "Annual statement credit for eligible Amazon Prime annual membership purchases during the public offer period.",
        "annualValue": 139
      },
      {
        "id": 404,
        "cardId": 118,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Up to $120 in statement credits toward Global Entry or TSA PreCheck application fees, once every 4 years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.navyfederal.org/about/press-releases/2026-press-releases/Flagship-Premier-Launch.html",
    "imageSourceUrl": "https://www.navyfederal.org/loans-cards/credit-cards/flagship-visa-signature.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review",
    "availability": "closed-to-new-applicants",
    "availabilityChangedAt": "2026-09-10"
  },
  {
    "id": 119,
    "name": "Navy Federal GO REWARDS",
    "issuer": "Navy Federal Credit Union",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "Low intro APR offer; see issuer page for current terms",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f3b60, #facc15)",
    "logoUrl": "https://logo.clearbit.com/navyfederal.org",
    "cardImageUrl": "/card-images/119-navy-federal-go-rewards.webp",
    "rewardType": "points",
    "rewardProgram": "Navy Federal Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Navy Federal Rewards Points value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 457,
        "cardId": 119,
        "category": "Restaurants",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 458,
        "cardId": 119,
        "category": "Gas",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 459,
        "cardId": 119,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 405,
        "cardId": 119,
        "name": "Low Intro APR Offer",
        "description": "0.99% intro APR on purchases for 6 months from account opening (applications submitted by 2027-01-03), then the standard variable APR.",
        "annualValue": null,
        "period": "one-time"
      },
      {
        "id": 406,
        "cardId": 119,
        "name": "No Annual Fee",
        "description": "No annual fee points card.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.navyfederal.org/loans-cards/credit-cards/go-rewards.html",
    "imageSourceUrl": "https://www.navyfederal.org/loans-cards/credit-cards/go-rewards.html",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 120,
    "name": "Wyndham Rewards Earner Card",
    "issuer": "Barclays / Wyndham Rewards",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "30,000 bonus points after $1,000 spend in 90 days",
    "signupBonusValue": 180,
    "color": "linear-gradient(135deg, #002f6c, #00a3e0)",
    "logoUrl": "https://logo.clearbit.com/wyndhamhotels.com",
    "cardImageUrl": "/card-images/120-wyndham-rewards-earner-card.webp",
    "rewardType": "points",
    "rewardProgram": "Wyndham Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.9,
    "rewardValuationDescription": "Wyndham Rewards value varies by redemption; this app uses an estimated 0.90 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "3X dining and grocery exclude Target and Walmart; Vacation Club purchases also earn 3X (down payments earn 1X)."
    ],
    "cashbackCategories": [
      {
        "id": 460,
        "cardId": 120,
        "category": "Hotels by Wyndham",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 461,
        "cardId": 120,
        "category": "Restaurants",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 462,
        "cardId": 120,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 463,
        "cardId": 120,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9163,
        "cardId": 120,
        "category": "Gas and EV charging",
        "rate": 0.03,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 407,
        "cardId": 120,
        "name": "Wyndham Gold Membership",
        "description": "Complimentary Wyndham Rewards Gold membership.",
        "annualValue": 75
      },
      {
        "id": 408,
        "cardId": 120,
        "name": "Anniversary Bonus",
        "description": "7,500 bonus points each account anniversary year after $15,000 in eligible purchases.",
        "annualValue": 45,
        "period": "cardmember-year"
      },
      {
        "id": 863,
        "cardId": 120,
        "name": "10% Off Award Redemptions",
        "description": "Redeem 10% fewer Wyndham Rewards points for free nights.",
        "annualValue": null
      },
      {
        "id": 864,
        "cardId": 120,
        "name": "No Foreign Transaction Fees",
        "description": "Foreign transaction fee: 0%.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.wyndhamrewardscreditcard.com/earner-card/",
    "imageSourceUrl": "https://www.wyndhamrewardscreditcard.com/earner-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 121,
    "name": "Wyndham Rewards Earner Business Card",
    "issuer": "Barclays / Wyndham Rewards",
    "network": "Visa",
    "annualFee": 149,
    "signupBonus": "45,000 bonus points after $3,000 spend and paying the annual fee in 90 days",
    "signupBonusValue": 270,
    "color": "linear-gradient(135deg, #111827, #00a3e0)",
    "logoUrl": "https://logo.clearbit.com/wyndhamhotels.com",
    "cardImageUrl": "/card-images/121-wyndham-rewards-earner-business-card.webp",
    "rewardType": "points",
    "rewardProgram": "Wyndham Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.9,
    "rewardValuationDescription": "Wyndham Rewards value varies by redemption; this app uses an estimated 0.90 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 464,
        "cardId": 121,
        "category": "Hotels by Wyndham",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 465,
        "cardId": 121,
        "category": "Gas, EV charging, Vacation Club, marketing, advertising, office supplies and shipping",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 466,
        "cardId": 121,
        "category": "Business purchases",
        "rate": 0.01,
        "isDefault": false
      },
      {
        "id": 467,
        "cardId": 121,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 409,
        "cardId": 121,
        "name": "Wyndham Diamond Membership",
        "description": "Complimentary Wyndham Rewards Diamond membership.",
        "annualValue": 200
      },
      {
        "id": 410,
        "cardId": 121,
        "name": "Anniversary Bonus",
        "description": "15,000 bonus points each account anniversary year after the annual fee is paid.",
        "annualValue": 90,
        "period": "cardmember-year"
      },
      {
        "id": 865,
        "cardId": 121,
        "name": "Warehouse Club Membership Credit",
        "description": "Up to $65 statement credit each calendar year on eligible wholesale club memberships or renewals.",
        "annualValue": 65,
        "period": "calendar-year"
      },
      {
        "id": 866,
        "cardId": 121,
        "name": "Accounting Software Credit",
        "description": "Up to $50 statement credit each calendar year after qualifying accounting software purchases.",
        "annualValue": 50,
        "period": "calendar-year"
      },
      {
        "id": 867,
        "cardId": 121,
        "name": "20% Off Award Redemptions",
        "description": "Redeem 20% fewer Wyndham Rewards points for free nights.",
        "annualValue": null
      },
      {
        "id": 868,
        "cardId": 121,
        "name": "National Car Rental Emerald Club Executive Status",
        "description": "Complimentary Emerald Club Executive status with National Car Rental.",
        "annualValue": null
      },
      {
        "id": 869,
        "cardId": 121,
        "name": "No Foreign Transaction Fees",
        "description": "Foreign transaction fee: 0%.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.wyndhamrewardscreditcard.com/earner-business-card/",
    "imageSourceUrl": "https://www.wyndhamrewardscreditcard.com/earner-business-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 122,
    "name": "Hawaiian Airlines Business Mastercard",
    "issuer": "Barclays / Hawaiian Airlines",
    "network": "Mastercard",
    "annualFee": 99,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #4c1d95, #ec4899)",
    "logoUrl": "https://logo.clearbit.com/hawaiianairlines.com",
    "cardImageUrl": "/card-images/122-hawaiian-airlines-business-mastercard.png",
    "rewardType": "points",
    "rewardProgram": "Atmos Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.4,
    "rewardValuationDescription": "Atmos Rewards value varies by redemption; this app uses an estimated 1.40 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Closed to new applicants since 2025-10-01, when HawaiianMiles folded into Alaska's Atmos Rewards program (balances converted 1:1). Existing accounts earn Atmos Rewards points.",
      "Alaska Airlines and Bank of America have said they are working toward Bank of America issuing all Atmos Rewards co-branded cards; no conversion date for Barclays Hawaiian accounts has been announced.",
      "Earn rates and benefits below have not been re-verified since the Atmos transition."
    ],
    "cashbackCategories": [
      {
        "id": 468,
        "cardId": 122,
        "category": "Hawaiian Airlines purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 469,
        "cardId": 122,
        "category": "Gas",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 470,
        "cardId": 122,
        "category": "Dining and office supplies",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 471,
        "cardId": 122,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 411,
        "cardId": 122,
        "name": "Companion Discount",
        "description": "One-time 50%-off companion discount for eligible roundtrip coach travel between Hawaii and North America.",
        "annualValue": 200,
        "period": "one-time"
      },
      {
        "id": 412,
        "cardId": 122,
        "name": "Anniversary Bonus Miles",
        "description": "Opportunity to earn annual anniversary bonus miles based on spend.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://frequentmiler.com/hawaiian-airlines-cards-issued-by-barclays-still-available-for-now/",
    "imageSourceUrl": "https://www.hawaiianairlines.com/hawaiianmiles2/credit-card-business",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review",
    "availability": "closed-to-new-applicants",
    "availabilityChangedAt": "2025-10-01"
  },
  {
    "id": 123,
    "name": "Hilton Honors American Express Business",
    "issuer": "American Express / Hilton",
    "network": "Amex",
    "annualFee": 195,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #002663, #38bdf8)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/123-hilton-honors-american-express-business.webp",
    "rewardType": "points",
    "rewardProgram": "Hilton Honors",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.5,
    "rewardValuationDescription": "Hilton Honors value varies by redemption; this app uses an estimated 0.50 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "5X on non-Hilton purchases applies to the first $100,000 of eligible purchases each calendar year, then 3X. The app keeps 5X as the default rate and cannot enforce this cap, so spend past $100,000 is overstated."
    ],
    "cashbackCategories": [
      {
        "id": 472,
        "cardId": 123,
        "category": "Hilton stays",
        "rate": 0.12,
        "isDefault": false
      },
      {
        "id": 473,
        "cardId": 123,
        "category": "Other eligible purchases before cap",
        "rate": 0.05,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 413,
        "cardId": 123,
        "name": "$240 Hilton Credit",
        "description": "Up to $60 in statement credits each quarter (up to $240 per year) on purchases made directly with a property in the Hilton portfolio.",
        "annualValue": 240,
        "period": "quarterly"
      },
      {
        "id": 414,
        "cardId": 123,
        "name": "Hilton Gold Status",
        "description": "Complimentary Hilton Honors Gold status.",
        "annualValue": null
      },
      {
        "id": 415,
        "cardId": 123,
        "name": "Diamond Status Spend Path",
        "description": "Spend-based path to Hilton Honors Diamond status.",
        "annualValue": null
      },
      {
        "id": 416,
        "cardId": 123,
        "name": "National Executive Status",
        "description": "Complimentary National Car Rental Emerald Club Executive status after enrollment.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/hilton-honors/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/hilton-honors/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 124,
    "name": "Marriott Bonvoy Business American Express",
    "issuer": "American Express / Marriott",
    "network": "Amex",
    "annualFee": 125,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #1f2937, #b45309)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/124-marriott-bonvoy-business-american-express.webp",
    "rewardType": "points",
    "rewardProgram": "Marriott Bonvoy",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.7,
    "rewardValuationDescription": "Marriott Bonvoy value varies by redemption; this app uses an estimated 0.70 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 474,
        "cardId": 124,
        "category": "Marriott stays",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 475,
        "cardId": 124,
        "category": "Restaurants, gas, wireless, and shipping",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 476,
        "cardId": 124,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 417,
        "cardId": 124,
        "name": "Marriott Room Rate Discount",
        "description": "Eligible 7% discount on bookings through qualifying Marriott channels under the Amex Business Card Rate.",
        "annualValue": null
      },
      {
        "id": 418,
        "cardId": 124,
        "name": "Marriott Gold Elite Status",
        "description": "Complimentary Marriott Bonvoy Gold Elite status.",
        "annualValue": null
      },
      {
        "id": 419,
        "cardId": 124,
        "name": "Free Night Award",
        "description": "One Free Night Award each year after the card renewal month, valid for one night at a redemption level up to 35,000 Marriott Bonvoy points.",
        "annualValue": 250,
        "period": "cardmember-year"
      },
      {
        "id": 913,
        "cardId": 124,
        "name": "Second Free Night Award ($60,000 spend)",
        "description": "An additional Free Night Award (redemption level up to 35,000 points) after $60,000 in purchases on the card in a calendar year.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 914,
        "cardId": 124,
        "name": "15 Elite Night Credits",
        "description": "15 Elite Night Credits each calendar year toward the next level of Marriott Bonvoy Elite status; can be combined with the credits from one eligible Marriott Bonvoy consumer Amex card.",
        "annualValue": null,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/amex-marriott-bonvoy-business-credit-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/amex-marriott-bonvoy-business-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 125,
    "name": "Chase Sapphire Reserve for Business",
    "issuer": "Chase",
    "network": "Visa",
    "annualFee": 795,
    "signupBonus": "150,000 bonus points after $20,000 spend in 3 months",
    "signupBonusValue": 3000,
    "color": "linear-gradient(135deg, #0f172a, #475569)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/125-chase-sapphire-reserve-for-business.webp",
    "rewardType": "points",
    "rewardProgram": "Chase Ultimate Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.5,
    "rewardValuationDescription": "Chase Ultimate Rewards can be redeemed for cash at 1 cent per point or for higher travel value depending on card and redemption path; this app uses 1.50 cents per point for Sapphire Reserve annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates.",
      "From 11/15/2026, 3x on social media and search engine advertising covers the first $1,000,000 per account anniversary year, then 1x; this app resets that cap each calendar year.",
      "Chase says The Edit credit rises to up to $1,000 a year (two more $250 credits) from 1/1/2027."
    ],
    "cashbackCategories": [
      {
        "id": 477,
        "cardId": 125,
        "category": "Chase Travel",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 478,
        "cardId": 125,
        "category": "Direct flights and hotels",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 479,
        "cardId": 125,
        "category": "Social media and search advertising (up to $1,000,000/year)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 480,
        "cardId": 125,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9141,
        "cardId": 125,
        "category": "Lyft (through 9/30/2027)",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 420,
        "cardId": 125,
        "name": "$300 Annual Travel Credit",
        "description": "Annual travel statement credit on eligible purchases.",
        "annualValue": 300,
        "period": "cardmember-year"
      },
      {
        "id": 421,
        "cardId": 125,
        "name": "Chase Sapphire Lounge Access",
        "description": "Complimentary access to Chase Sapphire Lounge by The Club network and Priority Pass Select after enrollment.",
        "annualValue": 550
      },
      {
        "id": 422,
        "cardId": 125,
        "name": "The Edit Credits",
        "description": "Up to $500 in statement credits each calendar year on prepaid stays of two or more nights booked with The Edit through Chase Travel, at most $250 per transaction (Chase: rising to $1,000 a year from 1/1/2027).",
        "annualValue": 500,
        "period": "calendar-year"
      },
      {
        "id": 798,
        "cardId": 125,
        "name": "Global Entry, TSA PreCheck or NEXUS Credit",
        "description": "One statement credit of up to $120 every four years for a Global Entry, TSA PreCheck or NEXUS application fee charged to the card.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 799,
        "cardId": 125,
        "name": "Google Workspace Credit",
        "description": "Up to $200 in statement credits each calendar year on purchases made directly with Google Workspace, through 12/31/2027.",
        "annualValue": 200,
        "period": "calendar-year"
      },
      {
        "id": 800,
        "cardId": 125,
        "name": "ZipRecruiter Credit",
        "description": "Up to $200 in statement credits January-June and up to $200 July-December on ZipRecruiter purchases, through 12/31/2027.",
        "annualValue": 400,
        "period": "semiannual"
      },
      {
        "id": 801,
        "cardId": 125,
        "name": "Curated Gift Card Credit",
        "description": "Up to $50 January-June and up to $50 July-December on gift cards bought at giftcards.com/reservebusiness, through 10/31/2028.",
        "annualValue": 100,
        "period": "semiannual"
      },
      {
        "id": 802,
        "cardId": 125,
        "name": "DashPass Membership",
        "description": "Complimentary DashPass when activated by 12/31/2027, plus up to $25 in DoorDash promos each month ($5 on a restaurant order and two $10 non-restaurant promos) through 12/31/2027.",
        "annualValue": 300,
        "period": "monthly"
      },
      {
        "id": 803,
        "cardId": 125,
        "name": "Lyft Credit",
        "description": "$10 in-app Lyft ride credit each calendar month through 9/30/2027.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 804,
        "cardId": 125,
        "name": "$250 Select Chase Travel Hotels Credit",
        "description": "Up to $250 in statement credits in calendar 2026 only on prepaid 2+ night Chase Travel bookings at IHG, Montage, Pendry, Omni, Virgin, Minor and Pan Pacific hotels; ends 12/31/2026.",
        "annualValue": 250,
        "period": "one-time"
      },
      {
        "id": 805,
        "cardId": 125,
        "name": "IHG One Rewards Platinum Elite Status",
        "description": "Complimentary IHG One Rewards Platinum Elite status through 12/31/2027 for the authorizing officer after linking an IHG One Rewards account.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/sapphire/reserve",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/sapphire/reserve",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 126,
    "name": "Fidelity Rewards Visa Signature",
    "issuer": "Fidelity / Elan Financial Services",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f5132, #6ee7b7)",
    "logoUrl": "https://logo.clearbit.com/fidelity.com",
    "cardImageUrl": "/card-images/126-fidelity-rewards-visa-signature.png",
    "rewardType": "cashback",
    "rewardProgram": "Fidelity Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 481,
        "cardId": 126,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 424,
        "cardId": 126,
        "name": "No Annual or Foreign Transaction Fees",
        "description": "No annual fee and no foreign transaction fee per Fidelity's current card page.",
        "annualValue": null
      },
      {
        "id": 425,
        "cardId": 126,
        "name": "Global Entry / TSA PreCheck Benefit",
        "description": "Up to $100 in Reward Points (10,000 points) once every four years when the Global Entry or TSA PreCheck application fee is paid with the card.",
        "annualValue": 25,
        "period": "multi-year",
        "periodYears": 4
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.fidelity.com/spend-save/visa-signature-card",
    "imageSourceUrl": "https://www.fidelity.com/spend-save/visa-signature-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 127,
    "name": "SoFi Unlimited 2% Credit Card",
    "issuer": "SoFi",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f766e, #14b8a6)",
    "logoUrl": "https://logo.clearbit.com/sofi.com",
    "cardImageUrl": "/card-images/127-sofi-unlimited-2-percent-credit-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "SoFi Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 482,
        "cardId": 127,
        "category": "SoFi Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 483,
        "cardId": 127,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 426,
        "cardId": 127,
        "name": "No Annual Fee for New Applicants",
        "description": "SoFi states new credit card applicants are not charged an annual fee, subject to cardholder terms.",
        "annualValue": 0
      },
      {
        "id": 427,
        "cardId": 127,
        "name": "No SoFi Foreign Exchange Fee",
        "description": "SoFi states it does not add foreign exchange fees to purchase transactions.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.sofi.com/credit-card/unlimited/",
    "imageSourceUrl": "https://www.sofi.com/credit-card/unlimited/",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
  },
  {
    "id": 128,
    "name": "SoFi Everyday Cash Rewards Credit Card",
    "issuer": "SoFi",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #115e59, #a7f3d0)",
    "logoUrl": "https://logo.clearbit.com/sofi.com",
    "cardImageUrl": "/card-images/128-sofi-everyday-cash-rewards-credit-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "SoFi Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 484,
        "cardId": 128,
        "category": "SoFi Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 485,
        "cardId": 128,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 486,
        "cardId": 128,
        "category": "Groceries",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 487,
        "cardId": 128,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 428,
        "cardId": 128,
        "name": "Everyday Bonus Categories",
        "description": "Elevated rewards for dining and grocery store purchases based on merchant coding.",
        "annualValue": null
      },
      {
        "id": 429,
        "cardId": 128,
        "name": "No Annual Fee for New Applicants",
        "description": "SoFi states new credit card applicants are not charged an annual fee, subject to cardholder terms.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.sofi.com/credit-card/everyday-cash/",
    "imageSourceUrl": "https://www.sofi.com/credit-card/everyday-cash/",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
  },
  {
    "id": 129,
    "name": "Venmo Visa Signature Credit Card",
    "issuer": "Venmo / Synchrony",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0074de, #38bdf8)",
    "logoUrl": "https://logo.clearbit.com/venmo.com",
    "cardImageUrl": "/card-images/129-venmo-visa-signature-credit-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "Venmo Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle."
    ],
    "cashbackCategories": [
      {
        "id": 488,
        "cardId": 129,
        "category": "Top spend category",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 489,
        "cardId": 129,
        "category": "Second top spend category",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 490,
        "cardId": 129,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 430,
        "cardId": 129,
        "name": "Automatic Top Categories",
        "description": "Automatically applies 3% to the top eligible spend category and 2% to the next eligible category.",
        "annualValue": null
      },
      {
        "id": 431,
        "cardId": 129,
        "name": "No Annual Fee",
        "description": "No annual fee for the Venmo Visa Signature Credit Card.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://venmo.com/about/creditcard/features/visasignature",
    "imageSourceUrl": "https://venmo.com/about/creditcard/features/visasignature",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 130,
    "name": "Alliant Cashback Visa Signature",
    "issuer": "Alliant Credit Union",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #1e3a8a, #60a5fa)",
    "logoUrl": "https://logo.clearbit.com/alliantcreditunion.org",
    "cardImageUrl": "/card-images/130-alliant-cashback-visa-signature.webp",
    "rewardType": "cashback",
    "rewardProgram": "Alliant Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 491,
        "cardId": 130,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 432,
        "cardId": 130,
        "name": "No Annual Fee",
        "description": "Current official page lists unlimited 1.5% cash back with no annual fee.",
        "annualValue": 0
      },
      {
        "id": 433,
        "cardId": 130,
        "name": "Simple Flat Cash Back",
        "description": "Flat-rate cashback structure without rotating categories.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.alliantcreditunion.org/credit-cards/visa-signature-card",
    "imageSourceUrl": "https://www.alliantcreditunion.org/credit-cards/visa-signature-card",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
  },
  {
    "id": 131,
    "name": "Wells Fargo Signify Business Cash",
    "issuer": "Wells Fargo",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #7f1d1d, #ef4444)",
    "logoUrl": "https://logo.clearbit.com/wellsfargo.com",
    "cardImageUrl": "/card-images/131-wells-fargo-signify-business-cash.webp",
    "rewardType": "cashback",
    "rewardProgram": "Wells Fargo Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 492,
        "cardId": 131,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 600,
        "cardId": 131,
        "name": "Unlimited Business Cash Back",
        "description": "Earn unlimited 2% cash rewards on qualifying business purchases.",
        "annualValue": null
      },
      {
        "id": 601,
        "cardId": 131,
        "name": "No Annual Fee",
        "description": "Current Wells Fargo terms list no annual fee for the Signify Business Cash card.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/business-credit-cards/signify-business-cash-credit-card/",
    "imageSourceUrl": "https://creditcards.wellsfargo.com/business-credit-cards/signify-business-cash-credit-card/",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
  },
  {
    "id": 132,
    "name": "Wells Fargo One Key Card",
    "issuer": "Wells Fargo",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "See issuer page for current OneKeyCash offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f172a, #14b8a6)",
    "logoUrl": "https://logo.clearbit.com/wellsfargo.com",
    "cardImageUrl": "/card-images/132-wells-fargo-one-key-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "OneKeyCash",
    "rewardUnitName": "OneKeyCash",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 493,
        "cardId": 132,
        "category": "Expedia / Hotels.com / Vrbo",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 494,
        "cardId": 132,
        "category": "Gas",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 495,
        "cardId": 132,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 496,
        "cardId": 132,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 497,
        "cardId": 132,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 602,
        "cardId": 132,
        "name": "Automatic One Key Silver",
        "description": "Automatic One Key Silver tier while the card is open (Silver member prices, 15%+ off 10,000+ hotels); Gold tier after $15,000 in net purchases in a calendar year.",
        "annualValue": null
      },
      {
        "id": 603,
        "cardId": 132,
        "name": "No Foreign Transaction Fees",
        "description": "Issuer materials list no foreign transaction fees.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/one-key-credit-card/",
    "imageSourceUrl": "https://www.wellsfargo.com/credit-cards/agreements/?lang=en",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 133,
    "name": "Wells Fargo One Key+ Card",
    "issuer": "Wells Fargo",
    "network": "Mastercard",
    "annualFee": 99,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #2563eb)",
    "logoUrl": "https://logo.clearbit.com/wellsfargo.com",
    "cardImageUrl": "/card-images/133-wells-fargo-one-key-plus-card.png",
    "rewardType": "cashback",
    "rewardProgram": "OneKeyCash",
    "rewardUnitName": "OneKeyCash",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Apparently closed to new applicants: by 2026-10-31 Wells Fargo had removed the One Key+ product page and dropped the card from its lineup (it was still offered on 2026-08-06). Wells Fargo has published no statement. Existing cardholders keep the card.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 498,
        "cardId": 133,
        "category": "Expedia / Hotels.com / Vrbo",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 499,
        "cardId": 133,
        "category": "Gas",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 500,
        "cardId": 133,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 501,
        "cardId": 133,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 502,
        "cardId": 133,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 604,
        "cardId": 133,
        "name": "$100 OneKeyCash Anniversary Bonus",
        "description": "$100 in OneKeyCash each cardholder anniversary.",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 605,
        "cardId": 133,
        "name": "Trusted Traveler Credit",
        "description": "Up to $120 statement credit toward Global Entry or TSA PreCheck, once every four years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 850,
        "cardId": 133,
        "name": "Automatic One Key Gold Tier",
        "description": "Automatic One Key Gold tier while the card is open; Platinum tier after $30,000 in purchases in a calendar year.",
        "annualValue": null
      },
      {
        "id": 851,
        "cardId": 133,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/",
    "imageSourceUrl": "https://www.wellsfargo.com/credit-cards/guide-to-benefits/onekeyplus/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review",
    "availability": "closed-to-new-applicants",
    "availabilityChangedAt": "2026-10-31"
  },
  {
    "id": 134,
    "name": "Capital One Spark Cash Plus",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 150,
    "signupBonus": "$2,000 cash bonus after $30,000 spend in the first 3 months",
    "signupBonusValue": 2000,
    "color": "linear-gradient(135deg, #7f1d1d, #f59e0b)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/134-capital-one-spark-cash-plus.webp",
    "rewardType": "cashback",
    "rewardProgram": "Capital One Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 503,
        "cardId": 134,
        "category": "Hotels, vacation rentals and rental cars booked through Capital One Business Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 504,
        "cardId": 134,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 606,
        "cardId": 134,
        "name": "Annual Fee Refund Threshold",
        "description": "Capital One advertises an annual fee refund every year the account spends at least $150,000.",
        "annualValue": 150,
        "period": "cardmember-year"
      },
      {
        "id": 607,
        "cardId": 134,
        "name": "No Preset Spending Limit",
        "description": "Pay-in-full business card with flexible spend capacity based on account behavior.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash-plus/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash-plus/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 135,
    "name": "Capital One Spark 1.5% Cash Select",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$750 cash bonus after $6,000 spend in the first 3 months",
    "signupBonusValue": 750,
    "color": "linear-gradient(135deg, #991b1b, #60a5fa)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/135-capital-one-spark-cash-select-for-business.webp",
    "rewardType": "cashback",
    "rewardProgram": "Capital One Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 505,
        "cardId": 135,
        "category": "Hotels and rental cars booked through Capital One Business Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 506,
        "cardId": 135,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 608,
        "cardId": 135,
        "name": "No Annual Fee",
        "description": "Flat-rate business cash back card with no annual fee.",
        "annualValue": 0
      },
      {
        "id": 609,
        "cardId": 135,
        "name": "Free Employee Cards",
        "description": "Capital One advertises free employee cards and business spend controls.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash-select/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash-select/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 136,
    "name": "Verizon Visa Card",
    "issuer": "Verizon / Synchrony",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "See issuer page for current Verizon Dollars offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #dc2626)",
    "logoUrl": "https://logo.clearbit.com/verizon.com",
    "cardImageUrl": "/card-images/136-verizon-visa-card.png",
    "rewardType": "cashback",
    "rewardProgram": "Verizon Dollars",
    "rewardUnitName": "Verizon Dollars",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 507,
        "cardId": 136,
        "category": "Verizon purchases",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 508,
        "cardId": 136,
        "category": "Groceries",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 509,
        "cardId": 136,
        "category": "Gas / EV Charging",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 510,
        "cardId": 136,
        "category": "Dining",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 511,
        "cardId": 136,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 610,
        "cardId": 136,
        "name": "Verizon Dollar Redemption",
        "description": "Rewards are earned as Verizon Dollars redeemable toward eligible Verizon purchases or bills.",
        "annualValue": null
      },
      {
        "id": 611,
        "cardId": 136,
        "name": "No Annual Fee",
        "description": "Verizon advertises the card with no annual fee.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.verizon.com/financial-services/verizon-visa-card/",
    "imageSourceUrl": "https://www.verizon.com/financial-services/verizon-visa-card/",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
  },
  {
    "id": 137,
    "name": "AAA Daily Advantage Visa Signature",
    "issuer": "AAA / Comenity Capital Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$100 statement credit after $1,000 spend in the first 90 days",
    "signupBonusValue": 100,
    "color": "linear-gradient(135deg, #b91c1c, #fbbf24)",
    "logoUrl": "https://logo.clearbit.com/aaa.com",
    "cardImageUrl": "/card-images/137-aaa-daily-advantage-visa-signature.webp",
    "rewardType": "cashback",
    "rewardProgram": "AAA Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "AAA caps cash back at grocery stores, wholesale clubs and gas stations at $500 combined per calendar year; after that those purchases earn 1% for the rest of the calendar year.",
      "The app models that cap as one shared $10,000 purchase cap per calendar year (the 5% grocery equivalent of $500), so spend at the 3% gas and wholesale-club rates can earn somewhat more before the real cap than shown.",
      "EV charging, streaming, pharmacy and AAA purchases earn 3% with no stated cap."
    ],
    "cashbackCategories": [
      {
        "id": 512,
        "cardId": 137,
        "category": "Groceries (up to $10,000/year combined cap)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 513,
        "cardId": 137,
        "category": "Gas stations (up to $10,000/year combined cap)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 514,
        "cardId": 137,
        "category": "Wholesale Clubs (up to $10,000/year combined cap)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 515,
        "cardId": 137,
        "category": "Streaming / Pharmacy / AAA",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 516,
        "cardId": 137,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9164,
        "cardId": 137,
        "category": "EV Charging",
        "rate": 0.03,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 612,
        "cardId": 137,
        "name": "No Annual or Foreign Transaction Fees",
        "description": "AAA advertises no annual fee and no foreign transaction fees for the Daily Advantage card.",
        "annualValue": null
      },
      {
        "id": 613,
        "cardId": 137,
        "name": "High Grocery Earn Rate",
        "description": "Best suited for grocery-heavy users, subject to published reward terms and caps.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://mwg.aaa.com/credit-card",
    "imageSourceUrl": "https://mwg.aaa.com/credit-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 138,
    "name": "AAA Travel Advantage Visa Signature",
    "issuer": "AAA / Comenity Capital Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$100 statement credit after $1,000 spend in the first 90 days",
    "signupBonusValue": 100,
    "color": "linear-gradient(135deg, #0f172a, #f59e0b)",
    "logoUrl": "https://logo.clearbit.com/aaa.com",
    "cardImageUrl": "/card-images/138-aaa-travel-advantage-visa-signature.png",
    "rewardType": "cashback",
    "rewardProgram": "AAA Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "The 5% gas and EV charging category is capped at $350 cash back per calendar year ($7,000 of purchases); after that it earns 1% for the rest of the calendar year."
    ],
    "cashbackCategories": [
      {
        "id": 517,
        "cardId": 138,
        "category": "Gas / EV Charging (up to $7,000/year)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 518,
        "cardId": 138,
        "category": "Travel and AAA",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 519,
        "cardId": 138,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 520,
        "cardId": 138,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 521,
        "cardId": 138,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 614,
        "cardId": 138,
        "name": "No Annual or Foreign Transaction Fees",
        "description": "AAA advertises no annual fee and no foreign transaction fees for the Travel Advantage card.",
        "annualValue": null
      },
      {
        "id": 615,
        "cardId": 138,
        "name": "High Gas and EV Earn Rate",
        "description": "Best suited for gas and EV charging spend, subject to published reward terms and caps.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://mwg.aaa.com/credit-card",
    "imageSourceUrl": "https://mwg.aaa.com/credit-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 139,
    "name": "FNBO Evergreen Rewards Visa",
    "issuer": "FNBO",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 cash bonus after $1,000 spend in the first 3 billing cycles",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #064e3b, #34d399)",
    "logoUrl": "https://logo.clearbit.com/fnbo.com",
    "cardImageUrl": "/card-images/139-fnbo-evergreen-rewards-visa.webp",
    "rewardType": "cashback",
    "rewardProgram": "FNBO Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 522,
        "cardId": 139,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 616,
        "cardId": 139,
        "name": "Unlimited 2% Cash Back",
        "description": "FNBO advertises unlimited 2% cash back on every purchase.",
        "annualValue": null
      },
      {
        "id": 617,
        "cardId": 139,
        "name": "No Annual Fee",
        "description": "Current FNBO page lists no annual fee.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.fnbo.com/personal-banking/credit-cards/evergreen/",
    "imageSourceUrl": "https://www.fnbo.com/personal-banking/credit-cards/evergreen/",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 140,
    "name": "FNBO Getaway",
    "issuer": "FNBO",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #155e75, #67e8f9)",
    "logoUrl": "https://logo.clearbit.com/fnbo.com",
    "cardImageUrl": "/card-images/140-fnbo-getaway.webp",
    "rewardType": "points",
    "rewardProgram": "FNBO Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "FNBO Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 523,
        "cardId": 140,
        "category": "Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 524,
        "cardId": 140,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 525,
        "cardId": 140,
        "category": "Gas",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 526,
        "cardId": 140,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 618,
        "cardId": 140,
        "name": "No Annual Fee",
        "description": "FNBO advertises no annual fee for the Getaway card.",
        "annualValue": 0
      },
      {
        "id": 619,
        "cardId": 140,
        "name": "No Foreign Transaction Fee",
        "description": "Issuer page lists no foreign transaction fee.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.fnbo.com/personal-banking/credit-cards/getaway",
    "imageSourceUrl": "https://www.fnbo.com/personal-banking/credit-cards/getaway",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
  },
  {
    "id": 141,
    "name": "PenFed Power Cash Rewards Visa Signature",
    "issuer": "PenFed Credit Union",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$100 statement credit after $1,500 spend in the first 90 days",
    "signupBonusValue": 100,
    "color": "linear-gradient(135deg, #1e3a8a, #93c5fd)",
    "logoUrl": "https://logo.clearbit.com/penfed.org",
    "cardImageUrl": "/card-images/141-penfed-power-cash-rewards-visa-signature.webp",
    "rewardType": "cashback",
    "rewardProgram": "PenFed Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 527,
        "cardId": 141,
        "category": "Other with Honors Advantage",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 528,
        "cardId": 141,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 620,
        "cardId": 141,
        "name": "Honors Advantage Boost",
        "description": "Eligible Honors Advantage members earn 2% cash back instead of the standard 1.5%.",
        "annualValue": null
      },
      {
        "id": 621,
        "cardId": 141,
        "name": "No Annual Fee",
        "description": "PenFed advertises no annual fee for Power Cash Rewards.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.penfed.org/credit-cards/power-cash-rewards-visa",
    "imageSourceUrl": "https://www.penfed.org/credit-cards/power-cash-rewards-visa",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 142,
    "name": "PenFed Platinum Rewards Visa Signature",
    "issuer": "PenFed Credit Union",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "15,000 points after $1,500 spend in the first 90 days",
    "signupBonusValue": 150,
    "color": "linear-gradient(135deg, #0f172a, #e5e7eb)",
    "logoUrl": "https://logo.clearbit.com/penfed.org",
    "cardImageUrl": "/card-images/142-penfed-platinum-rewards-visa-signature.webp",
    "rewardType": "points",
    "rewardProgram": "PenFed Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.85,
    "rewardValuationDescription": "PenFed Rewards Points value varies by redemption; this app uses an estimated 0.85 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 529,
        "cardId": 142,
        "category": "Gas / EV Charging",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 530,
        "cardId": 142,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 531,
        "cardId": 142,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 532,
        "cardId": 142,
        "category": "Streaming / Cable",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 533,
        "cardId": 142,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 622,
        "cardId": 142,
        "name": "No Annual Fee",
        "description": "PenFed advertises no annual fee for Platinum Rewards.",
        "annualValue": 0
      },
      {
        "id": 623,
        "cardId": 142,
        "name": "Everyday Bonus Categories",
        "description": "Strong gas, EV charging, supermarket, restaurant, and streaming/cable categories.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.penfed.org/credit-cards/platinum-rewards-visa",
    "imageSourceUrl": "https://www.penfed.org/credit-cards/platinum-rewards-visa",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 143,
    "name": "PenFed Pathfinder Rewards Visa Signature",
    "issuer": "PenFed Credit Union",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #fbbf24)",
    "logoUrl": "https://logo.clearbit.com/penfed.org",
    "cardImageUrl": "/card-images/143-penfed-pathfinder-rewards-visa-signature.webp",
    "rewardType": "points",
    "rewardProgram": "PenFed Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.85,
    "rewardValuationDescription": "PenFed Rewards Points value varies by redemption; this app uses an estimated 0.85 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "From 2026-09-28 the $95 annual fee is charged to every cardholder; PenFed no longer waives it for Honors Advantage members."
    ],
    "cashbackCategories": [
      {
        "id": 534,
        "cardId": 143,
        "category": "Travel with Honors Advantage",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 535,
        "cardId": 143,
        "category": "Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 536,
        "cardId": 143,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 624,
        "cardId": 143,
        "name": "$100 Airline Ancillary Credit",
        "description": "Eligible cardholders can receive up to $100 per calendar year toward qualifying airline incidental fees.",
        "annualValue": 100
      },
      {
        "id": 625,
        "cardId": 143,
        "name": "Trusted Traveler Credit",
        "description": "Eligible cardholders can receive a Global Entry or TSA PreCheck application fee credit.",
        "annualValue": 25
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.penfed.org/content/dam/penfed/general/pdf/creditcardpdfs/Visa/Pathfinder_RWDTC.pdf",
    "imageSourceUrl": "https://www.penfed.org/forms/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review"
  },
  {
    "id": 144,
    "name": "TD Cash Credit Card",
    "issuer": "TD Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 cash back bonus after $1,000 spend in the first 90 days",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #065f46, #86efac)",
    "logoUrl": "https://logo.clearbit.com/td.com",
    "cardImageUrl": "/card-images/144-td-cash-credit-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "TD Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle."
    ],
    "cashbackCategories": [
      {
        "id": 537,
        "cardId": 144,
        "category": "Selected 3% category",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 538,
        "cardId": 144,
        "category": "Selected 2% category",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 539,
        "cardId": 144,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 626,
        "cardId": 144,
        "name": "Quarterly Category Choice",
        "description": "Choose 3% and 2% spend categories quarterly from dining, entertainment, gas, grocery stores, and travel.",
        "annualValue": null
      },
      {
        "id": 627,
        "cardId": 144,
        "name": "No Annual Fee",
        "description": "TD lists no annual fee for the TD Cash card.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/cash-card",
    "imageSourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/cash-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 537,
        "mode": "user-selected",
        "picks": 1,
        "resets": "quarter",
        "options": [
          "Dining",
          "Entertainment",
          "Gas",
          "Grocery Stores",
          "Travel"
        ]
      },
      {
        "categoryId": 538,
        "mode": "user-selected",
        "picks": 1,
        "resets": "quarter",
        "options": [
          "Dining",
          "Entertainment",
          "Gas",
          "Grocery Stores",
          "Travel"
        ]
      }
    ]
  },
  {
    "id": 145,
    "name": "TD Clear Visa Platinum",
    "issuer": "TD Bank",
    "network": "Visa",
    "annualFee": 120,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #052e16, #22c55e)",
    "logoUrl": "https://logo.clearbit.com/td.com",
    "cardImageUrl": "/card-images/145-td-clear-visa-platinum.png",
    "rewardType": null,
    "rewardProgram": "No ongoing purchase rewards",
    "rewardUnitName": null,
    "rewardUnitValueCents": null,
    "rewardValuationDescription": "This card is modeled as having no ongoing purchase rewards in the current official-product data.",
    "rewardRuleNotes": [
      "No ongoing rewards are modeled for purchases; use the card for financing/fee features rather than reward optimization."
    ],
    "cashbackCategories": [
      {
        "id": 540,
        "cardId": 145,
        "category": "Other",
        "rate": 0,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 628,
        "cardId": 145,
        "name": "No Interest Model",
        "description": "TD Clear charges a predictable monthly membership fee instead of purchase interest.",
        "annualValue": null
      },
      {
        "id": 629,
        "cardId": 145,
        "name": "No Late or Foreign Transaction Fees",
        "description": "TD lists no late payment fee and no foreign transaction fee for TD Clear.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/prequal-option-1/clear",
    "imageSourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/prequal-option-1/clear",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 146,
    "name": "TD Cash Secured Credit Card",
    "issuer": "TD Bank",
    "network": "Visa",
    "annualFee": 29,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #166534, #bbf7d0)",
    "logoUrl": "https://logo.clearbit.com/td.com",
    "cardImageUrl": "/card-images/146-td-cash-secured-credit-card.png",
    "rewardType": "cashback",
    "rewardProgram": "TD Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle."
    ],
    "cashbackCategories": [
      {
        "id": 541,
        "cardId": 146,
        "category": "Selected 3% category",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 542,
        "cardId": 146,
        "category": "Selected 2% category",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 543,
        "cardId": 146,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 630,
        "cardId": 146,
        "name": "Secured Credit Builder",
        "description": "Secured card designed to help build credit while earning TD Cash category rewards.",
        "annualValue": 75
      },
      {
        "id": 631,
        "cardId": 146,
        "name": "Category Choice",
        "description": "Earn 3% and 2% cash back on chosen spend categories plus 1% on other purchases.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/secured-credit-card",
    "imageSourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/secured-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 541,
        "mode": "user-selected",
        "picks": 1,
        "resets": "quarter",
        "options": [
          "Dining",
          "Entertainment",
          "Gas",
          "Grocery Stores",
          "Travel"
        ]
      },
      {
        "categoryId": 542,
        "mode": "user-selected",
        "picks": 1,
        "resets": "quarter",
        "options": [
          "Dining",
          "Entertainment",
          "Gas",
          "Grocery Stores",
          "Travel"
        ]
      }
    ]
  },
  {
    "id": 147,
    "name": "TD Business Solutions Credit Card",
    "issuer": "TD Bank",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$400 cash back bonus after $3,000 spend in the first 90 days",
    "signupBonusValue": 400,
    "color": "linear-gradient(135deg, #064e3b, #4ade80)",
    "logoUrl": "https://logo.clearbit.com/td.com",
    "cardImageUrl": "/card-images/147-td-business-solutions-credit-card.png",
    "rewardType": "cashback",
    "rewardProgram": "TD Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 544,
        "cardId": 147,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 632,
        "cardId": 147,
        "name": "Unlimited Business Cash Back",
        "description": "TD advertises unlimited 2% cash back for business purchases.",
        "annualValue": null
      },
      {
        "id": 633,
        "cardId": 147,
        "name": "No Annual Fee",
        "description": "TD lists no annual fee for TD Business Solutions.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/business",
    "imageSourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/no-annual-fee",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 148,
    "name": "Citi / AAdvantage Business World Elite Mastercard",
    "issuer": "Citi",
    "network": "Mastercard",
    "annualFee": 99,
    "signupBonus": "See issuer page for current AAdvantage business offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #ef4444)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/148-citibusiness-aadvantage-business-world-elite-mastercard.jpg",
    "rewardType": "miles",
    "rewardProgram": "American Airlines AAdvantage",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "American Airlines AAdvantage value varies by itinerary and redemption path; this app uses an estimated 1.30 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Announced 2026-10-27, effective 2027-01-24: annual fee rises from $99 to $150 (first year waived); adds 3x on AAdvantage Hotels and Cars bookings and 2x on one self-selected category (U.S. shipping, office supply stores or U.S. advertising); adds an up-to-$120 Global Entry/TSA PreCheck credit every 4 years and up to $100 a year in inflight credits. The catalog keeps today's terms until then."
    ],
    "cashbackCategories": [
      {
        "id": 545,
        "cardId": 148,
        "category": "American Airlines",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 546,
        "cardId": 148,
        "category": "Gas",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 547,
        "cardId": 148,
        "category": "Telecom / Cable / Satellite",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 548,
        "cardId": 148,
        "category": "Car Rentals",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 549,
        "cardId": 148,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 634,
        "cardId": 148,
        "name": "First Checked Bag Free",
        "description": "First checked bag free on eligible domestic American Airlines itineraries for the cardholder and up to four companions.",
        "annualValue": 160
      },
      {
        "id": 635,
        "cardId": 148,
        "name": "Preferred Boarding and Inflight Savings",
        "description": "Preferred boarding plus 25% savings on eligible American Airlines inflight food, beverage, and Wi-Fi purchases.",
        "annualValue": null
      },
      {
        "id": 840,
        "cardId": 148,
        "name": "American Airlines Companion Certificate",
        "description": "After $30,000 in purchases in a cardmembership year and renewal: one round-trip domestic Main Cabin companion ticket for a $99 ticketing fee plus taxes and fees.",
        "annualValue": null,
        "period": "cardmember-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-aadvantage-business-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citibusiness-aadvantage-platinum-select-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 149,
    "name": "Bread Cashback American Express",
    "issuer": "Bread Financial / Comenity Capital Bank",
    "network": "Amex",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #3b0764, #f0abfc)",
    "logoUrl": "https://logo.clearbit.com/breadfinancial.com",
    "cardImageUrl": "/card-images/149-bread-cashback-american-express.webp",
    "rewardType": "cashback",
    "rewardProgram": "Bread Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 550,
        "cardId": 149,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 636,
        "cardId": 149,
        "name": "Unlimited 2% Cash Back",
        "description": "American Express network page lists unlimited 2% cash back on every purchase.",
        "annualValue": null
      },
      {
        "id": 637,
        "cardId": 149,
        "name": "No Annual or Foreign Transaction Fees",
        "description": "Bread Cashback is advertised with no annual fee and no foreign transaction fees.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/en-us/network/breadfinancial/credit-cards/bread-cashback-card.html",
    "imageSourceUrl": "https://www.americanexpress.com/en-us/network/breadfinancial/credit-cards/bread-cashback-card.html",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 150,
    "name": "American Express Graphite Business Cash Unlimited",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 295,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #6b7280)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/150-american-express-graphite-business-cash-unlimited.webp",
    "rewardType": "cashback",
    "rewardProgram": "American Express Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "American Express lists unlimited 2% cash back on eligible purchases for this card; no travel-portal bonus category is modeled."
    ],
    "cashbackCategories": [
      {
        "id": 552,
        "cardId": 150,
        "category": "All Eligible Purchases",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 638,
        "cardId": 150,
        "name": "Unlimited 2% Cash Back",
        "description": "Earn unlimited 2% cash back on eligible purchases.",
        "annualValue": null
      },
      {
        "id": 639,
        "cardId": 150,
        "name": "One AP Statement Credit",
        "description": "Unlock up to $2,400 in American Express One AP statement credits for the following calendar year after meeting the annual eligible-spend threshold.",
        "annualValue": 400,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/graphite-business-cash-unlimited-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/graphite-business-cash-unlimited-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 151,
    "name": "American Express Business Green Rewards",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 95,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #21443a, #94c39b)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/151-american-express-business-green-rewards.webp",
    "rewardType": "points",
    "rewardProgram": "American Express Membership Rewards",
    "rewardUnitName": "Membership Rewards Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Membership Rewards redemption value varies by redemption path; this app uses a conservative 1.00 cent per point estimate for annual-fee progress and keeps earned points visible separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 554,
        "cardId": 151,
        "category": "Amex Travel",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 555,
        "cardId": 151,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 640,
        "cardId": 151,
        "name": "Low-Fee Membership Rewards Business Card",
        "description": "Business version earns Membership Rewards points with a lower annual fee and a simpler rewards structure than Business Gold or Business Platinum.",
        "annualValue": 75
      },
      {
        "id": 641,
        "cardId": 151,
        "name": "Employee Cards",
        "description": "Useful for basic business spend tracking and employee-card controls.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-business-green-card-amex/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-business-green-card-amex/",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 152,
    "name": "Delta SkyMiles Gold Business American Express",
    "issuer": "American Express / Delta",
    "network": "Amex",
    "annualFee": 150,
    "signupBonus": "See issuer page for current Delta business offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #991b1b, #f59e0b)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/152-delta-skymiles-gold-business-american-express.webp",
    "rewardType": "miles",
    "rewardProgram": "Delta SkyMiles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.1,
    "rewardValuationDescription": "Delta SkyMiles value varies by itinerary and redemption path; this app uses an estimated 1.10 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "2X at U.S. shipping providers and 2X on U.S. advertising in select media each apply to up to $50,000 of purchases per year, then 1X."
    ],
    "cashbackCategories": [
      {
        "id": 556,
        "cardId": 152,
        "category": "Delta purchases",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 557,
        "cardId": 152,
        "category": "U.S. shipping (up to $50,000/year)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 558,
        "cardId": 152,
        "category": "U.S. advertising (up to $50,000/year)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 559,
        "cardId": 152,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 560,
        "cardId": 152,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 643,
        "cardId": 152,
        "name": "$200 Delta Flight Credit",
        "description": "Earn a Delta flight credit after meeting the annual eligible purchase threshold.",
        "annualValue": 200,
        "period": "calendar-year"
      },
      {
        "id": 915,
        "cardId": 152,
        "name": "First and Second Checked Bag Free",
        "description": "First checked bag free on Delta flights for the cardmember and up to 8 companions on the same reservation; second checked bag also free on domestic Delta flights (added 2026-06-04).",
        "annualValue": 160
      },
      {
        "id": 916,
        "cardId": 152,
        "name": "$120 Rideshare Credit",
        "description": "After the first card renewal, up to $10 in statement credits each month on eligible U.S. rideshare purchases with select providers; enrollment required.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 917,
        "cardId": 152,
        "name": "$150 Delta Stays Credit",
        "description": "Up to $150 back per calendar year in statement credits on prepaid hotels or vacation rentals booked through Delta Stays on delta.com.",
        "annualValue": 150,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/en-us/business/credit-cards/delta-skymiles-gold/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-gold-business-credit-card-amex/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 153,
    "name": "Delta SkyMiles Platinum Business American Express",
    "issuer": "American Express / Delta",
    "network": "Amex",
    "annualFee": 350,
    "signupBonus": "See issuer page for current Delta business offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #475569, #d1d5db)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/153-delta-skymiles-platinum-business-american-express.webp",
    "rewardType": "miles",
    "rewardProgram": "Delta SkyMiles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.1,
    "rewardValuationDescription": "Delta SkyMiles value varies by itinerary and redemption path; this app uses an estimated 1.10 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "1.5X on transit (including rideshare and taxis), U.S. shipping and single purchases of $5,000 or more applies to up to $100,000 of combined purchases per year, then 1X. A large purchase qualifies only when the single transaction is $5,000 or more."
    ],
    "cashbackCategories": [
      {
        "id": 561,
        "cardId": 153,
        "category": "Delta purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 562,
        "cardId": 153,
        "category": "Hotels",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 563,
        "cardId": 153,
        "category": "Transit, rideshare, U.S. shipping and $5k+ purchases (up to $100,000/year combined)",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 565,
        "cardId": 153,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 644,
        "cardId": 153,
        "name": "Annual Companion Certificate",
        "description": "Each year after card renewal, a round-trip Delta Main companion certificate for domestic, Caribbean or Central American travel. Government taxes and fees of $22-$250 apply.",
        "annualValue": 250,
        "period": "cardmember-year"
      },
      {
        "id": 645,
        "cardId": 153,
        "name": "MQD Headstart and Boost",
        "description": "Business card includes Delta Medallion qualification support through MQD Headstart and eligible spend boosts.",
        "annualValue": null
      },
      {
        "id": 918,
        "cardId": 153,
        "name": "First and Second Checked Bag Free",
        "description": "First checked bag free on Delta flights; second checked bag also free on domestic Delta flights (added 2026-06-04).",
        "annualValue": null
      },
      {
        "id": 919,
        "cardId": 153,
        "name": "$200 Delta Stays Credit",
        "description": "Up to $200 back per calendar year in statement credits on prepaid hotels or vacation rentals booked through Delta Stays on delta.com.",
        "annualValue": 200,
        "period": "calendar-year"
      },
      {
        "id": 920,
        "cardId": 153,
        "name": "$120 Resy Credit",
        "description": "Up to $10 in statement credits each month (up to $120 per year) at qualifying U.S. Resy restaurants; enrollment required.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 921,
        "cardId": 153,
        "name": "$120 Rideshare Credit",
        "description": "Up to $10 in statement credits each month on eligible U.S. rideshare purchases with select providers.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 922,
        "cardId": 153,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "A $120 statement credit for a Global Entry application or up to $85 for TSA PreCheck (through an official enrollment provider) every 4 years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/en-us/business/credit-cards/delta-skymiles-platinum/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-platinum-business-credit-card-amex/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 154,
    "name": "Delta SkyMiles Reserve Business American Express",
    "issuer": "American Express / Delta",
    "network": "Amex",
    "annualFee": 650,
    "signupBonus": "See issuer page for current Delta business offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #64748b)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/154-delta-skymiles-reserve-business-american-express.webp",
    "rewardType": "miles",
    "rewardProgram": "Delta SkyMiles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.1,
    "rewardValuationDescription": "Delta SkyMiles value varies by itinerary and redemption path; this app uses an estimated 1.10 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "After $150,000 in purchases on the card in a year, all eligible purchases earn 1.5X for the rest of that year; the app keeps the 1X default."
    ],
    "cashbackCategories": [
      {
        "id": 566,
        "cardId": 154,
        "category": "Delta purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 567,
        "cardId": 154,
        "category": "Transit / U.S. Shipping / U.S. Office Supplies",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 9105,
        "cardId": 154,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 646,
        "cardId": 154,
        "name": "Delta Sky Club Access",
        "description": "Delta Sky Club access when traveling on eligible same-day Delta-marketed or Delta-operated flights, subject to visit limits and program terms.",
        "annualValue": null
      },
      {
        "id": 647,
        "cardId": 154,
        "name": "Annual Companion Certificate",
        "description": "Each year after card renewal, a round-trip companion certificate in Delta First, Delta Comfort or Delta Main for domestic, Caribbean or Central American travel. Government taxes and fees of $22-$250 apply.",
        "annualValue": 350,
        "period": "cardmember-year"
      },
      {
        "id": 923,
        "cardId": 154,
        "name": "First and Second Checked Bag Free",
        "description": "First checked bag free on international and domestic Delta flights; second checked bag also free on domestic Delta flights (added 2026-06-04).",
        "annualValue": null
      },
      {
        "id": 924,
        "cardId": 154,
        "name": "$250 Delta Stays Credit",
        "description": "Up to $250 back per calendar year in statement credits on prepaid hotels or vacation rentals booked through Delta Stays on delta.com.",
        "annualValue": 250,
        "period": "calendar-year"
      },
      {
        "id": 925,
        "cardId": 154,
        "name": "$240 Resy Credit",
        "description": "Up to $20 in statement credits each month (up to $240 per year) at qualifying U.S. Resy restaurants; enrollment required.",
        "annualValue": 240,
        "period": "monthly"
      },
      {
        "id": 926,
        "cardId": 154,
        "name": "$120 Rideshare Credit",
        "description": "Up to $10 in statement credits each month on eligible U.S. rideshare purchases with select providers.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 927,
        "cardId": 154,
        "name": "MQD Headstart and MQD Boost",
        "description": "$2,500 Medallion Qualification Dollars each Medallion Qualification Year (MQD Headstart), plus $1 MQD for every $10 of purchases on the card in a calendar year (MQD Boost).",
        "annualValue": null
      },
      {
        "id": 928,
        "cardId": 154,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "A statement credit every 4 years for a Global Entry application ($120), or up to $85 for a five-year TSA PreCheck membership through an official enrollment provider.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 929,
        "cardId": 154,
        "name": "Centurion Lounge Access",
        "description": "Complimentary access to The Centurion Lounge, Sidecar by The Centurion Lounge and Escape Lounges when flying on a Delta flight purchased with the card.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/en-us/business/credit-cards/delta-skymiles-reserve/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-reserve-business-credit-card-amex/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 155,
    "name": "Capital One VentureOne Business",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #134e4a, #99f6e4)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/155-capital-one-ventureone-business.webp",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 568,
        "cardId": 155,
        "category": "Hotels, vacation rentals and rental cars booked through Capital One Business Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 569,
        "cardId": 155,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 648,
        "cardId": 155,
        "name": "No Annual Fee Business Miles",
        "description": "No-annual-fee business travel card with flat Capital One miles on everyday purchases.",
        "annualValue": 0
      },
      {
        "id": 649,
        "cardId": 155,
        "name": "Free Employee Cards",
        "description": "Supports business spend tracking with free employee cards.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/ventureone-business/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/ventureone-business/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 156,
    "name": "Capital One Spark 2% Cash",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "$1,500 cash bonus after $15,000 spend in the first 3 months",
    "signupBonusValue": 1500,
    "color": "linear-gradient(135deg, #7f1d1d, #fb7185)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/156-capital-one-spark-2-cash.webp",
    "rewardType": "cashback",
    "rewardProgram": "Capital One Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 570,
        "cardId": 156,
        "category": "Hotels and rental cars booked through Capital One Business Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 571,
        "cardId": 156,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 650,
        "cardId": 156,
        "name": "Unlimited 2% Business Cash Back",
        "description": "Earns unlimited 2% cash back on every purchase.",
        "annualValue": null
      },
      {
        "id": 651,
        "cardId": 156,
        "name": "Free Employee Cards",
        "description": "Capital One advertises free employee cards and spend management tools.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 157,
    "name": "Capital One Spark 1% Classic",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #172554, #60a5fa)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/157-capital-one-spark-1-classic.webp",
    "rewardType": "cashback",
    "rewardProgram": "Capital One Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 572,
        "cardId": 157,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 652,
        "cardId": 157,
        "name": "Business Credit Builder",
        "description": "Business card positioned for fair-credit applicants while earning unlimited 1% cash back.",
        "annualValue": 75
      },
      {
        "id": 653,
        "cardId": 157,
        "name": "No Annual Fee",
        "description": "Capital One lists no annual fee for Spark 1% Classic.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-classic/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-classic/",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 158,
    "name": "IHG One Rewards Business Credit Card",
    "issuer": "Chase / IHG",
    "network": "Mastercard",
    "annualFee": 200,
    "signupBonus": "See issuer page for current IHG business offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #f59e0b)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/158-ihg-one-rewards-premier-business.png",
    "rewardType": "points",
    "rewardProgram": "IHG One Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.5,
    "rewardValuationDescription": "IHG One Rewards value varies by redemption; this app uses an estimated 0.50 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "IHG's official marketing may show a higher total hotel earn rate by adding base IHG One Rewards points and elite-status bonus points; this app calculates only the credit-card earn rate.",
      "5x on all travel and at office supply stores applies only to purchases posted through 12/31/2026; from 1/1/2027 only airline tickets bought directly and car rental agencies keep 5x, and other travel and office supplies earn 3x.",
      "Formerly the IHG One Rewards Premier Business Credit Card; Chase's 10/1/2026 refresh set the annual fee at $200 (was $99), with existing cardmembers' fees adjusted in 2027."
    ],
    "cashbackCategories": [
      {
        "id": 573,
        "cardId": 158,
        "category": "IHG Hotels",
        "rate": 0.1,
        "isDefault": false
      },
      {
        "id": 574,
        "cardId": 158,
        "category": "Gas",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 575,
        "cardId": 158,
        "category": "Travel (through 12/31/2026)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 576,
        "cardId": 158,
        "category": "Dining",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 577,
        "cardId": 158,
        "category": "Social media and search advertising",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 578,
        "cardId": 158,
        "category": "Other",
        "rate": 0.03,
        "isDefault": true
      },
      {
        "id": 9142,
        "cardId": 158,
        "category": "Office Supplies (through 12/31/2026)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9143,
        "cardId": 158,
        "category": "Flights Booked Directly with Airlines",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9144,
        "cardId": 158,
        "category": "Car Rentals",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 654,
        "cardId": 158,
        "name": "Anniversary Free Night",
        "description": "A Free Night after each account anniversary at an IHG hotel with a redemption cap of 50,000 points; points can be added for pricier nights.",
        "annualValue": 250,
        "period": "cardmember-year"
      },
      {
        "id": 655,
        "cardId": 158,
        "name": "IHG Platinum Elite Status",
        "description": "Automatic IHG One Rewards Platinum Elite status while the account remains open.",
        "annualValue": null
      },
      {
        "id": 806,
        "cardId": 158,
        "name": "4th Reward Night Free",
        "description": "When you redeem points for a consecutive four-night IHG stay, the fourth night is free.",
        "annualValue": null
      },
      {
        "id": 807,
        "cardId": 158,
        "name": "Global Entry / TSA PreCheck / NEXUS Credit",
        "description": "Up to $120 statement credit every 4 years for a Global Entry, TSA PreCheck or NEXUS application fee charged to the card.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 808,
        "cardId": 158,
        "name": "Food and Beverage Rewards",
        "description": "A $25 Food and Beverage Reward voucher each quarter to use at IHG hotels (up to $100 a year).",
        "annualValue": 100,
        "period": "quarterly"
      },
      {
        "id": 809,
        "cardId": 158,
        "name": "Airline Statement Credit",
        "description": "$100 statement credit after $250 on flights purchased directly with an airline each calendar year, through 12/31/2027.",
        "annualValue": 100,
        "period": "calendar-year"
      },
      {
        "id": 810,
        "cardId": 158,
        "name": "Expensify Credit",
        "description": "Up to $100 in statement credits on Expensify purchases each calendar year.",
        "annualValue": 100,
        "period": "calendar-year"
      },
      {
        "id": 811,
        "cardId": 158,
        "name": "DashPass Membership",
        "description": "12 months of complimentary DashPass when first activated by 12/31/2027, plus $10 off one non-restaurant DoorDash order each calendar month through 12/31/2027 for memberships activated on or after 9/1/2026 (earlier activations get $10 per calendar quarter).",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 812,
        "cardId": 158,
        "name": "Instacart Credit",
        "description": "$10 Instacart credit each month (up to $120 per calendar year) while an Instacart+ member (3 months complimentary); ends 12/31/2027.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 813,
        "cardId": 158,
        "name": "15 Elite Night Credits",
        "description": "15 Elite Night Credits each calendar year, plus 2 more for every $5,000 spent.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 814,
        "cardId": 158,
        "name": "20,000 Bonus Points After $25,000 Annual Spend",
        "description": "20,000 bonus points after $25,000 in purchases each calendar year.",
        "annualValue": 100,
        "period": "calendar-year"
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/IHG/business",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/ihg/business-premier",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 159,
    "name": "United Club Business Card",
    "issuer": "Chase / United",
    "network": "Visa",
    "annualFee": 695,
    "signupBonus": "Up to 110,000 bonus miles plus 2,000 PQP, subject to issuer terms",
    "signupBonusValue": 1100,
    "color": "linear-gradient(135deg, #111827, #1d4ed8)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/159-united-club-business-card.png",
    "rewardType": "miles",
    "rewardProgram": "United MileagePlus",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.2,
    "rewardValuationDescription": "United MileagePlus value varies by itinerary and redemption path; this app uses an estimated 1.20 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 579,
        "cardId": 159,
        "category": "United",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9104,
        "cardId": 159,
        "category": "Renowned Hotels and Resorts",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 582,
        "cardId": 159,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 656,
        "cardId": 159,
        "name": "United Club Membership",
        "description": "United Club membership for the primary cardmember and one guest (Chase: $750+ value per year); All Access membership after Premier Gold status or $50,000 in annual card spend.",
        "annualValue": 750
      },
      {
        "id": 657,
        "cardId": 159,
        "name": "Free Checked Bags",
        "description": "First and second checked bags free on eligible United-operated flights when requirements are met.",
        "annualValue": null
      },
      {
        "id": 815,
        "cardId": 159,
        "name": "Renowned Hotels and Resorts Credit",
        "description": "Up to $200 in statement credits each account anniversary year on prepaid stays booked through Renowned Hotels and Resorts for United Cardmembers.",
        "annualValue": 200,
        "period": "cardmember-year"
      },
      {
        "id": 816,
        "cardId": 159,
        "name": "Rideshare Credit",
        "description": "Up to $12 back each month January-November and $18 in December on rideshare purchases (up to $150 per calendar year). Yearly opt-in required.",
        "annualValue": 150,
        "period": "monthly"
      },
      {
        "id": 817,
        "cardId": 159,
        "name": "Avis/Budget Travel Credit",
        "description": "$50 in United TravelBank cash on each of the first two Avis or Budget rentals booked through mileageplustravel.united.com per account anniversary year (up to $100).",
        "annualValue": 100,
        "period": "cardmember-year"
      },
      {
        "id": 818,
        "cardId": 159,
        "name": "Instacart Credit",
        "description": "Two $10 Instacart credits each month (up to $240 per calendar year) on purchases made directly through Instacart; ends 12/31/2027.",
        "annualValue": 240,
        "period": "monthly"
      },
      {
        "id": 819,
        "cardId": 159,
        "name": "JSX Credit",
        "description": "Up to $200 back each account anniversary year on flights booked directly with JSX.",
        "annualValue": 200,
        "period": "cardmember-year"
      },
      {
        "id": 820,
        "cardId": 159,
        "name": "FareLock Credit",
        "description": "Up to $50 back each account anniversary year on United FareLock purchases.",
        "annualValue": 50,
        "period": "cardmember-year"
      },
      {
        "id": 821,
        "cardId": 159,
        "name": "Premier Access Travel Services",
        "description": "Priority check-in, security screening, boarding and baggage handling where available.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/united/united-club-business",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/united/united-club-business",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 160,
    "name": "Bank of America Business Advantage Customized Cash Rewards",
    "issuer": "Bank of America",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "$500 online statement credit after $5,000 spend in the first 90 days",
    "signupBonusValue": 500,
    "color": "linear-gradient(135deg, #7f1d1d, #2563eb)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/160-bank-of-america-business-advantage-customized-cash-rewards.png",
    "rewardType": "cashback",
    "rewardProgram": "Bank of America Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "The 3% choice category and the 2% dining rate share one $50,000 combined cap per calendar year; spend beyond it earns 1%.",
      "Bank of America does not publish how often the business choice category can be changed."
    ],
    "cashbackCategories": [
      {
        "id": 583,
        "cardId": 160,
        "category": "Selected business category (up to $50,000/year combined with dining)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 584,
        "cardId": 160,
        "category": "Dining (up to $50,000/year combined with selected business category)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 585,
        "cardId": 160,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 658,
        "cardId": 160,
        "name": "Business Category Choice",
        "description": "Choose one eligible 3% category such as gas and EV charging, office supply stores, travel, TV/telecom/wireless, computer services, or business consulting services.",
        "annualValue": null
      },
      {
        "id": 659,
        "cardId": 160,
        "name": "No Annual Fee",
        "description": "Bank of America lists no annual fee.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://business.bankofamerica.com/en/credit-cards/business-advantage-customized-cash-rewards",
    "imageSourceUrl": "https://business.bankofamerica.com/en/credit-cards/business-advantage-customized-cash-rewards",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 583,
        "mode": "user-selected",
        "picks": 1,
        "resets": "unknown",
        "options": [
          "Gas stations and EV charging stations",
          "Office supply stores",
          "Travel",
          "TV, telecom and wireless",
          "Computer services",
          "Business consulting services"
        ]
      }
    ]
  },
  {
    "id": 161,
    "name": "Bank of America Business Advantage Unlimited Cash Rewards",
    "issuer": "Bank of America",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "$500 online statement credit after $5,000 spend in the first 90 days",
    "signupBonusValue": 500,
    "color": "linear-gradient(135deg, #991b1b, #60a5fa)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/161-bank-of-america-business-advantage-unlimited-cash-rewards.png",
    "rewardType": "cashback",
    "rewardProgram": "Bank of America Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 586,
        "cardId": 161,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 660,
        "cardId": 161,
        "name": "Flat Business Cash Back",
        "description": "Earn unlimited 1.5% cash back on eligible business purchases.",
        "annualValue": null
      },
      {
        "id": 661,
        "cardId": 161,
        "name": "No Annual Fee",
        "description": "Bank of America lists no annual fee.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://business.bankofamerica.com/en/credit-cards/business-advantage-unlimited-cash-rewards",
    "imageSourceUrl": "https://business.bankofamerica.com/en/credit-cards/business-advantage-unlimited-cash-rewards",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
  },
  {
    "id": 162,
    "name": "Bank of America Business Advantage Travel Rewards",
    "issuer": "Bank of America",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "30,000 points after $3,000 spend in the first 90 days",
    "signupBonusValue": 300,
    "color": "linear-gradient(135deg, #1e3a8a, #93c5fd)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/162-bank-of-america-business-advantage-travel-rewards.png",
    "rewardType": "points",
    "rewardProgram": "Bank of America Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Bank of America Rewards Points value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 587,
        "cardId": 162,
        "category": "Travel purchases at BofA Travel (formerly Travel Center)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 588,
        "cardId": 162,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 662,
        "cardId": 162,
        "name": "No Annual Fee",
        "description": "Travel rewards business card with no annual fee.",
        "annualValue": 0
      },
      {
        "id": 663,
        "cardId": 162,
        "name": "No Foreign Transaction Fee",
        "description": "Issuer materials list no foreign transaction fee.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://business.bankofamerica.com/en/credit-cards/business-advantage-travel-rewards",
    "imageSourceUrl": "https://business.bankofamerica.com/en/credit-cards/business-advantage-travel-rewards",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 163,
    "name": "Prime Business Card",
    "issuer": "Amazon / U.S. Bank",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "See issuer page for current Amazon Gift Card offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #111827, #f59e0b)",
    "logoUrl": "https://logo.clearbit.com/amazon.com",
    "cardImageUrl": "/card-images/163-prime-business-card.png",
    "rewardType": "cashback",
    "rewardProgram": "U.S. Bank Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "The 2% tier applies automatically to the account's top 3 eligible spend categories outside Amazon each billing cycle, based on the combined spend of all cardmembers and Mastercard category codes; the app approximates the billing cycle as a calendar month.",
      "5% at Amazon-covered sites applies to the first $150,000 of those purchases each calendar year, and 2% to the first $150,000 spent outside Amazon each calendar year; spend beyond each cap earns 1%.",
      "Requires an eligible Prime membership; adding or cancelling Prime after account opening changes the account's reward program."
    ],
    "cashbackCategories": [
      {
        "id": 589,
        "cardId": 163,
        "category": "Amazon Business / Amazon.com / AWS / Whole Foods (up to $150,000/year)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 590,
        "cardId": 163,
        "category": "Top 3 eligible spend categories each billing cycle (up to $150,000/year)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 593,
        "cardId": 163,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9160,
        "cardId": 163,
        "category": "Prepaid travel in the U.S. Bank Travel Center",
        "rate": 0.05,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 664,
        "cardId": 163,
        "name": "5% Back or 90-Day Terms",
        "description": "Eligible Prime Business users can choose 5% back or 90-day payment terms on eligible Amazon Business, Amazon.com, AWS, and Whole Foods Market purchases.",
        "annualValue": null
      },
      {
        "id": 665,
        "cardId": 163,
        "name": "No Annual Fee",
        "description": "No annual card fee, though eligible Prime membership is required for the Prime version.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/business-banking/business-credit-cards/amazon-business-credit-cards.html",
    "imageSourceUrl": "https://www.amazon.com/businesscard",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 590,
        "mode": "automatic-top-spend",
        "picks": 3,
        "resets": "month",
        "options": [
          "Accounting and tax services",
          "Advertising and direct marketing",
          "Airlines",
          "Car rentals",
          "Cell phone service providers",
          "Computer and software services",
          "Dining",
          "Drugstores and pharmacies",
          "Entertainment",
          "Gas and EV charging stations",
          "Grocery stores",
          "Hotels",
          "Office supplies",
          "Postal and shipping services",
          "Utilities"
        ]
      }
    ]
  },
  {
    "id": 164,
    "name": "Amazon Business Card",
    "issuer": "Amazon / U.S. Bank",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "See issuer page for current Amazon Gift Card offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #334155, #fbbf24)",
    "logoUrl": "https://logo.clearbit.com/amazon.com",
    "cardImageUrl": "/card-images/164-amazon-business-card.png",
    "rewardType": "cashback",
    "rewardProgram": "U.S. Bank Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "The 2% tier applies automatically to the account's top 3 eligible spend categories outside Amazon each billing cycle, based on the combined spend of all cardmembers and Mastercard category codes; the app approximates the billing cycle as a calendar month.",
      "3% at Amazon-covered sites applies to the first $150,000 of those purchases each calendar year, and 2% to the first $150,000 spent outside Amazon each calendar year; spend beyond each cap earns 1%."
    ],
    "cashbackCategories": [
      {
        "id": 594,
        "cardId": 164,
        "category": "Amazon Business / Amazon.com / AWS / Whole Foods (up to $150,000/year)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 595,
        "cardId": 164,
        "category": "Top 3 eligible spend categories each billing cycle (up to $150,000/year)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 598,
        "cardId": 164,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9161,
        "cardId": 164,
        "category": "Prepaid travel in the U.S. Bank Travel Center",
        "rate": 0.03,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 666,
        "cardId": 164,
        "name": "3% Back or 60-Day Terms",
        "description": "Eligible non-Prime business cardholders can choose 3% back or 60-day payment terms on eligible Amazon Business, Amazon.com, AWS, and Whole Foods Market purchases.",
        "annualValue": null
      },
      {
        "id": 667,
        "cardId": 164,
        "name": "No Annual Fee",
        "description": "No annual card fee for the non-Prime Amazon Business Card.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/business-banking/business-credit-cards/amazon-business-credit-cards.html",
    "imageSourceUrl": "https://www.amazon.com/businesscard",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 595,
        "mode": "automatic-top-spend",
        "picks": 3,
        "resets": "month",
        "options": [
          "Accounting and tax services",
          "Advertising and direct marketing",
          "Airlines",
          "Car rentals",
          "Cell phone service providers",
          "Computer and software services",
          "Dining",
          "Drugstores and pharmacies",
          "Entertainment",
          "Gas and EV charging stations",
          "Grocery stores",
          "Hotels",
          "Office supplies",
          "Postal and shipping services",
          "Utilities"
        ]
      }
    ]
  },
  {
    "id": 165,
    "name": "MyLowe's Pro Rewards American Express",
    "issuer": "Lowe's / Synchrony",
    "network": "Amex",
    "annualFee": 0,
    "signupBonus": "See issuer page for current Lowe's Pro offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f3d75, #60a5fa)",
    "logoUrl": "https://logo.clearbit.com/lowes.com",
    "cardImageUrl": "/card-images/165-mylowe-s-pro-rewards-american-express.jpg",
    "rewardType": "cashback",
    "rewardProgram": "MyLowe's Pro Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "U.S. dining establishments, office supply stores and wireless telephone service providers earn 2 MyLowe's Rewards points per $1 (Synchrony's special-retailer list as of April 2026); purchases with a foreign merchant code and all other purchases earn 1 point per $1.",
      "Purchases at Lowe's and Lowes.com also earn MyLowe's Pro Rewards points according to the cardholder's Pro Rewards status; the Lowe's row reflects the card's everyday 5% discount and does not add those points."
    ],
    "cashbackCategories": [
      {
        "id": 599,
        "cardId": 165,
        "category": "Lowe's",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 600,
        "cardId": 165,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 601,
        "cardId": 165,
        "category": "Office supplies",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 602,
        "cardId": 165,
        "category": "Wireless",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 603,
        "cardId": 165,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 668,
        "cardId": 165,
        "name": "Lowe's Pro Rewards",
        "description": "Business card for Lowe's Pro purchases, with elevated Lowe's earn and pro-focused purchase tracking.",
        "annualValue": null
      },
      {
        "id": 669,
        "cardId": 165,
        "name": "No Annual Fee",
        "description": "Synchrony/Lowe's advertises no annual fee for the current MyLowe's Pro Rewards card.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.synchrony.com/document/mlpra-terms.pdf",
    "imageSourceUrl": "https://www.lowes.com/l/Credit/business-credit-center",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review"
  },
  {
    "id": 166,
    "name": "Capital One Spark 2X Miles",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f172a, #38bdf8)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/166-capital-one-spark-2x-miles.webp",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Discontinued on 2026-04-14 and relaunched as the Capital One Venture Business (catalog #99).",
      "This row is retained only so existing wallet entries still resolve to a name."
    ],
    "cashbackCategories": [
      {
        "id": 604,
        "cardId": 166,
        "category": "Hotels and rental cars through Capital One Business Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 605,
        "cardId": 166,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 670,
        "cardId": 166,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Statement credit up to $120 for an eligible Global Entry or TSA PreCheck application fee.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 671,
        "cardId": 166,
        "name": "Transferable Business Miles",
        "description": "Earns Capital One miles that can be redeemed for travel or transferred to Capital One travel partners.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/travel-and-miles/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-miles/",
    "lastReviewedAt": "2026-08-06",
    "dataConfidence": "needs-review",
    "availability": "discontinued",
    "availabilityChangedAt": "2026-04-14"
  },
  {
    "id": 167,
    "name": "Capital One Spark 1.5X Miles Select",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #1e3a8a, #93c5fd)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/167-capital-one-spark-1-5x-miles-select.webp",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Discontinued on 2026-04-14 and rebranded as the Capital One VentureOne Business (catalog #155).",
      "This row is retained only so existing wallet entries still resolve to a name."
    ],
    "cashbackCategories": [
      {
        "id": 606,
        "cardId": 167,
        "category": "Hotels and rental cars through Capital One Business Travel",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 607,
        "cardId": 167,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 672,
        "cardId": 167,
        "name": "No Annual Fee Business Miles",
        "description": "No-annual-fee Spark miles card with flat 1.5X miles on everyday business purchases.",
        "annualValue": 0
      },
      {
        "id": 673,
        "cardId": 167,
        "name": "Transferable Miles",
        "description": "Miles can be redeemed for travel or transferred to Capital One travel partners.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/travel-and-miles/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-miles-select/",
    "lastReviewedAt": "2026-08-06",
    "dataConfidence": "needs-review",
    "availability": "discontinued",
    "availabilityChangedAt": "2026-04-14"
  },
  {
    "id": 168,
    "name": "Atmos Rewards Visa Signature Business",
    "issuer": "Bank of America / Alaska Airlines",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "80,000 points plus $99 Companion Fare after $5,000 spend in the first 90 days",
    "signupBonusValue": 900,
    "color": "linear-gradient(135deg, #0f766e, #1d4ed8)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/168-atmos-rewards-visa-signature-business.png",
    "rewardType": "points",
    "rewardProgram": "Atmos Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.4,
    "rewardValuationDescription": "Atmos Rewards value varies by redemption; this app uses an estimated 1.40 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Bank of America charges $70 per company plus $25 per card each year; the $95 shown is the cost of a single-card account.",
      "Companies with an eligible Bank of America small business account earn a 10% bonus on points from card purchases; it is not included in the rates shown.",
      "Alaska Airlines announced on 2026-09-29 that Bank of America will refresh this card in late 2026 (planned: 10x on eligible purchases through Atmos Rewards for Business, lounge passes, free same-day confirmed flight changes). Details had not been published as of 2026-10-31; the rates shown are the current structure."
    ],
    "cashbackCategories": [
      {
        "id": 608,
        "cardId": 168,
        "category": "Alaska Airlines and Hawaiian Airlines",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 609,
        "cardId": 168,
        "category": "Gas / EV Charging",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 610,
        "cardId": 168,
        "category": "Shipping",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 611,
        "cardId": 168,
        "category": "Local transit and rideshare",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 612,
        "cardId": 168,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 674,
        "cardId": 168,
        "name": "Annual Companion Fare",
        "description": "$99 Companion Fare (plus taxes and fees from $23) each account anniversary, issued after spending $6,000 or more on purchases in the prior anniversary year.",
        "annualValue": 250,
        "period": "cardmember-year"
      },
      {
        "id": 675,
        "cardId": 168,
        "name": "Free Checked Bag and Preferred Boarding",
        "description": "Free checked bag and preferred boarding benefits when the card is used to purchase eligible Alaska Airlines or Hawaiian Airlines tickets.",
        "annualValue": null
      },
      {
        "id": 843,
        "cardId": 168,
        "name": "20% Back on In-Flight Purchases",
        "description": "20% back on Alaska and Hawaiian Airlines in-flight purchases paid with the card.",
        "annualValue": null
      },
      {
        "id": 844,
        "cardId": 168,
        "name": "Alaska Lounge+ Membership Discount",
        "description": "$100 off an annual Alaska Lounge+ membership purchased with the card.",
        "annualValue": 100
      },
      {
        "id": 845,
        "cardId": 168,
        "name": "No Foreign Transaction Fees",
        "description": "No international transaction fees.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://business.bankofamerica.com/en/credit-cards/atmos-rewards",
    "imageSourceUrl": "https://business.bankofamerica.com/en/credit-cards/atmos-rewards",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 169,
    "name": "BECU Cash Back Visa",
    "issuer": "BECU",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$200 cash back after $2,000 spend in the first 3 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #006c73, #35c0c2)",
    "logoUrl": "https://logo.clearbit.com/becu.org",
    "cardImageUrl": "/card-images/169-becu-cash-back-visa.png",
    "rewardType": "cashback",
    "rewardProgram": "BECU Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 613,
        "cardId": 169,
        "category": "Other",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 676,
        "cardId": 169,
        "name": "No Annual or Balance Transfer Fee",
        "description": "BECU advertises no annual fee and no balance transfer fee for the Cash Back Visa.",
        "annualValue": null
      },
      {
        "id": 677,
        "cardId": 169,
        "name": "No Foreign Transaction Fees",
        "description": "BECU states there are no foreign transaction fees on the current Cash Back Visa.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.becu.org/everyday-banking/credit-card/cash-back-visa",
    "imageSourceUrl": "https://www.becu.org/everyday-banking/credit-card/cash-back-visa",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
  },
  {
    "id": 170,
    "name": "BECU Low Rate Visa",
    "issuer": "BECU",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #004e59, #70d4d0)",
    "logoUrl": "https://logo.clearbit.com/becu.org",
    "cardImageUrl": "/card-images/170-becu-low-rate-visa.png",
    "rewardType": null,
    "rewardProgram": "No ongoing purchase rewards",
    "rewardUnitName": null,
    "rewardUnitValueCents": null,
    "rewardValuationDescription": "This card is modeled as having no ongoing purchase rewards in the current official-product data.",
    "rewardRuleNotes": [
      "No ongoing rewards are modeled for purchases; use the card for financing/fee features rather than reward optimization."
    ],
    "cashbackCategories": [
      {
        "id": 614,
        "cardId": 170,
        "category": "Other",
        "rate": 0,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 678,
        "cardId": 170,
        "name": "Low APR Focus",
        "description": "BECU positions this as its lowest-rate credit card, with the posted variable APR reviewed on the issuer page.",
        "annualValue": null
      },
      {
        "id": 679,
        "cardId": 170,
        "name": "No Annual, Cash Advance, or Foreign Transaction Fees",
        "description": "BECU advertises no annual fee, no cash advance fees, and no foreign transaction fees.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.becu.org/everyday-banking/credit-card/low-rate-credit-card",
    "imageSourceUrl": "https://www.becu.org/everyday-banking/credit-card/low-rate-credit-card",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
  },
  {
    "id": 171,
    "name": "HSBC Red Credit Card",
    "issuer": "HSBC Hong Kong",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "Perpetual annual fee waiver; see issuer page for current RewardCash welcome offers",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #c0162d, #005f73)",
    "logoUrl": "https://logo.clearbit.com/hsbc.com.hk",
    "cardImageUrl": "/card-images/171-hsbc-red-credit-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "HSBC RewardCash",
    "rewardUnitName": "RewardCash",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "4% RewardCash on the first HK$10,000 of online spending each calendar month, then 0.4%; mobile or contactless payments in physical stores are not online spending.",
      "8% RewardCash at designated merchants on the first HK$1,250 each calendar month, then 0.4%. Local: Sushiro, TamJai SamGor Mixian, TamJai Yunnan Mixian, Bakehouse, Decathlon, NAMCO, TAITO STATION, Sephora, @cosme, 3COINS. Overseas (list updated 2026-07-15): Suica, OLIVE YOUNG in Korea, Mobile Tmoney, FamilyMart in Japan.",
      "All other spending earns 0.4% RewardCash (HK$250 = $1 RewardCash).",
      "Annual fee permanently waived."
    ],
    "cashbackCategories": [
      {
        "id": 615,
        "cardId": 171,
        "category": "Designated merchants (up to $1,250/month)",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 616,
        "cardId": 171,
        "category": "Online spending (up to $10,000/month)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 617,
        "cardId": 171,
        "category": "Other",
        "rate": 0.004,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 978,
        "cardId": 171,
        "name": "McDonald's Monthly RewardCash",
        "description": "Up to $30 RewardCash a month via HSBC Reward+ stamps: one stamp per McDonald's transaction of HK$30 or more (one a day, eight a month), redeemed in sets of four for $15 RewardCash. The 2026 promotion runs 2 January to 31 December 2026.",
        "annualValue": 360,
        "period": "monthly"
      },
      {
        "id": 979,
        "cardId": 171,
        "name": "HK Express In-flight Drink",
        "description": "Complimentary drink (worth up to HK$25) when you use the physical card to buy in-flight food of HK$30 or more on HK Express flights.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www.hsbc.com.hk/credit-cards/products/red/",
    "imageSourceUrl": "https://www.hsbc.com.hk/credit-cards/products/red/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 172,
    "name": "HSBC Visa Signature Card",
    "issuer": "HSBC Hong Kong",
    "network": "Visa",
    "annualFee": 2000,
    "signupBonus": "First 2-year annual fee waiver; see issuer page for current welcome offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #f3f4f6, #0f172a)",
    "logoUrl": "https://logo.clearbit.com/hsbc.com.hk",
    "cardImageUrl": "/card-images/172-hsbc-visa-signature-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "HSBC RewardCash",
    "rewardUnitName": "RewardCash",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Red Hot Rewards of Your Choice (2026 programme): register once and allocate the extra 5X RewardCash to Dining, Home, Lifestyle, Shopping or Overseas & Mainland China spending; the allocation cannot be changed for the year. Extra RewardCash applies to the first HK$100,000 of eligible spending in the year (maximum extra $2,000 RewardCash). Registration for 2026 closed on 2026-10-31; HSBC runs the programme by calendar year.",
      "Visa Signature adds an extra 3X (1.2%) automatically on all five Rewards of Your Choice categories: 9X (3.6%) in the category you allocate to and 4X (1.6%) in the others. Home, Lifestyle and Shopping are designated-merchant lists that the app cannot match automatically.",
      "All other spending earns 0.4% RewardCash (HK$250 = $1 RewardCash).",
      "HK$2,000 annual fee, waived for the first two years for new cardholders."
    ],
    "cashbackCategories": [
      {
        "id": 618,
        "cardId": 172,
        "category": "Red Hot Rewards of Your Choice category (up to $100,000/year)",
        "rate": 0.036,
        "isDefault": false
      },
      {
        "id": 619,
        "cardId": 172,
        "category": "Other",
        "rate": 0.004,
        "isDefault": true
      },
      {
        "id": 9201,
        "cardId": 172,
        "category": "Dining in Hong Kong (Visa Signature extra 3X)",
        "rate": 0.016,
        "isDefault": false
      },
      {
        "id": 9202,
        "cardId": 172,
        "category": "Overseas and Mainland China spending (Visa Signature extra 3X)",
        "rate": 0.016,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 682,
        "cardId": 172,
        "name": "Visa Signature Privileges",
        "description": "Visa Signature offers such as 15% off at designated restaurants (Lai Sun Dining, Hyatt Regency Tsim Sha Tsui outlets), Emperor Cinemas ticket offers, 30% off cross-border limousines and a 24/7 Visa concierge; offers change over time.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www.hsbc.com.hk/credit-cards/products/visa-signature/",
    "imageSourceUrl": "https://www.hsbc.com.hk/credit-cards/products/visa-signature/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "categoryChoices": [
      {
        "categoryId": 618,
        "mode": "user-selected",
        "picks": 1,
        "resets": "year",
        "options": [
          "Dining",
          "Home",
          "Lifestyle",
          "Shopping",
          "Overseas and Mainland China spending"
        ]
      }
    ]
  },
  {
    "id": 173,
    "name": "Standard Chartered Cathay Mastercard",
    "issuer": "Standard Chartered Hong Kong / Cathay",
    "network": "Mastercard",
    "annualFee": 2000,
    "signupBonus": "Up to 40,000 Asia Miles welcome offer, subject to issuer terms",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #004c45, #111827)",
    "logoUrl": "https://logo.clearbit.com/sc.com",
    "cardImageUrl": "/card-images/173-standard-chartered-cathay-mastercard.webp",
    "rewardType": "miles",
    "rewardProgram": "Asia Miles",
    "rewardUnitName": "Asia Miles",
    "rewardUnitValueCents": 5,
    "rewardValuationDescription": "Asia Miles value varies by itinerary and redemption path; this app uses an estimated 5.00 HK cents per mile, the ratio Standard Chartered offers in its own welcome offer (40,000 Asia Miles or a HK$2,000 Cathay Gift Card), for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Rates are Asia Miles per HK$1: HK$4 = 1 mile on dining, hotels booked directly with the hotel, and overseas foreign-currency spending; HK$6 = 1 mile on other spending posted in Hong Kong dollars. The Priority Banking and Priority Private versions earn more on overseas spending (HK$3 and HK$2 per mile).",
      "Purchases made directly with Cathay and HK Express earn the base HK$6 = 1 mile. The advertised 'up to HK$2 = 1 mile' is a one-off 2,667-mile bonus once HK$8,000 is spent with Cathay and HK Express in the 1 Jul-31 Dec 2026 promotion; the app does not model it.",
      "Annual fee HK$2,000, waived for the first year."
    ],
    "cashbackCategories": [
      {
        "id": 621,
        "cardId": 173,
        "category": "Dining and hotels",
        "rate": 0.0025,
        "isDefault": false
      },
      {
        "id": 622,
        "cardId": 173,
        "category": "Other",
        "rate": 0.001667,
        "isDefault": true
      },
      {
        "id": 9203,
        "cardId": 173,
        "category": "Overseas spending in foreign currencies",
        "rate": 0.0025,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 685,
        "cardId": 173,
        "name": "Cathay Membership Benefits",
        "description": "Earn up to 100 Cathay Status Points for HK$500,000 of eligible spending, credited quarterly.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www.sc.com/hk/credit-cards/cathay/",
    "imageSourceUrl": "https://www.sc.com/hk/credit-cards/cathay/?intcid=cardcategory_Jul21-hk-cxam_en",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 174,
    "name": "Hang Seng MMPOWER World Mastercard",
    "issuer": "Hang Seng Bank",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "Up to HK$700 +FUN Dollars welcome offer",
    "signupBonusValue": 700,
    "color": "linear-gradient(135deg, #111827, #16a34a)",
    "logoUrl": "https://logo.clearbit.com/hangseng.com",
    "cardImageUrl": "/card-images/174-hang-seng-mmpower-world-mastercard.png",
    "rewardType": "cashback",
    "rewardProgram": "Hang Seng +FUN Dollars",
    "rewardUnitName": "+FUN Dollars",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "+FUN Dollars Reward Programme (1 Apr-31 Dec 2026): register once and spend at least HK$3,000 of eligible spending in the calendar month (waived for full-time tertiary students). Qualifying spending earns 8% at Amazon, GU, lululemon, Taobao and Uniqlo; 8% on online entertainment (designated streaming, cinema, ticketing and theme-park merchants) and online fashion; 5% on other online spending; and 4% on foreign-currency spending at physical stores outside Hong Kong. Rates include the 0.4% basic +FUN Dollars.",
      "Extra +FUN Dollars are capped at $500 per calendar month across all four tiers combined. The app caps the bonus rows at a shared HK$6,579 of monthly spend (where the 8% tier alone reaches the $500 cap), so cardholders who spread spending across tiers may earn somewhat more than shown.",
      "Everything else, and all spending in a month below HK$3,000, earns the basic 0.4% (HK$250 = $1 +FUN Dollar). Alipay and WeChat Pay transactions, recurring payments and e-wallet top-ups do not qualify.",
      "Annual fee permanently waived for principal and supplementary cards."
    ],
    "cashbackCategories": [
      {
        "id": 623,
        "cardId": 174,
        "category": "Designated merchants: Amazon, GU, lululemon, Taobao and Uniqlo (up to $6,579/month combined)",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 624,
        "cardId": 174,
        "category": "Other",
        "rate": 0.004,
        "isDefault": true
      },
      {
        "id": 9204,
        "cardId": 174,
        "category": "Designated streaming services, plus cinema, ticketing, theme-park and fashion merchants paid on the web (up to $6,579/month combined)",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 9205,
        "cardId": 174,
        "category": "Online retail spending at other merchants (up to $6,579/month combined)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9206,
        "cardId": 174,
        "category": "Foreign currency spending at overseas physical stores (up to $6,579/month combined)",
        "rate": 0.04,
        "isDefault": false
      }
    ],
    "benefits": [],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www.hangseng.com/en-hk/personal/cards/products/mmpower-card/",
    "imageSourceUrl": "https://www.hangseng.com/personal/cards/products/mmpower-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 175,
    "name": "DBS Black World Mastercard",
    "issuer": "DBS Hong Kong",
    "network": "Mastercard",
    "annualFee": 3600,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #020617, #0f766e)",
    "logoUrl": "https://logo.clearbit.com/dbs.com.hk",
    "cardImageUrl": "/card-images/175-dbs-black-world-mastercard.jpg",
    "rewardType": "cashback",
    "rewardProgram": "DBS$ Rewards",
    "rewardUnitName": "DBS$",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "DBS$ are worth HK$1 each as cash rebate. Overseas foreign-currency spending earns DBS$3 per HK$250 (HK$4 = 1 mile, 1.2%); other eligible spending earns DBS$2 per HK$250 (HK$6 = 1 mile, 0.8%); Octopus automatic add-value and instalments earn DBS$1 per HK$250. Miles convert at DBS$48 = 1,000 Asia Miles.",
      "2026 promotion (register in the DBS Card+ app): in any calendar month with HK$20,000 or more of eligible retail spending, overseas spending earns an extra DBS$3 per HK$250 (6X, HK$2 = 1 mile), capped at DBS$240 a month and DBS$2,880 for the year; not modelled.",
      "Annual fee HK$3,600, waived for the first year."
    ],
    "cashbackCategories": [
      {
        "id": 625,
        "cardId": 175,
        "category": "Overseas spending in foreign currencies",
        "rate": 0.012,
        "isDefault": false
      },
      {
        "id": 626,
        "cardId": 175,
        "category": "Other",
        "rate": 0.008,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 689,
        "cardId": 175,
        "name": "Travel and Lifestyle Offers",
        "description": "Rotating DBS cardholder offers; in 2026 they include a JPY600 cash rebate on Suica top-ups, up to 15% cash rebate at designated overseas merchants and 45% off iGO Rewards redemptions.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www.dbs.com.hk/personal/credit-cards/credit-cards/black-mc",
    "imageSourceUrl": "https://www.dbs.com.hk/personal/credit-cards/credit-cards/black-mc?pid=hk-personal-en-card-comparator-blackMC",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 176,
    "name": "Citi Cash Back Card (Hong Kong)",
    "issuer": "Citi Hong Kong",
    "network": "Mastercard",
    "annualFee": 1800,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #004b93, #38bdf8)",
    "logoUrl": "https://logo.clearbit.com/citibank.com.hk",
    "cardImageUrl": "/card-images/176-citi-cash-back-card-hong-kong.png",
    "rewardType": "cashback",
    "rewardProgram": "Citi Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "2% (including the 1% basic rebate) on Hong Kong-dollar spending at dining outlets and hotels in Hong Kong, and on all retail spending in foreign currencies; 1% on everything else. No minimum spend or cap.",
      "The foreign-currency rebate excludes card-present spending at merchants in the UK and EEA; foreign-currency transactions carry a 1.95% fee.",
      "Rebates are credited once the accumulated balance reaches HK$200."
    ],
    "cashbackCategories": [
      {
        "id": 627,
        "cardId": 176,
        "category": "Dining in Hong Kong (HKD)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 628,
        "cardId": 176,
        "category": "Hotels in Hong Kong (HKD)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 629,
        "cardId": 176,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      },
      {
        "id": 9207,
        "cardId": 176,
        "category": "Foreign currency spending",
        "rate": 0.02,
        "isDefault": false
      }
    ],
    "benefits": [
      {
        "id": 691,
        "cardId": 176,
        "name": "Citi Merchant Offers",
        "description": "Citi Hong Kong publishes rotating merchant offers and cardholder promotions; no fixed value.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www1.citibank.com.hk/english/credit-cards/cash-back-card",
    "imageSourceUrl": "https://www.citibank.com.hk/english/credit-cards/cash-back-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 177,
    "name": "DBS Live Fresh Visa",
    "issuer": "DBS Singapore",
    "network": "Visa",
    "annualFee": 196.2,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f766e, #bef264)",
    "logoUrl": "https://logo.clearbit.com/dbs.com.sg",
    "cardImageUrl": "/card-images/177-dbs-live-fresh-visa.png",
    "rewardType": "cashback",
    "rewardProgram": "DBS Cashback",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Closed to new applicants since 2026-09-07; existing cardholders keep the card and earn cashback as usual.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Bonus cashback needs at least S$800 of eligible spend in the calendar month: an extra 5.7% (6% in total) on Shopping (apparel, department stores, electronics and computers, home furnishing, personal services, specialty retail, watches and jewellery; in-store or online, in Singapore or overseas), capped at S$50 a month (about S$877 of spend); and on Transport (public transport, ride-hailing and taxis), capped at S$20 a month (about S$350 of spend).",
      "All eligible spend earns 0.3% with no cap or minimum.",
      "In-store spending in 15 selected Asian currencies gets an extra 3.25% (capped at S$50 a month) under a separate promotion; it only offsets the card's foreign-exchange fees, so it is not modelled."
    ],
    "cashbackCategories": [
      {
        "id": 630,
        "cardId": 177,
        "category": "Shopping, in-store and online retail: apparel, department stores, electronics, furnishings and specialty retail (up to $877/month)",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 631,
        "cardId": 177,
        "category": "Transport: public transit, taxis and rideshare (up to $350/month)",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 632,
        "cardId": 177,
        "category": "Other",
        "rate": 0.003,
        "isDefault": true
      }
    ],
    "benefits": [],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.dbs.com.sg/personal/cards/credit-cards/live-fresh-dbs-visa-paywave-platinum-card",
    "imageSourceUrl": "https://www.dbs.com.sg/personal/cards/credit-cards/live-fresh-dbs-visa-paywave-platinum-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "availability": "closed-to-new-applicants",
    "availabilityChangedAt": "2026-09-07"
  },
  {
    "id": 178,
    "name": "UOB One Card",
    "issuer": "UOB Singapore",
    "network": "Mastercard",
    "annualFee": 196.2,
    "signupBonus": "Promotional cashback offers vary by campaign; see issuer page",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #0f3f8f, #7dd3fc)",
    "logoUrl": "https://logo.clearbit.com/uob.com.sg",
    "cardImageUrl": "/card-images/178-uob-one-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "UOB Cashback",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cashback is earned per quarter: spend at least S$600, S$1,000 or S$2,000, with at least 10 transactions, in every statement month of the quarter to get S$60, S$100 or S$200 (up to 3.33% of spend). Rates here assume the S$1,000 tier. If no quarter qualifies in a year, only 0.03% base cashback is paid.",
      "Additional cashback, only in qualifying quarters: Grab (excluding wallet top-ups), McDonald's, Shopee Singapore and SimplyGo +5% (+6.67% at the S$2,000 tier); grocery stores and supermarkets (MCC 5411) +2.67% (+4.67% at S$2,000; none at S$600); Singapore Power +1%; Shell +1.67% at the S$2,000 tier only.",
      "Additional cashback is capped at S$120 per statement month (maximum S$2,240 a year including quarterly cashback). The app caps the bonus rows at S$2,400 of monthly spend (where +5% reaches S$120) and tracks groceries as a separate bucket.",
      "Annual fee S$196.20, waived for the first year."
    ],
    "cashbackCategories": [
      {
        "id": 633,
        "cardId": 178,
        "category": "Grab, McDonald's, Shopee Singapore and SimplyGo bus and train rides (up to $2,400/month combined)",
        "rate": 0.0833,
        "isDefault": false
      },
      {
        "id": 635,
        "cardId": 178,
        "category": "Other",
        "rate": 0.0333,
        "isDefault": true
      },
      {
        "id": 9208,
        "cardId": 178,
        "category": "Groceries (supermarket MCC 5411) (up to $2,400/month combined)",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 9209,
        "cardId": 178,
        "category": "SP Group (Singapore Power) payments (up to $2,400/month combined)",
        "rate": 0.0433,
        "isDefault": false
      }
    ],
    "benefits": [],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.uob.com.sg/personal/cards/cashback/one-card.page",
    "imageSourceUrl": "https://www.uob.com.sg/personal/cards/cashback/one-card.page",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 179,
    "name": "OCBC 365 Credit Card",
    "issuer": "OCBC Singapore",
    "network": "Visa",
    "annualFee": 196.2,
    "signupBonus": "First 2 years annual fee waiver; see issuer page for current welcome offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #991b1b, #f97316)",
    "logoUrl": "https://logo.clearbit.com/ocbc.com",
    "cardImageUrl": "/card-images/179-ocbc-365-credit-card.png",
    "rewardType": "cashback",
    "rewardProgram": "OCBC Cashback",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "From 2026-11-01 (by posting date), with at least S$800 of eligible spend in the calendar month: dining (including fast food and food delivery), groceries, land transport and petrol earn 6%, in Singapore or overseas, in-store or online. Watsons earns 3% until 2027-03-31, then 0.25%. EV charging, streaming, telco and utility bills drop to the 0.25% base.",
      "Total cashback is capped at S$160 per calendar month (single tier; the old S$80 cap for S$800-1,599 of spend is gone). The app caps the bonus rows at S$2,666 of monthly spend (S$160 at 6%).",
      "Below S$800 of monthly spend, all eligible spend earns 0.25%.",
      "S$196.20 annual fee, waived for the first two years; later waivers need S$10,000 of spend in a card year.",
      "ocbc.com blocks automated access; these terms come from two secondary sources and should be re-checked against OCBC's 1 Nov 2026 programme terms."
    ],
    "cashbackCategories": [
      {
        "id": 636,
        "cardId": 179,
        "category": "Dining, food delivery, groceries, petrol and public transit (up to $2,666/month combined)",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 637,
        "cardId": 179,
        "category": "Watsons (up to $2,666/month combined)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 638,
        "cardId": 179,
        "category": "Other",
        "rate": 0.0025,
        "isDefault": true
      }
    ],
    "benefits": [],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.ocbc.com/personal-banking/cards/365-cashback-credit-card",
    "imageSourceUrl": "https://www.ocbc.com/personal-banking/cards/365-cashback-credit-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "needs-review"
  },
  {
    "id": 180,
    "name": "HSBC Revolution Credit Card",
    "issuer": "HSBC Singapore",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "42,000 Reward points welcome offer, subject to issuer terms",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #f8fafc, #e11d48)",
    "logoUrl": "https://logo.clearbit.com/hsbc.com.sg",
    "cardImageUrl": "/card-images/180-hsbc-revolution-credit-card.webp",
    "rewardType": "points",
    "rewardProgram": "HSBC Reward Points",
    "rewardUnitName": "Reward Points",
    "rewardUnitValueCents": 0.4,
    "rewardValuationDescription": "Rates are HSBC Reward points per S$1 (10X = 10 points). This app values a point at 0.4 SG cents, i.e. 0.4 miles per point (HSBC: 42,000 points = 16,800 miles) at 1 cent per mile, for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "10X Reward points (1X base + 9X bonus, up to 4 miles per S$1) on contactless and online payments at eligible merchant codes: dining, shopping, travel, ride-hailing, taxis and memberships, in Singapore or abroad. Bonus points are capped at 9,000 per calendar month (S$1,000 of spend); after that, 1X.",
      "Cardholders keeping an average daily balance of at least S$50,000 in an HSBC Everyday Global Account earn 20X (19X bonus, capped at 22,800 bonus points a month); not modelled.",
      "All other qualifying spending earns 1X with no cap.",
      "HSBC currently waives the annual fee. The card is a Visa Signature card with complimentary travel insurance."
    ],
    "cashbackCategories": [
      {
        "id": 639,
        "cardId": 180,
        "category": "Dining, shopping, travel, rideshare, taxis and memberships at eligible MCCs (up to $1,000/month)",
        "rate": 0.1,
        "isDefault": false
      },
      {
        "id": 640,
        "cardId": 180,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 980,
        "cardId": 180,
        "name": "Complimentary Travel Insurance",
        "description": "Complimentary travel insurance covering flight inconvenience and personal accident, up to S$1 million, for the cardholder and family (Visa Signature).",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.hsbc.com.sg/credit-cards/products/revolution/",
    "imageSourceUrl": "https://www.hsbc.com.sg/credit-cards/products/revolution/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 181,
    "name": "Citi Cash Back Card (Singapore)",
    "issuer": "Citi Singapore",
    "network": "Mastercard",
    "annualFee": 196.2,
    "signupBonus": "S$300 cashback welcome offer, subject to issuer terms",
    "signupBonusValue": 300,
    "color": "linear-gradient(135deg, #0369a1, #0f172a)",
    "logoUrl": "https://logo.clearbit.com/citibank.com.sg",
    "cardImageUrl": "/card-images/181-citi-cash-back-card-singapore.webp",
    "rewardType": "cashback",
    "rewardProgram": "Citi Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "With at least S$800 of qualifying retail spend in the statement month: 8% (0.2% base + 7.8% bonus) on petrol and private-hire commutes (Grab, Gojek and similar), and 6% (0.2% + 5.8%) on dining and groceries, worldwide.",
      "Total cash back is capped at S$80 per statement month across all spending; the app caps the bonus rows at S$1,000 of monthly spend (S$80 at 8%).",
      "Below S$800, and on all other retail spending, cash back is 0.2%.",
      "Annual fee S$196.20 including GST."
    ],
    "cashbackCategories": [
      {
        "id": 641,
        "cardId": 181,
        "category": "Petrol, gas stations and private-hire rideshare such as Grab and Gojek, worldwide (up to $1,000/month combined)",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 642,
        "cardId": 181,
        "category": "Dining and groceries, worldwide (up to $1,000/month combined)",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 643,
        "cardId": 181,
        "category": "Other",
        "rate": 0.002,
        "isDefault": true
      }
    ],
    "benefits": [],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.citibank.com.sg/credit-cards/cashback/cash-back-card",
    "imageSourceUrl": "https://www1.citibank.com.sg/credit-cards/cashback/citi-cash-back-card",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 182,
    "name": "Standard Chartered Smart Credit Card",
    "issuer": "Standard Chartered Singapore",
    "network": "Visa",
    "annualFee": 99.19,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #ecfeff, #0f172a)",
    "logoUrl": "https://logo.clearbit.com/sc.com",
    "cardImageUrl": "/card-images/182-standard-chartered-smart-credit-card.png",
    "rewardType": "cashback",
    "rewardProgram": "Standard Chartered Cashback",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Bonus merchants: SMART Dining (McDonald's, KFC, Burger King, Ya Kun Kaya Toast, Subway, Toast Box, Starbucks, The Coffee Bean & Tea Leaf, Pizza Hut, Domino's), SMART Transport (bus and MRT via SimplyGo, EV charging) and SMART Streaming (Netflix, Spotify, YouTube, Disney+, Amazon Prime, Viu, iQIYI, HBO GO).",
      "Rates depend on total card spend in the statement month: below S$800, 0.5% on everything; S$800-1,499, 8% at bonus merchants and 0.5% otherwise (encoded here); S$1,500 and above, 10% at bonus merchants and 1% otherwise. No cashback cap.",
      "Cashback is paid as 360° Rewards points (3,200 points = S$10).",
      "Annual fee S$91 + 9% GST (S$99.19), waived for the first year for new cardholders."
    ],
    "cashbackCategories": [
      {
        "id": 644,
        "cardId": 182,
        "category": "Streaming, SimplyGo bus and train rides, EV charging, and selected fast-food and coffee chains",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 645,
        "cardId": 182,
        "category": "Other",
        "rate": 0.005,
        "isDefault": true
      }
    ],
    "benefits": [],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.sc.com/sg/credit-cards/smart-credit-card/",
    "imageSourceUrl": "https://www.sc.com/sg/credit-cards/smart-credit-card/",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 183,
    "name": "IHG One Rewards Premier Select Credit Card",
    "issuer": "Chase / IHG",
    "network": "Mastercard",
    "annualFee": 350,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #3d5a6c, #1c2f3a)",
    "logoUrl": "https://logo.clearbit.com/chase.com",
    "cardImageUrl": "/card-images/183-ihg-one-rewards-premier-select-credit-card.webp",
    "rewardType": "points",
    "rewardProgram": "IHG One Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.5,
    "rewardValuationDescription": "IHG One Rewards value varies by redemption; this app uses an estimated 0.50 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "IHG's official marketing may show a higher total hotel earn rate by adding base IHG One Rewards points and elite-status bonus points; this app calculates only the credit-card earn rate.",
      "Launched 2026-10-01 (https://media.chase.com/news/ihg-premier-select-card-portfolio-updates) as the top tier of the IHG One Rewards card portfolio; the 6x travel category includes rideshare and transit and excludes IHG hotel stays, which earn 12x."
    ],
    "cashbackCategories": [
      {
        "id": 9166,
        "cardId": 183,
        "category": "IHG Hotels",
        "rate": 0.12,
        "isDefault": false
      },
      {
        "id": 9167,
        "cardId": 183,
        "category": "Dining",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 9168,
        "cardId": 183,
        "category": "Travel (including rideshare and transit)",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 9169,
        "cardId": 183,
        "category": "Other",
        "rate": 0.03,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 930,
        "cardId": 183,
        "name": "Anniversary Free Night",
        "description": "A Free Night after each card anniversary at an IHG hotel with a redemption cap of 60,000 points; points can be added for pricier nights.",
        "annualValue": 300,
        "period": "cardmember-year"
      },
      {
        "id": 931,
        "cardId": 183,
        "name": "Food and Beverage Rewards",
        "description": "A $75 Food and Beverage Reward voucher each quarter to use at IHG hotels (up to $300 a year).",
        "annualValue": 300,
        "period": "quarterly"
      },
      {
        "id": 932,
        "cardId": 183,
        "name": "Airline Statement Credit",
        "description": "$200 statement credit after $250 on flights purchased directly with an airline each calendar year, through 12/31/2027.",
        "annualValue": 200,
        "period": "calendar-year"
      },
      {
        "id": 933,
        "cardId": 183,
        "name": "$50 United TravelBank Cash",
        "description": "After registering the card with a MileagePlus account: $25 in United TravelBank cash for January-June and another $25 for July-December, up to $50 each calendar year.",
        "annualValue": 50,
        "period": "semiannual"
      },
      {
        "id": 934,
        "cardId": 183,
        "name": "Global Entry / TSA PreCheck / NEXUS Credit",
        "description": "Up to $120 statement credit every 4 years for a Global Entry, TSA PreCheck or NEXUS application fee charged to the card.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 935,
        "cardId": 183,
        "name": "DashPass Membership",
        "description": "12 months of complimentary DashPass when first activated by 12/31/2027, plus $10 off one non-restaurant DoorDash order each calendar month through 12/31/2027 for memberships activated on or after 9/1/2026.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 936,
        "cardId": 183,
        "name": "Instacart Credit",
        "description": "$10 Instacart credit each month (up to $120 a year) while an Instacart+ member (3 months complimentary, then $99/year); ends 12/31/2027.",
        "annualValue": 120,
        "period": "monthly"
      },
      {
        "id": 937,
        "cardId": 183,
        "name": "Automatic Platinum Elite Status",
        "description": "Automatic IHG One Rewards Platinum Elite status while the card is open; Diamond Elite after $25,000 in purchases in a calendar year.",
        "annualValue": null
      },
      {
        "id": 938,
        "cardId": 183,
        "name": "20 Elite Night Credits",
        "description": "20 Elite Night Credits at account opening and each January, plus 2 more for every $5,000 spent and 5 more after $15,000 in a calendar year.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 939,
        "cardId": 183,
        "name": "4th Night Free",
        "description": "When you redeem points for a consecutive four-night IHG stay, the fourth night is free.",
        "annualValue": null
      },
      {
        "id": 940,
        "cardId": 183,
        "name": "Second Anniversary Free Night After $40,000 Annual Spend",
        "description": "An additional Free Night (60,000-point redemption cap) after $40,000 in purchases each calendar year.",
        "annualValue": 300,
        "period": "calendar-year"
      },
      {
        "id": 941,
        "cardId": 183,
        "name": "20,000 Bonus Points After $15,000 Annual Spend",
        "description": "20,000 bonus points after $15,000 in purchases each calendar year.",
        "annualValue": 100,
        "period": "calendar-year"
      },
      {
        "id": 942,
        "cardId": 183,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on purchases made outside the United States.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/premier-select",
    "imageSourceUrl": "https://creditcards.chase.com/content/dam/jpmc-marketplace/card-art/ihg_premier_select_card.png",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 184,
    "name": "Citi / AAdvantage Globe Mastercard",
    "issuer": "Citi / American Airlines",
    "network": "Mastercard",
    "annualFee": 350,
    "signupBonus": null,
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #2b3a3f, #4a5d63)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/184-citi-aadvantage-globe-mastercard.webp",
    "rewardType": "miles",
    "rewardProgram": "American Airlines AAdvantage",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.3,
    "rewardValuationDescription": "American Airlines AAdvantage value varies by itinerary and redemption path; this app uses an estimated 1.30 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Launched 2025-10-19 (Citigroup / American Airlines release; annual fee $350). Rides and Rails covers eligible taxis, rideshares and public transit.",
      "Former Barclays AAdvantage Aviator Silver accounts were converted to this card on 2026-04-24; their grandfathered Barclays perks ended 2026-10-25."
    ],
    "cashbackCategories": [
      {
        "id": 9170,
        "cardId": 184,
        "category": "AAdvantage Hotels bookings",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 9171,
        "cardId": 184,
        "category": "American Airlines",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9172,
        "cardId": 184,
        "category": "Restaurants (incl. takeout and delivery)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9173,
        "cardId": 184,
        "category": "Rides and Rails (rideshare, taxis and transit)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9174,
        "cardId": 184,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 943,
        "cardId": 184,
        "name": "Turo Credit",
        "description": "Up to $30 back per eligible completed Turo trip paid with the card (card linked to the Turo account), up to $240 per calendar year.",
        "annualValue": 240,
        "period": "calendar-year"
      },
      {
        "id": 944,
        "cardId": 184,
        "name": "Inflight Purchase Credit",
        "description": "Up to $100 in statement credits each calendar year on inflight purchases on American Airlines flights.",
        "annualValue": 100,
        "period": "calendar-year"
      },
      {
        "id": 945,
        "cardId": 184,
        "name": "Annual Splurge Credit",
        "description": "Up to $100 in statement credits each calendar year on up to 2 of: AAdvantage Hotels bookings, 1stDibs, Future Personal Training and Live Nation (exclusions apply).",
        "annualValue": 100,
        "period": "calendar-year"
      },
      {
        "id": 946,
        "cardId": 184,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Up to $120 statement credit for the Global Entry or TSA PreCheck application fee, once every 4 years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 947,
        "cardId": 184,
        "name": "Admirals Club Globe Passes",
        "description": "4 Admirals Club Globe Passes (24-hour access each) every calendar year, stored in the AAdvantage wallet.",
        "annualValue": null,
        "period": "calendar-year"
      },
      {
        "id": 948,
        "cardId": 184,
        "name": "American Airlines Companion Certificate",
        "description": "From the second cardmembership year, after renewal: one round-trip domestic Main Cabin companion ticket for a $99 ticketing fee plus taxes and fees. No spend requirement.",
        "annualValue": null,
        "period": "cardmember-year"
      },
      {
        "id": 949,
        "cardId": 184,
        "name": "First Checked Bag Free",
        "description": "First checked bag free on domestic American Airlines itineraries for the cardholder and up to 8 companions on the same reservation.",
        "annualValue": null
      },
      {
        "id": 950,
        "cardId": 184,
        "name": "Preferred Boarding",
        "description": "Preferred boarding on American Airlines flights for the cardholder and up to 8 companions on the same reservation.",
        "annualValue": null
      },
      {
        "id": 951,
        "cardId": 184,
        "name": "Flight Streak Loyalty Points Bonus",
        "description": "5,000 bonus Loyalty Points after every 4 qualifying American Airlines flights, up to 15,000 per status qualification year.",
        "annualValue": null
      },
      {
        "id": 952,
        "cardId": 184,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on purchases.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-aadvantage-globe-mastercard",
    "imageSourceUrl": "https://aemapi.citi.com/content/dam/cfs/uspb/usmkt/cards/en/static/images/citi-aadvantage-globe-mastercard/citi-aadvantage-globe-mastercard_306x192.webp",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 185,
    "name": "Atmos Rewards Summit Visa Infinite",
    "issuer": "Bank of America / Alaska Airlines",
    "network": "Visa",
    "annualFee": 395,
    "signupBonus": "80,000 bonus points plus a 25,000-point Global Companion Award after $4,000 spend in the first 90 days (limited-time online offer)",
    "signupBonusValue": 1120,
    "color": "linear-gradient(135deg, #050505, #3a3a3a)",
    "logoUrl": "https://logo.clearbit.com/bankofamerica.com",
    "cardImageUrl": "/card-images/185-atmos-rewards-summit-visa-infinite.webp",
    "rewardType": "points",
    "rewardProgram": "Atmos Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.4,
    "rewardValuationDescription": "Atmos Rewards value varies by redemption; this app uses an estimated 1.40 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "The 3x foreign-transaction category follows Bank of America's definition of a foreign transaction; a logged purchase category cannot show that, so that row is matched only from Smart Suggest text.",
      "Cardholders with an eligible Bank of America account earn a 10% bonus on points from card purchases; it is not included in the rates shown.",
      "The Global Companion Award is 25,000 points each account anniversary, or 100,000 points after $60,000 or more in purchases in the account year."
    ],
    "cashbackCategories": [
      {
        "id": 9175,
        "cardId": 185,
        "category": "Alaska Airlines and Hawaiian Airlines purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9176,
        "cardId": 185,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9177,
        "cardId": 185,
        "category": "Foreign transactions",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9178,
        "cardId": 185,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 953,
        "cardId": 185,
        "name": "Global Companion Award",
        "description": "25,000-point Global Companion Award on every account anniversary, or a 100,000-point award after $60,000 or more in purchases in the account year.",
        "annualValue": 350,
        "period": "cardmember-year"
      },
      {
        "id": 954,
        "cardId": 185,
        "name": "Alaska Lounge Passes",
        "description": "8 Alaska Lounge passes every calendar year, issued 2 per quarter.",
        "annualValue": null,
        "period": "quarterly"
      },
      {
        "id": 955,
        "cardId": 185,
        "name": "10,000 Anniversary Status Points",
        "description": "10,000 Atmos Rewards status points on each account anniversary.",
        "annualValue": null,
        "period": "cardmember-year"
      },
      {
        "id": 956,
        "cardId": 185,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Up to $120 Airport Security Statement Credit toward Global Entry or TSA PreCheck, every four years.",
        "annualValue": 30,
        "period": "multi-year",
        "periodYears": 4
      },
      {
        "id": 957,
        "cardId": 185,
        "name": "Instant Travel Delay Credit",
        "description": "$50 Instant Travel Delay Credit for a cancellation or a departure delay of 2 hours or more.",
        "annualValue": null
      },
      {
        "id": 958,
        "cardId": 185,
        "name": "Waived Same-Day Change Fees",
        "description": "Waived fees for same-day confirmed Alaska flight changes, worth up to $75 per change.",
        "annualValue": null
      },
      {
        "id": 959,
        "cardId": 185,
        "name": "Free Checked Bag and Preferred Boarding",
        "description": "Free checked bag and preferred boarding for you and up to 6 guests on the same reservation when the Alaska or Hawaiian Airlines flight is paid with the card.",
        "annualValue": null
      },
      {
        "id": 960,
        "cardId": 185,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees.",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/alaska-airlines-infinite-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved_PCM/1bed_rewcm_v_atmos_visafront_infinite_250.png",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 186,
    "name": "Bilt Blue Card",
    "issuer": "Column N.A. / Bilt",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "$100 in Bilt Cash at account opening (no spend requirement)",
    "signupBonusValue": 100,
    "color": "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    "logoUrl": "https://logo.clearbit.com/biltrewards.com",
    "cardImageUrl": "/card-images/186-bilt-blue-card.webp",
    "rewardType": "points",
    "rewardProgram": "Bilt Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.25,
    "rewardValuationDescription": "Bilt Rewards value varies by redemption; this app uses an estimated 1.25 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issued by Column N.A. and serviced by Cardless Inc. Succeeds the Wells Fargo-issued Bilt Mastercard (catalog #45), retired 2026-02-07.",
      "Rent, mortgage and HOA payments made through Bilt carry no transaction fee. The Rent row uses the 1X tier. Under the Housing-only option the housing multiplier is set each billing cycle by everyday spend as a share of the housing payment: 25% gives 0.5X, 50% gives 0.75X, 75% gives 1X, 100% or more gives 1.25X, and below 25% earns a flat 250 points per billing cycle.",
      "Accounts opened before 2027-01-01 may instead elect the Flexible Bilt Cash option: 4% back in Bilt Cash on everyday purchases, and every $3 of Bilt Cash redeemed unlocks 100 points on housing payments (up to 1X). Bilt Cash is not modeled as an earn rate. Accounts opened on or after 2027-01-01 get only the Housing-only option.",
      "Bilt Travel portal bookings add +2X on hotels and +1X on flights to the card rate, and linking Lyft adds +2X; those rows show the totals Bilt publishes. Bilt Dining partner restaurants add a variable bonus (advertised as up to 4X total on this card); it varies by restaurant and is not modeled.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 9179,
        "cardId": 186,
        "category": "Hotels booked online through the Bilt Travel portal",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9180,
        "cardId": 186,
        "category": "Flights booked online through the Bilt Travel portal",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9181,
        "cardId": 186,
        "category": "Lyft rides (linked Bilt account)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9182,
        "cardId": 186,
        "category": "Rent",
        "rate": 0.01,
        "isDefault": false
      },
      {
        "id": 9183,
        "cardId": 186,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 961,
        "cardId": 186,
        "name": "No Fee on Rent and Mortgage Payments",
        "description": "Rent, mortgage and HOA payments made through the Bilt app or website carry no transaction fee, by portal, ACH, Venmo or Bilt-issued check.",
        "annualValue": null
      },
      {
        "id": 962,
        "cardId": 186,
        "name": "No Foreign Transaction Fees",
        "description": "Bilt lists no foreign transaction fees on the Blue Card.",
        "annualValue": null
      },
      {
        "id": 963,
        "cardId": 186,
        "name": "Cell Phone Protection",
        "description": "Cellular wireless telephone protection when the monthly phone bill is paid with the card (see the Blue Card Guide to Benefits for limits).",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bilt.com/card",
    "imageSourceUrl": "https://img.bilt.com/43819/1790799681-bilt-tahoe.webp",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 187,
    "name": "Bilt Obsidian Card",
    "issuer": "Column N.A. / Bilt",
    "network": "Mastercard",
    "annualFee": 95,
    "signupBonus": "$200 in Bilt Cash at account opening (no spend requirement)",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #0b0b0f, #3f3f46)",
    "logoUrl": "https://logo.clearbit.com/biltrewards.com",
    "cardImageUrl": "/card-images/187-bilt-obsidian-card.webp",
    "rewardType": "points",
    "rewardProgram": "Bilt Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.25,
    "rewardValuationDescription": "Bilt Rewards value varies by redemption; this app uses an estimated 1.25 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issued by Column N.A. and serviced by Cardless Inc. Succeeds the Wells Fargo-issued Bilt Mastercard (catalog #45), retired 2026-02-07.",
      "3X applies to the cardholder's pick of dining (the default) or grocery stores and supermarkets; the other earns 1X. The pick can be changed once within 30 days of account opening, then is locked for the rest of the calendar year. Grocery earning is capped at $25,000 per calendar year, then 1X. The app applies the $25,000/year cap to whichever option is picked.",
      "2X travel covers airlines, hotels, motels, resorts, cruise lines and car rental agencies booked directly. Bilt Travel portal bookings add +2X on hotels and +1X on flights, and linking Lyft adds +2X; those rows show the published totals. Bilt Dining partner restaurants add a variable bonus (advertised as up to 6X total with dining picked); it is not modeled.",
      "Rent, mortgage and HOA payments made through Bilt carry no transaction fee. The Rent row uses the 1X tier. Under the Housing-only option the multiplier is set each billing cycle by everyday spend as a share of the housing payment (25%: 0.5X, 50%: 0.75X, 75%: 1X, 100%+: 1.25X; below 25%: a flat 250 points). Accounts opened before 2027-01-01 may instead elect Flexible Bilt Cash: 4% back in Bilt Cash on everyday purchases, with $3 of Bilt Cash unlocking 100 housing points (up to 1X). Bilt Cash is not modeled as an earn rate.",
      "From 2027-01-01, new accounts get $100 in Bilt Cash at opening and each card anniversary instead of the hotel credit. Existing accounts switch at their first card anniversary on or after 2027-01-01 unless they make a Legacy Election.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 9184,
        "cardId": 187,
        "category": "Hotels booked online through the Bilt Travel portal",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 9185,
        "cardId": 187,
        "category": "Flights booked online through the Bilt Travel portal",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9186,
        "cardId": 187,
        "category": "Dining or groceries, your pick (groceries up to $25,000/year)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9187,
        "cardId": 187,
        "category": "Lyft rides (linked Bilt account)",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9188,
        "cardId": 187,
        "category": "Airlines, hotels, cruise lines and car rentals booked directly",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9189,
        "cardId": 187,
        "category": "Rent",
        "rate": 0.01,
        "isDefault": false
      },
      {
        "id": 9190,
        "cardId": 187,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "categoryChoices": [
      {
        "categoryId": 9186,
        "mode": "user-selected",
        "picks": 1,
        "resets": "year",
        "options": [
          "Dining",
          "Grocery stores and supermarkets"
        ]
      }
    ],
    "benefits": [
      {
        "id": 964,
        "cardId": 187,
        "name": "Bilt Travel Hotel Credit",
        "description": "Up to $50 in each half of the calendar year (January-June and July-December) toward hotel bookings of 2+ nights made through the Bilt Travel portal, for a total of $100 per calendar year. Ends at the first card anniversary on or after 2027-01-01 (replaced by $100 annual Bilt Cash) unless a Legacy Election is made.",
        "annualValue": 100,
        "period": "semiannual"
      },
      {
        "id": 965,
        "cardId": 187,
        "name": "No Fee on Rent and Mortgage Payments",
        "description": "Rent, mortgage and HOA payments made through the Bilt app or website carry no transaction fee.",
        "annualValue": null
      },
      {
        "id": 966,
        "cardId": 187,
        "name": "No Foreign Transaction Fees",
        "description": "Bilt lists no foreign transaction fees on the Obsidian Card.",
        "annualValue": null
      },
      {
        "id": 967,
        "cardId": 187,
        "name": "Trip Protection",
        "description": "Trip cancellation/interruption protection, trip delay reimbursement and lost or damaged luggage insurance (Obsidian Card Guide to Benefits).",
        "annualValue": null
      },
      {
        "id": 968,
        "cardId": 187,
        "name": "Cell Phone Protection",
        "description": "Cellular wireless telephone protection when the monthly phone bill is paid with the card (see the Obsidian Card Guide to Benefits for limits).",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bilt.com/card",
    "imageSourceUrl": "https://img.bilt.com/43819/1790799681-bilt-vail.webp",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 188,
    "name": "Bilt Palladium Card",
    "issuer": "Column N.A. / Bilt",
    "network": "Mastercard",
    "annualFee": 495,
    "signupBonus": "$300 in Bilt Cash at account opening, plus 50,000 points and Bilt Gold status after $4,000 in everyday purchases (excluding rent and mortgage) in the first 90 days",
    "signupBonusValue": 925,
    "color": "linear-gradient(135deg, #6b7280, #d1d5db)",
    "logoUrl": "https://logo.clearbit.com/biltrewards.com",
    "cardImageUrl": "/card-images/188-bilt-palladium-card.webp",
    "rewardType": "points",
    "rewardProgram": "Bilt Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1.25,
    "rewardValuationDescription": "Bilt Rewards value varies by redemption; this app uses an estimated 1.25 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issued by Column N.A. and serviced by Cardless Inc. Succeeds the Wells Fargo-issued Bilt Mastercard (catalog #45), retired 2026-02-07.",
      "2X on all eligible purchases except housing payments. Bilt Travel portal bookings add +2X on hotels and +1X on flights, and linking Lyft adds +2X; those rows show the published totals. Bilt Dining partner restaurants add a variable bonus (advertised as up to 5X total); it is not modeled.",
      "Rent, mortgage and HOA payments made through Bilt carry no transaction fee and do not earn the 2X rate. The Rent row uses the 1X tier. Under the Housing-only option the multiplier is set each billing cycle by everyday spend as a share of the housing payment (25%: 0.5X, 50%: 0.75X, 75%: 1X, 100%+: 1.25X; below 25%: a flat 250 points). Accounts opened before 2027-01-01 may instead elect Flexible Bilt Cash: 4% back in Bilt Cash on everyday purchases, with $3 of Bilt Cash unlocking 100 housing points (up to 1X). Bilt Cash is not modeled as an earn rate.",
      "From 2027-01-01, new accounts get $600 in Bilt Cash at opening and each card anniversary in place of the $400 hotel credit and $200 annual Bilt Cash. Existing accounts switch at their first card anniversary on or after 2027-01-01 unless they make a Legacy Election.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 9191,
        "cardId": 188,
        "category": "Hotels booked online through the Bilt Travel portal",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 9192,
        "cardId": 188,
        "category": "Lyft rides (linked Bilt account)",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 9193,
        "cardId": 188,
        "category": "Flights booked online through the Bilt Travel portal",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 9194,
        "cardId": 188,
        "category": "Rent",
        "rate": 0.01,
        "isDefault": false
      },
      {
        "id": 9195,
        "cardId": 188,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 969,
        "cardId": 188,
        "name": "Bilt Travel Hotel Credit",
        "description": "Up to $200 in each half of the calendar year (January-June and July-December) toward hotel bookings of 2+ nights made through the Bilt Travel portal, for a total of $400 per calendar year. Ends at the first card anniversary on or after 2027-01-01 (replaced by $600 annual Bilt Cash) unless a Legacy Election is made.",
        "annualValue": 400,
        "period": "semiannual"
      },
      {
        "id": 970,
        "cardId": 188,
        "name": "Annual Bilt Cash",
        "description": "$200 in Bilt Cash credited at account opening and on each card anniversary to the primary cardholder (Bilt Cash expires 12 months after it is earned). Replaced by $600 annual Bilt Cash at the first card anniversary on or after 2027-01-01 unless a Legacy Election is made.",
        "annualValue": 200,
        "period": "cardmember-year"
      },
      {
        "id": 971,
        "cardId": 188,
        "name": "Priority Pass Membership",
        "description": "Priority Pass lounge membership covering 1,300+ airport lounges (Bilt lists it as worth $469 per year).",
        "annualValue": null
      },
      {
        "id": 972,
        "cardId": 188,
        "name": "No Fee on Rent and Mortgage Payments",
        "description": "Rent, mortgage and HOA payments made through the Bilt app or website carry no transaction fee.",
        "annualValue": null
      },
      {
        "id": 973,
        "cardId": 188,
        "name": "No Foreign Transaction Fees",
        "description": "Bilt lists no foreign transaction fees on the Palladium Card.",
        "annualValue": null
      },
      {
        "id": 974,
        "cardId": 188,
        "name": "Trip Protection",
        "description": "Trip cancellation/interruption protection, trip delay reimbursement, lost or damaged luggage and baggage delay insurance (Palladium Card Guide to Benefits).",
        "annualValue": null
      },
      {
        "id": 975,
        "cardId": 188,
        "name": "Cell Phone Protection",
        "description": "Cellular wireless telephone protection when the monthly phone bill is paid with the card (see the Palladium Card Guide to Benefits for limits).",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bilt.com/card",
    "imageSourceUrl": "https://img.bilt.com/43819/1790799681-bilt-aspen.webp",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official"
  },
  {
    "id": 189,
    "name": "DBS Chromo Card",
    "issuer": "DBS Singapore",
    "network": "Visa",
    "annualFee": 196.2,
    "signupBonus": "See issuer page for current welcome gift (new-to-DBS/POSB cardholders aged 21-29)",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #b91c1c, #f87171)",
    "logoUrl": "https://logo.clearbit.com/dbs.com.sg",
    "cardImageUrl": "/card-images/189-dbs-chromo-card.webp",
    "rewardType": "cashback",
    "rewardProgram": "DBS Cashback",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Only for applicants aged 21-29. Each calendar month the two local spend categories with the highest eligible spend (Dining, Travel, Shopping, Transport, Entertainment, Wellness) automatically earn an extra 4% (5% in total) once S$500 of eligible spend is reached. Bonus cashback is capped at S$30 per category (S$750 of spend each) and total cashback at S$150 a month including the base.",
      "1% base cashback on other local (SGD) spend, with no minimum. Foreign-currency transactions earn no cashback but carry no FX fee; overseas purchases converted to SGD by the merchant (DCC) still earn.",
      "Cardholders can switch to miles once a month: 1.3 miles per S$1, paid as DBS Points (1 point = 2 miles), uncapped.",
      "From the fourth month after the cardholder's 30th birthday month the card earns a flat 1.7% cashback (or 1.3 miles per S$1) with no cap or minimum spend.",
      "Annual fee S$196.20, waived for the first five years."
    ],
    "cashbackCategories": [
      {
        "id": 9210,
        "cardId": 189,
        "category": "Top 2 local spend categories each month, picked automatically (up to $1,500/month combined)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 9211,
        "cardId": 189,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "categoryChoices": [
      {
        "categoryId": 9210,
        "mode": "automatic-top-spend",
        "picks": 2,
        "resets": "month",
        "options": [
          "Dining",
          "Travel",
          "Shopping, including online retail",
          "Transport: public transit, taxis and rideshare",
          "Entertainment, streaming and telco phone plans",
          "Wellness: groceries, drugstores, beauty and gyms"
        ]
      }
    ],
    "benefits": [
      {
        "id": 981,
        "cardId": 189,
        "name": "No Foreign Transaction Fees",
        "description": "No FX fee on foreign-currency spending online or in-store (such spending earns no cashback).",
        "annualValue": null
      },
      {
        "id": 982,
        "cardId": 189,
        "name": "Complimentary Basic Travel Insurance",
        "description": "Complimentary basic travel insurance underwritten by Chubb, redeemable once a month until 31 Aug 2027 (cardholders 18 and above).",
        "annualValue": null
      }
    ],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.dbs.com.sg/personal/cards/credit-cards/dbs-chromo-card",
    "imageSourceUrl": "https://www.dbs.com.sg/iwov-resources/media/images/cards/credit-cards/dbs-chromo-card/dbs-chromo-card-220x140.png",
    "lastReviewedAt": "2026-10-31",
    "dataConfidence": "official",
    "availability": "open"
  }
] satisfies VerifiedCreditCard[];
