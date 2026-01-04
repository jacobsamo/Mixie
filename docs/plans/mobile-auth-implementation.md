# Mobile App Native Authentication Implementation Plan

## Overview

Implement native authentication for the Mixie Expo React Native mobile app with:
- **Apple Sign-In** (native on iOS, OAuth fallback on Android/Web)
- **Google Sign-In** (native on iOS/Android)
- **Magic Link** (Email OTP for all platforms)

**Bundle Identifier:** `com.mixiecooking.app`
**Auth Flow:** Combined sign-in/sign-up screen

---

## Phase 1: Dependencies & Configuration

### 1.1 Install Dependencies

```bash
cd apps/mobile
bun add @react-native-google-signin/google-signin
bun add react-hook-form @hookform/resolvers zod
```

### 1.2 Update `apps/mobile/app.json`

```json
{
  "expo": {
    "scheme": "mixie",
    "name": "Mixie",
    "slug": "mixie",
    "ios": {
      "bundleIdentifier": "com.mixiecooking.app",
      "usesAppleSignIn": true
    },
    "android": {
      "package": "com.mixiecooking.app"
    },
    "plugins": [
      "expo-font",
      "expo-secure-store",
      "expo-apple-authentication",
      ["@react-native-google-signin/google-signin", {
        "iosUrlScheme": "com.googleusercontent.apps.YOUR_IOS_CLIENT_ID"
      }]
    ]
  }
}
```

### 1.3 Environment Variables (`.env`)

```
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=xxx.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=xxx.apps.googleusercontent.com
```

### 1.4 Supabase Dashboard Configuration

- Enable Apple provider (add Service ID: `com.mixiecooking.app`)
- Enable Google provider (add Web Client ID from Google Cloud Console)

---

## Phase 2: Fix Existing Bugs

### 2.1 Fix `auth-provider.tsx`

**File:** `apps/mobile/src/components/providers/auth-provider.tsx`

Changes:
1. Fix profile query: `.eq("id", ...)` → `.eq("profile_id", ...)`
2. Fix isLoggedIn: `session !== undefined` → `!!session`

### 2.2 Add AuthProvider to Root Layout

**File:** `apps/mobile/src/app/_layout.tsx`

Insert `AuthProvider` into provider hierarchy between `AppThemeProvider` and `HeroUINativeProvider`.

---

## Phase 3: Auth Screens

### 3.1 Create Auth Layout

**New File:** `apps/mobile/src/app/(auth)/_layout.tsx`

Stack navigator for auth screens with consistent styling.

### 3.2 Rewrite Sign In Screen

**File:** `apps/mobile/src/app/(auth)/signin.tsx`

Combined screen with:
- Apple Sign-In button (iOS only)
- Google Sign-In button
- Email input with "Continue with Email" button
- Links to terms/privacy

### 3.3 Create Verify Screen

**New File:** `apps/mobile/src/app/(auth)/verify.tsx`

OTP verification with:
- 6-digit code input
- Resend code button
- Back to sign-in link

---

## Phase 4: Social Auth Buttons

### 4.1 Rewrite Apple Sign-In Button

**File:** `apps/mobile/src/components/social-auth-buttons/apple-sign-in-button.tsx`

Switch from `@invertase/react-native-apple-authentication` to `expo-apple-authentication`:

```typescript
import * as AppleAuthentication from "expo-apple-authentication";

// Use AppleAuthentication.signInAsync()
// Then call supabase.auth.signInWithIdToken({ provider: "apple", token })
```

### 4.2 Implement Google Sign-In Button

**File:** `apps/mobile/src/components/social-auth-buttons/google-sign-in-button.tsx`

Full implementation:

```typescript
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Configure with webClientId
// Use GoogleSignin.signIn()
// Then call supabase.auth.signInWithIdToken({ provider: "google", token })
```

---

## Phase 5: Navigation Guards

### 5.1 Protected Route Logic

**File:** `apps/mobile/src/app/_layout.tsx`

Add `useProtectedRoute` hook:
- Redirect unauthenticated users to `/(auth)/signin`
- Redirect authenticated users from auth screens to `/(drawer)`
- Keep splash screen visible while loading auth state

### 5.2 Update Stack Configuration

Add `(auth)` group to the Stack:

```typescript
<Stack.Screen name="(auth)" options={{ headerShown: false }} />
```

---

## Files to Modify/Create

| File | Action |
|------|--------|
| `apps/mobile/app.json` | MODIFY - Add iOS/Android config, plugins |
| `apps/mobile/src/app/_layout.tsx` | MODIFY - Add AuthProvider, navigation guards |
| `apps/mobile/src/app/(auth)/_layout.tsx` | CREATE - Auth group layout |
| `apps/mobile/src/app/(auth)/signin.tsx` | MODIFY - Complete implementation |
| `apps/mobile/src/app/(auth)/verify.tsx` | CREATE - OTP verification screen |
| `apps/mobile/src/components/providers/auth-provider.tsx` | MODIFY - Fix bugs |
| `apps/mobile/src/components/social-auth-buttons/apple-sign-in-button.tsx` | MODIFY - Use expo-apple-authentication |
| `apps/mobile/src/components/social-auth-buttons/google-sign-in-button.tsx` | MODIFY - Full implementation |
| `apps/mobile/.env` | MODIFY - Add Google client IDs |

---

## Implementation Order

1. **Fix bugs** in `auth-provider.tsx`
2. **Update `app.json`** with bundle ID and plugins
3. **Add AuthProvider** to root layout
4. **Create auth layout** `(auth)/_layout.tsx`
5. **Rewrite Apple Sign-In** button using expo-apple-authentication
6. **Implement Google Sign-In** button
7. **Build sign-in screen** with all auth options
8. **Create verify screen** for OTP
9. **Add navigation guards** in root layout
10. **Test all flows** on iOS and Android

---

## Testing Checklist

- [ ] Apple Sign-In works on iOS device
- [ ] Google Sign-In works on iOS
- [ ] Google Sign-In works on Android
- [ ] Magic Link email is sent
- [ ] OTP verification works
- [ ] Session persists after app restart
- [ ] Sign out clears session
- [ ] Unauthenticated users cannot access protected routes
- [ ] Same user can log in on web after mobile sign-up

---

## Important Notes

1. **Development Build Required**: Google Sign-In won't work in Expo Go. Run `bun prebuild && bun ios` or `bun android`.

2. **Apple Sign-In Testing**: Requires real iOS device or simulator with Apple ID signed in.

3. **Cross-Platform Identity**: Supabase automatically links identities when the same email is used across providers.

4. **Web Support for Apple**: If needed later, implement OAuth fallback using `supabase.auth.signInWithOAuth({ provider: "apple" })`.

---

## Sources

- [Supabase Expo Social Auth Guide](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth)
- [Supabase Apple Login Docs](https://supabase.com/docs/guides/auth/social-login/auth-apple)
- [Supabase Google Login Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Expo Apple Authentication](https://docs.expo.dev/versions/latest/sdk/apple-authentication/)
- [Supabase Native Mobile Auth Blog](https://supabase.com/blog/native-mobile-auth)
