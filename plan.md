# MessTally Frontend — Dashboard Wiring Plan

Tracker for wiring the remaining `/dashboard/*` modules one at a time.
Companion to `workflow-plan.md` (features/design) and `AGENTS.md` (conventions).

Status: `[ ]` todo · `[~]` next up · `[x]` done · `[!]` blocked

Contract source: `API.md` (repo root, copy of `../mess-tally-backend/API.md`).
Rule: designed components stay mounted only when their API is wired; never render fixture data.

---

## Open decisions (resolved for Step 1)

- [x] Member self-service `PATCH /meals/me` (PRO, today-only, pre-cutoff) — **deferred**; Step 1 = manager flow only.
- [x] Optimistic cell updates vs invalidate + refetch — **invalidate + refetch** (revisit only if the grid feels slow).
- [x] "Open a month" CTA in the meals no-month state — **deferred to the Summary step** (Step 4). The button is still inert.

---

## Step 1 — Module 05: Daily Meals (`/dashboard/meals`)

`[x]` Contract: `API.md` §24–28. Backend routes verified in `../mess-tally-backend/src/app/module/meal/meal.route.ts`.
UI consumes `MealsGridData` (`src/lib/types/meal.types.ts`); wiring = adapter + callbacks.

### Contract & data layer

- [x] Add DTOs to `src/lib/types/meal.types.ts`: `MealsResponseData`, `MealsMonthDto`, `MealsGridMemberDto`, `MealsGridDayDto`, `MealTotalsDto`, `MealEntryDto`, `BulkMealsInput` (view model unchanged). `month.status` is `MonthStatus | null` — the API returns `null` when `exists: false`.
- [x] `src/validations/meal.validation.ts` (new): `mealEntrySchema`, `bulkMealsInputSchema`; exported from `src/validations/index.ts`.
- [x] `src/api/meal.api.ts` (new): `getMeals({ month })`, `upsertMeal` (`PUT /meals`), `bulkUpsertMeals` (`POST /meals/bulk`), `deleteMeal` (`DELETE /meals/:id`); exported from `src/api/index.ts`.
- [x] `src/lib/queryKeys.ts`: `meals: { all: ["meals"], detail(month) }`.
- [x] `src/hooks/meal.hook.ts` (new): `useMeals(month)` + upsert/bulk/delete mutations; on success invalidate `meals.all`, `dashboard.all`, `summary.all`; exported from `src/hooks/index.ts`.
- [x] `src/lib/mappers/meals.mapper.ts` (new): `toMealsGridData(...)` — flattens logged cells, `month = null` unless `exists && status !== null`, roles from workspace members, totals from `/dashboard`.
- [x] `src/lib/dates.ts`: `todayIso()`.

### Page wiring

- [x] `src/components/meals/meals-page.tsx` (new, client): `useMonthStore` + `useWorkspace` + `useMeals`; skeleton, 402 PRO card, error + retry, Zod-guarded mutation callbacks.
- [x] `src/components/meals/meals-view.tsx`: real async `onSaveCell` / `onClearCell(entryId)` / `onSaveBulk`, reactive `saving` set + `failedKey`, `getApiMessage` toasts, `canEdit = viewer.isManager && !month.isLocked`, header log button gated.
- [x] `src/app/(root)/dashboard/meals/page.tsx`: renders `MealsPage` (metadata kept).
- [x] `src/components/meals/index.ts` exports `meals-page` (already re-exported through `src/components/index.ts`).

### Verify & close out

- [x] `npm run typecheck`
- [x] `npm run lint` (clean) and `npm run build`
- [x] `npx biome check --write <touched files>` (not repo-wide — CRLF churn)
- [x] Live API check against `localhost:8000` (manager token): `GET /meals?month=2026-10` shape matches; `PUT` create + upsert returns same id; `POST /meals/bulk` writes both members; grid reflects writes; `DELETE` ×3 restores the sheet to its single pre-existing entry; `400` on negative / partial counts; `404` on unknown id; `GET` works for a member token. A member **with `isManager: true`** can write — that matches the backend `assertManager` rule, and the UI gate uses the same `viewer.isManager`.
- [ ] Browser click-through (login → edit cell → log day → clear cell) — still to be done by hand; the API path above covers the same calls.
- [x] `workflow-plan.md` 5.1–5.5 + matrix row updated.


---

## Step 2 — Module 06: Bazar (`/dashboard/bazar`)

