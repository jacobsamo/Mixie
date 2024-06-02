"use server";

import { action } from "@/actions/safe-action";
import { ingredientsSchema } from "@/actions/schema";
import { createClient } from "@/server/supabase/server";
import { Recipe } from "@/types";

export const submitIngredients = action(ingredientsSchema, async (params) => {
  const supabase = createClient();

  const cleanIngredients = params.ingredients.map((ingredient) => {
    let ingredientText = ingredient.text.replace(/\s{2,}/g, " "); // remove extra spaces
    ingredientText =
      typeof ingredientText.charAt(0) === "string"
        ? ingredientText.charAt(0).toUpperCase() + ingredientText.slice(1)
        : ingredientText; // set the first letter to uppercase
    return {
      ...ingredient,
      text: ingredientText,
    };
  });

  const { data, error } = await supabase
    .from("recipes")
    .update({
      ingredients: cleanIngredients,
    })
    .eq("recipe_id", params.recipe_id!)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Recipe | null;
});
