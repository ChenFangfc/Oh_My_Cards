# macOS App Release

Oh My Cards ships as a Tauri app packaged in a DMG:

- Wallet data, transactions, billing settings and benefit usage stay in the
  app's own storage on the Mac.
- Card rules are built in, and the app checks the public rules feed
  (`https://chenfangfc.github.io/Oh_My_Cards/card-rules/manifest.json`) on
  launch, every six hours, and when the window comes back into view. Nothing
  about the wallet is sent.
- Issuer links open in the default browser; backups and CSV exports use the
  native save panel.
- A menu bar extra (card icon) opens a small panel for one-line purchase
  logging and what's due soon. It is a second webview (`quick` window in
  `src-tauri/src/lib.rs`, `src/quick/quick-panel.tsx`) over the same storage;
  the two windows tell each other about writes with a `local-data-changed`
  event. Closing the main window hides it (the app stays in the menu bar and
  Dock); quit with ⌘Q or "Quit Oh My Cards" in the icon's right-click menu.
- Settings (gear at the bottom of the sidebar, or ⌘,) holds: appearance,
  language (English / 简体中文 / follow the system), the menu bar icon, the
  global Quick Log shortcut (default ⌃⌥⌘Space, recorded in place;
  `set_quick_shortcut` in `lib.rs`), open at login (`tauri-plugin-autostart`
  LaunchAgent, started with `--launched-at-login` so only the menu bar icon
  appears), automatic updates, and the card rules status.
- Text is translated with `t()` from `src/lib/i18n.ts`, keyed by the English
  (`src/lib/i18n-zh.ts` holds the Chinese). Sentences the reward engine builds
  go through `setUiTextTranslator`, and the engine glosses Chinese purchase
  words ("加油", "外卖", "45块") into what its matchers read. Native menu labels
  follow the language through `set_native_menu_labels`.
- The panel window is transparent so macOS draws its popover material behind
  it, which needs `"macOSPrivateApi": true` (fine for direct distribution, not
  allowed on the Mac App Store).

## Build locally

