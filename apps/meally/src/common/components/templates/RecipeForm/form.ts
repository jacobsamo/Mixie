import { toast } from "@components/ui/use-toast";
import type { Ingredient } from "@db/types";
import { recipeFormSchema } from "@db/zodSchemas";
import { calculateTotalTime } from "@lib/utils";
import { SubmitHandler, useFormContext } from "react-hook-form";
import * as z from "zod";

export const onSubmit: SubmitHandler<z.infer<typeof recipeFormSchema>> = async (
  recipe
) => {
  if (!recipe) return;
  const { setError } = useFormContext();

  const totalTime =
    recipe.info && recipe.info.prep && recipe?.info.cook
      ? await calculateTotalTime(recipe.info.prep, recipe.info.cook)
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
        description:
          "Your recipe has been created. Changes will be reflected within an hour",
      });
      // redirect to the recipe page
      window.location.href = `/recipes/preview/${recipe.uid}`;
    } else if (res.status == 400) {
      setError("title", {
        message: "Recipe with this title already exists",
      });
      toast({
        title: "Uh oh!",
        description:
          "A recipe with the same name exists, please change your recipe name.",
        variant: "destructive",
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
