# Card data freshness report

Generated 2026-11-16T16:40:02.610Z · ruleset `2026.11.01.13`

| Metric | Value |
| --- | --- |
| Cards in catalog | 189 |
| Source pages crawled | 189 |
| Pages reachable (HTTP 200) | 181 |
| Findings | 119 (10 high / 95 medium / 14 low) |
| Median review age | 16 days |
| Oldest review date | 2026-05-17 |

> **10 high-severity findings need a human decision before the next release.**

Extracted values are *signals, not truth*. Issuer pages list other cards'
fees in comparison tables and vary offers by region, so every proposed
change must be confirmed against the issuer page before editing `catalog.ts`.

### Product may be discontinued (2)

- **#7 Citi Custom Cash** (Citi) — 🔴 High
  - Page contains "no longer accepting applications" style language. Confirm and mark the card closed.
  - https://www.citi.com/credit-cards/citi-custom-cash-credit-card
- **#122 Hawaiian Airlines Business Mastercard** (Barclays / Hawaiian Airlines) — 🔴 High
  - Page contains "no longer accepting applications" style language. Confirm and mark the card closed.
  - https://frequentmiler.com/hawaiian-airlines-cards-issued-by-barclays-still-available-for-now/

### Annual fee disagrees with issuer page (11)

- **#8 American Express Gold Card** (American Express) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `325` · page: `0`
  - https://www.americanexpress.com/us/credit-cards/card/gold-card/
- **#112 U.S. Bank Shopper Cash Rewards Visa Signature** (U.S. Bank) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `95` · page: `0`
  - https://www.usbank.com/credit-cards.html
- **#118 Navy Federal Visa Signature Flagship Rewards** (Navy Federal Credit Union) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `49` · page: `95`
  - https://www.navyfederal.org/about/press-releases/2026-press-releases/Flagship-Premier-Launch.html
- **#145 TD Clear Visa Platinum** (TD Bank) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `120` · page: `0`
  - https://www.td.com/us/en/personal-banking/credit-cards/prequal-option-1/clear
- **#151 American Express Business Green Rewards** (American Express) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `95` · page: `0`
  - https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-business-green-card-amex/
- **#168 Atmos Rewards Visa Signature Business** (Bank of America / Alaska Airlines) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `95` · page: `70`
  - https://business.bankofamerica.com/en/credit-cards/atmos-rewards
- **#180 HSBC Revolution Credit Card** (HSBC Singapore) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `0` · page: `2.5`
  - https://www.hsbc.com.sg/credit-cards/products/revolution/
- **#182 Standard Chartered Smart Credit Card** (Standard Chartered Singapore) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `99.19` · page: `91`
  - https://www.sc.com/sg/credit-cards/smart-credit-card/
- **#62 Citi / AAdvantage Executive World Legend Mastercard** (Citi / American Airlines) — 🟡 Medium
  - Several fee figures on the page, none matching the catalog. Likely a comparison rail — confirm manually.
  - catalog: `695` · page: `0, 175`
  - https://www.citi.com/credit-cards/citi-aadvantage-executive-credit-card
- **#115 U.S. Bank Business Leverage Visa Signature** (U.S. Bank) — 🟡 Medium
  - Several fee figures on the page, none matching the catalog. Likely a comparison rail — confirm manually.
  - catalog: `95` · page: `0, 295`
  - https://www.usbank.com/business-banking/business-credit-cards/business-leverage-rewards-credit-card.html
- **#133 Wells Fargo One Key+ Card** (Wells Fargo) — 🟡 Medium
  - Several fee figures on the page, none matching the catalog. Likely a comparison rail — confirm manually.
  - catalog: `99` · page: `0, 95`
  - https://creditcards.wellsfargo.com/

### Source page unreachable (5)

- **#26 PNC Cash Unlimited** (PNC Bank) — 🟡 Medium
  - Request failed after retries: AbortError: This operation was aborted
  - https://www.pnc.com/en/personal-banking/banking/credit-cards/pnc-cash-unlimited-visa-credit-card.html
