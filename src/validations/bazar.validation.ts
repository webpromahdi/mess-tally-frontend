import { z } from "zod";

/**
 * Client-side mirror of the bazar rules in API.md §29–34.
 * The backend remains the authority; this only prevents avoidable round trips.
 */

const bazarDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a valid date.");

const money = z
  .number()
  .finite("Enter an amount.")
  .positive("Amount must be more than ৳ 0.")
  .max(1_000_000, "That amount looks too large.")
  .refine(
    (value) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-6,
    "Use at most two decimals.",
  );

export const bazarEntrySchema = z.object({
  memberId: z.string().min(1, "Choose who paid."),
  date: bazarDate,
  amount: money,
  title: z
    .string()
    .trim()
    .max(120, "Keep the note under 120 characters.")
    .optional(),
});

export const updateBazarSchema = bazarEntrySchema
  .partial()
  .refine(
    (value) => Object.values(value).some((field) => field !== undefined),
    "Provide at least one field to update.",
  );

/** `POST /bazar/:id/receipt` — JPEG/PNG/WebP, max 5 MB (API.md §33). */
export const RECEIPT_MIME_TYPES: readonly string[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
];
export const RECEIPT_MAX_BYTES = 5 * 1024 * 1024;

export function validateReceipt(file: File): string | null {
  if (!RECEIPT_MIME_TYPES.includes(file.type)) {
    return "Use a JPEG, PNG, or WebP image.";
  }
  if (file.size > RECEIPT_MAX_BYTES) {
    return "Keep the receipt under 5 MB.";
  }
  return null;
}
