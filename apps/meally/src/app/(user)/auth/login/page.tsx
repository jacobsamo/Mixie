"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/src/common/components/ui/input";
import { Button } from "@/src/common/components/ui/button";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface EmailFormProps {
  email: string;
}

const LoginPage = async () => {
  const { register, handleSubmit } = useForm<EmailFormProps>();
  const router = useRouter();

  const onSubmit = async (data: EmailFormProps) => {
    console.log(data.email);
    signIn("email", { email: data.email, callbackUrl: "/", redirect: false });
    router.push(
      "/auth/verify?" + new URLSearchParams({ email: data.email }).toString()
    );
  };

  const signInWithGithub = async () => {
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <div className="m-auto flex max-w-md flex-col items-center gap-3 rounded-3xl bg-white p-3 text-center dark:bg-grey">
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
      <form
        className="flex w-2/3 flex-col  gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
        />
        <Button
          type="submit"
          ariaLabel="Log into Meally"
          className="mx-auto w-full"
        >
          Log in
        </Button>
      </form>
      <span className="my-2 mb-4 h-[0.125rem] w-3/4 rounded-md bg-grey dark:bg-white"></span>
      <div>
        <Button
          LeadingIcon={<GithubIcon />}
          ariaLabel="sign in with google"
          className="bg-[#333333] p-3 text-step--2 text-white"
          onClick={() => signInWithGithub()}
        >
          Sign in with Github
        </Button>
        {/* <Button ariaLabel='sign in with google'>Sign in with Google</Button>
                <Button ariaLabel='sign in with github'>Sign in with Facebook</Button> */}
      </div>
    </div>
  );
};

export default LoginPage;
