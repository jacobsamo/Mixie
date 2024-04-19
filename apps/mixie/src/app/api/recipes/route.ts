import { isApp } from "@/lib/services/apiMiddleware";
import db from "@/server/db/index";
import { recipes, recipes as recipeSchema } from "@/server/db/schemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const app = await isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const gotRecipes = await db
    .select({
      uid: recipes.uid,
      id: recipes.id,
      title: recipes.title,
      imageAttributes: recipes.imageAttributes,
      imageUrl: recipes.imageUrl,
      total: recipes.total,
      ingredientsList: recipes.ingredientsList,
      keywords: recipes.keywords,
    })
    .from(recipes)
    .where(eq(recipeSchema.isPublic, true));

  return NextResponse.json(gotRecipes);
}
