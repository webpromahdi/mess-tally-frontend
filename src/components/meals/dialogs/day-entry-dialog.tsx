"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { DrawerSheet, NumberStepper } from "@/components/shared";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks";
import { formatDayLong } from "@/lib/dates";
import { formatMeals } from "@/lib/format";
import { cellTotal, entryKey, parseCount, validateEntry } from "@/lib/meals";
import type { MealsGridData, UpsertMealInput } from "@/lib/types/meal.types";
import { cn } from "@/lib/utils";

type Slot = "breakfast" | "lunch" | "dinner";

interface SlotDef {
  key: Slot;
  label: string;
}

const slots: SlotDef[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];

interface Draft {
  breakfast: number;
  lunch: number;
  dinner: number;
  guestMeals: string;
}

function shiftIso(iso: string, delta: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

interface FormProps {
  data: MealsGridData;
  date: string;
  onDate: (date: string) => void;
  onSave: (inputs: UpsertMealInput[]) => void;
  onClose: () => void;
}

function DayEntryForm({ data, date, onDate, onSave, onClose }: FormProps) {
  const { month, members, entries, today } = data;
  const range = month
    ? { start: month.startDate, end: month.endDate }
    : undefined;
  const active = members.filter((m) => m.status === "ACTIVE");
  const initial = new Map<string, Draft>(
    active.map((m) => {
      const e = entries.find((x) => x.memberId === m.id && x.date === date);
      return [
        m.id,
        {
          breakfast: e?.breakfast ?? 0,
          lunch: e?.lunch ?? 0,
          dinner: e?.dinner ?? 0,
          guestMeals: String(e?.guestMeals ?? 0),
        },
      ];
    }),
  );
  const defaultDraft: Draft = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    guestMeals: "0",
  };
  const [drafts, setDrafts] = useState(initial);

  function patch(id: string, next: Partial<Draft>) {
    setDrafts((d) => {
      const current = d.get(id) ?? defaultDraft;
      return new Map(d).set(id, { ...current, ...next });
    });
  }

  const inputs = active.map<UpsertMealInput>((m) => {
    const d = drafts.get(m.id) ?? defaultDraft;
    return {
      memberId: m.id,
      date,
      breakfast: d.breakfast,
      lunch: d.lunch,
      dinner: d.dinner,
      guestMeals: parseCount(d.guestMeals),
    };
  });
  const bad = inputs.some((i) => validateEntry(i, range).errors.length > 0);
  const changed = inputs.filter((i) => {
    const before = initial.get(i.memberId) ?? defaultDraft;
    return (
      before.breakfast !== i.breakfast ||
      before.lunch !== i.lunch ||
      before.dinner !== i.dinner ||
      parseCount(before.guestMeals) !== i.guestMeals
    );
  });
  const houseDay = inputs.reduce(
    (sum, i) => sum + (Number.isFinite(cellTotal(i)) ? cellTotal(i) : 0),
    0,
  );
  const prev = shiftIso(date, -1);
  const next = shiftIso(date, 1);
  const canPrev = !!month && prev >= month.startDate;
  const canNext = !!month && next <= month.endDate && next <= today;

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        if (!bad && changed.length > 0) onSave(changed);
      }}
    >
      <div className="flex items-center gap-2 border-b border-line p-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-h3 text-ink">Log meals for a day</h3>
          <div className="mt-2 flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Previous day"
              disabled={!canPrev}
              onClick={() => onDate(prev)}
            >
              <ChevronLeft />
            </Button>
            <p
              aria-live="polite"
              className="min-w-32 px-2 text-center text-body font-semibold text-ink"
            >
              {formatDayLong(date)}
            </p>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Next day"
              disabled={!canNext}
              onClick={() => onDate(next)}
            >
              <ChevronRight />
            </Button>
            {date < today && (
              <Badge variant="info" size="sm" className="ml-2">
                Backdated
              </Badge>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Close"
          onClick={onClose}
          className="self-start text-ink-muted"
        >
          <X />
        </Button>
      </div>

      <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
        {active.map((m) => {
          const d = drafts.get(m.id) ?? defaultDraft;
          const input = inputs.find((i) => i.memberId === m.id) ?? {
            memberId: m.id,
            date,
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            guestMeals: 0,
          };
          const total = cellTotal(input);
          const errors = validateEntry(input, range).errors;
          return (
            <li
              key={entryKey(m.id, date)}
              className="rounded-xl border border-line bg-canvas p-3"
            >
              <div className="flex items-center gap-2.5">
                <Avatar name={m.name} size="sm" />
                <p className="min-w-0 flex-1 truncate text-body font-semibold text-ink">
                  {m.name}
                </p>
                <p className="text-body-sm text-ink-muted">
                  <span className="text-h4 text-ink tabular-nums">
                    {Number.isFinite(total) ? formatMeals(total) : "–"}
                  </span>{" "}
                  meals
                </p>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {slots.map((s) => {
                  const on = d[s.key] > 0;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      aria-pressed={on}
                      aria-label={`${m.name} ${s.label}`}
                      onClick={() => {
                        const v = on ? 0 : 1;
                        if (s.key === "breakfast")
                          patch(m.id, { breakfast: v });
                        else if (s.key === "lunch") patch(m.id, { lunch: v });
                        else patch(m.id, { dinner: v });
                      }}
                      className={cn(
                        "min-h-11 cursor-pointer rounded-lg border text-body-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aubergine-500",
                        on
                          ? "border-aubergine-800 bg-aubergine-800 text-white"
                          : "border-line-strong bg-surface text-ink-muted hover:bg-aubergine-50",
                      )}
                    >
                      {s.label}
                      {on && d[s.key] !== 1 ? ` ${formatMeals(d[s.key])}` : ""}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-body-sm font-medium text-ink-muted">
                  Guest meals
                </span>
                <NumberStepper
                  label={`${m.name} guest meals`}
                  value={d.guestMeals}
                  invalid={errors.length > 0}
                  onChange={(v) => patch(m.id, { guestMeals: v })}
                />
              </div>
              {errors[0] && (
                <p
                  role="alert"
                  className="mt-2 text-body-sm font-medium text-error"
                >
                  {errors[0].message}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3 border-t border-line bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <p className="text-body-sm text-ink-muted">
          House total{" "}
          <span className="text-h4 text-ink tabular-nums">
            {formatMeals(houseDay)}
          </span>
        </p>
        <Button
          type="submit"
          className="ml-auto"
          disabled={bad || changed.length === 0}
        >
          Save Meal Entry
        </Button>
      </div>
    </form>
  );
}

/** Bulk "log a whole day" form: centered dialog on desktop, bottom sheet on mobile (responsive.md §7B). */
export function DayEntryDialog({
  open,
  initialDate,
  data,
  onSave,
  onClose,
}: {
  open: boolean;
  initialDate: string;
  data: MealsGridData;
  onSave: (inputs: UpsertMealInput[]) => void;
  onClose: () => void;
}) {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [picked, setPicked] = useState<string | null>(null);
  const date = picked ?? initialDate;
  function close() {
    setPicked(null);
    onClose();
  }
  return (
    <DrawerSheet
      open={open}
      onClose={close}
      side={desktop ? "center" : "bottom"}
      title="Log meals for a day"
      hideTitle
      showClose={false}
      className="bg-surface"
    >
      {open && (
        <DayEntryForm
          key={date}
          data={data}
          date={date}
          onDate={setPicked}
          onSave={(inputs) => {
            onSave(inputs);
            close();
          }}
          onClose={close}
        />
      )}
    </DrawerSheet>
  );
}
