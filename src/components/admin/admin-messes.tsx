"use client";

import { Crown, Search } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import {
  EmptyState,
  ErrorState,
  Field,
  NativeSelect,
} from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAdminMesses, useGrantAdminPro } from "@/hooks";
import { getApiMessage } from "@/lib/apiError";
import { formatDate } from "@/lib/dates";
import { formatBDT } from "@/lib/format";
import type { AdminMess, AdminSubscriptionType } from "@/lib/types/admin.types";
import { cn } from "@/lib/utils";
import {
  PageTitle,
  Pagination,
  SUBSCRIPTION_LABELS,
  tdClass,
  thClass,
  useDebouncedValue,
} from "./admin-ui";

const PRESETS = [30, 180, 365];

function GrantProDialog({
  mess,
  onClose,
}: {
  mess: AdminMess | null;
  onClose: () => void;
}) {
  const grant = useGrantAdminPro();
  const [days, setDays] = useState("30");
  const parsed = Number(days);
  const valid = Number.isInteger(parsed) && parsed >= 1 && parsed <= 730;
  const activePro = mess?.plan === "PRO";

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!mess || !valid) return;
    try {
      const result = await grant.mutateAsync({ id: mess.id, days: parsed });
      toast.success(
        `${mess.name} is PRO until ${formatDate(result.data.planExpiresAt)}.`,
      );
      onClose();
    } catch (error) {
      toast.error(getApiMessage(error, "Couldn't grant PRO."));
    }
  };

  return (
    <Dialog open={mess !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="pr-8">
            <DialogTitle className="text-h4 text-ink">
              {activePro ? "Extend PRO" : "Grant PRO"} · {mess?.name}
            </DialogTitle>
            <DialogDescription className="mt-1 text-body-sm text-ink-muted">
              {activePro
                ? `Adds days after the current expiry (${formatDate(mess?.planExpiresAt)}).`
                : "Starts today."}{" "}
              No payment is recorded, so this isn't counted as revenue.
            </DialogDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <Button
                key={preset}
                type="button"
                size="sm"
                variant={days === String(preset) ? "primary" : "outline"}
                onClick={() => setDays(String(preset))}
              >
                {preset} days
              </Button>
            ))}
          </div>
          <Field
            label="Days"
            error={
              days && !valid ? "Enter a whole number from 1 to 730." : undefined
            }
          >
            <Input
              type="number"
              inputMode="numeric"
              min={1}
              max={730}
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </Field>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!valid || grant.isPending}
            >
              <Crown />
              {grant.isPending
                ? "Saving…"
                : activePro
                  ? "Extend PRO"
                  : "Grant PRO"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AdminMesses() {
  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState<"FREE" | "PRO" | "">("");
  const [type, setType] = useState<AdminSubscriptionType | "">("");
  const [page, setPage] = useState(1);
  const [granting, setGranting] = useState<AdminMess | null>(null);

  const messes = useAdminMesses({
    search: useDebouncedValue(search.trim()),
    plan,
    subscriptionType: type,
    page,
  });
  const rows = messes.data?.data ?? [];

  return (
    <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
      <PageTitle
        title="Messes"
        description="Every mess, its plan, current subscription and members."
      />

      <Card className="gap-0 overflow-hidden py-0">
        <div className="grid gap-3 border-b border-line p-4 sm:grid-cols-3">
          <Field label="Mess name or room code">
            <Input
              type="search"
              placeholder="Search messes"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </Field>
          <Field label="Plan">
            <NativeSelect
              value={plan}
              onChange={(e) => {
                setPlan(e.target.value as "FREE" | "PRO" | "");
                setPage(1);
              }}
            >
              <option value="">All plans</option>
              <option value="PRO">PRO (active)</option>
              <option value="FREE">Free</option>
            </NativeSelect>
          </Field>
          <Field label="Subscription type">
            <NativeSelect
              value={type}
              onChange={(e) => {
                setType(e.target.value as AdminSubscriptionType | "");
                setPage(1);
              }}
            >
              <option value="">Any type</option>
              <option value="MONTHLY">Monthly</option>
              <option value="HALF_YEARLY">Half-yearly</option>
              <option value="YEARLY">Yearly</option>
            </NativeSelect>
          </Field>
        </div>

        {messes.isPending ? (
          <div className="flex flex-col gap-2 p-4" aria-hidden>
            {Array.from({ length: 6 }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
              <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : messes.isError ? (
          <ErrorState onRetry={() => void messes.refetch()} />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={<Search />}
            title="No messes match"
            description="Try another name, plan or subscription type."
          />
        ) : (
          <>
            <div
              className={cn(
                "w-full overflow-x-auto",
                messes.isPlaceholderData && "opacity-60",
              )}
            >
              <table className="w-full min-w-240 border-separate border-spacing-0 text-body-sm">
                <caption className="sr-only">Messes</caption>
                <thead>
                  <tr>
                    <th scope="col" className={thClass}>
                      Mess
                    </th>
                    <th scope="col" className={thClass}>
                      Plan
                    </th>
                    <th scope="col" className={thClass}>
                      Members
                    </th>
                    <th scope="col" className={thClass}>
                      Owner / manager
                    </th>
                    <th scope="col" className={cn(thClass, "text-right")}>
                      Paid
                    </th>
                    <th scope="col" className={thClass}>
                      Created
                    </th>
                    <th scope="col" className={cn(thClass, "text-right")}>
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((m) => (
                    <tr key={m.id} className="hover:bg-silver-100">
                      <td className={tdClass}>
                        <p className="font-medium text-ink">{m.name}</p>
                        <p className="font-mono text-caption text-ink-muted">
                          {m.roomCode}
                        </p>
                      </td>
                      <td className={tdClass}>
                        <div className="flex flex-col items-start gap-1">
                          <Badge
                            variant={
                              m.plan === "PRO" ? "plan-pro" : "plan-free"
                            }
                            size="sm"
                          >
                            {m.plan === "PRO" ? "Pro" : "Free"}
                          </Badge>
                          {m.plan === "PRO" && (
                            <span className="text-caption text-ink-muted">
                              {m.subscriptionType
                                ? SUBSCRIPTION_LABELS[m.subscriptionType]
                                : "Granted by admin"}
                              {" · until "}
                              {formatDate(m.planExpiresAt)}
                            </span>
                          )}
                          {m.plan === "FREE" && m.planExpiresAt && (
                            <span className="text-caption text-ink-subtle">
                              PRO ended {formatDate(m.planExpiresAt)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className={cn(
                          tdClass,
                          "whitespace-nowrap tabular-nums text-ink",
                        )}
                      >
                        {m.activeMembers} / {m.memberLimit}
                      </td>
                      <td className={tdClass}>
                        {m.owner ? (
                          <p className="text-ink">
                            {m.owner.name}
                            <span className="text-ink-muted"> · Owner</span>
                          </p>
                        ) : (
                          <p className="text-ink-subtle">No owner</p>
                        )}
                        {m.manager && m.manager.id !== m.owner?.id && (
                          <p className="text-ink">
                            {m.manager.name}
                            <span className="text-ink-muted"> · Manager</span>
                          </p>
                        )}
                      </td>
                      <td
                        className={cn(
                          tdClass,
                          "text-right font-medium whitespace-nowrap text-ink tabular-nums",
                        )}
                      >
                        {formatBDT(m.totalPaid)}
                      </td>
                      <td
                        className={cn(
                          tdClass,
                          "whitespace-nowrap text-ink-muted",
                        )}
                      >
                        {formatDate(m.createdAt)}
                      </td>
                      <td className={cn(tdClass, "text-right")}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGranting(m)}
                        >
                          <Crown />
                          {m.plan === "PRO" ? "Extend" : "Grant PRO"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {messes.data && (
              <Pagination
                meta={messes.data.meta}
                noun={["mess", "messes"]}
                onPage={setPage}
              />
            )}
          </>
        )}
      </Card>

      <GrantProDialog
        key={granting?.id ?? "none"}
        mess={granting}
        onClose={() => setGranting(null)}
      />
    </div>
  );
}
