import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  AuthMeResponseData,
  ForgotPasswordRequest,
  ForgotPasswordResponseData,
  LoginRequest,
  LoginResponseData,
  RegisterRequest,
  RegisterResponseData,
  ResendOtpRequest,
  ResendOtpResponseData,
  ResetPasswordRequest,
  VerifyEmailRequest,
  VerifyEmailResponseData,
} from "@/lib/types";

/**
 * Auth API functions.
 * Each function maps to one backend endpoint.
 * These are plain async functions — TanStack Query hooks go in src/hooks/auth.hook.ts
 */

export function userLogin(payload: LoginRequest) {
  return apiClient<ApiResponse<LoginResponseData>>("/auth/login", {
    method: "POST",
    body: payload,
  });
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
  return apiClient<ApiResponse<AuthMeResponseData>>("/auth/me", {
    method: "GET",
  });
}

export function logout() {
  return apiClient<ApiResponse<null>>("/auth/logout", {
    method: "POST",
  });
}

export function refreshToken() {
  return apiClient<ApiResponse<{ accessToken: string }>>(
    "/auth/refresh-token",
    {
      method: "POST",
    },
  );
}

export function forgotPassword(payload: ForgotPasswordRequest) {
  return apiClient<ApiResponse<ForgotPasswordResponseData>>(
    "/auth/forgot-password",
    {
      method: "POST",
      body: payload,
    },
  );
}

export function resetPassword(payload: ResetPasswordRequest) {
  return apiClient<ApiResponse<null>>("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
}
