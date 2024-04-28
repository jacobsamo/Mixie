import RecipeForm from "@/components/recipe-form/recipe-form";
import db from "@/server/db/index";
import { recipes } from "@/server/db/schemas";
import { getUser } from "@/lib/utils/getUser";
import { and, eq } from "drizzle-orm";
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

  const foundRecipes = await db
    .select()
    .from(recipes)
    .where(and(eq(recipes.created_by, user.id), eq(recipes.uid, params.id)));

  // return <RecipeForm recipe={mockRecipe} />;
  if (foundRecipes[0]) return <RecipeForm recipe={foundRecipes[0]} />;

  return notFound();
}
