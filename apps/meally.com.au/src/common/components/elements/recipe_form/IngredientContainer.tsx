import { useCallback, useEffect, useState } from 'react';
import { AddButton, InputField } from 'shared';
import styles from './Form.module.scss';
import { Ingredient } from './Ingredient';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';
import { Recipe } from 'libs/types';

interface IngredientContainerProps {
  control: Control<Recipe>;
}

const IngredientContainer = () => {
  const { setValue, getValues, register, control, watch } = useFormContext<Recipe>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'ingredients',
    }
  );

  const handleChange = useCallback(
    (index: number, value: any) => {
      setValue(`ingredients.${index}`, value);
    },
    [setValue]
  );

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
          className={`${styles.recipeIngredients} flex flex-col w-[12.5rem] gap-3`}
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
                watch={watch}
                register={register}
                getValues={getValues}
                handleDelete={handleDelete}
                key={field.id}
              />
            );
          })}
          <button type="button" onClick={() => console.log(getValues())}>
            Get values
          </button>
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
