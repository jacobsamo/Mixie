# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the mobile app for Mixie, built with Expo (SDK 54) and React Native. It's part of a Turborepo monorepo that includes a Next.js web app and shared packages.

## Development Commands

```bash
# Alternative start
bun start

# Platform-specific builds
bun android
bun ios
bun web

# Prebuild native projects
bun prebuild
```

### Navigation Structure (Expo Router)
- `app/_layout.tsx` - Root layout with providers (GestureHandler, Keyboard, Theme, HeroUI)
- `app/(drawer)/` - Drawer navigation group
  - `app/(drawer)/(tabs)/` - Nested tab navigation within drawer
- Uses typed routes (`experiments.typedRoutes: true`)

### Provider Hierarchy
```
GestureHandlerRootView
  └─ KeyboardProvider (react-native-keyboard-controller)
      └─ AppThemeProvider (custom theme context)
          └─ HeroUINativeProvider (heroui-native components)
```

### Styling
- Uses **Uniwind** for Tailwind CSS in React Native via Metro transform
- CSS entry: `global.css`
- Imports: tailwindcss, uniwind, heroui-native/styles
- `className` prop works on components (transformed by Uniwind)

### Key Dependencies
- **heroui-native** - UI component library with `useThemeColor` hook
- **expo-router** - File-based routing with drawer/tabs support
- **react-native-reanimated** + **react-native-gesture-handler** - Animations and gestures

### Shared Packages
- `@mixie/supabase` - Database client and queries
- `@mixie/email` - Email templates
- `@mixie/tailwind-config` - Shared Tailwind configuration

### Path Aliases
- `@/*` maps to project root (e.g., `@/components`, `@/contexts`)

## Theming

Theme management uses `AppThemeProvider` in `contexts/app-theme-context.tsx`:
- `useAppTheme()` hook provides: `currentTheme`, `isLight`, `isDark`, `setTheme`, `toggleTheme`
- Integrated with Uniwind's `Uniwind.setTheme()`
