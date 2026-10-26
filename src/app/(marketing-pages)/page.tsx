import type { Metadata } from "next";
import {
  LandingCta,
  LandingFaq,
  LandingFeatureStrip,
  LandingHero,
  LandingHowItWorks,
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
      <LandingHero />
      <LandingFeatureStrip />
      <LandingStory />
      <LandingHowItWorks />
      <LandingFaq />
      <LandingCta />
    </div>
  );
}
