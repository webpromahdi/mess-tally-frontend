"use client";

import { Trash2 } from "lucide-react";
import { DrawerSheet } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks";
import { formatDayLong } from "@/lib/dates";
import { formatBDT } from "@/lib/format";
import type { BazarEntry } from "@/lib/types/bazar.types";

/** Confirmation before a bazar entry is removed; shows the effect on the totals. */
export function BazarDeleteConfirm({
  entry,
  payerName,
  newRate,
  onConfirm,
  onClose,
}: {
  entry: BazarEntry | null;
  payerName: string;
  newRate: number;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <DrawerSheet
      open={!!entry}
      onClose={onClose}
      side={desktop ? "center" : "bottom"}
      title="Delete bazar entry"
      hideTitle
      showClose={false}
      className="bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      {entry && (
        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-full bg-error-surface text-error"
            >
              <Trash2 className="size-5" />
            </span>
            <div>
              <h3 className="text-h3 text-ink">Delete this bazar entry?</h3>
              <p className="mt-1 text-body-sm text-ink-muted">
                {payerName} · {formatDayLong(entry.date)} ·{" "}
                <strong className="text-ink tabular-nums">
                  {formatBDT(entry.amount)}
                </strong>
                . The house total and meal rate will drop; the meal rate becomes{" "}
                <strong className="text-ink tabular-nums">
                  {formatBDT(newRate)}
                </strong>
                .
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={onClose}>
              Keep entry
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Delete entry
            </Button>
          </div>
        </div>
      )}
    </DrawerSheet>
  );
}
