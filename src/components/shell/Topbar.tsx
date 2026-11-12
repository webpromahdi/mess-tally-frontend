"use client";

import { ChevronRight, Menu } from "lucide-react";
import { Logo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { MonthSelector } from "./MonthSelector";
import type { ShellProps } from "./types";

/**
 * ≥1024px: breadcrumb · month selector.
 * <1024px: [☰] [Logo] [Month ▾] (Design.md §11.2). TallyBot is the floating button.
 */
export function Topbar({
  mess,
  month,
  months,
  selectedMonthKey,
  onSelectMonth,
  pageTitle = "Dashboard",
  drawerOpen,
  onOpenDrawer,
}: Pick<
  ShellProps,
  | "mess"
  | "month"
  | "months"
  | "selectedMonthKey"
  | "onSelectMonth"
  | "pageTitle"
> & {
  drawerOpen: boolean;
  onOpenDrawer: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="flex h-16 items-center gap-1.5 px-2 sm:px-4 lg:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={drawerOpen}
          onClick={onOpenDrawer}
        >
          <Menu className="size-5!" />
        </Button>
        <Logo
          className="min-w-0 lg:hidden"
          wordmarkClassName="hidden xs:inline"
        />

        <nav
          aria-label="Breadcrumb"
          className="hidden min-w-0 items-center gap-1.5 text-body-sm lg:flex"
        >
          <span className="truncate text-ink-muted">{mess.name}</span>
          <ChevronRight className="size-4 shrink-0 text-ink-subtle" />
          <span aria-current="page" className="font-semibold text-ink">
            {pageTitle}
          </span>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <MonthSelector
            month={month}
            months={months}
            selectedKey={selectedMonthKey}
            onSelectMonth={onSelectMonth}
          />
        </div>
      </div>
    </header>
  );
}
