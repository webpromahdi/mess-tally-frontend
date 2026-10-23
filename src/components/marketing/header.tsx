"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MarketingHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu on Escape key press
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: close on navigation
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      id="marketing-header"
      className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-md transition-colors"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo Anchor */}
        <Link
          href="/"
          id="marketing-logo-link"
          className="inline-flex items-center gap-2 rounded-lg py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="MessTally Home"
        >
          <BrandLogo variant="auto" className="h-8 sm:h-9 w-auto" />
        </Link>

        {/* Desktop Navigation Links (≥ 768px) */}
        <nav
          id="desktop-navigation"
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          {siteConfig.marketingNavLinks.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/about" && pathname === "/about-us");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "text-primary dark:text-brand-accent font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-brand-accent"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions (≥ 768px) */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            id="desktop-signin-button"
            className="rounded-lg border-border text-foreground hover:bg-accent"
          >
            <Link href="/login">Sign In</Link>
          </Button>

          <Button
            asChild
            variant="brand-accent"
            size="sm"
            id="desktop-get-started-button"
            className="rounded-lg font-semibold shadow-2xs"
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Hamburger Toggle Button (< 768px) */}
        {/* Strictly satisfies 44x44px touch target rule from responsive.md */}
        <button
          type="button"
          id="mobile-nav-toggle-button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          {mobileMenuOpen ? (
            <X className="size-6 text-foreground" aria-hidden="true" />
          ) : (
            <Menu className="size-6 text-foreground" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay & Panel (< 768px) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col justify-between overflow-y-auto border-t border-border/70 p-5 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
              Menu
            </p>
            <nav
              className="flex flex-col space-y-1"
              aria-label="Mobile Navigation"
            >
              {siteConfig.marketingNavLinks.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/about" && pathname === "/about-us");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex min-h-[44px] items-center justify-between rounded-lg px-4 text-base font-medium transition-colors",
                      isActive
                        ? "bg-accent font-semibold text-primary dark:text-brand-accent"
                        : "text-foreground hover:bg-accent/60",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-primary dark:bg-brand-accent" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Full-Width Auth Buttons */}
          <div className="pt-6 border-t border-border/70 space-y-3 pb-8">
            <Button
              asChild
              variant="outline"
              className="w-full min-h-[44px] text-base justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              variant="brand-accent"
              className="w-full min-h-[48px] text-base font-semibold justify-center shadow-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/register" className="inline-flex items-center gap-2">
                <span>Create Your Mess</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground pt-1">
              Free for all bachelor messes &amp; flatmates
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
