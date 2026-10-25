"use client";

import { X } from "lucide-react";
import { Field, NativeSelect } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  UtilityCategory,
  UtilityFilter,
  UtilityKind,
} from "@/lib/types/utility.types";
import { CATEGORIES, isFiltered, noFilter } from "@/lib/utility";

/** Type and category selects plus an inclusive date range. */
export function UtilityFilters({
  filter,
  start,
  end,
  onChange,
}: {
  filter: UtilityFilter;
  start: string;
  end: string;
  onChange: (next: UtilityFilter) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-[repeat(4,minmax(0,1fr))_auto] sm:items-end">
      <Field label="Type">
        <NativeSelect
          value={filter.kind}
          onChange={(e) =>
            onChange({
              ...filter,
              kind: e.target.value as "all" | UtilityKind,
              category: e.target.value === "DEPOSIT" ? "all" : filter.category,
            })
          }
        >
          <option value="all">Deposits and bills</option>
          <option value="DEPOSIT">Deposits</option>
          <option value="BILL">Bills</option>
        </NativeSelect>
      </Field>
      <Field label="Category">
        <NativeSelect
          value={filter.category}
          disabled={filter.kind === "DEPOSIT"}
          onChange={(e) =>
            onChange({
              ...filter,
              category: e.target.value as "all" | UtilityCategory,
            })
          }
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </NativeSelect>
      </Field>
      <Field label="From">
        <Input
          type="date"
          min={start}
          max={end}
          value={filter.from}
          onChange={(e) => onChange({ ...filter, from: e.target.value })}
        />
      </Field>
      <Field label="To">
        <Input
          type="date"
          min={filter.from || start}
          max={end}
          value={filter.to}
          onChange={(e) => onChange({ ...filter, to: e.target.value })}
        />
      </Field>
      <Button
        variant="ghost"
        className="col-span-2 sm:col-span-1"
        disabled={!isFiltered(filter)}
        onClick={() => onChange(noFilter)}
      >
        <X />
        Clear
      </Button>
    </div>
  );
}
