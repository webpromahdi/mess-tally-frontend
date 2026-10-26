"use client";

import {
  ArrowRight,
  ChevronUp,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import { BrandLogo } from "@/components/shared";

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing to MessTally updates!");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="marketing-footer"
      className="relative w-full max-w-full overflow-hidden bg-[#F8F5FA] dark:bg-[#1A0B1A] border-t border-[#E8DEEC] dark:border-white/10 text-foreground transition-colors"
    >
      {/* Subtle brand watermark emblem on the left edge (matches reference design) */}
      <div
        className="pointer-events-none absolute -left-8 sm:-left-4 top-10 sm:top-12 -z-0 opacity-40 dark:opacity-10 select-none"
        aria-hidden="true"
      >
        <svg
          aria-hidden="true"
          width="130"
          height="180"
          viewBox="0 0 90 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#E4D7EA] dark:text-purple-900"
        >
          <rect
            x="0"
            y="45"
            width="20"
            height="95"
            rx="10"
            fill="currentColor"
          />
          <rect
            x="28"
            y="18"
            width="20"
            height="122"
            rx="10"
            fill="currentColor"
          />
          <rect
            x="56"
            y="0"
            width="20"
            height="140"
            rx="10"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* =========================================================================
              Column 1: Brand Info & Social Media Icons (Spans 5 cols on lg)
             ========================================================================= */}
          <div className="space-y-4 lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform hover:scale-[1.02]"
              aria-label="MessTally Home"
            >
              <BrandLogo
                variant="auto"
                className="h-8.5 sm:h-9.5 md:h-10 w-auto"
              />
            </Link>

            <p className="max-w-sm text-sm text-[#554756] dark:text-neutral-400 leading-relaxed font-normal">
              A simple and transparent way to manage shared meals, bazar
              expenses, and monthly settlements for bachelor flatmates in
              Bangladesh.
            </p>

            {/* 4 Circular Soft Pastel Social Media Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="size-9 rounded-full bg-[#EFE8F6] dark:bg-purple-950/50 flex items-center justify-center text-[#554756] dark:text-purple-200 hover:text-[#3A0F34] dark:hover:text-white hover:bg-[#E5D9EC] dark:hover:bg-purple-900/60 transition-colors shadow-2xs"
              >
                <Facebook
                  className="size-4.5 fill-current"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="size-9 rounded-full bg-[#EFE8F6] dark:bg-purple-950/50 flex items-center justify-center text-[#554756] dark:text-purple-200 hover:text-[#3A0F34] dark:hover:text-white hover:bg-[#E5D9EC] dark:hover:bg-purple-900/60 transition-colors shadow-2xs"
              >
                <Twitter className="size-4.5 fill-current" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="size-9 rounded-full bg-[#EFE8F6] dark:bg-purple-950/50 flex items-center justify-center text-[#554756] dark:text-purple-200 hover:text-[#3A0F34] dark:hover:text-white hover:bg-[#E5D9EC] dark:hover:bg-purple-900/60 transition-colors shadow-2xs"
              >
                <Instagram className="size-4.5" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="size-9 rounded-full bg-[#EFE8F6] dark:bg-purple-950/50 flex items-center justify-center text-[#554756] dark:text-purple-200 hover:text-[#3A0F34] dark:hover:text-white hover:bg-[#E5D9EC] dark:hover:bg-purple-900/60 transition-colors shadow-2xs"
              >
                <Linkedin
                  className="size-4.5 fill-current"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* =========================================================================
              Column 2: Product Links (Spans 2 cols on lg)
             ========================================================================= */}
          <div className="space-y-3.5 lg:col-span-2">
            <p className="text-[16px] font-bold text-[#2A0F2C] dark:text-foreground tracking-tight">
              Product
            </p>
            <ul className="space-y-2 text-sm text-[#554756] dark:text-neutral-400">
              <li>
                <Link
                  href="/features"
                  className="hover:text-[#3A0F34] dark:hover:text-[#EAAA00] transition-colors py-0.5 inline-block"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-[#3A0F34] dark:hover:text-[#EAAA00] transition-colors py-0.5 inline-block"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#3A0F34] dark:hover:text-[#EAAA00] transition-colors py-0.5 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#3A0F34] dark:hover:text-[#EAAA00] transition-colors py-0.5 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================================================================
              Column 3: Support Links (Spans 2 cols on lg)
             ========================================================================= */}
          <div className="space-y-3.5 lg:col-span-2">
            <p className="text-[16px] font-bold text-[#2A0F2C] dark:text-foreground tracking-tight">
              Support
            </p>
            <ul className="space-y-2 text-sm text-[#554756] dark:text-neutral-400">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#3A0F34] dark:hover:text-[#EAAA00] transition-colors py-0.5 inline-block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing#pricing-faq"
                  className="hover:text-[#3A0F34] dark:hover:text-[#EAAA00] transition-colors py-0.5 inline-block"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?ref=feedback"
                  className="hover:text-[#3A0F34] dark:hover:text-[#EAAA00] transition-colors py-0.5 inline-block"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================================================================
              Column 4: Stay Updated Newsletter (Spans 3 cols on lg)
             ========================================================================= */}
          <div className="space-y-3 lg:col-span-3">
            <p className="text-[16px] font-bold text-[#2A0F2C] dark:text-foreground tracking-tight">
              Stay Updated
            </p>
            <p className="text-sm text-[#554756] dark:text-neutral-400 leading-relaxed max-w-xs">
              Get the latest updates, features, and mess productivity tips.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="relative flex items-center w-full rounded-xl bg-white dark:bg-card border border-[#E4D9EB] dark:border-neutral-700/80 p-1 shadow-2xs focus-within:ring-2 focus-within:ring-[#3A0F34]/20 transition-all">
                <input
                  type="email"
                  id="newsletter-email-input"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-transparent px-3 py-1.5 text-sm text-foreground placeholder:text-neutral-400 outline-none w-full min-w-0"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="size-9 rounded-lg bg-[#EAAA00] hover:bg-[#D99600] active:scale-95 text-[#3A0F34] flex items-center justify-center shrink-0 shadow-2xs transition-all cursor-pointer"
                >
                  <ArrowRight
                    className="size-4.5 stroke-[2.5]"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </form>

            <p className="text-xs text-[#6B5E6D] dark:text-neutral-400 pt-0.5">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM BAR (Copyright & Legal Policy Links + Scroll to Top)
           ========================================================================= */}
        <div className="mt-12 sm:mt-14 border-t border-[#E8DEEC] dark:border-white/10 pt-6 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#554756] dark:text-neutral-400">
          <p className="text-center sm:text-left">
            © {currentYear} MessTally. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 sm:gap-x-7 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-[#3A0F34] dark:hover:text-[#EAAA00] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#3A0F34] dark:hover:text-[#EAAA00] transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/features"
              className="hover:text-[#3A0F34] dark:hover:text-[#EAAA00] transition-colors"
            >
              Site Map
            </Link>

            {/* Scroll-To-Top Pill Button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="size-9 rounded-xl bg-[#EFE8F6] dark:bg-purple-950/60 text-[#554756] dark:text-purple-200 hover:text-[#3A0F34] dark:hover:text-white hover:bg-[#E5D9EC] dark:hover:bg-purple-900/60 transition-all flex items-center justify-center shrink-0 ml-1 sm:ml-2 cursor-pointer shadow-2xs active:scale-95"
            >
              <ChevronUp className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Deep Aubergine Accent Line at the very bottom edge */}
      <div className="h-1.5 w-full bg-[#3A0F34]" aria-hidden="true" />
    </footer>
  );
}
