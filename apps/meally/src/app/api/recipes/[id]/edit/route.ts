import { calculateTotalTime, recipeId } from "@/src/common/lib/utils";
import { db } from "@/src/db";
import { authOptions } from "@/src/db/next-auth-adapter";
import { recipes, info } from "@/src/db/schemas";
import { NewPartialRecipe, NewInfo } from "@/src/db/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { recipeFormSchema } from "@/src/db/zodSchemas";
import { eq } from "drizzle-orm";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }
  const { user } = session;

  const json = await req.json();
  json.createdAt = new Date(json.createdAt);
  json.lastUpdated = new Date(json.lastUpdated);
  json.info.createdAt = new Date(json.info.createdAt);
  json.info.lastUpdated = new Date(json.info.lastUpdated);
  const recipe = recipeFormSchema.parse(json);

  // get all ingredients and set them to the info, only include ingredients that have isHeading set to false

  const ingredients = recipe?.ingredients
    ?.filter((ingredient) => !ingredient.isHeading && ingredient.title)
    .map((ingredient) => ingredient.title);

  // create the json schema for the steps
  const steps = recipe?.steps?.map((step) => {
    return step;
  });

  const totalTime =
    recipe.info && recipe.info.prep && recipe?.info.cook
      ? await calculateTotalTime(recipe.info.prep, recipe.info.cook)
      : null;

  // update info table
  const newInfo: NewInfo = {
    ...recipe.info,
    recipeId: recipe.uid,
    id: recipeId(recipe.title) || recipe.id,
    title: recipe.title,
    keywords: recipe?.info?.keywords || null,
    ingredients: ingredients || null,
    prep: recipe?.info?.prep || null,
    cook: recipe?.info?.cook || null,
    total: totalTime,
    createByName: recipe.info?.createByName || "",
    createdBy: recipe.info?.createdBy || user.id,
    lastUpdatedBy: user.id,
    lastUpdatedByName: user.name! || "",
  };
  await db.update(info).set(newInfo).where(eq(info.recipeId, recipe.uid));

  // remove the info from the recipe as it's been set on another table
  delete recipe.info;

  // define the new recipe

  const newRecipe: NewPartialRecipe = {
    ...recipe,
    // id: ,
    id: recipeId(recipe.title) || recipe.id,
    steps: steps,
    lastUpdatedBy: user.id,
    lastUpdatedByName: user.name! || "",
  };

  const setRecipe = await db
    .update(recipes)
    .set(newRecipe)
    .where(eq(recipes.uid, recipe.uid));

  console.log("Created Recipe", {
    message: `Recipe successfully created, ${setRecipe}`,
    recipe: newRecipe,
    info: newInfo,
  });
  return NextResponse.json(
    { message: `Recipe successfully created, ${setRecipe}`, recipe: newRecipe },
    {
      status: 200,
    }
  );
}
