"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import type { NavKey, ShellProps } from "@/components/shell/types";
import { dashboardFixtures } from "@/fixtures/dashboard.fixtures";

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
  const current = routeConfig[pathname] ?? {
    key: "dashboard" as NavKey,
    title: "Dashboard",
  };

  const defaultFixture = dashboardFixtures.manager;

  const shellProps: ShellProps = {
    user: {
      name: defaultFixture.viewer.name,
      roleLabel: "Owner · Manager",
      isManager: defaultFixture.viewer.isManager,
    },
    mess: {
      name: defaultFixture.mess.name,
      plan: defaultFixture.mess.plan,
    },
    month: defaultFixture.month
      ? {
          label: defaultFixture.month.label,
          status: defaultFixture.month.status,
        }
      : null,
    pendingCount: defaultFixture.pendingCount,
    active: current.key,
    pageTitle: current.title,
  };

  return <AppShell {...shellProps}>{children}</AppShell>;
}
