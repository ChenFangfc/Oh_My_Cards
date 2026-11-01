import type { CardRulesUpdateResult } from "@workspace/api-client-react";
import { PUBLIC_SITE_URL, isDesktopApp } from "@/lib/desktop";
import { t, tn } from "@/lib/i18n";

/**
 * Where installed copies look for newer card rules.
 *
 * The web build sets this at build time to its own origin. The desktop app has
 * no origin of its own to serve rules from, so it reads the public site's feed;
 * without that it would be frozen on the rules it was built with.
 */
export function getRulesManifestUrl(): string | null {
  const configured = import.meta.env.VITE_CARD_RULES_MANIFEST_URL;
  if (configured) return configured;
  if (isDesktopApp()) return `${PUBLIC_SITE_URL}card-rules/manifest.json`;
  return null;
}

function listNames(names: string[], limit = 3): string {
  if (names.length <= limit) return names.join(t(", "));
  return t("{names} and {count} more", {
    names: names.slice(0, limit).join(t(", ")),
    count: names.length - limit,
  });
}

/** One or two sentences for a toast about an applied rules update. */
export function describeRulesUpdate(result: CardRulesUpdateResult): string {
  const changed = result.changes?.changed.length ?? 0;
  const added = result.changes?.added.length ?? 0;
  const parts: string[] = [];

  if (result.walletCardsChanged?.length) {
    parts.push(t("Your {cards} changed.", { cards: listNames(result.walletCardsChanged) }));
  }
  if (changed || added) {
    const pieces = [
      changed ? tn(changed, "{count} card updated", "{count} cards updated") : null,
      added ? tn(added, "{count} new card", "{count} new cards") : null,
    ].filter(Boolean);
    parts.push(t("Library: {changes}.", { changes: pieces.join(t(", ")) }));
  }

  return (
    parts.join(" ") ||
    result.notes ||
    t("Now using rules {version}.", { version: result.version })
  );
}
