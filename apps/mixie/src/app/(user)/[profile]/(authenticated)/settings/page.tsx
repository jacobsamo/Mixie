"use client";
import { env } from "env";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { User } from "@/types";
import { userSchema } from "@/types/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const Profile = dynamic(() => import("@/components/layouts/Settings/Profile"));
const Customization = dynamic(
  () => import("@/components/layouts/Settings/Customization")
);
const Account = dynamic(() => import("@/components/layouts/Settings/Account"));

interface ProfilePageProps {
  params: {
    profile: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const searchParams = useSearchParams();
  const activeLink = searchParams.get("activeLink") || "profile";
  const [loading, setLoading] = useState(false);

  const methods = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: async () => {
      const res = await fetch(`/api/users/${params.profile}`, {
        headers: {
          authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
      });
      const user = (await res.json()) as User;
      if (user.emailVerified) user.emailVerified = new Date(user.emailVerified);
      return user;
    },
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (errors)
      console.log("Errors: ", {
        errors: errors,
        values: getValues(),
      });
  }, [errors]);

  const onSubmit: SubmitHandler<User> = (data) => {
    setLoading(true);

    const updateUser = fetch(`/api/users/${params.profile}/updateUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    toast.promise(updateUser, {
      loading: "Updating profile...",
      success: "Profile updated successfully",
      error: (err) => {
        console.error(err);
        return "Error while updating profile";
      },
    });

    setLoading(false);
  };

  const values = getValues();
  return (
    <>
      <FormProvider {...methods}>
        <form
          className="mx-auto mt-2 flex w-full flex-col items-start  justify-center  gap-4 rounded-md bg-white p-2 shadow-main  md:w-2/4 md:p-4 dark:bg-grey"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!values.email && (
            <Loader2 className="m-auto h-16 w-16 animate-spin" />
          )}
          {values.email && (
            <>
              {activeLink === "profile" && <Profile />}

              {activeLink === "customization" && <Customization />}

              {activeLink === "account" && <Account />}

              <Button
                type="submit"
                variant="primary"
                aria-label="Save profile changes"
                className="m-auto mt-12"
                disabled={loading}
              >
                Save
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </Button>
            </>
          )}
        </form>
      </FormProvider>
    </>
  );
}
