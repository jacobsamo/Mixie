import RecipeForm from "@/components/recipe-form";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { Recipe } from "@/types";
import { notFound, redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditPage({ params }: EditPageProps) {
  const user = await getUser();

  if (!user) {
    return redirect("auth/login");
  }

  const supabase = createClient();

  const { data: foundRecipes, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("recipe_id", params.id)
    .eq("created_by", user.id)
    .single();

  // return <RecipeForm recipe={mockRecipe} />;
  if (!foundRecipes || error) return notFound();

  return <RecipeForm recipe={foundRecipes as Recipe} />;
}
