import { CardRecipe, SearchCard } from "@/components/cards";
import { getUsers } from "@/lib/services/data_fetching";
import { constructMetadata } from "@/lib/utils/";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { User } from "@supabase/supabase-js";
import { Heart, Pencil, ScrollText } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface ProfilePageProps {
  params: {
    userId: string;
  };
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata | undefined> {
  const supabase = createClient();
  const { data: user } = await supabase
    .from("profiles")
    .select()
    .eq("profile_id", params.userId)
    .single();
  if (!user) return constructMetadata();

  return constructMetadata({
    title: `${user?.full_name}'s profile` || "",
    url: `https://www.mixiecooking.com/${user?.profile_id}`,
    description: `${user?.full_name}'s profile` || "",
    image: user?.full_name || undefined,
  });
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const signedInUser = await getUser();
  const supabase = createClient();
  const { data: user } = await supabase
    .from("profiles")
    .select()
    .eq("profile_id", params.userId)
    .single();

  const { data: gotRecipes } = await supabase
    .from("recipes")
    .select(
      `recipe_id, id, title, image_url, image_attributes, total_time, keywords`
    )
    .eq("public", true)
    .eq("created_by", params.userId);

  if (user) {
    return (
      <>
        <div className="m-auto mt-4 flex flex-col items-center justify-center rounded-xl bg-white p-1 shadow-main sm:w-full md:w-3/5 lg:h-80 dark:bg-grey dark:shadow-none">
          <Image
            src={user.profile_picture || "/images/placeholder.webp"}
            alt={user.full_name || "default-profile"}
            width={100}
            height={100}
            priority
            className="m-auto h-24 w-24 rounded-full lg:h-48 lg:w-48"
          />
          <h1 className="text-center text-step0">{user.full_name}</h1>
          <h2 className="text-step-1 text-center">{user.user_name}</h2>
          {signedInUser &&
            signedInUser.id == user.profile_id &&
            signedInUser.id == params.userId && (
              <span className="mt-4 flex flex-row gap-4">
                <Link
                  href={`/${user.profile_id}/settings`}
                  className="text-step-2 flex flex-row items-center gap-2 text-center underline underline-offset-2"
                >
                  <Pencil className="h-4 w-4" /> Edit Profile
                </Link>
                <Link
                  href={`/${user.profile_id}/drafts`}
                  className="text-step-2 flex flex-row items-center gap-2 text-center underline underline-offset-2"
                >
                  <ScrollText className="h-4 w-4" /> Drafts
                </Link>

                <Link
                  href={`/${user.profile_id}/bookmarks`}
                  className="text-step-2 flex flex-row items-center gap-2 text-center underline underline-offset-2"
                >
                  <Heart className="h-4 w-4" /> Bookmarks
                </Link>
              </span>
            )}
        </div>

        <div className="mt-4">
          <h1 className="mb-2 text-center text-step0">Recipes</h1>
          <ul className="flex flex-row flex-wrap justify-center gap-4">
            {gotRecipes &&
              gotRecipes.map((recipe, index) => {
                return (
                  <SearchCard
                    as="li"
                    key={index}
                    recipe={recipe as CardRecipe}
                  />
                );
              })}
          </ul>
        </div>
      </>
    );
  }
}
