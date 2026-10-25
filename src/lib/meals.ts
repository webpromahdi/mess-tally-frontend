import type {
  MealEntry,
  MealValidationResult,
  UpsertMealInput,
} from "@/lib/types/meal.types";

/** Soft cap from Design.md §10.7; values above it warn but are not rejected. */
export const SOFT_MAX = 10;

/** F1: breakfast + lunch + dinner + guestMeals. */
export function cellTotal(
  e: Pick<MealEntry, "breakfast" | "lunch" | "dinner" | "guestMeals">,
) {
  return e.breakfast + e.lunch + e.dinner + e.guestMeals;
}

export function entryKey(memberId: string, date: string) {
  return `${memberId}|${date}`;
}

export function indexEntries(entries: MealEntry[]) {
  const map = new Map<string, MealEntry>();
  for (const e of entries) map.set(entryKey(e.memberId, e.date), e);
  return map;
}

export function dayTotal(entries: MealEntry[], date: string) {
  return entries
    .filter((e) => e.date === date)
    .reduce((sum, e) => sum + cellTotal(e), 0);
}

/** Client-side mirror of the validation rules (AC 3.1.3). */
export function validateEntry(
  input: UpsertMealInput,
  range?: { start: string; end: string },
): MealValidationResult {
  const result: MealValidationResult = { errors: [], warnings: [] };
  const fields = ["breakfast", "lunch", "dinner", "guestMeals"] as const;
  for (const field of fields) {
    const value = input[field];
    if (!Number.isFinite(value)) {
      result.errors.push({ field, message: "Enter a number." });
    } else if (value < 0) {
      result.errors.push({ field, message: "Meals can’t be negative." });
    } else if (value * 2 !== Math.round(value * 2)) {
      result.errors.push({ field, message: "Use whole or half meals." });
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    result.errors.push({ field: "date", message: "Pick a valid date." });
  } else if (range && (input.date < range.start || input.date > range.end)) {
    result.errors.push({
      field: "date",
      message: "That date is outside this month.",
    });
  }
  if (result.errors.length === 0 && cellTotal(input) > SOFT_MAX) {
    result.warnings.push({
      message: `That’s more than ${SOFT_MAX} meals in a day. Double-check before saving.`,
    });
  }
  return result;
}

/** Parses a stepper string; blank or junk becomes NaN so validation can flag it. */
export function parseCount(value: string) {
  const trimmed = value.trim();
  return trimmed === "" ? Number.NaN : Number(trimmed);
}
