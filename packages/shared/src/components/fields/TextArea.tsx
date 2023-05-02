import React, { TextareaHTMLAttributes, ReactElement, useState } from "react";
import InnerLabel from "./InnerLabel";

import {
  UseFormRegister,
  RegisterOptions,
  Control,
  useController,
  Controller,
} from "react-hook-form";

interface InputFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  label: string;
  type?: string;
  control: Control<any>;
  required?: boolean;
  defaultValue?: string | number | undefined;
  options?: RegisterOptions;
  className?: string;
}

function TextAreaComponent(
  {
    id,
    name,
    label,
    type,
    control,
    required,
    defaultValue,
    options,
    className,
    ...props
  }: InputFieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  containerRef: React.ForwardedRef<HTMLDivElement>
): ReactElement {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || ""}
      rules={{ required: required, ...options }}
      render={({ field }) => (
        <div
          ref={containerRef}
          className={`flex flex-col w-full dark:outline dark:shadow-none dark:outline-grey dark:outline-1 focus:outline-1 shadow-main flex-1 items-start max-w-full rounded-md p-1 text-step--2 dark:bg-dark_grey bg-white ${className}`}
        >
          {(focused || field.value) && (
            <InnerLabel label={label} id={id} className="text-step--3" />
          )}
          <textarea
            id={id}
            name={name}
            placeholder={label}
            // onBlur={onBlur}
            // onFocus={onFocus}
            onChange={field.onChange}
            value={field.value}
            ref={field.ref}
            rows={
              /\n/.test(field.value?.toString() || "")
                ? Number(field.value?.match(/\n/g)?.length) + 1
                : 3
            }
            className="resize-none w-full rounded-md bg-white dark:bg-dark_grey"
            {...props}
          />
        </div>
      )}
    />
  );
}

export const TextArea = React.forwardRef(TextAreaComponent);
