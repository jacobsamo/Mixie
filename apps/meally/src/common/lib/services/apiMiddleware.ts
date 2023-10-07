import { NextApiRequest } from "next";
import * as crypto from "crypto";
import { env } from "@/env.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/db/next-auth-adapter";
import JWT from "./apiHandle";

export const isApp = (req: NextApiRequest): boolean => {
  try {
    console.log("auth", req.headers["authorization"]);
    const token = JWT.verifyJwt(req.headers["authorization"] || "");
    console.log("token: ", token);
    if (token.app === env.API_APP_TOKEN) {
      return true;
    }
  } catch (error) {
    return false;
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
