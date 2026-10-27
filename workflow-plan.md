# MessTally Frontend — Master Workflow & Feature Plan

> **Document Status:** Active Living Workflow Plan  
> **Frontend Project Path:** [mess-tally-frontend](.) — `/Users/masadrayan/My Projects/Mess Tally/mess-tally-frontend`  
> **Backend Project Path:** [mess-tally-backend](../mess-tally-backend) — `/Users/masadrayan/My Projects/Mess Tally/mess-tally-backend`  
> **Core Backend Contract Sources:**  
> - [plan.md](../mess-tally-backend/plan.md) — Feature scopes, phase implementation status, and architectural decisions (D1–D14).  
> - [API.md](../mess-tally-backend/API.md) — Route endpoints, HTTP methods, JSON request/response contracts, authorization rules, and error codes.  
> - [prd.md](../mess-tally-backend/prd.md) — Business logic, calculation formulas (meal rate, balance, greedy settlement), roles, and user stories.  
> **Frontend Design & Architectural Guidelines:**  
> - [migration-plan.md](./migration-plan.md) — Comprehensive migration specification for Figma AI-generated UI (Modules 04–09) into Next.js App Router.  
> - [Design.md](./Design.md) — Color tokens, typography, UX patterns, and 11 benchmark design references.  
> - [responsive.md](./responsive.md) — Viewport breakpoints, mobile-first touch ergonomics, and adaptive layout rules.  
> - [AGENTS.md](./AGENTS.md) — Next.js 16 conventions, barrel imports, state boundaries (TanStack Query vs Zustand vs TanStack Form), and directory structure.  

---

## 1. Operating Principles & Workflow Protocol

### 1.1 The Two-Phase Execution Model
Every dynamic feature follows an explicit two-phase lifecycle:

```
[ Backend Check & Verification ]
             │
             ▼
[ Phase 1: Screen Design (Dummy Data) ]
  • Update Design.md with design references (Dribbble/Behance)
  • Build responsive UI matching responsive.md
  • Use dummy data strictly typed against backend JSON contracts
  • Include Member vs Manager view states, skeletons, and empty states
             │
             ▼
[ Phase 2: Dynamic API Integration (A to Z) ]
  • Types (src/lib/types/)
  • Zod Schemas (src/validations/)
  • API Functions (src/api/) via apiClient (ofetch)
  • TanStack Query Hooks (src/hooks/) with cache invalidation
  • TanStack Form state & inline validation
  • Optimistic updates & Sonner notifications
```

### 1.2 Independent Feature Execution
Work can be picked up modularly in any order according to priority (e.g., polishing marketing pages, implementing mess setup, or connecting auth APIs). Each feature tracks its own independent progress.

### 1.3 Pre-Flight Backend Checkpoint Protocol
Before initiating work on any feature or screen:
1. **Direct Backend Review**: Open and verify the relevant sections of:
   - [API.md](../mess-tally-backend/API.md) (endpoint signature, params, response schema, authorization levels).
   - [plan.md](../mess-tally-backend/plan.md) & [prd.md](../mess-tally-backend/prd.md) (business rules, role gates).
2. **Design Sync**: Verify and update [Design.md](./Design.md) if the backend contract introduced new data fields, actions, or role permissions.
3. **User Confirmation**: The agent must prompt the user with direct links to verify if any recent backend changes were introduced.

---

## 2. Master Progress Matrix

| Module / Feature | UI (Dummy Data) | API Integration | Current Status | Target Route |
| :--- | :---: | :---: | :---: | :--- |
| **01. Marketing & Public Pages** | 🟢 Done | N/A (Static) | Completed | `/`, `/about`, `/contact`, `/features`, `/pricing` |
| **02. Authentication & Access** | 🟢 Done | 🟢 Done | Completed | `/login`, `/register`, `/forgot-password`, `/reset-password` |
| **03. Mess Onboarding & Setup** | 🟢 Done | 🟡 Partial | In Progress (create/join wired) | `/onboarding`, `/onboarding/create`, `/onboarding/join`, `/onboarding/pending` |
| **04. Dashboard Overview** | 🟢 Done | 🟢 Done | Completed | `/dashboard` |
| **05. Daily Meals Matrix** | 🟢 Done | 🟢 Done | Completed (manager flow; self-service `PATCH /meals/me` deferred) | `/dashboard/meals` |
| **06. Bazar / Grocery Expenses** | 🟡 Partial | ⚪ Pending | Not connected (placeholder) | `/dashboard/bazar` |
| **07. Utility Bills & Advance Fund** | 🟡 Partial | ⚪ Pending | Not connected (placeholder) | `/dashboard/utilities` |
| **08. Monthly Summary & Settlement** | 🟡 Partial | ⚪ Pending | Not connected (placeholder) | `/dashboard/summary` |
| **09. Members & Roles Management** | 🟡 Partial | ⚪ Pending | Not connected (placeholder) | `/dashboard/members` |
| **10. Settings & Mess Profile** | 🟡 Partial | ⚪ Pending | In Progress (Shell + Placeholder) | `/dashboard/settings`, `/profile` |
| **11. Subscription (bKash PRO)** | ⚪ Pending | ⚪ Pending | Queued | `/dashboard/subscription` |
| **12. AI Chatbot (TallyBot)** | ⚪ Pending | ⚪ Pending | Queued | Floating drawer / `/dashboard/ai-chat` |

