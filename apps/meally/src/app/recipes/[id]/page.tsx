import RecipePageComponent from '@components/templates/RecipePage/RecipePageComponent';
import React from 'react';
import { mockRecipe } from '@/src/common/lib/services/data';
import { db } from '@/src/db';
import { recipes } from '@/src/db/schemas';
import { eq } from 'drizzle-orm';

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  // console.log(params);
  // const recipe = await db
  //   .select()
  //   .from(recipes)
  //   .where(eq(recipes.id, params.id));
  return <RecipePageComponent recipe={mockRecipe} />;
}
