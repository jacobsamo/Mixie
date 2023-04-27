import React, { TextareaHTMLAttributes, ReactElement, useState } from "react";
import InnerLabel from "./InnerLabel";

import {
  UseFormRegister,
  RegisterOptions,
  Control,
  useController,
  Controller,
} from "react-hook-form";

interface InputFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  label: string;
  type?: string;
  control: Control<any>;
  required?: boolean;
  defaultValue?: string | number | undefined;
  options?: RegisterOptions;
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
      render={({
        field,
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <div
          ref={containerRef}
          className="flex flex-col dark:outline dark:shadow-none dark:outline-grey dark:outline-1 focus:outline-1 shadow-main flex-1 items-start max-w-full rounded-md p-1 text-step--2 dark:bg-dark_grey bg-white"
        >
          {(focused || field.value) && (
            <InnerLabel label={label} id={id} className="text-step--3" />
          )}
          <textarea
            id={id}
            name={name}
            placeholder={focused || field.value ? "" : label}
            // onBlur={onBlur}
            // onFocus={onFocus}
            // onChange={field.onChange}
            value={field.value}
            ref={field.ref}
            rows={
              /\n/.test(field.value?.toString() || "")
                ? Number(field.value?.match(/\n/g)?.length) + 1
                : 3
            }
            className="resize-none w-full max-w-sm mt-2 p-2 rounded-md dark:outline dark:outline-grey dark:outline-2 dark:bg-dark_grey dark:shadow-none bg-white shadow-main"
            {...props}
          />
        </div>
      )}
    />
  );
}

export const TextArea = React.forwardRef(TextAreaComponent);