- **#74 PNC Cash Rewards Visa** (PNC Bank) — 🟡 Medium
  - Request failed after retries: AbortError: This operation was aborted
  - https://www.pnc.com/en/personal-banking/banking/credit-cards/pnc-cash-rewards-visa-credit-card.html
- **#82 BMO eclipse Visa Infinite** (BMO) — 🟡 Medium
  - Request failed after retries: AbortError: This operation was aborted
  - https://www.bmo.com/main/personal/credit-cards/bmo-eclipse-visa-infinite/
- **#88 American Express Classic Green Card** (American Express) — 🟡 Medium
  - Request failed after retries: TypeError: fetch failed
  - https://www.americanexpress.com/en-us/company/legal/cardmember-agreements/
- **#149 Bread Cashback American Express** (Bread Financial / Comenity Capital Bank) — 🟡 Medium
  - Request failed after retries: TypeError: fetch failed
  - https://www.americanexpress.com/en-us/network/breadfinancial/credit-cards/bread-cashback-card.html

### Source page moved (5)

- **#62 Citi / AAdvantage Executive World Legend Mastercard** (Citi / American Airlines) — 🟡 Medium
  - sourceUrl redirects to https://www.citi.com/credit-cards/citi-aadvantage-executive-world-legend-mastercard. Update sourceUrl, and check whether the product changed.
  - https://www.citi.com/credit-cards/citi-aadvantage-executive-credit-card
- **#71 Discover it Secured Cash Back** (Capital One / Discover) — 🟡 Medium
  - sourceUrl redirects to https://www.discover.com/credit-cards/secured-credit-card/. Update sourceUrl, and check whether the product changed.
  - https://www.discover.com/credit-cards/secured/
- **#115 U.S. Bank Business Leverage Visa Signature** (U.S. Bank) — 🟡 Medium
  - sourceUrl redirects to https://www.usbank.com/business-banking/business-credit-cards.html. Update sourceUrl, and check whether the product changed.
  - https://www.usbank.com/business-banking/business-credit-cards/business-leverage-rewards-credit-card.html
- **#169 BECU Cash Back Visa** (BECU) — 🟡 Medium
  - sourceUrl redirects to https://www.becu.org/everyday-banking/credit-card/cash-back-credit-card. Update sourceUrl, and check whether the product changed.
  - https://www.becu.org/everyday-banking/credit-card/cash-back-visa
- **#176 Citi Cash Back Card (Hong Kong)** (Citi Hong Kong) — 🟡 Medium
  - sourceUrl redirects to https://www.citibank.com.hk/en/credit-cards/cashback-card/index.html. Update sourceUrl, and check whether the product changed.
  - https://www1.citibank.com.hk/english/credit-cards/cash-back-card

### Issuer page changed since last crawl (35)

- **#2 Chase Sapphire Reserve** (Chase) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (10 -> 8), statement credit (66 -> 61), points (80 -> 68), miles (3 -> 0), cash back (5 -> 3), lounge (33 -> 29), foreign transaction (7 -> 3), priority pass (14 -> 12)
  - https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve
- **#3 Chase Freedom Unlimited** (Chase) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (10 -> 12), statement credit (0 -> 2), points (16 -> 18), cash back (32 -> 43), foreign transaction (3 -> 5)
  - https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited
- **#9 American Express Platinum** (American Express) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: statement credit (43 -> 41)
  - https://www.americanexpress.com/us/credit-cards/card/platinum/
- **#11 Amex Blue Cash Everyday** (American Express) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: statement credit (7 -> 8), cash back (32 -> 33)
  - https://www.americanexpress.com/us/credit-cards/card/blue-cash-everyday/
- **#19 Wells Fargo Active Cash** (Wells Fargo) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (5 -> 6), cash back (14 -> 12), bonus (9 -> 8)
  - https://creditcards.wellsfargo.com/active-cash-credit-card/
