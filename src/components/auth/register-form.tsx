"use client";

import { useForm } from "@tanstack/react-form";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  registerBaseSchema,
  registerFormSchema,
} from "@/validations/auth-ui.validation";

interface RegisterFormProps {
  className?: string;
  onSuccess?: (registeredEmail: string) => void;
}

/**
 * 3-segment password strength meter with explicit text indicator (WCAG non-color requirement)
 */
function PasswordStrengthMeter({ password = "" }: { password?: string }) {
  const getScore = (val: string): number => {
    if (!val) return 0;
    let s = 0;
    if (val.length >= 8) s += 1;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) s += 1;
    if (/\d/.test(val) || /[^A-Za-z0-9]/.test(val)) s += 1;
    return s;
  };

  const score = getScore(password);

  const getLabel = (s: number) => {
    if (s === 0)
      return { text: "Too short", colorClass: "text-muted-foreground" };
    if (s === 1)
      return { text: "Weak", colorClass: "text-destructive dark:text-error" };
    if (s === 2)
      return {
        text: "Medium",
        colorClass: "text-amber-600 dark:text-brand-accent",
      };
    return {
      text: "Strong",
      colorClass: "text-emerald-600 dark:text-emerald-400",
    };
  };

  const label = getLabel(score);

  return (
    <div className="space-y-1.5 pt-1.5" aria-live="polite">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Password strength:</span>
        <span className={cn("font-semibold", label.colorClass)}>
          {label.text}
        </span>
      </div>

      <div
        className="grid grid-cols-3 gap-1.5 h-1.5 w-full rounded-full overflow-hidden bg-muted"
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={3}
        aria-label={`Password strength is ${label.text}`}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            score >= 1 ? "bg-destructive dark:bg-error" : "bg-transparent",
          )}
        />
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            score >= 2 ? "bg-amber-500 dark:bg-brand-accent" : "bg-transparent",
          )}
        />
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            score >= 3
              ? "bg-emerald-500 dark:bg-emerald-400"
              : "bg-transparent",
          )}
        />
      </div>
    </div>
  );
}

