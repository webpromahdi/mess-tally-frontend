"use client";

import {
  Check,
  LogOut,
  RefreshCw,
  UserMinus,
  Users,
  UserX,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Banner, EmptyState, IconTile, Toast } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks";
import { formatBDT } from "@/lib/format";
import {
  defaultFilter,
  defaultSort,
  filterMembers,
  hasOpenBalance,
  atCap as isAtCap,
  isFiltered,
  nextSort,
  pendingMembers,
  pluralMembers,
  sortMembers,
} from "@/lib/members";
import type {
  MemberDialogKind,
  MemberDialogTarget,
  MemberSortKey,
  MembersData,
  MembersFilter,
  MembersSort,
} from "@/lib/types/member.types";
import {
  ConfirmSheet,
  InviteSheet,
  MemberActionsSheet,
  RoleDialog,
} from "./dialogs";
import { LeaveCard, MembersHeader, PlanUsageCard } from "./layout";
import {
  JoinRequestsCard,
  RosterCards,
  RosterTable,
  RosterToolbar,
} from "./roster";
import {
  type UseMembersStateOptions,
  useMembersState,
} from "./use-members-state";

export interface MembersViewProps {
  data: MembersData;
  state?: UseMembersStateOptions;
  initialFilter?: MembersFilter;
  initialDialog?: MemberDialogTarget;
  /** Replace the join requests card with an inline error. */
  requestsError?: boolean;
}

