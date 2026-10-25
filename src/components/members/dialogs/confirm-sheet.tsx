"use client";

import type { ReactNode } from "react";
import { DrawerSheet } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks";
import { cn } from "@/lib/utils";

/** One confirmation pattern for approve, reject, remove, leave and regenerate. */
export function ConfirmSheet({
  open,
  tone = "danger",
  icon,
  title,
  children,
  confirmLabel,
  cancelLabel = "Cancel",
  confirmDisabled,
  onConfirm,
  onClose,
}: {
  open: boolean;
  tone?: "danger" | "primary";
  icon: ReactNode;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  confirmDisabled?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <DrawerSheet
      open={open}
      onClose={onClose}
      side={desktop ? "center" : "bottom"}
      title={title}
      hideTitle
      showClose={false}
      className="bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      {open && (
        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-full [&_svg]:size-5",
                tone === "danger"
                  ? "bg-error-surface text-error"
                  : "bg-aubergine-50 text-aubergine-800",
              )}
            >
              {icon}
            </span>
            <div className="min-w-0">
              <h3 className="text-h3 text-ink">{title}</h3>
              <div className="mt-1 flex flex-col gap-2 text-body-sm text-ink-muted">
                {children}
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={onClose}>
              {cancelLabel}
            </Button>
            <Button
              variant={tone === "danger" ? "danger" : "primary"}
              disabled={confirmDisabled}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      )}
    </DrawerSheet>
  );
}
