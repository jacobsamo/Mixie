import { isApp } from "@/lib/services/apiMiddleware";
import { createClient } from "@/server/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, params: { id: string }) {
  const app = await isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const supabase = createClient();

  const { data: recipe } = await supabase
    .from("recipes")
    .select()
    .or(`id.eq.${params.id},recipe_id.eq.${params.id}`)
    .single();

  return NextResponse.json(recipe);
}
