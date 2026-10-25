"use client";

import { CircleAlert, CircleCheck, X } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

/** Minimal live-region toast (Design.md §10.12). Sits above the mobile bottom nav. */
export function Toast({
  message,
  tone = "error",
  action,
  onDismiss,
  autoDismissMs,
}: {
  message: string;
  tone?: "error" | "success";
  action?: ReactNode;
  onDismiss: () => void;
  autoDismissMs?: number;
}) {
  useEffect(() => {
    if (!autoDismissMs) return;
    const t = window.setTimeout(onDismiss, autoDismissMs);
    return () => window.clearTimeout(t);
  }, [autoDismissMs, onDismiss]);

  const error = tone === "error";
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-60 flex justify-center px-4 lg:bottom-6">
      <div
        role={error ? "alert" : "status"}
        className={cn(
          "pointer-events-auto flex max-w-md items-center gap-3 rounded-xl border bg-surface py-2.5 pr-2 pl-3 shadow-pop",
          error ? "border-error/30" : "border-success/30",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "[&_svg]:size-5",
            error ? "text-error" : "text-success",
          )}
        >
          {error ? <CircleAlert /> : <CircleCheck />}
        </span>
        <p className="text-body-sm font-medium text-ink">{message}</p>
        {action}
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-aubergine-500 [&_svg]:size-4"
        >
          <X />
        </button>
      </div>
    </div>
  );
}
