import RecipePageComponent from '@components/templates/RecipePage/RecipePageComponent';
import React from 'react';
import { mockRecipe } from '@/src/common/lib/services/data';
import { db } from '@/src/db';
import { recipes } from '@/src/db/schemas';
import { eq, or } from 'drizzle-orm';
import RecipeService from '@/src/common/lib/services/RecipeService';
import type { Recipe } from '@/src/db/types';

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await db.query.recipes.findMany({
    where: or(eq(recipes.id, params.id), eq(recipes.uid, params.id)),
    with: {
      info: true,
    },
  });

  return <RecipePageComponent recipe={recipe[0] as Recipe} />;
}
