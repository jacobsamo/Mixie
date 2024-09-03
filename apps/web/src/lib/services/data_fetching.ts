import { createAdminClient, createClient } from "@mixie/supabase/server";
import { Recipe } from "@/types";
import { unstable_cache } from "next/cache";
import { getRecipes as getCachedRecipes } from "@mixie/supabase/cached-queries";

export const getRecipes = async () => {
  const recipes = await getCachedRecipes();
  return recipes as Recipe[];
};
