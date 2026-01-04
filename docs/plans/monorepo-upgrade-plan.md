# Mixie Monorepo Upgrade Plan

## Overview
Comprehensive upgrade plan for the Mixie monorepo, focusing on `apps/web` and shared packages. Mobile app excluded (already on React 19/Tailwind v4).

## Current State → Target State

| Package | Current | Intermediate | Target |
|---------|---------|--------------|--------|
| **Next.js** | 14.2.7 | 15.x | 16.x |
| **React** | 18.3.1 | - | 19.x |
| **Tailwind CSS** | 3.4.10 | - | 4.x |
| **@supabase/ssr** | 0.5.1 | - | latest |
| **framer-motion** | 11.3.31 | - | motion |
| **AI SDK** | 3.3.25 | - | 4.x+ |
| **react-email** | 3.0.1 | - | latest |
| **next-safe-action** | 7.8.2 | - | 8.x |

---

## Phase 1: Foundation & Tooling (PR #1) ✅ COMPLETED

### 1.1 Root Package Updates
**Files:** `package.json`, `turbo.json`

**Completed:**
- ✅ Node.js engine: `>=18` → `>=22`
- ✅ Bun: `1.1.26` → `1.3.5`
- ✅ Turbo: `^2.1.1` → `^2.7.0` (installed 2.7.2)
- ✅ TypeScript: `^5.5.4` → `^5.9.0` (installed 5.9.3)
- ✅ Prettier: `^3.3.3` → `^3.7.0` (installed 3.7.4)
- ✅ prettier-plugin-tailwindcss: `^0.6.6` → `^0.7.0` (installed 0.7.2)
- ⚠️ ESLint: Kept at `^8.57.0` (ESLint 9 upgrade deferred to Phase 2 with Next.js 15)

### 1.2 TypeScript Config Updates
**Files:** `packages/tsconfig/*.json`

**Completed:**
- ✅ base.json: Added `verbatimModuleSyntax: true`, updated lib to `ES2023`
- ✅ nextjs.json: Added `verbatimModuleSyntax: false` override for Next.js compatibility
- ✅ react-library.json: Added `verbatimModuleSyntax: false` for JSX compatibility

### 1.3 ESLint Config Updates
**Files:** `packages/eslint-config/package.json`

**Completed:**
- ✅ eslint-config-turbo: `^2.1.1` → `^2.7.0`
- ✅ @typescript-eslint/parser: `^8.4.0` → `^7.18.0` (compatible with ESLint 8)
- ✅ @typescript-eslint/eslint-plugin: `^8.4.0` → `^7.18.0`

**Note:** ESLint 9 flat config migration deferred to Phase 2 when Next.js 15 is installed (has native ESLint 9 support)

---

## Phase 2: Next.js 14 → 15 + React 19 + Supabase SSR (PR #2)

### Critical Breaking Changes
1. **Async Request APIs** - `cookies()`, `headers()`, `params` now async
2. **Caching defaults changed** - fetch no longer cached by default
3. **Supabase SSR** - must update for async cookies

### 2.1 Supabase Package Updates
**Files:**
- `packages/supabase/package.json`
- `packages/supabase/src/client/server.ts` ⚠️ CRITICAL
- `packages/supabase/src/client/middleware.ts` ⚠️ CRITICAL
- `packages/supabase/src/client/client.ts`

**Changes:**
```typescript
// server.ts - BEFORE
const clientOptions = () => {
  const cookieStore = cookies(); // sync
  // ...
}
export const createClient = () => { ... }

// server.ts - AFTER
export async function createClient() {
  const cookieStore = await cookies(); // async
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch { /* Server Component - ignored */ }
        },
      },
    }
  )
}
```

**Middleware update pattern:**
```typescript
// middleware.ts - Update cookie handling for Next.js 15
```

### 2.2 Web App Next.js 15 Migration
**Files:**
- `apps/web/package.json`
- `apps/web/next.config.mjs`
- `apps/web/src/middleware.ts`
- All files in `apps/web/src/actions/` (14 files)
- All dynamic route pages with `params`

