import { isApp } from "@/lib/services/apiMiddleware";
import { getUser } from "@/lib/utils/getUser";
import db from "@/server/db/index";
import { collections } from "@/server/db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const app = await isApp(req);
    const user = await getUser();

    const requestedUserData = user ? user.id === params.userId : null;

    if ((!app) && !requestedUserData) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const foundCollections = await db
      .select()
      .from(collections)
      .where(eq(collections.userId, params.userId));

    return NextResponse.json(foundCollections);
  } catch (error) {
    console.error("Error on /users/[id]/collections", error);

    return NextResponse.error();
  }
}
