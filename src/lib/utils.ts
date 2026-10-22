import { type ClassValue, clsx } from "clsx";
import { format, isValid } from "date-fns";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names safely.
 * Resolves conflicts (e.g. p-2 vs p-4) using tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string or Date object into a human-readable string.
 * Returns "—" for null/undefined/invalid dates.
 *
 * @param date - A date string, Date object, null, or undefined
 * @param pattern - date-fns format pattern (default: "MMM dd, yyyy hh:mm a")
 */
export function formatDate(
  date: string | Date | null | undefined,
  pattern: string = "MMM dd, yyyy hh:mm a",
): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!isValid(d)) return "—";
  return format(d, pattern);
}

/**
 * Truncates a string to a maximum length and appends "..." if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Generates a random string ID. Not cryptographically secure.
 * Use only for UI keys or non-sensitive identifiers.
 */
export function generateId(length = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}
