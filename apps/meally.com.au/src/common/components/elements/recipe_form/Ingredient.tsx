import { TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import styles from './Form.module.scss';
import { units } from '@lib/service/data';
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
  FieldValues,
} from 'react-hook-form';
import { Ingredient, Recipe } from 'libs/types';

interface IngredientProps {
  index: number;
  values: Ingredient;
  register: UseFormRegister<Recipe>;
  watch: UseFormWatch<Recipe>;
  getValues: UseFormGetValues<Recipe>;
  handleDelete: (index: number) => void;
}

const Ingredient = ({
  index,
  values,
  register,
  watch,
  getValues,
  handleDelete,
}: IngredientProps) => {
  const activeUnit = getValues(`ingredients.${index}.unit`);

  return (
    <section key={index} className={styles.ingredient}>
      <input
        {...register(`ingredients.${index}.ingredient`)}
        type="text"
        placeholder="ingredient"
        defaultValue={getValues(`ingredients.${index}.ingredient`)}
        className="w-50 h-10 rounded-md p-2 text-step--3"
      />
      <select
        id={`ingredients.${index}.unit`}
        defaultValue={getValues(`ingredients.${index}.unit`)}
        {...register(`ingredients.${index}.unit`)}
      >
        {units.map((unit, index) => {
          return (
            <option value={unit} key={index}>
              {unit}
            </option>
          );
        })}
      </select>
      <input
        type="number"
        placeholder="quantity"
        defaultValue={values.quantity}
        {...register(`ingredients.${index}.quantity`, { min: 0 })}
        className="w-20 h-10 rounded-md p-2 text-step--4"
      />
      {['cup', 'tbsp', 'tsp'].includes(watch(`ingredients.${index}.unit`)) ? (
        <>
          <select
            id="measurement"
            defaultValue={values.measurement}
            {...register(`ingredients.${index}.measurement`)}
            // value={value.split('|')[1]?.trim().split(' ')[1] || cupSelect}
            // onChange={(event: any) => setCupSelect(event.target.value)}
          >
            <option value=""></option>
            <option value="1/2">1/2 {}</option>
            <option value="1/2">1/3 {activeUnit}</option>
            <option value="1/2">2/3 {activeUnit}</option>
            <option value="1/4">1/4 {activeUnit}</option>
            <option value="3/4">3/4 {activeUnit}</option>
          </select>
        </>
      ) : (
        <></>
      )}

      <button onClick={() => handleDelete(index)} type="button">
        <TrashIcon className="h-6 w-6" />
      </button>
    </section>
  );
};

export { Ingredient };
