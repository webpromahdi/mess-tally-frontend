export const siteConfig = {
  name: "My App",
  description: "A production-grade Next.js application.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  /**
   * Update these nav links per project.
   * Used for header/sidebar navigation.
   */
  navLinks: [{ label: "Dashboard", href: "/dashboard" }],
} as const;

export type SiteConfig = typeof siteConfig;
