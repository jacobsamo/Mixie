"use server";
import { action } from "@/actions/safe-action";
import { infoSchema } from "@/actions/schema";
import { createClient } from "@/server/supabase/server";


export const createRecipeFromText = action(infoSchema, async (params) => {
  const supabase = createClient();

  const recipe = []

  const { data, error } = await supabase
    .from("recipes").insert(recipe).select("recipe_id").single();
  

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data.recipe_id
});
