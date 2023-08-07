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
import { useForm, useFormContext } from 'react-hook-form';
import { Button } from '@components/ui/button';
import { Loader2, PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { onSubmit } from './form';
import { ArrowLeftIcon } from 'lucide-react';

interface CreateRecipeDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateRecipeDialog = ({ open, setOpen }: CreateRecipeDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = useFormContext();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Recipe</DialogTitle>
          <DialogDescription>
            The final steps before you publish your recipe
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            ariaLabel="cancel"
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
