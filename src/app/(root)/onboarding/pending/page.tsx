import { AlertCircle, Clock, Home, MapPin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PendingApprovalPage() {
  const messName = "Green Road Flat";
  const messLocation = "Dhanmondi, Dhaka";

  return (
    <div className="mx-auto w-full max-w-lg text-center space-y-6 pt-2 sm:pt-6 animate-in fade-in-50 duration-300">
      {/* Top Hourglass Illustration */}
      <div className="relative mx-auto size-28 sm:size-32">
        <Image
          src="/illustrations/pending-hourglass.svg"
          alt="Pending approval hourglass illustration"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Headings */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Request Sent!
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Your request to join{" "}
          <span className="font-semibold text-foreground">"{messName}"</span>{" "}
          has been submitted and is waiting for manager approval.
        </p>
      </div>

      {/* Mess Info Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 text-left transition-colors">
        <div className="flex items-center gap-3.5">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/25 shrink-0">
            <Home className="size-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-foreground leading-snug">
              {messName}
            </h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="size-3 text-muted-foreground" />
              <span>{messLocation}</span>
            </p>
          </div>
        </div>

        <Badge
          variant="outline"
          className="border-amber-500/35 bg-amber-500/15 text-amber-700 dark:text-amber-400 font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <Clock className="size-3.5" />
          <span>Pending Approval</span>
        </Badge>
      </div>

      {/* Info Notice Banner */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 sm:p-4 text-xs sm:text-sm text-amber-950 dark:text-amber-200 flex items-start gap-3 text-left">
        <AlertCircle className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          You'll be notified once a manager approves your request. You can check
          this page anytime or refresh to see the latest status.
        </p>
      </div>

      {/* Cancel Request Action */}
      <div className="pt-2">
        <Button
          asChild
          variant="outline"
          className="h-10 px-5 rounded-xl border-border/80 text-xs font-semibold text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors"
        >
          <Link href="/onboarding">
            <X className="size-3.5 mr-1.5" />
            <span>Cancel Request</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
