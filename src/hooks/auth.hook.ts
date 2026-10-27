import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  forgotPassword,
  getMe,
  logout,
  resendOtp,
  resetPassword,
  userLogin,
  userRegister,
  verifyEmail,
} from "@/api";
import { queryKeys } from "@/lib/queryKeys";
import { useAuthStore } from "@/store";

/**
 * TanStack Query hooks for authentication.
 * Each hook wraps an API function with query/mutation state management.
 *
 * Usage:
 *   "use client";
 *   import { useLogin, useCurrentUser } from "@/hooks";
 *   const { mutateAsync: login, isPending } = useLogin();
 *   const { user, isAuthenticated } = useCurrentUser();
 */

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userLogin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: userRegister,
  });
}

export function useVerifyEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      if (data?.data?.user) {
        queryClient.setQueryData(queryKeys.auth.me, {
          success: true,
          message: "User profile fetched successfully",
          data: data.data.user,
        });
      }
    },
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: resendOtp,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCurrentUser() {
  const { data, isLoading, isError, error, refetch } = useGetMe();
  const user = data?.data ?? null;
  return {
    user,
    isAuthenticated: Boolean(user),
    activeMessId: user?.activeMessId ?? null,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      useAuthStore.getState().clearActiveMess();
      queryClient.clear();
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
