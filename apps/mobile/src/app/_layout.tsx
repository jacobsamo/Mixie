import "@/global.css";
import { Stack, useSegments, useRootNavigationState, router } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { AppThemeProvider } from "@/contexts/app-theme-context";
import AuthProvider from "@/components/providers/auth-provider";
import { useAuthContext } from "@/hooks/use-auth-context";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(drawer)",
};

function useProtectedRoute() {
  const { session, isLoading } = useAuthContext();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key || isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/signin");
    } else if (session && inAuthGroup) {
      router.replace("/(drawer)");
    }
  }, [session, segments, isLoading, navigationState?.key]);
}

function StackLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ title: "Modal", presentation: "modal" }} />
    </Stack>
  );
}

function RootLayoutNav() {
  const { isLoading } = useAuthContext();

  useProtectedRoute();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return <StackLayout />;
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <AppThemeProvider>
          <AuthProvider>
            <HeroUINativeProvider>
              <RootLayoutNav />
            </HeroUINativeProvider>
          </AuthProvider>
        </AppThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
