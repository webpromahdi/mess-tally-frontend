import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, logout, userLogin, userRegister } from "@/api";

/**
 * TanStack Query hooks for authentication.
 * Each hook wraps an API function with query/mutation state management.
 *
 * Usage:
 *   "use client";
 *   import { useLogin } from "@/hooks";
 *   const { mutate: login, isPending } = useLogin();
 */

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: userRegister,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
