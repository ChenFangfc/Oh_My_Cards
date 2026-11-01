import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { formatDistanceToNow } from "date-fns";
import {
  CircleCheck,
  Download,
  ExternalLink,
  Info,
  Laptop,
  Loader2,
  Monitor,
  Moon,
  RefreshCw,
  RotateCw,
  Settings as SettingsIcon,
  SlidersHorizontal,
  Sun,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Segmented,
  SectionCard,
  SettingRow,
  SettingRows,
} from "@/components/section-card";
import { CardRulesSection } from "@/components/settings/card-rules-section";
import { useToast } from "@/hooks/use-toast";
import {
  checkForAppUpdate,
  installAppUpdate,
  isAutoUpdateEnabled,
  restartToUpdate,
  setAutoUpdateEnabled,
  useAppUpdate,
} from "@/lib/app-update";
import {
  DEFAULT_QUICK_SHORTCUT,
  PUBLIC_SITE_URL,
  acceleratorFromEvent,
  acceleratorGlyphs,
  applyStoredQuickShortcut,
  deviceNoun,
  getLaunchAtLogin,
  getQuickShortcut,
  isDesktopApp,
  isMenuBarEnabled,
  pauseQuickShortcut,
  setLaunchAtLogin,
  setMenuBarEnabled,
  setQuickShortcut,
} from "@/lib/desktop";
import {
  LOCALE_OPTIONS,
  dateFnsLocale,
  getLocalePreference,
  setLocalePreference,
  t,
  type LocalePreference,
} from "@/lib/i18n";
import { promptPwaInstall, usePwaInstall } from "@/lib/pwa-install";
import { cn } from "@/lib/utils";

const REPO_URL = "https://github.com/ChenFangfc/Oh_My_Cards";

type ThemeChoice = "light" | "dark" | "system";

function GeneralSection() {
  const { theme, setTheme } = useTheme();
  // next-themes reads storage after mount; until then show System rather than
  // flashing the wrong choice.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const activeTheme = (mounted ? (theme ?? "system") : "system") as ThemeChoice;
  const [language, setLanguage] = useState<LocalePreference>(() =>
    getLocalePreference(),
  );

  return (
    <SectionCard
      icon={<SlidersHorizontal className="h-5 w-5" />}
      iconClassName="bg-primary/20 text-primary"
      title={t("General")}
    >
      <SettingRows>
        <SettingRow label={t("Appearance")} stack>
          <Segmented<ThemeChoice>
            label={t("Appearance")}
            value={activeTheme}
            onChange={setTheme}
            options={[
              { value: "light", label: t("Light"), icon: Sun },
              { value: "dark", label: t("Dark"), icon: Moon },
              { value: "system", label: t("System"), icon: Monitor },
            ]}
          />
        </SettingRow>
        <SettingRow
          label={t("Language")}
          description={t("Card names and issuer terms stay as the issuer publishes them.")}
          stack
        >
          <Select
            value={language}
            onValueChange={(value) => {
              const next = value as LocalePreference;
              setLanguage(next);
              // The whole app re-renders in the new language.
              setLocalePreference(next);
            }}
          >
            <SelectTrigger
              aria-label={t("Language")}
              className="h-9 w-44 rounded-lg border-card-border bg-card"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LOCALE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.value === "system" ? t("System") : option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingRow>
      </SettingRows>
    </SectionCard>
  );
}

