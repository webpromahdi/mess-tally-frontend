import { formatBDT } from "@/lib/format";
import { cn } from "@/lib/utils";

export type MoneyTone = "positive" | "negative" | "neutral";

export function moneyTone(value: number): MoneyTone {
  const rounded = Math.round(value * 100) / 100;
  if (rounded > 0) return "positive";
  if (rounded < 0) return "negative";
  return "neutral";
}

const tones: Record<MoneyTone, string> = {
  positive: "bg-money-positive-surface text-money-positive",
  negative: "bg-money-negative-surface text-money-negative",
  neutral: "bg-money-neutral-surface text-money-neutral",
};

const sizes = {
  sm: "px-2 py-0.5 text-amount-sm",
  md: "px-2.5 py-1 text-amount-sm font-semibold",
  lg: "px-3.5 py-1.5 text-amount-md font-semibold",
};

/**
 * Signed balance in a high-contrast pill (Design.md §10.8, §12.5).
 * The +/− sign is always rendered so colour is never the only signal.
 */
export function MoneyPill({
  value,
  size = "md",
  className,
}: {
  value: number;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full whitespace-nowrap tabular-nums",
        sizes[size],
        tones[moneyTone(value)],
        className,
      )}
    >
      {formatBDT(value, { signed: true })}
    </span>
  );
}

export function balanceRole(value: number) {
  const tone = moneyTone(value);
  if (tone === "positive")
    return { tone, label: "Receiver", hint: "Gets money back" };
  if (tone === "negative")
    return { tone, label: "Giver", hint: "Needs to pay" };
  return { tone, label: "Settled", hint: "Nothing owed" };
}
