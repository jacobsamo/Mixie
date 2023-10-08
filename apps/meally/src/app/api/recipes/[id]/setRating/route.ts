import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { db } from "@/src/db";
import { authOptions } from "@/src/db/next-auth-adapter";
import { ratings, recipes } from "@/src/db/schemas";
import { ratingsSchema } from "@/src/db/zodSchemas";
import { eq, or } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest, params: { id: string }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const json = await req.json();

  const rating = ratingsSchema.parse(json);
  console.log(rating);

  //   db.update(ratings).set(rating).where(eq(ratings.recipeId, params.id));
  db.insert(ratings).values(rating);

  return NextResponse.json({
    message: "Rating updated successfully",
  });
}
