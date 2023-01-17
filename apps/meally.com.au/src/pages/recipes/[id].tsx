import Image from 'next/image';
import React, { useState, useEffect, ReactHTMLElement } from 'react';
//types
import type { Recipe, Info } from 'libs/types';
//services
import RecipeService from '@lib/service/RecipeService';
import styles from '@styles/modules/RecipePage.module.scss';
//icons
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline';

//components
import { RecipeSeo } from 'ui';
import Navbar from '@components/elements/Navbar';
import AddBatch from '@components/elements/recipe_elemnts/Addbatch';
import Link from 'next/link';
import RecipePageLayout from '@components/layouts/RecipePageLayout';

interface recipePageProps {
  recipe: Recipe;
}


export default function RecipePage({ recipe }: recipePageProps) {
  return (
    <>
      <RecipeSeo
        recipeUrl={recipe.imageUrl}
        recipeName={recipe.recipeName}
        recipeDescription={recipe.recipeDescription}
        imageUrl={recipe.imageUrl}
        keywords={recipe.keywords.join(', ')}
        info=""
        createdAt={recipe.createdAt}
      />
      <Navbar />
      <RecipePageLayout recipe={recipe}/>
    </>
  );
}

export async function getStaticPaths() {
  const recipes = await RecipeService.getAllRecipes();
  const paths = recipes.map((recipe: any) => {
    return { params: { id: recipe.id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const recipe = await RecipeService.getRecipe(context.params.id);
  if (!recipe || !Object.keys(recipe).length) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }
  return {
    props: {
      recipe,
    },
    revalidate: 86400000,
  };
}
