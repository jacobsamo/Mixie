import { db } from "@db/index";
import { bookmarks } from "@db/schemas";
import { bookmarkSchema } from "@db/zodSchemas";
import { getServerAuthSession } from "@server/auth";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest, params: { id: string }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const json = await req.json();

    const bookmark = bookmarkSchema.parse(json);

    db.insert(bookmarks).values(bookmark);

    console.log(
      `Recipe ${bookmark.id} has been bookmarked by ${session.user.name} (${session.user.id})`
    );

    return NextResponse.json({
      message: `Recipe ${bookmark.id} has been bookmarked`,
    });
  } catch (error) {
    console.error("Error on /recipes/[id]/bookmark", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
