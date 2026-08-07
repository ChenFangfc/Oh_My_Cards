<p align="center">
  <img src="artifacts/card-organizer/public/Oh_My_Cards_icon.png" width="96" alt="Oh My Cards app icon" />
</p>

<h1 align="center">Oh My Cards</h1>

<p align="center">
  A private, local-first credit card organizer for rewards, benefits, billing, and smarter card choices.
</p>

<p align="center">
  <a href="https://chenfangfc.github.io/Oh_My_Cards/">
    <img alt="Open app" src="https://img.shields.io/badge/Open%20App-Oh%20My%20Cards-7DDCD6?style=for-the-badge&labelColor=18202A" />
  </a>
</p>

<p align="center">
  <img alt="Local first" src="https://img.shields.io/badge/Data-local--first-7DDCD6?style=flat-square&labelColor=18202A" />
  <img alt="Privacy" src="https://img.shields.io/badge/Privacy-device--only-F4F0E8?style=flat-square&labelColor=18202A" />
  <img alt="PWA" src="https://img.shields.io/badge/PWA-offline--ready-9CCCF2?style=flat-square&labelColor=18202A" />
</p>

<p align="center">
  <a href="https://chenfangfc.github.io/Oh_My_Cards/">
    <img alt="Launch Oh My Cards" src="https://img.shields.io/badge/Launch%20Oh%20My%20Cards-Start%20Organizing-7DDCD6?style=for-the-badge&labelColor=18202A" />
  </a>
</p>

## App Preview

<p align="center">
  <em>Wallet tracking, card library browsing, smart recommendations, and spending activity in one local-first app.</em>
</p>

<table>
  <tr>
    <td width="50%">
      <img src="docs/screenshots/detail001.PNG" alt="Oh My Cards wallet overview screenshot" />
    </td>
    <td width="50%">
      <img src="docs/screenshots/detail002.PNG" alt="Oh My Cards card library screenshot" />
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="docs/screenshots/detail003.PNG" alt="Oh My Cards smart suggest screenshot" />
    </td>
    <td width="50%">
      <img src="docs/screenshots/detail004.PNG" alt="Oh My Cards activity screenshot" />
    </td>
  </tr>
</table>

## What It Does

| Organize                                                                                         | Decide                                                                               | Track                                                                                               |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Build a wallet and browse a card library with images, banks, fees, benefits, and official links. | Get card suggestions for purchases using wallet cards and card-library reward rules. | Log purchases, payments, benefits, due amounts, available credit, rewards, and annual fee progress. |

## Privacy

Oh My Cards stores wallet cards, transactions, billing settings, and benefit usage on the user's device through browser storage such as localStorage and IndexedDB. It does not upload personal wallet data to a cloud database.

Use **Export Data** and **Import Data** when moving between devices or browsers.

## Development

```bash
corepack pnpm install
COREPACK_ENABLE_AUTO_PIN=0 PORT=19957 BASE_PATH=/ corepack pnpm --dir artifacts/card-organizer dev
```

<details>
<summary>More commands</summary>

```bash
# Build locally
COREPACK_ENABLE_AUTO_PIN=0 PORT=19957 BASE_PATH=/ corepack pnpm --dir artifacts/card-organizer build

# Build for GitHub Pages
COREPACK_ENABLE_AUTO_PIN=0 PORT=19957 BASE_PATH=/Oh_My_Cards/ corepack pnpm --dir artifacts/card-organizer build

# Typecheck
COREPACK_ENABLE_AUTO_PIN=0 corepack pnpm run typecheck
```

</details>

## Keeping Card Data Current

Card terms change constantly. `scripts/src/card-data/` crawls every card's
official source page, diffs it against both the catalog and the previous crawl,
and files what it finds for review — it never edits `catalog.ts` on its own.

```bash
# Crawl all 182 source pages and write card-data/freshness-report.md
COREPACK_ENABLE_AUTO_PIN=0 corepack pnpm --dir scripts cards:check

# Headlines that name a catalog card alongside change language
COREPACK_ENABLE_AUTO_PIN=0 corepack pnpm --dir scripts cards:watch
```

`.github/workflows/card-data-freshness.yml` runs both on the 1st and 15th of
each month and keeps a single rolling review issue up to date. See
[scripts/src/card-data/README.md](scripts/src/card-data/README.md) for the
review workflow and why the pipeline stops short of auto-applying changes.

## Contributing

Contributions are welcome, especially card rule corrections, official-source updates, cleaner card images, UI/accessibility improvements, bug reports, and mobile app ideas.
