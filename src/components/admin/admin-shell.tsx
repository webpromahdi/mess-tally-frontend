"use client";

import { BarChart3, Building2, LayoutGrid, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { BrandLogo, ErrorState, UserMenu } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { useGetMe } from "@/hooks";
import { isAuthError } from "@/lib/apiError";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/admin", label: "Overview", icon: LayoutGrid },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/messes", label: "Messes", icon: Building2 },
  { href: "/admin/revenue", label: "Revenue", icon: BarChart3 },
];

export const isStaffRole = (role?: string | null) =>
  role === "ADMIN" || role === "SUPERADMIN";

/**
 * Admin area chrome + client-side role guard. The guard is UX only: every
 * `/admin/*` endpoint is enforced by `auth(ADMIN, SUPERADMIN)` on the backend.
 */
export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const me = useGetMe();
  const role = me.data?.data?.role;
  const allowed = isStaffRole(role);

  useEffect(() => {
    if (me.isError && isAuthError(me.error)) {
      router.replace(
        `/login?redirect=${encodeURIComponent(pathname)}&expired=1`,
      );
    } else if (me.isSuccess && !allowed) {
      router.replace("/dashboard");
    }
  }, [me.isError, me.error, me.isSuccess, allowed, pathname, router]);

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="MessTally admin home"
          >
            <BrandLogo variant="auto" className="h-9 w-auto" />
            <Badge variant="role-owner" size="sm">
              {role === "SUPERADMIN" ? "Super admin" : "Admin"}
            </Badge>
          </Link>
          <UserMenu />
        </div>
        <nav
          aria-label="Admin sections"
          className="mx-auto flex w-full max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8"
        >
          {tabs.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 border-b-2 px-3 text-body-sm font-medium transition-colors",
                  active
                    ? "border-aubergine-800 text-aubergine-800"
                    : "border-transparent text-ink-muted hover:text-ink",
                )}
              >
                <Icon aria-hidden className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {allowed ? (
          children
        ) : me.isError && !isAuthError(me.error) ? (
          <ErrorState
            variant="page"
            title="Couldn't check your access"
            description="Check your connection and try again."
            onRetry={() => void me.refetch()}
          />
        ) : (
          <div className="flex flex-col gap-4" aria-hidden>
            <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
            <div className="h-64 animate-pulse rounded-xl bg-surface" />
          </div>
        )}
      </main>
    </div>
  );
}
