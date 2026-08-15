# Card data freshness report

Generated 2026-08-15T07:24:45.038Z · ruleset `2026.08.07.1`

| Metric | Value |
| --- | --- |
| Cards in catalog | 182 |
| Source pages crawled | 182 |
| Pages reachable (HTTP 200) | 164 |
| Findings | 94 (10 high / 73 medium / 11 low) |
| Median review age | 88 days |
| Oldest review date | 2026-05-17 |

> **10 high-severity findings need a human decision before the next release.**

Extracted values are *signals, not truth*. Issuer pages list other cards'
fees in comparison tables and vary offers by region, so every proposed
change must be confirmed against the issuer page before editing `catalog.ts`.

### Product may be discontinued (1)

- **#7 Citi Custom Cash** (Citi) — 🔴 High
  - Page contains "no longer accepting applications" style language. Confirm and mark the card closed.
  - https://www.citi.com/credit-cards/citi-custom-cash-credit-card

### Annual fee disagrees with issuer page (8)

- **#67 US Bank Altitude Reserve** (US Bank) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `400` · page: `0`
  - https://www.usbank.com/credit-cards.html
- **#112 U.S. Bank Shopper Cash Rewards Visa Signature** (U.S. Bank) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `95` · page: `0`
  - https://www.usbank.com/credit-cards.html
- **#145 TD Clear Visa Platinum** (TD Bank) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `120` · page: `0`
  - https://www.td.com/us/en/personal-banking/credit-cards/prequal-option-1/clear
- **#180 HSBC Revolution Credit Card** (HSBC Singapore) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `0` · page: `2.5`
  - https://www.hsbc.com.sg/credit-cards/products/revolution/
- **#182 Standard Chartered Smart Credit Card** (Standard Chartered Singapore) — 🔴 High
  - The page states a single annual fee and it does not match the catalog.
  - catalog: `99.19` · page: `91`
  - https://www.sc.com/sg/credit-cards/smart-credit-card/
- **#45 Bilt Mastercard** (Wells Fargo / Bilt) — 🟡 Medium
  - Several fee figures on the page, none matching the catalog. Likely a comparison rail — confirm manually.
  - catalog: `0` · page: `95, 495`
  - https://newsroom.biltrewards.com/meetbiltcard2.0
- **#62 Citi / AAdvantage Executive World Legend Mastercard** (Citi / American Airlines) — 🟡 Medium
  - Several fee figures on the page, none matching the catalog. Likely a comparison rail — confirm manually.
  - catalog: `595` · page: `0, 175`
  - https://www.citi.com/credit-cards/citi-aadvantage-executive-world-elite-mastercard
- **#120 Wyndham Rewards Earner Card** (Barclays / Wyndham Rewards) — 🟡 Medium
  - Several fee figures on the page, none matching the catalog. Likely a comparison rail — confirm manually.
  - catalog: `0` · page: `75, 95`
  - https://corporate.wyndhamhotels.com/news-releases/barclays-and-wyndham-cater-to-road-trippers-and-road-warriors-with-new-wyndham-rewards-earner-cards-first-small-business-card/

### Source page unreachable (7)

- **#95 World of Hyatt Business Credit Card** (Chase / Hyatt) — 🔴 High
  - Source page returns HTTP 404. The product was probably renamed or retired.
  - https://creditcards.chase.com/business-credit-cards/world-of-hyatt-business
- **#115 U.S. Bank Business Leverage Visa Signature** (U.S. Bank) — 🔴 High
  - Source page returns HTTP 404. The product was probably renamed or retired.
  - https://www.usbank.com/business-banking/business-credit-cards/business-leverage-visa-signature-card.html
- **#144 TD Cash Credit Card** (TD Bank) — 🔴 High
  - Source page returns HTTP 404. The product was probably renamed or retired.
  - https://www.td.com/us/en/personal-banking/credit-cards/cash
- **#146 TD Cash Secured Credit Card** (TD Bank) — 🔴 High
  - Source page returns HTTP 404. The product was probably renamed or retired.
  - https://www.td.com/us/en/personal-banking/credit-cards/cash-secured
- **#26 PNC Cash Unlimited** (PNC Bank) — 🟡 Medium
  - Request failed after retries: AbortError: This operation was aborted
  - https://www.pnc.com/en/personal-banking/banking/credit-cards/pnc-cash-unlimited-visa-credit-card.html
- **#74 PNC Cash Rewards Visa** (PNC Bank) — 🟡 Medium
  - Request failed after retries: AbortError: This operation was aborted
  - https://www.pnc.com/en/personal-banking/banking/credit-cards/pnc-cash-rewards-visa-credit-card.html
