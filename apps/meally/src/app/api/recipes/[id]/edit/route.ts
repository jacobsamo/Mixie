import { recipeId } from '@/src/common/lib/utils';
import { db } from '@/src/db';
import { authOptions } from '@/src/db/next-auth-adapter';
import { ingredients, recipes, info } from '@/src/db/schemas';
import { NewIngredient, NewRecipe, NewPartialRecipe } from '@/src/db/types';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import * as z from 'zod';
import { recipeFormSchema, insertRecipeSchema } from '@/src/db/zodSchemas';
import { eq } from 'drizzle-orm';

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json('Unauthorized', { status: 403 });
  }
  const { user } = session;

  const json = await req.json();
  json.createdAt = new Date(json.createdAt);
  json.lastUpdated = new Date(json.lastUpdated);
  // console.log('Recipe sent to server: ', json);
  const recipe = recipeFormSchema.parse(json);

  // set all the ingredients to have the recipeId & set in their table
  // loop over each ingredient and set the recipeId to the recipe.uid and insert those values into the database
  if (recipe?.ingredients) {
    const newIngredients: NewIngredient[] = recipe.ingredients.map(
      (ingredient) => {
        return {
          ...ingredient,
          recipeId: recipe.uid,
        };
      }
    );
    console.log('Ingredients: ', newIngredients);
    await db
      .insert(ingredients)
      .values(newIngredients)
      .onDuplicateKeyUpdate({ set: { recipeId: recipe.uid } });
  }

  console.log('Ingredients table updated');

  // create the json schema for the steps
  const steps = recipe?.steps?.map((step) => {
    return step;
  });

  // update info table
  const newInfo = {
    recipeId: recipe.uid,
    prep: recipe?.info?.prep || null,
    cook: recipe?.info?.cook || null,
    total: recipe?.info?.total || null,
  };
  console.log('Info: ', newInfo);
  await db
    .insert(info)
    .values(newInfo)
    .onDuplicateKeyUpdate({
      set: {
        recipeId: recipe.uid,
        serves: recipe?.info?.serves || null,
        prep: recipe?.info?.prep || null,
        cook: recipe?.info?.cook || null,
        total: recipe?.info?.total || null,
      },
    });
  console.log('Info table updated');

  // remove values that are not needed in the recipe table but needed in other tables
  delete recipe?.ingredients;
  delete recipe?.info;
  console.log('Recipe now: ', recipe);

  // define the new recipe
  console.log('Start creating new recipe');
  const newRecipe: NewPartialRecipe = {
    ...recipe,
    // id: ,
    id: recipeId(recipe.title) || recipe.id,
    steps: steps,
    createdBy: user.id,
    lastUpdatedBy: user.id,
  };
  console.log('new recipe being set: ', newRecipe);

  const setRecipe = await db
    .update(recipes)
    .set(newRecipe)
    .where(eq(recipes.uid, recipe.uid));
  console.log('Created Recipe', setRecipe);
  return NextResponse.json(
    { message: `Recipe successfully created, ${setRecipe}`, recipe: newRecipe },
    {
      status: 200,
    }
  );
}
