import { cn } from "@/lib/utils";

/** MessTally mark: rising tally bars with a marigold strike. */
export function LogoMark({
  className,
  inverse,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 28 24"
      aria-hidden
      className={cn("h-6 w-7 shrink-0", className)}
    >
      <title>MessTally Mark</title>
      <g className={inverse ? "fill-white" : "fill-aubergine-800"}>
        <rect x="2" y="12" width="3.5" height="10" rx="1.75" />
        <rect x="8" y="8" width="3.5" height="14" rx="1.75" />
        <rect x="14" y="5" width="3.5" height="17" rx="1.75" />
        <rect x="20" y="2" width="3.5" height="20" rx="1.75" />
      </g>
      <path
        d="M1 19 L27 7"
        strokeWidth="2.75"
        strokeLinecap="round"
        className="stroke-marigold-500"
      />
    </svg>
  );
}

export function Logo({
  className,
  inverse,
  wordmarkClassName,
}: {
  className?: string;
  inverse?: boolean;
  wordmarkClassName?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-label="MessTally"
      role="img"
    >
      <LogoMark inverse={inverse} />
      <span
        aria-hidden
        className={cn(
          "text-h3 font-extrabold tracking-tight",
          inverse ? "text-white" : "text-aubergine-800",
          wordmarkClassName,
        )}
      >
        Mess<span className="text-marigold-500">Tally</span>
      </span>
    </span>
  );
}
