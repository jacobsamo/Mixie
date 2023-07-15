// Ingredient.tsx
import { TrashIcon } from 'lucide-react';
import styles from './Form.module.scss';
import { units } from '@/src/common/lib/services/data';
import { useFormContext } from 'react-hook-form';
import { Ingredient as IngredientType } from '@/src/db/types';
import { Input } from '../../ui/input';

interface IngredientProps {
  index: number;
  values: IngredientType;
  handleDelete: (index: number) => void;
}

const Ingredient = ({ index, values, handleDelete }: IngredientProps) => {
  const { register, getValues, watch } = useFormContext();
  const activeUnit = getValues(`ingredients.${index}.unit`);

  return (
    <section
      key={index}
      className={`flex flex-row dark:shadow-none shadow-main  rounded-md`}
    >
      <Input
        {...register(`ingredients.${index}.ingredient` as const)}
        placeholder="Ingredient"
      />
      <select
        id={`ingredients.${index}.unit`}
        className="dark:outline-none outline outline-1 w-fit h-fit rounded-lg p-2 text-step--4"
        defaultValue={getValues(`ingredients.${index}.unit`)}
        {...register(`ingredients.${index}.unit` as const)}
      >
        {units.map((unit, index) => {
          return (
            <option value={unit} key={index}>
              {unit}
            </option>
          );
        })}
      </select>
      <Input
        type="number"
        {...register(`ingredients.${index}.quantity`, { min: 0 })}
        className="w-20 h-10 rounded-md p-2 text-step--4 dark:outline-none outline outline-1"
      />
      {['cup', 'tbsp', 'tsp'].includes(
        watch(`ingredients.${index}.unit`) || ''
      ) ? (
        <>
          <select
            className="dark:outline-none outline outline-1 w-fit h-fit rounded-lg p-2 text-step--4"
            {...register(`ingredients.${index}.measurement` as const)}
          >
            <option value=""></option>
            <option value="1/2">1/2 {activeUnit}</option>
            <option value="1/3">1/3 {activeUnit}</option>
            <option value="2/3">2/3 {activeUnit}</option>
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
