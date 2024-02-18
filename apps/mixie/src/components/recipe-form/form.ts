import { calculateTotalTime } from "@/lib/utils";
import type { Ingredient, NewRecipe } from "@/types";
import { recipeFormSchema } from "@/types/zodSchemas";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

export const onSubmit: SubmitHandler<z.infer<typeof recipeFormSchema>> = async (
  recipe
) => {
  if (!recipe) return;

  const totalTime =
    recipe && recipe.prep && recipe?.cook
      ? await calculateTotalTime(recipe.prep, recipe.cook)
      : null;

  const ingredients = recipe?.ingredients?.map((ingredient: Ingredient) => {
    if (!["cup", "tbsp", "tsp"].includes(ingredient.unit?.value ?? "")) {
      ingredient.amount = {
        value: "not_set",
        label: "not_set",
      };
    }

    if (!ingredient.amount) {
      ingredient.amount = null;
    }

    // check if the quantity is a number if not then set the value to null
    if (
      typeof ingredient?.quantity != "number" ||
      isNaN(ingredient?.quantity) ||
      ingredient?.quantity === 0 ||
      !ingredient?.quantity
    ) {
      ingredient.quantity = null;
    }

    return ingredient;
  }) as Ingredient[];

  const data: NewRecipe = {
    ...recipe,
    total: totalTime,
    ingredients,
  };

  // send data to edit the recipe in the db
  fetch(`/api/recipes/${recipe.id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_TOKEN}`,
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status === 200) {
      toast.success(
        "Recipe created. \n Your recipe has been created. Changes will be reflected within an hour"
      );
      // redirect to the recipe page
      window.location.href = `/recipes/preview/${recipe.uid}`;
    } else if (res.status == 400) {
      toast.error(
        "Uh oh! \n A recipe with the same name exists, please change your recipe name."
      );
    } else {
      console.error(res);
      toast.error(
        "Uh oh! Something went wrong.\n There was an error while creating your recipe."
      );
    }
  });
};
