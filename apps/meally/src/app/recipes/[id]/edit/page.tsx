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
  const recipe = (await db.query.recipes.findFirst({
    where: or(eq(recipes.id, params.id), eq(recipes.uid, params.id)),
    with: {
      info: true,
    },
  })) as Recipe;

  if (recipe) {
    return <RecipeForm recipe={recipe} />;
  }

  return <div>Recipe not found</div>;
  // return <RecipeForm />
}
