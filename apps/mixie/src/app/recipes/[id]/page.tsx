import RecipePageComponent from "@/components/templates/RecipePage/RecipePageComponent";
import { getRecipes } from "@/lib/services/data_fetching";
import { constructMetadata, displayIngredient } from "@/lib/utils";
import type { Recipe } from "@/types";
import { RecipeJsonLd } from "next-seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const recipes = await getRecipes();

  const recipe = recipes?.find(
    (recipe) => recipe.uid || recipe.id == params.id
  );

  return constructMetadata({
    title: recipe?.title,
    description: recipe?.description || undefined,
    image: recipe?.imageUrl || "/images/banner.jpg",
    url: `https://www.mixiecooking.com/recipes/${recipe?.id}`,
    keywords: recipe?.keywords?.map((keyword) => keyword.value) || undefined,
  });
}

export default async function RecipePage({ params }) {
  const recipes = await getRecipes();
  const recipe = recipes?.find(
    (recipe) => recipe.uid || recipe.id == params.id
  );

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
          datePublished={
            recipe.createdAt
              ? new Date(recipe.createdAt).toDateString()
              : new Date().toDateString()
          }
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
