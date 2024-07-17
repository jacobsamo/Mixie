import { isApp } from "@/lib/services/apiMiddleware";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { Collection, collectionSchema } from "@/types";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const app = await isApp(req);
    const user = await getUser();

    const requestedUserData = user ? user.id === params.userId : null;

    if ((!app || !user) && !requestedUserData) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const collection = collectionSchema.parse(json);

    const newCollection: Collection = {
      ...collection,
      user_id: user!.id,
    };
    const supabase = createClient();
    const { data } = await supabase
      .from("collections")
      .insert(newCollection)
      .select()
      .single();

    console.log(`Created collection: ${data!.collection_id}`, {
      message: `Collection successfully created`,
      collection: newCollection,
    });

    return NextResponse.json(
      { message: `Collection successfully created`, id: data!.collection_id },
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
