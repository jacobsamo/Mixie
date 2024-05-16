"use server";

import { action } from "@/actions/safe-action";
import { ingredientsSchema } from "@/actions/schema";
import { createClient } from "@/server/supabase/server";

export const submitIngredients = action(ingredientsSchema, async (params) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("recipes")
    .update({
      ingredients: params.ingredients,
    })
    .eq("recipe_id", params.recipe_id!)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
});
