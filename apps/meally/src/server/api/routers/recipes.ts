import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@server/api/trpc";
import { recipes, info } from "@server/db/schemas";

export const recipesRouter = createTRPCRouter({
  hello: publicProcedure.query(({ input }) => {
    return {
      greeting: `Hello test`,
    };
  }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     await ctx.db.insert(posts).values({
  //       name: input.name,
  //       createdById: ctx.session.user.id,
  //     });
  //   }),

  // recipes: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.info.findMany({
  //     orderBy: (info, { desc }) => [desc(info.createdAt)],
  //   });
  // }),

  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.recipes.findFirst({
  //     orderBy: (recipes, { desc }) => [desc(recipes.createdAt)],
  //   });
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
