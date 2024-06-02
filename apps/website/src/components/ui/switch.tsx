"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HelpCircle, HelpCircleIcon } from "lucide-react";
import type { FieldError } from "react-hook-form";

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export interface SwitchInputProps extends SwitchProps {
  name: string;
  label?: string;
  tooltip?: string;
  hint?: string;
  error?: FieldError | null;
  classNames?: {
    input?: string;
    inputWrapper?: string;
    label?: string;
    container?: string;
  };
}

const SwitchInput = React.forwardRef<HTMLButtonElement, SwitchInputProps>(
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
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-1", classNames?.container)}>
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
              {label}
            </label>
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <HelpCircle className="h-5 w-5 opacity-70" />
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
        <Switch
          type={type}
          id={name}
          name={name}
          ref={ref}
          {...props}
          className={cn("", classNames?.input)}
        />
        {hint && (
          <span className="text-step--3 font-extralight italic">{hint}</span>
        )}
      </div>
    );
  }
);
SwitchInput.displayName = "SwitchInput";

export { Switch, SwitchInput };
