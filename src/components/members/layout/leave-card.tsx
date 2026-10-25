import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function LeaveCard({
  isOwner,
  messName,
  onLeave,
}: {
  isOwner: boolean;
  messName: string;
  onLeave: () => void;
}) {
  return (
    <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
      <div className="min-w-0 flex-1">
        <h3 className="text-h4 text-ink">Leave {messName}</h3>
        <p className="mt-0.5 text-body-sm text-ink-muted">
          {isOwner
            ? "The owner can’t leave. Transfer ownership to another member first."
            : "Your past meals and bazar stay in closed months. You can rejoin with the room code."}
        </p>
      </div>
      <Button
        variant="outline"
        className="text-error"
        disabled={isOwner}
        onClick={onLeave}
      >
        <LogOut className="size-4" />
        Leave mess
      </Button>
    </Card>
  );
}
