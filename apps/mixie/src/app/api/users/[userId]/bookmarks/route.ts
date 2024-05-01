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

    if ((!app || !user) && !requestedUserData) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const supabase = createClient();
    const userBookmarks = await supabase
      .from("bookmarks")
      .select()
      .eq("user_id", params.userId);

    return NextResponse.json(userBookmarks);
  } catch (error) {
    console.error("Error on /users/[id]/bookmarks", error);

    return NextResponse.error();
  }
}
