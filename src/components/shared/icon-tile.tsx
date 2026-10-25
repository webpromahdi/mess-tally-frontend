import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type IconTileTone =
  | "aubergine"
  | "marigold"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "neutral"
  | "inverse";

const tones: Record<IconTileTone, string> = {
  aubergine: "bg-aubergine-100 text-aubergine-800",
  marigold: "bg-marigold-100 text-marigold-900",
  success: "bg-success-surface text-success",
  error: "bg-error-surface text-error",
  warning: "bg-warning-surface text-warning",
  info: "bg-info-surface text-info",
  neutral: "bg-gray-100 text-gray-700",
  inverse: "bg-white/10 text-marigold-400",
};

const sizes = {
  sm: "size-8 rounded-lg [&_svg]:size-4",
  md: "size-10 rounded-xl [&_svg]:size-5",
  lg: "size-14 rounded-2xl [&_svg]:size-6",
};

/** Soft tinted icon tile for dashboard cards and quick stat blocks. */
export function IconTile({
  children,
  tone = "aubergine",
  size = "md",
  className,
}: {
  children: ReactNode;
  tone?: IconTileTone;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        sizes[size],
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
