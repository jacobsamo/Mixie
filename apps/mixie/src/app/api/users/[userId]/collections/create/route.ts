import { isApp } from "@/lib/services/apiMiddleware";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db/index";
import { collections } from "@/server/db/schemas";
import { Collection, collectionSchema } from "@/types";
import { eq, or } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

export async function POST(
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

    const json = await req.json();
    const collection = collectionSchema.parse(json);

    // set global variables
    const { user } = session;
    const uid = uuidv4();

    const newCollection: Collection = {
      ...collection,
      uid: uid,
      userId: user.id,
    };

    await db.insert(collections).values(newCollection);

    console.log(`Created collection: ${uid}`, {
      message: `Collection successfully created`,
      collection: newCollection,
    });

    return NextResponse.json(
      { message: `Collection successfully created`, id: uid },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error on /users/[id]/collections/create", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
