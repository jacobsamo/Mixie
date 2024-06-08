import React from "react";
import { useForm } from "react-hook-form";
import { createRecipeFromText, schema } from "@/actions/recipe-imports/text";
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
import { Textarea } from "@/components/ui/textarea";

const TextForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const createRecipe = useAction(createRecipeFromText, {
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
        <FormField
          control={form.control}
          name="content"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe Url</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`
                    ingredients: 
                    1 cup of sugar
                    2 cups of flour
                    3 eggs
                    ...

                    Steps:
                    1. Mix sugar and flour
                    2. Add eggs
                    3. ...
                    `}
                  {...field}
                  value={field.value ?? undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button type="submit">Create Recipe</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TextForm;
