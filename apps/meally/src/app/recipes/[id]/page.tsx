import RecipePageComponent from "@components/templates/RecipePage/RecipePageComponent";
import React from "react";
import { mockRecipe } from "@/src/common/lib/services/data";
import { db } from "@/src/db";
import { recipes } from "@/src/db/schemas";
import { eq, or } from "drizzle-orm";
import RecipeService from "@/src/common/lib/services/RecipeService";
import type { Recipe } from "@/src/db/types";
import { RecipeJsonLd } from "next-seo";

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = (await db.query.recipes.findFirst({
    where: or(eq(recipes.id, params.id), eq(recipes.uid, params.id)),
    with: {
      info: true,
    },
  })) as Recipe;

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
