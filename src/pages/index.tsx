import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import styles from '@styles/Home.module.scss';

//import components
import Navbar from '@components/modules/Navbar';
import LandingPageSEO from '@components/seo/LandingPageSEO';


const Home: NextPage = () => {
  return (
    <>
      <LandingPageSEO />
      <Navbar />
        <div className=''>
          <h1 className={styles.heroTitle}>Want Tasty Recipes</h1>
          <input 
            type="text" 
            placeholder='Find your next meal' 
            className={styles.heroSearch}
          />
        </div>
    </>
  )
}

export default Home