- **#82 BMO eclipse Visa Infinite** (BMO) — 🟡 Medium
  - Request failed after retries: AbortError: This operation was aborted
  - https://www.bmo.com/main/personal/credit-cards/bmo-eclipse-visa-infinite/

### Source page moved (11)

- **#56 American Express Business Gold** (American Express) — 🟡 Medium
  - sourceUrl redirects to https://www.americanexpress.com/en-us/business/shop/error/404/. Update sourceUrl, and check whether the product changed.
  - https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-business-gold-card/
- **#57 American Express Business Platinum** (American Express) — 🟡 Medium
  - sourceUrl redirects to https://www.americanexpress.com/en-us/business/shop/error/404/. Update sourceUrl, and check whether the product changed.
  - https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/business-platinum-charge-card/
- **#71 Discover it Secured** (Discover) — 🟡 Medium
  - sourceUrl redirects to https://www.discover.com/credit-cards/secured-credit-card/. Update sourceUrl, and check whether the product changed.
  - https://www.discover.com/credit-cards/secured/
- **#73 Choice Privileges Select Mastercard** (Wells Fargo / Choice Hotels) — 🟡 Medium
  - sourceUrl redirects to https://www.wellsfargo.com/credit-cards/documents/choice-select-terms/?FPID=0123CBIXP10000&utm_medium=www-redirect&utm_source=credit-cards--choice-select--terms. Update sourceUrl, and check whether the product changed.
  - https://www.wellsfargo.com/credit-cards/choice-select/terms/?FPID=0123CBIXP10000&app_source=WELLS_FARGO_COM
- **#110 Choice Privileges Mastercard** (Wells Fargo / Choice Hotels) — 🟡 Medium
  - sourceUrl redirects to https://www.wellsfargo.com/credit-cards/documents/choice-terms/?utm_medium=www-redirect&utm_source=credit-cards--choice--terms. Update sourceUrl, and check whether the product changed.
  - https://www.wellsfargo.com/credit-cards/choice/terms/
- **#152 Delta SkyMiles Gold Business American Express** (American Express / Delta) — 🟡 Medium
  - sourceUrl redirects to https://www.americanexpress.com/en-us/business/shop/error/404/. Update sourceUrl, and check whether the product changed.
  - https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-gold-business-credit-card-amex/
- **#153 Delta SkyMiles Platinum Business American Express** (American Express / Delta) — 🟡 Medium
  - sourceUrl redirects to https://www.americanexpress.com/en-us/business/shop/error/404/. Update sourceUrl, and check whether the product changed.
  - https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-platinum-business-credit-card-amex/
- **#154 Delta SkyMiles Reserve Business American Express** (American Express / Delta) — 🟡 Medium
  - sourceUrl redirects to https://www.americanexpress.com/en-us/business/shop/error/404/. Update sourceUrl, and check whether the product changed.
  - https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/delta-reserve-business-credit-card-amex/
- **#163 Prime Business Card** (Amazon / U.S. Bank) — 🟡 Medium
  - sourceUrl redirects to https://www.amazon.com/dp/B0DVBL912R. Update sourceUrl, and check whether the product changed.
  - https://www.amazon.com/businesscard
- **#164 Amazon Business Card** (Amazon / U.S. Bank) — 🟡 Medium
  - sourceUrl redirects to https://www.amazon.com/dp/B0DVBL912R. Update sourceUrl, and check whether the product changed.
  - https://www.amazon.com/businesscard
- **#169 BECU Cash Back Visa** (BECU) — 🟡 Medium
  - sourceUrl redirects to https://www.becu.org/everyday-banking/credit-card/cash-back-credit-card. Update sourceUrl, and check whether the product changed.
  - https://www.becu.org/everyday-banking/credit-card/cash-back-visa

### Issuer page changed since last crawl (26)

- **#11 Amex Blue Cash Everyday** (American Express) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (7 -> 6), cash back (30 -> 31)
  - https://www.americanexpress.com/us/credit-cards/card/blue-cash-everyday/
- **#14 Capital One Savor Rewards** (Capital One) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: bonus (6 -> 8)
  - https://www.capitalone.com/credit-cards/savor/
- **#19 Wells Fargo Active Cash** (Wells Fargo) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (6 -> 5), cash back (12 -> 11)
  - https://creditcards.wellsfargo.com/active-cash-credit-card/
- **#20 Wells Fargo Autograph** (Wells Fargo) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (10 -> 14), points (43 -> 37)
  - https://creditcards.wellsfargo.com/autograph-visa-credit-card/
- **#32 Delta SkyMiles Platinum American Express** (American Express / Delta) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (5 -> 6)
  - https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-platinum-american-express-card/