Requires Rust (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`).

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm exec tsc --build lib/api-client-react/tsconfig.json

# This Mac's architecture only (fastest)
corepack pnpm --dir artifacts/card-organizer desktop:build

# Universal: Apple silicon + Intel
rustup target add aarch64-apple-darwin x86_64-apple-darwin
corepack pnpm --dir artifacts/card-organizer desktop:build:universal
```

Output:

- native: `artifacts/card-organizer/src-tauri/target/release/bundle/dmg/`
- universal: `artifacts/card-organizer/src-tauri/target/universal-apple-darwin/release/bundle/dmg/`

The version comes from `src-tauri/tauri.conf.json` (`"version"`) and is shown
in Settings → Updates. Keep `@tauri-apps/api` / `@tauri-apps/cli` on the same minor
version as the `tauri` crate in `src-tauri/Cargo.lock`, or `tauri build` stops
with a version-mismatch error.

## Release through GitHub

1. Bump `"version"` in `src-tauri/tauri.conf.json`, `src-tauri/Cargo.toml`
   and `package.json`. Installed apps only update to a higher version.
2. Tag and push: `git tag v1.2.0 && git push origin v1.2.0`.
3. `.github/workflows/release-desktop.yml` typechecks, runs the reward-engine
   tests and the catalog linter, builds the universal DMG (plus the signed
   update bundle and `latest.json` when the signing secrets exist), and
   attaches them, with a `.sha256` for the DMG, to the GitHub Release.

The README's "Download for macOS" badge points at the latest release.

## Automatic updates

Installed copies update themselves from GitHub Releases; there is no server.

- On launch (after a few seconds) and every six hours the app asks
  `https://github.com/ChenFangfc/Oh_My_Cards/releases/latest/download/latest.json`
  whether a newer version exists (`check_app_update` / `install_app_update` in
  `lib.rs`, `src/lib/app-update.ts` in the UI).
- With **Install updates automatically** on (the default) the update
  downloads in the background and a small card offers **Restart Now**; with it
  off, the card asks before downloading. Settings → Updates shows the status
  and has **Check for Updates**.
- Every download is verified against the public key in
  `tauri.conf.json` (`plugins.updater.pubkey`). A bundle signed with any other
  key is refused, so a compromised download link cannot push code.
- An update installed this way carries no quarantine flag, so Gatekeeper does
  not ask again.

### One-time setup

The signing key pair was generated with
`tauri signer generate -w ~/.tauri/oh-my-cards-updater.key`:

- `~/.tauri/oh-my-cards-updater.key` — **private key, never commit it**
- `~/.tauri/oh-my-cards-updater.key.pub` — public key (already in `tauri.conf.json`)
- `~/.tauri/oh-my-cards-updater.password` — its password

Back up the private key and password somewhere safe (a password manager).
If they are lost, already-installed copies can never be updated again; users
would have to download a new DMG by hand.

Add two repository secrets (GitHub → Settings → Secrets and variables →
Actions):

| Secret | Value |
| --- | --- |
| `TAURI_SIGNING_PRIVATE_KEY` | the contents of `~/.tauri/oh-my-cards-updater.key` |
| `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | the contents of `~/.tauri/oh-my-cards-updater.password` |

With them in place the release workflow also uploads
`Oh-My-Cards_universal.app.tar.gz`, its `.sig`, and `latest.json`. Without
them it still publishes the DMG, with a warning that installed apps won't be
offered that release. The DMG is always named `Oh-My-Cards.dmg`, so
`releases/latest/download/Oh-My-Cards.dmg` (the README's download link) is
always the newest. If a release already carries that file (published by hand
from a local build), the workflow skips the build.

To build the same artifacts locally:

```sh
cd artifacts/card-organizer
TAURI_SIGNING_PRIVATE_KEY="$(cat ~/.tauri/oh-my-cards-updater.key)" \
TAURI_SIGNING_PRIVATE_KEY_PASSWORD="$(cat ~/.tauri/oh-my-cards-updater.password)" \
PORT=19953 BASE_PATH=/ corepack pnpm exec tauri build \
  --target universal-apple-darwin --bundles app,dmg \
  --config '{"bundle":{"createUpdaterArtifacts":true}}'
```

The release must be published (not a draft or pre-release) for
`releases/latest` to point at it.

## Signing and Gatekeeper

Without an Apple Developer ID, the app is **ad-hoc signed**
(`"signingIdentity": "-"` in `tauri.conf.json`). That is required for it to
run on Apple silicon at all, but Gatekeeper still blocks the first launch of a
downloaded copy. Users approve it once:

- **System Settings → Privacy & Security → Open Anyway** (macOS 15+ no longer
  offers right-click → Open for this), or
- `xattr -dr com.apple.quarantine "/Applications/Oh My Cards.app"`.

To ship a build that opens without a warning, add these repository secrets and
the release workflow signs and notarizes automatically:

| Secret | What it is |
| --- | --- |
| `APPLE_CERTIFICATE` | Base64 of the exported "Developer ID Application" `.p12` |
| `APPLE_CERTIFICATE_PASSWORD` | Password of that `.p12` |
| `APPLE_SIGNING_IDENTITY` | e.g. `Developer ID Application: Your Name (TEAMID)` |
| `APPLE_ID` / `APPLE_PASSWORD` / `APPLE_TEAM_ID` | Apple ID, app-specific password and team, for notarization |

## Card rules feed

`pnpm --dir scripts cards:publish` (run by the Pages deploy) writes
`public/card-rules/manifest.json` and `public/card-rules/<version>.json`:

```json
{
  "version": "2026.11.01.9",
  "schema": 2,
  "url": "./2026.11.01.9.json",
  "notes": "Card rules 2026.11.01.9 (188 cards).",
  "publishedAt": "2026-11-01T05:00:00.000Z",
  "sha256": "…"
}
```

The app only moves forward (an older manifest never downgrades rules), checks
the payload's sha256, refuses a `schema` newer than it understands, refuses a
feed that would drop more than a fifth of the catalog, and records the outcome
and a per-card summary of what changed in Settings → Card Rules. Publishing refuses to
run if `cards:lint` finds a structural error.

Artwork for cards added after a desktop build is loaded from the public site
when the bundled copy is missing (`img-src` allows that one origin).
