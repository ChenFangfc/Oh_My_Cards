import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  checkForCardRulesUpdate,
  getCardRulesStatus,
} from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { describeRulesUpdate, getRulesManifestUrl } from "@/lib/card-rules";
import { t } from "@/lib/i18n";

/** A desktop app can stay open for weeks; it should not miss a rules release. */
const PERIODIC_CHECK_MS = 6 * 60 * 60 * 1000;
/** Returning to the app or regaining a connection re-checks at most this often. */
const OPPORTUNISTIC_CHECK_MS = 60 * 60 * 1000;

/**
 * Keeps the card rules current in the background: on launch, every few hours,
 * and when the window comes back into view or the network returns.
 */
export function CardRulesUpdater() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const manifestUrl = getRulesManifestUrl();
    if (!manifestUrl) return;

    let cancelled = false;

    const check = async () => {
      try {
        const result = await checkForCardRulesUpdate(manifestUrl);
        if (cancelled || !result.updated) return;

        // Every number on every page derives from the rules.
        await queryClient.invalidateQueries({ queryKey: ["local"] });
        toast({
          title: t("Card rules updated"),
          description: describeRulesUpdate(result),
        });
      } catch {
        // Recorded in the rules status shown in Settings. The rules
        // already installed keep working.
      }
    };

    const checkIfDue = () => {
      if (document.visibilityState !== "visible") return;
      const lastChecked = Date.parse(getCardRulesStatus().lastCheckedAt ?? "");
      if (!Number.isFinite(lastChecked) || Date.now() - lastChecked >= OPPORTUNISTIC_CHECK_MS) {
        void check();
      }
    };

    void check();
    const interval = window.setInterval(() => void check(), PERIODIC_CHECK_MS);
    window.addEventListener("online", checkIfDue);
    document.addEventListener("visibilitychange", checkIfDue);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("online", checkIfDue);
      document.removeEventListener("visibilitychange", checkIfDue);
    };
  }, [queryClient, toast]);

  return null;
}
