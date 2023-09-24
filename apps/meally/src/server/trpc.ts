import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";

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
  const { req } = opts.ctx;
  console.log(req.headers);
  if (
    req.headers.authorization == "uPvovwjISK1H0IhDQd7ZiZoUBnmF//D4lm5SWA4m99s="
  ) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You must be logged in to do that.",
    });
  }

  return opts.next();
});

export const publicProcedure = tRCP.procedure;
export const userProcedure = tRCP.procedure.use(isAuthenticated);
export const appProcedure = tRCP.procedure.use(isApp);
