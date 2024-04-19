import  db  from "@/server/db";
import { recipes } from "@/server/db/schemas";
import { supabaseServer } from "@/server/db/supabase";
import { Recipe } from "@/types";
import { asc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getRecipes = unstable_cache(
  async () => {
    const latestRecipes = await db.select().from(recipes).where(eq(recipes.isPublic, true)).orderBy(asc(recipes.createdAt)) 
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
    const {data: {
      users
    }} = await supabaseServer.auth.admin.listUsers()
    return users;
  },
  ["users"],
  {
    tags: ["users"],
    revalidate: 3600,
  }
);
