const MINUS = "\u2212";
const TAKA = "\u09F3";

const two = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const auto = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
const oneDecimal = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export interface FormatBDTOptions {
  /** Prefix with + or − (U+2212). Zero is never signed. */
  signed?: boolean;
  /** "fixed" = always 2 decimals (default). "compact" = drop .00 for large display numbers. */
  decimals?: "fixed" | "compact";
}

/** Formats an amount as `৳ 14,780.00` (Design.md §5.4, §14.3). */
export function formatBDT(
  value: number,
  { signed = false, decimals = "fixed" }: FormatBDTOptions = {},
) {
  const rounded = Math.round(value * 100) / 100;
  const abs = Math.abs(rounded);
  const body = (
    decimals === "compact" && Number.isInteger(abs) ? auto : two
  ).format(abs);
  if (rounded === 0) return `${TAKA} ${body}`;
  const sign = rounded < 0 ? MINUS : signed ? "+" : "";
  return `${sign}${TAKA} ${body}`;
}

/** Meal counts show up to 1 decimal for half meals. */
export function formatMeals(value: number) {
  return oneDecimal.format(value);
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export const TAKA_SIGN = TAKA;
