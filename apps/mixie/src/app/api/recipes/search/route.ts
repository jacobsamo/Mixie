import { getRecipes } from "@/lib/services/data_fetching";
import { NextRequest, NextResponse } from "next/server";
import Fuse, { IFuseOptions } from "fuse.js";
import { Recipe } from "@/types";
import { isApp } from "@/lib/services/apiMiddleware";
import { searchRecipes } from "@/lib/services/seach";

export async function GET(req: NextRequest) {
  const app = await isApp(req);
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  const recipes = await getRecipes();

  if (!app) return NextResponse.json("Unauthorized", { status: 401 });
  if (query === null)
    return NextResponse.json("No query provided", { status: 401 });

  const results = searchRecipes({ query, recipes });

  return NextResponse.json(results.splice(0, 2));
}
