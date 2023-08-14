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
import CreateRecipeDialog from '../common/components/elements/CreateRecipeDialog';
import { Switch } from '../common/components/ui/switch';

export default function Page() {
  const { toast } = useToast();
  const { control } = useForm();

  return (
    <>
      <h1 className="">Main page</h1>
      <Switch />
    </>
  );
}
