import type {
  BazarData,
  BazarEntry,
  BazarFilter,
  BazarInput,
  BazarMember,
  BazarSort,
  BazarValidationError,
} from "./types/bazar.types";

export const NOTE_MAX = 120;
export const AMOUNT_MAX = 1_000_000;

/** F3: Total House Bazar ÷ Total House Meals; 0 when there are no meals. */
export function calcMealRate(totalBazar: number, houseTotal: number): number {
  return houseTotal > 0 ? totalBazar / houseTotal : 0;
}

export function sumAmounts(entries: BazarEntry[]): number {
  return entries.reduce((sum, e) => sum + e.amount, 0);
}

export function paidBy(entries: BazarEntry[], memberId: string): number {
  return sumAmounts(entries.filter((e) => e.memberId === memberId));
}

/** Re-derives the house total and meal rate (AC 4.1.3). */
export function recompute(data: BazarData): BazarData {
  const totalBazar = Math.round(sumAmounts(data.entries) * 100) / 100;
  return {
    ...data,
    totalBazar,
    mealRate: calcMealRate(totalBazar, data.houseMeals),
  };
}

export function upsertBazar(
  data: BazarData,
  input: BazarInput,
  newId: string,
): BazarData {
  const existing = input.id
    ? data.entries.find((e) => e.id === input.id)
    : undefined;
  const entries = existing
    ? data.entries.map((e) =>
        e === existing
          ? {
              ...e,
              memberId: input.memberId,
              date: input.date,
              amount: input.amount,
              note: input.note,
            }
          : e,
      )
    : [
        ...data.entries,
        {
          id: newId,
          memberId: input.memberId,
          date: input.date,
          amount: input.amount,
          note: input.note,
          receiptUrl: null,
          isLocked: false,
        },
      ];
  return recompute({ ...data, entries });
}

export function removeBazar(data: BazarData, id: string): BazarData {
  return recompute({
    ...data,
    entries: data.entries.filter((e) => e.id !== id),
  });
}

/** Stepper-less amount field: blank or junk becomes NaN so validation can flag it. */
export function parseAmount(value: string): number {
  const cleaned = value.replace(/,/g, "").trim();
  return cleaned === "" ? Number.NaN : Number(cleaned);
}

export interface ValidationContext {
  start: string;
  end: string;
  today: string;
  memberIds: string[];
}

/** Client-side mirror of the backend Zod rules. */
export function validateBazar(
  input: BazarInput,
  ctx: ValidationContext,
): BazarValidationError[] {
  const errors: BazarValidationError[] = [];
  if (!ctx.memberIds.includes(input.memberId)) {
    errors.push({ field: "memberId", message: "Choose who paid." });
  }
  if (!Number.isFinite(input.amount)) {
    errors.push({ field: "amount", message: "Enter an amount." });
  } else if (input.amount <= 0) {
    errors.push({
      field: "amount",
      message: "Amount must be more than ৳ 0.",
    });
  } else if (
    Math.abs(input.amount * 100 - Math.round(input.amount * 100)) > 1e-6
  ) {
    errors.push({ field: "amount", message: "Use at most two decimals." });
  } else if (input.amount > AMOUNT_MAX) {
    errors.push({ field: "amount", message: "That amount looks too large." });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    errors.push({ field: "date", message: "Pick a valid date." });
  } else if (input.date < ctx.start || input.date > ctx.end) {
    errors.push({ field: "date", message: "That date is outside this month." });
  } else if (input.date > ctx.today) {
    errors.push({
      field: "date",
      message: "Bazar can’t be dated in the future.",
    });
  }
  if (input.note.length > NOTE_MAX) {
    errors.push({
      field: "note",
      message: `Keep the note under ${NOTE_MAX} characters.`,
    });
  }
  return errors;
}

export const noFilter: BazarFilter = { memberId: "all", from: "", to: "" };

export function isFiltered(f: BazarFilter): boolean {
  return f.memberId !== "all" || f.from !== "" || f.to !== "";
}

export function filterEntries(
  entries: BazarEntry[],
  f: BazarFilter,
): BazarEntry[] {
  return entries.filter(
    (e) =>
      (f.memberId === "all" || e.memberId === f.memberId) &&
      (f.from === "" || e.date >= f.from) &&
      (f.to === "" || e.date <= f.to),
  );
}

export function sortEntries(
  entries: BazarEntry[],
  sort: BazarSort,
  members: BazarMember[],
): BazarEntry[] {
  const name = (id: string) => members.find((m) => m.id === id)?.name ?? "";
  const dir = sort.dir === "asc" ? 1 : -1;
  return [...entries].sort((a, b) => {
    let diff = 0;
    if (sort.key === "date") diff = a.date.localeCompare(b.date);
    else if (sort.key === "amount") diff = a.amount - b.amount;
    else diff = name(a.memberId).localeCompare(name(b.memberId));
    if (diff === 0)
      diff = a.date.localeCompare(b.date) || a.id.localeCompare(b.id);
    return diff * dir;
  });
}

export interface DateGroup {
  date: string;
  entries: BazarEntry[];
  total: number;
}

/** Newest date first, for the mobile card list. */
export function groupByDate(entries: BazarEntry[]): DateGroup[] {
  const map = new Map<string, BazarEntry[]>();
  for (const e of entries) {
    map.set(e.date, [...(map.get(e.date) ?? []), e]);
  }
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, list]) => ({
      date,
      entries: list,
      total: list.reduce((s, e) => s + e.amount, 0),
    }));
}
