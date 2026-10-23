import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="marketing-footer"
      className="border-t border-border/70 bg-background text-foreground transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Description Column */}
          <div className="space-y-4 sm:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="MessTally Home"
            >
              <BrandLogo variant="auto" className="h-8 sm:h-9 w-auto" />
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              A simple and transparent way to manage shared meals and household
              expenses.
            </p>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 pt-2 text-foreground/80">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Github className="size-4" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Linkedin className="size-4" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Twitter className="size-4" aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Youtube className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Product
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/features"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Legal
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Support
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/help"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[36px] sm:min-h-0 items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/70 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} MessTally. All rights reserved.</p>
          <p className="text-muted-foreground">
            Built for flatmates, by a fellow flatmate.
          </p>
        </div>
      </div>
    </footer>
  );
}
