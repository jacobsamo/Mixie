import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import styles from '@styles/modules/RecipePage.module.scss';
import RecipeService from '@lib/service/RecipeService';
import { Recipe } from 'libs/types/';
import { RecipeCard } from 'ui';
import { PageSeo } from 'ui';
import Navbar from '@components/elements/Navbar';
import Link from 'next/link';

export async function getStaticProps() {
  const recipes = (await RecipeService.getAllRecipes()) as Recipe[];
  return {
    props: {
      recipes: recipes,
    },
  };
}

/// With more than 600 recipe collections, get dinner ideas for tonight and everyday cooking inspiration

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
                  imageUrl={recipe.imageUrl}
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