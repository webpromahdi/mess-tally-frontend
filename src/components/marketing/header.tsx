"use client";

import {
  ArrowRight,
  CreditCard,
  Mail,
  Menu,
  Users,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Map each marketing nav link to a recognizable icon for the mobile drawer
const NAV_ICONS = {
  "/features": Utensils,
  "/pricing": CreditCard,
  "/about": Users,
  "/contact": Mail,
} as const;

export function MarketingHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Monitor window scroll to smoothly transition from 100% transparent blend to frosted glass on scroll
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
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border/50 bg-white/80 dark:bg-aubergine-950/85 backdrop-blur-md shadow-2xs"
          : "border-b border-transparent bg-transparent shadow-none",
      )}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo Anchor */}
        <Link
          href="/"
          id="marketing-logo-link"
          className="inline-flex items-center gap-2 rounded-lg py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="MessTally Home"
        >
          <BrandLogo
            variant="auto"
            className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto transition-transform hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Desktop Navigation Links (≥ 768px) - Modern capsule navigation */}
        <nav
          id="desktop-navigation"
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1.5"
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
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-brand-accent/15 dark:text-brand-accent font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions (≥ 768px) - Clean Sign In & Marigold Pill CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="/login"
            id="desktop-signin-link"
            className="text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 rounded-full hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sign In
          </Link>

          <Button
            asChild
            variant="brand-accent"
            id="desktop-get-started-button"
            className="rounded-full px-5 py-2.5 text-sm font-semibold shadow-xs hover:bg-marigold-600 active:scale-[0.98] transition-all"
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Hamburger Drawer Trigger (< 768px) */}
        {/* Satisfies 44x44px touch target rule from responsive.md */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              id="mobile-nav-toggle-button"
              className="md:hidden inline-flex size-11 items-center justify-center rounded-full text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open navigation menu"
            >
              <Menu className="size-6 text-foreground" aria-hidden="true" />
            </button>
          </SheetTrigger>

          {/* Accessible off-canvas slide-over drawer clamped to min(85vw, 320px) per responsive.md */}
          <SheetContent
            side="right"
            className="w-[min(85vw,340px)] sm:max-w-sm p-0 flex flex-col justify-between border-l border-border/70 bg-white dark:bg-card text-foreground"
          >
            <div>
              {/* Drawer Top Header with Logo */}
              <SheetHeader className="p-5 border-b border-border/60 flex flex-row items-center justify-between text-left">
                <div className="flex items-center gap-2">
                  <BrandLogo variant="auto" className="h-8.5 w-auto" />
                </div>
                <SheetTitle className="sr-only">
                  MessTally Navigation
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation options for MessTally marketing pages
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Navigation Links */}
              <div className="px-4 py-5 space-y-1">
                <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  Navigation
                </p>
                <nav
                  className="flex flex-col space-y-1"
                  aria-label="Mobile Navigation"
                >
                  {siteConfig.marketingNavLinks.map((item) => {
                    const Icon =
                      NAV_ICONS[item.href as keyof typeof NAV_ICONS] ??
                      Utensils;
                    const isActive =
                      pathname === item.href ||
                      (item.href === "/about" && pathname === "/about-us") ||
                      (item.href === "/contact" && pathname === "/contact-us");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex min-h-[48px] items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-base font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary dark:bg-brand-accent/15 dark:text-brand-accent font-semibold shadow-2xs"
                            : "text-foreground/80 hover:text-foreground hover:bg-accent/60",
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <div
                          className={cn(
                            "flex size-9 items-center justify-center rounded-lg transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground dark:bg-brand-accent dark:text-brand-accent-foreground"
                              : "bg-muted/70 text-muted-foreground",
                          )}
                        >
                          <Icon className="size-4.5" aria-hidden="true" />
                        </div>
                        <span className="flex-1">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Mobile Drawer Full-Width Auth Actions */}
            <div className="p-5 border-t border-border/60 bg-muted/20 space-y-3">
              <Button
                asChild
                variant="brand-accent"
                className="w-full min-h-[48px] rounded-full text-base font-semibold justify-center shadow-md hover:bg-marigold-600 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full min-h-[44px] rounded-full text-base justify-center border-border hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/login">Sign In</Link>
              </Button>

              <p className="text-center text-xs text-muted-foreground pt-1">
                Free for all bachelor messes &amp; flatmates
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
