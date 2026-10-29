import type { Plan } from "./dashboard.types";

/** `GET /subscription` — API.md §53. */
export interface SubscriptionOptionDto {
  key: "MONTHLY" | "HALF_YEARLY" | "YEARLY";
  label: string;
  durationDays: number;
  price: number;
  currency: string;
}

export interface SubscriptionFeaturesDto {
  bazarReceiptUploads: boolean;
  selfServiceMeals: boolean;
  pastMonthArchives: boolean;
  pdfStatements: boolean;
}

export interface SubscriptionResponseData {
  plan: Plan;
  isPro: boolean;
  planExpiresAt: string | null;
  limits: {
    maxActiveMembers: number | null;
  };
  features: SubscriptionFeaturesDto;
  options: SubscriptionOptionDto[];
}

export type SubscriptionPlanKey = SubscriptionOptionDto["key"];

/** `POST /subscription/activate` — API.md §54. */
export interface ActivateSubscriptionRequest {
  plan: SubscriptionPlanKey;
}

export interface ActivateSubscriptionResponseData {
  /** Local payment id; poll `/subscription/payments/:id/status`. */
  paymentId: string;
  paymentURL: string;
}

export type SubscriptionPaymentStatus =
  | "UNPAID"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

/** `GET /subscription/payments` — API.md §55. */
export interface SubscriptionPaymentDto {
  id: string;
  type: string;
  status: SubscriptionPaymentStatus;
  amount: number;
  currency: string;
  durationDays: number;
  periodStart: string;
  periodEnd: string;
  paidAt: string | null;
  bkashTrxId: string | null;
  createdAt: string;
}

/** `GET /subscription/payments/:id/status` — API.md §56. Raw Prisma row. */
export interface SubscriptionPaymentDetailDto {
  id: string;
  messId: string;
  paidByMemberId: string;
  type: string;
  status: SubscriptionPaymentStatus;
  /** Decimal string, unlike the list endpoint. */
  amount: string;
  currency: string;
  durationDays: number;
  paymentGateway: string;
  merchantInvoiceNumber: string;
  bkashPaymentId: string | null;
  bkashTrxId: string | null;
  payerReference: string | null;
  periodStart: string;
  periodEnd: string;
  paidAt: string | null;
  gatewayResponse: unknown;
  createdAt: string;
  updatedAt: string;
}
