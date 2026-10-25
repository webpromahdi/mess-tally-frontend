import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardShellWrapper } from "./dashboard-shell-wrapper";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "MessTally overview and meal accounting dashboard",
};

export default function DashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardShellWrapper>{children}</DashboardShellWrapper>;
}
