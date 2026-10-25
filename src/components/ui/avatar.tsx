"use client";

import { Avatar as AvatarPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

const tints = [
  "bg-aubergine-100 text-aubergine-800",
  "bg-marigold-100 text-marigold-900",
  "bg-success-surface text-success",
  "bg-info-surface text-info",
  "bg-aubergine-200 text-aubergine-900",
];

function hash(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h * 31 + text.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (
    (parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")
  ).toUpperCase();
}

const sizes = {
  xs: "size-6 text-caption",
  sm: "size-8 text-label",
  md: "size-10 text-body-sm",
  lg: "size-12 text-body",
};

interface AvatarProps
  extends Omit<React.ComponentProps<typeof AvatarPrimitive.Root>, "size"> {
  name?: string;
  size?: keyof typeof sizes;
  tone?: "brand" | "accent";
}

function Avatar({
  className,
  name,
  size = "sm",
  tone,
  children,
  ...props
}: AvatarProps) {
  if (name !== undefined) {
    const tint =
      tone === "brand"
        ? "bg-aubergine-800 text-white"
        : tone === "accent"
          ? "bg-marigold-500 text-aubergine-950"
          : tints[hash(name) % tints.length];

    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full font-semibold select-none",
          sizes[size],
          tint,
          className,
        )}
      >
        {initials(name)}
      </span>
    );
  }

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Root>
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarStack({
  names,
  max = 4,
  size = "sm",
}: {
  names: string[];
  max?: number;
  size?: "xs" | "sm";
}) {
  const shown = names.slice(0, max);
  const rest = names.length - shown.length;
  return (
    <span className="flex items-center -space-x-2">
      {shown.map((n) => (
        <Avatar key={n} name={n} size={size} className="ring-2 ring-surface" />
      ))}
      {rest > 0 && (
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700 ring-2 ring-surface",
            size === "xs" ? "size-6 text-caption" : "size-8 text-label",
          )}
        >
          +{rest}
        </span>
      )}
    </span>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
