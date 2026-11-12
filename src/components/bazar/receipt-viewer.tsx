"use client";

import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/** Opens a bazar receipt image in a modal. `children` is the trigger button. */
export function ReceiptViewer({
  url,
  title,
  description,
  children,
}: {
  url: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="flex max-h-[calc(100dvh-2rem)] flex-col gap-3 p-4 sm:max-w-2xl sm:p-5"
        // DrawerSheet closes on any document Escape; keep it open when only
        // this modal (opened from the edit sheet) should close.
        onEscapeKeyDown={(e) => e.stopPropagation()}
      >
        <div className="pr-8">
          <DialogTitle className="text-h4 text-ink">{title}</DialogTitle>
          {description && (
            <DialogDescription className="mt-1 text-body-sm text-ink-muted">
              {description}
            </DialogDescription>
          )}
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-xl bg-silver-100">
          {/* Cloudinary URLs aren't in next/image remotePatterns, and the image is shown as-is. */}
          {/* biome-ignore lint/performance/noImgElement: remote receipt, no optimisation needed */}
          <img
            src={url}
            alt={title}
            className="max-h-[70dvh] w-auto max-w-full object-contain"
          />
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 self-end text-body-sm font-medium text-aubergine-800 underline-offset-2 hover:underline"
        >
          Open full size
          <ExternalLink aria-hidden className="size-4" />
        </a>
      </DialogContent>
    </Dialog>
  );
}
