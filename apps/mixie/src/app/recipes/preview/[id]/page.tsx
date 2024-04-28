import RecipePageComponent from "@/components/recipe-page/recipe-page";
import { getUser } from "@/lib/utils/getUser";
import db from "@/server/db/index";
import { recipes, recipes as recipeSchema } from "@/server/db/schemas";
import type { Recipe } from "@/types";
import { and, eq } from "drizzle-orm";
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

  const foundRecipe = await db
    .select()
    .from(recipes)
    .where(
      and(eq(recipeSchema.created_by, user.id), eq(recipeSchema.uid, params.id))
    );

  if (!foundRecipe[0]) {
    return notFound();
  }

  return (
    <>
      <RecipePageComponent recipe={foundRecipe[0] as Recipe} />
    </>
  );
}
