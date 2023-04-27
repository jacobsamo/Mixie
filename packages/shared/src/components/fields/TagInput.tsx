import { XMarkIcon } from "@heroicons/react/24/outline";
import React, {
  TextareaHTMLAttributes,
  ReactElement,
  useState,
  useCallback,
} from "react";
import InnerLabel from "./InnerLabel";

import {
  UseFormRegister,
  RegisterOptions,
  Control,
  useController,
  Controller,
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
  const { register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "steps",
    }
  );
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  //   const [textareaValue, setTextareaValue] = useState("");
  //   const [tags, setTags] = useState<string[]>([]);

  //   const handleKeyDown = useCallback(
  //     (e: any) => {
  //       if (e.key === "," || e.key === "Enter") {
  //         e.preventDefault();
  //         setTags([...tags, textareaValue]);
  //         setTextareaValue("");
  //       }
  //     },
  //     [textareaValue, tags]
  //   );

  //   useEffect(() => {
  //     props.onTagsChange(props.name, tags);
  //   }, [tags]);

  const [textareaValue, setTextareaValue] = useState("");

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === "," || e.key === "Enter") {
        e.preventDefault();
        append(textareaValue);
        setTextareaValue("");
      }
    },
    [append, textareaValue]
  );

  const handleRemove = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  return (
    <div className="flex flex-col gap-1 h-fit w-auto">
      {(focused || fields.value) && (
        <InnerLabel label={label} id={id} className="text-step--3" />
      )}
      <div className="flex flex-row flex-wrap gap-1 w-72">
        {fields.map((field: any, index: any) => (
          <span
            key={index}
            className="flex justify-center items-center w-fit h-6 p-2 rounded-lg text-step--2 gap-1 dark:text-white text-black dark:bg-grey bg-white"
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
        onChange={(e) => setTextareaValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        className="w-72 h-12 rounded-md text-step--1 resize-none"
        {...props}
      />
      {hint ? <p className="text-[0.78rem] font-thin italic">{hint}</p> : false}
    </div>
  );
};

export { TagInput };
function useFieldArray(arg0: { control: Control<any>; name: string }): {
  fields: any;
  append: any;
  prepend: any;
  remove: any;
  swap: any;
  move: any;
  insert: any;
} {
  throw new Error("Function not implemented.");
}

function useForm(): { register: any } {
  throw new Error("Function not implemented.");
}
