import React, { useCallback, useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { AddButton } from 'ui';
import styles from './Form.module.scss';

interface StepProps {
  index: number;
  value: string;
  handleChange: (index: number, event: any) => void;
  handleDelete: (index: number) => void;
}

const Step = ({ index, value, handleChange, handleDelete }: StepProps) => {
  const [bodyValue, setBodyValue] = useState('');

  function internalChange(event: any) {
    setBodyValue(event.target.value);
    handleChange(index, event.target.value);
  }

  return (
    <section
      key={index}
      className="relative flex flex-col items-start p-3 rounded-md h-fit w-96 flex-grow bg-white text-black dark:bg-dark_grey dark:text-white"
    >
      <h1 className="font-medium font-Roboto text-step0">Step {index + 1}</h1>
      <label>
        <textarea
          name="step_body"
          id="step_body"
          onChange={internalChange}
          value={value || bodyValue}
          rows={/\n/.test(value) ? Number(value.match(/\n/g)?.length) + 1 : 3}
          placeholder="Step body"
          className="resize-none w-80 mt-2 p-2 rounded-md border border-gray-300 dark:border-dark_grey focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
