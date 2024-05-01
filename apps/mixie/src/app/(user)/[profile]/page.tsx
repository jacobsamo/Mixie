import { SearchCard } from "@/components/cards";
import { getUsers } from "@/lib/services/data_fetching";
import { constructMetadata } from "@/lib/utils/";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { User } from "@supabase/supabase-js";
import { and, eq } from "drizzle-orm";
import { Heart, Pencil, ScrollText } from "lucide-react";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";

interface ProfilePageProps {
  params: {
    profile: string;
  };
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata | undefined> {
  const users = await getUsers();
  if (!users) return constructMetadata();

  const user = users.find((user: User) => {
    user.id == params.profile;
  });

  return constructMetadata({
    title: `${user?.user_metadata.name.name}'s profile` || "",
    url: `https://www.mixiecooking.com/${user?.id}`,
    description: `${user?.user_metadata.name.name}'s profile` || "",
    image: user?.user_metadata.name.name || undefined,
  });
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const signedInUser = await getUser();

  const users = await getUsers();
  const user = users?.find((user: User) => user.id == params.profile);
  const supabase = createClient();
  // const gotRecipes = await db
  //   .select()
  //   .from(recipes)
  //   .where(
  //     and(eq(recipes.isPublic, true), eq(recipes.created_by, params.profile))
  //   );
  const gotRecipes = await supabase
    .from("recipes")
    .select()
    .eq("public", true)
    .eq("created_at", params.profile);

  if (user) {
    return (
      <>
        <div className="m-auto mt-4 flex flex-col items-center justify-center rounded-xl bg-white p-1 shadow-main sm:w-full md:w-3/5 lg:h-80 dark:bg-grey dark:shadow-none">
          <Image
            src={user.user_metadata.name.image || "/images/placeholder.webp"}
            alt={user.user_metadata.name.name || "default-profile"}
            width={100}
            height={100}
            priority
            className="m-auto h-24 w-24 rounded-full lg:h-48 lg:w-48"
          />
          <h1 className="text-center text-step0">
            {user.user_metadata.name.name}
          </h1>
          <h2 className="text-step-1 text-center">
            {user.user_metadata.name.name}
          </h2>
          {signedInUser.id == user.id && signedInUser.id == params.profile && (
            <span className="mt-4 flex flex-row gap-4">
              <Link
                href={`/${user.id}/settings`}
                className="text-step-2 flex flex-row items-center gap-2 text-center underline underline-offset-2"
              >
                <Pencil className="h-4 w-4" /> Edit Profile
              </Link>
              <Link
                href={`/${user.id}/drafts`}
                className="text-step-2 flex flex-row items-center gap-2 text-center underline underline-offset-2"
              >
                <ScrollText className="h-4 w-4" /> Drafts
              </Link>

              <Link
                href={`/${user.id}/bookmarks`}
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
            {gotRecipes.map((recipe, index) => {
              return <SearchCard as="li" key={index} recipe={recipe} />;
            })}
          </ul>
        </div>
      </>
    );
  }
}
