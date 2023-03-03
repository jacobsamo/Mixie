import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '@styles/modules/Home.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


//import components

import { PageSeo } from 'ui';
import Navbar from '@components/elements/Navbar';
import Footer from '@components/elements/Footer';
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
  const [mapArray, setMapArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const Cards = () => {
    return (
      <>
        <CardRectangleSmall
          title="test item"
          totalTime={20}
          key="test-item"
          handleClick={() => console.log('clicked')}
          image={{
            imgUrl: '/images/background.jpg',
            imgAlt: 'test item',
          }}
        />
        <CardRectangleSmall
          title="test item"
          totalTime={20}
          key="test-item"
          handleClick={() => console.log('clicked')}
          image={{
            imgUrl: '/images/background.jpg',
            imgAlt: 'test item',
          }}
        />
        <CardRectangleSmall
          title="test item"
          totalTime={20}
          key="test-item"
          handleClick={() => console.log('clicked')}
          image={{
            imgUrl: '/images/background.jpg',
            imgAlt: 'test item',
          }}
        />
        <CardRectangleSmall
          title="test item"
          totalTime={20}
          key="test-item"
          handleClick={() => console.log('clicked')}
          image={{
            imgUrl: '/images/background.jpg',
            imgAlt: 'test item',
          }}
        />
        <CardRectangleSmall
          title="test item"
          totalTime={20}
          key="test-item"
          handleClick={() => console.log('clicked')}
          image={{
            imgUrl: '/images/background.jpg',
            imgAlt: 'test item',
          }}
        />
        <CardRectangleSmall
          title="test item"
          totalTime={20}
          key="test-item"
          handleClick={() => console.log('clicked')}
          image={{
            imgUrl: '/images/background.jpg',
            imgAlt: 'test item',
          }}
        />
        <CardRectangleSmall
          title="test item"
          totalTime={20}
          key="test-item"
          handleClick={() => console.log('clicked')}
          image={{
            imgUrl: '/images/background.jpg',
            imgAlt: 'test item',
          }}
        />
        <CardRectangleSmall
          title="test item"
          totalTime={20}
          key="test-item"
          handleClick={() => console.log('clicked')}
          image={{
            imgUrl: '/images/background.jpg',
            imgAlt: 'test item',
          }}
        />
        <CardRectangleSmall
          title="test item"
          totalTime={20}
          key="test-item"
          handleClick={() => console.log('clicked')}
          image={{
            imgUrl: '/images/background.jpg',
            imgAlt: 'test item',
          }}
        />
      </>
    );
  };

  return (
    <>
      <PageSeo
        title="Meally Cook, Collaborate & Create"
        url="meally.com.au"
        imgUrl=""
        description="A directory of folder full things."
      />
      <Navbar />
      <main className="flex flex-col gap-4 w-full h-full p-2">
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
          <Swiper
            loop
            grabCursor
            slidesPerView={3}
            spaceBetween={710}
            centeredSlides={true}
            centerInsufficientSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay, Navigation]}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="w-full h-full justify-center"
          >
            {/* {latestRecipes.map((item: Recipe) => (
              <SwiperSlide>
                <CardRectangle
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
            ))} */}
            <SwiperSlide>
              <CardRectangle
                title="test item"
                totalTime={20}
                key="test-item"
                handleClick={() => console.log('clicked')}
                image={{
                  imgUrl: '/images/background.jpg',
                  imgAlt: 'test item',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardRectangle
                title="test item"
                totalTime={20}
                key="test-item"
                handleClick={() => console.log('clicked')}
                image={{
                  imgUrl: '/images/background.jpg',
                  imgAlt: 'test item',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardRectangle
                title="test item"
                totalTime={20}
                key="test-item"
                handleClick={() => console.log('clicked')}
                image={{
                  imgUrl: '/images/background.jpg',
                  imgAlt: 'test item',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardRectangle
                title="test item"
                totalTime={20}
                key="test-item"
                handleClick={() => console.log('clicked')}
                image={{
                  imgUrl: '/images/background.jpg',
                  imgAlt: 'test item',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardRectangle
                title="test item"
                totalTime={20}
                key="test-item"
                handleClick={() => console.log('clicked')}
                image={{
                  imgUrl: '/images/background.jpg',
                  imgAlt: 'test item',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardRectangle
                title="test item"
                totalTime={20}
                key="test-item"
                handleClick={() => console.log('clicked')}
                image={{
                  imgUrl: '/images/background.jpg',
                  imgAlt: 'test item',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardRectangle
                title="test item"
                totalTime={20}
                key="test-item"
                handleClick={() => console.log('clicked')}
                image={{
                  imgUrl: '/images/background.jpg',
                  imgAlt: 'test item',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardRectangle
                title="test item"
                totalTime={20}
                key="test-item"
                handleClick={() => console.log('clicked')}
                image={{
                  imgUrl: '/images/background.jpg',
                  imgAlt: 'test item',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardRectangle
                title="test item"
                totalTime={20}
                key="test-item"
                handleClick={() => console.log('clicked')}
                image={{
                  imgUrl: '/images/background.jpg',
                  imgAlt: 'test item',
                }}
              />
            </SwiperSlide>
          </Swiper>
        </section>
        <div className={styles.sweet_savouryContainer}>
          <section className={styles.sweet_savourySection}>
            <h1 className="text-center text-step0">Sweet</h1>
            <div className={styles.gridContainer}>
              {/*TODO: un comment below */}
              {/* {sweet.map((item) => (  
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
              ))} */}
              <Cards />
            </div>
          </section>
          <section className={styles.sweet_savourySection}>
            <h1 className="text-center text-step0">Savoury</h1>
            <div className={styles.gridContainer}>
              {/*TODO: un comment below */}
              {/* {savoury.map((item) => (
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
              ))} */}
              <Cards />
            </div>
          </section>
        </div>
      </main>
      <Footer />
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
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
