import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { db } from "@db/index";
import { recipes } from "@db/schemas";
import { eq, or } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, params: { id: string }) {
  const app = await isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const recipe = await db.query.recipes.findFirst({
    where: or(eq(recipes.id, params.id), eq(recipes.uid, params.id)),
    with: {
      info: true,
    },
  });

  return NextResponse.json(recipe);
}
