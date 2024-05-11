import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { SharedProps } from "./shared";
import * as z from "zod";
import { recipeFormSchema, recipeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

const detailsSchema = recipeSchema.pick({
  difficulty_level: true,
  keywords: true,
  meal_time: true,
  notes: true,
  public: true,
  sweet_savoury: true,
});

type DetailsForm = z.infer<typeof detailsSchema>;

const Details = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<DetailsForm>({
    resolver: zodResolver(detailsSchema),
  });
  return <div>Details</div>;
};

export default Details;
