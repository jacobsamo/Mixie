import React, { useCallback, useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { AddButton, TextArea } from 'shared';
import styles from './Form.module.scss';
import { Control } from 'react-hook-form';

interface StepProps {
  index: number;
  value: string;
  control: Control<any>;
  handleChange: (index: number, event: any) => void;
  handleDelete: (index: number) => void;
}

const Step = ({
  index,
  value,
  control,
  handleChange,
  handleDelete,
}: StepProps) => {
  const [bodyValue, setBodyValue] = useState('');

  // function internalChange(event: any) {
  //   setBodyValue(event.target.value);
  //   handleChange(index, event.target.value);
  // }

  return (
    <section
      key={index}
      className="relative flex flex-col items-start p-3 rounded-md h-fit w-96 flex-grow bg-white text-black dark:bg-dark_grey dark:text-white"
    >
      <h1 className="font-medium font-Roboto text-step0">Step {index + 1}</h1>
      <label>
        <TextArea
          value={value}
          id="step_body"
          label="Step body"
          name="step_body"
          control={control}
        />
      </label>
      <button
        onClick={() => handleDelete(index)}
        type="button"
        className="absolute right-2 top-2"
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </section>
  );
};

export { Step };
