import { cn } from "@/lib/utils";

interface AppIconProps {
  className?: string;
}

export function AppIcon({ className }: AppIconProps) {
  return (
    <img
      // 128px is plenty for a 28px mark on a 3x display; the 1254px master
      // was a 1.3 MB download on every page view.
      src={`${import.meta.env.BASE_URL}app-icon-128.png`}
      alt=""
      aria-hidden="true"
      width={128}
      height={128}
      className={cn("shrink-0 rounded-md object-cover", className)}
    />
  );
}
