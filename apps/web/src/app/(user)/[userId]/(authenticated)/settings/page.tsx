"use client";
import { getUserProfile } from "@/actions/user/get-user-profile";
import { updateUser } from "@/actions/user/update-user";
import { FeedbackButton } from "@/components/open-dialogs";
import { Button } from "@/components/ui/button";
import { profileEditSchema } from "@/types/zodSchemas/profile";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const Profile = dynamic(
  () => import("@/components/layouts/user-settings/Profile")
);
const Customization = dynamic(
  () => import("@/components/layouts/user-settings/Customization")
);
const Account = dynamic(
  () => import("@/components/layouts/user-settings/Account")
);

interface ProfilePageProps {
  params: {
    userId: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeLink = searchParams.get("activeLink") || "profile";
  const [loading, setLoading] = useState(false);

  const methods = useForm<z.infer<typeof profileEditSchema>>({
    // resolver: zodResolver(userSchema),
    defaultValues: async () => {
      const user = await getUserProfile({ userId: params.userId });

      if (!user || user.data == undefined) {
        router.push("/404");
        return {} as z.infer<typeof profileEditSchema>;
      }

      return user.data;
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

  const onSubmit: SubmitHandler<z.infer<typeof profileEditSchema>> = async (
    data
  ) => {
    setLoading(true);

    const update = await updateUser(data);

    if (update?.serverError || update?.validationErrors) {
      toast.error("Error while updating profile");
    }

    toast.success("Profile updated successfully");

    setLoading(false);
  };

  const values = getValues();
  return (
    <>
      <FormProvider {...methods}>
        <form
          className="shadow-main mx-auto mt-2 flex w-full flex-col items-start justify-center gap-4 rounded-md bg-white p-2 dark:bg-grey md:w-2/4 md:p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!values.email && (
            <>
              <Loader2 className="m-auto h-16 w-16 animate-spin" />
              <div className="animate-pulse">
                <div className="flex flex-row items-center gap-2">
                  <div className="h-24 w-24 rounded-full bg-gray-800 lg:h-48 lg:w-48"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-10 w-3/4 rounded bg-gray-800"></div>
                    <div className="h-10 w-3/4 rounded bg-gray-800"></div>
                  </div>
                </div>
                <div className="mt-2 h-24 rounded bg-gray-800"></div>
              </div>
            </>
          )}
          {values.email && (
            <>
              {activeLink === "profile" && <Profile />}

              {activeLink === "customization" && <Customization />}

              {activeLink === "account" && <Account />}

              <Button
                type="submit"
                aria-label="Save profile changes"
                className="m-auto mt-12"
                disabled={loading}
              >
                Save
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </Button>
            </>
          )}
          <FeedbackButton className="mx-auto" />
        </form>
      </FormProvider>
    </>
  );
}