- **#27 United Explorer Card** (Chase / United Airlines) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (12 -> 10), statement credit (41 -> 32), points (2 -> 1), miles (88 -> 69), cash back (5 -> 3), global entry (7 -> 5), tsa precheck (8 -> 6), foreign transaction (8 -> 3)
  - https://creditcards.chase.com/travel-credit-cards/united/united-explorer
- **#33 Delta SkyMiles Reserve American Express** (American Express / Delta) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: miles (49 -> 52), lounge (5 -> 14), foreign transaction (1 -> 2)
  - https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-reserve-american-express-card/
- **#36 Marriott Bonvoy Boundless** (Chase / Marriott Bonvoy) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (12 -> 13), points (62 -> 66), miles (0 -> 1), bonus (24 -> 15), authorized user (7 -> 8)
  - https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/boundless
- **#37 World of Hyatt Credit Card** (Chase / Hyatt) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (8 -> 10), cash back (3 -> 5), foreign transaction (4 -> 8)
  - https://creditcards.chase.com/travel-credit-cards/world-of-hyatt-credit-card
- **#38 IHG One Rewards Premier** (Chase / IHG) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (11 -> 9), statement credit (20 -> 14), points (83 -> 78), cash back (5 -> 3), bonus (25 -> 23), global entry (10 -> 6), tsa precheck (11 -> 7), foreign transaction (8 -> 4)
  - https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/premier
- **#47 Chase Ink Business Preferred** (Chase) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (6 -> 8), statement credit (0 -> 1), points (31 -> 43), cash back (3 -> 8), foreign transaction (4 -> 9)
  - https://creditcards.chase.com/business-credit-cards/ink/business-preferred
- **#48 Chase Ink Business Cash** (Chase) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (10 -> 8), statement credit (1 -> 0), points (16 -> 14), cash back (42 -> 37), foreign transaction (5 -> 3)
  - https://creditcards.chase.com/business-credit-cards/ink/cash
- **#51 United Gateway Card** (Chase / United Airlines) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (12 -> 14), statement credit (4 -> 6), miles (64 -> 85), cash back (3 -> 5), foreign transaction (4 -> 9)
  - https://creditcards.chase.com/travel-credit-cards/united/united-gateway
- **#55 IHG One Rewards Credit Card** (Chase / IHG) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (10 -> 8), points (74 -> 72), cash back (5 -> 3), foreign transaction (8 -> 4)
  - https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/one-rewards
- **#64 Hawaiian Airlines World Elite Mastercard** (Barclays / Hawaiian Airlines) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: points (18 -> 17), miles (7 -> 6), lounge (2 -> 3), global entry (0 -> 1)
  - https://yourmileagemayvary.com/2026/10/01/hawaiian-airlines-card-atmos-rewards/
- **#66 Aeroplan Card** (Chase / Air Canada) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (10 -> 11), points (66 -> 86), bonus (13 -> 30), authorized user (6 -> 7)
  - https://creditcards.chase.com/travel-credit-cards/aircanada/aeroplan
- **#83 CIBC Aventura Visa Infinite** (CIBC) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: points (83 -> 82)
  - https://www.cibc.com/en/personal-banking/credit-cards/all-credit-cards/aventura-visa-infinite-card.html
- **#91 Chase Freedom Rise** (Chase) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (8 -> 6), statement credit (6 -> 4), points (18 -> 16), cash back (36 -> 26), foreign transaction (5 -> 3)
  - https://creditcards.chase.com/cash-back-credit-cards/freedom/rise
- **#93 Chase Ink Business Premier** (Chase) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (7 -> 9), statement credit (0 -> 1), points (14 -> 16), cash back (39 -> 44), foreign transaction (3 -> 5)
  - https://creditcards.chase.com/business-credit-cards/ink/premier
