import { authOptions } from '@/src/db/next-auth-adapter';
import { getServerSession } from 'next-auth';
import { db } from '@/src/db';
import { eq, or } from 'drizzle-orm';
import { info, users } from '@/src/db/schemas';
import { Info, User } from '@/src/db/types';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { SearchCard } from '@/src/common/components/elements/Cards';
import { PenLine, Pencil, ScrollText } from 'lucide-react';

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
        <div className="flex flex-col items-center justify-center sm:w-full md:w-3/5 m-auto dark:bg-grey dark:shadow-none shadow-main bg-white lg:h-80 rounded-xl mt-4 p-1">
          <Image
            src={user.image || '/images/default-profile.png'}
            alt={user.name || 'default-profile'}
            width={100}
            height={100}
            priority
            className="rounded-full w-24 h-24 lg:w-48 lg:h-48 m-auto"
          />
          <h1 className="text-step0 text-center">{user.name}</h1>
          <h2 className="text-step-1 text-center">{user.id}</h2>
          {session?.user.id == user.id && (
            <span className="flex flex-row gap-4 mt-4">
              <Link
                href={`/${user.id}/settings`}
                className="flex items-center flex-row gap-2 text-step-2 text-center underline underline-offset-1"
              >
                <Pencil className="w-4 h-4" /> Edit Profile
              </Link>
              <Link
                href={`/${user.id}/drafts`}
                className="flex items-center flex-row gap-2 text-step-2 text-center underline underline-offset-1"
              >
                <ScrollText className="w-4 h-4" /> Drafts
              </Link>
            </span>
          )}
        </div>

        <div className="mt-4">
          <h1 className="text-step0 text-center mb-2">Recipes</h1>
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
