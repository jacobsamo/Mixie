import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "heroui-native";

import { supabase } from "@/lib/supabase";

const OTP_LENGTH = 6;

export default function VerifyScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const insets = useSafeAreaInsets();

  const [code, setCode] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputs = useRef<(TextInput | null)[]>([]);

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleCodeChange = (text: string, index: number) => {
    // Only allow numeric input
    const numericText = text.replace(/[^0-9]/g, "");

    if (numericText.length <= 1) {
      const newCode = [...code];
      newCode[index] = numericText;
      setCode(newCode);
      setError(null);

      // Auto-focus next input
      if (numericText && index < OTP_LENGTH - 1) {
        inputs.current[index + 1]?.focus();
      }

      // Auto-submit when all digits are entered
      if (numericText && index === OTP_LENGTH - 1) {
        const fullCode = newCode.join("");
        if (fullCode.length === OTP_LENGTH) {
          handleVerify(fullCode);
        }
      }
    } else if (numericText.length === OTP_LENGTH) {
      // Handle paste of full code
      const newCode = numericText.split("");
      setCode(newCode);
      inputs.current[OTP_LENGTH - 1]?.focus();
      handleVerify(numericText);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      // Move focus to previous input on backspace if current is empty
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (token?: string) => {
    const verificationCode = token || code.join("");

    if (verificationCode.length !== OTP_LENGTH) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: email!,
        token: verificationCode,
        type: "email",
      });

      if (verifyError) {
        throw verifyError;
      }

      if (data.session) {
        router.replace("/(drawer)");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || "Invalid verification code");
      // Clear the code on error
      setCode(new Array(OTP_LENGTH).fill(""));
      inputs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    setError(null);

    try {
      const { error: resendError } = await supabase.auth.signInWithOtp({
        email: email!,
        options: {
          shouldCreateUser: true,
        },
      });

      if (resendError) {
        throw resendError;
      }

      // Start cooldown
      setResendCooldown(60);
      // Clear any existing code
      setCode(new Array(OTP_LENGTH).fill(""));
      inputs.current[0]?.focus();
    } catch (err: any) {
      console.error("Resend error:", err);
      setError(err.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Verify Email",
          headerBackTitle: "Back",
        }}
      />

      <View
        className="flex-1 justify-center px-6"
        style={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
            <Text className="text-2xl">📧</Text>
          </View>
          <Text className="text-2xl font-bold text-foreground text-center">
            Check your email
          </Text>
          <Text className="text-muted-foreground text-center mt-2">
            We sent a 6-digit code to
          </Text>
          <Text className="text-foreground font-medium mt-1">{email}</Text>
        </View>

        {/* OTP Input */}
        <View className="flex-row justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              editable={!isLoading}
              className={cn(
                "w-12 h-14 border rounded-lg text-center text-xl font-bold text-foreground bg-background",
                digit ? "border-primary" : "border-input",
                error ? "border-destructive" : ""
              )}
            />
          ))}
        </View>

        {/* Error */}
        {error && (
          <View className="bg-destructive/10 p-3 rounded-lg mb-4">
            <Text className="text-destructive text-sm text-center">{error}</Text>
          </View>
        )}

        {/* Verify Button */}
        <Pressable
          onPress={() => handleVerify()}
          disabled={isLoading || code.join("").length !== OTP_LENGTH}
          className={cn(
            "rounded-lg py-4 items-center mb-4",
            isLoading || code.join("").length !== OTP_LENGTH
              ? "bg-primary/50"
              : "bg-primary"
          )}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-primary-foreground font-semibold text-base">
              Verify
            </Text>
          )}
        </Pressable>

        {/* Resend */}
        <View className="items-center">
          <Text className="text-muted-foreground text-sm mb-2">
            Didn't receive the code?
          </Text>
          <Pressable
            onPress={handleResend}
            disabled={isResending || resendCooldown > 0}
          >
            {isResending ? (
              <ActivityIndicator size="small" />
            ) : resendCooldown > 0 ? (
              <Text className="text-muted-foreground">
                Resend in {resendCooldown}s
              </Text>
            ) : (
              <Text className="text-primary font-medium">Resend Code</Text>
            )}
          </Pressable>
        </View>

        {/* Back to sign in */}
        <Pressable
          onPress={() => router.back()}
          className="mt-8 items-center"
        >
          <Text className="text-muted-foreground">
            ← Back to sign in
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
