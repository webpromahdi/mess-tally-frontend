"use client";

import { useForm } from "@tanstack/react-form";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  MailCheck,
  RotateCw,
} from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useResendOtp, useVerifyEmail } from "@/hooks";
import { getErrorMessage } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import { verifyEmailFormSchema } from "@/validations/auth-ui.validation";

interface VerifyEmailFormProps {
  className?: string;
  email: string;
  onSuccess?: () => void;
  onBack?: () => void;
}

const TOTAL_DIGITS = 6;
const DEFAULT_RESEND_COOLDOWN = 60; // 60 seconds per backend API.md §1 & §4
const DEFAULT_EXPIRATION_SECONDS = 300; // 5 minutes per backend API.md §1

export function VerifyEmailForm({
  className,
  email,
  onSuccess,
  onBack,
}: VerifyEmailFormProps) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = React.useState(false);

  const { mutateAsync: verifyEmailMutation, isPending: isSubmitting } =
    useVerifyEmail();
  const { mutateAsync: resendOtpMutation, isPending: isResending } =
    useResendOtp();

  // Timers and attempt counters
  const [expirySeconds, setExpirySeconds] = React.useState(
    DEFAULT_EXPIRATION_SECONDS,
  );
  const [resendCooldown, setResendCooldown] = React.useState(
    DEFAULT_RESEND_COOLDOWN,
  );
  const [resendsRemaining, setResendsRemaining] = React.useState(3);

  // 6 discrete digit values for accessible segmented OTP input
  const [digits, setDigits] = React.useState<string[]>(
    Array(TOTAL_DIGITS).fill(""),
  );
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Timer: Expiry countdown (5 min)
  React.useEffect(() => {
    if (expirySeconds <= 0) return;
    const interval = setInterval(() => {
      setExpirySeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [expirySeconds]);

  // Timer: Resend cooldown countdown (60 sec)
  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Focus the first input box on mount
  React.useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
    },
    onSubmit: async ({ value }) => {
      const fullOtp = digits.join("");
      const payload = {
        email: value.email || email,
        otp: fullOtp,
      };

      const result = verifyEmailFormSchema.safeParse(payload);
      if (!result.success) {
        setFormError(
          result.error.errors[0]?.message ||
            "Please enter a valid 6-digit verification code.",
        );
        return;
      }

      if (expirySeconds <= 0) {
        setFormError(
          "Verification code has expired. Please request a new one.",
        );
        return;
      }

      setFormError(null);

      try {
        const response = await verifyEmailMutation({
          email: payload.email,
          otp: payload.otp,
        });

        toast.success("Email Verified!", {
          description:
            response?.message ||
            "Your account has been activated successfully.",
        });

        onSuccess?.();
      } catch (err: unknown) {
        const message = getErrorMessage(
          err,
          "Incorrect verification code. Please check your email and try again.",
        );
        setFormError(message);
        toast.error("Verification failed", {
          description: message,
        });
      }
    },
  });

  const handleDigitChange = (index: number, val: string) => {
    // Only accept numeric characters
    const cleaned = val.replace(/\D/g, "");
    if (!cleaned) {
      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);
      form.setFieldValue("otp", newDigits.join(""));
      return;
    }

    // Single character entry
    const char = cleaned.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    form.setFieldValue("otp", newDigits.join(""));
    setFormError(null);

    // Auto-advance to next input if available
    if (index < TOTAL_DIGITS - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Move to previous box if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < TOTAL_DIGITS - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pastedData) return;

    const newDigits = [...digits];
    for (let i = 0; i < TOTAL_DIGITS; i++) {
      newDigits[i] = pastedData[i] || "";
    }
    setDigits(newDigits);
    form.setFieldValue("otp", newDigits.join(""));
    setFormError(null);

    // Focus the box after the last pasted digit or the final box
    const nextIndex = Math.min(pastedData.length, TOTAL_DIGITS - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || resendsRemaining <= 0 || isResending) return;

    setFormError(null);

    try {
      const response = await resendOtpMutation({
        email,
        purpose: "REGISTRATION",
      });

      const resData = response?.data;
      if (resData?.resendAvailableInSeconds) {
        setResendCooldown(resData.resendAvailableInSeconds);
      } else {
        setResendCooldown(DEFAULT_RESEND_COOLDOWN);
      }

      if (resData?.expiresInSeconds) {
        setExpirySeconds(resData.expiresInSeconds);
      } else {
        setExpirySeconds(DEFAULT_EXPIRATION_SECONDS);
      }

      if (typeof resData?.resendsRemaining === "number") {
        setResendsRemaining(resData.resendsRemaining);
      } else {
        setResendsRemaining((prev) => Math.max(0, prev - 1));
      }

      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 4000);

      toast.success("Code Resent", {
        description:
          response?.message ||
          "A new 6-digit verification code has been sent to your email.",
      });

      // Reset digit fields
      setDigits(Array(TOTAL_DIGITS).fill(""));
      form.setFieldValue("otp", "");
      inputRefs.current[0]?.focus();
    } catch (err: unknown) {
      const message = getErrorMessage(
        err,
        "Failed to resend verification code. Please try again.",
      );
      setFormError(message);
      toast.error("Resend failed", {
        description: message,
      });
    }
  };

  const isOtpComplete = digits.every((d) => d.length === 1);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Visual Email Pill Badge */}
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-brand-accent border border-primary/20">
          <MailCheck className="size-6" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            We sent a 6-digit verification code to
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 border border-border text-xs sm:text-sm font-semibold text-foreground">
            <span className="break-all">{email}</span>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
                className="text-xs font-medium text-primary dark:text-brand-accent hover:underline ml-1"
                aria-label="Change registration email"
              >
                (Change)
              </button>
            )}
          </div>
        </div>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* Form-level error alert */}
        {formError && (
          <div
            role="alert"
            aria-live="polite"
            className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/25 text-destructive dark:text-error text-sm font-medium animate-in fade-in duration-150"
          >
            <AlertCircle
              className="size-4 shrink-0 mt-0.5"
              aria-hidden="true"
            />
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

        {/* Resend success notice */}
        {resendSuccess && (
          <output
            aria-live="polite"
            className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium animate-in fade-in duration-150"
          >
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
            <span>A new 6-digit verification code has been sent!</span>
          </output>
        )}

        {/* 6-Digit Segmented Code Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="otp-digit-0"
              className="text-sm font-medium text-foreground"
            >
              Verification Code
            </Label>
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                expirySeconds <= 60
                  ? "text-destructive dark:text-error font-semibold"
                  : "text-muted-foreground",
              )}
              aria-live="polite"
            >
              <Clock className="size-3.5" aria-hidden="true" />
              <span>
                {expirySeconds > 0
                  ? `Expires in ${formatTime(expirySeconds)}`
                  : "Code expired"}
              </span>
            </div>
          </div>

          <fieldset
            className="grid grid-cols-6 gap-2 sm:gap-3 border-0 p-0 m-0"
            aria-label="6-digit verification code"
          >
            {Array.from({ length: TOTAL_DIGITS }).map((_, index) => {
              const inputId = `otp-digit-${index}`;
              const isFilled = Boolean(digits[index]);

              return (
                <input
                  key={inputId}
                  id={inputId}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  aria-label={`Digit ${index + 1} of ${TOTAL_DIGITS}`}
                  value={digits[index]}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={isSubmitting || expirySeconds <= 0}
                  className={cn(
                    "flex h-12 sm:h-14 w-full text-center text-lg sm:text-2xl font-bold font-mono tracking-wider",
                    "rounded-xl border border-input bg-background shadow-xs transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:border-primary",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    isFilled &&
                      "border-primary/60 dark:border-brand-accent/60 bg-primary/5 dark:bg-brand-accent/5",
                  )}
                />
              );
            })}
          </fieldset>
          <p className="text-xs text-muted-foreground text-center">
            Tip: You can paste the 6-digit code directly into any box.
          </p>
        </div>

        {/* Resend Actions & Cooldown */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
          <span>Didn&apos;t receive the code?</span>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={
              resendCooldown > 0 || resendsRemaining <= 0 || isResending
            }
            className={cn(
              "inline-flex items-center gap-1.5 font-medium transition-colors",
              resendCooldown > 0 || resendsRemaining <= 0
                ? "text-muted-foreground cursor-not-allowed opacity-70"
                : "text-primary dark:text-brand-accent hover:underline",
            )}
          >
            {isResending ? (
              <>
                <RotateCw className="size-3.5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : resendCooldown > 0 ? (
              <span>Resend in {resendCooldown}s</span>
            ) : resendsRemaining > 0 ? (
              <span>Resend code ({resendsRemaining} left)</span>
            ) : (
              <span>Max resends reached</span>
            )}
          </button>
        </div>

        {/* Submit CTA */}
        <div className="space-y-3 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || !isOtpComplete || expirySeconds <= 0}
            className="w-full h-11 min-h-11 text-base font-semibold shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2
                  className="size-4 animate-spin mr-2"
                  aria-hidden="true"
                />
                <span>Verifying email...</span>
              </>
            ) : (
              <span>Verify & Continue</span>
            )}
          </Button>

          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
              className="w-full h-10 text-sm font-medium"
            >
              <ArrowLeft className="size-4 mr-1.5" />
              <span>Back to registration</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
