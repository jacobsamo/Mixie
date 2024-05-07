"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { createClient } from "@/server/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const emailForm = z.object({
  email: z.string().email(),
  acceptTerms: z.boolean().refine((data) => data === true, {
    message: "You must accept the terms and conditions to continue",
  }),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof emailForm>>({
    resolver: zodResolver(emailForm),
  });
  const router = useRouter();
  const supabase = createClient();

  const onSubmit: SubmitHandler<z.infer<typeof emailForm>> = async (data) => {
    await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: false,
      },
    });

    router.push(
      "/auth/verify?" + new URLSearchParams({ email: data.email }).toString()
    );
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <Image
          src="/icons/icon_x128"
          alt="Logo"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full"
        />
        <h1 className="text-step--1">Welcome to Mixie</h1>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          aria-label="sign in with google"
          LeadingIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 262"
              className="h-8"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
          }
          className="flex w-56 max-w-sm cursor-pointer items-center gap-2 rounded-lg bg-white px-2 py-6 text-center text-step--3 text-black"
          onClick={() => signInWithGoogle()}
        >
          Sign in with Google
        </Button>
        {/* <Button
          LeadingIcon={
            <svg
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8"
            >
              <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>github</title>{" "}
                <rect fill="none" height="24" width="24"></rect>{" "}
                <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path>{" "}
              </g>
            </svg>
          }
          aria-label="sign in with github"
          className="color-white shadow-[0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)] flex w-56 max-w-sm cursor-pointer items-center  rounded-lg border-none bg-[#181717] px-2 py-6 text-center text-step--3"
          onClick={() => signInWithGithub()}
        >
          <p className="text-white">Sign in with Github</p>
        </Button> */}
      </div>

      <span className="my-2 mb-4 h-[0.125rem] w-3/4 rounded-md bg-grey dark:bg-white"></span>

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
        <Controller
          control={control}
          name="acceptTerms"
          defaultValue={false}
          rules={{ required: true }}
          render={({ field }) => (
            <div className=" flex flex-col items-start gap-2">
              <div className="flex flex-row items-center gap-3">
                <Checkbox
                  name="acceptTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />

                <label
                  htmlFor="acceptTerms"
                  className={`text-step--4 font-medium ${
                    errors.acceptTerms ? "text-red-500" : ""
                  }`}
                >
                  Accept terms and conditions
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-step--4 text-red">
                  {errors.acceptTerms.message}
                </p>
              )}
              <p className="text-step--4 opacity-90">
                You agree to our{" "}
                <Link
                  href="https://mixiecooking.com/info/terms_service"
                  target="_blank"
                  className="text-[#188FA7] underline underline-offset-2"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="https://mixiecooking.com/info/privacy_policy"
                  target="_blank"
                  className="text-[#188FA7] underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          )}
        />
        <Button
          type="submit"
          aria-label="Log into Mixie"
          className="mx-auto w-full"
        >
          Log in
        </Button>
      </form>
    </>
  );
};

export default LoginPage;
