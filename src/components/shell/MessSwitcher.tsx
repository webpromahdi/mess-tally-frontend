"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  SimpleDropdown,
  SimpleMenuItem,
  SimpleMenuLabel,
  SimpleMenuSeparator,
} from "@/components/shared";
import { cn } from "@/lib/utils";
import type { ShellMess } from "./types";

const otherMesses = ["Dhanmondi Bachelors"];

/** Active mess pill in the sidebar (Design.md §11.1). */
export function MessSwitcher({
  mess,
  collapsed,
}: {
  mess: ShellMess;
  collapsed?: boolean;
}) {
  return (
    <SimpleDropdown
      className="w-64"
      trigger={(p) => (
        <button
          {...p}
          type="button"
          aria-label={`Switch mess. Current: ${mess.name}`}
          className={cn(
            "flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 text-left transition-colors hover:bg-white/10",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marigold-400",
            collapsed ? "size-11 justify-center p-0" : "min-h-12 p-2",
          )}
        >
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-marigold-500 text-label font-bold text-aubergine-950">
            {mess.name[0]}
          </span>
          {!collapsed && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-body-sm font-semibold text-white">
                  {mess.name}
                </span>
                <span className="block text-caption text-white/60">
                  {mess.plan === "FREE" ? "Free plan" : "Pro plan"}
                </span>
              </span>
              <ChevronsUpDown className="size-4 shrink-0 text-white/60" />
            </>
          )}
        </button>
      )}
    >
      {(close) => (
        <>
          <SimpleMenuLabel>Your messes</SimpleMenuLabel>
          <SimpleMenuItem onClick={close} aria-current="true">
            <span className="inline-flex size-6 items-center justify-center rounded-md bg-marigold-500 text-caption font-bold text-aubergine-950">
              {mess.name[0]}
            </span>
            <span className="flex-1 truncate">{mess.name}</span>
            <Check className="text-aubergine-800!" />
          </SimpleMenuItem>
          {otherMesses.map((m) => (
            <SimpleMenuItem key={m} onClick={close}>
              <span className="inline-flex size-6 items-center justify-center rounded-md bg-aubergine-100 text-caption font-bold text-aubergine-800">
                {m[0]}
              </span>
              <span className="flex-1 truncate">{m}</span>
            </SimpleMenuItem>
          ))}
          <SimpleMenuSeparator />
          <SimpleMenuItem onClick={close}>
            <Plus />
            Create or join a mess
          </SimpleMenuItem>
        </>
      )}
    </SimpleDropdown>
  );
}
