import React, { useEffect } from 'react';
//types
import type { Recipe, Info } from 'libs/types';
//services
import RecipeService from '@lib/service/RecipeService';

//components
import { RecipeSeo } from 'shared';
import Navbar from '@components/modules/Navbar';
import RecipePageLayout from '@components/layouts/RecipePageLayout';
import { useRouter } from 'next/router';
import Utils from '@lib/service/Utils';
import { generateSiteMap } from '@lib/service/Build';

interface recipePageProps {
  recipe: Recipe;
}

export default function RecipePage({ recipe }: recipePageProps) {
  return (
    <>
      <RecipeSeo
        recipeUrl={recipe.image.imgUrl || 'meally.com.au/recipes'}
        recipeName={recipe.recipeName || ''}
        recipeDescription={recipe.recipeDescription || ''}
        imageUrl={recipe.image.imgUrl || ''}
        keywords={recipe.keywords.join(', ')}
        info=""
        createdAt={recipe.createdAt}
      />
      <RecipePageLayout recipe={recipe} />
    </>
  );
}

export async function getStaticPaths() {
  const recipes = await RecipeService.getAllRecipes();
  generateSiteMap<Recipe>(recipes, 'recipes');
  const paths = recipes.map((recipe) => {
    return { params: { id: recipe.id.toString() } };
  });

  return {
    paths,
    fallback: 'blocking', // false or 'blocking'
  };
}

export async function getStaticProps(context: any) {
  const recipe = JSON.parse(
    JSON.stringify(await RecipeService.getRecipe(context.params.id))
  );

  if (!recipe || !Object.keys(recipe).length) {
    return {
      notFound: true,
    };
  }
  return {
    props: { recipe },
    revalidate: 60 * 60 * 24,
  };
}
