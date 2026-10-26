import { type NextRequest, NextResponse } from "next/server";

/**
 * Checks the JWT `exp` claim without verifying the signature.
 * Signature/user validity is still enforced by the backend; this only stops
 * the proxy from bouncing an expired session between /login and /dashboard.
 */
function hasFreshToken(token: string | undefined) {
  if (!token) return false;
  try {
    const payload = token.split(".")[1];
    if (!payload) return false;
    const normalised = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalised.padEnd(Math.ceil(normalised.length / 4) * 4, "=");
    const claims = JSON.parse(atob(padded)) as { exp?: number };
    return typeof claims.exp === "number" && claims.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  const fresh = hasFreshToken(token);
  // The API client adds `expired=1` when it receives a 401, so the login page
  // stays reachable even when the cookie is still present but rejected.
  const forceLogin = request.nextUrl.searchParams.get("expired") === "1";

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  if (isProtectedRoute && !fresh) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    if (token) loginUrl.searchParams.set("expired", "1");
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && fresh && !forceLogin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const middleware = proxy;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
