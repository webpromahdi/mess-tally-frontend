import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  actions,
  className,
  size = "md",
}: {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center",
        size === "sm" && "gap-2 px-4 py-8",
        size === "md" && "gap-3 px-6 py-12",
        size === "lg" && "gap-4 px-6 py-14 sm:py-20",
        className,
      )}
    >
      {icon}
      <div className="max-w-md">
        <p className={cn("text-ink", size === "lg" ? "text-h2" : "text-h3")}>
          {title}
        </p>
        {description && (
          <p className="mt-1.5 text-body text-ink-muted">{description}</p>
        )}
      </div>
      {actions && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
