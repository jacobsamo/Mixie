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

  const foundRecipes = await supabase
    .from("recipes")
    .select()
    .eq("created_at", user.id)
    .eq("recipe_id", params.id);

  // return <RecipeForm recipe={mockRecipe} />;
  if (foundRecipes[0]) return <RecipeForm recipe={foundRecipes[0]} />;

  return notFound();
}
