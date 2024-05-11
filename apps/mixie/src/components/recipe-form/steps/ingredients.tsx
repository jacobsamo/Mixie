import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { SharedProps } from "./shared";
import * as z from "zod";
import { recipeFormSchema, recipeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

export interface IngredientsProps extends SharedProps {}

const ingredientsSchema = recipeSchema.pick({
  ingredients: true,
});

type IngredientsForm = z.infer<typeof ingredientsSchema>;

const Ingredients = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<IngredientsForm>({
    resolver: zodResolver(ingredientsSchema),
  });

  return <div>Ingredients</div>;
};

export default Ingredients;
