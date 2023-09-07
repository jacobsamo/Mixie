import { initTRPC } from "@trpc/server";

const tRCP = initTRPC.create();

export const router = tRCP.router;
export const publicProcedure = tRCP.procedure;
