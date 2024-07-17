"use client";
import { env } from "env";
import OtpInput from "@/components/otp-Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createClient } from "@mixie/supabase/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import toast from "react-hot-toast";

interface CodeFormProps {
  code: string;
}

const VerificationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const form = useForm<CodeFormProps>();
  const supabase = createClient();

  if (!email) router.push("/auth/login");

  const onSubmit: SubmitHandler<CodeFormProps> = async (data) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email: email!,
      token: data.code,
      type: "email",
    });

    if (error) return console.error(error);
  };

  const resendOtp = async () => {
    if (!email) return toast.error("Not email found");
    const data = await supabase.auth.resend({
      type: "signup",
      email: email,
    });
  };

  return (
    <Form {...form}>
      <div className="flex flex-col items-center">
        <Image
          src="/icons/icon_x128.jpg"
          alt="Logo"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full"
        />
        <h1 className="text-step--1">Welcome to Mixie</h1>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="code"
          rules={{ pattern: new RegExp(REGEXP_ONLY_DIGITS_AND_CHARS) }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  {...field}
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot inputMode="numeric" index={0} />
                    <InputOTPSlot inputMode="numeric" index={1} />
                    <InputOTPSlot inputMode="numeric" index={2} />
                    <InputOTPSlot inputMode="numeric" index={3} />
                    <InputOTPSlot inputMode="numeric" index={4} />
                    <InputOTPSlot inputMode="numeric" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="flex flex-col gap-2">
                Please enter 6 digit code sent to your email address to
                continue.
                {/* <Button
                  variant="link"
                  onClick={resendOtp}
                  type="button"
                  className="text-foreground"
                >
                  Resend Code
                </Button> */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <p>Resend code</p> */}
        <Button
          type="submit"
          aria-label="submit verification code"
          className="mt-8"
        >
          Verify
        </Button>
      </form>
    </Form>
  );
};

export default VerificationPage;