function ShortcutRecorder() {
  const { toast } = useToast();
  const [shortcut, setShortcut] = useState<string | null>(() => getQuickShortcut());
  const [recording, setRecording] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const recordingRef = useRef(false);
  recordingRef.current = recording;

  const stopRecording = (restore: boolean) => {
    setRecording(false);
    setHint(null);
    if (restore) void applyStoredQuickShortcut();
  };

  const save = (accelerator: string | null) => {
    setQuickShortcut(accelerator)
      .then(() => setShortcut(accelerator))
      .catch(() =>
        toast({
          variant: "destructive",
          title: t("That shortcut is taken"),
          description: t("Another app already uses it. Try a different combination."),
        }),
      );
  };

  useEffect(() => {
    if (!recording) return;
    const onKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const bare = !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey;
      if (bare && event.key === "Escape") {
        stopRecording(true);
        return;
      }
      const accelerator = acceleratorFromEvent(event);
      if (accelerator === "incomplete") return;
      if (!accelerator) {
        setHint(t("Hold ⌘, ⌥ or ⌃ and press a letter, number or Space."));
        return;
      }
      setRecording(false);
      setHint(null);
      save(accelerator);
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recording]);

  // Leaving the page mid-recording puts the saved shortcut back.
  useEffect(
    () => () => {
      if (recordingRef.current) void applyStoredQuickShortcut();
    },
    [],
  );

  return (
    <div className="flex flex-col items-start gap-1.5 sm:items-end">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label={
            recording
              ? t("Recording shortcut. Press the new combination, or Escape to cancel.")
              : t("Change Quick Log shortcut")
          }
          onClick={() => {
            if (recording) {
              stopRecording(true);
              return;
            }
            setRecording(true);
            void pauseQuickShortcut();
          }}
          onBlur={() => {
            if (recording) stopRecording(true);
          }}
          className={cn(
            "inline-flex h-9 min-w-[9.5rem] items-center justify-center gap-2 rounded-lg border bg-card px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            recording
              ? "border-primary ring-2 ring-primary/30"
              : "border-card-border hover:border-primary/60",
          )}
        >
          {recording ? (
            <span className="text-muted-foreground">{t("Type shortcut…")}</span>
          ) : shortcut ? (
            <KbdGroup>
              {acceleratorGlyphs(shortcut).map((glyph) => (
                <Kbd key={glyph} className="h-6 min-w-6 rounded-md px-1.5 text-[13px]">
                  {glyph}
                </Kbd>
              ))}
            </KbdGroup>
          ) : (
            <span className="text-muted-foreground">{t("Off")}</span>
          )}
        </button>
        {shortcut && !recording ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground"
            aria-label={t("Turn off the shortcut")}
            onClick={() => save(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
        {!shortcut && !recording ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 text-muted-foreground"
            onClick={() => save(DEFAULT_QUICK_SHORTCUT)}
          >
            {t("Use Default")}
          </Button>
        ) : null}
      </div>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function LaunchAtLoginSwitch() {
  const { toast } = useToast();
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    getLaunchAtLogin()
      .then((value) => {
        if (!cancelled) setEnabled(value);
      })
      .catch(() => {
        if (!cancelled) setEnabled(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Switch
      id="launch-at-login"
      checked={Boolean(enabled)}
      disabled={enabled === null}
      onCheckedChange={(checked) => {
        setEnabled(checked);
        setLaunchAtLogin(checked)
          .then(setEnabled)
          .catch((error) => {
            setEnabled(!checked);
            toast({
              variant: "destructive",
              title: t("Couldn't change the login item"),
              description: error instanceof Error ? error.message : String(error),
            });
          });
      }}
    />
  );
}

function MacAppSection() {
  const [menuBarOn, setMenuBarOn] = useState(() => isMenuBarEnabled());

  return (
    <SectionCard
      icon={<Laptop className="h-5 w-5" />}
      iconClassName="bg-secondary text-foreground"
      title={t("Mac App")}
    >
      <SettingRows>
        <SettingRow
          label={t("Show in menu bar")}
          description={t("Log a purchase or see what's due without opening the window.")}
          htmlFor="menu-bar"
        >
          <Switch
            id="menu-bar"
            checked={menuBarOn}
            onCheckedChange={(checked) => {
              setMenuBarOn(checked);
              void setMenuBarEnabled(checked).catch(() => setMenuBarOn(!checked));
            }}
          />
        </SettingRow>
        <SettingRow
          label={t("Quick Log shortcut")}
          description={t("Opens the quick log panel from any app. Click the box, then press the keys.")}
          stack
        >
          <ShortcutRecorder />
        </SettingRow>
        <SettingRow
          label={t("Open at login")}
          description={t("Starts quietly in the menu bar when you log in.")}
          htmlFor="launch-at-login"
        >
          <LaunchAtLoginSwitch />
        </SettingRow>
      </SettingRows>
    </SectionCard>
  );
}

function UpdatesSection() {
  const { phase } = useAppUpdate();
  const [autoUpdate, setAutoUpdate] = useState(() => isAutoUpdateEnabled());
  const desktop = isDesktopApp();

  const status = (() => {
    switch (phase.kind) {
      case "checking":
        return t("Checking for updates…");
      case "up-to-date":
        return t("Up to date · checked {when}", {
          when: formatDistanceToNow(phase.checkedAt, {
            addSuffix: true,
            locale: dateFnsLocale(),
          }),
        });
      case "available":
        return t("Version {version} is available.", { version: phase.update.version });
      case "downloading": {
        const percent =
          phase.total && phase.total > 0
            ? Math.min(100, Math.round((phase.received / phase.total) * 100))
            : null;
        return percent === null
          ? t("Downloading the update…")
          : t("Downloading the update… {percent}%", { percent });
      }
      case "ready":
        return t("Version {version} is installed. Restart to start using it.", {
          version: phase.version,
        });
      case "web-ready":
        return t("A new version is ready. Reload to start using it.");
      case "error":
        return t("Couldn't update: {message}", { message: phase.message });
      default:
        return desktop
          ? t("Checks for new versions a few seconds after launch and every six hours.")
          : t("The web app picks up new versions on its own.");
    }
  })();

  const action = (() => {
    if (phase.kind === "ready" || phase.kind === "web-ready") {
      return (
        <Button className="gap-2" onClick={() => void restartToUpdate()}>
          <RotateCw className="h-4 w-4" />
          {phase.kind === "ready" ? t("Restart Now") : t("Reload")}
        </Button>
      );
    }
    if (phase.kind === "available") {
      return (
        <Button className="gap-2" onClick={() => void installAppUpdate()}>
          <Download className="h-4 w-4" />
          {t("Update Now")}
        </Button>
      );
    }
    const busy = phase.kind === "checking" || phase.kind === "downloading";
    return (
      <Button
        variant="outline"
        className="gap-2"
        disabled={busy}
        onClick={() => void checkForAppUpdate({ manual: true })}
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        {t("Check for Updates")}
      </Button>
    );
  })();

  return (
    <SectionCard
      id="updates"
      icon={<CircleCheck className="h-5 w-5" />}
      iconClassName="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
      title={t("Updates")}
    >
      <SettingRows>
        <SettingRow
          label={t("Oh My Cards {version}", { version: __APP_VERSION__ })}
          description={
            <span
              aria-live="polite"
              className={phase.kind === "error" ? "text-destructive" : undefined}
            >
              {status}
            </span>
          }
          stack
        >
          {action}
        </SettingRow>
        {desktop ? (
          <SettingRow
            label={t("Install updates automatically")}
            description={t(
              "New versions download in the background; you choose when to restart. Updates come from GitHub Releases and are checked against a signing key built into the app.",
            )}
            htmlFor="auto-update"
          >
            <Switch
              id="auto-update"
              checked={autoUpdate}
              onCheckedChange={(checked) => {
                setAutoUpdate(checked);
                setAutoUpdateEnabled(checked);
              }}
            />
          </SettingRow>
        ) : null}
      </SettingRows>
    </SectionCard>
  );
}

function AboutSection() {
  const { toast } = useToast();
  const pwa = usePwaInstall();
  const desktop = isDesktopApp();
  const links = [
    { href: PUBLIC_SITE_URL, label: t("Website") },
    { href: REPO_URL, label: t("Source code") },
    { href: `${REPO_URL}/issues/new`, label: t("Report a problem") },
  ];

  return (
    <SectionCard
      icon={<Info className="h-5 w-5" />}
      iconClassName="bg-secondary text-foreground"
      title={t("About")}
      description={t(
        "Oh My Cards keeps your wallet on {device}. It only downloads card rules and app updates; nothing about your wallet is sent anywhere.",
        { device: deviceNoun() },
      )}
    >
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <Button key={link.href} asChild variant="outline" size="sm" className="gap-1.5">
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </Button>
        ))}
      </div>
      {!desktop ? (
        <SettingRows>
          <SettingRow
            label={t("Install as an app")}
            description={
              pwa.installed
                ? t("Installed. Open it from your Dock, home screen or app list.")
                : t("Opens in its own window and works offline.")
            }
            stack
          >
            <Button
              variant="outline"
              className="gap-2"
              disabled={pwa.installed}
              onClick={async () => {
                const outcome = await promptPwaInstall();
                if (outcome === "unavailable") {
                  toast({
                    title: t("Install from your browser"),
                    description: t(
                      "Use the install icon in the address bar, or Share → Add to Home Screen on iPhone.",
                    ),
                  });
                }
              }}
            >
              <Download className="h-4 w-4" />
              {pwa.installed ? t("Installed") : t("Install App")}
            </Button>
          </SettingRow>
          <SettingRow
            label={t("Mac app")}
            description={t("Adds a menu bar panel for logging purchases in one line.")}
            stack
          >
            <Button asChild variant="outline" className="gap-2">
              <a href={`${REPO_URL}/releases/latest`} target="_blank" rel="noreferrer">
                <Download className="h-4 w-4" />
                {t("Download for macOS")}
              </a>
            </Button>
          </SettingRow>
        </SettingRows>
      ) : null}
    </SectionCard>
  );
}

export default function Settings() {
  // /settings#card-rules (linked from the Data page) lands on that section.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const frame = window.requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ block: "start" }),
    );
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="max-w-3xl space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-balance md:text-[28px]">
          <SettingsIcon aria-hidden="true" className="h-6 w-6 text-foreground" />
          {t("Settings")}
        </h2>
      </div>
      <GeneralSection />
      {isDesktopApp() ? <MacAppSection /> : null}
      <UpdatesSection />
      <CardRulesSection />
      <AboutSection />
    </div>
  );
}
