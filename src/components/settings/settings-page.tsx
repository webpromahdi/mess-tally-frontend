"use client";

import {
  ArrowRight,
  ArrowRightLeft,
  Check,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { TransferManagerDialog } from "@/components/dashboard";
import { ConfirmSheet } from "@/components/members/dialogs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useActivateSubscription,
  useCurrentUser,
  useLeaveMess,
  useSubscription,
  useSubscriptionPayments,
  useWorkspace,
} from "@/hooks";
import { getApiMessage } from "@/lib/apiError";
import { formatBDT } from "@/lib/format";

function formatDate(value: string | null) {
  if (!value) return "No expiry date";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function SettingsPage() {
  const { user } = useCurrentUser();
  const workspace = useWorkspace(null);
  const subscription = useSubscription();
  const payments = useSubscriptionPayments();
  const activate = useActivateSubscription();
  const leaveMess = useLeaveMess();
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);

  const viewer = workspace.viewer;
  const mess = workspace.mess;
  const plan = subscription.data?.data;
  const canManageSubscription = viewer?.isManager ?? false;
  const canTransfer = viewer?.isManager || viewer?.role === "OWNER";
  const isOwner = viewer?.role === "OWNER";

  const handleActivate = async (
    option: "MONTHLY" | "HALF_YEARLY" | "YEARLY",
  ) => {
    try {
      const result = await activate.mutateAsync({ plan: option });
      window.location.assign(result.data.paymentURL);
    } catch (error) {
      toast.error(
        getApiMessage(error, "Couldn't start the subscription payment."),
      );
    }
  };

  const handleLeave = async () => {
    try {
      await leaveMess.mutateAsync();
      toast.success("You left the mess.");
      window.location.assign("/onboarding");
    } catch (error) {
      toast.error(getApiMessage(error, "Couldn't leave this mess."));
    }
  };

  if (workspace.identityLoading || workspace.queries.subscription.isPending) {
    return (
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="h-20 animate-pulse rounded-xl bg-muted" />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="h-64 animate-pulse rounded-xl bg-card" />
          <div className="h-64 animate-pulse rounded-xl bg-card" />
        </div>
      </div>
    );
  }

  if (!user || !viewer || !mess) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-body-sm text-ink-muted">
          Your account is not connected to an active mess.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <header>
        <h1 className="text-h1 text-ink">Settings</h1>
        <p className="mt-1 text-body-sm text-ink-muted">
          Manage your account, mess access, and subscription.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account profile</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-body font-semibold text-ink">
                {user.name}
              </p>
              <p className="truncate text-body-sm text-ink-muted">
                {user.email}
              </p>
              <p className="mt-1 text-caption text-ink-subtle">
                {viewer.role === "OWNER"
                  ? "Owner"
                  : viewer.isManager
                    ? "Manager"
                    : "Member"}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard/profile">
                Edit profile
                <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Mess information</CardTitle>
              {canTransfer && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTransferOpen(true)}
                  className="gap-1.5"
                >
                  <ArrowRightLeft className="size-3.5" />
                  Transfer manager
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 text-body-sm sm:grid-cols-2">
            <div>
              <p className="text-caption text-ink-muted">Mess name</p>
              <p className="mt-1 font-medium text-ink">{mess.name}</p>
            </div>
            <div>
              <p className="text-caption text-ink-muted">Your access</p>
              <p className="mt-1 font-medium text-ink">
                {viewer.role === "OWNER"
                  ? viewer.isManager
                    ? "Owner & Manager"
                    : "Owner"
                  : viewer.isManager
                    ? "Manager"
                    : "Member"}
              </p>
            </div>
            <p className="text-caption text-ink-subtle sm:col-span-2">
              Mess name, room code, join settings, and meal cutoff do not have
              update endpoints in the current API contract.
            </p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>Subscription</CardTitle>
              <p className="mt-1 text-body-sm text-ink-muted">
                PRO unlocks past months, receipts, self-service meals, and PDF
                statements.
              </p>
            </div>
            <span className="rounded-full bg-marigold-100 px-3 py-1 text-caption font-semibold text-marigold-900">
              {plan?.isPro ? "PRO" : "FREE"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                ["Past archives", plan?.features.pastMonthArchives],
                ["Receipt uploads", plan?.features.bazarReceiptUploads],
                ["PDF statements", plan?.features.pdfStatements],
              ] as const
            ).map(([label, enabled]) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl bg-silver-100 px-3 py-3 text-body-sm"
              >
                <Check
                  className={
                    enabled ? "size-4 text-success" : "size-4 text-ink-subtle"
                  }
                />
                <span className="text-ink">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-body-sm text-ink-muted">
            {plan?.isPro
              ? `Active until ${formatDate(plan.planExpiresAt)}.`
              : "The current month remains available on the free plan."}
          </p>
          {canManageSubscription && !plan?.isPro && plan?.options.length ? (
            <div className="grid gap-3 sm:grid-cols-3">
              {plan.options.map((option) => (
                <Button
                  key={option.key}
                  variant={option.key === "MONTHLY" ? "accent" : "outline"}
                  disabled={activate.isPending}
                  onClick={() => void handleActivate(option.key)}
                >
                  <Sparkles />
                  {option.label} · {formatBDT(option.price)}
                </Button>
              ))}
            </div>
          ) : !canManageSubscription && !plan?.isPro ? (
            <p className="rounded-xl bg-warning-surface p-3 text-body-sm text-warning">
              Only a mess manager can start a PRO subscription.
            </p>
          ) : null}
        </CardContent>
      </Card>

      {canManageSubscription && payments.data?.data.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Payment history</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {payments.data.data.slice(0, 5).map((payment) => (
              <div
                key={payment.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line px-3 py-3 text-body-sm"
              >
                <span className="text-ink">{payment.type}</span>
                <span className="tabular-nums text-ink-muted">
                  {formatBDT(payment.amount)} · {payment.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <Card className="border-error/30">
        <CardHeader>
          <CardTitle className="text-error">Danger zone</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-body font-medium text-ink">Leave this mess</p>
            <p className="mt-1 text-body-sm text-ink-muted">
              Your historical records remain, but you will lose access to this
              mess.
            </p>
          </div>
          <Button
            variant="danger"
            disabled={isOwner || leaveMess.isPending}
            onClick={() => setLeaveOpen(true)}
          >
            <LogOut />
            {isOwner ? "Transfer ownership first" : "Leave mess"}
          </Button>
        </CardContent>
      </Card>

      <ConfirmSheet
        open={leaveOpen}
        icon={<ShieldCheck className="size-5" />}
        title={`Leave ${mess.name}?`}
        confirmLabel="Leave mess"
        onConfirm={() => void handleLeave()}
        onClose={() => setLeaveOpen(false)}
      >
        <p>
          You will lose access to this mess. Your historical meals and bazar
          records remain available to the mess.
        </p>
      </ConfirmSheet>

      {canTransfer && (
        <TransferManagerDialog
          open={transferOpen}
          onClose={() => setTransferOpen(false)}
          currentManagerName={mess.managerFirstName}
        />
      )}
    </div>
  );
}
