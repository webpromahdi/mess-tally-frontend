import Link from "next/link";
import * as React from "react";
import { BrandLogo } from "@/components";
import { LoginForm } from "@/components/auth";

export default function LoginPage() {
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
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your flatmate account to view meal sheets and expense
            ledgers.
          </p>
        </div>

        {/* Imported Form Component */}
        <React.Suspense
          fallback={
            <div className="w-full py-8 flex justify-center items-center">
              <div className="size-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          }
        >
          <LoginForm />
        </React.Suspense>

        {/* Card Footer Navigation */}
        <div className="pt-2 text-center text-xs sm:text-sm text-muted-foreground">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:text-primary/80 dark:text-brand-accent dark:hover:text-brand-accent/80 transition-colors underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
