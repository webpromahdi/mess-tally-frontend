import { Settings as SettingsIcon } from "lucide-react";
import type { Metadata } from "next";
import { EmptyState, IconTile } from "@/components/shared";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Settings | MessTally",
  description: "Mess, month, and member preferences.",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <header>
        <h1 className="text-h1 text-ink">Settings</h1>
        <p className="mt-1 text-body-sm text-ink-muted">
          Manage your mess preferences, month cycles, and notifications.
        </p>
      </header>
      <Card>
        <EmptyState
          size="lg"
          icon={
            <IconTile tone="neutral" size="lg">
              <SettingsIcon className="size-6" />
            </IconTile>
          }
          title="Settings Configuration"
          description="Detailed mess settings and preference controls will be configurable in an upcoming release."
        />
      </Card>
    </div>
  );
}
