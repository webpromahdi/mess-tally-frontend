import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveMember,
  createMess,
  getMessMembers,
  getMyMesses,
  getPendingMembers,
  joinMess,
  leaveMess,
  rejectMember,
  removeMember,
  transferManager,
  transferOwner,
} from "@/api";
import { queryKeys } from "@/lib/queryKeys";
import type { MembershipStatus } from "@/lib/types";

/** `GET /mess/my` — every non-rejected membership, with the active one flagged. */
export function useMyMesses() {
  return useQuery({
    queryKey: queryKeys.workspace.myMesses,
    queryFn: getMyMesses,
    staleTime: 5 * 60 * 1000,
  });
}

/** `GET /mess/members?status=ACTIVE` — roster, manager flag and avatar URLs. */
export function useMessMembers(status: MembershipStatus = "ACTIVE") {
  return useQuery({
    queryKey: queryKeys.workspace.members(status),
    queryFn: () => getMessMembers(status),
    staleTime: 2 * 60 * 1000,
  });
}

/** `GET /mess/members/pending` — manager-only join requests, oldest first. */
export function usePendingMembers() {
  return useQuery({
    queryKey: queryKeys.workspace.pendingMembers,
    queryFn: getPendingMembers,
    staleTime: 60 * 1000,
  });
}

/**
 * Refresh everything that is scoped to the caller's active mess.
 * A new/joined mess changes the shell identity, the month list and the
 * dashboard totals, so all of them are invalidated together.
 */
function useMessScopeInvalidation() {
  const queryClient = useQueryClient();
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.workspace.myMesses }),
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me }),
      queryClient.invalidateQueries({ queryKey: queryKeys.workspace.months }),
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.summary.all }),
    ]);
}

/** Any membership change can alter the roster, pending count and balances. */
function useMembersInvalidation() {
  const queryClient = useQueryClient();
  return () =>
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: queryKeys.workspace.membersAll,
      }),
      queryClient.invalidateQueries({ queryKey: queryKeys.workspace.myMesses }),
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.summary.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.utilities.all }),
    ]);
}

/** `POST /mess` — create a mess and become its owner/manager. */
export function useCreateMess() {
  const invalidate = useMessScopeInvalidation();
  return useMutation({
    mutationFn: createMess,
    onSuccess: () => invalidate(),
  });
}

/** `POST /mess/join` — request to join (PENDING) or auto-join (ACTIVE). */
export function useJoinMess() {
  const queryClient = useQueryClient();
  const invalidate = useMessScopeInvalidation();
  return useMutation({
    mutationFn: joinMess,
    onSuccess: async (result) => {
      // A PENDING request changes only the membership list; an ACTIVE join
      // also flips the shell scope.
      if (result.data.activeMessId) {
        await invalidate();
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.workspace.myMesses,
        });
      }
    },
  });
}

/** `PATCH /mess/members/:id/approve` — manager only. */
export function useApproveMember() {
  const invalidate = useMembersInvalidation();
  return useMutation({
    mutationFn: approveMember,
    onSuccess: () => invalidate(),
  });
}

/** `PATCH /mess/members/:id/reject` — manager only. */
export function useRejectMember() {
  const invalidate = useMembersInvalidation();
  return useMutation({
    mutationFn: rejectMember,
    onSuccess: () => invalidate(),
  });
}

/** `PATCH /mess/members/:id/manager` — moves the single manager flag. */
export function useTransferManager() {
  const invalidate = useMembersInvalidation();
  return useMutation({
    mutationFn: transferManager,
    onSuccess: () => invalidate(),
  });
}

/** `PATCH /mess/members/:id/owner` — owner only. */
export function useTransferOwner() {
  const invalidate = useMembersInvalidation();
  return useMutation({
    mutationFn: transferOwner,
    onSuccess: () => invalidate(),
  });
}

/** `DELETE /mess/members/:id` — manager only; fails when records reference it. */
export function useRemoveMember() {
  const invalidate = useMembersInvalidation();
  return useMutation({
    mutationFn: removeMember,
    onSuccess: () => invalidate(),
  });
}

/** `POST /mess/leave` — clears the active mess for the caller. */
export function useLeaveMess() {
  const invalidate = useMessScopeInvalidation();
  return useMutation({
    mutationFn: leaveMess,
    onSuccess: () => invalidate(),
  });
}
