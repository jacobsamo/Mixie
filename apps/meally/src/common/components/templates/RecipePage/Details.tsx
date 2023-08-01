'use client';
import React, { useEffect, useMemo, useState } from 'react';
import StepContainer from './step/StepContainer';
import AddBatch from './ingredient/AddBatch';
import type { Ingredient as IngredientType, Step } from '@/src/db/types';
import Ingredient from './ingredient/Ingredient';
import { cva, type VariantProps } from 'class-variance-authority';
import { set } from 'zod';
import { calculateAllIngredients } from '@/src/common/lib/utils';

interface DetailsProps {
  ingredients: IngredientType[];
  steps: Step[];
}

//title styles for the ingredients and steps section with cva (class variance authority) to remove the underline from the h2
const titleStyles = cva('md:cursor-default', {
  variants: {
    variant: {
      true: 'underline underline-offset-2',
      false: 'underline-none',
    },
  },
  defaultVariants: {
    variant: true,
  },
});

const Details = ({ ingredients, steps }: DetailsProps) => {
  const [add, setAdd] = useState(0);
  const [ingredientOpen, setIngredientOpen] = useState(true);
  const [stepsOpen, setStepsOpen] = useState(true);

  const calculatedIngredients = useMemo(() => {
    return calculateAllIngredients(ingredients, add);
  }, [add, ingredients]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaQueryChange = (mediaQuery: any) => {
      if (mediaQuery.matches) {
        setStepsOpen(false);
        setIngredientOpen(true);
      } else {
        setStepsOpen(true);
        setIngredientOpen(true);
      }
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <div className="md:w-[800px] flex flex-row items-center gap-x-[50%] pb-2 px-2">
        <button
          onClick={() => {
            if (window.innerWidth <= 768) {
              setIngredientOpen(true);
              setStepsOpen(false);
            }
          }}
        >
          <h2 className={titleStyles({ variant: ingredientOpen })}>
            {ingredients.length > 0 ? (
              <>
                {ingredients.length}{' '}
                {ingredients.length === 1 ? 'Ingredient' : 'Ingredients'}
              </>
            ) : (
              'No Ingredients'
            )}
          </h2>
        </button>
        <button
          onClick={() => {
            if (window.innerWidth <= 768) {
              setStepsOpen(true);
              setIngredientOpen(false);
            }
          }}
        >
          <h2 className={titleStyles({ variant: stepsOpen })}>
            {steps.length > 0 ? (
              <>
                {steps.length} {steps.length === 1 ? 'Step' : 'Steps'}
              </>
            ) : (
              'No Steps'
            )}
          </h2>
        </button>
      </div>

      <section className="md:w-[800px] w-full flex flex-row md:gap-4 lg:gap-8">
        {ingredientOpen && (
          <div className="flex flex-col items-start p-2 w-full h-fit md:w-60 dark:bg-grey bg-white shadow rounded-lg ">
            <AddBatch add={add} setAdd={setAdd} />
            {calculatedIngredients.map((ingredient, index) => {
              if (ingredient.isHeading)
                return (
                  <h3 key={index} className="text-2xl font-bold">
                    {ingredient.title}
                  </h3>
                );
              return <Ingredient key={index} ingredient={ingredient} />;
            })}
          </div>
        )}
        {stepsOpen && (
          <StepContainer steps={steps} ingredients={calculatedIngredients} />
        )}
      </section>
    </>
  );
};

export default Details;
