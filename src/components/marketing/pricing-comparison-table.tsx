import { Check, HelpCircle, Minus } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface ComparisonItem {
  name: string;
  tooltip?: string;
  free: string | boolean;
  pro: string | boolean;
  hostel: string | boolean;
}

interface ComparisonCategory {
  category: string;
  items: ComparisonItem[];
}

const comparisonData: ComparisonCategory[] = [
  {
    category: "Member & Mess Capacity",
    items: [
      {
        name: "Active members per mess",
        tooltip: "Total flatmates that can actively tally meals and expenses.",
        free: "Up to 5 members",
        pro: "Unlimited",
        hostel: "Unlimited (up to 200+)",
      },
      {
        name: "Manager roles & delegation",
        tooltip: "Transfer manager permissions or maintain ownership.",
        free: "1 Manager",
        pro: "1 Manager + Delegation",
        hostel: "Multi-manager & floor supervisors",
      },
      {
        name: "Room code instant invite",
        tooltip:
          "Share a 6-character room code with flatmates to join instantly.",
        free: true,
        pro: true,
        hostel: true,
      },
      {
        name: "Member approval queue",
        tooltip: "Managers approve or decline join requests for security.",
        free: true,
        pro: true,
        hostel: true,
      },
    ],
  },
  {
    category: "Daily Meals & Automation",
    items: [
      {
        name: "Daily meal tally matrix",
        tooltip:
          "Record daily breakfast, lunch, and dinner counts for all members.",
        free: true,
        pro: true,
        hostel: true,
      },
      {
        name: "Self-service meal logging",
        tooltip:
          "Flatmates log their own meals directly from their own smartphones.",
        free: false,
        pro: true,
        hostel: true,
      },
      {
        name: "Automatic meal rate calculation",
        tooltip: "Meal Rate = Total Bazar Expenses ÷ Total House Meals.",
        free: true,
        pro: true,
        hostel: true,
      },
      {
        name: "Daily cutoff time rules",
        tooltip:
          "Prevent meal modifications after house cutoff time (e.g. 10:00 PM).",
        free: true,
        pro: true,
        hostel: true,
      },
    ],
  },
  {
    category: "Bazar & Grocery Management",
    items: [
      {
        name: "Bazar expense log",
        tooltip: "Track grocery shoppers, dates, amounts, and item notes.",
        free: true,
        pro: true,
        hostel: true,
      },
      {
        name: "Digital receipt image uploads",
        tooltip:
          "Upload photos of grocery receipts directly for transparent audit.",
        free: false,
        pro: true,
        hostel: true,
      },
      {
        name: "Shopper expense breakdown",
        tooltip:
          "See exactly how much each flatmate spent on groceries this month.",
        free: true,
        pro: true,
        hostel: true,
      },
    ],
  },
  {
    category: "Utility Bills & Debt Settlement",
    items: [
      {
        name: "Dedicated utility fund ledger",
        tooltip:
          "Gas, electricity, water, and cook fees tracked strictly separately from meal rates.",
        free: true,
        pro: true,
        hostel: true,
      },
      {
        name: "Advance deposits tracker",
        tooltip:
          "Record advance payments collected from each flatmate for utility bills.",
        free: true,
        pro: true,
        hostel: true,
      },
      {
        name: "Equal utility cost split",
        tooltip:
          "Automatically divide shared flat utilities equally among members.",
        free: true,
        pro: true,
        hostel: "Custom room/wing splits",
      },
      {
        name: "Who-pays-whom settlement engine",
        tooltip:
          "Greedy settlement algorithm reduces dozens of cross-debts to minimum transfers.",
        free: true,
        pro: true,
        hostel: true,
      },
      {
        name: "Downloadable PDF member statement",
        tooltip:
          "Generate and export beautiful official PDF summaries for monthly closing.",
        free: false,
        pro: true,
        hostel: true,
      },
      {
        name: "CSV & Excel data export",
        tooltip: "Export records for offline auditing or personal records.",
        free: "Basic summary",
        pro: "Full CSV statements",
        hostel: "Full CSV & Custom Reports",
      },
    ],
  },
  {
    category: "History, Storage & Support",
    items: [
      {
        name: "Active current month access",
        tooltip: "Full access to current month's tallies and ledgers.",
        free: true,
        pro: true,
        hostel: true,
      },
      {
        name: "Past-month history & archives",
        tooltip:
          "Revisit and inspect meal rates, grocery lists, and settlements from any past month.",
        free: "Current month only",
        pro: "Unlimited past months",
        hostel: "Unlimited past months",
      },
      {
        name: "Instant bKash payment activation",
        tooltip: "Automated activation via bKash payment gateway.",
        free: "Not applicable",
        pro: true,
        hostel: "bKash & Bank Transfer",
      },
      {
        name: "Customer support",
        tooltip: "Help whenever you or your flatmates need assistance.",
        free: "Community Guides",
        pro: "Priority WhatsApp & Email",
        hostel: "Dedicated Mess Specialist (24/7)",
      },
    ],
  },
];

function RenderValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <div className="flex items-center justify-center">
        <div className="size-6 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
          <Check className="size-4 stroke-[2.5]" aria-hidden="true" />
        </div>
        <span className="sr-only">Included</span>
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <Minus className="size-5 text-muted-foreground/40" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </div>
    );
  }

  return (
    <span className="text-xs sm:text-sm font-medium text-foreground text-center">
      {value}
    </span>
  );
}

export function PricingComparisonTable() {
  return (
    <div className="w-full min-w-0 max-w-full">
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Compare plan features
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          See the complete breakdown of everything MessTally offers across all
          tiers.
        </p>
      </div>

      {/* Swipe indicator for mobile viewports */}
      <p className="sm:hidden text-center text-xs text-muted-foreground mb-3 flex items-center justify-center gap-1.5 font-medium">
        <span>← Swipe table horizontally to compare →</span>
      </p>

      {/* Strictly bounded scroll container with paint containment preventing horizontal viewport breakout */}
      <div className="w-full min-w-0 max-w-full overflow-hidden [contain:paint] rounded-2xl border border-border/80 bg-white dark:bg-card shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[640px] text-left border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/30">
                <th
                  scope="col"
                  className="py-4 px-4 sm:px-6 text-sm font-bold text-foreground w-2/5"
                >
                  Features &amp; Capabilities
                </th>
                <th
                  scope="col"
                  className="py-4 px-4 text-center text-sm font-bold text-foreground w-1/5"
                >
                  Starter (Free)
                </th>
                <th
                  scope="col"
                  className="py-4 px-4 text-center text-sm font-bold text-primary dark:text-brand-accent bg-primary/5 dark:bg-brand-accent/5 w-1/5 border-x border-border/60"
                >
                  <div className="inline-flex items-center gap-1.5">
                    <span>Mess PRO</span>
                    <span className="rounded-full bg-brand-accent px-1.5 py-0.5 text-[10px] font-bold text-brand-accent-foreground uppercase">
                      Popular
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="py-4 px-4 text-center text-sm font-bold text-foreground w-1/5"
                >
                  Hostel / Hall
                </th>
              </tr>
            </thead>

            <tbody>
              {comparisonData.map((category) => (
                <React.Fragment key={category.category}>
                  {/* Category Header Row */}
                  <tr className="border-b border-border/70 bg-muted/40">
                    <td
                      colSpan={4}
                      className="py-3 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-primary dark:text-brand-accent"
                    >
                      {category.category}
                    </td>
                  </tr>

                  {/* Feature Rows */}
                  {category.items.map((item, idx) => (
                    <tr
                      key={item.name}
                      className={cn(
                        "border-b border-border/50 transition-colors hover:bg-accent/40",
                        idx === category.items.length - 1 && "border-b-2",
                      )}
                    >
                      <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-foreground font-medium">
                        <div className="flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {item.tooltip && (
                            <span
                              className="text-muted-foreground/60 hover:text-muted-foreground cursor-help"
                              title={item.tooltip}
                            >
                              <HelpCircle
                                className="size-3.5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <RenderValue value={item.free} />
                      </td>
                      <td className="py-3.5 px-4 text-center bg-primary/5 dark:bg-brand-accent/5 border-x border-border/60 font-semibold">
                        <RenderValue value={item.pro} />
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <RenderValue value={item.hostel} />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
