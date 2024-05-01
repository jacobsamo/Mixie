import RecipePageComponent from "@/components/recipe-page/recipe-page";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import type { Recipe } from "@/types";
import { notFound, redirect } from "next/navigation";

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

  const foundRecipe = await supabase.from("recipes").select().eq("created_at", user.id).eq("recipe_id", params.id)


  if (!foundRecipe[0]) {
    return notFound();
  }

  return (
    <>
      <RecipePageComponent recipe={foundRecipe[0] as Recipe} />
    </>
  );
}
