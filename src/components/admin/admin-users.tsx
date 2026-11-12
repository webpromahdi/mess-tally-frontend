"use client";

import { Search, ShieldCheck, ShieldOff, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmSheet } from "@/components/members/dialogs/confirm-sheet";
import {
  EmptyState,
  ErrorState,
  Field,
  NativeSelect,
} from "@/components/shared";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useAdminUsers,
  useGetMe,
  useUpdateAdminUserRole,
  useUpdateAdminUserStatus,
} from "@/hooks";
import { getApiMessage } from "@/lib/apiError";
import { formatDate } from "@/lib/dates";
import type {
  AdminUser,
  AdminUserRole,
  AdminUserStatus,
} from "@/lib/types/admin.types";
import { cn } from "@/lib/utils";
import {
  PageTitle,
  Pagination,
  tdClass,
  thClass,
  useDebouncedValue,
} from "./admin-ui";

type PendingAction =
  | { kind: "status"; user: AdminUser; status: "ACTIVE" | "SUSPENDED" }
  | { kind: "role"; user: AdminUser; role: "USER" | "ADMIN" };

const roleLabel: Record<AdminUserRole, string> = {
  USER: "User",
  ADMIN: "Admin",
  SUPERADMIN: "Super admin",
};

const statusVariant = (status: AdminUserStatus) =>
  status === "ACTIVE"
    ? "status-active"
    : status === "SUSPENDED"
      ? "status-rejected"
      : "status-pending";

