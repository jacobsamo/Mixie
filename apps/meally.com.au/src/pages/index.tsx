import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '@styles/modules/Home.module.scss';
import 'swiper/css';

//import components

import { PageSeo } from 'ui';
import Navbar from '@components/elements/Navbar';
import Algolia_Search_Dialog from '@components/elements/algolia_search_dialog';
import { AdBanner } from 'ui';

const Home: NextPage = () => {
  return (
    <>
      <PageSeo
        title="Meally Cook, Collaborate & Create"
        url="meally.com.au"
        imgUrl=""
        description="A directory of folder full things."
      />
      <Navbar />
      <main className="flex flex-col w-full h-full pt-2">
        <section className="items-center flex flex-col justify-center h-52">
          <h1 className={`${styles.heroTitle} pb-2`}>Want Tasty Recipes</h1>
          <Algolia_Search_Dialog buttonType="searchBar" />
        </section>
        
      </main>
    </>
  );
};

export default Home;