- **#94 United Business Card** (Chase / United Airlines) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (12 -> 10), statement credit (42 -> 30), points (6 -> 5), miles (82 -> 62), cash back (5 -> 3), bonus (27 -> 25), foreign transaction (8 -> 3)
  - https://creditcards.chase.com/business-credit-cards/united/united-business-card
- **#95 World of Hyatt Business Credit Card** (Chase / Hyatt) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: points (56 -> 54), bonus (54 -> 52), authorized user (5 -> 6)
  - https://creditcards.chase.com/business-credit-cards/world-of-hyatt/hyatt-business-card
- **#97 Southwest Rapid Rewards Premier Business** (Chase / Southwest Airlines) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (7 -> 9), points (31 -> 33), cash back (3 -> 5), foreign transaction (4 -> 9)
  - https://creditcards.chase.com/business-credit-cards/southwest/premier-business
- **#98 Capital One VentureOne Rewards** (Capital One) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: points (2 -> 0), cash back (3 -> 2)
  - https://www.capitalone.com/credit-cards/ventureone/
- **#108 Wells Fargo Autograph Journey** (Wells Fargo) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (10 -> 6), points (51 -> 52), cash back (3 -> 4), bonus (18 -> 11), foreign transaction (1 -> 6)
  - https://creditcards.wellsfargo.com/autograph-journey-visa-credit-card/
- **#122 Hawaiian Airlines Business Mastercard** (Barclays / Hawaiian Airlines) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: points (18 -> 19), bonus (8 -> 10)
  - https://frequentmiler.com/hawaiian-airlines-cards-issued-by-barclays-still-available-for-now/
- **#131 Wells Fargo Signify Business Cash** (Wells Fargo) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (11 -> 15), bonus (4 -> 6)
  - https://creditcards.wellsfargo.com/business-credit-cards/signify-business-cash-credit-card/
- **#133 Wells Fargo One Key+ Card** (Wells Fargo) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (21 -> 41), statement credit (2 -> 4), points (68 -> 79), cash back (2 -> 1), bonus (44 -> 36)
  - https://creditcards.wellsfargo.com/
- **#150 American Express Graphite Business Cash Unlimited** (American Express) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: cash back (42 -> 38), foreign transaction (3 -> 6)
  - https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/graphite-business-cash-unlimited-card/
- **#154 Delta SkyMiles Reserve Business American Express** (American Express / Delta) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (6 -> 10), statement credit (0 -> 13), miles (0 -> 60), welcome offer (0 -> 2), lounge (3 -> 28), global entry (0 -> 4), tsa precheck (0 -> 5), foreign transaction (0 -> 1)
  - https://www.americanexpress.com/en-us/business/credit-cards/delta-skymiles-reserve/
- **#158 IHG One Rewards Business Credit Card** (Chase / IHG) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (12 -> 10), statement credit (31 -> 22), points (85 -> 79), miles (3 -> 2), cash back (5 -> 3), global entry (10 -> 6), tsa precheck (11 -> 7), foreign transaction (9 -> 4)
  - https://creditcards.chase.com/business-credit-cards/IHG/business
- **#159 United Club Business Card** (Chase / United) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (11 -> 13), statement credit (30 -> 42), points (6 -> 7), miles (69 -> 88), cash back (3 -> 5), lounge (5 -> 6), foreign transaction (3 -> 8), authorized user (21 -> 22)
  - https://creditcards.chase.com/business-credit-cards/united/united-club-business
- **#173 Standard Chartered Cathay Mastercard** (Standard Chartered Hong Kong / Cathay) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: miles (152 -> 150), bonus (18 -> 17)
  - https://www.sc.com/hk/credit-cards/cathay/
- **#176 Citi Cash Back Card (Hong Kong)** (Citi Hong Kong) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: points (1 -> 7), miles (1 -> 2), cash back (14 -> 9), lounge (0 -> 3)
  - https://www1.citibank.com.hk/english/credit-cards/cash-back-card
- **#179 OCBC 365 Credit Card** (OCBC Singapore) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: miles (1 -> 0)
  - https://www.ocbc.com/personal-banking/cards/365-cashback-credit-card
