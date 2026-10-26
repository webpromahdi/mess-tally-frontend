"use client";

import {
  isServer,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  isAuthError,
  isNoMembershipError,
  isRetryableError,
} from "@/lib/apiError";

function redirectToLogin() {
  const { pathname, search } = window.location;
  const url = new URL("/login", window.location.origin);
  url.searchParams.set("redirect", `${pathname}${search}`);
  url.searchParams.set("expired", "1");
  window.location.assign(url.toString());
}

/**
 * Session redirects only apply inside the authenticated app. Marketing pages
 * intentionally call `/auth/me` too, and a signed-out visitor must not be
 * bounced to /login from there.
 */
function handleProtectedQueryError(error: unknown) {
  if (typeof window === "undefined") return;
  if (!window.location.pathname.startsWith("/dashboard")) return;
  if (isAuthError(error)) {
    redirectToLogin();
  } else if (isNoMembershipError(error)) {
    window.location.assign(
      new URL("/onboarding", window.location.origin).toString(),
    );
  }
}

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: handleProtectedQueryError,
    }),
    defaultOptions: {
      queries: {
        // With SSR, set staleTime above 0 to avoid immediate refetch on the client
        staleTime: 60 * 1000, // 1 minute
        retry: (failureCount, error) =>
          isRetryableError(error) && failureCount < 2,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always create a new client
    return makeQueryClient();
  }
  // Browser: reuse the same client across renders (prevents cache loss)
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
