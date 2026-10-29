"use client";

import { Lock } from "lucide-react";
import { DrawerSheet } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks";

/** Irreversible-looking guard before a month is closed (it can be reopened). */
export function SummaryCloseMonthConfirm({
  open,
  monthLabel,
  busy,
  onConfirm,
  onClose,
}: {
  open: boolean;
  monthLabel: string;
  busy?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <DrawerSheet
      open={open}
      onClose={onClose}
      side={desktop ? "center" : "bottom"}
      title="Close month"
      hideTitle
      showClose={false}
      className="bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-full bg-marigold-50 text-marigold-700"
          >
            <Lock className="size-5" />
          </span>
          <div>
            <h3 className="text-h3 text-ink">Close {monthLabel}?</h3>
            <p className="mt-1 text-body-sm text-ink-muted">
              Closing writes the final snapshot: meals, bazar, utility bills and
              deposits become read-only, and the settlement stops changing. You
              can reopen the month later.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onClose} disabled={busy}>
            Keep it open
          </Button>
          <Button variant="primary" onClick={onConfirm} disabled={busy}>
            <Lock className="size-4" />
            {busy ? "Closing…" : "Close month"}
          </Button>
        </div>
      </div>
    </DrawerSheet>
  );
}
