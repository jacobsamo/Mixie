"use server";

import { authAction } from "@/actions/safe-action";
import { stepsSchema } from "@/actions/schema";
import logger from "@/lib/services/logger";
import { Recipe } from "@/types";
import { createClient } from "@mixie/supabase/server";

export const submitSteps = authAction
  .schema(stepsSchema)
  .metadata({ name: "submit-steps" })
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
