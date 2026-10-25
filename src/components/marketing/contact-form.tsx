"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = React.useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionFeedback, setSubmissionFeedback] = React.useState<{
    type: "info" | "error";
    message: string;
  } | null>(null);

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject) {
      nextErrors.subject = "Please select a subject.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmissionFeedback(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate validation pass and provide clear integration requirement feedback
    // per instructions: "Do not invent an API endpoint or display a fake success message"
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setSubmissionFeedback({
      type: "info",
      message:
        "Form validated successfully! Note: Backend contact submission API is pending integration. For immediate assistance, please email us directly at support@messtally.com.",
    });
  }

  function handleInputChange(field: keyof FormState, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submissionFeedback) {
      setSubmissionFeedback(null);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
      aria-label="Contact Message Form"
    >
      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <Label
            htmlFor="contact-name"
            className="text-xs font-semibold text-foreground"
          >
            Name
          </Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="rounded-lg bg-card"
          />
          {errors.name && (
            <p
              id="name-error"
              className="text-xs text-destructive flex items-center gap-1 mt-1"
              role="alert"
            >
              <AlertCircle className="size-3.5" aria-hidden="true" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <Label
            htmlFor="contact-email"
            className="text-xs font-semibold text-foreground"
          >
            Email
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="rounded-lg bg-card"
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-xs text-destructive flex items-center gap-1 mt-1"
              role="alert"
            >
              <AlertCircle className="size-3.5" aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Subject */}
      <div className="space-y-1.5">
        <Label
          htmlFor="contact-subject"
          className="text-xs font-semibold text-foreground"
        >
          Subject
        </Label>
        <div className="relative">
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className="h-11 md:h-10 w-full appearance-none rounded-lg border border-input bg-card px-3 py-2 text-base md:text-sm text-foreground shadow-2xs outline-none transition-all focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25"
          >
            <option value="" disabled>
              Select a subject
            </option>
            <option value="general">General Question</option>
            <option value="setup">Mess Setup &amp; Room Code</option>
            <option value="features">Feature Request</option>
            <option value="bug">Report an Issue / Bug</option>
            <option value="feedback">Product Feedback</option>
          </select>
          <span
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-bold"
            aria-hidden="true"
          >
            ▾
          </span>
        </div>
        {errors.subject && (
          <p
            id="subject-error"
            className="text-xs text-destructive flex items-center gap-1 mt-1"
            role="alert"
          >
            <AlertCircle className="size-3.5" aria-hidden="true" />
            <span>{errors.subject}</span>
          </p>
        )}
      </div>

      {/* Row 3: Message with Character Counter */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="contact-message"
            className="text-xs font-semibold text-foreground"
          >
            Message
          </Label>
        </div>
        <div className="relative">
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            maxLength={500}
            placeholder="Your message..."
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="w-full resize-none rounded-lg border border-input bg-card p-3 pb-7 text-base md:text-sm text-foreground shadow-2xs outline-none transition-all placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25"
          />
          <span
            className="absolute right-3 bottom-2.5 text-[11px] font-medium text-muted-foreground tabular-nums select-none"
            aria-live="polite"
          >
            {formData.message.length}/500
          </span>
        </div>
        {errors.message && (
          <p
            id="message-error"
            className="text-xs text-destructive flex items-center gap-1 mt-1"
            role="alert"
          >
            <AlertCircle className="size-3.5" aria-hidden="true" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Submission Feedback Banner */}
      {submissionFeedback && (
        <output
          aria-live="polite"
          className="rounded-lg border border-border bg-accent/60 p-3.5 text-xs text-foreground flex items-start gap-2.5"
        >
          <CheckCircle2
            className="size-4 text-primary dark:text-brand-accent shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="leading-relaxed">{submissionFeedback.message}</p>
        </output>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="brand-accent"
          size="lg"
          id="contact-submit-button"
          disabled={isSubmitting}
          className="w-full rounded-lg font-semibold h-11 text-sm sm:text-base shadow-xs hover:bg-marigold-600 transition-colors"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              <span>Validating...</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <span>Send Message</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
