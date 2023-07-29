import { useCallback } from 'react';
import { Ingredient } from './Ingredient';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DraggAbleCard } from './Dragableitem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '../../ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { recipeFormSchema } from './form';
import * as z from 'zod';

const IngredientContainer = () => {
  const { control, register } =
    useFormContext<z.infer<typeof recipeFormSchema>>();
  const { fields, append, remove, move } = useFieldArray<
    z.infer<typeof recipeFormSchema>
  >({
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
    append({
      title: '',
      unit: 'grams',
      quantity: null,
      isHeading: false,
      amount: null,
    });
  }, [append]);

  const handleHeadingClick = useCallback(() => {
    append({
      title: '',
      isHeading: true,
      unit: null,
      quantity: null,
      amount: null,
    });
  }, [append]);

  const handleSwap = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      move(sourceIndex, targetIndex);
    },
    [move]
  );

  return (
    <>
      <section className="flex flex-col w-fit h-fit p-4 gap-3 dark:bg-grey shadow  bg-white rounded-lg">
        <DndProvider backend={HTML5Backend}>
          {fields.map((field, index) => (
            <DraggAbleCard
              index={index}
              id={field.id}
              key={field.id}
              acceptType="ingredient"
              moveCard={handleSwap}
              showHandle
            >
              <Ingredient
                index={index}
                // TODO: fix these errors - data still passes just throws errors here so no issue for now  
                values={{
                  title: field.title,
                  unit: field.unit,
                  quantity: field.quantity,
                  isHeading: field.isHeading,
                  amount: field.amount,
                }}
                handleDelete={handleDelete}
                key={field.id}
              />
            </DraggAbleCard>
          ))}
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
          variant={'secondary'}
        >
          <PlusCircleIcon className="w-5 h-5" />
          Add Ingredient
        </Button>
      </section>
    </>
  );
};

export { IngredientContainer };
