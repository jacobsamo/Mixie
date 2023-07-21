// Ingredient.tsx
import { TrashIcon } from 'lucide-react';
import { units } from '@/src/common/lib/services/data';
import { useFormContext } from 'react-hook-form';
import { Ingredient as IngredientType } from '@/src/db/types';
import { Input } from '../../ui/input';
import { formSchema } from './form';
import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

interface IngredientProps {
  index: number;
  values: IngredientType;
  handleDelete: (index: number) => void;
}

const Ingredient = ({ index, values, handleDelete }: IngredientProps) => {
  const { register, getValues, watch } = useFormContext<z.infer<typeof formSchema>>();
  const activeUnit = getValues(`ingredients.${index}.unit`);

  return (
    <section
      key={index}
      className="flex flex-row items-center gap-1 rounded-md"
    >
      <button
        type="button"
        onClick={() => console.log(watch(`ingredients.${index}.unit.value`))}
      >
        Get values
      </button>
      <Input
        {...register(`ingredients.${index}.ingredient` as const)}
        placeholder="Ingredient"
      />

      <Select
        // id={`ingredients.${index}.unit`}

        // className="dark:outline-none outline outline-1 w-fit h-fit rounded-lg p-2 text-step--4"
        defaultValue={getValues(`ingredients.${index}.unit`)}
        {...register(`ingredients.${index}.unit` as const)}
      >
        <SelectTrigger className="w-24 h-10">
          <SelectValue placeholder="Unit" />
        </SelectTrigger>
        <SelectContent>
          {units.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        {...register(`ingredients.${index}.quantity`, { min: 0 })}
        // classNames={{ inputWrapper: 'w-fit' }}
        // className="w-20 h-10 rounded-md p-2 text-step--4 dark:outline-none outline outline-1"
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

      <button
        onClick={() => console.log(getValues(`ingredients.${index}.unit`))}
        type="button"
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </section>
  );
};

export { Ingredient };
