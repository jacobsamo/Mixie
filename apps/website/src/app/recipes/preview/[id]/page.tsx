import RecipePageComponent from "@/components/recipe-page";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import type { Recipe } from "@/types";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface PreviewRecipePageProps {
  params: {
    id: string;
  };
}

export default async function PreviewRecipePage({
  params,
}: PreviewRecipePageProps) {
  const user = await getUser();
  if (!user) {
    return redirect("/auth/login");
  }

  const supabase = createClient();

  const { data: foundRecipe, error } = await supabase
    .from("recipes")
    .select()
    .eq("created_by", user.id)
    .eq("recipe_id", params.id)
    .single();

  if (error) {
    console.log(`Error on /recipes/preview/[id]`, error);
  }

  if (!foundRecipe) {
    return notFound();
  }

  return (
    <>
      <RecipePageComponent recipe={foundRecipe as Recipe} viewMode="preview" />
    </>
  );
}
