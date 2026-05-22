# Card Rule Audit Notes

Reviewed on 2026-05-20. Updated with a new rule-correction batch on 2026-05-21.

## Calculation Model

- `cashbackCategories.rate` is the card's earn rate as a decimal: `0.05` means either 5% cash back or 5x points/miles, depending on the card reward unit.
- `rewardType` identifies the official unit family: `cashback`, `points`, or `miles`.
- `rewardProgram` and `rewardUnitName` are display metadata for issuer-specific programs.
- `rewardUnitValueCents` is the cash-equivalent estimate used for annual-fee progress, Smart Suggest value ranking, and expected reward value.
- If `rewardUnitValueCents` is missing, the app defaults to 1 cent per unit. That is a conservative placeholder, not a completed official audit.
- Top Rewards should display the earned unit count for points/miles cards, while annual-fee progress should use the cash-equivalent estimate.
- `rewardRuleNotes` stores officially reviewed caveats such as selected categories, activation requirements, travel portal requirements, and caps.
- The local transaction calculator now supports category labels that explicitly say `up to` or `first $X` per month, quarter, or year. Bank of America Customized Cash Rewards remains a dedicated rule because its first-year choice-category logic is account-age dependent.

## Official Rules Confirmed So Far

### 2026-05-21 Rule-Correction Batch

- Apple Card: Apple purchases and selected Apple Pay merchants are modeled at 3%, general Apple Pay at 2%, and other purchases at 1%.
- IHG One Rewards Premier, Traveler, and Premier Business: hotel earn is now modeled as credit-card earn only. Official marketing may show a higher total by adding base IHG One Rewards and elite-status points, but those are not card-earned rewards for purchase optimization.
- American Express Gold, Platinum, Blue Cash Everyday, Blue Business Cash, Blue Business Plus, Business Gold, and Business Platinum: annual caps that affect calculation are now in category labels where the calculator can enforce them.
- American Express Graphite Business Cash Unlimited: corrected from an incorrect Amex Travel bonus model to the official unlimited 2% cash-back model.
- PNC Cash Rewards Visa, Discover it Chrome, Discover it Secured, Chase Freedom Flex, Discover it Cash Back, Discover it Student Cash Back, U.S. Bank Cash+, Chase Ink Business Preferred, and Chase Ink Business Cash: quarterly/annual caps are now represented in category labels.
- Verizon Visa Card: dining was corrected to 4% Verizon Dollars.
- Costco Anywhere Visa by Citi: gas and EV charging now share a single cap group in the calculation model.
- AAA Travel Advantage Visa Signature: 3% travel category label now includes AAA purchases based on the current official AAA page.
- Calculation engine: generic spend-cap grouping was tightened so categories only share a cap when the category language says they are combined or linked. This prevents cards like Amex Blue Cash Everyday from incorrectly sharing separate $6,000 annual category caps.

- Bank of America Customized Cash Rewards: official page confirms first-year 6% choice-category cash back, 2% grocery/wholesale cash back, and a combined $2,500 quarterly cap before falling back to 1%; after the first year, the choice category is 3%.
  Sources: https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/cash-back-category-choices/ and https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/
- Citi Custom Cash: official page confirms 5% cash back in the top eligible spend category each billing cycle up to $500, then 1%; it also confirms cash back is earned as ThankYou Points and gives the 10,000 points = $100 cash redemption example.
  Source: https://www.citi.com/credit-cards/citi-custom-cash-credit-card
- Chase Sapphire Preferred / Sapphire Reserve: official Chase pages now describe Points Boost as dynamic. Preferred can be up to 1.5x on selected Chase Travel redemptions; Reserve can be up to 2x in selected Points Boost cases. Do not hardcode the old fixed portal uplift for all transactions without cardholder/account-date logic.
  Sources: https://www.chase.com/sapphire-cards/personal/preferred and https://www.chase.com/travel/guide/trips/chase-sapphire-points-boost-benefits-guide
- American Express Membership Rewards: official pages confirm earn rates and several annual caps, such as Gold 4x restaurants up to $50,000/year and U.S. supermarkets up to $25,000/year, plus Platinum 5x flights up to $500,000/year. Redemption value varies by redemption path.
  Sources: https://www.americanexpress.com/en-us/account/get-started/gold/earn-rewards and https://www.americanexpress.com/en-us/account/get-started/platinum/
- Capital One Venture-family cards: official Capital One pages confirm Venture/Venture X miles earn structures such as 2x everyday miles and elevated Capital One Travel earn rates. Redemption can be through Capital One Travel, recent travel purchase coverage, transfer partners, gift cards, and cash options.
  Sources: https://www.capitalone.com/credit-cards/travel-and-miles/ and https://www.capitalone.com/learn-grow/money-management/ways-to-redeem-venture-miles/

## Remaining Audit Work

- Populate `rewardType`, `rewardProgram`, `rewardUnitName`, and `rewardUnitValueCents` only after checking each card's official issuer page or current official terms.
- Add generalized cap/reset metadata before claiming capped cards are all calculated correctly.
- Required cap patterns include quarterly caps, monthly/billing-cycle caps, annual caps, rotating activation categories, selected custom categories, anniversary-year credits, and account-age-specific earning.
- Cards that should be prioritized next: Citi Custom Cash, U.S. Bank Cash+, Discover it Cash Back, Chase Freedom Flex, Amex Gold, Amex Platinum, Citi Double Cash, Costco Anywhere Visa, and all cards with "up to", "first", "per billing cycle", "per quarter", or "activation" in their rules.

## Source Availability Pass

- 182 catalog source URLs were checked on 2026-05-20.
- Results after HEAD with partial-GET fallback: 146 returned 200, 34 returned 206, 1 returned 403, and 1 returned 500.
- Full table: `docs/card-source-availability.md`.
- This pass only verifies URL availability. It does not complete reward-rule verification.

## Catalog Metadata Pass

- All 182 catalog cards now have reward unit metadata in `lib/api-client-react/src/local/catalog.ts`.
- Summary: 75 cashback cards, 70 points cards, 29 miles cards, and 8 no-reward cards.
- Full table: `docs/card-reward-rule-audit-results.md`.
