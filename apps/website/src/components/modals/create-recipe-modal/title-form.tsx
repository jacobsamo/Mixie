import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateRecipeSchema } from "./form";

const TitleForm = () => {
  const { register, control } = useFormContext<CreateRecipeSchema>();

  return (
    <>
      <FormField
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recipe Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Title"
                {...field}
                value={field.value ?? undefined}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default TitleForm;
