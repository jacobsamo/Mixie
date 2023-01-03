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
import RecipeSEO from 'ui/seo/RecipeSEO';
import Navbar from '@components/elements/Navbar';
import AddBatch from '@components/elements/recipe_elemnts/Addbatch';
import Link from 'next/link';

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

const InfoComponent = ({
  info,
  recipeName,
}: {
  info: Info;
  recipeName: string;
}) => {
  return (
    <>
      <ul
        className={`flex flex-row flex-wrap gap-2  p-1 pb-2 pl-0 items-start`}
      >
        <li className="flex flex-row items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className=" dark:fill-white fill-black"
            style={{ width: '1.5rem', height: '1.5rem' }}
          >
            <g data-name="Layer 2">
              <g data-name="pie-chart">
                <rect width="24" height="24" opacity="0" />
                <path d="M13 2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1 9 9 0 0 0-9-9zm1 8V4.07A7 7 0 0 1 19.93 10z" />
                <path d="M20.82 14.06a1 1 0 0 0-1.28.61A8 8 0 1 1 9.33 4.46a1 1 0 0 0-.66-1.89 10 10 0 1 0 12.76 12.76 1 1 0 0 0-.61-1.27z" />
              </g>
            </g>
          </svg>
          {info.serves} {recipeName}
        </li>
        <li className="flex flex-row items-center gap-1">
          <TimelapseOutlinedIcon
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
          Prep {info.prep}
        </li>
        <li className="flex flex-row items-center gap-1">
          <ClockIcon style={{ width: '1.5rem', height: '1.5rem' }} /> Cook{' '}
          {info.cook}
        </li>
        <li className="flex flex-row items-center gap-1">
          <TimerOutlinedIcon style={{ width: '1.5rem', height: '1.5rem' }} />
          Total {info.total}
        </li>
      </ul>
    </>
  );
};

export default function RecipePage({ recipe }: Props) {
  const [methodOpen, setMethodOpen] = useState(false);

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
    revalidate: 24 * 60 * 60 * 1000, // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  };
}
