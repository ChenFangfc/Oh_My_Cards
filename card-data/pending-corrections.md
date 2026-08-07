# Pending card-data corrections

Generated 2026-08-06 from a 159-agent verification pass over all 182 cards.
Each item was proposed by a research agent and then independently re-confirmed
against the issuer page by a second agent.

## What was already applied

`card-data/patch-2026-08-06.json` applied the *structural* corrections: 12
availability changes, 3 annual fees, 2 renames, 2 issuer changes, 5 sourceUrl
fixes, and the 2026-06-15 Chase Sapphire Preferred refresh. Those change what
the app tells you about a card's identity and cost.

## Why the rest is queued rather than applied

The remaining items are almost entirely bonus-category rates and benefit
values. Applying them now would be **mostly inert**: `getCashbackCategory()`
matches transaction categories against catalog category names by exact string
equality, and 314 of 446 bonus categories already fail to match the app's
11-item category picker. Correcting a rate on a category the engine can never
select changes nothing a user would see.

Fix the category matching first (`docs/audit-2026-08.md`, the critical finding
at `local-first.ts:699`), then work this queue — at that point every correction
below has real effect.

Signup-bonus items are listed for completeness but should **not** be
auto-tracked: public offers rotate weekly and are heavily affiliate-inflated.

## Queue: 288 corrections across 110 cards

### #1 Chase Sapphire Preferred (3)

- **cashbackCategories** — ADD category "Lyft" at rate 0.05 (5x total points on Lyft rides through 9/30/2027). Listed on the issuer product page; separate from the calibration items already confirmed.
  - catalog today: No Lyft category
  - issuer-official / high confidence
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred
- **cashbackCategories** — ADD category "Peloton Equipment and Accessories" at rate 0.05 (5x total points on eligible Peloton equipment/accessory purchases through 12/31/2027).
  - catalog today: No Peloton category
  - issuer-official / high confidence
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred
- **benefits** — ADD benefit "Complimentary Apple TV Subscription (1 year)" annualValue 156 — part of the 2026-06-15 refresh; must be activated by 12/31/2026. (Supplements the calibration list, which did not include it.)
  - catalog today: No Apple TV benefit
  - issuer-official / high confidence · effective 2026-06-15
  - https://media.chase.com/news/Meet-the-New-Chase-Sapphire-Preferred
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred

### #2 Chase Sapphire Reserve (9)

- **benefits** — ADD benefit "The Edit Hotel Credit" annualValue 500 — up to $250 per booking, up to $500 per calendar year (semi-annual: up to $250 Jan-Jun and $250 Jul-Dec) for stays booked with The Edit through Chase Travel.
  - catalog today: No "The Edit" credit listed
  - issuer-official / high confidence · effective 2025-06
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve
- **benefits** — ADD benefit "$250 Select Chase Travel Hotels Credit" annualValue 250 — up to $250 in statement credits on prepaid two-night-minimum bookings at IHG, Montage, Pendry, Omni, Virgin, Minor and Pan Pacific through Chase Travel. 2026 calendar year only, expires 12/31/2026 (not permanent).
  - catalog today: No select-hotels credit listed
  - issuer-official / high confidence · effective 2026-01-01
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve
  - https://frequentmiler.com/new-sapphire-reserve-benefit-for-2026-a-250-credit-for-select-chase-travel%E2%84%A0-hotels/
- **benefits** — ADD benefit "Sapphire Exclusive Tables Dining Credit" annualValue 300 — $300 per year in dining credits at Sapphire Exclusive Tables via OpenTable (issued semi-annually, $150 Jan-Jun / $150 Jul-Dec).
  - catalog today: No dining credit listed
  - issuer-official / high confidence · effective 2025-06
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve
- **benefits** — ADD benefit "StubHub / viagogo Credits" annualValue 300 (issued semi-annually, $150 Jan-Jun / $150 Jul-Dec).
  - catalog today: No StubHub credit listed
  - issuer-official / high confidence · effective 2025-06
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve
- **benefits** — ADD benefit "Apple TV and Apple Music Subscriptions" annualValue 288 (Chase states "$288 in Apple TV and Apple Music subscriptions"; requires activation).
  - catalog today: No Apple subscriptions benefit listed
  - issuer-official / high confidence · effective 2025-06
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve
- **benefits** — ADD benefit "DoorDash: DashPass Membership + Monthly Promos" annualValue 420 ($120 DashPass membership + $300 in DoorDash promos, delivered as monthly promo credits).
  - catalog today: No DoorDash/DashPass benefit listed
  - issuer-official / high confidence · effective 2025-06
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve
- **benefits** — ADD benefit "Lyft Credits" annualValue 120 ($10 monthly in-app Lyft credit, through 9/30/2027).
  - catalog today: No Lyft credit listed
  - issuer-official / high confidence · effective 2025-06
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve
- **benefits** — ADD benefit "IHG One Rewards Platinum Elite Status" (complimentary, after enrollment). Suggested annualValue 0-100 as a soft benefit.
  - catalog today: No hotel elite status listed
  - issuer-official / high confidence · effective 2025-06
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve
- **benefits** — ADD benefit "Peloton Membership Credits" annualValue 120 ($10 monthly, through 12/31/2027).
  - catalog today: No Peloton credit listed
  - issuer-official / medium confidence · effective 2025-06
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve

### #3 Chase Freedom Unlimited (1)

- **cashbackCategories** — ADD category "Lyft" at rate 0.02 ("2% cash back total on qualifying Lyft products and services" through 09/30/2027).
  - catalog today: No Lyft category
  - issuer-official / high confidence
  - https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited

### #4 Chase Freedom Flex (1)

- **cashbackCategories** — ADD category "Lyft" at rate 0.02 (2% total cash back on Lyft through 09/30/2027).
  - catalog today: No Lyft category
  - issuer-official / high confidence
  - https://creditcards.chase.com/cash-back-credit-cards/freedom/flex

### #5 Citi Double Cash (3)

- **cashbackCategories** — ADD category "Citi Travel hotels, car rentals, and attractions" at rate 0.05 (2% base + 3% additional = 5% total). Citi made this a permanent, non-expiring feature on 2025-05-18; it is stated on both the main product page and the official benefits page.
  - catalog today: Only "All Purchases" 0.02
  - issuer-official / high confidence · effective 2025-05-18
  - https://www.citi.com/credit-cards/citi-double-cash-credit-card
  - https://www.citi.com/credit-cards/credit-card-rewards/citi-double-cash-credit-card-benefits
- **signupBonus** — "$200 cash back after $1,500 in purchases in the first 6 months" (signupBonusValue 200). Stated verbatim on Citi's own Double Cash benefits page, which satisfies the issuer-page-only rule. Note this offer still rotates — recommend flagging the field as volatile even after setting it.
  - catalog today: null / null
  - issuer-official / medium confidence
  - https://www.citi.com/credit-cards/credit-card-rewards/citi-double-cash-credit-card-benefits
