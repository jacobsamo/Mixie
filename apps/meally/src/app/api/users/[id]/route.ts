import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { db } from "@/src/db";
import { users } from "@/src/db/schemas";
import { userSchema } from "@/src/db/zodSchemas";
import { eq, or } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, params: { id: string }) {
  const app = await isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const user = await db.query.users.findFirst({
    where: or(eq(users.id, params.id), eq(users.userName, params.id)),
  });

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest, params: { id: string }) {
  const app = await isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const json = await req.body;

  const newUser = userSchema.parse(json);

  await db.update(users).set(newUser).where(eq(users.id, params.id));

  return NextResponse.json(
    {
      message: "User updated successfully",
    },
    { status: 200 }
  );
}