> **Dummy data removed:** Modules 05–09 no longer mount fixture data. Their designed components remain in the codebase for Phase 2, but every route renders an honest "not connected yet" state until the APIs are wired.

*Status Legend:* 🟢 Done · 🟡 In Progress · ⚪ Pending / Queued

---

## 3. Feature Breakdown & Implementation Checklists

---

### Module 01: Marketing & Public Pages
- **Backend Reference:** Not applicable (static public routes).
- **Frontend References:** [Design.md](./Design.md), [responsive.md](./responsive.md).
- **Routes:** `src/app/(marketing-pages)/` (`/`, `/about`, `/contact`, `/features`, `/pricing`).

#### Phase 1: Screen Design & Responsive Layout
- [x] Marketing navigation bar & sticky header with mobile menu ([src/components/marketing/header.tsx](./src/components/marketing/header.tsx))
- [x] Shared marketing footer with brand links & social icons ([src/components/marketing/footer.tsx](./src/components/marketing/footer.tsx))
- [x] Features showcase page (`/features` in [src/app/(marketing-pages)/features/page.tsx](./src/app/%28marketing-pages%29/features/page.tsx))
- [x] About Us story & team page (`/about` in [src/app/(marketing-pages)/about/page.tsx](./src/app/%28marketing-pages%29/about/page.tsx))
- [x] Contact Us page with responsive form (`/contact` in [src/app/(marketing-pages)/contact/page.tsx](./src/app/%28marketing-pages%29/contact/page.tsx))
- [x] Pricing page & plan comparison matrix (`/pricing` in [src/app/(marketing-pages)/pricing/page.tsx](./src/app/%28marketing-pages%29/pricing/page.tsx)) — **COMPLETED**
  - [x] 3-cycle billing toggle (Monthly, 6 Months, 1 Year) with stacked label & badges ([src/components/marketing/pricing-billing-toggle.tsx](./src/components/marketing/pricing-billing-toggle.tsx))
  - [x] 3 pricing tier cards: Starter (Free), Mess PRO (Featured Aubergine card), Hostel Custom ([src/components/marketing/pricing-cards.tsx](./src/components/marketing/pricing-cards.tsx))
  - [x] 5-category detailed feature comparison table with mobile swipe hint and `[contain:paint]` layout isolation ([src/app/(marketing-pages)/pricing/page.tsx](./src/app/%28marketing-pages%29/pricing/page.tsx))
  - [x] Bachelor flatmate FAQ accordion ([src/components/marketing/pricing-faq.tsx](./src/components/marketing/pricing-faq.tsx))
  - [x] Zero-tolerance horizontal overflow containment verified across 320px and 390px viewports
- [x] Mobile ergonomics & zero-overflow audit across all public routes (320px & 390px viewports, touch targets ≥ 44px)
- [x] Main landing home page & hero section with value proposition (`/` in `src/app/(marketing-pages)/page.tsx`) — **COMPLETED**
  - [x] Hero section recreated to closely match reference design: eyebrow badge, hand-drawn golden curve underline under 'together.', primary 'Get Started' and secondary 'See How It Works' play CTAs, trust badge, and high-fidelity mess dashboard visual asset ([src/components/marketing/landing-hero.tsx](./src/components/marketing/landing-hero.tsx))
  - [x] Core feature highlights 5-item strip with restrained brand backgrounds ([src/components/marketing/landing-feature-strip.tsx](./src/components/marketing/landing-feature-strip.tsx))
  - [x] Our Story section with handwritten charts to digital dashboard asset & About CTA ([src/components/marketing/landing-story.tsx](./src/components/marketing/landing-story.tsx))
  - [x] How It Works 3-step workflow with connected direction arrows ([src/components/marketing/landing-how-it-works.tsx](./src/components/marketing/landing-how-it-works.tsx))
  - [x] Key Features 6-card detailed grid grounded in PRD capabilities ([src/components/marketing/landing-key-features.tsx](./src/components/marketing/landing-key-features.tsx))
  - [x] Frequently Asked Questions accessible accordion with 5 PRD-grounded answers ([src/components/marketing/landing-faq.tsx](./src/components/marketing/landing-faq.tsx))
  - [x] Final Deep Aubergine CTA section with Marigold sunburst and Get Started CTA ([src/components/marketing/landing-cta.tsx](./src/components/marketing/landing-cta.tsx))
  - [x] Multi-viewport responsive verification (320px, 375px, 390px, 768px, 1024px, 1440px) with 0px horizontal overflow across all tiers

---

