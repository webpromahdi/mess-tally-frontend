import type { Plan, Role } from "./dashboard.types";

/**
 * Raw API contracts for mess identity and membership.
 * Grounded in API.md §9–§12.
 */

export type MembershipStatus = "ACTIVE" | "PENDING" | "LEFT" | "REJECTED";

export interface MessDetailsDto {
  id: string;
  name: string;
  address?: string | null;
  currency: string;
  roomCode: string;
  isJoinable: boolean;
  requireApproval: boolean;
  mealCutoffTime: string;
}

/** `POST /mess` and `POST /mess/join` both embed plan details. */
export interface MessPlanDetailsDto extends MessDetailsDto {
  plan: Plan;
  planExpiresAt: string | null;
}

export interface CreatedMessDto extends MessPlanDetailsDto {
  createdAt: string;
  updatedAt: string;
}

/** `POST /mess` — API.md §9. Only `name` is required. */
export interface CreateMessRequest {
  name: string;
  address?: string;
  currency?: string;
  /** 24-hour `HH:mm`, e.g. "11:00". */
  mealCutoffTime?: string;
  isJoinable?: boolean;
  requireApproval?: boolean;
}

export interface CreateMessResponseData {
  mess: CreatedMessDto;
  activeMessId: string;
}

/** `POST /mess/join` — API.md §11. */
export interface JoinMessRequest {
  roomCode: string;
}

export interface JoinedMembershipDto {
  id: string;
  userId: string;
  messId: string;
  role: Role;
  status: MembershipStatus;
  isManager: boolean;
  rentShare: number;
  fixedRentAmount: number | null;
  joinedAt: string;
  leftAt: string | null;
}

export interface JoinMessResponseData {
  mess: MessPlanDetailsDto;
  membership: JoinedMembershipDto;
  activeMessId: string | null;
}

export interface MessMembershipDto {
  membershipId: string;
  role: Role;
  status: MembershipStatus;
  isManager: boolean;
  joinedAt: string;
  leftAt: string | null;
  isActive: boolean;
  mess: MessDetailsDto;
}

/** `GET /mess/my` */
export interface MyMessesResponseData {
  activeMessId: string | null;
  messes: MessMembershipDto[];
}

export interface MessMemberDto {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: Role;
  status: MembershipStatus;
  isManager: boolean;
  rentShare: number;
  fixedRentAmount: number | null;
  joinedAt: string;
  leftAt: string | null;
}

/** `GET /mess/members?status=` */
export interface MessMembersResponseData {
  members: MessMemberDto[];
  total: number;
}
