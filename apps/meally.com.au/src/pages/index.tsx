import React from 'react';
import styles from '@styles/modules/Home.module.scss';
import Navbar from '@components/modules/Navbar';
import Footer from '@components/modules/Footer';
import AlgoliaDialog from '@components/elements/algolia_search/AlgoliaDialog';
import { CardRectangle, CardRectangleSmall } from '@components/modules/Cards';
import RecipeService from '@lib/service/RecipeService';
import { Recipe } from 'libs/types';
import { PageSeo } from 'ui';
import useAuth from 'src/common/hooks/useAuth';
import AuthDialog from '@components/elements/AuthDialog';

//swiper
import { SwiperSlide } from 'swiper/react';
import SwiperTemplate from '@components/templates/SwiperTemplate';

interface HomeProps {
  sweet: Recipe[];
  savoury: Recipe[];
  latestRecipes: Recipe[];
}

const Home = ({ latestRecipes, sweet, savoury }: HomeProps) => {
  const { handleAuthClick, handleAuthDialogClose } = useAuth();

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
          <AlgoliaDialog buttonType="searchBar" />
          <button>Test button</button>
        </section>
        <section className="pt-9 ">
          <SwiperTemplate>
            {latestRecipes ? (
              latestRecipes.map((item: Recipe, index: number) => (
                <SwiperSlide key={index}>
                  <CardRectangle
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
        <div className={styles.sweet_savouryContainer}>
          <section className={styles.sweet_savourySection}>
            <h1 className="text-center text-step0">Sweet</h1>
            <div className={styles.gridContainer}>
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
          </section>
          <section className={styles.sweet_savourySection}>
            <h1 className="text-center text-step0">Savoury</h1>
            <div className={styles.gridContainer}>
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
          </section>
        </div>
      </main>
      <Footer />
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
      sweet: sweet,
      savoury: savoury,
    },
    revalidate: 60 * 60 * 24 * 7,
  };
}

export default Home;
