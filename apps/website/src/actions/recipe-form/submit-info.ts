"use server";

import { action } from "@/actions/safe-action";
import { infoSchema } from "@/actions/schema";
import { recipeId } from "@/lib/utils";
import { createClient } from "@/server/supabase/server";
import { Recipe } from "@/types";

export const submitInfo = action
  .schema(infoSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();

    const total_time =
      (parsedInput.prep_time &&
        parsedInput.cook_time &&
        parsedInput?.prep_time + parsedInput?.cook_time) ||
      null;

    const { data, error } = await supabase
      .from("recipes")
      .update({
        id: recipeId(parsedInput.title),
        title: parsedInput.title,
        source: parsedInput.source,
        prep_time: parsedInput.prep_time,
        cook_time: parsedInput.cook_time,
        total_time: total_time,
        yield: parsedInput.yield,
        description: parsedInput.description,
        image_url: parsedInput.image_url,
        image_attributes: parsedInput.image_attributes,
      })
      .eq("recipe_id", parsedInput.recipe_id!)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return data as Recipe | null;
  });
