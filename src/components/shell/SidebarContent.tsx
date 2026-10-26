"use client";

import { PanelLeftClose, PanelLeftOpen, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { Logo, LogoMark } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessSwitcher } from "./MessSwitcher";
import { messNav, type NavItem, primaryNav } from "./nav";
import { ProfileMenu } from "./ProfileMenu";
import type { NavKey, ShellProps } from "./types";

function NavButton({
  item,
  active,
  collapsed,
  badge,
  onClick,
}: {
  item: Pick<NavItem, "label" | "icon" | "href">;
  active: boolean;
  collapsed?: boolean;
  badge?: number | null;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      aria-label={
        collapsed
          ? badge
            ? `${item.label}, ${badge} pending`
            : item.label
          : undefined
      }
      title={collapsed ? item.label : undefined}
      className={cn(
        "relative flex h-11 w-full cursor-pointer items-center gap-3 rounded-xl text-body font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marigold-400",
        collapsed ? "justify-center px-0" : "px-3",
        active
          ? "bg-marigold-500 font-semibold text-aubergine-950"
          : "text-white/75 hover:bg-white/10 hover:text-white",
      )}
    >
      <Icon className="size-5 shrink-0" />
      {!collapsed && (
        <span className="flex-1 truncate text-left">{item.label}</span>
      )}
      {!!badge && (
        <span
          className={cn(
            "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-caption font-bold tabular-nums",
            active
              ? "bg-aubergine-900 text-white"
              : "bg-marigold-500 text-aubergine-950",
            collapsed && "absolute top-0.5 right-0.5 min-w-4 px-1",
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

function AssistantButton({
  collapsed,
  onClick,
}: {
  collapsed?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={collapsed ? "TallyBot" : undefined}
      title={collapsed ? "TallyBot" : undefined}
      className={cn(
        "relative flex h-11 w-full cursor-pointer items-center gap-3 rounded-xl text-body font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marigold-400",
        collapsed ? "justify-center px-0" : "px-3",
        "text-white/75 hover:bg-white/10 hover:text-white",
      )}
    >
      <Sparkles className="size-5 shrink-0 text-marigold-400" />
      {!collapsed && (
        <span className="flex-1 truncate text-left">TallyBot</span>
      )}
    </button>
  );
}

function GroupLabel({
  children,
  collapsed,
}: {
  children: string;
  collapsed?: boolean;
}) {
  if (collapsed)
    return <div aria-hidden className="mx-auto my-3 h-px w-6 bg-white/10" />;
  return (
    <p className="px-3 pt-5 pb-1.5 text-caption font-semibold tracking-widest text-white/45 uppercase">
      {children}
    </p>
  );
}

/** Shared by the desktop sidebar and the mobile off-canvas drawer (Design.md §11.1). */
export function SidebarContent({
  user,
  mess,
  pendingCount,
  active = "dashboard",
  collapsed,
  onToggleCollapse,
  onClose,
  onNavigate,
  onOpenBot,
}: Pick<ShellProps, "user" | "mess" | "pendingCount" | "active"> & {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onClose?: () => void;
  onNavigate?: (key: NavKey) => void;
  onOpenBot?: () => void;
}) {
  const badge = user.isManager ? pendingCount : null;
  return (
    <div className="flex h-full min-h-0 flex-col text-white">
      <div
        className={cn(
          "flex h-16 shrink-0 items-center gap-2",
          collapsed ? "justify-center px-2" : "pr-2 pl-5",
        )}
      >
        {collapsed ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            title="Expand sidebar"
            className="group inline-flex size-11 cursor-pointer items-center justify-center rounded-xl hover:bg-white/10 focus-visible:outline-2 focus-visible:marigold-400"
          >
            <LogoMark inverse className="group-hover:hidden" />
            <PanelLeftOpen className="hidden size-5 text-white/80 group-hover:block" />
          </button>
        ) : (
          <Link href="/" className="flex-1">
            <Logo inverse />
          </Link>
        )}
        {onToggleCollapse && !collapsed && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className="text-white/70 hover:bg-white/10 hover:text-white"
          >
            <PanelLeftClose />
          </Button>
        )}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close navigation"
            className="text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X />
          </Button>
        )}
      </div>

      <div
        className={cn(
          "shrink-0",
          collapsed ? "flex justify-center px-2" : "px-3",
        )}
      >
        <MessSwitcher mess={mess} collapsed={collapsed} />
      </div>

      <nav
        aria-label="Main"
        className={cn(
          "mt-1 min-h-0 flex-1 overflow-y-auto pb-4",
          collapsed ? "px-2.5" : "px-3",
        )}
      >
        <GroupLabel collapsed={collapsed}>Workspace</GroupLabel>
        <div className="flex flex-col gap-1">
          {primaryNav.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              active={item.key === active}
              collapsed={collapsed}
              onClick={() => onNavigate?.(item.key)}
            />
          ))}
        </div>
        <GroupLabel collapsed={collapsed}>Mess</GroupLabel>
        <div className="flex flex-col gap-1">
          {messNav.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              active={item.key === active}
              collapsed={collapsed}
              badge={item.key === "members" ? badge : null}
              onClick={() => onNavigate?.(item.key)}
            />
          ))}
        </div>
        <GroupLabel collapsed={collapsed}>Assistant</GroupLabel>
        <AssistantButton collapsed={collapsed} onClick={onOpenBot} />
      </nav>

      <div
        className={cn(
          "shrink-0 border-t border-white/10 p-3",
          collapsed && "flex justify-center px-2",
        )}
      >
        <ProfileMenu user={user} collapsed={collapsed} />
      </div>
    </div>
  );
}
