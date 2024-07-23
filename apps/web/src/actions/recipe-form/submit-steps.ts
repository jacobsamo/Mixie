"use server";

import { action } from "@/actions/safe-action";
import { stepsSchema } from "@/actions/schema";
import { createClient } from "@mixie/supabase/server";
import { Recipe } from "@/types";
import logger from "@/lib/services/logger";

export const submitSteps = action
  .schema(stepsSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("recipes")
      .update({
        steps: parsedInput.steps,
      })
      .eq("recipe_id", parsedInput.recipe_id!)
      .select()
      .single();

    if (error) {
      logger.error(`Failed to update steps on recipe: ${error.message}`, {
        location: "recipe-form/submit-steps",
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
