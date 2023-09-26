import { appProcedure, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { info } from "@/src/db/schemas";

export const recipesRouter = appProcedure.query(async () => {
  return await db.query.info.findMany({
    columns: {
      recipeId: true,
      id: true,
      title: true,
      imgAlt: true,
      imgUrl: true,
      total: true,
    },
    where: eq(info.isPublic, true),
  });
});
