"use client";

import { useForm } from "@tanstack/react-form";
import { AlertCircle, Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/hooks";
import { getErrorMessage } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import {
  resetPasswordBaseSchema,
  resetPasswordFormSchema,
} from "@/validations/auth-ui.validation";

interface ResetPasswordFormProps {
  className?: string;
  email?: string;
  otp?: string;
  onSuccess?: () => void;
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

export function ResetPasswordForm({
  className,
  email,
  otp,
  onSuccess,
}: ResetPasswordFormProps) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const { mutateAsync: resetPasswordMutation, isPending: isSubmitting } =
    useResetPassword();

  const form = useForm({
    defaultValues: {
      email: email || "",
      otp: otp || "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const payload = {
        email: value.email || email || "",
        otp: value.otp || otp || "",
        password: value.password,
        confirmPassword: value.confirmPassword,
      };

      const result = resetPasswordFormSchema.safeParse(payload);
      if (!result.success) {
        setFormError(
          result.error.errors[0]?.message || "Please fix form errors.",
        );
        return;
      }

      setFormError(null);

      try {
        const response = await resetPasswordMutation({
          email: payload.email,
          otp: payload.otp,
          newPassword: payload.password,
        });

        toast.success("Password Updated", {
          description:
            response?.message || "Your password has been successfully reset.",
        });

        onSuccess?.();
      } catch (err: unknown) {
        const message = getErrorMessage(
          err,
          "Unable to reset password. Link or code may have expired.",
        );
        setFormError(message);
        toast.error("Reset failed", {
          description: message,
        });
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

      {/* Account indicator if prefilled */}
      {email ? (
        <div className="p-3 rounded-xl bg-muted/60 border border-border text-xs flex items-center justify-between">
          <span className="text-muted-foreground font-medium">Account:</span>
          <span className="font-semibold text-foreground break-all">
            {email}
          </span>
        </div>
      ) : (
        <form.Field
          name="email"
          validators={{
            onBlur: ({ value }) => {
              const res = resetPasswordBaseSchema.shape.email.safeParse(value);
              return res.success ? undefined : res.error.errors[0]?.message;
            },
          }}
        >
          {(field) => {
            const hasError = Boolean(field.state.meta.errors.length);
            const errorId = "reset-email-error";
            return (
              <div className="space-y-1.5">
                <Label
                  htmlFor="reset-email"
                  className="text-sm font-medium text-foreground"
                >
                  Registered Email Address
                  <span
                    className="text-destructive dark:text-error ml-0.5"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </Label>
                <Input
                  id="reset-email"
                  type="email"
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
      )}

      {/* 6-Digit OTP verification code field */}
      {!otp && (
        <form.Field
          name="otp"
          validators={{
            onBlur: ({ value }) => {
              const res = resetPasswordBaseSchema.shape.otp.safeParse(value);
              return res.success ? undefined : res.error.errors[0]?.message;
            },
          }}
        >
          {(field) => {
            const hasError = Boolean(field.state.meta.errors.length);
            const errorId = "reset-otp-error";
            return (
              <div className="space-y-1.5">
                <Label
                  htmlFor="reset-otp"
                  className="text-sm font-medium text-foreground"
                >
                  6-Digit Verification Code
                  <span
                    className="text-destructive dark:text-error ml-0.5"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </Label>
                <Input
                  id="reset-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value.replace(/\D/g, ""))
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? errorId : undefined}
                  disabled={isSubmitting}
                  className={cn(
                    "font-mono tracking-widest text-center text-lg transition-colors",
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
      )}

      {/* New Password */}
      <form.Field
        name="password"
        validators={{
          onBlur: ({ value }) => {
            const res = resetPasswordBaseSchema.shape.password.safeParse(value);
            return res.success ? undefined : res.error.errors[0]?.message;
          },
        }}
      >
        {(field) => {
          const hasError = Boolean(field.state.meta.errors.length);
          const errorId = "reset-password-error";

          return (
            <div className="space-y-1.5">
              <Label
                htmlFor="reset-password"
                className="text-sm font-medium text-foreground"
              >
                New password
                <span
                  className="text-destructive dark:text-error ml-0.5"
                  aria-hidden="true"
                >
                  *
                </span>
              </Label>
              <div className="relative">
                <Input
                  id="reset-password"
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

      {/* Confirm New Password */}
      <form.Field
        name="confirmPassword"
        validators={{
          onBlur: ({ value }) => {
            const currentPassword = form.getFieldValue("password");
            if (!value) return "Please confirm your new password.";
            if (value !== currentPassword) return "Passwords do not match.";
            return undefined;
          },
        }}
      >
        {(field) => {
          const hasError = Boolean(field.state.meta.errors.length);
          const errorId = "reset-confirm-password-error";

          return (
            <div className="space-y-1.5">
              <Label
                htmlFor="reset-confirm-password"
                className="text-sm font-medium text-foreground"
              >
                Confirm new password
                <span
                  className="text-destructive dark:text-error ml-0.5"
                  aria-hidden="true"
                >
                  *
                </span>
              </Label>
              <div className="relative">
                <Input
                  id="reset-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter new password"
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
            <span>Updating password...</span>
          </>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <KeyRound className="size-4" aria-hidden="true" />
            <span>Update Password</span>
          </span>
        )}
      </Button>
    </form>
  );
}
