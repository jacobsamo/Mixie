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
            "bg-input-foreground border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring peer flex h-10 w-full rounded-md rounded-r-none border px-3 py-2 text-sm text-step--3 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <span className="border-l-none border-input bg-background/80 ring-offset-background peer-focus-visible:ring-ring inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md rounded-l-none border p-1 px-4 py-1 text-center text-sm peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
          {props.endText}
        </span>
      </div>
    );
  }
);
InlineInput.displayName = "InlineInput";

export { InlineInput };
