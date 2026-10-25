"use client";

import { Minus, Plus } from "lucide-react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  md: { button: "size-10", input: "h-10 w-12" },
  lg: { button: "size-11", input: "h-11 w-14" },
};

function parse(value: string) {
  const trimmed = value.trim();
  return trimmed === "" ? Number.NaN : Number(trimmed);
}

/**
 * Meal count stepper (Design.md §10.7): [−] 2 [+].
 * The value is a string so typed input such as "-1" can reach validation.
 * Minus is disabled at 0.
 */
export function NumberStepper({
  value,
  onChange,
  label,
  step = 1,
  size = "md",
  invalid,
  disabled,
  describedBy,
  autoFocus,
}: {
  value: string;
  onChange: (next: string) => void;
  label: string;
  step?: number;
  size?: keyof typeof sizes;
  invalid?: boolean;
  disabled?: boolean;
  describedBy?: string;
  autoFocus?: boolean;
}) {
  const [bump, setBump] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const n = parse(value);
  const current = Number.isFinite(n) ? n : 0;
  const s = sizes[size];

  function commit(next: number) {
    onChange(String(Math.max(0, Math.round(next * 2) / 2)));
    setBump(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setBump(false), 160);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      commit(current + step);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      commit(current - step);
    }
  }

  const btn = cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center text-aubergine-800 transition-colors hover:bg-aubergine-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aubergine-500 disabled:pointer-events-none disabled:text-gray-300 [&_svg]:size-4",
    s.button,
  );

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-xl border bg-surface",
        invalid ? "border-error" : "border-line-strong",
        disabled && "opacity-50",
      )}
    >
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        className={btn}
        disabled={disabled || !(current > 0)}
        onClick={() => commit(current - step)}
      >
        <Minus />
      </button>
      <input
        type="text"
        inputMode="decimal"
        autoComplete="off"
        data-autofocus={autoFocus || undefined}
        aria-label={label}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={(e) => e.currentTarget.select()}
        className={cn(
          "border-x border-line bg-transparent text-center text-base font-semibold tabular-nums transition-transform duration-150 outline-none focus-visible:bg-aubergine-50",
          s.input,
          current === 0 && !invalid ? "text-ink-muted" : "text-ink",
          invalid && "text-error",
          bump && "scale-110",
        )}
      />
      <button
        type="button"
        aria-label={`Increase ${label}`}
        className={btn}
        disabled={disabled}
        onClick={() => commit(current + step)}
      >
        <Plus />
      </button>
    </div>
  );
}
