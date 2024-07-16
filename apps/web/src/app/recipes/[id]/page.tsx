import RecipePageComponent from "@/components/recipe-page";
import { getRecipes } from "@/lib/services/data_fetching";
import { constructMetadata } from "@/lib/utils";
import type { Recipe } from "@/types";
import { notFound } from "next/navigation";
import { HowToStep, Recipe as RecipeSchema } from "schema-dts";

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

export default async function RecipePage({
  params,
}: { params: { id: string } }) {
  const recipes = await getRecipes();
  const recipe = recipes?.find((recipe) => recipe.id == params.id);

  const date = recipe?.created_at
    ? new Date(recipe?.created_at).toString()
    : new Date().toString();

  const schema: RecipeSchema = {
    "@type": "Recipe",
    name: recipe?.title,
    image: {
      "@type": "ImageObject",
      url:
        recipe?.image_url ??
        `https://www.mixiecooking.com/recipes/${recipe?.id}/og`,
      width: recipe?.image_attributes?.width?.toString() ?? "800",
      height: recipe?.image_attributes?.height?.toString() ?? "600",
    },
    description: recipe?.description || "",
    recipeIngredient: recipe?.ingredients.map((ingredient) => ingredient.text),
    recipeInstructions: recipe?.steps.map((step, index) => {
      return {
        "@type": "HowToStep",
        text: step.text,
      } as HowToStep;
    }),
    recipeYield: recipe?.yield?.toString() ?? "1",
    recipeCategory: recipe?.category ?? "Main Course",
    recipeCuisine: recipe?.cuisine ?? "International",
    keywords: recipe?.keywords?.join(", ") ?? [],
    cookTime: `PT${recipe?.cook_time}M`,
    prepTime: `PT${recipe?.prep_time}M`,
    totalTime: `PT${recipe?.total_time}M`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: recipe?.rating ?? 0,
    },
    datePublished: date,
    dateCreated: date,
    dateModified: date,
    version: recipe?.version,
  };

  if (recipe) {
    return (
      <>
        <head>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              ...schema,
            })}
          </script>
        </head>
        <RecipePageComponent recipe={recipe as Recipe} />
      </>
    );
  }

  return notFound();
}
