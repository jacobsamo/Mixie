"use server";
import { action } from "@/actions/safe-action";
import { recipeId } from "@/lib/utils";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { NewRecipe } from "@/types";
import * as z from "zod";

const schema = z.object({
  title: z.string(),
});

export const createRecipeFromTitle = action(schema, async (params) => {
  const supabase = createClient();
  const user = await getUser();

  if (!user) {
    throw Error("Unauthorized");
  }

  const id = recipeId(params.title);

  const newTitle = params.title.charAt(0).toUpperCase() + params.title.slice(1);

  const newRecipe: NewRecipe = {
    id,
    title: newTitle,
    created_by: user.id,
    public: false,
    version: "1.0",
    ingredients: [{ text: "" }, { text: "" }],
    steps: [{ text: "" }, { text: "" }],
    recipe_creation_type: "title",
  };

  const { data, error } = await supabase
    .from("recipes")
    .insert(newRecipe)
    .select("recipe_id")
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data.recipe_id;
});
