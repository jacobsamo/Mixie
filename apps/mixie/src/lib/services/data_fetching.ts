import db from "@/server/db";
import { recipes } from "@/server/db/schemas";
import { supabaseServer } from "@/server/db/supabase";
import { createAdminClient, createClient } from "@/server/supabase/server";
import { Recipe } from "@/types";
import { asc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getRecipes = unstable_cache(
  async () => {
    const supabase = createClient();
    const { data: latestRecipes } = await supabase
      .from("recipes")
      .select("*")
      .eq("isPublic", true)
      .order("created_at", { ascending: true });
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
    const supabase = createAdminClient();
    const {
      data: { users },
    } = await supabase.auth.admin.listUsers();
    return users;
  },
  ["users"],
  {
    tags: ["users"],
    revalidate: 3600,
  }
);
