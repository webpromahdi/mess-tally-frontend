import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAdminMesses,
  getAdminOverview,
  getAdminRevenue,
  getAdminUsers,
  grantAdminPro,
  updateAdminUserRole,
  updateAdminUserStatus,
} from "@/api";
import { queryKeys } from "@/lib/queryKeys";
import type {
  AdminMessQuery,
  AdminRevenueQuery,
  AdminUserQuery,
} from "@/lib/types/admin.types";

export function useAdminOverview() {
  return useQuery({
    queryKey: queryKeys.admin.overview,
    queryFn: getAdminOverview,
    staleTime: 60 * 1000,
  });
}

export function useAdminUsers(filters: AdminUserQuery) {
  return useQuery({
    queryKey: queryKeys.admin.users(filters),
    queryFn: () => getAdminUsers(filters),
    // Keep the table on screen while the next page/filter loads.
    placeholderData: keepPreviousData,
  });
}

export function useAdminMesses(filters: AdminMessQuery) {
  return useQuery({
    queryKey: queryKeys.admin.messes(filters),
    queryFn: () => getAdminMesses(filters),
    placeholderData: keepPreviousData,
  });
}

export function useAdminRevenue(filters: AdminRevenueQuery) {
  return useQuery({
    queryKey: queryKeys.admin.revenue(filters),
    queryFn: () => getAdminRevenue(filters),
    placeholderData: keepPreviousData,
  });
}

/** User changes move the overview counts too. */
function useAdminInvalidation() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.all });
}

export function useUpdateAdminUserStatus() {
  const invalidate = useAdminInvalidation();
  return useMutation({
    mutationFn: updateAdminUserStatus,
    onSuccess: () => invalidate(),
  });
}

export function useUpdateAdminUserRole() {
  const invalidate = useAdminInvalidation();
  return useMutation({
    mutationFn: updateAdminUserRole,
    onSuccess: () => invalidate(),
  });
}

export function useGrantAdminPro() {
  const invalidate = useAdminInvalidation();
  return useMutation({
    mutationFn: grantAdminPro,
    onSuccess: () => invalidate(),
  });
}
