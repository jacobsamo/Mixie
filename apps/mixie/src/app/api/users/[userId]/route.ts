import { isApp } from "@/lib/services/apiMiddleware";
import { getUser } from "@/lib/utils/getUser";
import { createAdminClient } from "@/server/supabase/server";
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

    const supabseAdmin = createAdminClient();

    const {data: {
      users
    }} = await supabseAdmin.auth.admin.listUsers()

    if (users.length === 0) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const foundUser = users.find(user => user.id === params.userId)

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error on /users/[id]", error);

    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
