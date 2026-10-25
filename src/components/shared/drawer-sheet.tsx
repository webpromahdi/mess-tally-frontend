"use client";

import { X } from "lucide-react";
import { type ReactNode, useEffect, useId, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Side = "left" | "right" | "bottom" | "center";

interface PanelClasses {
  base: string;
  closed: string;
}

const panel: Record<Side, PanelClasses> = {
  left: { base: "inset-y-0 left-0 w-drawer", closed: "-translate-x-full" },
  right: {
    base: "inset-y-0 right-0 w-drawer sm:w-100",
    closed: "translate-x-full",
  },
  bottom: {
    base: "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-3xl",
    closed: "translate-y-full",
  },
  center: {
    base: "inset-0 m-auto h-fit max-h-[85dvh] w-[min(92vw,34rem)] rounded-2xl",
    closed: "translate-y-6 opacity-0",
  },
};

/**
 * Off-canvas sheet with backdrop, Esc / backdrop close, body scroll lock and focus return
 * (Design.md §6.5, §10.11; responsive.md §7B).
 */
export function DrawerSheet({
  open,
  onClose,
  side = "left",
  title,
  hideTitle,
  children,
  className,
  showClose = true,
}: {
  open: boolean;
  onClose: () => void;
  side?: Side;
  title: string;
  hideTitle?: boolean;
  children: ReactNode;
  className?: string;
  showClose?: boolean;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const returnTo = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      (
        panelRef.current?.querySelector<HTMLElement>("[data-autofocus]") ??
        panelRef.current?.querySelector<HTMLElement>("button")
      )?.focus({ preventScroll: true });
    }, 60);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      if (returnTo && returnTo !== document.body)
        returnTo.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  const p = panel[side];
  return (
    <div
      className={cn("fixed inset-0 z-50", !open && "pointer-events-none")}
      inert={!open}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-aubergine-950/50 backdrop-blur-xs transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "absolute flex flex-col overflow-hidden shadow-pop transition-[translate,visibility,opacity] duration-300 ease-out-soft",
          p.base,
          open ? "visible translate-0" : cn("invisible", p.closed),
          className,
        )}
      >
        <h2 id={titleId} className={cn("text-h3", hideTitle && "sr-only")}>
          {title}
        </h2>
        {showClose && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-3 right-3 z-10 text-ink-muted"
          >
            <X />
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}
