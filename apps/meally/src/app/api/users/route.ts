import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // const users = await db.query.users.findMany();

  return NextResponse.json({message: "Coming in the future"});
}
