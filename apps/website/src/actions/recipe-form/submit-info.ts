"use server";

import { action } from "@/actions/safe-action";
import { infoSchema } from "@/actions/schema";
import { recipeId } from "@/lib/utils";
import { createClient } from "@/server/supabase/server";
import { Recipe } from "@/types";

export const submitInfo = action(infoSchema, async (params) => {
  const supabase = createClient();

  const total_time = params.prep_time && params.cook_time && (params?.prep_time + params?.cook_time) || null;

  const { data, error } = await supabase
    .from("recipes")
    .update({
      id: recipeId(params.title),
      title: params.title,
      source: params.source,
      prep_time: params.prep_time,
      cook_time: params.cook_time,
      total_time: total_time,
      yield: params.yield,
      description: params.description,
      image_url: params.image_url,
      image_attributes: params.image_attributes,
    })
    .eq("recipe_id", params.recipe_id!)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data as Recipe | null;
});
