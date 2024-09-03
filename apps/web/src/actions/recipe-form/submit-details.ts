"use server";

import { authAction } from "@/actions/safe-action";
import { detailsSchema } from "@/actions/schema";
import logger from "@/lib/services/logger";
import { Recipe } from "@/types";
import { createClient } from "@mixie/supabase/server";
import { revalidateTag } from "next/cache";

export const submitDetails = authAction
  .metadata({ name: "submit-details" })
  .schema(detailsSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("recipes")
      .update({
        difficulty_level: parsedInput.difficulty_level,
        keywords: parsedInput.keywords,
        meal_time: parsedInput.meal_time,
        notes: parsedInput.notes,
        public: parsedInput.public,
        sweet_savoury: parsedInput.sweet_savoury,
      })
      .eq("recipe_id", parsedInput.recipe_id!)
      .select()
      .single();

    if (error) {
      logger.error(`Failed to update details on recipe: ${error.message}`, {
        location: "recipe-form/submit-details",
        message: JSON.stringify({
          parsedInput,
          error,
        }),
        statusCode: 500,
      });
      throw new Error(error.message);
    }

    if (data.public) {
      revalidateTag("recipes");
    }

    return data as Recipe | null;
  });
