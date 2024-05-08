import {
  convertIngredients,
  getRecipeJsonLd,
  splitTime,
} from "@/lib/services/recipeJsonLDParsing";
import { recipe_id } from "@/lib/utils";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { NewRecipe, Recipe, createRecipeSchema } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const json = await req.json();
    const { title, link } = createRecipeSchema.parse(json);
    const supabase = createClient();

    // set global variables
    let newRecipe: NewRecipe | null = null;

    if (title && !link) {
      const id = recipe_id(title);

      const newTitle = title.charAt(0).toUpperCase() + title.slice(1);

      // the recipe itself
      newRecipe = {
        id,
        title: newTitle,
        created_by: user.id,
        public: false,
        version: "1.0",
      };
    }

    if (link) {
      if (link.includes("mixiecooking.com")) {
        // split a mixie link to get the recipe id this id would be after /recipes/<recipe_id> a recipe link might look like this: https://mixiecooking.com/recipes/5f9b1b5e-5b1a-4b9e-9b9e-9b9e9b9e9b9e
        const recipe_id = link.split("/").pop();
        if (!recipe_id) return NextResponse.json(null, { status: 404 });

        const findRecipe = await supabase
          .from("recipes")
          .select()
          .or(`id.eq.${recipe_id},recipe_id.eq.${recipe_id}`);

        if (!findRecipe) {
          return NextResponse.json(null, { status: 404 });
        }

        newRecipe = {
          ...(findRecipe[0] as Recipe),
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
        id: recipe_id(recipe.name),
        title: recipe.name,
        description: recipe.description?.replace(/<[^>]*>?/gm, "") ?? null,
        public: false,
        steps:
          recipe.recipeInstructions?.map((step: string) => {
            return { step_body: step };
          }) ?? null,
        ingredients: ingredients,
        source: link,
        cook_time: recipe?.cookTime ? splitTime(recipe.cookTime) : null,
        prep_time: recipe?.prepTime ? splitTime(recipe.prepTime) : null,
        total_time: recipe?.totalTime ? splitTime(recipe.totalTime) : null,
        rating: recipe.aggregateRating?.ratingValue ? Math.round(recipe.aggregateRating?.ratingValue) : null,
        yield: recipe?.recipeYield ? Math.round(recipe.recipeYield) : null,
        image_url: recipe?.image.url ?? null,
        image_attributes: {
          alt: recipe.image?.alt || recipe.name || "recipe image",
        },
        keywords: recipe.keywords?.split(",").map((keyword: string) => {
          return keyword.trim();
        }),
        ingredients_list:
          ingredients?.map((ingredient) => ingredient.title) ?? null,
        created_by: user.id,
        version: "1.0",
      };
    }

    if (!newRecipe)
      return NextResponse.json(
        { message: "Error could not create recipe" },
        { status: 404 }
      );

    const { data, error } = await supabase
      .from("recipes")
      .insert(newRecipe)
      .select()
      .single();

    if (error) {
      console.error("Error on /recipes/create", {
        error,
        values: newRecipe,
      });

      return NextResponse.json(
        "A database error occurred, contact support at support@mixiecooking.com or head to github to log an issue https://github.com/Eirfire/Mixie/issues",
        { status: 422 }
      );
    }

    console.log(`Created recipe by link: ${data?.recipe_id}`, {
      message: `Recipe successfully created`,
      recipe: data,
    });

    return NextResponse.json(
      {
        message: `Recipe successfully created using link`,
        id: data?.recipe_id,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error on /recipes/create", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
