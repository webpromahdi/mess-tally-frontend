"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type {
  AdminPageMeta,
  AdminSubscriptionType,
} from "@/lib/types/admin.types";

export const SUBSCRIPTION_LABELS: Record<AdminSubscriptionType, string> = {
  MONTHLY: "Monthly",
  HALF_YEARLY: "Half-yearly",
  YEARLY: "Yearly",
};

/** Delays a fast-changing value (search boxes) so we don't query per keystroke. */
export function useDebouncedValue<T>(value: T, delayMs = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

export function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-h2 text-ink">{title}</h1>
      <p className="mt-1 text-body text-ink-muted">{description}</p>
    </div>
  );
}

export function Pagination({
  meta,
  noun,
  onPage,
}: {
  meta: AdminPageMeta;
  noun: [singular: string, plural: string];
  onPage: (page: number) => void;
}) {
  const from = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const to = Math.min(meta.total, meta.page * meta.limit);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-body-sm text-ink-muted">
      <p aria-live="polite">
        Showing {from} to {to} of {meta.total}{" "}
        {meta.total === 1 ? noun[0] : noun[1]}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={meta.page <= 1}
          onClick={() => onPage(meta.page - 1)}
        >
          <ChevronLeft />
          Prev
        </Button>
        <span className="tabular-nums">
          {meta.page} / {meta.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={meta.page >= meta.totalPages}
          onClick={() => onPage(meta.page + 1)}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export const thClass =
  "h-11 border-b border-line bg-silver-200 px-4 text-left text-caption font-semibold tracking-wide whitespace-nowrap text-gray-600 uppercase";
export const tdClass = "border-b border-line px-4 py-3 align-top";
