"use client";

import { useForm } from "@tanstack/react-form";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "@/hooks";
import { getErrorMessage } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import { forgotPasswordFormSchema } from "@/validations/auth-ui.validation";

interface ForgotPasswordFormProps {
  className?: string;
  onSuccess?: (email: string) => void;
}

export function ForgotPasswordForm({
  className,
  onSuccess,
}: ForgotPasswordFormProps) {
  const [formError, setFormError] = React.useState<string | null>(null);

  const { mutateAsync: forgotPasswordMutation, isPending: isSubmitting } =
    useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      const result = forgotPasswordFormSchema.safeParse(value);
      if (!result.success) {
        setFormError(
          result.error.errors[0]?.message || "Invalid email address",
        );
        return;
      }

      setFormError(null);

      try {
        const response = await forgotPasswordMutation({
          email: value.email,
        });

        toast.success("Reset Code Sent", {
          description:
            response?.message ||
            "Please check your email for the password reset instructions.",
        });

        onSuccess?.(value.email);
      } catch (err: unknown) {
        const message = getErrorMessage(
          err,
          "Unable to process request. Please try again later.",
        );
        setFormError(message);
        toast.error("Request failed", {
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

      {/* Email Field */}
      <form.Field
        name="email"
        validators={{
          onBlur: ({ value }) => {
            const res = forgotPasswordFormSchema.shape.email.safeParse(value);
            return res.success ? undefined : res.error.errors[0]?.message;
          },
        }}
      >
        {(field) => {
          const hasError = Boolean(field.state.meta.errors.length);
          const errorId = "forgot-email-error";

          return (
            <div className="space-y-1.5">
              <Label
                htmlFor="forgot-email"
                className="text-sm font-medium text-foreground"
              >
                Registered email address
                <span
                  className="text-destructive dark:text-error ml-0.5"
                  aria-hidden="true"
                >
                  *
                </span>
              </Label>
              <Input
                id="forgot-email"
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

      {/* Submit CTA */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 min-h-11 text-base font-semibold shadow-sm mt-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" aria-hidden="true" />
            <span>Sending reset link...</span>
          </>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>Send Reset Link</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        )}
      </Button>
    </form>
  );
}
