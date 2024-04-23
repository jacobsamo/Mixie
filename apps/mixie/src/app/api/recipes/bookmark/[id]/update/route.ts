import { getUser } from "@/lib/utils/getUser";
import db from "@/server/db/index";
import { bookmarks } from "@/server/db/schemas";
import { createClient } from "@/server/supabase/server";
import { Bookmark } from "@/types";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const json = (await req.json()) as Partial<Bookmark>;

    const supabase = createClient();

    await supabase.from("bookmarks").update(json).eq("bookmark_id", json.uid);

    console.log(
      `Recipe ${json.recipeId} has been bookmarked by ${user.id}`,
      json
    );

    return NextResponse.json({
      message: `Recipe ${json.recipeId} has been bookmarked`,
      bookmarkedRecipe: json,
    });
  } catch (error) {
    console.error("Error on /recipes/bookmark/[id]", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
