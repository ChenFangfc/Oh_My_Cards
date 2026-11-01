/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Rules feed manifest; unset on the web build disables in-app rule updates. */
  readonly VITE_CARD_RULES_MANIFEST_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** App version, injected at build time from src-tauri/tauri.conf.json. */
declare const __APP_VERSION__: string;
