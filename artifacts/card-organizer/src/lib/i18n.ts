import { useSyncExternalStore } from "react";
import { zhCN } from "date-fns/locale";
import { ZH_CN } from "@/lib/i18n-zh";

/**
 * UI language. Card names, issuer terms and benefit descriptions come from the
 * card catalog and stay in English; everything the app itself says is
 * translated.
 *
 * Strings are keyed by their English text, so a missing translation falls
 * back to English instead of showing a key. Placeholders look like {name}.
 */
export type Locale = "en" | "zh-CN";
export type LocalePreference = "system" | Locale;

export const LOCALE_OPTIONS: Array<{ value: LocalePreference; label: string }> = [
  { value: "system", label: "System" },
  { value: "en", label: "English" },
  { value: "zh-CN", label: "简体中文" },
];

const STORAGE_KEY = "oh-my-card:locale:v1";

export function getLocalePreference(): LocalePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "zh-CN" || stored === "system") return stored;
  } catch {
    // Fall through to the system language.
  }
  return "system";
}

function resolveLocale(preference: LocalePreference): Locale {
  if (preference !== "system") return preference;
  const languages =
    typeof navigator === "undefined"
      ? []
      : navigator.languages?.length
        ? navigator.languages
        : [navigator.language];
  return languages.some((language) => language?.toLowerCase().startsWith("zh"))
    ? "zh-CN"
    : "en";
}

let current: Locale = resolveLocale(getLocalePreference());
const listeners = new Set<() => void>();

function applyDocumentLanguage(locale: Locale) {
  if (typeof document !== "undefined") document.documentElement.lang = locale;
}
applyDocumentLanguage(current);

export function getLocale(): Locale {
  return current;
}

export function setLocalePreference(preference: LocalePreference): void {
  try {
    localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // Applies for this session only.
  }
  syncLocale();
}

/** Re-reads the stored preference (another window may have changed it). */
export function syncLocale(): void {
  const next = resolveLocale(getLocalePreference());
  if (next === current) return;
  current = next;
  applyDocumentLanguage(next);
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** For caches outside React that hold translated text. */
export function onLocaleChange(listener: () => void): () => void {
  return subscribe(listener);
}

/** Re-renders with the language; the app root keys on it. */
export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getLocale, getLocale);
}

type Vars = Record<string, string | number>;

// Own keys only: text such as a merchant called "toString" must not resolve to
// Object.prototype. (Object.hasOwn is newer than the macOS 11 WebKit.)
const hasOwn = (object: object, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(object, key);

function fill(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    hasOwn(vars, name) ? String(vars[name]) : match,
  );
}

const CJK_GAP = /([\u3400-\u9fff\u3000-\u303f\uff00-\uffef]) +(?=[\u3400-\u9fff\u3000-\u303f\uff00-\uffef])/g;

/** Translates English UI text. */
export function t(text: string, vars?: Vars): string {
  if (current !== "zh-CN") return fill(text, vars);
  // Templates keep a space around each placeholder so English names read
  // right ("United 是…"); between two Chinese characters it goes.
  return fill(hasOwn(ZH_CN, text) ? ZH_CN[text] : text, vars).replace(CJK_GAP, "$1");
}

/** English needs singular and plural; Chinese uses the plural entry for both. */
export function tn(count: number, one: string, other: string, vars?: Vars): string {
  return t(count === 1 ? one : other, { count, ...vars });
}

function intlLocale(): string {
  return current === "zh-CN" ? "zh-CN" : "en-US";
}

/** "Nov 4" / "11月4日" */
export function formatMonthDay(date: Date): string {
  return new Intl.DateTimeFormat(intlLocale(), { month: "short", day: "numeric" }).format(date);
}

/** "Nov 4, 2026" / "2026年11月4日" */
export function formatFullDate(date: Date): string {
  return new Intl.DateTimeFormat(intlLocale(), {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/** "November" / "11月" */
export function formatMonthName(date: Date): string {
  return new Intl.DateTimeFormat(intlLocale(), { month: "long" }).format(date);
}

/** "Nov" / "11月", for chart axes. */
export function formatShortMonth(date: Date, withYear = false): string {
  return new Intl.DateTimeFormat(intlLocale(), {
    month: "short",
    ...(withYear ? { year: "2-digit" } : {}),
  }).format(date);
}

/** For date-fns helpers such as formatDistanceToNow. */
export function dateFnsLocale() {
  return current === "zh-CN" ? zhCN : undefined;
}
