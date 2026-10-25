import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
        "role-owner": "bg-aubergine-100 text-aubergine-800",
        "role-manager": "bg-marigold-100 text-marigold-900",
        "role-member": "bg-gray-100 text-gray-700",
        "status-active": "bg-success-surface text-success",
        "status-pending": "bg-warning-surface text-warning",
        "status-rejected": "bg-error-surface text-error",
        "plan-free": "bg-gray-100 text-gray-700",
        "plan-pro": "bg-marigold-100 text-marigold-900",
        "month-active": "bg-success-surface text-success",
        "month-closed": "bg-gray-100 text-gray-700",
        neutral: "bg-gray-100 text-gray-700",
        info: "bg-info-surface text-info",
        brand: "bg-aubergine-800 text-white",
      },
      size: {
        default: "px-2 py-0.5 text-xs font-medium",
        sm: "px-2 py-0.5 text-caption font-semibold",
        md: "px-2.5 py-1 text-label font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

/** Small status dot, e.g. for an active month. */
function StatusDot({
  className,
  tone = "success",
}: {
  className?: string;
  tone?: "success" | "muted" | "warning";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-1.5 shrink-0 rounded-full",
        tone === "success" && "bg-success-strong",
        tone === "muted" && "bg-gray-400",
        tone === "warning" && "bg-marigold-600",
        className,
      )}
    />
  );
}

export { Badge, badgeVariants, StatusDot };
