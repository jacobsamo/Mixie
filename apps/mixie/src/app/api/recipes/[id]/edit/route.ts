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
    json.created_at = new Date(json.created_at);
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
      ...recipe,
      id: id,
      title: recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1),
      ingredients_list: ingredientsList,
    };
    const supabase = createClient();

    const setRecipe = await supabase
      .from("recipes")
      .update(newRecipe)
      .eq("recipe_id", params.id);

    console.log(`Edited recipe ${newRecipe.recipe_id}`, {
      message: `Recipe successfully edited, ${setRecipe}`,
      recipe: newRecipe,
    });

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
    console.error("Error on /recipes/[id]/edit", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
