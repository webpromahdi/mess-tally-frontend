"use client";

import {
  ChevronDown,
  LayoutDashboard,
  Loader2,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser, useLogout } from "@/hooks";
import type { User } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Dynamically extract up to 2 uppercase initials from a person's display name.
 * Handles single-word, multi-word, hyphenated, and empty names gracefully.
 */
function getInitials(name?: string | null): string {
  if (!name || !name.trim()) return "U";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export interface UserMenuProps {
  /** Optional custom class applied to the trigger element */
  className?: string;
  /** Alignment of the dropdown menu content */
  align?: "start" | "center" | "end";
  /** Optional user override; defaults to current authenticated user hook */
  user?: User | null;
}

export function UserMenu({
  className,
  align = "end",
  user: userProp,
}: UserMenuProps) {
  const router = useRouter();
  const { user: currentUser, isLoading } = useCurrentUser();
  const { mutate: logoutMutation, isPending: isLoggingOut } = useLogout();

  // Prefer explicit prop if provided, else fall back to session user
  const user = userProp !== undefined ? userProp : currentUser;

  const displayName = user?.name?.trim() || "Mahdi Hasan";
  const email = user?.email?.trim() || "alhasanmahdi6@gmail.com";
  const avatarUrl = user?.profile?.imageUrl;
  const initials = getInitials(user?.name) || "MA";

  const handleLogout = React.useCallback(() => {
    if (isLoggingOut) return;

    logoutMutation(undefined, {
      onSuccess: () => {
        router.replace("/login");
      },
      onError: () => {
        // Even if the backend session endpoint returns an error,
        // redirect to login as client auth state has been purged.
        router.replace("/login");
      },
    });
  }, [isLoggingOut, logoutMutation, router]);

  const handlePendingFeature = (featureName: string) => {
    toast.info(`${featureName} will be available in an upcoming update.`);
  };

  // Loading skeleton matching trigger dimensions to prevent layout shifts
  if (isLoading && userProp === undefined) {
    return (
      <div
        className={cn(
          "flex min-h-[44px] items-center gap-2.5 rounded-full py-1 pl-1 pr-2.5",
          className,
        )}
      >
        <span className="sr-only">Loading account profile</span>
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="hidden sm:inline-block h-4 w-24 rounded-full" />
        <Skeleton className="size-3.5 rounded-sm" />
      </div>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          disabled={isLoggingOut}
          className={cn(
            "group flex min-h-[44px] items-center gap-2 sm:gap-2.5 rounded-full py-1 pl-1 pr-2 sm:pr-3 transition-colors",
            "hover:bg-secondary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:opacity-60 disabled:cursor-not-allowed select-none",
            className,
          )}
          aria-label="User account menu"
        >
          {/* Circular avatar with image support and fallback initials */}
          <Avatar className="size-9 shrink-0 border border-border/60">
            {avatarUrl ? (
              <AvatarImage
                src={avatarUrl}
                alt={displayName}
                className="object-cover"
              />
            ) : null}
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold shadow-2xs">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* User Name displayed on >= sm screen sizes */}
          <span className="hidden sm:inline-block max-w-[140px] md:max-w-[180px] truncate text-sm font-medium text-foreground">
            {displayName}
          </span>

          {/* Smooth chevron transition that flips 180° when open */}
          <ChevronDown
            className="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        sideOffset={8}
        collisionPadding={12}
        className="w-[min(calc(100vw-1.5rem),260px)] sm:w-64 p-1.5 rounded-xl shadow-xl border-border/80 bg-card text-card-foreground"
      >
        {/* User Profile Header (Avatar + Name & Email) */}
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="size-10 shrink-0 border border-border/50">
              {avatarUrl ? (
                <AvatarImage
                  src={avatarUrl}
                  alt={displayName}
                  className="object-cover"
                />
              ) : null}
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold shadow-2xs">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-semibold text-sm text-foreground leading-tight truncate">
                {displayName}
              </span>
              <span className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                {email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1 bg-border/60" />

        {/* Existing Route: Dashboard */}
        <DropdownMenuItem
          asChild
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium text-foreground transition-colors focus:bg-accent focus:text-accent-foreground group"
        >
          <Link href="/dashboard" className="flex items-center gap-2.5 w-full">
            <LayoutDashboard className="size-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        {/* Profile Item */}
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handlePendingFeature("Profile management");
          }}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium text-foreground transition-colors focus:bg-accent focus:text-accent-foreground group"
        >
          <UserIcon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          <span>Profile</span>
        </DropdownMenuItem>

        {/* Settings Item */}
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handlePendingFeature("App settings");
          }}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium text-foreground transition-colors focus:bg-accent focus:text-accent-foreground group"
        >
          <Settings className="size-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 bg-border/60" />

        {/* Authenticated Logout Action */}
        <DropdownMenuItem
          variant="destructive"
          disabled={isLoggingOut}
          onSelect={(e) => {
            e.preventDefault();
            handleLogout();
          }}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive transition-colors"
        >
          {isLoggingOut ? (
            <Loader2
              className="size-4 animate-spin shrink-0"
              aria-hidden="true"
            />
          ) : (
            <LogOut className="size-4 shrink-0" aria-hidden="true" />
          )}
          <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
