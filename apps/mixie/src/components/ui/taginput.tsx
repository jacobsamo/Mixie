import { X } from "lucide-react";
import React, { useCallback } from "react";
import { Input, InputProps } from "./input";
import {
  Control,
  RegisterOptions,
  useController,
  useFieldArray,
  useForm,
} from "react-hook-form";

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
  const { fields, append, prep_timeend, remove, swap, move, insert } =
    useFieldArray({
      control,
      name: name as string,
    });

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
    <div className="mt-4">
      <div className="flex h-fit max-h-[6rem] w-full flex-row flex-wrap gap-1 overflow-scroll">
        {fields.map((field: any, index: any) => (
          <span
            key={index}
            className="mb-2 flex h-6 w-fit items-center justify-center gap-1 rounded-lg p-4 text-step--2 shadow-md dark:bg-grey dark:text-white  "
          >
            {field.value}
            {handleRemove ? (
              <button onClick={() => handleRemove(index)} type="button">
                <X className="h-5 w-5 hover:text-red" />
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
