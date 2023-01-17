'use client';
import { TextField } from '@mui/material';
import React from 'react';
import Form from '@components/elements/recipe_elemnts/Form';
import RecipeService from '@lib/service/RecipeService';

const recipe = {
  id: 'testDoc',
  imageUrl:
    'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
  recipeName: 'Chocolate fudge Brownies',
  recipeDescription:
    'This is my own recipe that has been changed from another recipe to make it fuggy ',
  keywords: ['chocolate', 'fudge', 'brownies'],
  ingredients: [
    ['butter', '200', 'g'],
    ['coca powder', '1/2', 'cup'],
    ['brown sugar', '2', 'cups'],
    ['vanilla  essence', '1', 'teaspoon'],
    ['whisked eggs', '2', ''],
    ['plain flour', '1', 'cup'],
  ],
  dietary: ['vegetarian'],
  Allergens: ['gluten', 'dairy'],
  sweet_savoury: 'sweet', // sweet or savoury
  meallyTime: ['morning_tea', 'afternoon_tea', 'snack'], // breakfast, morning_tea, brunch, lunch, afternoon_tea, dinner, snack
  version: '1.0',
  createdBy: 'Jacob Samorowski',
  createdAt: Date.now().toString(),
  info: {
    total: '30 min',
    prep: '10 min',
    cook: '20 min',
    serves: 6,
    rating: 4,
  },
  steps: [
    'Preheat Oven to 180 degrees, grease a tray line with baking paper and melt butter',
    'Put cocoa and brown sugar in a bowl combine all together, and add melted butter and Vanilla, stir well',
    'Add eggs and stir till the mixture is glossy',
    'Sift flour and mix',
    'Spread evenly on tray, bake for 20-25 minutes',
    'Once cool, Dust with icing sugar',
    'Cut to size',
  ],
  madeRecipe: 5,
  savedRecipe: 20,
}


const RecipeCreationForm = () => {

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
      body: JSON.stringify(recipe), // body data type must match "Content-Type" header
    });
  };

  return (
    <>
      <Form />
      <button onClick={ () => {
        fetch('/api/recipe/create', {
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
          body: JSON.stringify(recipe), // body data type must match "Content-Type" header
        })
      }}>Create recipe</button>
    </>
  );
};

export default RecipeCreationForm;
