import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** A titled panel with an icon tile, as used on the Data and Settings pages. */
export function SectionCard({
  id,
  icon,
  iconClassName,
  title,
  description,
  children,
}: {
  id?: string;
  icon: ReactNode;
  iconClassName: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card id={id} className="scroll-mt-6 shadow-[var(--app-shadow-soft)]">
      <CardContent className="p-5 md:p-6">
        {/* Phone: icon and title share a row and the content runs full
            width below. Wider: the icon keeps its own column. */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3.5 gap-y-3 sm:items-start sm:gap-x-5 sm:gap-y-1">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl sm:row-span-2 sm:h-11 sm:w-11",
              iconClassName,
            )}
          >
            {icon}
          </div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2">
            {description ? (
              <p className="max-w-xl text-pretty text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            ) : null}
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DetailRows({
  rows,
}: {
  rows: Array<{ label: string; value: ReactNode }>;
}) {
  return (
    <dl className="mt-5 divide-y divide-card-border text-sm">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2"
        >
          <dt className="text-muted-foreground">{row.label}</dt>
          <dd className="min-w-0 break-words text-right font-medium tabular-nums text-foreground">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Rows of label-on-the-left, control-on-the-right settings. */
export function SettingRows({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 divide-y divide-card-border border-t border-card-border [&>*:last-child]:pb-0">
      {children}
    </div>
  );
}

/**
 * One setting. Small controls (switches) stay beside the label at every
 * width; wider ones (`stack`) drop below it on a phone.
 */
export function SettingRow({
  label,
  description,
  htmlFor,
  stack = false,
  children,
}: {
  label: ReactNode;
  description?: ReactNode;
  htmlFor?: string;
  stack?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex gap-x-6 gap-y-3 py-3.5",
        stack
          ? "flex-col sm:flex-row sm:items-center sm:justify-between"
          : "items-center justify-between",
      )}
    >
      <div className="min-w-0">
        {htmlFor ? (
          <label
            htmlFor={htmlFor}
            className="block cursor-pointer text-sm font-medium text-foreground"
          >
            {label}
          </label>
        ) : (
          <div className="text-sm font-medium text-foreground">{label}</div>
        )}
        {description ? (
          <p className="mt-0.5 max-w-md text-pretty text-[13px] leading-5 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">{children}</div>
    </div>
  );
}

/** A compact segmented control, matching the Unused / Used switch on the wallet. */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: Array<{ value: T; label: string; icon?: React.ComponentType<{ className?: string }> }>;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-lg border border-card-border bg-secondary/50 p-1"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "bg-card text-foreground shadow-[var(--app-shadow-soft)]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.icon ? <option.icon className="h-3.5 w-3.5" /> : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
