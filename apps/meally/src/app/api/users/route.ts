import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { db } from "@/src/db";


export async function GET(req: NextApiRequest) {
  const app = isApp(req);

  if (!app) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const users = await db.query.users.findMany();

  return NextResponse.json(users);
}
