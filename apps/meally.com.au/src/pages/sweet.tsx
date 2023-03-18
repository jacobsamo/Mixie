import React from 'react';
import styles from '@styles/modules/Home.module.scss';
import Navbar from '@components/elements/Navbar';
import Footer from '@components/elements/Footer';
import Algolia_Search_Dialog from '@components/elements/algolia_search_dialog';
import { CardSquare } from '@components/elements/Cards';
import RecipeService from '@lib/service/RecipeService';
import { Recipe } from 'libs/types';
import { PageSeo } from 'ui';
import { NextPage } from 'next';

interface SweetProps {
  sweet: Recipe[];
}

const Sweet: NextPage<SweetProps> = ({ sweet }: SweetProps) => {
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
          <h1 className={`${styles.heroTitle} pb-2`}>Want Tasty Recipes</h1>
          <Algolia_Search_Dialog buttonType="searchBar" />
        </section>
        <section className="grid grid-cols-4 gap-4 w-screen h-96 overflow-scroll">
          {sweet.map((item: Recipe) => (
            <CardSquare
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
        </section>
      </main>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const sweet = await RecipeService.getRecipesByCategory('sweet', 1000);
  return {
    props: {
      sweet: sweet,
    },
  };
}

export default Sweet;
