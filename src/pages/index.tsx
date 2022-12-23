import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import styles from '@styles/modules/Home.module.scss';

//import components

import PageSeo from '@components/seo/PageSEO';
import Navbar from '@components/modules/Navbar';
import Algolia_Search_Dialog from '@components/elements/algolia_search_dialog';
import AdBanner from '@components/modules/AdBanner';




const Home: NextPage = () => {
  return (
    <>
      <PageSeo
        title="Meally Cook, Collaborate & Create"
        url="meally.com.au"
        imgUrl=''
        description="A directory of folder full things."
      />
      <Navbar />
      <main>
        <div className="">
          <h1 className={styles.heroTitle}>Want Tasty Recipes</h1>
          <Algolia_Search_Dialog buttonType="searchBar" />
        </div>
      </main>
      <div>
        <AdBanner />
      </div>
    </>
  );
};

export default Home;
