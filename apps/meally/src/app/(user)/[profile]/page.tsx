import { authOptions } from "@/src/db/next-auth-adapter";
import { getServerSession } from "next-auth";
import { db } from "@/src/db";
import { eq, or } from "drizzle-orm";
import { info, users } from "@/src/db/schemas";
import { Info, User } from "@/src/db/types";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { SearchCard } from "@/src/common/components/elements/Cards";
import { PenLine, Pencil, ScrollText } from "lucide-react";

interface ProfilePageProps {
  params: {
    profile: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const session = await getServerSession(authOptions);

  const user = (await db.query.users.findFirst({
    where: eq(users.id, params.profile),
  })) as User;

  const gotRecipes = (await db.query.info.findMany({
    where: or(
      eq(info.createdBy, params.profile),
      eq(info.lastUpdatedBy, params.profile),
      eq(info.isPublic, true)
    ),
  })) as Info[];

  if (user) {
    return (
      <main>
        <div className="m-auto mt-4 flex flex-col items-center justify-center rounded-xl bg-white p-1 shadow-main dark:bg-grey dark:shadow-none sm:w-full md:w-3/5 lg:h-80">
          <Image
            src={user.image || "/images/default-profile.png"}
            alt={user.name || "default-profile"}
            width={100}
            height={100}
            priority
            className="m-auto h-24 w-24 rounded-full lg:h-48 lg:w-48"
          />
          <h1 className="text-center text-step0">{user.name}</h1>
          <h2 className="text-step-1 text-center">{user.id}</h2>
          {session?.user.id == user.id && (
            <span className="mt-4 flex flex-row gap-4">
              <Link
                href={`/${user.id}/settings`}
                className="text-step-2 flex flex-row items-center gap-2 text-center underline underline-offset-1"
              >
                <Pencil className="h-4 w-4" /> Edit Profile
              </Link>
              <Link
                href={`/${user.id}/drafts`}
                className="text-step-2 flex flex-row items-center gap-2 text-center underline underline-offset-1"
              >
                <ScrollText className="h-4 w-4" /> Drafts
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
