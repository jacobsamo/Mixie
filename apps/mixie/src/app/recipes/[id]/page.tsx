import RecipePageComponent from "@/components/templates/RecipePage/RecipePageComponent";
import { db } from "@/server/db/index";
import { recipes as recipeSchema } from "@/server/db/schemas";
import type { Recipe } from "@/types";
import { constructMetadata, displayIngredient } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { RecipeJsonLd } from "next-seo";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const getRecipes = unstable_cache(
  async () => {
    const recipes = await db.query.recipes.findMany({
      where: eq(recipeSchema.isPublic, true),
    });
    return recipes;
  },
  ["fullRecipes"],
  {
    revalidate: 3600,
  }
);

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  const recipes = await getRecipes();

  const recipe = recipes?.find((recipe) => {
    recipe.id == params.id;
  });

  if (!recipe) {
    return;
  }

  const metaData = await constructMetadata({
    title: recipe.title,
    description: recipe.description || undefined,
    image: recipe.imageUrl || "/images/banner.jpg",
    url: `https://www.mixiecooking.com/recipes/${recipe.id}`,
    keywords: recipe.keywords?.map((keyword) => keyword.value) || undefined,
  });

  return metaData;
}

export default async function RecipePage({ params }) {
  const recipes = await getRecipes();
  const recipe = recipes?.find((recipe) => recipe.id == params.id);

  if (recipe) {
    return (
      <>
        <RecipeJsonLd
          useAppDir={true}
          name={recipe?.title || ""}
          authorName={""}
          yields={recipe?.serves?.toString() || ""}
          ingredients={
            recipe?.ingredients?.map((ingredient) => {
              return displayIngredient(ingredient);
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
          datePublished={new Date(recipe.createdAt).toDateString()}
          keywords={
            recipe.keywords?.map((keyword) => keyword.value).join(", ") || ""
          }
        />
        <RecipePageComponent recipe={recipe as Recipe} />
      </>
    );
  }

  return notFound();
}
