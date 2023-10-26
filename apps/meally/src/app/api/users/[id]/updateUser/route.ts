import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { db } from "@db/index";
import { users } from "@db/schemas";
import { userSchema } from "@db/zodSchemas";
import { eq, or } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("hit");
  try {
    const app = await isApp(req);

    if (!app) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    const json = await req.body;

    const newUser = userSchema.parse(json);

    await db.update(users).set(newUser).where(eq(users.id, params.id));

    console.log("newUser", newUser);
    return NextResponse.json(
      {
        message: "User updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
