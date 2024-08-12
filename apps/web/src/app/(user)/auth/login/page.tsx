"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@mixie/supabase/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const emailForm = z.object({
  email: z.string().email(),
  acceptTerms: z.boolean().refine((data) => data === true, {
    message: "You must accept the terms and conditions to continue",
  }),
});

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof emailForm>>({
    resolver: zodResolver(emailForm),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = form;
  const router = useRouter();
  const supabase = createClient();

  const onSubmit: SubmitHandler<z.infer<typeof emailForm>> = async (data) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: false,
      },
    });

    if (error) {
      setError("email", { message: `Failed to login, ${error.message}` });
      toast.error(`Failed to login, ${error.message}`);
      return;
    }
    router.push(
      "/auth/verify?" + new URLSearchParams({ email: data.email }).toString()
    );

    setLoading(false);
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (!error) {
      posthog.capture("user_signed_in_with_google");
    }
  };

  return (
    <>
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
      </div>

      <span className="my-2 mb-4 h-[0.125rem] w-3/4 rounded-md bg-grey dark:bg-white"></span>

      <Form {...form}>
        <form
          className="flex w-2/3 flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="acceptTerms"
            defaultValue={false}
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col items-start gap-2">
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
                        className="text-yellow underline underline-offset-2"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="https://mixiecooking.com/info/privacy_policy"
                        target="_blank"
                        className="text-yellow underline underline-offset-2"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            aria-label="Log into Mixie"
            className="mx-auto w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Sending Auth Code...
              </>
            ) : (
              "  Log in"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginPage;
