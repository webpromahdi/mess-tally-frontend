# AGENTS.md — MessTally Frontend Guidelines

> Token-optimized context guide for AI agents. Command-first, zero prose fluff.

## 1. Quick Commands
```bash
npm run dev        # Dev server (Turbopack)
npm run check      # Biome lint + format with auto-fix (run before commit)
npm run typecheck  # TypeScript check (tsc --noEmit)
npm run build      # Production build check
npx shadcn add <c> # Install shadcn component into src/components/ui/
```

## 2. Core Project Context & Single Source of Truth
- **Workflow & Checklists**: Follow [workflow-plan.md](./workflow-plan.md) for module status and two-phase execution.
- **Backend Grounding**: Ground all features in [mess-tally-backend](../mess-tally-backend):
  - [API.md](../mess-tally-backend/API.md) (endpoints & schemas)
  - [plan.md](../mess-tally-backend/plan.md) (phase status & decisions D1–D14)
  - [prd.md](../mess-tally-backend/prd.md) (formulas & business logic)
- **Design System**: [Design.md](./Design.md) (tokens, visual hierarchy) & [responsive.md](./responsive.md).

## 3. Architecture Boundaries & File Placement
| Concern | Library / Tool | Location | Hard Rules |
| :--- | :--- | :--- | :--- |
| **Server State** | TanStack Query v5 | `src/hooks/<name>.hook.ts` | All API data here. **DO NOT** cache API data in Zustand. |
| **Client UI State** | Zustand v5 | `src/store/<name>.store.ts` | Global UI state only (modals, sidebar open, theme). |
| **Forms** | TanStack Form v1 | In component | Pair with Zod schema for client validation. |
| **API Endpoints** | ofetch | `src/api/<name>.api.ts` | Pure async functions invoking `apiClient`. |
| **Validation** | Zod v3 | `src/validations/<name>.validation.ts` | Schemas for forms and API payloads. |
| **Types** | TypeScript | `src/lib/types/<name>.types.ts` | Strict mode, no `any`. |
| **Base UI** | shadcn/ui | `src/components/ui/` | Primitives managed by shadcn CLI. |
| **Custom UI** | React | `src/components/<feature>/` | Feature components live outside `ui/`. |

## 4. Key Conventions & Negative Constraints
- **Proxy**: `src/proxy.ts` is the Next.js 16 network boundary (replaces `middleware.ts`).
- **HTTP Client**: `src/lib/apiClient.ts` (`ofetch` with `credentials: "include"`).
- **Environment**: Import only from `@/env`. Never use `process.env.NEXT_PUBLIC_*` directly.
- **Path Aliases & Barrels**: Always use `@/*` and import via barrel files (`import { useLogin } from "@/hooks"`).
- **Components**: Server components by default. Push `"use client"` down to leaves.
