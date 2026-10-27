# AGENTS.md — MessTally Frontend

Next.js 16 App Router (React 19, strict TS) client for MessTally. Server data lives in TanStack Query, UI state in Zustand, forms in TanStack Form + Zod v3, HTTP via ofetch, styling via Tailwind v4 CSS tokens + shadcn/ui. The API is the sibling repo `../mess-tally-backend` and is expected at `http://localhost:8000/api/v1`.

## Commands

```bash
npm run dev        # Next dev server; needs the backend running to sign in
npm run typecheck  # tsc --noEmit (passes on a clean checkout)
npm run build      # type-checks and prints the route map
npm run lint       # biome lint src (no writes; currently clean)
npm run check      # biome check --write src — auto-fixes AND reformats
npx shadcn add <c> # adds a primitive to src/components/ui/
```

- There is **no test suite** (`npm test` does not exist). Verify with `npm run typecheck`, `npm run build`, and a manual login → dashboard pass against the backend.
- `src/env.ts` validates `NEXT_PUBLIC_API_BASE_URL` (see `.env.example`), so `npm run build` fails without env config unless `SKIP_ENV_VALIDATION=true`.
- Biome only scans `src/**/*`; root configs and docs are neither linted nor formatted.
- Windows checkout: `core.autocrlf=true` makes every working-tree file CRLF, while Biome expects LF, so a repo-wide `npx biome format src` reports ~251 errors that are only line endings and `npm run check` rewrites them all. Scope fixes to files you touched: `npx biome check --write <paths>`.

## Sources of truth

- `API.md` (repo root) is a copy of `../mess-tally-backend/API.md` — endpoints, envelope, role gates, error codes. Read it before wiring anything and re-sync when the backend changes.
- `workflow-plan.md` — module status plus the two-phase protocol (design with typed dummy data → wire APIs). `Design.md` and `responsive.md` hold tokens, breakpoints and 320/390px + 44px touch-target rules.
- `README.md` is the stale upstream starter (claims "Vega" shadcn style and Zod v4). Trust `package.json`, `components.json`, and this file instead.

## Architecture

- Route groups: `src/app/(marketing-pages)/` is the public site (`/` lives here), `(auth)/` the login/reset pages, `(root)/` the app (`/dashboard/**`, `/onboarding/**`). Pages stay server components; interactivity lives in `"use client"` views under `src/components/<feature>/`.
- Route protection is `src/proxy.ts` (Next 16 renamed `middleware.ts`). It only decodes the httpOnly `accessToken` cookie's `exp` claim and uses an explicit matcher — add new protected paths there; layouts do not guard.
- Auth is cookie-based: the backend sets `accessToken`/`refreshToken`, `apiClient` sends `credentials: "include"`. Never store tokens in Zustand/localStorage. `QueryCache` redirects 401 → `/login?expired=1` and 403 (no ACTIVE membership) → `/onboarding`, but only under `/dashboard` (`src/providers/query.provider.tsx`).
- Data flow: hook (`src/hooks/<name>.hook.ts`) → API function (`src/api/<name>.api.ts`, typed `apiClient<ApiResponse<T>>`) → `apiClient`. Hooks are client-only.
- The dashboard shell and pages share `useWorkspace(month)` / `useDashboardView(month)` (`src/hooks/workspace.hook.ts`, `dashboard-view.hook.ts`). Reuse them instead of refetching `/auth/me`, `/mess/my`, `/months`, `/subscription`, `/dashboard`, `/summary` separately; DTO → view-model mapping belongs in `src/lib/mappers/dashboard.mapper.ts`.
- Query keys live in `src/lib/queryKeys.ts`; add new keys there and invalidate by prefix. Anything changing mess scope must invalidate the same five keys as `useMessScopeInvalidation` in `src/hooks/mess.hook.ts`.
- `useMonthStore.selectedMonth === null` means "let the backend resolve the current month" (no `?month=` param). Do not default it to a concrete `YYYY-MM`, or you fork the cache.
- Modules 05–09 (meals, bazar, utilities, summary, members routes) are intentionally **not wired**: each page renders `<NotConnectedState />` and the designed components under `src/components/<feature>/` must stay unmounted with dummy data. The dashboard *is* live and already consumes `/summary` for its charts.

## File placement

| Concern | Location | Hard rule |
| :--- | :--- | :--- |
| Server state | `src/hooks/<name>.hook.ts` | TanStack Query only |
| UI state | `src/store/<name>.store.ts` | UI pointers only (`selectedMonth`, `activeMessId`, modals) |
| HTTP | `src/api/<name>.api.ts` | pure async functions over `apiClient` |
| Types | `src/lib/types/<name>.types.ts` | strict, no `any` |
| Validation | `src/validations/<name>.validation.ts` | Zod v3 schemas |
| Primitives | `src/components/ui/` | managed by the shadcn CLI |
| Feature UI | `src/components/<feature>/` | folder barrel re-exported from `src/components/index.ts` |

## Conventions

- Success payloads use the `{ success, message, data }` envelope (`ApiResponse<T>` in `src/lib/types/index.ts`); paginated ones add `meta`.
- Errors: branch on `statusCode` through `src/lib/apiError.ts` (`isAuthError` 401, `isNoMembershipError` 403, `isUpgradeRequired` 402, `isRetryableError` retries only 5xx/network). Never branch on message text — production masks it. Use `getApiMessage` (or legacy `getErrorMessage` in auth forms) for display only.
- Dates/months: use `src/lib/dates.ts` (UTC-parsed `YYYY-MM-DD`, `YYYY-MM` keys, `monthLabel`). Avoid `new Date(iso)` + local getters or ad-hoc date-fns formatting; days drift by timezone.
- Money: `formatBDT` from `src/lib/format.ts` (৳, U+2212 minus) and `<MoneyPill>`; no `toLocaleString`/raw Intl in components.
- Domain math is already implemented as pure helpers in `src/lib/{meals,bazar,utility,summary}.ts` (meal totals, validation mirror, greedy settlement, utility fund). Reuse them instead of re-deriving formulas.
- Styling is Tailwind v4 CSS-first: tokens are declared with `@theme` in `src/app/globals.css` (`bg-canvas`, `text-ink`, `border-line`, `bg-brand-accent`, `text-money-*`, `text-h1`, `text-body-sm`). There is no `tailwind.config.*`; add tokens in `globals.css`. Use semantic tokens, not hex. Dark mode is class-based (`@custom-variant dark`), not `prefers-color-scheme`.
- Forms: TanStack Form `useForm`; reuse schemas from `src/validations/` both as per-field `validators` (`schema.shape.field.safeParse`) and as a full `safeParse` in `onSubmit` — see `src/components/auth/login-form.tsx`. Zod v3 APIs (`.error.errors`).
- Toasts: `toast` from `sonner` for mutations (Toaster mounted in the root layout); the shared `<Toast>` is only for the pre-designed module views.
- Env access goes through `@/env`. `next.config.ts` allows images only from `i.ibb.co` / `i.ibb.co.com`; extend `images.remotePatterns` for new avatar/image hosts.
- Imports use `@/*` and folder barrels (`@/hooks`, `@/api`, `@/store`, `@/components/shared`, `@/lib/types`); page files may import a feature view directly (`@/components/dashboard/dashboard-page`).
