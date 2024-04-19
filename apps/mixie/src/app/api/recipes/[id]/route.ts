import { isApp } from "@/lib/services/apiMiddleware";
import db from "@/server/db/index";
import { recipes } from "@/server/db/schemas";
import { eq, or } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, params: { id: string }) {
  const app = await isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const recipe = await db.select().from(recipes).where(or(eq(recipes.id, params.id), eq(recipes.uid, params.id)))

  return NextResponse.json(recipe[0]);
}
