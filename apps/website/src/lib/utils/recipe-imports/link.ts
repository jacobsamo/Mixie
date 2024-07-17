"use server";
import {
  getRecipeJsonLd,
  transformRecipe,
} from "@/lib/services/recipeJsonLDParsing";
import logger from "@/lib/services/logger";
import { createClient } from "@/server/supabase/server";
import { NewRecipe } from "@/types";
import * as z from "zod";

const schema = z.object({
  user_id: z.string(),
  link: z.string().url(),
});
/**
 * Creates a recipe from a link by importing it
 */
export const createRecipeFromLink = async (
  params: z.infer<typeof schema>
): Promise<NewRecipe> => {
  const supabase = createClient();
  let newRecipe: NewRecipe;

  if (params.link.includes("https://mixiecooking.com/recipes/")) {
    // split a mixie link to get the recipe id this id would be after /recipes/<recipe_id> a recipe link might look like this: https://mixiecooking.com/recipes/5f9b1b5e-5b1a-4b9e-9b9e-9b9e9b9e9b9e
    const recipe_id = params.link.split("/").pop();
    if (!recipe_id) throw Error("Recipe ID not found");

    const { data: findRecipe } = await supabase
      .from("recipes")
      .select()
      .or(`id.eq.${recipe_id},recipe_id.eq.${recipe_id}`)
      .single();

    if (!findRecipe) {
      throw Error("Recipe ID not found", { cause: 404 });
    }

    newRecipe = {
      ...(findRecipe as NewRecipe),
    };
  }

  const recipe = await getRecipeJsonLd(params.link);

  if (!recipe) {
    console.warn(`No recipe found at ${params.link}`, {
      location: "recipe-imports/link",
      message: JSON.stringify({
        link: params.link,
        user: params.user_id,
      }),
      statusCode: 404,
    });
    throw new Error(`No recipe found at ${params.link}`, { cause: 404 });
  }

  const transform = transformRecipe(recipe);

  newRecipe = {
    ...transform,
    source: params.link,
    public: false,
    created_by: params.user_id,
    recipe_creation_type: "link",
  };

  return newRecipe;
};
