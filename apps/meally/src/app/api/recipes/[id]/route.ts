import RecipeService from "@/src/common/lib/services/RecipeService";
import { db } from "@/src/db";
import { recipes } from "@/src/db/schemas";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // const recipe = await db
  //   .select()
  //   .from(recipes)
  //   .where(sql`${recipes.id} = ${id} or ${recipes.uid} = ${id}`);

  // return NextResponse.json({ recipe });
}
