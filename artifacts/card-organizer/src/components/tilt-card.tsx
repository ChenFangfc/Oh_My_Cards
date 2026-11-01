import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

const MAX_TILT_DEG = 5;

/**
 * A slight 3D tilt toward the pointer, for the one large card in a detail
 * view — never for grid tiles. Mouse and trackpad only, off under reduced
 * motion, and it writes the transform straight to the element so moving the
 * pointer never re-renders React.
 */
export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const canTilt = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element || event.pointerType !== "mouse" || !canTilt()) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.transition = "transform 80ms linear";
    element.style.transform = `perspective(900px) rotateX(${(-y * MAX_TILT_DEG).toFixed(2)}deg) rotateY(${(x * MAX_TILT_DEG).toFixed(2)}deg) scale(1.015)`;
  };

  const handleLeave = () => {
    const element = ref.current;
    if (!element) return;
    element.style.transition = "transform 200ms cubic-bezier(0.23, 1, 0.32, 1)";
    element.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn("[transform-style:preserve-3d]", className)}
    >
      {children}
    </div>
  );
}
