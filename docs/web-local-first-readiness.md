# Web Local-First Readiness

## Decision

Oh My Cards can run as a normal hosted web app while keeping user wallet data local to the user's browser/device.

The implemented model is:

- App and card-rule catalog ship from the website.
- Wallet cards, transactions, billing settings, and benefit usage stay in browser storage.
- `localStorage` remains the synchronous runtime cache for existing hooks.
- IndexedDB mirrors the same state for a more durable browser-native local store.
- Users can export/import a JSON backup.
- Browsers that support the File System Access API can save/load a local backup file directly.

## Browser Constraint

A hosted website cannot silently scan a default folder on a user's computer or open a local file path without explicit user action. This is a browser security boundary.

The supported privacy-preserving workflow is:

1. Store app data locally in browser storage.
2. Let the user export/import a backup file.
3. In supported browsers, let the user explicitly choose a local backup file with the browser file picker.

## Implemented Files

- `lib/api-client-react/src/local/local-first.ts`
  - IndexedDB mirror initialization.
  - JSON backup serialization.
  - JSON backup import validation.
  - Local storage summary API.
- `artifacts/card-organizer/src/main.tsx`
  - Initializes the local data store before rendering.
  - Registers the service worker in production builds.
- `artifacts/card-organizer/src/pages/data.tsx`
  - Data page for backup export/import and optional local file save/load.
- `artifacts/card-organizer/public/manifest.webmanifest`
  - PWA metadata.
- `artifacts/card-organizer/public/service-worker.js`
  - Basic same-origin app-shell caching.

## Release Notes

For a GitHub Pages release, build with the correct `BASE_PATH` for the repository path so the manifest, icons, service worker, and Vite assets resolve correctly.

The local backup format is versioned as `formatVersion: 1`. Do not change this shape without adding a migration path.
