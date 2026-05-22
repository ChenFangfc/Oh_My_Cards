import { cn } from "@/lib/utils";

interface AppIconProps {
  className?: string;
}

export function AppIcon({ className }: AppIconProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}Oh_My_Cards_icon.png`}
      alt="Oh My Cards"
      className={cn("shrink-0 rounded-md object-cover", className)}
    />
  );
}
