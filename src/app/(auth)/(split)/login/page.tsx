import Link from "next/link";
import { LoginForm } from "@/components/auth";

export default function LoginPage() {
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
        <LoginForm />

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
