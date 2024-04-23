import { Bookmark } from "@/types";
import db from "@/server/db/index";
import { bookmarks } from "@/server/db/schemas";
import { bookmarkSchema } from "@/types/zodSchemas";
import { getUser } from "@/lib/utils/getUser";
import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { createClient } from "@/server/supabase/server";

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

    const newBookmark: Bookmark = {
      uid: uid,
      userId: user.id,
      recipeId: params.id,
      collections: json,
    };

    const findBookmarks = await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, user.id));

    const bookmarkExists = findBookmarks.find(
      (bookmark) => bookmark.recipeId === params.id
    );

    if (bookmarkExists) {
      return NextResponse.json("Already bookmarked", { status: 409 });
    }
    const supabase = createClient();

    await supabase.from("bookmarks").insert(newBookmark);

    console.log(
      `Recipe ${newBookmark.recipeId} has been bookmarked by ${user.id}`
    );

    return NextResponse.json({
      message: `Recipe ${newBookmark.recipeId} has been bookmarked`,
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
