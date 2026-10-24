export const siteConfig = {
  name: "MessTally",
  description:
    "Track meals, manage shared expenses, and settle up with flatmates seamlessly.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  /**
   * Update these nav links per project.
   * Used for header/sidebar navigation.
   */
  navLinks: [{ label: "Dashboard", href: "/dashboard" }],
  marketingNavLinks: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
