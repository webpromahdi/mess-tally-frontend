/**
 * Auth route group layout.
 * Wraps all pages inside (auth)/ — e.g., /login, /register.
 *
 * Use this layout to:
 * - Center the auth form on screen
 * - Redirect authenticated users away from auth pages
 * - Apply a minimal layout (no sidebar/header)
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {children}
    </div>
  );
}
