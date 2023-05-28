import React from 'react';
import styles from '@styles/modules/Home.module.scss';
import Navbar from '@components/modules/Navbar';
import Footer from '@components/modules/Footer';
import { CardRectangle, CardRectangleSmall } from '@components/modules/Cards';
import RecipeService from '@lib/service/RecipeService';
import { Recipe, SimplifiedRecipe } from 'libs/types';
import { PageSeo } from 'shared';
import useAuth from 'src/common/hooks/useAuth';
import AuthDialog from '@components/elements/AuthDialog';

//swiper
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import SearchDialog from '@components/elements/search/SearchDialog';

interface HomeProps {
  sweet: SimplifiedRecipe[];
  savoury: SimplifiedRecipe[];
  latestRecipes: SimplifiedRecipe[];
}

const Home = ({ latestRecipes, sweet, savoury }: HomeProps) => {
  const { dialogOpen, handleAuthDialogClose } = useAuth();

  return (
    <>
      <PageSeo
        title="Meally Cook, Collaborate & Create"
        url="meally.com.au"
        imgUrl=""
        description="A directory of folder full things."
      />
      <AuthDialog open={dialogOpen} setOpen={handleAuthDialogClose} />
      <main className="flex flex-col gap-4 w-full h-full p-2">
        <section className={styles.heroSection}>
          {/* <Image
            src="https://images.unsplash.com/photo-1605210055810-bdd1c4d1f343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="background img"
            fill
            className={styles.heroImg}
          /> */}
          <h1 className={`${styles.heroTitle} pb-2`}>Want Tasty Recipes</h1>
          <SearchDialog buttonType="searchBar" />
        </section>
        <section className="pt-9 ">
          <Splide
            options={{
              type: 'loop',
              gap: '10rem',
              autoplay: true,
              pauseOnHover: false,
              resetProgress: false,
              focus: 'center',
              // perPage: 3,
            }}
          >
            {latestRecipes ? (
              latestRecipes.map((item: SimplifiedRecipe, index: number) => (
                <SplideSlide key={index}>
                  <CardRectangle recipe={item} />
                </SplideSlide>
              ))
            ) : (
              <h1>No Recipes at this point in time</h1>
            )}
          </Splide>
        </section>
        <div className={styles.sweet_savouryContainer}>
          <section className={styles.sweet_savourySection}>
            <h1 className="text-center text-step0">Sweet</h1>
            <div className={styles.gridContainer}>
              {sweet.map((item) => (
                <CardRectangleSmall recipe={item} />
              ))}
            </div>
          </section>
          <section className={styles.sweet_savourySection}>
            <h1 className="text-center text-step0">Savoury</h1>
            <div className={styles.gridContainer}>
              {savoury.map((item) => (
                <CardRectangleSmall recipe={item} />
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
      latestRecipes: JSON.parse(JSON.stringify(latestRecipes)),
      sweet: JSON.parse(JSON.stringify(sweet)),
      savoury: JSON.parse(JSON.stringify(savoury)),
    },
    revalidate: 60 * 60 * 24 * 7,
  };
}

export default Home;
