import { isApp } from "@/src/common/lib/services/apiMiddleware";
import {
  convertIngredients,
  getRecipeJsonLd,
  splitTime,
} from "@/src/common/lib/services/recipeJsonLDParsing";
import { recipeId } from "@/src/common/lib/utils/utils";
import { db } from "@/src/db";
import { authOptions } from "@/src/db/next-auth-adapter";
import { info, recipes } from "@/src/db/schemas";
import { NewInfo, NewPartialRecipe } from "@/src/db/types";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

const createRecipeSchema = z.object({
  title: z.string().optional(),
  link: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }
  const { user } = session;

  const json = await req.json();
  const { title, link } = createRecipeSchema.parse(json);
  const uid = uuidv4();

  if (title) {
    const id = recipeId(title);
    // general info about the recipe
    const newInfo: NewInfo = {
      recipeId: uid,
      id,
      title,
      createByName: user.name! || "",
      createdBy: user.id,
      lastUpdatedBy: user.id,
      lastUpdatedByName: user.name! || "",
    };
    console.log(newInfo);
    // the recipe itself
    const recipe: NewPartialRecipe = {
      uid: uid,
      id,
      title,
      createByName: user.name! || "",
      createdBy: user.id,
      lastUpdatedBy: user.id,
      lastUpdatedByName: user.name! || "",
    };
    console.log(recipe);
    await db.insert(info).values(newInfo);
    await db.insert(recipes).values(recipe);

    return NextResponse.json(
      { message: `Recipe successfully created`, id: uid },
      {
        status: 200,
      }
    );
  }

  if (link) {
    const recipe = await getRecipeJsonLd(link);
    const ingredients = await convertIngredients(recipe.recipeIngredient);

    // parse the recipe

    if (recipe) {
      const uid = uuidv4();

      const newInfo: NewInfo = {
        recipeId: uid,
        id: recipeId(recipe.name),
        title: recipe.name,
        createByName: user.name! || "",
        createdBy: user.id,
        lastUpdatedBy: user.id,
        lastUpdatedByName: user.name! || "",
        cook: splitTime(recipe.cookTime),
        prep: splitTime(recipe.prepTime),
        total: splitTime(recipe.totalTime),
        rating: recipe.aggregateRating?.ratingValue || null,
        serves: recipe.recipeYield || null,
        imgUrl: recipe.image.url || null,
        imgAlt: recipe.image.alt || null,
        keywords: recipe.keywords.split(",").map((keyword: string) => {
          return { value: keyword };
        }),
        ingredients: ingredients.map((ingredient) => ingredient.title),
      };

      const newRecipe: NewPartialRecipe = {
        uid: uid,
        id: recipeId(recipe.name),
        title: recipe.name,
        createByName: user.name! || "",
        createdBy: user.id,
        lastUpdatedBy: user.id,
        lastUpdatedByName: user.name! || "",
        description: recipe.description || null,
        steps:
          recipe.recipeInstructions.map((step: string) => {
            return { step_body: step };
          }) || null,
        ingredients,
        source: link,
      };

      console.log("Info: ", info);
      console.log("Recipe: ", newRecipe);

      await db.insert(info).values(newInfo);
      await db.insert(recipes).values(newRecipe);

      return NextResponse.json(
        { message: `Recipe successfully created`, id: uid },
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

  return NextResponse.json(
    { message: `No title or link provided` },
    {
      status: 400,
    }
  );
}
