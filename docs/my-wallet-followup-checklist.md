# My Wallet Follow-up Checklist

## UI Behavior
- [x] Benefits detail closes when clicking outside the floating panel.
- [x] Benefits detail still closes from Hide Details.
- [x] Annual fee progress color transitions naturally from red to amber/yellow to green, and stays green after covered.
- [x] Explain annual fee progress color stops after implementation.
- [x] Per-card Top Rewards shows card-level reward earned for the selected global period.
- [x] Per-card Top Rewards rates use gray emphasis instead of green.
- [x] Earn-rate labels show percentage for cash-back cards and multiplier notation for points/miles cards.
- [x] Per-card Key Benefits shows annual used benefit value for that card.
- [x] Per-card Key Benefits used value uses green emphasis.

## Billing and Payments
- [x] Remove missing-opened-date annual fee reminder from Annual Fee Progress.
- [x] Merge opened date guidance into the billing setup banner.
- [x] Add Payment activity type.
- [x] Billing due and available credit update from purchases minus payments.

## Card Rule Accuracy
- [x] Identify data model gaps for category caps, quarterly/monthly limits, reward units, and issuer-specific special rules.
- [x] Add reward metadata fields per card for reward unit, program, and cash-equivalent valuation.
- [ ] Populate reward metadata fields only after official card-by-card source review.
- [ ] Add cap/reset rule metadata fields per card for generalized rule calculation.
- [x] Verify Bank of America Customized Cash Rewards 3/2/1 cap from official source.
- [x] Implement capped reward calculation support for Bank of America Customized Cash Rewards.
- [ ] Implement generalized capped reward calculation support before claiming all capped cards calculate correctly.
- [ ] Audit remaining cards with caps/rotating categories/activation/custom category rules from official issuer pages.
- [ ] Audit every catalog card against official issuer pages for reward type, earning rules, redemption assumptions, annual fee, and benefits.
