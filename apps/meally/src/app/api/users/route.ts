import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { db } from "@/src/db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const app = await isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const users = await db.query.users.findMany();

  return NextResponse.json(users);
}
