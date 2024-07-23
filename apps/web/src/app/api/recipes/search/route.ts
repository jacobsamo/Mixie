import { isApp } from "@/lib/services/apiMiddleware";
import { getRecipes } from "@/lib/services/data_fetching";
import { searchRecipes } from "@/lib/services/seach";
import { createClient } from "@mixie/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// TODO: Get this working as a fuzzy search operator
export async function GET(req: NextRequest) {
  const app = await isApp(req);
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  const mealTime = searchParams.get("mealTime");
  const sweetSavory = searchParams.get("sweetSavoury");

  const supabase = await createClient();

  if (!query) return NextResponse.json("No query provided", { status: 401 });

  const { data: recipes } = await supabase
    .from("recipes")
    .select(
      "recipe_id, id, title, image_url, image_attributes, total_time, keywords"
    )
    .textSearch("title", query, {
      config: "english",
      type: "plain",
    })
    .eq("public", true)
    .limit(5);

  if (!app) return NextResponse.json("Unauthorized", { status: 401 });
  if (query === null)
    return NextResponse.json("No query provided", { status: 401 });

  return NextResponse.json(recipes);
}
