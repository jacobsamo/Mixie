import Image from 'next/image';
import React, { useState, useEffect, ReactHTMLElement } from 'react';
//types
import type { Recipe, Info } from '@lib/types/recipe';
//services
import RecipeService from '@lib/service/RecipeService';
import styles from '@styles/modules/RecipePage.module.scss';
//icons
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline';

//components
import RecipeSEO from '@components/seo/RecipeSEO';
import StepCard from '@components/elements/recipe_elemnts/StepCard';
import AddBatch from '@components/elements/recipe_elemnts/Addbatch';
import Navbar from '@components/modules/Navbar';

interface Props {
  recipe: Recipe;
}

const Step = ({ steps, step }: { steps: string[]; step: string }) => {
  return (
    <>
      <section key={steps.indexOf(step)} className={styles.steps}>
        <h1 className="font-medium font-Roboto text-sm">
          Step {steps.indexOf(step) + 1}
        </h1>
        <h1 className={styles.step_method}>{step}</h1>
      </section>
    </>
  );
};

const Ingredient = ({ ingredient }: { ingredient: string }) => {
  return (
    <div
      key={ingredient.length}
      className="flex flex-row items-center py-1 gap-1"
    >
      <input type="checkbox" />
      <h1>{ingredient}</h1>
    </div>
  );
};

export default function RecipePage({ recipe }: Props) {
  const info = recipe.info as Info;

  if (recipe !== undefined) {
    return (
      <>
        <RecipeSEO
          recipeUrl={recipe.imageUrl}
          recipeName={recipe.recipeName}
          recipeDescription={recipe.recipeDescription}
          imageUrl={recipe.imageUrl}
          keywords={recipe.keywords.join(', ')}
          info=""
          createdAt={recipe.createdAt}
        />
        <Navbar />
        <main className={styles.mainContainer}>
          <section className="flex flex-row items-center">
            <h1 className={styles.recipeTitle}>{recipe.recipeName}</h1>
            <span className="flex flex-row pl-4">
              <StarIcon className="w-6 h-6" />
              <StarIcon className="w-6 h-6" />
              <StarIcon className="w-6 h-6" />
              <StarIcon className="w-6 h-6" />
              <StarIcon className="w-6 h-6" />
            </span>
          </section>
          <Image
            src={recipe.imageUrl}
            alt={recipe.recipeName}
            className={styles.recipeImage}
            width={800}
            height={600}
          />
          <h1>{recipe.recipeDescription}</h1>
          <h1>Recipe by: {recipe.createdBy}</h1>
          <ul className={styles.info}>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-8 dark:fill-white fill-black"
              >
                <g data-name="Layer 2">
                  <g data-name="pie-chart">
                    <rect width="24" height="24" opacity="0" />
                    <path d="M13 2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1 9 9 0 0 0-9-9zm1 8V4.07A7 7 0 0 1 19.93 10z" />
                    <path d="M20.82 14.06a1 1 0 0 0-1.28.61A8 8 0 1 1 9.33 4.46a1 1 0 0 0-.66-1.89 10 10 0 1 0 12.76 12.76 1 1 0 0 0-.61-1.27z" />
                  </g>
                </g>
              </svg>
              {info.serves} {recipe.recipeName}
            </li>
            <li>
              <ClockIcon className="w-8 h-8" /> Cook {info.cook}
            </li>
            <li>
              <TimelapseOutlinedIcon
                style={{ width: '2rem', height: '2rem' }}
              />
              Prep {info.prep}
            </li>
            <li>
              <TimerOutlinedIcon style={{ width: '2rem', height: '2rem' }} />
              Total {info.total}
            </li>
          </ul>
          <div className={styles.IngredientMethodContainer}>
            <div className="flex flex-col w-fit gap-3">
              <h1 className="flex items-center flex-row justify-center underline underline-offset-4">
                {recipe.ingredients.length} Ingredients
              </h1>
              <section className={styles.recipeIngredients}>
                <AddBatch />
                {recipe.ingredients.map((ingredient) => (
                  <Ingredient ingredient={ingredient} />
                ))}
              </section>
            </div>

            <section className={styles.method}>
              <h1 className="underline underline-offset-4 ">
                {recipe.steps.length} Steps
              </h1>
              {recipe.steps.map((step) => {
                return <Step steps={recipe.steps} step={step} />;
              })}
            </section>
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
