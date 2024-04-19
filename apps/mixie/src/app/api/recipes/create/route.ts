import {
  convertIngredients,
  getRecipeJsonLd,
  splitTime,
} from "@/lib/services/recipeJsonLDParsing";
import { recipeId } from "@/lib/utils";
import { getUser } from "@/lib/utils/getUser";
import db from "@/server/db/index";
import { recipes } from "@/server/db/schemas";
import { NewRecipe } from "@/types";
import { Recipe, createRecipeSchema } from "@/types";
import { eq, or } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

export async function POST(req: NextRequest) {
  try {
    const session = await getUser();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const json = await req.json();
    const { title, link } = createRecipeSchema.parse(json);

    // set global variables
    const { user } = session;
    const uid = uuidv4();
    let newRecipe: NewRecipe | null = null;

    if (title && !link) {
      const id = recipeId(title);

      const newTitle = title.charAt(0).toUpperCase() + title.slice(1);

      // the recipe itself
      newRecipe = {
        uid: uid,
        id,
        title: newTitle,
        createdBy: user.id,
        isPublic: false,
      };
    }

    if (link) {
      if (link.includes("mixiecooking.com")) {
        // split a mixie link to get the recipe id this id would be after /recipes/<recipeId> a recipe link might look like this: https://mixiecooking.com/recipes/5f9b1b5e-5b1a-4b9e-9b9e-9b9e9b9e9b9e
        const recipeId = link.split("/").pop();
        if (!recipeId) return NextResponse.json(null, { status: 404 });
        const findRecipe = await db
          .select()
          .from(recipes)
          .where(or(eq(recipes.id, recipeId), eq(recipes.uid, recipeId)));

        if (!findRecipe) {
          return NextResponse.json(null, { status: 404 });
        }

        newRecipe = {
          ...(findRecipe[0] as Recipe),
          uid: uid,
        };
      }

      // parse the recipe
      const recipe = await getRecipeJsonLd(link);
      const ingredients = await convertIngredients(recipe.recipeIngredient);

      if (!recipe)
        return NextResponse.json(
          { message: `No recipe found at ${link}` },
          {
            status: 404,
          }
        );

      newRecipe = {
        uid: uid,
        id: recipeId(recipe.name),
        title: recipe.name,
        description: recipe.description.replace(/<[^>]*>?/gm, "") || null,
        isPublic: false,
        steps:
          recipe.recipeInstructions.map((step: string) => {
            return { step_body: step };
          }) || null,
        ingredients: ingredients,
        source: link,
        cook: splitTime(recipe.cookTime),
        prep: splitTime(recipe.prepTime),
        total: splitTime(recipe.totalTime),
        rating: recipe.aggregateRating?.ratingValue || null,
        serves: recipe.recipeYield || null,
        imageUrl: recipe.image.url || null,
        imageAttributes: recipe.image.alt || recipe.name || "recipe image",
        keywords: recipe.keywords.split(",").map((keyword: string) => {
          return { value: keyword };
        }),
        ingredientsList: ingredients.map((ingredient) => ingredient.title),
        createdBy: user.id,
      };
    }

    if (!newRecipe)
      return NextResponse.json(
        { message: "Error could not create recipe" },
        { status: 404 }
      );

    await db.insert(recipes).values(newRecipe);

    console.log(`Created recipe by link: ${uid}`, {
      message: `Recipe successfully created`,
      recipe: newRecipe,
    });

    return NextResponse.json(
      { message: `Recipe successfully created using link`, id: uid },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error on /recipes/create", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
