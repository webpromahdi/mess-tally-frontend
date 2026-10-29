import { z } from "zod";

export const profileUpdateSchema = z.object({
  bio: z.string().max(500, "Bio must be at most 500 characters."),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^\+?[0-9\s()-]{6,20}$/.test(value),
      "Enter a valid phone number.",
    ),
  address: z.string().max(255, "Address must be at most 255 characters."),
});

export type ProfileUpdateValues = z.infer<typeof profileUpdateSchema>;
