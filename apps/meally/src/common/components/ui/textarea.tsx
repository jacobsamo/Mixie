import * as React from "react";

import { cn } from "@/src/common/lib/utils/utils";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { HelpCircleIcon } from "lucide-react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  tooltip?: string;
  hint?: string;
  error?: string;
  Icon?: React.ReactNode;
  type?: string;
  control: Control<any>;
  required?: boolean;
  defaultValue?: string | number | undefined;
  options?: RegisterOptions;
  className?: string;
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
      type,
      control,
      required,
      defaultValue,
      options,
      hint,
      error,
      className,
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
          <div className={cn("flex flex-col gap-1", classNames?.container)}>
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
            <div className="flec-col text-sm focus-visible:ring-ring flex min-h-[60px] w-full  rounded-md  bg-transparent bg-white px-3 py-2 shadow-sm  focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-grey">
              {Icon && <span>{Icon}</span>}
              <textarea
                id={id}
                name={name}
                placeholder={label || props.placeholder}
                onChange={field.onChange}
                value={field.value}
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
