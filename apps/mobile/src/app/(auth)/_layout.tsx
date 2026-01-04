import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="signin" options={{ title: "Sign In" }} />
      <Stack.Screen name="verify" options={{ title: "Verify Email" }} />
    </Stack>
  );
}
