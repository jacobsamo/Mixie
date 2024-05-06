import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { bookmarkRouteSchema } from "@/types/zodSchemas";
import { TablesInsert } from "database.types";
import { NextResponse, type NextRequest } from "next/server";
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
    const bookmark = bookmarkRouteSchema.parse(json);

    const newBookmark: TablesInsert<"bookmarks"> = {
      user_id: user.id,
      recipe_id: params.id,
      notes: bookmark.notes,
      rating: bookmark.rating,
      tags: bookmark.tags,
    };
    const supabase = createClient();

    const { data: bookmarkExists } = await supabase
      .from("bookmarks")
      .select()
      .eq("user_id", user.id)
      .eq("recipe_id", params.id)
      .single();

    if (bookmarkExists) {
      return NextResponse.json("Already bookmarked", { status: 409 });
    }

    const { data } = await supabase
      .from("bookmarks")
      .insert(newBookmark)
      .select();

    if (bookmark.collections && data) {
      bookmark.collections.forEach(async (collection_id) => {
        const newLink: TablesInsert<"bookmark_link"> = {
          bookmark_id: data[0].bookmark_id,
          recipe_id: params.id,
          collection_id: collection_id,
          user_id: user.id,
        };

        await supabase.from("bookmark_link").insert(newLink);
      });
    }

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
