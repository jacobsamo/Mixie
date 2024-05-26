import { isApp } from "@/lib/services/apiMiddleware";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
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
    const supabase = createClient();
    const foundCollections = await supabase.from("collections").select().eq("user_id", params.userId)


    return NextResponse.json(foundCollections);
  } catch (error) {
    console.error("Error on /users/[id]/collections", error);

    return NextResponse.error();
  }
}