- **#183 IHG One Rewards Premier Select Credit Card** (Chase / IHG) — 🟡 Medium
  - Page text changed since 2026-11-09 in terms that affect card rules.
  - changed terms: annual fee (12 -> 10), statement credit (22 -> 14), points (81 -> 76), cash back (5 -> 3), bonus (25 -> 23), global entry (12 -> 6), tsa precheck (13 -> 7), foreign transaction (8 -> 4)
  - https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/premier-select

### Never confirmed against an issuer source (22)

- **#7 Citi Custom Cash** (Citi) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#12 Capital One Venture X** (Capital One) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#17 Discover it Cash Back** (Capital One / Discover) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#45 Bilt Mastercard** (Wells Fargo / Bilt) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#64 Hawaiian Airlines World Elite Mastercard** (Barclays / Hawaiian Airlines) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#65 AAdvantage Aviator Red World Elite** (Barclays / American Airlines) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#67 US Bank Altitude Reserve** (US Bank) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#70 Discover it Student Cash Back** (Capital One / Discover) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#71 Discover it Secured Cash Back** (Capital One / Discover) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#77 Capital One Walmart Rewards (legacy)** (Capital One / Walmart) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#88 American Express Classic Green Card** (American Express) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#109 Wells Fargo Attune** (Wells Fargo) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#112 U.S. Bank Shopper Cash Rewards Visa Signature** (U.S. Bank) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#115 U.S. Bank Business Leverage Visa Signature** (U.S. Bank) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#118 Navy Federal Visa Signature Flagship Rewards** (Navy Federal Credit Union) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#122 Hawaiian Airlines Business Mastercard** (Barclays / Hawaiian Airlines) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#133 Wells Fargo One Key+ Card** (Wells Fargo) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#143 PenFed Pathfinder Rewards Visa Signature** (PenFed Credit Union) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#165 MyLowe's Pro Rewards American Express** (Lowe's / Synchrony) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#166 Capital One Spark 2X Miles** (Capital One) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#167 Capital One Spark 1.5X Miles Select** (Capital One) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#179 OCBC 365 Credit Card** (OCBC Singapore) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.

### Source page not machine-readable (3)

- **#130 Alliant Cashback Visa Signature** (Alliant Credit Union) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://www.alliantcreditunion.org/credit-cards/visa-signature-card
- **#141 PenFed Power Cash Rewards Visa Signature** (PenFed Credit Union) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://www.penfed.org/credit-cards/power-cash-rewards-visa
- **#142 PenFed Platinum Rewards Visa Signature** (PenFed Credit Union) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://www.penfed.org/credit-cards/platinum-rewards-visa

### Past the review budget (36)

- **#19 Wells Fargo Active Cash** (Wells Fargo) — 🟡 Medium
  - Last reviewed 2026-05-17 (183 days ago); review budget is 90 days.
- **#59 Hilton Honors American Express** (American Express / Hilton) — 🟡 Medium
  - Last reviewed 2026-05-17 (183 days ago); review budget is 90 days.
- **#61 Citi / AAdvantage MileUp** (Citi / American Airlines) — 🟡 Medium
  - Last reviewed 2026-05-19 (181 days ago); review budget is 90 days.
- **#76 Target Circle Credit Card** (TD Bank / Target) — 🟡 Medium
  - Last reviewed 2026-05-17 (183 days ago); review budget is 90 days.
- **#82 BMO eclipse Visa Infinite** (BMO) — 🟡 Medium
  - Last reviewed 2026-05-17 (183 days ago); review budget is 90 days.
- **#92 Chase Slate Credit Card** (Chase) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#101 Citi Simplicity Card** (Citi) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#102 Citi Diamond Preferred Card** (Citi) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#117 Navy Federal More Rewards American Express** (Navy Federal Credit Union) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#127 SoFi Unlimited 2% Credit Card** (SoFi) — 🟡 Medium
  - Last reviewed 2026-05-19 (181 days ago); review budget is 90 days.