export function RegisterForm({ className, onSuccess }: RegisterFormProps) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      // Validate full schema with password match refinement
      const result = registerFormSchema.safeParse(value);
      if (!result.success) {
        setFormError(
          result.error.errors[0]?.message || "Please fix form errors.",
        );
        return;
      }

      setIsSubmitting(true);
      setFormError(null);

      try {
        // TODO: Connect to backend auth API (POST /api/auth/register per PRD AC 1.2)
        // Simulated latency
        await new Promise((resolve) => setTimeout(resolve, 800));

        onSuccess?.(value.email);
      } catch {
        setFormError("Unable to create account. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={cn("space-y-4", className)}
    >
      {/* Form-level error alert */}
      {formError && (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/25 text-destructive dark:text-error text-sm font-medium animate-in fade-in duration-150"
        >
          <AlertCircle className="size-4 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <p>{formError}</p>
          </div>
          <button
            type="button"
            onClick={() => setFormError(null)}
            className="text-xs opacity-70 hover:opacity-100 underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Full Name */}
      <form.Field
        name="name"
        validators={{
          onBlur: ({ value }) => {
            const res = registerBaseSchema.shape.name.safeParse(value);
            return res.success ? undefined : res.error.errors[0]?.message;
          },
        }}
      >
        {(field) => {
          const hasError = Boolean(field.state.meta.errors.length);
          const errorId = "register-name-error";

          return (
            <div className="space-y-1.5">
              <Label
                htmlFor="register-name"
                className="text-sm font-medium text-foreground"
              >
                Full name
                <span
                  className="text-destructive dark:text-error ml-0.5"
                  aria-hidden="true"
                >
                  *
                </span>
              </Label>
              <Input
                id="register-name"
                autoComplete="name"
                placeholder="Karim Ahmed"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                disabled={isSubmitting}
                className={cn(
                  "transition-colors",
                  hasError &&
                    "border-destructive dark:border-error focus-visible:ring-destructive dark:focus-visible:ring-error",
                )}
              />
              {hasError && (
                <p
                  id={errorId}
                  role="alert"
                  className="text-xs text-destructive dark:text-error flex items-center gap-1.5 mt-1 font-medium animate-in fade-in duration-150"
                >
                  <AlertCircle
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{field.state.meta.errors[0]}</span>
                </p>
              )}
            </div>
          );
        }}
      </form.Field>

      {/* Email Address */}
      <form.Field
        name="email"
        validators={{
          onBlur: ({ value }) => {
            const res = registerBaseSchema.shape.email.safeParse(value);
            return res.success ? undefined : res.error.errors[0]?.message;
          },
        }}
      >
        {(field) => {
          const hasError = Boolean(field.state.meta.errors.length);
          const errorId = "register-email-error";

          return (
            <div className="space-y-1.5">
              <Label
                htmlFor="register-email"
                className="text-sm font-medium text-foreground"
              >
                Email address
                <span
                  className="text-destructive dark:text-error ml-0.5"
                  aria-hidden="true"
                >
                  *
                </span>
              </Label>
              <Input
                id="register-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="karim@example.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                disabled={isSubmitting}
                className={cn(
                  "transition-colors",
                  hasError &&
                    "border-destructive dark:border-error focus-visible:ring-destructive dark:focus-visible:ring-error",
                )}
              />
              {hasError && (
                <p
                  id={errorId}
                  role="alert"
                  className="text-xs text-destructive dark:text-error flex items-center gap-1.5 mt-1 font-medium animate-in fade-in duration-150"
                >
                  <AlertCircle
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{field.state.meta.errors[0]}</span>
                </p>
              )}
            </div>
          );
        }}
      </form.Field>

      {/* Password Field */}
      <form.Field
        name="password"
        validators={{
          onBlur: ({ value }) => {
            const res = registerBaseSchema.shape.password.safeParse(value);
            return res.success ? undefined : res.error.errors[0]?.message;
          },
        }}
      >
        {(field) => {
          const hasError = Boolean(field.state.meta.errors.length);
          const errorId = "register-password-error";

          return (
            <div className="space-y-1.5">
              <Label
                htmlFor="register-password"
                className="text-sm font-medium text-foreground"
              >
                Password
                <span
                  className="text-destructive dark:text-error ml-0.5"
                  aria-hidden="true"
                >
                  *
                </span>
              </Label>
              <div className="relative">
                <Input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? errorId : undefined}
                  disabled={isSubmitting}
                  className={cn(
                    "pr-12 transition-colors",
                    hasError &&
                      "border-destructive dark:border-error focus-visible:ring-destructive dark:focus-visible:ring-error",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  disabled={isSubmitting}
                  className="absolute right-0 top-0 h-full w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:pointer-events-none rounded-r-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Password strength meter */}
              <PasswordStrengthMeter password={field.state.value} />

              {hasError && (
                <p
                  id={errorId}
                  role="alert"
                  className="text-xs text-destructive dark:text-error flex items-center gap-1.5 mt-1 font-medium animate-in fade-in duration-150"
                >
                  <AlertCircle
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{field.state.meta.errors[0]}</span>
                </p>
              )}
            </div>
          );
        }}
      </form.Field>

      {/* Confirm Password Field */}
      <form.Field
        name="confirmPassword"
        validators={{
          onBlur: ({ value }) => {
            const currentPassword = form.getFieldValue("password");
            if (!value) return "Please confirm your password.";
            if (value !== currentPassword) return "Passwords do not match.";
            return undefined;
          },
        }}
      >
        {(field) => {
          const hasError = Boolean(field.state.meta.errors.length);
          const errorId = "register-confirm-password-error";

          return (
            <div className="space-y-1.5">
              <Label
                htmlFor="register-confirm-password"
                className="text-sm font-medium text-foreground"
              >
                Confirm password
                <span
                  className="text-destructive dark:text-error ml-0.5"
                  aria-hidden="true"
                >
                  *
                </span>
              </Label>
              <div className="relative">
                <Input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? errorId : undefined}
                  disabled={isSubmitting}
                  className={cn(
                    "pr-12 transition-colors",
                    hasError &&
                      "border-destructive dark:border-error focus-visible:ring-destructive dark:focus-visible:ring-error",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  aria-pressed={showConfirmPassword}
                  disabled={isSubmitting}
                  className="absolute right-0 top-0 h-full w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:pointer-events-none rounded-r-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              {hasError && (
                <p
                  id={errorId}
                  role="alert"
                  className="text-xs text-destructive dark:text-error flex items-center gap-1.5 mt-1 font-medium animate-in fade-in duration-150"
                >
                  <AlertCircle
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{field.state.meta.errors[0]}</span>
                </p>
              )}
            </div>
          );
        }}
      </form.Field>

      {/* Submit CTA */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 min-h-11 text-base font-semibold shadow-sm mt-3"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" aria-hidden="true" />
            <span>Creating account...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </Button>
    </form>
  );
}
