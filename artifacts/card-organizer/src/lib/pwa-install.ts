import { useSyncExternalStore } from "react";

/**
 * The browser's "install this app" offer arrives once, early, as a
 * `beforeinstallprompt` event. It is caught at startup and kept here until
 * Settings asks for it.
 */
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

interface PwaInstallState {
  canPrompt: boolean;
  installed: boolean;
}

let deferred: BeforeInstallPromptEvent | null = null;
let snapshot: PwaInstallState = { canPrompt: false, installed: false };
const listeners = new Set<() => void>();

function update(next: PwaInstallState) {
  snapshot = next;
  for (const listener of listeners) listener();
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

export function capturePwaInstallPrompt(): void {
  if (typeof window === "undefined") return;
  snapshot = { canPrompt: false, installed: isStandalone() };
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferred = event as BeforeInstallPromptEvent;
    update({ ...snapshot, canPrompt: true });
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    update({ canPrompt: false, installed: true });
  });
}

export function usePwaInstall(): PwaInstallState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => snapshot,
    () => snapshot,
  );
}

/** Shows the browser's install dialog when it offered one. */
export async function promptPwaInstall(): Promise<"accepted" | "dismissed" | "unavailable"> {
  if (!deferred) return "unavailable";
  const event = deferred;
  await event.prompt();
  const choice = await event.userChoice;
  deferred = null;
  update({
    canPrompt: false,
    installed: choice.outcome === "accepted" || snapshot.installed,
  });
  return choice.outcome;
}
