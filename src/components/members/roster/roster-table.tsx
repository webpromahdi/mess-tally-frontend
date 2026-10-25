import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  MoreHorizontal,
  ShieldCheck,
  UserMinus,
} from "lucide-react";
import { SimpleDropdown, SimpleMenuItem } from "@/components/shared";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, rowPermissions } from "@/lib/members";
import type { Viewer } from "@/lib/types/dashboard.types";
import type {
  MemberDialogKind,
  MemberRecord,
  MemberSortKey,
  MembersSort,
} from "@/lib/types/member.types";
import { cn } from "@/lib/utils";
import { RoleBadge, StatusBadge } from "./member-badges";

const headClass =
  "sticky top-0 z-10 h-11 border-b border-line bg-silver-200 px-4 text-left text-caption font-semibold tracking-wide text-gray-600 uppercase";

export function joinedText(m: MemberRecord) {
  if (m.status === "ACTIVE" && m.joinedOn) return formatDate(m.joinedOn);
  if (m.status === "LEFT" && m.leftOn) return `Left ${formatDate(m.leftOn)}`;
  return "—";
}

function SortHead({
  label,
  sortKey,
  sort,
  onSort,
}: {
  label: string;
  sortKey: MemberSortKey;
  sort: MembersSort;
  onSort: (key: MemberSortKey) => void;
}) {
  const active = sort.key === sortKey;
  const Icon = !active ? ArrowUpDown : sort.dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th
      scope="col"
      aria-sort={
        active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"
      }
      className={headClass}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="inline-flex min-h-11 items-center gap-1 uppercase hover:text-ink focus-visible:outline-2 focus-visible:outline-aubergine-500"
      >
        {label}
        <Icon aria-hidden className={cn("size-3.5", !active && "opacity-50")} />
      </button>
    </th>
  );
}

function RowMenu({
  member,
  viewer,
  disabled,
  onAction,
}: {
  member: MemberRecord;
  viewer: Viewer;
  disabled: boolean;
  onAction: (kind: MemberDialogKind, memberId: string) => void;
}) {
  const perms = rowPermissions(viewer, member);
  return (
    <SimpleDropdown
      align="end"
      trigger={(props) => (
        <Button
          {...props}
          variant="ghost"
          size="sm"
          className="size-9 p-0"
          disabled={disabled}
          aria-label={`Actions for ${member.name}`}
        >
          <MoreHorizontal className="size-4" />
        </Button>
      )}
    >
      {(close) => (
        <>
          <SimpleMenuItem
            disabled={!perms.canChangeRole}
            title={perms.hint ?? undefined}
            className="disabled:opacity-50"
            onClick={() => {
              close();
              onAction("role", member.id);
            }}
          >
            <ShieldCheck className="size-4" />
            Change role
          </SimpleMenuItem>
          <SimpleMenuItem
            disabled={!perms.canRemove}
            title={perms.hint ?? undefined}
            className="text-error disabled:opacity-50"
            onClick={() => {
              close();
              onAction("remove", member.id);
            }}
          >
            <UserMinus className="size-4" />
            Remove from mess
          </SimpleMenuItem>
        </>
      )}
    </SimpleDropdown>
  );
}

/** Desktop roster (≥768px). Mobile uses RosterCards. */
export function RosterTable({
  rows,
  viewer,
  sort,
  saving,
  failedId,
  onSort,
  onAction,
}: {
  rows: MemberRecord[];
  viewer: Viewer;
  sort: MembersSort;
  saving: ReadonlySet<string>;
  failedId: string | null;
  onSort: (key: MemberSortKey) => void;
  onAction: (kind: MemberDialogKind, memberId: string) => void;
}) {
  const cell = "h-14 border-b border-line px-4";
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-160 border-separate border-spacing-0 text-body-sm">
        <caption className="sr-only">Mess members</caption>
        <thead>
          <tr>
            <SortHead
              label="Member"
              sortKey="name"
              sort={sort}
              onSort={onSort}
            />
            <th scope="col" className={headClass}>
              Role
            </th>
            <th scope="col" className={headClass}>
              Status
            </th>
            <SortHead
              label="Joined"
              sortKey="joined"
              sort={sort}
              onSort={onSort}
            />
            {viewer.isManager && (
              <th scope="col" className={cn(headClass, "w-16")}>
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => {
            const mine = m.id === viewer.memberId;
            const busy = saving.has(m.id);
            const failed = failedId === m.id;
            return (
              <tr
                key={m.id}
                className={cn(
                  "transition-colors hover:bg-silver-100",
                  mine && "bg-marigold-50",
                  busy && "opacity-60",
                  failed && "bg-error-surface",
                )}
              >
                <th scope="row" className={cn(cell, "text-left font-medium")}>
                  <span className="flex items-center gap-3 whitespace-nowrap">
                    <Avatar name={m.name} size="sm" />
                    <span>
                      <span className="flex items-center gap-2">
                        {m.name}
                        {mine && (
                          <Badge variant="brand" size="sm">
                            You
                          </Badge>
                        )}
                      </span>
                      {failed && (
                        <span className="block text-caption font-normal text-error">
                          Couldn’t save. Try again.
                        </span>
                      )}
                    </span>
                  </span>
                </th>
                <td className={cell}>
                  <RoleBadge member={m} />
                </td>
                <td className={cell}>
                  <StatusBadge status={m.status} />
                </td>
                <td className={cn(cell, "whitespace-nowrap text-ink-muted")}>
                  {joinedText(m)}
                </td>
                {viewer.isManager && (
                  <td className={cn(cell, "text-right")}>
                    {m.status === "ACTIVE" && (
                      <RowMenu
                        member={m}
                        viewer={viewer}
                        disabled={busy}
                        onAction={onAction}
                      />
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
