/**
 * Authentication TypeScript types and interfaces.
 * Grounded in backend API contracts (D:\Projects\mess-tally-backend\API.md § 7).
 */

export type UserRole = "USER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "DELETED";

export interface UserProfile {
  id: string;
  userId: string;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  bio?: string | null;
  phone?: string | null;
  address?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  activeMessId: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: UserProfile | null;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseData {
  email: string;
  purpose: "REGISTRATION";
  expiresInSeconds: number;
  resendAvailableInSeconds: number;
  resendsRemaining: number;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface VerifyEmailResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ResendOtpRequest {
  email: string;
  purpose?: "REGISTRATION" | "FORGOT_PASSWORD";
}

export interface ResendOtpResponseData {
  email: string;
  purpose: "REGISTRATION" | "FORGOT_PASSWORD";
  expiresInSeconds: number;
  resendAvailableInSeconds: number;
  resendsRemaining: number;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface ActiveMessSummary {
  id: string;
  name: string;
  roomCode: string;
  currency: string;
  isJoinable: boolean;
  requireApproval: boolean;
  mealCutoffTime: string;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  activeMessId: string | null;
  mess?: ActiveMessSummary | null;
  user?: User;
}

export type AuthMeResponseData = User;

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponseData {
  email: string;
  purpose: "FORGOT_PASSWORD";
  expiresInSeconds: number;
  resendAvailableInSeconds: number;
  resendsRemaining: number;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}
