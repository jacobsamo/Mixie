import { recipe_id } from "@/lib/utils";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { recipeFormSchema } from "@/types/zodSchemas";
import { TablesUpdate } from "database.types";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

export async function PUT(req: NextRequest, params: { id: string }) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const recipe = recipeFormSchema.parse(json);

    const id = recipe_id(recipe.title) || recipe.id;

    // get all ingredients and set them, only include ingredients that have isHeading set to false
    const ingredientsList = recipe?.ingredients
      ?.filter((ingredient) => !ingredient.isHeading && ingredient.title)
      .map((ingredient) => {
        ingredient.title =
          ingredient.title.charAt(0).toUpperCase() + ingredient.title.slice(1);

        return ingredient.title;
      });

    // define the new recipe
    const newRecipe: TablesUpdate<"recipes"> = {
      id: id,
      title: recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1),
      ingredients_list: ingredientsList,
      category: recipe.category,
      cook_time: recipe.cook_time,
      cuisine: recipe.cuisine,
      description: recipe.description,
      difficulty_level: recipe.difficulty_level,
      image_attributes: recipe.image_attributes,
      image_url: recipe.image_url,
      ingredients: recipe.ingredients,
      keywords: recipe.keywords,
      notes: recipe.notes,
      nutrition: recipe.nutrition,
      prep_time: recipe.prep_time,
      public: recipe.public,
      rating: recipe.rating,
      source: recipe.source?.length != 0 ? recipe.source : null,
      steps: recipe.steps,
      suitable_for_diet: recipe.suitable_for_diet,
      sweet_savoury: recipe.sweet_savoury,
      total_time: recipe.total_time,
      version: recipe.version,
      yield: recipe.yield,
      meal_time: recipe.meal_time,
    };
    const supabase = createClient();

    const {
      data: setRecipe,
      error,
      status,
      statusText,
    } = await supabase
      .from("recipes")
      .update(newRecipe)
      .eq("recipe_id", recipe?.recipe_id ?? "");

    if (error) {
      console.error("Error editing recipe", {
        error,
        recipe: JSON.stringify(newRecipe),
      });
      return NextResponse.json(null, { status: 500 });
    } else {
      console.log(`Edited recipe ${newRecipe.recipe_id}`, {
        message: `Recipe successfully edited, ${setRecipe}`,
        recipe: newRecipe,
      });
    }

    return NextResponse.json(
      {
        message: `Recipe successfully edited, ${setRecipe}`,
        recipe: newRecipe,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        "Error on /recipes/[id]/edit",
        JSON.stringify(error.issues)
      );
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("Error on /recipes/[id]/edit", error);

    return NextResponse.json(null, { status: 500 });
  }
}
