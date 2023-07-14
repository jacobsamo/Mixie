'use client';

import React from 'react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { useToast } from '../common/components/ui/use-toast';
import {
  AlarmCheckIcon,
  AlertTriangle,
  Trash2Icon,
  PersonStanding,
} from 'lucide-react';
import { Textarea } from '../common/components/ui/textarea';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { toast } = useToast();
  const { control } = useForm();

  return (
    <>
      <h1 className="">Main page</h1>

      <h2>Buttons</h2>
      <div className="flex gap-2">
        <Button ariaLabel="" variant={'primary'}>
          Priamry
        </Button>
        <Button ariaLabel="" variant={'secondary'}>
          Secondary
        </Button>
        <Button ariaLabel="" variant={'tertiary'}>
          Tretiary{' '}
        </Button>
        <Button
          ariaLabel=""
          variant={'destructive'}
          TrailingIcon={<Trash2Icon />}
        >
          Destructive{' '}
        </Button>
        <Button ariaLabel="" variant={'link'}>
          Link{' '}
        </Button>
      </div>

      <h2>Input Feilds</h2>
      <div className="flex flex-col gap-2 max-w-fit">
        <Input name="all" placeholder="All of the above" />
        <Input
          name="all"
          placeholder="All of the above"
          label="Test Label"
          tooltip="test"
          LeadingIcon={<AlarmCheckIcon />}
        />
        <Input
          name="all"
          placeholder="All of the above"
          label="Test Label"
          tooltip="test"
          LeadingIcon={<AlarmCheckIcon />}
          TrailingIcon={<AlertTriangle />}
          hint="Hint"
          error="Error"
        />
      </div>

      <h2>Text Area</h2>
      <div className="w-fit">
        <Textarea
          id="test"
          control={control}
          label="test"
          tooltip="tghis is a tooltip"
        />
      </div>
    </>
  );
}
