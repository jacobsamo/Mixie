import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '@styles/modules/Home.module.scss';
import 'swiper/css';

//import components

import { PageSeo } from 'ui';
import Navbar from '@components/elements/Navbar';
import Algolia_Search_Dialog from '@components/elements/algolia_search_dialog';
import { Recipe } from 'libs/types';
import RecipeService from '@lib/service/RecipeService';
import { CardRectangle, CardRectangleSmall } from '@components/elements/Cards';

interface HomeProps {
  recipes: Recipe[];
  sweet: Recipe[];
  savoury: Recipe[];
  latestRecipes: Recipe[];
}

const Home = ({ recipes, latestRecipes, sweet, savoury }: HomeProps) => {
  return (
    <>
      <PageSeo
        title="Meally Cook, Collaborate & Create"
        url="meally.com.au"
        imgUrl=""
        description="A directory of folder full things."
      />
      <Navbar />
      <main className="flex flex-col w-screen h-screen pt-2">
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
        <section>
          <Swiper
            slidesPerView={3}
            spaceBetween={80}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay, Navigation]}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {latestRecipes.map((item) => (
              <SwiperSlide>
                <CardRectangle
                  title={item.recipeName}
                  totalTime={item.info.total}
                  key={item.id}
                  handleClick={() => console.log('clicked')}
                  image={{
                    imgUrl: item.image.imgUrl,
                    imgAlt: item.image.imgAlt,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <div className="flex flex-row gap-90 w-full h-full justify-center">
          <section>
            <h1>Sweet</h1>
            <div className={styles.gridFlow}>
              {sweet.map((item) => (
                <CardRectangleSmall
                  title={item.recipeName}
                  totalTime={item.info.total}
                  key={item.id}
                  handleClick={() => console.log('clicked')}
                  image={{
                    imgUrl: item.image.imgUrl,
                    imgAlt: item.image.imgAlt,
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <h1>Savoury</h1>
            <div className={styles.gridFlow}>
              {savoury.map((item) => (
                <CardRectangleSmall
                  title={item.recipeName}
                  totalTime={item.info.total}
                  key={item.id}
                  handleClick={() => console.log('clicked')}
                  image={{
                    imgUrl: item.image.imgUrl,
                    imgAlt: item.image.imgAlt,
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const recipes = await RecipeService.getAllRecipes();
  const latestRecipes = await RecipeService.getLatestRecipes();
  return {
    props: {
      recipes: recipes,
      latestRecipes: latestRecipes,
      sweet: recipes.filter((recipe) => recipe.sweet_savoury === 'sweet'),
      savoury: recipes.filter((recipe) => recipe.sweet_savoury === 'savoury'),
    },
  };
}

export default Home;
