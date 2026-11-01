import { invoke } from "@tauri-apps/api/core";
import { emit, listen } from "@tauri-apps/api/event";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { t } from "@/lib/i18n";

/**
 * The public site that serves the rules feed and card artwork. The desktop app
 * ships its own copy of both, and only reaches out here for newer rules (and
 * for artwork of cards added after it was built).
 */
export const PUBLIC_SITE_URL = "https://chenfangfc.github.io/Oh_My_Cards/";

/** True inside the Tauri desktop shell, false in a browser or installed PWA. */
export function isDesktopApp(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

export async function openExternal(url: string): Promise<void> {
  if (isDesktopApp()) {
    await invoke("plugin:opener|open_url", { url });
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Sends clicks on links to other sites to the system browser.
 *
 * Inside the desktop window a `target="_blank"` link to an issuer page either
 * did nothing or replaced the app with the issuer's site, with no way back.
 */
export function installExternalLinkHandler(): () => void {
  if (!isDesktopApp()) return () => {};

  const handleClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest("a[href]");
    if (!(anchor instanceof HTMLAnchorElement)) return;

    let url: URL;
    try {
      url = new URL(anchor.href, window.location.href);
    } catch {
      return;
    }
    if (url.origin === window.location.origin) return;
    if (!["http:", "https:", "mailto:", "tel:"].includes(url.protocol)) return;

    event.preventDefault();
    void openExternal(url.toString());
  };

  document.addEventListener("click", handleClick);
  return () => document.removeEventListener("click", handleClick);
}

export interface SaveTextFileOptions {
  suggestedName: string;
  contents: string;
  mimeType: string;
  /** Shown in the file-type menu of the save panel, e.g. "Oh My Cards Backup". */
  description: string;
  /** Without the dot, e.g. ["json"]. */
  extensions: string[];
}

type SaveFilePickerWindow = Window & {
  showSaveFilePicker?: (options?: {
    suggestedName?: string;
    types?: Array<{ description: string; accept: Record<string, string[]> }>;
  }) => Promise<{
    createWritable: () => Promise<{
      write: (data: Blob | string) => Promise<void>;
      close: () => Promise<void>;
    }>;
  }>;
};

function downloadViaAnchor({
  suggestedName,
  contents,
  mimeType,
}: SaveTextFileOptions) {
  const blob = new Blob([contents], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = suggestedName;
  document.body.append(anchor);
  anchor.click();
  // Firefox/Safari start the transfer after the click handler returns, so the
  // object URL has to outlive this tick or the download is cancelled.
  window.setTimeout(() => {
    anchor.remove();
    URL.revokeObjectURL(url);
  }, 60_000);
}

/**
 * Saves text to a file the user picks. Resolves "cancelled" when they back out
 * of the dialog; rejects only on a real failure.
 */
export async function saveTextFile(
  options: SaveTextFileOptions,
): Promise<"saved" | "cancelled"> {
  if (isDesktopApp()) {
    const path = await invoke<string | null>("save_text_file", {
      suggestedName: options.suggestedName,
      contents: options.contents,
      filterName: options.description,
      extensions: options.extensions,
    });
    return path ? "saved" : "cancelled";
  }

  const picker = window as SaveFilePickerWindow;
  if (!picker.showSaveFilePicker) {
    downloadViaAnchor(options);
    return "saved";
  }

  try {
    const handle = await picker.showSaveFilePicker({
      suggestedName: options.suggestedName,
      types: [
        {
          description: options.description,
          accept: {
            [options.mimeType]: options.extensions.map(
              (extension) => `.${extension}`,
            ),
          },
        },
      ],
    });
    const writable = await handle.createWritable();
    await writable.write(
      new Blob([options.contents], { type: options.mimeType }),
    );
    await writable.close();
    return "saved";
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return "cancelled";
    }
    throw error;
  }
}

/** "this Mac" in the desktop app, "this browser" on the web. */
export function deviceNoun(): string {
  return isDesktopApp() ? t("this Mac") : t("this browser");
}

/**
 * Which surface this page is. The desktop app runs two webviews over the same
 * data: the main window and the menu bar panel ("quick"). In a browser the
 * panel can be previewed with ?view=quick.
 */
export type AppView = "main" | "quick";

let cachedView: AppView | null = null;

export function getAppView(): AppView {
  if (cachedView) return cachedView;
  if (isDesktopApp()) {
    try {
      cachedView = getCurrentWebviewWindow().label === "quick" ? "quick" : "main";
    } catch {
      cachedView = "main";
    }
  } else {
    cachedView =
      new URLSearchParams(window.location.search).get("view") === "quick"
        ? "quick"
        : "main";
  }
  return cachedView;
}

/** Subscribes to a desktop event; returns an unsubscribe that is safe to call early. */
export function onDesktopEvent<T>(
  name: string,
  handler: (payload: T) => void,
): () => void {
  if (!isDesktopApp()) return () => {};
  let unlisten: (() => void) | null = null;
  let disposed = false;
  void listen<T>(name, (event) => handler(event.payload)).then((stop) => {
    if (disposed) stop();
    else unlisten = stop;
  });
  return () => {
    disposed = true;
    unlisten?.();
  };
}

const DATA_CHANGED_EVENT = "local-data-changed";

/** Tells the other window that this one just changed the wallet. */
export function announceDataChanged(): void {
  if (!isDesktopApp()) return;
  void emit(DATA_CHANGED_EVENT, { from: getAppView() });
}

/** Runs `handler` when the *other* window changes the wallet. */
export function onDataChangedElsewhere(handler: () => void): () => void {
  const self = getAppView();
  return onDesktopEvent<{ from?: string }>(DATA_CHANGED_EVENT, (payload) => {
    if (payload?.from !== self) handler();
  });
}

/** Opens (or focuses) the main window, optionally at a route like "/activity". */
export async function openMainWindow(path?: string): Promise<void> {
  if (isDesktopApp()) {
    await invoke("open_main_window", { path: path ?? null });
    return;
  }
  window.location.assign(
    `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path ?? "/"}`,
  );
}

export async function hideQuickPanel(): Promise<void> {
  if (isDesktopApp()) await invoke("hide_quick_panel");
}

/** Text beside the menu bar icon (null for none) and its tooltip. */
export async function setMenuBarStatus(
  title: string | null,
  tooltip: string,
): Promise<void> {
  if (!isDesktopApp()) return;
  await invoke("set_menu_bar_status", { title, tooltip });
}

const MENU_BAR_PREFERENCE_KEY = "oh-my-card:menu-bar:v1";

/** Whether the menu bar icon should show; on unless the user turned it off. */
export function isMenuBarEnabled(): boolean {
  try {
    return localStorage.getItem(MENU_BAR_PREFERENCE_KEY) !== "off";
  } catch {
    return true;
  }
}

export async function setMenuBarEnabled(enabled: boolean): Promise<void> {
  try {
    localStorage.setItem(MENU_BAR_PREFERENCE_KEY, enabled ? "on" : "off");
  } catch {
    // The icon still toggles for this session.
  }
  if (isDesktopApp()) await invoke("set_menu_bar_enabled", { enabled });
}

// ---- Quick Log shortcut ------------------------------------------------------

/**
 * ⌃⌥⌘Space by default: ⌥⌘Space is Finder search, ⌃Space and ⌃⌥Space switch
 * input sources (which matters to anyone typing Chinese), and ⇧⌘Space is
 * 1Password's.
 */
export const DEFAULT_QUICK_SHORTCUT = "Control+Alt+Super+Space";
const QUICK_SHORTCUT_KEY = "oh-my-card:quick-shortcut:v1";

export function getQuickShortcut(): string | null {
  try {
    const stored = localStorage.getItem(QUICK_SHORTCUT_KEY);
    if (stored === "off") return null;
    return stored || DEFAULT_QUICK_SHORTCUT;
  } catch {
    return DEFAULT_QUICK_SHORTCUT;
  }
}

/** Registers the shortcut system-wide; rejects (and keeps the old one) if it is taken. */
export async function setQuickShortcut(accelerator: string | null): Promise<void> {
  if (isDesktopApp()) {
    try {
      await invoke("set_quick_shortcut", { shortcut: accelerator });
    } catch (error) {
      await applyStoredQuickShortcut();
      throw error;
    }
  }
  try {
    localStorage.setItem(QUICK_SHORTCUT_KEY, accelerator ?? "off");
  } catch {
    // Registered for this session only.
  }
}

/**
 * Lets go of the shortcut while a new one is being recorded, so pressing the
 * current combination reaches the recorder instead of opening the panel.
 */
export async function pauseQuickShortcut(): Promise<void> {
  if (!isDesktopApp()) return;
  try {
    await invoke("set_quick_shortcut", { shortcut: null });
  } catch {
    // Nothing was registered.
  }
}

/** Re-registers the saved shortcut at launch. A taken shortcut is left off quietly. */
export async function applyStoredQuickShortcut(): Promise<void> {
  if (!isDesktopApp()) return;
  try {
    await invoke("set_quick_shortcut", { shortcut: getQuickShortcut() });
  } catch {
    // Another app holds it; Settings shows how to pick a different one.
  }
}

const MODIFIER_CODES = new Set([
  "ShiftLeft",
  "ShiftRight",
  "ControlLeft",
  "ControlRight",
  "AltLeft",
  "AltRight",
  "MetaLeft",
  "MetaRight",
]);
const SHORTCUT_KEY_CODES =
  /^(?:Key[A-Z]|Digit[0-9]|F(?:[1-9]|1[0-9]|2[0-4])|Space|Comma|Period|Slash|Semicolon|Quote|BracketLeft|BracketRight|Backslash|Minus|Equal|Backquote|Enter|Tab|Arrow(?:Up|Down|Left|Right))$/;

/**
 * Turns a key press into an accelerator ("Control+Alt+Super+Space"), using
 * the physical key so it means the same on every keyboard layout. Returns
 * "incomplete" while only modifiers are held, and null for presses that
 * would hijack ordinary typing (no ⌘, ⌥ or ⌃).
 */
export function acceleratorFromEvent(
  event: KeyboardEvent,
): string | "incomplete" | null {
  if (MODIFIER_CODES.has(event.code)) return "incomplete";
  if (!event.metaKey && !event.ctrlKey && !event.altKey) return null;
  if (!SHORTCUT_KEY_CODES.test(event.code)) return null;
  const parts: string[] = [];
  if (event.ctrlKey) parts.push("Control");
  if (event.altKey) parts.push("Alt");
  if (event.shiftKey) parts.push("Shift");
  if (event.metaKey) parts.push("Super");
  parts.push(event.code);
  return parts.join("+");
}

const KEY_GLYPHS: Record<string, string> = {
  Space: "Space",
  Comma: ",",
  Period: ".",
  Slash: "/",
  Semicolon: ";",
  Quote: "'",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  Minus: "-",
  Equal: "=",
  Backquote: "`",
  Enter: "↩",
  Tab: "⇥",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
};

/** "Control+Alt+Super+Space" → ["⌃", "⌥", "⌘", "Space"], in macOS order. */
export function acceleratorGlyphs(accelerator: string): string[] {
  const parts = accelerator.split("+");
  const key = parts[parts.length - 1];
  const modifiers = new Set(parts.slice(0, -1).map((part) => part.toLowerCase()));
  const glyphs: string[] = [];
  if (modifiers.has("control") || modifiers.has("ctrl")) glyphs.push("⌃");
  if (modifiers.has("alt") || modifiers.has("option")) glyphs.push("⌥");
  if (modifiers.has("shift")) glyphs.push("⇧");
  if (modifiers.has("super") || modifiers.has("cmd") || modifiers.has("command")) glyphs.push("⌘");
  glyphs.push(
    KEY_GLYPHS[key] ??
      key.replace(/^Key/, "").replace(/^Digit/, ""),
  );
  return glyphs;
}

// ---- Open at login -------------------------------------------------------------

export async function getLaunchAtLogin(): Promise<boolean> {
  if (!isDesktopApp()) return false;
  return invoke<boolean>("get_launch_at_login");
}

/** Returns what macOS reports after the change. */
export async function setLaunchAtLogin(enabled: boolean): Promise<boolean> {
  if (!isDesktopApp()) return false;
  return invoke<boolean>("set_launch_at_login", { enabled });
}

/** Native menu labels (tray menu and "Settings…") follow the app language. */
export async function setNativeMenuLabels(labels: {
  open: string;
  quick: string;
  quit: string;
  settings: string;
}): Promise<void> {
  if (!isDesktopApp()) return;
  await invoke("set_native_menu_labels", labels);
}
