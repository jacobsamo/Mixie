import { NextResponse, type NextRequest } from "next/server";
import * as jose from "jose";
import { env } from "@/env.mjs";

export async function GET(req: NextRequest) {
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const jwt = req.headers.get("authorization");

  console.log(req.headers.get("authorization"));
  if (!jwt) {
    return NextResponse.error();
  }
  const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
    algorithms: ["HS256"],
  });

  console.log(protectedHeader);
  console.log(payload);

  return NextResponse.json(payload);
}
