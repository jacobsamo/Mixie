import { db } from "@db/index";
import { recipes } from "@db/schemas";
import { NewRecipe } from "@db/types";
import {
  convertIngredients,
  getRecipeJsonLd,
  splitTime,
} from "@lib/services/recipeJsonLDParsing";
import { recipeId } from "@lib/utils";
import { getServerAuthSession } from "@server/auth";
import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

const createRecipeSchema = z.object({
  title: z.string().optional(),
  link: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { user } = session;

    const json = await req.json();
    const { title, link } = createRecipeSchema.parse(json);
    const uid = uuidv4();

    if (title && !link) {
      const id = recipeId(title);

      const newTitle = title.charAt(0).toUpperCase() + title.slice(1);

      // the recipe itself
      const newRecipe: NewRecipe = {
        uid: uid,
        id,
        title: newTitle,
        createdBy: user.id,
        isPublic: false,
      };

      console.log(`Created recipe by title: ${newRecipe.uid}`, {
        message: `Recipe successfully created`,
        recipe: newRecipe,
      });

      await db.insert(recipes).values(newRecipe);

      return NextResponse.json(
        { message: `Recipe successfully created using title`, id: uid },
        {
          status: 200,
        }
      );
    }

    if (link) {
      // parse the recipe
      const recipe = await getRecipeJsonLd(link);
      const ingredients = await convertIngredients(recipe.recipeIngredient);

      if (recipe) {
        const uid = uuidv4();

        const newRecipe: NewRecipe = {
          uid: uid,
          id: recipeId(recipe.name),
          title: recipe.name,
          description: recipe.description.replace(/<[^>]*>?/gm, "") || null,
          isPublic: false,
          steps:
            recipe.recipeInstructions.map((step: string) => {
              return { step_body: step };
            }) || null,
          ingredients: ingredients,
          source: link,
          cook: splitTime(recipe.cookTime),
          prep: splitTime(recipe.prepTime),
          total: splitTime(recipe.totalTime),
          rating: recipe.aggregateRating?.ratingValue || null,
          serves: recipe.recipeYield || null,
          imgUrl: recipe.image.url || null,
          imageAttributes: recipe.image.alt || recipe.name || "recipe image",
          keywords: recipe.keywords.split(",").map((keyword: string) => {
            return { value: keyword };
          }),
          ingredientsList: ingredients.map((ingredient) => ingredient.title),
          createdBy: user.id,
        };

        console.log(`Created recipe by link: ${newRecipe.uid}`, {
          message: `Recipe successfully created`,
          recipe: newRecipe,
        });
        await db.insert(recipes).values(newRecipe);

        return NextResponse.json(
          { message: `Recipe successfully created using link`, id: uid },
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          { message: `No recipe found at ${link}` },
          {
            status: 404,
          }
        );
      }
    }
  } catch (error) {
    console.error("Error on /recipes/create", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