`[~]` Contract: `API.md` §29–34 (list/create/update/delete + receipt upload/delete).

- [ ] Align DTOs in `src/lib/types/bazar.types.ts` with §29.
- [ ] `src/validations/bazar.validation.ts`.
- [ ] `src/api/bazar.api.ts` — CRUD; receipt endpoints are multipart (`FormData`), verify `apiClient` handling.
- [ ] `src/hooks/bazar.hook.ts` — list/create/update/delete + receipt mutations; invalidate `bazar`, `dashboard`, `summary`.
- [ ] Mapper DTO → view model (check `src/components/bazar/bazar-view.tsx` props).
- [ ] `bazar-page.tsx` + callbacks; active-member write rules per `API.md`.
- [ ] Replace `NotConnectedState` in `src/app/(root)/dashboard/bazar/page.tsx`.
- [ ] Verify + update `workflow-plan.md` (6.1–6.5).

---

## Step 3 — Module 07: Utilities (`/dashboard/utilities`)

`[ ]` Contract: `API.md` §35–45 (bills, fund, replenishment estimate, deposits).

- [ ] Types/validation/API/hooks for utilities + fund deposits.
- [ ] Manager gates on deposit/bill mutations; members read-only where the API says so.
- [ ] Fund balance + replenishment estimate wiring; keep utility math separate from meal math.
- [ ] Mapper + `utility-page.tsx`; replace `NotConnectedState`.
- [ ] Verify + update `workflow-plan.md` (7.1–7.5).

---

## Step 4 — Module 08: Summary & Settlement (`/dashboard/summary`)

`[ ]` Contract: `API.md` §46–48 (`/summary`, `/summary/export`, `/summary/statement`) plus months §21–23.

- [ ] Extend `src/hooks/summary.hook.ts`: `useCloseMonth`, `useReopenMonth`, `useExportSummary`, statement download.
- [ ] Blob download helper (CSV/PDF) with progress + error handling.
- [ ] Close-month confirmation dialog (irreversible); PRO gate for past months.
- [ ] `summary-page.tsx` from existing designed components; replace `NotConnectedState`.
- [ ] Optional per decisions: wire "Open a month" (`POST /months`) from the meals empty state here.
- [ ] Verify + update `workflow-plan.md` (8.1–8.5).

---

## Step 5 — Module 09: Members & Roles (`/dashboard/members`)

`[ ]` Contract: `API.md` §12–19.

- [ ] `member.api.ts` + `member.hook.ts`: members list, pending list, approve/reject, manager/owner transfer, remove, leave.
- [ ] Optimistic status updates + toasts; manager-only action guards.
- [ ] `members-page.tsx` from existing components (`roster`, `dialogs`); replace `NotConnectedState`.
- [ ] Verify + update `workflow-plan.md` (9.1–9.4).

---

## Step 6 — Module 10: Settings & Profile

`[ ]` Contract: `API.md` §50–51 (profile image, profile update); `/mess` details for mess config.

- [ ] `profile.types.ts`, `settings.types.ts`, validations, `profile.api.ts`, `profile.hook.ts`.
- [ ] Profile settings (name, phone, image upload), mess config (only fields the API accepts); notifications/danger zone only if endpoints exist.
- [ ] `settings-page.tsx`; `/profile` route does not exist yet — confirm whether to add it.
- [ ] Verify + update `workflow-plan.md` (10.1–10.4).

---

## Step 7 — Module 11: Subscription (PRO)

`[ ]` Contract: `API.md` §52–56 (`callback`, `GET /subscription`, `activate`, payments).

- [ ] `useInitiateBkash`/payment flow — **verify**: the contract has `activate` + `callback`, no explicit initiate endpoint; confirm with the backend before building the modal.
- [ ] Plan comparison + status card + payment history; success/cancel landing states.
- [ ] Verify + update `workflow-plan.md` (11.1–11.4).

---

## Step 8 — Module 12: TallyBot

`[!]` **Blocked**: no AI routes in `API.md` or `../mess-tally-backend/src/app.ts`. Needs a backend contract first; do not build UI against a guessed API.

---

## Cross-cutting, each step

- [ ] Types → validation → API → query keys → hook → mapper → page → view callbacks.
- [ ] Errors branch on `statusCode` via `src/lib/apiError.ts`, never message text.
- [ ] No server data in Zustand; `selectedMonth === null` keeps the backend current month.
- [ ] One commit-sized change per module; `typecheck` + `build` green; manual flow recorded.
