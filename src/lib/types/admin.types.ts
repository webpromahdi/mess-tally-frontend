/** Admin module DTOs — backend `src/app/module/admin` (API.md "Admin"). */

export type AdminUserRole = "USER" | "ADMIN" | "SUPERADMIN";
export type AdminUserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
export type AdminSubscriptionType = "MONTHLY" | "HALF_YEARLY" | "YEARLY";

export interface AdminPageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** List endpoints return `data` plus a top-level `meta`. */
export interface AdminListResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: AdminPageMeta;
}

export interface AdminOverview {
  users: {
    total: number;
    active: number;
    suspended: number;
    newThisMonth: number;
  };
  messes: {
    total: number;
    pro: number;
    free: number;
    proExpiringIn7Days: number;
  };
  revenue: { allTime: number; thisMonth: number; currency: string };
}

export interface AdminMembership {
  messId: string;
  messName: string;
  role: "OWNER" | "MEMBER";
  isManager: boolean;
  status: "PENDING" | "ACTIVE" | "LEFT" | "REJECTED";
  joinedAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  emailVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  phone: string | null;
  imageUrl: string | null;
  activeMess: { id: string; name: string } | null;
  memberships: AdminMembership[];
}

export interface AdminPerson {
  id: string;
  name: string;
  email: string;
}

export interface AdminMess {
  id: string;
  name: string;
  roomCode: string;
  plan: "FREE" | "PRO";
  planExpiresAt: string | null;
  /** `null` on PRO means the current period was granted by an admin. */
  subscriptionType: AdminSubscriptionType | null;
  activeMembers: number;
  memberLimit: number;
  owner: AdminPerson | null;
  manager: AdminPerson | null;
  totalPaid: number;
  createdAt: string;
}

export interface AdminRevenuePayment {
  id: string;
  type: AdminSubscriptionType;
  status: "PAID" | "REFUNDED";
  amount: number;
  refundAmount: number | null;
  currency: string;
  durationDays: number;
  paidAt: string;
  bkashTrxId: string | null;
  mess: { id: string; name: string };
  paidBy: { name: string; email: string };
}

export interface AdminRevenue {
  range: { from: string; to: string };
  currency: string;
  totals: { gross: number; refunds: number; net: number; payments: number };
  byType: { type: AdminSubscriptionType; amount: number; count: number }[];
  monthly: { month: string; amount: number; count: number }[];
  payments: AdminRevenuePayment[];
}

export interface AdminUserQuery {
  search?: string;
  mess?: string;
  role?: AdminUserRole | "";
  status?: AdminUserStatus | "";
  page?: number;
}

export interface AdminMessQuery {
  search?: string;
  plan?: "FREE" | "PRO" | "";
  subscriptionType?: AdminSubscriptionType | "";
  page?: number;
}

export interface AdminRevenueQuery {
  from?: string;
  to?: string;
  page?: number;
}
