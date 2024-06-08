"use server";
import { action } from "@/actions/safe-action";
import {
  convertTimeToMinutes,
  getRecipeJsonLd,
} from "@/lib/services/recipeJsonLDParsing";
import { recipeId } from "@/lib/utils";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { NewRecipe } from "@/types";
import { NextResponse } from "next/server";
import * as z from "zod";

export const schema = z.object({
  link: z.string().url(),
});
/**
 * Creates a recipe from a link by importing it
 */
export const createRecipeFromLink = action(schema, async (params) => {
  const supabase = createClient();
  let newRecipe: NewRecipe;
  const user = await getUser();

  if (!user) {
    throw Error("Unauthorized");
  }

  if (params.link.includes("mixiecooking.com")) {
    // split a mixie link to get the recipe id this id would be after /recipes/<recipe_id> a recipe link might look like this: https://mixiecooking.com/recipes/5f9b1b5e-5b1a-4b9e-9b9e-9b9e9b9e9b9e
    const recipe_id = params.link.split("/").pop();
    if (!recipe_id) throw Error("Recipe ID not found");

    const findRecipe = await supabase
      .from("recipes")
      .select()
      .or(`id.eq.${recipe_id},recipe_id.eq.${recipe_id}`);

    if (!findRecipe) {
      throw Error("Recipe ID not found");
    }

    newRecipe = {
      ...(findRecipe[0] as NewRecipe),
    };
  }

  const recipe = await getRecipeJsonLd(params.link);

  if (!recipe)
    return NextResponse.json(
      { message: `No recipe found at ${params.link}` },
      {
        status: 404,
      }
    );

  newRecipe = {
    id: recipeId(recipe.name),
    title: recipe.name,
    description: recipe.description?.replace(/<[^>]*>?/gm, "") ?? null,
    public: false,
    steps:
      recipe.recipeInstructions?.map((step: string) => {
        return { text: step };
      }) || null,
    ingredients: recipe.recipeIngredient,
    source: params.link,
    cook_time: recipe?.cookTime ? convertTimeToMinutes(recipe.cookTime) : null,
    prep_time: recipe?.prepTime ? convertTimeToMinutes(recipe.prepTime) : null,
    total_time: recipe?.totalTime
      ? convertTimeToMinutes(recipe.totalTime)
      : null,
    rating: recipe.aggregateRating?.ratingValue
      ? Math.round(recipe.aggregateRating?.ratingValue)
      : null,
    yield: recipe?.recipeYield ? Math.round(recipe.recipeYield) : null,
    image_url: recipe?.image.url ?? null,
    image_attributes: {
      alt: recipe.image?.alt || recipe.name || "recipe image",
    },
    keywords: recipe.keywords?.split(",").map((keyword: string) => {
      return keyword.trim();
    }),
    ingredients_list: recipe.recipeIngredient.join(", "),
    created_by: user.id,
    version: "1.0",
  };

  const { data, error } = await supabase
    .from("recipes")
    .insert(newRecipe)
    .select("recipe_id")
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data.recipe_id;
});
