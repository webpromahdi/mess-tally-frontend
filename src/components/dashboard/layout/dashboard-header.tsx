import { Lock, Plus, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { Badge, StatusDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { viewerRoleLabel } from "@/lib/mappers/dashboard.mapper";
import type { DashboardData } from "@/lib/types/dashboard.types";

export const roleLabel = viewerRoleLabel;

/** Greeting + scope line + manager quick actions (hidden for members and closed months, §12.6). */
export function DashboardHeader({ data }: { data: DashboardData }) {
  const { viewer, mess, month } = data;
  const canEdit = viewer.isManager && month?.status === "ACTIVE";
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={viewer.isManager ? "role-manager" : "role-member"}
            size="sm"
          >
            {roleLabel(viewer)}
          </Badge>
          {month && (
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
              {month.status === "ACTIVE" ? "Month active" : "Month closed"}
            </Badge>
          )}
        </div>
        <h1 className="mt-2 text-h2 text-ink sm:text-h1">
          Good evening, {viewer.firstName}
        </h1>
        <p className="mt-1 text-body text-ink-muted">
          {month
            ? `Here’s where ${mess.name} stands for ${month.longLabel}.`
            : `${mess.name} doesn’t have an open meal month right now.`}
        </p>
      </div>
      {canEdit && (
        <div className="flex gap-2">
          <Button variant="outline" asChild className="flex-1 sm:flex-none">
            <Link href="/dashboard/meals">
              <Plus />
              Add Meals
            </Link>
          </Button>
          <Button variant="accent" asChild className="flex-1 sm:flex-none">
            <Link href="/dashboard/bazar">
              <ShoppingBasket />
              Add Bazar Trip
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
