import * as React from 'react';

import { cn } from '@lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { HelpCircleIcon } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  tooltip?: string;
  hint?: string;
  error?: string;
  LeadingIcon?: React.ReactNode;
  TrailingIcon?: React.ReactNode;
  classNames?: {
    input?: string;
    inputWrapper?: string;
    label?: string;
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
      <div className="flex flex-col gap-1">
        {label && (
          <span className="flex flex-row items-center gap-2">
            <label
              htmlFor={name}
              className={cn(
                'block text-step--3 font-medium',
                classNames?.label
              )}
            >
              {label}
            </label>
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <HelpCircleIcon className="w-5 h-5 opacity-70" />
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
          <span className="text-red text-step--3 font-extralight italic">
            {error}
          </span>
        )}
        <div
          className={cn(
            'flex flex-row w-full items-center rounded-md p-1 border border-black dark:border-white bg-white dark:bg-grey  py-1 text-step--3 shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            classNames?.inputWrapper
          )}
        >
          {LeadingIcon && <span>{LeadingIcon}</span>}
          <input
            type={type}
            id={name}
            name={name}
            className={cn(
              'flex h-9 w-full px-3 bg-transparent outline-none border-none',
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
Input.displayName = 'Input';

export { Input };
