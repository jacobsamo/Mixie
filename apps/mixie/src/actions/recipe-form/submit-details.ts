"use server";

import { action } from "@/actions/safe-action";
import { detailsSchema } from "@/actions/schema";
import { createClient } from "@/server/supabase/server";

export const submitDetails = action(detailsSchema, async (params) => {
  const supabase = createClient();

  console.log("values: ", params);

  // const { data, error } = await supabase
  //   .from("recipes")
  //   .update({
  //     difficulty_level: params.difficulty_level,
  //     keywords: params.keywords,
  //     meal_time: params.meal_time,
  //     notes: params.notes,
  //     public: params.public,
  //     sweet_savoury: params.sweet_savoury,
  //   })
  //   .eq("recipe_id", params.recipe_id!)
  //   .select()
  //   .single();

  // if (error) {
  //   throw new Error(error.message);
  // }

  return params;
});
