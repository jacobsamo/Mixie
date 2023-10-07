import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { info } from "@/src/db/schemas";

export async function GET(req: NextRequest) {
  const app = await isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const recipes = await db.query.info.findMany({
    columns: {
      recipeId: true,
      id: true,
      title: true,
      imgAlt: true,
      imgUrl: true,
      total: true,
    },
    where: eq(info.isPublic, true),
  });

  return NextResponse.json(recipes);
}
