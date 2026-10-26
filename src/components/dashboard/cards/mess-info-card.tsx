"use client";

import { Check, Copy, Lock } from "lucide-react";
import { useState } from "react";
import { AvatarStack } from "@/components/ui/avatar";
import { Badge, StatusDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Eyebrow,
} from "@/components/ui/card";
import type { MessInfo, MonthInfo } from "@/lib/types/dashboard.types";
import { cn } from "@/lib/utils";

/** Design.md §10.8 Mess Info Card: name, room code, plan, month status, active members. */
export function MessInfoCard({
  mess,
  month,
  className,
}: {
  mess: MessInfo;
  month: MonthInfo | null;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard?.writeText(mess.roomCode).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <div className="min-w-0">
          <Eyebrow>Your mess</Eyebrow>
          <CardTitle className="mt-1 truncate">{mess.name}</CardTitle>
        </div>
        {mess.plan ? (
          <Badge
            variant={mess.plan === "FREE" ? "plan-free" : "plan-pro"}
            size="sm"
          >
            {mess.plan}
          </Badge>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-line-strong bg-canvas p-3">
          <div className="min-w-0">
            <p className="text-caption text-ink-subtle">Room code</p>
            <p className="font-mono text-h4 tracking-widest text-ink">
              {mess.roomCode}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={copy} aria-live="polite">
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <dl className="flex flex-col gap-3 text-body-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-ink-muted">Month</dt>
            <dd>
              {month ? (
                <Badge
                  variant={
                    month.status === "ACTIVE" ? "month-active" : "month-closed"
                  }
                  size="sm"
                >
                  {month.status === "ACTIVE" ? (
                    <StatusDot />
                  ) : (
                    <Lock className="size-3" />
                  )}
                  {month.label} ·{" "}
                  {month.status === "ACTIVE" ? "Active" : "Closed"}
                </Badge>
              ) : (
                <Badge variant="neutral" size="sm">
                  No active month
                </Badge>
              )}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-ink-muted">Manager</dt>
            <dd className="font-semibold text-ink">{mess.managerFirstName}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-ink-muted">Active members</dt>
            <dd className="flex items-center gap-2">
              <AvatarStack names={mess.activeMembers} size="xs" />
              <span className="font-semibold text-ink tabular-nums">
                {mess.activeMembers.length}
              </span>
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
