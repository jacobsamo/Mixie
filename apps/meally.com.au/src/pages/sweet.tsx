import React from 'react';
import styles from '@styles/modules/Home.module.scss';
import Navbar from '@components/modules/Navbar';
import Footer from '@components/modules/Footer';
import AlgoliaDialog from '@components/elements/algolia_search/AlgoliaDialog';
import { CardSquare } from '@components/modules/Cards';
import RecipeService from '@lib/service/RecipeService';
import { Recipe } from 'libs/types';
import { PageSeo } from 'ui';
import { NextPage } from 'next';
import useAuth from 'src/common/hooks/useAuth';
import AuthDialog from '@components/elements/AuthDialog';

interface SweetProps {
  sweet: Recipe[];
}

const Sweet: NextPage<SweetProps> = ({ sweet }: SweetProps) => {
  const { dialogOpen, handleAuthClick, handleAuthDialogClose } = useAuth();
  return (
    <>
      <PageSeo
        title="Meally Cook, Collaborate & Create"
        url="meally.com.au"
        imgUrl=""
        description="A directory of folder full things."
      />
      <Navbar />
      <AuthDialog open={dialogOpen} setOpen={handleAuthDialogClose} />
      <main className="flex flex-col gap-4 w-full h-full p-2">
        <section className={styles.heroSection}>
          <h1 className={`${styles.heroTitle} pb-2`}>Want Tasty Recipes</h1>
          <AlgoliaDialog buttonType="searchBar" />
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
    revalidate: 60 * 60 * 24 * 7,
  };
}

export default Sweet;
