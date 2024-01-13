import { Bookmark } from "@/types";
import { db } from "@/server/db/index";
import { bookmarks } from "@/server/db/schemas";
import { bookmarkSchema } from "@/types/zodSchemas";
import { getServerAuthSession } from "@/server/auth";
import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const uid = uuidv4();

    const newBookmark: Bookmark = {
      uid: uid,
      userId: session.user.id,
      recipeId: params.id,
      collections: json,
    };

    await db.insert(bookmarks).values(newBookmark);

    console.log(
      `Recipe ${newBookmark.recipeId} has been bookmarked by ${session.user.id}`
    );

    return NextResponse.json({
      message: `Recipe ${newBookmark.recipeId} has been bookmarked`,
    });
  } catch (error) {
    console.error("Error on /recipes/bookmark/[id]", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
