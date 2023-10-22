import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "@db/next-auth-adapter";

export async function createContext(opts?: FetchCreateContextFnOptions) {
  const session = await getServerSession(authOptions);

  return {
    session,
    headers: opts && Object.fromEntries(opts.req.headers),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
