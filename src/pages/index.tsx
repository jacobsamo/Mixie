import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import styles from '@styles/Home.module.scss';

//import components
import Navbar from '@components/modules/Navbar';



const Home: NextPage = () => {

  useEffect(() => {
    localStorage.setItem("visited", Date.now.toString());
  }, [])  

  const HeroSection = () => {
    if (!localStorage.getItem('visited')) {
      return (
        <>
          <img src="./images/background.jpg" 
            alt="" 
            className={styles.heroImg}
          />
          <div className={styles.heroSection}>
            <h1 className={styles.heroTitle}>Want Tasty Recipes</h1>
            <h2 className={styles.heroParagraph}>We offer a way to find good recipes without having to read all the information that isn’t important all free and open source</h2>
            <input 
              type="text" 
              placeholder='Find your next meal' 
              className={styles.heroSearch}
            />
          </div>
        </>
      )
    } else {
      return (
        <>
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
  }

  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  )
}

export default Home
