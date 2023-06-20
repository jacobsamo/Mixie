import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui';

export default function Page() {
  return (
    <>
      <h1>Main page</h1>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
