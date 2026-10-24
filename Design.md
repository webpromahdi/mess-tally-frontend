# MessTally — Design System & UI/UX Specification

> **Version:** 1.0 · **Status:** Draft — Research + Planning Phase  
> **Scope:** Frontend design only. No backend or server-side code.  
> **Build order:** Authentication → Mess Onboarding → Dashboard → Meals → Bazar → Utility → Summary → Members → Settings → AI Chatbot → Paywall  
> 📱 **Responsive Standards Notice:** All responsive behavior follows [responsive.md](file:///d:/Projects/mess-tally-frontend/responsive.md). If Design.md and responsive.md disagree, responsive.md wins.

---

## Table of Contents

1. [Product & Design Overview](#1-product--design-overview)
2. [Research Summary](#2-research-summary)
3. [Reference Log (Dribbble & Behance Benchmark)](#3-reference-log-dribbble--behance-benchmark)
4. [Color System](#4-color-system)
5. [Typography](#5-typography)
6. [Layout](#6-layout)
7. [Shape & Depth](#7-shape--depth)
8. [Iconography & Imagery](#8-iconography--imagery)
9. [Motion](#9-motion)
10. [Components](#10-components)
11. [Navigation Patterns](#11-navigation-patterns)
12. [UX Patterns](#12-ux-patterns)
13. [Paywall / Upgrade Patterns](#13-paywall--upgrade-patterns)
14. [Content & Microcopy](#14-content--microcopy)
15. [Accessibility](#15-accessibility)
16. [Information Architecture & Page Plan](#16-information-architecture--page-plan)
17. [Design Token Summary (Tailwind-ready)](#17-design-token-summary-tailwind-ready)
18. [shadcn/ui Implementation Mapping](#18-shadcnui-implementation-mapping)
19. [Do's, Don'ts & Consistency Checklist](#19-dos-donts--consistency-checklist)
20. [Open Questions & Unverified Assumptions](#20-open-questions--unverified-assumptions)

---

## 1. Product & Design Overview

### 1.1 Product Summary

**MessTally** is a shared-living meal and expense management platform for bachelor flatmates. It replaces paper meal charts, group WhatsApp arguments, and manual spreadsheets with an automated, transparent, single source of truth that calculates meal rates, individual meal costs, settlement transfers, utility bills, and advance fund tracking — all scoped to a calendar month.

The product also features **TallyBot** — an AI chatbot that answers financial questions in plain English or Banglish and allows quick-logging with a one-click confirmation card.

### 1.2 Target Users

| Role | Who | Behaviour Pattern |
|------|-----|-------------------|
| **Owner** | The person who created the mess | Rare setup tasks, checks summary, may or may not be active daily |
| **Manager** | Owner or delegated flatmate | Opens/closes months, approves members, records deposits, verifies bazar |
| **Member** | Any active flatmate | Daily: checks meal count; weekly: checks bazar; monthly: checks settlement |

**Device context:** 80%+ usage is expected on mobile phones (Android, mid-range), with desktop usage for the Owner/Manager on month-close day. Design must be mobile-first but fully functional on desktop.

**Locale:** Bangladesh. Language: English + Banglish (Bengali written in Latin script). Currency: Bangladeshi Taka (BDT, ৳).

### 1.3 Brand Personality

| Trait | Description |
|-------|-------------|
| **Trustworthy** | Every number is explainable. No hidden math, no rounding surprises. |
| **Friendly but serious** | This is real money between friends — not a game, but not intimidating either. |
| **Efficient** | Quick entry, fast answers, minimal taps. |
| **Transparent** | Show the formula, not just the result. |
| **Modern & local** | Feels like a global-quality fintech product built for Bangladeshi households. |

### 1.4 Design Principles

1. **Numbers first.** Financial data is the hero. Typography, layout, and spacing exist to make numbers scannable and unmistakable.
2. **Mobile-first, always.** Design for a 390px viewport with one thumb. Scale up, never down.
3. **Optimism with safety nets.** Use optimistic UI updates everywhere, but provide clear confirmation cards before any write action that can't be easily undone.
4. **Clarity over cleverness.** Use plain language, familiar patterns, and obvious affordances. Don't hide important data in tooltips.
5. **Role-aware surfaces.** The UI should silently hide or lock controls that the current role cannot use — not throw permission errors after the user taps.
6. **Consistent feedback.** Every action must have a loading, success, and error state. The user is never left wondering if their tap worked.

### 1.5 Tone of Voice

- **Microcopy:** Conversational, direct, brief. Avoid jargon ("net balance" → "meal balance"). Use "you" and "your flatmates".
- **Errors:** Honest and helpful, never blame the user. "We couldn't load this. Try again." not "Error 500."
- **Empty states:** Encouraging and instructional. "No bazar trips yet this month. Add the first one!"
- **Confirmations:** One clear verb. "Save Meal Entry" not "Submit Form".
- **Settlement:** Casual but precise. "Rahim pays Karim ৳ 850" not "Transfer required from user_002 to user_007."

---

## 2. Research Summary

> **Evidence & Methodology Note:** The Mobbin MCP service was not accessible due to subscription constraints (returning `"Mobbin MCP requires a paid plan"` for all queries). To provide concrete visual evidence, the user supplied **11 real UI design references** from Dribbble and Behance (5 attached in chat + 6 in the project directory `screen-idea/`).  
> In accordance with user guidance, these references are evaluated as **designer concepts** exploring modern layout structures, visual density, and component patterns, rather than empirical telemetry of shipped production software. Every extracted pattern has been critically vetted against MessTally's core product requirements: **shared bachelor flatmate living in Bangladesh, mobile-first usage (390px base), financial transparency, and strict WCAG 2.1 AA accessibility**. All detailed screen extractions are recorded in [`screen-idea/REFERENCE_ANALYSIS.md`](file:///d:/Projects/mess-tally-frontend/screen-idea/REFERENCE_ANALYSIS.md).

### 2.1 UI References Analyzed

| Ref ID / Filename | Origin & Description | Module Mapping | Viewport |
|-------------------|----------------------|----------------|----------|
| `chat_skanalytic_dashboard.png` | `SKAnalytc.` (Dribbble/Behance) — 3-column analytics dashboard | Dashboard, Paywall | Web Desktop |
| `chat_interoly_expenses.png` | `Interoly` — Multi-level expense management & structured table | Dashboard, Bazar, Utility, Members | Web Desktop |
| `chat_citi_banking.png` | `citi` — Consumer banking, utility category actions & member transfers | Dashboard, Utility, Members, Summary | Web Desktop |
| `chat_talentedhr_attendance.png` | `talentedhr.com` / `Orely Studio` — Top-tab HR payroll & attendance | Dashboard, Daily Meals, Summary | Web Desktop |
| `chat_mymoney_dark_dashboard.png` | `MYMONEY.` — Dark mode personal finance, cards & transaction feed | Dashboard, Bazar (Feed), Settings | Web Desktop (Dark) |
| `070eaf59795591.6859e116d16c4.webp` | Full-screen calendar/bookkeeping matrix grid & floating entry cards | Daily Meals (Grid), Bazar, Summary | Web Desktop |
| `21721074013784022a08a16ebe4aed0d.webp` | `Cure Sync` (2025) — Split-screen registration with live UI preview hero | Authentication (`/register`), Dashboard | Web Desktop |
| `5e18ca59795591.685a6bf209ac8.webp` | Operations & energy dashboard with manager badge & Pro upgrade card | Dashboard, Utility, Paywall, Settings | Web Desktop |
| `Screenshot_15.png` | Split-screen login with email/password form & full-bleed photo hero | Authentication (`/login`) | Web Desktop |
| `b6a51759795591.6ac01ace7c096.webp` | `Nord Investment` — Financial wallet with dedicated Deposit/Withdraw | Dashboard, Utility (Fund), Bazar | Web Desktop |
| `e6ba97418761972f8b4dd3467ebf4f8b.webp` | `Finance` — Dark mode split-screen registration with glowing preview | Authentication (`/register` Dark) | Web Desktop (Dark) |

---

### 2.2 Key Patterns Found (by Module)

#### Module 1: Authentication (`/login`, `/register`)
- **Split-screen layout on desktop:** Seen in **3 of 3** auth references (`Screenshot_15.png`, `21721074013784022a08a16ebe4aed0d.webp`, `e6ba97418761972f8b4dd3467ebf4f8b.webp`). Left half contains the functional card form (400px–480px); right half contains product value proposition, live UI preview, or brand imagery.
- **Persistent labels above inputs:** Seen in **3 of 3** auth references (`Screenshot_15.png`, `21721074013784022a08a16ebe4aed0d.webp`, `e6ba97418761972f8b4dd3467ebf4f8b.webp`). Labels are never floating or placeholder-only.
- **Required field asterisks (`*`):** Explicitly used on mandatory fields (`Name*`, `Email*`, `Password*`) `[Ref: 21721074013784022a08a16ebe4aed0d.webp]`.
- **Password show/hide toggle:** Right-aligned eye-off icon inside input container `[Ref: 21721074013784022a08a16ebe4aed0d.webp]`.
- **Full-width primary CTA button:** Solid high-contrast action button placed immediately below input fields `[Ref: Screenshot_15.png, 21721074013784022a08a16ebe4aed0d.webp, e6ba97418761972f8b4dd3467ebf4f8b.webp]`.
- **Sub-button utility row:** `☑ Remember me` checkbox paired with right-aligned `Forgot Password ?` link `[Ref: Screenshot_15.png]`.
- **Social SSO buttons:** Positioned either below an `Or continue with` divider `[Ref: 21721074013784022a08a16ebe4aed0d.webp]` or prominent pill buttons `[Ref: e6ba97418761972f8b4dd3467ebf4f8b.webp]`. *(Marked as an unverified assumption pending backend OAuth support).*
- **Alternate view prompt:** Bottom-centered navigation link (`Don't have an account ? Register here`) `[Ref: Screenshot_15.png]`.

#### Module 1.5: Onboarding & Mess Join
- **Fork-in-the-road screen:** "Create a Mess" vs "Join with a Code" `[General knowledge]`. *(No direct onboarding fork reference in the concept set; retained as industry convention).*
- **Multi-mess switcher pill:** Pinned in top context bar with establishment/mess name and icon `[Ref: b6a51759795591.6ac01ace7c096.webp]`.
- **Room code input:** Monospace, auto-uppercased, segmented card `[General knowledge]`.

#### Module 2: Members
- **Explicit role indicator in profile anchor:** User name displayed with prominent role subtitle (`Manager` / `Owner`) in the sidebar header `[Ref: 5e18ca59795591.685a6bf209ac8.webp]` and profile card `[Ref: chat_interoly_expenses.png, b6a51759795591.6ac01ace7c096.webp]`.
- **Inline member addition affordance:** Dedicated `+ Add a New Member` row positioned directly at the bottom of the active member list `[Ref: chat_citi_banking.png]`.
- **Circular avatar cards with status chips:** Avatars with initials fallback, name, status pills (`Active`, `Pending`, `Left`) `[Ref: chat_interoly_expenses.png, chat_talentedhr_attendance.png]`.

#### Module 3: Daily Meals
- **Spreadsheet matrix data grid (Desktop):** Members as rows, calendar dates as columns, structured day cells with status indicators `[Ref: 070eaf59795591.6859e116d16c4.webp]`.
- **Floating quick-entry popover card:** Clicking a grid cell opens an inline card with amount, note, and save button `[Ref: 070eaf59795591.6859e116d16c4.webp]`.
- **Mobile accordion day view:** Desktop matrix collapses to date-grouped card stacks on viewports < 768px `[General knowledge]`.

#### Module 4: Bazar
- **Chronological expense feed:** Date-grouped ledger items (`Today`, `Yesterday`, specific dates) `[Ref: chat_mymoney_dark_dashboard.png, 070eaf59795591.6859e116d16c4.webp, b6a51759795591.6ac01ace7c096.webp]`.
- **Avatar-first transaction rows:** Shopper avatar displayed next to expense description, with right-aligned currency amount and status pill `[Ref: chat_interoly_expenses.png, chat_citi_banking.png]`.
- **Primary + Add action button:** Pinned at top-right of section (`+ Add New`) on desktop `[Ref: chat_interoly_expenses.png, chat_skanalytic_dashboard.png]`; maps to floating action button (FAB) on mobile.

#### Module 5: Utility Bills & Fund
- **Square category quick-action cards:** Dedicated category cards with icons and labels for household utilities (`Electricity`, `Gas Bill`, `Water`, `Internet`, `Cook`) `[Ref: chat_citi_banking.png]`.
- **Dedicated Deposit & Bill-Pay action buttons:** Inside the fund card, dedicated pill buttons `↓ Deposit` (light surface) and `↑ Withdraw / Pay Bill` (dark surface) provide immediate operational clarity `[Ref: b6a51759795591.6ac01ace7c096.webp]`.
- **Balance breakdown list:** Fund balance itemized into `Available`, `Committed`, and `Depleted` lines `[Ref: b6a51759795591.6ac01ace7c096.webp]`.

#### Module 6: Summary & Dashboard
- **Top hero stat cards with trend indicators:** 3 to 4 modular cards with icon badge, large currency figure, and percentage difference `[Ref: chat_skanalytic_dashboard.png, chat_interoly_expenses.png, b6a51759795591.6ac01ace7c096.webp]`.
- **Pill-encapsulated balance displays:** Positive and negative balances encapsulated in high-contrast dedicated surface pills (`+$1,000,000` on subtle surface, `-$680,000` on white surface) `[Ref: 5e18ca59795591.685a6bf209ac8.webp]`.
- **Date/Month scope dropdown:** Prominently placed in the top bar to anchor all metrics to the active billing period `[Ref: chat_skanalytic_dashboard.png, chat_talentedhr_attendance.png, 070eaf59795591.6859e116d16c4.webp]`.
- **Summary table with pagination & sorting:** Table headers with sorting indicators (`⇅`), row hover states, and pagination footer (`< 1 2 3 ... 10 >`, summary counter) `[Ref: chat_interoly_expenses.png]`.

#### Module 7: AI Chatbot (TallyBot)
- **Slide-over right drawer (400px):** `[General knowledge]`. *(No chatbot drawer present in the reference images; retained as established conversational UI pattern).*
- **Confirmation Card inside chat:** Human-in-the-loop write guardrail from PRD `[General knowledge]`.

#### Paywall / Upgrade
- **In-app promotional upgrade card:** Embedded in the sidebar footer or top-right card grid with `PRO` pill badge, illustrative graphic, benefit copy, and CTA button `[Ref: chat_skanalytic_dashboard.png, 5e18ca59795591.685a6bf209ac8.webp]`. *(Marked as assumption not in PRD)*.

---

### 2.3 Auth & Onboarding Reference Findings (Phase 1 Baseline)

Because **Phase 1 (Authentication)** is the first implementation milestone, the 3 authentication references (`Screenshot_15.png`, `21721074013784022a08a16ebe4aed0d.webp`, `e6ba97418761972f8b4dd3467ebf4f8b.webp`) were analyzed in depth to extract concrete baseline decisions:

```
Desktop Split-Screen Architecture (>= 1024px):
+------------------------------------+------------------------------------+
|  LEFT COLUMN: Form Container       |  RIGHT COLUMN: Value Proposition   |
|  (Width: 480px max, centered)      |  (Tinted Card or Live UI Preview)  |
|                                    |                                    |
|  [MessTally Brand Monogram]        |  "The Transparent Shared Ledger    |
|                                    |   for Bachelor Flatmates"          |
|  Welcome back                      |                                    |
|  Sign in to your mess account.     |  +------------------------------+  |
|                                    |  | Live Mini-Summary Preview:   |  |
|  Email Address *                   |  | Meal Rate: ৳ 43.22 / meal    |  |
|  [ name@example.com              ] |  | Rahim gets back: +৳ 850      |  |
|                                    |  | Karim owes:      −৳ 340      |  |
|  Password *                        |  +------------------------------+  |
|  [ ••••••••••••••••            👁 ] |                                    |
|                                    |  • Real-time automated math        |
|  [ Sign In                       ] |  • No missing grocery receipts     |
|                                    |  • Instant month-end settlement    |
|  [☑] Remember me  Forgot Password? |                                    |
|                                    |                                    |
|  ------- Or continue with -------  |                                    |
|  [ G  Continue with Google       ] |                                    |
|                                    |                                    |
|  Don't have an account? Register   |                                    |
+------------------------------------+------------------------------------+
```

1. **Desktop vs Mobile Layout:**
   - **Desktop (>= 1024px):** 50/50 split container. The left side contains the form card; the right side contains a soft Ice Silver tinted container card (`#DDE3E8`) with an embedded live UI preview (illustrating the Monthly Summary and Meal Rate cards, following `21721074013784022a08a16ebe4aed0d.webp`).
   - **Mobile (< 1024px):** The right marketing hero is hidden; the form card spans full width (max 400px centered), ensuring zero horizontal scrolling on a 390px viewport.
2. **Field Structure & Labeling:**
   - Labels are always positioned **above** the input container in `text-label` (12px, weight 500, `gray-900` or `aubergine-800`).
   - Required fields feature a subtle red asterisk (`*`) `[Ref: 21721074013784022a08a16ebe4aed0d.webp]`.
   - Inputs have a fixed height of `40px`, `radius-md` (8px), a 1px border (`#6B7A87` — 4.4:1 on white, satisfying WCAG 1.4.11 >= 3:1 for interactive boundaries; decorative card/table borders retain `#BCCAD4`), and a 2px focus ring (`#3A0F34`).
3. **Password Input Specification:**
   - Password inputs contain an interactive show/hide toggle button (Lucide `Eye` / `EyeOff`, 16px) inside the right edge of the input container `[Ref: 21721074013784022a08a16ebe4aed0d.webp]`.
   - On `/register`, an accessible 3-segment strength meter (Weak/Medium/Strong) is displayed below the field.
4. **Button & Action Hierarchy:**
   - Primary action (`Sign In` or `Create Account`) is a **full-width button** (`h-11`, weight 600, `radius-md`), using Deep Aubergine (`#3A0F34`) with white text (16.2:1 AAA) in light mode, and Marigold (`#EAAA00`) with Deep Aubergine (`#3A0F34`) text (7.9:1 AAA) in dark mode `[Ref: Screenshot_15.png, 21721074013784022a08a16ebe4aed0d.webp]`.
   - The utility row (`☑ Remember me` and `Forgot Password ?`) is placed directly adjacent to the primary action `[Ref: Screenshot_15.png]`.
   - Social SSO button (Google) is full-width with a 1px border (`#BCCAD4`) and official colored icon `[Ref: e6ba97418761972f8b4dd3467ebf4f8b.webp]`.
5. **Validation & Error Feedback:**
   - Validation occurs on blur via TanStack Form. Field errors appear directly below the field in 12px `text-destructive` (`#B91C1C`) with an alert circle icon.
   - Form-level API errors (e.g. `Invalid credentials`) render in an alert banner at the top of the form with `bg-error-surface` (`#FEE2E2`) and a red border. Form input values are never cleared on error.

---

### 2.4 Pattern Synthesis & Cross-Reference Findings

| Pattern | Frequency in References | Recommendation for MessTally |
|---------|-------------------------|------------------------------|
| **Split-Screen Desktop Auth** | Seen in **3 of 3** auth screens | **Adopted.** 50/50 split container with live UI preview hero. |
| **Labels Above Form Inputs** | Seen in **3 of 3** auth screens | **Adopted.** Persistent labels; no placeholder-only labels. |
| **Password Eye Toggle** | Seen in **1 of 3** auth screens `[Ref: 21721074013784022a08a16ebe4aed0d.webp]` + UX convention | **Adopted.** Eye/EyeOff toggle inside right input padding. |
| **Left Sidebar Desktop Shell** | Seen in **6 of 8** dashboards (75%) | **Adopted.** Left sidebar on desktop (256px); bottom nav on mobile. |
| **User Role Badge in Shell** | Seen in **3 of 8** dashboards | **Adopted.** Manager/Owner role badge pinned under user avatar. |
| **Top Metric Stat Cards** | Seen in **6 of 8** dashboards | **Adopted.** 4-card grid with icon badge, number, and trend pill. |
| **Sticky Month Filter Bar** | Seen in **5 of 8** dashboards | **Adopted.** Month selector pinned to top of shell across all pages. |
| **Pill Status Badges** | Seen in **5 of 8** dashboards | **Adopted.** Soft surface pill badges with darkened readable text. |
| **Spreadsheet Matrix Grid** | Seen in **2 of 8** dashboards | **Adopted on desktop** for Daily Meals; card stack on mobile. |
| **Dedicated Fund Actions** | Seen in **1 of 8** dashboards | **Adopted.** Dedicated `↓ Deposit` & `↑ Pay Bill` buttons in Utility card. |

---

### 2.5 Decisions Changed vs Kept

| Topic | Earlier Baseline | Reference Evidence | Decision | Rationale |
|-------|------------------|--------------------|----------|-----------|
| **Auth Layout** | Split-screen mentioned generally | Confirmed in 3 of 3 auth references (`Screenshot_15.png`, `21721074013784022a08a16ebe4aed0d.webp`, `e6ba97418761972f8b4dd3467ebf4f8b.webp`) | **Adopted with Evidence:** 50/50 split-screen on desktop; collapses to single column on mobile. | Directly validated by all 3 auth references. |
| **Auth Hero Content** | Generic brand illustration | `21721074013784022a08a16ebe4aed0d.webp` uses live UI preview; `Screenshot_15.png` uses photo | **Adopted UI Preview:** Use an embedded live UI preview (summary card & meal rate) in the right hero card. | Financial preview builds trust faster than stock photography. |
| **Daily Meals Matrix** | Abstract spreadsheet concept | `070eaf59795591.6859e116d16c4.webp` demonstrates full matrix grid with date headers & floating popover cards | **Adopted with Evidence:** Desktop uses full matrix with quick-add popovers; mobile collapses to day cards. | Directly validated by `070eaf59795591.6859e116d16c4.webp`. |
| **Utility Fund Action Buttons** | Generic fund indicator | `b6a51759795591.6ac01ace7c096.webp` features explicit dual pill buttons `↓ Deposit` and `↑ Withdraw` inside wallet card | **Adopted with Evidence:** Add dedicated `↓ Deposit` and `↑ Bill Pay` buttons inside Utility Fund card. | Greatly clarifies manager actions for fund replenishment. |
| **Card Corner Radius** | 12px (`radius-lg`) | References vary: 12px (`chat_interoly_expenses.png`), 16px (`chat_skanalytic_dashboard.png`), up to 24px | **Kept 12px–16px:** Cards use 12px (`radius-lg`), hero cards use 16px (`radius-xl`), pills use 9999px. | 24px+ curves waste mobile screen real estate; 12px–16px balances modern look with dense data. |
| **Color System & WCAG** | Ice Silver `#DDE3E8`, Deep Aubergine `#3A0F34`, Marigold `#EAAA00`, verified AA contrast | References use varied blues, teals, oranges, and low-contrast pastels | **KEPT UNCHANGED & RE-VERIFIED:** Retain MessTally's brand palette and computed WCAG AA tokens. Fixed dark mode `--primary` to Marigold (`#EAAA00`) on dark cards and dark destructive to Red-600 (`#DC2626`). | Rule 1 & Rule 2: Never compromise brand identity or accessibility for Dribbble aesthetics. |
| **Currency & Numbers Typography** | Hind Siliguri only + `tabular-nums` | References use generic sans-serif or bold geometric fonts for amounts | **Updated Font Stack:** Set `--font-sans` to `'Inter', 'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif` with `tabular-nums`. | Hind Siliguri lacks OpenType `tnum` (digits remain proportional). Inter provides real fixed-width `tnum` for Latin digits, while browser fallback to Hind Siliguri preserves native `৳` (U+09F3) rendering. |
| **Meal Rate Formula Card** | Inline Expandable Formula Card (replaces hover tooltip) | References show interactive hover tooltips (`chat_skanalytic_dashboard.png`, `chat_talentedhr_attendance.png`) | **KEPT UNCHANGED:** Retain inline expandable card for mobile tap & desktop click. | Dribbble hover tooltips completely fail on touchscreens. |
| **Open Questions & Scope** | Tagged `/register`, `/pricing`, SaaS limits as assumptions | References showcase `/register` and Pro upgrade banners | **KEPT UNCHANGED:** Retain clear assumption flags and Section 19. | Dribbble concepts do not override MessTally PRD scope. |

---

## 3. Reference Log (Dribbble & Behance Benchmark)

> **Important Source Clarification:** The Mobbin MCP tool was not accessible because it requires an active paid subscription (`"Mobbin MCP requires a paid plan"`). No screens or UI flows were retrieved from Mobbin. Instead, the 11 design references cataloged below were supplied by the user from Dribbble and Behance concepts. Each reference was audited to extract structural UX conventions while filtering out inaccessible aesthetic trends.

| Ref Identifier / Filename | Module Mapping | What It Demonstrates | What We Adopted | What We Rejected |
|---------------------------|----------------|----------------------|-----------------|------------------|
| `chat_skanalytic_dashboard.png` | Dashboard, Paywall | 3-column desktop shell, metric stat cards with trend badges, in-app Pro upgrade sidebar card | Top stat card structure with icon badge + percentage pill; in-app Pro upgrade card format | Floating hover tooltips (inaccessible on mobile); 24px extreme corner curves (wastes mobile space) |
| `chat_interoly_expenses.png` | Dashboard, Bazar, Utility, Members | High-density expense ledger, vendor avatar in table rows, status pill chips, pagination controls | Compact financial table structure, avatar-first payer rows, status pills (`Billable`/`Draft`), numbered pagination footer | Low-contrast text on table rows; multi-tier nested sidebar trees (too complex for flatmates) |
| `chat_citi_banking.png` | Dashboard, Utility, Members, Summary | Square category action cards (`Electricity`, `Gas Bill`), `Send Money` member list with `+ Add Member` row | Category quick-action row for utilities; dedicated `+ Add a New Member` inline row | Faint pastel background cards; non-semantic colored letter avatars |
| `chat_talentedhr_attendance.png` | Dashboard, Daily Meals, Summary | Top-tab navigation, attendance status table, segmented progress bar, calendar date picker | Stacked/segmented status bar; date range dropdown component | Top horizontal navigation as sole desktop shell (left sidebar is more scalable for multi-module SaaS) |
| `chat_mymoney_dark_dashboard.png` | Dashboard, Bazar (Feed), Settings | Dark mode layered surfaces, circular progress gauges, chronological transaction feed grouped by date | Layered surface depth without harsh borders; date-grouped chronological expense feed | Low-contrast dark gray text; abstract card graphics without accounting utility |
| `070eaf59795591.6859e116d16c4.webp` | Daily Meals, Bazar, Summary | Full-screen spreadsheet matrix grid with date headers, floating quick-entry popover card | Desktop matrix grid layout for Daily Meals; floating quick-add popover card for instant expense entry | Microscopic table typography (~10px); complex multi-month view that overwhelms mobile screens |
| `21721074013784022a08a16ebe4aed0d.webp` | Authentication (`/register`), Dashboard | Split-screen registration form with label-above fields, required asterisks (`*`), eye toggle, embedded UI preview | 50/50 split-screen desktop auth layout; embedded live UI preview hero; label-above form groups with required asterisks | Mint green color palette (MessTally uses Deep Aubergine & Marigold); unvalidated social SSO buttons |
| `5e18ca59795591.685a6bf209ac8.webp` | Dashboard, Utility, Paywall, Settings | Manager role displayed in sidebar header; high-contrast pill-encapsulated income/expense balance card; Pro upgrade banner | User role subtitle (`Manager`) under avatar in sidebar; high-contrast balance pill encapsulation; in-app Pro promo banner | Orange primary brand color; complex industrial consumption gauges |
| `Screenshot_15.png` | Authentication (`/login`) | Split-screen sign-in with email/password form, Remember me checkbox, Forgot Password link, lifestyle photo | Clean form hierarchy for `/login`; sub-button utility row (Remember me + Forgot Password); bold registration prompt | Photographic lifestyle hero (replaced with interactive live UI preview card); raw navy colors |
| `b6a51759795591.6ac01ace7c096.webp` | Dashboard, Utility (Fund), Bazar | Wallet balance card with dedicated `↓ Deposit` & `↑ Withdraw` buttons; mess switcher pill in header; status dot table | Dedicated `↓ Deposit` and `↑ Bill Pay` buttons inside Utility Fund card; header mess switcher pill | Investment-specific charts (stepped portfolio, diversification donut) |
| `e6ba97418761972f8b4dd3467ebf4f8b.webp` | Authentication (`/register` Dark) | Dark mode split-screen registration with ambient glow hero and full-width social buttons | Dark mode split-screen form styling; high-contrast primary CTA button | Faint gray input borders; Microsoft SSO button (not applicable to Bangladesh bachelor demographic) |

---

## 4. Color System

### 4.1 Brand Colors (Given)

| Name | Hex | Role |
|------|-----|------|
| **Ice Silver** | `#DDE3E8` | Light mode page background (canvas) |
| **Deep Aubergine** | `#3A0F34` | Primary brand, dark surfaces, sidebar |
| **Marigold** | `#EAAA00` | Brand accent, primary CTAs, highlights |

### 4.2 Extended Palette

#### Deep Aubergine Scale
| Token | Hex | Use |
|-------|-----|-----|
| `aubergine-950` | `#1A0517` | Dark mode deepest background |
| `aubergine-900` | `#2A0926` | Dark mode sidebar background |
| `aubergine-800` | `#3A0F34` | Brand color — primary, sidebar header |
| `aubergine-700` | `#501A4A` | Dark mode card surface |
| `aubergine-600` | `#6B2560` | Dark mode elevated card |
| `aubergine-500` | `#8C3A7E` | Dark mode border, dividers |
| `aubergine-400` | `#B46EA8` | Dark mode muted text |
| `aubergine-300` | `#D4A0CB` | Dark mode secondary text |
| `aubergine-200` | `#ECC8E6` | Dark mode subtle tint |
| `aubergine-100` | `#F7EBF5` | Light mode aubergine tint (backgrounds) |
| `aubergine-50`  | `#FDF7FC` | Light mode faintest tint |

#### Marigold Scale
| Token | Hex | Use |
|-------|-----|-----|
| `marigold-900` | `#7A5600` | Dark marigold text on light |
| `marigold-800` | `#A07200` | Emphasized marigold text |
| `marigold-700` | `#C48B00` | Hover states for marigold CTA |
| `marigold-600` | `#D49A00` | Active states |
| `marigold-500` | `#EAAA00` | Brand color — primary accent, FABs, CTAs |
| `marigold-400` | `#F0BC33` | Marigold hover (lighter) |
| `marigold-300` | `#F5CE66` | Light marigold tint |
| `marigold-200` | `#FAE199` | Very light marigold (badges) |
| `marigold-100` | `#FDF3CC` | Marigold surface tint |
| `marigold-50`  | `#FEFAEE` | Faintest marigold |

#### Ice Silver Scale (Re-derived with `#DDE3E8` as base canvas)
| Token | Hex | Use |
|-------|-----|-----|
| `silver-900` | `#6B7A87` | borders / non-text UI only |
| `silver-800` | `#8A9BA8` | Secondary text, placeholders on dark surfaces |
| `silver-700` | `#A4B5C2` | High-contrast borders / active borders |
| `silver-600` | `#BCCAD4` | Standard card and table borders (fixed silver-500/600 mismatch) |
| `silver-500` | `#CDD6DF` | Input borders, container wells |
| `silver-400` | `#DDE3E8` | **Brand color — base light-mode page background (canvas)** |
| `silver-300` | `#E8EDF1` | Subtle hover background, secondary well |
| `silver-200` | `#F0F4F7` | Elevated card layer |
| `silver-100` | `#F8FAFC` | High-surface highlight |
| `silver-50`  | `#FFFFFF` | **Pure white card and popover surface (crisp contrast over #DDE3E8)** |

#### Neutral Grays (for text and UI)
| Token | Hex | Use |
|-------|-----|-----|
| `gray-950` | `#0A0A0B` | Pure text, maximum contrast |
| `gray-900` | `#111113` | Primary body text (14.6:1 on Ice Silver, 18.9:1 on card) |
| `gray-700` | `#374151` | Secondary text (7.96:1 on Ice Silver, 10.3:1 on card) |
| `gray-600` | `#4B5563` | **Muted text for Ice Silver & White (5.84:1 on Ice Silver, 7.56:1 on white — passes AA)** |
| `gray-500` | `#6B7280` | Muted text ONLY on pure white surfaces (4.83:1; FAILS on #DDE3E8 at 3.74:1) |
| `gray-300` | `#D1D5DB` | Disabled borders |
| `gray-100` | `#F3F4F6` | Disabled backgrounds |

### 4.3 Semantic Colors

To guarantee WCAG AA compliance (minimum 4.5:1 for normal text), text tokens are darkened to 700/800 levels across all light surfaces.

| Purpose | Hex (Light Text) | Surface Background | Contrast on Surface | Contrast on #DDE3E8 | Dark Mode Text |
|---------|-----------------|--------------------|---------------------|---------------------|----------------|
| **Success** | `#065F46` (Emerald-800) universal; `#047857` (Emerald-700) on white/surface only | `#D1FAE5` | **6.78:1** (800) / **4.84:1** (700) ✅ AA | **5.94:1** (800 ✅ AA) / *4.24:1 (700 ❌ FAIL)* | `#10B981` |
| **Error** | `#B91C1C` (Red-700) | `#FEE2E2` | **5.30:1** ✅ AA | **5.00:1** ✅ AA | `#F87171` (6.51:1 on dark) |
| **Warning** | `#92400E` (Amber-800) | `#FEF3C7` | **6.37:1** ✅ AA | **5.48:1** ✅ AA | `#F59E0B` |
| **Info** | `#1D4ED8` (Blue-700) | `#DBEAFE` | **5.49:1** ✅ AA | **5.18:1** ✅ AA | `#3B82F6` |

> **Success & Positive Money Contrast Rule:** On the Ice Silver canvas (`#DDE3E8`), all success and money-positive text MUST use `emerald-800` (`#065F46`, **5.94:1** ✅ AA). `emerald-700` (`#047857`) is strictly restricted to pure white cards (**5.48:1** ✅ AA) and `#D1FAE5` surface chips (**4.84:1** ✅ AA) because its 4.24:1 ratio on Ice Silver fails WCAG AA (< 4.5:1).

### 4.4 Money-Specific Colors

These semantic tokens carry financial meaning throughout the app. All foreground text tokens have been verified to exceed the 4.5:1 WCAG AA threshold against white card surfaces, their respective surface tints, and the base `#DDE3E8` canvas.

| Token | Hex | Meaning | Re-verified Contrast | Where Used |
|-------|-----|---------|----------------------|------------|
| `money-positive` | `#065F46` (Emerald-800) universal; `#047857` (Emerald-700) on white only | You are owed / you get back | **7.68:1** (800 on white), **6.78:1** (800 on surface), **5.94:1** (800 on Ice Silver) ✅ AAA/AA | Receiver in settlement, positive Meal Balance |
| `money-positive-surface` | `#D1FAE5` | Background for positive balance cell | — | Summary table row, stat card badge |
| `money-negative` | `#B91C1C` (Red-700) | You owe / you need to pay | **6.47:1** (on white), **5.30:1** (on surface), **5.00:1** (on Ice Silver) ✅ AA | Giver in settlement, negative Meal Balance |
| `money-negative-surface` | `#FEE2E2` | Background for negative balance cell | — | Summary table row, stat card badge |
| `money-neutral` | `#4B5563` (Gray-600) | Settled / zero balance | **7.56:1** (on white), **6.81:1** (on surface), **5.84:1** (on Ice Silver) ✅ AA | Settled members, zeroed-out transfers |
| `money-neutral-surface` | `#F3F4F6` | Background for zero balance | — | Settled badge |

### 4.5 Light Mode Token Map (shadcn-compatible)

```css
:root {
  /* Surfaces — Base canvas is brand Ice Silver; cards are crisp pure white */
  --background:        #DDE3E8;      /* silver-400 (Ice Silver) — page canvas */
  --foreground:        #111113;      /* gray-900 — body text (14.6:1 on Ice Silver, 18.9:1 on card) */
  --card:              #FFFFFF;      /* pure white card surface for crisp contrast over #DDE3E8 */
  --card-foreground:   #111113;      /* gray-900 */
  --popover:           #FFFFFF;      /* dialogs, dropdowns, menus */
  --popover-foreground:#111113;

  /* Brand Primary */
  --primary:           #3A0F34;      /* Deep Aubergine */
  --primary-foreground:#FFFFFF;      /* white on aubergine — 16.2:1 AAA */

  /* Brand Accent — Dedicated token for Marigold CTAs (NOT mapped to shadcn --accent) */
  --brand-accent:            #EAAA00; /* Marigold — primary CTAs, FAB, key highlights */
  --brand-accent-foreground: #3A0F34; /* Deep Aubergine on Marigold — 7.9:1 AAA (normal text permitted) */

  /* shadcn Accent — Subtle neutral tint for dropdown hover and ghost button hover */
  --accent:            #E8EDF1;      /* silver-300 — subtle hover tint */
  --accent-foreground: #111113;      /* gray-900 */

  /* Secondary */
  --secondary:         #ECC8E6;      /* aubergine-200 */
  --secondary-foreground: #3A0F34;

  /* Muted */
  --muted:             #CDD6DF;      /* silver-500 — subtle container well */
  --muted-foreground:  #4B5563;      /* gray-600 — 5.84:1 on Ice Silver, 7.56:1 on white (AA compliant) */

  /* Semantic */
  --destructive:       #B91C1C;      /* red-700 — 6.47:1 on white, 5.00:1 on Ice Silver */
  --destructive-foreground: #FFFFFF;

  /* Domain Semantic & Status Tokens */
  --success:                   #065F46;      /* emerald-800 — 5.94:1 on Ice Silver, 7.68:1 on white */
  --success-surface:           #D1FAE5;      /* emerald-100 */
  --warning:                   #92400E;      /* amber-800 — 5.48:1 on Ice Silver, 7.09:1 on white */
  --warning-surface:           #FEF3C7;      /* amber-100 */
  --error:                     #B91C1C;      /* red-700 — 5.00:1 on Ice Silver, 6.47:1 on white */
  --error-surface:             #FEE2E2;      /* red-100 */
  --info:                      #1D4ED8;      /* blue-700 — 5.18:1 on Ice Silver, 6.70:1 on white */
  --info-surface:              #DBEAFE;      /* blue-100 */

  /* Money Tokens */
  --money-positive:            #065F46;      /* emerald-800 */
  --money-positive-surface:    #D1FAE5;
  --money-negative:            #B91C1C;      /* red-700 */
  --money-negative-surface:    #FEE2E2;
  --money-neutral:             #4B5563;      /* gray-600 */
  --money-neutral-surface:     #F3F4F6;

  /* Structure — input borders use silver-900 for WCAG 1.4.11 boundary compliance */
  --border:            #BCCAD4;      /* silver-600 — decorative card and table dividers */
  --input:             #6B7A87;      /* silver-900 — 4.41:1 on white (passes WCAG 1.4.11 >= 3:1 for form boundaries) */
  --ring:              #3A0F34;      /* aubergine focus ring */

  /* Sidebar tokens (shadcn standard names) */
  --sidebar:                    #3A0F34;      /* Deep Aubergine sidebar background */
  --sidebar-foreground:         #DDE3E8;      /* Ice Silver on Deep Aubergine — 12.5:1 AAA */
  --sidebar-primary:            #501A4A;      /* aubergine-700 active item background */
  --sidebar-primary-foreground: #FFFFFF;      /* white active text */
  --sidebar-accent:             #501A4A;      /* aubergine-700 hover background */
  --sidebar-accent-foreground:  #FFFFFF;      /* white hover text */
  --sidebar-border:             #501A4A;      /* aubergine-700 divider */
  --sidebar-ring:               #EAAA00;      /* Marigold focus ring */

  --radius: 0.5rem;
}
```

### 4.6 Dark Mode Token Map

```css
.dark {
  /* Surfaces — layered depth (Revolut pattern) */
  --background:        #1A0517;      /* aubergine-950 — deepest canvas */
  --foreground:        #DDE3E8;      /* Ice Silver — body text on dark (12.5:1 AAA) */
  --card:              #2A0926;      /* aubergine-900 */
  --card-foreground:   #E8EDF1;      /* silver-300 */
  --popover:           #3A0F34;      /* aubergine-800 */
  --popover-foreground:#DDE3E8;

  /* Brand Primary — Marigold on dark card (8.79:1 AAA, replaces invisible #3A0F34 at 1.11:1) */
  --primary:           #EAAA00;      /* Marigold */
  --primary-foreground:#3A0F34;      /* Deep Aubergine on Marigold — 7.90:1 AAA */

  /* Brand Accent */
  --brand-accent:            #EAAA00; /* Marigold */
  --brand-accent-foreground: #3A0F34; /* Aubergine on Marigold — 7.9:1 AAA */

  /* shadcn Accent (Subtle dark hover tint for menus and ghost buttons) */
  --accent:            #3A0F34;      /* aubergine-800 subtle hover background */
  --accent-foreground: #DDE3E8;

  /* Secondary */
  --secondary:         #501A4A;
  --secondary-foreground: #DDE3E8;

  /* Muted */
  --muted:             #2A0926;
  --muted-foreground:  #B46EA8;      /* aubergine-400 */

  /* Semantic — Red-600 ensures white text passes WCAG AA at 4.83:1; separate dark error text #F87171 passes AA at 6.51:1 */
  --destructive:               #DC2626;      /* red-600 — 4.83:1 with white text */
  --destructive-foreground:    #FFFFFF;
  --error:                     #F87171;      /* red-400 — dark error text color (6.51:1 on #2A0926) */
  --error-surface:             #450A0A;      /* dark red surface */
  --success:                   #10B981;      /* emerald-500 — 8.12:1 on #2A0926 */
  --success-surface:           #064E3B;      /* dark emerald surface */
  --warning:                   #F59E0B;      /* amber-500 — 8.86:1 on #2A0926 */
  --warning-surface:           #451A03;      /* dark amber surface */
  --info:                      #3B82F6;      /* blue-500 — 5.82:1 on #2A0926 */
  --info-surface:              #1E3A8A;      /* dark blue surface */

  /* Money Tokens */
  --money-positive:            #10B981;
  --money-positive-surface:    #064E3B;
  --money-negative:            #F87171;
  --money-negative-surface:    #450A0A;
  --money-neutral:             #DDE3E8;
  --money-neutral-surface:     #3A0F34;

  /* Structure */
  --border:            #501A4A;      /* aubergine-700 */
  --input:             #B46EA8;      /* aubergine-400 — 4.92:1 on #2A0926 (passes WCAG 1.4.11 >= 3:1; replaces #501A4A at 1.36:1) */
  --ring:              #EAAA00;      /* Marigold focus ring in dark */

  /* Sidebar tokens (shadcn standard names) */
  --sidebar:                    #0F0310;      /* deepest aubergine sidebar background */
  --sidebar-foreground:         #DDE3E8;      /* Ice Silver text on dark — 12.5:1 AAA */
  --sidebar-primary:            #3A0F34;      /* aubergine-800 active item container */
  --sidebar-primary-foreground: #EAAA00;      /* Marigold active item text — 7.90:1 AAA */
  --sidebar-accent:             #1F0721;      /* subtle hover item background */
  --sidebar-accent-foreground:  #DDE3E8;      /* hover item text */
  --sidebar-border:             #2A0926;      /* aubergine-900 border */
  --sidebar-ring:               #EAAA00;      /* Marigold focus ring */
}
```

### 4.7 WCAG Contrast Table

All values are computed using standard WCAG 2.1 relative luminance formulas (`(L1 + 0.05) / (L2 + 0.05)`). Legacy values that failed have been corrected, and all active text/surface pairs re-verified to guarantee >= 4.5:1 for normal body text and >= 3:1 for user interface boundaries (WCAG 1.4.11).

| Foreground | Background | Ratio | WCAG Rating | Status & Usage Notes |
|-----------|-----------|-------|-------------|----------------------|
| `#FFFFFF` white | `#3A0F34` Deep Aubergine | **16.2:1** | ✅ AAA | Primary buttons (light), sidebar active items, aubergine cards |
| `#DDE3E8` Ice Silver | `#3A0F34` Deep Aubergine | **12.5:1** | ✅ AAA | Sidebar navigation text, dark-mode body copy |
| `#3A0F34` Deep Aubergine | `#EAAA00` Marigold | **7.90:1** | ✅ AAA | **Aubergine text on Marigold buttons/badges — AAA at normal text size** |
| `#EAAA00` Marigold | `#2A0926` dark card | **8.79:1** | ✅ AAA | **Dark mode primary button surface on dark card (replaces invisible #3A0F34 at 1.11:1)** |
| `#3A0F34` Deep Aubergine | `#DDE3E8` Ice Silver | **12.5:1** | ✅ AAA | Dark aubergine text/headings on light Ice Silver background |
| `#111113` gray-900 | `#DDE3E8` Ice Silver | **14.6:1** | ✅ AAA | Primary body text on Ice Silver page canvas |
| `#111113` gray-900 | `#FFFFFF` white | **18.9:1** | ✅ AAA | Primary body text on white card surfaces |
| `#4B5563` gray-600 | `#DDE3E8` Ice Silver | **5.84:1** | ✅ AA | Muted/secondary text on Ice Silver canvas (replaces gray-500) |
| `#4B5563` gray-600 | `#FFFFFF` white | **7.56:1** | ✅ AAA | Muted/secondary text on white card surfaces |
| `#065F46` emerald-800 | `#DDE3E8` Ice Silver | **5.94:1** | ✅ AA | Positive balance / success text directly on Ice Silver canvas |
| `#065F46` emerald-800 | `#FFFFFF` white | **7.68:1** | ✅ AAA | Positive balance / success text on white cards |
| `#065F46` emerald-800 | `#D1FAE5` success-surface | **6.78:1** | ✅ AAA | Positive balance text inside success chips/table cells |
| `#047857` emerald-700 | `#FFFFFF` white | **5.48:1** | ✅ AA | Success text on white card ONLY |
| `#047857` emerald-700 | `#D1FAE5` success-surface | **4.84:1** | ✅ AA | Success text inside success chip ONLY |
| *`#047857` emerald-700* | `#DDE3E8` Ice Silver | **4.24:1** | ❌ FAIL | **FAILED on Ice Silver (< 4.5:1) — BANNED on canvas; use emerald-800** |
| `#B91C1C` red-700 | `#DDE3E8` Ice Silver | **5.00:1** | ✅ AA | Negative balance / error text on Ice Silver canvas |
| `#B91C1C` red-700 | `#FFFFFF` white | **6.47:1** | ✅ AA | Negative balance / error text on white cards |
| `#B91C1C` red-700 | `#FEE2E2` error-surface | **5.30:1** | ✅ AA | Negative balance / error text inside error chip |
| `#FFFFFF` white | `#DC2626` red-600 | **4.83:1** | ✅ AA | **Dark mode destructive button (replaces #EF4444 at 3.76:1 FAIL)** |
| `#6B7A87` silver-900 border | `#FFFFFF` white card | **4.41:1** | ✅ AA | **Form input borders (light) — passes WCAG 1.4.11 boundary requirement (>= 3:1)** |
| `#B46EA8` aubergine-400 border | `#2A0926` dark card | **4.92:1** | ✅ AA | **Form input borders (dark) — passes WCAG 1.4.11 (replaces #501A4A at 1.36:1 FAIL)** |
| `#F87171` dark error text | `#2A0926` dark card | **6.51:1** | ✅ AA | **Dark mode error text / --error (replaces #DC2626 at 3.73:1 FAIL for text)** |
| `#92400E` amber-800 | `#DDE3E8` Ice Silver | **5.48:1** | ✅ AA | Warning text on Ice Silver canvas |
| `#92400E` amber-800 | `#FFFFFF` white | **7.09:1** | ✅ AAA | Warning text on white card |
| `#92400E` amber-800 | `#FEF3C7` warning-surface | **6.37:1** | ✅ AA | Warning text inside warning chip |
| `#1D4ED8` blue-700 | `#DDE3E8` Ice Silver | **5.18:1** | ✅ AA | Info text on Ice Silver canvas |
| `#1D4ED8` blue-700 | `#FFFFFF` white | **6.70:1** | ✅ AA | Info text on white card |
| `#1D4ED8` blue-700 | `#DBEAFE` info-surface | **5.49:1** | ✅ AA | Info text inside info chip |
| *`#3A0F34` Deep Aubergine* | `#2A0926` dark card | **1.11:1** | ❌ FAIL | **FAILED legacy dark primary on card (< 3:1) — replaced with Marigold #EAAA00** |
| *`#501A4A` aubergine-700 border* | `#2A0926` dark card | **1.36:1** | ❌ FAIL | **FAILED legacy dark input border (< 3:1) — replaced with aubergine-400 #B46EA8** |
| *`#DC2626` red-600 text* | `#2A0926` dark card | **3.73:1** | ❌ FAIL | **FAILED as dark mode text (< 4.5:1) — restricted to button background; use #F87171 for text** |
| *`#FFFFFF` white* | `#EF4444` red-500 | **3.76:1** | ❌ FAIL | **FAILED dark destructive (< 4.5:1) — replaced with red-600 #DC2626** |
| *`#BCCAD4` silver-600 border* | `#FFFFFF` white card | **1.68:1** | ❌ FAIL | **FAILED for form inputs (< 3:1) — restricted to decorative dividers only** |
| *`#059669` emerald-600* | `#FFFFFF` white | **3.77:1** | ❌ FAIL | **FAILED legacy token (< 4.5:1) — replaced with emerald-700/800** |
| *`#6B7280` gray-500* | `#DDE3E8` Ice Silver | **3.74:1** | ❌ FAIL | **FAILED on Ice Silver (< 4.5:1) — replaced with gray-600** |
| *`#FFFFFF` white* | `#EAAA00` Marigold | **2.1:1** | ❌ FAIL | **NEVER use white text on Marigold background** |
| *`#EAAA00` Marigold* | `#DDE3E8` Ice Silver | **1.58:1** | ❌ FAIL | **NEVER use Marigold text on Ice Silver canvas** |

### 4.8 Color Usage Rules

**Do:**
- Use Ice Silver (`#DDE3E8`) as the base page background canvas so the primary brand color is visible throughout the app.
- Use pure white (`#FFFFFF`) for cards, dialogs, and popovers to provide crisp contrast and visual hierarchy over the Ice Silver canvas.
- Use Deep Aubergine (`#3A0F34`) as the primary button color in light mode.
- Set dark mode `--primary` to Marigold (`#EAAA00`) with Deep Aubergine (`#3A0F34`) text (8.79:1 AAA against dark card `#2A0926`, 7.90:1 AAA text contrast).
- Set dark mode `--destructive` to Red-600 (`#DC2626`) to ensure white text achieves 4.83:1 AA contrast.
- Use `#6B7A87` (`silver-900`, 4.41:1 on white) for `--input` borders to satisfy WCAG 1.4.11 Non-text Contrast (>= 3:1 for user interface boundaries). Keep `#BCCAD4` strictly for decorative card and table dividers.
- Use `emerald-800` (`#065F46`, 5.94:1 AA) for success and positive money text whenever rendered directly on the Ice Silver canvas (`#DDE3E8`).
- Restrict `emerald-700` (`#047857`) strictly to pure white cards (5.48:1 AA) and surface chips (4.84:1 AA).
- Use `--brand-accent` (`#EAAA00`) for primary CTAs, FABs, and key highlights; keep shadcn's `--accent` as a subtle tint (`#E8EDF1` in light, `#3A0F34` in dark) for dropdown/hover states.
- Use `gray-600` (`#4B5563`) or darker for secondary/muted text on the Ice Silver canvas to meet AA contrast (5.84:1).

**Don't:**
- Never use `emerald-700` (`#047857`) on the Ice Silver canvas (`4.24:1` FAIL).
- Never use `#BCCAD4` for form input borders (`1.68:1` on white, FAILS WCAG 1.4.11 >= 3:1).
- Never use `#3A0F34` as `--primary` in dark mode (`1.11:1` FAIL against `#2A0926` card).
- Never use `#EF4444` as destructive button background in dark mode (`3.76:1` FAIL with white text).
- Never put white text on Marigold (`2.1:1` FAIL).
- Never put Marigold text on Ice Silver (`1.8:1` FAIL).
- Never map Marigold directly to shadcn's `--accent` token (it causes menu hover backgrounds to turn bright yellow).
- Never use legacy `emerald-600` (`#059669`, `3.77:1` FAIL) or `gray-500` (`#6B7280`, `3.74:1` FAIL on Ice Silver) for body text.
- Never use Marigold for error, warning, or success semantic states — it is strictly a brand accent.
- Never use raw color hex values in components — always reference CSS variables or Tailwind tokens.

---

## 5. Typography

### 5.1 Font Families

MessTally users write in English and Banglish (Bengali in Latin script). The font stack must render both scripts crisply on mid-range Android devices, line up financial tables cleanly with fixed-width numerals, and render the national currency glyph without awkward font fallbacks.

| Role | Font | Rationale & Glyph Verification |
|------|------|--------------------------------|
| **Primary UI, Display & Numbers** | **Inter** | Modern neutral sans-serif designed specifically for user interfaces. **Crucially includes the OpenType `tnum` (tabular numbers) feature**, guaranteeing uniform fixed-width digits (0–9) for vertical alignment across financial tables, ledgers, and steppers. Google Fonts: wght@400;500;600;700. |
| **Bengali Script & Currency Glyph (`৳`)** | **Hind Siliguri** | Humanist sans-serif designed by Indian Type Foundry (ITF). Placed immediately after Inter in the font stack. Because Inter does not contain Bengali characters or the `৳` (U+09F3 Bengali Rupee/Taka Sign) glyph, the browser seamlessly falls back to Hind Siliguri for Bengali text blocks and the `৳` currency sign. Google Fonts: wght@300;400;500;600;700. |
| **System Fallback** | `'Noto Sans Bengali', system-ui, sans-serif` | High-quality secondary system fallback for Android and Linux environments. |

> ⚠️ **Visual Glyph Verification Note:** Because the `৳` (U+09F3) currency symbol falls back to Hind Siliguri while preceding/following numerals are rendered by Inter, developers must visually inspect the rendered output to ensure baseline alignment, height, and stroke weight of the `৳` glyph harmonize cleanly with Inter digits across weights (400, 500, 600, 700).

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
```

### 5.2 Type Scale

| Token | Size | Weight | Line Height | Tracking | Use |
|-------|------|--------|-------------|----------|-----|
| `text-display` | 36px / 2.25rem | 700 | 1.15 | -0.02em | Hero numbers (Meal Rate on dashboard) |
| `text-h1` | 28px / 1.75rem | 700 | 1.2 | -0.015em | Page titles |
| `text-h2` | 22px / 1.375rem | 600 | 1.25 | -0.01em | Section headings |
| `text-h3` | 18px / 1.125rem | 600 | 1.3 | 0 | Card titles, modal headings |
| `text-h4` | 16px / 1rem | 600 | 1.35 | 0 | Table column headers, form section labels |
| `text-body-lg` | 16px / 1rem | 400 | 1.6 | 0 | Primary body copy, form input text |
| `text-body` | 14px / 0.875rem | 400 | 1.65 | 0 | Secondary body, list items |
| `text-body-sm` | 13px / 0.8125rem | 400 | 1.5 | 0 | Helper text, descriptions |
| `text-label` | 12px / 0.75rem | 500 | 1.4 | 0.02em | Form labels, badges |
| `text-caption` | 11px / 0.6875rem | 400 | 1.4 | 0.01em | Timestamps, metadata |
| `text-amount-lg` | 28px / 1.75rem | 600 | 1.2 | 0 | Large BDT amounts — Inter (`tabular-nums`) + Hind Siliguri (`৳`) |
| `text-amount` | 18px / 1.125rem | 500 | 1.3 | 0 | Standard table amounts — Inter (`tabular-nums`) + Hind Siliguri (`৳`) |
| `text-amount-sm` | 14px / 0.875rem | 500 | 1.4 | 0 | Small inline amounts — Inter (`tabular-nums`) + Hind Siliguri (`৳`) |

### 5.3 Typography Rules

- All BDT currency amounts and meal counts must use `tabular-nums` with `--font-sans` (`'Inter', 'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif`). Inter provides native OpenType `tnum` support ensuring fixed-width tabular figures for vertical alignment in tables, while Hind Siliguri renders the native `৳` (U+09F3) glyph via browser font fallback.
- Confirmed: The `৳` symbol (U+09F3) renders natively within Hind Siliguri, eliminating missing glyph boxes.
- The Meal Rate hero display uses `text-display` size with `tabular-nums`.
- For any text block that may contain Bengali characters, set `line-height: 1.75` to prevent vowel clipping.
- Minimum text size on any interactive element: 13px.
- Minimum text size on button labels: 14px.

### 5.4 Number & Currency Formatting

| Context | Format | Example |
|---------|--------|---------|
| BDT amounts (general) | ৳ 1,200.00 | Taka symbol, comma thousands, 2 decimal |
| BDT amounts (large display) | ৳ 1,200 | No decimals when .00 (dashboard hero) |
| Meal Rate | ৳ 12.35 / meal | Always 2 decimal places |
| Meal Balance (positive) | +৳ 850.00 | Leading +, green |
| Meal Balance (negative) | −৳ 850.00 | U+2212 minus sign, red |
| Meal Count | 12 or 0.5 | Up to 1 decimal for half-meals |
| Dates | 23 Oct 2026 or Oct 2026 | Day Month Year |

---

## 6. Layout

> 📱 **Responsive Standards Notice:** All responsive behavior follows [responsive.md](file:///d:/Projects/mess-tally-frontend/responsive.md). If Design.md and responsive.md disagree, responsive.md wins.

### 6.1 Universal Breakpoint Hierarchy

MessTally strictly implements the 5-tier responsive breakpoint standard defined in `responsive.md` Section 2:

| Tier | Min Width | Target Hardware | Primary Architectural Behavior |
|:-----|:----------|:----------------|:-------------------------------|
| **Compact (Base)** | `< 640px` | Smart phones (320px–480px, primary target: 390px) | Single column, full-width actions, 44px+ touch targets, vertical stacks |
| **Phablet (`sm`)** | `640px` | Large phones, small portrait tablets | 2-column card grids, paired action buttons, relaxed margins |
| **Tablet (`md`)** | `768px` | Tablets (portrait), foldables | Topbar menu switch, 3-column metric cards, desktop form input density switch |
| **Laptop / App Split (`lg`)** | `1024px` | Small laptops, landscape tablets | **Core App Split**: Persistent sidebar vs. mobile drawer, 12-column asymmetric grid |
| **Desktop (`xl`)** | `1280px` | Standard desktop displays (1080p) | Full multi-column data views and accounting ledgers |
| **Ultra-Wide (`2xl`)** | `1536px` | Large monitors, QHD / 4K displays | Maximum containment boundary clamping (`max-width: 80rem–90rem`) |

### 6.2 Grid System & Layout Progression

Following `responsive.md` Section 8, the workspace layout transforms progressively across tiers rather than merely scaling down:

| Breakpoint Tier | Layout / Grid Structure | Gutter / Gap | Page Margins | Architectural Behavior |
|:----------------|:------------------------|:-------------|:-------------|:-----------------------|
| **Compact (`< 640px`)** | 1 column (`grid-template-columns: 1fr`) | 16px (`gap-4`) | 16px (`px-4`) | Single-column stack, full-width CTAs, Odd-Item Rule applies on 2-col metric cards |
| **Phablet (`sm: 640px`)** | 2 columns (`repeat(2, 1fr)`) | 20px (`gap-5`) | 20px (`px-5`) | Paired action buttons, 2-column card grids |
| **Tablet (`md: 768px`)** | 3 columns / balanced grid | 24px (`gap-6`) | 24px (`px-6`) | 3-column metric cards, desktop input density (36px height) |
| **Laptop / App Split (`lg: 1024px`)** | 12-column asymmetric workspace | 24px (`gap-6`) | 32px (`px-8`) | **Core App Split**: Main workspace (span 8 / 66.6%) + Contextual sidecard (span 4 / 33.3%) |
| **Desktop (`xl: 1280px`)** | 12 columns unconstrained | 32px (`gap-8`) | 48px (`px-12`) | Full multi-column data views, sticky headers |
| **Ultra-Wide (`2xl: 1536px`)** | Clamped container | 32px (`gap-8`) | Auto margins | Boundary containment clamped to `max-width: 80rem–90rem` (1280px–1440px) |

**The Odd-Item Rule (`responsive.md` Section 8):** When rendering KPI stat cards in a 2-column mobile layout, the last odd card must span both columns (`grid-column: span 2 / span 2;`) to prevent orphan gaps, reverting to `span 1` on 3-column tablet/desktop views.

### 6.3 Container Widths & Boundary Containment

In accordance with `responsive.md` Sections 1, 8, and 10, containers must never use fixed pixel widths. Boundary clamping guarantees zero horizontal page scroll:

| Context | Boundary / Max-width Specification | Source & Verification Notes |
|:--------|:-----------------------------------|:----------------------------|
| **Page Content (Default)** | `max-width: 75rem` (1200px), clamped to `80rem–90rem` on `2xl` | `responsive.md` Section 2 |
| **Auth Pages (Form Card)** | `max-width: 30rem` (480px); `width: 100%` | `[Ref: Screenshot_15.png, 21721074013784022a08a16ebe4aed0d.webp]` |
| **Modal / Dialog** | `width: 100%; max-width: min(calc(100vw - 2rem), 32rem);` (512px) | `responsive.md` Section 10; `max-height: 90vh; overflow-y: auto;` |
| **Drawer (TallyBot & Nav)** | Clamped width `min(85vw, 320px)` on mobile (< 1024px); 400px on desktop (`>= 1024px`) | `responsive.md` Section 7; backdrop remains visible |
| **Sidebar (Desktop)** | `256px` (expanded), `64px` (collapsed icon-only) | Persistent on `>= 1024px` `[Ref: chat_skanalytic_dashboard.png]` |

### 6.4 Spacing Scale

All spacing uses a base-4 scale (Tailwind default). Key values:

| Token | px | Use |
|-------|----|-----|
| `space-2` | 8px | Tight padding, icon gaps |
| `space-3` | 12px | Form field internal padding |
| `space-4` | 16px | Standard padding |
| `space-5` | 20px | Card padding (mobile) |
| `space-6` | 24px | Card padding (desktop) `[Ref: chat_skanalytic_dashboard.png, chat_citi_banking.png]` |
| `space-8` | 32px | Section spacing |
| `space-12` | 48px | Page top padding |

### 6.5 App Shell Layout (Pattern B: Application Shell)

MessTally strictly follows **Pattern B: Application & Dashboard Shell Navigation** (`responsive.md` Section 7):

```
DESKTOP (≥ 1024px):
┌──────────────┬─────────────────────────────────────────────────────────────────┐
│              │ [Topbar: Mess Switcher | Month Selector | Profile]              │
│ PERSISTENT   ├─────────────────────────────────────────────────────────────────┤
│ SIDEBAR      │                                                                 │
│ (256px wide) │ MAIN OPERATIONAL WORKSPACE (Offset pl: 256px)                   │
│              │                                                                 │
└──────────────┴─────────────────────────────────────────────────────────────────┘

MOBILE / TABLET (< 1024px):
┌────────────────────────────────────────────────────────────────────────────────┐
│ [☰ Menu]  [MessTally Logo]      [Month Selector v]            [Bot Sparkles]   │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│ MAIN OPERATIONAL WORKSPACE (Full Width 100%)                                   │
│                                                                                │
├────────────────────────────────────────────────────────────────────────────────┤
│ [Dashboard]      [Meals]        [Bazar]        [Utility]           [More ...]  │
└────────────────────────────────────────────────────────────────────────────────┘
```

1. **The 1024px (`lg`) Split Rule:**
   - **Above 1024px:** Persistent fixed/sticky left sidebar (256px); main workspace has corresponding left padding offset.
   - **Below 1024px:** Sidebar completely unmounts from normal flow and converts into an off-canvas slide-over drawer clamped to `min(85vw, 320px)`, triggered by the topbar hamburger menu.
2. **Mobile Scroll Lock:** When the off-canvas drawer is open, apply `overflow: hidden` to `<body>` to prevent background scrolling.
3. **Mobile Bottom Navigation:** Provides immediate thumb access to the 5 primary routes (`Dashboard`, `Meals`, `Bazar`, `Utility`, `More`).

### 6.6 Universal Responsive Standards Summary

In accordance with `responsive.md`, all UI components must follow these non-negotiable implementation rules:

1. **Mobile-First Foundation (`responsive.md` Section 1):** Baseline CSS styles target narrow screens (`320px–375px`) with zero media queries. Breakpoints scale up progressively (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).
2. **The 1024px App Split (`responsive.md` Section 7):** Persistent desktop sidebar at `>= 1024px`; off-canvas slide-over drawer (`min(85vw, 320px)`) + mobile bottom nav at `< 1024px`.
3. **Data Tables & Edge-to-Edge Scroll Containers (`responsive.md` Section 8):**
   - Tables must **never** cause window-level horizontal scroll.
   - Always wrap data tables in an `overflow-x: auto; width: 100%;` container with an inner `min-width: 600px` (or `40rem`) so columns remain readable.
   - Inside padded cards (`padding: 1.25rem`), apply edge-to-edge negative margins on mobile (`margin-left: -1.25rem; margin-right: -1.25rem; padding-left: 1.25rem; padding-right: 1.25rem;`) so the scrollable table bleeds cleanly to the screen edges, resetting to normal on `sm: 640px`.
   - Date-grouped card stacks are supported as an alternative view for simple mobile activity feeds.
4. **The 16px Mobile Input Rule (`responsive.md` Section 6):**
   - On mobile (`< 768px`), all `<input>`, `<select>`, and `<textarea>` elements must have a font size of **at least 16px (1rem)** and height of **40px–44px** to prevent uncontrollable iOS Safari automatic zoom.
   - On desktop (`≥ 768px`), font size scales down to **13px–14px** and height to **36px** for high-density accounting data entry.
5. **Form & Modal Action Reversal (`responsive.md` Sections 6 & 10):**
   - On mobile, action buttons stack vertically (`width: 100%`) with the primary/confirm button on top (or `flex-direction: column-reverse` in modal footers so confirm stays reachable).
   - On desktop (`≥ 640px`), buttons align horizontally in a right-aligned row (`width: auto`).
6. **Touch Targets & Ergonomics (WCAG 2.2 AA, `responsive.md` Section 5):**
   - Minimum interactive touch area for every button, link, toggle, and icon trigger is **44 × 44px**.
   - Primary operational triggers (confirm submit, FAB, checkout buttons) provide a minimum **48 × 48px** touch target.
   - Small icons (16px–20px) must use padding or pseudo-elements to reach 44px without inflating icon visual size.
7. **The Odd-Item Rule (`responsive.md` Section 8):** In 2-column mobile card grids, the last odd card spans 2 columns (`grid-column: span 2 / span 2;`) to prevent orphan gaps.
8. **Mobile Priority Reordering (`responsive.md` Section 8):** Critical alerts and summary metrics appear above secondary detail tables in mobile reading order (`order: 1`, `order: 2`), resetting on desktop (`order: unset`).
9. **Modal Viewport Safety (`responsive.md` Section 10):** All dialogs are width-clamped via `max-width: min(calc(100vw - 2rem), 32rem);` and height-clamped via `max-height: 90vh; overflow-y: auto;` to guarantee visibility when virtual keyboards open.
10. **Zero-Tolerance Horizontal Overflow (`responsive.md` Section 12):** No fixed pixel widths on layout containers (`width: 500px` is prohibited; use `max-width: 500px; width: 100%`). Page layouts must maintain strict `100vw` containment with zero horizontal wobble.

---

## 7. Shape & Depth

### 7.1 Border Radius

| Token | Value | Use & Reference Basis |
|-------|-------|-----------------------|
| `radius-sm` | 4px | Badges, small chips, inline tags |
| `radius-md` | 8px | Standard buttons, form inputs, table rows `[Ref: Screenshot_15.png, 21721074013784022a08a16ebe4aed0d.webp]` |
| `radius-lg` | 12px | Standard cards, dialog modals `[Ref: chat_interoly_expenses.png, b6a51759795591.6ac01ace7c096.webp]` |
| `radius-xl` | 16px | Hero cards, stat containers, bottom sheets `[Ref: chat_skanalytic_dashboard.png, chat_talentedhr_attendance.png]` |
| `radius-2xl` | 24px | Reserved for desktop application window frame / marketing heroes |
| `radius-full` | 9999px | Avatars, FABs, status pills, balance pills `[Ref: 5e18ca59795591.685a6bf209ac8.webp, chat_citi_banking.png]` |

### 7.2 Borders

| Token | Value | Use & Reference Basis |
|-------|-------|-----------------------|
| `border-hairline` | 1px solid var(--border) (`#BCCAD4`) | Decorative table dividers, card outlines (exempt from 1.4.11 as decorative elements) `[Ref: chat_interoly_expenses.png]` |
| `border-input` | 1px solid var(--input) (`#6B7A87` light / `#B46EA8` dark) | Form inputs resting boundary — **4.41:1 on white, 4.92:1 on #2A0926 dark card** (satisfies WCAG 1.4.11 Non-text Contrast >= 3:1 for interactive controls) `[Ref: 21721074013784022a08a16ebe4aed0d.webp]` |
| `border-focus` | 2px solid var(--ring) (`#3A0F34` light / `#EAAA00` dark) | Focus outline (WCAG 2.4.7 Focus Visible requirement) |

### 7.3 Elevation / Shadow

MessTally employs a minimal, clean elevation system — prioritizing **layered surface colors and crisp 1px borders** over muddy drop shadows (validated in `chat_mymoney_dark_dashboard.png` and `b6a51759795591.6ac01ace7c096.webp`).

| Token | Value | Use |
|-------|-------|-----|
| `shadow-none` | none | Flat cards on same surface level |
| `shadow-sm` | 0 1px 2px rgba(58,15,52,0.06) | Buttons (subtle lift) |
| `shadow-md` | 0 4px 12px rgba(58,15,52,0.10) | Modals, popovers `[Ref: 070eaf59795591.6859e116d16c4.webp]` |
| `shadow-lg` | 0 8px 24px rgba(58,15,52,0.14) | Bottom sheets, drawers |
| `shadow-fab` | 0 6px 20px rgba(234,170,0,0.35) | Marigold FAB glow effect |

---

## 8. Iconography & Imagery

### 8.1 Icon Set

**Primary:** Lucide Icons — default set bundled with shadcn/ui. Stroke width 1.5px, clean geometric style.

| Context | Icon Examples |
|---------|--------------|
| Navigation | LayoutDashboard, Utensils, ShoppingBag, Zap, ChartBar, Users, Settings |
| Actions | Plus, Pencil, Trash2, Check, X, ChevronDown, ArrowRight |
| Finance | TrendingUp, TrendingDown, Wallet, ArrowLeftRight, Banknote |
| Utility categories | Zap (electricity), Flame (gas), Wifi, Droplets (water), ChefHat (cook) |
| Status | CheckCircle, XCircle, AlertCircle, Clock, Lock, Unlock |
| AI / TallyBot | Sparkles, Bot, MessageSquare |

**Icon sizes:**
- `icon-sm`: 16px — list items, badges
- `icon-md`: 20px — nav items, buttons
- `icon-lg`: 24px — standalone action buttons
- `icon-xl`: 32px — stat card icons
- `icon-2xl`: 48px — empty state headers

### 8.2 Empty State Design

Use icon-based empty states (Lucide icon, 64px, in `aubergine-100` color, centered).

```
[Icon — 64px, color: aubergine-300]
[Heading — text-h3]
[Description — text-body, muted]
[Primary CTA Button — if applicable]
```

### 8.3 Avatars

- **Shape:** Circle, `radius-full`
- **Sizes:** 24px (list row), 32px (inline), 40px (member card), 56px (profile view)
- **Fallback:** 2-letter initials on `aubergine-700` background, white text
- **Grouped row:** max 3 shown, +N overflow badge. Each overlaps -8px.

### 8.4 Logo Usage

- **App icon:** Stylized "MT" monogram on Deep Aubergine background, Marigold accent.
- **Wordmark:** "MessTally" in Hind Siliguri 700, Deep Aubergine.
- **Sidebar:** Icon only when collapsed; Icon + Wordmark when expanded.
- **Auth pages:** Centered above the form card.
- **Favicon:** 32x32 "MT" monogram.

---

## 9. Motion

### 9.1 Duration Scale

| Token | Duration | Use |
|-------|----------|-----|
| `duration-instant` | 50ms | Hover color changes |
| `duration-fast` | 100ms | Button press state |
| `duration-normal` | 200ms | Fade in/out, toggle |
| `duration-medium` | 300ms | Modal open/close |
| `duration-slow` | 400ms | Drawer slide, page transition |

### 9.2 Easing

| Token | CSS Value | Use |
|-------|-----------|-----|
| `ease-out` | cubic-bezier(0, 0, 0.2, 1) | Opening elements |
| `ease-in` | cubic-bezier(0.4, 0, 1, 1) | Closing elements |
| `ease-spring` | cubic-bezier(0.34, 1.56, 0.64, 1) | FAB entrance, success animations |
| `ease-standard` | cubic-bezier(0.4, 0, 0.2, 1) | General transitions |

### 9.3 Key Transitions

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| TallyBot drawer open | Slide in from right + fade | 350ms | ease-out |
| TallyBot drawer close | Slide out right + fade | 250ms | ease-in |
| Modal open | Scale 0.95→1 + fade | 300ms | ease-out |
| Bottom sheet open | Slide up from bottom | 350ms | ease-spring |
| FAB entrance | Scale 0→1 with spring | 400ms | ease-spring |
| Toast notification | Slide in from top-right | 300ms | ease-out |
| Skeleton shimmer | Left-to-right gradient sweep | 1.5s cycle | linear |

### 9.4 Micro-Interactions

- **Meal stepper**: tapping + increments with a subtle scale(1.1) bounce on the number.
- **Confirm button** (TallyBot card): shows loading spinner, then checkmark on success.
- **Settlement "All Settled" state**: a brief confetti burst (3–5 particles, 600ms) when all balances reach zero.
- **Marigold FAB**: on hover, subtle scale(1.05) with shadow-fab glow.

### 9.5 Reduced Motion

Respect `prefers-reduced-motion: reduce`:
- Disable all transform animations (slide, scale, spring).
- Reduce skeleton shimmer to a static pulse.
- Disable confetti.
- Keep only opacity fades at 150ms.

---

## 10. Components

### 10.1 Buttons

| Variant | When to Use | Style & Reference Basis |
|---------|------------|-------------------------|
| `primary` | Primary action per screen (one per view) | Light mode: `bg-primary text-primary-foreground` — Deep Aubergine (`#3A0F34`) with white text (16.2:1 AAA). Dark mode: Marigold (`#EAAA00`) with Deep Aubergine (`#3A0F34`) text (7.90:1 AAA, 8.79:1 AAA on dark card `#2A0926`). On auth views, rendered as a full-width high-contrast button `[Ref: Screenshot_15.png, 21721074013784022a08a16ebe4aed0d.webp]`. In section headers, rendered as `+ Add New` `[Ref: chat_interoly_expenses.png, chat_skanalytic_dashboard.png]`. |
| `brand-accent` | High-visibility CTA (FAB, "Confirm & Save" in chat, Upgrade buttons) | `bg-brand-accent text-brand-accent-foreground` — Marigold (`#EAAA00`) with Deep Aubergine (`#3A0F34`) text (7.9:1 AAA) |
| `fund-action` | Dedicated Fund Actions (Utility module) | Dual action buttons inside the wallet card: `↓ Deposit` (light surface) and `↑ Bill Pay` (dark surface) `[Ref: b6a51759795591.6ac01ace7c096.webp]` |
| `secondary` | Secondary action (Cancel, Edit) | `bg-secondary text-secondary-foreground` |
| `outline` | Tertiary actions on card surfaces | `border border-border bg-transparent hover:bg-accent hover:text-accent-foreground` |
| `ghost` | Navigation-adjacent actions, table row actions | No border, transparent background, subtle hover using shadcn `--accent` (`#E8EDF1` in light mode, `#3A0F34` in dark mode) |
| `destructive` | Delete, reject, remove | Light mode: `bg-destructive text-destructive-foreground` — Red-700 (`#B91C1C`) with white text (6.47:1 AA). Dark mode: Red-600 (`#DC2626`) with white text (4.83:1 AA, replaces `#EF4444` at 3.76:1 FAIL). |
| `link` | Inline text actions | Underline style, `text-primary` |

**Sizes & Touch Targets (`responsive.md` Section 5):**
- Standard sizes: `sm` (h-8, px-3), `md` default (h-10, px-4), `lg` (h-12, px-6), `icon` (h-10, w-10).
- **The 44px Rule:** Every button and interactive trigger provides a minimum **44 × 44px** hit target. Small icon buttons extend hit bounds via padding.
- **High-Velocity Operational Triggers:** Primary action buttons (FAB, Checkout, Confirm & Save) provide a minimum **48 × 48px** touch target.
- **Mobile Action Reversal (`responsive.md` Section 6):** On mobile (< 640px), action buttons stack vertically (`width: 100%`) with primary confirm on top; on desktop (≥ 640px), they align horizontally in a right-aligned row (`width: auto`).

**States:** default → hover (shadow-sm) → active (scale 0.97) → loading (spinner) → disabled (opacity 40%)

### 10.2 Form Inputs

Following the **Universal Dual-State Input Pattern** (`responsive.md` Section 6):
- **Mobile (`< 768px`):** Font size must be **at least 16px (1rem)** and height **40px–44px** (`h-11`) to strictly prevent uncontrollable iOS Safari automatic zoom.
- **Desktop (`≥ 768px`):** Font size scales down to **13px–14px** (`text-sm`) and height to **36px** (`h-9`) for high-density accounting data entry.
- **Structure & Contrast:** Border `var(--input)` (`#6B7A87` light — **4.41:1 on white**; `#B46EA8` dark — **4.92:1 on #2A0926**, satisfying WCAG 1.4.11 Non-text Contrast >= 3:1 for interactive boundaries), focus: 2px ring `var(--ring)` (`#3A0F34` light / `#EAAA00` dark), error: `border-destructive` `[Ref: 21721074013784022a08a16ebe4aed0d.webp]`.
- `<Label>`: 12px, weight 500, letter-spacing 0.02em. Always positioned **above** the field container (never floating inside or placeholder-only) — seen in **3 of 3** auth concepts `[Ref: Screenshot_15.png, 21721074013784022a08a16ebe4aed0d.webp, e6ba97418761972f8b4dd3467ebf4f8b.webp]`.
- Required indicator: Mandatory fields feature a red asterisk (`*`) immediately following the label text `[Ref: 21721074013784022a08a16ebe4aed0d.webp]`.
- Helper text: 12px, text-muted-foreground, below input.
- Error text: 12px, text-destructive, below input with error icon.

### 10.3 Password Field

- Interactive show/hide toggle button (Lucide `Eye` / `EyeOff`, 16px) placed inside the right padding of the input container `[Ref: 21721074013784022a08a16ebe4aed0d.webp]`.
- Strength indicator on register: 3-segment bar — Weak (red) / Medium (amber) / Strong (green).

### 10.4 Room Code Input

- Single input, monospace, auto-uppercase, max 8 characters `[General knowledge]`.
- Real-time validation: after 6+ chars, call API and show mess name preview below.
- Success preview: small card showing "Joining: [Mess Name] · [N] members".

### 10.5 Avatar Pill Selector

A horizontal scrolling row of member avatar chips for selecting payers/members `[General knowledge]`.

```
Paid by:
[ Rahim ]  [● Karim ]  [ Mahdi ]  [ Sumon ]  →
```

- Unselected: bg-muted, text-muted-foreground
- Selected: bg-primary text-primary-foreground (light) or bg-brand-accent text-brand-accent-foreground (dark)
- On desktop with many members: becomes a Select with avatar thumbnails.

### 10.6 Month Picker / Selector

- Horizontal pill with left/right arrows: `< Oct 2026 >`
- Scopes financial ledger to the active calendar month `[Ref: chat_skanalytic_dashboard.png, chat_talentedhr_attendance.png, 070eaf59795591.6859e116d16c4.webp]`.
- Clicking the month label opens a year-month grid.
- Only months with a mess_month record are fully active; future months are faded.
- Persists in Zustand activeMonth store across all pages.

### 10.7 Number Stepper (Meal Count)

```
[ - ]  [ 2 ]  [ + ]
```

- Minimum: 0. Maximum: 10 (soft limit).
- The minus button is disabled at 0.
- Supports 0.5 increments via long-press or a separate precision input mode.
- 0 displayed in text-muted-foreground; positive values in text-foreground.

### 10.8 Cards

| Variant | Description & Reference Basis |
|---------|-------------------------------|
| **Stat Card** | Single metric: headline number + label + trend badge. Used on dashboard `[Ref: chat_skanalytic_dashboard.png, chat_interoly_expenses.png, b6a51759795591.6ac01ace7c096.webp]`. |
| **Meal Rate Card** | Special hero stat card featuring an **Inline Expandable Formula Breakdown** (replaces mobile-unfriendly hover tooltips). |
| **Member Card** | Avatar + name + role badge (`Manager`/`Member`) + status chip `[Ref: 5e18ca59795591.685a6bf209ac8.webp, chat_interoly_expenses.png]`. |
| **Expense Row Card** | Mobile fallback for data tables. Amount prominent, payer avatar, date, notes `[Ref: chat_citi_banking.png]`. |
| **Settlement Card** | Directional transfer: From → To · Amount. Color coded `[Ref: chat_citi_banking.png]`. |
| **Confirmation Card** | TallyBot write-action card — pre-filled form + "Confirm & Save" / "Cancel" `[General knowledge]`. |
| **Utility Category Card** | Square category quick-action cards (`Electricity`, `Gas Bill`, `Water`, `Internet`, `Cook`) `[Ref: chat_citi_banking.png]`. |
| **Fund Status Card** | Wallet container with progress bar + collected/spent + dedicated `↓ Deposit` / `↑ Bill Pay` buttons `[Ref: b6a51759795591.6ac01ace7c096.webp]`. |
| **Mess Info Card** | Mess name, room code, plan badge (FREE/PRO), month status. |
| **In-App Pro Promo Card** | Sidebar/card-grid promo container with `PRO` pill badge, value copy, and CTA `[Ref: chat_skanalytic_dashboard.png, 5e18ca59795591.685a6bf209ac8.webp]`. |

**Standard Stat Card anatomy:**
```
+---------------------------+
| ৳ 14,780.00     [icon]    |
| Total Bazar               |
| ↑ +৳ 1,200 from last week |
+---------------------------+
```
Number: `text-amount-lg`, Inter (tabular-nums); ৳ falls back to Hind Siliguri. Label: `text-label`, muted. Trend: `text-caption` with TrendingUp/Down icon `[Ref: chat_skanalytic_dashboard.png, chat_interoly_expenses.png]`. Positive/negative balances encapsulated in high-contrast dedicated surface pills `[Ref: 5e18ca59795591.685a6bf209ac8.webp]`.

**Meal Rate Stat Card — Inline Expandable Formula Card (Mobile & Desktop):**
Hover tooltips are avoided because they do not function on touchscreens and easily clip on small viewports. Instead, tapping (mobile) or clicking (desktop) the Meal Rate card smoothly expands an inline formula drawer directly inside the card layout:

```
Collapsed Resting State:
+------------------------------------------------------+
| ৳ 43.22 / meal                             [Info ℹ]  |
| Meal Rate                    ↑ +0.35 from last week  |
| [ Tap to view calculation formula ▾ ]                |
+------------------------------------------------------+

Expanded Inline State:
+------------------------------------------------------+
| ৳ 43.22 / meal                             [Close ▴] |
| Meal Rate                    ↑ +0.35 from last week  |
+------------------------------------------------------+
| ▼ Formula Breakdown (Active Month: Oct 2026)         |
|                                                      |
|   Meal Rate = Total Bazar Spend ÷ Total Meals        |
|   ৳ 43.22   = ৳ 14,780.00      ÷ 342.0 meals         |
|                                                      |
| • Scoped to confirmed mess bazar records             |
| • Excludes individual personal purchases & utility   |
|                                                      |
| [ Close breakdown ▴ ]                                |
+------------------------------------------------------+
```
- **Interaction:** Tap/Click anywhere on the card header or formula link to toggle expansion (`aria-expanded="true|false"`).
- **Animation:** CSS grid-template-rows 0fr → 1fr transition (200ms `ease-out`) for zero-jank inline expansion.
- **Accessibility:** Fully accessible via keyboard (Enter/Space on card button) and screen reader announceable (`aria-controls="meal-rate-formula"`). Accessible on all viewport sizes from 320px mobile to 4K desktop.

### 10.9 Badges / Status Chips

| Variant | Use | Colors |
|---------|-----|--------|
| `role-owner` | Owner badge | bg-aubergine-100 text-aubergine-800 |
| `role-manager` | Manager badge | bg-marigold-100 text-marigold-900 |
| `role-member` | Member badge | bg-gray-100 text-gray-700 |
| `status-active` | Active member | bg-success-surface text-success |
| `status-pending` | Awaiting approval | bg-warning-surface text-warning |
| `status-left` | Former member | bg-muted text-muted-foreground |
| `status-rejected` | Rejected | bg-error-surface text-error |
| `plan-free` | FREE plan | bg-gray-100 text-gray-700 |
| `plan-pro` | PRO plan | bg-marigold-100 text-marigold-900 + Sparkles icon |
| `month-active` | Month is open | bg-success-surface text-success |
| `month-closed` | Month is locked | bg-muted text-muted-foreground + Lock icon |

Sizes: sm (px-2 py-0.5 text-11px), md (px-2.5 py-1 text-12px). radius-full.

### 10.10 Modals / Dialogs

- shadcn `<Dialog>` for standard modals. `<AlertDialog>` for destructive confirmations.
- Max-width: `min(calc(100vw - 2rem), 32rem)`, centered, with scrim backdrop.
- Mobile: renders as Bottom Sheet (slide up from bottom, radius-xl top corners).
- Structure: Header (title + close X) → Body → Footer (Cancel + Confirm).
- Close on: X button, Escape key, backdrop click. Destructive dialogs require explicit cancel.

### 10.11 Drawers / Bottom Sheets

| Context | Direction | Size |
|---------|-----------|------|
| TallyBot AI drawer | Right slide-over | 400px (desktop), min(85vw, 320px) (mobile) |
| Date picker | Bottom sheet | 90vh max |
| Month picker | Bottom sheet | 60vh |

### 10.12 Toasts / Alerts

Using shadcn Sonner. Position: top-right on desktop, bottom-center on mobile (above bottom nav).

- **Success**: CheckCircle icon, bg-success-surface, auto-dismiss 3s.
- **Error**: XCircle icon, bg-error-surface, no auto-dismiss (requires manual close).
- **Warning**: AlertCircle icon, bg-warning-surface, auto-dismiss 5s.
- **Info**: Info icon, bg-info-surface, auto-dismiss 4s.

### 10.13 Empty States

| Page | Empty State Copy | CTA |
|------|-----------------|-----|
| Meals | "Meal sheet is empty. Start adding daily meals." | "Add Meals" |
| Bazar | "No grocery trips yet. Log the first shopping trip." | "Add Bazar Trip" |
| Utility | "No utility bills this month. Add your first bill." | "Add Bill" |
| Members | "Just you here. Share the room code to invite flatmates." | "Copy Room Code" |
| Summary | "Add meals and bazar entries to see the settlement." | — |
| TallyBot | "Ask me anything. Try: 'What's the meal rate?'" | — |

### 10.14 Skeleton Loaders

Match the exact layout of the content they replace:
- **Stat card**: 2 horizontal bars on a card.
- **Table row**: alternating gray bars spanning full width.
- **Member card**: circle (avatar) + 2 bars.
- **Chat message**: 3 lines of varying widths.

Shimmer: left-to-right gradient sweep, 1.5s cycle.

### 10.15 Progress / Fund Indicator

```
Utility Fund  [================          ]  ৳ 2,400 / ৳ 4,000
```

- Track: bg-muted, height 8px, radius-full.
- Fill color: bg-success (>50%), bg-warning (20–50%), bg-error (<20%).

### 10.16 Confirmation Card (TallyBot)

Rendered inside the chat as a special message bubble:

```
+-----------------------------------------------+
| ⚠  Confirm Bazar Entry                        |
|                                               |
| Paid by:    Karim                             |
| Amount:     ৳ 1,450.00                        |
| Date:       23 Oct 2026                       |
| Notes:      Chicken and rice                  |
|                                               |
| [  Cancel  ]          [  Confirm & Save  ]    |
+-----------------------------------------------+
```

- Background: bg-warning-surface, border-warning.
- After confirm: card locks, shows CheckCircle + "Saved!" in green.
- After cancel: shows X + "Cancelled" in muted text.

### 10.17 Chat Drawer (TallyBot)

```
+--------------------------------------+
| ✦ TallyBot             [Expand][X]  |
+--------------------------------------+
|                                      |
|  [bot message bubble]                |
|         [user message bubble]        |
|  [confirmation card]                 |
|  [typing indicator ...]              |
|                                      |
+--------------------------------------+
| [Input field]             [Send ↑]   |
+--------------------------------------+
```

- Bot messages: left-aligned, bg-card, radius-lg radius-tl-sm.
- User messages: right-aligned, bg-primary text-primary-foreground, radius-lg radius-tr-sm.
- Input: auto-expanding textarea, max 4 lines. Enter to send, Shift+Enter for newline.
- Floating trigger: Marigold FAB with Sparkles icon and shadow-fab glow.

### 10.18 Data Tables & Accounting Ledgers

Financial tables form the structural backbone of Bazar, Summary, and Members. Grounded in `chat_interoly_expenses.png`, `070eaf59795591.6859e116d16c4.webp`, and `chat_talentedhr_attendance.png`:

- **Header Structure:** Sticky table header (`bg-silver-200 text-gray-600`), 12px uppercase font, with sorting chevrons (`⇅`) on sortable columns (Date, Amount, Member) `[Ref: chat_interoly_expenses.png, chat_skanalytic_dashboard.png]`.
- **Avatar-First Identity:** Member and payer columns display circular user avatars (24px) paired with names for rapid visual identification `[Ref: chat_interoly_expenses.png, chat_talentedhr_attendance.png]`.
- **Row Hover & Density:** Standard row height `48px` (`h-12`), subtle hover highlight using `bg-silver-300` (light) or `bg-aubergine-700` (dark) `[Ref: chat_interoly_expenses.png]`.
- **Numeric Alignment:** All currency figures are strictly right-aligned, rendered in Inter (tabular-nums); ৳ falls back to Hind Siliguri `[Ref: chat_interoly_expenses.png]`.
- **Status Pills:** Status cells encapsulate state in rounded pill chips (`radius-full`) with darkened text meeting WCAG AA `[Ref: chat_interoly_expenses.png, chat_talentedhr_attendance.png]`.
- **Pagination & Counter:** Footer contains a record counter (`Showing 1 to 8 of 50 entries`) and numbered pagination controls (`< 1 2 3 ... 10 >`) `[Ref: chat_interoly_expenses.png]`.
- **Responsive Table Protocol (`responsive.md` Section 8):** Data tables must **never** cause window-level horizontal scroll. Every table must sit in an `overflow-x: auto; width: 100%;` container with an inner `min-width: 600px` (or `40rem`) so columns retain healthy breathing room.
- **Edge-to-Edge Mobile Pulling (`responsive.md` Section 8):** When a table is inside a padded card (`padding: 1.25rem`), apply negative margins on mobile (`margin-left: -1.25rem; margin-right: -1.25rem; padding-left: 1.25rem; padding-right: 1.25rem;`) so the scrollable table bleeds cleanly to the screen edges, resetting to 0 on `sm: 640px`.
- **Mobile Card-Stack Alternative:** For simple feeds (e.g. Bazar transactions on phones < 640px), collapsing into date-grouped card stacks with sticky date headers is supported `[Ref: 070eaf59795591.6859e116d16c4.webp, chat_citi_banking.png]`.

---

## 11. Navigation Patterns

### 11.1 Desktop Sidebar (>= lg)

**Width:** 256px expanded, 64px icon-only `[Ref: chat_skanalytic_dashboard.png, chat_interoly_expenses.png, b6a51759795591.6ac01ace7c096.webp]`.

```
+----------------------------+
|  MT MessTally        [<]  |  Logo + Collapse toggle
|  Mahdi's Flat [▾]          |  Active mess switcher pill [Ref: b6a51759795591.6ac01ace7c096.webp]
+----------------------------+
|  Oct 2026     [< >]       |  Month selector [Ref: chat_skanalytic_dashboard.png]
+----------------------------+
|  [icon] Dashboard          |
|  [icon] Meals              |  All roles
|  [icon] Bazar              |
|  [icon] Utility            |
|  [icon] Summary            |
+----------------------------+
|  [icon] Members    [!1]   |  Badge = pending approvals
|  [icon] Settings          |
+----------------------------+
|  [icon] TallyBot           |  Opens drawer [General knowledge]
+----------------------------+
|  [avatar] Mahdi   [...]   |  User profile menu with explicit role subtitle
|  Manager                  |  [Ref: 5e18ca59795591.685a6bf209ac8.webp]
+----------------------------+
```

### 11.2 Mobile Shell Navigation (< lg / 1024px)

MessTally implements **Pattern B: Application & Dashboard Shell Navigation** (`responsive.md` Section 7):

1. **The 1024px (`lg`) Split:** Below 1024px, the persistent desktop sidebar unmounts from normal flow and converts into an off-canvas slide-over drawer clamped to `min(85vw, 320px)`.
2. **Topbar Hamburger Trigger:** The topbar menu button provides a minimum **44 × 44px** hit target with `aria-label="Toggle navigation"` and `aria-expanded="false|true"`.
3. **Background Scroll Lock:** When the mobile drawer is open, `overflow: hidden` is applied to `<body>` to prevent background scrolling. Backdrop click or pressing `Escape` immediately closes the drawer.
4. **Mobile Bottom Navigation:** Fixed bottom navigation bar with 44px+ touch targets provides 1-tap thumb access to 5 primary destinations:

**Top Bar:**
```
[☰ Menu]   [MessTally Logo]   [Oct 2026 ▾]   [Bot Sparkles]
```

**Bottom Navigation (5 primary thumb targets):**
```
[Dashboard]  [Meals]  [Bazar]  [Utility]  [More ...]
```

"More" expands to: Summary, Members, Settings, Switch Mess.

### 11.3 Role-Based Navigation Summary

| Nav Item | Owner | Manager | Member |
|----------|-------|---------|--------|
| Dashboard | Yes | Yes | Yes |
| Meals | Yes | Yes | Yes |
| Bazar | Yes | Yes | Yes |
| Utility | Yes | Yes | Read only |
| Summary | Yes | Yes | Yes |
| Members | Yes | Yes + approve/reject | Read only |
| Settings — Mess Settings | Yes | Yes | Hidden |
| Settings — Open/Close Month | Yes | Yes | Hidden |
| Settings — Profile | Yes | Yes | Yes |
| TallyBot | Yes | Yes | Yes |

---

## 12. UX Patterns

### 12.1 Onboarding & Mess Join Flow

```
Register/Login
    |
    v
Welcome screen (fork)
  +------------------+  +------------------+
  | Create a Mess    |  | Join a Mess      |
  +--------+---------+  +--------+---------+
           |                     |
           v                     v
  [Name your mess]      [Enter Room Code]
  [Auto room code]      [Real-time validation]
           |             [Mess name preview]
           v                     |
     --> Dashboard        [require_approval?]
                          Yes --> Pending lobby
                          No  --> Dashboard
```

**Pending lobby screen:** Shows mess name, clock icon, "Waiting for manager approval." User can cancel request.

**Multi-mess users:** After login, if more than 1 mess: show "Select your mess" screen before dashboard.

### 12.2 Form Validation & Error Messaging

- Inline errors appear below the field on blur (not on every keystroke).
- Form-level errors (API errors) appear in a top-of-form alert banner.
- Never clear a partially-filled form on error — preserve the user's input.
- Submit button: disabled while form is invalid; shows loading spinner during submission.
- Error copy format: "[Field] [specific problem]." e.g. "Amount must be greater than 0."

### 12.3 Loading / Optimistic / Success / Failure States

Every data-fetching component follows this state machine:
```
LOADING → skeleton
EMPTY   → empty state with CTA
SUCCESS → data rendered
ERROR   → inline error with Retry button
```

**Optimistic updates (Meals stepper):**
1. Update local cache immediately.
2. Show the new value.
3. Sync in background.
4. On error: revert + show "Couldn't save. Try again." toast.

### 12.4 Confirmation & Destructive Actions

- **Standard modal** (reversible): "Save Bazar Entry" shows a summary. CTA: primary button.
- **Alert dialog** (irreversible): "Close Month" and "Remove Member" use AlertDialog with destructive CTA.
- **Soft-archive rule**: Never delete a member with data records. Use status = LEFT instead.

### 12.5 Settlement Display

```
+--------------------------------------------------+
|  Monthly Settlement — Oct 2026                   |
|                                                  |
|  Meal Rate: ৳ 43.22 / meal                       |
|                                                  |
|  Member    Meals  Meal Cost  Bazar    Balance    |
|  Rahim      89    ৳ 3,846   ৳ 3,500   −৳ 346    |
|  Karim      71    ৳ 3,068   ৳ 6,280  +৳ 3,212   |
|  Mahdi      92    ৳ 3,976   ৳ 3,000   −৳ 976    |
|  Sumon      90    ৳ 3,890   ৳ 2,000  −৳ 1,890   |
|                                                  |
|  Settlements (3 transfers):                      |
|  Sumon  -->  Karim     ৳ 1,890                   |
|  Mahdi  -->  Karim     ৳   976                   |
|  Rahim  -->  Karim     ৳   346                   |
|                                                  |
|  [Share Summary]  [Copy as Text]                 |
+--------------------------------------------------+
```

Positive balance: text-money-positive, bg-money-positive-surface.
Negative balance: text-money-negative, bg-money-negative-surface.

### 12.6 Permission-Restricted Views

- Member views: show data, hide action buttons (Add, Approve, etc.). Do not show "Access Denied."
- Closed month: show month-closed badge. All edit controls hidden. Data read-only.
- FREE plan limits: show Lock icon + PRO badge. Clicking opens upgrade modal.

---

## 13. Paywall / Upgrade Patterns

> ⚠️ **IMPORTANT — UNVERIFIED ASSUMPTIONS (NOT IN PRD):**  
> The MessTally PRD explicitly categorizes SaaS billing, paid subscription tiers, and payment gateways as **strictly out of scope** for this phase:
> - *PRD Out of Scope (Line 323):* `"Mess Plan / SaaS Billing: The mess.plan and mess.plan_expires_at columns exist in the schema but billing tiers are not implemented in this phase."`
> - *PRD Out of Scope (Line 330):* `"Multi-Tenant SaaS Billing & Subscription Plans: Core flat/mess management is the focus before paid tiers."`
> 
> Therefore, **all plan limits (e.g., 6 members, 3 months history, 10 TallyBot queries), tier prices (৳ 299/mo), and the `/pricing` page are speculative design assumptions not present in the PRD**. They are documented here solely to establish UI patterns for if/when monetization is prioritized. See [Section 20: Open Questions & Unverified Assumptions](#20-open-questions--unverified-assumptions).

### 13.1 Plan Summary [ASSUMPTION — NOT IN PRD]

| Feature | FREE (Speculative Limit) | PRO (Speculative Limit) | Status |
|---------|--------------------------|-------------------------|--------|
| Active members per mess | Up to 6 *(Assumption)* | Unlimited | Not in PRD |
| Months of history | 3 months *(Assumption)* | Unlimited | Not in PRD |
| TallyBot AI queries | 10 / month *(Assumption)* | Unlimited | Not in PRD |
| Data export format | Text only *(Assumption)* | PDF + WhatsApp | Not in PRD |
| Priority support | No *(Assumption)* | Yes | Not in PRD |
| Advanced analytics | No *(Assumption)* | Yes | Not in PRD |

### 13.2 Contextual "Just-in-Time" Upgrade Modal [ASSUMPTION — NOT IN PRD]

Triggered when a FREE user attempts a PRO feature. Does NOT block navigation.

```
+---------------------------------------------+
|  ✦ MessTally Pro                            |
|                                             |
|  Unlock unlimited TallyBot questions        |
|                                             |
|  FREE Plan          PRO Plan               |
|  10 queries/month   Unlimited queries       |
|  [x] Basic stuff    [v] Everything in FREE  |
|                     [v] Unlimited TallyBot  |
|                     [v] PDF export          |
|                                             |
|  ৳ 299 / month  (Assumption)                |
|                                             |
|  [Cancel]           [Upgrade to PRO -->]    |
+---------------------------------------------+
```

- PRO card: `bg-primary` (aubergine) text-white, `ring-2 ring-brand-accent` (marigold).
- FREE card: `bg-muted` (flat, subdued).
- Headline: feature-specific ("Unlock unlimited TallyBot questions") not generic ("Upgrade").
- CTA: `brand-accent` variant button (`#EAAA00` Marigold with `#3A0F34` text, 7.9:1 AAA).

### 13.3 Pricing Page (/pricing) [ASSUMPTION — NOT IN PRD]

*Note: Route `/pricing` does not exist in the PRD.*
- 2-column layout: FREE and PRO.
- PRO column: `ring-2 ring-brand-accent`, "Most Popular" badge.
- Feature comparison table below the cards.
- FAQ section (3–5 questions: cancellation, data retention, what happens on downgrade).

### 13.4 Feature Lock Indicators (In-App) [ASSUMPTION — NOT IN PRD]

- Show Lock icon (16px) inside or next to the locked feature trigger.
- Show PRO badge (marigold-100 bg) adjacent.
- On click: open contextual upgrade modal.
- Do not disable without explanation.

### 13.5 Plan Expiry State

When `mess.plan_expires_at` is past:
- Full-page non-dismissible warning banner at top of app.
- "Your MessTally Pro plan has expired. Renew to keep access."
- Renew Plan CTA — `brand-accent` button.

---

## 14. Content & Microcopy

### 14.1 Tone

- Direct and human. "Your meal balance is −৳ 850." not "A debit of ৳ 850.00 has been calculated."
- No financial jargon. Use "meal balance", "gets back", "pays" not "net receivable", "credit", "debit."
- Bilingual-friendly. Labels and errors in English. TallyBot responds in the user's language (English or Banglish).
- Positive framing. "Karim gets back ৳ 3,212" not "Karim is owed ৳ 3,212."

### 14.2 Labeling Conventions

| Data Point | Label |
|-----------|-------|
| Meal Rate | "Meal Rate" |
| Person's Bazar Paid | "Bazar Paid" |
| Person's Meal Cost | "Meal Cost" |
| Meal Balance (positive) | "Gets Back" |
| Meal Balance (negative) | "Owes" |
| Settlement payment | "[Name] pays [Name]" |
| mess_month open | "Active Month" |
| mess_month closed | "Closed Month" |
| is_manager = true | "Manager" |
| role = OWNER | "Owner" |
| role = MEMBER | "Member" |
| status = PENDING | "Awaiting Approval" |

### 14.3 Currency Formatting

- Symbol: ৳ (U+09F3). Always before the number with a space: ৳ 1,200.00.
- Thousands separator: comma.
- Decimal places: always 2 in tables and settlement; 0 in hero displays when .00.
- Negative amounts: use − (U+2212 MINUS SIGN), not hyphen.
- Zero balance: ৳ 0.00 in neutral gray.

### 14.4 Date Formats

| Context | Format | Example |
|---------|--------|---------|
| Date input / display | DD MMM YYYY | 23 Oct 2026 |
| Month only | MMM YYYY | Oct 2026 |
| Day in grid | DD | 23 |
| Full with day name | DDD, DD MMM | Thu, 23 Oct |
| Relative | "Today", "Yesterday", or date | Today |

### 14.5 Empty State & Error Copy Table

| State | Headline | Body | CTA |
|-------|----------|------|-----|
| First login, no mess | "Welcome to MessTally!" | "Create your mess or join one with a room code." | "Create a Mess" / "Join a Mess" |
| No bazar entries | "No grocery trips yet" | "Add a bazar entry to start tracking food expenses." | "Add Bazar Trip" |
| No meal entries | "Meal sheet is empty" | "Start adding daily meal counts for your flatmates." | "Add Meals" |
| Network error | "Couldn't load this" | "Check your connection and try again." | "Retry" |
| 404 page | "Page not found" | "This page doesn't exist or was moved." | "Go to Dashboard" |
| Pending approval | "Request sent!" | "Waiting for a manager at [Mess Name] to approve you." | — |

---

## 15. Accessibility

### 15.1 Contrast Summary

All active text/background pairs have been re-verified to meet or exceed WCAG 2.1 AA (minimum 4.5:1 for normal text). See Section 4.7 for the comprehensive contrast table.

Verified compliant pairings:
- Body text: `gray-900` (`#111113`) on Ice Silver `#DDE3E8` (**14.6:1** AAA) and on white card surfaces (**18.9:1** AAA)
- Sidebar text: `#DDE3E8` on Deep Aubergine `#3A0F34` (**12.5:1** AAA)
- Primary button: white on Deep Aubergine `#3A0F34` (**16.2:1** AAA)
- Brand-accent button text: Deep Aubergine `#3A0F34` on Marigold `#EAAA00` (**7.9:1** AAA — fully compliant for normal-sized text)
- Muted/secondary text: `gray-600` (`#4B5563`) on Ice Silver canvas (**5.84:1** AA) and on white cards (**7.56:1** AAA)
- Positive financial text: `emerald-800` (`#065F46`) on Ice Silver (**5.94:1** AA), on white cards (**7.68:1** AAA), on success surface (**6.78:1** AAA); `emerald-700` (`#047857`) on white (**5.48:1** AA)
- Negative financial text: `red-700` (`#B91C1C`) on Ice Silver (**5.00:1** AA), on white cards (**6.47:1** AA), on error surface (**5.30:1** AA)

Unsafe pairings prohibited in the design system:
- White on Marigold (`2.1:1` ❌ Fail)
- Marigold on Ice Silver (`1.58:1` ❌ Fail)
- Legacy `emerald-600` on white (`3.77:1` ❌ Fail — replaced with `emerald-700/800`)
- Legacy `gray-500` on Ice Silver (`3.74:1` ❌ Fail — replaced with `gray-600`)

### 15.2 Focus States

- All interactive elements have a visible `focus-visible` ring: `outline: 2px solid var(--ring); outline-offset: 2px`.
- Ring color: Deep Aubergine (light mode), Marigold (dark mode).
- Visible in both modes.

### 15.3 Keyboard Navigation

- All modals trap focus with focus-trap pattern.
- Modals close on Escape.
- Meal stepper: ArrowUp/ArrowDown to increment/decrement; 0–9 for direct entry.
- Meal Rate Formula Card: Enter/Space toggles inline formula expansion without modal or tooltip.
- TallyBot drawer: Ctrl+Shift+T to toggle (suggested keyboard shortcut).
- All nav items reachable by Tab.

### 15.4 Touch Targets & Mobile Ergonomics (`responsive.md` Section 5)

MessTally strictly enforces WCAG 2.2 AA touch target standards:
- **The 44px Rule:** Every interactive element (`<button>`, `<a>`, `<input>`, `<select>`, `<summary>`, tabs, toggles, checkboxes, icon triggers) must provide a minimum interactive touch area of **44 × 44 CSS pixels**.
- **High-Velocity Operational Triggers:** Primary action buttons ("Confirm & Save", "Log Bazar", "Upgrade to PRO", FAB triggers) must provide a minimum touch area of **48 × 48 CSS pixels**.
- **Accessible Icon Triggers:** Small visual icons (16px–20px) must extend their interactive hit target using padding or pseudo-elements (`min-width: 44px; min-height: 44px; padding: 8px;`) without bloating visual icon dimensions.
- **Stepper Buttons:** Minus and plus stepper buttons provide 44 × 44px minimum touch targets.
- **Meal Rate Formula Toggle:** The entire card header acts as a minimum 48px touch target.
- **Bottom Navigation Items:** Provide full-width tap zones with a minimum height of 48px.
- **Table Action Buttons:** Minimum 44px tap area achieved via internal padding.

### 15.5 Screen Reader Support

- Semantic HTML: nav, main, aside, header, footer, table.
- All decorative icons: aria-hidden="true".
- Standalone icons: aria-label.
- Meal Rate formula card: `aria-expanded="false|true"`, `aria-controls="meal-rate-formula"`, with the formula breakdown contained in a labeled region.
- Status chips: role="status" for dynamically updated values.
- Amount cells: aria-label="Meal Balance: negative 850 taka" for color-coded numbers.
- TallyBot live region: aria-live="polite" on the chat message area.
- Skip-to-main-content link: first focusable element on every page.

---

## 16. Information Architecture & Page Plan

### 16.1 Full Sitemap

```
MessTally Web App
|
+-- Public (unauthenticated)
|   +-- /login                         Sign In (Confirmed in PRD: POST /api/auth/login)
|   +-- /register                      Create Account [ASSUMPTION — NOT IN PRD]
|   +-- /forgot-password               Request password reset [ASSUMPTION — NOT IN PRD]
|   +-- /reset-password                Set new password [ASSUMPTION — NOT IN PRD]
|   +-- /pricing                       Public pricing page [ASSUMPTION — NOT IN PRD]
|
+-- Onboarding (authenticated, no mess yet)
|   +-- /onboarding                    Fork: "Create a Mess" or "Join a Mess"
|   +-- /onboarding/create             Create mess form
|   +-- /onboarding/join               Enter room code
|   +-- /onboarding/pending            Awaiting approval lobby
|
+-- App (authenticated + active mess)
|   +-- /dashboard                     Home: Meal Rate, personal summary, month status
|   +-- /meals                         Daily meal grid
|   +-- /bazar                         Grocery expense feed + entry
|   +-- /utility                       Utility bills + deposit fund tracking
|   +-- /summary                       Monthly summary table + settlement list
|   +-- /members                       Member directory + pending approvals
|   +-- /tallybot                      Full-page TallyBot view (mobile)
|   |
|   +-- /settings
|       +-- /settings/profile          Name, email, avatar, password
|       +-- /settings/mess             Mess name, room code, joinable, approval
|       +-- /settings/month            Open / Close month (manager)
|       +-- /settings/switch-mess      Multi-mess switcher
|
+-- Special
    +-- /join?code=XXXX                Deep link: auto-fill code + prompt login
    +-- /404                           Not found
    +-- /500                           Server error
```

### 16.2 All Pages Grouped by Module

#### Module 1 & 1.5: Authentication & Mess Management

| Page | Route | Role | Status / PRD Alignment | Key Components |
|------|-------|------|------------------------|----------------|
| Sign In | /login | Public | **Confirmed in PRD** (`POST /api/auth/login`) | Split-screen, email+password form, link to register |
| Register | /register | Public | ⚠️ **ASSUMPTION — NOT IN PRD** (No register endpoint in PRD) | Name, email, phone, password, confirm password |
| Forgot Password | /forgot-password | Public | ⚠️ **ASSUMPTION — NOT IN PRD** (No email reset service in PRD) | Email field, success banner |
| Reset Password | /reset-password | Public | ⚠️ **ASSUMPTION — NOT IN PRD** (Token handling not in PRD) | New password + confirm |
| Onboarding Fork | /onboarding | Auth, no mess | Confirmed flow | Two-card fork: Create / Join |
| Create Mess | /onboarding/create | Auth | Confirmed in PRD (`mess` entity) | Mess name input, room code preview, submit |
| Join Mess | /onboarding/join | Auth | Confirmed in PRD (`room_code` validation) | Room code input, mess preview, join CTA |
| Pending Approval | /onboarding/pending | Auth, pending | Confirmed in PRD (`status = PENDING`) | Waiting illustration, mess info, polling |

#### Module 2: Members

| Page | Route | Role | Key Components |
|------|-------|------|----------------|
| Member Directory | /members | All | Active member cards, Pending section (manager), Left members |

#### Module 3: Daily Meals

| Page | Route | Role | Key Components |
|------|-------|------|----------------|
| Meal Grid | /meals | All | Month selector, meal grid (desktop) / day accordion (mobile), totals |

#### Module 4: Bazar

| Page | Route | Role | Key Components |
|------|-------|------|----------------|
| Bazar Feed | /bazar | All | Contribution cards, expense feed, FAB, Add Bazar modal |

#### Module 5: Utility

| Page | Route | Role | Key Components |
|------|-------|------|----------------|
| Utility Hub | /utility | All | Tabs: Bills / Deposits / Fund. Progress bar. Bill list. Deposit list. |

#### Module 6: Summary & Dashboard

| Page | Route | Role | Key Components |
|------|-------|------|----------------|
| Dashboard | /dashboard | All | Hero metrics, stat cards, action-queue alerts |
| Monthly Summary | /summary | All | Summary table, settlement cards, share button |

#### Module 7: AI Chatbot

| Component | Access | Notes |
|-----------|--------|-------|
| TallyBot Drawer | All | Slide-over from right, FAB trigger, available on all pages |
| TallyBot Full Page | All | /tallybot — better mobile experience |

#### Settings

| Page | Route | Role | Key Components |
|------|-------|------|----------------|
| Profile | /settings/profile | All | Name, email, phone, avatar, change password |
| Mess Settings | /settings/mess | Owner/Manager | Mess name, room code, joinable toggle, approval toggle |
| Month Management | /settings/month | Manager/Owner | Open month, Close month, view past months |
| Switch Mess | /settings/switch-mess | All (if multi-mess) | Mess list, select button |

### 16.3 User Flows

**Flow 1: New User → Create Mess → Dashboard**
```
/login --> register --> /onboarding --> /onboarding/create --> /dashboard
```

**Flow 2: New User → Join Mess (approval required)**
```
/login --> register --> /onboarding --> /onboarding/join --> [enter code] --> /onboarding/pending --> (manager approves) --> /dashboard
```

**Flow 3: Returning Member → Daily Meal Entry**
```
/dashboard --> /meals --> [select month] --> [tap stepper] --> [auto-save] --> toast "Saved"
```

**Flow 4: Manager → Add Bazar Trip**
```
/bazar --> [tap FAB] --> Add Bazar modal --> [fill form] --> Save --> toast --> list updates
```

**Flow 5: Manager → Close Month**
```
/settings/month --> [tap "Close Month"] --> AlertDialog --> [confirm] --> status CLOSED
```

**Flow 6: Member → Ask TallyBot**
```
[any page] --> [tap TallyBot FAB] --> Drawer opens --> [type question] --> TallyBot fetches data --> responds
```

**Flow 7: TallyBot → Log Bazar with Confirmation**
```
[type "Add 1200 taka bazar by Karim today"] --> TallyBot proposes Confirmation Card --> [review] --> [Confirm & Save] --> Record saved --> Cache invalidated
```

### 16.4 Per-Page Layout & Component List

#### /login
- **Layout:** 50/50 split-screen on desktop (left: form card, right: live UI preview hero) `[Ref: Screenshot_15.png, 21721074013784022a08a16ebe4aed0d.webp]`. Mobile (< 1024px): single column with logo top.
- **Components:** Brand logo, text-h1 "Sign in", email Input, password Input with show/hide eye toggle `[Ref: 21721074013784022a08a16ebe4aed0d.webp]`, Remember me Checkbox paired with Forgot Password link `[Ref: Screenshot_15.png]`, full-width primary Button "Sign In" `[Ref: Screenshot_15.png]`, link to /register. Social SSO (Google) is an **[ASSUMPTION — NOT IN PRD]** `[Ref: e6ba97418761972f8b4dd3467ebf4f8b.webp]`.

#### /register [ASSUMPTION — NOT IN PRD]
- **Status:** Unverified assumption. The PRD specifies only `POST /api/auth/login`. Self-registration endpoint and schema validation must be clarified.
- **Layout:** Split-screen pattern with marketing preview hero `[Ref: 21721074013784022a08a16ebe4aed0d.webp, e6ba97418761972f8b4dd3467ebf4f8b.webp]`.
- **Components:** Brand logo, text-h1 "Create your account", Name Input, Email Input, Phone Input (optional), Password Input with eye toggle and 3-segment strength indicator `[Ref: 21721074013784022a08a16ebe4aed0d.webp]`, Confirm Password Input, full-width primary Button "Create Account", link to /login.

#### /forgot-password & /reset-password [ASSUMPTION — NOT IN PRD]
- **Status:** Unverified assumption. No password recovery API or email service is specified in the PRD.
- **Layout:** Centered card, 400px `[General knowledge]`.
- **Components:** Logo, text-h2, Email Input, primary Button "Send Reset Link", success state (email sent copy + icon), back link.

#### /pricing [ASSUMPTION — NOT IN PRD]
- **Status:** Unverified assumption. Multi-tenant SaaS billing and subscription plans are explicitly out of scope in the PRD (lines 323, 330).
- **Layout:** 2-column pricing comparison card stack with feature checklist and FAQ `[General knowledge]`.

#### /onboarding
- **Layout:** Centered, two large cards side-by-side (stacked on mobile) `[General knowledge]`.
- **Components:** "Welcome to MessTally!" heading, Create card (icon + headline + description), Join card (icon + headline + description).

#### /onboarding/create
- **Components:** Mess name Input, room code preview chip (auto-generated), optional address, primary Button "Create Mess & Continue" `[General knowledge]`.

#### /onboarding/join
- **Components:** Room code Input (monospace, auto-uppercase), real-time validation, mess preview card, primary Button "Request to Join", back link `[General knowledge]`.

#### /onboarding/pending
- **Components:** Clock illustration (64px icon), "Request Sent!" heading, mess name, waiting copy, "Cancel Request" destructive link `[General knowledge]`.

#### /dashboard
- **Layout:** Alert banners at top (if applicable), then 4-stat hero grid, then activity list `[Ref: chat_skanalytic_dashboard.png, chat_interoly_expenses.png, b6a51759795591.6ac01ace7c096.webp, 5e18ca59795591.685a6bf209ac8.webp]`.
- **Components:** Sticky Month selector in top context bar `[Ref: chat_skanalytic_dashboard.png]`, action-queue banners, 4 stat cards (Meal Rate with Inline Expandable Formula / My Balance with high-contrast pill encapsulation `[Ref: 5e18ca59795591.685a6bf209ac8.webp]` / Total Bazar with trend pill / Fund Balance), quick activity list, "View Full Summary" link card. In-app Pro promo banner `[Ref: chat_skanalytic_dashboard.png, 5e18ca59795591.685a6bf209ac8.webp]` (Assumption).

#### /meals
- **Layout:** Full-width spreadsheet matrix data grid on desktop `[Ref: 070eaf59795591.6859e116d16c4.webp]`; day-accordion stack on mobile `[General knowledge]`.
- **Components:** Month selector, date range header, meal grid with Number Steppers and floating quick-entry popovers `[Ref: 070eaf59795591.6859e116d16c4.webp]`, totals row, totals column, empty state.

#### /bazar
- **Layout:** Top contribution summary row, then chronological expense list `[Ref: chat_interoly_expenses.png, chat_mymoney_dark_dashboard.png, 070eaf59795591.6859e116d16c4.webp]`.
- **Components:** Member contribution cards, date-grouped expense list with avatar-first payer rows and status pills `[Ref: chat_interoly_expenses.png]`, expense row cards, FAB (+) on mobile / `+ Add New` header button on desktop `[Ref: chat_interoly_expenses.png]`, Add Bazar modal.

#### /utility
- **Layout:** Tabs (Bills | Deposits | Fund Status).
- **Components:** Tab bar, Fund Status wallet card with progress bar + dedicated `↓ Deposit` and `↑ Bill Pay` buttons `[Ref: b6a51759795591.6ac01ace7c096.webp]`, square category quick-action cards (`Electricity`, `Gas Bill`, `Water`, `Internet`, `Cook`) `[Ref: chat_citi_banking.png]`, bill list with status indicators, deposit list, replenishment prompt card.

#### /summary
- **Layout:** Summary table (desktop) / card stack (mobile), then settlement section `[Ref: chat_interoly_expenses.png, chat_citi_banking.png]`.
- **Components:** Month selector, structured summary table with sorting `⇅` and hover rows (Member / Meals / Meal Cost / Bazar Paid / Balance), settlement header + directional transfer cards (`Sumon pays Karim ৳ 1,890`), share button, copy button.

#### /members
- **Layout:** Pending section first (if any), Active members list with role indicators, Left members (collapsed by default) `[Ref: 5e18ca59795591.685a6bf209ac8.webp, chat_interoly_expenses.png]`.
- **Components:** Section headers, member cards with circular avatars and role subtitles (`Manager`/`Member`), dedicated `+ Add a New Member` row `[Ref: chat_citi_banking.png]`, approve/reject buttons (manager only), "Copy Room Code" button, invite link.

#### /settings/*
- **Layout:** Settings shell with sub-nav (sidebar-within-page on desktop, tabs on mobile) `[Ref: chat_interoly_expenses.png]`.
- **Components:** Per-section form groups, switches, copy-to-clipboard buttons, destructive actions at bottom of each section. User role indicator in profile view `[Ref: 5e18ca59795591.685a6bf209ac8.webp]`.

### 16.5 Proposed Build Order

| Phase | Pages | Priority & PRD Status |
|-------|-------|------------------------|
| **Phase 1** | /login (Confirmed) · /register, /forgot-password (Assumptions) | First — auth gates access. Build /login first; confirm backend registration API before building /register |
| **Phase 2** | /onboarding, /onboarding/create, /onboarding/join, /onboarding/pending | Second — core house onboarding required before data entry |
| **Phase 3** | /dashboard (includes Meal Rate expandable formula card) | Third — primary entry landing |
| **Phase 4** | /meals | Fourth — core daily tracking |
| **Phase 5** | /bazar | Fifth — grocery expenses |
| **Phase 6** | /utility | Sixth — utility bills and deposit fund |
| **Phase 7** | /summary | Seventh — monthly settlement calculations |
| **Phase 8** | /members, /settings/* | Eighth — member management & period lock |
| **Phase 9** | TallyBot drawer + /tallybot | Ninth — AI assistant layer |
| **Phase 10** | /pricing, paywall modals | Tenth — **Postponed**: Out of scope per PRD lines 323 & 330 until billing tiers are prioritized |

---

## 17. Design Token Summary (Tailwind-ready)

All tokens are defined as CSS custom properties in `globals.css` and mapped via Tailwind v4's `@theme` block.

### 17.1 Color Tokens

```css
@theme {
  /* Deep Aubergine scale */
  --color-aubergine-950: #1A0517;
  --color-aubergine-900: #2A0926;
  --color-aubergine-800: #3A0F34;
  --color-aubergine-700: #501A4A;
  --color-aubergine-600: #6B2560;
  --color-aubergine-500: #8C3A7E;
  --color-aubergine-400: #B46EA8;
  --color-aubergine-300: #D4A0CB;
  --color-aubergine-200: #ECC8E6;
  --color-aubergine-100: #F7EBF5;
  --color-aubergine-50:  #FDF7FC;

  /* Marigold scale */
  --color-marigold-900: #7A5600;
  --color-marigold-800: #A07200;
  --color-marigold-700: #C48B00;
  --color-marigold-600: #D49A00;
  --color-marigold-500: #EAAA00;
  --color-marigold-400: #F0BC33;
  --color-marigold-300: #F5CE66;
  --color-marigold-200: #FAE199;
  --color-marigold-100: #FDF3CC;
  --color-marigold-50:  #FEFAEE;

  /* Ice Silver scale (Canvas & surface hierarchy) */
  --color-silver-900: #6B7A87;
  --color-silver-800: #8A9BA8;
  --color-silver-700: #A4B5C2;
  --color-silver-600: #BCCAD4;
  --color-silver-500: #CDD6DF;
  --color-silver-400: #DDE3E8; /* Base canvas */
  --color-silver-300: #E8EDF1;
  --color-silver-200: #F0F4F7;
  --color-silver-100: #F8FAFC;
  --color-silver-50:  #FFFFFF; /* Pure white card surface */

  /* Dedicated Brand Accent tokens (separate from shadcn --accent) */
  --color-brand-accent:            #EAAA00;
  --color-brand-accent-foreground: #3A0F34;

  /* Semantic colors (darkened for WCAG AA compliance >= 4.5:1) */
  --color-success:          #065F46; /* emerald-800 (universal) / #047857 emerald-700 */
  --color-success-surface:  #D1FAE5;
  --color-warning:          #92400E; /* amber-800 */
  --color-warning-surface:  #FEF3C7;
  --color-error:            #B91C1C; /* red-700 */
  --color-error-surface:    #FEE2E2;
  --color-info:             #1D4ED8; /* blue-700 */
  --color-info-surface:     #DBEAFE;

  /* Money-specific tokens (all >= 4.5:1 on white, surface, and Ice Silver) */
  --color-money-positive:         #065F46; /* emerald-800 */
  --color-money-positive-surface: #D1FAE5;
  --color-money-negative:         #B91C1C; /* red-700 */
  --color-money-negative-surface: #FEE2E2;
  --color-money-neutral:          #4B5563; /* gray-600 */
  --color-money-neutral-surface:  #F3F4F6;
}
```

### 17.2 Typography Tokens

```css
@theme {
  /* Inter supplies Latin glyphs + OpenType tnum; Hind Siliguri supplies ৳ (U+09F3) & Bengali fallback */
  --font-sans: 'Inter', 'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif;

  --text-display:   2.25rem;   /* 36px */
  --text-h1:        1.75rem;   /* 28px */
  --text-h2:        1.375rem;  /* 22px */
  --text-h3:        1.125rem;  /* 18px */
  --text-h4:        1rem;      /* 16px */
  --text-body-lg:   1rem;      /* 16px */
  --text-body:      0.875rem;  /* 14px */
  --text-body-sm:   0.8125rem; /* 13px */
  --text-label:     0.75rem;   /* 12px */
  --text-caption:   0.6875rem; /* 11px */

  --leading-tight:   1.2;
  --leading-snug:    1.35;
  --leading-normal:  1.5;
  --leading-relaxed: 1.65;
  --leading-loose:   1.75;     /* Bangla text blocks */
}
```

### 17.3 Spacing & Layout Tokens

```css
@theme {
  --radius-sm:   0.25rem;    /* 4px */
  --radius-md:   0.5rem;     /* 8px */
  --radius-lg:   0.75rem;    /* 12px */
  --radius-xl:   1rem;       /* 16px */
  --radius-2xl:  1.5rem;     /* 24px */
  --radius-full: 9999px;

  --shadow-sm:  0 1px 2px rgba(58,15,52,0.06);
  --shadow-md:  0 4px 12px rgba(58,15,52,0.10);
  --shadow-lg:  0 8px 24px rgba(58,15,52,0.14);
  --shadow-fab: 0 6px 20px rgba(234,170,0,0.35);

  --container-auth:           30rem;    /* 480px */
  --container-modal:          32rem;    /* 512px max; clamped to min(calc(100vw - 2rem), 32rem) per responsive.md */
  --container-default:        75rem;    /* 1200px */
  --container-max:            90rem;    /* 1440px Ultra-Wide 2xl boundary clamp per responsive.md */
  --sidebar-width:            16rem;    /* 256px */
  --sidebar-collapsed:        4rem;     /* 64px */
  --drawer-width:             25rem;    /* 400px desktop slide-over */
  --drawer-width-mobile:      min(85vw, 20rem); /* 320px mobile drawer clamp per responsive.md */
}
```

### 17.4 Motion Tokens

```css
@theme {
  --duration-instant: 50ms;
  --duration-fast:    100ms;
  --duration-normal:  200ms;
  --duration-medium:  300ms;
  --duration-slow:    400ms;

  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);
  --ease-in:       cubic-bezier(0.4, 0, 1, 1);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 18. shadcn/ui Implementation Mapping

This section serves as the **single source of truth for frontend developers** implementing MessTally using `shadcn/ui` (New York style, CSS variables mode) with Next.js 16 (App Router), Tailwind CSS v4, and `@tanstack/react-form`.

### 18.1 Component Classification & Composition Table

The table below classifies every component used across MessTally's screens into three implementation tiers:
1. **As-Is Primitives:** Official shadcn components installed via `npx shadcn add <name>` that require **zero code modifications**. They purely inherit our CSS design tokens (`--background`, `--card`, `--primary`, `--border`, `--input`, etc.).
2. **Extended Primitives:** Official shadcn components whose `cva()` (class variance authority) definition in `src/components/ui/*.tsx` must be extended with MessTally-specific semantic variants.
3. **Custom Compositions:** Specialized domain components built by composing multiple shadcn primitives with custom layout and interactions.

| Component Name | Classification | Underlying shadcn Primitive(s) | Implementation & Customization Notes |
|----------------|----------------|--------------------------------|--------------------------------------|
| **Button** | Extended Primitive | `button.tsx` | Extends `buttonVariants` with `"brand-accent"` and `"fund-action"` variants. Default variant maps to "primary". |
| **Badge** | Extended Primitive | `badge.tsx` | Extends `badgeVariants` with 11 domain variants: `role-*`, `status-*`, `plan-*`, `month-*`. |
| **Input** | As-Is Primitive | `input.tsx` | Inherits `--input: #6B7A87` border (4.41:1 WCAG 1.4.11) and `--ring: #3A0F34`. Implements dual-state sizing per `responsive.md` Section 6: `h-11 text-base` (16px font, 44px height) on mobile (< 768px); `h-9 text-sm` (13px–14px font, 36px height) on desktop (≥ 768px). |
| **Label** | As-Is Primitive | `label.tsx` | Standard Radix Label primitive; paired with `Input` in TanStack Form fields. |
| **Textarea** | As-Is Primitive | `textarea.tsx` | Inherits `--input` and `--ring` tokens. Font size >= 16px on mobile to prevent iOS auto-zoom (`responsive.md` Section 6). Used in Bazar description and TallyBot input. |
| **Select** | As-Is Primitive | `select.tsx` | Inherits `--popover`, `--border`, and `--accent` hover tokens. Used for category pickers. Font size >= 16px on mobile. |
| **Checkbox** | As-Is Primitive | `checkbox.tsx` | Inherits `--primary` for checked fill. Minimum 44 × 44px hit target (`responsive.md` Section 5). Used in multi-member selection and filter sheets. |
| **Tabs** | As-Is Primitive | `tabs.tsx` | Inherits `--muted` for tab list background and `--card` for active tab pill. |
| **Dialog / AlertDialog** | As-Is Primitive | `dialog.tsx`, `alert-dialog.tsx` | Clamped to `max-width: min(calc(100vw - 2rem), 32rem);` and `max-height: 90vh; overflow-y: auto;` per `responsive.md` Section 10. Footer buttons stack with confirm on top on mobile. Uses `--card` surface, `--destructive` for irreversible actions (Close Month, Remove Member). |
| **DropdownMenu** | As-Is Primitive | `dropdown-menu.tsx` | Uses `--popover` container and `--accent` (`#E8EDF1` / `#3A0F34`) for hover highlights. |
| **Popover** | As-Is Primitive | `popover.tsx` | Used for contextual quick-entry popovers and the Month Selector dropdown container. |
| **Progress** | As-Is Primitive | `progress.tsx` | Inherits `--primary` or `--brand-accent` indicator. Composed into the Fund Status Card. |
| **Separator** | As-Is Primitive | `separator.tsx` | Inherits `--border: #BCCAD4`. Used for horizontal card and sidebar dividers. |
| **Skeleton** | As-Is Primitive | `skeleton.tsx` | Inherits `--muted: #CDD6DF` with pulse animation for all loading states. |
| **Sheet** | As-Is Primitive | `sheet.tsx` | Slide-over drawer primitive. Clamped to `min(85vw, 320px)` on mobile with body scroll lock (`overflow: hidden`) per `responsive.md` Section 7. Composed into TallyBot Drawer and Mobile Nav Sheet. |
| **Collapsible** | As-Is Primitive | `collapsible.tsx` | Unstyled disclosure primitive. Composed into the Meal Rate Expandable Card. |
| **ToggleGroup** | As-Is Primitive | `toggle-group.tsx` | Single/multiple selection primitive. Minimum 44px hit targets per item. Composed into the Avatar Pill Selector. |
| **Sidebar** | As-Is Primitive | `sidebar.tsx` | Official shadcn Sidebar; inherits the 8 standardized `--sidebar-*` tokens. Active at `>= 1024px`; converts to off-canvas Sheet at `< 1024px` per `responsive.md` Section 7. |
| **Toaster** | As-Is Primitive | `sonner.tsx` | Sonner toast container; positioned bottom-right (desktop) / top-center (mobile). |
| **Stat Card** | Custom Composition | `Card` (`card.tsx`) + Lucide Icons | White surface container with icon badge, muted uppercase label, large `tabular-nums` value, and trend pill. Follows Odd-Item Rule (`responsive.md` Section 8). |
| **Meal Rate Expandable Card** | Custom Composition | `Card` + `Collapsible` + `CollapsibleTrigger` + `CollapsibleContent` | Interactive card header with ChevronDown icon, toggling an inline breakdown showing total bazar cost ÷ total meals. Header acts as 48px touch target. |
| **Avatar Pill Selector** | Custom Composition | `ToggleGroup` + `ToggleGroupItem` + `Avatar` | Horizontal pill group of circular member avatars with initials/photos and names for 1-tap selection (44px hit targets). |
| **Number Stepper** | Custom Composition | `Button` (ghost/outline) + Numeral container | Minus `Button` (44px target) + fixed-width container (`tabular-nums font-bold`) + Plus `Button`. Supports direct text editing. |
| **Month Selector** | Custom Composition | `Button` (ghost) + `Popover` + `Calendar` / Custom Grid | Sticky shell header showing `← Prev`, `Month YYYY`, `Next →`, with Popover for jumping directly to any month. |
| **Daily Meals Grid** | Custom Composition | `Table` (`table.tsx`) + `Popover` + `Number Stepper` | Desktop: matrix table with sticky member column and date headers inside `overflow-x: auto; width: 100%` container with edge-to-edge mobile pull per `responsive.md` Section 8. Mobile: collapses to card stack of Number Steppers. |
| **Settlement Card** | Custom Composition | `Card` + directional `ArrowRight` + `tabular-nums` | Debtor-to-creditor transfer row: Member A `Avatar` → `ArrowRight` → Member B `Avatar`, settlement amount in BDT, and status Badge. |
| **Confirmation Card** | Custom Composition | `Card` + `Button` (outline + brand-accent) | Amber-tinted card (`bg-warning-surface border-warning/30`) rendered inside TallyBot chat before any database write. Actions stack full width on mobile. |
| **TallyBot Drawer** | Custom Composition | `Sheet` + `SheetContent` + `ScrollArea` + `Input` + `Button` | 400px right-side slide-over panel on desktop, clamped to `min(85vw, 320px)` on mobile with body scroll lock, triggered by the Marigold FAB (`#EAAA00`). |
| **Fund Status Card** | Custom Composition | `Card` + `Progress` + `Button` (fund-action variant) | Displays mess balance in BDT (`tabular-nums`), spent percentage progress bar, and two pill action buttons: `↓ Deposit` and `↑ Bill Pay`. |

---

### 18.2 Naming Map & Variant Extensions

#### 18.2.1 Button Variants (`src/components/ui/button.tsx`)

In this design specification, buttons are referenced by semantic role. Here is how they map to shadcn's `buttonVariants` `cva`:

| Design Document Term | shadcn `Button` Variant | Description & Visual Styling |
|----------------------|-------------------------|------------------------------|
| **Primary** | `default` | Deep Aubergine (`#3A0F34`) with white text in light mode; Marigold (`#EAAA00`) with Deep Aubergine text in dark mode. Used for standard form submissions. |
| **Brand Accent** | `brand-accent` *(NEW)* | **Must be added to CVA.** Marigold (`#EAAA00`) background with Deep Aubergine (`#3A0F34`) text (7.90:1 AAA contrast), hover: `bg-marigold-600`, active: `scale-[0.98]`. Used for primary page CTAs ("Log Bazar", "Add Meals", Paywall CTA, TallyBot FAB). |
| **Fund Action** | `fund-action` *(NEW)* | **Must be added to CVA.** Rounded pill (`rounded-full py-1.5 px-3 text-xs font-semibold bg-silver-200 text-gray-900 border border-silver-600 hover:bg-silver-300 dark:bg-aubergine-800 dark:text-silver-200 dark:border-aubergine-700`). Used for `↓ Deposit` and `↑ Bill Pay`. |
| **Secondary** | `secondary` | Soft Aubergine tint (`#ECC8E6`) in light mode; Aubergine-700 (`#501A4A`) in dark mode. |
| **Outline** | `outline` | Border `silver-600` (`#BCCAD4`) with transparent background, hover: `bg-accent`. |
| **Ghost** | `ghost` | Transparent background, hover: `bg-accent text-accent-foreground`. Used in stepper and table actions. |
| **Destructive** | `destructive` | Red-700 (`#B91C1C`) with white text (light); Red-600 (`#DC2626`) with white text (dark, 4.83:1 AA). |

**Code snippet to add to `buttonVariants` in `src/components/ui/button.tsx`:**
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // MessTally Custom Variants:
        "brand-accent":
          "bg-brand-accent text-brand-accent-foreground font-semibold shadow hover:bg-marigold-600 active:scale-[0.98] transition-all",
        "fund-action":
          "rounded-full text-xs font-semibold px-3 py-1.5 bg-silver-200 text-gray-900 border border-silver-600 hover:bg-silver-300 dark:bg-aubergine-800 dark:text-silver-200 dark:border-aubergine-700 transition-colors",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

---

#### 18.2.2 Badge Variants (`src/components/ui/badge.tsx`)

Add the following semantic badge variants to `badgeVariants` in `src/components/ui/badge.tsx`:

```tsx
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",

        /* MessTally Role Variants */
        "role-owner":
          "border-transparent bg-aubergine-800 text-white dark:bg-aubergine-700 dark:text-white",
        "role-manager":
          "border-transparent bg-aubergine-200 text-aubergine-900 dark:bg-aubergine-800 dark:text-aubergine-200",
        "role-member":
          "border-transparent bg-silver-300 text-gray-900 dark:bg-aubergine-900 dark:text-silver-300",

        /* MessTally Member Status Variants */
        "status-active":
          "border-emerald-300/50 bg-success-surface text-success dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400",
        "status-pending":
          "border-amber-300/50 bg-warning-surface text-warning dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-400",
        "status-left":
          "border-silver-400/50 bg-silver-200 text-muted-foreground dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400",
        "status-rejected":
          "border-red-300/50 bg-error-surface text-destructive dark:border-red-800 dark:bg-red-950/50 dark:text-red-400",

        /* MessTally Plan Variants */
        "plan-free":
          "border-silver-400/50 bg-silver-200 text-gray-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-silver-300",
        "plan-pro":
          "border-transparent bg-brand-accent text-brand-accent-foreground font-bold shadow-sm",

        /* MessTally Month Status Variants */
        "month-active":
          "border-emerald-300 bg-success-surface text-success font-medium dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400",
        "month-closed":
          "border-silver-400 bg-silver-200 text-muted-foreground font-medium dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
```

---

### 18.3 Sidebar Token Standardization

shadcn/ui's official `Sidebar` component (`@/components/ui/sidebar.tsx`) relies strictly on 8 dedicated CSS variables. All previous non-standard tokens (`--sidebar-bg`, `--sidebar-fg`, `--sidebar-active-*`) in Sections 4.5 and 4.6 have been renamed to match shadcn's exact naming while preserving our calculated WCAG-compliant color values:

| shadcn Token Name | Light Mode Value | Dark Mode Value | Contrast & Usage |
|-------------------|------------------|-----------------|------------------|
| `--sidebar` | `#3A0F34` (Deep Aubergine) | `#0F0310` (Deepest Aubergine) | Background canvas of the sidebar shell |
| `--sidebar-foreground` | `#DDE3E8` (Ice Silver) | `#DDE3E8` (Ice Silver) | Navigation item label text (12.5:1 AAA on Aubergine) |
| `--sidebar-primary` | `#501A4A` (aubergine-700) | `#3A0F34` (aubergine-800) | Background container for active navigation item |
| `--sidebar-primary-foreground` | `#FFFFFF` (White) | `#EAAA00` (Marigold) | Active item icon and label text (7.90:1 AAA on `#3A0F34`) |
| `--sidebar-accent` | `#501A4A` (aubergine-700) | `#1F0721` (aubergine tint) | Hover background for inactive items |
| `--sidebar-accent-foreground` | `#FFFFFF` (White) | `#DDE3E8` (Ice Silver) | Hover text color |
| `--sidebar-border` | `#501A4A` (aubergine-700) | `#2A0926` (aubergine-900) | Vertical separator border between sidebar and page canvas |
| `--sidebar-ring` | `#EAAA00` (Marigold) | `#EAAA00` (Marigold) | Keyboard focus ring for sidebar navigation links |

> **Developer Note:** Never invent custom sidebar CSS variables. Using shadcn's standard names ensures that `Sidebar`, `SidebarMenu`, `SidebarMenuItem`, and `SidebarMenuButton` from `npx shadcn add sidebar` work out of the box with zero custom CSS overrides.

---

### 18.4 Form Architecture: TanStack Form Integration (Strictly No react-hook-form)

> ⛔ **CRITICAL ARCHITECTURAL DIRECTIVE:**  
> The MessTally stack uses **`@tanstack/react-form` + `zod`** for all form state management (per `AGENTS.md` and PRD specifications).  
> **DO NOT install or use shadcn's default `components/ui/form.tsx`**.

#### 18.4.1 Why shadcn's `form.tsx` is Prohibited
Running `npx shadcn add form` generates a wrapper component coupled tightly to `react-hook-form` (`FormProvider`, `FormField`, `useFormField`). Using it alongside TanStack Form creates dual form runtime overhead, conflicting form contexts, and TypeScript compilation errors.

#### 18.4.2 shadcn/ui Official Guidance for TanStack Form
Current shadcn/ui documentation provides official guidance for headless form libraries like TanStack Form:
1. **TanStack Form is headless:** It manages validation rules, dirty/touched states, submission handlers, and field subscriptions without generating HTML tags.
2. **shadcn provides visual primitives:** Use shadcn's unstyled, accessible primitives (`Input`, `Label`, `Textarea`, `Select`, `Checkbox`) directly inside TanStack Form's `form.Field` render prop.
3. **Validation error rendering:** Render errors using TanStack Form's `field.state.meta.errors` directly into an accessible error element (`<p className="text-xs font-medium text-destructive">` or a custom `<FieldError />` wrapper).

#### 18.4.3 Canonical Form Field Implementation Pattern

Here is the required implementation pattern for all MessTally form fields (e.g. Login, Add Bazar Trip, Quick Deposit):

```tsx
"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      // Calls @/api/auth.api.ts
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-4"
    >
      {/* Email Field */}
      <form.Field
        name="email"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0
          return (
            <div className="space-y-1.5">
              <Label htmlFor={field.name} className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="flatmate@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                aria-describedby={isInvalid ? `${field.name}-error` : undefined}
                className={isInvalid ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {isInvalid && (
                <p id={`${field.name}-error`} className="text-xs font-medium text-destructive">
                  {field.state.meta.errors[0]?.message ?? field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )
        }}
      />

      {/* Submit Button */}
      <Button type="submit" variant="brand-accent" className="w-full">
        Sign In
      </Button>
    </form>
  )
}
```

---

### 18.5 Component Styling Governance: Single Source of Truth

To preserve design system integrity and prevent visual regression, engineers must follow these governance rules:

1. **Zero Ad-Hoc Color Overrides:** Never write raw arbitrary color utilities inside page components (e.g. `className="bg-[#3A0F34]"` or `className="text-[#065F46]"`).
2. **Tokens in `globals.css` Once:** All color values must live exclusively in `src/app/globals.css` within `:root` (light) and `.dark`.
3. **Variants in `components/ui/*.tsx` Once:** All reusable component states (button variants, badge colors, card styles) must be defined once inside their respective primitive file using `cva`.
4. **Semantic Class Names Only:** Feature components must only consume semantic utility tokens (e.g. `bg-primary`, `bg-brand-accent`, `text-money-positive`, `<Button variant="brand-accent">`, `<Badge variant="role-manager">`).
5. **Global Fix Propagation:** If a color or contrast ratio must be updated in the future, updating the single CSS variable in `globals.css` automatically updates all 20+ screens without touching component code.

---

### 18.6 Tailwind CSS v4 (`@theme`) Implementation Note

MessTally is built on **Next.js 16 + Tailwind CSS v4**. Developers must verify their configuration:

1. **Verify `package.json`:** Confirm that `"tailwindcss": "^4.x"` and `"@tailwindcss/postcss": "^4.x"` are installed. There is **no `tailwind.config.js` or `tailwind.config.ts`** in this project.
2. **Map Semantic Tokens in `@theme` Inline:** In Tailwind v4, CSS variable tokens are mapped directly into utility classes using the `@theme` directive in `src/app/globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";

@layer base {
  :root {
    /* Define CSS variables as documented in Section 4.5 */
  }
  .dark {
    /* Define CSS variables as documented in Section 4.6 */
  }
}

@theme {
  /* Map shadcn CSS variables to Tailwind color utilities */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Map shadcn Sidebar CSS variables */
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  /* Map MessTally Brand & Domain CSS variables */
  --color-brand-accent: var(--brand-accent);
  --color-brand-accent-foreground: var(--brand-accent-foreground);
  --color-money-positive: var(--money-positive);
  --color-money-positive-surface: var(--money-positive-surface);
  --color-money-negative: var(--money-negative);
  --color-money-negative-surface: var(--money-negative-surface);
  --color-money-neutral: var(--money-neutral);
  --color-money-neutral-surface: var(--money-neutral-surface);
  --color-success: var(--success);
  --color-success-surface: var(--success-surface);
  --color-warning: var(--warning);
  --color-warning-surface: var(--warning-surface);
  --color-error: var(--error);
  --color-error-surface: var(--error-surface);
  --color-info: var(--info);
  --color-info-surface: var(--info-surface);
}
```

> **Tailwind v4 Variable Syntax Note:** In MessTally, all CSS variables in `:root` and `.dark` store complete hex color values (e.g. `#DDE3E8`, `#3A0F34`, `#EAAA00`). Therefore, the `@theme` directive maps them directly using `var(--token)` WITHOUT `hsl()` wrappers. Do not define circular self-referencing variables (such as `--color-success: var(--color-success)`).

---

## 19. Do's, Don'ts & Consistency Checklist

### 19.1 Do's

- Follow all universal responsive design standards in [responsive.md](file:///d:/Projects/mess-tally-frontend/responsive.md) (single source of truth for responsive behavior; wins over Design.md if in conflict).
- Always use design tokens (`var(--color-*)` or shadcn variables) — never hardcode raw hex values.
- Apply `tabular-nums` with font stack `'Inter', 'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif` to every BDT currency amount, meal count, and rate figure (Inter supplies native fixed-width `tnum` for Latin digits; Hind Siliguri supplies `৳` U+09F3 via fallback; visually check `৳` sizing against Inter digits).
- Enforce font size ≥ 16px (1rem) on all `<input>`, `<select>`, and `<textarea>` elements on mobile (`< 768px`) to prevent uncontrollable iOS Safari automatic zoom (`responsive.md` Section 6).
- Wrap all data tables in `overflow-x: auto; width: 100%;` with an inner `min-width: 600px` (or `40rem`) and mobile edge-to-edge negative margins (`-mx-5`) inside padded cards (`responsive.md` Section 8).
- Ensure all interactive elements have at least a 44 × 44px touch target; provide 48 × 48px for primary operational CTAs and FAB (`responsive.md` Section 5).
- Apply the Odd-Item Rule on 2-column mobile card grids (last odd card spans 2 columns) (`responsive.md` Section 8).
- Clamp all modals to `width: 100%; max-width: min(calc(100vw - 2rem), 32rem);` with `max-height: 90vh; overflow-y: auto;` (`responsive.md` Section 10).
- Stack form and modal action buttons vertically full width (`width: 100%`) on mobile with primary confirm on top (`flex-direction: column-reverse` in modal footers) (`responsive.md` Sections 6 & 10).
- Lock body scrolling (`overflow: hidden` on `<body>`) whenever the mobile navigation drawer is open (`responsive.md` Section 7).
- Use Ice Silver (`#DDE3E8`) as the light-mode canvas background and pure white (`#FFFFFF`) for card containers.
- Use `--brand-accent` (`#EAAA00`) exclusively for primary CTAs, FABs, and key highlights; keep shadcn `--accent` as a subtle neutral tint (`#E8EDF1`) for dropdown/button hover.
- Set dark mode `--primary` to Marigold (`#EAAA00`) with Deep Aubergine text (`#3A0F34`, 7.90:1 AAA) to ensure 8.79:1 AAA contrast on dark cards (`#2A0926`).
- Set dark mode `--destructive` to Red-600 (`#DC2626`) to ensure white text achieves 4.83:1 AA contrast.
- Use `#6B7A87` (`silver-900`, 4.41:1 on white) for `--input` borders to satisfy WCAG 1.4.11 Non-text Contrast (>= 3:1 for interactive boundaries).
- Use `emerald-800` (`#065F46`, 5.94:1 AA) for success and positive money text on the Ice Silver canvas (`#DDE3E8`).
- Show the Meal Rate formula breakdown via an **Inline Expandable Formula Card** on tap/click that works on both mobile and desktop (never rely on hover tooltips).
- Re-verify WCAG AA contrast (>= 4.5:1) for any text against its exact background surface, including `gray-600` on Ice Silver and darkened semantic colors on `*-surface` backgrounds.
- Show every async data container in loading (skeleton), empty, success, and error states.
- Confirm every TallyBot write action with a Confirmation Card before any database write.
- Provide `aria-label` on all icon-only buttons.
- Keep the Month Selector visible and sticky across all pages in the app shell.
- Use AlertDialog for destructive/irreversible actions (close month, remove member).
- Preserve form input values on submission error — never clear the form.
- Respect `prefers-reduced-motion` — disable transform animations, keep opacity fades.
- Set line-height 1.75 for any text block containing Bengali characters.

### 19.2 Don'ts

- Never declare fixed pixel widths on layout containers (`width: 600px` is prohibited; use `max-width: 600px; width: 100%`) (`responsive.md` Section 1).
- Never allow horizontal page scrolling or window wobble on any device width (`100vw` containment is mandatory) (`responsive.md` Section 12).
- Never use form input font sizes below 16px on mobile viewports (`< 768px`) (`responsive.md` Section 6).
- Never shrink multi-column data tables below readable column widths without an edge-to-edge horizontal scroll container (`responsive.md` Section 8).
- Never keep persistent sidebars visible below 1024px (`lg`); they squash tables and forms (`responsive.md` Section 7).
- Never rely on Hind Siliguri alone for tabular digits without Inter — Hind Siliguri lacks the OpenType `tnum` feature so digits remain proportional.
- Never use JetBrains Mono or generic monospace for BDT currency amounts — it omits the `৳` (U+09F3) glyph and triggers ugly font fallback.
- Never use `emerald-700` (`#047857`) on the Ice Silver canvas (`4.24:1` FAIL).
- Never use `#BCCAD4` for form input borders (`1.68:1` on white, FAILS WCAG 1.4.11 >= 3:1).
- Never use `#3A0F34` as `--primary` in dark mode (`1.11:1` FAIL against `#2A0926` dark card).
- Never use `#EF4444` as destructive button background in dark mode (`3.76:1` FAIL with white text).
- Never put white text on Marigold (`#EAAA00`) — fails WCAG (`2.1:1` FAIL).
- Never put Marigold text on Ice Silver (`#DDE3E8`) — fails WCAG (`1.58:1` FAIL).
- Never map Marigold directly to shadcn's `--accent` token (it causes menu hover backgrounds to turn bright gold).
- Never use hover-only tooltips for essential financial data like the Meal Rate formula (fails on mobile touchscreens).
- Never use legacy `emerald-600` (`#059669`, `3.77:1` FAIL) or `gray-500` (`#6B7280`, `3.74:1` FAIL on Ice Silver) for body text.
- Never show more than one primary button and one accent button on the same screen.
- Never let TallyBot write to the database without an explicit user confirmation card.
- Never use a standard dropdown for member selection when there are 6 or fewer members — use Avatar Pill Selector instead.
- Never assume `/register`, `/forgot-password`, `/reset-password`, Google SSO, or SaaS pricing limits are approved PRD requirements — treat them as open questions.

### 19.3 Consistency Checklist

Use this checklist before handing off any page design:

**Responsive & Layout Verification (`responsive.md`)**
- [ ] Viewport meta tag present: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- [ ] Tested and verified with **zero horizontal page scroll** across all 6 standard test widths:
  - `320px` (narrowest supported phone)
  - `375px` (standard phone)
  - `390px` (modern iPhone standard)
  - `768px` (iPad portrait / tablet boundary)
  - `1024px` (laptop / app split boundary)
  - `1440px` (standard desktop display)
- [ ] Inputs and selects enforce font size ≥ 16px on `< 768px` (prevents iOS auto-zoom).
- [ ] All touch targets meet minimum 44 × 44px (48 × 48px for primary CTAs and FAB).
- [ ] Data tables wrapped in `overflow-x: auto; width: 100%` with `min-width: 600px` and mobile edge-to-edge negative margins.
- [ ] 2-column mobile card grids apply the Odd-Item Rule (last odd card spans 2 columns).
- [ ] Modals width-clamped (`max-width: min(calc(100vw - 2rem), 32rem)`) with `max-height: 90vh; overflow-y: auto;`.
- [ ] Modal/form action buttons stack vertically on mobile with primary confirm on top.
- [ ] Active mobile drawer locks body scrolling (`overflow: hidden`).
- [ ] Base light-mode page canvas uses Ice Silver (`#DDE3E8`); cards use pure white (`#FFFFFF`).
- [ ] Meal Rate stat card uses Inline Expandable Formula Card (accessible on mobile tap).
- [ ] Sidebar (persistent on ≥ 1024px) / bottom nav (active on < 1024px) role-filtered correctly.
- [ ] Month selector visible and sticky on this page.
- [ ] TallyBot FAB positioned bottom-right above bottom nav (right: 24px, bottom: 88px).

**Color & Typography**
- [ ] No raw hex values — all colors use tokens.
- [ ] All BDT amounts and rates use `'Inter', 'Hind Siliguri', ...` + `tabular-nums` (Inter provides `tnum`; Hind Siliguri provides `৳` U+09F3; visually checked).
- [ ] Form input borders use `#6B7A87` (silver-900, >= 3:1 WCAG 1.4.11 on white).
- [ ] Dark mode primary is Marigold (`#EAAA00`) and dark destructive is Red-600 (`#DC2626`).
- [ ] Marigold CTAs use `--brand-accent`; menu hover states use subtle `--accent`.
- [ ] All balance values color-coded with re-verified `money-*` tokens (emerald-800 on Ice Silver canvas).
- [ ] WCAG contrast verified >= 4.5:1 for all text/surface pairings (including `*-surface` backgrounds).

**Components & States**
- [ ] Form inputs have persistent labels above (not placeholder-only).
- [ ] Async data containers have skeleton loader states matching exact layout.
- [ ] Empty states feature icon + heading + descriptive body + optional CTA.
- [ ] Destructive dialogs use AlertDialog with confirmation warning.

**Accessibility**
- [ ] Icon-only buttons have `aria-label`.
- [ ] Expandable formula card has `aria-expanded` and `aria-controls`.
- [ ] Focus rings visible in both light mode (aubergine) and dark mode (marigold).
- [ ] Touch targets minimum 44x44px.
- [ ] `prefers-reduced-motion` respected.

---

## 20. Open Questions & Unverified Assumptions

This section explicitly documents all design assumptions introduced in this specification that are **not specified or are explicitly marked out-of-scope in the MessTally PRD**. These items require product owner decisions and backend architecture confirmation before implementation.

### 20.1 Authentication & Account Management Assumptions

| Item / Route | Design Assumption | PRD Specification (`prd.md`) | Open Question & Decision Required |
|--------------|-------------------|------------------------------|-----------------------------------|
| **`/register`** | Self-serve account creation form with Name, Email, Phone, Password, and Password Confirmation. | Only `POST /api/auth/login` is specified (JWT via `passport-jwt` and `jsonwebtoken`). The `users` table schema is defined, but no self-registration endpoint or invite-gated registration flow is documented. | **Q1:** Is registration open to the public, or invite-only via room code? Does the backend team plan `POST /api/auth/register`? |
| **`/forgot-password` & `/reset-password`** | Email-based password reset link flow with temporary reset tokens. | No password recovery or email delivery service (e.g. Resend, Sendgrid, SES) is mentioned in the PRD. | **Q2:** Is self-serve password recovery in scope for v1, or should users contact the Mess Manager/Admin for password resets initially? |
| **Google SSO** | "Sign in with Google" button placed above email/password input. | PRD specifies only email/password JWT authentication via `passport-jwt`. No OAuth2/Google client ID is configured or listed. | **Q3:** Should Google SSO be postponed until post-v1, or should the frontend mock the button pending OAuth credentials? |

### 20.2 Monetization, Billing & Plan Limit Assumptions

| Item | Design Assumption | PRD Specification (`prd.md`) | Open Question & Decision Required |
|------|-------------------|------------------------------|-----------------------------------|
| **SaaS Billing Tiers** | FREE vs PRO tiers with feature gate indicators and upgrade modal. | **Strictly OUT OF SCOPE.** Lines 323 & 330: *"Mess Plan / SaaS Billing: The mess.plan and mess.plan_expires_at columns exist in the schema but billing tiers are not implemented in this phase... Multi-Tenant SaaS Billing & Subscription Plans: Core flat/mess management is the focus before paid tiers."* | **Q4:** Since billing is out of scope for the current build, should paywall upgrade triggers and PRO badges be hidden entirely in v1, or retained as non-functional preview placeholders? |
| **FREE Plan Limits** | Max 6 members, 3 months history, 10 TallyBot queries/month, text-only exports. | The PRD defines NO member limits, NO historical month restrictions, and NO chatbot query quotas. | **Q5:** What are the actual business-approved limits for FREE messes, or should all messes have unlimited access during beta? |
| **PRO Pricing & Currency** | ৳ 299 / month subscription price. | No pricing model, subscription duration, or discount structure exists in the PRD. | **Q6:** What will the official subscription fee be, and will billing be per-mess or per-user? |
| **Payment Gateway** | bKash, Nagad, or credit card checkout flow for subscriptions. | Out of scope. No local MFS (Mobile Financial Services) or payment aggregator (e.g. SSLCommerz, Shurjopay) is mentioned in the PRD. | **Q7:** Which Bangladeshi payment gateway will be integrated when billing is implemented? |
| **`/pricing` Route** | Public comparison page displaying FREE and PRO plan feature matrices and FAQs. | Out of scope in PRD. | **Q8:** Should `/pricing` be deferred to Phase 10 / post-launch? |

### 20.3 Summary of Recommended Actions for Engineering

1. **Phase 1 Auth:** Implement the `/login` page immediately using the confirmed `POST /api/auth/login` endpoint. Scaffold `/register` and `/forgot-password` as UI shells, but do not integrate until Q1 and Q2 are answered by backend/product.
2. **Phase 2–8 Core Workflows:** Proceed at full speed on Onboarding, Dashboard (with the inline Meal Rate formula card), Daily Meals stepper, Bazar feed, Utility hub, Monthly Summary settlement, and Members directory. These represent 100% confirmed PRD requirements.
3. **Phase 10 Paywall & Pricing:** Keep paywall modals and `/pricing` completely decoupled from core accounting workflows until business stakeholders finalize SaaS tier boundaries and payment gateway integration.

---

*End of MessTally Design System v1.0*  
*Status: Updated with computed WCAG AA/AAA values, Ice Silver canvas background, tabular-nums Inter + Hind Siliguri font stack, separate brand-accent token, inline expandable formula card, reconciled evidence counts, shadcn/ui implementation mapping, responsive.md single source of truth alignment, and documented open questions.*

