import { type inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";

export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession({ req: opts.req });

  return {
    req: opts.req,
    res: opts.res,
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
