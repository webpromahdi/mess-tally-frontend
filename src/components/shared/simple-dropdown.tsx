"use client";

import {
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface DropdownTriggerProps {
  ref: (el: HTMLButtonElement | null) => void;
  onClick: () => void;
  "aria-haspopup": "menu";
  "aria-expanded": boolean;
  "aria-controls": string;
}

export function SimpleDropdown({
  trigger,
  children,
  align = "start",
  side = "bottom",
  className,
}: {
  trigger: (props: DropdownTriggerProps) => ReactNode;
  children: (close: () => void) => ReactNode;
  align?: "start" | "end";
  side?: "bottom" | "top";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    menuRef.current
      ?.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])')
      ?.focus();
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key === "Tab") {
      setOpen(false);
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([disabled])',
      ) ?? [],
    );
    const idx = items.indexOf(document.activeElement as HTMLElement);
    const next =
      e.key === "ArrowDown"
        ? (idx + 1) % items.length
        : (idx - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <div ref={rootRef} className="relative min-w-0">
      {trigger({
        ref: (el) => {
          triggerRef.current = el;
        },
        onClick: () => setOpen((o) => !o),
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-controls": id,
      })}
      {open && (
        <div
          ref={menuRef}
          id={id}
          role="menu"
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className={cn(
            "absolute z-50 min-w-56 rounded-xl border border-line bg-surface p-1.5 text-ink shadow-pop outline-none",
            side === "bottom" ? "top-full mt-2" : "bottom-full mb-2",
            align === "start" ? "left-0" : "right-0",
            className,
          )}
        >
          {children(close)}
        </div>
      )}
    </div>
  );
}

export function SimpleMenuItem({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex min-h-11 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-left text-body font-medium text-ink outline-none",
        "hover:bg-aubergine-50 focus-visible:bg-aubergine-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-ink-muted",
        className,
      )}
      {...props}
    />
  );
}

export function SimpleMenuLabel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "px-2.5 pt-1.5 pb-1 text-caption font-semibold tracking-wider text-ink-subtle uppercase",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SimpleMenuSeparator() {
  return <hr className="-mx-1.5 my-1.5 h-px border-0 bg-line" />;
}
