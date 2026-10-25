import apiClient from "@/lib/apiClient";

/**
 * Auth API functions.
 * Each function maps to one backend endpoint.
 * These are plain async functions — TanStack Query hooks go in src/hooks/auth.hook.ts
 *
 * Replace/extend these based on your backend's auth contract.
 */

export function userLogin(payload: { email: string; password: string }) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}

export function userRegister(payload: {
  name: string;
  email: string;
  password: string;
}) {
  return apiClient("/auth/register", { method: "POST", body: payload });
}

export function verifyEmail(payload: { email: string; otp: string }) {
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
}

export function resendOtp(payload: {
  email: string;
  purpose?: "REGISTRATION" | "FORGOT_PASSWORD";
}) {
  return apiClient("/auth/resend-otp", {
    method: "POST",
    body: { purpose: "REGISTRATION", ...payload },
  });
}

export function getMe() {
  return apiClient("/auth/me", { method: "GET" });
}

export function logout() {
  return apiClient("/auth/logout", { method: "POST" });
}
