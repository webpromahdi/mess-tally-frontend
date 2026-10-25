import { MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Viewer } from "@/lib/types/dashboard.types";
import type { MemberDialogKind, MemberRecord } from "@/lib/types/member.types";
import { cn } from "@/lib/utils";
import { RoleBadge, StatusBadge } from "./member-badges";
import { joinedText } from "./roster-table";

/** Mobile roster: one card per member; managers tap an active row for actions. */
export function RosterCards({
  rows,
  viewer,
  saving,
  failedId,
  onAction,
}: {
  rows: MemberRecord[];
  viewer: Viewer;
  saving: ReadonlySet<string>;
  failedId: string | null;
  onAction: (kind: MemberDialogKind, memberId: string) => void;
}) {
  return (
    <ul>
      {rows.map((m) => {
        const mine = m.id === viewer.memberId;
        const tappable = viewer.isManager && m.status === "ACTIVE";
        const failed = failedId === m.id;
        const body = (
          <>
            <Avatar name={m.name} size="md" />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-body font-medium text-ink">
                <span className="truncate">{m.name}</span>
                {mine && (
                  <Badge variant="brand" size="sm">
                    You
                  </Badge>
                )}
              </span>
              <span className="mt-1 flex flex-wrap items-center gap-1.5">
                <RoleBadge member={m} />
                <StatusBadge status={m.status} />
              </span>
              <span className="mt-1 block text-caption text-ink-muted">
                {failed ? (
                  <span className="text-error">Couldn’t save. Try again.</span>
                ) : (
                  joinedText(m)
                )}
              </span>
            </span>
            {tappable && (
              <MoreHorizontal
                aria-hidden
                className="size-5 shrink-0 text-ink-muted"
              />
            )}
          </>
        );
        const cls = cn(
          "flex min-h-18 w-full items-center gap-3 px-4 py-3 text-left",
          saving.has(m.id) && "opacity-60",
        );
        return (
          <li
            key={m.id}
            className={cn(
              "border-b border-line",
              mine && "bg-marigold-50",
              failed && "bg-error-surface",
            )}
          >
            {tappable ? (
              <button
                type="button"
                aria-label={`Actions for ${m.name}`}
                className={cls}
                onClick={() => onAction("actions", m.id)}
              >
                {body}
              </button>
            ) : (
              <div className={cls}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
