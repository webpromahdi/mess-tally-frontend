"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { ErrorState } from "@/components/shared";
import { AppShell, ShellSkeleton } from "@/components/shell";
import type { NavKey, ShellProps } from "@/components/shell/types";
import { useWorkspace } from "@/hooks";
import { isAuthError, isNoMembershipError } from "@/lib/apiError";
import { monthLabel } from "@/lib/dates";
import { viewerRoleLabel } from "@/lib/mappers/dashboard.mapper";
import { useMonthStore } from "@/store";

const routeConfig: Record<string, { key: NavKey; title: string }> = {
  "/dashboard": { key: "dashboard", title: "Dashboard" },
  "/dashboard/meals": { key: "meals", title: "Daily Meals" },
  "/dashboard/bazar": { key: "bazar", title: "Bazar Expenses" },
  "/dashboard/utilities": { key: "utility", title: "Utility Fund" },
  "/dashboard/summary": { key: "summary", title: "Monthly Summary" },
  "/dashboard/members": { key: "members", title: "Members & Roles" },
  "/dashboard/settings": { key: "settings", title: "Settings" },
};

export function DashboardShellWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const selectedMonth = useMonthStore((s) => s.selectedMonth);
  const setSelectedMonth = useMonthStore((s) => s.setSelectedMonth);
  const workspace = useWorkspace(selectedMonth);

  const current = routeConfig[pathname] ?? {
    key: "dashboard" as NavKey,
    title: "Dashboard",
  };

  // Session / membership failures are terminal for the dashboard shell.
  useEffect(() => {
    if (!workspace.identityError) return;
    if (isAuthError(workspace.identityError)) {
      router.replace(
        `/login?redirect=${encodeURIComponent(pathname)}&expired=1`,
      );
    } else if (isNoMembershipError(workspace.identityError)) {
      router.replace("/onboarding");
    }
  }, [workspace.identityError, pathname, router]);

  // A FREE downgrade (or a deleted month) can drop a previously selected key.
  useEffect(() => {
    if (!selectedMonth || !workspace.queries.months.isSuccess) return;
    if (!workspace.months.some((m) => m.name === selectedMonth)) {
      setSelectedMonth(null);
    }
  }, [
    selectedMonth,
    workspace.months,
    workspace.queries.months.isSuccess,
    setSelectedMonth,
  ]);

  if (workspace.identityLoading && !workspace.viewer) {
    return <ShellSkeleton />;
  }

  if (!workspace.viewer || !workspace.mess) {
    if (
      workspace.identityError &&
      (isAuthError(workspace.identityError) ||
        isNoMembershipError(workspace.identityError))
    ) {
      return <ShellSkeleton />;
    }
    return (
      <div className="flex min-h-dvh items-center justify-center bg-canvas px-4">
        <ErrorState
          variant="page"
          title="Couldn't load your mess"
          description="We couldn't load your workspace. Check your connection and try again."
          onRetry={() => void workspace.refetch()}
        />
      </div>
    );
  }

  const months = workspace.months.map((m) => ({
    key: m.name,
    label: monthLabel(m.name),
    status: m.status,
  }));
  const currentMonthKey =
    workspace.months.find((m) => m.isCurrent)?.name ??
    workspace.month?.key ??
    null;

  const shellProps: ShellProps = {
    user: {
      name: workspace.viewer.name,
      roleLabel: viewerRoleLabel(workspace.viewer),
      isManager: workspace.viewer.isManager,
    },
    mess: {
      name: workspace.mess.name,
      plan: workspace.mess.plan,
    },
    month: workspace.month
      ? {
          key: workspace.month.key,
          label: workspace.month.label,
          status: workspace.month.status,
        }
      : null,
    months,
    selectedMonthKey: selectedMonth ?? currentMonthKey,
    onSelectMonth: (key) =>
      setSelectedMonth(key === currentMonthKey ? null : key),
    pendingCount: workspace.pendingCount,
    active: current.key,
    pageTitle: current.title,
  };

  return <AppShell {...shellProps}>{children}</AppShell>;
}
