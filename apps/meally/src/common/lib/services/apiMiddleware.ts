import { NextApiRequest } from "next";
import * as crypto from "crypto";
import { env } from "@/env.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/db/next-auth-adapter";

export const isApp = (req: NextApiRequest): boolean => {
  const hash = crypto.createHash("sha256");
  const token = hash.update(env.API_APP_TOKEN).digest("hex");

  if (req.headers.authorization == token) {
    return true;
  }

  return false;
};

export const isAuthenticated = (req: NextApiRequest): boolean => {
  const session = getServerSession(authOptions);

  if (!session) {
    return false;
  }

  return true;
};
