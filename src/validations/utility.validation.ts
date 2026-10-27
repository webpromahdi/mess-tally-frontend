import { z } from "zod";

/**
 * Client-side mirror of the utility rules in API.md §35–45.
 * The backend remains the authority; these only prevent avoidable round trips.
 */

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a valid date.");
const monthKey = z
  .string()
  .regex(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format.");

const money = z
  .number()
  .finite("Enter an amount.")
  .positive("Amount must be more than ৳ 0.")
  .max(1_000_000, "That amount looks too large.")
  .refine(
    (value) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-6,
    "Use at most two decimals.",
  );

/** The designed labels — `toUtilityCategory` maps them to the API enum. */
export const utilityCategorySchema = z.enum([
  "Rent",
  "Electricity",
  "Gas",
  "Water",
  "Internet",
  "Cook salary",
  "Garbage / guard",
  "Subscription",
  "Other",
]);

export const utilityBillSchema = z.object({
  month: monthKey,
  category: utilityCategorySchema,
  title: z
    .string()
    .trim()
    .min(1, "Add a short note for this bill.")
    .max(120, "Keep the note under 120 characters."),
  amount: money,
  dueDate: dateOnly,
});

export const updateUtilityBillSchema = utilityBillSchema.omit({ month: true });

export const fundDepositSchema = z.object({
  memberId: z.string().min(1, "Choose who deposited."),
  amount: money,
  date: dateOnly,
  note: z
    .string()
    .trim()
    .max(120, "Keep the note under 120 characters.")
    .nullable(),
});

export const updateFundDepositSchema = fundDepositSchema
  .partial()
  .refine(
    (value) => Object.values(value).some((field) => field !== undefined),
    "Provide at least one field to update.",
  );
