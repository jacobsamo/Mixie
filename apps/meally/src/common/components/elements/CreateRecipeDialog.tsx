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
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '../ui/button';
import { Loader2, PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import recipeService from '../../lib/services/RecipeService';
import { recipeId } from '../../lib/utils';

interface CreateRecipe {
  title?: string;
  link?: string;
}

const CreateRecipeDialog = () => {
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const methods = useForm<CreateRecipe>({});
  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
  } = methods;

  function onSubmit(values: CreateRecipe) {
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (values.link) {
      recipeService.createRecipeFormUrl(values.link).then((res) => {
        if (res.status === 200) {
          // router.push(`/recipes/${JSON.parse(res.message).uid}/edit`);
          setLoading(false);
        }
      });
    }

    if (values.title) {
      recipeService.createRecipe(recipeId(values.title)).then((res) => {
        if (res.status === 200) {
          // router.push(`/recipes/${JSON.parse(res.message).uid}/edit`);
          setLoading(false);
        }
      });
    }
  }

  return (
    <Dialog>
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
          <p className="mx-auto">OR</p>

          <div>
            import a recipe
            <Input
              {...register('link')}
              label="Recipe Url"
              placeholder="https://"
            />
          </div>
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
