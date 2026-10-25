"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const WIDTH = 320;
const GAP = 8;
const MARGIN = 12;

interface Position {
  top: number;
  left: number;
}

/**
 * Floating card anchored to an element (Design.md §2.2 quick-entry popover).
 * Flips above when there is no room below, closes on Esc / outside press,
 * traps Tab and returns focus to the anchor.
 */
export function Popover({
  open,
  anchor,
  onClose,
  label,
  children,
  className,
}: {
  open: boolean;
  anchor: HTMLElement | null;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Position | null>(null);

  const place = useCallback(() => {
    const panel = ref.current;
    if (!anchor || !panel) return;
    const rect = anchor.getBoundingClientRect();
    const height = panel.offsetHeight;
    const width = Math.min(WIDTH, window.innerWidth - MARGIN * 2);
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - width / 2, MARGIN),
      window.innerWidth - width - MARGIN,
    );
    let top = rect.bottom + GAP;
    if (top + height > window.innerHeight - MARGIN) {
      top = Math.max(rect.top - height - GAP, MARGIN);
    }
    setPos({ top, left });
  }, [anchor]);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    const panel = ref.current;
    const observer = panel ? new ResizeObserver(place) : null;
    if (panel) observer?.observe(panel);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const returnTo = anchor;
    const panel = ref.current;
    const t = window.setTimeout(() => {
      (
        panel?.querySelector<HTMLElement>("[data-autofocus]") ??
        panel?.querySelector<HTMLElement>("input, button")
      )?.focus({ preventScroll: true });
    }, 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>(
        "button:not(:disabled), input:not(:disabled), [href], [tabindex]:not([tabindex='-1'])",
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panel?.contains(target) || anchor?.contains(target)) return;
      onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      if (returnTo?.isConnected) returnTo.focus({ preventScroll: true });
    };
  }, [open, anchor, onClose]);

  if (!open || !anchor) return null;
  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-label={label}
      style={{
        top: pos?.top ?? 0,
        left: pos?.left ?? 0,
        width: Math.min(WIDTH, window.innerWidth - MARGIN * 2),
      }}
      className={cn(
        "fixed z-50 rounded-2xl border border-line bg-surface shadow-pop",
        !pos && "invisible",
        className,
      )}
    >
      {children}
    </div>,
    document.body,
  );
}
