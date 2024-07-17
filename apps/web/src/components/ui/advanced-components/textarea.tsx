import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HelpCircleIcon } from "lucide-react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import CopyButton from "@/components/copy-to-clipboard";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  tooltip?: string;
  hint?: string;
  error?: string;
  Icon?: React.ReactNode;
  copyText?: boolean;
  type?: string;
  control: Control<any>;
  required?: boolean;
  defaultValue?: string | number | undefined;
  options?: RegisterOptions;
  className?: string;
  border?: boolean;
  classNames?: {
    input?: string;
    inputWrapper?: string;
    label?: string;
    container?: string;
  };
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      name,
      label,
      tooltip,
      Icon,
      copyText = false,
      type,
      control,
      required,
      defaultValue,
      options,
      hint,
      error,
      className,
      border = true,
      classNames,
      ...props
    },
    ref
  ) => {
    return (
      <Controller
        control={control}
        name={id}
        defaultValue={defaultValue || ""}
        rules={{ required: required, ...options }}
        render={({ field }) => (
          <div
            className={cn(
              "flex flex-col gap-1 rounded-md",
              classNames?.container
            )}
          >
            {label && (
              <span className="flex flex-row items-center gap-2">
                <label
                  htmlFor={name}
                  className={cn(
                    "block text-step--3 font-medium",
                    classNames?.label
                  )}
                >
                  {label}
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
                {error}
              </span>
            )}
            <div
              className={cn(
                "flex min-h-[60px] w-full flex-col rounded-md bg-transparent bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-grey",
                `${
                  border
                    ? "border border-black shadow-sm dark:border-white"
                    : ""
                }`
              )}
            >
              {Icon && <span>{Icon}</span>}
              {copyText && (
                <CopyButton
                  aria-label="Copy text in text area"
                  text={field.value}
                />
              )}
              <textarea
                id={id}
                name={name}
                placeholder={label || props.placeholder}
                onChange={field.onChange}
                value={field.value || ""}
                ref={field.ref}
                rows={
                  /\n/.test(field.value?.toString() || "")
                    ? Number(field.value?.match(/\n/g)?.length) + 2
                    : 3
                }
                className="w-full resize-none rounded-md border-none bg-transparent outline-none"
                {...props}
              />
            </div>
            {hint && (
              <span className="text-step--3 font-extralight italic">
                {hint}
              </span>
            )}
          </div>
        )}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

//
