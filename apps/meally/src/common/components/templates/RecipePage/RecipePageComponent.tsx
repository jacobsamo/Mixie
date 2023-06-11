import React from 'react';
import Details from './Details';
import Info from './Info';
import StarRating from './StarRating';

const RecipePageComponent = () => {
  const rating = 4;
  return (
    <main>
      <h1>RecipePage</h1>
      <StarRating rating={rating} />
      <Info />
      <Details />
    </main>
  );
};

export default RecipePageComponent;
