"use client";
import OtpInput from "@/src/common/components/elements/LoginCode";
import { Button } from "@/src/common/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";

const VerificationPage = () => {
  const { control, handleSubmit } = useForm<{ code: string }>();

  const onSubmit = async (data) => {
    console.log("Code: ", data);
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
      <p>Please enter the 6 digit code sent to {}</p>
      <Controller
        name="code"
        defaultValue=""
        render={({ field }) => (
          <OtpInput
            value={field.value}
            onChange={(val) => {
              field.onChange(val);
            }}
          />
        )}
        control={control}
      />
      <p>Resend code</p>
      <Button type="submit" ariaLabel="submit verification code">
        Verify
      </Button>
    </form>
  );
};

export default VerificationPage;
