import { useCallback } from 'react';
import { AddButton, InputField } from 'shared';
import styles from './Form.module.scss';
import { Ingredient } from './Ingredient';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { Recipe, Ingredient as IngredientType } from 'libs/types';
import { defaultInputStyles } from '@styles/defaultStyles';
import { TrashIcon } from '@heroicons/react/24/outline';
import { DraggAbleCard } from './Dragableitem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const IngredientContainer = () => {
  const { control, register } = useFormContext<Recipe>();
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
      <article>
        <section
          className={`${styles.recipeIngredients} flex flex-col w-[12.5rem] gap-3 dark:bg-dark_grey dark:shadow-none shadow-main dark:text-white text-black bg-white`}
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
                      <input
                        className={`${defaultInputStyles}`}
                        {...register(`ingredients.${index}.heading` as const)}
                        defaultValue={field.heading}
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
