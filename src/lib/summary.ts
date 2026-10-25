import type {
  FundBlock,
  MealBlock,
  MemberLedgerInput,
  MemberRow,
} from "./types/dashboard.types";
import type { SummarySort, SummaryTransfer } from "./types/summary.types";

const toCents = (v: number) => Math.round(v * 100);

/** Greedy largest-giver → largest-receiver matching in paisa; yields at most n−1 transfers. */
export function settlementTransfers(
  members: Pick<MemberRow, "id" | "balance">[],
): SummaryTransfer[] {
  const givers = members
    .map((m) => ({ id: m.id, cents: -toCents(m.balance) }))
    .filter((m) => m.cents > 0)
    .sort((a, b) => b.cents - a.cents);
  const receivers = members
    .map((m) => ({ id: m.id, cents: toCents(m.balance) }))
    .filter((m) => m.cents > 0)
    .sort((a, b) => b.cents - a.cents);
  const out: SummaryTransfer[] = [];
  let g = 0;
  let r = 0;
  while (g < givers.length && r < receivers.length) {
    const cents = Math.min(givers[g].cents, receivers[r].cents);
    if (cents > 0) {
      out.push({
        fromId: givers[g].id,
        toId: receivers[r].id,
        amount: cents / 100,
      });
    }
    givers[g].cents -= cents;
    receivers[r].cents -= cents;
    if (givers[g].cents === 0) g++;
    if (receivers[r].cents === 0) r++;
  }
  return out;
}

/** F1–F5: totals, meal rate (0 when there are no meals), per-member cost and balance. */
export function buildMealBlock(inputs: MemberLedgerInput[]): MealBlock {
  const totalMeals = inputs.reduce((s, m) => s + m.meals, 0);
  const totalGuestMeals = inputs.reduce((s, m) => s + m.guestMeals, 0);
  const totalBazar = inputs.reduce((s, m) => s + m.bazarPaid, 0);
  const mealRate = totalMeals > 0 ? totalBazar / totalMeals : 0;
  const members: MemberRow[] = inputs.map((m) => {
    const mealCost = m.meals * mealRate;
    return { ...m, mealCost, balance: m.bazarPaid - mealCost };
  });
  return { totalMeals, totalGuestMeals, totalBazar, mealRate, members };
}

/** Share of collected deposits still available, clamped to 0–100. */
export function fundRemainingPercent(fund: FundBlock): number {
  if (fund.totalDeposits <= 0) return 0;
  return Math.max(0, Math.min(100, (fund.balance / fund.totalDeposits) * 100));
}

export function transfersFor(meal: MealBlock | null): SummaryTransfer[] {
  return meal ? settlementTransfers(meal.members) : [];
}

/** Balances within half a paisa count as settled. */
export function isSettled(balance: number): boolean {
  return Math.abs(balance) < 0.005;
}

export function allSettled(meal: MealBlock | null): boolean {
  return !!meal && meal.members.every((m) => isSettled(m.balance));
}

export function hasNoMeals(meal: MealBlock | null): boolean {
  return !!meal && meal.totalMeals === 0 && meal.totalBazar === 0;
}

/** Σ balances; ≈ 0 by construction (F5). */
export function netBalance(meal: MealBlock): number {
  return meal.members.reduce((s, m) => s + m.balance, 0);
}

export function sortMembers(
  members: MemberRow[],
  sort: SummarySort,
): MemberRow[] {
  const dir = sort.dir === "asc" ? 1 : -1;
  return [...members].sort((a, b) => {
    let diff = 0;
    if (sort.key === "name") diff = a.name.localeCompare(b.name);
    else if (sort.key === "meals") diff = a.meals - b.meals;
    else diff = a.balance - b.balance;
    if (diff === 0) diff = a.name.localeCompare(b.name);
    return diff * dir;
  });
}
