"use client";

import { ShieldCheck, UserMinus } from "lucide-react";
import { DrawerSheet } from "@/components/shared";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks";
import { rowPermissions } from "@/lib/members";
import type { Viewer } from "@/lib/types/dashboard.types";
import type { MemberDialogKind, MemberRecord } from "@/lib/types/member.types";
import { RoleBadge } from "../roster/member-badges";

/** Row actions for touch screens (and the owner-protected explanation). */
export function MemberActionsSheet({
  member,
  viewer,
  onAction,
  onClose,
}: {
  member: MemberRecord | null;
  viewer: Viewer;
  onAction: (kind: MemberDialogKind, memberId: string) => void;
  onClose: () => void;
}) {
  const desktop = useMediaQuery("(min-width: 768px)");
  const perms = member ? rowPermissions(viewer, member) : null;
  return (
    <DrawerSheet
      open={!!member}
      onClose={onClose}
      side={desktop ? "center" : "bottom"}
      title="Member actions"
      hideTitle
      className="bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      {member && perms && (
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center gap-3">
            <Avatar name={member.name} size="md" />
            <div className="min-w-0">
              <h3 className="truncate text-h3 text-ink">{member.name}</h3>
              <RoleBadge member={member} />
            </div>
          </div>
          {perms.hint && (
            <p className="rounded-xl bg-silver-100 p-3 text-body-sm text-ink-muted">
              {perms.hint}
            </p>
          )}
          <Button
            variant="outline"
            size="lg"
            className="justify-start"
            disabled={!perms.canChangeRole}
            onClick={() => onAction("role", member.id)}
          >
            <ShieldCheck className="size-4" />
            Change role
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="justify-start text-error"
            disabled={!perms.canRemove}
            onClick={() => onAction("remove", member.id)}
          >
            <UserMinus className="size-4" />
            Remove from mess
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      )}
    </DrawerSheet>
  );
}
