import { isApp } from "@/lib/services/apiMiddleware";
import db from "@/server/db/index";
import { recipes } from "@/server/db/schemas";
import { createClient } from "@/server/supabase/server";
import { eq, or } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, params: { id: string }) {
  const app = await isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const supabase = createClient();

  const recipe = await supabase
    .from("recipes")
    .select()
    .or(`id.eq.${params.id},recipe_id.eq.${params.id}`);

  return NextResponse.json(recipe[0]);
}
