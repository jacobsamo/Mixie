# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mixie is a community-driven recipe sharing platform. Users can create, share, bookmark, and collaborate on recipes. The project uses a monorepo structure managed with Turborepo and Bun as the package manager.

## Common Commands

```bash
# Development
bun dev                    # Run all apps in development mode
bun run dev --filter=@mixie/web  # Run only web app

# Building
bun build                  # Build all packages and apps
bun run build:analyze      # Build with bundle analyzer (in apps/web)

# Linting and Formatting
bun lint                   # Lint all packages
bun format                 # Format with Prettier

# Database (Supabase)
bun supabase-start         # Start local Supabase (or: cd packages/supabase && bun db:start)
cd packages/supabase && bun db:types  # Regenerate TypeScript types from database

# Email Development
cd packages/email && bun dev:email    # Run email preview server on port 3001

# Mobile (Expo)
cd apps/mobile && bun dev             # Start Expo with cache clear
cd apps/mobile && bun android         # Run on Android
cd apps/mobile && bun ios             # Run on iOS
```

## Architecture

### Monorepo Structure

- **apps/web**: Next.js 14 web application (App Router)
- **apps/mobile**: React Native app using Expo Router
- **apps/docs**: Documentation site
- **packages/supabase**: Supabase client, types, and queries
- **packages/email**: React Email templates
- **packages/tailwind-config**: Shared Tailwind configuration
- **packages/eslint-config**: Shared ESLint configuration
- **packages/tsconfig**: Shared TypeScript configurations
- **packages/ui**: Shared UI components (being set up)

### Web App Key Patterns

**Server Actions**: Located in `apps/web/src/actions/`. Uses `next-safe-action` with:
- `action` - Basic server action
- `actionWithMeta` - Action with metadata for Sentry instrumentation
- `authAction` - Authenticated action that provides `user` and `supabase` in context

**Supabase Integration**: Import from `@mixie/supabase/*`:
- `@mixie/supabase/server` - Server-side client (uses cookies)
- `@mixie/supabase/client` - Browser client
- `@mixie/supabase/middleware` - Middleware helpers
- `@mixie/supabase/types` - Generated database types
- `@mixie/supabase/queries` - Reusable query functions
- `@mixie/supabase/cached-queries` - Cached query functions

**Type System**: Zod schemas in `apps/web/src/types/zodSchemas/` generate TypeScript types. Key types: `Recipe`, `Ingredient`, `Step`, `Bookmark`, `Collection`.

**Environment Variables**: Validated with `@t3-oss/env-nextjs` in `apps/web/env.mjs`. Required vars include Supabase, Uploadthing, OpenAI, Upstash Redis, Resend, and PostHog keys.

### Routing (Web)

- `(user)/[userId]/(authenticated)/*` - Protected user pages (settings, drafts, bookmarks)
- `(user)/auth/*` - Authentication pages (login, signout, verify)
- `recipes/*` - Recipe pages (view, create, edit, search, preview)
- `api/*` - API routes (recipes CRUD, auth callback, uploadthing)

### State Management

- Zustand for client-side state
- React Query (`@tanstack/react-query`) for server state
- `nuqs` for URL query state

### Key Integrations

- **Supabase**: Auth and database
- **Uploadthing**: File uploads
- **Unsplash**: Image search for recipes
- **OpenAI**: AI features via Vercel AI SDK
- **PostHog**: Analytics (proxied through Next.js rewrites)
- **Sentry**: Error monitoring
- **Resend**: Transactional emails
