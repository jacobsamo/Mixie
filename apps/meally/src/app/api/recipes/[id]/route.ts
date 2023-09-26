import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/src/db";
import { recipes } from "@/src/db/schemas";

export async function GET(req: NextApiRequest, params: { id: string }) {
  const app = isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const recipe = await db.query.recipes.findFirst({
    where: or(eq(recipes.id, params.id), eq(recipes.uid, params.id)),
    with: {
      info: true,
    },
  });

  return NextResponse.json(recipe);
}
