import type { Metadata } from "next";
import {
  LandingCta,
  LandingFaq,
  LandingFeatureStrip,
  LandingHero,
  LandingHowItWorks,
  LandingKeyFeatures,
  LandingProductPreview,
  LandingStory,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "MessTally — Shared Meals, Clear Records, Together",
  description:
    "Manage your mess life together. Track meals, share bazar expenses, manage utility bills and settle balances fairly for bachelor flatmates in Bangladesh.",
  openGraph: {
    title: "MessTally — Shared Meals, Clear Records, Together",
    description:
      "Automate daily meal tracking, bazar accounts, and monthly settlements for flatmates.",
    url: "/",
    siteName: "MessTally",
    locale: "en_BD",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full max-w-full overflow-x-hidden">
      {/* Section 1: Hero */}
      <LandingHero />

      {/* Section 2: Core Feature Highlights */}
      <LandingFeatureStrip />

      {/* Section 3: Our Story */}
      <LandingStory />

      {/* Section 4: How It Works */}
      <LandingHowItWorks />

      {/* Section 5: Key Features */}
      <LandingKeyFeatures />

      {/* Section 6: Product Preview */}
      <LandingProductPreview />

      {/* Section 7: FAQ */}
      <LandingFaq />

      {/* Section 8: Final CTA */}
      <LandingCta />
    </div>
  );
}
