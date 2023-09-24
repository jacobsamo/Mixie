import RecipePageComponent from "@components/templates/RecipePage/RecipePageComponent";
import React, { cache } from "react";
import { mockRecipe } from "@/src/common/lib/services/data";
import { db } from "@/src/db";
import { info as infoSchema, recipes as recipeSchema } from "@/src/db/schemas";
import { eq, or } from "drizzle-orm";
import type { Recipe } from "@/src/db/types";
import { RecipeJsonLd } from "next-seo";
import { Metadata } from "next";
import { constructMetadata } from "@/src/common/lib/utils/utils";

const getRecipes = cache(async () => {
  const recipes = await db.query.recipes.findMany({
    with: { info: true },
    // where: eq(recipeSchema.isPublic, true),
  });
  return recipes;
});

export async function generateStaticParams() {
  const recipes = await getRecipes();

  return recipes.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  const recipes = await getRecipes();
  const recipe = recipes?.find((post) => {
    post.id == params.id;
  });
  if (!recipe) {
    return;
  }

  return constructMetadata({
    title: recipe.title,
    description: recipe.description || undefined,
    image: recipe.info.imgUrl || undefined,
    keywords:
      recipe.info.keywords?.map((keyword) => keyword.value) || undefined,
  });
}

export default async function RecipePage({ params }) {
  const recipes = await getRecipes();
  const recipe = recipes?.find((post) => post.id == params.id);

  if (recipe) {
    return (
      <>
        <RecipeJsonLd
          useAppDir={true}
          name={recipe?.title || ""}
          authorName={""}
          yields={recipe?.info.serves?.toString() || ""}
          ingredients={
            recipe?.ingredients?.map((ingredient) => {
              return `${ingredient.quantity} ${
                ingredient.amount == "not_set" ? null : ingredient.amount
              } ${ingredient.unit} ${ingredient.title}`;
            }) || []
          }
          instructions={
            recipe?.steps?.map((step, index) => {
              return {
                name: `Step ${index + 1}`,
                text: step.step_body,
              };
            }) || []
          }
          description={recipe.description! || ""}
          datePublished={recipe.createdAt?.toTimeString()}
          dateModified={recipe.lastUpdated?.toTimeString()}
          keywords={
            recipe.info.keywords?.map((keyword) => keyword.value).join(", ") ||
            ""
          }
        />
        <RecipePageComponent recipe={recipe as Recipe} />
      </>
    );
  }

  return <div>Recipe not found</div>;
}
