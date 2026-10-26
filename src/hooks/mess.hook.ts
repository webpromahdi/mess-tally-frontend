import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMess, getMessMembers, getMyMesses, joinMess } from "@/api";
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

/**
 * Refresh everything that is scoped to the caller's active mess.
 * A new/joined mess changes the shell identity, the month list and the
 * dashboard totals, so all four caches are invalidated together.
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
