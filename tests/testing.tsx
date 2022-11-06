import { NextPage } from 'next/types';
import React, { useState, useEffect } from 'react';
import RecipeService from '../src/common/shared/libs/service/RecipeService';
import axios from 'axios';
import { auth } from '@lib/config/firebase';
import SignupPage from '../src/common/components/templates/Singup/Signup';
import AuthService from '@lib/service/Authservice';
import RecipeCard from '@components/modules/RecipeCard';
import type {Recipe} from '@lib/types/recipe';
import { HeartIcon } from '@heroicons/react/24/outline';
import styles from '@component_styles/recipeCard.module.scss';

const testData = {
  id: 'testDoc',
  imageUrl:
    'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
  recipeName: 'Chocolate fudge Brownies',
  recipeDescription:
    'This is my own recipe that has been changed from another recipe to make it fuggy ',
  info: {
    total: '30min',
    prep: '10min',
    cook: '20min',
    serves: '6',
    rating: 4,
  },
  ingredients: ['flour', 'vinila essene', 'co co powder'],
  steps: [
    {
      number: 1,
      body: 'Preheat Oven to 180 degrees and grease a tray line with baking paper ',
    },
    {
      number: 2,
      body: 'Melt butter',
    },
  ],
  madeRecipe: 5,
  savedRecipe: 20,
  createdAt: Date.now().toString(),
  createdBy: 'Jacob Samorowski',
};

export async function getStaticProps() {
  const data = await fetch('http://localhost:3000/api/recipe');
  const recipes = JSON.parse(JSON.stringify(data));

  return {
    props: {
      recipes: recipes,
    }, // will be passed to the page component as props
  };
}

const Testing: NextPage = () => {
  const [recipeData, setRecipeData] = useState<any[]>([]);
  
  useEffect(() => {
    setRecipeData([testData]);
  }, [])

  
  const onSendData = async () => {
    await fetch('/api/recipe/create', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'same-origin',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(testData), // body data type must match "Content-Type" header
    });
  };



  const Recipes = () => {
    if (recipeData.length === 0) {
      return <h1>Loading...</h1>;
    }
    if (recipeData.length !== 0) {
      return (
        <>
          <div>
            {recipeData.map((recipe: Recipe) => (
              <>
                <div key={recipe.id} className='relative w-46 h-58 dark:bg-grey bg-white rounded-xl'>
                  <img src={recipe.imageUrl} alt={recipe.recipeName} className={styles.image}/>
                  <h1 className='dark:text-white text-black text-sm font-Roboto font-bold absolute left-2 top-36'>{recipe.recipeName}</h1>
                  <h1 className='dark:text-white text-black absolute bottom-1 left-3'>{recipe.id}</h1>
                  <HeartIcon 
                    className='dark:text-white text-black cursor-pointer absolute bottom-1 right-1 w-6 h-6'
                    onClick={() => console.log('heart icon clicked')}
                  />
                </div>
              </>  
            ))}
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };


  return (
    <>
      <h1>Testing</h1>
      <button onClick={() => {
        AuthService.signOutUser()
        console.log(auth.currentUser)
      }}>Sign out</button>
      <Recipes />
      
    </>
  );
};

export default Testing;
