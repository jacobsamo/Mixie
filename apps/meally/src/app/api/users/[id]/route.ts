import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/src/db";
import { users } from "@/src/db/schemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/db/next-auth-adapter";
import { userSchema } from "@/src/db/zodSchemas";

export async function GET(req: NextApiRequest, params: { id: string }) {
  const app = isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const user = await db.query.users.findFirst({
    where: or(eq(users.id, params.id), eq(users.userName, params.id)),
  });

  return NextResponse.json(user);
}

export async function PUT(req: NextApiRequest, params: { id: string }) {
  const app = isApp(req);

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
