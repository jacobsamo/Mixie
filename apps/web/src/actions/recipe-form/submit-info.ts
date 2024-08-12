"use server";

import { authAction } from "@/actions/safe-action";
import { infoSchema } from "@/actions/schema";
import logger from "@/lib/services/logger";
import { recipeId } from "@/lib/utils";
import { Recipe } from "@/types";
import { createClient } from "@mixie/supabase/server";

export const submitInfo = authAction
  .schema(infoSchema)
  .metadata({ name: "submit-info" })
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
      logger.error(`Failed to update info on recipe: ${error.message}`, {
        location: "recipe-form/submit-info",
        message: JSON.stringify({
          parsedInput,
          error,
        }),
        statusCode: 500,
      });
      throw new Error(error.message);
    }

    return data as Recipe | null;
  });
