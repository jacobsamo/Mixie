import RecipeForm from "@/components/recipe-form/recipe-form";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { notFound, redirect } from "next/navigation";

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
    .single();

  // return <RecipeForm recipe={mockRecipe} />;
  if (!foundRecipes || error) return notFound();

  return <RecipeForm recipe={foundRecipes} />;
}
