"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: "Is MessTally really free to use?",
    answer:
      "Yes! MessTally is completely free for messes with up to 5 active members. You get full access to daily meal logging, shared bazar expense tracking, utility bill recording, and automated monthly balance calculations without paying anything.",
  },
  {
    question: "How does meal tracking work?",
    answer:
      "Members or the manager log daily meal counts (breakfast, lunch, and dinner). At the end of the month, the total bazar food expenditure is divided by the total count of meals consumed across the mess to compute the exact meal rate automatically.",
  },
  {
    question: "Can I join an existing mess?",
    answer:
      "Yes! Simply ask your mess manager or flatmate for their unique 6-character room code. When you register or open MessTally, click 'Join with a Room Code', enter the code, and you will join the mess immediately.",
  },
  {
    question: "How are expenses divided?",
    answer:
      "Food and bazar groceries are divided proportionally based on each flatmate's individual meal count. Household utility bills (electricity, gas, internet, cook) are divided equally among active members or tracked via the dedicated advance utility fund.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. All meal tallies, grocery receipts, and monthly settlement ledgers are securely recorded and scoped strictly to your mess. Only authorized flatmates with your mess room code can view your mess records.",
  },
];

export function LandingFaq() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  function toggleIndex(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full max-w-full py-16 sm:py-20 lg:py-28 bg-[#FAF8FA] dark:bg-background/80 border-b border-black/[0.04] dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* =========================================================================
              Left Column: FAQ Header, Copy & Contact CTA
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 text-left">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#F3EBF5] text-[#3A0F34] dark:bg-purple-950/60 dark:text-purple-200 border border-[#E8D6EB] dark:border-purple-800/40 shadow-2xs">
              <span className="size-1.5 rounded-full bg-[#3A0F34] dark:bg-purple-300" />
              <span>FAQ</span>
            </div>

            {/* Heading */}
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-foreground leading-[1.18]"
            >
              Frequently asked questions
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Have questions? Here are some common ones. If you can&apos;t find
              what you&apos;re looking for, feel free to contact us.
            </p>

            {/* Contact CTA */}
            <div className="pt-2">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 sm:px-7 py-3 sm:py-3.5 h-auto text-sm sm:text-base font-semibold bg-white dark:bg-card hover:bg-neutral-50 dark:hover:bg-neutral-800 text-foreground border-border/80 shadow-2xs transition-all group"
              >
                <Link href="/contact" id="faq-cta-contact">
                  <span>Contact Us</span>
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
          </div>

          {/* =========================================================================
              Right Column: Accessible Accordion List
             ========================================================================= */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQ_LIST.map((faq, index) => {
              const isOpen = openIndex === index;
              const controlId = `landing-faq-answer-${index}`;
              const buttonId = `landing-faq-button-${index}`;

              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-border/80 bg-white dark:bg-card shadow-2xs overflow-hidden transition-all duration-200"
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={controlId}
                      onClick={() => toggleIndex(index)}
                      className="flex w-full min-h-[56px] items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left text-sm sm:text-base font-semibold text-foreground transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="leading-snug">{faq.question}</span>
                      <div
                        className={cn(
                          "flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-foreground transition-transform duration-200",
                          isOpen &&
                            "rotate-180 bg-primary/10 text-primary dark:bg-brand-accent/20 dark:text-brand-accent",
                        )}
                      >
                        <ChevronDown className="size-4" aria-hidden="true" />
                      </div>
                    </button>
                  </h3>

                  {isOpen && (
                    <section
                      id={controlId}
                      aria-labelledby={buttonId}
                      className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-in fade-in duration-150"
                    >
                      <p>{faq.answer}</p>
                    </section>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
