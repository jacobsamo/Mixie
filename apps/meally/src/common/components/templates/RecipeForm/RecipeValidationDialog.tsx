'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFormContext } from 'react-hook-form';
import { Button } from '@components/ui/button';
import { Loader2, PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { onSubmit } from './form';
import { ArrowLeftIcon } from 'lucide-react';
import { Textarea } from '@components/ui/textarea';
import TagInput from '@components/ui/taginput';
import { recipeFormSchema } from '@/src/db/zodSchemas';

interface CreateRecipeDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateRecipeDialog = ({ open, setOpen }: CreateRecipeDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, control } =
    useFormContext<z.infer<typeof recipeFormSchema>>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Recipe</DialogTitle>
          <DialogDescription>
            The final steps before you publish your recipe
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 items-center">
          <Input
            {...register('title', {
              required: true,
            })}
            required
            label="Title"
          />
          <Textarea id="description" label="Description" control={control} />
          <TagInput
            name="info.keywords"
            control={control}
            placeholder="Keywords (separated by a comma)"
            hint="Keywords will be used to help users find your recipe."
          />
          <Input type="checkbox" {...register('info.isPublic')} />
        </div>
        <DialogFooter>
          <Button
            ariaLabel="go back"
            variant={'destructive'}
            type="button"
            className="w-52 m-2"
            onClick={() => setOpen(false)}
            LeadingIcon={<ArrowLeftIcon />}
          >
            Go Back
          </Button>
          <Button
            ariaLabel="save"
            type="button"
            className="w-52 m-2"
            // onClick={() => handleImageUpload()}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeDialog;