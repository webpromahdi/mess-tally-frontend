"use client";

import {
  AlarmClock,
  Building2,
  Crown,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  UserX,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { StatCard } from "@/components/dashboard/cards";
import { ErrorState } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { useAdminOverview } from "@/hooks";
import { formatBDT } from "@/lib/format";
import { PageTitle } from "./admin-ui";

export function AdminOverview() {
  const overview = useAdminOverview();
  const data = overview.data?.data;

  return (
    <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
      <PageTitle
        title="Overview"
        description="Platform-wide users, messes and subscription revenue."
      />

      {overview.isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-hidden>
          {Array.from({ length: 8 }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
            <div key={i} className="h-32 animate-pulse rounded-xl bg-surface" />
          ))}
        </div>
      ) : !data ? (
        <Card>
          <ErrorState onRetry={() => void overview.refetch()} />
        </Card>
      ) : (
        <>
          <section
            aria-label="Revenue"
            className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6"
          >
            <StatCard
              label="Revenue this month"
              value={formatBDT(data.revenue.thisMonth)}
              hint="Net of refunds, bKash payments only"
              icon={<TrendingUp />}
              tone="marigold"
            />
            <StatCard
              label="Revenue all time"
              value={formatBDT(data.revenue.allTime)}
              hint={
                <Link
                  href="/admin/revenue"
                  className="font-medium text-aubergine-800 hover:underline"
                >
                  View revenue report →
                </Link>
              }
              icon={<Wallet />}
              tone="marigold"
            />
          </section>

          <section
            aria-label="Users"
            className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6 xl:grid-cols-4"
          >
            <StatCard
              label="Total users"
              value={String(data.users.total)}
              icon={<Users />}
              hint="Excludes deleted accounts"
            />
            <StatCard
              label="Active users"
              value={String(data.users.active)}
              icon={<UserCheck />}
            />
            <StatCard
              label="Suspended"
              value={String(data.users.suspended)}
              icon={<UserX />}
              hint="Blocked from signing in"
            />
            <StatCard
              label="New this month"
              value={String(data.users.newThisMonth)}
              icon={<UserPlus />}
            />
          </section>

          <section
            aria-label="Messes"
            className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6 xl:grid-cols-4"
          >
            <StatCard
              label="Total messes"
              value={String(data.messes.total)}
              icon={<Building2 />}
            />
            <StatCard
              label="PRO messes"
              value={String(data.messes.pro)}
              icon={<Crown />}
              tone="marigold"
            />
            <StatCard
              label="Free messes"
              value={String(data.messes.free)}
              icon={<Building2 />}
            />
            <StatCard
              label="PRO expiring in 7 days"
              value={String(data.messes.proExpiringIn7Days)}
              icon={<AlarmClock />}
              hint={
                <Link
                  href="/admin/messes"
                  className="font-medium text-aubergine-800 hover:underline"
                >
                  Review PRO messes →
                </Link>
              }
            />
          </section>
        </>
      )}
    </div>
  );
}
