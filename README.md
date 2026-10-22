# NEXT.JS STARTER

A production-grade Next.js starter template.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Vega style)
- **State Management:** Zustand v5
- **Data Fetching:** TanStack Query v5
- **Forms:** TanStack Form v1
- **HTTP Client:** ofetch
- **Validation:** Zod v4
- **Linter/Formatter:** Biome
- **Toasts:** Sonner
- **Icons:** Lucide React
- **Env Validation:** @t3-oss/env-nextjs

## Getting Started

1. Click **"Use this template"** on GitHub to create a new repository
2. Clone your new repository locally
3. Copy `.env.example` to `.env.local` and fill in values:
   ```bash
   cp .env.example .env.local
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Setup Checklist

After creating a new project from this template:

- [ ] Rename `"name"` in `package.json` to your project name
- [ ] Update `src/config/site.ts` with your app name and description
- [ ] Update `src/env.ts` with your project-specific environment variables
- [ ] Update `.env.example` to reflect your env variables
- [ ] Update `src/app/layout.tsx` metadata (title, description, themeColor)
- [ ] Add your image domains to `next.config.ts` → `images.remotePatterns`

## Folder Structure

```
src/
├── app/                   # Next.js App Router
│   ├── (auth)/            # Route group: public auth pages
│   ├── (root)/            # Route group: protected app pages
│   ├── error.tsx          # Global error boundary
│   ├── not-found.tsx      # Global 404 page
│   ├── globals.css        # Tailwind v4 + CSS variables
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing / redirect page
├── api/                   # ofetch API function modules
├── components/
│   └── ui/                # shadcn/ui components
├── config/
│   └── site.ts            # App-wide constants
├── hooks/                 # Custom hooks (TanStack Query wrappers)
├── lib/
│   ├── apiClient.ts       # ofetch singleton
│   ├── utils.ts           # cn(), formatDate(), helpers
│   └── types/             # Global TypeScript types
├── providers/             # React context providers
├── store/                 # Zustand stores
├── validations/           # Zod schemas
└── env.ts                 # Validated environment variables
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Lint with Biome |
| `npm run format` | Format with Biome |
| `npm run check` | Lint + format with Biome |
| `npm run typecheck` | TypeScript type checking |

## Adding shadcn/ui Components

```bash
npx shadcn add <component-name>
```

Example:
```bash
npx shadcn add button input dialog badge card skeleton tooltip
```

## Environment Variables

Copy `.env.example` to `.env.local`:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | ✅ |
| `NEXT_PUBLIC_APP_URL` | Frontend app URL | Optional |
