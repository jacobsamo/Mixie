import { db } from "@/server/db";
import { recipes } from "@/server/db/schemas";
import { Recipe } from "@/types";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getRecipes = unstable_cache(
  async () => {
    const latestRecipes = await db.query.recipes.findMany({
      where: eq(recipes.isPublic, true),
      orderBy: recipes.createdAt,
    });
    return latestRecipes as Recipe[];
  },
  ["recipes"],
  {
    tags: ["recipes"],
    revalidate: 3600,
  }
);

export const getUsers = unstable_cache(
  async () => {
    const users = await db.query.users.findMany();
    return users;
  },
  ["users"],
  {
    tags: ["users"],
    revalidate: 3600,
  }
);
