import React, { useCallback, useState, useEffect } from 'react';
import { AddButton } from 'shared';
import { Step } from './Step';
import styles from './Form.module.scss';
import {
  Control,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { Recipe } from 'libs/types';

const StepContainer = () => {
  const { control } = useFormContext<Recipe>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'steps',
    }
  );

  const handleDelete = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleAddClick = useCallback(() => {
    append({ step_body: '' });
  }, [append]);

  return (
    <article className={styles.method_container}>
      <div className={styles.step_container}>
        {fields.map((field, index: number) => {
          return (
            <Step index={index} handleDelete={handleDelete} key={field.id} />
          );
        })}
        <AddButton type="button" name="Step" onClick={() => handleAddClick()} />
      </div>
    </article>
  );
};

export { StepContainer };
