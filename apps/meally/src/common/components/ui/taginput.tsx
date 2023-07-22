import { X } from 'lucide-react';
import React, { useCallback } from 'react';
import { Input, InputProps } from './input';
import {
  Control,
  RegisterOptions,
  useController,
  useFieldArray,
  useForm,
} from 'react-hook-form';

// add types for react-hook-form so that we can use the `control` prop with the types from the formschema and not have to use `any`
export interface TagInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputProps {
  name: string;
  control: Control<any>;
  defaultValue?: string | number | undefined;
  options?: RegisterOptions;
}

const TagInput = ({
  name,
  control,
  defaultValue,
  options,
  ...props
}: TagInputProps) => {
  const { setValue, register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: name as string,
    }
  );

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === ',' || e.key === 'Enter') {
        e.preventDefault();
        append({ value: e.target.value });
        setValue(name, '');
      }
    },
    [append, name, setValue]
  );

  const handleRemove = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  return (
    <div className="mt-4">
      <div className="flex flex-row flex-wrap gap-1 w-full">
        {fields.map((field: any, index: any) => (
          <span
            key={index}
            className="flex justify-center items-center w-fit h-6 p-4 mb-2 rounded-lg text-step--2 gap-1 dark:text-white dark:bg-grey  "
          >
            {field.value}
            {handleRemove ? (
              <button onClick={() => handleRemove(index)} type="button">
                <X className="w-5 h-5 hover:text-red" />
              </button>
            ) : (
              <></>
            )}
          </span>
        ))}
      </div>
      <Input
        {...register(name, options)}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
};

export default TagInput;
