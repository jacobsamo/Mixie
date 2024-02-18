import { isApp } from "@/lib/services/apiMiddleware";
import { db } from "@/server/db/index";
import { recipes as recipeSchema } from "@/server/db/schemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const app = await isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const recipes = await db.query.recipes.findMany({
    columns: {
      uid: true,
      id: true,
      title: true,
      imageAttributes: true,
      imageUrl: true,
      total: true,
      ingredientsList: true,
      keywords: true,
    },
    where: eq(recipeSchema.isPublic, true),
  });

  return NextResponse.json(recipes);
}
