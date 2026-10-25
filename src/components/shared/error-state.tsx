import { RefreshCw, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconTile } from "./icon-tile";

/** Design.md §14.5 network error copy. The block variant is scoped to a single card. */
export function ErrorState({
  variant = "block",
  onRetry,
  className,
  title = "Couldn't load this",
  description = "Check your connection and try again.",
}: {
  variant?: "block" | "page";
  onRetry?: () => void;
  className?: string;
  title?: string;
  description?: string;
}) {
  const page = variant === "page";
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center text-center",
        page ? "gap-4 px-6 py-16 sm:py-24" : "gap-3 px-4 py-10",
        className,
      )}
    >
      <IconTile tone="error" size={page ? "lg" : "md"}>
        <WifiOff />
      </IconTile>
      <div>
        <p className={cn("text-ink", page ? "text-h2" : "text-h4")}>{title}</p>
        <p className="mt-1 text-body-sm text-ink-muted">{description}</p>
      </div>
      <Button
        variant={page ? "primary" : "outline"}
        size={page ? "md" : "sm"}
        onClick={onRetry}
      >
        <RefreshCw />
        Retry
      </Button>
    </div>
  );
}
