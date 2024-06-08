import React from "react";
import { useForm } from "react-hook-form";
import { createRecipeFromLink, schema } from "@/actions/recipe-imports/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LinkForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const createRecipe = useAction(createRecipeFromLink, {
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
          name="link"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe Url</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://"
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

export default LinkForm;
