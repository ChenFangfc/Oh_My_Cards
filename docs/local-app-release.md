# Local Mac App Release Notes

Oh My Cards is moving toward a local-first desktop app:

- User wallet data, transactions, billing settings, and benefit usage stay on the user's Mac.
- Public credit card catalog/rules can be updated from a remote static JSON package.
- The app itself can be distributed as a direct-download macOS DMG with Tauri updater support.

## Build Requirements

Tauri v2 requires Rust. Install Rust before building the DMG:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Then build the app:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm --filter @workspace/card-organizer run desktop:build
```

The DMG is created under:

```text
artifacts/card-organizer/src-tauri/target/release/bundle/dmg/
```

## Updater Signing

Tauri updater artifacts must be signed. Generate a signing key once and keep the private key out of git:

```sh
corepack pnpm --filter @workspace/card-organizer exec tauri signer generate -w ~/.tauri/oh-my-card.key
```

Put the generated public key into:

```text
artifacts/card-organizer/src-tauri/tauri.conf.json
```

Replace:

```text
REPLACE_WITH_TAURI_UPDATER_PUBLIC_KEY
```

When building release artifacts, set the private key:

```sh
export TAURI_SIGNING_PRIVATE_KEY="$HOME/.tauri/oh-my-card.key"
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
corepack pnpm --filter @workspace/card-organizer run desktop:build
```

Publish these files to your download/update host:

- DMG for first-time installs
- macOS `.app.tar.gz` updater bundle
- `.app.tar.gz.sig` signature
- `latest.json` updater manifest

Example static updater manifest:

```json
{
  "version": "0.1.1",
  "pub_date": "2026-05-17T00:00:00Z",
  "url": "https://updates.ohmycard.app/Oh%20My%20Card_0.1.1_universal.app.tar.gz",
  "signature": "PASTE_SIG_FILE_CONTENT_HERE",
  "notes": "Updated card rule handling and improved local data reliability."
}
```

## Direct Distribution Caveat

You can host the DMG on your own website instead of using the Mac App Store. For a smooth mainstream install experience, macOS expects Developer ID signing and notarization. Without an Apple Developer account, users may see Gatekeeper warnings and may need to manually approve opening the app.

## Public Card Rule Updates

The app can fetch a public rules manifest without uploading private data. Set this at build time:

```sh
VITE_CARD_RULES_MANIFEST_URL=https://updates.ohmycard.app/card-rules/latest.json \
corepack pnpm --filter @workspace/card-organizer run desktop:build
```

Rule manifest:

```json
{
  "version": "2026.06.01",
  "publishedAt": "2026-06-01T00:00:00Z",
  "notes": "Refreshed Chase, Amex, Citi, and Capital One public reward rules.",
  "url": "https://updates.ohmycard.app/card-rules/card-rules-2026.06.01.json"
}
```

Rules payload:

```json
{
  "version": "2026.06.01",
  "cards": []
}
```

The `cards` array uses the same shape as the generated `CreditCard` type.
