'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Loader2, PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const createRecipeSchema = z.object({
  title: z.string().optional(),
  link: z.string().optional(),
});

const CreateRecipeDialog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const methods = useForm<z.infer<typeof createRecipeSchema>>({
    resolver: zodResolver(createRecipeSchema),
  });
  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
  } = methods;

  function onSubmit(values: z.infer<typeof createRecipeSchema>) {
    setLoading(true);

    if (values.title) {
      fetch('/api/recipes/create', {
        method: 'POST',
        body: JSON.stringify({ title: values.title }),
      }).then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            console.log(data);
            router.push(`/recipes/${data.id}/edit`);
          });
          setLoading(false);
          setOpen(false);
        }
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex flex-row gap-1 outline-none border-none">
        <PlusCircleIcon /> Create a recipe
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new recipe</DialogTitle>
          <DialogDescription>
            All you need is either your recipes name or a link to an existing
            recipe
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input {...register('title')} label="Title" />
          {/* <p className="mx-auto">OR</p>

          <div>
            import a recipe
            <Input
              {...register('link')}
              label="Recipe Url"
              placeholder="https://"
            />
          </div> */}
          <Button
            ariaLabel="continue with creating the recipe"
            className="font-semibold items-center"
          >
            Create Recipe
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeDialog;
