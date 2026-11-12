"use client";

import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, Eyebrow } from "@/components/ui/card";
import {
  useActivateSubscription,
  useSubscription,
  useSubscriptionPayments,
} from "@/hooks";
import { getApiMessage } from "@/lib/apiError";
import { formatDate } from "@/lib/dates";
import { formatBDT } from "@/lib/format";
import type {
  SubscriptionOptionDto,
  SubscriptionPaymentDto,
  SubscriptionPlanKey,
} from "@/lib/types/subscription.types";

const TYPE_LABELS: Record<string, string> = {
  SUBSCRIPTION_MONTHLY: "Monthly · 30 days",
  SUBSCRIPTION_HALF_YEARLY: "Half-yearly · 180 days",
  SUBSCRIPTION_YEARLY: "Yearly · 365 days",
};

const DAY_MS = 24 * 60 * 60 * 1000;

/** The paid period covering `now`; falls back to the latest paid one (list is newest first). */
function currentPayment(payments: SubscriptionPaymentDto[], now: number) {
  const paid = payments.filter((p) => p.status === "PAID");
  return (
    paid.find(
      (p) =>
        new Date(p.periodStart).getTime() <= now &&
        now < new Date(p.periodEnd).getTime(),
    ) ?? paid[0]
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-body-sm text-ink-muted">{label}</dt>
      <dd className="text-right text-body-sm font-medium text-ink tabular-nums">
        {value}
      </dd>
    </div>
  );
}

/**
 * Package picker for renewing/upgrading. Checkout is the same bKash redirect as
 * Settings; an early renewal starts at the current expiry, so no days are lost.
 */
function RenewOptions({
  options,
  current,
  onClose,
}: {
  options: SubscriptionOptionDto[];
  current?: SubscriptionPlanKey;
  onClose: () => void;
}) {
  const activate = useActivateSubscription();
  const [picked, setPicked] = useState<SubscriptionPlanKey | null>(null);

  const checkout = async (plan: SubscriptionPlanKey) => {
    setPicked(plan);
    try {
      const result = await activate.mutateAsync({ plan });
      window.location.assign(result.data.paymentURL);
    } catch (error) {
      setPicked(null);
      toast.error(
        getApiMessage(error, "Couldn't start the subscription payment."),
      );
    }
  };

  return (
    <div className="mt-3 flex flex-col gap-2">
      {options.map((option) => (
        <Button
          key={option.key}
          variant={option.key === current ? "accent" : "outline"}
          disabled={activate.isPending}
          onClick={() => void checkout(option.key)}
          className="justify-between"
        >
          <span>{option.label}</span>
          <span className="tabular-nums">
            {picked === option.key
              ? "Opening bKash…"
              : formatBDT(option.price)}
          </span>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        disabled={activate.isPending}
        onClick={onClose}
        className="self-start"
      >
        Cancel
      </Button>
    </div>
  );
}

/** Mess subscription status: plan, type, start and expiry (any active member can read it). */
export function SubscriptionCard({ canManage = false }: { canManage?: boolean }) {
  const subscription = useSubscription();
  const payments = useSubscriptionPayments();
  const [choosing, setChoosing] = useState(false);
  const sub = subscription.data?.data;
  const now = Date.now();

  const expiresAt = sub?.planExpiresAt ? new Date(sub.planExpiresAt) : null;
  const daysLeft = expiresAt
    ? Math.max(0, Math.ceil((expiresAt.getTime() - now) / DAY_MS))
    : 0;
  const payment = currentPayment(payments.data?.data ?? [], now);
  const typeLabel = payment
    ? (TYPE_LABELS[payment.type] ?? payment.type)
    : payments.isPending
      ? "Loading…"
      : "—";
  // "SUBSCRIPTION_MONTHLY" → "MONTHLY", to preselect the package they had.
  const currentKey = payment?.type.replace("SUBSCRIPTION_", "") as
    | SubscriptionPlanKey
    | undefined;
  const canRenew = canManage && Boolean(sub?.options.length);

  const renew = canRenew ? (
    choosing && sub ? (
      <RenewOptions
        options={sub.options}
        current={currentKey}
        onClose={() => setChoosing(false)}
      />
    ) : (
      <Button
        variant={sub?.isPro ? "outline" : "accent"}
        size="sm"
        onClick={() => setChoosing(true)}
        className="mt-3 self-start"
      >
        {sub?.isPro ? <RefreshCw /> : <Sparkles />}
        {sub?.isPro ? "Renew" : "Upgrade to PRO"}
      </Button>
    )
  ) : null;

  return (
    <Card className="gap-0 p-4">
      <div className="flex items-center justify-between gap-2">
        <Eyebrow>Subscription</Eyebrow>
        {sub && (
          <Badge variant={sub.isPro ? "plan-pro" : "plan-free"} size="sm">
            {sub.isPro ? "Pro" : "Free"}
          </Badge>
        )}
      </div>

      {subscription.isPending ? (
        <div className="mt-3 flex flex-col gap-2" aria-hidden>
          <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
        </div>
      ) : !sub ? (
        <p className="mt-2 text-body-sm text-ink-muted">
          Couldn&apos;t load the subscription.
        </p>
      ) : sub.isPro && expiresAt ? (
        <>
          <p className="mt-2 text-h3 text-ink">
            PRO · {daysLeft} {daysLeft === 1 ? "day" : "days"} left
          </p>
          <dl className="mt-3 flex flex-col gap-1.5">
            <Row label="Type" value={typeLabel} />
            {payment && (
              <Row label="Started" value={formatDate(payment.periodStart)} />
            )}
            <Row label="Expires" value={formatDate(sub.planExpiresAt)} />
          </dl>
          {renew}
        </>
      ) : (
        <>
          <p className="mt-2 text-h3 text-ink">Free plan</p>
          <p className="mt-1 text-body-sm text-ink-muted">
            {expiresAt
              ? `PRO expired on ${formatDate(sub.planExpiresAt)}.`
              : "No PRO subscription yet."}
          </p>
          {payment && (
            <dl className="mt-3 flex flex-col gap-1.5">
              <Row label="Last type" value={typeLabel} />
            </dl>
          )}
          {renew ?? (
            <Link
              href="/dashboard/settings"
              className="mt-3 inline-flex items-center gap-1 self-start text-body-sm font-semibold text-aubergine-800 hover:underline"
            >
              View PRO plans
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          )}
        </>
      )}
    </Card>
  );
}
