import React from 'react'
import type {Recipe} from '@lib/types/recipe';
import { HeartIcon } from '@heroicons/react/24/outline';
import styles from '@component_styles/recipeCard.module.scss';


const RecipeCard = (recipe: any) => {
  return (
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
  )
}

export default RecipeCard