import { cn } from "@/lib/utils";

export type ProgressTone = "success" | "warning" | "error";

/** Design.md §10.15: success > 50%, warning 20–50%, error < 20%. */
export function fundTone(percent: number): ProgressTone {
  if (percent > 50) return "success";
  if (percent >= 20) return "warning";
  return "error";
}

const fills: Record<ProgressTone, string> = {
  success: "bg-success-strong",
  warning: "bg-marigold-500",
  error: "bg-error",
};

export function Progress({
  value,
  tone,
  label,
  className,
}: {
  value: number;
  tone?: ProgressTone;
  label: string;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const resolved = tone ?? fundTone(clamped);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-gray-100",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500 ease-out-soft",
          fills[resolved],
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
