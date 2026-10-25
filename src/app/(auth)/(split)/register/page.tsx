"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { BrandLogo } from "@/components";
import { RegisterForm, VerifyEmailForm } from "@/components/auth";
import { Button } from "@/components/ui/button";

type RegisterStep = "register" | "verify" | "success";

function RegisterPageContent() {
  const searchParams = useSearchParams();
  const queryStep = searchParams?.get("step");
  const queryEmail = searchParams?.get("email") || "";

  const [step, setStep] = React.useState<RegisterStep>(
    queryStep === "verify" ? "verify" : "register",
  );
  const [registeredEmail, setRegisteredEmail] =
    React.useState<string>(queryEmail);

  return (
    <div className="w-full space-y-6">
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
        {step === "success" ? (
          <div className="text-center space-y-5 animate-in fade-in duration-200">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="size-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Email Verified Successfully!
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Welcome to MessTally! Your account has been verified and
                activated. You can now sign in and join or create your mess.
              </p>
            </div>

            <div className="pt-2">
              <Button
                asChild
                className="w-full h-11 min-h-11 text-base font-semibold"
              >
                <Link href="/login">Proceed to Sign In</Link>
              </Button>
            </div>
          </div>
        ) : step === "verify" ? (
          <>
            <div className="space-y-1.5 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Verify your email
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit confirmation code sent to activate your
                account.
              </p>
            </div>

            {/* OTP Verification Form */}
            <VerifyEmailForm
              email={registeredEmail || "your email"}
              onBack={() => setStep("register")}
              onSuccess={() => setStep("success")}
            />
          </>
        ) : (
          <>
            <div className="space-y-1.5 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Join your mess community to track daily meals, grocery bills,
                and month-end settlements.
              </p>
            </div>

            {/* Imported Form Component */}
            <RegisterForm
              onSuccess={(email) => {
                setRegisteredEmail(email);
                setStep("verify");
              }}
            />

            {/* Card Footer Navigation */}
            <div className="pt-2 text-center text-xs sm:text-sm text-muted-foreground">
              <p>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-primary hover:text-primary/80 dark:text-brand-accent dark:hover:text-brand-accent/80 transition-colors underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <React.Suspense
      fallback={
        <div className="w-full py-12 flex justify-center items-center">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <RegisterPageContent />
    </React.Suspense>
  );
}
