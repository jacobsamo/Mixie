import * as React from 'react';

import { cn } from '@lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div>
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-black dark:border-white bg-white dark:bg-grey px-3 py-1 text-step--3 shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
