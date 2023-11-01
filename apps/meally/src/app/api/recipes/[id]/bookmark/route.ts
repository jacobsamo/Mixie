import { db } from "@db/index";
import { authOptions } from "@server/auth";
import { bookmarks, ratings } from "@db/schemas";
import { bookmarkSchema, ratingsSchema } from "@db/zodSchemas";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest, params: { id: string }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    const json = await req.json();

    const bookmark = bookmarkSchema.parse(json);

    db.insert(bookmarks).values(bookmark);

    console.log(`Recipe ${bookmark.id} has been bookmarked`);

    return NextResponse.json({
      message: `Recipe ${bookmark.id} has been bookmarked`,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
