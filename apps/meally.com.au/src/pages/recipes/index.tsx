import type { NextPage } from 'next';
import React from 'react';
import styles from '@styles/modules/Home.module.scss';
import RecipeService from '@lib/service/RecipeService';
import { Recipe } from 'libs/types/';
import { PageSeo } from 'shared';
import Navbar from '@components/modules/Navbar';
import Link from 'next/link';
import AlgoliaDialog from '@components/elements/algolia_search/AlgoliaDialog';
import useAuth from 'src/common/hooks/useAuth';
import AuthDialog from '@components/elements/AuthDialog';

//swiper
import { SwiperSlide } from 'swiper/react';
import SwiperTemplate from '@components/templates/SwiperTemplate';

import {
  CardRectangle,
  CardRectangleSmall,
  CardSquare,
} from '@components/modules/Cards';

interface HomeProps {
  breakFast: Recipe[];
  lunch: Recipe[];
  dinner: Recipe[];
  sweet: Recipe[];
  savoury: Recipe[];
}

const RecipesPages: NextPage<HomeProps> = ({
  breakFast,
  lunch,
  dinner,
  sweet,
  savoury,
}: HomeProps) => {
  const { dialogOpen, handleAuthClick, handleAuthDialogClose } = useAuth();
  return (
    <>
      <PageSeo
        title="Browse all recipes"
        url=""
        imgUrl=""
        description="recipes for the best meals"
      />
      <AuthDialog open={dialogOpen} setOpen={handleAuthDialogClose} />
      <main className="flex flex-col justify-center items-center dark:text-white text-black">
        <section className={styles.heroSection}>
          {/* <Image
            src="https://images.unsplash.com/photo-1605210055810-bdd1c4d1f343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="background img"
            fill
            className={styles.heroImg}
          /> */}
          <h1 className={`${styles.heroTitle} pb-2`}>Want Tasty Recipes</h1>
          <AlgoliaDialog buttonType="searchBar" />
        </section>
        <section className="pt-9 ">
          <h2 className="text-step0 font-Roboto font-bold">Breakfast</h2>
          <SwiperTemplate>
            {breakFast ? (
              breakFast.map((item: Recipe) => (
                <SwiperSlide>
                  <CardSquare
                    title={item.recipeName}
                    id={item.id}
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
          <h2 className="text-step0 font-Roboto font-bold">Lunch</h2>
          <SwiperTemplate>
            {lunch ? (
              lunch.map((item: Recipe) => (
                <SwiperSlide>
                  <CardSquare
                    title={item.recipeName}
                    id={item.id}
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
          <h2 className="text-step0 font-Roboto font-bold">Dinner</h2>
          <SwiperTemplate>
            {dinner ? (
              dinner.map((item: Recipe) => (
                <SwiperSlide>
                  <CardSquare
                    title={item.recipeName}
                    id={item.id}
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
        <section className="flex flex-row w-1/2 justify-between">
          <div className="flex flex-col justify-center p-3 dark:bg-dark_grey bg-white rounded-lg">
            <h2 className="text-center text-step0 font-Roboto font-bold">
              Sweet
            </h2>
            <div className="grid grid-rows-2 grid-cols-2 gap-4">
              {sweet.map((item) => (
                <CardRectangleSmall
                  title={item.recipeName}
                  id={item.id}
                  totalTime={item.info.total}
                  key={item.id}
                  handleClick={() => console.log('clicked')}
                  image={{
                    imgUrl: item.image.imgUrl || '',
                    imgAlt: item.image.imgAlt || '',
                  }}
                />
              ))}
            </div>
            <Link
              href="/sweet"
              className="text-step--3  text-center font-normal underline underline-offset-2"
            >
              View all
            </Link>
          </div>
          <div className="flex flex-col justify-center p-3 dark:bg-dark_grey bg-white rounded-lg">
            <h2 className="text-center text-step0 font-Roboto font-bold">
              Savoury
            </h2>
            <div className="grid grid-rows-2 grid-cols-2 gap-4">
              {savoury.map((item) => (
                <CardRectangleSmall
                  title={item.recipeName}
                  id={item.id}
                  totalTime={item.info.total}
                  key={item.id}
                  handleClick={() => console.log('clicked')}
                  image={{
                    imgUrl: item.image.imgUrl || '',
                    imgAlt: item.image.imgAlt || '',
                  }}
                />
              ))}
            </div>
            <Link
              href="/savoury"
              className="text-step--3  text-center font-normal underline underline-offset-2"
            >
              View all
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const breakFast = await RecipeService.getLatestMealTime('breakfast');
  const lunch = await RecipeService.getLatestMealTime('lunch');
  const dinner = await RecipeService.getLatestMealTime('dinner');
  const sweet = await RecipeService.getRecipesByCategory('sweet', 4);
  const savoury = await RecipeService.getRecipesByCategory('savoury', 4);
  return {
    props: {
      breakFast: JSON.parse(JSON.stringify(breakFast)),
      lunch: JSON.parse(JSON.stringify(lunch)),
      dinner: JSON.parse(JSON.stringify(dinner)),
      sweet: JSON.parse(JSON.stringify(sweet)),
      savoury: JSON.parse(JSON.stringify(savoury)),
    },
    revalidate: 60 * 60 * 24 * 7,
  };
}

export default RecipesPages;
