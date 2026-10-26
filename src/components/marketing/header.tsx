"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { BrandLogo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MarketingHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Monitor window scroll to slightly increase backdrop density and shadow on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  // biome-ignore lint/correctness/useExhaustiveDependencies: close on navigation
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      id="marketing-header"
      className="fixed top-0 inset-x-0 z-40 w-full pt-3 sm:pt-4 lg:pt-5 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none"
    >
      {/* Floating Glass Capsule Navigation Bar (matches reference design) */}
      <div
        className={cn(
          "pointer-events-auto mx-auto flex h-13 sm:h-16 md:h-[66px] w-full items-center justify-between rounded-full px-3.5 sm:px-6 md:px-7 transition-all duration-300",
          isScrolled
            ? "bg-white/85 dark:bg-aubergine-950/85 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(58,15,52,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
            : "bg-white/75 dark:bg-aubergine-950/75 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_4px_24px_rgba(58,15,52,0.05)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)]",
        )}
      >
        {/* Brand Logo Anchor */}
        <Link
          href="/"
          id="marketing-logo-link"
          className="inline-flex items-center gap-2 rounded-full py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
          aria-label="MessTally Home"
        >
          <BrandLogo
            variant="auto"
            className="h-7 sm:h-8.5 md:h-9.5 w-auto transition-transform hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Desktop Navigation Links (≥ 768px) - Pill navigation with soft active state */}
        <nav
          id="desktop-navigation"
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 lg:gap-1.5"
        >
          {siteConfig.marketingNavLinks.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/about" && pathname === "/about-us") ||
              (item.href === "/contact" && pathname === "/contact-us");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 lg:px-4 py-1.5 text-[14px] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-[#F3EBF5] text-[#3A0F34] dark:bg-aubergine-900/80 dark:text-[#EAAA00] font-bold shadow-2xs"
                    : "text-neutral-600 dark:text-neutral-300 font-medium hover:text-[#3A0F34] dark:hover:text-[#EAAA00] hover:bg-[#3A0F34]/[0.05] dark:hover:bg-white/[0.06]",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions (≥ 768px) - Clean Sign In & Marigold Capsule CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/login"
            id="desktop-signin-link"
            className="text-[14px] font-semibold text-neutral-800 dark:text-neutral-200 hover:text-[#3A0F34] dark:hover:text-[#EAAA00] px-3.5 py-1.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sign In
          </Link>

          <Button
            asChild
            variant="brand-accent"
            id="desktop-get-started-button"
            className="rounded-full px-5 sm:px-5.5 py-2 sm:py-2.5 text-sm font-bold bg-[#EAAA00] hover:bg-[#D99600] active:scale-[0.98] text-[#3A0F34] shadow-xs shadow-amber-500/10 hover:shadow-md hover:shadow-amber-500/20 transition-all group"
          >
            <Link href="/register" className="inline-flex items-center gap-1.5">
              <span>Get Started</span>
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>

        {/* Mobile Header Actions (< 768px): Inline Get Started Pill + Slide-over Drawer Trigger */}
        <div className="flex md:hidden items-center gap-1.5 shrink-0">
          <Button
            asChild
            size="sm"
            variant="brand-accent"
            className="rounded-full px-3 py-1 text-xs font-bold bg-[#EAAA00] hover:bg-[#D99600] text-[#3A0F34] shadow-2xs h-7.5 sm:h-8 whitespace-nowrap shrink-0"
          >
            <Link href="/register" className="inline-flex items-center gap-1">
              <span>Get Started</span>
              <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
          </Button>

          {/* Accessible Mobile Slide-over Drawer Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                id="mobile-nav-toggle-button"
                className="size-9 sm:size-10 inline-flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-foreground hover:bg-black/10 dark:hover:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0 cursor-pointer"
                aria-label="Open navigation drawer"
              >
                <Menu className="size-5 text-foreground" aria-hidden="true" />
              </button>
            </SheetTrigger>

            {/* Mobile Slide-over Drawer (Slide from Right) */}
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-[min(85vw,340px)] sm:max-w-sm p-0 flex flex-col justify-between border-l border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-card text-foreground z-50 shadow-2xl"
            >
              <div>
                {/* Drawer Top Header with Logo and Close Button */}
                <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <BrandLogo variant="auto" className="h-7.5 sm:h-8 w-auto" />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="size-9 rounded-full inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Close navigation drawer"
                  >
                    <X className="size-5" />
                  </button>
                  <SheetTitle className="sr-only">
                    MessTally Navigation Drawer
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Main navigation links and account actions for MessTally
                  </SheetDescription>
                </div>

                {/* Drawer Navigation Links */}
                <div className="px-3.5 sm:px-4 py-4 space-y-1">
                  <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/75">
                    Navigation
                  </p>
                  <nav
                    className="flex flex-col space-y-1"
                    aria-label="Mobile Drawer Navigation"
                  >
                    {siteConfig.marketingNavLinks.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        (item.href === "/about" && pathname === "/about-us") ||
                        (item.href === "/contact" &&
                          pathname === "/contact-us");
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex min-h-[46px] items-center rounded-xl px-4 py-2.5 text-base transition-colors",
                            isActive
                              ? "bg-[#F3EBF5] text-[#3A0F34] dark:bg-aubergine-900/80 dark:text-[#EAAA00] font-bold shadow-2xs"
                              : "text-foreground/85 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 font-medium",
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <span className="flex-1">{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* Drawer Bottom Full-Width Auth Actions */}
              <div className="p-4 sm:p-5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-muted/10 space-y-2.5">
                <Button
                  asChild
                  variant="brand-accent"
                  className="w-full min-h-[48px] rounded-xl text-base font-bold bg-[#EAAA00] hover:bg-[#D99600] text-[#3A0F34] shadow-md justify-center transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="size-4.5" aria-hidden="true" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full min-h-[44px] rounded-xl text-base font-semibold justify-center border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/login">Sign In</Link>
                </Button>

                <p className="text-center text-xs text-muted-foreground pt-1 font-normal">
                  Free for all bachelor messes &amp; flatmates
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
