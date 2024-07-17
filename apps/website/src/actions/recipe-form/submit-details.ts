"use server";

import { action } from "@/actions/safe-action";
import { detailsSchema } from "@/actions/schema";
import { createClient } from "@/server/supabase/server";
import { Recipe } from "@/types";

export const submitDetails = action
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
      throw new Error(error.message);
    }

    return data as Recipe | null;
  });
