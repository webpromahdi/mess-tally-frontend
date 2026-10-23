import { redirect } from "next/navigation";

/**
 * Root page — redirects to the main app entry point.
 * Update the redirect destination based on your app's auth flow:
 *   - If user is unauthenticated → redirect to /login
 *   - If user is authenticated → redirect to /dashboard
 *
 * For more complex auth-based redirects, handle this in middleware.ts
 */
export default function RootPage() {
  redirect("/login");
}
