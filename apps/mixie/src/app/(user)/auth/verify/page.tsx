"use client";
import { env } from "@/env.mjs";
import OtpInput from "@/src/common/components/elements/OtpInput";
import { Button } from "@/src/common/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface CodeFormProps {
  code: string;
}

const VerificationPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<CodeFormProps>();

  const onSubmit: SubmitHandler<CodeFormProps> = async (data) => {
    router.push(
      `/api/auth/callback/email?callbackUrl=${env.NEXT_PUBLIC_APP_URL}&token=${data.code}&email=jacob35422%40gmail.com`
    );
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
