import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircleIcon } from "lucide-react";
import type { FieldError } from "react-hook-form";
import Error from "../Error";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  endText: string;
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

const InlineInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      className,
      classNames,
      type,
      label,
      tooltip,
      endText,
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
        className={cn("z-0 flex flex-col gap-1", classNames?.container)}
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
                classNames?.label,
                { "text-red": error }
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
        <Error error={error} />
        <div className="flex">

        <div
          className={cn(
            "flex w-full flex-row items-center rounded-md border border-black bg-white p-1 py-1 text-step--3  shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-grey rounded-r-none",
            classNames?.inputWrapper,
            { "border-red ": error }
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
        <span className="text-center p-1 py-1 h-9 whitespace-nowrap rounded-md font-medium text-sm ring-offset-background transition-colors border border-white hover:bg-accent hover:text-accent-foreground px-4 rounded-l-none border-l-0">{endText}</span>
        </div>


        {hint && (
          <span className="text-step--3 font-extralight italic">{hint}</span>
        )}
      </div>
    );
  }
);
InlineInput.displayName = "InlineInput";

export { InlineInput };