import type { NextPage } from 'next';
import React from 'react';
import styles from '@styles/modules/Home.module.scss';
import RecipeService from '@lib/service/RecipeService';
import { Recipe } from 'libs/types/';
import { RecipeCard } from 'ui';
import { PageSeo } from 'ui';
import Navbar from '@components/elements/Navbar';
import Link from 'next/link';
import Algolia_Search_Dialog from '@components/elements/algolia_search_dialog';

//swiper
import { SwiperSlide } from 'swiper/react';
import SwiperTemplate from '@components/templates/SwiperTemplate';

import {
  CardRectangle,
  CardRectangleSmall,
  CardSquare,
} from '@components/elements/Cards';

interface HomeProps {
  latestRecipes: Recipe[];
  breakFast: Recipe[];
  lunch: Recipe[];
  dinner: Recipe[];
  sweet: Recipe[];
  savoury: Recipe[];
}

const RecipesPages: NextPage<HomeProps> = ({
  latestRecipes,
  breakFast,
  lunch,
  dinner,
  sweet,
  savoury,
}: HomeProps) => {
  return (
    <>
      <PageSeo
        title="Browse all recipes"
        url=""
        imgUrl=""
        description="recipes for the best meals"
      />
      <Navbar />
      <main className='flex flex-col justify-center'>
        <section className={styles.heroSection}>
          {/* <Image
            src="https://images.unsplash.com/photo-1605210055810-bdd1c4d1f343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="background img"
            fill
            className={styles.heroImg}
          /> */}
          <h1 className={`${styles.heroTitle} pb-2`}>Want Tasty Recipes</h1>
          <Algolia_Search_Dialog buttonType="searchBar" />
        </section>
        <section className="pt-9 ">
          <h2>Breakfast</h2>
          <SwiperTemplate>
            {breakFast ? (
              breakFast.map((item: Recipe) => (
                <SwiperSlide>
                  <CardSquare
                    title={item.recipeName}
                    totalTime={item.info.total}
                    key={item.id}
                    handleClick={() => console.log('clicked')}
                    image={{
                      imgUrl: item.image?.imgUrl || '',
                      imgAlt: item.image?.imgAlt || '',
                    }}
                  />
                </SwiperSlide>
              ))
            ) : (
              <h1>No Recipes at this point in time</h1>
            )}
          </SwiperTemplate>
        </section>
        <section className="pt-9 ">
          <h2>Lunch</h2>
          <SwiperTemplate>
            {lunch ? (
              lunch.map((item: Recipe) => (
                <SwiperSlide>
                  <CardSquare
                    title={item.recipeName}
                    totalTime={item.info.total}
                    key={item.id}
                    handleClick={() => console.log('clicked')}
                    image={{
                      imgUrl: item.image?.imgUrl || '',
                      imgAlt: item.image?.imgAlt || '',
                    }}
                  />
                </SwiperSlide>
              ))
            ) : (
              <h1>No Recipes at this point in time</h1>
            )}
          </SwiperTemplate>
        </section>
        <section className="pt-9 ">
          <h2>Dinner</h2>
          <SwiperTemplate>
            {dinner ? (
              dinner.map((item: Recipe) => (
                <SwiperSlide>
                  <CardSquare
                    title={item.recipeName}
                    totalTime={item.info.total}
                    key={item.id}
                    handleClick={() => console.log('clicked')}
                    image={{
                      imgUrl: item.image?.imgUrl || '',
                      imgAlt: item.image?.imgAlt || '',
                    }}
                  />
                </SwiperSlide>
              ))
            ) : (
              <h1>No Recipes at this point in time</h1>
            )}
          </SwiperTemplate>
        </section>
        <section>
          <div>
            <h2>Sweet</h2>
            <Link href="/sweet">View all</Link>
          </div>
          <div>
            <h2>Savoury</h2>
            <Link href="/savoury">View all</Link>
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const latestRecipes = await RecipeService.getLatestRecipes();
  const sweet = await RecipeService.getRecipesByCategory('sweet');
  const savoury = await RecipeService.getRecipesByCategory('savoury');
  return {
    props: {
      latestRecipes: latestRecipes,
      breakFast: latestRecipes.filter((recipe) =>
        recipe.mealTime.includes('breakfast')
      ),
      lunch: latestRecipes.filter((recipe) =>
        recipe.mealTime.includes('lunch')
      ),
      dinner: latestRecipes.filter((recipe) =>
        recipe.mealTime.includes('dinner')
      ),
      sweet: sweet,
      savoury: savoury,
    },
  };
}

export default RecipesPages;
