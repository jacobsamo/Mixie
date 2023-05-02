import { XMarkIcon } from "@heroicons/react/24/outline";
import React, {
  TextareaHTMLAttributes,
  ReactElement,
  useState,
  useCallback,
} from "react";
import InnerLabel from "./InnerLabel";

import {
  RegisterOptions,
  Control,
  useForm,
  useFieldArray,
} from "react-hook-form";

interface TagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  hint?: string;
  type?: string;
  control: Control<any>;
  required?: boolean;
  defaultValue?: string | number | undefined;
  options?: RegisterOptions;
}

const TagInput = ({
  id,
  name,
  label,
  hint,
  type,
  control,
  required,
  defaultValue,
  options,
  ...props
}: TagInputProps) => {
  const { register, getValues, setValue } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: name  ,
    }
  );
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === "," || e.key === "Enter") {
        e.preventDefault();
        append({ value: e.target.value });
        setValue(name, "");
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
    <div className="flex flex-col gap-1 h-fit w-auto ">
      {(focused || getValues(name)) && (
        <InnerLabel label={label} id={id} className="text-step--3" />
      )}
      <div className="flex flex-row flex-wrap gap-1 w-72">
        {fields.map((field: any, index: any) => (
          <span
            key={index}
            className="flex justify-center items-center w-fit h-6 p-2 rounded-lg text-step--2 gap-1 dark:text-white dark:bg-dark_grey text-black bg-white "
          >
            {field.value}
            <button onClick={() => handleRemove(index)} type="button">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </span>
        ))}
      </div>
      <input
        {...register(name, options)}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={focused || getValues(name) ? "" : label}
        className="w-72 h-12 rounded-md text-step--2 resize-none dark:bg-dark_grey dark:shadow-none shadow-main dark:text-white text-black bg-white"
        {...props}
      />
      {hint ? <p className="text-[0.78rem] font-thin italic">{hint}</p> : false}
    </div>
  );
};

export { TagInput };
