import { getServerAuthSession } from "@/src/server/auth";
import RecipePageComponent from "@components/templates/RecipePage/RecipePageComponent";
import { db } from "@db/index";
import { recipes as recipeSchema } from "@db/schemas";
import type { Recipe } from "@db/types";
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
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/api/auth/login");
  }

  const recipe = await db.query.recipes.findFirst({
    where: and(
      eq(recipeSchema.createdBy, session.user.id),
      eq(recipeSchema.uid, params.id)
    ),
  });

  if (!recipe) {
    return notFound();
  }

  return (
    <>
      <RecipePageComponent recipe={recipe as Recipe} />
    </>
  );
}
