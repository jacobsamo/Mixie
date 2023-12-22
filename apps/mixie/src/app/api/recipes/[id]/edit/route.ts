import { db } from "@db/index";
import { info, recipes } from "@db/schemas";
import { NewInfo, NewPartialRecipe } from "@db/types";
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

    const isPublic = recipe?.info?.isPublic || false;
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
      recipe.info && recipe.info.prep && recipe?.info.cook
        ? await calculateTotalTime(recipe.info.prep, recipe.info.cook)
        : null;

    // update info table
    const newInfo: NewInfo = {
      ...recipe.info,
      recipeId: recipe.uid,
      id: id,
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
      isPublic: isPublic,
    };
    await db.update(info).set(newInfo).where(eq(info.recipeId, recipe.uid));

    // remove the info from the recipe as it's been set on another table
    delete recipe.info;

    // define the new recipe
    const newRecipe: NewPartialRecipe = {
      ...recipe,
      id: id,
      isPublic: isPublic,
      // steps: steps,
      lastUpdatedBy: user.id,
      lastUpdatedByName: user.name! || "",
    };

    const setRecipe = await db
      .update(recipes)
      .set(newRecipe)
      .where(eq(recipes.uid, recipe.uid));

    console.log(`Edited recipe ${newRecipe.uid}`, {
      message: `Recipe successfully edited, ${setRecipe}`,
      recipe: newRecipe,
      info: newInfo,
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
