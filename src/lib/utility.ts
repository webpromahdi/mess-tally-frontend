import type { FundBlock } from "./types/dashboard.types";
import type {
  UtilityCategory,
  UtilityData,
  UtilityEntry,
  UtilityFilter,
  UtilityInput,
  UtilitySort,
  UtilityValidationError,
} from "./types/utility.types";

export const NOTE_MAX = 120;
export const AMOUNT_MAX = 1_000_000;

export const CATEGORIES: UtilityCategory[] = [
  "Rent",
  "Electricity",
  "Gas",
  "Water",
  "Internet",
  "Cook salary",
  "Garbage / guard",
  "Subscription",
  "Other",
];

const round2 = (v: number) => Math.round(v * 100) / 100;

export function sumKind(
  entries: UtilityEntry[],
  kind: UtilityEntry["kind"],
): number {
  return round2(
    entries.filter((e) => e.kind === kind).reduce((s, e) => s + e.amount, 0),
  );
}

export function depositedBy(entries: UtilityEntry[], memberId: string): number {
  return round2(
    entries
      .filter((e) => e.kind === "DEPOSIT" && e.memberId === memberId)
      .reduce((s, e) => s + e.amount, 0),
  );
}

/** Signed effect on the fund: deposits add, bills subtract. */
export function signed(entry: Pick<UtilityEntry, "kind" | "amount">): number {
  return entry.kind === "DEPOSIT" ? entry.amount : -entry.amount;
}

/** Net effect on the fund: deposits add, paid bills subtract (U2). */
export function netOf(entries: UtilityEntry[]): number {
  return round2(
    entries.reduce(
      (s, e) =>
        s + (e.kind === "DEPOSIT" ? e.amount : e.isPaid ? -e.amount : 0),
      0,
    ),
  );
}

/** U2: balance = deposits − paid bills. U3: replenish when balance ≤ 0. */
export function buildFundBlock(
  totalDeposits: number,
  totalPaidBills: number,
): FundBlock {
  const balance = totalDeposits - totalPaidBills;
  return {
    totalDeposits,
    totalPaidBills,
    balance,
    needsReplenishment: balance <= 0,
  };
}

/** Share of collected deposits still available, clamped to 0–100. */
export function fundRemainingPercent(fund: FundBlock): number {
  if (fund.totalDeposits <= 0) return 0;
  return Math.max(0, Math.min(100, (fund.balance / fund.totalDeposits) * 100));
}

/** U2 counts only bills actually paid from the fund. */
export function paidBills(entries: UtilityEntry[]): number {
  return round2(
    entries
      .filter((e) => e.kind === "BILL" && e.isPaid)
      .reduce((s, e) => s + e.amount, 0),
  );
}

/** Re-derives U1–U3 from the ledger. */
export function recompute(data: UtilityData): UtilityData {
  return {
    ...data,
    ...buildFundBlock(
      sumKind(data.entries, "DEPOSIT"),
      paidBills(data.entries),
    ),
  };
}

export function upsertEntry(
  data: UtilityData,
  input: UtilityInput,
  newId: string,
): UtilityData {
  const fields = {
    kind: input.kind,
    memberId: input.kind === "DEPOSIT" ? input.memberId : null,
    category: input.kind === "BILL" ? input.category : null,
    date: input.date,
    amount: input.amount,
    note: input.note,
  };
  const existing = input.id
    ? data.entries.find((e) => e.id === input.id)
    : undefined;
  const entries: UtilityEntry[] = existing
    ? data.entries.map((e) => (e === existing ? { ...e, ...fields } : e))
    : [
        ...data.entries,
        {
          id: newId,
          ...fields,
          isPaid: input.kind === "DEPOSIT",
          receiptUrl: null,
          isLocked: false,
        },
      ];
  return recompute({ ...data, entries });
}

export function removeEntry(data: UtilityData, id: string): UtilityData {
  return recompute({
    ...data,
    entries: data.entries.filter((e) => e.id !== id),
  });
}

/** Blank or junk becomes NaN so validation can flag it. */
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
export function validateEntry(
  input: UtilityInput,
  ctx: ValidationContext,
): UtilityValidationError[] {
  const errors: UtilityValidationError[] = [];
  if (
    input.kind === "DEPOSIT" &&
    !ctx.memberIds.includes(input.memberId ?? "")
  ) {
    errors.push({ field: "memberId", message: "Choose who deposited." });
  }
  if (
    input.kind === "BILL" &&
    !CATEGORIES.includes(input.category as UtilityCategory)
  ) {
    errors.push({ field: "category", message: "Choose a bill category." });
  }
  if (!Number.isFinite(input.amount)) {
    errors.push({ field: "amount", message: "Enter an amount." });
  } else if (input.amount <= 0) {
    errors.push({ field: "amount", message: "Amount must be more than ৳ 0." });
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
      message: "Entries can’t be dated in the future.",
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

export const noFilter: UtilityFilter = {
  kind: "all",
  category: "all",
  from: "",
  to: "",
};

export function isFiltered(f: UtilityFilter): boolean {
  return (
    f.kind !== "all" || f.category !== "all" || f.from !== "" || f.to !== ""
  );
}

export function filterEntries(
  entries: UtilityEntry[],
  f: UtilityFilter,
): UtilityEntry[] {
  return entries.filter(
    (e) =>
      (f.kind === "all" || e.kind === f.kind) &&
      (f.category === "all" || e.category === f.category) &&
      (f.from === "" || e.date >= f.from) &&
      (f.to === "" || e.date <= f.to),
  );
}

export function sortEntries(
  entries: UtilityEntry[],
  sort: UtilitySort,
): UtilityEntry[] {
  const dir = sort.dir === "asc" ? 1 : -1;
  return [...entries].sort((a, b) => {
    let diff =
      sort.key === "date" ? a.date.localeCompare(b.date) : a.amount - b.amount;
    if (diff === 0)
      diff = a.date.localeCompare(b.date) || a.id.localeCompare(b.id);
    return diff * dir;
  });
}

export interface DateGroup {
  date: string;
  entries: UtilityEntry[];
}

/** Newest date first, for the mobile card list. */
export function groupByDate(entries: UtilityEntry[]): DateGroup[] {
  const map = new Map<string, UtilityEntry[]>();
  for (const e of entries) {
    map.set(e.date, [...(map.get(e.date) ?? []), e]);
  }
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, list]) => ({ date, entries: list }));
}
