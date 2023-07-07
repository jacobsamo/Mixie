import RecipeForm from '@/src/common/components/templates/RecipeForm/RecipeForm';
import { db } from '@/src/db';
import { recipes } from '@/src/db/schemas';
import { Recipe } from '@/src/db/types';
import { eq } from 'drizzle-orm';
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
  // const recipe = await db
  //   .select()
  //   .from(recipes)
  //   .where(eq(recipes.id, params.id));
  return <RecipeForm />;
}
