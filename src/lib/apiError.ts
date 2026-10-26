/**
 * Normalises errors thrown by `ofetch` / the backend envelope.
 *
 * The backend replaces messages in production, so UI decisions must branch on
 * `statusCode` — never on `message` (API.md §"Response format").
 */

interface ApiErrorShape {
  statusCode?: number;
  data?: {
    statusCode?: number;
    message?: string;
  };
  message?: string;
}

export function getApiStatus(error: unknown): number | undefined {
  if (!error || typeof error !== "object") return undefined;
  const shaped = error as ApiErrorShape;
  return shaped.statusCode ?? shaped.data?.statusCode;
}

export function getApiMessage(
  error: unknown,
  fallback = "An unexpected error occurred. Please try again.",
): string {
  if (!error || typeof error !== "object") return fallback;
  const shaped = error as ApiErrorShape;
  return shaped.data?.message ?? shaped.message ?? fallback;
}

/** 401 — session expired or token invalid. */
export function isAuthError(error: unknown): boolean {
  return getApiStatus(error) === 401;
}

/** 403 on a mess-scoped route — no ACTIVE membership (API.md §"Common errors"). */
export function isNoMembershipError(error: unknown): boolean {
  return getApiStatus(error) === 403;
}

/** 402 — a PRO plan gate blocked the read. */
export function isUpgradeRequired(error: unknown): boolean {
  return getApiStatus(error) === 402;
}

/**
 * Retry only transient failures: network errors and 5xx.
 * 4xx responses are deterministic and must not be retried.
 */
export function isRetryableError(error: unknown): boolean {
  const status = getApiStatus(error);
  if (status === undefined) return true; // network / timeout
  return status >= 500;
}