### Module 02: Authentication & Access Control
- **Backend References:**
  - [API.md § 7: Auth](../mess-tally-backend/API.md#auth)
  - [prd.md § 2.1: Module 1](../mess-tally-backend/prd.md#module-1-authentication--access-control-auth)
- **Routes:** `src/app/(auth)/` (`/login`, `/register`, `/forgot-password`, `/reset-password`).

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Login page layout (`/login` — split screen on desktop, centered on mobile)
- [x] Register page layout (`/register` — name, email, password, terms checkbox)
- [x] Email OTP verification step on register page (`/register` — 6-digit OTP segmented input, countdown timer, resend cooldown)
- [x] Forgot password page (`/forgot-password` — email verification prompt)
- [x] Reset password page (`/reset-password` — token & new password fields)
- [x] Dummy validation display and button loading states

#### Phase 2: Dynamic API Integration (A to Z) — **COMPLETED**
- [x] **2.1 Types:** Define auth request and response shapes in `src/lib/types/auth.types.ts` (`LoginRequest`, `RegisterRequest`, `VerifyEmailRequest`, `ResendOtpRequest`, `LoginResponseData`, `AuthMeResponseData`, `User`, `UserRole`, `ActiveMessSummary`).
- [x] **2.2 Validations:** Create Zod schemas in `src/validations/auth.validation.ts` (`loginSchema`, `registerSchema`, `verifyEmailSchema`, `resendOtpSchema`, `forgotPasswordSchema`, `resetPasswordSchema`).
- [x] **2.3 API Service:** Implement endpoints in `src/api/auth.api.ts`:
  - [x] `POST /auth/login` (email, password) → sets refresh cookie & returns accessToken + activeMessId.
  - [x] `POST /auth/register` (name, email, password) → returns 201 and dispatches 6-digit OTP to email.
  - [x] `POST /auth/verify-email` (email, otp) → verifies 6-digit OTP, creates user row, sets cookies, and logs in user.
  - [x] `POST /auth/resend-otp` (email, purpose) → resends 6-digit OTP with 60s cooldown (max 3 resends).
  - [x] `GET /auth/me` → fetches current authenticated user & active mess pointer.
  - [x] `POST /auth/logout` → clears session & cookies.
  - [x] `POST /auth/refresh-token` → automatic silent token refresh via cookie.
  - [x] `POST /auth/forgot-password` → sends reset email with 6-digit OTP.
  - [x] `POST /auth/reset-password` → resets password using 6-digit OTP.
- [x] **2.4 State Management:** Implement `src/store/auth.store.ts` (Zustand) for client user session, tokens, and active mess state.
- [x] **2.5 Route Protection:** Configure Next.js route proxy / middleware in `src/proxy.ts` and `src/middleware.ts` (redirect unauthenticated users to `/login`, redirect authenticated users with active mess to `/dashboard`, or to `/onboarding` if no active mess).
- [x] **2.6 Form Hookup:** Connect all auth pages to TanStack Form with schema validation, loading states, and disabled submit buttons during submission.
- [x] **2.7 Feedback & Errors:** Integrate Sonner toasts for successful login/register and user-friendly error banners for invalid credentials (401) or email collision (409).

---

### Module 03: Mess Onboarding & Setup
- **Backend References:**
  - [API.md § 8: Mess](../mess-tally-backend/API.md#mess)
  - [API.md § 9: Members](../mess-tally-backend/API.md#members)
  - [plan.md § 5: Phase 1](../mess-tally-backend/plan.md#dev-a)
- **Target Routes:** `src/app/(root)/onboarding/` (`/onboarding`, `/onboarding/create`, `/onboarding/join`, `/onboarding/pending`).

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Dedicated Onboarding Header ([src/app/(root)/onboarding/layout.tsx](./src/app/%28root%29/onboarding/layout.tsx)) with transparent background, brand logo ([src/components/shared/brand-logo.tsx](./src/components/shared/brand-logo.tsx)), and decoupled user menu.
- [x] Authenticated User Profile Menu ([src/components/shared/user-menu.tsx](./src/components/shared/user-menu.tsx)) with avatar, display name, email, streamlined single-line actions (Dashboard, Profile, Settings), and destructive Sign Out action hooked to `useLogout()`.
- [x] Screen jank / layout shift resolution: Eliminated Radix `RemoveScroll` body-locking jumps across header dropdown and select menus using `modal={false}` and `scrollbar-gutter: stable;` on `html`.
- [x] Shared Custom Select Primitive (`src/components/ui/select.tsx`): Built accessible, non-modal dropdown select on Radix primitives with zero-jank overlay positioning, custom `h-11` input-matched trigger, subtle Deep Aubergine (`#3A0F34`) selected highlight, checkmark indicator, and full keyboard navigation.
- [x] Polished Create Mess form controls: Upgraded native HTML selects for Currency (`BDT`, `USD`, `EUR`, `INR`) and Daily Meal Cutoff Time (`10:00 AM`, `11:00 AM`, `12:00 PM`, `08:00 PM`) to the custom `Select` primitive.
- [x] Onboarding choice screen: "Create New Mess" (Become Manager) vs "Join Existing Mess" (Enter Join Code) with custom illustrations ([src/app/(root)/onboarding/page.tsx](./src/app/%28root%29/onboarding/page.tsx)).
- [x] Create Mess screen & form with 2-column layout and "What happens next?" guide ([src/components/onboarding/create-mess-form.tsx](./src/components/onboarding/create-mess-form.tsx)).
- [x] Join Mess screen & form with room code entry and "Need a room code?" guide ([src/components/onboarding/join-mess-form.tsx](./src/components/onboarding/join-mess-form.tsx)).
- [x] Pending Approval waiting screen with status badge, mess details card, and cancel action ([src/app/(root)/onboarding/pending/page.tsx](./src/app/%28root%29/onboarding/pending/page.tsx)).
- [x] Free Plan Notice Banner (up to 5 active members with zero subscription fee notice).
- [x] Performance & Bundle Size Optimization: Converted all onboarding page shells and choice cards to React Server Components, keeping only interactive form leaves in the client bundle.

#### Phase 2: Dynamic API Integration (A to Z)
- [x] **3.1 Types:** `src/lib/types/mess.types.ts` covers `GET /mess/my`, `GET /mess/members`, `POST /mess` and `POST /mess/join`.
- [ ] **3.2 Validations:** Inline submit validation is in place; a dedicated `src/validations/mess.validation.ts` is still pending.
- [x] **3.3 API Service (partial):** `POST /mess` and `POST /mess/join` implemented in `src/api/mess.api.ts`; `GET /mess` and `PATCH /mess` still pending.
- [x] **3.4 Hooks:** `useCreateMess` / `useJoinMess` in `src/hooks/mess.hook.ts`, plus `useMyMesses` / `useMessMembers`; mess-scoped query caches are invalidated after create/join.
- [x] **3.5 Form & State:** Create/join forms now call the real API; the pending screen reads `GET /mess/my` instead of hardcoded mess details.

---

### Module 04: Dashboard Overview
- **Backend References:**
  - [API.md § 49: Dashboard](../mess-tally-backend/API.md#dashboard)
  - [prd.md § 2.1: Module 8](../mess-tally-backend/prd.md)
  - [Design.md § 2: Benchmark references](./Design.md#2-research-summary) (`chat_skanalytic_dashboard.png`, `chat_interoly_expenses.png`).
- **Target Route:** `src/app/(root)/dashboard/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Metric summary cards (Current Month, Total Mess Meals, Meal Rate ৳, Total Bazar Spent ৳, Utility Fund Balance ৳) ([src/components/dashboard/cards/stat-card.tsx](./src/components/dashboard/cards/stat-card.tsx), [src/components/dashboard/cards/meal-rate-card.tsx](./src/components/dashboard/cards/meal-rate-card.tsx)).
- [x] User's Personal Financial Pill / Hero Banner with signed balance +/−, Receiver/Giver indicators, and settlement transfer lines ([src/components/dashboard/cards/my-balance-card.tsx](./src/components/dashboard/cards/my-balance-card.tsx)).
- [x] Quick Action Bar & Header with greeting, role badge, month status, and conditional Manager shortcuts ("Add Meals", "Add Bazar Trip") ([src/components/dashboard/layout/dashboard-header.tsx](./src/components/dashboard/layout/dashboard-header.tsx)).
- [x] Diverging Member Meal Balance Chart (horizontal Recharts + accessible table fallback) and Bazar Share Donut Chart ([src/components/dashboard/charts/member-balance-chart.tsx](./src/components/dashboard/charts/member-balance-chart.tsx), [src/components/dashboard/charts/bazar-share-chart.tsx](./src/components/dashboard/charts/bazar-share-chart.tsx)).
- [x] Contextual Action Queue banners (Pending join approvals, Month closed notice, Utility fund replenishment alert) ([src/components/dashboard/layout/action-queue.tsx](./src/components/dashboard/layout/action-queue.tsx)).
- [x] Mess Info Card with room code copy trigger, plan badge, and active members avatar stack ([src/components/dashboard/cards/mess-info-card.tsx](./src/components/dashboard/cards/mess-info-card.tsx)).
- [x] 12-Column Asymmetric Workspace layout with mobile priority reordering and edge-to-edge chart treatment ([src/components/dashboard/layout/dashboard-layout.tsx](./src/components/dashboard/layout/dashboard-layout.tsx)).
- [x] Pattern B AppShell layout integration with persistent desktop sidebar (collapsible to 64px rail), topbar, mobile drawer, and 5-target bottom nav ([src/components/shell/AppShell.tsx](./src/components/shell/AppShell.tsx)).
- [x] Full visual state coverage with development-only scenario switcher for testing all 10 states (Manager, Member, Closed, Replenish, Empty, No-month Manager/Member, Skeleton, Inline Error, Page Error) ([src/components/dashboard/dashboard-scenarios.tsx](./src/components/dashboard/dashboard-scenarios.tsx)).
- [x] Responsive layout verification across 320px, 375px/390px, 768px, 1024px, 1440px with 0px horizontal overflow.

#### Phase 2: Dynamic API Integration (A to Z) — **COMPLETED**
- [x] **4.1 Types:** `src/lib/types/dashboard.types.ts` matches `GET /dashboard` (§49); supporting DTOs in `mess.types.ts`, `month.types.ts`, `subscription.types.ts` and `summary.types.ts`.
- [x] **4.2 API Service:** `src/api/dashboard.api.ts` (`getDashboard()`), plus `summary.api.ts`, `mess.api.ts`, `month.api.ts`, `subscription.api.ts`.
- [x] **4.3 Hooks:** `src/hooks/dashboard.hook.ts` (`useDashboardData()`), composed by `workspace.hook.ts` and `dashboard-view.hook.ts`; caching, 4xx no-retry / 5xx backoff and refetch on window focus.
- [x] **4.4 Skeletons & Empty States:** `DashboardSkeleton` for the page, `ShellSkeleton` for the app frame, existing no-month/empty/closed states now driven by live API values.
- [x] **4.5 Role Guards:** Manager buttons, pending banner and fund management use `membership.is_manager`; member reads `pendingMemberCount: null`.
- [x] **4.6 Month Scope:** API-driven `MonthSelector` with shared selected-month state; `402` → PRO upgrade state, `403` → onboarding, `401` → login.
- [x] **4.7 Shell Wiring:** `DashboardShellWrapper` now reads `/auth/me`, `/mess/my`, `/subscription`, `/mess/members?status=ACTIVE`, `/months` and `/dashboard` instead of fixtures.

---

### Module 05: Daily Meals Matrix & Logging
- **Backend References:**
  - [API.md § 11: Meals](../mess-tally-backend/API.md#meals)
  - [plan.md § 4: Decisions D1–D3, D11](../mess-tally-backend/plan.md#4-decisions-needed-before-phase-2-prd-gaps)
- **Target Route:** `src/app/(root)/dashboard/meals/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Daily Meal Matrix / Spreadsheet view with sticky member names column & day totals footer ([src/components/meals/grid/meals-grid.tsx](./src/components/meals/grid/meals-grid.tsx)).
- [x] Mobile Daily Carousel / Single-Day View (easy thumb entry with `+` / `−` steppers) ([src/components/meals/mobile/mobile-day-list.tsx](./src/components/meals/mobile/mobile-day-list.tsx)).
- [x] Daily Cutoff Timer & Status Alert banner ([src/components/meals/layout/meals-header.tsx](./src/components/meals/layout/meals-header.tsx)).
- [x] Manager "Day bulk entry" modal / sheet for editing house meals for any day ([src/components/meals/dialogs/day-entry-dialog.tsx](./src/components/meals/dialogs/day-entry-dialog.tsx)).
- [x] Anchored cell editor popover with member/guest steppers ([src/components/meals/grid/cell-editor.tsx](./src/components/meals/grid/cell-editor.tsx)).
- [x] Monthly summary strip (Total Meals, House Bazar, Meal Rate) ([src/components/meals/layout/meals-summary-strip.tsx](./src/components/meals/layout/meals-summary-strip.tsx)).
- [x] Pure domain calculations & matrix helpers ([src/lib/meals.ts](./src/lib/meals.ts)) and static fixtures ([src/fixtures/meal.fixtures.ts](./src/fixtures/meal.fixtures.ts)).
- [x] Interactive dev scenario switcher with all 16 states ([src/components/meals/meals-scenarios.tsx](./src/components/meals/meals-scenarios.tsx)).

#### Phase 2: Dynamic API Integration (A to Z) — **COMPLETED (manager flow)**
- [x] **5.1 Types:** `src/lib/types/meal.types.ts` — view model kept; raw contract added (`MealsResponseData`, `MealsMonthDto`, `MealsGridMemberDto`, `MealsGridDayDto`, `MealTotalsDto`, `MealEntryDto`, `BulkMealsInput`).
- [x] **5.2 Validations:** `src/validations/meal.validation.ts` (`mealEntrySchema`, `bulkMealsInputSchema`), used as guards in `meals-page.tsx`.
- [x] **5.3 API Service:** `src/api/meal.api.ts`:
  - `GET /meals?month=YYYY-MM` → monthly meal matrix.
  - `PUT /meals` → upsert one member-day cell (all four counts required).
  - `POST /meals/bulk` → upsert one daily sheet.
  - `DELETE /meals/:id` → remove a logged cell.
  - `PATCH /meals/me` → **not wired** (member self-service, PRO, today-only, pre-cutoff); deferred.
- [x] **5.4 Hooks:** `src/hooks/meal.hook.ts` — `useMeals` + upsert/bulk/delete mutations that invalidate `meals`, `dashboard`, `summary`. Invalidates + refetches instead of optimistic updates.
- [x] **5.5 Validation Rules:** writes are blocked when `month.isLocked` (`CLOSED`) or the viewer is not a manager; the backend enforces the same via `assertManager`/`assertMonthWritable`. Cutoff only applies to the unwired member self-service path. Mapper: `src/lib/mappers/meals.mapper.ts`; page: `src/components/meals/meals-page.tsx`.

---

### Module 06: Bazar / Grocery Expense Log
- **Backend References:**
  - [API.md § 12: Bazar](../mess-tally-backend/API.md#bazar)
  - [prd.md § 2.1: Module 4](../mess-tally-backend/prd.md)
- **Target Route:** `src/app/(root)/dashboard/bazar/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Bazar expense table with sorting, search, category filtering, member filter ([src/components/bazar/table/bazar-table.tsx](./src/components/bazar/table/bazar-table.tsx)).
- [x] Mobile Bazar Card List with touch-friendly layout ([src/components/bazar/table/bazar-card-list.tsx](./src/components/bazar/table/bazar-card-list.tsx)).
- [x] Shopper breakdown summary card & monthly totals strip ([src/components/bazar/layout/bazar-summary-strip.tsx](./src/components/bazar/layout/bazar-summary-strip.tsx), [src/components/bazar/layout/bazar-header.tsx](./src/components/bazar/layout/bazar-header.tsx)).
- [x] "Add Bazar Entry" / Edit modal form with amount, date, shopper select, category chips, items list ([src/components/bazar/dialogs/bazar-entry-dialog.tsx](./src/components/bazar/dialogs/bazar-entry-dialog.tsx)).
- [x] Category chips & search toolbar ([src/components/bazar/layout/bazar-filters.tsx](./src/components/bazar/layout/bazar-filters.tsx)).
- [x] Delete confirmation dialog ([src/components/bazar/dialogs/delete-confirm.tsx](./src/components/bazar/dialogs/delete-confirm.tsx)).
- [x] Pure domain calculations & helpers ([src/lib/bazar.ts](./src/lib/bazar.ts)) and static fixtures ([src/fixtures/bazar.fixtures.ts](./src/fixtures/bazar.fixtures.ts)).
- [x] Interactive dev scenario switcher covering 11 visual states ([src/components/bazar/bazar-scenarios.tsx](./src/components/bazar/bazar-scenarios.tsx)).

#### Phase 2: Dynamic API Integration (A to Z)
- [ ] **6.1 Types:** `src/lib/types/bazar.types.ts` (`BazarExpense`, `CreateBazarDto`, `BazarCategory`).
- [ ] **6.2 Validations:** `src/validations/bazar.validation.ts` (`createBazarSchema`).
- [ ] **6.3 API Service:** `src/api/bazar.api.ts`:
  - `GET /bazar?month=YYYY-MM` → get list and monthly total.
  - `POST /bazar` → log new expense.
  - `PATCH /bazar/:id` → edit expense.
  - `DELETE /bazar/:id` → delete expense.
- [ ] **6.4 Hooks:** `src/hooks/bazar.hook.ts` (`useBazarList`, `useCreateBazar`, `useDeleteBazar`) with query cache invalidation for `/dashboard` and `/summary`.
- [ ] **6.5 Form Integration:** TanStack Form with instant calculation of total amount and toast notifications.

---

### Module 07: Utility Bills & Advance Fund
- **Backend References:**
  - [API.md § 13: Utilities](../mess-tally-backend/API.md#utilities)
  - [API.md § 14: Utility fund deposits](../mess-tally-backend/API.md#utility-fund-deposits)
  - [prd.md § 1.5 #2 & #3](../mess-tally-backend/prd.md) (Utilities never mix with meal calculations).
- **Target Route:** `src/app/(root)/dashboard/utilities/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Utility Fund Overview summary strip (Total Bills, Total Deposits, Fund Balance, Per-Member Equal Split Share) ([src/components/utility/layout/utility-summary-strip.tsx](./src/components/utility/layout/utility-summary-strip.tsx)).
- [x] Utility Bills ledger table with category badge, payer, amount, split badge ([src/components/utility/table/ledger-table.tsx](./src/components/utility/table/ledger-table.tsx)) and mobile card view ([src/components/utility/table/ledger-card-list.tsx](./src/components/utility/table/ledger-card-list.tsx)).
- [x] Member Deposits collection grid with balance indicators ([src/components/utility/layout/member-deposits.tsx](./src/components/utility/layout/member-deposits.tsx)).
- [x] Header with tabs (Bills vs Member Deposits vs All) & Month Closed pill ([src/components/utility/layout/utility-header.tsx](./src/components/utility/layout/utility-header.tsx)).
- [x] "Add Utility Bill" and "Record Deposit" dialogs ([src/components/utility/dialogs/entry-dialog.tsx](./src/components/utility/dialogs/entry-dialog.tsx)).
- [x] Delete confirmation dialog ([src/components/utility/dialogs/delete-confirm.tsx](./src/components/utility/dialogs/delete-confirm.tsx)).
- [x] Pure domain calculations & helpers ([src/lib/utility.ts](./src/lib/utility.ts)) and static fixtures ([src/fixtures/utility.fixtures.ts](./src/fixtures/utility.fixtures.ts)).
- [x] Interactive dev scenario switcher covering 10 visual states ([src/components/utility/utility-scenarios.tsx](./src/components/utility/utility-scenarios.tsx)).

#### Phase 2: Dynamic API Integration (A to Z)
- [ ] **7.1 Types:** `src/lib/types/utility.types.ts` (`UtilityExpense`, `UtilityDeposit`, `UtilitySplitType`, `UtilityCategory`).
- [ ] **7.2 Validations:** `src/validations/utility.validation.ts` (`createUtilitySchema`, `createDepositSchema`).
- [ ] **7.3 API Service:** `src/api/utility.api.ts`:
  - `GET /utilities?month=YYYY-MM` & `POST /utilities` (Bills).
  - `PATCH /utilities/:id` & `DELETE /utilities/:id`.
  - `GET /deposits?month=YYYY-MM` & `POST /deposits` (Manager only).
  - `DELETE /deposits/:id` (Manager only).
- [ ] **7.4 Hooks:** `src/hooks/utility.hook.ts` (`useUtilities`, `useDeposits`, `useRecordDeposit`).
- [ ] **7.5 Manager Gates:** Lock deposit creation controls for non-manager members.

---

### Module 08: Monthly Summary & Settlement
- **Backend References:**
  - [API.md § 15: Summary](../mess-tally-backend/API.md#summary)
  - [API.md § 10: Months](../mess-tally-backend/API.md#months)
  - [prd.md § 1.3: Debt Settlement math](../mess-tally-backend/prd.md#13-core-value-proposition)
- **Target Route:** `src/app/(root)/dashboard/summary/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Month Financial Ledger table with meal counts, individual meal cost, bazar paid, and net balance badges ([src/components/summary/table/member-statement-table.tsx](./src/components/summary/table/member-statement-table.tsx)) and mobile cards view ([src/components/summary/table/member-statement-cards.tsx](./src/components/summary/table/member-statement-cards.tsx)).
- [x] Summary KPI Strip with Total Bazar, Total Meals, Meal Rate, and Net Balance ([src/components/summary/layout/summary-kpi-strip.tsx](./src/components/summary/layout/summary-kpi-strip.tsx)).
- [x] Meal Rate Derivation & Formula Explainer card with animated interactive breakdown ([src/components/summary/layout/formula-explainer.tsx](./src/components/summary/layout/formula-explainer.tsx)).
- [x] Peer-to-Peer Greedy Settlement transfer cards with sender, receiver, amount, and copy-transfer trigger ([src/components/summary/settlement/settlement-card.tsx](./src/components/summary/settlement/settlement-card.tsx)).
- [x] Utility Fund reserve card ([src/components/summary/layout/fund-summary-card.tsx](./src/components/summary/layout/fund-summary-card.tsx)).
- [x] Header with Month Lifecycle badge (`ACTIVE` vs `CLOSED`), Month switcher, and CSV/PDF export buttons ([src/components/summary/layout/summary-header.tsx](./src/components/summary/layout/summary-header.tsx)).
- [x] Pure domain calculations (greedy settlement solver, meal rate derivation) ([src/lib/summary.ts](./src/lib/summary.ts)) and static fixtures ([src/fixtures/summary.fixtures.ts](./src/fixtures/summary.fixtures.ts)).
- [x] Interactive dev scenario switcher covering 10 visual states ([src/components/summary/summary-scenarios.tsx](./src/components/summary/summary-scenarios.tsx)).

#### Phase 2: Dynamic API Integration (A to Z)
- [ ] **8.1 Types:** `src/lib/types/summary.types.ts` (`MonthlySummary`, `MemberLedger`, `SettlementTransfer`).
- [ ] **8.2 API Service:** `src/api/summary.api.ts`:
  - `GET /summary?month=YYYY-MM` → full calculation report & transfers.
  - `PATCH /months/:id/close` → close month (Manager only).
  - `PATCH /months/:id/reopen` → reopen month (Manager only).
  - `GET /summary/export/csv` & `GET /summary/export/pdf` → file stream downloads.
- [ ] **8.3 Hooks:** `src/hooks/summary.hook.ts` (`useMonthlySummary`, `useCloseMonth`, `useExportSummary`).
- [ ] **8.4 File Download Utility:** Blob handling for CSV/PDF downloads with progress indicators.
- [ ] **8.5 Confirmation Guards:** Irreversible modal warning when closing a month.

---

### Module 09: Members & Roles Management
- **Backend References:**
  - [API.md § 9: Members](../mess-tally-backend/API.md#members)
  - [plan.md § 4: Decisions D5, D8, D10, D12](../mess-tally-backend/plan.md#4-decisions-needed-before-phase-2-prd-gaps)
- **Target Route:** `src/app/(root)/dashboard/members/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Active Members roster table with sortable columns, role badges, joined date, and action triggers ([src/components/members/roster/roster-table.tsx](./src/components/members/roster/roster-table.tsx)) and mobile cards view ([src/components/members/roster/roster-cards.tsx](./src/components/members/roster/roster-cards.tsx)).
- [x] Pending join approval requests card with approve/reject buttons and pending badge counter ([src/components/members/roster/join-requests-card.tsx](./src/components/members/roster/join-requests-card.tsx)).
- [x] Room Code & Invite Share sheet with copy code, QR representation, share links, and regenerate trigger ([src/components/members/dialogs/invite-sheet.tsx](./src/components/members/dialogs/invite-sheet.tsx)).
- [x] Member Action sheet for mobile/desktop action triggers ([src/components/members/dialogs/member-actions-sheet.tsx](./src/components/members/dialogs/member-actions-sheet.tsx)).
- [x] Role management dialog ("Make Manager" / "Remove Manager", Transfer Ownership) ([src/components/members/dialogs/role-dialog.tsx](./src/components/members/dialogs/role-dialog.tsx)).
- [x] Confirmation sheet for destructive actions (remove member, reject request) ([src/components/members/dialogs/confirm-sheet.tsx](./src/components/members/dialogs/confirm-sheet.tsx)).
- [x] Leave mess card for active members with safety warnings ([src/components/members/layout/leave-card.tsx](./src/components/members/layout/leave-card.tsx)).
- [x] Free Plan capacity warning card (e.g. 5/5 slots used, PRO upgrade prompt) ([src/components/members/layout/plan-usage-card.tsx](./src/components/members/layout/plan-usage-card.tsx)).
- [x] Pure domain calculations & helpers ([src/lib/members.ts](./src/lib/members.ts)) and static fixtures ([src/fixtures/member.fixtures.ts](./src/fixtures/member.fixtures.ts)).
- [x] Interactive dev scenario switcher covering 11 visual states ([src/components/members/members-scenarios.tsx](./src/components/members/members-scenarios.tsx)).

#### Phase 2: Dynamic API Integration (A to Z)
- [ ] **9.1 Types:** `src/lib/types/member.types.ts` (`MessMember`, `MemberRole`, `MemberStatus`).
- [ ] **9.2 API Service:** `src/api/member.api.ts`:
  - `GET /mess/members` → all members and statuses.
  - `PATCH /mess/members/:id/approve` & `PATCH /mess/members/:id/reject`.
  - `PATCH /mess/members/:id/manager` (delegate manager flag).
  - `PATCH /mess/members/:id/owner` (transfer owner role).
  - `DELETE /mess/members/:id/leave` (leave mess).
- [ ] **9.3 Hooks:** `src/hooks/member.hook.ts` (`useMembersList`, `useApproveMember`, `useTransferManager`).
- [ ] **9.4 Optimistic UI:** Instant member status updates and toast feedback.

---

### Module 10: Mess Settings & User Profile
- **Backend References:**
  - [API.md § 8: Mess](../mess-tally-backend/API.md#mess)
  - [API.md § 17: Profile](../mess-tally-backend/API.md#profile)
- **Target Routes:** `src/app/(root)/dashboard/settings/page.tsx`, `src/app/(root)/profile/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **IN PROGRESS (Shell + Placeholder)**
- [x] Graceful Settings Page shell & tabbed overview ([src/app/(root)/dashboard/settings/page.tsx](./src/app/%28root%29/dashboard/settings/page.tsx)) linking to Member management and Dashboard.
- [ ] User Profile Settings (Name, Phone number, Profile image upload, Change Password tab).
- [ ] Mess Configuration (Mess name, Physical address, Timezone, Daily meal cutoff time e.g. 10:00 PM).
- [ ] Notification Preferences (Email alerts for monthly closing, Bazar reminder).
- [ ] Danger Zone (Leave mess, Disband mess if Owner).

#### Phase 2: Dynamic API Integration (A to Z)
- [ ] **10.1 Types:** `src/lib/types/profile.types.ts`, `src/lib/types/settings.types.ts`.
- [ ] **10.2 Validations:** `src/validations/profile.validation.ts` (`updateProfileSchema`, `changePasswordSchema`).
- [ ] **10.3 API Service:** `src/api/profile.api.ts`:
  - `GET /profile` & `PATCH /profile`.
  - `PATCH /profile/password`.
  - `PATCH /mess` (Mess settings).
- [ ] **10.4 Hooks:** `src/hooks/profile.hook.ts` with instant Zustand auth store sync.

---

### Module 11: Subscription & Paywall (bKash PRO)
- **Backend References:**
  - [API.md § 4: Plan gates](../mess-tally-backend/API.md#plan-gates-free-vs-pro)
  - [API.md § 18: Subscription](../mess-tally-backend/API.md#subscription)
- **Target Route:** `src/app/(root)/dashboard/subscription/page.tsx`.

#### Phase 1: Screen Design (Dummy Data)
- [ ] Free vs PRO Feature Comparison Table (Member caps, AI Chat limits, PDF exports, Priority support).
- [ ] Subscription Status Card (Current plan, Expiry date, Renew button).
- [ ] bKash Payment Trigger Modal (Amount ৳, Billing period, "Pay with bKash" branded button).
- [ ] Success & Cancel Payment Redirect landing states.

#### Phase 2: Dynamic API Integration (A to Z)
- [ ] **11.1 Types:** `src/lib/types/subscription.types.ts` (`SubscriptionStatus`, `BkashInitResponse`).
- [ ] **11.2 API Service:** `src/api/subscription.api.ts`:
  - `GET /subscription/status` → active plan, expiration, and member limit.
  - `POST /subscription/bkash/initiate` → returns bKash payment gateway URL.
  - `GET /subscription/bkash/callback` → handles payment verification query params.
- [ ] **11.3 Hooks:** `src/hooks/subscription.hook.ts` (`useSubscriptionStatus`, `useInitiateBkash`).
- [ ] **11.4 Payment Flow:** External redirection to bKash gateway and toast confirmation upon return.

---

### Module 12: AI Chatbot (TallyBot)
- **Backend References:**
  - [plan.md § 5: Phase 5](../mess-tally-backend/plan.md#dev-a-4) (LLM adapters, tool registry, chat loop).
  - [prd.md § 1.1 #3 & § 2.1 Module 7](../mess-tally-backend/prd.md) (Banglish/English queries, financial projections, quick-log confirmation cards).
- **Target Route:** Floating Assistant Drawer & `/dashboard/ai-chat`.

#### Phase 1: Screen Design (Dummy Data)
- [ ] Floating Assistant Trigger Button & Expandable Chat Sheet / Drawer.
- [ ] Chat conversation thread (User messages, Assistant responses, Markdown tables).
- [ ] Quick Prompt Pills ("What is today's meal rate?", "How much did we spend on bazar?", "Who owes whom?").
- [ ] Interactive Confirmation Cards (e.g. "TallyBot parsed: 2 meals for Rahim today. [Confirm & Log] [Cancel]").
- [ ] Thinking & typing stream animations.

#### Phase 2: Dynamic API Integration (A to Z)
- [ ] **12.1 Types:** `src/lib/types/ai.types.ts` (`ChatMessage`, `ParsedActionCard`, `AiQueryResponse`).
- [ ] **12.2 API Service:** `src/api/ai.api.ts` (Chat stream endpoint or mutation query).
- [ ] **12.3 Action Execution:** Hooking up card confirmation buttons directly to the relevant mutation (`useCreateBazar`, `useCreateMeal`).
- [ ] **12.4 Chat History:** Local storage or session caching for conversation history.

---

## 4. Pre-Flight Verification Checklist (For Every Coding Session)

Whenever starting a new feature from this plan, execute this verification step:
1. [ ] **Backend Grounding:** Read the matching endpoint in [API.md](../mess-tally-backend/API.md) and note the exact method, path, and response object.
2. [ ] **Constraint Check:** Check [plan.md](../mess-tally-backend/plan.md) and [prd.md](../mess-tally-backend/prd.md) for role gates (Owner vs Manager vs Member) and month status restrictions.
3. [ ] **Design Synchronization:** Open [Design.md](./Design.md) and verify typography, colors, and layout components.
4. [ ] **Mobile Ergonomics:** Verify responsive behavior against [responsive.md](./responsive.md).
5. [ ] **Code Quality & Testing:** Run `npm run typecheck` and `npm run check` (Biome) after completing each phase.
