import { env } from "@/env.mjs";

import { db } from "@/src/db";
import { recipes as recipeSchema } from "@/src/db/schemas";
import { desc, asc } from "drizzle-orm";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");

  const recipes = await db.query.info.findMany({
    limit: limit,
    offset: offset,
    orderBy: [asc(recipeSchema.lastUpdated)],
  });

  return NextResponse.json({ recipes });
}
