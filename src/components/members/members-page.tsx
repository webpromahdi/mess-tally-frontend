"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
  useApproveMember,
  useLeaveMess,
  useMessMembers,
  usePendingMembers,
  useRejectMember,
  useRemoveMember,
  useSummary,
  useTransferManager,
  useWorkspace,
} from "@/hooks";
import { toMembersData } from "@/lib/mappers/members.mapper";
import { useMonthStore } from "@/store";
import { MembersView } from "./members-view";

export function MembersPage() {
  const selectedMonth = useMonthStore((state) => state.selectedMonth);
  const workspace = useWorkspace(selectedMonth);
  const active = useMessMembers("ACTIVE");
  const left = useMessMembers("LEFT");
  const rejected = useMessMembers("REJECTED");
  const pending = usePendingMembers(workspace.viewer?.isManager ?? false);
  const summary = useSummary(selectedMonth, Boolean(workspace.viewer?.isManager));
  const approve = useApproveMember();
  const reject = useRejectMember();
  const transferManager = useTransferManager();
  const remove = useRemoveMember();
  const leave = useLeaveMess();

  const data = useMemo(() => {
    if (!workspace.viewer || !workspace.mess) return null;
    const members = [
      ...(active.data?.data.members ?? []),
      ...(left.data?.data.members ?? []),
      ...(rejected.data?.data.members ?? []),
    ];
    return toMembersData({
      viewer: workspace.viewer,
      mess: workspace.mess,
      plan: workspace.subscription?.plan ?? null,
      members,
      pending: pending.data?.data.members ?? [],
      summary: summary.data?.data ?? null,
    });
  }, [
    active.data,
    left.data,
    rejected.data,
    pending.data,
    summary.data,
    workspace.mess,
    workspace.subscription?.plan,
    workspace.viewer,
  ]);

  const loading =
    workspace.isLoading ||
    active.isPending ||
    left.isPending ||
    rejected.isPending ||
    (workspace.viewer?.isManager === true && pending.isPending);

  if (loading || !data) {
    return <Card className="min-h-64 animate-pulse bg-card" />;
  }

  return (
    <MembersView
      data={data}
      requestsError={Boolean(pending.error)}
      state={{
        actions: {
          approve: async (id) => {
            await approve.mutateAsync(id);
          },
          reject: async (id) => {
            await reject.mutateAsync(id);
          },
          changeManager: async (id, isManager) => {
            if (isManager) {
              await transferManager.mutateAsync(id);
              return;
            }
            throw new Error(
              "Transfer the manager position to another member instead.",
            );
          },
          remove: async (id) => {
            await remove.mutateAsync(id);
          },
          leave: async () => {
            await leave.mutateAsync();
          },
        },
      }}
    />
  );
}
