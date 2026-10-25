/**
 * Root route group layout.
 * Wraps all authenticated/main app pages.
 *
 * Use this layout to:
 * - Add sidebar, header, and main content area
 * - Protect routes (redirect unauthenticated users to /login)
 * - Apply the main app shell
 */
export default function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col w-full bg-background text-foreground">
      {/* Root layout shell; sub-layouts (dashboard, onboarding) manage their specific headers and padding */}
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
