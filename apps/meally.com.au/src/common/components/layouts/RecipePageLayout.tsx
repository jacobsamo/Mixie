import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
//types
import type { Recipe, Info } from 'libs/types';
import styles from '@styles/modules/RecipePage.module.scss';
//icons
import { StarIcon } from '@heroicons/react/24/outline';
//components
import AddBatch from '@components/elements/recipe_page/Addbatch';
import InfoComponent from '@components/elements/recipe_page/RecipeInfo';
import Ingredient from '@components/elements/recipe_page/RecipeIngredientCard';
import Step from '@components/elements/recipe_page/RecipeStep';
import AuthDialog from '@components/elements/AuthDialog';
import useAuth from 'src/common/hooks/useAuth';
import Utils from '@lib/service/Utils';

interface RecipePageLayoutProps {
  recipe: Recipe;
}

function RecipePageLayout({ recipe }: RecipePageLayoutProps) {
  const { dialogOpen, handleAuthDialogClose } = useAuth();
  const [methodOpen, setMethodOpen] = useState(false);
  const [add, setAdd] = useState(1);
  const info = recipe.info as Info;
  if (recipe !== null) {
    return (
      <>
        <AuthDialog open={dialogOpen} setOpen={handleAuthDialogClose} />
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
            src={
              recipe.image.imgUrl ||
              'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
            }
            alt={recipe.image.imgAlt || recipe.recipeName || 'recipe image'}
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
            <Link href={`/profile/${recipe.createdBy.userName}`}>
              {recipe.createdBy.displayName}
            </Link>
          </h1>
          <span className="w-full h-[0.125rem] my-2 mb-4 dark:bg-white bg-dark_grey rounded-md "></span>

          <div
            className={`${
              methodOpen ? styles.methodOpen : styles.ingredientOpen
            } flex justify-center flex-col`}
          >
            <span className="flex flex-row items-start gap-x-[50%] pb-2">
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
              <article>
                <section
                  className={`${styles.recipeIngredients} flex flex-col w-[14.5rem] gap-3`}
                >
                  <AddBatch add={add} setAdd={setAdd} />
                  {recipe.ingredients.map((ingredient, index) => (
                    <Ingredient
                      key={index}
                      index={index}
                      ingredient={ingredient}
                      batchAmount={add}
                    />
                  ))}
                </section>
              </article>
              <article className={` ${styles.method_container}`}>
                <div className={styles.step_container}>
                  {recipe.steps.map((step, index) => {
                    return (
                      <Step
                        index={index}
                        key={index}
                        steps={recipe.steps}
                        step={step}
                        ingredients={recipe.ingredients}
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
