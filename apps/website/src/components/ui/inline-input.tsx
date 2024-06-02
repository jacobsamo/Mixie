import * as React from "react";

import { cn } from "@/lib/utils";

export interface InlineInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  endText: string;
}

const InlineInput = React.forwardRef<HTMLInputElement, InlineInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex">
        <input
          type={type}
          className={cn(
            "bg-input-foreground peer flex h-10 w-full rounded-md rounded-r-none border border-input px-3 py-2 text-sm text-step--3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <span className="border-l-none inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md rounded-l-none border border-input bg-background/80 p-1 px-4 py-1 text-center text-sm ring-offset-background peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
          {props.endText}
        </span>
      </div>
    );
  }
);
InlineInput.displayName = "InlineInput";

export { InlineInput };
