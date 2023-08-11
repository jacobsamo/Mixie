import { SearchCard } from '@/src/common/components/elements/Cards';
import useUser from '@/src/common/hooks/useUser';
import { db } from '@/src/db';
import { recipes } from '@/src/db/schemas';
import { Recipe } from '@/src/db/types';
import { eq, or } from 'drizzle-orm';
import React from 'react';

const DraftsPage = async () => {
  const { user } = useUser();

  if (!user) {
    return <h1>No found</h1>;
  }

  const gotRecipes = (await db.query.info.findMany({
    where: or(
      eq(recipes.createdBy, user.id),
      eq(recipes.lastUpdatedBy, user.id)
    ),
  })) as Recipe[];

  return (
    <main>
      <ul>
        {gotRecipes.map((recipe, index) => {
          return <SearchCard key={index} recipe={recipe} />;
        })}
      </ul>
    </main>
  );
};

export default DraftsPage;
