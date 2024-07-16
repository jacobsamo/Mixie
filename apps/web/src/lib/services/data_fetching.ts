import { createAdminClient, createClient } from "@mixie/supabase/server";
import { Recipe } from "@/types";
import { unstable_cache } from "next/cache";

export const getRecipes = async () => {
  const supabase = createClient();
  const { data: latestRecipes } = await supabase
    .from("recipes")
    .select()
    .eq("public", true)
    .order("created_at", { ascending: true });
  return latestRecipes as Recipe[];
};

export const getUsers = async () => {
  const supabase = createAdminClient();
  const {
    data: { users },
  } = await supabase.auth.admin.listUsers();
  return users;
};
