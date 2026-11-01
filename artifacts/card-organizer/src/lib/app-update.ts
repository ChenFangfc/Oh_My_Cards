import { useSyncExternalStore } from "react";
import { invoke } from "@tauri-apps/api/core";
import { isDesktopApp, onDesktopEvent } from "@/lib/desktop";
import { t } from "@/lib/i18n";

/**
 * App updates without a server of our own.
 *
 * Desktop: the Tauri updater reads a static `latest.json` attached to the
 * newest GitHub Release and verifies every download against the public key
 * built into the app. With automatic updates on (the default) a new version
 * downloads quietly and the prompt only asks when to restart; with them off
 * the prompt asks first.
 *
 * Web: the service worker picks up a new deploy; the prompt offers a reload.
 */

export interface AppUpdateInfo {
  version: string;
  currentVersion: string;
  notes?: string | null;
  date?: string | null;
}

export type AppUpdatePhase =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "up-to-date"; checkedAt: number }
  | { kind: "available"; update: AppUpdateInfo }
  | {
      kind: "downloading";
      update: AppUpdateInfo;
      received: number;
      total: number | null;
    }
  | { kind: "ready"; version: string }
  | { kind: "web-ready" }
  | { kind: "error"; message: string };

interface AppUpdateState {
  phase: AppUpdatePhase;
  /** The prompt was closed with "Later" for this version (this session only). */
  dismissedFor: string | null;
}

const AUTO_UPDATE_KEY = "oh-my-card:auto-update:v1";
const CHECK_INTERVAL_MS = 6 * 60 * 60 * 1000;
const FIRST_CHECK_DELAY_MS = 8_000;

let state: AppUpdateState = { phase: { kind: "idle" }, dismissedFor: null };
const listeners = new Set<() => void>();

function setState(next: Partial<AppUpdateState>) {
  state = { ...state, ...next };
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAppUpdate(): AppUpdateState {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

export function isAutoUpdateEnabled(): boolean {
  try {
    return localStorage.getItem(AUTO_UPDATE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setAutoUpdateEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(AUTO_UPDATE_KEY, enabled ? "on" : "off");
  } catch {
    // Applies for this session only.
  }
  // Turning it on while an update waits for a yes: take that as the yes.
  if (enabled && state.phase.kind === "available") void installAppUpdate();
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return t("Unknown error");
}

let checking: Promise<void> | null = null;

/** What the updater says when the release has no latest.json (a 404). */
const NO_RELEASE_FEED = /valid release JSON|release not found/i;

/**
 * Asks GitHub Releases for a newer version. Background checks stay silent
 * when there is nothing new or the Mac is offline; only a manual check
 * reports those.
 */
export function checkForAppUpdate({ manual = false } = {}): Promise<void> {
  if (!isDesktopApp()) return checkForWebUpdate(manual);
  const busy = state.phase.kind;
  if (busy === "downloading" || busy === "ready") return Promise.resolve();
  if (checking) return checking;

  const previous = state.phase;
  if (manual) setState({ phase: { kind: "checking" } });

  checking = (async () => {
    try {
      const update = await invoke<AppUpdateInfo | null>("check_app_update");
      if (!update) {
        setState({ phase: { kind: "up-to-date", checkedAt: Date.now() } });
        return;
      }
      if (manual) setState({ dismissedFor: null });
      if (isAutoUpdateEnabled()) {
        await installAppUpdate(update);
      } else {
        setState({ phase: { kind: "available", update } });
      }
    } catch (error) {
      const message = errorMessage(error);
      if (NO_RELEASE_FEED.test(message)) {
        // The latest release carries no update feed (published before
        // updates were signed): there is nothing newer to install.
        setState({ phase: { kind: "up-to-date", checkedAt: Date.now() } });
        return;
      }
      // A background check that fails (offline, GitHub hiccup) is not news.
      setState({ phase: manual ? { kind: "error", message } : previous });
    } finally {
      checking = null;
    }
  })();
  return checking;
}

let installing: Promise<void> | null = null;

/** Downloads and installs the update; it applies on restart. */
export function installAppUpdate(known?: AppUpdateInfo): Promise<void> {
  if (!isDesktopApp()) return Promise.resolve();
  if (installing) return installing;

  const update =
    known ??
    (state.phase.kind === "available" ? state.phase.update : undefined) ?? {
      version: "",
      currentVersion: __APP_VERSION__,
    };
  setState({ phase: { kind: "downloading", update, received: 0, total: null } });

  const stopProgress = onDesktopEvent<[number, number | null]>(
    "app-update-progress",
    ([received, total]) => {
      if (state.phase.kind !== "downloading") return;
      setState({ phase: { ...state.phase, received, total: total ?? null } });
    },
  );

  installing = (async () => {
    try {
      const version = await invoke<string | null>("install_app_update");
      setState({
        phase: version
          ? { kind: "ready", version }
          : { kind: "up-to-date", checkedAt: Date.now() },
      });
    } catch (error) {
      setState({ phase: { kind: "error", message: errorMessage(error) } });
    } finally {
      stopProgress();
      installing = null;
    }
  })();
  return installing;
}

export async function restartToUpdate(): Promise<void> {
  if (state.phase.kind === "web-ready") {
    window.location.reload();
    return;
  }
  if (isDesktopApp()) await invoke("restart_app");
}

/** "Later": hides the prompt for this version until the next launch. */
export function dismissUpdatePrompt(): void {
  const phase = state.phase;
  const version =
    phase.kind === "available" || phase.kind === "downloading"
      ? phase.update.version
      : phase.kind === "ready"
        ? phase.version
        : phase.kind === "web-ready"
          ? "web"
          : null;
  setState({ dismissedFor: version });
}

/** Called by the service worker glue when a new web deploy has taken over. */
export function markWebUpdateReady(): void {
  setState({ phase: { kind: "web-ready" }, dismissedFor: null });
}

async function checkForWebUpdate(manual: boolean): Promise<void> {
  if (!("serviceWorker" in navigator)) return;
  if (manual) setState({ phase: { kind: "checking" } });
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    await registration?.update();
    if (!manual || state.phase.kind !== "checking") return;
    // A new deploy that is still installing announces itself through
    // markWebUpdateReady once it takes over.
    setState({
      phase:
        registration?.installing || registration?.waiting
          ? { kind: "idle" }
          : { kind: "up-to-date", checkedAt: Date.now() },
    });
  } catch (error) {
    if (manual) setState({ phase: { kind: "error", message: errorMessage(error) } });
  }
}

/** Checks shortly after launch and every six hours. Main window only. */
export function startAppUpdateChecks(): () => void {
  if (!isDesktopApp()) return () => {};
  const first = window.setTimeout(() => void checkForAppUpdate(), FIRST_CHECK_DELAY_MS);
  const interval = window.setInterval(
    () => void checkForAppUpdate(),
    CHECK_INTERVAL_MS,
  );
  return () => {
    window.clearTimeout(first);
    window.clearInterval(interval);
  };
}
