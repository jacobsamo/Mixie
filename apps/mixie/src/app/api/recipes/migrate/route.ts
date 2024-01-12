import { isApp } from "@/lib/services/apiMiddleware";
import { db } from "@/server/db";
import { recipes } from "@/server/db/schemas";
import { Recipe } from "@/types";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    {
      message:
        "Only used in development for migrating data to the latest versions",
    },
    { status: 404 }
  );
  // try {
  //   const json = await req.json();

  //   console.log("Json: ", json);

  //   let newRecipes: Recipe[] = [];

  //   json.map(async (recipe: any) => {
  //     const newRecipe: Recipe = {
  //       uid: recipe.uid,
  //       id: recipe.id,
  //       title: recipe.title,
  //       description: recipe.description,
  //       notes: recipe.notes,
  //       steps: recipe.steps,
  //       ingredients: recipe.ingredients,
  //       mealTime: recipe.mealTime,
  //       version: recipe.version,
  //       source: recipe.source,
  //       dietary: recipe.dietary,
  //       allergens: recipe.allergens,
  //       sweet_savoury: recipe.sweet_savoury.value ?? null,
  //       difficulty_level: recipe.difficulty_level,
  //       isPublic: recipe.isPublic,

  //       // transform info
  //       imageUrl: recipe.info.imgUrl,
  //       imageAttributes: { alt: recipe.info.imgAlt },
  //       total: recipe.info.total,
  //       prep: recipe.info.prep,
  //       cook: recipe.info.cook,
  //       serves: recipe.info.serves,
  //       keywords: recipe.info.keywords,
  //       ingredientsList: recipe.info.ingredients,
  //       createdBy: recipe.info.createdBy,
  //       rating: recipe.info.rating,
  //     };
  //     newRecipes.push(newRecipe);
  //     console.log(newRecipe);
  //     await db.insert(recipes).values(newRecipe);
  //   });

  //   return NextResponse.json(newRecipes);
  // } catch (error) {
  //   console.error("Error on /recipes/create", error);
  //   if (error instanceof z.ZodError) {
  //     return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
  //   }

  //   return NextResponse.json(null, { status: 500 });
  // }
}
