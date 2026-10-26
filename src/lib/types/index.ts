/**
 * Global TypeScript types and interfaces.
 *
 * Add project-specific types here as separate files (e.g., user.types.ts)
 * and re-export them from this barrel file.
 *
 * Usage:
 *   import type { ApiResponse, PaginatedResponse } from "@/lib/types";
 */

export * from "./auth.types";
export * from "./bazar.types";
export * from "./dashboard.types";
export * from "./meal.types";
export * from "./member.types";
export * from "./mess.types";
export * from "./month.types";
export * from "./subscription.types";
export * from "./summary.types";
export * from "./utility.types";

// ---------------------------------------------------------------------------
// Generic API response wrappers
// ---------------------------------------------------------------------------

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
  success: boolean;
}

// ---------------------------------------------------------------------------
// Utility types
// ---------------------------------------------------------------------------

/** Makes specific keys of T optional */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Makes specific keys of T required */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/** Extracts the value type of a promise */
export type Awaited<T> = T extends Promise<infer U> ? U : T;
