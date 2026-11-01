import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  checkForCardRulesUpdate,
  getBuiltinRuleSetVersion,
  getCardRulesStatus,
  getCurrentRuleSetVersion,
  getLocalDataStorageSummary,
  useListCards,
} from "@workspace/api-client-react";
import { BookOpenCheck, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DetailRows, SectionCard } from "@/components/section-card";
import { useToast } from "@/hooks/use-toast";
import { describeRulesUpdate, getRulesManifestUrl } from "@/lib/card-rules";
import { dateFnsLocale, t, tn } from "@/lib/i18n";

function formatWhen(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return formatDistanceToNow(date, { addSuffix: true, locale: dateFnsLocale() });
}

/** Which earn rates the app is using, and a way to check for newer ones. */
export function CardRulesSection() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [rulesStatus, setRulesStatus] = useState(() => getCardRulesStatus());
  const [hasOverride, setHasOverride] = useState(
    () => getLocalDataStorageSummary().hasCatalogOverride,
  );
  const [isChecking, setIsChecking] = useState(false);

  const catalogQuery = useListCards();
  const ruleSetVersion = getCurrentRuleSetVersion();
  const builtinVersion = getBuiltinRuleSetVersion();
  const manifestUrl = getRulesManifestUrl();

  const handleCheck = async () => {
    if (!manifestUrl) return;
    setIsChecking(true);
    try {
      const result = await checkForCardRulesUpdate(manifestUrl);
      if (result.updated) {
        await queryClient.invalidateQueries({ queryKey: ["local"] });
        toast({
          title: t("Card rules updated"),
          description: describeRulesUpdate(result),
        });
      } else {
        toast({
          title: t("Card rules are up to date"),
          description: t("You have the latest rules ({version}).", {
            version: result.version,
          }),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("Couldn't check for rule updates"),
        description:
          error instanceof Error ? error.message : t("Try again when you're online."),
      });
    } finally {
      setIsChecking(false);
      setRulesStatus(getCardRulesStatus());
      setHasOverride(getLocalDataStorageSummary().hasCatalogOverride);
    }
  };

  const catalogCount = catalogQuery.isError ? (
    t("Unavailable")
  ) : catalogQuery.data ? (
    tn(catalogQuery.data.length, "{count} card", "{count} cards", {
      count: catalogQuery.data.length.toLocaleString("en-US"),
    })
  ) : (
    <Skeleton className="h-4 w-20" />
  );

  const lastChecked = formatWhen(rulesStatus.lastCheckedAt);
  const lastUpdate = rulesStatus.lastUpdate;
  const lastUpdateWhen = formatWhen(lastUpdate?.appliedAt);
  const changedCards = lastUpdate?.changes?.changed ?? [];
  const addedCards = lastUpdate?.changes?.added ?? [];

  const rows: Array<{ label: string; value: React.ReactNode }> = [
    {
      label: t("Rules in use"),
      value: `${ruleSetVersion} · ${hasOverride ? t("downloaded") : t("built in")}`,
    },
    ...(hasOverride
      ? [{ label: t("Built into this version"), value: builtinVersion }]
      : []),
    { label: t("Card library"), value: catalogCount },
    ...(manifestUrl
      ? [
          {
            label: t("Last checked"),
            value: lastChecked ? (
              rulesStatus.lastOutcome === "error" ? (
                <span className="text-destructive">
                  {lastChecked} · {t("failed")}
                </span>
              ) : (
                `${lastChecked} · ${
                  rulesStatus.lastOutcome === "updated"
                    ? t("updated")
                    : t("up to date")
                }`
              )
            ) : (
              t("Not yet")
            ),
          },
        ]
      : []),
  ];

  return (
    <SectionCard
      id="card-rules"
      icon={<BookOpenCheck className="h-5 w-5" />}
      iconClassName="bg-secondary text-foreground"
      title={t("Card Rules")}
      description={
        manifestUrl
          ? t(
              "Earn rates, fees and benefits are checked against a public rules feed every few hours. Only the rules are downloaded — nothing about your wallet is sent.",
            )
          : t("Earn rates, fees and benefits update with each release of the app.")
      }
    >
      <DetailRows rows={rows} />
      {manifestUrl ? (
        <Button
          variant="outline"
          className="mt-3 gap-2"
          disabled={isChecking}
          onClick={() => void handleCheck()}
        >
          {isChecking ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          {isChecking ? t("Checking…") : t("Check Card Rules")}
        </Button>
      ) : null}
      {rulesStatus.lastOutcome === "error" && rulesStatus.lastError ? (
        <p className="mt-3 text-sm text-destructive">{rulesStatus.lastError}</p>
      ) : null}
      {lastUpdate && (changedCards.length > 0 || addedCards.length > 0) ? (
        <details className="group mt-4 rounded-2xl border border-card-border bg-card px-4 py-3 text-sm">
          <summary className="cursor-pointer select-none font-medium text-foreground">
            {t("What changed in {version}", { version: lastUpdate.version })}
            {lastUpdateWhen ? (
              <span className="font-normal text-muted-foreground">
                {" "}
                · {lastUpdateWhen}
              </span>
            ) : null}
          </summary>
          <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1 text-muted-foreground">
            {addedCards.map((name) => (
              <li key={`added-${name}`}>
                <span className="font-medium text-foreground">{name}</span>{" "}
                — {t("new in the library")}
              </li>
            ))}
            {changedCards.map((change) => (
              <li key={change.cardId}>
                <span className="font-medium text-foreground">{change.name}</span>{" "}
                — {change.details.join(t("; "))}
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </SectionCard>
  );
}
