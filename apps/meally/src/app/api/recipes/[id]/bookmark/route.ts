import { Bookmark } from "@/src/server/db/types";
import { db } from "@db/index";
import { bookmarks } from "@db/schemas";
import { bookmarkSchema } from "@db/zodSchemas";
import { getServerAuthSession } from "@server/auth";
import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export async function POST(req: NextRequest, params: { id: string }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const json = await req.json();

    const bookmark = bookmarkSchema
      .extend({
        uid: z.string().nullable().default(null),
        userId: z.string().nullable().default(null),
      })
      .parse(json);

    const uid = uuidv4();

    const newBookmark: Bookmark = {
      ...bookmark,
      uid: uid,
      userId: session.user.id,
    };

    db.insert(bookmarks).values(newBookmark);

    console.log(
      `Recipe ${newBookmark.recipeId} has been bookmarked by ${session.user.name} (${session.user.id})`
    );

    return NextResponse.json({
      message: `Recipe ${newBookmark.recipeId} has been bookmarked`,
    });
  } catch (error) {
    console.error("Error on /recipes/[id]/bookmark", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
