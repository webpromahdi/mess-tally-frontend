# =============================================================================
# AGENTS.md — Guide for AI coding agents working on this project
# =============================================================================

## Project Overview
This is a production-grade Next.js starter template. It is not a running application
but a reusable base. When cloning this template for a new project:
1. Update `src/config/site.ts` with project name/description
2. Update `src/env.ts` with project-specific env vars
3. Update `.env.example` to document the new env vars
4. Update `src/app/layout.tsx` metadata and themeColor

## Tech Stack
- **Next.js 16** (App Router, TypeScript, `src/` directory)
- **Tailwind CSS v4** (CSS-first configuration via `globals.css`)
- **shadcn/ui** (New York / Vega aesthetic — polished, balanced)
- **TanStack Query v5** (server state management)
- **TanStack Form v1** (form state management)
- **ofetch** (HTTP client)
- **Zustand v5** (client/global UI state)
- **Zod v3** (schema validation)
- **Biome** (linting + formatting)
- **Sonner** (toast notifications)
- **@t3-oss/env-nextjs** (environment variable validation)

## Key Conventions

### Imports
- Use path aliases: `@/lib`, `@/hooks`, `@/api`, `@/components`, `@/store`, `@/validations`
- Import from barrel files: `import { useLogin } from "@/hooks"` not from individual files
- API functions come from `@/api`, hooks from `@/hooks`

### File Naming
- API modules: `feature.api.ts` → in `src/api/`
- Hook files: `feature.hook.ts` → in `src/hooks/`
- Store files: `feature.store.ts` → in `src/store/`
- Validation files: `feature.validation.ts` → in `src/validations/`
- Type files: `feature.types.ts` → in `src/lib/types/`
- Network Proxy (Next.js 16+): `proxy.ts` → in `src/proxy.ts` (replaces legacy `middleware.ts`)

### State Management Rules
- **TanStack Query**: all server state (API data) — DO NOT put API data in Zustand
- **Zustand**: only client/global UI state (sidebar open, theme, modal state, etc.)
- **TanStack Form**: all form state

### Components
- All shadcn/ui components live in `src/components/ui/`
- Add new shadcn components with: `npx shadcn add <component-name>`
- Custom non-UI components go in `src/components/` (not inside `ui/`)

### Environment Variables
- Never use `process.env.NEXT_PUBLIC_*` directly — always import from `@/env`
- Add new env vars to both `src/env.ts` AND `.env.example`

### Server vs Client Components
- Default to Server Components (no `"use client"` unless needed)
- Add `"use client"` only when using hooks, browser APIs, or event handlers
- Push `"use client"` as deep down the tree as possible

## Running the Project
```bash
npm run dev        # development server
npm run build      # production build
npm run typecheck  # TypeScript type check
npm run check      # Biome lint + format
```
