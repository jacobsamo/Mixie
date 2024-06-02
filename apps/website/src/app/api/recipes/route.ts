import { isApp } from "@/lib/services/apiMiddleware";
import { createClient } from "@/server/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const app = await isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const supabase = createClient();
  const gotRecipes = await supabase
    .from("recipes")
    .select(
      "recipe_id, id, title, image_attributes, image_url, total_time, keywords"
    )
    .eq("public", true);

  return NextResponse.json(gotRecipes);
}
