"use server";

import { action } from "@/actions/safe-action";
import { stepsSchema } from "@/actions/schema";
import { createClient } from "@/server/supabase/server";
import { Recipe } from "@/types";

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
      throw new Error(error.message);
    }

    return data as Recipe | null;
  });