- **benefits** — REMOVE. Citi no longer offers damage-and-theft purchase protection on the Double Cash; neither the product page nor the official benefits page lists it, and secondary coverage confirms purchase protection was withdrawn. Replace with "Extended Warranty" (adds one year to the manufacturer's warranty, underwritten by New Hampshire Insurance Co./AIG), which IS listed on citi.com. Confidence is medium because the primary evidence is absence from two issuer pages plus secondary confirmation rather than an explicit issuer retirement notice.
  - catalog today: "Damage and Theft Protection" — "Purchase protection for 120 days on new purchases", annualValue 75
  - issuer-official / medium confidence
  - https://www.citi.com/credit-cards/credit-card-rewards/citi-double-cash-credit-card-benefits
  - https://www.citi.com/credit-cards/citi-double-cash-credit-card

### #8 American Express Gold Card (2)

- **benefits** — ADD benefit "Hotel Collection Credit" — up to $100 credit toward eligible charges (dining, spa, resort activities) at 1,300+ The Hotel Collection properties booked via AmexTravel.com/Amex Travel App, two-night minimum stay. Per-booking, not annual; suggest annualValue 100.
  - catalog today: No "Hotel Collection Credit" benefit present (benefits list has only Uber Cash $120, Dining Credit $120, Dunkin Credit $84, Resy Credit $100)
  - issuer-official / high confidence
  - https://www.americanexpress.com/us/credit-cards/card/gold-card/
  - https://upgradedpoints.com/news/amex-gold-easier-to-use-benefits-refresh/
- **benefits** — ADD benefit "Hertz Five Star Status" — complimentary Hertz Gold Plus Rewards Five Star status (25% bonus points, space-available upgrades, wider Ultimate Choice selection); enrollment required. New with the 2026 Gold refresh. No fixed dollar value — suggest annualValue 0.
  - catalog today: No "Hertz Five Star Status" benefit present
  - issuer-official / high confidence · effective 2026-05-01
  - https://www.americanexpress.com/us/credit-cards/card/gold-card/
  - https://thepointsguy.com/news/american-express-gold-refresh-2026/

### #9 American Express Platinum (9)

- **benefits** — CLEAR Plus Credit, annualValue 219, "Up to $219 per calendar year for a CLEAR Plus membership." — CLEAR raised its membership price from $209 to $219 on 2026-07-01 and Amex raised the matching credit to $219 the same day.
  - catalog today: CLEAR Plus Credit, annualValue 209, "Up to $209 per year for CLEAR Plus membership."
  - issuer-official / high confidence · effective 2026-07-01
  - https://www.americanexpress.com/us/credit-cards/card/platinum/
  - https://upgradedpoints.com/news/clear-plus-membership-price-increase-july-2026/
- **benefits** — ADD benefit "Airline Fee Credit" — up to $200 per calendar year in statement credits for incidental fees with one selected qualifying airline. annualValue 200.
  - catalog today: No Airline Fee Credit present
  - issuer-official / high confidence
  - https://www.americanexpress.com/us/credit-cards/card/platinum/
  - https://upgradedpoints.com/credit-cards/reviews/american-express-platinum-card/worth-it/
- **benefits** — ADD benefit "Uber Cash" — $15 in Uber Cash each month plus a bonus $20 in December, up to $200 per year. annualValue 200.
  - catalog today: No Uber Cash benefit present
  - issuer-official / high confidence
  - https://www.americanexpress.com/us/credit-cards/card/platinum/
  - https://upgradedpoints.com/credit-cards/reviews/american-express-platinum-card/worth-it/
- **benefits** — ADD benefit "Uber One Credit" — up to $120 in statement credits each calendar year toward an Uber One membership. annualValue 120.
  - catalog today: No Uber One Credit present
  - issuer-official / high confidence
  - https://www.americanexpress.com/us/credit-cards/card/platinum/
  - https://upgradedpoints.com/credit-cards/reviews/american-express-platinum-card/worth-it/
- **benefits** — ADD benefit "lululemon Credit" — up to $75 in statement credits each quarter at lululemon, up to $300 per year. annualValue 300.
  - catalog today: No lululemon Credit present
  - issuer-official / high confidence
  - https://www.americanexpress.com/us/credit-cards/card/platinum/
  - https://upgradedpoints.com/credit-cards/reviews/american-express-platinum-card/worth-it/
- **benefits** — ADD benefit "Walmart+ Credit" — up to $12.95 plus applicable sales tax each month toward a Walmart+ monthly membership, up to $155 per year. annualValue 155.
  - catalog today: No Walmart+ Credit present
  - issuer-official / high confidence
  - https://www.americanexpress.com/us/credit-cards/card/platinum/
  - https://upgradedpoints.com/credit-cards/reviews/american-express-platinum-card/worth-it/
- **benefits** — ADD benefit "Global Entry / TSA PreCheck Credit" — up to $120 for Global Entry every 4 years, or up to $85 for TSA PreCheck every 4.5 years. Amortized annualValue 30.
  - catalog today: No Global Entry / TSA PreCheck Credit present
  - issuer-official / high confidence
  - https://www.americanexpress.com/us/credit-cards/card/platinum/
  - https://upgradedpoints.com/credit-cards/reviews/american-express-platinum-card/worth-it/
- **benefits** — ADD benefit "Oura Ring Credit" — up to $200 per calendar year toward an Oura Ring hardware purchase (does not cover the Oura membership). annualValue 200.
  - catalog today: No Oura Ring Credit present
  - two-agreeing-secondary / high confidence
  - https://upgradedpoints.com/credit-cards/reviews/american-express-platinum-card/worth-it/
  - https://yourmileagemayvary.com/2026/08/02/amex-platinum-card-review/
- **benefits** — ADD benefit "Equinox Credit" — up to $300 per year in statement credits for Equinox club memberships or an Equinox+ digital membership. annualValue 300.
  - catalog today: No Equinox Credit present
  - two-agreeing-secondary / high confidence
  - https://upgradedpoints.com/credit-cards/reviews/american-express-platinum-card/worth-it/
  - https://yourmileagemayvary.com/2026/08/02/amex-platinum-card-review/

### #10 Amex Blue Cash Preferred (1)

- **benefits** — RENAME to "$120 Disney Streaming Credit", annualValue 120, description "Up to $10 back each month in statement credits after purchasing a subscription or bundle at DisneyPlus.com, Hulu.com or Stream.ESPN.com. Enrollment required; no minimum-spend requirement."
  - catalog today: "$84 Disney Bundle Credit", annualValue 84, "$7/month for Disney Bundle (Disney+, Hulu, ESPN+)"
  - two-agreeing-secondary / high confidence · effective 2025-08-01
  - https://thepointsguy.com/credit-cards/blue-cash-preferred-increases-disney-bundle-credit/
  - https://upgradedpoints.com/news/amex-blue-cash-cards-disney-streaming-credit/

### #11 Amex Blue Cash Everyday (1)

- **benefits** — RENAME to "$84 Disney Streaming Credit", annualValue 84 (UNCHANGED — do not raise to $120; the increase applied only to Blue Cash Preferred), description "Up to $7 back each month in statement credits after purchasing an eligible subscription or bundle at DisneyPlus.com, Hulu.com or Stream.ESPN.com. Enrollment required; no minimum-spend requirement."
  - catalog today: "$84 Disney Bundle Credit", annualValue 84, "$7/month for Disney Bundle (Disney+, Hulu, ESPN+)"
  - two-agreeing-secondary / medium confidence · effective 2025-08-01
  - https://thepointsguy.com/credit-cards/blue-cash-preferred-increases-disney-bundle-credit/
  - https://upgradedpoints.com/news/amex-blue-cash-cards-disney-streaming-credit/

### #12 Capital One Venture X (8)

- **cashbackCategories** — ADD category "Capital One Entertainment" at rate 0.05 (5X miles)
  - catalog today: No Capital One Entertainment category present
  - issuer-official / high confidence · effective 2024-02-28
  - https://www.capitalone.com/credit-cards/venture-x/
  - https://thepointsguy.com/news/new-venture-bonus-category-entertainment
- **benefits** — ADD benefit "Premier Collection Experience Credit" annualValue 100, description "Up to $100 experience credit on every Premier Collection hotel or vacation rental stay booked through Capital One Travel"
  - catalog today: absent
  - issuer-official / high confidence
  - https://www.capitalone.com/credit-cards/venture-x/
  - https://upgradedpoints.com/credit-cards/reviews/capital-one-venture-x/benefits-history/
- **cashbackCategories** — Relabel to "Flights and Vacation Rentals (via Capital One Travel)" = 0.05. The 5X tier is specifically flights + vacation rentals, not generic travel.
  - catalog today: [47] "Travel (via Capital One Travel)" = 0.05
  - two-agreeing-secondary / high confidence
  - https://thepointsguy.com/credit-cards/capital-one-venture-x/
  - https://upgradedpoints.com/credit-cards/reviews/capital-one-venture-x/benefits-history/
- **benefits** — annualValue 30, description "Up to $120 statement credit for Global Entry or TSA PreCheck application fee (every 4 years)"
  - catalog today: [42] "Global Entry / TSA PreCheck Credit" annualValue 25, description "Up to $100 credit for Global Entry or TSA PreCheck application fee"
  - two-agreeing-secondary / high confidence · effective 2021-11-09
  - https://thepointsguy.com/credit-cards/capital-one-venture-x/
  - https://upgradedpoints.com/credit-cards/reviews/capital-one-venture-x/benefits-history/
- **benefits** — description "Unlimited Priority Pass lounge access for the cardholder only. Guests are no longer complimentary as of Feb 1, 2026 — $35 per guest. Each authorized user costs $125/year to retain lounge access." Recommend lowering annualValue accordingly (guest value removed).
  - catalog today: [41] "Priority Pass Lounge Access" annualValue 429, description "Unlimited Priority Pass lounge access for cardholder + 2 guests"
  - two-agreeing-secondary / high confidence · effective 2026-02-01
  - https://upgradedpoints.com/credit-cards/reviews/capital-one-venture-x/benefits-history/
  - https://thepointsguy.com/credit-cards/capital-one-venture-x/
- **benefits** — description "Unlimited access for the cardholder to Capital One Lounges and Capital One Landing. No complimentary guests as of Feb 1, 2026 ($45 per adult guest, $25 per child 2-17) unless you spend $75,000 in a calendar year, which unlocks 2 complimentary guests at Lounges and 1 at Landing."
  - catalog today: [43] "Capital One Lounge Access" annualValue 150, description "Unlimited access to Capital One airport lounges"
  - two-agreeing-secondary / high confidence · effective 2026-02-01
  - https://upgradedpoints.com/credit-cards/reviews/capital-one-venture-x/benefits-history/
  - https://www.nerdwallet.com/travel/learn/capital-one-venture-x-card-worth-annual-fee
- **benefits** — ADD benefit "Lifestyle Collection Experience Credit" annualValue 50, description "Up to $50 experience credit on every Lifestyle Collection stay booked through Capital One Travel"
  - catalog today: absent
  - issuer-official / medium confidence
  - https://www.capitalone.com/credit-cards/venture-x/
- **benefits** — ADD benefit "PRIOR Subscription" annualValue 149, description "Complimentary PRIOR travel-guide subscription (a $149 value)"
  - catalog today: absent
  - issuer-official / medium confidence
  - https://www.capitalone.com/credit-cards/venture-x/

### #13 Capital One Venture Rewards (4)

- **cashbackCategories** — The 5X tier is "hotels, vacation rentals, rental cars and activities booked through Capital One Travel". Vacation rentals and activities are missing — either relabel to a single combined category or add the two missing ones at 0.05.
  - catalog today: [49] "Hotels (via Capital One Travel)" = 0.05 and [50] "Rental Cars (via Capital One Travel)" = 0.05
  - issuer-official / high confidence
  - https://www.capitalone.com/credit-cards/venture/
  - https://www.capitalone.com/learn-grow/money-management/venture-vs-ventureone/
- **cashbackCategories** — ADD category "Capital One Entertainment" at rate 0.05 (5X miles)
  - catalog today: No Capital One Entertainment category present
  - issuer-official / high confidence · effective 2024-02-28
  - https://www.capitalone.com/credit-cards/venture/
  - https://www.capitalone.com/learn-grow/money-management/venture-vs-ventureone/
- **benefits** — annualValue 30, description "Up to $120 statement credit every 4 years for Global Entry or TSA PreCheck"
  - catalog today: [45] "Global Entry / TSA PreCheck Credit" annualValue 25, description "Up to $100 credit every 4 years"
  - issuer-official / high confidence
  - https://www.capitalone.com/credit-cards/venture/
  - https://www.capitalone.com/learn-grow/money-management/venture-vs-ventureone/
- **benefits** — ADD benefit "Lifestyle Collection Experience Credit" annualValue 50, description "$50 experience credit on every Lifestyle Collection stay booked through Capital One Travel"
  - catalog today: absent
  - issuer-official / high confidence
  - https://www.capitalone.com/credit-cards/venture/
  - https://www.capitalone.com/learn-grow/money-management/venture-vs-ventureone/

### #14 Capital One Savor Rewards (1)

- **signupBonus** — "$250 cash bonus after $500 spend in the first 3 months" (signupBonusValue 250). Limited-time offer that went live 2026-06-09; flag as volatile.
  - catalog today: "$200 cash bonus after $500 spend in 3 months" (signupBonusValue 200)
  - issuer-official / high confidence · effective 2026-06-09
  - https://www.capitalone.com/credit-cards/savor/
  - https://www.nerdwallet.com/credit-cards/news/capital-one-june-2026-bonuses-savor-and-student-cards

### #15 Capital One SavorOne (2)

- **signupBonus** — null — the relaunched SavorOne has no welcome bonus (signupBonusValue null)
  - catalog today: "$200 cash bonus after $500 spend in 3 months" (signupBonusValue 200)
  - issuer-official / high confidence · effective 2025-08-21
  - https://www.capitalone.com/credit-cards/savorone/
  - https://www.doctorofcredit.com/capital-one-relaunches-savorone-card-39-annual-fee/
- **cashbackCategories** — ADD category "Hotels, vacation rentals, rental cars and activities via Capital One Travel" at rate 0.05 (5% cash back)
  - catalog today: No Capital One Travel category present
  - issuer-official / high confidence
  - https://www.capitalone.com/learn-grow/money-management/everything-about-savorone/

### #16 Capital One Quicksilver (2)

- **cashbackCategories** — ADD category "Hotels, rental cars, vacation rentals and activities booked through Capital One Travel" at rate 0.05 (5% cash back)
  - catalog today: Only [62] "All Purchases" = 0.015
  - issuer-official / high confidence
  - https://www.capitalone.com/learn-grow/money-management/quicksilver-card-benefits/
- **cashbackCategories** — ADD category "Capital One Entertainment" at rate 0.05 (5% cash back — note Quicksilver earns 5%, not the 8% that Savor/SavorOne earn)
  - catalog today: No Capital One Entertainment category present
  - issuer-official / high confidence
  - https://www.capitalone.com/learn-grow/money-management/quicksilver-card-benefits/

### #17 Discover it Cash Back (2)

- **cashbackCategories** — ADD 'Capital One Travel — hotels, vacation rentals, rental cars and activities'=0.05 and ADD 'Capital One Entertainment — tickets and events'=0.05. These are new permanent bonus categories granted to Discover it cardholders as part of the Capital One migration. Existing rotating 5% ($1,500/qtr, activation required) and 1% base are unchanged.
  - catalog today: Rotating Categories (up to $1,500/quarter)=0.05, Other=0.01 (default)
  - two-agreeing-secondary / high confidence · effective 2026-07-27
  - https://frequentmiler.com/discover-it-cards-moving-to-capital-one-7-27-26-more-bonus-spend-categories-capital-one-offers-access-more/
  - https://upgradedpoints.com/news/discover-it-cards-capital-one-transition/
- **benefits** — ADD benefit 'Capital One Offers' — up to 15% cash back when shopping online through the Capital One Offers portal, plus access to Capital One Shopping. Newly granted to Discover it cardholders from 2026-07-27.
  - catalog today: No 'Capital One Offers' benefit present (benefits are Cashback Match, Free FICO Score, No Foreign Transaction Fees)
  - two-agreeing-secondary / high confidence · effective 2026-07-27
  - https://upgradedpoints.com/news/discover-cardholders-gain-capital-one-benefits/
  - https://thepointsguy.com/news/discover-capital-one-migration-2026/

### #20 Wells Fargo Autograph (1)

- **benefits** — ADD benefit 'No Foreign Transaction Fees' — the Wells Fargo Autograph Card charges no foreign transaction fee (stated on the issuer product page). Suggested annualValue 30-50, consistent with the same benefit on other catalog cards.
  - catalog today: Cell Phone Protection ($100); Visa Signature Concierge ($50); Auto Rental Collision Damage Waiver ($50) — no foreign transaction fee benefit listed
  - issuer-official / high confidence
  - https://creditcards.wellsfargo.com/autograph-visa-credit-card/

### #24 US Bank Cash+ (1)

- **signupBonus** — "$200 rewards bonus after you spend $1,000 in eligible purchases within the first 90 days of account opening" — the qualifying window is 90 days, not 120. Dollar amount and spend threshold unchanged. I could not date when the window tightened, so this may predate the May 2026 review.
  - catalog today: "$200 rewards bonus after $1,000 spend in 120 days"
  - issuer-official / medium confidence
  - https://www.usbank.com/credit-cards/cash-plus-visa-signature-credit-card.html

### #27 United Explorer Card (3)

- **benefits** — ADD the partner-credit package introduced in the 2025 United refresh, all stated on the Chase product page: 'Up to $100 in United Hotels credits' (annualValue 100); 'Up to $60 in credits on rideshare purchases' (annualValue 60); 'Up to $50' Avis/Budget car rental credit (annualValue 50); 'Up to $120 in Instacart credits' plus complimentary 3-month Instacart+ (annualValue 120); 'Up to $100 in credits on JSX purchases' (annualValue 100); '$100 United travel credit' earned after $10,000 in annual card spend (annualValue 100, conditional); '10,000-mile award flight discount' after $20,000 in annual card spend (conditional). Chase markets the card as 'over $500 in partner credits'.
  - catalog today: Only 5 benefits: Free First Checked Bag ($140), Priority Boarding ($30), United Club Passes ($118), $100 Global Entry/TSA PreCheck Credit ($25), 25% Back on In-Flight Purchases ($30). No partner credits at all.
  - issuer-official / high confidence · effective 2025-03-24
  - https://creditcards.chase.com/travel-credit-cards/united/united-explorer
  - https://media.chase.com/news/united-refresh-2025
- **benefits** — Rename to 'Global Entry / TSA PreCheck / NEXUS Credit', description 'Up to $120 statement credit every 4 years', annualValue 30. The reimbursement cap was raised from $100 to $120 and NEXUS was added.
  - catalog today: Benefit name '$100 Global Entry / TSA PreCheck Credit', annualValue 25, description 'Statement credit every 4 years'
  - issuer-official / high confidence · effective 2025-03-24
  - https://creditcards.chase.com/travel-credit-cards/united/united-explorer
- **signupBonus** — Earn up to 60,000 bonus miles: 50,000 after $3,000 spend in the first 3 months, plus 10,000 for adding an authorized user in the same period. signupBonusValue ~720 at 1.2c. NOTE: the Chase page also now states '$0 intro annual fee for the first year, then $150' — the catalog's flat $150 is defensible but the intro waiver is not captured anywhere.
  - catalog today: Earn up to 80,000 bonus miles after qualifying activities; see issuer page for current offer (signupBonusValue 750)
  - issuer-official / medium confidence
  - https://creditcards.chase.com/travel-credit-cards/united/united-explorer

### #28 United Quest Card (2)

- **benefits** — Replace with '10,000-Mile Award Flight Discount' — the two 5,000-mile anniversary award rebates were consolidated into a single annual 10,000-mile award flight discount, with a second 10,000-mile discount earnable after $20,000 in calendar-year spend. annualValue ~120 at 1.2c.
  - catalog today: '5,000-Mile Anniversary Award Flight Credit' ($75), description 'When redeeming miles on United flights'
  - issuer-official / high confidence · effective 2025-03-24
  - https://creditcards.chase.com/travel-credit-cards/united/united-quest
  - https://media.chase.com/news/united-refresh-2025
- **benefits** — ADD, all itemized on the Chase product page: 'Up to $150' Renowned Hotels and Resorts credit annually (annualValue 150); 'Up to $100' rideshare credit per calendar year, opt-in required (annualValue 100); 'Up to $80' Avis/Budget travel credit each anniversary year (annualValue 80); 'Up to $180' Instacart credits per calendar year through 12/31/27, plus complimentary 3-month Instacart+ (annualValue 180); 'Up to $150' JSX flight credit each anniversary year (annualValue 150); 'Up to $120' Global Entry / TSA PreCheck / NEXUS credit every 4 years (annualValue 30); 1,000 Card Bonus PQP each year; two global Economy Plus upgrade certificates.
  - catalog today: Only 4 benefits: $200 United Travel Credit, Free First & Second Checked Bags ($240), 5,000-Mile Anniversary Award Flight Credit ($75), Priority Boarding & Lounge Passes ($118). No partner credits.
  - issuer-official / high confidence · effective 2025-03-24
  - https://creditcards.chase.com/travel-credit-cards/united/united-quest
  - https://media.chase.com/news/united-refresh-2025

### #29 Southwest Rapid Rewards Plus (2)

- **cashbackCategories** — Southwest Purchases=0.02 | Gas Stations and Grocery Stores (first $5,000 combined per year)=0.02 | Lyft (through 12/31/2027)=0.02 | Other=0.01. REMOVE Streaming, Local Transit and Rideshare, Internet/Cable/Phone Services, and Rapid Rewards Hotels and Rental Cars — all four legacy 2X categories ended 12/31/2025 in the July 2025 Southwest card refresh and are absent from Chase's current product page. ADD the 2X gas/grocery category.
  - catalog today: Southwest Purchases=0.02 | Streaming=0.02 | Local Transit and Rideshare=0.02 | Internet, Cable, and Phone Services=0.02 | Rapid Rewards Hotels and Rental Cars=0.02 | Other=0.01
  - issuer-official / high confidence · effective 2025-12-31
  - https://creditcards.chase.com/travel-credit-cards/southwest/plus
  - https://media.chase.com/news/chase-southwest-introduce-new-card-benefits
- **benefits** — REMOVE '2 EarlyBird Check-In' — EarlyBird Check-In was eliminated across all Southwest personal cards after 12/31/2025 when Southwest moved to assigned seating. ADD 'Free First Checked Bag' for cardmember and up to 8 passengers on the same reservation, 'saves up to $90 round trip' (annualValue 90); ADD '10% Flight Discount Promo Code' each cardmember anniversary; ADD '10,000 Companion Pass Qualifying Points Boost' each year; ADD 'Standard Seat Selection (within 48 hours) and Group 5 Boarding' (live since 2026-01-27); ADD 'DashPass Membership' one year complimentary plus up to $10 off quarterly on non-restaurant DoorDash orders (annualValue 120); ADD 'Instacart+ 3 Months plus $10 Monthly Instacart Credit' (annualValue 120). Keep 3,000 Anniversary Points and 25% back on inflight.
  - catalog today: 3,000 Anniversary Points ($40), 2 EarlyBird Check-In ($50), 25% Back on In-Flight Purchases ($20)
  - issuer-official / high confidence · effective 2025-12-31
  - https://creditcards.chase.com/travel-credit-cards/southwest/plus
  - https://media.chase.com/news/chase-southwest-introduce-new-card-benefits

### #30 Southwest Rapid Rewards Priority (3)

- **cashbackCategories** — Southwest Purchases=0.04 | Gas and Restaurants (no cap)=0.02 | Lyft (through 12/31/2027)=0.05 | Other=0.01. REMOVE Hotels, Rental Cars, Streaming, Local Transit and Rideshare, and Internet/Cable/Phone Services — those legacy 2X categories ended 12/31/2025. ADD the 5X Lyft category (Chase states '5X Rapid Rewards points on qualifying Lyft products and services purchased through the Lyft mobile application through 12/31/2027').
  - catalog today: Southwest Purchases=0.04 | Hotels=0.02 | Rental Cars=0.02 | Streaming=0.02 | Gas and Restaurants=0.02 | Local Transit and Rideshare=0.02 | Internet, Cable, and Phone Services=0.02 | Other=0.01
  - issuer-official / high confidence · effective 2025-12-31
  - https://creditcards.chase.com/travel-credit-cards/southwest/priority
  - https://media.chase.com/news/chase-southwest-introduce-new-card-benefits
- **benefits** — REMOVE '$75 Southwest Travel Credit' — discontinued 12/31/2025. REMOVE '4 Upgraded Boardings per Year' — discontinued 12/31/2025. CHANGE '20% Back on In-Flight Purchases' -> '25% Back on In-Flight Purchases' (Chase's page states 25%). KEEP 7,500 Anniversary Points. ADD 'Free First Checked Bag' for cardmember and up to 8 passengers, saves up to $90 round trip (annualValue 90); ADD '10,000 Companion Pass Qualifying Points Boost' each year; ADD 'Preferred Seat Selection and Unlimited Extra Legroom Upgrades plus Group 5 Boarding' (live 2026-01-27); ADD 'DashPass Membership' one year complimentary plus up to $10 off quarterly on non-restaurant DoorDash orders (annualValue 120); ADD 'Instacart+ 3 Months plus $10 Monthly Instacart Credit' (annualValue 120); ADD '2,500 Tier Qualifying Points per $5,000 spent'.
  - catalog today: $75 Southwest Travel Credit ($75), 7,500 Anniversary Points ($100), 4 Upgraded Boardings per Year ($120), 20% Back on In-Flight Purchases ($20)
  - issuer-official / high confidence · effective 2025-12-31
  - https://creditcards.chase.com/travel-credit-cards/southwest/priority
  - https://media.chase.com/news/chase-southwest-introduce-new-card-benefits
- **signupBonus** — Earn 60,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening. signupBonusValue ~780 at 1.3c.
  - catalog today: 50,000 points (signupBonusValue 650)
  - issuer-official / medium confidence
  - https://creditcards.chase.com/travel-credit-cards/southwest/priority

### #31 Delta SkyMiles Gold American Express (4)

- **benefits** — ADD benefit "$120 Rideshare Credit", annualValue 120, description "Up to $10 in monthly statement credits on eligible U.S. rideshare purchases (Uber, Lyft, Curb, Alto); enrollment required, available after first card renewal"
  - catalog today: No rideshare credit listed
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
  - https://awardwallet.com/news/delta-skymiles/delta-credit-card-changes-2026/
- **benefits** — RENAME to "Free First and Second Checked Bag" — "First checked bag free on Delta flights for you and up to 8 companions; second checked bag free on U.S. domestic Delta-operated flights"
  - catalog today: "Free First Checked Bag" — "Free first checked bag on Delta flights for you and up to 8 companions" (annualValue 240)
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
  - https://awardwallet.com/news/delta-skymiles/delta-credit-card-changes-2026/
- **benefits** — ADD benefit "$100 Delta Stays Credit", annualValue 100, description "Up to $100 back each calendar year on prepaid hotels or vacation rentals booked through Delta Stays on delta.com"
  - catalog today: No Delta Stays credit listed
  - issuer-official / high confidence
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-personal-cards
  - https://upgradedpoints.com/credit-cards/amex-delta-gold-platinum-reserve-delta-stays-credit/
- **signupBonus** — Up to 80,000 bonus miles (tiered) per delta.com as of 2026-08-06. VOLATILE — do not auto-track; the 70,000+20,000 limited-time offer expired 2026-07-15
  - catalog today: 50,000 bonus miles
  - issuer-official / low confidence · effective 2026-07-16
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-personal-cards
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees

### #32 Delta SkyMiles Platinum American Express (5)

- **benefits** — RENAME to "Free First and Second Checked Bag" — "First checked bag free on Delta flights for you and up to 8 companions; second checked bag free on U.S. domestic Delta-operated flights"
  - catalog today: "Free First Checked Bag" — "On Delta flights for you and up to 8 companions" (annualValue 240)
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
  - https://awardwallet.com/news/delta-skymiles/delta-credit-card-changes-2026/
- **benefits** — UPDATE description: "Annual round-trip Delta Main companion certificate for domestic, Caribbean or Central American travel; now also redeemable toward Delta Vacations packages. Government taxes/fees of $22-$250 apply."
  - catalog today: "Companion Certificate" — "Annual round-trip Main Cabin companion certificate (taxes/fees apply)"
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
- **benefits** — ADD benefit "$150 Delta Stays Credit", annualValue 150, description "Up to $150 back each calendar year on prepaid hotels or vacation rentals booked through Delta Stays on delta.com"
  - catalog today: No Delta Stays credit listed
  - issuer-official / high confidence
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-personal-cards
  - https://upgradedpoints.com/credit-cards/amex-delta-gold-platinum-reserve-delta-stays-credit/
- **benefits** — REPLACE with "MQD Headstart and MQD Boost" — "$2,500 Medallion Qualification Dollars each Medallion Qualification Year, plus $1 MQD for every $20 in eligible card purchases". Delta retired Medallion Qualification Miles entirely; the MQM benefit described no longer exists.
  - catalog today: "MQM Boost" — "10,000 MQMs after $25K spend, again at $50K" (annualValue 150)
  - issuer-official / high confidence
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-personal-cards
  - https://www.americanexpress.com/en-us/account/get-started/deltaplatinum/uncover-your-benefits
- **signupBonus** — Up to 90,000 bonus miles (tiered) per delta.com as of 2026-08-06. VOLATILE — do not auto-track
  - catalog today: 75,000 bonus miles
  - issuer-official / low confidence · effective 2026-07-16
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-personal-cards

### #33 Delta SkyMiles Reserve American Express (5)

- **benefits** — RENAME to "Free First and Second Checked Bag" — "First checked bag free on Delta flights worldwide; second checked bag free on U.S. domestic Delta-operated flights"
  - catalog today: "Free First Checked Bag" — "On Delta flights" (annualValue 240)
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
  - https://www.americanexpress.com/en-us/credit-cards/credit-intel/delta-reserve-card-benefits/
- **benefits** — UPDATE description: "Annual round-trip companion certificate on Delta First, Delta Premium Select, Delta Comfort or Delta Main for domestic, Caribbean or Central American travel; now also redeemable toward Delta Vacations packages. Government taxes/fees of $22-$250 apply."
  - catalog today: "Companion Certificate (First/Comfort+/Main)" — "Annual round-trip companion certificate"
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
- **benefits** — ADD benefit "$200 Delta Stays Credit", annualValue 200, description "Up to $200 back each calendar year on prepaid hotels or vacation rentals booked through Delta Stays on delta.com"
  - catalog today: No Delta Stays credit listed
  - issuer-official / high confidence
  - https://www.americanexpress.com/en-us/credit-cards/credit-intel/delta-reserve-card-benefits/
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-personal-cards
- **benefits** — ADD benefit "Global Entry / TSA PreCheck Credit", annualValue 30, description "Up to $120 for Global Entry every 4 years, or up to $85 for TSA PreCheck every 4.5 years"
  - catalog today: No Global Entry / TSA PreCheck credit listed
  - issuer-official / high confidence
  - https://www.americanexpress.com/en-us/credit-cards/credit-intel/delta-reserve-card-benefits/
- **benefits** — ADD benefit "MQD Headstart and MQD Boost", annualValue 150, description "$2,500 Medallion Qualification Dollars each Medallion Qualification Year, plus $1 MQD for every $10 in eligible card purchases"
  - catalog today: No MQD Headstart / MQD Boost listed
  - issuer-official / high confidence
  - https://www.americanexpress.com/en-us/credit-cards/credit-intel/delta-reserve-card-benefits/
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-personal-cards

### #35 Atmos Rewards Ascent Visa Signature (5)

- **cashbackCategories** — REMOVE. The Atmos Rewards Ascent has no grocery bonus category; groceries earn the 1x base rate. This was never an Alaska Visa Signature / Atmos Ascent category.
  - catalog today: "Groceries" at rate 0.02
  - issuer-official / high confidence · effective 2025-08-20
  - https://www.bankofamerica.com/credit-cards/products/alaska-airlines-credit-card/
  - https://frequentmiler.com/alaska-atmos-rewards-complete-guide/
- **cashbackCategories** — Relabel to "Alaska Airlines and Hawaiian Airlines Purchases" at rate 0.03 — the 3x category covers both carriers post-Atmos merger. Rate itself is correct.
  - catalog today: "Alaska Airlines Purchases" at rate 0.03
  - issuer-official / high confidence · effective 2025-08-20
  - https://www.bankofamerica.com/credit-cards/products/alaska-airlines-credit-card/
  - https://frequentmiler.com/alaska-atmos-rewards-complete-guide/
- **benefits** — ADD benefit "Alaska Lounge+ Membership Discount" — $100 off an annual Alaska Lounge+ Membership. Suggested annualValue 100.
  - catalog today: No Alaska Lounge+ membership discount benefit present
  - issuer-official / high confidence · effective 2025-08-20
  - https://www.bankofamerica.com/credit-cards/products/alaska-airlines-credit-card/
- **benefits** — Description must state the gating condition: $99 Companion Fare (plus taxes and fees from $23) each account anniversary, earned only after spending $6,000 or more on purchases in the prior anniversary year; valid on Alaska/Hawaiian economy flights within North America. annualValue 350 is an app-side estimate and is arguably too high for a spend-gated benefit, but I am only reporting the factual description gap.
  - catalog today: "Annual Companion Fare" (annualValue 350), no spend requirement stated in description
  - issuer-official / high confidence · effective 2025-08-20
  - https://www.bankofamerica.com/credit-cards/products/alaska-airlines-credit-card/
  - https://frequentmiler.com/alaska-atmos-rewards-complete-guide/
- **signupBonus** — "70,000 bonus points plus a $99 Companion Fare (plus taxes and fees from $23) after $2,500 in purchases in the first 90 days" — stated on the issuer's own product page as of 2026-08-06. The 50% flight discount code is no longer the offer. VOLATILE: recommend do-not-auto-track.
  - catalog today: "80,000 bonus points plus a 50% flight discount code after qualifying spend; see issuer page for current offer" (signupBonusValue 900)
  - issuer-official / medium confidence
  - https://www.bankofamerica.com/credit-cards/products/alaska-airlines-credit-card/

### #36 Marriott Bonvoy Boundless (4)

- **benefits** — ADD benefit "Airline Statement Credit (2026)" annualValue 100 — "Up to $100 in statement credits in 2026: $50 after spending $250+ directly with an airline Jan 1-Jun 30, and another $50 after $250+ Jul 1-Dec 31. Existing cardmembers must complete a one-time activation. Limited-time 2026 benefit; credits post through 6/30/2027."
  - catalog today: No airline statement credit benefit listed
  - issuer-official / high confidence · effective 2026-01-01
  - https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/boundless
  - https://upgradedpoints.com/news/chases-marriott-boundless-card-airfare-benefit/
- **benefits** — ADD benefit "DashPass Membership" annualValue 120 — "One-year complimentary DashPass for DoorDash and Caviar when activated for the first time between 02/01/2025 and 12/31/2027, plus $10 off quarterly on one qualifying non-restaurant DoorDash order while enrolled."
  - catalog today: No DashPass benefit listed
  - issuer-official / high confidence · effective 2025-02-01
  - https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/boundless
- **signupBonus** — "Earn 125,000 Bonus Points + 1 Free Night Award after spending $3,000 on eligible purchases within 3 months of account opening." VOLATILE — do not auto-track.
  - catalog today: 3 Free Night Awards (signupBonusValue 1050)
  - issuer-official / high confidence
  - https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/boundless
  - https://www.doctorofcredit.com/chase-marriott-bonvoy-boundless-signup-bonus-125000-points-free-night-certificate/
- **benefits** — ADD benefit "Instacart Credit" annualValue 120 — "$10 monthly Instacart statement credit (up to $120/yr) through 12/31/2027, plus a complimentary 3-month Instacart+ membership; an active Instacart+ membership is required to receive the monthly credit."
  - catalog today: No Instacart credit benefit listed
  - two-agreeing-secondary / medium confidence · effective 2025-05-01
  - https://www.doctorofcredit.com/chase-adds-instacart-credits-for-most-cards-10-20-per-month-until-12-31-27/
  - https://thepointsguy.com/credit-cards/chase-now-offering-instacart-benefits-on-more-cards

### #37 World of Hyatt Credit Card (2)

- **signupBonus** — "Earn up to 75,000 Bonus Points": 45,000 Bonus Points after spending $5,000 on purchases in the first 3 months, plus up to 30,000 more Bonus Points by earning 2 Bonus Points total per $1 spent in the first 6 months. Limited-time offer ending 8/20/2026. VOLATILE — do not auto-track.
  - catalog today: 30,000 points + up to 30,000 more after $15K spend (signupBonusValue 1100)
  - issuer-official / high confidence
  - https://creditcards.chase.com/travel-credit-cards/world-of-hyatt
  - https://newsroom.hyatt.com/chaseq1lto
- **benefits** — ADD benefit "Instacart Credit" annualValue 120 — "$10 monthly Instacart statement credit through 12/31/2027 plus 3-month complimentary Instacart+ membership; active Instacart+ membership required."
  - catalog today: No Instacart credit benefit listed
  - two-agreeing-secondary / medium confidence · effective 2025-05-01
  - https://www.doctorofcredit.com/chase-adds-instacart-credits-for-most-cards-10-20-per-month-until-12-31-27/
  - https://thepointsguy.com/credit-cards/chase-now-offering-instacart-benefits-on-more-cards

### #38 IHG One Rewards Premier (5)

- **benefits** — RENAME/RE-VALUE to "Global Entry / TSA PreCheck / NEXUS Credit" annualValue 30 — "Statement credit of up to $120 every four years as reimbursement for the Global Entry, TSA PreCheck or NEXUS application fee."
  - catalog today: "$100 Global Entry / TSA PreCheck Credit" — "Every 4 years", annualValue 25
  - issuer-official / high confidence
  - https://www.chase.com/personal/credit-cards/ihg/premier/premier-perks
  - https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/premier
- **benefits** — Keep annualValue 50 but correct the description — there is NO spend requirement: "Earn up to $50 in United TravelBank Cash each calendar year after registering your card with your MileagePlus account; paid as $25 on/about Jan 1 and $25 on/about Jul 1, each expiring six months later."
  - catalog today: "$50 United TravelBank Cash" — description "After spending $7K each year", annualValue 50
  - issuer-official / high confidence
  - https://www.chase.com/personal/credit-cards/ihg/premier/premier-perks
  - https://onemileatatime.com/guides/ihg-card-united-travelbank-credit/
- **benefits** — ADD benefit "$100 Statement Credit + 10,000 Bonus Points" annualValue 150 — "Receive a $100 statement credit and 10,000 bonus points each calendar year during which you spend at least $20,000."
  - catalog today: No annual-spend bonus benefit listed
  - issuer-official / high confidence
  - https://www.chase.com/personal/credit-cards/ihg/premier/premier-perks
  - https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/premier
- **benefits** — ADD benefit "Instacart Credit" annualValue 120 ($10/month through 12/31/2027, Instacart+ membership required, 3 months complimentary) and ADD benefit "DashPass Membership" annualValue 120 (one-year complimentary DashPass plus $10 off quarterly on non-restaurant DoorDash orders).
  - catalog today: No Instacart or DashPass benefits listed
  - issuer-official / high confidence · effective 2025-05-01
  - https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/premier
  - https://www.doctorofcredit.com/chase-adds-instacart-credits-for-most-cards-10-20-per-month-until-12-31-27/
- **signupBonus** — "Earn 140,000 Bonus Points after you spend $3,000 on purchases in the first 3 months from account opening." (signupBonusValue ~700 at 0.50 cpp). VOLATILE — do not auto-track.
  - catalog today: Up to 185,000 bonus points, subject to issuer terms (signupBonusValue 925)
  - issuer-official / high confidence
  - https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/premier
  - https://creditcards.chase.com/travel-credit-cards/ihg

### #39 Marriott Bonvoy Brilliant American Express (2)

- **benefits** — The credit is NOT restricted to Marriott properties. Correct description: "Up to $25 per month in statement credits for eligible purchases at restaurants worldwide". Suggest renaming benefit to "$300 Dining Credit". annualValue 300 stays correct.
  - catalog today: "$300 Marriott Bonvoy Dining Credit" — "Up to $25/month at participating Marriott restaurants"
  - two-agreeing-secondary / high confidence
  - https://www.dailydrop.com/credit-cards/marriott-bonvoy-brilliant-american-express-card
  - https://money.usnews.com/credit-cards/american-express/marriott-bonvoy-brilliant-american-express-card
- **benefits** — ADD benefit "25 Elite Night Credits", annualValue 150, description "25 Elite Night Credits each calendar year toward the next level of Marriott Bonvoy Elite status"
  - catalog today: No Elite Night Credits listed
  - two-agreeing-secondary / high confidence
  - https://www.dailydrop.com/credit-cards/marriott-bonvoy-brilliant-american-express-card
  - https://money.usnews.com/credit-cards/american-express/marriott-bonvoy-brilliant-american-express-card

### #40 Hilton Honors American Express Surpass (4)

- **benefits** — ADD benefit "$200 Hilton Credit", annualValue 200, description "Up to $50 in statement credits each quarter on eligible purchases made directly with a property in the Hilton portfolio; does not roll over"
  - catalog today: No Hilton statement credit listed
  - issuer-official / high confidence
  - https://stories.hilton.com/releases/hilton-and-american-express-upgrade-hilton-honors-surpass-aspire-cards
  - https://thepointsguy.com/credit-cards/reviews/hilton-amex-surpass-review
- **cashbackCategories** — ADD category "U.S. Online Retail" at rate 0.04 (4X Hilton Honors points on U.S. online retail purchases)
  - catalog today: Hilton Hotels 0.12 | Restaurants 0.06 | Groceries 0.06 | Gas 0.06 | Other 0.03 (no online retail tier)
  - issuer-official / high confidence
  - https://stories.hilton.com/releases/hilton-and-american-express-upgrade-hilton-honors-surpass-aspire-cards
  - https://thepointsguy.com/credit-cards/reviews/hilton-amex-surpass-review
- **benefits** — ADD benefit "National Car Rental Emerald Club Executive Status", annualValue 50, description "Complimentary National Car Rental Emerald Club Executive status; enrollment required"
  - catalog today: No National Car Rental status listed
  - issuer-official / high confidence
  - https://stories.hilton.com/releases/hilton-and-american-express-upgrade-hilton-honors-surpass-aspire-cards
  - https://thepointsguy.com/credit-cards/reviews/hilton-amex-surpass-review
- **benefits** — REMOVE — Amex sunset the 10 complimentary Priority Pass visits as part of the Oct 2023 Surpass refresh. The benefit ended 2024-02-01 for members enrolled before 2023-01-31 and 2024-11-01 for those enrolled 2023-02-01 to 2024-01-31. No Surpass cardholder has Priority Pass today.
  - catalog today: "10 Priority Pass Lounge Visits" — "Per year for cardmember and one guest" (annualValue 100)
  - two-agreeing-secondary / high confidence · effective 2024-11-01
  - https://www.cnbc.com/select/american-express-hilton-card-changes/
  - https://awardwallet.com/credit-cards/hilton-honors/hilton-amex-priority-pass/

### #41 Hilton Honors American Express Aspire (5)

- **benefits** — REMOVE — Priority Pass Select membership was eliminated from the Aspire card in the Oct 2023 refresh. The card has no airport lounge access today.
  - catalog today: "Priority Pass Lounge Access" — "Unlimited visits to 1,400+ lounges worldwide" (annualValue 429)
  - issuer-official / high confidence · effective 2024-02-01
  - https://www.cnbc.com/select/american-express-hilton-card-changes/
  - https://frequentmiler.com/amex-hilton-aspire-review/
- **benefits** — ADD benefit "Bonus Free Night Rewards at Spend Thresholds", annualValue 300, description "A second Free Night Reward after $30,000 in eligible purchases in a calendar year, and a third after an additional $30,000 (i.e. $60,000 total)"
  - catalog today: Only one "Annual Free Night Reward" listed; no spend-threshold free nights
  - issuer-official / high confidence
  - https://stories.hilton.com/releases/hilton-and-american-express-upgrade-hilton-honors-surpass-aspire-cards
  - https://frequentmiler.com/amex-hilton-aspire-review/
- **benefits** — ADD benefit "National Car Rental Emerald Club Executive Status", annualValue 50, description "Complimentary National Car Rental Emerald Club Executive status; enrollment required"
  - catalog today: No National Car Rental status listed
  - issuer-official / high confidence
  - https://stories.hilton.com/releases/hilton-and-american-express-upgrade-hilton-honors-surpass-aspire-cards
  - https://frequentmiler.com/amex-hilton-aspire-review/
- **benefits** — ADD benefit "$100 Waldorf Astoria & Conrad Property Credit", annualValue 100, description "Up to $100 in property credit on a two-night minimum stay booked with the Aspire Card at participating Waldorf Astoria and Conrad properties"
  - catalog today: No Waldorf Astoria / Conrad property credit listed
  - two-agreeing-secondary / high confidence
  - https://frequentmiler.com/amex-hilton-aspire-review/
  - https://upgradedpoints.com/credit-cards/american-express-hilton-honors-credit-cards/
- **benefits** — ADD benefit "Cell Phone Protection", annualValue 50, description "Up to $800 per claim (max 2 claims per 12 months) with a $50 deductible when the monthly wireless bill is paid with the card"
  - catalog today: No cell phone protection listed
  - issuer-official / medium confidence
  - https://stories.hilton.com/releases/hilton-and-american-express-upgrade-hilton-honors-surpass-aspire-cards
  - https://frequentmiler.com/amex-hilton-aspire-review/

### #42 Wyndham Rewards Earner+ Card (7)

- **cashbackCategories** — "Hotels by Wyndham (incl. Wyndham Travel Bundles)" @ 0.06 — rate cut from 8X to 6X AND gas removed from this category (gas now falls in the new 4X travel bucket)
  - catalog today: "Wyndham Hotels & Gas" @ 0.08
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
  - https://pointsnav.com/credit-cards/wyndham-rewards-earner-plus
- **cashbackCategories** — ADD "Travel (airfare, car rentals, rideshare, gas, EV charging, tolls, trains, Vacation Club)" @ 0.04
  - catalog today: (absent)
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
  - https://pointsnav.com/credit-cards/wyndham-rewards-earner-plus
- **benefits** — "15,000 Anniversary Bonus Points", annualValue 135 (15,000 pts x 0.9c)
  - catalog today: "7,500 Anniversary Bonus Points", annualValue 75
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
  - https://pointsnav.com/credit-cards/wyndham-rewards-earner-plus
- **benefits** — "Wyndham Diamond Status (Year 1), then Platinum" — Diamond for the first year, Platinum from year two onward
  - catalog today: "Automatic Wyndham Diamond Status" — description "Top-tier hotel elite status"
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
  - https://pointsnav.com/credit-cards/wyndham-rewards-earner-plus
- **benefits** — ADD "Meal Delivery Credit", annualValue 50 (up to $25 every 6 months)
  - catalog today: (absent)
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
  - https://pointsnav.com/credit-cards/wyndham-rewards-earner-plus
- **benefits** — ADD "National Car Rental Emerald Club Executive Status", annualValue ~60
  - catalog today: (absent)
  - two-agreeing-secondary / medium confidence · effective 2026-06-17
  - https://pointsnav.com/credit-cards/wyndham-rewards-earner-plus
  - https://www.thepointcalculator.com/us/wyndham-rewards-points/cards/wyndham-rewards-earner-plus-credit-card/
- **benefits** — ADD "Annual Free Night Award" — free night worth up to 15,000 points after 5 nights stayed; annualValue ~135
  - catalog today: (absent)
  - issuer-official / medium confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite

### #45 Bilt Mastercard (2)

- **cashbackCategories** — Obsolete structure. Bilt 2.0 replaces it. Bilt Blue ($0 AF): 1x everything + 4% back in Bilt Cash on everyday purchases. Bilt Obsidian ($95 AF): 3x dining OR groceries (cardholder picks one annually, capped $25,000/yr), 2x travel, 1x other. Bilt Palladium ($495 AF): 2x everyday spend, 4x Lyft. Housing (rent AND mortgage) earns up to 1.25x with no transaction fee, unlocked at 1,000 Bilt Points per $30 of Bilt Cash earned on everyday spend.
  - catalog today: Travel=0.02, Dining=0.03, Rent=0.01, Other=0.01 (default)
  - issuer-official / high confidence · effective 2026-02-07
  - https://newsroom.biltrewards.com/meetbiltcard2.0
  - https://www.bilt.com/card
- **benefits** — 'Rent Day 2x Bonus' (double points on non-rent purchases on the 1st of each month) no longer exists in Bilt 2.0 — the 100k pts/yr rent cap and Rent Day mechanic were replaced by the Bilt Cash unlock model. New tier benefits: Blue = $100 Bilt Cash at opening, no FTF; Obsidian = $100 annual Bilt Travel hotel credit, $200 Bilt Cash at opening, trip delay insurance, no FTF; Palladium = $400 annual Bilt Travel hotel credit, $200 annual Bilt Cash, $300 Bilt Cash at opening, Priority Pass lounge access (1,300+ lounges, 2 guests), Gold status.
  - catalog today: Pay Rent Without Fees ($200, up to 100k pts/yr); Rent Day 2x Bonus ($150); Cell Phone Protection ($100); Trip Delay & Cancellation Protection ($75)
  - issuer-official / high confidence · effective 2026-02-07
  - https://newsroom.biltrewards.com/meetbiltcard2.0
  - https://www.bilt.com/card

### #46 Robinhood Gold Card (1)

- **benefits** — A 3% foreign transaction fee now applies to accounts opened on or after 2026-07-01. Accounts opened before that date are grandfathered with no FTF. Robinhood removed the "no transaction fees" language from its site. Recommend adding an explicit "3% Foreign Transaction Fee (accounts opened on/after 2026-07-01)" note rather than a benefit.
  - catalog today: no foreign-transaction-fee entry; card was historically marketed as having no FTF and Robinhood's site previously said "no transaction fees"
  - two-agreeing-secondary / high confidence · effective 2026-07-01
  - https://www.uscreditcardguide.com/robinhood-gold-credit-card/
  - https://upgradedpoints.com/news/robinhood-gold-card-pros-cons/

### #47 Chase Ink Business Preferred (2)

- **cashbackCategories** — ADD category "Lyft" at rate 0.05 (5X total points on Lyft rides through 09/30/2027; not subject to the $150,000 combined cap).
  - catalog today: No Lyft category
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/ink/business-preferred
- **benefits** — ADD benefit "DashPass Membership + Monthly Grocery/Retail Credits" annualValue 120 (complimentary DashPass for 12+ months with up to $10/month in grocery and retail credits).
  - catalog today: No DashPass benefit listed
  - issuer-official / medium confidence
  - https://creditcards.chase.com/business-credit-cards/ink/business-preferred

### #48 Chase Ink Business Cash (3)

- **signupBonus** — "$1,000 cash back after $8,000 spend in first 4 months" (Chase page shows $750 struck through to $1,000), signupBonusValue 1000. All-time-high limited-time offer launched ~2026-06-12.
  - catalog today: "$350 after $3k spend, $400 more after $6k more in year 1", signupBonusValue 750
  - issuer-official / high confidence · effective 2026-06-12
  - https://creditcards.chase.com/business-credit-cards/ink/cash
  - https://www.nerdwallet.com/business/credit-cards/news/chase-ink-cash-and-unlimited-new-bonus-june-2026
- **cashbackCategories** — ADD category "Lyft" at rate 0.05 (5% total cash back on Lyft rides through 09/30/2027).
  - catalog today: No Lyft category
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/ink/cash
- **benefits** — ADD benefit "Instacart+ Membership (3 months) with $20 Monthly Credit" annualValue 60.
  - catalog today: No Instacart benefit listed
  - issuer-official / medium confidence
  - https://creditcards.chase.com/business-credit-cards/ink/cash

### #49 Chase Ink Business Unlimited (3)

- **signupBonus** — "$1,000 cash back after $8,000 spend in first 4 months", signupBonusValue 1000. Same limited-time offer as Ink Business Cash, launched ~June 2026.
  - catalog today: "$750 cash back after $6,000 spend in 3 months", signupBonusValue 750
  - issuer-official / high confidence · effective 2026-06-12
  - https://creditcards.chase.com/business-credit-cards/ink/unlimited
  - https://www.nerdwallet.com/business/credit-cards/news/chase-ink-cash-and-unlimited-new-bonus-june-2026
- **cashbackCategories** — ADD category "Lyft" at rate 0.05 (5% total cash back on Lyft rides through 09/30/2027). Base 1.5% is correct.
  - catalog today: Only "Other" at 0.015
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/ink/unlimited
- **benefits** — ADD benefit "Instacart+ Membership (3 months) with $20 Monthly Credit" annualValue 60.
  - catalog today: No Instacart benefit listed
  - issuer-official / medium confidence
  - https://creditcards.chase.com/business-credit-cards/ink/unlimited

### #50 Prime Visa (1)

- **cashbackCategories** — ADD category "Local Transit and Commuting (including rideshare)" at rate 0.02. Also note the 5% Amazon category officially covers Amazon.com and Audible.com.
  - catalog today: No local transit / commuting category
  - issuer-official / high confidence
  - https://creditcards.chase.com/cash-back-credit-cards/amazon-prime-rewards
  - https://media.chase.com/news/chase-and-amazon-announce-new-benefits-features-amazon-visa-card-portfolio

### #51 United Gateway Card (2)

- **benefits** — ADD '25% Back on United Inflight and Club Premium Drink Purchases' (statement credit); ADD 'Two Checked Bags Annually' unlocked after $10,000 in annual card spend; ADD '10% or More Off Award Flights' unlocked after $10,000 in annual card spend. Also correct the Trip Cancellation Insurance description: coverage is 'up to $1,500 per covered traveler and $6,000 per trip'. Purchase Protection ($500 per item, 120 days) is also present and unlisted.
  - catalog today: No Annual Fee ($0), 0% Intro APR for 12 Months ($100), Trip Cancellation Insurance ($75)
  - issuer-official / high confidence · effective 2025-03-24
  - https://creditcards.chase.com/travel-credit-cards/united/united-gateway
  - https://media.chase.com/news/united-refresh-2025
- **signupBonus** — Earn up to 40,000 bonus miles: 30,000 after $1,000 spend in the first 3 months, plus 10,000 for adding an authorized user. signupBonusValue ~480 at 1.2c.
  - catalog today: 20,000 bonus miles after $1,000 in 3 months (signupBonusValue 240)
  - issuer-official / medium confidence
  - https://creditcards.chase.com/travel-credit-cards/united/united-gateway

### #52 United Club Infinite Card (3)

- **benefits** — annualValue 750. Chase now states United Club membership is 'valued at $750+' per year, and the refresh added 4 United Club one-time passes on top of the membership.
  - catalog today: United Club Membership annualValue 650
  - issuer-official / high confidence · effective 2025-03-24
  - https://www.chase.com/personal/credit-cards/united/united-visa-infinite-card
  - https://media.chase.com/news/united-refresh-2025
- **benefits** — ADD: 'Up to $200' Renowned Hotels credit annually (annualValue 200); 'Up to $150' rideshare credits yearly (annualValue 150); 'Up to $200' JSX flight credits annually (annualValue 200); 'Up to $240' Instacart credits yearly plus complimentary Instacart+ membership (annualValue 240); 1,500 Card Bonus PQP annually; up to 20,000 miles per year in award flight discounts; '25% back on United Inflight and Club premium drink purchases'. Chase markets this as 'over $875 in partner credits'. Also update Free Checked Bags: Chase states first and second checked bags free, 'a savings of up to $360 per roundtrip' (catalog has $300).
  - catalog today: Only 4 benefits: United Club Membership ($650), Free Checked Bags ($300), Premier Access Travel Services ($150), Global Entry/TSA PreCheck/NEXUS Credit ($120). No partner credits.
  - issuer-official / high confidence · effective 2025-03-24
  - https://www.chase.com/personal/credit-cards/united/united-visa-infinite-card
  - https://creditcards.chase.com/travel-credit-cards/united
- **name** — United Club Card. Chase's card-lineup page, the Chase newsroom refresh release, and United's own 2026 press release all use 'United Club Card'. The legacy acquisition page at chase.com still shows 'United Club Visa Infinite Card', so the old name lingers in places — treat as a soft rebrand, not a product change. Note the old URL /travel-credit-cards/united/united-club-infinite now 404s.
  - catalog today: United Club Infinite Card
  - issuer-official / medium confidence · effective 2025-03-24
  - https://creditcards.chase.com/travel-credit-cards/united
  - https://media.chase.com/news/united-refresh-2025

### #53 Southwest Rapid Rewards Premier (3)

- **cashbackCategories** — Southwest Purchases=0.03 | Grocery Stores and Restaurants (first $8,000 combined per year)=0.02 | Other=0.01. REMOVE Hotels Via Southwest, Local Transit and Rideshare, Internet/Cable/Phone Services, Streaming, and Rapid Rewards Rental Cars — all ended 12/31/2025. ADD the 2X grocery/restaurant category, which Chase states as '2X points on the first $8,000 in combined purchases at grocery stores and restaurants per year'.
  - catalog today: Southwest Purchases=0.03 | Hotels Via Southwest=0.02 | Local Transit and Rideshare=0.02 | Internet, Cable, and Phone Services=0.02 | Streaming=0.02 | Rapid Rewards Rental Cars=0.02 | Other=0.01
  - issuer-official / high confidence · effective 2025-12-31
  - https://creditcards.chase.com/travel-credit-cards/southwest/premier
  - https://media.chase.com/news/chase-southwest-introduce-new-card-benefits
- **benefits** — REMOVE '2 EarlyBird Check-Ins per Year' — eliminated after 12/31/2025. KEEP 6,000 Anniversary Points and No Foreign Transaction Fees. ADD 'Free First Checked Bag' for cardmember and up to 8 passengers, saves up to $90 round trip (annualValue 90); ADD '15% Flight Discount Promo Code' each cardmember anniversary; ADD '10,000 Companion Pass Qualifying Points Boost' each year; ADD '25% Back on In-Flight Purchases'; ADD 'Standard/Preferred Seat Selection and Group 5 Boarding' (live 2026-01-27).
  - catalog today: 6,000 Anniversary Points ($84), 2 EarlyBird Check-Ins per Year ($50), No Foreign Transaction Fees ($30)
  - issuer-official / high confidence · effective 2025-12-31
  - https://creditcards.chase.com/travel-credit-cards/southwest/premier
  - https://media.chase.com/news/chase-southwest-introduce-new-card-benefits
- **signupBonus** — Earn 55,000 bonus points after you spend $1,500 on purchases in the first 3 months from account opening. signupBonusValue ~715 at 1.3c.
  - catalog today: 50,000 points after $1,000 in 3 months (signupBonusValue 700)
  - issuer-official / medium confidence
  - https://creditcards.chase.com/travel-credit-cards/southwest/premier

### #54 Marriott Bonvoy Bold (3)

- **signupBonus** — "Earn 60,000 Bonus Points after spending $1,000 on eligible purchases within 3 months of account opening." (signupBonusValue ~420 at 0.70 cpp). VOLATILE — do not auto-track.
  - catalog today: 30,000 points after $1,000 in 3 months (signupBonusValue 240)
  - issuer-official / high confidence
  - https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/bold
- **benefits** — ADD benefit "DashPass Membership" annualValue 120 — "One year complimentary DashPass membership plus $10 off quarterly on non-restaurant DoorDash orders."
  - catalog today: No DashPass benefit listed
  - issuer-official / high confidence · effective 2025-02-01
  - https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/bold
- **benefits** — ADD benefit "Instacart Credit" annualValue 120 — "$10 monthly Instacart statement credit through 12/31/2027 plus 3-month complimentary Instacart+ membership; active Instacart+ membership required."
  - catalog today: No Instacart credit benefit listed
  - two-agreeing-secondary / medium confidence · effective 2025-05-01
  - https://www.doctorofcredit.com/chase-adds-instacart-credits-for-most-cards-10-20-per-month-until-12-31-27/
  - https://thepointsguy.com/credit-cards/chase-now-offering-instacart-benefits-on-more-cards

### #55 IHG One Rewards Traveler (1)

- **benefits** — ADD benefit "Instacart Credit" annualValue 120 ($10/month through 12/31/2027, Instacart+ membership required, 3 months complimentary) and ADD benefit "DashPass Membership" annualValue 120 (one year complimentary DashPass plus $10 quarterly DoorDash credits).
  - catalog today: No Instacart or DashPass benefits listed
  - issuer-official / high confidence · effective 2025-05-01
  - https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/traveler
  - https://www.doctorofcredit.com/chase-adds-instacart-credits-for-most-cards-10-20-per-month-until-12-31-27/

### #56 American Express Business Gold (3)

- **benefits** — ADD benefit "$150 Squarespace Credit" — up to $150 in statement credits per calendar year on U.S. Squarespace purchases, enrollment required, usable in one lump (not monthly). annualValue 150
  - catalog today: No Squarespace credit listed (benefits: $240 Flexible Business Credit, $155 Walmart+ Credit, 25% Airline Bonus)
  - two-agreeing-secondary / high confidence · effective 2025-10-23
  - https://upgradedpoints.com/news/amex-business-gold-card-squarespace-credit/
  - https://www.nerdwallet.com/business/credit-cards/reviews/american-express-business-gold
- **benefits** — ADD benefit "$300 ChatGPT Business Credit" — up to $300 back per calendar year on U.S. purchases of ChatGPT Business subscriptions, enrollment required, redeemable all at once on monthly or annual subscriptions. annualValue 300
  - catalog today: No ChatGPT Business credit listed
  - two-agreeing-secondary / high confidence · effective 2026-05-12
  - https://upgradedpoints.com/news/amex-300-chatgpt-credit-business-gold-platinum/
  - https://www.cnbc.com/select/amex-adds-chatgpt-credit-business-platinum-and-business-gold-cards/
- **benefits** — annualValue 240 is still correct, but description should read "Up to $20/month at FedEx (through 10/01/2026), Grubhub, and U.S. Office Supply Stores; enrollment required" — Amex's own terms language now sunsets the FedEx leg on 10/01/2026
  - catalog today: $240 Flexible Business Credit — description "$20/month at FedEx, Grubhub, Office Supplies, etc."
  - two-agreeing-secondary / medium confidence · effective 2026-10-01
  - https://www.nerdwallet.com/business/credit-cards/reviews/american-express-business-gold
  - https://global.americanexpress.com/card-benefits/view-all/business-gold

### #57 American Express Business Platinum (9)

- **cashbackCategories** — rate 0.02 — the Sept/Dec 2025 refresh upgraded this tier from 1.5x to 2x. Covers U.S. construction material & hardware suppliers, U.S. electronic goods retailers, software & cloud system providers, U.S. shipping providers, and each eligible purchase of $5,000 or more; $2M/calendar-year cap unchanged
  - catalog today: "Select Business Categories and Large Purchases $5k+ (up to $2,000,000/yr combined)" rate 0.015
  - two-agreeing-secondary / high confidence · effective 2025-12-02
  - https://www.doctorofcredit.com/american-express-refreshes-platinum-business-platinum-cards-895-fee-175k-200k-bonus-many-new-credits/
  - https://upgradedpoints.com/credit-cards/reviews/amex-business-platinum/worth-it/
- **benefits** — Rename to "$150 Dell Technologies Credit" with annualValue 150 (base annual credit). Full advertised Dell value is up to $1,150/yr = $150 base + up to $1,000 additional after $5,000+ in eligible Dell purchases. $400 is the pre-refresh figure and no longer exists.
  - catalog today: "$400 Dell Credit" — "Up to $400/year in Dell Technologies statement credits", annualValue 400
  - two-agreeing-secondary / high confidence
  - https://upgradedpoints.com/credit-cards/reviews/amex-business-platinum/worth-it/
  - https://www.doctorofcredit.com/american-express-refreshes-platinum-business-platinum-cards-895-fee-175k-200k-bonus-many-new-credits/
- **benefits** — annualValue 250 — up to $250 annual Adobe statement credit, unlocked after spending $600 on eligible Adobe purchases. Rename to "$250 Adobe Credit".
  - catalog today: "$150 Adobe Credit" — "Annual Adobe statement credit", annualValue 150
  - two-agreeing-secondary / high confidence
  - https://upgradedpoints.com/credit-cards/reviews/amex-business-platinum/worth-it/
  - https://www.doctorofcredit.com/american-express-refreshes-platinum-business-platinum-cards-895-fee-175k-200k-bonus-many-new-credits/
- **benefits** — ADD "$600 Prepaid Hotel Credit" — up to $600/yr on Fine Hotels + Resorts or The Hotel Collection prepaid bookings via Amex Travel, delivered SEMI-ANNUALLY as $300 Jan–Jun and $300 Jul–Dec. annualValue 600
  - catalog today: No prepaid-hotel credit listed
  - two-agreeing-secondary / high confidence
  - https://www.doctorofcredit.com/american-express-refreshes-platinum-business-platinum-cards-895-fee-175k-200k-bonus-many-new-credits/
  - https://upgradedpoints.com/credit-cards/reviews/amex-business-platinum/worth-it/
- **benefits** — ADD "$200 Hilton for Business Credit" — up to $50 per QUARTER ($200/yr) on eligible Hilton purchases, enrollment required. annualValue 200
  - catalog today: No Hilton credit listed
  - two-agreeing-secondary / high confidence
  - https://www.doctorofcredit.com/american-express-refreshes-platinum-business-platinum-cards-895-fee-175k-200k-bonus-many-new-credits/
  - https://upgradedpoints.com/credit-cards/reviews/amex-business-platinum/worth-it/
- **benefits** — ADD "$219 CLEAR Plus Credit" — up to $219/yr covering a CLEAR Plus membership. annualValue 219. (Doctor of Credit's refresh post says $209, the older CLEAR price; two more recent sources say $219 — use 219.)
  - catalog today: No CLEAR credit listed
  - two-agreeing-secondary / high confidence
  - https://upgradedpoints.com/credit-cards/reviews/amex-business-platinum/worth-it/
  - https://awardwallet.com/credit-cards/amex-membership-rewards/amex-business-platinum/
- **benefits** — ADD "$120 Wireless Service Credit" — up to $10 per MONTH ($120/yr) on U.S. wireless telephone service purchases, enrollment required. annualValue 120
  - catalog today: No wireless service credit listed
  - two-agreeing-secondary / high confidence
  - https://www.doctorofcredit.com/american-express-refreshes-platinum-business-platinum-cards-895-fee-175k-200k-bonus-many-new-credits/
  - https://upgradedpoints.com/credit-cards/reviews/amex-business-platinum/worth-it/
- **benefits** — ADD "$300 ChatGPT Business Credit" — up to $300 back per calendar year on U.S. purchases of ChatGPT Business subscriptions, enrollment required. annualValue 300
  - catalog today: No ChatGPT Business credit listed
  - two-agreeing-secondary / high confidence · effective 2026-05-12
  - https://upgradedpoints.com/news/amex-300-chatgpt-credit-business-gold-platinum/
  - https://www.cnbc.com/select/amex-adds-chatgpt-credit-business-platinum-and-business-gold-cards/
- **benefits** — ADD "Global Entry / TSA PreCheck Credit" — up to $120 Global Entry every 4 years or $85 TSA PreCheck every 4.5 years. annualValue 30 (amortized, matching the Sapphire Preferred convention)
  - catalog today: No Global Entry / TSA PreCheck credit listed
  - two-agreeing-secondary / medium confidence
  - https://awardwallet.com/credit-cards/amex-membership-rewards/amex-business-platinum/
  - https://www.doctorofcredit.com/american-express-refreshes-platinum-business-platinum-cards-895-fee-175k-200k-bonus-many-new-credits/

### #60 Citi Strata Card (3)

- **cashbackCategories** — Relabel to "Self-Select Category (choose one per quarter)" at rate 0.03. The eligible choices are Fitness Clubs, Select Streaming Services, Live Entertainment, Cosmetic Stores / Barber Shops / Hair Salons, or Pet Supply Stores. Streaming is only one of five selectable options, not an always-on category, so a rewardRuleNote about quarterly selection should accompany it.
  - catalog today: "Select streaming" 0.03
  - issuer-official / high confidence
  - https://www.citi.com/credit-cards/citi-strata-credit-card
  - https://upgradedpoints.com/credit-cards/reviews/citi-strata-card/benefits/
- **cashbackCategories** — ADD category "Citi Travel hotels, car rentals, and attractions" at rate 0.05 (5X). Present on the card since its July 2025 launch.
  - catalog today: No Citi Travel category present
  - issuer-official / high confidence
  - https://www.citi.com/credit-cards/citi-strata-credit-card
  - https://upgradedpoints.com/credit-cards/reviews/citi-strata-card/benefits/
- **benefits** — REMOVE. Round Up (and 10% Points Back) were Citi Rewards+ features that did not carry over to the Citi Strata Card. Rewards+ holders who opened before 2024-07-20 lost them on 2025-07-20; those who opened 2024-07-20 through 2025-07-19 were grandfathered only until 2026-07-19, which has now passed. As of today no Strata Card holder has this benefit.
  - catalog today: "Round Up Rewards" — "Rewards can round up to the nearest 10 points on every purchase where applicable", annualValue 25
  - issuer-official / high confidence · effective 2026-07-19
  - https://www.citi.com/credit-cards/citi-strata-credit-card
  - https://upgradedpoints.com/news/citi-strata-card-replaces-citi-rewards-plus/

### #62 Citi / AAdvantage Executive World Elite (6)

- **cashbackCategories** — ADD category "AAdvantage Hotels and Cars (AAdvantageHotels.com / AAdvantageCars.com)" at rate 0.10 today, increasing to 0.12 on 2026-08-23. This category has existed on the card since well before May 2026 at 10x, so it was already missing; the 12x uplift is the new change.
  - catalog today: Only two categories present: "American Airlines" 0.04 and "Other" 0.01
  - issuer-official / high confidence · effective 2026-08-23
  - https://www.citi.com/credit-cards/citi-aadvantage-executive-credit-card
  - https://www.citigroup.com/global/news/press-release/2026/american-airlines-citi-elevate-premium-travel-enhanced-citi-aadvantage-executive-world-legend-mastercard
- **benefits** — ADD benefit "Lyft Credit" — up to $120/year today ($10/month after 3 eligible rides), increasing to up to $180/year ($15/month after 3 eligible rides) on 2026-08-23. Suggest annualValue 180 with effective date, or 120 until 2026-08-23.
  - catalog today: No Lyft credit listed
  - issuer-official / high confidence · effective 2026-08-23
  - https://www.citi.com/credit-cards/citi-aadvantage-executive-credit-card
  - https://news.aa.com/news/news-details/2026/American-Airlines-and-Citi-elevate-premium-travel-with-enhanced-Citi-AAdvantage-Executive-World-Legend-Mastercard-AADV-08/default.aspx
- **benefits** — ADD benefit "Avis / Budget Car Rental Credit" — up to $120 per calendar year on prepaid Avis and Budget rentals. Exists today and is explicitly retained in the AA newsroom release for the refreshed card. annualValue 120.
  - catalog today: No Avis/Budget credit listed
  - issuer-official / high confidence
  - https://www.citi.com/credit-cards/citi-aadvantage-executive-credit-card
  - https://news.aa.com/news/news-details/2026/American-Airlines-and-Citi-elevate-premium-travel-with-enhanced-Citi-AAdvantage-Executive-World-Legend-Mastercard-AADV-08/default.aspx
- **benefits** — ADD benefit "American Airlines Vacations Credit" — up to $500 per calendar year, delivered as $250 Jan-Jun and $250 Jul-Dec on eligible AA Vacations package bookings. New benefit effective 2026-08-23. annualValue 500.
  - catalog today: Not present
  - issuer-official / high confidence · effective 2026-08-23
  - https://www.citigroup.com/global/news/press-release/2026/american-airlines-citi-elevate-premium-travel-enhanced-citi-aadvantage-executive-world-legend-mastercard
  - https://news.aa.com/news/news-details/2026/American-Airlines-and-Citi-elevate-premium-travel-with-enhanced-Citi-AAdvantage-Executive-World-Legend-Mastercard-AADV-08/default.aspx
- **benefits** — ADD benefit "Inflight and Admirals Club Purchase Credit" — up to $100 per calendar year on eligible American Airlines inflight and Admirals Club purchases. New benefit effective 2026-08-23. annualValue 100.
  - catalog today: Not present
  - issuer-official / high confidence · effective 2026-08-23
  - https://www.citigroup.com/global/news/press-release/2026/american-airlines-citi-elevate-premium-travel-enhanced-citi-aadvantage-executive-world-legend-mastercard
  - https://news.aa.com/news/news-details/2026/American-Airlines-and-Citi-elevate-premium-travel-with-enhanced-Citi-AAdvantage-Executive-World-Legend-Mastercard-AADV-08/default.aspx
- **benefits** — ADD non-dollar status benefits effective 2026-08-23: "Omni Hotels Champion Status" (complimentary), "Omni Hotels Annual Free Night Reward" (100 Omni Credits annually, after a qualifying stay), and "Avis President's Club Status" (complimentary). No issuer-stated dollar value — recommend annualValue 0 or a conservative internal estimate rather than inventing one.
  - catalog today: Not present
  - issuer-official / high confidence · effective 2026-08-23
  - https://www.citigroup.com/global/news/press-release/2026/american-airlines-citi-elevate-premium-travel-enhanced-citi-aadvantage-executive-world-legend-mastercard
  - https://news.aa.com/news/news-details/2026/American-Airlines-and-Citi-elevate-premium-travel-with-enhanced-Citi-AAdvantage-Executive-World-Legend-Mastercard-AADV-08/default.aspx

### #63 JetBlue Plus Card (4)

- **benefits** — ADD "JetBlue Vacations Statement Credit", annualValue 100 — $100 statement credit each year after purchasing a JetBlue Vacations package of $100+
  - catalog today: (absent)
  - two-agreeing-secondary / high confidence
  - https://upgradedpoints.com/credit-cards/reviews/jetblue-plus-barclaycard/
  - https://money.usnews.com/credit-cards/barclaycard/jetblue-plus-card
- **benefits** — ADD "50% Inflight Savings", annualValue ~30 — 50% off eligible inflight food and cocktail purchases on JetBlue-operated flights
  - catalog today: (absent)
  - two-agreeing-secondary / high confidence
  - https://upgradedpoints.com/credit-cards/reviews/jetblue-plus-barclaycard/
  - https://money.usnews.com/credit-cards/barclaycard/jetblue-plus-card
- **benefits** — ADD "No Foreign Transaction Fees", annualValue ~30 — card carries a 0% foreign transaction fee
  - catalog today: (absent)
  - two-agreeing-secondary / high confidence
  - https://upgradedpoints.com/credit-cards/reviews/jetblue-plus-barclaycard/
  - https://money.usnews.com/credit-cards/barclaycard/jetblue-plus-card
- **cashbackCategories** — Rate 0.06 is correct, but the label understates scope: 6X applies to JetBlue, JetBlue Vacations AND TrueBlue Travel purchases. Suggest label "JetBlue, JetBlue Vacations & TrueBlue Travel".
  - catalog today: "JetBlue Purchases" @ 0.06
  - two-agreeing-secondary / medium confidence
  - https://upgradedpoints.com/credit-cards/reviews/jetblue-plus-barclaycard/
  - https://money.usnews.com/credit-cards/barclaycard/jetblue-plus-card

### #64 Hawaiian Airlines World Elite Mastercard (1)

- **rewardProgram** — "Atmos Rewards" (rewardUnitName "Points", rewardType "points"). HawaiianMiles formally merged into Alaska's Atmos Rewards on 2025-10-01 with balances converted 1:1; cardholders have earned Atmos Rewards points since that date.
  - catalog today: "HawaiianMiles" (rewardUnitName "Miles", rewardType "miles")
  - two-agreeing-secondary / high confidence · effective 2025-10-01
  - https://frequentmiler.com/hawaiian-airlines-cards-issued-by-barclays-still-available-for-now/
  - https://upgradedpoints.com/news/barclays-american-hawaiian-credit-cards-update/

### #66 Aeroplan Card (2)

- **benefits** — All three existing entries verified correct. ADD 'Global Entry / TSA PreCheck / NEXUS Credit' — 'one statement credit every four years (up to $120)' (annualValue 30); ADD 'DashPass Membership' — 12 months complimentary DashPass, then up to $10 off quarterly on non-restaurant DoorDash orders (annualValue 120); ADD 'Monthly Spend Bonus' — 500 bonus points for every $2,000 spent in a calendar month, up to 1,500 points per month.
  - catalog today: Free First Checked Bag ($240), 25K Aeroplan Status ($200), No Foreign Transaction Fees ($30)
  - issuer-official / high confidence
  - https://creditcards.chase.com/travel-credit-cards/aircanada/aeroplan
- **signupBonus** — Earn 60,000 bonus points after spending $3,000 on purchases in the first 3 months. signupBonusValue ~840 at 1.4c. This is a downgrade from the catalog's recorded offer.
  - catalog today: 75,000 Aeroplan points after $4,000 in 3 months (signupBonusValue 1100)
  - issuer-official / medium confidence
  - https://creditcards.chase.com/travel-credit-cards/aircanada/aeroplan

### #67 US Bank Altitude Reserve (1)

- **benefits** — Rename/redescribe to "$325 U.S. Bank Travel Center Credit". Effective 2025-12-15 the $325 annual credit is restricted to purchases made through the U.S. Bank Travel Center and no longer applies to general restaurant and travel purchases. Dollar amount ($325) and annual cadence unchanged.
  - catalog today: "$325 Travel & Dining Credit" (annualValue 325), described as applying to eligible travel and dining purchases
  - two-agreeing-secondary / high confidence · effective 2025-12-15
  - https://upgradedpoints.com/news/us-bank-altitude-reserve-card-changes/
  - https://www.nerdwallet.com/credit-cards/news/us-bank-altitude-reserve-making-major-negative-changes

### #68 US Bank Altitude Go (2)

- **benefits** — "0% Intro APR for 15 Billing Cycles" — the issuer page states 0% intro APR on purchases and balance transfers for the first 15 billing cycles, not 12 months.
  - catalog today: "0% Intro APR for 12 Months" (annualValue 100)
  - issuer-official / high confidence
  - https://www.usbank.com/credit-cards/altitude-go-visa-signature-credit-card.html
- **benefits** — REMOVE. The U.S. Bank Altitude Go does not offer cell phone protection. It is absent from the issuer product page benefit list and from AwardWallet's current benefit rundown. (Cell phone protection on the U.S. Bank lineup sits on the Shield Visa and Business Triple Cash, and formerly on Altitude Connect until 2024-09-09.)
  - catalog today: "Cell Phone Protection" (annualValue 75)
  - issuer-official / medium confidence
  - https://www.usbank.com/credit-cards/altitude-go-visa-signature-credit-card.html
  - https://awardwallet.com/news/credit-cards/changes-to-us-bank-altitude-go/

### #70 Discover it Student Cash Back (1)

- **benefits** — REMOVE. Discover's Good Grades Reward was discontinued (2021) and is not listed anywhere on the current discover.com Discover it Student Cash Back product page. This was already wrong at the May 2026 review.
  - catalog today: Good Grades Reward ($20) — '$20 statement credit per year for GPA 3.0+'
  - issuer-official / medium confidence
  - https://www.discover.com/credit-cards/student-credit-card/it-card.html
  - https://wallethub.com/d/discover-it-for-students-credit-card-802c

### #71 Discover it Secured (2)

- **cashbackCategories** — Replace with: 'Rotating Categories (up to $1,500/quarter, activation required)'=0.05 and 'Other'=0.01 (default). The relaunched card now runs the same 5% quarterly rotating calendar as Discover it Cash Back; the 2% gas/restaurants tiers are gone. Discover.com's own product page lists only 5% rotating + 1% base.
  - catalog today: Gas (up to $1,000/quarter combined)=0.02, Restaurants (up to $1,000/quarter combined)=0.02, Other=0.01 (default)
  - issuer-official / high confidence · effective 2026-06-02
  - https://www.discover.com/credit-cards/secured/
  - https://www.moneyatlas.com/review/discover-it-secured
- **benefits** — Update description: refundable security deposit is now $49, $99, or $200 based on creditworthiness (previously a flat $200 minimum), unlocking a credit line of at least $200. Keep annualValue 50.
  - catalog today: Build Credit Securely ($50) — 'Refundable security deposit becomes credit limit'
  - issuer-official / high confidence · effective 2026-06-02
  - https://www.discover.com/credit-cards/secured/
  - https://www.moneyatlas.com/review/discover-it-secured

### #73 Choice Privileges Select Mastercard (1)

- **benefits** — ADD benefit 'Automatic Platinum Elite Status + Elite Qualifying Nights' — Wells Fargo's own card terms grant 10 Elite Qualifying Nights within 14 days of account opening plus 10 more each January while the account is open (20 EQNs/yr ongoing), and secondary reviews confirm automatic Choice Privileges Platinum Elite status. This is a material omission.
  - catalog today: Anniversary Bonus ($180); Global Entry / TSA PreCheck Credit ($120); No Foreign Transaction Fee ($50); Cell Phone Protection ($100) — no elite status benefit listed
  - issuer-official / high confidence
  - https://www.wellsfargo.com/credit-cards/choice-select/terms/
  - https://frequentmiler.com/choiceselect/

### #75 TD Double Up Credit Card (1)

- **signupBonus** — $200 Cash Back after spending $1,500 within the first 90 days after account opening (signupBonusValue 200)
  - catalog today: $150 cash back after $1,000 in 90 days (signupBonusValue 150)
  - issuer-official / high confidence
  - https://www.td.com/us/en/personal-banking/credit-cards/double-up

### #80 TD Aeroplan Visa Infinite (1)

- **cashbackCategories** — ADD category "Hyatt" at rate 0.015 — TD's own page now states primary cardholders earn 1.5 Aeroplan points per $1 CAD of eligible Hyatt spend, running 2026-07-15 through 2029-07-15, capped at $80,000 eligible Hyatt spend per year. (Separately, and NOT an Aeroplan-earn change, cardholders also get 1 World of Hyatt point per $1 on the same spend — do not model that as a cashbackCategory.)
  - catalog today: Air Canada 0.015, Groceries 0.015, Gas 0.015, Other 0.01 (no Hyatt category)
  - issuer-official / high confidence · effective 2026-07-15
  - https://www.td.com/ca/en/personal-banking/products/credit-cards/aeroplan/aeroplan-visa-infinite-card
  - https://www.aircanada.com/ca/en/aco/home/aeroplan/credit-cards/td/personal.html

### #81 Scotiabank Passport Visa Infinite (6)

- **cashbackCategories** — 0.02 — issuer terms read "You are awarded two (2) Scene+ Points for every $1.00 in grocery, dining, entertainment and daily transit purchases." Only participating Sobeys-family grocery earns 3x. This was ALSO the rate structure in the older non-plus welcome kit, so the catalog's 0.03 was wrong at the May 2026 review, not a new downgrade.
  - catalog today: Dining rate 0.03
  - issuer-official / high confidence
  - https://www.scotiabank.com/ca/en/personal/credit-cards/visa/passport-infinite-card.html
  - https://www.scotiabank.com/content/dam/scotiabank/canada/common/documents/pdf/credit_card/Scotiabank_Passport_Infinite_plus_Visa-EN-Ekit.pdf
- **cashbackCategories** — 0.02 — same issuer clause; entertainment sits in the 2x accelerated tier, not the 3x tier.
  - catalog today: Entertainment rate 0.03
  - issuer-official / high confidence
  - https://www.scotiabank.com/ca/en/personal/credit-cards/visa/passport-infinite-card.html
  - https://www.scotiabank.com/content/dam/scotiabank/canada/common/documents/pdf/credit_card/Scotiabank_Passport_Infinite_plus_Visa-EN-Ekit.pdf
- **cashbackCategories** — 0.02 — same issuer clause; daily transit (ride-share, buses, taxis, subways) sits in the 2x accelerated tier.
  - catalog today: Daily transit rate 0.03
  - issuer-official / high confidence
  - https://www.scotiabank.com/ca/en/personal/credit-cards/visa/passport-infinite-card.html
  - https://www.scotiabank.com/content/dam/scotiabank/canada/common/documents/pdf/credit_card/Scotiabank_Passport_Infinite_plus_Visa-EN-Ekit.pdf
- **cashbackCategories** — SPLIT into two categories: rename existing to "Groceries at Sobeys, Safeway, IGA, Foodland, FreshCo, Thrifty Foods, Rachelle-Bery, Les Marches Tradition, Voila and participating Co-ops" at 0.03, and ADD "Other grocery stores" at 0.02. Issuer terms award 3 points only at the listed banners; all other grocery earns 2 points.
  - catalog today: single "Groceries" category at 0.03
  - issuer-official / high confidence
  - https://www.scotiabank.com/content/dam/scotiabank/canada/common/documents/pdf/credit_card/Scotiabank_Passport_Infinite_plus_Visa-EN-Ekit.pdf
  - https://www.scotiabank.com/ca/en/personal/credit-cards/visa/passport-infinite-card.html
- **name** — Scotiabank Passport Visa Infinite + — the product page at the catalog's existing sourceUrl now serves the "+" card, and Scotiabank publishes a separate "Passport Infinite plus" welcome kit (PDF authored 2026-03-27). Fee, earn structure and 6 lounge visits are identical, so this is a rename/repackage rather than a new product. Because the "+" kit predates the May 2026 review I am tagging this was-already-wrong, but I could not pin the public launch date.
  - catalog today: Scotiabank Passport Visa Infinite
  - issuer-official / medium confidence
  - https://www.scotiabank.com/ca/en/personal/credit-cards/visa/passport-infinite-card.html
  - https://www.scotiabank.com/content/dam/scotiabank/canada/common/documents/pdf/credit_card/Scotiabank_Passport_Infinite_plus_Visa-EN-Ekit.pdf
- **cashbackCategories** — ADD "Hotels and car rentals booked through Scene+ Travel". LOW CONFIDENCE ON THE RATE: Scotiabank's page words it as "an extra 3 Scene+ points for every $1" on top of the 1x base (= 4x total, and Milesopedia says "up to 4X"), while Ratehub renders it flatly as 3x. Suggest 0.04 but re-verify before editing.
  - catalog today: no travel-portal category
  - single-secondary / low confidence
  - https://www.scotiabank.com/ca/en/personal/credit-cards/visa/passport-infinite-card.html
  - https://milesopedia.com/en/credit-cards/scotiabank-passport-visa-infinite-card/

### #83 CIBC Aventura Visa Infinite (1)

- **benefits** — ADD benefit "Skip+ Membership" — complimentary first-year Skip+ membership giving $0 delivery fees and a $10 monthly voucher; CIBC states a first-year value of $110. Suggested annualValue 110 (first year only; note it is not recurring).
  - catalog today: benefits list has Airport Lounge Visits, NEXUS Rebate, Annual Fee Rebate Offer — no Skip+ benefit
  - issuer-official / medium confidence
  - https://www.cibc.com/en/personal-banking/credit-cards/all-credit-cards/aventura-visa-infinite-card.html
  - https://milesopedia.com/en/credit-cards/cibc-aventura-visa-infinite-card/

### #85 Rogers Red World Elite Mastercard (1)

- **cashbackCategories** — Rates themselves are still correct, but Rogers Bank imposed a NEW $61,000 annual spend cap on the accelerated rates effective 2026-08-04. Once $61,000 in annual spend is reached, both the 3% USD rate and the 2% Rogers-subscriber rate drop to the 1.5% base rate for the remainder of the annual period. Add a cap note/threshold to the two accelerated categories.
  - catalog today: U.S. dollar purchases 0.03, Non-U.S. purchases with eligible Rogers service 0.02, Other non-U.S. purchases 0.015 (default) — no spending cap modelled
  - two-agreeing-secondary / high confidence · effective 2026-08-04
  - https://milesopedia.com/en/news/finance/rogers-mastercard-cards-annual-spending-limits-starting-august-2026/
  - https://princeoftravel.com/news/rogers-red-mastercard-annual-spending-caps/

### #87 National Bank World Elite Mastercard (3)

- **cashbackCategories** — ADD category "A la carte Travel" at rate 0.02 — nbc.ca lists it as its own earning tier: "2 points per dollar in purchases".
  - catalog today: no travel category (Groceries 0.05, Restaurants 0.05, Gas 0.02, Recurring payments 0.02, Other 0.01)
  - issuer-official / high confidence
  - https://www.nbc.ca/personal/mastercard-credit-cards/world-elite.html
- **cashbackCategories** — The 5x rate on groceries + restaurants applies only until $2,500 in GROSS MONTHLY purchases is charged; above that threshold those categories earn 2 points per dollar (0.02), NOT the 1x default. Add a monthly cap of $2,500 with a post-cap rate of 0.02.
  - catalog today: Groceries 0.05 and Restaurants 0.05 with no cap; implied post-cap fallback is the 0.01 default
  - issuer-official / high confidence
  - https://www.nbc.ca/personal/mastercard-credit-cards/world-elite.html
- **benefits** — nbc.ca describes the lounge perk only as free and unlimited access to the National Bank Lounge at Montreal-Trudeau (YUL) with one guest and two children aged 12 or under. It makes no mention of Mastercard Travel Pass / DragonPass. FLAGGED LOW CONFIDENCE: the issuer page not naming DragonPass is not proof it is absent, but the current description looks wrong and the $200 valuation is dubious for a single-airport lounge. Re-verify before editing.
  - catalog today: Benefit "Airport Lounge Access" described as "World Elite lounge access benefits through Mastercard Travel Pass / DragonPass where eligible", annualValue 200
  - issuer-official / low confidence
  - https://www.nbc.ca/personal/mastercard-credit-cards/world-elite.html

### #88 American Express Green Card (1)

- **benefits** — CLEAR Plus Credit, annualValue 219, "Up to $219 per calendar year in statement credits for an eligible CLEAR Plus membership." — same 2026-07-01 CLEAR price increase that Amex matched across Platinum, Business Platinum, Green and Hilton Aspire.
  - catalog today: CLEAR Plus Credit, annualValue 209, "Up to $209 in annual statement credits for an eligible CLEAR Plus membership."
  - two-agreeing-secondary / high confidence · effective 2026-07-01
  - https://upgradedpoints.com/news/clear-plus-membership-price-increase-july-2026/
  - https://dannydealguru.com/clear-raises-membership-price-to-219/

### #91 Chase Freedom Rise (2)

- **cashbackCategories** — ADD category "Lyft" at rate 0.02 (2% total cash back on Lyft through 09/30/2027). Base 1.5% on all other purchases is correct.
  - catalog today: Only "Other" at 0.015
  - issuer-official / high confidence
  - https://creditcards.chase.com/cash-back-credit-cards/freedom/rise
- **signupBonus** — "Limited time: 3% cash back on dining on up to $6,000 spent in the first 6 months, plus $25 statement credit for enrolling in automatic payments within the first 3 months (must stay enrolled 90 days)". The 3% dining portion is a new limited-time welcome offer; the $25 autopay credit is long-standing and was already missing.
  - catalog today: null (no signup bonus), signupBonusValue null
  - issuer-official / medium confidence · effective 2026-06
  - https://creditcards.chase.com/cash-back-credit-cards/freedom/rise
  - https://www.nerdwallet.com/credit-cards/news/chase-freedom-rise-enhances-bonus

### #93 Chase Ink Business Premier (2)

- **cashbackCategories** — ADD category "Travel via Chase Travel" at rate 0.05 (5% cash back on travel purchased through Chase Travel). The other three existing categories are correct as listed.
  - catalog today: Categories: Large Purchases $5k+ 0.025, Other business purchases 0.02 (default), Lyft through 9/30/2027 0.05 — no Chase Travel category
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/ink/premier
- **benefits** — ADD benefit "Cell Phone Protection" (up to $1,000 per claim when the business phone bill is paid with the card). Suggested annualValue 150.
  - catalog today: No cell phone protection listed
  - issuer-official / medium confidence
  - https://creditcards.chase.com/business-credit-cards/ink/premier

### #94 United Business Card (1)

- **benefits** — The $600 total is still accurate, but Chase now itemizes it and the catalog should too: '$125 United travel credit' after 5 United flights of $100+ per calendar year; 'Up to $100' United Hotels credits annually (two $50 credits); 'Up to $100' rideshare credits per calendar year (monthly opt-in required); 'Up to $50' Avis/Budget credits annually; 'Up to $120' Instacart credits per calendar year; 'Up to $100' JSX credits annually; 'Up to $25' FareLock credits annually. Also missing entirely: two continental-U.S. Economy Plus upgrades, and up to 4,000 PQP earned at 1 PQP per $20 spent.
  - catalog today: Partner Credits ($600) — single lumped entry: 'Issuer advertises over $600 in annual partner credits across United travel, hotels, rideshare, car rental, Instacart, JSX, and FareLock.'
  - issuer-official / high confidence · effective 2025-03-24
  - https://creditcards.chase.com/business-credit-cards/united/united-business-card
  - https://media.chase.com/news/united-refresh-2025

### #95 World of Hyatt Business Credit Card (3)

- **signupBonus** — "Earn 70,000 Bonus Points after you spend $7,000 on purchases in the first 3 months of account opening." (signupBonusValue ~1190 at 1.7 cpp). VOLATILE — do not auto-track.
  - catalog today: 60,000 bonus points after $5,000 spend in 3 months (signupBonusValue 900)
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/world-of-hyatt/hyatt-business-card
  - https://creditcards.chase.com/travel-credit-cards/world-of-hyatt
- **benefits** — ADD benefit "Tier-Qualifying Night Credits" annualValue 50 — "Earn 5 Tier-Qualifying Night credits for every $10,000 in purchases each calendar year."
  - catalog today: No tier-qualifying night credit benefit listed
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/world-of-hyatt/hyatt-business-card
- **benefits** — Keep annualValue 100 but correct the description/cadence: "$50 statement credit per qualifying Hyatt purchase (single transactions of $50 or more), up to 2 times each anniversary year, for a total of $100."
  - catalog today: "Hyatt Statement Credits" — description "Up to $100 in Hyatt statement credits each anniversary year when requirements are met." (annualValue 100)
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/world-of-hyatt/hyatt-business-card

### #96 Southwest Rapid Rewards Performance Business (1)

- **benefits** — ADD 'Global Entry, TSA PreCheck or NEXUS Fee Credit' up to $120 every 4 years (annualValue 30) — a concrete, issuer-stated credit missing entirely; ADD '9,000 Anniversary Points' each year after cardmember anniversary (annualValue ~117 at 1.3c) — the catalog has no anniversary-points benefit for this card at all; ADD '10,000 Companion Pass Qualifying Points Boost' each year; ADD '25% Back on In-Flight Purchases'; ADD '2,500 Tier Qualifying Points per $5,000 spent annually'. The lumped 'Business Travel Perks ($150)' entry should be replaced by these itemized benefits.
  - catalog today: Seat and Upgrade Benefits ($200), Free First Checked Bag ($180), Business Travel Perks ($150)
  - issuer-official / high confidence · effective 2025-07-24
  - https://creditcards.chase.com/business-credit-cards/southwest/performance-business
  - https://media.chase.com/news/chase-southwest-introduce-new-card-benefits

### #97 Southwest Rapid Rewards Premier Business (1)

- **benefits** — Both existing entries are accurate. ADD three issuer-stated benefits that are missing: '15% Flight Discount Promo Code' each cardmember anniversary; '10,000 Companion Pass Qualifying Points Boost' each calendar year; '25% Back on In-Flight Purchases' (statement credit). Also '2,000 Tier Qualifying Points per $5,000 spent' toward A-List. Annual fee ($149), all earning categories, and the signup bonus (60,000 after $3,000 in 3 months) were verified correct.
  - catalog today: Southwest Travel Benefits ($200), 6,000 Anniversary Points ($78)
  - issuer-official / high confidence · effective 2025-07-24
  - https://creditcards.chase.com/business-credit-cards/southwest/premier-business
  - https://media.chase.com/news/chase-southwest-introduce-new-card-benefits

### #98 Capital One VentureOne Rewards (2)

- **cashbackCategories** — ADD category "Capital One Entertainment" at rate 0.05 (5X miles)
  - catalog today: No Capital One Entertainment category present
  - issuer-official / high confidence
  - https://www.capitalone.com/learn-grow/money-management/venture-vs-ventureone/
- **cashbackCategories** — Relabel to "Hotels, vacation rentals, rental cars and activities booked through Capital One Travel" = 0.05 (rate unchanged)
  - catalog today: [401] "Capital One Travel hotels and rental cars" = 0.05
  - issuer-official / medium confidence
  - https://www.capitalone.com/learn-grow/money-management/venture-vs-ventureone/

### #99 Capital One Venture Business (3)

- **signupBonus** — "100,000 bonus miles after you spend $10,000 in the first 3 months" (signupBonusValue 1000). The up-to-150K launch offer (75K after $7,500 in 3 months + 75K after $30,000 in 6 months) ended 2026-06-08 and was replaced 2026-06-09.
  - catalog today: "Up to 150,000 bonus miles after qualifying spend" (signupBonusValue 1500)
  - issuer-official / high confidence · effective 2026-06-09
  - https://www.capitalone.com/small-business/credit-cards/venture-business/
  - https://www.doctorofcredit.com/capital-one-rebrands-spark-miles-spark-miles-select-to-venture-business-and-ventureone-business/
- **benefits** — Replace the vague placeholder with the two real credits added at the 2026-04-14 rebrand: "$50 Annual Capital One Business Travel Credit" annualValue 50, and "$50 Annual Advertising/Software Statement Credit" annualValue 50 (up to $50 annual statement credit at qualifying advertising or software merchants).
  - catalog today: [358] "Available Annual Credits" annualValue 100, description "Issuer advertises available annual credits for eligible travel and business purchases."
  - issuer-official / high confidence · effective 2026-04-14
  - https://www.capitalone.com/small-business/credit-cards/venture-business/
  - https://frequentmiler.com/capital-one-spark-miles-rebranded-to-venture-business-up-to-150k-welcome-offer-up-to-100-in-new-credits/
- **cashbackCategories** — Relabel to "Hotels, vacation rentals and rental cars booked through Capital One Business Travel" = 0.05 (rate unchanged)
  - catalog today: [403] "Capital One Business Travel hotels and rental cars" = 0.05
  - issuer-official / medium confidence
  - https://www.capitalone.com/small-business/credit-cards/venture-business/

### #100 Capital One Venture X Business (3)

- **benefits** — ADD benefit "Global Entry / TSA PreCheck Credit" annualValue 30, description "Up to a $120 statement credit for Global Entry or TSA PreCheck every 4 years"
  - catalog today: absent
  - issuer-official / high confidence
  - https://www.capitalone.com/small-business/credit-cards/venture-x-business/
- **benefits** — ADD benefit "Premier Collection Experience Credit" annualValue 100, description "$100 experience credit on Premier Collection luxury hotel and vacation rental bookings through Capital One Business Travel"
  - catalog today: absent
  - issuer-official / high confidence
  - https://www.capitalone.com/small-business/credit-cards/venture-x-business/
- **cashbackCategories** — ADD category "Capital One Entertainment" at rate 0.05 (5X miles)
  - catalog today: No Capital One Entertainment category present
  - two-agreeing-secondary / medium confidence · effective 2024-02-28
  - https://awardwallet.com/credit-cards/capital-one-rewards/capital-one-entertainment/
  - https://thepointsguy.com/news/new-venture-bonus-category-entertainment

### #103 Citi Strata Elite Card (1)

- **benefits** — ADD benefit "Global Entry / TSA PreCheck Credit" — up to $120 statement credit every four years; annualValue 30 (matches how card #62 models the same perk). Listed on Citi's own Strata Elite product page.
  - catalog today: Not present (only $300 hotel, $200 Splurge, $200 Blacklane, lounge access are listed)
  - issuer-official / high confidence
  - https://www.citi.com/credit-cards/citi-strata-elite-credit-card
  - https://upgradedpoints.com/credit-cards/reviews/citi-strata-elite-card/

### #104 Bank of America Unlimited Cash Rewards (1)

- **signupBonus** — "$250 online cash rewards bonus after making at least $1,000 in purchases in the first 90 days of account opening" (signupBonusValue 250). Quoted verbatim from the Bank of America product page on 2026-08-06. This is an elevated/limited-time offer and some secondary sources still show $200 — VOLATILE, recommend do-not-auto-track. The card's first-year 2% / ongoing 1.5% category structure in the catalog is CORRECT and still live.
  - catalog today: "$200 online cash rewards bonus after $1,000 spend in 90 days" (signupBonusValue 200)
  - issuer-official / medium confidence
  - https://www.bankofamerica.com/credit-cards/products/unlimited-cash-back-credit-card/

### #106 Bank of America Premium Rewards Elite (1)

- **benefits** — ADD "Priority Pass Select Membership" — up to FOUR complimentary 12-month Priority Pass Select memberships (cardholder plus up to three others), unlimited visits to 1,500+ lounges worldwide. This is the largest omitted benefit on a $550-annual-fee card. Suggested annualValue 469 (one Prestige-equivalent membership), higher if the app credits the multi-membership perk.
  - catalog today: No Priority Pass / lounge access benefit present (only airline incidental, lifestyle, Global Entry, and 20% airfare points savings)
  - issuer-official / high confidence
  - https://www.bankofamerica.com/credit-cards/products/premium-rewards-elite-credit-card/
  - https://www.nerdwallet.com/credit-cards/learn/5-things-to-know-about-the-bank-of-america-premium-rewards-elite-credit-card

### #110 Choice Privileges Mastercard (1)

- **benefits** — ADD benefit 'Elite Night Credits / Gold Status' — 10 elite night credits each calendar year, enough to qualify for at least Choice Privileges Gold status. Also missing 'No Foreign Transaction Fee'. Note the existing 'Choice Hotel Rewards ($80)' entry is a restatement of the earn rates, not a distinct benefit.
  - catalog today: No Annual Fee ($0); Cell Phone Protection ($100); Choice Hotel Rewards ($80) — no elite status benefit listed
  - two-agreeing-secondary / medium confidence
  - https://www.nerdwallet.com/credit-cards/reviews/choice-privileges-card
  - https://awardwallet.com/credit-cards/choice-privileges/choice-privileges-credit-card/

### #113 U.S. Bank Shield Visa (1)

- **benefits** — ADD "$20 Annual Statement Credit" (annualValue 20), awarded after 11 consecutive calendar months of purchases. ADD "Cell Phone Protection" — up to $600 reimbursement for a stolen or damaged phone when the monthly cell bill is paid with the card, $100 deductible, max one claim per 12 months (suggested annualValue 75, matching the catalog's convention on other cards).
  - catalog today: Only "Long Intro APR" and "No Annual Fee Protection Card" present
  - issuer-official / high confidence
  - https://www.usbank.com/credit-cards/shield-visa-credit-card.html
  - https://www.cnbc.com/select/us-bank-shield-visa-review/

### #114 U.S. Bank Business Triple Cash Rewards (2)

- **benefits** — ADD "$100 Annual Software Subscription Credit" (annualValue 100) — annual statement credit for recurring software subscription expenses (e.g. QuickBooks), awarded per 12-month period after 11 consecutive months of eligible purchases. This is the card's headline benefit and has existed since launch. Also consider adding "Cell Phone Protection", which this card carries.
  - catalog today: Only "Business Category Cash Back" and "No Annual Fee" present
  - issuer-official / high confidence
  - https://www.usbank.com/business-banking/business-credit-cards/business-triple-cash-back-credit-card.html
  - https://www.cnbc.com/select/us-bank-business-triple-cash-rewards/
- **signupBonus** — "$750 cash back after $6,000 or more in eligible net purchases on the Account Owner's card in the first 180 days". signupBonusValue should be 750. Confirmed on the issuer page and corroborated by Forbes Advisor and CNBC Select. Note this is a cash-back product — expressing the bonus as "60,000 bonus points" is also a framing error.
  - catalog today: "60,000 bonus points after $6,000 spend in 120 days" (signupBonusValue 600)
  - issuer-official / medium confidence
  - https://www.usbank.com/business-banking/business-credit-cards/business-triple-cash-back-credit-card.html
  - https://www.forbes.com/advisor/d/us-bank-triple-cash-rewards-visa-business-card-limited-time-welcome-bonus/

### #115 U.S. Bank Business Leverage Visa Signature (1)

- **benefits** — ADD benefit "Intro First-Year Annual Fee Waived" (annualValue 95) — the issuer states "$0 intro annual fee for the first year, $95 thereafter". The ongoing annualFee of 95 is correct; only the first-year waiver is missing. The catalog already models this pattern on card #112 ("Intro First-Year Fee").
  - catalog today: annualFee 95 with no first-year-waiver benefit listed
  - issuer-official / high confidence
  - https://www.usbank.com/business-banking/business-credit-cards/business-leverage-rewards-credit-card.html

### #120 Wyndham Rewards Earner Card (4)

- **cashbackCategories** — "Hotels by Wyndham" @ 0.05 — gas is no longer part of this 5X bucket; it moved to the 3X bucket
  - catalog today: "Wyndham hotels and gas" @ 0.05
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
  - https://www.thepointcalculator.com/us/wyndham-rewards-points/cards/wyndham-rewards-earner-plus-credit-card/
- **cashbackCategories** — "Dining" @ 0.03 (2X -> 3X)
  - catalog today: "Restaurants" @ 0.02
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
- **cashbackCategories** — ADD "Gas and EV Charging" @ 0.03
  - catalog today: (absent)
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
- **benefits** — ADD "10% Off Award Redemptions" (10% free night discount), annualValue ~75
  - catalog today: (absent)
  - issuer-official / medium confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite

### #121 Wyndham Rewards Earner Business Card (5)

- **cashbackCategories** — "Hotels by Wyndham" @ 0.08 — rate unchanged at 8X but gas moved out of this bucket into the 5X bucket
  - catalog today: "Wyndham hotels and gas" @ 0.08
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
  - https://www.thepointcalculator.com/us/wyndham-rewards-points/cards/wyndham-rewards-earner-plus-credit-card/
- **cashbackCategories** — "Gas, EV charging, marketing, office supplies, and shipping" @ 0.05 — utilities dropped; gas/EV, office supplies and shipping added
  - catalog today: "Marketing, advertising, and utilities" @ 0.05
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
- **benefits** — ADD "Warehouse Club Membership Credit", annualValue 65
  - catalog today: (absent)
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
- **benefits** — ADD "Accounting Software Credit", annualValue 50 (up to $50/year)
  - catalog today: (absent)
  - issuer-official / high confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite
- **benefits** — ADD "20% Off Award Redemptions" (20% free night discount), annualValue ~150
  - catalog today: (absent)
  - issuer-official / medium confidence · effective 2026-06-17
  - https://investor.wyndhamhotels.com/news-events/press-releases/detail/422/wyndham-and-barclays-launch-updated-credit-card-suite

### #122 Hawaiian Airlines Business Mastercard (1)

- **rewardProgram** — "Atmos Rewards" (rewardUnitName "Points", rewardType "points") as of 2025-10-01, balances converted 1:1
  - catalog today: "HawaiianMiles" (rewardUnitName "Miles", rewardType "miles")
  - two-agreeing-secondary / high confidence · effective 2025-10-01
  - https://frequentmiler.com/hawaiian-airlines-cards-issued-by-barclays-still-available-for-now/
  - https://upgradedpoints.com/news/barclays-american-hawaiian-credit-cards-update/

### #123 Hilton Honors American Express Business (1)

- **cashbackCategories** — ADD a post-cap tier: "Other purchases after $100,000 per calendar year" at rate 0.03. Full structure is 12X on Hilton purchases, 5X on all other purchases up to $100,000 per calendar year, then 3X thereafter.
  - catalog today: Hilton stays 0.12 | "Other eligible purchases before cap" 0.05 (isDefault) — no post-cap tier
  - two-agreeing-secondary / medium confidence
  - https://upgradedpoints.com/news/hilton-honors-amex-business-card-refresh/
  - https://upgradedpoints.com/credit-cards/american-express-hilton-honors-credit-cards/

### #124 Marriott Bonvoy Business American Express (2)

- **benefits** — UPDATE description: "Annual Free Night Award after card renewal, valid for one night at a redemption level at or under 35,000 points (can be topped off with up to 25,000 additional points), plus a second Free Night Award (up to 35,000 points) after $60,000 in eligible purchases in a calendar year"
  - catalog today: "Free Night Award" — "Annual Free Night Award after renewal when requirements are met." (annualValue 250)
  - two-agreeing-secondary / high confidence
  - https://thepointsguy.com/credit-cards/reviews/marriott-bonvoy-business-amex-credit-card-review
  - https://www.nerdwallet.com/business/credit-cards/reviews/marriott-bonvoy-business
- **benefits** — ADD benefit "15 Elite Night Credits", annualValue 100, description "15 Elite Night Credits each calendar year toward the next level of Marriott Bonvoy Elite status"
  - catalog today: No Elite Night Credits listed
  - single-secondary / medium confidence
  - https://thepointsguy.com/credit-cards/reviews/marriott-bonvoy-business-amex-credit-card-review

### #125 Chase Sapphire Reserve for Business (5)

- **signupBonus** — "200,000 bonus points after $30,000 spend in first 6 months" (Chase page shows 150,000 struck through to 200,000), signupBonusValue 3000 at 1.5 cpp. Offer returned 2026-06-15.
  - catalog today: "150,000 bonus points after $20,000 spend in 3 months", signupBonusValue 3000
  - issuer-official / high confidence · effective 2026-06-15
  - https://creditcards.chase.com/business-credit-cards/sapphire/reserve
  - https://www.doctorofcredit.com/chase-sapphire-reserve-for-business-200000-points-sign-up-bonus-starts-6-15/
- **cashbackCategories** — ADD category "Lyft" at rate 0.05 (5x total points on Lyft rides through 9/30/2027).
  - catalog today: No Lyft category
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/sapphire/reserve
  - https://www.chase.com/personal/credit-cards/education/rewards-benefits/the-guide-to-chase-sapphire-reserve-for-business-benefits
- **benefits** — ADD benefit "$250 Select Chase Travel Hotels Credit" annualValue 250 — 2026 calendar year only (expires 12/31/2026), two-night minimum prepaid bookings at IHG, Montage, Pendry, Omni, Virgin, Minor, Pan Pacific.
  - catalog today: No select-hotels credit listed
  - issuer-official / high confidence · effective 2026-01-01
  - https://creditcards.chase.com/business-credit-cards/sapphire/reserve
  - https://www.chase.com/personal/credit-cards/education/chase-cards/select-hotel-credit-from-sapphire-reserve-for-business
- **benefits** — ADD benefit "Global Entry, TSA PreCheck or NEXUS Credit" annualValue 120 (up to $120 statement credit every four years).
  - catalog today: No Global Entry / TSA PreCheck credit listed
  - issuer-official / high confidence · effective 2025-06
  - https://creditcards.chase.com/business-credit-cards/sapphire/reserve
- **benefits** — ADD benefit "DoorDash: DashPass + Promos" annualValue 420 ($120 DashPass + $300 in promos) and ADD benefit "Lyft Credit" annualValue 120 ($10/month through 9/30/2027).
  - catalog today: No DoorDash or Lyft credits listed
  - issuer-official / high confidence · effective 2025-06
  - https://creditcards.chase.com/business-credit-cards/sapphire/reserve

### #133 Wells Fargo One Key+ Card (1)

- **benefits** — ADD benefit 'Automatic One Key Gold Tier' — automatic One Key Gold status (20%+ savings on 10,000+ hotels, priority traveler support, VIP Access room upgrades, price drop protection); Platinum tier unlocked at $30,000 annual spend. The catalog gives the $0-fee One Key card its Silver-tier benefit but omits the higher Gold tier on One Key+. Also missing: 'No Foreign Transaction Fees'.
  - catalog today: No elite-status benefit listed (only $100 OneKeyCash Anniversary Bonus and Trusted Traveler Credit)
  - issuer-official / high confidence
  - https://creditcards.wellsfargo.com/one-key-plus-credit-card/
  - https://frequentmiler.com/wells-fargo-one-key-credit-card-review/

### #134 Capital One Spark Cash Plus (1)

- **signupBonus** — "$2,000 cash bonus after $30,000 spend in the first 3 months, plus a $500 Capital One Business Travel credit, plus an additional $2,000 bonus for every $500,000 spent in the first year" (signupBonusValue 2500 for the guaranteed portion). The $500 travel credit and the $500K tier are on the issuer page but absent from the catalog.
  - catalog today: "$2,000 cash bonus after $30,000 spend in the first 3 months" (signupBonusValue 2000)
  - issuer-official / medium confidence
  - https://www.capitalone.com/small-business/credit-cards/spark-cash-plus/

### #135 Capital One Spark Cash Select for Business (1)

- **name** — "Capital One Spark 1.5% Cash Select" — Capital One's own product page titles it "Spark 1.5% Cash Select Business Card", matching the naming convention already used for #156/#157. All rates, fee and bonus are otherwise correct.
  - catalog today: "Capital One Spark Cash Select for Business"
  - issuer-official / medium confidence
  - https://www.capitalone.com/small-business/credit-cards/spark-cash-select/

### #148 CitiBusiness / AAdvantage Business World Elite Mastercard (1)

- **benefits** — ADD benefit "American Airlines Companion Certificate" — earned after $30,000 or more in purchases each cardmembership year and card renewal; good for a domestic companion ticket for $99 plus taxes and fees. Suggested annualValue conservative (the certificate has real but spend-gated value; frame like card #34's $125 flight-discount entry).
  - catalog today: Only "First Checked Bag Free" (160) and "Preferred Boarding and Inflight Savings" (75)
  - issuer-official / high confidence
  - https://www.citi.com/credit-cards/citibusiness-aadvantage-platinum-select-credit-card/
  - https://www.citi.com/credit-cards/citi-aadvantage-business-credit-card

### #152 Delta SkyMiles Gold Business American Express (3)

- **benefits** — ADD benefit "$120 Rideshare Credit", annualValue 120, description "Up to $10 in monthly statement credits on eligible U.S. rideshare purchases; enrollment required, available after first card renewal"
  - catalog today: No rideshare credit listed
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-business-cards
- **benefits** — RENAME to "First and Second Checked Bag Free" — "First checked bag free on eligible Delta flights for the cardholder and eligible companions; second checked bag free on U.S. domestic Delta-operated flights"
  - catalog today: "First Checked Bag Free" — "First checked bag free on eligible Delta flights for the cardholder and eligible companions on the reservation." (annualValue 160)
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-business-cards
- **benefits** — ADD benefit "$150 Delta Stays Credit", annualValue 150, description "Up to $150 back each calendar year on prepaid hotels or vacation rentals booked through Delta Stays on delta.com"
  - catalog today: No Delta Stays credit listed
  - issuer-official / high confidence
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-business-cards
  - https://upgradedpoints.com/credit-cards/amex-delta-gold-platinum-reserve-delta-stays-credit/

### #153 Delta SkyMiles Platinum Business American Express (5)

- **benefits** — ADD benefit "First and Second Checked Bag Free", annualValue 240, description "First checked bag free on eligible Delta flights for the cardholder and eligible companions; second checked bag free on U.S. domestic Delta-operated flights (second bag added 2026-06-04)"
  - catalog today: No checked bag benefit listed at all
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-business-cards
- **benefits** — UPDATE description to add: "...now also redeemable toward Delta Vacations packages. Government taxes/fees of $22-$250 apply."
  - catalog today: "Annual Companion Certificate" — "Annual companion certificate for eligible domestic, Caribbean, or Central American round-trip flights after renewal."
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
- **benefits** — ADD benefit "$200 Delta Stays Credit", annualValue 200, description "Up to $200 back each calendar year on prepaid hotels or vacation rentals booked through Delta Stays on delta.com"
  - catalog today: No Delta Stays credit listed
  - issuer-official / high confidence
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-business-cards
  - https://upgradedpoints.com/credit-cards/amex-delta-gold-platinum-reserve-delta-stays-credit/
- **benefits** — ADD benefit "$120 Resy Credit", annualValue 120, description "Up to $10 per month in statement credits at qualifying U.S. Resy restaurants; enrollment required"
  - catalog today: No Resy credit listed
  - issuer-official / medium confidence
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-business-cards
- **benefits** — ADD benefit "$120 Rideshare Credit", annualValue 120, description "Up to $10 per month in statement credits on eligible U.S. rideshare purchases; enrollment required"
  - catalog today: No rideshare credit listed
  - issuer-official / medium confidence
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-business-cards

### #154 Delta SkyMiles Reserve Business American Express (8)

- **benefits** — ADD benefit "First and Second Checked Bag Free", annualValue 240, description "First checked bag free on Delta flights for the cardholder and up to 8 companions; second checked bag free on U.S. domestic Delta-operated flights (second bag added 2026-06-04)"
  - catalog today: No checked bag benefit listed at all
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
  - https://www.nerdwallet.com/business/credit-cards/reviews/delta-skymiles-reserve-business-amex
- **benefits** — UPDATE description to add: "Valid on Delta First, Delta Premium Select, Delta Comfort or Delta Main; now also redeemable toward Delta Vacations packages. Government taxes/fees of $22-$250 apply."
  - catalog today: "Annual Companion Certificate" — "Annual companion certificate for eligible domestic, Caribbean, or Central American round-trip flights after renewal."
  - issuer-official / high confidence · effective 2026-06-04
  - https://news.delta.com/more-travel-value-added-delta-skymiles-cards-no-increase-annual-fees
- **benefits** — ADD benefit "$250 Delta Stays Credit", annualValue 250, description "Up to $250 back each calendar year on prepaid hotels or vacation rentals booked through Delta Stays on delta.com"
  - catalog today: No Delta Stays credit listed
  - issuer-official / high confidence
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-business-cards
  - https://www.nerdwallet.com/business/credit-cards/reviews/delta-skymiles-reserve-business-amex
- **benefits** — ADD benefit "$240 Resy Credit", annualValue 240, description "Up to $20 per month in statement credits at qualifying U.S. Resy restaurants; enrollment required"
  - catalog today: No Resy credit listed
  - issuer-official / high confidence
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-business-cards
  - https://www.nerdwallet.com/business/credit-cards/reviews/delta-skymiles-reserve-business-amex
- **benefits** — ADD benefit "$120 Rideshare Credit", annualValue 120, description "Up to $10 per month in statement credits on eligible U.S. rideshare purchases; enrollment required"
  - catalog today: No rideshare credit listed
  - issuer-official / high confidence
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-business-cards
  - https://www.nerdwallet.com/business/credit-cards/reviews/delta-skymiles-reserve-business-amex
- **benefits** — ADD benefit "MQD Headstart and MQD Boost", annualValue 150, description "$2,500 Medallion Qualification Dollars each Medallion Qualification Year, plus $1 MQD for every $10 in eligible card purchases"
  - catalog today: No MQD Headstart / MQD Boost listed
  - issuer-official / high confidence
  - https://www.delta.com/us/en/skymiles/airline-credit-cards/american-express-business-cards
  - https://www.nerdwallet.com/business/credit-cards/reviews/delta-skymiles-reserve-business-amex
- **benefits** — ADD benefit "Global Entry / TSA PreCheck Credit", annualValue 30, description "Up to $120 for Global Entry every 4 years, or up to $85 for TSA PreCheck every 4.5 years"
  - catalog today: No Global Entry / TSA PreCheck credit listed
  - two-agreeing-secondary / medium confidence
  - https://www.nerdwallet.com/business/credit-cards/reviews/delta-skymiles-reserve-business-amex
  - https://upgradedpoints.com/credit-cards/reviews/delta-reserve-business-credit-card-american-express/
- **benefits** — ADD benefit "Centurion Lounge Access", annualValue 300, description "Complimentary access to The Centurion Lounge, Sidecar by The Centurion Lounge and Escape Lounges when flying on a Delta flight purchased with the card"
  - catalog today: No Centurion Lounge access listed (only Delta Sky Club)
  - two-agreeing-secondary / medium confidence
  - https://www.nerdwallet.com/business/credit-cards/reviews/delta-skymiles-reserve-business-amex
  - https://upgradedpoints.com/credit-cards/reviews/delta-reserve-business-credit-card-american-express/

### #155 Capital One VentureOne Business (3)

- **cashbackCategories** — 0.015 — VentureOne Business earns unlimited 1.5X miles on every purchase, not 1.25X. (The 1.25X figure belongs to the consumer VentureOne, #98.) This card is the renamed Spark Miles Select, which always earned 1.5X.
  - catalog today: [569] "Other" = 0.0125 (default)
  - issuer-official / high confidence · effective 2026-04-14
  - https://www.capitalone.com/small-business/credit-cards/ventureone-business/
  - https://www.doctorofcredit.com/capital-one-rebrands-spark-miles-spark-miles-select-to-venture-business-and-ventureone-business/
- **signupBonus** — "50,000 bonus miles after you spend $4,500 in the first 3 months" (signupBonusValue 500)
  - catalog today: "See issuer page for current public offer" (signupBonusValue null)
  - issuer-official / high confidence · effective 2026-04-14
  - https://www.capitalone.com/small-business/credit-cards/ventureone-business/
  - https://www.doctorofcredit.com/capital-one-rebrands-spark-miles-spark-miles-select-to-venture-business-and-ventureone-business/
- **cashbackCategories** — Relabel to "Hotels, vacation rentals and rental cars booked through Capital One Business Travel" = 0.05 (rate unchanged)
  - catalog today: [568] "Capital One Business Travel hotels and rental cars" = 0.05
  - issuer-official / medium confidence
  - https://www.capitalone.com/small-business/credit-cards/ventureone-business/

### #156 Capital One Spark 2% Cash (2)

- **signupBonus** — "$1,000 cash bonus after $10,000 spend in the first 3 months, plus a limited-time $250 Capital One Business Travel credit" (signupBonusValue 1250)
  - catalog today: "$1,500 cash bonus after $15,000 spend in the first 3 months" (signupBonusValue 1500)
  - issuer-official / high confidence
  - https://www.capitalone.com/small-business/credit-cards/spark-cash/
  - https://awardwallet.com/credit-cards/cash-back/spark-cash-offer/
- **cashbackCategories** — Relabel to "Hotels and rental cars booked through Capital One Business Travel" = 0.05 — this is a business card and the qualifying portal is Capital One Business Travel, not consumer Capital One Travel. Rate unchanged.
  - catalog today: [570] "Hotels and rental cars through Capital One Travel" = 0.05
  - issuer-official / medium confidence
  - https://www.capitalone.com/small-business/credit-cards/spark-cash/

### #158 IHG One Rewards Premier Business (7)

- **benefits** — ADD benefit "4th Reward Night Free" annualValue 150 — "Enjoy a reward night when you redeem points for a consecutive four-night IHG hotel stay; the fourth Reward Night is free."
  - catalog today: No 4th Night Free benefit listed
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/ihg/business-premier
  - https://thepointsguy.com/credit-cards/reviews/ihg-premier-business-credit-card-review/
- **benefits** — ADD benefit "Global Entry / TSA PreCheck / NEXUS Credit" annualValue 30 — "Statement credit of up to $120 every 4 years for the application fee."
  - catalog today: No Global Entry / TSA PreCheck credit listed
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/ihg/business-premier
  - https://thepointsguy.com/credit-cards/reviews/ihg-premier-business-credit-card-review/
- **benefits** — ADD benefit "$100 Statement Credit + 10,000 Bonus Points" annualValue 150 — "Earn a $100 statement credit and 10,000 bonus points after you spend $20,000 each calendar year."
  - catalog today: No annual-spend bonus benefit listed
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/ihg/business-premier
  - https://thepointsguy.com/credit-cards/reviews/ihg-premier-business-credit-card-review/
- **signupBonus** — "Earn 140,000 Bonus Points after spending $4,000 in the first 3 months from account opening", plus 10,000 bonus points for adding an employee card within 3 months (signupBonusValue ~700 at 0.50 cpp). VOLATILE — do not auto-track.
  - catalog today: See issuer page for current IHG business offer (signupBonusValue null)
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/ihg/business-premier
  - https://creditcards.chase.com/travel-credit-cards/ihg
- **cashbackCategories** — ADD category "Office Supply Stores" at rate 0.05 — the 5x tier is "travel, gas stations, restaurants, office supply stores, and social media and search engine advertising."
  - catalog today: 5x list = Gas, Travel, Dining, Social media and search advertising (no office supply stores)
  - two-agreeing-secondary / medium confidence
  - https://thepointsguy.com/credit-cards/reviews/ihg-premier-business-credit-card-review/
  - https://money.usnews.com/credit-cards/chase/ihg-one-rewards-premier-business-credit-card
- **benefits** — ADD benefit "$50 United TravelBank Cash" annualValue 50 — "Up to $50 in United TravelBank Cash each calendar year ($25 on/about Jan 1 and $25 on/about Jul 1) after registering the card with your MileagePlus account."
  - catalog today: No United TravelBank benefit listed
  - two-agreeing-secondary / medium confidence
  - https://thepointsguy.com/credit-cards/reviews/ihg-premier-business-credit-card-review/
  - https://onemileatatime.com/guides/ihg-card-united-travelbank-credit/
- **benefits** — ADD benefit "Instacart Credit" annualValue 120 — "$10 monthly Instacart statement credit through 12/31/2027 plus 3-month complimentary Instacart+ membership; active Instacart+ membership required."
  - catalog today: No Instacart credit benefit listed
  - two-agreeing-secondary / medium confidence · effective 2025-05-01
  - https://www.doctorofcredit.com/chase-adds-instacart-credits-for-most-cards-10-20-per-month-until-12-31-27/
  - https://thepointsguy.com/credit-cards/chase-now-offering-instacart-benefits-on-more-cards

### #159 United Club Business Card (2)

- **cashbackCategories** — United=0.02 | Renowned Hotels and Resorts=0.05 | Other=0.015. The catalog appears to have copied the PERSONAL United Club card's earn structure onto the business card. Chase's own page states: '2x miles on all other eligible United purchases', '5x miles on hotel stays when you prepay directly through Renowned Hotels and Resorts', and '1.5x miles on all other purchases'. There is NO dining bonus and NO general travel bonus on this card. So: change United 0.05 -> 0.02, change Other 0.01 -> 0.015, REMOVE 'Travel' 0.02, REMOVE 'Dining' 0.02.
  - catalog today: United=0.05 | Renowned Hotels and Resorts=0.05 | Travel=0.02 | Dining=0.02 | Other=0.01
  - issuer-official / high confidence
  - https://creditcards.chase.com/business-credit-cards/united/united-club-business
- **benefits** — Change United Club Membership annualValue 650 -> 750 ('$750+ value per year', unlimited access for you and a guest) and add '4 United Club one-time passes' annually. Change Free Checked Bags annualValue 320 -> 440 (Chase states first and second checked bags free, up to $440 per roundtrip). ADD: 'Up to $200' Renowned Hotels credits annually (200); 'Up to $150' rideshare credits per calendar year after enrollment (150); 'Up to $100' Avis/Budget credit each anniversary year (100); 'Up to $240' Instacart credits per calendar year (240); 'Up to $200' JSX credits annually (200); 'Up to $50' FareLock credits annually (50); two global Economy Plus upgrades; Premier Access travel services. Chase markets 'over $925 in partner credits'.
  - catalog today: Only 2 benefits: United Club Membership ($650), Free Checked Bags ($320)
  - issuer-official / high confidence · effective 2025-03-24
  - https://creditcards.chase.com/business-credit-cards/united/united-club-business
  - https://creditcards.chase.com/travel-credit-cards/united

### #162 Bank of America Business Advantage Travel Rewards (1)

- **signupBonus** — "50,000 online bonus points after at least $5,000 in purchases in the first 90 days", redeemable for a $500 statement credit toward travel or dining. signupBonusValue should be 500. Confirmed on the Bank of America business product page; Upgraded Points also documents elevated welcome offers across the BofA business lineup. VOLATILE: recommend do-not-auto-track.
  - catalog today: "30,000 points after $3,000 spend in the first 90 days" (signupBonusValue 300)
  - issuer-official / medium confidence
  - https://business.bankofamerica.com/en/credit-cards/business-advantage-travel-rewards
  - https://upgradedpoints.com/news/bank-of-america-business-cards-elevated-offers/

### #163 Prime Business Card (Amazon / U.S. Bank) (1)

- **cashbackCategories** — The three 2% categories are NOT fixed. U.S. Bank awards 2% back automatically on your TOP 3 eligible spend categories outside Amazon each cycle, chosen from a broader eligible list: gas and EV stations, dining, cell phone service providers, utilities, airlines, hotels, office supplies, accounting services, and postal/shipping. Replace the three fixed rows with a single row such as "Top 3 eligible business categories (auto-selected)" at 0.02. Amazon Business / Amazon.com / AWS / Whole Foods 5% and Other 1% are confirmed correct; annual fee $0 confirmed.
  - catalog today: Fixed 2% categories: "Gas / EV Charging" 0.02, "Restaurants" 0.02, "Wireless Services" 0.02 (plus Amazon 5% and Other 1%)
  - issuer-official / medium confidence
  - https://www.usbank.com/business-banking/business-credit-cards/amazon-business-credit-cards.html

### #168 Atmos Rewards Visa Signature Business (2)

- **benefits** — ADD "20% Back on Alaska/Hawaiian Inflight Purchases" (food, premium beverages, Wi-Fi; suggested annualValue 20); ADD "Alaska Lounge+ Membership Discount" ($100 off an annual membership; suggested annualValue 100); ADD "No Foreign Transaction Fees" (suggested annualValue 30). Also the Annual Companion Fare description should state it requires $6,000 in purchases in the prior anniversary year.
  - catalog today: Only "Annual Companion Fare" and "Free Checked Bag and Preferred Boarding" present
  - issuer-official / high confidence · effective 2025-08-20
  - https://business.bankofamerica.com/en/credit-cards/atmos-rewards
  - https://onemileatatime.com/guides/atmos-rewards-business-visa-card/
- **signupBonus** — "70,000 bonus points plus a $99 Companion Fare (plus taxes and fees from $23) after $4,000 or more in purchases in the first 90 days". Confirmed on the issuer business page and corroborated by One Mile at a Time. VOLATILE: recommend do-not-auto-track.
  - catalog today: "80,000 points plus $99 Companion Fare after $5,000 spend in the first 90 days" (signupBonusValue 900)
  - issuer-official / medium confidence
  - https://business.bankofamerica.com/en/credit-cards/atmos-rewards
  - https://onemileatatime.com/guides/atmos-rewards-business-visa-card/

### #171 HSBC Red Credit Card (3)

- **cashbackCategories** — "Online Spend" @ 0.04 — issuer wording is "Earn 4% RewardCash (RC) on the first HKD10,000 you spend online and unlimited 0.4% RC on subsequent online spending each calendar month." The 4% applies to ONLINE purchases only; mobile/contactless payments at physical stores are NOT part of this tier. Cap: HK$10,000 eligible online spend per calendar month. (The 8% Designated Merchants tier is capped at the first HK$1,250 per calendar month.)
  - catalog today: "Online and Mobile Payment" @ rate 0.04
  - issuer-official / high confidence
  - https://www.hsbc.com.hk/credit-cards/products/red/
- **benefits** — ADD benefit "McDonald's Monthly RewardCash" — "receive up to $30 in RewardCash each month when you spend HKD30 or above in a single transaction at McDonald's"; annualValue 360 (HK$30 x 12)
  - catalog today: (absent)
  - issuer-official / high confidence
  - https://www.hsbc.com.hk/credit-cards/products/red/
- **benefits** — ADD benefit "HK Express In-flight Drink" — "complimentary drink (valued at up to HKD25) when you use your physical card to purchase any in-flight food priced at HKD30 or above on HK Express flights"; annualValue 25 (per-use, no stated annual frequency)
  - catalog today: (absent)
  - issuer-official / medium confidence
  - https://www.hsbc.com.hk/credit-cards/products/red/

### #172 HSBC Visa Signature Card (1)

- **cashbackCategories** — Rate should be 0.036, not 0.024. HSBC states "Up to 3.6% RewardCash rebate in designated spending categories" = 9X RewardCash (6X from Red Hot Rewards of Your Choice + an exclusive extra 3X for Visa Signature). 2.4% (6X) is the non-Visa-Signature RoYC rate. Suggested label: "Red Hot Rewards of Your Choice Categories" — Dining, Health, Leisure, Home, Lifestyle, and Overseas & Mainland China spending. Registration for the RoYC programme is required on or before 31 Oct 2026.
  - catalog today: "Selected Lifestyle and Overseas Spend" @ rate 0.024
  - issuer-official / high confidence
  - https://www.hsbc.com.hk/credit-cards/products/visa-signature/
  - https://www.moneysmart.hk/en/credit-cards/hsbc-visa-signature-card

### #173 Standard Chartered Cathay Mastercard (2)

- **cashbackCategories** — Category should be "Dining and Hotels" (HK$4 = 1 Asia Mile). ONLINE spending is NOT a bonus category on this card — it earns the base HK$6 = 1 Asia Mile. Full base-tier earn table per issuer: Cathay Pacific & HK Express HK$2 = 1 mile; Dining & Hotels HK$4 = 1 mile; Overseas HK$6 = 1 mile; all other local/HKD-posted spend HK$6 = 1 mile. (Overseas improves to HK$3 for Priority Banking and HK$2 for Priority Private clients only.)
  - catalog today: "Dining and Online" @ rate 0.015
  - issuer-official / medium confidence
  - https://www.sc.com/hk/credit-cards/cathay/
  - https://www.moneyhero.com.hk/en/credit-card/products/standard-chartered-cathay-mastercard
- **cashbackCategories** — Rates are internally inconsistent with rewardUnitValueCents=1 and look like round placeholders (3% / 1.5% / 1%). At the catalog's own stated valuation of 1.00 cent per Asia Mile, the cash-back-equivalent rates are: Cathay & HK Express (HK$2 = 1 mile) = 0.005; Dining & Hotels (HK$4 = 1 mile) = 0.0025; Other/Overseas (HK$6 = 1 mile) = 0.00167. Every current rate is exactly 6x too high. Either the rates or rewardUnitValueCents must be corrected — if Asia Miles are instead valued at ~HK$0.10/mile (rewardUnitValueCents 10), the correct rates would be 0.05 / 0.025 / 0.0167.
  - catalog today: rates 0.03 / 0.015 / 0.01 (Cathay and Travel / Dining and Online / Other)
  - issuer-official / medium confidence
  - https://www.sc.com/hk/credit-cards/cathay/

### #174 Hang Seng MMPOWER World Mastercard (3)

- **cashbackCategories** — ADD "General Online Shopping" @ 0.05. Issuer lists a distinct 5% tier for general online shopping, separate from the 8% tiers.
  - catalog today: (absent) — only "Selected Spending" @ 0.08 and "Other" @ 0.004 exist
  - issuer-official / high confidence
  - https://www.hangseng.com/personal/cards/products/mmpower-card/
- **cashbackCategories** — ADD "Foreign Currency / Overseas Physical Store Spend" @ 0.04. Issuer lists up to 4% +FUN Dollars on foreign-currency spending at overseas physical stores.
  - catalog today: (absent)
  - issuer-official / high confidence
  - https://www.hangseng.com/personal/cards/products/mmpower-card/
- **benefits** — Description should state the binding caps: requires a cumulative HK$3,000 of eligible transactions each calendar month to earn up to $500 +FUN Dollars per month (full-time tertiary students have no spending threshold). The 8% tier covers designated merchants (Amazon, lululemon, GU, Taobao, Uniqlo), online entertainment, and online fashion. Current programme runs through 31 Dec 2026. Monthly cap of HK$500 implies a realistic annual ceiling of HK$6,000, not the catalog's estimated 800.
  - catalog today: benefit "+FUN Dollars Offers" description: "The card currently highlights up to 8% +FUN Dollars on eligible categories and promotional welcome rewards."
  - issuer-official / high confidence · effective 2026-12-31
  - https://www.hangseng.com/personal/cards/products/mmpower-card/

### #175 DBS Black World Mastercard (3)

- **cashbackCategories** — Should be "Overseas / Foreign Currency Spend" @ 0.012. Standard (no registration) overseas earn is 3X DBS$ = HK$4 = 1 mile = 1.2% cash-equivalent. ONLINE is not a bonus category on this card. A registered promotion (1 Jan - 31 Dec 2026) lifts overseas to 6X DBS$ = HK$2 = 1 mile = 2.4%, but only after registering in the DBS Card+ app AND hitting HK$20,000 eligible retail spend in that calendar month; extra rewards capped at DBS$240 per spending phase and DBS$2,880 per cardholder for the year. 4% is not achievable under any published tier.
  - catalog today: "Selected Online and Overseas Spend" @ rate 0.04
  - issuer-official / high confidence · effective 2026-01-01
  - https://www.dbs.com.hk/personal/promotion/black-mc-cvp
- **cashbackCategories** — Should be 0.008. DBS states local spending earns 2X DBS$ = HK$6 = 1 mile, i.e. DBS$2 per HK$250 = 0.8% cash-equivalent. 0.4% is the 1X base multiplier, which applies to e-wallet top-ups/transactions, not to ordinary local retail.
  - catalog today: "Other" (isDefault) @ rate 0.004
  - issuer-official / high confidence
  - https://www.dbs.com.hk/personal/promotion/black-mc-cvp
- **annualFee** — NOT HK$2,000. Secondary sources disagree on the exact figure: MoneySmart HK states HK$3,800; MoneyHero HK states HK$3,600. Both agree the first year is waived. DBS's own product page, welcome-offer page and dual-card landing page do not expose the fee (it lives in the linked Key Facts Statement / Fee Schedule PDFs). Treat HK$2,000 as a fabricated placeholder; the real fee is HK$3,600-3,800 and needs issuer PDF confirmation before writing a specific number.
  - catalog today: 2000 (HKD) — round placeholder
  - single-secondary / low confidence
  - https://www.moneysmart.hk/en/credit-cards/dbs-black-world-mastercard
  - https://www.moneyhero.com.hk/en/credit-card/products/dbs-black-world-mastercard

### #176 Citi Cash Back Card (Hong Kong) (1)

- **cashbackCategories** — ADD "Foreign Currency Spending" @ 0.02. Citi HK states "2% Cash Rebate on spending in foreign currency" on all posted retail transactions made in foreign currencies (inclusive of the 1% Basic Rebate). Note the 2% dining and 2% hotel rebates are global (not local-only) and carry no minimum spend or cap.
  - catalog today: (absent) — only Dining 0.02, Hotel Stays 0.02, Other 0.01
  - issuer-official / high confidence
  - https://www1.citibank.com.hk/english/credit-cards/cash-back-card
  - https://www.moneysmart.hk/en/credit-cards/citi-cash-back-card

### #177 DBS Live Fresh Visa (1)

- **cashbackCategories** — Should be "Shopping (online and in-store)" @ 0.06. DBS now frames the bonus tiers as Shopping / Transport / In-store Overseas rather than Online / Contactless. Requires min. S$800 eligible spend in a calendar month; Shopping cashback capped at S$50 per calendar month.
  - catalog today: "Online Spend" @ rate 0.05
  - issuer-official / high confidence
  - https://www.dbs.com.sg/personal/cards/credit-cards/live-fresh-dbs-visa-paywave-platinum-card
  - https://www.singsaver.com.sg/credit-card/products/dbs-live-fresh-card

### #178 UOB One Card (2)

- **signupBonus** — UOB's own page currently states a specific public offer: new cardholders approved between 15 May and 30 September 2026 receive enhanced cashback of up to 20% in their first quarter, plus a S$100 Samsung e-voucher. This is issuer-stated so it clears rule 4 — but it expires 30 Sep 2026, so it should be treated as time-boxed rather than auto-tracked.
  - catalog today: "Promotional cashback offers vary by campaign; see issuer page"
  - issuer-official / high confidence · effective 2026-05-15
  - https://www.uob.com.sg/personal/cards/cashback/one-card.page
- **cashbackCategories** — The 10% headline covers only Grab, McDonald's, Shopee and SimplyGo (5-6.67% additional on top of the 3.33% base, tier-dependent). Missing bonus categories that should be represented separately: Groceries — 2.67-4.67% additional (S$100 and S$200 quarterly tiers only, i.e. up to ~8% total); Singapore Power utilities — +1% (all tiers); Shell fuel — +1.67% (S$200 tier only). Structure is effective from 1 July 2025. Overall cashback capped at S$2,240 per year, with a S$120/month cap on the additional bonus.
  - catalog today: "Daily Spend Bonus Categories" @ rate 0.10 (single lumped category)
  - issuer-official / medium confidence · effective 2025-07-01
  - https://www.uob.com.sg/personal/cards/cashback/one-card.page

### #179 OCBC 365 Credit Card (3)

- **cashbackCategories** — ADD "Petrol" @ 0.06. Petrol is the card's single highest tier at 6% and is entirely missing from the catalog.
  - catalog today: (absent) — no petrol category
  - issuer-official / high confidence
  - https://www.ocbc.com/personal-banking/cards/365-cashback-credit-card
- **cashbackCategories** — Rate 0.03 is correct but the category label is incomplete. The 3% tier covers groceries, land transport, Watsons, streaming, EV charging AND utilities. Suggested label: "Groceries, Land Transport, Utilities, Watsons, Streaming and EV Charging". Whole card requires min. S$800 monthly spend and is capped at S$160 cashback per account per month (~S$1,920/yr).
  - catalog today: "Streaming, Watsons, and EV Charging" @ rate 0.03
  - issuer-official / high confidence
  - https://www.ocbc.com/personal-banking/cards/365-cashback-credit-card
- **cashbackCategories** — Should be 0.0025. OCBC states the base rate when monthly spend is below the S$800 minimum is 0.25%, not 0.3%.
  - catalog today: "Other" (isDefault) @ rate 0.003
  - issuer-official / high confidence
  - https://www.ocbc.com/personal-banking/cards/365-cashback-credit-card

### #180 HSBC Revolution Credit Card (2)

- **benefits** — ADD benefit "Complimentary Travel Insurance (Visa Signature)". As of 1 April 2026 all HSBC Revolution cards were upgraded from Visa Platinum to Visa Signature, adding complimentary travel insurance coverage. This predates the 2026-05 review, so it was already missing then.
  - catalog today: (absent)
  - issuer-official / high confidence · effective 2026-04-01
  - https://www.hsbc.com.sg/credit-cards/products/revolution/
- **cashbackCategories** — Existing 10X/1X rates are correct at rewardUnitValueCents 0.4. Missing the relationship tier: cardholders maintaining SGD 50,000+ in an HSBC Everyday Global Account earn up to 20X points on eligible online/contactless spend = 0.08 cash-equivalent. Bonus-point caps also belong in the record: 9,000 bonus points per calendar month standard, 22,800 per calendar month for the high-deposit tier; the 1X base is uncapped.
  - catalog today: "Eligible Online and Contactless Spend" @ rate 0.04 (10X points), "Other" @ 0.004 (1X)
  - issuer-official / medium confidence
  - https://www.hsbc.com.sg/credit-cards/products/revolution/

### #181 Citi Cash Back Card (Singapore) (1)

- **cashbackCategories** — Should be 0.002. Citi Singapore states 0.20% on all other retail spend. Bonus tiers (8% petrol/private commute, 6% dining/groceries) are correct as catalogued but require S$800 minimum qualifying retail spend in a statement month, and total cashback is capped at S$80 combined per statement month.
  - catalog today: "Other" (isDefault) @ rate 0.0025
  - issuer-official / high confidence
  - https://www1.citibank.com.sg/credit-cards/cashback/citi-cash-back-card
  - https://blog.moneysmart.sg/credit-cards/citibank-cash-back-card-review/

### #182 Standard Chartered Smart Credit Card (2)

- **cashbackCategories** — 6% is not a rate this card pays. The structure is tiered on monthly spend: under S$800 = 0.5% on bonus categories (the 4% rate was a limited promo that ran 6 Dec 2024 - 31 Mar 2025 and has expired); S$800-S$1,499 = 8%; S$1,500+ = 10%. Bonus categories are Smart Dining (10 merchants incl. McDonald's, Starbucks), Smart Transport (bus/MRT via SimplyGo, EV charging) and Smart Streaming (Netflix, Spotify, YouTube, Disney+, Amazon Prime, Viu, iQiyi, HBO GO). No cashback cap since 6 Dec 2024. Recommend encoding the headline 0.10.
  - catalog today: "Selected Digital and Everyday Merchants" @ rate 0.06
  - issuer-official / high confidence · effective 2025-04-01
  - https://www.sc.com/sg/credit-cards/smart-credit-card/
- **cashbackCategories** — Should be 0.005. Other eligible spend earns 0.5% at monthly spend under S$1,500 and 1% at S$1,500+. 0.3% matches no published tier.
  - catalog today: "Other" (isDefault) @ rate 0.003
  - issuer-official / high confidence · effective 2024-12-06
  - https://www.sc.com/sg/credit-cards/smart-credit-card/

## Proposals that were refuted

Raised by a finder and then eliminated by independent confirmation. Recorded
so they are not re-raised on the next pass.

- **#4 Chase Freedom Flex** benefits: proposed `REMOVE benefit "Cell Phone Protection". Chase's updated benefits guide states the benefit "will cover eligible losses in`
  - The underlying FACT in the proposal checks out, but the ACTION (remove the benefit now) is premature as of today, 2026-08-06.

What I verified independently:
1. Issuer's own page — I fetched https://creditcards.chase.com/cash-back-credit-cards/freedom/flex (main page and #benefits anchor). Chase lists Purchase Protection ($500/item, 120 days), Extended Warranty, Trip Cancellation/Interruption ($1,500/$6,000), Auto Rental Coverage, Travel & Emergency Assistance, Zero Liability, DashPass, and Lyft 2% through 09/30/2027. Cell Phone Protection appears NOWHERE on the page, including footnotes/disclosures. So Chase has already pulled it from marketing.
2. I could not retrieve the authoritative Chase Guide to Benefits PDF (guessed URLs 404; chase.com/personal/credit-cards/education/benefits and .../cell-phone-protection both 404). So primary-source confirmation of the exact dated wording is indirect.
3. Three secondary sources agree on identical, specific terms: discontinued 09/20/2026, eligible losses covered through 09/19/2026; $800 per approved claim, $50 deductible, max 2 claims per 12 months, $1,000 overall max. TPG additionally reports Chase is dropping the Freedom Flex's 3% foreign transaction fee on the same date — a corroborating detail that a fabricated story would be unlikely to carry.

Why confirmed:false: the correction is scheduled, not yet in effect. Today is 2026-08-06; coverage remains in force for another ~6 weeks (through 2026-09-19). A cardholder who pays their phone bill with the card and cracks a screen tomorrow is still covered up to $800. Deleting the benefit outright right now makes the record wrong for the interim period. The database is also not "already right" — annualValue 100 is now badly overstated for a benefit with six weeks left, and the entry carries no end date.

Correct handling: keep the benefit but annotate it as terminating, drop annualValue to a prorated ~$12-15 for the remainder of 2026, and remove the entry entirely on 2026-09-20. If the DB schema has no end-date/expiring field, removing on 09/20/26 (not before) is the right move. Separately worth flagging outside this field: the 3% foreign transaction fee is reportedly being eliminated on the same date.

Note on the search budget: this session's WebSearch quota was exhausted, so I could not run independent keyword searches to hunt for contradicting or more recent reporting; my verification rests on direct fetches of the issuer page plus the three cited articles.
  - actual: RETAIN "Cell Phone Protection" until 2026-09-20, with corrected terms and an end date — "Up to $800 per approved claim ($50 deductible, max 2 claims per 12 months, $1,000 overall maximum) when you pay your monthly cell phone bill with the card. Benefit covers eligible losses incurred through 09/19/2026 and is discontinued 09/20/2026." Reduce annualValue from 100 to ~12 (prorated for the ~6 weeks remaining in 2026). Delete the benefit entirely on 2026-09-20, not today.
- **#4 Chase Freedom Flex** benefits: proposed `ADD benefit "No Foreign Transaction Fees" — Chase is eliminating the Freedom Flex's 3% foreign transaction fee on the sa`
  - The proposed value is not correct AS OF TODAY (2026-08-06). Chase's own Pricing & Terms disclosure for the Freedom Flex (LGC60938, linked directly from the official product page, "accurate as of 12/16/2025") still states verbatim: "Foreign Transactions: 3% of the amount of each transaction in U.S. dollars." I verified this by fetching the issuer product page and extracting its disclosure link rather than relying on the claimed sources. The product page itself makes no no-FTF benefit claim; the only "No Foreign Transaction Fee (30)" string on it is a nav filter link to a category page listing 30 other Chase cards, not an attribute of this card.

The proposed change does appear to be a genuine announcement, not a fabrication: I re-fetched TPG with a verbatim-quote-only prompt to rule out summarizer hallucination and it returned "Beginning Sept. 20, Chase will also eliminate the Freedom Flex's 3% foreign transaction fee..." However, it is FUTURE-DATED to 2026-09-20, about six weeks from today. Corroboration is weaker than claimed: clark.com returned HTTP 403 and money.usnews.com timed out twice, so only one of the three claimed sources was independently verifiable.

I also pulled Chase's Guide to Benefits PDF (BGC11363_v2.pdf) for the Freedom Flex World Elite Mastercard; it still lists Cell Phone Protection as active, consistent with that benefit running through 2026-09-19.

The database is currently right. Applying this now would make the record wrong for six weeks and overstate the card's value to anyone traveling before 2026-09-20. This is a scheduled-change item, not a correction: queue for 2026-09-20 and re-verify against Chase's Pricing & Terms then, since announced changes are sometimes delayed or amended. Note also that the proposal bundles a benefit removal (cell phone protection) with a benefit addition (FTF elimination) on the same date; applying only the favorable half early would skew net card value in the wrong direction.
  - actual: Database is correct as of 2026-08-06: the Chase Freedom Flex STILL charges a 3% foreign transaction fee, and no "No Foreign Transaction Fees" benefit should be added yet. Per Chase's live Pricing & Terms (accurate as of 12/16/2025): "Foreign Transactions: 3% of the amount of each transaction in U.S. dollars." A pending change to eliminate the fee is reported (TPG) as effective 2026-09-20 — schedule the benefit addition for that date and re-verify against Chase's Pricing & Terms then, alongside the concurrent removal of cell phone protection.
- **#50 Prime Visa** signupBonus: proposed `"$150 Amazon Gift Card instantly loaded on approval, plus limited-time 5% back on all purchases up to $2,500 for the fir`
  - Partially correct — the numeric correction is right, but the proposed text is not, so I cannot confirm it as written. Verified directly from Chase's own Prime Visa product page (fetched today, 2026-08-06), which states verbatim: "Prime members, get a $150 Amazon Gift Card instantly loaded into your Amazon account's Gift Card Balance on approval of your credit card application." So the database's "$200 upon approval" / signupBonusValue 200 is definitively WRONG, and 150 is correct. However, the proposed signupBonus string also asserts a "limited-time 5% back on all purchases up to $2,500 for the first 3 months." I re-fetched the Chase page querying specifically for that offer and it is NOT present — the page's only promotional element is the rotating "Prime Card Bonus" (10%+ on select categories), alongside the permanent 5%/2%/1% structure. The claimed source for the 5% clause is the Chase media release dated May 1, 2023, a card-launch-era promotion now over three years stale; treating it as a current offer is an error. Corroborating checks were limited: amazon.com/primevisa and amazon.com/iss/credit/rewardscardmember both returned HTTP 503, and NerdWallet/DoctorOfCredit URLs returned 404. This session's WebSearch budget was fully exhausted (200/200), so I could not run independent searches for a possible elevated or targeted offer; the issuer's own live product page is nonetheless the authoritative source for the public offer. Recommend applying signupBonusValue 150 with the gift-card-only text in finalCorrectValue, and dropping the 5% clause.
  - actual: $150 Amazon Gift Card instantly loaded into your Amazon account's Gift Card Balance upon approval (Prime members); signupBonusValue 150
- **#52 United Club Infinite Card** signupBonus: proposed `Up to 90,000 bonus miles per Chase's current lineup page. signupBonusValue ~1080 at 1.2c.`
  - The proposed "90,000 bonus miles" is a marketing headline, not the spend-based bonus. Chase's own product page for this card (reached from the lineup page the proposer cited, via its link /travel-credit-cards/united/club-infinite?iCELL=61FY) breaks the offer down as: 80,000 bonus miles after $5,000 on purchases in the first 3 months, PLUS 10,000 bonus miles after adding an authorized user in the first 3 months — "up to 90,000" total. The proposer read only the lineup tile ("Earn up to 90,000 bonus miles") and never opened the product page, so they attributed the full 90,000 to spend. The database's existing value (80,000 after $5,000 in 3 months, signupBonusValue 960) is correct for the spend requirement as written and should NOT be changed to 1080. Two side findings worth flagging to the DB owner, both from Chase's own materials: (1) the card is now branded "United Club℠ Card" — the "Infinite" suffix appears dropped in the recent United card refresh; (2) the Chase pricing & terms doc (LGC64324) lists a $695 annual fee, higher than the older $525, so the annualFee field may also be stale.
  - actual: 80,000 bonus miles after $5,000 in purchases in the first 3 months, plus 10,000 bonus miles after adding an authorized user in the first 3 months (up to 90,000 total). signupBonusValue 960 at 1.2c for the spend-based portion; 1080 only if the authorized-user bonus is counted.
- **#95 World of Hyatt Business Credit Card** benefits: proposed `ADD benefit "Instacart Credit" annualValue 120 — "$10 monthly Instacart statement credit through 12/31/2027 plus 3-month`
  - Could not verify the proposed Instacart benefit against the issuer, and Chase's own current product page affirmatively contradicts it. On https://creditcards.chase.com/business-credit-cards/world-of-hyatt/hyatt-business-card (fetched today, 2026-08-06), the string "Instacart" appears exactly once — as a site-navigation link to the separate Instacart Mastercard product page — and nowhere in the card's benefits, partner benefits, offer details, footnotes, or disclosures. The card's actual merchant/delivery benefit is DoorDash: "you will receive 12 months of complimentary DashPass ... between 02/01/2025 and 12/31/2027," plus $10 off per calendar quarter on a non-restaurant DoorDash order.

I ran a control test to rule out the possibility that Chase simply omits Instacart from acquisition pages. It does not. On the IHG One Rewards Premier Business card page (the closest analogue: $10 tier, hotel co-brand, business card), Chase states verbatim "Receive a monthly $10 Instacart credit, up to $120 annually, plus a complimentary 3-month Instacart+ membership," backed by three Offer Details paragraphs covering the 3-month complimentary membership, the $99/year auto-renewal, and "one $10 credit in your Instacart account each month you have an active Instacart+ membership." The Ink Business Cash page carries the parallel $20 language. So when the benefit exists, Chase markets it explicitly — and it is entirely absent for World of Hyatt Business. The personal World of Hyatt Credit Card page is likewise Instacart-free (DashPass only). Chase's own Instacart brand page (/cash-back-credit-cards/instacart) lists only the Instacart Mastercard and names no Hyatt product.

On the claimed sources: both are genuine and both do list World of Hyatt Business in the $10 tier, but both are dated May 1-2, 2025 — about 15 months stale — and neither shows a later update. They are not truly independent; they are two write-ups of the same single announcement news cycle, which makes "two-agreeing-secondary / medium confidence" an overstatement of the evidence. Whether Chase later dropped Hyatt cards from the program or the original launch list was inaccurate, the benefit is not documented by the issuer today, so the addition should not be made. The database as it stands is correct.
  - actual: No Instacart credit benefit. As of 2026-08-06 the World of Hyatt Business Credit Card carries no Instacart statement credit and no Instacart+ membership per Chase's product page. Its delivery/merchant benefit is DoorDash DashPass: 12 months complimentary DashPass (DoorDash and Caviar) when first activated with the card between 02/01/2025 and 12/31/2027, plus $10 off each calendar quarter on one qualifying non-restaurant DoorDash order while enrolled in DashPass. Annual fee $199. Database was already right; do not add the Instacart benefit.
- **#55 IHG One Rewards Traveler** benefits: proposed `ADD benefit "10,000 Bonus Points for $20,000 Annual Spend" annualValue 50 — "Earn 10,000 bonus points (and Gold Elite st`
  - The proposed benefit is wrong: it merges two separate, independently-earned benefits and assigns the points to the wrong spend threshold. Chase's own product page for the IHG One Rewards Traveler (fetched raw 2026-08-06) states in both the marketing tile and the legal disclosure that the 10,000 annual bonus points trigger at $10,000 of calendar-year spend, not $20,000: "10,000 bonus points each calendar year: You'll receive 10,000 bonus points each calendar year during which you spend at least $10,000 in purchases." The $20,000 threshold belongs to an entirely different benefit that awards NO points: "Gold Elite Status After $20,000 Annual Spend: Each Calendar Year you make purchases totaling $20,000 or more with an IHG One Rewards Traveler Credit Card, you, as the primary cardmember, will qualify for Gold Elite Status through December 31 of the following year." So the proposed value's title, threshold, and description are all incorrect. Note: a WebFetch summarization pass initially echoed the proposed "$20,000 for 10,000 points" claim, but a verbatim-quote pass and then direct curl of the raw HTML both contradicted it — the summarizer had conflated the two adjacent benefits, which is likely the same error that produced the proposed correction. The database was PARTIALLY right: its existing "IHG Silver Elite Status — Earn higher level with $20k spend" entry already correctly captures the Gold Elite upgrade. However, the database IS genuinely missing a benefit — the annual 10,000-point bonus — just at the $10,000 threshold. So a correction is warranted, but not the one proposed. The annualValue of 50 (10,000 IHG points at ~0.5 cents each) is a reasonable valuation and can carry over to the corrected entry. Card confirmed as $0 annual fee with automatic Silver Elite.
  - actual: ADD benefit "10,000 Bonus Points for $10,000 Annual Spend", annualValue 50 — "Earn 10,000 bonus points each calendar year during which you spend at least $10,000 in purchases." Keep the existing separate entry for Gold Elite Status at $20,000 annual spend (that benefit awards status only, no points). Do NOT add a "10,000 points for $20,000 spend" benefit — no such benefit exists.
- **#88 American Express Green Card** name: proposed `American Express Classic Green Card — Amex notified existing cardholders starting 2026-06-01 that the product is renamed`
  - REJECTED as premature — the database is already right as of today (2026-08-06). The proposed name "American Express Classic Green Card" is a real, Amex-confirmed change, but it takes effect 2026-08-20, which is still 14 days in the future. The proposal's own text states "effective 2026-08-20" and then applies it as if already live; the 2026-06-01 cardholder mailings were ADVANCE notice of a scheduled rename, not evidence it occurred. Doctor of Credit quotes the in-app pop-up in future tense: "the name of their card will change on August 20th, 2026, to become the 'American Express Classic Green Card'." Upgraded Points likewise: "The card will officially be renamed the American Express Classic Green Card on August 20, 2026," and explicitly notes the change "has not yet taken effect."

ISSUER VERIFICATION ATTEMPTED, UNAVAILABLE: WebFetch of americanexpress.com/us/credit-cards/card/green/ and the all-cards listing both return "Page Not Found." Amex pulled the Green Card from its site on 2026-07-23 (closed to new applicants). So no live Amex page displays EITHER name right now — I could not personally verify "Classic Green Card" on any issuer property, and the dead product page is not evidence of an early rename.

SOURCE-QUALITY DOWNGRADE: the claimed "two-agreeing-secondary / high confidence" rating is overstated. (1) One claimed URL is wrong — doctorofcredit.com/american-express-removes-green-card-from-website/ is a separate story about the card being pulled; the actual name-change post is at the URL I cite. (2) The sources are not independent: Upgraded Points, Frequent Miler, Danny the Deal Guru, and Your Mileage May Vary all trace to the same single Doctor of Credit screenshot of the cardholder pop-up, so this is effectively one source, not two agreeing ones.

RECOMMENDATION: keep "American Express Green Card" and re-queue this edit for 2026-08-20. Also flag for re-review then — the "Classic" label plus the card's removal from sale has prompted widespread speculation that a refreshed Green product launches alongside, so the post-08-20 landscape may involve two distinct records rather than a simple rename.
  - actual: American Express Green Card
- **#41 Hilton Honors American Express Aspire** benefits: proposed `RENAME to "$209 CLEAR Plus Credit", annualValue 209 — Amex's own CLEAR benefit page states "up to $209 in statement cred`
  - The database value ($199) is stale, but the proposed correction ($209) is ALSO stale — the current correct figure is $219, exactly as the task's own caveat warned.

Evidence I gathered independently:

1. Amex's CLEAR benefit hub page (https://www.americanexpress.com/en-us/travel/benefits/clear/) does say "$209 in statement credits per calendar year" and names the Hilton Honors Aspire Card explicitly. I fetched it twice (plus a query-string variant) and got the same $209 wording. This is the claimed source and it is genuinely issuer-official — but it is out of date.

2. Amex's own Platinum Card product page (https://www.americanexpress.com/us/credit-cards/card/platinum/) currently states "You can receive up to $219 in statement credits per calendar year after you sign up and pay for a CLEAR+ Membership." Two issuer-official Amex pages contradict each other, which proves the CLEAR hub page has not been refreshed after the 2026-07-01 CLEAR Plus price increase. Amex has always applied a single CLEAR+ credit amount across all eligible cards (Platinum, Business Platinum, Green, Corporate Platinum, Hilton Aspire) pegged to the CLEAR Plus retail price, so the Platinum figure is the current program-wide number.

3. Third-party corroboration specific to the Aspire card: UpgradedPoints (one of the claimed sources) says "up to $219 per calendar year in statement credits when you pay for your membership (subject to auto-renewal) with the Hilton Honors Aspire Card." This directly contradicts the $209 figure the proposal attributed to that same source set, and matches the FrequentMiler $219 report flagged in the task note.

Caveats on my verification: the Amex Hilton Aspire product page itself returned truncated content on every fetch attempt, so I could not read the $219 figure off the Aspire card's own issuer page. WebSearch budget was exhausted for this session, and several blog URLs I tried (FrequentMiler, TPG, DoctorOfCredit, NerdWallet, AwardWallet, clearme.com/pricing) 404'd, so my Aspire-specific confirmation rests on one affiliate site plus the issuer-official Platinum page establishing the program-wide amount.

Verdict: confirmed=false. Do not apply the proposed $209. Apply $219 instead — and ideally re-verify against the Aspire card's own Amex page or its benefit terms once it renders, since the only issuer page that names the Aspire card by name is the stale $209 hub page.
  - actual: "$219 CLEAR Plus Credit" — annualValue 219 (up to $219 in statement credits per calendar year for an annual CLEAR Plus membership paid with the Hilton Honors Aspire Card)
- **#57 American Express Business Platinum** benefits: proposed `annualValue unchanged; description should note the tightened policy effective 2026-07-08: Centurion Lounge entry is limi`
  - Rejected: the proposed wording inherits a factual conflation from its only real source, and its stated source quality is overstated.

(1) SOURCE QUALITY IS NOT "two-agreeing-secondary." The travelupdate.com article does not discuss Centurion Lounge access changes at all — it covers the Saks credit, Events by Amex, Uber VIP status, and Lufthansa lounge access. Its only Centurion mention is a reader comment about the $50 guest fee. So only ONE source (Upgraded Points, published 2026-05-11) supports the claim, not two.

(2) THE ONE SOURCE IS INTERNALLY INCOHERENT. Upgraded Points writes that access is "limited to within 5 hours of your departing or connecting flight" and calls this a change that "tightens up the current policy." Amex's standing policy since February 2023 has been entry no more than 3 HOURS before scheduled departure. A 5-hour window cannot be a tightening of a 3-hour window. That contradiction is the tell.

(3) THE ACTUAL RULE SPLITS DEPARTURES FROM CONNECTIONS. Independent corroboration is consistent: Doctor of Credit's article slug is literally "new-centurion-lounge-access-rules-announced-same-flight-5-hours-max-on-layovers"; the FlyerTalk thread is titled "guests on same flight, 5hr connection limit"; LoungeNerd states members "enter the lounge up to three hours before your departing flight" and can "only be able to access lounges during layovers (connections) up to five hours before" the next departure. The 3-hour departure rule REMAINS. The NEW 5-hour cap applies to layovers/connections, which previously were effectively exempt from the time limit.

So the proposed text is right that (a) the change is effective 2026-07-08 and (b) guests must travel on the same flight, but it is materially WRONG that entry is "within 5 hours of a departing or connecting flight." Applied as written, it would tell a cardmember they may enter 5 hours before a normal departure when the real limit is 3 — a user-harming error, so it cannot be confirmed.

CAVEAT ON VERIFICATION: I could not reach the issuer's own page. americanexpress.com Centurion Lounge URLs returned 404/403, and the Business Platinum product page returned an unexpanded JS template ({{prospectPznInfo | json: spacing}}). No source I reached reproduced Amex's verbatim official language, and my WebSearch budget was exhausted (200/200) before I started, limiting me to WebFetch and DuckDuckGo HTML results. The departure-vs-connection split is well corroborated across four independent sources, but the exact official phrasing and the precise list of affected international lounges are NOT fully settled — Upgraded Points lists U.S., London, Tokyo, Hong Kong, Sydney, Melbourne, while LoungeNerd lists only U.S. plus Hong Kong, London Heathrow, and Tokyo Haneda. That discrepancy should be resolved against Amex's own terms before the field is finalized. annualValue 500 was not contested by any source and I found no reason to change it.
  - actual: Centurion + Priority Pass — "Global lounge access for cardmember. Effective July 8, 2026, Centurion Lounge entry is restricted: guests must be travelling on the same flight as the cardmember, and lounge access during a layover/connection is capped at 5 hours before the connecting flight's departure. The pre-existing limit of 3 hours before a standard departing flight continues to apply." annualValue 500 (unchanged).
- **#62 Citi / AAdvantage Executive World Elite** cashbackCategories: proposed `ADD "American Airlines purchases after $150,000 in annual spend" at rate 0.05 (5x). This is a spend-threshold tier, not `
  - The underlying FACT is real and verified, but the proposed edit to `cashbackCategories` should not be applied — the proposal's own escape clause fires.

FACT VERIFICATION (independent):
1. Citi's own product page (https://www.citi.com/credit-cards/citi-aadvantage-executive-credit-card) states, live as of today: "Earn 4 AAdvantage miles for every $1 spent on eligible American Airlines purchases", "Earn 10 AAdvantage miles ... on eligible AAdvantage Hotels and eligible AAdvantage Cars bookings", "Earn 1 AAdvantage mile for every $1 spent on all other purchases", and that after $150,000 in purchases in a calendar year the cardholder earns "a total of 5 AAdvantage miles for every $1 spent on eligible American Airlines purchases for the remainder of the year."
2. The AA newsroom release (Aug 3, 2026) independently corroborates the 4X base / 5X-after-$150,000-annual-spend structure.
So the $150k -> 5x tier is genuine and currently in effect. The database is incomplete in that it omits it entirely.

WHY NOT CONFIRMED AS PROPOSED:
The proposal is conditional: add to `cashbackCategories` only if the catalog can express spend thresholds. It cannot. I checked the schema — a category row is exactly `{ id, cardId, category: string, rate: number, isDefault: boolean }` (lib/api-client-react/src/local/catalog.ts card id 62, lines ~5246-5261; seed source at artifacts/api-server/src/seed.ts:1411-1429). There is no threshold, cap, effective-date, or condition field. Adding a row "American Airlines purchases after $150,000 in annual spend" @ 0.05 would create a second, higher-rate American Airlines category with no gating, and the recommendation/analytics code that picks the best rate per category would unconditionally value all AA spend at 5x — overstating rewards for essentially every real cardholder (very few hit $150k). That is a worse data state than the current omission. The card record already has a `rewardRuleNotes: string[]` field (populated for this card), which is the documented home for "caps / activation requirements / caveats" per docs/card-rule-audit.md.

SEPARATE ISSUES FOUND WHILE VERIFYING (not the field under review, worth flagging to the maintainer):
- `cashbackCategories` for card 62 is missing the AAdvantage Hotels / AAdvantage Cars tier entirely (currently 10x on Citi's live page).
- Card name/fee are going stale: AA/Citi announced the card is renamed "Citi / AAdvantage Executive World Legend Mastercard", annual fee rises $595 -> $695, and hotels/cars goes 10x -> 12x, all effective August 23, 2026. As of today (Aug 6, 2026) the DB's $595 and the 4x/1x rows are still correct, but they flip in 17 days.
  - actual: Leave `cashbackCategories` free of any threshold row. Correct state today: cashbackCategories = [{ category: "American Airlines", rate: 0.04 }, { category: "AAdvantage Hotels & Cars", rate: 0.10 } (currently MISSING from the DB), { category: "Other", rate: 0.01, isDefault: true }]. Record the spend tier instead as an added entry in `rewardRuleNotes`: "After $150,000 in purchases in a calendar year, eligible American Airlines purchases earn a total of 5 AAdvantage miles per $1 (up from 4x) for the remainder of that year." Note for Aug 23, 2026: name becomes "Citi / AAdvantage Executive World Legend Mastercard", annualFee 695, and the hotels/cars rate becomes 0.12.
- **#62 Citi / AAdvantage Executive World Elite** benefits: proposed `Citi's and AA's 2026 press releases now value the included Admirals Club membership at "up to $1,400 annually" following`
  - The database is already right as of today (2026-08-06); the proposed 1400 is a real but not-yet-effective future value. Citi's own live product page for this card states verbatim "Admirals Club(R) membership (up to $850 in value)" and contains no mention of "World Legend," $695, $1,400, or any August 23 change. The claimed sources do exist and do say "$1,400 annually," but both issuer press releases are dated 2026-08-03 and describe an ENHANCED, rebranded product -- the Citi / AAdvantage Executive World Legend Mastercard -- whose changes are explicitly "effective August 23, 2026," including the annual fee going from $595 to $695. The underlying driver confirms the timing: AA is raising Admirals Club retail individual membership from today's $750-$850 range to $1,200-$1,400 by elite tier "beginning August 23, 2026." So $1,400 is the top-of-range retail price 17 days from now, not the price today, and 850 is not stale. The proposer's methodology is actually sound -- the catalog's 850 is the top of the current $750-$850 range, and 1400 is the top of the future $1,200-$1,400 range -- so this correction should be applied on/after 2026-08-23, not now. Two caveats for whoever schedules that update: (1) when annualValue flips to 1400, the card's name ("World Elite" -> "World Legend") and annualFee (595 -> 695) at /Users/fangchen/Desktop/Oh_My_Card/artifacts/api-server/src/seed.ts:1412 go stale in the same instant and must change together; (2) 1400 is the no-status tier price -- elites pay as little as $1,200 -- so if the app intends a typical rather than maximum retail price, 1400 will overstate it. Separately, the existing benefit description "Full access for cardholder + immediate family" misstates current terms; Citi's page says "primary cardmembers (and up to 2 guests)." Marking confirmed:false because I could not personally verify the proposed value as correct today -- the issuer's own live page contradicts it.
  - actual: 850
- **#103 Citi Strata Elite Card** benefits: proposed `ADD benefit "The Reserve by Citi Hotel Collection" — a collection of 4.5- and 5-star hotels bookable through Citi Travel`
  - The benefit is real and Strata Elite cardmembers do have access, so the database's omission is wrong — but the proposed value as written contains a materially false claim and cannot be confirmed as stated. It says the collection is "currently exclusive to Strata Elite cardholders." Citi's own current page for the program states verbatim: "The Reserve is available to Citi Strata Elite℠, Citi Strata Premier® and Citi Prestige® cardmembers through the Citi Travel site," and repeats it in the benefits header and the booking disclosure. The exclusivity claim traces to the claimed secondary source (Upgraded Points), a launch-era news article saying "only Citi Strata Elite Card holders are eligible to access it" — accurate at launch, stale now, and overridden by the issuer. Everything else in the proposal checks out against the issuer page: "$100.00 (USD) Experience Credit" that varies by property, "Daily Breakfast for Two," complimentary Wi-Fi, and "Room Upgrade / Early Check-In / Late Checkout, upon availability," booked via Citi Travel by selecting The Reserve rate. Notably, neither the Strata Elite product page nor its benefits page mentions The Reserve at all — those list only the separate "up to $300 annual hotel benefit" for 2+ night cititravel.com stays, which is a distinct perk and must not be conflated with the Experience Credit. On value: the $100 credit is per qualifying stay and property-dependent, not an annual entitlement, so annualValue should be 0 rather than 100 to avoid overstating the card's quantified value; 100 is defensible only if the schema tolerates per-stay figures. Recommend adding the benefit with the corrected, non-exclusive description below.
  - actual: ADD benefit: "The Reserve by Citi" (hotel collection) — a curated collection of 4.5- and 5-star hotels bookable through Citi Travel. Available to Citi Strata Elite, Citi Strata Premier, and Citi Prestige cardmembers (NOT exclusive to Strata Elite). Book on Citi Travel or the Citi Mobile App and select The Reserve rate at checkout to receive on-property benefits: daily breakfast for two, complimentary Wi-Fi, a $100 USD Experience Credit toward on-property spend such as dining or spa (amount/usage varies by property), plus room upgrade, early check-in, and late checkout, each upon availability. Unused benefits are not refundable and carry no compensation. Payable by card or ThankYou Points. Recommended annualValue: 0 (the $100 credit is per qualifying stay and property-dependent, not an annual credit). Distinct from the card's separate "up to $300 annual hotel benefit" on cititravel.com stays of 2+ nights — do not merge the two.
- **#14 Capital One Savor Rewards** cashbackCategories: proposed `Relabel to "Hotels, vacation rentals, rental cars and activities via Capital One Travel" = 0.05 (rate unchanged; vacatio`
  - I fetched Capital One's own Savor product page (https://www.capitalone.com/credit-cards/savor/) three times, including its footnote/disclosure section. The 5% tier is stated verbatim as: "Earn unlimited 5% cash back on hotels, vacation rentals and rental cars booked through Capital One Travel." The words "activities" and "experiences" do NOT appear anywhere in the earning categories or disclosures on the product page. The other 3% tier reads "at grocery stores (excluding superstores like Walmart and Target), on dining, entertainment and popular streaming services," and 1% on all else — confirming this is the current (post-2024 relaunch, no-annual-fee) Savor.

So neither the database nor the proposed correction is right:
- DATABASE is INCOMPLETE — it omits "vacation rentals," which the issuer explicitly includes. So the DB was not already right.
- PROPOSED CORRECTION OVERREACHES — it adds "activities," which the authoritative product page does not include. The only support for "activities" is the Capital One learn-grow blog article (https://www.capitalone.com/learn-grow/money-management/everything-about-savor/), which says "hotels, vacation rental, rental cars and activities booked through Capital One Travel." That is an editorial/blog page, lower authority than the product page and its disclosures, and it directly conflicts with the product page. Capital One Travel does sell experiences/activities, but the product page does not extend the 5% earn to them, so I cannot personally verify the "activities" element.

Attempts at further corroboration were inconclusive: the Savor disclosures URL and TPG/NerdWallet review URLs 404'd, and Bankrate's review is stale (it still describes the old annual-fee Savor with 4% dining and no 5% travel tier), so it carries no weight here. WebSearch budget for the session was exhausted, so I relied on direct issuer fetches — which are the strongest evidence available anyway.

Rate of 0.05 is correct and unchanged in all readings.
  - actual: "Hotels, vacation rentals and rental cars booked through Capital One Travel" = 0.05
- **#67 US Bank Altitude Reserve** cashbackCategories: proposed `Replace with post-2025-12-15 structure: "Hotels and Car Rentals booked in the U.S. Bank Travel Center" at 10x (rate 0.10`
  - The proposed correction is partly right but its central claim is false. U.S. Bank's own cardholder rewards site for this card (rewards.usbank.com/benefits/card/AltitudeReserveBenefits/faqs) currently states verbatim: "3 Points (1 base and 2 bonus Points) for every $1 spent on travel category purchases (such as purchases made directly with airlines, hotels, car rentals, taxicabs, limousines, passenger trains and cruise line companies)." The blanket 3x travel category therefore still exists; travel booked outside the Travel Center does NOT drop to 1x.

That same first-party page is demonstrably post-2025-12-15 current, because it also carries the two changes that took effect on that date: the new mobile-wallet cap ("3 Points ... on mobile wallet transactions on your first $5,000 each billing cycle. Transactions over $5,000 will earn 1 point for every $1 spent that billing cycle.") and the new Travel Center tiers ("10 Points (1 base and 9 bonus Points) ... on prepaid car and hotel reservations in the Travel Center" and "5 Points (1 base and 4 bonus Points) ... on prepaid flights in the Travel Center"). A page listing the new cap and the new portal rates while still listing 3x travel is strong evidence 3x travel survived rather than being stale copy.

I could not fetch a usbank.com marketing product page for this card because it has been discontinued to new applicants — usbank.com/credit-cards/altitude-reserve-visa-infinite-credit-card now resolves to the general card-lineup page (Smartly, Shield, Cash+, Altitude Connect, Altitude Go, Split). rewards.usbank.com is U.S. Bank's own servicing site for existing cardholders and is the authoritative first-party source that remains.

Secondary coverage corroborates by omission: Upgraded Points, AwardWallet, and DannyDealGuru all enumerate the Dec 15 changes as (a) mobile-wallet 3x capped at $5,000/cycle, (b) $325 credit restricted to Travel Center, (c) travel redemptions cut from 1.5 cpp to 1.0 cpp, and (d) new 10x/5x Travel Center tiers. None of them reports elimination of the 3x travel category — a change of that magnitude would have been headline material in articles specifically framed as "major negative changes." The proposed correction appears to have inferred the removal rather than sourced it. (I could not read the NerdWallet article directly — it returned HTTP 403.)

Verdict on the database: the existing "Travel" at 0.03 is still a correct category and, if anything, is now more numerically accurate than before, since the 1.5 cpp travel redemption was cut to 1.0 cpp — 3x at 1 cent = 3%, whereas pre-change it was effectively 4.5%. The database is not wrong, it is incomplete: it is missing the two new Travel Center tiers and the mobile-wallet category. Adopting the proposed value as written would introduce a real error (downgrading direct-booked travel to 1x).
  - actual: Keep "Travel" at rate 0.03 (3x on travel purchases made directly with airlines, hotels, car rentals, taxicabs, limousines, passenger trains, cruise lines), and ADD: "Hotels and Car Rentals prepaid in the U.S. Bank Travel Center" at 10x = rate 0.10; "Flights prepaid in the U.S. Bank Travel Center" at 5x = rate 0.05; "Mobile wallet purchases" at 3x = rate 0.03 on the first $5,000 per billing cycle, 1x (0.01) thereafter; all other purchases 1x = rate 0.01. All rates valued at the current 1 cent/point travel redemption rate (cut from 1.5 cents on 2025-12-15).
- **#67 US Bank Altitude Reserve** benefits: proposed `ADD note/benefit: as of 2025-12-15 the card gained point transfers to airline and hotel loyalty partners for the first t`
  - The database was already right. The proposed correction claims the Altitude Reserve "gained point transfers to airline and hotel loyalty partners" as of 2025-12-15. Independent research shows the feature was announced (Aug 2025) but NEVER launched. When the Dec 15, 2025 changes went live, U.S. Bank posted only a "coming soon" banner in the Rewards Center; that banner was removed in May 2026 with no explanation, and multiple outlets read this as abandonment. Frequent Miler: "U.S. Bank failed to launch a transfer partner program, instead putting up a banner in the rewards center saying that transfer partners would be 'coming soon.'" Doctor of Credit (a CLAIMED source, in its own update): "The coming soon banner for points transfers has now been removed." NextCard (May 2026): "As of May 2026, US Bank still has no airline or hotel transfer partners on any of its credit cards." I also fetched U.S. Bank's own product page and rewards pages: they make no mention of airline/hotel transfer partners anywhere. The claimed "two-agreeing-secondary" sourcing is invalid — the two cited sources do not agree. Upgraded Points says transfers are "now live," but that is announcement-time reporting never corrected, and it is contradicted by the issuer's own site AND by Doctor of Credit, the other claimed source. Separately, the proposal's secondary assertion is accurate but not the field under review: the Travel Center devaluation from 1.5c to 1.0c per point DID take effect 2025-12-15, so rewardUnitValueCents of 1 is indeed correct — the catalog already reflects that. Adding a transfer-partner benefit would introduce a factual error into the benefits field.
  - actual: Keep the benefits field as-is: the U.S. Bank Altitude Reserve has NO airline or hotel transfer-partner capability as of 2026-08-06. U.S. Bank announced the feature in Aug 2025 for a Dec 2025 launch, but it never shipped — only a "coming soon" Rewards Center banner appeared, which U.S. Bank removed in May 2026. Optionally add a factual note reflecting what DID change on 2025-12-15: U.S. Bank Travel Center redemptions fell from 1.5c to 1.0c per point (rewardUnitValueCents of 1 is correct); the $325 annual credit was narrowed to U.S. Bank Travel Center bookings only; and 3x mobile-wallet earning was capped at the first $5,000 per billing cycle (1x thereafter). The card is also closed to new applicants.
- **#71 Discover it Secured** benefits: proposed `The published 7-month automatic upgrade review has been retired under Capital One. Reviews are now described only as 'pe`
  - Independent check against the issuer's own live product page (https://www.discover.com/credit-cards/secured/, fetched 2026-08-06) partially supports the proposal but contradicts its factual premises, so I cannot confirm it as written.

What I verified directly on Discover's page:
- The card is STILL offered and STILL accepting applications — "See if You're Pre-Approved" CTAs appear multiple times, and there is no pause/discontinuation notice. The page does carry post-acquisition Capital One branding ("Please be sure to review Capital One's Terms & Conditions and Privacy Notice").
- The word "months" appears NOWHERE on the page (verified with two separate targeted extractions). There is no "7 months", no "automatic monthly reviews", and no published review schedule of any kind.
- The upgrade path itself still exists, described condition-based rather than time-based: "When you establish a positive track record, you'll earn your deposit back and upgrade to the Discover it Cash Back Credit Card," and in the FAQ "What happens to my deposit?" -> "Your deposit will be returned and your account unsecured. All other card terms and features will remain the same."

So the database's current text is stale: Discover no longer publishes the "starting at 7 months" automatic-review timeline that it advertised historically. That much of the proposal is right.

Why I still set confirmed:false:
1. The proposal's framing and its sourcing are wrong. The US News URL asserts Discover "discontinues its secured credit card" (I could not load it — two 60s timeouts — but the headline claim is flatly contradicted by the live, applyable product page). The moneyatlas.com source claims "Discover stopped taking new applications for this card on June 2, 2026" with a planned relaunch — I directly refuted that against the issuer page. A source that is demonstrably wrong on a checkable fact is not corroboration; moneyatlas.com is also an obscure domain with no evident authority.
2. The exact proposed wording "Periodic account reviews" is not language Discover uses anywhere I could find. It is the proposer's invention. Discover's actual current framing is achievement-based ("establish a positive track record"), not "periodic review".
3. "Drop annualValue toward 0" is not justified. The graduation-to-unsecured / deposit-return benefit still exists and is still marketed by the issuer; only the published timeline was removed. Zeroing the value overstates the change.

Corroboration attempts on secondary reviews failed for access reasons (NerdWallet 403, Forbes Advisor 403, Bankrate 404, Discover FAQ subpages 404), and the session's WebSearch budget was already exhausted before I started, so I relied on the primary issuer source — which is the strongest source available for this field anyway.

DB location for the edit: /Users/fangchen/Desktop/Oh_My_Card/artifacts/api-server/src/seed.ts:1615
  - actual: Keep the benefit, but retitle and rewrite it to match Discover's current published language, and reduce rather than zero the value:

name: "Upgrade Path to Unsecured"
description: "Deposit returned and account converts to the unsecured Discover it Cash Back once you establish a positive payment track record; no published review timeline"
annualValue: "20"

Notes: the previously advertised "automatic reviews starting at 7 months" language is no longer published on Discover's product page as of 2026-08-06. However, the card is NOT discontinued and is NOT paused for new applications — the issuer page is live with active pre-approval/apply CTAs under Capital One ownership. Do not adopt the proposal's "discontinued"/"applications paused June 2, 2026" premise.
- **#71 Discover it Secured** name: proposed `Discover it Secured Cash Back Credit Card (the product page title after the June 2026 relaunch)`
  - Partially correct but not confirmable as proposed. I fetched the issuer page myself three times with differently-worded prompts (including a neutral one that did not mention "Cash Back") and got consistent results: the HTML <title> is "Discover it Secured Cash Back Credit Card | Discover" while the H1 / brand name is "Discover it Secured Cash Back".

The proposal correctly identifies that "Cash Back" now belongs in the name, so the database's current "Discover it Secured" is stale/incomplete. But the proposal takes its value from the title tag, which appends "Credit Card" as a site-wide SEO convention rather than as part of the product name. Discover's own card index (https://www.discover.com/credit-cards/) renders EVERY product this way -- "Discover it Cash Back Credit Card", "Discover it Miles Credit Card", "Discover it Student Chrome Credit Card" -- so the suffix carries no product-specific meaning.

The database's internal convention independently confirms this. In artifacts/api-server/src/seed.ts, sibling Discover rows are stored without the suffix: "Discover it Cash Back" (line 440), "Discover it Miles" (line 459), "Discover it Chrome" (line 1561), "Discover it Student Cash Back" (line 1581). Accepting the proposed value would make card #71 the only Discover row with a suffix its siblings lack, sourced from the same title-tag pattern that would equally justify renaming line 440.

Correct value is therefore the H1 brand name: "Discover it Secured Cash Back".

Caveats: I could NOT verify the claimed "June 2026 relaunch" rationale or whether "Cash Back" is genuinely new versus longstanding. WebSearch budget was exhausted (200/200) before I could use it; NerdWallet returned 403 and Bankrate plus two Discover subpages returned 404, so no third-party corroboration was obtainable. Only the current issuer page state is verified -- which is sufficient for the field value itself, but leaves the change's timing/cause unconfirmed. Setting confirmed:false because the specific proposed string is wrong, not merely unverified.
  - actual: Discover it Secured Cash Back
- **#18 Discover it Miles** cashbackCategories: proposed `Keep 'All Purchases'=0.015 as default, but ADD 'Capital One Travel — hotels, vacation rentals, rental cars and activitie`
  - Could not verify the proposed 5x categories from any issuer source; issuer sources affirmatively contradict them. (1) Discover's own product pages for Discover it Miles (discover.com/credit-cards/miles/ and /travel/) state only "Earn unlimited 1.5x miles on travel purchases and all your everyday purchases" — a flat rate with explicitly no bonus categories, and no mention of Capital One Travel or Capital One Entertainment. (2) Capital One's own Discover-transition FAQ (capitalone.com/updates/discover/card-faqs/) — which is the very page Frequent Miler cites as its source for the claim — has a "Rewards & Benefits" section saying the 5% quarterly rotating category continues on Discover it Cash Back/Discover More, balances carry over, and "Earn rates stay the same." It lists NO Capital One Travel or Capital One Entertainment earning categories. Its timeline also says accounts move "throughout 2026 and early 2027," not a single 7/27/26 cutover. (3) The claimed secondary sources do not actually agree on this field: Upgraded Points says the "earning structure remains intact" and describes only new redemption/portal ACCESS (gift cards, Capital One Travel portal, Capital One Offers) — portal access is not an elevated earn rate; TPG leads with "Your card's earning rates won't change either." Only Frequent Miler contains the 5%/5X sentence, it says "Discover cardholders" generically without ever specifying Discover it Miles or a miles-denominated rate, and it sources the claim to a Capital One FAQ page that I fetched and which does not contain it. The proposed 5x hotels/rental-cars/activities and Capital One Entertainment figures pattern-match Capital One's own Venture/Savor product benefits rather than anything documented for Discover it Miles. Database was already correct.
  - actual: All Purchases=0.015 (default) — unchanged. Discover it Miles earns a flat unlimited 1.5x miles (1.5%) on all purchases including travel, with no bonus categories. No Capital One Travel or Capital One Entertainment bonus category exists on this card as of 2026-08-06.
- **#18 Discover it Miles** benefits: proposed `ADD benefit 'Capital One Offers' — up to 15 miles per dollar when shopping online through the Capital One Offers portal,`
  - Could not personally verify the proposed value as written. Discover's own product page for the Discover it Miles (https://www.discover.com/credit-cards/travel/miles-card.html, checked 2026-08-06) and the Discover member-benefits page list no Capital One Offers, no Capital One Shopping, and no shopping-portal earn rate; the redemption options shown are travel statement credit, bank deposit, and PayPal. Capital One's own newsroom and its Discover landing page carry no card-migration benefit announcement, and Capital One's own Capital One Offers explainer says rates "vary by merchant" with an "up to 4% at a department store" example and never cites 15x or ties the program to Capital One Shopping. Three secondary sources do confirm that Capital One Offers access is being extended to Discover accounts AFTER they migrate, and one (UpgradedPoints, 2026-05-12) confirms redemption toward a minimum payment is being retired; but only TPG asserts the "up to 15% cash back or 15 Discover miles per dollar" figure, and NO source supports the "plus Capital One Shopping access" element of the proposal. Additionally, the migration only began 2026-07-27 and proceeds in waves through 2027, so as of today this is not a live attribute of the card for most holders or for new applicants. The proposal is directionally real but overstated and mistimed; the database is not simply wrong either.
  - actual: Discover it Miles benefits as of 2026-08-06 remain, per Discover's own product page: Unlimited Miles Match (first-year match), 1.5x miles on all purchases, no annual fee, no foreign transaction fee, free FICO Score, $0 fraud liability, SSN/dark-web alerts, freeze it. Redemption: statement credit against travel purchases, deposit to bank account, PayPal at select merchants (100 miles = $1). "Capital One Offers" is NOT yet a benefit of this card in the issuer's own materials. It is a post-migration addition: accounts moved onto Capital One's platform (migration began 2026-07-27, rolling in waves through 2027) gain access to Capital One Offers, 5x miles on Capital One Travel hotels/rentals/cars/activities, and cross-brand rewards redemption. Reported Capital One Offers earn rates vary by merchant; Capital One's own materials cite variable rates (example "up to 4%"), and the "up to 15% / 15 miles per dollar" cap is asserted by only one secondary source (TPG) and is unverified against the issuer. "Capital One Shopping access" is NOT a card benefit — it is a free browser extension open to the general public and should not be listed. Separately, redeeming rewards toward a minimum payment is reported to be discontinued at migration (single secondary source; not yet reflected on Discover's site). Recommended handling: do not add "Capital One Offers" as a current benefit; if added at all, add it flagged as post-migration/pending with the 15x figure marked unverified, and drop the Capital One Shopping claim entirely.
- **#133 Wells Fargo One Key+ Card** benefits: proposed `The issuer states a $120 statement credit for Global Entry / TSA PreCheck. Using the catalog's amortization convention f`
  - Partially right, but not confirmable as proposed. I fetched the issuer page myself and read the raw HTML: Wells Fargo's One Key+ page states "$120 — Receive one statement credit up to $120 for a Trusted Traveler Program, such as Global Entry or TSA PreCheck," and Footnote 6 states "Your account is eligible for one (1) statement credit every four (4) years... The maximum statement credit amount is $120." So the DB's current description (no amount, annualValue 25, which reflects a $100-credit assumption) is indeed WRONG, and the proposed DESCRIPTION text is correct. However, the proposed annualValue of 30 rests on a citation I could not substantiate: the proposal claims a "Chase Sapphire Preferred calibration: $120/4yr -> annualValue 30," but Chase Sapphire Preferred (id 1, line 21 of lib/api-client-react/src/local/catalog.ts) has NO Global Entry / Trusted Traveler benefit in this catalog at all. Checking the catalog's actual convention for $120-every-4-years trusted-traveler credits, 7 of 8 comparable entries use the FULL amount (Chase Sapphire Reserve 120, BoA Premium Rewards Elite 120 -- both with explicit "every four years" wording -- plus United Club Infinite, Choice Privileges Select, Capital One Venture Business, Navy Federal Flagship, Capital One Spark 2X Miles, all 120). Only Citi AAdvantage Executive uses 30, and that appears to be the outlier the proposal found and misattributed. The separate amortize-to-25 entries are all $100 credits, a different convention. Since the amortized 30 is a modeling choice unsupported by any issuer source and justified by a nonexistent precedent, I cannot confirm the proposed value as stated. The description should be fixed; the annualValue should be 120 to match the catalog's dominant convention for this exact benefit shape.
  - actual: Trusted Traveler Credit — description: "Up to $120 statement credit toward Global Entry or TSA PreCheck (once every 4 years)". annualValue: 120, matching the catalog's dominant convention for $120-every-4-years trusted traveler credits (Chase Sapphire Reserve, BoA Premium Rewards Elite, United Club Infinite, Choice Privileges Select, Capital One Venture Business, Navy Federal Flagship, Capital One Spark 2X Miles all use 120). The issuer-verified facts are: maximum $120, one credit every four (4) years, credit posts within 60 days, paid even if the application is denied. If the catalog owner instead decides to standardize on amortization, the correct amortized figure is 30 — but that would require changing the other seven entries too, and the "Chase Sapphire Preferred calibration" cited as precedent does not exist.
- **#165 MyLowe's Pro Rewards American Express** cashbackCategories: proposed `These three 3X categories are almost certainly carried over from the DIFFERENT, now-discontinued "Lowe's Business Reward`
  - The proposed correction is wrong — the three categories are NOT stale carryover; they exist on the current Synchrony card. I pulled the issuer's own rewards terms: Lowe's own Business Credit Center page (footnote "2- and 1-point offers: See Credit Rewards Terms ... at Synchrony.com/MLPRA-terms") points to https://www.synchrony.com/document/mlpra-terms.pdf — "MYLOWE'S PRO REWARDS AMERICAN EXPRESS CARD REWARDS PROGRAM TERMS (REV 1/2026)". That PDF says verbatim: "Special Retailer Purchases. From time to time, the Card account may be eligible to earn 2 Points for every 1 U.S. dollar spent ... at retailers that Synchrony or Lowe's Home Centers, LLC may select ... As of April 2026, the Special Retailers include dining establishments, office supply stores, and wireless telephone service providers." and "All Other Purchases ... will earn one point for every 1 U.S. dollar spent." So restaurants / office supplies / wireless are real live bonus categories on card #165.

What IS wrong in the database is the RATE, not the categories: they earn 2 points per $1 (≈2%), not 3%. The 3X figure is what the old Amex-issued Lowe's Business Rewards Card paid (3x at U.S. restaurants, U.S. gas stations, U.S. office supply stores, U.S. wireless), so the proposer correctly spotted a carryover smell but drew the wrong conclusion — Synchrony kept the same three categories at a reduced 2X rate (and dropped gas stations).

Also note the 3-points figure that does exist on the new card is an intro offer: 3 points per $1 at Lowe's/Lowes.com/Lowe's app for the first 6 months, not an ongoing 3X on restaurants/office/wireless. The claimed sources (Synchrony press release, PRNewswire, Hardware Retailing, Nav) are all silent on earn categories — they simply never listed them, which the proposer misread as absence. Silence in a press release is not evidence of removal. Recommend editing the three rates 0.03 -> 0.02 rather than deleting the categories.
  - actual: "Restaurants" @ 0.02, "Office supplies" @ 0.02, "Wireless" @ 0.02 — i.e. 2 MyLowe's Rewards points per $1 (U.S. MCC: dining establishments, office supply stores, wireless telephone service providers) as of April 2026; all other non-Lowe's purchases 1 point per $1; Lowe's/Lowes.com purchases earn per MyLowe's Pro Rewards status (up to 1.25 pts/$1 at PlatinumPro) plus 5% off every day; intro 3 points per $1 at Lowe's for the first 6 months; points capped at $1.5M annual qualifying spend.
- **#164 Amazon Business Card (Amazon / U.S. Bank)** cashbackCategories: proposed `Same correction as card #163: the 2% tier applies automatically to your TOP 3 eligible spend categories outside Amazon, `
  - Independently verified against U.S. Bank's own Amazon Business credit cards page. The DATABASE IS WRONG: there are no fixed 2% categories. The page states 3% at Amazon.com/Amazon Business/AWS/Whole Foods Market (plus 3% on prepaid travel booked in the U.S. Bank Travel Center), "2% automatic rewards on your top 3 spending categories outside of Amazon," and 1% on everything else. Disclosure confirms the dynamic mechanism: "Each merchant's business is identified by a category code established by Mastercard... We reserve the right to determine which purchases are in the Top Categories... Top Categories are determined based on category code each billing cycle based on the combined spend of all Cardmembers." Annual fee $0 and World Elite Mastercard network also confirmed. However, I am NOT confirming the proposed value as written: its eligible-category pool lists only 9 categories, while U.S. Bank lists 15. The proposal omits advertising & direct marketing, computer & software services, car rental, drug stores & pharmacies, entertainment, and grocery stores — grocery in particular materially changes earn-rate math. So the correction is directionally right but incomplete; use finalCorrectValue instead of the proposed text. Note the current DB entry is a two-way error: not only is the tier dynamic rather than fixed, but the DB's "Wireless Services" and "Restaurants" labels happen to correspond to real eligible categories (cell phone service providers, dining) which may have caused the original mistake.
  - actual: Amazon Business Card (U.S. Bank, World Elite Mastercard, $0 annual fee). 3% back: Amazon.com, Amazon Business, AWS, Whole Foods Market; also 3% on prepaid travel booked in the U.S. Bank Travel Center. 2% back: automatically applied each billing cycle to the cardholder's TOP 3 spending categories outside of Amazon (determined by Mastercard merchant category code, based on combined spend across all cardmembers on the account) — NOT three fixed categories. The 15 eligible 2% categories are: accounting and tax services; advertising and direct marketing; airlines; car rental; cell phone service providers; computer and software services; dining; drug stores and pharmacies; entertainment; gas and EV stations; grocery stores; hotels; office supply stores; postal and shipping services; utilities. 1% back: unlimited on all other eligible purchases.
- **#79 RBC Avion Visa Infinite** benefits: proposed `ADD benefit "DoorDash DashPass Membership" — 12 months of complimentary DashPass plus $0 delivery fees on eligible order`
  - Partially right, but I cannot confirm the proposal as written. The BENEFIT ITSELF is real and the database is wrong to omit it: RBC's own product page lists a DoorDash partner offer reading "Add your credit card to your DoorDash account and get a free 12 monthly DashPass subscription" (footnote 16), and Prince of Travel corroborates "12 months of free DashPass from DoorDash" with "unlimited deliveries with $0 delivery fees on orders of $15 or more." So an addition is warranted.

However, the proposed annualValue of 120 fails verification, which the proposal itself flagged as needing checking. RBC states no dollar value anywhere. I checked DoorDash's own Canadian documentation, which states DashPass costs "$9.99/month with the monthly plan or $96/year ($8/month) with the Annual Plan." Twelve months of DashPass acquired at retail therefore costs $96, not $120. The $120 figure is an artifact of multiplying the month-to-month rate (9.99 x 12 = $119.88) while ignoring that the annual plan is the actual price of a year of DashPass. Committing 120 would overstate the benefit's replacement value by 25%, and it rests on secondary sources rather than the issuer.

Secondary caveat on the benefit text: the "$15 or more" threshold comes only from Prince of Travel, not from RBC. DoorDash's help article states "Subtotal minimums will be identified on DoorDash for each DashPass-eligible merchant," meaning minimums vary by merchant, so a flat $15 is an oversimplification that should be softened.

Note also that the database's existing entry is incomplete in another respect: RBC's page shows this card carries several partner offers (Petro-Canada, Rexall, Hertz) alongside DoorDash, so DashPass is one of a family of partner perks rather than an isolated omission. Recommend adding the benefit with annualValue 96 and hedged delivery-minimum wording rather than accepting the proposal as submitted.
  - actual: ADD benefit "DoorDash DashPass Membership" — 12 months of complimentary DashPass when you add the card to your DoorDash account, providing $0 delivery fees on eligible orders (minimum subtotals are set per merchant by DoorDash; commonly cited as $15+). annualValue: 96 (based on DoorDash Canada's Annual Plan price of $96/year, the actual retail cost of 12 months of DashPass; the month-to-month rate is $9.99/mo). RBC itself assigns no dollar value to this benefit, so the 96 figure is a derived valuation, not an issuer-stated one. Existing benefits (Travel Insurance, Mobile Device Insurance, Visa Infinite Benefits) remain correct.
- **#177 DBS Live Fresh Visa** cashbackCategories: proposed `ADD "In-store Overseas Spend (Asia)". Rate is disputed between sources: DBS's own page groups it with Shopping and Trans`
  - The category is real and current, but the proposed rate (0.06) is wrong, and the proposal's tie-breaker reasoning inverts the evidence. I pulled DBS's own PDFs linked from the product page.

CORE PROGRAMME — "Terms and Conditions Governing the DBS Live Fresh Card Cashback Programme", Last Updated 16 January 2026, subtitled "Up to 6% cashback on Shopping & Transport Spend":
- Base Rewards: 0.3% on All Spend, no cap
- Bonus Rewards (requires S$800 Minimum Spend Requirement per calendar month): "Additional 5.7% cashback on Shopping Spend" cap S$50; "Additional 5.7% cashback on Transport Spend" cap S$20
- There is NO overseas category in the core programme. Clause 8 defines Shopping Spend as "in-store and online retail transaction(s) charged to the Card in Singapore and overseas" by MCC; Clause 9 does the same for Transport Spend. Overseas is a location attribute of the existing categories, not a category. So DBS's "up to 6%" headline is scoped to Shopping & Transport only and cannot be transferred to In-store Overseas Spend.

SEPARATE PROMOTION — "Terms and Conditions Governing the DBS Live Fresh Card Zero FX Fees on In-store Overseas Spend Promotion", Last Updated 30 April 2025:
- Clause 2: "extra 3.25% cashback on all eligible in-store spend charged from 1 April 2025 in selected Asia currencies" if the Minimum Spend Requirement is charged
- Clause 3: "The maximum extra cashback that Cardmembers can earn each calendar month is capped at S$50"
- The 3.25% is explicitly a fee offset, not net yield: 1% Visa conversion charge + 2.25% DBS administrative fee
- Clause 7 lists exactly 15 selected Asia currencies: BND, KHR, RMB, HKD, IDR, JPY, LAK, MYR, MNT, MMK, PHP, KRW, TWD, THB, VND
- Clause 8 excludes Dynamic Currency Conversion transactions, online transactions effected in foreign currencies, and mobile-wallet/app-based payments — so it is strictly physical point-of-sale
- FAQ: the 3.25% is "awarded on top of your usual Bonus Rewards earned on your Shopping and Transport Spend"

The product page's own arithmetic confirms the promo is still live today (2026-08-06): "Bonus Rewards of up to S$120 on your Shopping, Transport and In-store Overseas Spend" = S$50 + S$20 + S$50.

VERDICT: the database was incomplete (the category should be added), but the proposed encoding of 0.06 is incorrect and the proposal's stated preference for the issuer figure over SingSaver's is backwards — SingSaver's 3.25% / S$50 cap matches the issuer T&C verbatim. Two further caveats for whoever encodes this: (1) it is a promotion under a separate T&C that DBS "may vary, suspend or terminate without notice", not a permanent programme category, and the T&C references a "Promotion Period" whose end date is not stated in the document text; (2) it is an incremental rate — a qualifying overseas in-store transaction earns 0.3% base + 3.25%, plus 5.7% more if the merchant MCC also falls in Shopping Spend Table 3, but the 3.25% component nets to zero economically since it exists to cancel the 3.25% FX fee.
  - actual: ADD category "In-store Overseas Spend (selected Asia currencies)" at 0.0325 — NOT 0.06. Extra/incremental 3.25% cashback, cap S$50 per calendar month, requires S$800 minimum spend per calendar month. Physical point-of-sale only in 15 Asia currencies (BND, KHR, RMB, HKD, IDR, JPY, LAK, MYR, MNT, MMK, PHP, KRW, TWD, THB, VND); excludes DCC, online foreign-currency transactions, and mobile-wallet/app-based payments. It is a fee-offset promotion (1% Visa conversion + 2.25% DBS admin fee) governed by a separate, terminable T&C, and stacks on top of Base Rewards and any Shopping/Transport Bonus Rewards. For reference, the correct core categories are Shopping 6% (0.3% base + 5.7% bonus, cap S$50/mo) and Transport 6% (0.3% + 5.7%, cap S$20/mo), both gated on the same S$800 minimum, plus uncapped 0.3% on All Spend.

## Cards that could not be verified

- **#8 American Express Gold Card** — signupBonus field ONLY (all other fields verified against the issuer page). The Amex Gold product page does not render the welcome offer to a non-personalized fetch. Secondary sources report the spend requirement rose from $6,000 to $8,000 in 6 months with the bonus still up to 100,000 points, but that is not issuer-confirmed. Per rule 4: volatile — do not auto-track.
- **#9 American Express Platinum** — signupBonus field ONLY (annual fee $895, earn rates and all credits verified). The Platinum product page does not render the welcome offer to a non-personalized fetch, and public offers are affiliate-inflated and targeted. Volatile — do not auto-track.
- **#10 Amex Blue Cash Preferred** — signupBonus field ONLY. The issuer page returned truncated content; secondary sources cite "up to $300 cash back" while the catalog says $250 after $3,000 in 6 months. Could not confirm from the issuer, so no change is reported. Volatile — do not auto-track. All other BCP fields (AF $95, 6%/6%/3%/3%/1% categories) confirmed unchanged.
- **#11 Amex Blue Cash Everyday** — signupBonus field ONLY. Issuer page truncated; secondary sources cite "as high as $200 after $2,000 in 6 months", which matches the catalog, but not issuer-confirmed. Volatile — do not auto-track. All other BCE fields ($0 AF, 3% supermarkets / 3% online retail / 3% gas each to $6,000/yr, 1% other) confirmed unchanged.
- **#88 American Express Green Card** — cashbackCategories could not be re-verified against a live issuer product page because Amex pulled the Green Card page on 2026-07-23. The surviving Amex member-guide page phrases the travel earn as "3X on all travel booked through American Express Travel", which is narrower than the catalog's blanket "Travel 3%", but the rename announcement explicitly says no rewards-structure changes. Leaving the 3x travel / 3x transit / 3x restaurants / 1x other rates as-is; re-check after the expected refresh lands.
- **#31 Delta SkyMiles Gold American Express** — Partial. All benefit and category data verified via delta.com and Delta's newsroom. The one item I could NOT resolve: delta.com's card-comparison page appeared to list a "$120 Resy credit" for the consumer Gold card, but targeted follow-up research (UpgradedPoints' Delta Resy credit guide and TPG's Resy credit guide) attributes the Resy credit only to the Platinum ($10/mo) and Reserve ($20/mo) tiers, with no Resy benefit on Gold. I treated the delta.com line as a rendering artifact of a shared comparison table and did NOT report a Resy credit for this card. Worth a manual confirmation before anyone adds one.
- **#41 Hilton Honors American Express Aspire** — Partial. All benefits verified, but the exact CLEAR Plus credit amount is genuinely contested: americanexpress.com's own CLEAR benefit page says $209/calendar year while FrequentMiler (post the 2026-07-01 CLEAR Plus price increase to $219) says $219. I reported $209 per rule 1 (issuer page wins) at medium confidence. The Amex page may simply not have been updated for the July price change.
- **#58 Marriott Bonvoy Bevy American Express** — Not unverifiable — listed here only as a caveat on one sub-field. Every catalog field checks out, but the catalog's 4x Restaurants and 4x Groceries entries omit the cap: 4X applies to a combined $15,000 per calendar year across restaurants worldwide and U.S. supermarkets, dropping to 2X after. The rate values themselves are correct so I did not file this as a change, but the category labels understate the restriction and the orchestrator may want to encode the cap in rewardRuleNotes.
- **#123 Hilton Honors American Express Business** — Partial. Annual fee, credits, statuses and the 12X/5X rates are all confirmed. I could not establish the precise effective date of the business-card refresh that raised the fee $95 to $195 — the primary UpgradedPoints article has been archived and returns an "expired and no longer available" notice. It clearly predates the May 2026 review since the catalog already reflects the refreshed fee, credit and benefit set, so the date does not affect any reported change.
- **#152 Delta SkyMiles Gold Business American Express** — Partial. Refresh changes and the $150 Delta Stays credit are confirmed via delta.com plus UpgradedPoints. I could not verify whether this card carries a Resy credit — delta.com does not list one for Gold Business and no secondary source mentions one, so I assumed none and reported nothing. Consistent with the consumer Gold, where Resy is also absent.
- **#56 American Express Business Gold** — signupBonus field only. Catalog says "70,000 points after $10,000 spend in 3 months". Secondary sources reference a 200k-point offer circulating in 2026, but per research rule 4 I will not report a signup bonus change without the issuer's own page, and americanexpress.com renders JS-only ({{prospectPznInfo}} placeholder) so it could not be fetched. Treat as volatile - do not auto-track. All other fields on this card WERE verified.
- **#57 American Express Business Platinum** — signupBonus field only. Catalog says "150,000 points after $20,000 in 3 months". Doctor of Credit's refresh coverage references 175k/200k-point offers, but the issuer page is JS-only and could not be fetched, so no change is reported. Treat as volatile - do not auto-track. All other fields on this card WERE verified.
- **#150 American Express Graphite Business Cash Unlimited** — signupBonus field only. Catalog says "See issuer page for current public offer", which is safe and needs no edit. Secondary sources cite $1,500 cash back after $50,000 spend in 6 months, but this is not issuer-confirmed. Earning rates, annual fee and credits WERE verified.
- **#12 Capital One Venture X** — Partially unverified: could not source an effective date for the PRIOR subscription and The Cultivist (50% off Enthusiast membership, up to 2 years) benefits. Both appear on capitalone.com/credit-cards/venture-x/ today but no dated announcement was findable, so I cannot tell whether they postdate the May 2026 review. I reported PRIOR as missing-entirely at medium confidence and deliberately did NOT report The Cultivist as a change since it has no clean dollar value to model.
- **#100 Capital One Venture X Business** — Could not confirm whether the 2026-02-01 lounge guest/authorized-user changes (no free guests, $125/yr per authorized user, $75K spend threshold) apply to the BUSINESS version of Venture X. Every source I found describes the consumer Venture X only. The catalog's benefit [361] "Airport Lounge Access = $450" may therefore be overstated in the same way #12's is, but I am not reporting it without a source. Worth a targeted re-check.
- **#134 Capital One Spark Cash Plus** — Could not establish an effective date for the welcome-offer components ($500 Business Travel credit, $2,000-per-$500K first-year tier). They are on the issuer page now but I found no dated announcement, so I cannot classify the change as pre- or post-May-2026. Reported at medium confidence with effectiveDate unknown.
- **#156 Capital One Spark 2% Cash** — Annual fee ambiguity I could not resolve cleanly: capitalone.com now states "an introductory $0 annual fee—and $95 after that". The catalog's annualFee of 95 is correct for the ongoing fee, so I did NOT report a change, but the catalog has no field to express a waived first year and the card's effective year-one cost is $0. Flagging rather than editing. Also could not date the welcome-offer change from $1,500/$15,000 to $1,000/$10,000.
- **#69 Discover it Chrome** — Card itself fully verified against discover.com (still open to new applicants, $0 AF, 2% gas + restaurants on up to $1,000/qtr combined, 1% other, Cashback Match, free FICO) — hence listed in verifiedUnchanged. What I could NOT verify is whether Chrome gets the same Capital One Travel/Entertainment 5% categories and Capital One Offers benefit that were explicitly confirmed for Discover it Cash Back and Discover it Miles. TPG says 'all Discover consumer card accounts will gradually transition' through 2027, but no source names Chrome specifically. Recommend re-checking after Q4 2026.
- **#70 Discover it Student Cash Back** — Same Capital One migration ambiguity as Chrome — no source names the Student card specifically for the new Capital One Travel/Entertainment 5% categories or Capital One Offers. Separately, discover.com currently shows a limited-time '$100 statement credit after $300 spend in first 3 months' offer alongside/instead of Cashback Match; I did not report it as a signupBonus change because it is an explicitly limited-time promo and signup bonuses are volatile.
- **#110 Choice Privileges Mastercard** — The issuer landing page (wellsfargo.com/credit-cards/choice/ and /choice-privileges/) returned 404 on fetch, so earn rates were confirmed only via secondary sources (NerdWallet, AwardWallet, Frequent Miler — all agreeing with the catalog: 5x Choice, 3x gas/grocery/home improvement/phone, 1x other, $0 AF). The signup bonus is unverifiable: multiple sources show a 60,000-point / $1,000-spend limited-time offer vs. the catalog's 40,000 / $1,000, but Frequent Miler flags a 60K offer as expired. Treat signupBonus as volatile — do not auto-track.
- **#73 Choice Privileges Select Mastercard** — Global Entry / TSA PreCheck credit amount is in conflict: the catalog says up to $120, Frequent Miler says $100 every four years, and the Wells Fargo terms page I fetched did not surface the amount. Left unchanged rather than risk a false edit. Everything else (95 AF, 10x/5x/1x, 60,000 after $3,000 in 3 months, 30,000-point anniversary bonus) is confirmed against the Wells Fargo terms page.
- **#17 Discover it Cash Back** — One unconfirmed rumor deliberately NOT reported: a Frequent Miler commenter claimed the post-migration catch-all becomes tiered (0.25% on the first $3,000 of annual purchases, then 1%). No issuer source and no second independent source supports this; every named source states earning rates are unchanged. Flagging so the orchestrator does not act on it if it surfaces elsewhere. Also: signupBonusValue 150 for Cashback Match is a modeling estimate, not an issuer figure — Cashback Match is uncapped and has no stated dollar value.
- **#165 MyLowe's Pro Rewards American Express** — Could not source the actual current earn table. lowes.com/l/Credit/business-credit-center returns 403 to automated fetch, and neither the Synchrony investor press release nor the Hardware Retailing coverage states points-per-dollar or bonus categories — both defer to Lowes.com/Terms. I could confirm what the card is NOT (it is not the discontinued Amex-issued Lowe's Business Rewards Card whose 3x categories the catalog appears to have copied) and that it has no annual fee, but not what the correct replacement categories are. Needs a manual read of Lowes.com/Terms or the cardmember agreement.
- **#63 JetBlue Plus Card** — signupBonus only. Catalog says 60,000 TrueBlue points; multiple secondary sources (Upgraded Points, U.S. News, WalletHub) currently show 70,000 after $1,000 spend + paying the annual fee within 90 days. cards.barclaycardus.com returns 403 to automated fetch so the issuer page could not confirm it. Per the issuer-only rule for signup bonuses this is NOT reported as a change — treat as volatile, do not auto-track. All other JetBlue Plus fields were verified.
- **#42 Wyndham Rewards Earner+ Card** — signupBonus only. The Wyndham/Barclays newsroom release advertises "up to 100,000 points" for the refreshed Earner Plus while PointsNav shows a 45,000-point offer after $1,000 spend, i.e. a tiered/rotating offer. cards.barclaycardus.com 403s so the issuer page could not adjudicate. Marked volatile — do not auto-track. Same caveat applies to cards 120 and 121 (newsroom shows "up to 75,000" and "up to 100,000" respectively, unconfirmed on the Barclays application page). All non-SUB fields for 42/120/121 were verified against the issuer/brand newsroom.
- **#130 Alliant Cashback Visa Signature** — alliantcreditunion.org returns HTTP 403 to WebFetch and my WebSearch budget was exhausted before I could resolve conflicting secondary sources. NerdWallet's news piece ("Alliant Cashback: Downgraded from Magnificent to Meh") indicates the rate was cut to 1.5% effective November 2025 — which MATCHES the catalog's current 1.5% / $0 annual fee, so I am NOT reporting a change. However, mybanktracker (reviewed 2025-12-15) still describes the legacy 2.5%-on-first-$10,000-per-cycle structure with a $99 annual fee waived year one, and U.S. News notes the card 'is not currently available on the site,' hinting it may be closed to new applicants. Two open questions for follow-up: (1) confirm 1.5% flat / $0 AF against alliantcreditunion.org directly, (2) confirm whether the card is still open to new applicants — if not, the `discontinued` flag needs setting.
- **#84 American Express Cobalt Card** — Not in my assigned id list, so I only audited the one field the group brief called out: the annual fee. RESULT — the catalog's 191.88 is CORRECT and the brief's premise is stale. Amex Canada raised the Cobalt from $12.99/month ($155.88/yr) to $15.99/month ($191.88/yr) effective 2025-11-05; Quebec residents are billed the $191.88 annually rather than monthly. DO NOT change annualFee to 155.88. americanexpress.com/en-ca returned only nav/footer chrome to WebFetch (JS-only product page), so this rests on secondary sources (Milesopedia news piece, Forbes Advisor Canada, Ratehub). Cobalt's categories, benefits and signup bonus were NOT audited by me and still need an owner. Note one likely stale item for whoever picks it up: Amex cut the Cobalt travel earn rate from 2x to 1x back in Oct 2024, and the catalog has no travel category, so that part appears fine.
- **#175 DBS Black World Mastercard** — Annual fee could not be sourced to the issuer. DBS Hong Kong does not state the fee on the product page, the welcome-offer page, or the dual-card landing page — it lives only in linked Key Facts Statement / Fee Schedule PDFs. The two secondary sources DISAGREE (MoneySmart HK: HK$3,800; MoneyHero HK: HK$3,600), so rule 2's two-agreeing-sources bar is not met. I filed it as a low-confidence change because HK$2,000 is demonstrably a placeholder, but do NOT write a specific replacement number without opening the DBS fee-schedule PDF first. The card's earn rates, by contrast, ARE issuer-confirmed and safe to edit.
- **#177 DBS Live Fresh Visa** — The In-store Overseas Spend bonus rate could not be pinned down. DBS's own page groups it with Shopping and Transport under "Bonus Rewards of up to 6%", but SingSaver's rate table lists it at 3.25% with an S$50 monthly cap, and MoneySmart repeats the 3.25% figure. Issuer wording is vaguer than the secondary sources here, which is the reverse of the usual situation. The Shopping and Transport changes on this card are solid; hold the overseas category until the DBS rates-and-fees PDF is checked.
- **#174 Hang Seng MMPOWER World Mastercard** — The base/default earn rate (catalog: 0.004) could not be confirmed. The Hang Seng product page lists only the promotional 8%/5%/4% tiers and never states what non-eligible spend earns. 0.4% is Hang Seng's standard Cash Dollars base and is plausible, so I left it unchanged rather than guess — but it is unsourced. Also unverified: whether the 8%/5%/4% structure survives past the stated 31 Dec 2026 programme end date, which falls inside this catalog's likely refresh horizon.
- **#172 HSBC Visa Signature Card** — Partial. The 3.6% figure for designated categories is issuer-confirmed, but HSBC's page also says cardholders get an "exclusive extra 1.2% RewardCash (3X) automatically on all categories", which read literally would make the default "Other" rate 1.6% (4X) rather than the catalogued 0.4%. MoneySmart's wording indicates the extra 3X applies only within the Rewards of Your Choice categories, not to all spend. Ambiguous — I left the 0.4% default alone. Resolving this needs the Red Hot Rewards of Your Choice T&Cs.