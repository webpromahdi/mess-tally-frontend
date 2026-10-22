import { type NextRequest, NextResponse } from "next/server";

/**
 * Next.js 16 Network Proxy (successor to middleware.ts)
 *
 * In Next.js 16+, `proxy.ts` replaces `middleware.ts` to clarify its role
 * as a network-level boundary/proxy running before routes and layouts.
 *
 * Common Use Cases:
 * - Authentication & route protection (redirecting unauthorized users)
 * - Header injection (CORS, security headers)
 * - URL rewrites and redirects
 *
 * Docs: https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example token lookup from cookies (update key according to your auth system)
  const token = request.cookies.get("token")?.value;

  // 1. Protect routes: redirect to /login if trying to access /dashboard without token
  const isProtectedRoute = pathname.startsWith("/dashboard");
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Auth routes: redirect to /dashboard if already logged in
  const isAuthRoute = pathname.startsWith("/login");
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

/**
 * Matcher configuration:
 * Applies the proxy to all application routes while skipping static assets,
 * internal Next.js paths, and images.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public files with common extensions (.svg, .png, .jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