- **#33 Delta SkyMiles Reserve American Express** (American Express / Delta) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (6 -> 7), tsa precheck (4 -> 5), foreign transaction (2 -> 1)
  - https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-reserve-american-express-card/
- **#36 Marriott Bonvoy Boundless** (Chase / Marriott Bonvoy) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (13 -> 12), points (67 -> 59), bonus (25 -> 14)
  - https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/boundless
- **#40 Hilton Honors American Express Surpass** (American Express / Hilton) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (3 -> 5)
  - https://www.americanexpress.com/us/credit-cards/card/hilton-honors-surpass/
- **#41 Hilton Honors American Express Aspire** (American Express / Hilton) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (6 -> 5)
  - https://www.americanexpress.com/us/credit-cards/card/hilton-honors-aspire/
- **#45 Bilt Mastercard** (Wells Fargo / Bilt) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (1 -> 6), statement credit (1 -> 0), points (23 -> 17), bonus (5 -> 3), lounge (1 -> 0), foreign transaction (0 -> 3), authorized user (0 -> 1)
  - https://newsroom.biltrewards.com/meetbiltcard2.0
- **#54 Marriott Bonvoy Bold** (Chase / Marriott) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: points (71 -> 72), bonus (21 -> 22)
  - https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/bold
- **#70 Discover it Student Cash Back** (Discover) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: statement credit (4 -> 3), bonus (3 -> 2)
  - https://www.discover.com/credit-cards/student-credit-card/it-card/
- **#77 Capital One Walmart Rewards (legacy)** (Capital One / Walmart) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: cash back (0 -> 8), bonus (0 -> 4)
  - https://www.capitalone.com/credit-cards/quicksilver/
- **#79 RBC Avion Visa Infinite** (RBC) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: points (86 -> 87), bonus (1 -> 2)
  - https://www.rbcroyalbank.com/credit-cards/travel/rbc-avion-visa-infinite.html
- **#83 CIBC Aventura Visa Infinite** (CIBC) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: points (45 -> 82)
  - https://www.cibc.com/en/personal-banking/credit-cards/all-credit-cards/aventura-visa-infinite-card.html
- **#88 American Express Green Card** (American Express) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: points (1 -> 6), miles (1 -> 2), bonus (0 -> 33), foreign transaction (2 -> 0)
  - https://www.doctorofcredit.com/american-express-removes-green-card-from-website/
- **#108 Wells Fargo Autograph Journey** (Wells Fargo) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (4 -> 10), statement credit (5 -> 6), points (36 -> 51), cash back (4 -> 3), bonus (9 -> 18), foreign transaction (2 -> 1)
  - https://creditcards.wellsfargo.com/autograph-journey-visa-credit-card/
- **#109 Wells Fargo Attune** (Wells Fargo) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (57 -> 66), points (121 -> 124), bonus (68 -> 70)
  - https://creditcards.wellsfargo.com/
- **#121 Wyndham Rewards Earner Business Card** (Barclays / Wyndham Rewards) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: lounge (3 -> 0)
  - https://www.wyndhamrewardscreditcard.com/earner-business-card/
- **#122 Hawaiian Airlines Business Mastercard** (Barclays / Hawaiian Airlines) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: points (0 -> 2), bonus (0 -> 3)
  - https://cards.barclaycardus.com/
- **#148 Citi / AAdvantage Business World Elite Mastercard** (Citi) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (2 -> 5), points (8 -> 11), miles (28 -> 25), cash back (0 -> 1), bonus (9 -> 10), foreign transaction (3 -> 4), authorized user (6 -> 7)
  - https://www.citi.com/credit-cards/citi-aadvantage-business-credit-card
- **#163 Prime Business Card** (Amazon / U.S. Bank) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (3 -> 0), statement credit (4 -> 0), points (2 -> 0), cash back (1 -> 0), welcome offer (1 -> 0), foreign transaction (3 -> 0)
  - https://www.amazon.com/businesscard
- **#164 Amazon Business Card** (Amazon / U.S. Bank) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: annual fee (3 -> 0), statement credit (4 -> 0), points (2 -> 0), cash back (1 -> 0), welcome offer (1 -> 0), foreign transaction (3 -> 0)
  - https://www.amazon.com/businesscard
- **#169 BECU Cash Back Visa** (BECU) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: cash back (57 -> 61)
  - https://www.becu.org/everyday-banking/credit-card/cash-back-visa
- **#173 Standard Chartered Cathay Mastercard** (Standard Chartered Hong Kong / Cathay) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: miles (138 -> 141)
  - https://www.sc.com/hk/credit-cards/cathay/?intcid=cardcategory_Jul21-hk-cxam_en