export function MembersView({
  data: initial,
  state,
  initialFilter,
  initialDialog,
  requestsError,
}: MembersViewProps) {
  const s = useMembersState(initial, state);
  const { data } = s;
  const { viewer, mess } = data;
  const desktop = useMediaQuery("(min-width: 768px)");
  const [filter, setFilter] = useState<MembersFilter>(
    initialFilter ?? defaultFilter,
  );
  const [sort, setSort] = useState<MembersSort>(defaultSort);
  const [dialog, setDialog] = useState<MemberDialogTarget | null>(
    initialDialog ?? null,
  );
  const closeDialog = useCallback(() => setDialog(null), []);
  const open = (kind: MemberDialogKind, memberId?: string) =>
    setDialog({ kind, memberId });

  const isManager = viewer.isManager;
  const requests = pendingMembers(data);
  const capped = isAtCap(data);
  const me = data.members.find((m) => m.id === viewer.memberId);
  const target = data.members.find((m) => m.id === dialog?.memberId) ?? null;
  const kind = dialog?.kind;

  const rows = useMemo(
    () => sortMembers(filterMembers(data.members, filter, isManager), sort),
    [data.members, filter, sort, isManager],
  );

  const changeSort = (key: MemberSortKey) =>
    setSort((cur) => nextSort(cur, key));
  const jumpToRequests = () =>
    document
      .getElementById("requests")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (me?.status === "LEFT") {
    return (
      <Card>
        <EmptyState
          size="lg"
          icon={
            <IconTile tone="neutral" size="lg">
              <LogOut className="size-6" />
            </IconTile>
          }
          title={`You left ${mess.name}`}
          description="Your past meals and bazar stay in closed months. Enter the room code to rejoin."
        />
      </Card>
    );
  }

  const blocked = !!target && hasOpenBalance(target);

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <MembersHeader data={data} onInvite={() => open("invite")} />

      {isManager && !requestsError && requests.length > 0 && (
        <Banner
          tone="brand"
          title={`${requests.length} join ${requests.length === 1 ? "request" : "requests"} waiting`}
          description="Approve people you know to let them log meals and bazar."
          action={
            <Button size="sm" onClick={jumpToRequests}>
              Review requests
            </Button>
          }
        />
      )}
      {isManager && capped && (
        <Banner
          tone="warning"
          title="Member limit reached"
          description={`The ${mess.plan === "PRO" ? "Pro" : "Free"} plan allows ${pluralMembers(mess.memberCap)}. Remove someone or upgrade to approve more.`}
        />
      )}

      {isManager && (
        <JoinRequestsCard
          requests={requests}
          atCap={capped}
          error={requestsError}
          saving={s.saving}
          failedId={s.failedId}
          onApprove={(id) => open("approve", id)}
          onReject={(id) => open("reject", id)}
        />
      )}

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Roster</CardTitle>
        </CardHeader>
        <RosterToolbar
          filter={filter}
          canSeeRejected={isManager}
          onChange={setFilter}
        />
        <div className="border-t border-line">
          {rows.length === 0 ? (
            <EmptyState
              icon={
                <IconTile tone="neutral" size="lg">
                  <Users className="size-6" />
                </IconTile>
              }
              title="No members match"
              description="Try another name or status."
              actions={
                isFiltered(filter) && (
                  <Button
                    variant="outline"
                    onClick={() => setFilter(defaultFilter)}
                  >
                    Clear filters
                  </Button>
                )
              }
            />
          ) : desktop ? (
            <RosterTable
              rows={rows}
              viewer={viewer}
              sort={sort}
              saving={s.saving}
              failedId={s.failedId}
              onSort={changeSort}
              onAction={open}
            />
          ) : (
            <RosterCards
              rows={rows}
              viewer={viewer}
              saving={s.saving}
              failedId={s.failedId}
              onAction={open}
            />
          )}
        </div>
      </Card>

      <PlanUsageCard data={data} />

      <LeaveCard
        isOwner={viewer.role === "OWNER"}
        messName={mess.name}
        onLeave={() => open("leave", viewer.memberId)}
      />

      <ConfirmSheet
        open={kind === "approve" && !!target}
        tone="primary"
        icon={<Check className="size-5" />}
        title={`Approve ${target?.name ?? ""}?`}
        confirmLabel="Approve"
        onConfirm={() => target && s.approve(target.id)}
        onClose={closeDialog}
      >
        <p>
          They join {mess.name} as a member and show up in meals, bazar and the
          summary from today.
        </p>
      </ConfirmSheet>

      <ConfirmSheet
        open={kind === "reject" && !!target}
        icon={<X className="size-5" />}
        title={`Reject ${target?.name ?? ""}?`}
        confirmLabel="Reject request"
        onConfirm={() => target && s.reject(target.id)}
        onClose={closeDialog}
      >
        <p>They can send a new request later with the room code.</p>
      </ConfirmSheet>

      <ConfirmSheet
        open={kind === "remove" && !!target}
        icon={<UserMinus className="size-5" />}
        title={`Remove ${target?.name ?? ""}?`}
        confirmLabel="Remove member"
        confirmDisabled={blocked}
        onConfirm={() => target && s.remove(target.id)}
        onClose={closeDialog}
      >
        {blocked && target?.activeBalance != null ? (
          <p className="rounded-lg bg-warning-surface p-3 text-warning">
            {target.name} has an open meal balance of{" "}
            <strong className="tabular-nums">
              {formatBDT(target.activeBalance, { signed: true })}
            </strong>{" "}
            this month. Settle it before removing them.
          </p>
        ) : (
          <p>
            They become “Left” and lose access. Their meals and bazar stay in
            closed months.
          </p>
        )}
      </ConfirmSheet>

      <ConfirmSheet
        open={kind === "leave"}
        icon={<UserX className="size-5" />}
        title={`Leave ${mess.name}?`}
        confirmLabel="Leave mess"
        onConfirm={() => s.leave()}
        onClose={closeDialog}
      >
        <p>
          You’ll lose access to this mess. Your past meals and bazar stay in
          closed months, and you can rejoin with the room code.
        </p>
      </ConfirmSheet>

      <ConfirmSheet
        open={kind === "regenerate"}
        icon={<RefreshCw className="size-5" />}
        title="Generate a new room code?"
        confirmLabel="Generate new code"
        onConfirm={s.regenerate}
        onClose={() => open("invite")}
      >
        <p>
          The current code <strong className="text-ink">{mess.roomCode}</strong>{" "}
          stops working immediately. Existing members are not affected.
        </p>
      </ConfirmSheet>

      <RoleDialog
        member={kind === "role" ? target : null}
        onSave={s.changeManager}
        onClose={closeDialog}
      />

      <InviteSheet
        open={kind === "invite"}
        roomCode={mess.roomCode}
        canRegenerate={isManager}
        onCopy={() => s.notify("Room code copied")}
        onRegenerate={() => open("regenerate")}
        onClose={closeDialog}
      />

      <MemberActionsSheet
        member={kind === "actions" ? target : null}
        viewer={viewer}
        onAction={open}
        onClose={closeDialog}
      />

      {s.toast && <Toast message={s.toast} onDismiss={s.dismissToast} />}
    </div>
  );
}
