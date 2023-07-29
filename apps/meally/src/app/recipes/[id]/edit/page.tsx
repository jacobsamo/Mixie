import RecipeForm from '@/src/common/components/templates/RecipeForm/RecipeForm';
import RecipeService from '@/src/common/lib/services/RecipeService';
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
  const recipe = await RecipeService.getRecipeById(params.id);

  if (recipe) {
    return <RecipeForm recipe={recipe[0]} />;
  }

  return <div>Recipe not found</div>;
  // return <RecipeForm />
}
