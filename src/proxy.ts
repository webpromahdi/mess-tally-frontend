import { type NextRequest, NextResponse } from "next/server";

/**
 * Reads the JWT `exp` and `role` claims without verifying the signature.
 * Signature/user validity (and every admin permission) is still enforced by the
 * backend; this only routes the session to the right area.
 */
function readSession(token: string | undefined) {
  if (!token) return { fresh: false, staff: false };
  try {
    const payload = token.split(".")[1];
    if (!payload) return { fresh: false, staff: false };
    const normalised = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalised.padEnd(Math.ceil(normalised.length / 4) * 4, "=");
    const claims = JSON.parse(atob(padded)) as { exp?: number; role?: string };
    const fresh =
      typeof claims.exp === "number" && claims.exp * 1000 > Date.now();
    const staff = claims.role === "ADMIN" || claims.role === "SUPERADMIN";
    return { fresh, staff: fresh && staff };
  } catch {
    return { fresh: false, staff: false };
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  const { fresh, staff } = readSession(token);
  // The API client adds `expired=1` when it receives a 401, so the login page
  // stays reachable even when the cookie is still present but rejected.
  const forceLogin = request.nextUrl.searchParams.get("expired") === "1";

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/admin");

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

  // Staff accounts don't create or join messes; their home is the admin panel.
  // This also catches the dashboard's "no mess → /onboarding" hand-off.
  if (staff && pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isAuthRoute && fresh && !forceLogin) {
    return NextResponse.redirect(
      new URL(staff ? "/admin" : "/dashboard", request.url),
    );
  }

  return NextResponse.next();
}

export const middleware = proxy;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
