"use server";
import { action } from "@/actions/safe-action";
import { createClient } from "@/server/supabase/server";
import * as z from "zod";

export const schema = z.object({
  content: z.string(),
});

export const createRecipeFromText = action(schema, async (params) => {
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
