import Link from 'next/link';
import Image from 'next/image';
import { Head } from 'next/document';
import React, { useState, useEffect, ReactHTMLElement } from 'react';
//types
import type { Recipe, Info } from '@lib/types/recipe';
//services
import RecipeService from '@lib/service/RecipeService';
import styles from '@styles/modules/RecipePage.module.scss';
//components
import RecipeSEO from '@components/seo/RecipeSEO';
import StepCard from '@components/elements/recipe_elemnts/StepCard';

interface Props {
  recipe: Recipe;
}

export default function RecipePage({ recipe }: Props) {
  const info = recipe.info as Info;

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
        <main className={styles.mainContainer}>
          <h1 className={styles.recipeTitle}>{recipe.recipeName}</h1>
          <Image
            src={recipe.imageUrl}
            alt={recipe.recipeName}
            className={styles.recipeImage}
            width={800}
            height={500}
          />
          <h1>{recipe.recipeDescription}</h1>
          <h1>Recipe by: {recipe.createdBy}</h1>
          <ul className={styles.info}>
            <li>Rating {info.rating}</li>
            <li>Serves {info.serves}</li>
            <li>Cook {info.cook}</li>
            <li>Prep {info.prep}</li>
            <li>Total {info.total}</li>
          </ul>
          <div className={styles.IngredientMethodContainer}>
            <div className={styles.recipeIngredients}>
              <h1>Ingredients</h1>
              {recipe.ingredients.map((ingredient) => (
                <div className="flex gap-1">
                  <input type="checkbox" />
                  <h1>{ingredient}</h1>
                </div>
              ))}
            </div>
            <div className={styles.method}>
              {recipe.steps.map((step) => {
                return (
                  <div className={styles.steps}>
                    <h1 className="">{step.number}</h1>
                    <h1>{step.body}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
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
