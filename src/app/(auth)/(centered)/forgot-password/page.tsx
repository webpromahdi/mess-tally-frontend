"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { BrandLogo } from "@/components";
import { ForgotPasswordForm } from "@/components/auth";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = React.useState<string | null>(
    null,
  );

  return (
    <div className="w-full max-w-100 mx-auto space-y-6">
      {/* Brand Logo Header */}
      <div className="flex flex-col items-center text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg p-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="MessTally Home"
        >
          <BrandLogo variant="primary" priority className="h-10 sm:h-11" />
        </Link>
      </div>

      {/* Auth Card Container */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        {submittedEmail ? (
          <div className="text-center space-y-5 animate-in fade-in duration-200">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="size-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Check Your Email
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We sent a password reset link to{" "}
                <span className="font-semibold text-foreground break-all">
                  {submittedEmail}
                </span>
                . Please follow the instructions in the email.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Button asChild variant="outline" className="w-full h-11">
                <Link href="/login">Return to Sign In</Link>
              </Button>
              <button
                type="button"
                onClick={() => setSubmittedEmail(null)}
                className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
              >
                Didn&apos;t receive it? Try another email
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-1.5 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Reset your password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your registered email address and we&apos;ll send you a
                password reset link.
              </p>
            </div>

            {/* Imported Form Component */}
            <ForgotPasswordForm
              onSuccess={(email) => setSubmittedEmail(email)}
            />

            {/* Card Footer Navigation */}
            <div className="pt-4 border-t border-border text-center text-sm text-muted-foreground">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 dark:text-brand-accent dark:hover:text-brand-accent/80 transition-colors underline-offset-4 hover:underline"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                <span>Back to sign in</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
