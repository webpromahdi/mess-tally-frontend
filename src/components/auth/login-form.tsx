"use client";

import { useForm } from "@tanstack/react-form";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { loginFormSchema } from "@/validations/auth-ui.validation";

interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

export function LoginForm({ className, onSuccess }: LoginFormProps) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      // Validate full schema client-side
      const result = loginFormSchema.safeParse(value);
      if (!result.success) {
        setFormError("Please fix the validation errors below.");
        return;
      }

      setIsSubmitting(true);
      setFormError(null);

      try {
        // TODO: Connect to backend auth API (POST /api/auth/login per PRD AC 1.1.1 & AC 1.1.2)
        // Simulated submission latency for UI verification
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Form state demonstration: In production, invalid credentials (401) set formError
        // and keep all input values intact (AC 1.1.2)
        onSuccess?.();
      } catch {
        setFormError("Invalid email or password. Please try again.");
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

      {/* Email Field */}
      <form.Field
        name="email"
        validators={{
          onBlur: ({ value }) => {
            const res = loginFormSchema.shape.email.safeParse(value);
            return res.success ? undefined : res.error.errors[0]?.message;
          },
        }}
      >
        {(field) => {
          const hasError = Boolean(field.state.meta.errors.length);
          const errorId = "login-email-error";

          return (
            <div className="space-y-1.5">
              <Label
                htmlFor="login-email"
                className="text-sm font-medium text-foreground flex items-center justify-between"
              >
                <span>
                  Email address
                  <span
                    className="text-destructive dark:text-error ml-0.5"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </span>
              </Label>
              <Input
                id="login-email"
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
            const res = loginFormSchema.shape.password.safeParse(value);
            return res.success ? undefined : res.error.errors[0]?.message;
          },
        }}
      >
        {(field) => {
          const hasError = Boolean(field.state.meta.errors.length);
          const errorId = "login-password-error";

          return (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="login-password"
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
                <Link
                  href="/forgot-password"
                  tabIndex={0}
                  className="text-xs text-primary hover:text-primary/80 dark:text-brand-accent dark:hover:text-brand-accent/80 font-medium transition-colors underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
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

      {/* Remember Me Checkbox */}
      <form.Field name="rememberMe">
        {(field) => (
          <div className="flex items-center space-x-2 pt-1 pb-1">
            <Checkbox
              id="login-remember"
              checked={field.state.value}
              onCheckedChange={(checked) =>
                field.handleChange(Boolean(checked))
              }
              disabled={isSubmitting}
            />
            <Label
              htmlFor="login-remember"
              className="text-xs sm:text-sm font-normal text-muted-foreground cursor-pointer select-none"
            >
              Remember this device for 30 days
            </Label>
          </div>
        )}
      </form.Field>

      {/* Submit CTA */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 min-h-11 text-base font-semibold shadow-sm mt-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" aria-hidden="true" />
            <span>Signing in...</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </Button>
    </form>
  );
}
