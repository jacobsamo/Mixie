"use server";

import { action } from "@/actions/safe-action";
import { infoSchema } from "@/actions/schema";
import { createClient } from "@/server/supabase/server";
import { Recipe } from "@/types";

export const submitInfo = action(infoSchema, async (params) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("recipes")
    .update({
      title: params.title,
      source: params.source,
      prep_time: params.prep_time,
      cook_time: params.cook_time,
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
