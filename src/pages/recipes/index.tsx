import type { NextPage } from 'next';
import { Head } from 'next/document';
import React, { useState, useEffect } from 'react';
import styles from '@styles/RecipePage.module.scss';
import RecipeService from '@lib/service/RecipeService';
import { Recipe } from '@lib/types/recipe';
import RecipeCard from '@components/modules/RecipeCard';
import PageSEO from '@components/seo/PageSEO';
import Navbar from '@components/modules/Navbar';
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
      <PageSEO
        title="Browse all recipes"
        url=""
        description="recipes for the best meal ideas out there"
      />
      <Navbar />
      <div>
        {recipes.map((recipe: Recipe) => {
          return (
            <Link
              href={`/recipes/${encodeURIComponent(recipe.recipeName)}`}
              key={recipe.id}
            >
              <RecipeCard
                id={recipe.id.toString()}
                imageUrl={recipe.imageUrl}
                recipeName={recipe.recipeName}
                recipeDescription={recipe.recipeDescription}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default RecipesPages;
