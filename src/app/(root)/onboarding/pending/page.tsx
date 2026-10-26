"use client";

import {
  AlertCircle,
  ArrowLeft,
  Clock,
  Home,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ErrorState } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyMesses } from "@/hooks";

export default function PendingApprovalPage() {
  const { data, isPending, isError, refetch } = useMyMesses();

  const memberships = data?.data.messes ?? [];
  const pending = memberships.find((m) => m.status === "PENDING");
  const active = memberships.find((m) => m.isActive && m.status === "ACTIVE");

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-lg space-y-5 pt-2 sm:pt-6">
        <Skeleton className="mx-auto size-28 rounded-full sm:size-32" />
        <Skeleton className="mx-auto h-8 w-48" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-lg">
        <Card>
          <ErrorState
            variant="page"
            title="Couldn't load your request"
            description="We couldn't check your membership status. Check your connection and try again."
            onRetry={() => void refetch()}
          />
        </Card>
      </div>
    );
  }

  if (!pending) {
    return (
      <div className="mx-auto w-full max-w-lg space-y-6 pt-2 sm:pt-6 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary/60 text-primary">
          <Users className="size-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            No pending request
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            {active
              ? "You already have an active mess, so there is nothing waiting for approval."
              : "You don't have a join request waiting for approval right now."}
          </p>
        </div>
        <Button asChild className="h-11 rounded-xl">
          <Link href={active ? "/dashboard" : "/onboarding"}>
            {active ? "Go to Dashboard" : "Back to Onboarding"}
          </Link>
        </Button>
      </div>
    );
  }

  const mess = pending.mess;

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
          <span className="font-semibold text-foreground">"{mess.name}"</span>{" "}
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
              {mess.name}
            </h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="size-3 text-muted-foreground" />
              <span>
                {mess.address?.trim() || `Room code ${mess.roomCode}`}
              </span>
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
          Once a manager approves your request, the dashboard becomes available.
          Refresh this page to check the latest status.
        </p>
      </div>

      {/* Back Action */}
      <div className="pt-2">
        <Button
          asChild
          variant="outline"
          className="h-10 px-5 rounded-xl border-border/80 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-border transition-colors"
        >
          <Link href="/onboarding">
            <ArrowLeft className="size-3.5 mr-1.5" />
            <span>Back to Onboarding</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
