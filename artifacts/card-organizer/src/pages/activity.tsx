import { Activity as ActivityIcon } from "lucide-react";
import Analytics from "@/pages/analytics";
import { t } from "@/lib/i18n";

export default function Activity() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3 md:text-[28px]">
          <ActivityIcon className="h-6 w-6 text-foreground" />
          {t("Activity")}</h2>
      </div>

      <Analytics embedded />
    </div>
  );
}
