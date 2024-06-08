import React from "react";
import { useForm } from "react-hook-form";
import {createRecipeFromTitle, schema} from '@/actions/recipe-imports/title'
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


const TitleForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })


  const createRecipe = useAction(createRecipeFromTitle, {
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    createRecipe.execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>


      <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <Button type="submit">Create Recipe</Button>
      </DialogFooter>
    </form>
    </Form>
  );
};

export default TitleForm;