export function AdminUsers() {
  const me = useGetMe().data?.data;
  const [search, setSearch] = useState("");
  const [mess, setMess] = useState("");
  const [role, setRole] = useState<AdminUserRole | "">("");
  const [status, setStatus] = useState<AdminUserStatus | "">("");
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState<PendingAction | null>(null);

  const filters = {
    search: useDebouncedValue(search.trim()),
    mess: useDebouncedValue(mess.trim()),
    role,
    status,
    page,
  };
  const users = useAdminUsers(filters);
  const updateStatus = useUpdateAdminUserStatus();
  const updateRole = useUpdateAdminUserRole();
  const busy = updateStatus.isPending || updateRole.isPending;

  const resetPage =
    <T,>(set: (v: T) => void) =>
    (v: T) => {
      set(v);
      setPage(1);
    };

  // Mirrors the backend rules so we only offer actions that will succeed.
  const canChangeStatus = (u: AdminUser) =>
    u.id !== me?.id &&
    u.role !== "SUPERADMIN" &&
    (u.role !== "ADMIN" || me?.role === "SUPERADMIN");
  const canChangeRole = (u: AdminUser) =>
    me?.role === "SUPERADMIN" && u.id !== me.id && u.role !== "SUPERADMIN";

  const confirm = async () => {
    if (!pending) return;
    try {
      if (pending.kind === "status") {
        await updateStatus.mutateAsync({
          id: pending.user.id,
          status: pending.status,
        });
        toast.success(
          pending.status === "SUSPENDED"
            ? `${pending.user.name} is suspended.`
            : `${pending.user.name} is active again.`,
        );
      } else {
        await updateRole.mutateAsync({
          id: pending.user.id,
          role: pending.role,
        });
        toast.success(
          pending.role === "ADMIN"
            ? `${pending.user.name} is now an admin.`
            : `${pending.user.name} is no longer an admin.`,
        );
      }
      setPending(null);
    } catch (error) {
      toast.error(getApiMessage(error, "Couldn't update this user."));
    }
  };

  const rows = users.data?.data ?? [];

  return (
    <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
      <PageTitle
        title="Users"
        description="Every account on MessTally, with platform role, status and mess memberships."
      />

      <Card className="gap-0 overflow-hidden py-0">
        <div className="grid gap-3 border-b border-line p-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Name or email">
            <Input
              type="search"
              placeholder="Search users"
              value={search}
              onChange={(e) => resetPage(setSearch)(e.target.value)}
            />
          </Field>
          <Field label="Mess">
            <Input
              type="search"
              placeholder="Search by mess name"
              value={mess}
              onChange={(e) => resetPage(setMess)(e.target.value)}
            />
          </Field>
          <Field label="Role">
            <NativeSelect
              value={role}
              onChange={(e) =>
                resetPage(setRole)(e.target.value as AdminUserRole | "")
              }
            >
              <option value="">All roles</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPERADMIN">Super admin</option>
            </NativeSelect>
          </Field>
          <Field label="Status">
            <NativeSelect
              value={status}
              onChange={(e) =>
                resetPage(setStatus)(e.target.value as AdminUserStatus | "")
              }
            >
              <option value="">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DELETED">Deleted</option>
            </NativeSelect>
          </Field>
        </div>

        {users.isPending ? (
          <div className="flex flex-col gap-2 p-4" aria-hidden>
            {Array.from({ length: 6 }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
              <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : users.isError ? (
          <ErrorState onRetry={() => void users.refetch()} />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={<Search />}
            title="No users match"
            description="Try another name, email or mess."
          />
        ) : (
          <>
            <div
              className={cn(
                "w-full overflow-x-auto",
                users.isPlaceholderData && "opacity-60",
              )}
            >
              <table className="w-full min-w-215 border-separate border-spacing-0 text-body-sm">
                <caption className="sr-only">Users</caption>
                <thead>
                  <tr>
                    <th scope="col" className={thClass}>
                      User
                    </th>
                    <th scope="col" className={thClass}>
                      Role
                    </th>
                    <th scope="col" className={thClass}>
                      Status
                    </th>
                    <th scope="col" className={thClass}>
                      Messes
                    </th>
                    <th scope="col" className={thClass}>
                      Joined
                    </th>
                    <th scope="col" className={cn(thClass, "text-right")}>
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((u) => (
                    <tr key={u.id} className="hover:bg-silver-100">
                      <td className={tdClass}>
                        <div className="flex items-center gap-3">
                          <Avatar name={u.name} size="sm" />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-ink">
                              {u.name}
                              {u.id === me?.id && (
                                <span className="ml-1 text-ink-subtle">
                                  (you)
                                </span>
                              )}
                            </p>
                            <p className="truncate text-ink-muted">{u.email}</p>
                            {u.phone && (
                              <p className="text-caption text-ink-subtle">
                                {u.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className={tdClass}>
                        <Badge
                          variant={
                            u.role === "USER" ? "role-member" : "role-owner"
                          }
                          size="sm"
                        >
                          {roleLabel[u.role]}
                        </Badge>
                      </td>
                      <td className={tdClass}>
                        <div className="flex flex-col items-start gap-1">
                          <Badge variant={statusVariant(u.status)} size="sm">
                            {u.status.charAt(0) +
                              u.status.slice(1).toLowerCase()}
                          </Badge>
                          {!u.emailVerified && (
                            <span className="text-caption text-ink-subtle">
                              Email not verified
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={tdClass}>
                        {u.memberships.length === 0 ? (
                          <span className="text-ink-subtle">—</span>
                        ) : (
                          <ul className="flex flex-col gap-0.5">
                            {u.memberships.map((m) => (
                              <li key={m.messId} className="text-ink">
                                {m.messName}
                                <span className="text-ink-muted">
                                  {" · "}
                                  {m.role === "OWNER" ? "Owner" : "Member"}
                                  {m.isManager ? ", Manager" : ""}
                                  {m.status !== "ACTIVE"
                                    ? ` (${m.status.toLowerCase()})`
                                    : ""}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td
                        className={cn(
                          tdClass,
                          "whitespace-nowrap text-ink-muted",
                        )}
                      >
                        {formatDate(u.createdAt)}
                      </td>
                      <td
                        className={cn(tdClass, "text-right whitespace-nowrap")}
                      >
                        <div className="inline-flex gap-1">
                          {canChangeRole(u) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={busy}
                              onClick={() =>
                                setPending({
                                  kind: "role",
                                  user: u,
                                  role: u.role === "ADMIN" ? "USER" : "ADMIN",
                                })
                              }
                            >
                              {u.role === "ADMIN" ? (
                                <ShieldOff />
                              ) : (
                                <ShieldCheck />
                              )}
                              {u.role === "ADMIN"
                                ? "Remove admin"
                                : "Make admin"}
                            </Button>
                          )}
                          {canChangeStatus(u) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={busy}
                              className={
                                u.status === "SUSPENDED"
                                  ? undefined
                                  : "text-error"
                              }
                              onClick={() =>
                                setPending({
                                  kind: "status",
                                  user: u,
                                  status:
                                    u.status === "SUSPENDED"
                                      ? "ACTIVE"
                                      : "SUSPENDED",
                                })
                              }
                            >
                              {u.status === "SUSPENDED" ? (
                                <UserCheck />
                              ) : (
                                <UserX />
                              )}
                              {u.status === "SUSPENDED"
                                ? "Activate"
                                : "Suspend"}
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {users.data && (
              <Pagination
                meta={users.data.meta}
                noun={["user", "users"]}
                onPage={setPage}
              />
            )}
          </>
        )}
      </Card>

      <ConfirmSheet
        open={pending !== null}
        tone={
          pending?.kind === "status" && pending.status === "SUSPENDED"
            ? "danger"
            : "primary"
        }
        icon={
          pending?.kind === "role" ? (
            <ShieldCheck className="size-5" />
          ) : (
            <UserX className="size-5" />
          )
        }
        title={
          !pending
            ? ""
            : pending.kind === "status"
              ? pending.status === "SUSPENDED"
                ? `Suspend ${pending.user.name}?`
                : `Reactivate ${pending.user.name}?`
              : pending.role === "ADMIN"
                ? `Make ${pending.user.name} an admin?`
                : `Remove admin access from ${pending.user.name}?`
        }
        confirmLabel={
          busy
            ? "Saving…"
            : pending?.kind === "status"
              ? pending.status === "SUSPENDED"
                ? "Suspend"
                : "Reactivate"
              : pending?.role === "ADMIN"
                ? "Make admin"
                : "Remove admin"
        }
        confirmDisabled={busy}
        onConfirm={() => void confirm()}
        onClose={() => setPending(null)}
      >
        <p className="text-body-sm text-ink-muted">
          {pending?.kind === "status"
            ? pending.status === "SUSPENDED"
              ? "They are signed out on their next request and can't sign in until reactivated. Their mess records stay untouched."
              : "They can sign in and use their messes again."
            : pending?.role === "ADMIN"
              ? "Admins can see every user, mess and payment, suspend users and grant PRO."
              : "They keep their normal account and messes, but lose the admin panel."}
        </p>
      </ConfirmSheet>
    </div>
  );
}
