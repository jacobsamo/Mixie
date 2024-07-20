"use client";
import { getUserProfile } from "@/actions/user/get-user-profile";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const OnboardForm = dynamic(() => import("@/components/layouts/onbaord-form"));

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
