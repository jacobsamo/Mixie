"use client";
import { env } from "env";
import OtpInput from "@/components/otp-Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createClient } from "@/server/supabase/client";

interface CodeFormProps {
  code: string;
}

const VerificationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { control, handleSubmit } = useForm<CodeFormProps>();
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
  };

  const resendOtp = async () => {
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email: email!,
      // options: {
      //   emailRedirectTo: "https://example.com/welcome",
      // },
    });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <Image
          src="/icons/icon.jpg"
          alt="Logo"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full"
        />
        <h1 className="text-step--1">Welcome to Mixie</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <p>Please enter the 5 digit code sent to continue</p>
        <Controller
          name="code"
          defaultValue=""
          rules={{ minLength: 5, required: true }}
          render={({ field }) => (
            <OtpInput
              value={field.value}
              size={5}
              onChange={(val) => {
                field.onChange(val);
              }}
            />
          )}
          control={control}
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
    </>
  );
};

export default VerificationPage;
