import { useCallback } from 'react';
import { Ingredient } from './Ingredient';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { Ingredient as IngredientType } from '@/src/db/types';
import { TrashIcon } from 'lucide-react';
import { DraggAbleCard } from './Dragableitem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { PlusCircleIcon } from 'lucide-react';

const IngredientContainer = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
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
    append({ ingredient: '', unit: 'grams', quantity: undefined });
  }, [append]);

  const handleHeadingClick = useCallback(() => {
    append({ heading: '' });
  }, [append]);

  const handleSwap = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      move(sourceIndex, targetIndex);
    },
    [move]
  );

  return (
    <>
      <section
        className={` flex flex-col w-full gap-3 dark:bg-dark_grey dark:shadow-none shadow  bg-white dark:bg-grey`}
      >
        <DndProvider backend={HTML5Backend}>
          {fields.map((field, index) => {
            if ('ingredient' in field) {
              return (
                <DraggAbleCard
                  key={field.id}
                  index={index}
                  id={field.id}
                  acceptType="ingredient"
                  moveCard={handleSwap}
                  showHandle
                >
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
                </DraggAbleCard>
              );
            } else {
              return (
                <DraggAbleCard
                  key={field.id}
                  index={index}
                  id={field.id}
                  acceptType="ingredient"
                  moveCard={handleSwap}
                  showHandle
                >
                  <div className="flex flex-row">
                    <Input
                      {...register(`ingredients.${index}.heading` as const)}
                      key={field.id}
                    />
                    <button onClick={() => handleDelete(index)} type="button">
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                </DraggAbleCard>
              );
            }
          })}
        </DndProvider>
        <button
          type="button"
          onClick={() => handleHeadingClick()}
          className="text-step--3 mt-0"
        >
          Add Heading
        </button>
        <Button
          ariaLabel="Add an ingredient"
          className="flex flex-row items-center gap-2 h-9 text-step--2 mt-3 border rounded-xl"
          onClick={() => handleAddClick()}
          name="Ingredient"
          type="button"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Add Ingredient
        </Button>
      </section>
    </>
  );
};

export { IngredientContainer };
