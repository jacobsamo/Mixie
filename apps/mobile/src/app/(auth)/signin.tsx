import { Stack, router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { cn } from "heroui-native";

import { supabase } from "@/lib/supabase";
import AppleSignInButton from "@/components/social-auth-buttons/apple-sign-in-button";
import GoogleSignInButton from "@/components/social-auth-buttons/google-sign-in-button";

const emailSchema = z.string().email("Please enter a valid email address");

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setError(null);

      try {
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email: value.email,
          options: {
            shouldCreateUser: true,
          },
        });

        if (otpError) {
          throw otpError;
        }

        router.push({
          pathname: "/(auth)/verify",
          params: { email: value.email },
        });
      } catch (err: any) {
        console.error("Sign in error:", err);
        setError(err.message || "Failed to send verification code");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="items-center mb-10">
          <View className="w-24 h-24 rounded-full bg-primary/10 items-center justify-center mb-4">
            <Text className="text-4xl">🍳</Text>
          </View>
          <Text className="text-3xl font-bold text-foreground">Welcome to Mixie</Text>
          <Text className="text-muted-foreground text-center mt-2">
            Sign in to discover and share delicious recipes
          </Text>
        </View>

        {/* Social Auth Buttons */}
        <View className="gap-3 mb-6">
          <AppleSignInButton />
          <GoogleSignInButton />
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-border" />
          <Text className="mx-4 text-muted-foreground text-sm">or continue with email</Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        {/* Email Form */}
        <View className="gap-4">
          <form.Field
            name="email"
            validators={{
              onChange: emailSchema,
            }}
          >
            {(field) => (
              <View>
                <TextInput
                  placeholder="Enter your email"
                  value={field.state.value}
                  onChangeText={field.handleChange}
                  onBlur={field.handleBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  editable={!isLoading}
                  className={cn(
                    "border rounded-lg p-4 text-base text-foreground bg-background",
                    field.state.meta.errors.length > 0
                      ? "border-destructive"
                      : "border-input"
                  )}
                  placeholderTextColor="#9ca3af"
                />
                {field.state.meta.errors.length > 0 && (
                  <Text className="text-destructive text-sm mt-1">
                    {field.state.meta.errors.join(", ")}
                  </Text>
                )}
              </View>
            )}
          </form.Field>

          {error && (
            <View className="bg-destructive/10 p-3 rounded-lg">
              <Text className="text-destructive text-sm">{error}</Text>
            </View>
          )}

          <Pressable
            onPress={() => form.handleSubmit()}
            disabled={isLoading}
            className={cn(
              "rounded-lg py-4 items-center",
              isLoading ? "bg-primary/50" : "bg-primary"
            )}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-primary-foreground font-semibold text-base">
                Continue with Email
              </Text>
            )}
          </Pressable>
        </View>

        {/* Terms */}
        <Text className="text-center text-muted-foreground text-xs mt-8 px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
