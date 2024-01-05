import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { db } from "@db/index";
import { recipes as recipeSchema } from "@db/schemas";
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
      imgUrl: true,
      total: true,
    },
    where: eq(recipeSchema.isPublic, true),
  });

  return NextResponse.json(recipes);
}
