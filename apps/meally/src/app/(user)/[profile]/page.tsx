import { SearchCard } from "@components/elements/Cards";
import { constructMetadata } from "@lib/utils/";
import { db } from "@db/index";
import { getServerAuthSession } from "@server/auth";
import { info, users } from "@db/schemas";
import { Info, User } from "@db/types";
import { and, eq, or } from "drizzle-orm";
import { Heart, Pencil, ScrollText } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { unstable_cache } from "next/cache";

export const revalidate = 3600;

interface ProfilePageProps {
  params: {
    profile: string;
  };
}

const getUsers = unstable_cache(
  async () => {
    const users = await db.query.users.findMany();
    return users;
  },
  ["users"],
  {
    revalidate: 3600,
  }
);

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata | undefined> {
  const users = await getUsers();
  const user = users?.find((user) => {
    user.id == params.profile;
  });
  if (!user) {
    return;
  }

  return constructMetadata({
    title: `${user.name} profile` || "",
    description: undefined,
    image: user.image || undefined,
  });
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const session = await getServerAuthSession();

  const users = await getUsers();
  const user = users?.find((user) => user.id == params.profile);

  const gotRecipes = await db.query.info.findMany({
    where: and(
      eq(info.isPublic, true),
      or(
        eq(info.createdBy, params.profile),
        eq(info.lastUpdatedBy, params.profile)
      )
    ),
  })

  if (user) {
    return (
      <main className="h-full w-full">
        <div className="m-auto mt-4 flex flex-col items-center justify-center rounded-xl bg-white p-1 shadow-main dark:bg-grey dark:shadow-none sm:w-full md:w-3/5 lg:h-80">
          <Image
            src={user.image || "/images/placeholder.webp"}
            alt={user.name || "default-profile"}
            width={100}
            height={100}
            priority
            className="m-auto h-24 w-24 rounded-full lg:h-48 lg:w-48"
          />
          <h1 className="text-center text-step0">{user.name}</h1>
          <h2 className="text-step-1 text-center">{user.userName}</h2>
          {session?.user.id == user.id && session.user.id == params.profile && (
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
      </main>
    );
  }
}
