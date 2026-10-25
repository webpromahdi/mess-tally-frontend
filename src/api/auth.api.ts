import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  RegisterRequest,
  RegisterResponseData,
  ResendOtpRequest,
  ResendOtpResponseData,
  VerifyEmailRequest,
  VerifyEmailResponseData,
} from "@/lib/types";

/**
 * Auth API functions.
 * Each function maps to one backend endpoint.
 * These are plain async functions — TanStack Query hooks go in src/hooks/auth.hook.ts
 */

export function userLogin(payload: { email: string; password: string }) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}

export function userRegister(payload: RegisterRequest) {
  return apiClient<ApiResponse<RegisterResponseData>>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function verifyEmail(payload: VerifyEmailRequest) {
  return apiClient<ApiResponse<VerifyEmailResponseData>>("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
}

export function resendOtp(payload: ResendOtpRequest) {
  return apiClient<ApiResponse<ResendOtpResponseData>>("/auth/resend-otp", {
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
