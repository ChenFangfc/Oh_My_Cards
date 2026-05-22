import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  checkForCardRulesUpdate,
  getGetBestCardForCategoryQueryKey,
  getGetDashboardSummaryQueryKey,
  getGetSpendingStatsQueryKey,
  getListCardsQueryKey,
  getListWalletQueryKey,
} from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_RULES_MANIFEST_URL = "";

export function CardRulesUpdater() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const manifestUrl =
      import.meta.env.VITE_CARD_RULES_MANIFEST_URL ?? DEFAULT_RULES_MANIFEST_URL;

    if (!manifestUrl) return;

    let cancelled = false;

    async function updateRules() {
      try {
        const result = await checkForCardRulesUpdate(manifestUrl);
        if (cancelled || !result.updated) return;

        await Promise.all([
          queryClient.invalidateQueries({ queryKey: getListCardsQueryKey() }),
          queryClient.invalidateQueries({ queryKey: getListWalletQueryKey() }),
          queryClient.invalidateQueries({
            queryKey: getGetDashboardSummaryQueryKey(),
          }),
          queryClient.invalidateQueries({
            queryKey: getGetBestCardForCategoryQueryKey(),
          }),
          queryClient.invalidateQueries({ queryKey: getGetSpendingStatsQueryKey() }),
        ]);

        toast({
          title: "Card rules updated",
          description: result.notes ?? `Updated to rules version ${result.version}.`,
        });
      } catch {
        // Rule updates are opportunistic. The built-in catalog remains usable.
      }
    }

    void updateRules();

    return () => {
      cancelled = true;
    };
  }, [queryClient, toast]);

  return null;
}
