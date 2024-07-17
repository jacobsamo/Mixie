"use client";
import { FeedbackButton } from "@/components/open-dialogs";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { env } from "env";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
  // const searchParams = useSearchParams();
  // const activeLink = searchParams.get("activeLink") || "profile";
  // const [loading, setLoading] = useState(false);

  // const methods = useForm<User>({
  //   // resolver: zodResolver(userSchema),
  //   defaultValues: async () => {
  //     const res = await fetch(`/api/users/${params.profile}`, {
  //       headers: {
  //         Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
  //       },
  //     });
  //     const user = await res.json();

  //     if (user.emailVerified) user.emailVerified = new Date(user.emailVerified);
  //     return user as User;
  //   },
  // });

  // const {
  //   handleSubmit,
  //   getValues,
  //   formState: { errors },
  // } = methods;

  // useEffect(() => {
  //   if (errors)
  //     console.log("Errors: ", {
  //       errors: errors,
  //       values: getValues(),
  //     });
  // }, [errors]);

  // const onSubmit: SubmitHandler<User> = (data) => {
  //   setLoading(true);

  //   const updateUser = fetch(`/api/users/${params.profile}/updateUser`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   toast.promise(updateUser, {
  //     loading: "Updating profile...",
  //     success: "Profile updated successfully",
  //     error: (err) => {
  //       console.error(err);
  //       return "Error while updating profile";
  //     },
  //   });

  //   setLoading(false);
  // };

  // const values = getValues();
  // return (
  //   <>
  //     <FormProvider {...methods}>
  //       <form
  //         className="mx-auto mt-2 flex w-full flex-col items-start  justify-center  gap-4 rounded-md bg-white p-2 shadow-main  md:w-2/4 md:p-4 dark:bg-grey"
  //         onSubmit={handleSubmit(onSubmit)}
  //       >
  //         {!values.email && (
  //           <>
  //             <Loader2 className="m-auto h-16 w-16 animate-spin" />
  //             <div className="animate-pulse">
  //               <div className="flex flex-row items-center gap-2">
  //                 <div className="h-24 w-24 rounded-full bg-gray-800 lg:h-48 lg:w-48"></div>
  //                 <div className="flex flex-col gap-2">
  //                   <div className="h-10 w-3/4 rounded bg-gray-800"></div>
  //                   <div className="h-10 w-3/4 rounded bg-gray-800"></div>
  //                 </div>
  //               </div>
  //               <div className="mt-2 h-24 rounded bg-gray-800"></div>
  //             </div>
  //           </>
  //         )}
  //         {values.email && (
  //           <>
  //             {activeLink === "profile" && <Profile />}

  //             {activeLink === "customization" && <Customization />}

  //             {activeLink === "account" && <Account />}

  //             <Button
  //               type="submit"
  //               variant="primary"
  //               aria-label="Save profile changes"
  //               className="m-auto mt-12"
  //               disabled={loading}
  //             >
  //               Save
  //               {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
  //             </Button>
  //           </>
  //         )}
  //         <FeedbackButton className="mx-auto" />
  //       </form>
  //     </FormProvider>
  //   </>
  // );
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Coming back soon</h2>
    </div>
  );
}
