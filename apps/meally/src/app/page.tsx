"use client"

import React from 'react';
import { Button } from '@components/ui/button';
import { useToast } from '../common/components/ui/use-toast';

export default function Page() {
  const { toast } = useToast();

  return (
    <>
      <h1 className="">Main page</h1>
      <Button
        variant={'primary'}
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            variant: 'destructive',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            
          });
        }}
      >
        Click me
      </Button>
    </>
  );
}
