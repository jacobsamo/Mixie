import Image from 'next/image';
import React, { useState, useEffect, ReactHTMLElement } from 'react';
//types
import type { Recipe, Info } from '@lib/types/recipe';
//services
import RecipeService from '@lib/service/RecipeService';
import styles from '@styles/modules/RecipePage.module.scss';
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
        <div className={styles.step_text}>
          <h1 className="font-medium font-Roboto text-sm">
            Step {steps.indexOf(step) + 1}
          </h1>
          <h1 className={styles.step_method}>{step}</h1>
        </div>
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
          <h1 className={styles.recipeTitle}>{recipe.recipeName}</h1>
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
            <li>Rating {info.rating}</li>
            <li>Serves {info.serves}</li>
            <li>Cook {info.cook}</li>
            <li>Prep {info.prep}</li>
            <li>Total {info.total}</li>
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
