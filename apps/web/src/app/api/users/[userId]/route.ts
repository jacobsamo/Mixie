import { isApp } from "@/lib/services/apiMiddleware";
import { getUser } from "@/lib/utils/getUser";
import { createAdminClient } from "@/server/supabase/server";
import { createClient } from "@mixie/supabase/server";
import { User } from "@supabase/supabase-js";
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

    const { data: users } = await supabase.from("profiles").select("*");

    if (!users) throw new Error("No users found");

    if (users.length === 0) {
      return NextResponse.json("User not found", { status: 404 });
    }

    // const foundUser = users && users.length !== 0 && users.find(user => user.id === params.userId)
    const foundUser =
      users.length !== 0 &&
      users &&
      users.find((user) => user.profile_id === params.userId);

    return NextResponse.json(foundUser);
  } catch (error) {
    console.error("Error on /users/[id]", error);

    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
