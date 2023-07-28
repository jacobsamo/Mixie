import { Trash2Icon } from 'lucide-react';
import { units } from '@/src/common/lib/services/data';
import { Controller, useFormContext } from 'react-hook-form';
import { Ingredient as IngredientType } from '@/src/db/types';
import { Input } from '../../ui/input';
import { recipeFormSchema } from './form';
import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Button } from '../../ui/button';

interface IngredientProps {
  index: number;
  values: IngredientType;
  handleDelete: (index: number) => void;
}

const Ingredient = ({ index, values, handleDelete }: IngredientProps) => {
  const { register, getValues, watch, control } =
    useFormContext<z.infer<typeof recipeFormSchema>>();
  const activeUnit = getValues(`ingredients.${index}.unit`);

  if (values.isHeading) {
    return (
      <div className="flex flex-row flex-wrap items-center gap-1">
        <Input {...register(`ingredients.${index}.title` as const)} />
        <Button
          ariaLabel="delete ingredient"
          onClick={() => handleDelete(index)}
          type="button"
          className="bg-transparent border border-solid border-red hover:bg-red  rounded-md"
          size="icon"
        >
          <Trash2Icon className="h-6 w-6 text-red group-hover:text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div
      key={index}
      className="flex flex-row flex-wrap items-center gap-1 rounded-md"
    >
      <Input
        {...register(`ingredients.${index}.title` as const)}
        placeholder="Ingredient"
      />

      <Controller
        control={control}
        name={`ingredients.${index}.unit` as const}
        render={({ field }) => (
          <Select
            defaultValue={field?.value || ''}
            onValueChange={field.onChange}
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
        )}
      />

      <Input
        type="number"
        {...register(`ingredients.${index}.quantity`, { min: 0 })}
      />
      {['cup', 'tbsp', 'tsp'].includes(
        watch(`ingredients.${index}.unit`) || ''
      ) ? (
        <Controller
          control={control}
          name={`ingredients.${index}.amount`}
          render={({ field }) => (
            <Select
              defaultValue={field?.value || ''}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="min-w-[6rem] w-fit p-2 h-10">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1/2">1/2 {activeUnit}</SelectItem>
                <SelectItem value="1/3">1/3 {activeUnit}</SelectItem>
                <SelectItem value="2/3">2/3 {activeUnit}</SelectItem>
                <SelectItem value="1/4">1/4 {activeUnit}</SelectItem>
                <SelectItem value="3/4">3/4 {activeUnit}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      ) : (
        <></>
      )}

      <Button
        ariaLabel="delete ingredient"
        onClick={() => handleDelete(index)}
        type="button"
        className="bg-transparent border border-solid border-red hover:bg-red  rounded-md"
        size="icon"
      >
        <Trash2Icon className="h-6 w-6 text-red hover:text-white" />
      </Button>
    </div>
  );
};

export { Ingredient };
