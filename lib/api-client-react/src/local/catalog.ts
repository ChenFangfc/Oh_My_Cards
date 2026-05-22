import type { CreditCard } from "../generated/api.schemas";

export type CardMarket = "US" | "Canada" | "Hong Kong" | "Singapore";
export type CardRuleCurrency = "USD" | "CAD" | "HKD" | "SGD";
export type CardRuleDataConfidence = "official" | "needs-review";

export type VerifiedCreditCard = CreditCard & {
  market?: CardMarket;
  currency?: CardRuleCurrency;
  sourceUrl?: string;
  imageSourceUrl?: string | null;
  lastReviewedAt?: string;
  dataConfidence?: CardRuleDataConfidence;
};

export const BUILTIN_RULESET_VERSION = "2026.05.21.1";

export const BUILTIN_CARDS = [
  {
    "id": 1,
    "name": "Chase Sapphire Preferred",
    "issuer": "Chase",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "75,000 points after $5,000 spend in 3 months",
    "signupBonusValue": 938,
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
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
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
      }
    ],
    "benefits": [
      {
        "id": 269,
        "cardId": 1,
        "name": "Annual Hotel Credit",
        "description": "Up to $50 in statement credits each account anniversary year for hotels booked through Chase Travel.",
        "annualValue": 50
      },
      {
        "id": 270,
        "cardId": 1,
        "name": "10% Anniversary Points Boost",
        "description": "Earn bonus points equal to 10% of total purchases made the previous account anniversary year.",
        "annualValue": 75
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
        "annualValue": 200
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred",
    "imageSourceUrl": "https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred",
    "lastReviewedAt": "2026-05-17",
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
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
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
        "category": "Flights and Hotels",
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
      }
    ],
    "benefits": [
      {
        "id": 273,
        "cardId": 2,
        "name": "Annual Travel Credit",
        "description": "Up to $300 in annual travel statement credits.",
        "annualValue": 300
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
        "description": "Statement credit for an eligible application fee every four years.",
        "annualValue": 120
      },
      {
        "id": 276,
        "cardId": 2,
        "name": "Premium Travel Protections",
        "description": "Includes trip cancellation/interruption, trip delay, baggage delay and rental car coverage.",
        "annualValue": 300
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve",
    "imageSourceUrl": "https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve",
    "lastReviewedAt": "2026-05-17",
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
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited",
    "imageSourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited",
    "lastReviewedAt": "2026-05-21",
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
      }
    ],
    "benefits": [
      {
        "id": 13,
        "cardId": 4,
        "name": "Cell Phone Protection",
        "description": "Up to $800 per claim when you pay your monthly cell phone bill with the card",
        "annualValue": 100
      },
      {
        "id": 14,
        "cardId": 4,
        "name": "Purchase Protection",
        "description": "New purchases protected for 120 days against damage or theft",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/freedom/flex",
    "imageSourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/freedom/flex",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
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
      }
    ],
    "benefits": [
      {
        "id": 15,
        "cardId": 5,
        "name": "Citi Entertainment",
        "description": "Special access to purchase tickets to thousands of events",
        "annualValue": 50
      },
      {
        "id": 16,
        "cardId": 5,
        "name": "Damage and Theft Protection",
        "description": "Purchase protection for 120 days on new purchases",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-double-cash-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-double-cash-credit-card",
    "lastReviewedAt": "2026-05-17",
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
        "category": "Gas",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 25,
        "cardId": 6,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 17,
        "cardId": 6,
        "name": "$100 Hotel Credit",
        "description": "$100 off a single hotel stay of $500+ booked via CitiTravel.com",
        "annualValue": 100
      },
      {
        "id": 18,
        "cardId": 6,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on purchases made abroad",
        "annualValue": 30
      },
      {
        "id": 19,
        "cardId": 6,
        "name": "Citi Entertainment Access",
        "description": "Presale and preferred tickets for concerts, sports, dining, and more",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-strata-premier-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-strata-premier-credit-card",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 7,
    "name": "Citi Custom Cash",
    "issuer": "Citi",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "$200 cash back after $1,500 spend in 6 months",
    "signupBonusValue": 200,
    "color": "linear-gradient(135deg, #0f3460, #16213e)",
    "logoUrl": "https://logo.clearbit.com/citi.com",
    "cardImageUrl": "/card-images/07-citi-custom-cash.webp",
    "rewardType": "points",
    "rewardProgram": "Citi ThankYou Points",
    "rewardUnitName": "ThankYou Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Citi cards in this catalog earn ThankYou Points or cash-equivalent ThankYou rewards; this app uses 1 cent per point for cash-value calculations unless a product-specific rule says otherwise.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle.",
      "Cap or timing language appears in the official earning categories: Top Eligible Category (up to $500/month); Other.",
      "5% applies to the top eligible spend category each billing cycle up to $500 in purchases, then 1%."
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
        "annualValue": 50
      },
      {
        "id": 21,
        "cardId": 7,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on international purchases",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-custom-cash-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-custom-cash-credit-card",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
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
        "annualValue": 120
      },
      {
        "id": 278,
        "cardId": 8,
        "name": "Dining Credit",
        "description": "Up to $120 per year in statement credits with participating dining partners.",
        "annualValue": 120
      },
      {
        "id": 279,
        "cardId": 8,
        "name": "Dunkin Credit",
        "description": "Up to $84 per year in monthly statement credits at Dunkin.",
        "annualValue": 84
      },
      {
        "id": 280,
        "cardId": 8,
        "name": "Resy Credit",
        "description": "Up to $100 per year in statement credits at U.S. Resy restaurants.",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/gold-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/gold-card/",
    "lastReviewedAt": "2026-05-21",
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
        "description": "Up to $600 per year for eligible prepaid hotel bookings through Amex Travel.",
        "annualValue": 600
      },
      {
        "id": 282,
        "cardId": 9,
        "name": "Digital Entertainment Credit",
        "description": "Up to $300 per year in eligible digital entertainment credits.",
        "annualValue": 300
      },
      {
        "id": 283,
        "cardId": 9,
        "name": "Resy Credit",
        "description": "Up to $400 per year in eligible Resy dining credits.",
        "annualValue": 400
      },
      {
        "id": 284,
        "cardId": 9,
        "name": "CLEAR Plus Credit",
        "description": "Up to $209 per year for CLEAR Plus membership.",
        "annualValue": 209
      },
      {
        "id": 285,
        "cardId": 9,
        "name": "Airport Lounge Access",
        "description": "Access to Centurion Lounges, Priority Pass Select and other eligible lounges.",
        "annualValue": 500
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/platinum/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/platinum/",
    "lastReviewedAt": "2026-05-21",
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
        "id": 34,
        "cardId": 10,
        "name": "$84 Disney Bundle Credit",
        "description": "$7/month for Disney Bundle (Disney+, Hulu, ESPN+)",
        "annualValue": 84
      },
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
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/",
    "lastReviewedAt": "2026-05-17",
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
        "id": 37,
        "cardId": 11,
        "name": "$84 Disney Bundle Credit",
        "description": "$7/month for Disney Bundle (Disney+, Hulu, ESPN+)",
        "annualValue": 84
      },
      {
        "id": 38,
        "cardId": 11,
        "name": "Car Rental Loss and Damage Insurance",
        "description": "Protection when you use the card to reserve and pay for your rental",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/blue-cash-everyday/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/blue-cash-everyday/",
    "lastReviewedAt": "2026-05-21",
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
    "cardImageUrl": "/card-images/12-capital-one-venture-x.png",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Hotels (via Capital One Travel); Rental Cars (via Capital One Travel); Travel (via Capital One Travel); Other.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
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
        "category": "Travel (via Capital One Travel)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 48,
        "cardId": 12,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 39,
        "cardId": 12,
        "name": "$300 Travel Credit",
        "description": "Annual credit for travel booked through Capital One Travel",
        "annualValue": 300
      },
      {
        "id": 40,
        "cardId": 12,
        "name": "10,000 Anniversary Bonus Miles",
        "description": "Bonus miles every account anniversary",
        "annualValue": 100
      },
      {
        "id": 41,
        "cardId": 12,
        "name": "Priority Pass Lounge Access",
        "description": "Unlimited Priority Pass lounge access for cardholder + 2 guests",
        "annualValue": 429
      },
      {
        "id": 42,
        "cardId": 12,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Up to $100 credit for Global Entry or TSA PreCheck application fee",
        "annualValue": 25
      },
      {
        "id": 43,
        "cardId": 12,
        "name": "Capital One Lounge Access",
        "description": "Unlimited access to Capital One airport lounges",
        "annualValue": 150
      },
      {
        "id": 44,
        "cardId": 12,
        "name": "Cell Phone Protection",
        "description": "Up to $800 per claim, max 2 claims per year when you pay your cell phone bill with the card",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/venture-x/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/venture-x/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
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
      "Cap or timing language appears in the official earning categories: Hotels (via Capital One Travel); Rental Cars (via Capital One Travel); All Purchases.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 49,
        "cardId": 13,
        "category": "Hotels (via Capital One Travel)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 50,
        "cardId": 13,
        "category": "Rental Cars (via Capital One Travel)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 51,
        "cardId": 13,
        "category": "All Purchases",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 45,
        "cardId": 13,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Up to $100 credit every 4 years",
        "annualValue": 25
      },
      {
        "id": 46,
        "cardId": 13,
        "name": "Travel Accident Insurance",
        "description": "Coverage when you pay for travel with the card",
        "annualValue": 50
      },
      {
        "id": 47,
        "cardId": 13,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on international purchases",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/venture/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/venture/",
    "lastReviewedAt": "2026-05-17",
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
      "Cap or timing language appears in the official earning categories: Capital One Entertainment; Hotels and rental cars via Capital One Travel; Dining; Entertainment; Streaming; Groceries; Other.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 299,
        "cardId": 14,
        "category": "Capital One Entertainment",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 300,
        "cardId": 14,
        "category": "Hotels and rental cars via Capital One Travel",
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
        "annualValue": 95
      },
      {
        "id": 287,
        "cardId": 14,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on purchases outside the U.S.",
        "annualValue": 50
      },
      {
        "id": 288,
        "cardId": 14,
        "name": "Capital One Entertainment Access",
        "description": "Access to Capital One Entertainment tickets and elevated rewards where eligible.",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/savor/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/savor/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 15,
    "name": "Capital One SavorOne",
    "issuer": "Capital One",
    "network": "Mastercard",
    "annualFee": 0,
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
      }
    ],
    "benefits": [
      {
        "id": 51,
        "cardId": 15,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on international purchases",
        "annualValue": 30
      },
      {
        "id": 52,
        "cardId": 15,
        "name": "Extended Warranty",
        "description": "Doubles the original warranty period up to one additional year",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/savorone/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/savorone/",
    "lastReviewedAt": "2026-05-17",
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
      }
    ],
    "benefits": [
      {
        "id": 53,
        "cardId": 16,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on international purchases",
        "annualValue": 30
      },
      {
        "id": 54,
        "cardId": 16,
        "name": "Travel Accident Insurance",
        "description": "Coverage when you purchase travel with the card",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/quicksilver/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/quicksilver/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 17,
    "name": "Discover it Cash Back",
    "issuer": "Discover",
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
        "annualValue": 150
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
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.discover.com/credit-cards/cash-back/it-card.html",
    "imageSourceUrl": "https://www.discover.com/credit-cards/cash-back/it-card.html",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
  },
  {
    "id": 18,
    "name": "Discover it Miles",
    "issuer": "Discover",
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
        "annualValue": 150
      },
      {
        "id": 59,
        "cardId": 18,
        "name": "No Foreign Transaction Fees",
        "description": "No fee on purchases made outside the US",
        "annualValue": 30
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
    "lastReviewedAt": "2026-05-17",
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
        "annualValue": 50
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
        "annualValue": 50
      },
      {
        "id": 65,
        "cardId": 20,
        "name": "Auto Rental Collision Damage Waiver",
        "description": "Coverage when you rent a car and pay with the card",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/autograph-visa-credit-card/",
    "imageSourceUrl": "https://creditcards.wellsfargo.com/autograph-visa-credit-card/",
    "lastReviewedAt": "2026-05-17",
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
        "annualValue": 30
      },
      {
        "id": 68,
        "cardId": 21,
        "name": "Preferred Rewards Bonus",
        "description": "Up to 75% rewards bonus for Preferred Rewards members",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/travel-rewards-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/travel-rewards-credit-card/",
    "lastReviewedAt": "2026-05-17",
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
        "description": "Up to $100 per year for qualifying airline incidental purchases",
        "annualValue": 100
      },
      {
        "id": 70,
        "cardId": 22,
        "name": "$100 TSA PreCheck / Global Entry Credit",
        "description": "Statement credit for TSA PreCheck or Global Entry application fee",
        "annualValue": 25
      },
      {
        "id": 71,
        "cardId": 22,
        "name": "No Foreign Transaction Fees",
        "description": "No fees on international purchases",
        "annualValue": 30
      },
      {
        "id": 72,
        "cardId": 22,
        "name": "Preferred Rewards Bonus",
        "description": "Up to 75% rewards bonus for Preferred Rewards members",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/premium-rewards-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/premium-rewards-credit-card/",
    "lastReviewedAt": "2026-05-17",
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
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle.",
      "Cap or timing language appears in the official earning categories: Choice Category first year (then 3%); Grocery Stores & Wholesale Clubs (up to $2,500/quarter); Other.",
      "First-year enhanced earning is account-age dependent; the app uses the account-opened date when a supported first-year rule is implemented.",
      "The 3% choice-category / 2% grocery and wholesale category has a combined $2,500 quarterly cap, then earns 1%; first-year 6% choice-category earning depends on account age."
    ],
    "cashbackCategories": [
      {
        "id": 77,
        "cardId": 23,
        "category": "Choice Category first year (then 3%)",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 78,
        "cardId": 23,
        "category": "Grocery Stores & Wholesale Clubs (up to $2,500/quarter)",
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
        "annualValue": 120
      },
      {
        "id": 74,
        "cardId": 23,
        "name": "Purchase Protection",
        "description": "Coverage for new purchases against damage or theft",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
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
      "Cap or timing language appears in the official earning categories: Two Chosen Categories (up to $2,000/quarter each); One Everyday Category; Other."
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
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/credit-cards/cash-plus-visa-signature-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/credit-cards/cash-plus-visa-signature-credit-card.html",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
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
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
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
        "category": "Gas and EV charging",
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
        "annualValue": 95
      },
      {
        "id": 290,
        "cardId": 25,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Statement credit for eligible application fee.",
        "annualValue": 100
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
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/credit-cards/altitude-connect-visa-signature-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/credit-cards/altitude-connect-visa-signature-credit-card.html",
    "lastReviewedAt": "2026-05-17",
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
        "description": "Up to $1,000 protection when you pay your bill with the card",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.pnc.com/en/personal-banking/banking/credit-cards/pnc-cash-unlimited-visa-credit-card.html",
    "imageSourceUrl": "https://www.pnc.com/en/personal-banking/banking/credit-cards/pnc-cash-unlimited-visa-credit-card.html",
    "lastReviewedAt": "2026-05-19",
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
        "annualValue": 30
      },
      {
        "id": 84,
        "cardId": 27,
        "name": "United Club Passes",
        "description": "Two one-time United Club passes each account anniversary year.",
        "annualValue": 118
      },
      {
        "id": 85,
        "cardId": 27,
        "name": "$100 Global Entry / TSA PreCheck Credit",
        "description": "Statement credit every 4 years",
        "annualValue": 25
      },
      {
        "id": 86,
        "cardId": 27,
        "name": "25% Back on In-Flight Purchases",
        "description": "On food, beverages, and Wi-Fi on United-operated flights",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/united/united-explorer",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/united/united-explorer",
    "lastReviewedAt": "2026-05-21",
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
        "description": "Annual statement credit for United purchases",
        "annualValue": 200
      },
      {
        "id": 88,
        "cardId": 28,
        "name": "Free First & Second Checked Bags",
        "description": "For primary cardmember and a companion",
        "annualValue": 240
      },
      {
        "id": 89,
        "cardId": 28,
        "name": "5,000-Mile Anniversary Award Flight Credit",
        "description": "When redeeming miles on United flights",
        "annualValue": 75
      },
      {
        "id": 90,
        "cardId": 28,
        "name": "Priority Boarding & Lounge Passes",
        "description": "2 United Club one-time passes per year",
        "annualValue": 118
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/united",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/united",
    "lastReviewedAt": "2026-05-21",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "id": 98,
        "cardId": 29,
        "category": "Streaming",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9107,
        "cardId": 29,
        "category": "Local Transit and Rideshare",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9108,
        "cardId": 29,
        "category": "Internet, Cable, and Phone Services",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9109,
        "cardId": 29,
        "category": "Rapid Rewards Hotels and Rental Cars",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 99,
        "cardId": 29,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 91,
        "cardId": 29,
        "name": "3,000 Anniversary Points",
        "description": "Bonus points each cardmember anniversary",
        "annualValue": 40
      },
      {
        "id": 92,
        "cardId": 29,
        "name": "2 EarlyBird Check-In",
        "description": "Two EarlyBird Check-Ins per year",
        "annualValue": 50
      },
      {
        "id": 93,
        "cardId": 29,
        "name": "25% Back on In-Flight Purchases",
        "description": "On in-flight Wi-Fi, drinks, and messaging",
        "annualValue": 20
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest",
    "lastReviewedAt": "2026-05-21",
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
        "id": 101,
        "cardId": 30,
        "category": "Hotels",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 102,
        "cardId": 30,
        "category": "Rental Cars",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 103,
        "cardId": 30,
        "category": "Streaming",
        "rate": 0.02,
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
        "id": 9111,
        "cardId": 30,
        "category": "Local Transit and Rideshare",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9112,
        "cardId": 30,
        "category": "Internet, Cable, and Phone Services",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 104,
        "cardId": 30,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 94,
        "cardId": 30,
        "name": "$75 Southwest Travel Credit",
        "description": "Annual statement credit toward Southwest purchases",
        "annualValue": 75
      },
      {
        "id": 95,
        "cardId": 30,
        "name": "7,500 Anniversary Points",
        "description": "Bonus points each year",
        "annualValue": 100
      },
      {
        "id": 96,
        "cardId": 30,
        "name": "4 Upgraded Boardings per Year",
        "description": "When available, upgrade to A1-A15 boarding position",
        "annualValue": 120
      },
      {
        "id": 97,
        "cardId": 30,
        "name": "20% Back on In-Flight Purchases",
        "description": "Drinks, messaging, and Wi-Fi",
        "annualValue": 20
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest",
    "lastReviewedAt": "2026-05-21",
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
        "id": 98,
        "cardId": 31,
        "name": "Free First Checked Bag",
        "description": "Free first checked bag on Delta flights for you and up to 8 companions",
        "annualValue": 240
      },
      {
        "id": 99,
        "cardId": 31,
        "name": "$200 Delta Flight Credit",
        "description": "After spending $10,000 in a calendar year",
        "annualValue": 200
      },
      {
        "id": 100,
        "cardId": 31,
        "name": "Priority Boarding",
        "description": "Main Cabin 1 priority boarding",
        "annualValue": 30
      },
      {
        "id": 101,
        "cardId": 31,
        "name": "20% Back on In-Flight Purchases",
        "description": "Statement credit on Delta in-flight purchases",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-gold-american-express-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-gold-american-express-card/",
    "lastReviewedAt": "2026-05-17",
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
        "description": "Annual round-trip Main Cabin companion certificate (taxes/fees apply)",
        "annualValue": 400
      },
      {
        "id": 103,
        "cardId": 32,
        "name": "Free First Checked Bag",
        "description": "On Delta flights for you and up to 8 companions",
        "annualValue": 240
      },
      {
        "id": 104,
        "cardId": 32,
        "name": "$120 Resy Credit",
        "description": "Up to $10/month at U.S. Resy restaurants",
        "annualValue": 120
      },
      {
        "id": 105,
        "cardId": 32,
        "name": "$120 Rideshare Credit",
        "description": "Up to $10/month for U.S. rideshare",
        "annualValue": 120
      },
      {
        "id": 106,
        "cardId": 32,
        "name": "MQM Boost",
        "description": "10,000 MQMs after $25K spend, again at $50K",
        "annualValue": 150
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-platinum-american-express-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-platinum-american-express-card/",
    "lastReviewedAt": "2026-05-17",
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
        "annualValue": 650
      },
      {
        "id": 108,
        "cardId": 33,
        "name": "Centurion Lounge Access",
        "description": "Access when flying Delta-operated flights booked with this card",
        "annualValue": 300
      },
      {
        "id": 109,
        "cardId": 33,
        "name": "Companion Certificate (First/Comfort+/Main)",
        "description": "Annual round-trip companion certificate",
        "annualValue": 700
      },
      {
        "id": 110,
        "cardId": 33,
        "name": "$240 Resy Credit",
        "description": "Up to $20/month at U.S. Resy restaurants",
        "annualValue": 240
      },
      {
        "id": 111,
        "cardId": 33,
        "name": "$120 Rideshare Credit",
        "description": "Up to $10/month for U.S. rideshare",
        "annualValue": 120
      },
      {
        "id": 112,
        "cardId": 33,
        "name": "Free First Checked Bag",
        "description": "On Delta flights",
        "annualValue": 240
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-reserve-american-express-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-reserve-american-express-card/",
    "lastReviewedAt": "2026-05-21",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "annualValue": 30
      },
      {
        "id": 115,
        "cardId": 34,
        "name": "25% Back on In-Flight Purchases",
        "description": "On AA in-flight food and beverages",
        "annualValue": 30
      },
      {
        "id": 116,
        "cardId": 34,
        "name": "$125 American Airlines Flight Discount",
        "description": "After $20,000 in spend in cardmember year",
        "annualValue": 125
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-aadvantage-platinum-select-world-elite-mastercard",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-aadvantage-platinum-select-world-elite-mastercard",
    "lastReviewedAt": "2026-05-19",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 120,
        "cardId": 35,
        "category": "Alaska Airlines Purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 121,
        "cardId": 35,
        "category": "Gas",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 122,
        "cardId": 35,
        "category": "Groceries",
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
        "description": "$99 fare ($23 in taxes/fees) when traveling with you on Alaska",
        "annualValue": 350
      },
      {
        "id": 118,
        "cardId": 35,
        "name": "Free First Checked Bag",
        "description": "For you and up to 6 companions on the same reservation",
        "annualValue": 180
      },
      {
        "id": 119,
        "cardId": 35,
        "name": "20% Back on In-Flight Purchases",
        "description": "Statement credit on Alaska in-flight purchases",
        "annualValue": 20
      },
      {
        "id": 120,
        "cardId": 35,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/alaska-airlines-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/alaska-airlines-credit-card/",
    "lastReviewedAt": "2026-05-17",
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
        "annualValue": 350
      },
      {
        "id": 122,
        "cardId": 36,
        "name": "Automatic Silver Elite Status",
        "description": "Bonvoy Silver Elite each year",
        "annualValue": 75
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
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/boundless",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/boundless",
    "lastReviewedAt": "2026-05-21",
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
        "annualValue": 300
      },
      {
        "id": 126,
        "cardId": 37,
        "name": "Automatic Discoverist Status",
        "description": "Hyatt Discoverist status each year",
        "annualValue": 100
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
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/world-of-hyatt",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/world-of-hyatt",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
  },
  {
    "id": 38,
    "name": "IHG One Rewards Premier",
    "issuer": "Chase / IHG",
    "network": "Mastercard",
    "annualFee": 99,
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
      "IHG's official marketing may show a higher total hotel earn rate by adding base IHG One Rewards points and elite-status bonus points; this app calculates only the credit-card earn rate."
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
        "category": "Travel",
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
      }
    ],
    "benefits": [
      {
        "id": 128,
        "cardId": 38,
        "name": "Anniversary Free Night",
        "description": "Free night at any IHG hotel up to 40,000 points",
        "annualValue": 200
      },
      {
        "id": 129,
        "cardId": 38,
        "name": "Automatic Platinum Elite Status",
        "description": "IHG One Rewards Platinum Elite each year",
        "annualValue": 120
      },
      {
        "id": 130,
        "cardId": 38,
        "name": "4th Night Free",
        "description": "When redeeming points for an award stay of 4+ nights",
        "annualValue": 150
      },
      {
        "id": 131,
        "cardId": 38,
        "name": "$50 United TravelBank Cash",
        "description": "After spending $7K each year",
        "annualValue": 50
      },
      {
        "id": 132,
        "cardId": 38,
        "name": "$100 Global Entry / TSA PreCheck Credit",
        "description": "Every 4 years",
        "annualValue": 25
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.ihg.com/onerewards/content/us/en/creditcard",
    "imageSourceUrl": "https://www.ihg.com/onerewards/content/us/en/creditcard",
    "lastReviewedAt": "2026-05-21",
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
        "annualValue": 750
      },
      {
        "id": 134,
        "cardId": 39,
        "name": "Automatic Platinum Elite Status",
        "description": "Bonvoy Platinum Elite each year",
        "annualValue": 300
      },
      {
        "id": 135,
        "cardId": 39,
        "name": "$300 Marriott Bonvoy Dining Credit",
        "description": "Up to $25/month at participating Marriott restaurants",
        "annualValue": 300
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
        "id": 138,
        "cardId": 39,
        "name": "$100 Global Entry / TSA PreCheck Credit",
        "description": "Every 4 years",
        "annualValue": 25
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-brilliant/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-brilliant/",
    "lastReviewedAt": "2026-05-17",
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
      }
    ],
    "benefits": [
      {
        "id": 139,
        "cardId": 40,
        "name": "Free Night Reward",
        "description": "After spending $15K in a calendar year",
        "annualValue": 300
      },
      {
        "id": 140,
        "cardId": 40,
        "name": "Automatic Hilton Honors Gold Status",
        "description": "Bonus points and complimentary breakfast at many properties",
        "annualValue": 200
      },
      {
        "id": 141,
        "cardId": 40,
        "name": "Path to Diamond Status",
        "description": "Spend $40K to earn Diamond status for the year",
        "annualValue": 150
      },
      {
        "id": 142,
        "cardId": 40,
        "name": "10 Priority Pass Lounge Visits",
        "description": "Per year for cardmember and one guest",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/hilton-honors-surpass/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/hilton-honors-surpass/",
    "lastReviewedAt": "2026-05-17",
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
        "annualValue": 1000
      },
      {
        "id": 144,
        "cardId": 41,
        "name": "Automatic Hilton Honors Diamond Status",
        "description": "Top-tier elite status with breakfast, room upgrades, lounge access",
        "annualValue": 500
      },
      {
        "id": 145,
        "cardId": 41,
        "name": "$400 Hilton Resort Credit",
        "description": "$200 semi-annually at participating Hilton resorts",
        "annualValue": 400
      },
      {
        "id": 146,
        "cardId": 41,
        "name": "$200 Flight Credit",
        "description": "$50 quarterly toward eligible flight purchases",
        "annualValue": 200
      },
      {
        "id": 147,
        "cardId": 41,
        "name": "$199 CLEAR Plus Credit",
        "description": "Annual statement credit for CLEAR Plus",
        "annualValue": 199
      },
      {
        "id": 148,
        "cardId": 41,
        "name": "Priority Pass Lounge Access",
        "description": "Unlimited visits to 1,400+ lounges worldwide",
        "annualValue": 429
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/hilton-honors-aspire/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/hilton-honors-aspire/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 42,
    "name": "Wyndham Rewards Earner+ Card",
    "issuer": "Barclays / Wyndham Rewards",
    "network": "Visa",
    "annualFee": 75,
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 154,
        "cardId": 42,
        "category": "Wyndham Hotels & Gas",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 155,
        "cardId": 42,
        "category": "Dining",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 156,
        "cardId": 42,
        "category": "Groceries",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 157,
        "cardId": 42,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 149,
        "cardId": 42,
        "name": "7,500 Anniversary Bonus Points",
        "description": "Bonus points each cardmember year",
        "annualValue": 75
      },
      {
        "id": 150,
        "cardId": 42,
        "name": "Automatic Wyndham Diamond Status",
        "description": "Top-tier hotel elite status",
        "annualValue": 150
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
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://cards.barclaycardus.com/banking/cards/wyndham-rewards-earner-plus-card/",
    "imageSourceUrl": "https://www.uscreditcardguide.com/barclaycard-wyndham-credit-card/",
    "lastReviewedAt": "2026-05-17",
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
    "cardImageUrl": "/card-images/43-apple-card.png",
    "rewardType": "cashback",
    "rewardProgram": "Apple Daily Cash",
    "rewardUnitName": "Daily Cash",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Apple Card earns 3% Daily Cash on purchases from Apple and select Apple Pay merchants, 2% on other Apple Pay purchases, and 1% with the titanium card or card number.",
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "annualValue": 50
      },
      {
        "id": 154,
        "cardId": 43,
        "name": "No Annual Fee",
        "description": "No annual fee, no late fees, no foreign transaction fees",
        "annualValue": 30
      },
      {
        "id": 155,
        "cardId": 43,
        "name": "Financial Health Tools",
        "description": "Built-in tools to track spending, set goals, and understand interest charges",
        "annualValue": 20
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.apple.com/apple-card/",
    "imageSourceUrl": "https://commons.wikimedia.org/wiki/File%3AApple_Card.png",
    "lastReviewedAt": "2026-05-21",
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
      "Cap or timing language appears in the official earning categories: Eligible Gas, including Costco gas (first $7,000/yr combined with EV charging); Eligible EV Charging (first $7,000/yr combined with eligible gas); Restaurants; Travel; Costco; Other.",
      "Gas and EV charging caps are combined annually in the issuer terms; Costco rewards are generally distributed as an annual reward certificate."
    ],
    "cashbackCategories": [
      {
        "id": 161,
        "cardId": 44,
        "category": "Eligible Gas, including Costco gas (first $7,000/yr combined with EV charging)",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 162,
        "cardId": 44,
        "category": "Eligible EV Charging (first $7,000/yr combined with eligible gas)",
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
        "annualValue": 30
      },
      {
        "id": 158,
        "cardId": 44,
        "name": "Damage and Theft Protection",
        "description": "Coverage on new purchases for 120 days",
        "annualValue": 75
      },
      {
        "id": 159,
        "cardId": 44,
        "name": "Worldwide Car Rental Insurance",
        "description": "Secondary coverage when you rent with the card",
        "annualValue": 60
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-costco-anywhere-visa-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-costco-anywhere-visa-credit-card",
    "lastReviewedAt": "2026-05-19",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "annualValue": 200
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
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.biltrewards.com/card",
    "imageSourceUrl": "https://www.uscreditcardguide.com/bilt-mastercard-credit-card/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
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
    "cardImageUrl": "/card-images/robinhood-gold-card.png",
    "rewardType": "cashback",
    "rewardProgram": "Robinhood Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "annualValue": 50
      },
      {
        "id": 294,
        "cardId": 46,
        "name": "Visa Signature Benefits",
        "description": "Includes eligible Visa Signature travel and purchase benefits.",
        "annualValue": 100
      },
      {
        "id": 295,
        "cardId": 46,
        "name": "Family Card Management",
        "description": "Tools for family card sharing and spend management.",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://robinhood.com/creditcard",
    "imageSourceUrl": "https://robinhood.com/creditcard",
    "lastReviewedAt": "2026-05-17",
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
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/business-preferred",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/business-preferred",
    "lastReviewedAt": "2026-05-21",
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
      }
    ],
    "benefits": [
      {
        "id": 172,
        "cardId": 48,
        "name": "Free Employee Cards",
        "description": "Add employee cards at no extra cost with spending limits",
        "annualValue": 50
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
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/cash",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/cash",
    "lastReviewedAt": "2026-05-21",
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
      }
    ],
    "benefits": [
      {
        "id": 175,
        "cardId": 49,
        "name": "Free Employee Cards",
        "description": "Issue employee cards with custom spending limits",
        "annualValue": 50
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
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/unlimited",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/unlimited",
    "lastReviewedAt": "2026-05-17",
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
        "category": "Travel",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 187,
        "cardId": 50,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
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
        "annualValue": 30
      },
      {
        "id": 180,
        "cardId": 50,
        "name": "Purchase Protection",
        "description": "120 days of damage and theft protection",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/amazon-prime-rewards",
    "imageSourceUrl": "https://creditcards.chase.com/cash-back-credit-cards/amazon-prime-rewards",
    "lastReviewedAt": "2026-05-17",
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
        "annualValue": 100
      },
      {
        "id": 183,
        "cardId": 51,
        "name": "Trip Cancellation Insurance",
        "description": "Coverage when you book with the card",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/united",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/united",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 52,
    "name": "United Club Infinite Card",
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
        "description": "United Club membership for the primary cardmember.",
        "annualValue": 650
      },
      {
        "id": 297,
        "cardId": 52,
        "name": "Free Checked Bags",
        "description": "First and second checked bags free on eligible United-operated flights.",
        "annualValue": 300
      },
      {
        "id": 298,
        "cardId": 52,
        "name": "Premier Access Travel Services",
        "description": "Eligible Premier Access check-in, security lane, boarding and baggage handling.",
        "annualValue": 150
      },
      {
        "id": 299,
        "cardId": 52,
        "name": "Global Entry / TSA PreCheck / NEXUS Credit",
        "description": "Statement credit for eligible application fee.",
        "annualValue": 120
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/united",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/united",
    "lastReviewedAt": "2026-05-21",
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
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
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
        "id": 197,
        "cardId": 53,
        "category": "Hotels Via Southwest",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 198,
        "cardId": 53,
        "category": "Local Transit and Rideshare",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9113,
        "cardId": 53,
        "category": "Internet, Cable, and Phone Services",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9114,
        "cardId": 53,
        "category": "Streaming",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 9115,
        "cardId": 53,
        "category": "Rapid Rewards Rental Cars",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 199,
        "cardId": 53,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 188,
        "cardId": 53,
        "name": "6,000 Anniversary Points",
        "description": "Bonus points on each cardmember anniversary",
        "annualValue": 84
      },
      {
        "id": 189,
        "cardId": 53,
        "name": "2 EarlyBird Check-Ins per Year",
        "description": "Free EarlyBird Check-In on select flights",
        "annualValue": 50
      },
      {
        "id": 190,
        "cardId": 53,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/southwest",
    "lastReviewedAt": "2026-05-21",
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
        "annualValue": 50
      },
      {
        "id": 193,
        "cardId": 54,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/bold",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/bold",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
  },
  {
    "id": 55,
    "name": "IHG One Rewards Traveler",
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
      "IHG's official marketing may show a higher total hotel earn rate by adding base IHG One Rewards points and elite-status bonus points; this app calculates only the credit-card earn rate."
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
        "category": "Monthly Bills",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 206,
        "cardId": 55,
        "category": "Other",
        "rate": 0.02,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 194,
        "cardId": 55,
        "name": "4th Reward Night Free",
        "description": "On award stays of 4+ nights",
        "annualValue": 200
      },
      {
        "id": 195,
        "cardId": 55,
        "name": "IHG Silver Elite Status",
        "description": "Earn higher level with $20k spend",
        "annualValue": 50
      },
      {
        "id": 196,
        "cardId": 55,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/ihg",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/ihg",
    "lastReviewedAt": "2026-05-21",
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
      "Top two 4x categories are selected automatically from eligible business categories each billing cycle and are capped at $150,000 in combined purchases per calendar year before base earning applies."
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
        "category": "Flights & Hotels",
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
        "description": "$20/month at FedEx, Grubhub, Office Supplies, etc.",
        "annualValue": 240
      },
      {
        "id": 198,
        "cardId": 56,
        "name": "$155 Walmart+ Credit",
        "description": "Monthly statement credit for Walmart+ membership",
        "annualValue": 155
      },
      {
        "id": 199,
        "cardId": 56,
        "name": "25% Airline Bonus",
        "description": "Up to 250k points back per year for flights via Amex Travel",
        "annualValue": 200
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-business-gold-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-business-gold-card/",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
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
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates.",
      "Large-purchase bonus rates apply only to transactions meeting the listed minimum purchase amount.",
      "The 1.5x business-category and large-purchase earning is capped by the issuer's annual eligible-purchase limit before base earning applies."
    ],
    "cashbackCategories": [
      {
        "id": 210,
        "cardId": 57,
        "category": "Flights & Prepaid Hotels",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 211,
        "cardId": 57,
        "category": "Select Business Categories and Large Purchases $5k+ (up to $2,000,000/yr combined)",
        "rate": 0.015,
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
        "annualValue": 200
      },
      {
        "id": 201,
        "cardId": 57,
        "name": "$400 Dell Credit",
        "description": "Up to $400/year in Dell Technologies statement credits",
        "annualValue": 400
      },
      {
        "id": 202,
        "cardId": 57,
        "name": "$360 Indeed Credit",
        "description": "Up to $90/quarter for Indeed posts",
        "annualValue": 360
      },
      {
        "id": 203,
        "cardId": 57,
        "name": "$150 Adobe Credit",
        "description": "Annual Adobe statement credit",
        "annualValue": 150
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
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/business-platinum-charge-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/business-platinum-charge-card/",
    "lastReviewedAt": "2026-05-21",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "category": "Restaurants",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 215,
        "cardId": 58,
        "category": "Groceries",
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
        "annualValue": 150
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
        "annualValue": 300
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-bevy/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-bevy/",
    "lastReviewedAt": "2026-05-17",
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
        "annualValue": 75
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
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 322,
        "cardId": 60,
        "category": "Select streaming",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 323,
        "cardId": 60,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 300,
        "cardId": 60,
        "name": "Round Up Rewards",
        "description": "Rewards can round up to the nearest 10 points on every purchase where applicable.",
        "annualValue": 25
      },
      {
        "id": 301,
        "cardId": 60,
        "name": "No Annual Fee",
        "description": "No annual fee for the current Citi Strata Card.",
        "annualValue": 95
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-strata-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-strata-credit-card",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
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
        "annualValue": 30
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
    "name": "Citi / AAdvantage Executive World Elite",
    "issuer": "Citi / American Airlines",
    "network": "Mastercard",
    "annualFee": 595,
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
      }
    ],
    "benefits": [
      {
        "id": 217,
        "cardId": 62,
        "name": "Admirals Club Membership",
        "description": "Full access for cardholder + immediate family",
        "annualValue": 850
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
        "annualValue": 30
      },
      {
        "id": 220,
        "cardId": 62,
        "name": "Priority Boarding & Check-In",
        "description": "Group 4 boarding on American flights",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-aadvantage-executive-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-aadvantage-executive-credit-card",
    "lastReviewedAt": "2026-05-17",
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
        "annualValue": 65
      },
      {
        "id": 223,
        "cardId": 63,
        "name": "Mosaic Status with $50k Spend",
        "description": "Earn Mosaic for the rest of the year",
        "annualValue": 200
      },
      {
        "id": 224,
        "cardId": 63,
        "name": "10% Points Rebate",
        "description": "On every award flight redemption",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://cards.barclaycardus.com/banking/cards/jetblue-plus-card/",
    "imageSourceUrl": "https://www.uscreditcardguide.com/barclaycard-jetblue-plus-credit-card/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 64,
    "name": "Hawaiian Airlines World Elite Mastercard",
    "issuer": "Barclays / Hawaiian Airlines",
    "network": "Mastercard",
    "annualFee": 99,
    "signupBonus": "Legacy Barclays product; current public application and card art require manual review",
    "signupBonusValue": 910,
    "color": "linear-gradient(135deg, #6d2077, #c8102e)",
    "logoUrl": "https://logo.clearbit.com/hawaiianairlines.com",
    "cardImageUrl": "/card-images/64-hawaiian-airlines-world-elite-mastercard.png",
    "rewardType": "miles",
    "rewardProgram": "HawaiianMiles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "HawaiianMiles value varies by itinerary and redemption path; this app uses an estimated 1.00 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
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
        "description": "For cardholder on Hawaiian Airlines flights",
        "annualValue": 120
      },
      {
        "id": 226,
        "cardId": 64,
        "name": "$100 Companion Discount",
        "description": "Annual discount on roundtrip Hawaii flights",
        "annualValue": 100
      },
      {
        "id": 227,
        "cardId": 64,
        "name": "50% Off One-Way Companion Ticket",
        "description": "Inter-island companion discount",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://cards.barclaycardus.com/",
    "imageSourceUrl": "https://cards.barclaycardus.com/banking/credit-card/hawaiian-airlines/child/hcl-control/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "needs-review"
  },
  {
    "id": 65,
    "name": "AAdvantage Aviator Red World Elite",
    "issuer": "Barclays / American Airlines",
    "network": "Mastercard",
    "annualFee": 99,
    "signupBonus": "Legacy Barclays AAdvantage product; availability is changing as Citi takes over the portfolio",
    "signupBonusValue": 900,
    "color": "linear-gradient(135deg, #b22234, #e53935)",
    "logoUrl": "https://logo.clearbit.com/barclays.com",
    "cardImageUrl": "/card-images/aadvantage-aviator-red.webp",
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
        "annualValue": 50
      },
      {
        "id": 230,
        "cardId": 65,
        "name": "25% Inflight Savings",
        "description": "On food and beverages and Wi-Fi on American flights",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://cards.barclaycardus.com/",
    "imageSourceUrl": "https://financebuzz.com/credit-cards/barclaycard-aadvantage-aviator-red-world-elite-mastercard",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "needs-review"
  },
  {
    "id": 66,
    "name": "Aeroplan Card",
    "issuer": "Chase / Air Canada",
    "network": "Visa",
    "annualFee": 95,
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 243,
        "cardId": 66,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 244,
        "cardId": 66,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
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
        "description": "Pathway to Aeroplan elite status with spend",
        "annualValue": 200
      },
      {
        "id": 233,
        "cardId": 66,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/travel-credit-cards/aircanada/aeroplan",
    "imageSourceUrl": "https://creditcards.chase.com/travel-credit-cards/aircanada/aeroplan",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 67,
    "name": "US Bank Altitude Reserve",
    "issuer": "US Bank",
    "network": "Visa",
    "annualFee": 400,
    "signupBonus": "Legacy product; official page redirects to U.S. Bank card catalog",
    "signupBonusValue": 750,
    "color": "linear-gradient(135deg, #0c3766, #2a6db1)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/67-us-bank-altitude-reserve.webp",
    "rewardType": "points",
    "rewardProgram": "U.S. Bank Rewards Points",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "U.S. Bank Rewards Points value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 245,
        "cardId": 67,
        "category": "Mobile Wallet",
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
      }
    ],
    "benefits": [
      {
        "id": 234,
        "cardId": 67,
        "name": "$325 Travel & Dining Credit",
        "description": "Annual statement credit on travel and restaurant purchases",
        "annualValue": 325
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
        "annualValue": 25
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
    "sourceUrl": "https://www.usbank.com/credit-cards/altitude-reserve-visa-infinite-credit-card.html",
    "imageSourceUrl": "https://www.cardsandpoints.com/us-bank-altitude-reserve/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "needs-review"
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 248,
        "cardId": 68,
        "category": "Dining",
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
        "category": "Gas",
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
        "description": "Annual statement credit for streaming services",
        "annualValue": 15
      },
      {
        "id": 239,
        "cardId": 68,
        "name": "0% Intro APR for 12 Months",
        "description": "On purchases for the first year",
        "annualValue": 100
      },
      {
        "id": 240,
        "cardId": 68,
        "name": "Cell Phone Protection",
        "description": "Up to $600 per claim with bill payment",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/credit-cards/altitude-go-visa-signature-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/credit-cards/altitude-go-visa-signature-credit-card.html",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 69,
    "name": "Discover it Chrome",
    "issuer": "Discover",
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
        "annualValue": 200
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
    "sourceUrl": "https://www.discover.com/credit-cards/cash-back/chrome.html",
    "imageSourceUrl": "https://www.discover.com/credit-cards/cash-back/chrome.html",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
  },
  {
    "id": 70,
    "name": "Discover it Student Cash Back",
    "issuer": "Discover",
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
        "annualValue": 150
      },
      {
        "id": 245,
        "cardId": 70,
        "name": "Good Grades Reward",
        "description": "$20 statement credit per year for GPA 3.0+",
        "annualValue": 20
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
    "sourceUrl": "https://www.discover.com/credit-cards/student-credit-card/it-card.html",
    "imageSourceUrl": "https://wallethub.com/d/discover-it-for-students-credit-card-802c",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
  },
  {
    "id": 71,
    "name": "Discover it Secured",
    "issuer": "Discover",
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
      "Discover bonus categories and first-year Cashback Match terms are issuer-program specific and may require activation or eligibility.",
      "Gas and restaurant bonus earning shares a $1,000 quarterly purchase cap before base earning applies."
    ],
    "cashbackCategories": [
      {
        "id": 258,
        "cardId": 71,
        "category": "Gas (up to $1,000/quarter combined)",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 259,
        "cardId": 71,
        "category": "Restaurants (up to $1,000/quarter combined)",
        "rate": 0.02,
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
        "description": "Refundable security deposit becomes credit limit",
        "annualValue": 50
      },
      {
        "id": 248,
        "cardId": 71,
        "name": "Automatic Account Reviews",
        "description": "Reviewed for upgrade to unsecured starting at 7 months",
        "annualValue": 30
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
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
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
        "description": "On purchases and balance transfers for 21 months",
        "annualValue": 300
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
    "lastReviewedAt": "2026-05-21",
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
        "description": "30,000 Choice Privileges points each account anniversary year when requirements are met.",
        "annualValue": 180
      },
      {
        "id": 303,
        "cardId": 73,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Statement credit up to $120 for eligible trusted traveler program application fee.",
        "annualValue": 120
      },
      {
        "id": 304,
        "cardId": 73,
        "name": "No Foreign Transaction Fee",
        "description": "No foreign currency conversion/foreign transaction fee.",
        "annualValue": 50
      },
      {
        "id": 305,
        "cardId": 73,
        "name": "Cell Phone Protection",
        "description": "Eligible cell phone protection when the monthly bill is paid with the card.",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.wellsfargo.com/credit-cards/choice-select/terms/?FPID=0123CBIXP10000&app_source=WELLS_FARGO_COM",
    "imageSourceUrl": "https://www.cardsandpoints.com/tsa-precheck-credits/",
    "lastReviewedAt": "2026-05-17",
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
        "description": "On purchases and balance transfers",
        "annualValue": 150
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
    "lastReviewedAt": "2026-05-21",
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
    "cardImageUrl": "/card-images/75-td-double-up-credit-card.png",
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
        "description": "Flat 2% back when redeemed into a TD account",
        "annualValue": 200
      },
      {
        "id": 259,
        "cardId": 75,
        "name": "0% Intro APR for 15 Billing Cycles",
        "description": "On balance transfers",
        "annualValue": 150
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
    "lastReviewedAt": "2026-05-17",
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
    "cardImageUrl": "/card-images/target-circle-credit-card.png",
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
        "annualValue": 60
      },
      {
        "id": 263,
        "cardId": 76,
        "name": "Extra 30 Days for Returns",
        "description": "Beyond Target's normal return window",
        "annualValue": 30
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
    "signupBonus": "Closed to new applicants after the Capital One and Walmart partnership ended; legacy cardholder terms may vary",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "annualValue": 100
      },
      {
        "id": 265,
        "cardId": 77,
        "name": "No Foreign Transaction Fees",
        "description": "On purchases made abroad",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://investor.capitalone.com/news-releases/news-release-details/capital-one-and-walmart-announce-end-consumer-card-partnership",
    "imageSourceUrl": "https://www.cardsandpoints.com/walmart-rewards-card/",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "needs-review"
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
        "rate": 0.02,
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
        "annualValue": 50
      },
      {
        "id": 268,
        "cardId": 78,
        "name": "Cash Back to PayPal Balance",
        "description": "Redeem rewards directly to your PayPal account",
        "annualValue": 30
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://pep.paypal.com/us/digital-wallet/manage-money/paypal-cashback-mastercard",
    "imageSourceUrl": "https://www.uscreditcardguide.com/paypal-cashback-credit-card/",
    "lastReviewedAt": "2026-05-17",
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
        "annualValue": 250
      },
      {
        "id": 307,
        "cardId": 79,
        "name": "Mobile Device Insurance",
        "description": "Coverage for eligible mobile devices when requirements are met.",
        "annualValue": 100
      },
      {
        "id": 308,
        "cardId": 79,
        "name": "Visa Infinite Benefits",
        "description": "Access to eligible Visa Infinite dining, hotel and travel benefits.",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.rbcroyalbank.com/credit-cards/travel/rbc-avion-visa-infinite.html",
    "imageSourceUrl": "https://www.rbcroyalbank.com/credit-cards/travel/rbc-avion-visa-infinite.html",
    "lastReviewedAt": "2026-05-17",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 332,
        "cardId": 80,
        "category": "Air Canada",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 333,
        "cardId": 80,
        "category": "Groceries",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 334,
        "cardId": 80,
        "category": "Gas",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 335,
        "cardId": 80,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 309,
        "cardId": 80,
        "name": "First Checked Bag",
        "description": "Free first checked bag on eligible Air Canada itineraries.",
        "annualValue": 200
      },
      {
        "id": 310,
        "cardId": 80,
        "name": "NEXUS Credit",
        "description": "Up to $100 NEXUS application fee rebate every 48 months.",
        "annualValue": 100
      },
      {
        "id": 311,
        "cardId": 80,
        "name": "Travel Insurance",
        "description": "Includes eligible travel medical, trip interruption/cancellation and baggage coverages.",
        "annualValue": 250
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.td.com/ca/en/personal-banking/products/credit-cards/aeroplan/aeroplan-visa-infinite-card",
    "imageSourceUrl": "https://www.td.com/ca/en/personal-banking/products/credit-cards/aeroplan/aeroplan-visa-infinite-card",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 81,
    "name": "Scotiabank Passport Visa Infinite",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 336,
        "cardId": 81,
        "category": "Groceries",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 337,
        "cardId": 81,
        "category": "Dining",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 338,
        "cardId": 81,
        "category": "Entertainment",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 339,
        "cardId": 81,
        "category": "Daily transit",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 340,
        "cardId": 81,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 312,
        "cardId": 81,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on purchases in foreign currencies.",
        "annualValue": 150
      },
      {
        "id": 313,
        "cardId": 81,
        "name": "Airport Lounge Visits",
        "description": "Six complimentary airport lounge visits per year through Visa Airport Companion.",
        "annualValue": 250
      },
      {
        "id": 314,
        "cardId": 81,
        "name": "Travel Insurance",
        "description": "Includes eligible emergency medical and trip coverage.",
        "annualValue": 250
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.scotiabank.com/ca/en/personal/credit-cards/visa/passport-infinite-card.html",
    "imageSourceUrl": "https://smarter.loans/credit-cards/scotiabank-passport-visa-infinite-card/",
    "lastReviewedAt": "2026-05-17",
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
        "annualValue": 100
      },
      {
        "id": 317,
        "cardId": 82,
        "name": "Travel Insurance",
        "description": "Travel and purchase insurance coverages when requirements are met.",
        "annualValue": 200
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
    "cardImageUrl": "/card-images/83-cibc-aventura-visa-infinite.png",
    "rewardType": "points",
    "rewardProgram": "CIBC Aventura Rewards",
    "rewardUnitName": "Aventura Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "CIBC Aventura Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 346,
        "cardId": 83,
        "category": "Travel via CIBC Rewards Centre",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 347,
        "cardId": 83,
        "category": "Gas",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 348,
        "cardId": 83,
        "category": "Groceries",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 349,
        "cardId": 83,
        "category": "Drugstores",
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
        "description": "Four complimentary Visa Airport Companion lounge visits.",
        "annualValue": 200
      },
      {
        "id": 319,
        "cardId": 83,
        "name": "NEXUS Rebate",
        "description": "NEXUS application fee rebate when requirements are met.",
        "annualValue": 160
      },
      {
        "id": 320,
        "cardId": 83,
        "name": "Annual Fee Rebate Offer",
        "description": "First-year annual fee rebate may be available as part of the current offer.",
        "annualValue": 139
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.cibc.com/en/personal-banking/credit-cards/all-credit-cards/aventura-visa-infinite-card.html",
    "imageSourceUrl": "https://www.cibc.com/en/personal-banking/credit-cards/all-credit-cards/aventura-visa-infinite-card.html",
    "lastReviewedAt": "2026-05-17",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 351,
        "cardId": 84,
        "category": "Eats and drinks in Canada",
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
      }
    ],
    "benefits": [
      {
        "id": 321,
        "cardId": 84,
        "name": "High Food Earn Rate",
        "description": "5 Membership Rewards points per $1 on eligible eats and drinks in Canada up to the monthly cap.",
        "annualValue": 300
      },
      {
        "id": 322,
        "cardId": 84,
        "name": "No Supplementary Card Fee",
        "description": "No annual fee for supplementary cards.",
        "annualValue": 50
      },
      {
        "id": 323,
        "cardId": 84,
        "name": "Flexible Membership Rewards",
        "description": "Redeem Membership Rewards points for travel, statement credits and eligible partners.",
        "annualValue": 150
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.americanexpress.com/en-ca/credit-cards/cobalt-card/",
    "imageSourceUrl": "https://www.americanexpress.com/en-ca/credit-cards/cobalt-card/",
    "lastReviewedAt": "2026-05-17",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 355,
        "cardId": 85,
        "category": "U.S. dollar purchases",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 356,
        "cardId": 85,
        "category": "Non-U.S. purchases with eligible Rogers service",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 357,
        "cardId": 85,
        "category": "Other non-U.S. purchases",
        "rate": 0.015,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 324,
        "cardId": 85,
        "name": "Rogers Redemption Bonus",
        "description": "Get 1.5x more value when redeeming cash back toward eligible Rogers, Fido or Shaw purchases.",
        "annualValue": 100
      },
      {
        "id": 325,
        "cardId": 85,
        "name": "Roam Like Home Days",
        "description": "Five Roam Like Home days at no cost each year for eligible Rogers mobile plans.",
        "annualValue": 90
      },
      {
        "id": 326,
        "cardId": 85,
        "name": "No Annual Fee",
        "description": "No annual fee for the Rogers Red World Elite Mastercard.",
        "annualValue": 120
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.rogersbank.com/en/rogers_worldelite_mastercard_details",
    "imageSourceUrl": "https://www.rogersbank.com/en/rogers_worldelite_mastercard_details",
    "lastReviewedAt": "2026-05-17",
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
    "cardImageUrl": "/card-images/86-mbna-rewards-world-elite-mastercard.png",
    "rewardType": "points",
    "rewardProgram": "MBNA Rewards",
    "rewardUnitName": "MBNA Rewards Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "MBNA Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 358,
        "cardId": 86,
        "category": "Restaurants",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 359,
        "cardId": 86,
        "category": "Groceries",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 360,
        "cardId": 86,
        "category": "Digital media",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 361,
        "cardId": 86,
        "category": "Memberships",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 362,
        "cardId": 86,
        "category": "Household utilities",
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
        "annualValue": 100
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
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.mbna.ca/en/credit-cards/rewards/mbna-rewards-world-elite-mastercard",
    "imageSourceUrl": "https://www.mbna.ca/en/credit-cards/rewards/mbna-rewards-world-elite-mastercard",
    "lastReviewedAt": "2026-05-17",
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
    "cardImageUrl": "/card-images/87-national-bank-world-elite-mastercard.png",
    "rewardType": "points",
    "rewardProgram": "A la carte Rewards",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "A la carte Rewards value varies by redemption; this app uses an estimated 1.00 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 364,
        "cardId": 87,
        "category": "Groceries",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 365,
        "cardId": 87,
        "category": "Restaurants",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 366,
        "cardId": 87,
        "category": "Gas",
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
      }
    ],
    "benefits": [
      {
        "id": 330,
        "cardId": 87,
        "name": "Travel Expense Reimbursement",
        "description": "Up to $150 annual travel expense reimbursement for eligible expenses.",
        "annualValue": 150
      },
      {
        "id": 331,
        "cardId": 87,
        "name": "Airport Lounge Access",
        "description": "World Elite lounge access benefits through Mastercard Travel Pass / DragonPass where eligible.",
        "annualValue": 200
      },
      {
        "id": 332,
        "cardId": 87,
        "name": "Travel Insurance",
        "description": "Comprehensive travel insurance benefits when requirements are met.",
        "annualValue": 300
      }
    ],
    "inWallet": false,
    "market": "Canada",
    "currency": "CAD",
    "sourceUrl": "https://www.nbc.ca/personal/mastercard-credit-cards/world-elite.html",
    "imageSourceUrl": "https://www.nbc.ca/personal/mastercard-credit-cards/world-elite.html",
    "lastReviewedAt": "2026-05-17",
    "dataConfidence": "official"
  },
  {
    "id": 88,
    "name": "American Express Green Card",
    "issuer": "American Express",
    "network": "Amex",
    "annualFee": 150,
    "signupBonus": "See issuer page for current public offer",
    "signupBonusValue": null,
    "color": "linear-gradient(135deg, #244234, #7fb28b)",
    "logoUrl": "https://logo.clearbit.com/americanexpress.com",
    "cardImageUrl": "/card-images/88-american-express-green-card.avif",
    "rewardType": "points",
    "rewardProgram": "American Express Membership Rewards",
    "rewardUnitName": "Membership Rewards Points",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Membership Rewards redemption value varies by redemption path; this app uses a conservative 1.00 cent per point estimate for annual-fee progress and keeps earned points visible separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "description": "Up to $209 in annual statement credits for an eligible CLEAR Plus membership.",
        "annualValue": 209
      },
      {
        "id": 334,
        "cardId": 88,
        "name": "Broad Travel Rewards",
        "description": "Earns elevated Membership Rewards points across travel, transit, and restaurants.",
        "annualValue": 120
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/en-us/account/get-started/green/uncover-your-benefits",
    "imageSourceUrl": "https://www.americanexpress.com/en-us/account/get-started/green/uncover-your-benefits",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
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
    "cardImageUrl": "/card-images/89-american-express-blue-business-cash.avif",
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
    "cardImageUrl": "/card-images/90-american-express-blue-business-plus.avif",
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
    "lastReviewedAt": "2026-05-18",
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
        "annualValue": 100
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
      }
    ],
    "benefits": [
      {
        "id": 343,
        "cardId": 93,
        "name": "High Base Business Rewards",
        "description": "Strong uncapped cash back on business purchases, with a higher rate for purchases of $5,000 or more.",
        "annualValue": 300
      },
      {
        "id": 344,
        "cardId": 93,
        "name": "Pay in Full with Flex Option",
        "description": "Pay in Full card with Flex for Business APR access on eligible balances.",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/premier",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/ink/premier",
    "lastReviewedAt": "2026-05-18",
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
        "id": 347,
        "cardId": 94,
        "name": "Partner Credits",
        "description": "Issuer advertises over $600 in annual partner credits across United travel, hotels, rideshare, car rental, Instacart, JSX, and FareLock.",
        "annualValue": 600
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/united/united-business-card",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/united/united-business-card",
    "lastReviewedAt": "2026-05-18",
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
        "description": "Up to $100 in Hyatt statement credits each anniversary year when requirements are met.",
        "annualValue": 100
      },
      {
        "id": 349,
        "cardId": 95,
        "name": "Discoverist Status",
        "description": "Complimentary World of Hyatt Discoverist status for the primary cardmember and eligible employee cards.",
        "annualValue": 150
      },
      {
        "id": 350,
        "cardId": 95,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on purchases.",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/world-of-hyatt/hyatt-business-card",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/world-of-hyatt/hyatt-business-card",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
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
        "annualValue": 200
      },
      {
        "id": 352,
        "cardId": 96,
        "name": "Free First Checked Bag",
        "description": "First checked bag free for cardmembers and eligible passengers on the same reservation.",
        "annualValue": 180
      },
      {
        "id": 353,
        "cardId": 96,
        "name": "Business Travel Perks",
        "description": "Includes Southwest-focused business card benefits such as in-flight savings and anniversary value.",
        "annualValue": 150
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/southwest/performance-business",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/southwest/performance-business",
    "lastReviewedAt": "2026-05-21",
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
        "annualValue": 200
      },
      {
        "id": 355,
        "cardId": 97,
        "name": "6,000 Anniversary Points",
        "description": "6,000 bonus points each year after the cardmember anniversary.",
        "annualValue": 78
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/southwest/premier-business",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/southwest/premier-business",
    "lastReviewedAt": "2026-05-21",
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
    "cardImageUrl": "/card-images/98-capital-one-ventureone-rewards.avif",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Capital One Travel hotels and rental cars; Other.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 401,
        "cardId": 98,
        "category": "Capital One Travel hotels and rental cars",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 402,
        "cardId": 98,
        "category": "Other",
        "rate": 0.0125,
        "isDefault": true
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
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/credit-cards/ventureone/",
    "imageSourceUrl": "https://www.capitalone.com/credit-cards/ventureone/",
    "lastReviewedAt": "2026-05-18",
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
    "cardImageUrl": "/card-images/99-capital-one-venture-business.avif",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Capital One Business Travel hotels and rental cars; Other; Business purchases.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 403,
        "cardId": 99,
        "category": "Capital One Business Travel hotels and rental cars",
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
        "id": 358,
        "cardId": 99,
        "name": "Available Annual Credits",
        "description": "Issuer advertises available annual credits for eligible travel and business purchases.",
        "annualValue": 100
      },
      {
        "id": 359,
        "cardId": 99,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Statement credit up to $120 for an eligible trusted traveler application fee.",
        "annualValue": 120
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/venture-business/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/venture-business/",
    "lastReviewedAt": "2026-05-18",
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
    "cardImageUrl": "/card-images/100-capital-one-venture-x-business.avif",
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
        "description": "Annual credit for bookings through Capital One Business Travel.",
        "annualValue": 300
      },
      {
        "id": 361,
        "cardId": 100,
        "name": "Airport Lounge Access",
        "description": "Access to Capital One Lounges/Landing and partner lounge networks where eligible.",
        "annualValue": 450
      },
      {
        "id": 362,
        "cardId": 100,
        "name": "10,000 Anniversary Miles",
        "description": "10,000 bonus miles every year starting on the first anniversary.",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/venture-x-business/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/venture-x-business/",
    "lastReviewedAt": "2026-05-18",
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
        "annualValue": 50
      },
      {
        "id": 364,
        "cardId": 101,
        "name": "Low Intro APR",
        "description": "Designed for introductory APR purchases and balance transfers rather than rewards.",
        "annualValue": 100
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
        "annualValue": 100
      },
      {
        "id": 366,
        "cardId": 102,
        "name": "FICO Score and ID Protection",
        "description": "Includes free FICO Score access and Mastercard ID Theft Protection.",
        "annualValue": 40
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
        "description": "Annual hotel benefit for eligible two-night or longer Citi Travel hotel bookings.",
        "annualValue": 300
      },
      {
        "id": 368,
        "cardId": 103,
        "name": "$200 Splurge Credit",
        "description": "Annual statement credits for selected eligible lifestyle brands.",
        "annualValue": 200
      },
      {
        "id": 369,
        "cardId": 103,
        "name": "$200 Blacklane Credit",
        "description": "Annual Blacklane credits split across the first and second half of the year.",
        "annualValue": 200
      },
      {
        "id": 370,
        "cardId": 103,
        "name": "Airport Lounge Access",
        "description": "Priority Pass Select plus annual Admirals Club pass access where eligible.",
        "annualValue": 650
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citi-strata-elite-credit-card",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citi-strata-elite-credit-card",
    "lastReviewedAt": "2026-05-18",
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
        "description": "Eligible Bank of America Preferred Rewards members can earn higher effective cash back.",
        "annualValue": 100
      },
      {
        "id": 372,
        "cardId": 104,
        "name": "Low Intro APR",
        "description": "Introductory APR offer on purchases and eligible balance transfers.",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/unlimited-cash-back-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/unlimited-cash-back-credit-card/",
    "lastReviewedAt": "2026-05-18",
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
        "description": "Introductory APR offer for purchases and eligible balance transfers.",
        "annualValue": 100
      },
      {
        "id": 374,
        "cardId": 105,
        "name": "No Penalty APR",
        "description": "Paying late will not automatically raise the purchase APR.",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/bankamericard-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/bankamericard-credit-card/",
    "lastReviewedAt": "2026-05-18",
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
        "description": "Annual statement credits for qualifying airline incidental purchases.",
        "annualValue": 300
      },
      {
        "id": 376,
        "cardId": 106,
        "name": "$150 Lifestyle Credit",
        "description": "Annual statement credits for eligible lifestyle convenience purchases.",
        "annualValue": 150
      },
      {
        "id": 377,
        "cardId": 106,
        "name": "Global Entry / TSA PreCheck Credit",
        "description": "Statement credit up to $120 every four years for an eligible trusted traveler application fee.",
        "annualValue": 120
      },
      {
        "id": 378,
        "cardId": 106,
        "name": "20% Airfare Points Savings",
        "description": "Redeem points for airfare through Bank of America travel channels with 20% savings where eligible.",
        "annualValue": 150
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/premium-rewards-elite-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/premium-rewards-elite-credit-card/",
    "lastReviewedAt": "2026-05-18",
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
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle.",
      "Cap or timing language appears in the official earning categories: Choice category first year; Groceries and wholesale clubs; Other.",
      "First-year enhanced earning is account-age dependent; the app uses the account-opened date when a supported first-year rule is implemented.",
      "The 3% choice-category / 2% grocery and wholesale category has a combined $2,500 quarterly cap, then earns 1%; first-year 6% choice-category earning depends on account age."
    ],
    "cashbackCategories": [
      {
        "id": 422,
        "cardId": 107,
        "category": "Choice category first year",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 423,
        "cardId": 107,
        "category": "Groceries and wholesale clubs",
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
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.bankofamerica.com/credit-cards/products/cash-back-secured-credit-card/",
    "imageSourceUrl": "https://www.bankofamerica.com/credit-cards/products/cash-back-secured-credit-card/",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
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
        "description": "Annual statement credit for eligible airfare purchases.",
        "annualValue": 50
      },
      {
        "id": 382,
        "cardId": 108,
        "name": "Travel Protections",
        "description": "Includes travel and purchase protection benefits described in the card guide to benefits.",
        "annualValue": 150
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.wellsfargo.com/autograph-journey-visa-credit-card/",
    "imageSourceUrl": "https://creditcards.wellsfargo.com/autograph-journey-visa-credit-card/",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
  },
  {
    "id": 109,
    "name": "Wells Fargo Attune",
    "issuer": "Wells Fargo",
    "network": "Mastercard",
    "annualFee": 0,
    "signupBonus": "See issuer page for current public offer",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "annualValue": 100
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
    "sourceUrl": "https://creditcards.wellsfargo.com/attune-credit-card/",
    "imageSourceUrl": "https://creditcards.wellsfargo.com/attune-credit-card/",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
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
        "annualValue": 100
      },
      {
        "id": 387,
        "cardId": 110,
        "name": "Choice Hotel Rewards",
        "description": "Earns Choice Privileges points for hotel stays and everyday categories.",
        "annualValue": 80
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.wellsfargo.com/credit-cards/choice/terms/",
    "imageSourceUrl": "https://creditcards.wellsfargo.com/choice-privileges-credit-card/",
    "lastReviewedAt": "2026-05-18",
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
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle."
    ],
    "cashbackCategories": [
      {
        "id": 436,
        "cardId": 111,
        "category": "Relationship-tier purchases",
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
        "annualValue": 200
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
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 112,
    "name": "U.S. Bank Shopper Cash Rewards Visa Signature",
    "issuer": "U.S. Bank",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "$250 bonus after $2,000 spend in 120 days",
    "signupBonusValue": 250,
    "color": "linear-gradient(135deg, #7f1d1d, #f97316)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/112-u-s-bank-shopper-cash-rewards-visa-signature.png",
    "rewardType": "cashback",
    "rewardProgram": "U.S. Bank Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle.",
      "Retailer and everyday-category bonuses are subject to issuer quarterly spend caps before base earning applies.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
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
        "annualValue": 180
      },
      {
        "id": 391,
        "cardId": 112,
        "name": "Travel Center Bonus",
        "description": "Elevated cash back on eligible prepaid hotel and car reservations booked in the Rewards Center.",
        "annualValue": 60
      },
      {
        "id": 392,
        "cardId": 112,
        "name": "Intro First-Year Fee",
        "description": "Low annual fee structure with first-year intro treatment per issuer terms.",
        "annualValue": 95
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/credit-cards/shopper-cash-rewards-visa-signature-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/credit-cards/shopper-cash-rewards-visa-signature-credit-card.html",
    "lastReviewedAt": "2026-05-21",
    "dataConfidence": "official"
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
        "id": 442,
        "cardId": 113,
        "category": "Other",
        "rate": 0,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 393,
        "cardId": 113,
        "name": "Long Intro APR",
        "description": "Issuer markets the card for a long introductory APR period on purchases and balance transfers.",
        "annualValue": 120
      },
      {
        "id": 394,
        "cardId": 113,
        "name": "No Annual Fee Protection Card",
        "description": "No annual fee card with a protection-oriented benefit package.",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/credit-cards/visa-platinum-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/credit-cards/visa-platinum-credit-card.html",
    "lastReviewedAt": "2026-05-18",
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
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
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
        "annualValue": 200
      },
      {
        "id": 396,
        "cardId": 114,
        "name": "No Annual Fee",
        "description": "No annual fee and free employee cards.",
        "annualValue": 0
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/business-banking/business-credit-cards/business-triple-cash-back-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/business-banking/business-credit-cards/business-triple-cash-back-credit-card.html",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 115,
    "name": "U.S. Bank Business Leverage Visa Signature",
    "issuer": "U.S. Bank",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "Up to $600 in rewards after $6,000 spend in 120 days",
    "signupBonusValue": 600,
    "color": "linear-gradient(135deg, #111827, #0f3b70)",
    "logoUrl": "https://logo.clearbit.com/usbank.com",
    "cardImageUrl": "/card-images/115-u-s-bank-business-leverage-visa-signature.png",
    "rewardType": "cashback",
    "rewardProgram": "U.S. Bank Cash Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle.",
      "Cap or timing language appears in the official earning categories: Travel Center hotels and rental cars; Top two monthly business categories; Other.",
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
        "annualValue": 200
      },
      {
        "id": 398,
        "cardId": 115,
        "name": "No Foreign Transaction Fees",
        "description": "No foreign transaction fees on eligible international inventory, supply, or travel expenses.",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.usbank.com/business-banking/business-credit-cards/business-leverage-rewards-credit-card.html",
    "imageSourceUrl": "https://www.usbank.com/business-banking/business-credit-cards/business-leverage-rewards-credit-card.html",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
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
    "cardImageUrl": "/card-images/116-navy-federal-cashrewards-plus.avif",
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
        "annualValue": 75
      },
      {
        "id": 400,
        "cardId": 116,
        "name": "Balance Transfer Promo",
        "description": "Promotional balance transfer APR offer may apply to new accounts during the public offer period.",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.navyfederal.org/loans-cards/credit-cards/cash-rewards.html",
    "imageSourceUrl": "https://www.navyfederal.org/loans-cards/credit-cards/cash-rewards.html",
    "lastReviewedAt": "2026-05-18",
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
        "annualValue": 180
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
    "signupBonus": "35,000 bonus points after $3,500 spend in 90 days",
    "signupBonusValue": 350,
    "color": "linear-gradient(135deg, #111827, #0ea5e9)",
    "logoUrl": "https://logo.clearbit.com/navyfederal.org",
    "cardImageUrl": "/card-images/118-navy-federal-visa-signature-flagship-rewards.avif",
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
        "description": "Statement credit up to $120 for eligible trusted traveler application fees.",
        "annualValue": 120
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.navyfederal.org/loans-cards/credit-cards/flagship-visa-signature.html",
    "imageSourceUrl": "https://www.navyfederal.org/loans-cards/credit-cards/flagship-visa-signature.html",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
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
    "cardImageUrl": "/card-images/119-navy-federal-go-rewards.avif",
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
        "description": "Public offer centers on a low introductory purchase APR period.",
        "annualValue": 60
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
    "lastReviewedAt": "2026-05-18",
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
    "cardImageUrl": "/card-images/120-wyndham-rewards-earner-card.png",
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
        "id": 460,
        "cardId": 120,
        "category": "Wyndham hotels and gas",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 461,
        "cardId": 120,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 462,
        "cardId": 120,
        "category": "Groceries",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 463,
        "cardId": 120,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
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
        "description": "Earn anniversary bonus points after meeting annual spend requirements.",
        "annualValue": 45
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://corporate.wyndhamhotels.com/news-releases/barclays-and-wyndham-cater-to-road-trippers-and-road-warriors-with-new-wyndham-rewards-earner-cards-first-small-business-card/",
    "imageSourceUrl": "https://www.wyndhamrewardscreditcard.com/earner-card/",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 121,
    "name": "Wyndham Rewards Earner Business Card",
    "issuer": "Barclays / Wyndham Rewards",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "45,000 bonus points after $3,000 spend and paying the annual fee in 90 days",
    "signupBonusValue": 270,
    "color": "linear-gradient(135deg, #111827, #00a3e0)",
    "logoUrl": "https://logo.clearbit.com/wyndhamhotels.com",
    "cardImageUrl": "/card-images/121-wyndham-rewards-earner-business-card.png",
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
        "category": "Wyndham hotels and gas",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 465,
        "cardId": 121,
        "category": "Marketing, advertising, and utilities",
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
        "description": "Annual bonus points each account anniversary when requirements are met.",
        "annualValue": 90
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.wyndhamrewardscreditcard.com/earner-business-card/",
    "imageSourceUrl": "https://www.wyndhamrewardscreditcard.com/earner-business-card/",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 122,
    "name": "Hawaiian Airlines Business Mastercard",
    "issuer": "Barclays / Hawaiian Airlines",
    "network": "Mastercard",
    "annualFee": 99,
    "signupBonus": "50,000 bonus miles after $4,000 spend and paying the annual fee in 90 days",
    "signupBonusValue": 500,
    "color": "linear-gradient(135deg, #4c1d95, #ec4899)",
    "logoUrl": "https://logo.clearbit.com/hawaiianairlines.com",
    "cardImageUrl": "/card-images/122-hawaiian-airlines-business-mastercard.png",
    "rewardType": "miles",
    "rewardProgram": "HawaiianMiles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "HawaiianMiles value varies by itinerary and redemption path; this app uses an estimated 1.00 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "annualValue": 200
      },
      {
        "id": 412,
        "cardId": 122,
        "name": "Anniversary Bonus Miles",
        "description": "Opportunity to earn annual anniversary bonus miles based on spend.",
        "annualValue": 120
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.hawaiianairlines.com/hawaiianmiles2/credit-card-business",
    "imageSourceUrl": "https://www.hawaiianairlines.com/hawaiianmiles2/credit-card-business",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
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
    "cardImageUrl": "/card-images/123-hilton-honors-american-express-business.avif",
    "rewardType": "points",
    "rewardProgram": "Hilton Honors",
    "rewardUnitName": "Points",
    "rewardUnitValueCents": 0.5,
    "rewardValuationDescription": "Hilton Honors value varies by redemption; this app uses an estimated 0.50 cents per point for annual-fee progress while displaying earned points separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Hilton stays; Other eligible purchases before cap."
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
        "description": "Up to $240 back each year on eligible purchases made directly with properties in the Hilton portfolio.",
        "annualValue": 240
      },
      {
        "id": 414,
        "cardId": 123,
        "name": "Hilton Gold Status",
        "description": "Complimentary Hilton Honors Gold status.",
        "annualValue": 250
      },
      {
        "id": 415,
        "cardId": 123,
        "name": "Diamond Status Spend Path",
        "description": "Spend-based path to Hilton Honors Diamond status.",
        "annualValue": 150
      },
      {
        "id": 416,
        "cardId": 123,
        "name": "National Executive Status",
        "description": "Complimentary National Car Rental Emerald Club Executive status after enrollment.",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/hilton-honors/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/hilton-honors/",
    "lastReviewedAt": "2026-05-18",
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
    "cardImageUrl": "/card-images/124-marriott-bonvoy-business-american-express.avif",
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
        "annualValue": 100
      },
      {
        "id": 418,
        "cardId": 124,
        "name": "Marriott Gold Elite Status",
        "description": "Complimentary Marriott Bonvoy Gold Elite status.",
        "annualValue": 150
      },
      {
        "id": 419,
        "cardId": 124,
        "name": "Free Night Award",
        "description": "Annual Free Night Award after renewal when requirements are met.",
        "annualValue": 250
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/amex-marriott-bonvoy-business-credit-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/amex-marriott-bonvoy-business-credit-card/",
    "lastReviewedAt": "2026-05-18",
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
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
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
        "category": "Social media and search advertising",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 480,
        "cardId": 125,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 420,
        "cardId": 125,
        "name": "$300 Annual Travel Credit",
        "description": "Annual travel statement credit on eligible purchases.",
        "annualValue": 300
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
        "description": "Statement credits for eligible stays with The Edit through Chase Travel.",
        "annualValue": 500
      },
      {
        "id": 423,
        "cardId": 125,
        "name": "Business Travel Credits",
        "description": "Additional advertised travel and business credits can exceed $3,000 in annual value when fully used.",
        "annualValue": 1000
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/sapphire/reserve",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/sapphire/reserve",
    "lastReviewedAt": "2026-05-18",
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
        "annualValue": 75
      },
      {
        "id": 425,
        "cardId": 126,
        "name": "Global Entry / TSA PreCheck Benefit",
        "description": "Earn up to $100 in reward points for an eligible Global Entry or TSA PreCheck application fee.",
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.fidelity.com/spend-save/visa-signature-card",
    "imageSourceUrl": "https://www.fidelity.com/spend-save/visa-signature-card",
    "lastReviewedAt": "2026-05-18",
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
    "cardImageUrl": "/card-images/127-sofi-unlimited-2-percent-credit-card.png",
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
        "annualValue": 50
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
    "cardImageUrl": "/card-images/128-sofi-everyday-cash-rewards-credit-card.png",
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
        "annualValue": 120
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
    "cardImageUrl": "/card-images/129-venmo-visa-signature-credit-card.png",
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
        "annualValue": 120
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
        "annualValue": 75
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
    "cardImageUrl": "/card-images/131-wells-fargo-signify-business-cash.jpg",
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
        "annualValue": 200
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
    "cardImageUrl": "/card-images/132-wells-fargo-one-key-card.png",
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
        "description": "No-annual-fee One Key cardholders receive automatic Silver tier benefits in the One Key program.",
        "annualValue": 75
      },
      {
        "id": 603,
        "cardId": 132,
        "name": "No Foreign Transaction Fees",
        "description": "Issuer materials list no foreign transaction fees.",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://newsroom.wf.com/news-releases/news-details/2024/Expedia-Group-Wells-Fargo-and-Mastercard-announce-new-suite-of-One-Key-credit-cards/default.aspx",
    "imageSourceUrl": "https://www.wellsfargo.com/credit-cards/agreements/?lang=en",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 133,
    "name": "Wells Fargo One Key+ Card",
    "issuer": "Wells Fargo",
    "network": "Mastercard",
    "annualFee": 99,
    "signupBonus": "See issuer page for current OneKeyCash offer",
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
        "description": "Earn $100 in OneKeyCash each cardholder anniversary according to issuer launch materials.",
        "annualValue": 100
      },
      {
        "id": 605,
        "cardId": 133,
        "name": "Trusted Traveler Credit",
        "description": "Eligible cardholders can receive a statement credit toward Global Entry or TSA PreCheck.",
        "annualValue": 25
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://newsroom.wf.com/news-releases/news-details/2024/Expedia-Group-Wells-Fargo-and-Mastercard-announce-new-suite-of-One-Key-credit-cards/default.aspx",
    "imageSourceUrl": "https://www.wellsfargo.com/credit-cards/guide-to-benefits/onekeyplus/",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
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
    "cardImageUrl": "/card-images/134-capital-one-spark-cash-plus.avif",
    "rewardType": "cashback",
    "rewardProgram": "Capital One Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Capital One Business Travel; Other.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 503,
        "cardId": 134,
        "category": "Capital One Business Travel",
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
        "annualValue": 150
      },
      {
        "id": 607,
        "cardId": 134,
        "name": "No Preset Spending Limit",
        "description": "Pay-in-full business card with flexible spend capacity based on account behavior.",
        "annualValue": 150
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash-plus/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash-plus/",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 135,
    "name": "Capital One Spark Cash Select for Business",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "$750 cash bonus after $6,000 spend in the first 3 months",
    "signupBonusValue": 750,
    "color": "linear-gradient(135deg, #991b1b, #60a5fa)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/135-capital-one-spark-cash-select-for-business.avif",
    "rewardType": "cashback",
    "rewardProgram": "Capital One Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Capital One Business Travel; Other.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 505,
        "cardId": 135,
        "category": "Capital One Business Travel",
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
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash-select/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash-select/",
    "lastReviewedAt": "2026-05-18",
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
        "annualValue": 100
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
    "cardImageUrl": "/card-images/137-aaa-daily-advantage-visa-signature.png",
    "rewardType": "cashback",
    "rewardProgram": "AAA Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 512,
        "cardId": 137,
        "category": "Groceries",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 513,
        "cardId": 137,
        "category": "Gas / EV Charging",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 514,
        "cardId": 137,
        "category": "Wholesale Clubs",
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
      }
    ],
    "benefits": [
      {
        "id": 612,
        "cardId": 137,
        "name": "No Annual or Foreign Transaction Fees",
        "description": "AAA advertises no annual fee and no foreign transaction fees for the Daily Advantage card.",
        "annualValue": 75
      },
      {
        "id": 613,
        "cardId": 137,
        "name": "High Grocery Earn Rate",
        "description": "Best suited for grocery-heavy users, subject to published reward terms and caps.",
        "annualValue": 180
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://mwg.aaa.com/credit-card",
    "imageSourceUrl": "https://mwg.aaa.com/credit-card",
    "lastReviewedAt": "2026-05-21",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 517,
        "cardId": 138,
        "category": "Gas / EV Charging",
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
        "annualValue": 75
      },
      {
        "id": 615,
        "cardId": 138,
        "name": "High Gas and EV Earn Rate",
        "description": "Best suited for gas and EV charging spend, subject to published reward terms and caps.",
        "annualValue": 160
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://mwg.aaa.com/credit-card",
    "imageSourceUrl": "https://mwg.aaa.com/credit-card",
    "lastReviewedAt": "2026-05-21",
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
    "cardImageUrl": "/card-images/139-fnbo-evergreen-rewards-visa.png",
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
        "annualValue": 200
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
    "cardImageUrl": "/card-images/140-fnbo-getaway.png",
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
        "annualValue": 50
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
        "annualValue": 100
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
        "annualValue": 180
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
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
    "cardImageUrl": "/card-images/144-td-cash-credit-card.png",
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
        "annualValue": 150
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
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
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
        "annualValue": 75
      },
      {
        "id": 629,
        "cardId": 145,
        "name": "No Late or Foreign Transaction Fees",
        "description": "TD lists no late payment fee and no foreign transaction fee for TD Clear.",
        "annualValue": 50
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
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/secured-credit-card/",
    "imageSourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/secured-credit-card/",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
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
        "annualValue": 200
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
    "sourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/no-annual-fee",
    "imageSourceUrl": "https://www.td.com/us/en/personal-banking/credit-cards/no-annual-fee",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 148,
    "name": "CitiBusiness / AAdvantage Business World Elite Mastercard",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.citi.com/credit-cards/citibusiness-aadvantage-platinum-select-credit-card/",
    "imageSourceUrl": "https://www.citi.com/credit-cards/citibusiness-aadvantage-platinum-select-credit-card/",
    "lastReviewedAt": "2026-05-18",
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
    "cardImageUrl": "/card-images/149-bread-cashback-american-express.avif",
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
        "annualValue": 200
      },
      {
        "id": 637,
        "cardId": 149,
        "name": "No Annual or Foreign Transaction Fees",
        "description": "Bread Cashback is advertised with no annual fee and no foreign transaction fees.",
        "annualValue": 75
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
    "cardImageUrl": "/card-images/150-american-express-graphite-business-cash-unlimited.avif",
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
        "annualValue": 300
      },
      {
        "id": 639,
        "cardId": 150,
        "name": "One AP Statement Credit",
        "description": "Unlock up to $2,400 in American Express One AP statement credits for the following calendar year after meeting the annual eligible-spend threshold.",
        "annualValue": 400
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/graphite-business-cash-unlimited-card/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/graphite-business-cash-unlimited-card/",
    "lastReviewedAt": "2026-05-21",
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
        "annualValue": 50
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
    "cardImageUrl": "/card-images/152-delta-skymiles-gold-business-american-express.avif",
    "rewardType": "miles",
    "rewardProgram": "Delta SkyMiles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.1,
    "rewardValuationDescription": "Delta SkyMiles value varies by itinerary and redemption path; this app uses an estimated 1.10 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "IHG's official marketing may show a higher total hotel earn rate by adding base IHG One Rewards points and elite-status bonus points; this app calculates only the credit-card earn rate."
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
        "category": "U.S. shipping",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 558,
        "cardId": 152,
        "category": "U.S. advertising",
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
        "id": 642,
        "cardId": 152,
        "name": "First Checked Bag Free",
        "description": "First checked bag free on eligible Delta flights for the cardholder and eligible companions on the reservation.",
        "annualValue": 160
      },
      {
        "id": 643,
        "cardId": 152,
        "name": "$200 Delta Flight Credit",
        "description": "Earn a Delta flight credit after meeting the annual eligible purchase threshold.",
        "annualValue": 200
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-gold-business-credit-card-amex/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-gold-business-credit-card-amex/",
    "lastReviewedAt": "2026-05-18",
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
    "cardImageUrl": "/card-images/153-delta-skymiles-platinum-business-american-express.avif",
    "rewardType": "miles",
    "rewardProgram": "Delta SkyMiles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1.1,
    "rewardValuationDescription": "Delta SkyMiles value varies by itinerary and redemption path; this app uses an estimated 1.10 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Large-purchase bonus rates apply only to transactions meeting the listed minimum purchase amount."
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
        "category": "U.S. shipping",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 564,
        "cardId": 153,
        "category": "Large purchases $5k+",
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
        "description": "Annual companion certificate for eligible domestic, Caribbean, or Central American round-trip flights after renewal.",
        "annualValue": 250
      },
      {
        "id": 645,
        "cardId": 153,
        "name": "MQD Headstart and Boost",
        "description": "Business card includes Delta Medallion qualification support through MQD Headstart and eligible spend boosts.",
        "annualValue": 150
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-platinum-business-credit-card-amex/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-platinum-business-credit-card-amex/",
    "lastReviewedAt": "2026-05-18",
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
    "cardImageUrl": "/card-images/154-delta-skymiles-reserve-business-american-express.avif",
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
        "annualValue": 500
      },
      {
        "id": 647,
        "cardId": 154,
        "name": "Annual Companion Certificate",
        "description": "Annual companion certificate for eligible domestic, Caribbean, or Central American round-trip flights after renewal.",
        "annualValue": 350
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-reserve-business-credit-card-amex/",
    "imageSourceUrl": "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-reserve-business-credit-card-amex/",
    "lastReviewedAt": "2026-05-21",
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
    "cardImageUrl": "/card-images/155-capital-one-ventureone-business.avif",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Capital One Business Travel hotels and rental cars; Other.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 568,
        "cardId": 155,
        "category": "Capital One Business Travel hotels and rental cars",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 569,
        "cardId": 155,
        "category": "Other",
        "rate": 0.0125,
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
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/ventureone-business/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/ventureone-business/",
    "lastReviewedAt": "2026-05-18",
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
    "cardImageUrl": "/card-images/156-capital-one-spark-2-cash.avif",
    "rewardType": "cashback",
    "rewardProgram": "Capital One Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Hotels and rental cars through Capital One Travel; Other.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
    ],
    "cashbackCategories": [
      {
        "id": 570,
        "cardId": 156,
        "category": "Hotels and rental cars through Capital One Travel",
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
        "annualValue": 200
      },
      {
        "id": 651,
        "cardId": 156,
        "name": "Free Employee Cards",
        "description": "Capital One advertises free employee cards and spend management tools.",
        "annualValue": 75
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-cash/",
    "lastReviewedAt": "2026-05-18",
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
    "cardImageUrl": "/card-images/157-capital-one-spark-1-classic.avif",
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
    "name": "IHG One Rewards Premier Business",
    "issuer": "Chase / IHG",
    "network": "Mastercard",
    "annualFee": 99,
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
      "IHG's official marketing may show a higher total hotel earn rate by adding base IHG One Rewards points and elite-status bonus points; this app calculates only the credit-card earn rate."
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
        "category": "Travel",
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
      }
    ],
    "benefits": [
      {
        "id": 654,
        "cardId": 158,
        "name": "Anniversary Free Night",
        "description": "Annual reward night after each account anniversary, subject to IHG point-cap terms.",
        "annualValue": 200
      },
      {
        "id": 655,
        "cardId": 158,
        "name": "IHG Platinum Elite Status",
        "description": "Automatic IHG One Rewards Platinum Elite status while the account remains open.",
        "annualValue": 150
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/ihg/business-premier",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/ihg/business-premier",
    "lastReviewedAt": "2026-05-21",
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
        "rate": 0.05,
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
        "id": 580,
        "cardId": 159,
        "category": "Travel",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 581,
        "cardId": 159,
        "category": "Dining",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 582,
        "cardId": 159,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 656,
        "cardId": 159,
        "name": "United Club Membership",
        "description": "Primary cardmember United Club membership while the account is open, subject to United Club terms.",
        "annualValue": 650
      },
      {
        "id": 657,
        "cardId": 159,
        "name": "Free Checked Bags",
        "description": "First and second checked bags free on eligible United-operated flights when requirements are met.",
        "annualValue": 320
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://creditcards.chase.com/business-credit-cards/united/united-club-business",
    "imageSourceUrl": "https://creditcards.chase.com/business-credit-cards/united/united-club-business",
    "lastReviewedAt": "2026-05-21",
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
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle."
    ],
    "cashbackCategories": [
      {
        "id": 583,
        "cardId": 160,
        "category": "Selected business category",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 584,
        "cardId": 160,
        "category": "Dining",
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
        "annualValue": 150
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
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
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
        "annualValue": 150
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
        "category": "Bank of America Travel Center",
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
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://business.bankofamerica.com/en/credit-cards/business-advantage-travel-rewards",
    "imageSourceUrl": "https://business.bankofamerica.com/en/credit-cards/business-advantage-travel-rewards",
    "lastReviewedAt": "2026-05-18",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 589,
        "cardId": 163,
        "category": "Amazon Business / Amazon.com / AWS / Whole Foods",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 590,
        "cardId": 163,
        "category": "Gas / EV Charging",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 591,
        "cardId": 163,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 592,
        "cardId": 163,
        "category": "Wireless Services",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 593,
        "cardId": 163,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 664,
        "cardId": 163,
        "name": "5% Back or 90-Day Terms",
        "description": "Eligible Prime Business users can choose 5% back or 90-day payment terms on eligible Amazon Business, Amazon.com, AWS, and Whole Foods Market purchases.",
        "annualValue": 250
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
    "sourceUrl": "https://www.amazon.com/businesscard",
    "imageSourceUrl": "https://www.amazon.com/businesscard",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 594,
        "cardId": 164,
        "category": "Amazon Business / Amazon.com / AWS / Whole Foods",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 595,
        "cardId": 164,
        "category": "Gas / EV Charging",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 596,
        "cardId": 164,
        "category": "Restaurants",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 597,
        "cardId": 164,
        "category": "Wireless Services",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 598,
        "cardId": 164,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 666,
        "cardId": 164,
        "name": "3% Back or 60-Day Terms",
        "description": "Eligible non-Prime business cardholders can choose 3% back or 60-day payment terms on eligible Amazon Business, Amazon.com, AWS, and Whole Foods Market purchases.",
        "annualValue": 150
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
    "sourceUrl": "https://www.amazon.com/businesscard",
    "imageSourceUrl": "https://www.amazon.com/businesscard",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "official"
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
    "rewardProgram": "Lowe's Business Rewards",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 601,
        "cardId": 165,
        "category": "Office supplies",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 602,
        "cardId": 165,
        "category": "Wireless",
        "rate": 0.03,
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
        "annualValue": 180
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
    "sourceUrl": "https://www.lowes.com/l/Credit/business-credit-center",
    "imageSourceUrl": "https://www.lowes.com/l/Credit/business-credit-center",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 166,
    "name": "Capital One Spark 2X Miles",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 95,
    "signupBonus": "50,000 miles after $4,500 spend in the first 3 months",
    "signupBonusValue": 500,
    "color": "linear-gradient(135deg, #0f172a, #38bdf8)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/166-capital-one-spark-2x-miles.avif",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Hotels and rental cars through Capital One Business Travel; Other.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
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
        "annualValue": 120
      },
      {
        "id": 671,
        "cardId": 166,
        "name": "Transferable Business Miles",
        "description": "Earns Capital One miles that can be redeemed for travel or transferred to Capital One travel partners.",
        "annualValue": 150
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-miles/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-miles/",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 167,
    "name": "Capital One Spark 1.5X Miles Select",
    "issuer": "Capital One",
    "network": "Visa",
    "annualFee": 0,
    "signupBonus": "50,000 miles after $4,500 spend in the first 3 months",
    "signupBonusValue": 500,
    "color": "linear-gradient(135deg, #1e3a8a, #93c5fd)",
    "logoUrl": "https://logo.clearbit.com/capitalone.com",
    "cardImageUrl": "/card-images/167-capital-one-spark-1-5x-miles-select.avif",
    "rewardType": "miles",
    "rewardProgram": "Capital One Miles",
    "rewardUnitName": "Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Capital One miles are modeled at 1 cent per mile for travel purchase cover and travel bookings; transfer-partner value may differ.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Hotels and rental cars through Capital One Business Travel; Other.",
      "Travel bonus rates require the booking channel named in the category; direct bookings and portal bookings may earn different rates."
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
        "annualValue": 100
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-miles-select/",
    "imageSourceUrl": "https://www.capitalone.com/small-business/credit-cards/spark-miles-select/",
    "lastReviewedAt": "2026-05-18",
    "dataConfidence": "official"
  },
  {
    "id": 168,
    "name": "Atmos Rewards Visa Signature Business",
    "issuer": "Bank of America / Alaska Airlines",
    "network": "Visa",
    "annualFee": 70,
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
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
        "description": "Annual $99 companion fare plus taxes and fees after meeting the eligible anniversary-year spend requirement.",
        "annualValue": 250
      },
      {
        "id": 675,
        "cardId": 168,
        "name": "Free Checked Bag and Preferred Boarding",
        "description": "Free checked bag and preferred boarding benefits when the card is used to purchase eligible Alaska Airlines or Hawaiian Airlines tickets.",
        "annualValue": 180
      }
    ],
    "inWallet": false,
    "market": "US",
    "currency": "USD",
    "sourceUrl": "https://business.bankofamerica.com/en/credit-cards/atmos-rewards",
    "imageSourceUrl": "https://business.bankofamerica.com/en/credit-cards/atmos-rewards",
    "lastReviewedAt": "2026-05-18",
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
        "annualValue": 75
      },
      {
        "id": 677,
        "cardId": 169,
        "name": "No Foreign Transaction Fees",
        "description": "BECU states there are no foreign transaction fees on the current Cash Back Visa.",
        "annualValue": 50
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
        "annualValue": 100
      },
      {
        "id": 679,
        "cardId": 170,
        "name": "No Annual, Cash Advance, or Foreign Transaction Fees",
        "description": "BECU advertises no annual fee, no cash advance fees, and no foreign transaction fees.",
        "annualValue": 75
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
    "cardImageUrl": "/card-images/171-hsbc-red-credit-card.jpg",
    "rewardType": "cashback",
    "rewardProgram": "HSBC RewardCash",
    "rewardUnitName": "RewardCash",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 615,
        "cardId": 171,
        "category": "Designated Merchants",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 616,
        "cardId": 171,
        "category": "Online and Mobile Payment",
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
        "id": 680,
        "cardId": 171,
        "name": "Perpetual Annual Fee Waiver",
        "description": "HSBC advertises a perpetual annual fee waiver for the Red Credit Card.",
        "annualValue": 0
      },
      {
        "id": 681,
        "cardId": 171,
        "name": "RewardCash Multipliers",
        "description": "Elevated RewardCash categories are available on eligible online, mobile payment, and designated merchant spending, subject to caps and terms.",
        "annualValue": 400
      }
    ],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www.hsbc.com.hk/credit-cards/products/red/",
    "imageSourceUrl": "https://www.hsbc.com.hk/credit-cards/products/red/",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "needs-review"
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
    "cardImageUrl": "/card-images/172-hsbc-visa-signature-card.png",
    "rewardType": "cashback",
    "rewardProgram": "HSBC RewardCash",
    "rewardUnitName": "RewardCash",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle."
    ],
    "cashbackCategories": [
      {
        "id": 618,
        "cardId": 172,
        "category": "Selected Lifestyle and Overseas Spend",
        "rate": 0.024,
        "isDefault": false
      },
      {
        "id": 619,
        "cardId": 172,
        "category": "Other",
        "rate": 0.004,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 682,
        "cardId": 172,
        "name": "Visa Signature Privileges",
        "description": "Visa Signature travel, dining, and lifestyle privileges are advertised with the current card program.",
        "annualValue": 500
      },
      {
        "id": 683,
        "cardId": 172,
        "name": "Intro Annual Fee Waiver",
        "description": "HSBC advertises a first 2-year annual fee waiver for eligible applicants.",
        "annualValue": 2000
      }
    ],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www.hsbc.com.hk/credit-cards/products/visa-signature/",
    "imageSourceUrl": "https://www.hsbc.com.hk/credit-cards/products/visa-signature/",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "needs-review"
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
    "cardImageUrl": "/card-images/173-standard-chartered-cathay-mastercard.png",
    "rewardType": "miles",
    "rewardProgram": "Asia Miles",
    "rewardUnitName": "Asia Miles",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Asia Miles value varies by itinerary and redemption path; this app uses an estimated 1.00 cents per mile for annual-fee progress while displaying earned miles separately.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 620,
        "cardId": 173,
        "category": "Cathay and Travel",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 621,
        "cardId": 173,
        "category": "Dining and Online",
        "rate": 0.015,
        "isDefault": false
      },
      {
        "id": 622,
        "cardId": 173,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 684,
        "cardId": 173,
        "name": "Asia Miles Welcome Offer",
        "description": "Standard Chartered advertises up to 40,000 Asia Miles for eligible new cardholders, subject to terms.",
        "annualValue": 3200
      },
      {
        "id": 685,
        "cardId": 173,
        "name": "Cathay Membership Benefits",
        "description": "Cathay-focused benefits include mileage earning and status-point related promotions, subject to eligibility and current campaign terms.",
        "annualValue": 1000
      }
    ],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www.sc.com/hk/credit-cards/cathay/?intcid=cardcategory_Jul21-hk-cxam_en",
    "imageSourceUrl": "https://www.sc.com/hk/credit-cards/cathay/?intcid=cardcategory_Jul21-hk-cxam_en",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "needs-review"
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
    "rewardProgram": "Hang Seng Cash Dollars",
    "rewardUnitName": "Cash Dollars",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle."
    ],
    "cashbackCategories": [
      {
        "id": 623,
        "cardId": 174,
        "category": "Selected Spending",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 624,
        "cardId": 174,
        "category": "Other",
        "rate": 0.004,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 686,
        "cardId": 174,
        "name": "Perpetual Annual Fee Waiver",
        "description": "Hang Seng advertises a perpetual annual fee waiver for MMPOWER World Mastercard.",
        "annualValue": 0
      },
      {
        "id": 687,
        "cardId": 174,
        "name": "+FUN Dollars Offers",
        "description": "The card currently highlights up to 8% +FUN Dollars on eligible categories and promotional welcome rewards.",
        "annualValue": 800
      }
    ],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www.hangseng.com/personal/cards/products/mmpower-card/",
    "imageSourceUrl": "https://www.hangseng.com/personal/cards/products/mmpower-card/",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "needs-review"
  },
  {
    "id": 175,
    "name": "DBS Black World Mastercard",
    "issuer": "DBS Hong Kong",
    "network": "Mastercard",
    "annualFee": 2000,
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
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle."
    ],
    "cashbackCategories": [
      {
        "id": 625,
        "cardId": 175,
        "category": "Selected Online and Overseas Spend",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 626,
        "cardId": 175,
        "category": "Other",
        "rate": 0.004,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 688,
        "cardId": 175,
        "name": "Black Card Mastercard Benefits",
        "description": "DBS Black World Mastercard is positioned around Mastercard World privileges and rewards on eligible spending.",
        "annualValue": 500
      },
      {
        "id": 689,
        "cardId": 175,
        "name": "Travel and Lifestyle Offers",
        "description": "Issuer page links current DBS cardholder offers, which can vary by campaign period.",
        "annualValue": 500
      }
    ],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www.dbs.com.hk/personal/credit-cards/credit-cards/black-mc?pid=hk-personal-en-card-comparator-blackMC",
    "imageSourceUrl": "https://www.dbs.com.hk/personal/credit-cards/credit-cards/black-mc?pid=hk-personal-en-card-comparator-blackMC",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "needs-review"
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 627,
        "cardId": 176,
        "category": "Dining",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 628,
        "cardId": 176,
        "category": "Hotel Stays",
        "rate": 0.02,
        "isDefault": false
      },
      {
        "id": 629,
        "cardId": 176,
        "category": "Other",
        "rate": 0.01,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 690,
        "cardId": 176,
        "name": "Simple Cash Back Structure",
        "description": "Citi positions the card around cash back on eligible dining, hotel, and everyday spending.",
        "annualValue": 500
      },
      {
        "id": 691,
        "cardId": 176,
        "name": "Citi Merchant Offers",
        "description": "Citi Hong Kong publishes rotating merchant offers and cardholder promotions on the issuer page.",
        "annualValue": 500
      }
    ],
    "inWallet": false,
    "market": "Hong Kong",
    "currency": "HKD",
    "sourceUrl": "https://www.citibank.com.hk/english/credit-cards/cash-back-card",
    "imageSourceUrl": "https://www.citibank.com.hk/english/credit-cards/cash-back-card",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "needs-review"
  },
  {
    "id": 177,
    "name": "DBS Live Fresh Visa",
    "issuer": "DBS Singapore",
    "network": "Visa",
    "annualFee": 196.2,
    "signupBonus": "See issuer page for current welcome gift",
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 630,
        "cardId": 177,
        "category": "Online Spend",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 631,
        "cardId": 177,
        "category": "Contactless Spend",
        "rate": 0.05,
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
    "benefits": [
      {
        "id": 692,
        "cardId": 177,
        "name": "Online and Contactless Cashback",
        "description": "DBS advertises elevated cashback for eligible online and contactless spend, subject to minimum spend and caps.",
        "annualValue": 300
      },
      {
        "id": 693,
        "cardId": 177,
        "name": "Eco-Positioned Card",
        "description": "Live Fresh is positioned as a lifestyle card for digital and contactless everyday spending.",
        "annualValue": 50
      }
    ],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.dbs.com.sg/personal/cards/credit-cards/live-fresh-dbs-visa-paywave-platinum-card",
    "imageSourceUrl": "https://www.dbs.com.sg/personal/cards/credit-cards/live-fresh-dbs-visa-paywave-platinum-card",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "needs-review"
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
    "cardImageUrl": "/card-images/178-uob-one-card.png",
    "rewardType": "cashback",
    "rewardProgram": "UOB Cashback",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category.",
      "Cap or timing language appears in the official earning categories: Daily Spend Bonus Categories; Quarterly Cashback Tiers; Other.",
      "UOB One cashback depends on quarterly spend tiers and eligible merchant/category rules; statement-cycle timing is important."
    ],
    "cashbackCategories": [
      {
        "id": 633,
        "cardId": 178,
        "category": "Daily Spend Bonus Categories",
        "rate": 0.1,
        "isDefault": false
      },
      {
        "id": 634,
        "cardId": 178,
        "category": "Quarterly Cashback Tiers",
        "rate": 0.033,
        "isDefault": false
      },
      {
        "id": 635,
        "cardId": 178,
        "category": "Other",
        "rate": 0.001,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 694,
        "cardId": 178,
        "name": "Tiered Quarterly Cashback",
        "description": "UOB One Card uses quarterly cashback tiers and additional daily spend categories, subject to current terms.",
        "annualValue": 300
      },
      {
        "id": 695,
        "cardId": 178,
        "name": "Campaign Cashback Offers",
        "description": "UOB advertises time-limited enhanced cashback campaigns on the official card page.",
        "annualValue": 200
      }
    ],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.uob.com.sg/personal/cards/cashback/one-card.page",
    "imageSourceUrl": "https://www.uob.com.sg/personal/cards/cashback/one-card.page",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "needs-review"
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
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 636,
        "cardId": 179,
        "category": "Dining and Food Delivery",
        "rate": 0.05,
        "isDefault": false
      },
      {
        "id": 637,
        "cardId": 179,
        "category": "Streaming, Watsons, and EV Charging",
        "rate": 0.03,
        "isDefault": false
      },
      {
        "id": 638,
        "cardId": 179,
        "category": "Other",
        "rate": 0.003,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 696,
        "cardId": 179,
        "name": "Everyday Cashback Categories",
        "description": "OCBC advertises cashback on dining, food delivery, streaming, Watsons, and EV charging categories, subject to monthly caps.",
        "annualValue": 300
      },
      {
        "id": 697,
        "cardId": 179,
        "name": "Intro Fee Waiver",
        "description": "OCBC advertises the first 2 years annual fee waiver for the 365 Credit Card.",
        "annualValue": 196.2
      }
    ],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.ocbc.com/personal-banking/cards/365-cashback-credit-card",
    "imageSourceUrl": "https://www.ocbc.com/personal-banking/cards/365-cashback-credit-card",
    "lastReviewedAt": "2026-05-19",
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
    "cardImageUrl": "/card-images/180-hsbc-revolution-credit-card.png",
    "rewardType": "points",
    "rewardProgram": "HSBC Reward Points",
    "rewardUnitName": "Reward Points",
    "rewardUnitValueCents": 0.4,
    "rewardValuationDescription": "HSBC Revolution rewards are modeled from the app catalog cash-equivalent earning rate; official point-to-mile/cash value varies by redemption.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 639,
        "cardId": 180,
        "category": "Eligible Online and Contactless Spend",
        "rate": 0.04,
        "isDefault": false
      },
      {
        "id": 640,
        "cardId": 180,
        "category": "Other",
        "rate": 0.004,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 698,
        "cardId": 180,
        "name": "Annual Fee Waiver",
        "description": "HSBC states it is waiving the HSBC Revolution Credit Card annual fee.",
        "annualValue": 0
      },
      {
        "id": 699,
        "cardId": 180,
        "name": "Reward Points Offer",
        "description": "HSBC advertises a 42,000 Reward points welcome offer, subject to current terms.",
        "annualValue": 210
      }
    ],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.hsbc.com.sg/credit-cards/products/revolution/",
    "imageSourceUrl": "https://www.hsbc.com.sg/credit-cards/products/revolution/",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "needs-review"
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
    "cardImageUrl": "/card-images/181-citi-cash-back-card-singapore.png",
    "rewardType": "cashback",
    "rewardProgram": "Citi Cash Back",
    "rewardUnitName": "Cash Back",
    "rewardUnitValueCents": 1,
    "rewardValuationDescription": "Cash-back and cash-equivalent rewards are valued at face value for annual-fee progress.",
    "rewardRuleNotes": [
      "Issuer merchant coding and current product terms control whether a purchase qualifies for the listed bonus category."
    ],
    "cashbackCategories": [
      {
        "id": 641,
        "cardId": 181,
        "category": "Petrol and Private Commute",
        "rate": 0.08,
        "isDefault": false
      },
      {
        "id": 642,
        "cardId": 181,
        "category": "Dining and Groceries",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 643,
        "cardId": 181,
        "category": "Other",
        "rate": 0.0025,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 700,
        "cardId": 181,
        "name": "High Everyday Cashback",
        "description": "Citi advertises elevated cashback on eligible petrol, private commute, dining, and grocery spend, subject to minimum spend and caps.",
        "annualValue": 300
      },
      {
        "id": 701,
        "cardId": 181,
        "name": "Welcome Cashback",
        "description": "Citi advertises a S$300 cashback welcome offer for eligible applicants.",
        "annualValue": 300
      }
    ],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www1.citibank.com.sg/credit-cards/cashback/citi-cash-back-card",
    "imageSourceUrl": "https://www1.citibank.com.sg/credit-cards/cashback/citi-cash-back-card",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "needs-review"
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
      "Selected, top-spend, or relationship-tier categories depend on issuer selection rules and may reset monthly, quarterly, or by billing cycle."
    ],
    "cashbackCategories": [
      {
        "id": 644,
        "cardId": 182,
        "category": "Selected Digital and Everyday Merchants",
        "rate": 0.06,
        "isDefault": false
      },
      {
        "id": 645,
        "cardId": 182,
        "category": "Other",
        "rate": 0.003,
        "isDefault": true
      }
    ],
    "benefits": [
      {
        "id": 702,
        "cardId": 182,
        "name": "Low Annual Fee",
        "description": "Standard Chartered lists the annual fee as S$91 before 9% GST, with first-year fee waiver terms on the official page.",
        "annualValue": 99.19
      },
      {
        "id": 703,
        "cardId": 182,
        "name": "Smart Card Merchant Offers",
        "description": "The Smart Credit Card focuses on selected digital and everyday merchant cashback, subject to current issuer terms.",
        "annualValue": 120
      }
    ],
    "inWallet": false,
    "market": "Singapore",
    "currency": "SGD",
    "sourceUrl": "https://www.sc.com/sg/credit-cards/smart-credit-card/",
    "imageSourceUrl": "https://www.sc.com/sg/credit-cards/smart-credit-card/",
    "lastReviewedAt": "2026-05-19",
    "dataConfidence": "needs-review"
  }
] satisfies VerifiedCreditCard[];
