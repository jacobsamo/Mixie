import { constructMetadata } from "@/src/common/lib/utils/utils";
import RecipePageComponent from "@components/templates/RecipePage/RecipePageComponent";
import { db } from "@db/index";
import type { Recipe } from "@db/types";
import { Metadata } from "next";
import { RecipeJsonLd } from "next-seo";
import { notFound } from "next/navigation";

export const revalidate = 60 * 60;

const getRecipes = async () => {
  const recipes = await db.query.recipes.findMany({
    with: { info: true },
    // where: eq(recipeSchema.isPublic, true),
  });
  return recipes;
};

export async function generateStaticParams() {
  const recipes = await getRecipes();

  return recipes.map((recipe) => ({
    id: recipe.id,
  }));
}

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
  const recipe = recipes?.find((recipe) => recipe.id == params.id);

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
                ingredient.amount.value == "not_set" ? null : ingredient.amount
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

  return notFound();
}
