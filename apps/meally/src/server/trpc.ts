import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";
import * as crypto from "crypto";
import { env } from "@/env.mjs";

export const tRCP = initTRPC.context<Context>().create();

export const router = tRCP.router;
export const middleware = tRCP.middleware;

export const isAuthenticated = middleware(async (opts) => {
  const { session } = opts.ctx;
  if (!session) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You must be logged in to do that.",
    });
  }
  return opts.next();
});

export const isApp = middleware(async (opts) => {
  const { headers } = opts.ctx;
  console.log(headers);
  const hash = crypto.createHash("sha256");
  const token = hash.update(env.API_APP_TOKEN).digest("hex");

  if (headers?.authorization == token) {
    return opts.next();
  }

  throw new TRPCError({
    code: "FORBIDDEN",
    message: "You must be logged in to do that.",
  });
});

export const publicProcedure = tRCP.procedure;
export const userProcedure = tRCP.procedure.use(isAuthenticated);
export const appProcedure = tRCP.procedure.use(isApp);
