# My Wallet Layout and Rule Audit Plan

Updated: 2026-05-20

## Billing Display

- [x] Allow billing summary rows to appear when only one of these exists: credit limit, payment due day, or statement closing day.
- [x] Show credit limit / available credit when only credit limit is set.
- [x] Show next due date countdown when only payment due day is set.
- [x] Keep exact due amount gated on statement closing day + payment due day, because the app needs the closed statement period to know what is actually due.
- [x] Keep billing settings editable by clicking the billing summary row.

## Wallet Card Layout

- [x] Remove the duplicated top earn-rate chip under each card name.
- [x] Delete the footer Billing button because the billing row already opens settings.
- [x] Add an icon to the Transactions link.
- [x] Align each repeated card section across the three-column grid by giving card layout sections stable heights and predictable starts.

## Expanded Card Interaction

- [x] Rework details into a wider half-page horizontal expansion.
- [x] Hide compact Key Benefits and Top Rewards inside expanded mode; show All Benefits and All Rewards instead.
- [x] Keep expanded details scrollable instead of making the card infinitely tall.
- [x] Support multiple expanded cards: if two cards in a row are expanded, show two full expanded cards and let the third flow to the next row.
- [x] For a single expanded card in a row, use a bookmark-stack visual so the non-expanded sibling cards slide/stack into the other half of the row.

## Official Rule Audit

- [ ] Deep-search official pages for every catalog card before marking the catalog fully audited.
- [x] Generate a 182-card source audit index from the current catalog.
- [x] Run a first-pass source availability check over all 182 catalog `sourceUrl` values.
- [x] Write reward metadata for all 182 cards into the catalog.
- [x] Add expanded-card display for reward program notes and official rule caveats.
- [x] Add generic calculation support for category labels containing `up to` / `first $X` monthly, quarterly, or annual spend caps.
- [ ] Populate `rewardType`, `rewardProgram`, `rewardUnitName`, `rewardUnitValueCents`, source URL, and review date per card.
- [ ] Add structured cap/reset metadata for quarterly, monthly/billing-cycle, annual, rotating, activation, custom-category, account-age, and anniversary-year rules.
- [ ] Add expanded-card rule notes only when backed by official issuer terms.
