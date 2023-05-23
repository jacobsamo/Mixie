import React, { useCallback } from 'react';
import { AddButton } from 'shared';
import { Step } from './Step';
import styles from './Form.module.scss';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Recipe } from 'libs/types';
import { DraggAbleCard } from './Dragableitem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const StepContainer = () => {
  const { control } = useFormContext<Recipe>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'steps',
  });

  const handleDelete = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleAddClick = useCallback(() => {
    append({ step_body: '' });
  }, [append]);

  const handleSwap = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      move(sourceIndex, targetIndex);
    },
    [move]
  );

  return (
    <article className={styles.method_container}>
      <DndProvider backend={HTML5Backend}>
        {fields.map((field, index: number) => {
          return (
            <DraggAbleCard
              key={field.id}
              index={index}
              id={field.id}
              acceptType="step"
              moveCard={handleSwap}
            >
              <Step index={index} handleDelete={handleDelete} key={field.id} />
            </DraggAbleCard>
          );
        })}
      </DndProvider>
      <AddButton type="button" name="Step" onClick={() => handleAddClick()} />
    </article>
  );
};

export { StepContainer };
