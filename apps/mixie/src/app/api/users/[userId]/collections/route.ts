import { isApp } from "@/lib/services/apiMiddleware";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db/index";
import { collections, users } from "@/server/db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const app = await isApp(req);
    const session = await getServerAuthSession();

    const requestedUserData = session?.user.id === params.userId;

    if ((!app || !session) && !requestedUserData) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const foundCollections = await db.query.collections.findMany({
      where: eq(collections.userId, params.userId),
    });

    return NextResponse.json(foundCollections);
  } catch (error) {
    console.error("Error on /users/[id]/collections", error);

    return NextResponse.error();
  }
}
