"use client";

import { AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { ResetPasswordForm } from "@/components/auth";
import { Button } from "@/components/ui/button";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const isExpired =
    token === "expired" ||
    token === "invalid" ||
    searchParams?.get("status") === "expired";

  const [isSuccess, setIsSuccess] = React.useState(
    searchParams?.get("status") === "success",
  );

  return (
    <div className="w-full space-y-6">
      {/* Brand Monogram & Wordmark Header */}
      <div className="flex flex-col items-center text-center space-y-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1"
          aria-label="MessTally Home"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-lg shadow-md group-hover:scale-105 transition-transform">
            MT
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-foreground">
            Mess
            <span className="text-primary dark:text-brand-accent">Tally</span>
          </span>
        </Link>
      </div>

      {/* Auth Card Container */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        {isExpired ? (
          /* Expired / Invalid Token State */
          <div className="text-center space-y-5 animate-in fade-in duration-200">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive dark:text-error border border-destructive/20">
              <AlertTriangle className="size-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Link Expired or Invalid
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This password reset link has expired or has already been used.
                Please request a new link to regain account access.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Button asChild className="w-full h-11">
                <Link href="/forgot-password">Request New Reset Link</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full h-10">
                <Link href="/login">Back to Sign In</Link>
              </Button>
            </div>
          </div>
        ) : isSuccess ? (
          /* Password Reset Success State */
          <div className="text-center space-y-5 animate-in fade-in duration-200">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="size-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Password Reset Complete!
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your password has been securely updated. You can now sign in
                with your new credentials.
              </p>
            </div>

            <div className="pt-2">
              <Button
                asChild
                className="w-full h-11 min-h-11 text-base font-semibold"
              >
                <Link href="/login">Sign In with New Password</Link>
              </Button>
            </div>
          </div>
        ) : (
          /* Active Password Reset Form */
          <>
            <div className="space-y-1.5 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Set new password
              </h1>
              <p className="text-sm text-muted-foreground">
                Create a strong new password for your MessTally account.
              </p>
            </div>

            {/* Imported Form Component */}
            <ResetPasswordForm onSuccess={() => setIsSuccess(true)} />

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

export default function ResetPasswordPage() {
  return (
    <React.Suspense
      fallback={
        <div className="w-full py-12 flex justify-center items-center">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <ResetPasswordContent />
    </React.Suspense>
  );
}
