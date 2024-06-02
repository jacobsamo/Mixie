import RecipePageComponent from "@/components/recipe-page/recipe-page";
import { getRecipes } from "@/lib/services/data_fetching";
import { constructMetadata } from "@/lib/utils";
import type { Recipe } from "@/types";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const recipes = await getRecipes();

  const recipe = recipes?.find((recipe) => recipe.id == params.id);

  return constructMetadata({
    title: recipe?.title,
    description: recipe?.description || undefined,
    image: recipe?.image_url || "/images/banner.avif",
    url: `https://www.mixiecooking.com/recipes/${recipe?.id}`,
    keywords: recipe?.keywords?.map((keyword) => keyword) || undefined,
  });
}

export default async function RecipePage({ params }) {
  const recipes = await getRecipes();
  const recipe = recipes?.find((recipe) => recipe.id == params.id);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe?.title,
    image: recipe?.image_url,
    description: recipe?.description,
    recipeIngredient: recipe?.ingredients.map((ingredient) => ingredient.text),
    recipeInstructions: recipe?.steps.map((step, index) => {
      return {
        "@type": "HowToStep",
        text: step,
        position: index + 1,
      };
    }),
    recipeYield: recipe?.yield,
    recipeCategory: recipe?.category,
    recipeCuisine: recipe?.cuisine,
    keywords: recipe?.keywords?.join(", ") ?? [],
    cookTime: `PT${recipe?.cook_time}M`,
    prepTime: `PT${recipe?.prep_time}M`,
    totalTime: `PT${recipe?.total_time}M`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: recipe?.rating,
    },
    datePublished: recipe?.created_at
      ? new Date(recipe?.created_at)
      : new Date(),
  };

  if (recipe) {
    return (
      <>
        <head>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </head>
        <RecipePageComponent recipe={recipe as Recipe} />
      </>
    );
  }

  return notFound();
}
