import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { SharedProps } from "./shared";
import * as z from "zod";
import { recipeFormSchema, recipeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { ingredientsSchema } from "../actions";

export interface IngredientsProps extends SharedProps {}

const Ingredients = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof ingredientsSchema>>({
    resolver: zodResolver(ingredientsSchema),
  });

  return <div>Ingredients</div>;
};

export default Ingredients;