- **#128 SoFi Everyday Cash Rewards Credit Card** (SoFi) — 🟡 Medium
  - Last reviewed 2026-05-19 (181 days ago); review budget is 90 days.
- **#129 Venmo Visa Signature Credit Card** (Venmo / Synchrony) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#130 Alliant Cashback Visa Signature** (Alliant Credit Union) — 🟡 Medium
  - Last reviewed 2026-05-19 (181 days ago); review budget is 90 days.
- **#131 Wells Fargo Signify Business Cash** (Wells Fargo) — 🟡 Medium
  - Last reviewed 2026-05-19 (181 days ago); review budget is 90 days.
- **#139 FNBO Evergreen Rewards Visa** (FNBO) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#140 FNBO Getaway** (FNBO) — 🟡 Medium
  - Last reviewed 2026-05-19 (181 days ago); review budget is 90 days.
- **#141 PenFed Power Cash Rewards Visa Signature** (PenFed Credit Union) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#142 PenFed Platinum Rewards Visa Signature** (PenFed Credit Union) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#145 TD Clear Visa Platinum** (TD Bank) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#149 Bread Cashback American Express** (Bread Financial / Comenity Capital Bank) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#151 American Express Business Green Rewards** (American Express) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#157 Capital One Spark 1% Classic** (Capital One) — 🟡 Medium
  - Last reviewed 2026-05-18 (182 days ago); review budget is 90 days.
- **#161 Bank of America Business Advantage Unlimited Cash Rewards** (Bank of America) — 🟡 Medium
  - Last reviewed 2026-05-19 (181 days ago); review budget is 90 days.
- **#169 BECU Cash Back Visa** (BECU) — 🟡 Medium
  - Last reviewed 2026-05-19 (181 days ago); review budget is 90 days.
- **#170 BECU Low Rate Visa** (BECU) — 🟡 Medium
  - Last reviewed 2026-05-19 (181 days ago); review budget is 90 days.
- **#7 Citi Custom Cash** (Citi) — ⚪ Low
  - Last reviewed 2026-08-06 (102 days ago); review budget is 90 days.
- **#65 AAdvantage Aviator Red World Elite** (Barclays / American Airlines) — ⚪ Low
  - Last reviewed 2026-08-06 (102 days ago); review budget is 90 days.
- **#77 Capital One Walmart Rewards (legacy)** (Capital One / Walmart) — ⚪ Low
  - Last reviewed 2026-08-06 (102 days ago); review budget is 90 days.
- **#89 American Express Blue Business Cash** (American Express) — ⚪ Low
  - Last reviewed 2026-05-21 (179 days ago); review budget is 90 days.
- **#90 American Express Blue Business Plus** (American Express) — ⚪ Low
  - Last reviewed 2026-05-21 (179 days ago); review budget is 90 days.
- **#107 Bank of America Customized Cash Rewards Secured** (Bank of America) — ⚪ Low
  - Last reviewed 2026-08-07 (101 days ago); review budget is 90 days.
- **#109 Wells Fargo Attune** (Wells Fargo) — ⚪ Low
  - Last reviewed 2026-08-06 (102 days ago); review budget is 90 days.
- **#112 U.S. Bank Shopper Cash Rewards Visa Signature** (U.S. Bank) — ⚪ Low
  - Last reviewed 2026-08-06 (102 days ago); review budget is 90 days.
- **#136 Verizon Visa Card** (Verizon / Synchrony) — ⚪ Low
  - Last reviewed 2026-05-21 (179 days ago); review budget is 90 days.
- **#166 Capital One Spark 2X Miles** (Capital One) — ⚪ Low
  - Last reviewed 2026-08-06 (102 days ago); review budget is 90 days.
- **#167 Capital One Spark 1.5X Miles Select** (Capital One) — ⚪ Low
  - Last reviewed 2026-08-06 (102 days ago); review budget is 90 days.
