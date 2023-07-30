import RecipeForm from '@/src/common/components/templates/RecipeForm/RecipeForm';
import RecipeService from '@/src/common/lib/services/RecipeService';
import { db } from '@/src/db';
import { recipes } from '@/src/db/schemas';
import { Recipe } from '@/src/db/types';
import { eq, or } from 'drizzle-orm';
import React from 'react';

interface EditPageProps {
  params: {
    id: string;
  };
  searchParams: {
    id: string;
  };
}

export default async function EditPage({ params, searchParams }) {
  // TODO: get this query to work properly to get the recipe with the right types
  const recipe = await db.query.recipes.findMany({
    where: or(eq(recipes.id, params.id), eq(recipes.uid, params.id)),
    with: {
      info: true,
      // ingredients: true,
      // ratings: true,
    },
  });

  if (recipe) {
    return <RecipeForm recipe={recipe[0]} />;
  }

  return <div>Recipe not found</div>;
  // return <RecipeForm />
}
