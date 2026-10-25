import { type NextRequest, NextResponse } from "next/server";

/**
 * Route protection and network boundary.
 * Next.js 16 proxy boundary enforcing authentication rules on routes.
 *
 * Rules:
 * - Unauthenticated users visiting /dashboard/* or /onboarding/* are redirected to /login?redirect=<path>
 * - Authenticated users visiting /login, /register, etc. are redirected to /dashboard
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
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
