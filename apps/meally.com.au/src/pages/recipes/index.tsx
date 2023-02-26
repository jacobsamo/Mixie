import type { NextPage } from 'next';
import React from 'react';
import styles from '@styles/modules/RecipePage.module.scss';
import RecipeService from '@lib/service/RecipeService';
import { Recipe } from 'libs/types/';
import { RecipeCard } from 'ui';
import { PageSeo } from 'ui';
import Navbar from '@components/elements/Navbar';
import Link from 'next/link';

export async function getStaticProps() {
  const recipes = await RecipeService.getAllRecipes();
  return {
    props: {
      recipes: recipes,
    },
  };
}

const RecipesPages: NextPage = ({ recipes }: any) => {
  return (
    <>
      <PageSeo
        title="Browse all recipes"
        url=""
        imgUrl=""
        description="recipes for the best meals"
      />
      <Navbar />
      <div>
        {recipes.map((recipe: Recipe) => {
          return (
            <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
              <div>
                <RecipeCard
                  id={recipe.id.toString()}
                  imageUrl={recipe.image.imgUrl}
                  recipeName={recipe.recipeName}
                  recipeDescription={recipe.recipeDescription}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default RecipesPages;
