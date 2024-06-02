import { isApp } from "@/lib/services/apiMiddleware";
import { getRecipes } from "@/lib/services/data_fetching";
import { searchRecipes } from "@/lib/services/seach";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const app = await isApp(req);
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  const mealTime = searchParams.get("mealTime");
  const sweetSavory = searchParams.get("sweetSavoury");
  const recipes = await getRecipes();

  if (!app) return NextResponse.json("Unauthorized", { status: 401 });
  if (query === null)
    return NextResponse.json("No query provided", { status: 401 });

  const results = await searchRecipes({
    query,
    filters: {
      mealTime,
      sweetSavory,
    },
    recipes,
  });

  return NextResponse.json(results);
}
