import { isApp } from "@/lib/services/apiMiddleware";
import { getUser } from "@/lib/utils/getUser";
import { createAdminClient } from "@/server/supabase/server";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export async function PUT(
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
    json.emailVerified = new Date(json.emailVerified);
    console.log("Body: ", json);

    const supabase = createAdminClient();

    await supabase.auth.updateUser(json);

    console.log("User updated: ", json);

    return NextResponse.json(
      {
        message: "User updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on /users/[id]/updateUser", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
