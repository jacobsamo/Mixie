"use server";

import { action } from "@/actions/safe-action";
import { stepsSchema } from "@/actions/schema";
import { createClient } from "@/server/supabase/server";

export const submitSteps = action(stepsSchema, async (params) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("recipes")
    .update({
      steps: params.steps,
    })
    .eq("recipe_id", params.recipe_id!)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
});
