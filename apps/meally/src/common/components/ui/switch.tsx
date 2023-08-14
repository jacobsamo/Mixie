'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@lib/utils';
import { FieldError } from 'react-hook-form';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-yellow data-[state=unchecked]:bg-grey',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export interface SwitchInputProps {
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

const Input = React.forwardRef< SwitchInputProps, >(
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
          className={cn('flex flex-col gap-1', classNames?.container)}
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
                  'block text-step--3 font-medium',
                  classNames?.label
                )}
              >
                {label} {props.required && <span className="text-red">*</span>}
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
              {error.message}
            </span>
          )}
          <div
            className={cn(
              'flex flex-row w-full items-center rounded-md p-1 border border-black dark:border-white bg-white dark:bg-grey  py-1 text-step--3 shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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

export { Switch };