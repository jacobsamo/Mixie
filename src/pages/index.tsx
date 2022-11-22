import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import styles from '@styles/Home.module.scss';

//import components

import PageSeo from '@components/seo/PageSEO';
import Navbar from '@components/modules/Navbar';
import Algolia_Search_Dialog from '@components/elements/algolia_search_dialog';

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  function confirm() {
    console.log('confirm');
  }

  return (
    <>
      <PageSeo
        title="Meally — Find your next meal"
        url=""
        description="A directory of folder full things."
      />
      <Navbar />
      <div className="">
        <h1 className={styles.heroTitle}>Want Tasty Recipes</h1>
        <button onClick={() => setIsOpen(true)}>
          button
        </button>
        <Algolia_Search_Dialog collection='recipes' search_placeholder='Search for recipes' clicked={isOpen} />
      </div>
    </>
  );
};

export default Home;
