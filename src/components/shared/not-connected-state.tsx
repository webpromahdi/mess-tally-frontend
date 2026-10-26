import { ArrowLeft, Unplug } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "./empty-state";
import { IconTile } from "./icon-tile";

/**
 * Honest placeholder for modules whose screens exist but whose API wiring does
 * not. It deliberately renders no sample numbers or records.
 */
export function NotConnectedState({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <header>
        <h1 className="text-h1 text-ink">{title}</h1>
        <p className="mt-1 max-w-2xl text-body-sm text-ink-muted">
          {description}
        </p>
      </header>

      <Card>
        <EmptyState
          size="lg"
          icon={
            <IconTile tone="neutral" size="lg">
              {icon ?? <Unplug />}
            </IconTile>
          }
          title="This screen isn't connected yet"
          description="The layout is ready, but this module isn't wired to your mess data. No sample records are shown."
          actions={
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <ArrowLeft />
                Back to dashboard
              </Link>
            </Button>
          }
        />
      </Card>
    </div>
  );
}
