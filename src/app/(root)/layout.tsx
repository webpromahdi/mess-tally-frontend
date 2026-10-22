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
    <div className="flex min-h-screen">
      {/* TODO: Add Sidebar here */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
