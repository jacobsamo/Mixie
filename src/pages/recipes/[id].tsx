import Link from 'next/link';
import Image from 'next/image';
import { Head } from 'next/document';
import React, { useState, useEffect, ReactHTMLElement } from 'react';
//types
import type { NextPage } from 'next';
import type { Recipe, Info, Step } from '@lib/types/recipe';
//services
import RecipeService from '@lib/service/RecipeService';
//components
import RecipeSEO from '@components/seo/RecipeSEO';
import StepCard from '@components/elements/recipe_elemnts/StepCard';

interface Props {
  recipe: Recipe;
}

export default function RecipePage({ recipe }: Props) {
  const info = recipe.info as Info;
  const items = recipe.ingredients as string[];
  

  if (recipe !== undefined) {
    return (
      <>
        <RecipeSEO
          recipeUrl=""
          recipeName={recipe.recipeName}
          recipeDescription={recipe.recipeDescription}
          imageUrl={recipe.imageUrl}
          keywords=""
          info=""
          createdAt={recipe.createdAt}
        />
        <h1>Recipe</h1>
        <Image
          src={recipe.imageUrl}
          alt={recipe.recipeName}
          width={800}
          height={500}
        />
        <div>
          <ul>
            <li>{info.rating}</li>
            <li>{info.serves}</li>
            <li>{info.cook}</li>
            <li>{info.prep}</li>
            <li>{info.total}</li>
          </ul>
        </div>
        <div>
          <input type="checkbox" />
          <h1>{recipe.ingredients}</h1>
        </div>
        <div>
                {recipe.steps.forEach(step => {
                    <>
                        <h1>{step.number.toString()}</h1>
                        <p>{step.body}</p>
                    </>
                })}
        </div>
      </>
    );
  }
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
  };
}
