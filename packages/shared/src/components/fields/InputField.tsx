import React, { ReactElement, useState } from "react";
import InnerLabel from "./InnerLabel";

import {
  UseFormRegister,
  RegisterOptions,
  Control,
  useController,
  Controller,
} from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
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

function InputFieldComponent(
  {
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
  }: InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>,
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
          <input
            type={type || "text"}
            name={name}
            id={id}
            placeholder={focused || field.value ? "" : label}
            onBlur={onBlur}
            onFocus={onFocus}
            value={field.value}
            onChange={field.onChange}
            ref={field.ref}
            className="w-full dark:bg-dark_grey bg-white focus:outline-none"
            {...props}
          />
          {hint ? (
            <p className="text-[0.78rem] font-thin italic">{hint}</p>
          ) : (
            false
          )}

          
        </div>
      )}
    />
  );
}

export const InputField = React.forwardRef(InputFieldComponent);
