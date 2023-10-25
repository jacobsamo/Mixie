"use client";
import OtpInput from "@/src/common/components/elements/OtpInput";
import { Button } from "@/src/common/components/ui/button";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { env } from "@/env.mjs";

interface CodeFormProps {
  code: string;
}

const VerificationPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<CodeFormProps>();

  const onSubmit = async (data: CodeFormProps) => {
    router.push(
      `/api/auth/callback/email?callbackUrl=${env.NEXT_PUBLIC_APP_URL}&token=${data.code}&email=jacob35422%40gmail.com`
    );
  };

  return (
    <form
      className="m-auto flex max-w-md flex-col items-center gap-3 rounded-3xl bg-white p-3 text-center dark:bg-grey"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/favicon.ico"
          alt="Logo"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full"
        />
        <h1 className="text-step--1">Welcome to Meally</h1>
      </div>
      <p>Please enter the 5 digit code sent to {}</p>
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
      <Button type="submit" ariaLabel="submit verification code">
        Verify
      </Button>
    </form>
  );
};

export default VerificationPage;
