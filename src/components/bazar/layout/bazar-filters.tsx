"use client";

import { X } from "lucide-react";
import { Field, NativeSelect } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isFiltered } from "@/lib/bazar";
import type { BazarFilter, BazarMember } from "@/lib/types/bazar.types";

/** Shopper select plus an inclusive date range. */
export function BazarFilters({
  filter,
  members,
  start,
  end,
  onChange,
}: {
  filter: BazarFilter;
  members: BazarMember[];
  start: string;
  end: string;
  onChange: (next: BazarFilter) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,10rem)_minmax(0,10rem)_auto] sm:items-end">
      <Field label="Shopper" className="col-span-2 sm:col-span-1">
        <NativeSelect
          value={filter.memberId}
          onChange={(e) => onChange({ ...filter, memberId: e.target.value })}
        >
          <option value="all">All shoppers</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
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
        onClick={() => onChange({ memberId: "all", from: "", to: "" })}
      >
        <X />
        Clear
      </Button>
    </div>
  );
}
