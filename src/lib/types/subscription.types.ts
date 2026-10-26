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
