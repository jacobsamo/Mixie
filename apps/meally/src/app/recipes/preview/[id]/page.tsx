import { generateSiteMap } from "@/src/common/lib/services/generateSitemap";
import { constructMetadata, displayIngredient } from "@lib/utils";
import RecipePageComponent from "@components/templates/RecipePage/RecipePageComponent";
import { db } from "@db/index";
import { recipes as recipeSchema } from "@db/schemas";
import type { Recipe } from "@db/types";
import { and, eq, or } from "drizzle-orm";
import { Metadata } from "next";
import { RecipeJsonLd } from "next-seo";
import { unstable_cache } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { getServerAuthSession } from "@/src/server/auth";

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
    with: { info: true },
    where: and(
      or(
        eq(recipeSchema.lastUpdatedBy, session.user.id),
        eq(recipeSchema.createdBy, session.user.id)
      ),
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
