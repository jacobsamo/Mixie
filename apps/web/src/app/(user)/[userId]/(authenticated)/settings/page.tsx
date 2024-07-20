"use client";
import { getUserProfile } from "@/actions/user/get-user-profile";
import { updateUser } from "@/actions/user/update-user";
import OnboardForm from "@/components/layouts/onbaord-form";
import { FeedbackButton } from "@/components/open-dialogs";
import { Button } from "@/components/ui/button";
import { profileEditSchema } from "@/types/zodSchemas/profile";
import { useQuery } from "@tanstack/react-query";
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
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", params.userId],
    queryFn: async () => {
      const user = await getUserProfile({ userId: params.userId });
      return user!.data!;
    },
  });


  return (
    <div className="shadow-main mx-auto mt-2 flex w-full flex-col items-start justify-center gap-4 rounded-md bg-white p-2 dark:bg-grey md:w-2/4 md:p-4">
      {isLoading ? (
        <Loader2 className="m-auto h-16 w-16 animate-spin" />
      ) : (
        <OnboardForm profile={profile!} />
      )}
    </div>
  );
}
