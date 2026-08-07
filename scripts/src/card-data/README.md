# Card data freshness tooling

Keeps `lib/api-client-react/src/local/catalog.ts` (182 cards) honest over time.

## Why it is not a plain scraper

Card terms are a bad scraping target:

- Issuer product pages are Akamai/Cloudflare fronted and rotate offers by
  region, cookie state and A/B bucket. The same URL returns different fees to
  different visitors.
- Pages list *other* cards' fees in comparison tables, so any "find the annual
  fee" regex has a real false-positive rate.
- The changes that matter most (a credit going from annual to semi-annual, a
  transfer partner ratio, a category being narrowed) are prose, not fields.

A crawler that silently rewrites reward rules from that input will corrupt the
math the whole app rests on. So this pipeline is built as **change detection
feeding a review queue**, not as an extract-and-apply loop. Nothing here writes
`catalog.ts`.

Measured against the real 53 source hosts: **50 return HTTP 200** to a plain
Node fetch, and **22** expose an annual-fee figure in static HTML. That is
plenty for "something moved, go look", and not nearly enough for "apply this".

## The four layers

| Layer | What it catches | Reliability |
| --- | --- | --- |
| Link + availability monitor | 404s, redirects, "no longer accepting applications" | High — HTTP status is unambiguous |
| Content-hash diff | Any change to fee/credit/earn wording since the last crawl | High for *detecting*, zero for *interpreting* |
| Fee extraction | Annual fee that no longer matches the catalog | Medium — needs human confirmation |
| Staleness budget | Cards nobody has looked at in 90+ days | Total — it is arithmetic, not scraping |

The staleness budget is the load-bearing one. Crawls can miss things; a review
deadline cannot. Every card carries `lastReviewedAt`, and anything past the
budget shows up in the report whether or not its page changed.

## Commands

```bash
# Full crawl + report (~5 min for 182 cards, polite 1.5s/host pacing)
pnpm --dir scripts cards:check

# Offline: staleness, confidence, missing images and dead sourceUrls only
pnpm --dir scripts cards:check -- --skip-crawl

# One issuer's cards while iterating
pnpm --dir scripts cards:check -- --only=1,2,3,4 --stale-days=30

# Early warning: newsroom + tracking-blog headlines naming a catalog card
pnpm --dir scripts cards:watch

# How each transaction category resolves against every card's bonus rows
pnpm --dir scripts cards:matching
pnpm --dir scripts cards:matching -- --card=8

# How the cardholder-picked / issuer-assigned bonus rows resolve
pnpm --dir scripts cards:choices

# Apply a reviewed patch file to catalog.ts (see apply-updates.ts for the format)
pnpm --dir scripts cards:apply -- --patch=card-data/patch-2026-08-06.json --dry-run

# Emit the rules feed installed apps can pull
pnpm --dir scripts cards:publish
```

Outputs land in `card-data/`:

- `freshness-report.md` — the human-readable queue
- `freshness-report.json` — the same findings, for an agent to consume
- `snapshots.json` — per-card HTTP status, content hash and watch-term counts;
  the baseline the next crawl diffs against, so it is committed to git
- `newsroom-report.md` — headlines that mention a catalog card alongside change
  language

`snapshots.json` stores per-term *counts* rather than page text on purpose:
full text would mean committing ~4 MB of prose every run, while the counts
carry the same "what moved" signal in ~160 KB total.

`check-freshness` exits non-zero when there is any high-severity finding, so CI
turns red on real problems and stays green on routine churn.

## Automation

`.github/workflows/card-data-freshness.yml` runs on the 1st and 15th of each
month (≈ every two weeks) and on demand. It commits the refreshed snapshot and
opens/updates a single tracking issue with the report body. It never opens a PR
against `catalog.ts` — a human or an agent decides what the findings mean.

To act on a report:

1. Read `card-data/freshness-report.md`, top section first.
2. Confirm each finding against the issuer's own page.
3. Write a patch file naming each change and its source, then
   `cards:apply -- --patch=… --dry-run` to preview and re-run without
   `--dry-run` to write. It bumps `lastReviewedAt` and
   `BUILTIN_RULESET_VERSION` for you, and allocates fresh category/benefit ids
   so stored benefit-usage rows are never re-pointed at a different benefit.
4. Run `pnpm --dir scripts cards:publish` so installed apps pick the rules up
   without a redeploy.

## Bonus rows that name no fixed kind of spend

Some cards do not say what their bonus category *is*. Bank of America's is
picked by the cardholder, Citi Custom Cash's is whichever eligible category you
spent most in, and Discover's is an issuer calendar you have to activate. The
catalog records these on the card as `categoryChoices`, and a patch declares
them by category label:

```json
"choices": [
  {
    "category": "Choice Category first year (then 3%)",
    "mode": "user-selected",
    "picks": 1,
    "resets": "month",
    "options": ["Gas and EV charging stations", "Dining", "Travel"]
  }
]
```

- `user-selected` — the app asks, and stores the answer per wallet card.
- `automatic-top-spend` — the app derives it from logged transactions in the
  period, so it needs no input at all.
- `rotating-calendar` — an issuer calendar; stored like a selection because
  these cards require activation and an unactivated quarter earns nothing extra.

Option labels have to be phrased so `getCategoryTags` can resolve them, because
that is how an option is matched to a purchase. `cards:choices` prints how each
one currently resolves.

Merchant-level choices are **not** modelled: U.S. Bank Shopper Cash Rewards
lets you pick retailers ("Amazon", "Target"), and the app prices spend by
category rather than by merchant, so there is nothing to match those against.

## Higher-signal sources than product pages

Product pages tell you what a card *is*; they do not tell you it *changed*.
These announce changes, usually days before the product page is updated:

| Source | Feed |
| --- | --- |
| Chase newsroom | `https://media.chase.com/news` |
| Amex newsroom | `https://www.americanexpress.com/en-us/newsroom/` |
| Capital One newsroom | `https://www.capitalone.com/about/newsroom/` |
| Discover newsroom | `https://www.discover.com/company/newsroom/` |
| Doctor of Credit | `https://www.doctorofcredit.com/feed/` |
| Frequent Miler | `https://frequentmiler.com/feed/` |

Watching those and grepping for the 182 card names is cheaper and earlier than
crawling 182 pages. `watch-newsroom.ts` does exactly that: it pulls the feeds,
matches headlines against every card name, and only reports a hit when the
headline also carries change language ("annual fee", "refresh", "no longer",
"devalu…"). It is cheap enough to run daily.

`check-freshness.ts` is the safety net; `watch-newsroom.ts` is the early
warning. Neither is sufficient alone.
