import React, { useCallback, useState, useEffect } from 'react';
import { AddButton } from 'shared';
import { Step } from './Step';
import styles from './Form.module.scss';
import { Control, useFieldArray, useForm } from 'react-hook-form';

interface StepContainerProps {
  control: Control<any>;
}

const StepContainer = ({ control }: StepContainerProps) => {
  const { register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'steps',
    }
  );

  function handleDelete() {}

  return (
    <article className={styles.method_container}>
      <div className={styles.step_container}>
        {fields.map((field, index) => {
          return (
            <Step
              index={index}
              value={`steps.${index}.step_body`}
              handleDelete={handleDelete}
              key={field.id}
              control={control}
            />
          );
        })}
        <AddButton type="button" name="Step" onClick={() => handleAddClick()} />
      </div>
    </article>
  );
};

export { StepContainer };
