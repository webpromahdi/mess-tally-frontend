"use client";

import { Ellipsis, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { bottomNav } from "./nav";
import type { NavKey } from "./types";

function Item({
  label,
  icon: Icon,
  active,
  href,
  onClick,
  expanded,
  badge,
}: {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  href?: string;
  onClick?: () => void;
  expanded?: boolean;
  badge?: number | null;
}) {
  const content = (
    <>
      {active && (
        <span
          aria-hidden
          className="absolute top-0 h-1 w-8 rounded-b-full bg-marigold-500"
        />
      )}
      <span className="relative">
        <Icon className={cn("size-5", active && "stroke-[2.25]")} />
        {!!badge && (
          <span className="absolute -top-1.5 -right-2.5 inline-flex min-w-4 items-center justify-center rounded-full bg-marigold-500 px-1 text-caption leading-4 font-bold text-aubergine-950">
            {badge}
          </span>
        )}
      </span>
      <span className="max-w-full truncate">{label}</span>
    </>
  );

  const className = cn(
    "relative flex min-h-11 min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl text-caption font-semibold transition-colors",
    "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aubergine-500",
    active ? "text-aubergine-800" : "text-ink-muted hover:text-ink",
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        aria-label={badge ? `${label}, ${badge} pending` : undefined}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      aria-expanded={expanded}
      aria-label={badge ? `${label}, ${badge} pending` : undefined}
      className={className}
    >
      {content}
    </button>
  );
}

/** Fixed bottom navigation below 1024px with 5 thumb targets (Design.md §11.2). */
export function BottomNav({
  active,
  moreOpen,
  onMore,
  badge,
}: {
  active: NavKey;
  moreOpen: boolean;
  onMore: () => void;
  badge?: number | null;
}) {
  const moreActive = !bottomNav.some((i) => i.key === active);
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 h-bottom-nav border-t border-line bg-surface/95 backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex h-16 max-w-xl items-stretch px-1">
        {bottomNav.map((item) => (
          <Item
            key={item.key}
            label={item.label}
            icon={item.icon}
            href={item.href}
            active={item.key === active}
          />
        ))}
        <Item
          label="More"
          icon={Ellipsis}
          active={moreActive}
          expanded={moreOpen}
          onClick={onMore}
          badge={badge}
        />
      </div>
    </nav>
  );
}
