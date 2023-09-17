import { env } from "@/env.mjs";

import { db } from "@/src/db";
import { info as infoSchema } from "@/src/db/schemas";
import { desc, asc } from "drizzle-orm";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const recipes = await db.query.info.findMany({

    orderBy: [asc(infoSchema.lastUpdated)],
  });

  return NextResponse.json({ recipes });
}
