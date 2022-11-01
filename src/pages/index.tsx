import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import styles from '@styles/Home.module.scss';

//import components
import Navbar from '@components/modules/Navbar';



const Home: NextPage = () => {

  // useEffect(() => {
  //   localStorage.setItem("visited", Date.now.toString());
  // }, [])  

  

  return (
    <>
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
