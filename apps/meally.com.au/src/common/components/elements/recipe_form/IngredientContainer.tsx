import { useCallback, useEffect, useState } from 'react';
import { AddButton, InputField } from 'shared';
import styles from './Form.module.scss';
import { Ingredient } from './Ingredient';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';
import { Recipe } from 'libs/types';

const IngredientContainer = () => {
  const { control } = useFormContext<Recipe>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const handleDelete = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleAddClick = useCallback(() => {
    append({ ingredient: '', unit: 'gram', quantity: undefined });
  }, [append]);

  return (
    <>
      <article>
        <section
          className={`${styles.recipeIngredients} flex flex-col w-[12.5rem] gap-3 dark:bg-dark_grey dark:shadow-none shadow-main dark:text-white text-black bg-white`}
        >
          {fields.map((field, index) => {
            return (
              <Ingredient
                index={index}
                values={{
                  ingredient: field.ingredient,
                  unit: field.unit,
                  quantity: field.quantity,
                  measurement: field.measurement,
                }}
                handleDelete={handleDelete}
                key={field.id}
              />
            );
          })}
          <AddButton
            type="button"
            name="Ingredient"
            onClick={() => handleAddClick()}
          />
        </section>
      </article>
    </>
  );
};

export { IngredientContainer };
