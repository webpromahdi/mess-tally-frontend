import { z } from "zod";

/**
 * Client-side mirrors of the meal rules in API.md §24–28.
 * The backend remains the authority; these only prevent avoidable round trips.
 */

const mealDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a valid date.");

const mealCount = z
  .number()
  .finite("Enter a number.")
  .nonnegative("Meals can't be negative.")
  .multipleOf(0.5, "Use whole or half meals.");

export const mealEntrySchema = z.object({
  memberId: z.string().min(1, "Pick a member."),
  date: mealDate,
  breakfast: mealCount,
  lunch: mealCount,
  dinner: mealCount,
  guestMeals: mealCount,
});

export const bulkMealsInputSchema = z.object({
  date: mealDate,
  entries: z
    .array(mealEntrySchema.omit({ date: true }))
    .min(1, "Add at least one member to the meal entry.")
    .max(200, "A bulk meal entry can contain at most 200 members.")
    .refine(
      (entries) =>
        new Set(entries.map((entry) => entry.memberId)).size === entries.length,
      { message: "Each member can appear only once in a bulk entry." },
    ),
});
