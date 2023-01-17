import Image from 'next/image';
import React, { useState, useEffect, ReactHTMLElement } from 'react';
import Link from 'next/link';
//types
import type { Recipe, Info } from 'libs/types';
import styles from '@styles/modules/RecipePage.module.scss';
//icons
import { StarIcon } from '@heroicons/react/24/outline';
//components
import AddBatch from '@components/elements/recipe_elemnts/Addbatch';
import InfoComponent from '@components/elements/recipe_elemnts/RecipeInfo';
import Ingredient from '@components/elements/recipe_elemnts/RecipeIngredientCard';
import Step from '@components/elements/recipe_elemnts/RecipeStep';

interface recipePageProps {
  recipe: Recipe;
}

function RecipePageLayout({ recipe }: recipePageProps) {
  const [methodOpen, setMethodOpen] = useState(false);

  const info = recipe.info as Info;

  if (recipe !== undefined) {
    return (
      <>
        <main className={styles.mainContainer}>
          <section className="flex flex-row items-center flex-wrap">
            <h1 className={styles.recipeTitle}>{recipe.recipeName}</h1>
            <span className="flex flex-row pl-4">
              <StarIcon
                className={`${
                  info.rating >= 1
                    ? 'fill-[#ffe14cf6] text-[#ffe14cf6]'
                    : 'text-[#3e3e3e]'
                } w-6 h-6`}
              />
              <StarIcon
                className={`${
                  info.rating >= 2
                    ? 'fill-[#ffe14cf6] text-[#ffe14cf6]'
                    : 'text-[#3e3e3e]'
                } w-6 h-6`}
              />
              <StarIcon
                className={`${
                  info.rating >= 3
                    ? 'fill-[#ffe14cf6] text-[#ffe14cf6]'
                    : 'text-[#3e3e3e]'
                } w-6 h-6`}
              />
              <StarIcon
                className={`${
                  info.rating >= 4
                    ? 'fill-[#ffe14cf6] text-[#ffe14cf6]'
                    : 'text-[#3e3e3e]'
                } w-6 h-6`}
              />
              <StarIcon
                className={`${
                  info.rating >= 5
                    ? 'fill-[#ffe14cf6] text-[#ffe14cf6]'
                    : 'text-[#3e3e3e]'
                } w-6 h-6`}
              />
            </span>
          </section>
          <InfoComponent info={recipe.info} recipeName={recipe.recipeName} />
          <Image
            src={recipe.imageUrl}
            alt={recipe.recipeName}
            className={styles.recipeImage}
            width={800}
            height={600}
            priority
          />
          <h1 className={styles.recipeDescription}>
            {recipe.recipeDescription}
          </h1>
          <h1 className={styles.madeBy}>
            Recipe by:
            <Link href="#">{recipe.createdBy}</Link>
          </h1>
          <span className="w-full h-[0.125rem] my-2 mb-4 dark:bg-white bg-dark_grey rounded-md "></span>

          <div
            className={`${
              methodOpen ? styles.methodOpen : styles.ingredientOpen
            } flex justify-center flex-col`}
          >
            <span className={styles.titles}>
              <button
                className={`${styles.ingredientTitle}`}
                onClick={() => setMethodOpen(false)}
              >
                {recipe.ingredients.length} Ingredients
              </button>
              <button
                className={styles.methodTitle}
                onClick={() => setMethodOpen(true)}
              >
                {recipe.steps.length} Steps
              </button>
            </span>
            <article className={`${styles.IngredientMethodContainer}`}>
              <article className="">
                <section
                  className={`${styles.recipeIngredients} flex flex-col w-[12.5rem] gap-3`}
                >
                  <AddBatch />
                  {recipe.ingredients.map((ingredient) => (
                    <Ingredient
                      key={ingredient.length}
                      ingredient={ingredient}
                    />
                  ))}
                </section>
              </article>
              <article className={` ${styles.method_container}`}>
                <div className={styles.step_container}>
                  {recipe.steps.map((step) => {
                    return (
                      <Step
                        key={recipe.steps.indexOf(step)}
                        steps={recipe.steps}
                        step={step}
                      />
                    );
                  })}
                </div>
              </article>
            </article>
          </div>
        </main>
      </>
    );
  }

  return <></>;
}

export default RecipePageLayout;
