"use client";

import { History, X } from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { NumberStepper } from "@/components/shared";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDayLong } from "@/lib/dates";
import { formatMeals } from "@/lib/format";
import { cellTotal, parseCount, validateEntry } from "@/lib/meals";
import type {
  MealEntry,
  MealsMember,
  UpsertMealInput,
} from "@/lib/types/meal.types";
import { cn } from "@/lib/utils";

export type MealField = "breakfast" | "lunch" | "dinner" | "guestMeals";
export type EditorValues = Record<MealField, string>;

interface FieldDef {
  key: MealField;
  label: string;
}

const fields: FieldDef[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "guestMeals", label: "Guest meals" },
];

interface DateRange {
  start: string;
  end: string;
}

interface CellEditorProps {
  member: MealsMember;
  date: string;
  today: string;
  range: DateRange;
  entry?: MealEntry;
  initialValues?: Partial<EditorValues>;
  autoFocus?: boolean;
  size?: "md" | "lg";
  onSave: (input: UpsertMealInput) => void;
  onClear: () => void;
  onClose: () => void;
}

function toValues(entry?: MealEntry): EditorValues {
  return {
    breakfast: String(entry?.breakfast ?? 0),
    lunch: String(entry?.lunch ?? 0),
    dinner: String(entry?.dinner ?? 0),
    guestMeals: String(entry?.guestMeals ?? 0),
  };
}

/** One member-day entry form: four steppers, live total and validation (AC 3.1.1, 3.1.3, 3.1.5). */
export function CellEditor({
  member,
  date,
  today,
  range,
  entry,
  initialValues,
  autoFocus,
  size = "md",
  onSave,
  onClear,
  onClose,
}: CellEditorProps) {
  const uid = useId();
  const [values, setValues] = useState<EditorValues>({
    ...toValues(entry),
    ...initialValues,
  });
  const [half, setHalf] = useState(() =>
    Object.values(values).some((v) => parseCount(v) % 1 !== 0),
  );

  const input: UpsertMealInput = {
    memberId: member.id,
    date,
    breakfast: parseCount(values.breakfast),
    lunch: parseCount(values.lunch),
    dinner: parseCount(values.dinner),
    guestMeals: parseCount(values.guestMeals),
  };
  const result = validateEntry(input, range);
  const invalid = new Set(result.errors.map((e) => e.field));
  const total = cellTotal(input);
  const message = result.errors[0]?.message ?? result.warnings[0]?.message;
  const backdated = date < today;

  function submit(e: FormEvent) {
    e.preventDefault();
    if (result.errors.length === 0) onSave(input);
  }

  return (
    <form onSubmit={submit} className="flex min-h-0 flex-col overflow-y-auto">
      <div className="flex items-center gap-3 p-4 pb-3">
        <Avatar name={member.name} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-body font-semibold text-ink">
            {member.name}
          </p>
          <p className="text-body-sm text-ink-muted">{formatDayLong(date)}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Close editor"
          onClick={onClose}
          className="ml-auto text-ink-muted"
        >
          <X />
        </Button>
      </div>

      {backdated && (
        <div
          role="note"
          className="mx-4 mb-2 flex items-center gap-2 rounded-lg bg-marigold-50 px-2.5 py-1.5 text-caption text-marigold-900"
        >
          <History className="size-3.5 shrink-0" />
          <span>Editing a past date. Changes update house totals.</span>
        </div>
      )}

      <div className="flex flex-col gap-2.5 px-4">
        {fields.map((f, idx) => (
          <div
            key={f.key}
            className="flex items-center justify-between gap-3 py-0.5"
          >
            <span className="text-body text-ink">{f.label}</span>
            <NumberStepper
              label={f.label}
              value={values[f.key]}
              onChange={(next) => setValues((v) => ({ ...v, [f.key]: next }))}
              step={half ? 0.5 : 1}
              size={size}
              invalid={invalid.has(f.key)}
              describedBy={message ? `${uid}-msg` : undefined}
              autoFocus={autoFocus && idx === 0}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 pt-2 text-caption">
        <label className="inline-flex cursor-pointer items-center gap-2 select-none text-ink-muted">
          <input
            type="checkbox"
            checked={half}
            onChange={(e) => setHalf(e.target.checked)}
            className="size-3.5 rounded border-line-strong text-aubergine-800 focus:ring-aubergine-500"
          />
          <span>Allow half meals (0.5)</span>
        </label>
        <span className="text-body font-semibold text-ink tabular-nums">
          Total: {formatMeals(Number.isFinite(total) ? total : 0)}
        </span>
      </div>

      {message && (
        <p
          id={`${uid}-msg`}
          role={result.errors.length > 0 ? "alert" : "status"}
          className={cn(
            "mx-4 mt-2 rounded-lg px-2.5 py-1.5 text-caption",
            result.errors.length > 0
              ? "bg-error-surface text-error"
              : "bg-warning-surface text-warning",
          )}
        >
          {message}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-line p-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          disabled={entry === undefined}
          className="text-ink-muted"
        >
          Clear day
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={result.errors.length > 0}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
