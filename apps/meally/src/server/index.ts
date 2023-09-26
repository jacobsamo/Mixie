import { recipesRouter } from "./routes/recipes";
import { publicProcedure } from "./trpc";
import { router } from "./trpc";

export const appRouter = router({
  hello: publicProcedure.query(async () => {
    return "Hello World";
  }),
  recipes: recipesRouter,

});

export type AppRouter = typeof appRouter;
