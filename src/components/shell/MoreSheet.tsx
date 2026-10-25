"use client";

import { ArrowLeftRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { DrawerSheet } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { messNav, primaryNav } from "./nav";
import type { ShellMess } from "./types";

/** "More" bottom sheet: Summary, Members, Settings, Switch Mess (Design.md §11.2). */
export function MoreSheet({
  open,
  onClose,
  mess,
  badge,
}: {
  open: boolean;
  onClose: () => void;
  mess: ShellMess;
  badge?: number | null;
}) {
  const rows = [
    {
      ...primaryNav[4],
      hint: "Per-member balances and who pays whom",
      badge: null,
    },
    { ...messNav[0], hint: "Flatmates, roles and join requests", badge },
    { ...messNav[1], hint: "Mess, month and profile settings", badge: null },
    {
      key: "switch",
      label: "Switch Mess",
      href: "/onboarding",
      icon: ArrowLeftRight,
      hint: `Current: ${mess.name}`,
      badge: null,
    },
  ];

  return (
    <DrawerSheet
      open={open}
      onClose={onClose}
      side="bottom"
      title="More"
      hideTitle
      showClose={false}
      className="bg-surface lg:hidden"
    >
      <div
        className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-gray-300"
        aria-hidden
      />
      <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-2">
        <p className="text-h3 text-ink">More</p>
        <Badge variant="plan-free" size="sm" className="min-w-0 truncate">
          {mess.name}
        </Badge>
      </div>
      <ul className="pb-safe overflow-y-auto px-3">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <li key={r.key}>
              <Link
                href={r.href}
                onClick={onClose}
                className={cn(
                  "flex min-h-16 w-full cursor-pointer items-center gap-3 rounded-2xl px-2 text-left transition-colors hover:bg-aubergine-50",
                  "focus-visible:outline-2 focus-visible:outline-aubergine-500",
                )}
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-aubergine-100 text-aubergine-800">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-body-lg font-semibold text-ink">
                    {r.label}
                    {!!r.badge && (
                      <Badge variant="status-pending" size="sm">
                        {r.badge} pending
                      </Badge>
                    )}
                  </span>
                  <span className="block truncate text-body-sm text-ink-muted">
                    {r.hint}
                  </span>
                </span>
                <ChevronRight className="size-5 shrink-0 text-ink-subtle" />
              </Link>
            </li>
          );
        })}
      </ul>
    </DrawerSheet>
  );
}
