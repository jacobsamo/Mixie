import {
  convertIngredients,
  getRecipeJsonLd,
  splitTime,
} from "@lib/services/recipeJsonLDParsing";
import { recipeId } from "@lib/utils";
import { db } from "@db/index";
import { info, recipes } from "@db/schemas";
import { NewInfo, NewPartialRecipe } from "@db/types";
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

      // general info about the recipe
      const newInfo: NewInfo = {
        recipeId: uid,
        id,
        title: newTitle,
        createByName: user.name! || "",
        createdBy: user.id,
        lastUpdatedBy: user.id,
        lastUpdatedByName: user.name! || "",
        isPublic: false,
      };

      // the recipe itself
      const newRecipe: NewPartialRecipe = {
        uid: uid,
        id,
        title: newTitle,
        createByName: user.name! || "",
        createdBy: user.id,
        lastUpdatedBy: user.id,
        lastUpdatedByName: user.name! || "",
        isPublic: false,
      };

      console.log(`Created recipe: ${newRecipe.uid}`, {
        message: `Recipe successfully created`,
        recipe: newRecipe,
        info: newInfo,
      });

      await db.insert(info).values(newInfo);
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
          imgAlt: recipe.image.alt || recipe.name || "recipe image",
          isPublic: false,
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
          description: recipe.description.replace(/<[^>]*>?/gm, "") || null,
          isPublic: false,
          steps:
            recipe.recipeInstructions.map((step: string) => {
              return { step_body: step };
            }) || null,
          ingredients,
          source: link,
        };

        console.log(`Created recipe: ${newRecipe.uid}`, {
          message: `Recipe successfully created`,
          recipe: newRecipe,
          info: newInfo,
        });

        await db.insert(info).values(newInfo);
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
