import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="marketing-footer"
      className="w-full max-w-full overflow-hidden border-t border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-card text-foreground transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* =========================================================================
              Column 1: Brand Identity & Social Links (Spans 4 cols on lg)
              Features larger brand logo, soft modern microcopy, and sleek icon glyphs
             ========================================================================= */}
          <div className="space-y-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform hover:scale-[1.02]"
              aria-label="MessTally Home"
            >
              {/* Increased Logo Size as requested */}
              <BrandLogo
                variant="auto"
                className="h-10 sm:h-12 md:h-13 w-auto"
              />
            </Link>

            <p className="max-w-xs sm:max-w-sm text-sm text-muted-foreground/80 leading-relaxed font-normal">
              A simple and transparent way to manage shared meals, bazar
              expenses, and monthly settlements for bachelor flatmates in
              Bangladesh.
            </p>

            {/* Clean, unboxed minimal glyph social icons (matching reference image) */}
            <div className="flex items-center gap-3 pt-2 text-foreground/85">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex size-8 sm:size-9 items-center justify-center rounded-full text-foreground/75 hover:text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.1] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Facebook className="size-4 fill-current" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="flex size-8 sm:size-9 items-center justify-center rounded-full text-foreground/75 hover:text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.1] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Twitter className="size-4 fill-current" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex size-8 sm:size-9 items-center justify-center rounded-full text-foreground/75 hover:text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.1] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Instagram className="size-4" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex size-8 sm:size-9 items-center justify-center rounded-full text-foreground/75 hover:text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.1] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Linkedin className="size-4 fill-current" aria-hidden="true" />
              </a>
              <a
                href="https://google.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Google"
                className="flex size-8 sm:size-9 items-center justify-center rounded-full text-foreground/75 hover:text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.1] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring font-bold text-sm"
              >
                G
              </a>
            </div>
          </div>

          {/* =========================================================================
              Column 2: Company (Spans 2 cols on lg)
             ========================================================================= */}
          <div className="space-y-3.5 lg:col-span-2">
            <p className="text-[15px] font-bold text-foreground tracking-tight">
              Company
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground/90">
              <li>
                <Link
                  href="/about"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/about#testimonials"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Testimonial
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================================================================
              Column 3: Support (Spans 2 cols on lg)
             ========================================================================= */}
          <div className="space-y-3.5 lg:col-span-2">
            <p className="text-[15px] font-bold text-foreground tracking-tight">
              Support
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground/90">
              <li>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Tweet @ Us
                </a>
              </li>
              <li>
                <Link
                  href="/pricing#pricing-faq"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Webians
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?ref=feedback"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================================================================
              Column 4: Links (Spans 2 cols on lg)
             ========================================================================= */}
          <div className="space-y-3.5 lg:col-span-2">
            <p className="text-[15px] font-bold text-foreground tracking-tight">
              Links
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground/90">
              <li>
                <Link
                  href="/features"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Become Teacher
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Service
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center hover:text-foreground dark:hover:text-white transition-colors"
                >
                  All in One
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================================================================
              Column 5: Contact Us (Spans 2 cols on lg)
              Features soft blue rounded icon accents directly matching reference image
             ========================================================================= */}
          <div className="space-y-3.5 lg:col-span-2">
            <p className="text-[15px] font-bold text-foreground tracking-tight">
              Contact Us
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground/90">
              <li>
                <a
                  href="tel:+9198765432154"
                  className="group flex items-center gap-2.5 hover:text-foreground dark:hover:text-white transition-colors min-h-[36px] sm:min-h-0"
                >
                  <span className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0 transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60">
                    <Phone className="size-3.5 sm:size-4" aria-hidden="true" />
                  </span>
                  <span className="tabular-nums font-medium text-foreground/90 text-sm">
                    (91) 98765 4321 54
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@mail.com"
                  className="group flex items-center gap-2.5 hover:text-foreground dark:hover:text-white transition-colors min-h-[36px] sm:min-h-0"
                >
                  <span className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0 transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60">
                    <Mail className="size-3.5 sm:size-4" aria-hidden="true" />
                  </span>
                  <span className="font-medium text-foreground/90 text-sm">
                    support@mail.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM BAR (Copyright & Legal Policy Links)
            Clean, soft hairline divider line with generous whitespace
           ========================================================================= */}
        <div className="mt-14 sm:mt-18 border-t border-black/[0.06] dark:border-white/[0.08] pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground/80">
          <p className="text-center sm:text-left">
            © Copyright {currentYear} by MessTally. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 sm:gap-x-8 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-foreground dark:hover:text-white transition-colors min-h-[44px] sm:min-h-0 inline-flex items-center"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground dark:hover:text-white transition-colors min-h-[44px] sm:min-h-0 inline-flex items-center"
            >
              Terms of Use
            </Link>
            <Link
              href="/terms#legal"
              className="hover:text-foreground dark:hover:text-white transition-colors min-h-[44px] sm:min-h-0 inline-flex items-center"
            >
              Legal
            </Link>
            <Link
              href="/features"
              className="hover:text-foreground dark:hover:text-white transition-colors min-h-[44px] sm:min-h-0 inline-flex items-center"
            >
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
