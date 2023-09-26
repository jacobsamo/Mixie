import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/src/db";
import { users } from "@/src/db/schemas";

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
