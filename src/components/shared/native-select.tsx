import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface NativeSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Native select with a custom chevron; preserves OS-native picker behavior on mobile
 * (Design.md §10.12). Reusable across features.
 */
export function NativeSelect({
  className,
  children,
  ...props
}: NativeSelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-11 md:h-10 w-full min-w-0 appearance-none rounded-md border border-input bg-surface px-3 py-2 pr-9 text-base shadow-xs transition-all duration-150 outline-none hover:border-silver-600 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-ink",
          "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-muted"
      />
    </div>
  );
}