- **#176 Citi Cash Back Card (Hong Kong)** (Citi Hong Kong) — 🟡 Medium
  - Page text changed since 2026-08-06 in terms that affect card rules.
  - changed terms: cash back (14 -> 13)
  - https://www.citibank.com.hk/english/credit-cards/cash-back-card

### Never confirmed against an issuer source (30)

- **#7 Citi Custom Cash** (Citi) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#17 Discover it Cash Back** (Capital One / Discover) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#18 Discover it Miles** (Capital One / Discover) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#45 Bilt Mastercard** (Wells Fargo / Bilt) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#56 American Express Business Gold** (American Express) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#64 Hawaiian Airlines World Elite Mastercard** (Barclays / Hawaiian Airlines) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#65 AAdvantage Aviator Red World Elite** (Barclays / American Airlines) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#67 US Bank Altitude Reserve** (US Bank) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#70 Discover it Student Cash Back** (Discover) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#77 Capital One Walmart Rewards (legacy)** (Capital One / Walmart) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#88 American Express Green Card** (American Express) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#95 World of Hyatt Business Credit Card** (Chase / Hyatt) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#109 Wells Fargo Attune** (Wells Fargo) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#112 U.S. Bank Shopper Cash Rewards Visa Signature** (U.S. Bank) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#122 Hawaiian Airlines Business Mastercard** (Barclays / Hawaiian Airlines) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#160 Bank of America Business Advantage Customized Cash Rewards** (Bank of America) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#166 Capital One Spark 2X Miles** (Capital One) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#167 Capital One Spark 1.5X Miles Select** (Capital One) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#171 HSBC Red Credit Card** (HSBC Hong Kong) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#172 HSBC Visa Signature Card** (HSBC Hong Kong) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#173 Standard Chartered Cathay Mastercard** (Standard Chartered Hong Kong / Cathay) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#174 Hang Seng MMPOWER World Mastercard** (Hang Seng Bank) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#175 DBS Black World Mastercard** (DBS Hong Kong) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#176 Citi Cash Back Card (Hong Kong)** (Citi Hong Kong) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#177 DBS Live Fresh Visa** (DBS Singapore) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#178 UOB One Card** (UOB Singapore) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#179 OCBC 365 Credit Card** (OCBC Singapore) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#180 HSBC Revolution Credit Card** (HSBC Singapore) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#181 Citi Cash Back Card (Singapore)** (Citi Singapore) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.
- **#182 Standard Chartered Smart Credit Card** (Standard Chartered Singapore) — 🟡 Medium
  - dataConfidence is "needs-review" — these rules were never confirmed against an issuer source.

### Source page not machine-readable (11)

- **#38 IHG One Rewards Premier** (Chase / IHG) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://www.ihg.com/onerewards/content/us/en/creditcard
- **#130 Alliant Cashback Visa Signature** (Alliant Credit Union) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://www.alliantcreditunion.org/credit-cards/visa-signature-card
- **#132 Wells Fargo One Key Card** (Wells Fargo) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://newsroom.wf.com/news-releases/news-details/2024/Expedia-Group-Wells-Fargo-and-Mastercard-announce-new-suite-of-One-Key-credit-cards/default.aspx
- **#133 Wells Fargo One Key+ Card** (Wells Fargo) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://newsroom.wf.com/news-releases/news-details/2024/Expedia-Group-Wells-Fargo-and-Mastercard-announce-new-suite-of-One-Key-credit-cards/default.aspx
- **#141 PenFed Power Cash Rewards Visa Signature** (PenFed Credit Union) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://www.penfed.org/credit-cards/power-cash-rewards-visa
- **#142 PenFed Platinum Rewards Visa Signature** (PenFed Credit Union) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://www.penfed.org/credit-cards/platinum-rewards-visa
- **#160 Bank of America Business Advantage Customized Cash Rewards** (Bank of America) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://business.bankofamerica.com/en/small-business/credit-cards/business-advantage-customized-cash-rewards-mastercard
- **#161 Bank of America Business Advantage Unlimited Cash Rewards** (Bank of America) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://business.bankofamerica.com/en/credit-cards/business-advantage-unlimited-cash-rewards
- **#162 Bank of America Business Advantage Travel Rewards** (Bank of America) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://business.bankofamerica.com/en/credit-cards/business-advantage-travel-rewards
- **#165 MyLowe's Pro Rewards American Express** (Lowe's / Synchrony) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://www.lowes.com/l/Credit/business-credit-center
- **#168 Atmos Rewards Visa Signature Business** (Bank of America / Alaska Airlines) — ⚪ Low
  - Source page returns HTTP 403; automated checks cannot cover this card.
  - https://business.bankofamerica.com/en/credit-cards/atmos-rewards
