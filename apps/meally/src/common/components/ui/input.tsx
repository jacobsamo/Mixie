import * as React from "react";

import { cn } from "@/src/common/lib/utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { HelpCircleIcon } from "lucide-react";
import type { FieldError } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  tooltip?: string;
  hint?: string;
  error?: FieldError | null;
  LeadingIcon?: React.ReactNode;
  TrailingIcon?: React.ReactNode;
  classNames?: {
    input?: string;
    inputWrapper?: string;
    label?: string;
    container?: string;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      className,
      classNames,
      type,
      label,
      tooltip,
      hint,
      error,
      LeadingIcon,
      TrailingIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn("flex flex-col gap-1 z-0", classNames?.container)}
        data-input="container"
      >
        {label && (
          <span
            className="flex flex-row items-center gap-2"
            data-input="label-container"
          >
            <label
              htmlFor={name}
              className={cn(
                "block text-step--3 font-medium",
                classNames?.label
              )}
            >
              {label} {props.required && <span className="text-red">*</span>}
            </label>
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <HelpCircleIcon className="h-5 w-5 opacity-70" />
                  </TooltipTrigger>
                  <TooltipContent sideOffset={5} side="bottom">
                    {tooltip}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </span>
        )}
        {error && (
          <span className="text-step--3 font-extralight italic text-red">
            {error.message}
          </span>
        )}
        <div
          className={cn(
            "focus-visible:ring-ring flex w-full flex-row items-center rounded-md border border-black bg-white p-1 py-1  text-step--3 shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-opacity-70 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-grey",
            classNames?.inputWrapper
          )}
          data-input="input-container"
        >
          {LeadingIcon && <span>{LeadingIcon}</span>}
          <input
            type={type}
            id={name}
            name={name}
            placeholder={label}
            className={cn(
              "flex h-9 w-full border-none bg-transparent px-3 outline-none",
              classNames?.input
            )}
            ref={ref}
            {...props}
          />
          {TrailingIcon && <span>{TrailingIcon}</span>}
        </div>
        {hint && (
          <span className="text-step--3 font-extralight italic">{hint}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
