# MessTally Frontend — Master Workflow & Feature Plan

> **Document Status:** Active Living Workflow Plan  
> **Frontend Project Path:** [d:\Projects\mess-tally-frontend](file:///d:/Projects/mess-tally-frontend)  
> **Backend Project Path:** [D:\Projects\mess-tally-backend](file:///D:/Projects/mess-tally-backend)  
> **Core Backend Contract Sources:**  
> - [plan.md](file:///D:/Projects/mess-tally-backend/plan.md) — Feature scopes, phase implementation status, and architectural decisions (D1–D14).  
> - [API.md](file:///D:/Projects/mess-tally-backend/API.md) — Route endpoints, HTTP methods, JSON request/response contracts, authorization rules, and error codes.  
> - [prd.md](file:///D:/Projects/mess-tally-backend/prd.md) — Business logic, calculation formulas (meal rate, balance, greedy settlement), roles, and user stories.  
> **Frontend Design & Architectural Guidelines:**  
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
| **04. Dashboard Overview** | ⚪ Pending | ⚪ Pending | Queued | `/dashboard` |
| **05. Daily Meals Matrix** | ⚪ Pending | ⚪ Pending | Queued | `/dashboard/meals` |
| **06. Bazar / Grocery Expenses** | ⚪ Pending | ⚪ Pending | Queued | `/dashboard/bazar` |
| **07. Utility Bills & Advance Fund** | ⚪ Pending | ⚪ Pending | Queued | `/dashboard/utilities` |
| **08. Monthly Summary & Settlement** | ⚪ Pending | ⚪ Pending | Queued | `/dashboard/summary` |
| **09. Members & Roles Management** | ⚪ Pending | ⚪ Pending | Queued | `/dashboard/members` |
| **10. Settings & Mess Profile** | ⚪ Pending | ⚪ Pending | Queued | `/dashboard/settings`, `/profile` |
| **11. Subscription (bKash PRO)** | ⚪ Pending | ⚪ Pending | Queued | `/dashboard/subscription` |
| **12. AI Chatbot (TallyBot)** | ⚪ Pending | ⚪ Pending | Queued | Floating drawer / `/dashboard/ai-chat` |

*Status Legend:* 🟢 Done · 🟡 In Progress · ⚪ Pending / Queued

---

## 3. Feature Breakdown & Implementation Checklists

---

### Module 01: Marketing & Public Pages
- **Backend Reference:** Not applicable (static public routes).
- **Frontend References:** [Design.md](file:///d:/Projects/mess-tally-frontend/Design.md), [responsive.md](file:///d:/Projects/mess-tally-frontend/responsive.md), [fix-responsive-issue.md](file:///d:/Projects/mess-tally-frontend/fix-responsive-issue.md).
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
  - [x] Hero section with eyebrow badge, headline, CTA group, social trust avatars, and hero dashboard visual asset ([src/components/marketing/landing-hero.tsx](file:///d:/Projects/mess-tally-frontend/src/components/marketing/landing-hero.tsx))
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
- [x] Dedicated Onboarding Header (`src/components/onboarding/onboarding-header.tsx`) with transparent background, brand logo, and decoupled user menu.
- [x] Authenticated User Profile Menu (`src/components/user-menu.tsx`) with avatar, display name, email, streamlined single-line actions (Dashboard, Profile, Settings), and destructive Sign Out action hooked to `useLogout()`.
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

#### Phase 1: Screen Design (Dummy Data)
- [ ] Metric summary cards (Current Month, Total Mess Meals, Meal Rate ৳, Total Bazar Spent ৳, Utility Fund Balance ৳).
- [ ] User's Personal Financial Pill / Hero Banner (Your Meals, Your Meal Cost, Bazar Paid, Net Balance: "You owe ৳ X" or "You get back ৳ Y").
- [ ] Quick Action Bar (Add Daily Meal, Log Bazar, Add Utility Bill, Ask TallyBot).
- [ ] Recent Activity Stream / Timeline (latest meal changes, recent grocery entries).
- [ ] Role-Conditional Manager widgets (Pending member approval counter, Month status badge `ACTIVE`/`CLOSED`).
- [ ] Responsive layouts (cards stack cleanly on mobile, 3-column grid on desktop).

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

#### Phase 1: Screen Design (Dummy Data)
- [ ] Daily Meal Matrix / Spreadsheet view (Rows: Active members, Columns: Days of month, Cells: Meal count e.g. 0, 1, 2, 3).
- [ ] Mobile Daily Carousel / Single-Day View (easy thumb entry with `+` / `-` steppers).
- [ ] Daily Cutoff Timer & Status Alert (warns when cutoff time has passed for today).
- [ ] Manager "Bulk Save" bar for updating the entire house tally at once.
- [ ] Individual Member meal breakdown modal / drawer.

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

#### Phase 1: Screen Design (Dummy Data)
- [ ] Bazar expense table / card feed (Date, Shopper name, Amount ৳, Category tags, Description/Items list).
- [ ] Shopper breakdown summary card (Total spent by each member this month).
- [ ] "Add Bazar Entry" Drawer / Modal (Amount, Date picker, Shopper selector, Itemized notes).
- [ ] Category chips (Vegetables, Meat/Fish, Spices, Oil/Rice, Miscellaneous).
- [ ] Delete / Edit confirmation dialogs.

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

#### Phase 1: Screen Design (Dummy Data)
- [ ] Utility Fund Overview Card (Total Deposits Collected − Total Bills Paid = Current Month Fund Balance ৳).
- [ ] Utility Bills Tab (Electricity, Gas, Water, Internet, Maid/Cook, Waste, Other).
- [ ] Deposits Collection Tab (Manager records advance collected from each member).
- [ ] Per-member equal split ledger (showing who paid deposit and remaining per-member utility share).
- [ ] "Add Utility Bill" & "Record Member Deposit" modals.

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

#### Phase 1: Screen Design (Dummy Data)
- [ ] Month Financial Ledger Table:
  - Columns: Member Name, Total Meals, Meal Cost (৳), Total Bazar Paid (৳), Net Meal Balance (৳).
- [ ] Meal Rate Derivation Card (`Meal Rate = Total Bazar Spend / Total House Meals`).
- [ ] Peer-to-Peer Settlement Card Grid:
  - Visual directional cards: "Rahim pays Karim ৳ 850" with copy-transfer details.
- [ ] Month Lifecycle Bar:
  - Month status badge (`ACTIVE` vs `CLOSED`).
  - Manager actions: "Close Month" (locks entries) / "Reopen Month".
- [ ] Export Buttons (Download CSV Statement, Download PDF Report).

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

#### Phase 1: Screen Design (Dummy Data)
- [ ] Active Members Table / Card grid (Avatar, Name, Email, Role badge: Owner / Manager / Member, Joined Date).
- [ ] Pending Approval Requests Section (Approve / Reject buttons with counter badge).
- [ ] Room Code Share Card (Copy join code, QR code display, Regenerate code button).
- [ ] Member Action Menu:
  - "Make Manager" / "Remove Manager" (Transfer manager flag).
  - "Transfer Ownership" (Owner only modal).
  - "Remove from Mess" / "Leave Mess".
- [ ] Capacity Warning Banner: "5 of 5 Free Member slots used. Upgrade to PRO for unlimited members."

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

#### Phase 1: Screen Design (Dummy Data)
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
