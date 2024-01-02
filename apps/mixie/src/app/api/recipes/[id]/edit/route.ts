import { db } from "@db/index";
import { recipes } from "@db/schemas";
import { NewRecipe } from "@db/types";
import { recipeFormSchema } from "@db/zodSchemas";
import { calculateTotalTime, recipeId } from "@lib/utils";
import { getServerAuthSession } from "@server/auth";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { user } = session;

    const json = await req.json();
    json.createdAt = new Date(json.createdAt);
    json.lastUpdated = new Date(json.lastUpdated);
    json.info.createdAt = new Date(json.info.createdAt);
    json.info.lastUpdated = new Date(json.info.lastUpdated);
    const recipe = recipeFormSchema.parse(json);

    const id = recipeId(recipe.title) || recipe.id;

    // get all ingredients and set them to the info, only include ingredients that have isHeading set to false

    const ingredients = recipe?.ingredients
      ?.filter((ingredient) => !ingredient.isHeading && ingredient.title)
      .map((ingredient) => {
        ingredient.title =
          ingredient.title.charAt(0).toUpperCase() + ingredient.title.slice(1);

        return ingredient.title;
      });

    // create the json schema for the steps
    const steps = recipe?.steps?.map((step) => {
      return step;
    });

    const totalTime =
      recipe && recipe.prep && recipe?.cook
        ? await calculateTotalTime(recipe.prep, recipe.cook)
        : null;

    const title = recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1);

    // define the new recipe
    const newRecipe: NewRecipe = {
      ...recipe,
      id: id,
      title: title,
    };

    const setRecipe = await db
      .update(recipes)
      .set(newRecipe)
      .where(eq(recipes.uid, recipe.uid));

    console.log(`Edited recipe ${newRecipe.uid}`, {
      message: `Recipe successfully edited, ${setRecipe}`,
      recipe: newRecipe,
    });

    return NextResponse.json(
      {
        message: `Recipe successfully edited, ${setRecipe}`,
        recipe: newRecipe,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error on /recipes/[id]/edit", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
