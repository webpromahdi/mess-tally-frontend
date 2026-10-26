# MessTally Frontend — Master Workflow & Feature Plan

> **Document Status:** Active Living Workflow Plan  
> **Frontend Project Path:** [d:\Projects\mess-tally-frontend](file:///d:/Projects/mess-tally-frontend)  
> **Backend Project Path:** [D:\Projects\mess-tally-backend](file:///D:/Projects/mess-tally-backend)  
> **Core Backend Contract Sources:**  
> - [plan.md](file:///D:/Projects/mess-tally-backend/plan.md) — Feature scopes, phase implementation status, and architectural decisions (D1–D14).  
> - [API.md](file:///D:/Projects/mess-tally-backend/API.md) — Route endpoints, HTTP methods, JSON request/response contracts, authorization rules, and error codes.  
> - [prd.md](file:///D:/Projects/mess-tally-backend/prd.md) — Business logic, calculation formulas (meal rate, balance, greedy settlement), roles, and user stories.  
> **Frontend Design & Architectural Guidelines:**  
> - [migration-plan.md](file:///d:/Projects/mess-tally-frontend/migration-plan.md) — Comprehensive migration specification for Figma AI-generated UI (Modules 04–09) into Next.js App Router.  
> - [Design.md](file:///d:/Projects/mess-tally-frontend/Design.md) — Color tokens, typography, UX patterns, and 11 benchmark design references.  
> - [responsive.md](file:///d:/Projects/mess-tally-frontend/responsive.md) — Viewport breakpoints, mobile-first touch ergonomics, and adaptive layout rules.  
> - [AGENTS.md](file:///d:/Projects/mess-tally-frontend/AGENTS.md) — Next.js 16 conventions, barrel imports, state boundaries (TanStack Query vs Zustand vs TanStack Form), and directory structure.  

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
   - [API.md](file:///D:/Projects/mess-tally-backend/API.md) (endpoint signature, params, response schema, authorization levels).
   - [plan.md](file:///D:/Projects/mess-tally-backend/plan.md) & [prd.md](file:///D:/Projects/mess-tally-backend/prd.md) (business rules, role gates).
2. **Design Sync**: Verify and update [Design.md](file:///d:/Projects/mess-tally-frontend/Design.md) if the backend contract introduced new data fields, actions, or role permissions.
3. **User Confirmation**: The agent must prompt the user with direct links to verify if any recent backend changes were introduced.

---

## 2. Master Progress Matrix

| Module / Feature | UI (Dummy Data) | API Integration | Current Status | Target Route |
| :--- | :---: | :---: | :---: | :--- |
| **01. Marketing & Public Pages** | 🟢 Done | N/A (Static) | Completed | `/`, `/about`, `/contact`, `/features`, `/pricing` |
| **02. Authentication & Access** | 🟢 Done | 🟢 Done | Completed | `/login`, `/register`, `/forgot-password`, `/reset-password` |
| **03. Mess Onboarding & Setup** | 🟢 Done | ⚪ Pending | In Progress (Phase 1 Done) | `/onboarding`, `/onboarding/create`, `/onboarding/join`, `/onboarding/pending` |
| **04. Dashboard Overview** | 🟢 Done | ⚪ Pending | In Progress (Phase 1 Done) | `/dashboard` |
| **05. Daily Meals Matrix** | 🟢 Done | ⚪ Pending | In Progress (Phase 1 Done) | `/dashboard/meals` |
| **06. Bazar / Grocery Expenses** | 🟢 Done | ⚪ Pending | In Progress (Phase 1 Done) | `/dashboard/bazar` |
| **07. Utility Bills & Advance Fund** | 🟢 Done | ⚪ Pending | In Progress (Phase 1 Done) | `/dashboard/utilities` |
| **08. Monthly Summary & Settlement** | 🟢 Done | ⚪ Pending | In Progress (Phase 1 Done) | `/dashboard/summary` |
| **09. Members & Roles Management** | 🟢 Done | ⚪ Pending | In Progress (Phase 1 Done) | `/dashboard/members` |
| **10. Settings & Mess Profile** | 🟡 Partial | ⚪ Pending | In Progress (Shell + Placeholder) | `/dashboard/settings`, `/profile` |
| **11. Subscription (bKash PRO)** | ⚪ Pending | ⚪ Pending | Queued | `/dashboard/subscription` |
| **12. AI Chatbot (TallyBot)** | ⚪ Pending | ⚪ Pending | Queued | Floating drawer / `/dashboard/ai-chat` |

*Status Legend:* 🟢 Done · 🟡 In Progress · ⚪ Pending / Queued

---

## 3. Feature Breakdown & Implementation Checklists

---

### Module 01: Marketing & Public Pages
- **Backend Reference:** Not applicable (static public routes).
- **Frontend References:** [Design.md](file:///d:/Projects/mess-tally-frontend/Design.md), [responsive.md](file:///d:/Projects/mess-tally-frontend/responsive.md).
- **Routes:** `src/app/(marketing-pages)/` (`/`, `/about`, `/contact`, `/features`, `/pricing`).

#### Phase 1: Screen Design & Responsive Layout
- [x] Marketing navigation bar & sticky header with mobile menu ([src/components/marketing/header.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/header.tsx))
- [x] Shared marketing footer with brand links & social icons ([src/components/marketing/footer.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/footer.tsx))
- [x] Features showcase page (`/features` in [src/app/(marketing-pages)/features/page.tsx](file:///d:/Projects/mess-tally-frontend/src/app/(marketing-pages)/features/page.tsx))
- [x] About Us story & team page (`/about` in [src/app/(marketing-pages)/about/page.tsx](file:///d:/Projects/mess-tally-frontend/src/app/(marketing-pages)/about/page.tsx))
- [x] Contact Us page with responsive form (`/contact` in [src/app/(marketing-pages)/contact/page.tsx](file:///d:/Projects/mess-tally-frontend/src/app/(marketing-pages)/contact/page.tsx))
- [x] Pricing page & plan comparison matrix (`/pricing` in [src/app/(marketing-pages)/pricing/page.tsx](file:///d:/Projects/mess-tally-frontend/src/app/(marketing-pages)/pricing/page.tsx)) — **COMPLETED**
  - [x] 3-cycle billing toggle (Monthly, 6 Months, 1 Year) with stacked label & badges ([src/components/marketing/pricing-billing-toggle.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/pricing-billing-toggle.tsx))
  - [x] 3 pricing tier cards: Starter (Free), Mess PRO (Featured Aubergine card), Hostel Custom ([src/components/marketing/pricing-cards.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/pricing-cards.tsx))
  - [x] 5-category detailed feature comparison table with mobile swipe hint and `[contain:paint]` layout isolation ([src/components/marketing/pricing-comparison-table.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/pricing-comparison-table.tsx))
  - [x] Bachelor flatmate FAQ accordion ([src/components/marketing/pricing-faq.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/pricing-faq.tsx))
  - [x] Zero-tolerance horizontal overflow containment verified across 320px and 390px viewports
- [x] Mobile ergonomics & zero-overflow audit across all public routes (320px & 390px viewports, touch targets ≥ 44px)
- [x] Main landing home page & hero section with value proposition (`/` in `src/app/(marketing-pages)/page.tsx`) — **COMPLETED**
  - [x] Hero section recreated to closely match reference design: eyebrow badge, hand-drawn golden curve underline under 'together.', primary 'Get Started' and secondary 'See How It Works' play CTAs, trust badge, and high-fidelity mess dashboard visual asset ([src/components/marketing/landing-hero.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/landing-hero.tsx))
  - [x] Core feature highlights 5-item strip with restrained brand backgrounds ([src/components/marketing/landing-feature-strip.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/landing-feature-strip.tsx))
  - [x] Our Story section with handwritten charts to digital dashboard asset & About CTA ([src/components/marketing/landing-story.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/landing-story.tsx))
  - [x] How It Works 3-step workflow with connected direction arrows ([src/components/marketing/landing-how-it-works.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/landing-how-it-works.tsx))
  - [x] Key Features 6-card detailed grid grounded in PRD capabilities ([src/components/marketing/landing-key-features.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/landing-key-features.tsx))
  - [x] Frequently Asked Questions accessible accordion with 5 PRD-grounded answers ([src/components/marketing/landing-faq.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/landing-faq.tsx))
  - [x] Final Deep Aubergine CTA section with Marigold sunburst and Get Started CTA ([src/components/marketing/landing-cta.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/landing-cta.tsx))
  - [x] Multi-viewport responsive verification (320px, 375px, 390px, 768px, 1024px, 1440px) with 0px horizontal overflow across all tiers

---

### Module 02: Authentication & Access Control
- **Backend References:**
  - [API.md § 7: Auth](file:///D:/Projects/mess-tally-backend/API.md#auth)
  - [prd.md § 2.1: Module 1](file:///D:/Projects/mess-tally-backend/prd.md#module-1-authentication--access-control-auth)
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
  - [API.md § 8: Mess](file:///D:/Projects/mess-tally-backend/API.md#mess)
  - [API.md § 9: Members](file:///D:/Projects/mess-tally-backend/API.md#members)
  - [plan.md § 5: Phase 1](file:///D:/Projects/mess-tally-backend/plan.md#dev-a)
- **Target Routes:** `src/app/(root)/onboarding/` (`/onboarding`, `/onboarding/create`, `/onboarding/join`, `/onboarding/pending`).

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Dedicated Onboarding Header ([src/app/(root)/onboarding/layout.tsx](file:///d:/Projects/mess-tally-frontend/src/app/(root)/onboarding/layout.tsx)) with transparent background, brand logo ([src/components/shared/brand-logo.tsx](file:///d:/Projects/mess-tally-frontend/src/components/shared/brand-logo.tsx)), and decoupled user menu.
- [x] Authenticated User Profile Menu ([src/components/shared/user-menu.tsx](file:///d:/Projects/mess-tally-frontend/src/components/shared/user-menu.tsx)) with avatar, display name, email, streamlined single-line actions (Dashboard, Profile, Settings), and destructive Sign Out action hooked to `useLogout()`.
- [x] Screen jank / layout shift resolution: Eliminated Radix `RemoveScroll` body-locking jumps across header dropdown and select menus using `modal={false}` and `scrollbar-gutter: stable;` on `html`.
- [x] Shared Custom Select Primitive (`src/components/ui/select.tsx`): Built accessible, non-modal dropdown select on Radix primitives with zero-jank overlay positioning, custom `h-11` input-matched trigger, subtle Deep Aubergine (`#3A0F34`) selected highlight, checkmark indicator, and full keyboard navigation.
- [x] Polished Create Mess form controls: Upgraded native HTML selects for Currency (`BDT`, `USD`, `EUR`, `INR`) and Daily Meal Cutoff Time (`10:00 AM`, `11:00 AM`, `12:00 PM`, `08:00 PM`) to the custom `Select` primitive.
- [x] Onboarding choice screen: "Create New Mess" (Become Manager) vs "Join Existing Mess" (Enter Join Code) with custom illustrations ([src/components/onboarding/onboarding-choice-cards.tsx](file:///d:/Projects/mess-tally-frontend/src/components/onboarding/onboarding-choice-cards.tsx)).
- [x] Create Mess screen & form with 2-column layout and "What happens next?" guide ([src/components/onboarding/create-mess-form.tsx](file:///d:/Projects/mess-tally-frontend/src/components/onboarding/create-mess-form.tsx)).
- [x] Join Mess screen & form with room code entry and "Need a room code?" guide ([src/components/onboarding/join-mess-form.tsx](file:///d:/Projects/mess-tally-frontend/src/components/onboarding/join-mess-form.tsx)).
- [x] Pending Approval waiting screen with status badge, mess details card, and cancel action ([src/app/(root)/onboarding/pending/page.tsx](file:///d:/Projects/mess-tally-frontend/src/app/(root)/onboarding/pending/page.tsx)).
- [x] Free Plan Notice Banner (up to 5 active members with zero subscription fee notice).
- [x] Performance & Bundle Size Optimization: Converted all onboarding page shells and choice cards to React Server Components, keeping only interactive form leaves in the client bundle.

#### Phase 2: Dynamic API Integration (A to Z)
- [ ] **3.1 Types:** Define `src/lib/types/mess.types.ts` (`Mess`, `CreateMessDto`, `JoinMessDto`, `MemberStatus`, `MessRole`).
- [ ] **3.2 Validations:** Create `src/validations/mess.validation.ts` (`createMessSchema`, `joinMessSchema`).
- [ ] **3.3 API Service:** Implement in `src/api/mess.api.ts`:
  - `POST /mess` → create mess and auto-assign owner/manager.
  - `POST /mess/join` → join mess with room code.
  - `GET /mess` → get current active mess details.
  - `PATCH /mess` → update mess settings.
- [ ] **3.4 Hooks:** TanStack Query hooks in `src/hooks/mess.hook.ts` (`useCreateMess`, `useJoinMess`, `useActiveMess`).
- [ ] **3.5 Form & State:** Connect forms, update user's `activeMessId` in Zustand auth store, and route to `/dashboard` upon activation.

---

### Module 04: Dashboard Overview
- **Backend References:**
  - [API.md § 16: Dashboard](file:///D:/Projects/mess-tally-backend/API.md#dashboard)
  - [prd.md § 2.1: Module 8](file:///D:/Projects/mess-tally-backend/prd.md)
  - [Design.md § 2: Benchmark references](file:///d:/Projects/mess-tally-frontend/Design.md#2-research-summary) (`chat_skanalytic_dashboard.png`, `chat_interoly_expenses.png`).
- **Target Route:** `src/app/(root)/dashboard/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Metric summary cards (Current Month, Total Mess Meals, Meal Rate ৳, Total Bazar Spent ৳, Utility Fund Balance ৳) ([src/components/dashboard/stat-card.tsx](file:///d:/Projects/mess-tally-frontend/src/components/dashboard/stat-card.tsx), [src/components/dashboard/meal-rate-card.tsx](file:///d:/Projects/mess-tally-frontend/src/components/dashboard/meal-rate-card.tsx)).
- [x] User's Personal Financial Pill / Hero Banner with signed balance +/−, Receiver/Giver indicators, and settlement transfer lines ([src/components/dashboard/my-balance-card.tsx](file:///d:/Projects/mess-tally-frontend/src/components/dashboard/my-balance-card.tsx)).
- [x] Quick Action Bar & Header with greeting, role badge, month status, and conditional Manager shortcuts ("Add Meals", "Add Bazar Trip") ([src/components/dashboard/dashboard-header.tsx](file:///d:/Projects/mess-tally-frontend/src/components/dashboard/dashboard-header.tsx)).
- [x] Diverging Member Meal Balance Chart (horizontal Recharts + accessible table fallback) and Bazar Share Donut Chart ([src/components/dashboard/member-balance-chart.tsx](file:///d:/Projects/mess-tally-frontend/src/components/dashboard/member-balance-chart.tsx), [src/components/dashboard/bazar-share-chart.tsx](file:///d:/Projects/mess-tally-frontend/src/components/dashboard/bazar-share-chart.tsx)).
- [x] Contextual Action Queue banners (Pending join approvals, Month closed notice, Utility fund replenishment alert) ([src/components/dashboard/action-queue.tsx](file:///d:/Projects/mess-tally-frontend/src/components/dashboard/action-queue.tsx)).
- [x] Mess Info Card with room code copy trigger, plan badge, and active members avatar stack ([src/components/dashboard/mess-info-card.tsx](file:///d:/Projects/mess-tally-frontend/src/components/dashboard/mess-info-card.tsx)).
- [x] 12-Column Asymmetric Workspace layout with mobile priority reordering and edge-to-edge chart treatment ([src/components/dashboard/dashboard-layout.tsx](file:///d:/Projects/mess-tally-frontend/src/components/dashboard/dashboard-layout.tsx)).
- [x] Pattern B AppShell layout integration with persistent desktop sidebar (collapsible to 64px rail), topbar, mobile drawer, and 5-target bottom nav ([src/components/shell/AppShell.tsx](file:///d:/Projects/mess-tally-frontend/src/components/shell/AppShell.tsx)).
- [x] Full visual state coverage with development-only scenario switcher for testing all 10 states (Manager, Member, Closed, Replenish, Empty, No-month Manager/Member, Skeleton, Inline Error, Page Error) ([src/components/dashboard/dashboard-scenarios.tsx](file:///d:/Projects/mess-tally-frontend/src/components/dashboard/dashboard-scenarios.tsx)).
- [x] Responsive layout verification across 320px, 375px/390px, 768px, 1024px, 1440px with 0px horizontal overflow.

#### Phase 2: Dynamic API Integration (A to Z)
- [ ] **4.1 Types:** `src/lib/types/dashboard.types.ts` matching `GET /dashboard` response.
- [ ] **4.2 API Service:** `src/api/dashboard.api.ts` (`getDashboardData()`).
- [ ] **4.3 Hooks:** `src/hooks/dashboard.hook.ts` (`useDashboardData()` with caching and refetch on window focus).
- [ ] **4.4 Skeletons & Empty States:** Skeleton loaders for metrics and recent activity feeds.
- [ ] **4.5 Role Guards:** Conditional rendering of Manager buttons vs Member readouts based on `membership.is_manager`.

---

### Module 05: Daily Meals Matrix & Logging
- **Backend References:**
  - [API.md § 11: Meals](file:///D:/Projects/mess-tally-backend/API.md#meals)
  - [plan.md § 4: Decisions D1–D3, D11](file:///D:/Projects/mess-tally-backend/plan.md#4-decisions-needed-before-phase-2-prd-gaps)
- **Target Route:** `src/app/(root)/dashboard/meals/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Daily Meal Matrix / Spreadsheet view with sticky member names column & day totals footer ([src/components/meals/grid/meals-matrix-table.tsx](file:///d:/Projects/mess-tally-frontend/src/components/meals/grid/meals-matrix-table.tsx)).
- [x] Mobile Daily Carousel / Single-Day View (easy thumb entry with `+` / `−` steppers) ([src/components/meals/grid/meals-mobile-cards.tsx](file:///d:/Projects/mess-tally-frontend/src/components/meals/grid/meals-mobile-cards.tsx)).
- [x] Daily Cutoff Timer & Status Alert banner ([src/components/meals/layout/meals-header.tsx](file:///d:/Projects/mess-tally-frontend/src/components/meals/layout/meals-header.tsx)).
- [x] Manager "Day bulk entry" modal / sheet for editing house meals for any day ([src/components/meals/dialogs/day-entry-dialog.tsx](file:///d:/Projects/mess-tally-frontend/src/components/meals/dialogs/day-entry-dialog.tsx)).
- [x] Anchored cell editor popover with member/guest steppers ([src/components/meals/popover/meal-cell-popover.tsx](file:///d:/Projects/mess-tally-frontend/src/components/meals/popover/meal-cell-popover.tsx)).
- [x] Monthly summary strip (Total Meals, House Bazar, Meal Rate) ([src/components/meals/layout/meals-summary-strip.tsx](file:///d:/Projects/mess-tally-frontend/src/components/meals/layout/meals-summary-strip.tsx)).
- [x] Pure domain calculations & matrix helpers ([src/lib/meals.ts](file:///d:/Projects/mess-tally-frontend/src/lib/meals.ts)) and static fixtures ([src/fixtures/meal.fixtures.ts](file:///d:/Projects/mess-tally-frontend/src/fixtures/meal.fixtures.ts)).
- [x] Interactive dev scenario switcher with all 16 states ([src/components/meals/meals-scenarios.tsx](file:///d:/Projects/mess-tally-frontend/src/components/meals/meals-scenarios.tsx)).

#### Phase 2: Dynamic API Integration (A to Z)
- [ ] **5.1 Types:** `src/lib/types/meal.types.ts` (`MealEntry`, `DailyMealSummary`, `BulkMealUpdateDto`).
- [ ] **5.2 Validations:** `src/validations/meal.validation.ts` (`mealEntrySchema`, `bulkMealsSchema`).
- [ ] **5.3 API Service:** `src/api/meal.api.ts`:
  - `GET /meals?month=YYYY-MM` → fetch monthly meal matrix.
  - `POST /meals` → single meal entry for a member.
  - `POST /meals/bulk` → bulk save meal matrix (Manager only).
  - `PATCH /meals/:id` → edit specific meal count.
  - `DELETE /meals/:id` → remove meal record.
- [ ] **5.4 Hooks:** `src/hooks/meal.hook.ts` with optimistic updates for single and bulk writes.
- [ ] **5.5 Validation Rules:** Enforce cutoff time checks and block writes if the selected month is `CLOSED`.

---

### Module 06: Bazar / Grocery Expense Log
- **Backend References:**
  - [API.md § 12: Bazar](file:///D:/Projects/mess-tally-backend/API.md#bazar)
  - [prd.md § 2.1: Module 4](file:///D:/Projects/mess-tally-backend/prd.md)
- **Target Route:** `src/app/(root)/dashboard/bazar/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Bazar expense table with sorting, search, category filtering, member filter ([src/components/bazar/table/bazar-table.tsx](file:///d:/Projects/mess-tally-frontend/src/components/bazar/table/bazar-table.tsx)).
- [x] Mobile Bazar Card List with touch-friendly layout ([src/components/bazar/table/bazar-card-list.tsx](file:///d:/Projects/mess-tally-frontend/src/components/bazar/table/bazar-card-list.tsx)).
- [x] Shopper breakdown summary card & monthly totals strip ([src/components/bazar/layout/shopper-summary.tsx](file:///d:/Projects/mess-tally-frontend/src/components/bazar/layout/shopper-summary.tsx), [src/components/bazar/layout/bazar-header.tsx](file:///d:/Projects/mess-tally-frontend/src/components/bazar/layout/bazar-header.tsx)).
- [x] "Add Bazar Entry" / Edit modal form with amount, date, shopper select, category chips, items list ([src/components/bazar/dialogs/bazar-entry-dialog.tsx](file:///d:/Projects/mess-tally-frontend/src/components/bazar/dialogs/bazar-entry-dialog.tsx)).
- [x] Category chips & search toolbar ([src/components/bazar/table/bazar-filters.tsx](file:///d:/Projects/mess-tally-frontend/src/components/bazar/table/bazar-filters.tsx)).
- [x] Delete confirmation dialog ([src/components/bazar/dialogs/delete-confirm.tsx](file:///d:/Projects/mess-tally-frontend/src/components/bazar/dialogs/delete-confirm.tsx)).
- [x] Pure domain calculations & helpers ([src/lib/bazar.ts](file:///d:/Projects/mess-tally-frontend/src/lib/bazar.ts)) and static fixtures ([src/fixtures/bazar.fixtures.ts](file:///d:/Projects/mess-tally-frontend/src/fixtures/bazar.fixtures.ts)).
- [x] Interactive dev scenario switcher covering 11 visual states ([src/components/bazar/bazar-scenarios.tsx](file:///d:/Projects/mess-tally-frontend/src/components/bazar/bazar-scenarios.tsx)).

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
  - [API.md § 13: Utilities](file:///D:/Projects/mess-tally-backend/API.md#utilities)
  - [API.md § 14: Utility fund deposits](file:///D:/Projects/mess-tally-backend/API.md#utility-fund-deposits)
  - [prd.md § 1.5 #2 & #3](file:///D:/Projects/mess-tally-backend/prd.md) (Utilities never mix with meal calculations).
- **Target Route:** `src/app/(root)/dashboard/utilities/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Utility Fund Overview summary strip (Total Bills, Total Deposits, Fund Balance, Per-Member Equal Split Share) ([src/components/utility/layout/utility-summary-strip.tsx](file:///d:/Projects/mess-tally-frontend/src/components/utility/layout/utility-summary-strip.tsx)).
- [x] Utility Bills ledger table with category badge, payer, amount, split badge ([src/components/utility/table/ledger-table.tsx](file:///d:/Projects/mess-tally-frontend/src/components/utility/table/ledger-table.tsx)) and mobile card view ([src/components/utility/table/ledger-card-list.tsx](file:///d:/Projects/mess-tally-frontend/src/components/utility/table/ledger-card-list.tsx)).
- [x] Member Deposits collection grid with balance indicators ([src/components/utility/table/member-deposits.tsx](file:///d:/Projects/mess-tally-frontend/src/components/utility/table/member-deposits.tsx)).
- [x] Header with tabs (Bills vs Member Deposits vs All) & Month Closed pill ([src/components/utility/layout/utility-header.tsx](file:///d:/Projects/mess-tally-frontend/src/components/utility/layout/utility-header.tsx)).
- [x] "Add Utility Bill" and "Record Deposit" dialogs ([src/components/utility/dialogs/entry-dialog.tsx](file:///d:/Projects/mess-tally-frontend/src/components/utility/dialogs/entry-dialog.tsx)).
- [x] Delete confirmation dialog ([src/components/utility/dialogs/delete-confirm.tsx](file:///d:/Projects/mess-tally-frontend/src/components/utility/dialogs/delete-confirm.tsx)).
- [x] Pure domain calculations & helpers ([src/lib/utility.ts](file:///d:/Projects/mess-tally-frontend/src/lib/utility.ts)) and static fixtures ([src/fixtures/utility.fixtures.ts](file:///d:/Projects/mess-tally-frontend/src/fixtures/utility.fixtures.ts)).
- [x] Interactive dev scenario switcher covering 10 visual states ([src/components/utility/utility-scenarios.tsx](file:///d:/Projects/mess-tally-frontend/src/components/utility/utility-scenarios.tsx)).

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
  - [API.md § 15: Summary](file:///D:/Projects/mess-tally-backend/API.md#summary)
  - [API.md § 10: Months](file:///D:/Projects/mess-tally-backend/API.md#months)
  - [prd.md § 1.3: Debt Settlement math](file:///D:/Projects/mess-tally-backend/prd.md#13-core-value-proposition)
- **Target Route:** `src/app/(root)/dashboard/summary/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Month Financial Ledger table with meal counts, individual meal cost, bazar paid, and net balance badges ([src/components/summary/table/member-statement-table.tsx](file:///d:/Projects/mess-tally-frontend/src/components/summary/table/member-statement-table.tsx)) and mobile cards view ([src/components/summary/table/member-statement-cards.tsx](file:///d:/Projects/mess-tally-frontend/src/components/summary/table/member-statement-cards.tsx)).
- [x] Summary KPI Strip with Total Bazar, Total Meals, Meal Rate, and Net Balance ([src/components/summary/layout/summary-kpi-strip.tsx](file:///d:/Projects/mess-tally-frontend/src/components/summary/layout/summary-kpi-strip.tsx)).
- [x] Meal Rate Derivation & Formula Explainer card with animated interactive breakdown ([src/components/summary/settlement/formula-explainer.tsx](file:///d:/Projects/mess-tally-frontend/src/components/summary/settlement/formula-explainer.tsx)).
- [x] Peer-to-Peer Greedy Settlement transfer cards with sender, receiver, amount, and copy-transfer trigger ([src/components/summary/settlement/settlement-card.tsx](file:///d:/Projects/mess-tally-frontend/src/components/summary/settlement/settlement-card.tsx)).
- [x] Utility Fund reserve card ([src/components/summary/settlement/fund-summary-card.tsx](file:///d:/Projects/mess-tally-frontend/src/components/summary/settlement/fund-summary-card.tsx)).
- [x] Header with Month Lifecycle badge (`ACTIVE` vs `CLOSED`), Month switcher, and CSV/PDF export buttons ([src/components/summary/layout/summary-header.tsx](file:///d:/Projects/mess-tally-frontend/src/components/summary/layout/summary-header.tsx)).
- [x] Pure domain calculations (greedy settlement solver, meal rate derivation) ([src/lib/summary.ts](file:///d:/Projects/mess-tally-frontend/src/lib/summary.ts)) and static fixtures ([src/fixtures/summary.fixtures.ts](file:///d:/Projects/mess-tally-frontend/src/fixtures/summary.fixtures.ts)).
- [x] Interactive dev scenario switcher covering 10 visual states ([src/components/summary/summary-scenarios.tsx](file:///d:/Projects/mess-tally-frontend/src/components/summary/summary-scenarios.tsx)).

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
  - [API.md § 9: Members](file:///D:/Projects/mess-tally-backend/API.md#members)
  - [plan.md § 4: Decisions D5, D8, D10, D12](file:///D:/Projects/mess-tally-backend/plan.md#4-decisions-needed-before-phase-2-prd-gaps)
- **Target Route:** `src/app/(root)/dashboard/members/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **COMPLETED**
- [x] Active Members roster table with sortable columns, role badges, joined date, and action triggers ([src/components/members/roster/roster-table.tsx](file:///d:/Projects/mess-tally-frontend/src/components/members/roster/roster-table.tsx)) and mobile cards view ([src/components/members/roster/roster-cards.tsx](file:///d:/Projects/mess-tally-frontend/src/components/members/roster/roster-cards.tsx)).
- [x] Pending join approval requests card with approve/reject buttons and pending badge counter ([src/components/members/roster/join-requests-card.tsx](file:///d:/Projects/mess-tally-frontend/src/components/members/roster/join-requests-card.tsx)).
- [x] Room Code & Invite Share sheet with copy code, QR representation, share links, and regenerate trigger ([src/components/members/dialogs/invite-sheet.tsx](file:///d:/Projects/mess-tally-frontend/src/components/members/dialogs/invite-sheet.tsx)).
- [x] Member Action sheet for mobile/desktop action triggers ([src/components/members/dialogs/member-actions-sheet.tsx](file:///d:/Projects/mess-tally-frontend/src/components/members/dialogs/member-actions-sheet.tsx)).
- [x] Role management dialog ("Make Manager" / "Remove Manager", Transfer Ownership) ([src/components/members/dialogs/role-dialog.tsx](file:///d:/Projects/mess-tally-frontend/src/components/members/dialogs/role-dialog.tsx)).
- [x] Confirmation sheet for destructive actions (remove member, reject request) ([src/components/members/dialogs/confirm-sheet.tsx](file:///d:/Projects/mess-tally-frontend/src/components/members/dialogs/confirm-sheet.tsx)).
- [x] Leave mess card for active members with safety warnings ([src/components/members/dialogs/leave-card.tsx](file:///d:/Projects/mess-tally-frontend/src/components/members/dialogs/leave-card.tsx)).
- [x] Free Plan capacity warning card (e.g. 5/5 slots used, PRO upgrade prompt) ([src/components/members/roster/plan-usage-card.tsx](file:///d:/Projects/mess-tally-frontend/src/components/members/roster/plan-usage-card.tsx)).
- [x] Pure domain calculations & helpers ([src/lib/members.ts](file:///d:/Projects/mess-tally-frontend/src/lib/members.ts)) and static fixtures ([src/fixtures/member.fixtures.ts](file:///d:/Projects/mess-tally-frontend/src/fixtures/member.fixtures.ts)).
- [x] Interactive dev scenario switcher covering 11 visual states ([src/components/members/members-scenarios.tsx](file:///d:/Projects/mess-tally-frontend/src/components/members/members-scenarios.tsx)).

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
  - [API.md § 8: Mess](file:///D:/Projects/mess-tally-backend/API.md#mess)
  - [API.md § 17: Profile](file:///D:/Projects/mess-tally-backend/API.md#profile)
- **Target Routes:** `src/app/(root)/dashboard/settings/page.tsx`, `src/app/(root)/profile/page.tsx`.

#### Phase 1: Screen Design (Dummy Data) — **IN PROGRESS (Shell + Placeholder)**
- [x] Graceful Settings Page shell & tabbed overview ([src/app/(root)/dashboard/settings/page.tsx](file:///d:/Projects/mess-tally-frontend/src/app/(root)/dashboard/settings/page.tsx)) linking to Member management and Dashboard.
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
  - [API.md § 4: Plan gates](file:///D:/Projects/mess-tally-backend/API.md#plan-gates-free-vs-pro)
  - [API.md § 18: Subscription](file:///D:/Projects/mess-tally-backend/API.md#subscription)
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
  - [plan.md § 5: Phase 5](file:///D:/Projects/mess-tally-backend/plan.md#dev-a-4) (LLM adapters, tool registry, chat loop).
  - [prd.md § 1.1 #3 & § 2.1 Module 7](file:///D:/Projects/mess-tally-backend/prd.md) (Banglish/English queries, financial projections, quick-log confirmation cards).
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
1. [ ] **Backend Grounding:** Read the matching endpoint in [API.md](file:///D:/Projects/mess-tally-backend/API.md) and note the exact method, path, and response object.
2. [ ] **Constraint Check:** Check [plan.md](file:///D:/Projects/mess-tally-backend/plan.md) and [prd.md](file:///D:/Projects/mess-tally-backend/prd.md) for role gates (Owner vs Manager vs Member) and month status restrictions.
3. [ ] **Design Synchronization:** Open [Design.md](file:///d:/Projects/mess-tally-frontend/Design.md) and verify typography, colors, and layout components.
4. [ ] **Mobile Ergonomics:** Verify responsive behavior against [responsive.md](file:///d:/Projects/mess-tally-frontend/responsive.md).
5. [ ] **Code Quality & Testing:** Run `npm run typecheck` and `npm run check` (Biome) after completing each phase.
