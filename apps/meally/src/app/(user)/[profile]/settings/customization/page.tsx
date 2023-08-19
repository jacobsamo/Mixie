import { cva } from 'class-variance-authority';
import React from 'react';

export default function CustomizationPage() {



  const styles = cva(
    'flex items-center gap-2 p-2 max-w-xs dark:outline dark:outline-grey dark:outline-2 dark:bg-dark_grey dark:text-white dark:shadow-none shadow-main bg-white text-black rounded-md',
    {
      variants: {
        size: {
          sm: 'text-sm',
          md: 'h-12 w-28 ',
          lg: 'h-12 w-46',
        },
      },
      defaultVariants: {
        size: 'md',
      },
    }
  );

  return <div></div>;
}
