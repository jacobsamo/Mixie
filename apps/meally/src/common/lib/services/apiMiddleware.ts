import { env } from "@/env.mjs";
import { authOptions } from "@server/auth";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";

export const isApp = async (req: NextRequest) => {
  try {
    const authorization = req.headers.get("authorization");

    if (!authorization) {
      return false;
    }

    if (authorization == `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

export const isAuthenticated = (req: NextRequest): boolean => {
  const session = getServerSession(authOptions);

  if (!session) {
    return false;
  }

  return true;
};
