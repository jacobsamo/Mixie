import { calculateTotalTime } from "@/src/common/lib/utils/utils";
import type { Ingredient } from "@/src/db/types";
import { recipeFormSchema } from "@/src/db/zodSchemas";
import * as z from "zod";
import { toast } from "../../ui/use-toast";

export const onSubmit = async (recipe: z.infer<typeof recipeFormSchema>) => {
  if (!recipe) return;

  const totalTime =
    recipe.info && recipe.info.prep && recipe?.info.cook
      ? await calculateTotalTime(recipe.info.prep, recipe.info.cook)
      : null;

  const ingredients = recipe?.ingredients?.map((ingredient: Ingredient) => {
    if (!["cup", "tbsp", "tsp"].includes(ingredient.unit.value || "")) {
      ingredient.amount = {
        value: "not_set",
        label: "not_set",
      };
    }
    // check if the quantity is a number if not then set the value to null
    if (typeof ingredient?.quantity != "number") {
      ingredient.quantity = null;
    }

    return ingredient;
  }) as Ingredient[];

  const data = {
    ...recipe,
    info: {
      ...recipe.info,
      total: totalTime,
    },
    ingredients,
  };

  // send data to edit the recipe in the db
  fetch(`/api/recipes/${recipe.id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_TOKEN}`,
    },
    body: JSON.stringify(recipe),
  }).then((res) => {
    if (res.status === 200) {
      toast({
        title: "Recipe created.",
        description: "Your recipe has been created.",
      });
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was an error while creating your recipe.",
        variant: "destructive",
      });
    }
  });
};
