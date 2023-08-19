import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import recipeService from '@lib/services/RecipeService';
import { Info } from '../db/types';
import { CardRectangle } from '@components/elements/Cards';

export default async function Page() {
  const latestRecipes = await recipeService.getAllRecipeCards();
  console.log('Recipes: ', latestRecipes);
  return (
    <>
      <h1 className="">Main page</h1>
      <section className="flex flex-col">
        {/* <Image
            src="https://images.unsplash.com/photo-1605210055810-bdd1c4d1f343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="background img"
            fill
            className={styles.heroImg}
          /> */}
        <h1 className="text-step--1 pb-2">Want Tasty Recipes</h1>
      </section>
      <section className="pt-9 ">
        {latestRecipes.map((recipe) => {
          return <CardRectangle key={recipe.id} recipe={recipe} />;
        })}
      </section>
    </>
  );
}
