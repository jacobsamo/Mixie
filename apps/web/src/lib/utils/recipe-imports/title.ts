"use server";
import { recipeId } from "@/lib/utils";
import { NewRecipe } from "@/types";
import * as z from "zod";

const schema = z.object({
  user_id: z.string(),
  title: z.string(),
});

export const createRecipeFromTitle = async (
  params: z.infer<typeof schema>
): Promise<NewRecipe> => {
  const id = recipeId(params.title);

  const newTitle = params.title.charAt(0).toUpperCase() + params.title.slice(1);

  const newRecipe: NewRecipe = {
    id,
    title: newTitle,
    created_by: params.user_id,
    public: false,
    version: "1.0",
    ingredients: [{ text: "" }, { text: "" }],
    steps: [{ text: "" }, { text: "" }],
    recipe_creation_type: "title",
  };

  return newRecipe;
};
