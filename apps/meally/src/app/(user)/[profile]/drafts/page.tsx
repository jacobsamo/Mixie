import { SearchCard } from '@/src/common/components/elements/Cards';
import useUser from '@/src/common/hooks/useUser';
import { db } from '@/src/db';
import { authOptions } from '@/src/db/next-auth-adapter';
import { recipes } from '@/src/db/schemas';
import { Info, Recipe } from '@/src/db/types';
import { eq, or } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';

const DraftsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <h1>No found</h1>;
  }

  const gotRecipes = (await db.query.info.findMany({
    where: or(
      eq(recipes.createdBy, session.user.id),
      eq(recipes.lastUpdatedBy, session.user.id)
    ),
  })) as Info[];

  return (
    <main>
      <ul>
        {gotRecipes.map((recipe, index) => {
          return (
            <SearchCard as="div" edit={true} key={index} recipe={recipe} />
          );
        })}
      </ul>
    </main>
  );
};

export default DraftsPage;