**Package updates:**
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "@next/mdx": "^15.0.0",
  "@next/bundle-analyzer": "^15.0.0",
  "eslint-config-next": "^15.0.0"
}
```

**Run codemod:**
```bash
npx @next/codemod@latest upgrade 15
```

**Manual changes required:**
1. Update all `createClient()` calls to `await createClient()`
2. Update dynamic route params: `{ params }` → `{ params: Promise<{ id: string }> }`
3. Review `next.config.mjs` experimental flags
4. Add explicit caching where needed (fetch requests)

### 2.3 Server Actions Updates
**Files:** `apps/web/src/actions/*.ts` (14 files)

Update all actions using Supabase client:
```typescript
// BEFORE
const supabase = createClient();

// AFTER
const supabase = await createClient();
```

### 2.4 next-safe-action v7 → v8
**Files:**
- `apps/web/src/actions/safe-action.ts`
- All action files using `schema()` method

**Changes:**
- Replace `schema()` with `inputSchema()`
- Update `useStateAction()` usage to `useActionState()` from React
- Update middleware patterns if needed

### 2.5 Add "use client" Directives
**Files to audit:** All components using hooks, browser APIs, or client state

Key files identified:
- `apps/web/src/components/providers/index.tsx`
- `apps/web/src/components/navbar.tsx`
- `apps/web/src/components/modals/*.tsx`
- `apps/web/src/app/recipes/create/page.tsx`
- `apps/web/src/app/(user)/auth/*.tsx`

---

## Phase 3: Next.js 15 → 16 (PR #3)

### Critical Breaking Changes
1. **Async APIs enforced** - No more sync fallback
2. **middleware.ts → proxy.ts** - Rename required
3. **Node.js runtime only** - Edge middleware removed
4. **Turbopack default** - Custom webpack configs need review
5. **Parallel routes** - Empty slots need `default.js`

### 3.1 Middleware Migration
**Files:**
- `apps/web/src/middleware.ts` → `apps/web/src/proxy.ts`
- `packages/supabase/src/client/middleware.ts`

```typescript
// BEFORE (middleware.ts)
export async function middleware(request: NextRequest) { ... }

// AFTER (proxy.ts)
export async function proxy(request: NextRequest) { ... }
```

### 3.2 Package Updates
```json
{
  "next": "^16.0.0",
  "@next/mdx": "^16.0.0",
  "@next/bundle-analyzer": "^16.0.0",
  "eslint-config-next": "^16.0.0"
}
```

### 3.3 Config Updates
**File:** `apps/web/next.config.mjs`

- Remove deprecated experimental flags
- Update for Turbopack compatibility
- Review custom webpack config (may need `--turbo=false` flag)

**Run codemod:**
```bash
npx @next/codemod@canary upgrade latest
```

---

## Phase 4: Tailwind CSS v3 → v4 (PR #4)

### Critical Breaking Changes
1. **CSS-first configuration** - No more `tailwind.config.js`
2. **Import syntax** - Single `@import 'tailwindcss'`
3. **Browser support** - Safari 16.4+, Chrome 111+, Firefox 128+
4. **Container utility** - Config options removed, use `@utility`

### 4.1 Run Upgrade Tool
```bash
npx @tailwindcss/upgrade
```

### 4.2 Package Updates
**Files:**
- `apps/web/package.json`
- `packages/tailwind-config/package.json`

```json
{
  "tailwindcss": "^4.0.0",
  "postcss": "latest"
}
```

Remove:
- `autoprefixer` (built into v4)
- `tailwindcss-animate` (verify v4 compatibility or migrate)

### 4.3 Config Migration
**Files:**
- `apps/web/tailwind.config.ts` → CSS-based config
- `packages/tailwind-config/tailwind.config.ts` → CSS-based config
- `apps/web/postcss.config.js` (simplify)
- `apps/web/src/lib/styles/globals.css` (update imports)

**Before (globals.css):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**After (globals.css):**
```css
@import 'tailwindcss';

@theme {
  /* Design tokens from old config */
  --color-black: hsl(222, 28%, 7%);
  --color-grey: hsl(224, 19%, 12%);
  /* ... */
}
```

### 4.4 UploadThing Integration
**File:** `apps/web/tailwind.config.ts`

Verify `withUt()` wrapper compatibility with Tailwind v4.

---

## Phase 5: framer-motion → motion (PR #5)

### Affected Files (3 total)
- `apps/web/src/components/landing-page-text/CursorBlinker.tsx`
- `apps/web/src/components/landing-page-text/index.tsx`
- `apps/web/src/components/search/search-dialog.tsx`

### 5.1 Package Update
```bash
bun remove framer-motion
bun add motion
```

### 5.2 Import Updates
```typescript
// BEFORE
import { motion, useMotionValue, useTransform } from "framer-motion";

// AFTER
import { motion, useMotionValue, useTransform } from "motion/react";
```

### 5.3 API Changes
- No breaking changes in React API for v12
- Verify `useMotionValue` and `useTransform` patterns in `LandingText/index.tsx`

---

## Phase 6: AI SDK 3.x → 4.x (PR #6)

### Affected Files
- `apps/web/src/lib/server/ai/open_ai.ts`
- `apps/web/src/lib/utils/recipe-imports/text.ts`
- `apps/web/src/lib/utils/recipe-imports/image.ts`

### 6.1 Package Updates
```json
{
  "ai": "^4.0.0",
  "@ai-sdk/openai": "^1.0.0"
}
```

### 6.2 Breaking Changes
- `baseUrl` → `baseURL` in provider config
- Verify `generateObject` API compatibility
- Remove any legacy streaming APIs if present

**Run codemod:**
```bash
npx @ai-sdk/codemod
```

---

## Phase 7: @mixie/email → @mixie/transactional (PR #7)

### 7.1 Package Rename
**Files:**
- `packages/email/package.json` → `packages/transactional/package.json`
- Update `name`: `@mixie/email` → `@mixie/transactional`

### 7.2 Package Updates
```json
{
  "name": "@mixie/transactional",
  "@react-email/components": "latest",
  "react-email": "latest",
  "resend": "latest"
}
```

### 7.3 API Updates
```typescript
// BEFORE
import { renderAsync } from "@react-email/render";

// AFTER
const html = await render(EmailTemplate);
```

### 7.4 Update Imports Across Codebase
**Files:**
- `apps/web/package.json` - Update workspace reference
- `apps/mobile/package.json` - Update workspace reference
- All files importing from `@mixie/email`

```typescript
// BEFORE
import { ... } from "@mixie/email";

// AFTER
import { ... } from "@mixie/transactional";
```

### 7.5 Directory Rename
```bash
mv packages/email packages/transactional
```

Update `workspaces` in root `package.json` if needed.

---

## Phase 8: Dependency Alignment & Cleanup (PR #8)

### 8.1 Root package.json Version Pinning
Pin shared dependencies to prevent conflicts:
```json
{
  "overrides": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.6.0"
  }
}
```

### 8.2 Update Remaining Dependencies
**apps/web/package.json:**
- `@sentry/nextjs` → latest (verify Next.js 16 support)
- `@tanstack/react-query` → latest
- `react-hook-form` → latest (React 19 compatible)
- `zustand` → latest
- `nuqs` → latest
- Radix UI components → latest versions

### 8.3 Remove Deprecated Packages
- `@types/react-beautiful-dnd` (if migrating to different DnD)
- Any unused dependencies

### 8.4 Type Updates
```bash
bun add -D @types/react@latest @types/react-dom@latest @types/node@latest
```

---

## Execution Order

```
PR #1: Foundation & Tooling
    ↓
PR #2: Next.js 15 + React 19 + Supabase SSR
    ↓
PR #3: Next.js 16
    ↓
PR #4: Tailwind CSS v4
    ↓
PR #5: framer-motion → motion
    ↓
PR #6: AI SDK 4.x
    ↓
PR #7: @mixie/email → @mixie/transactional
    ↓
PR #8: Dependency Alignment & Cleanup
```

---

## Testing Checklist Per Phase

### After Each PR
- [ ] `bun install` succeeds
- [ ] `bun run build` succeeds
- [ ] `bun run lint` passes
- [ ] `bun run dev` starts without errors
- [ ] Core user flows work:
  - [ ] Authentication (login/logout)
  - [ ] Recipe creation
  - [ ] Recipe viewing
  - [ ] Search functionality
  - [ ] User settings

### Critical Paths to Test
1. **Supabase auth flow** - Cookie handling is most fragile
2. **Server actions** - All 14 action files
3. **Dynamic routes** - `/recipes/[id]`, `/[userId]`
4. **AI features** - Recipe import from text/image

---

## Rollback Strategy

Each PR should be independently revertable. If issues arise:
1. Revert the problematic PR
2. Fix issues on a separate branch
3. Re-merge with fixes

---

## Files Summary

### Critical Files (High Risk)
- `packages/supabase/src/client/server.ts`
- `packages/supabase/src/client/middleware.ts`
- `apps/web/src/middleware.ts` (→ `proxy.ts`)
- `apps/web/src/actions/safe-action.ts`
- `apps/web/next.config.mjs`

### High Change Volume
- `apps/web/src/actions/*.ts` (14 files)
- `apps/web/src/app/**/page.tsx` (16 files)
- `apps/web/src/components/**/*.tsx` (100+ files for "use client")
- `apps/web/tailwind.config.ts`
- `apps/web/src/lib/styles/globals.css`

### Package Files
- `package.json` (root)
- `apps/web/package.json`
- `packages/supabase/package.json`
- `packages/email/package.json` (→ transactional)
- `packages/tailwind-config/package.json`
- `packages/eslint-config/package.json`
- `packages/tsconfig/package.json`
