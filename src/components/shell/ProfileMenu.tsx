"use client";

import { Ellipsis, Loader2, LogOut, Settings, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SimpleDropdown,
  SimpleMenuItem,
  SimpleMenuSeparator,
} from "@/components/shared";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  initials,
} from "@/components/ui/avatar";
import { useLogout } from "@/hooks";
import { cn } from "@/lib/utils";
import type { ShellUser } from "./types";

/** Sidebar footer profile with explicit role subtitle (Design.md §11.1). */
export function ProfileMenu({
  user,
  collapsed,
}: {
  user: ShellUser;
  collapsed?: boolean;
}) {
  const router = useRouter();
  const logout = useLogout();
  // Full reload: useLogout already cleared the cache, and a client-side hop
  // would let the dashboard refetch and bounce to /login?expired=1.
  const signOut = () =>
    logout.mutate(undefined, {
      onSettled: () => window.location.replace("/login"),
    });
  return (
    <SimpleDropdown
      side="top"
      className="w-56"
      trigger={(p) => (
        <button
          {...p}
          type="button"
          aria-label={`Account menu for ${user.name}, ${user.roleLabel}`}
          className={cn(
            "flex w-full cursor-pointer items-center gap-3 rounded-xl text-left transition-colors hover:bg-white/10",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marigold-400",
            collapsed ? "size-11 justify-center" : "min-h-12 p-2",
          )}
        >
          <Avatar aria-hidden="true" size="sm">
            {user.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt="" />
            ) : null}
            <AvatarFallback className="bg-marigold-500 text-aubergine-950">
              {initials(user.name)}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-body-sm font-semibold text-white">
                  {user.name}
                </span>
                <span className="block truncate text-caption text-white/60">
                  {user.roleLabel}
                </span>
              </span>
              <Ellipsis className="size-4 shrink-0 text-white/60" />
            </>
          )}
        </button>
      )}
    >
      {(close) => (
        <>
          <div className="px-2.5 py-2">
            <p className="truncate text-body-sm font-semibold text-ink">
              {user.name}
            </p>
            <p className="text-caption text-ink-subtle">{user.roleLabel}</p>
          </div>
          <SimpleMenuSeparator />
          <SimpleMenuItem
            onClick={() => {
              close();
              router.push("/dashboard/profile");
            }}
          >
            <UserRound />
            Profile
          </SimpleMenuItem>
          <SimpleMenuItem
            onClick={() => {
              close();
              router.push("/dashboard/settings");
            }}
          >
            <Settings />
            Settings
          </SimpleMenuItem>
          <SimpleMenuSeparator />
          <SimpleMenuItem
            onClick={signOut}
            disabled={logout.isPending}
            aria-busy={logout.isPending}
            className="text-error [&_svg]:text-error disabled:cursor-wait disabled:opacity-70"
          >
            {logout.isPending ? <Loader2 className="animate-spin" /> : <LogOut />}
            {logout.isPending ? "Signing out…" : "Sign out"}
          </SimpleMenuItem>
        </>
      )}
    </SimpleDropdown>
  );
}
