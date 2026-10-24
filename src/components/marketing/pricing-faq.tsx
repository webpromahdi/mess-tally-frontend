"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: "Does each member in our mess have to pay ৳ 100?",
    answer:
      "No! The subscription is flat-rate per mess, not per person. A single payment of ৳ 100/month covers the entire flat — including the manager and all flatmates, whether your mess has 6 members or 25 members.",
  },
  {
    question: "How do we pay for MessTally PRO in Bangladesh?",
    answer:
      "Managers can activate PRO directly using bKash. When your manager clicks 'Upgrade to PRO', an automated bKash gateway checkout opens. Once verified, PRO features (unlimited members, receipts, self-service meals, past archives) activate immediately for everyone.",
  },
  {
    question: "What happens if we have more than 5 members on the Free plan?",
    answer:
      "The Starter plan is completely free forever for messes with up to 5 active members. When your 6th flatmate accepts the room code invite, your mess can upgrade to PRO to unlock unlimited member slots.",
  },
  {
    question: "What happens to our meal data if our PRO subscription expires?",
    answer:
      "All your records, receipts, and historical meal tallies are 100% safe and never deleted. If a subscription is not renewed, your mess continues on the Starter tier with access to the current month. Whenever you renew via bKash, all past archives and PDF export features unlock instantly.",
  },
  {
    question: "Can flatmates log their own meals from their phones?",
    answer:
      "Yes! With Mess PRO, flatmates have access to self-service meal logging. Any member can update their breakfast, lunch, or dinner count before the daily house cutoff time (e.g. 10:00 PM), saving the manager time each evening.",
  },
  {
    question: "Can we switch between Monthly, 6 Months, and 1 Year?",
    answer:
      "Yes! Whenever renewing, your manager can pick any duration. The 6-Month plan costs ৳ 500 (saving ৳ 100), and the 1-Year plan is ৳ 1,000 (providing 2 whole months free).",
  },
];

export function PricingFaq() {
  const [openIndices, setOpenIndices] = React.useState<number[]>([0]);

  function toggleIndex(index: number) {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Everything you need to know about MessTally plans, bKash checkout, and
          fair flatmate accounting.
        </p>
      </div>

      <div className="space-y-4">
        {faqList.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          const controlId = `faq-answer-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-border/80 bg-white dark:bg-card shadow-2xs overflow-hidden transition-colors"
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={controlId}
                  onClick={() => toggleIndex(index)}
                  className="flex w-full min-h-[56px] items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left text-sm sm:text-base font-semibold text-foreground transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-foreground transition-transform duration-200",
                      isOpen &&
                        "rotate-180 bg-primary/10 text-primary dark:text-brand-accent",
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
  );
}
