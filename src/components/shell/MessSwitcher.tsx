"use client";

import { cn } from "@/lib/utils";
import type { ShellMess } from "./types";

/**
 * Current mess pill in the sidebar (Design.md §11.1).
 *
 * The backend allows one ACTIVE mess per user, so there is nothing to switch
 * between. This is a readout rather than a dropdown until a real switcher
 * exists.
 */
export function MessSwitcher({
  mess,
  collapsed,
}: {
  mess: ShellMess;
  collapsed?: boolean;
}) {
  const initial = mess.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div
      className={cn(
        "flex w-full items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 text-left",
        collapsed ? "size-11 justify-center p-0" : "min-h-12 p-2",
      )}
    >
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-marigold-500 text-label font-bold text-aubergine-950">
        {initial}
      </span>
      {!collapsed && (
        <span className="min-w-0 flex-1">
          <span className="block truncate text-body-sm font-semibold text-white">
            {mess.name}
          </span>
          <span className="block text-caption text-white/60">
            {mess.plan === null
              ? "Plan unavailable"
              : mess.plan === "FREE"
                ? "Free plan"
                : "Pro plan"}
          </span>
        </span>
      )}
    </div>
  );
}
