import { z } from "zod";

/**
 * Auth validation schemas using Zod.
 * Used with TanStack Form for type-safe form validation.
 *
 * Usage with TanStack Form:
 *   import { loginSchema, type LoginSchema } from "@/validations/auth.validation";
 */

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  otp: z.string().length(6, "Verification code must be exactly 6 digits"),
});

export const resendOtpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  purpose: z.enum(["REGISTRATION", "FORGOT_PASSWORD"]).default("REGISTRATION"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;
export type ResendOtpSchema = z.infer<typeof resendOtpSchema>;
