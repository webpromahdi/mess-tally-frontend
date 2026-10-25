import { CircleAlert, Info, Lock, TriangleAlert, UserPlus } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BannerTone = "brand" | "warning" | "error" | "info" | "neutral";

const tones: Record<
  BannerTone,
  {
    wrap: string;
    icon: string;
    Icon: typeof Info;
  }
> = {
  brand: {
    wrap: "border-marigold-200 bg-marigold-50",
    icon: "bg-marigold-500 text-aubergine-950",
    Icon: UserPlus,
  },
  warning: {
    wrap: "border-marigold-300 bg-warning-surface",
    icon: "bg-surface text-warning",
    Icon: TriangleAlert,
  },
  error: {
    wrap: "border-error/20 bg-error-surface",
    icon: "bg-surface text-error",
    Icon: CircleAlert,
  },
  info: {
    wrap: "border-info/15 bg-info-surface",
    icon: "bg-surface text-info",
    Icon: Info,
  },
  neutral: {
    wrap: "border-line-strong bg-surface",
    icon: "bg-gray-100 text-gray-700",
    Icon: Lock,
  },
};

/** Action-queue banner / inline alert matching Figma cards. */
export function Banner({
  tone = "info",
  title,
  description,
  action,
  icon,
  className,
  live = "polite",
}: {
  tone?: BannerTone;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
  live?: "polite" | "assertive";
}) {
  const t = tones[tone];
  return (
    <div
      role={live === "assertive" ? "alert" : "status"}
      className={cn(
        "flex min-w-0 flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:gap-4",
        t.wrap,
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
        <span
          aria-hidden
          className={cn(
            "inline-flex size-10 shrink-0 items-center justify-center rounded-xl [&_svg]:size-5",
            t.icon,
          )}
        >
          {icon ?? <t.Icon />}
        </span>
        <div className="min-w-0">
          <p className="text-h4 text-ink">{title}</p>
          {description && (
            <p className="mt-0.5 text-body-sm text-gray-700">{description}</p>
          )}
        </div>
      </div>
      {action && (
        <div className="flex shrink-0 flex-wrap gap-2 pl-13 sm:ml-auto sm:pl-0">
          {action}
        </div>
      )}
    </div>
  );
}
