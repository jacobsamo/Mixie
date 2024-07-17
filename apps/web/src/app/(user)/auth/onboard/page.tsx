import OnboardForm from "@/components/layouts/onbaord-form";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@mixie/supabase/server";
import Image from "next/image";

export default async function OnboardingPage() {
  const user = await getUser();
  const supabase = createClient();

  if (!user) {
    return <div>Failed to log in</div>;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("profile_id", user.id)
    .single();

  if (!profile) {
    return <div>Failed to load profile</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <Image
          src="/icons/icon_x128.jpg"
          alt="Logo"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full"
        />
        <h1 className="text-step--1">Customize Your Mixie Profile</h1>

        <OnboardForm profile={profile} />
      </div>
    </div>
  );
}
