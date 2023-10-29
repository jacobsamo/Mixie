import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { db } from "@db/index";
import { users } from "@db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const app = await isApp(req);

  if (!app) {
    console.log("Unauthorized");
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, params.id),
  });

  return NextResponse.json(user);
}

