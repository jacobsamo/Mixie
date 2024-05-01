import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { TablesInsert } from "database.types";
import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const uid = uuidv4();

    const newBookmark: TablesInsert<"bookmarks"> = {
      bookmark_id: uid,
      user_id: user.id,
      recipe_id: params.id,
    };
    const supabase = createClient();

    const { data: findBookmarks } = await supabase
      .from("bookmarks")
      .select()
      .eq("user_id", user.id);

    const bookmarkExists =
      findBookmarks &&
      findBookmarks.find((bookmark) => bookmark.recipe_id === params.id);

    if (bookmarkExists) {
      return NextResponse.json("Already bookmarked", { status: 409 });
    }

    await supabase.from("bookmarks").insert(newBookmark);

    console.log(
      `Recipe ${newBookmark.recipe_id} has been bookmarked by ${user.id}`
    );

    return NextResponse.json({
      message: `Recipe ${newBookmark.recipe_id} has been bookmarked`,
      bookmarkedRecipe: newBookmark,
    });
  } catch (error) {
    console.error("Error on /recipes/bookmark/[id]", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
