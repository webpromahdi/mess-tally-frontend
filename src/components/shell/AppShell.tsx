"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";
import { DrawerSheet } from "@/components/shared";
import { cn } from "@/lib/utils";
import { BottomNav } from "./BottomNav";
import { MoreSheet } from "./MoreSheet";
import { SidebarContent } from "./SidebarContent";
import { TallyBotSheet } from "./TallyBotSheet";
import { Topbar } from "./Topbar";
import type { ShellProps } from "./types";

/**
 * Pattern B application shell (Design.md §6.5, responsive.md §7B):
 * ≥1024px persistent 256px sidebar (collapsible to a 64px rail);
 * <1024px hamburger drawer min(85vw, 320px) + fixed bottom nav.
 */
export function AppShell({
  user,
  mess,
  month,
  months,
  selectedMonthKey,
  onSelectMonth,
  pendingCount,
  active = "dashboard",
  pageTitle,
  initialDrawerOpen,
  initialMoreOpen,
  children,
}: ShellProps & { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(!!initialDrawerOpen);
  const [more, setMore] = useState(!!initialMoreOpen);
  const [bot, setBot] = useState(false);

  const closeDrawer = useCallback(() => setDrawer(false), []);
  const closeMore = useCallback(() => setMore(false), []);
  const closeBot = useCallback(() => setBot(false), []);

  // Crossing the 1024px split closes the mobile-only overlays.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => {
      if (mq.matches) {
        setDrawer(false);
        setMore(false);
      }
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const badge = user.isManager ? pendingCount : null;

  return (
    <div className="min-h-dvh bg-canvas">
      <button
        type="button"
        onClick={() => document.getElementById("main")?.focus()}
        className="sr-only rounded-lg bg-aubergine-800 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60"
      >
        Skip to content
      </button>

      <aside
        aria-label="Sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden bg-aubergine-800 transition-[width] duration-200 ease-out-soft lg:block",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <SidebarContent
          user={user}
          mess={mess}
          pendingCount={pendingCount}
          active={active}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          onOpenBot={() => setBot(true)}
        />
      </aside>

      <div
        className={cn(
          "min-w-0 transition-[padding] duration-200 ease-out-soft",
          collapsed ? "lg:pl-16" : "lg:pl-64",
        )}
      >
        <Topbar
          mess={mess}
          month={month}
          months={months}
          selectedMonthKey={selectedMonthKey}
          onSelectMonth={onSelectMonth}
          pageTitle={pageTitle}
          drawerOpen={drawer}
          onOpenDrawer={() => setDrawer(true)}
          onOpenBot={() => setBot(true)}
        />
        <main
          id="main"
          tabIndex={-1}
          className="pb-bottom-nav mx-auto w-full max-w-7xl min-w-0 px-4 pt-5 outline-none sm:px-6 sm:pt-6 lg:px-8 lg:pt-8 lg:pb-12"
        >
          {children}
        </main>
      </div>

      <BottomNav
        active={active}
        moreOpen={more}
        onMore={() => setMore(true)}
        badge={badge}
      />

      <DrawerSheet
        open={drawer}
        onClose={closeDrawer}
        side="left"
        title="Navigation"
        hideTitle
        showClose={false}
        className="bg-aubergine-800 lg:hidden"
      >
        <SidebarContent
          user={user}
          mess={mess}
          pendingCount={pendingCount}
          active={active}
          onClose={closeDrawer}
          onNavigate={closeDrawer}
          onOpenBot={() => {
            setDrawer(false);
            setBot(true);
          }}
        />
      </DrawerSheet>
      <MoreSheet open={more} onClose={closeMore} mess={mess} badge={badge} />
      <TallyBotSheet open={bot} onClose={closeBot} />
    </div>
  );
}
