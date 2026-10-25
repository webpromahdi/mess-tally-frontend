import Image from "next/image";
import type * as React from "react";
import { cn } from "@/lib/utils";

export interface BrandLogoProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Image>, "src" | "alt"> {
  /**
   * - "auto": Primary aubergine/marigold logo in light mode, crisp light logo in dark mode.
   * - "primary": Specific brand primary logo with dark theme fallback.
   * - "light": Light-theme logo variant with dark theme fallback.
   * - "dark": Always render the dark-theme logo (e.g., over dark hero images or overlays).
   */
  variant?: "auto" | "primary" | "light" | "dark";
  alt?: string;
}

export function BrandLogo({
  variant = "auto",
  className,
  priority = false,
  alt = "MessTally",
  width = 2172,
  height = 724,
  ...props
}: BrandLogoProps) {
  if (variant === "dark") {
    return (
      <Image
        src="/messtally-dark-logo.png"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn("h-10 w-auto object-contain", className)}
        {...props}
      />
    );
  }

  if (variant === "light") {
    return (
      <span className="inline-flex items-center">
        <Image
          src="/messtally-light-logo.png"
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={cn("dark:hidden h-10 w-auto object-contain", className)}
          {...props}
        />
        <Image
          src="/messtally-dark-logo.png"
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={cn(
            "hidden dark:block h-10 w-auto object-contain",
            className,
          )}
          {...props}
        />
      </span>
    );
  }

  // "auto" or "primary"
  return (
    <span className="inline-flex items-center">
      <Image
        src="/messtally-primary-logo.png"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn("dark:hidden h-10 w-auto object-contain", className)}
        {...props}
      />
      <Image
        src="/messtally-dark-logo.png"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn(
          "hidden dark:block h-10 w-auto object-contain",
          className,
        )}
        {...props}
      />
    </span>
  );
}
