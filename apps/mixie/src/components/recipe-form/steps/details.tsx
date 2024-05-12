import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { SharedProps } from "./shared";
import * as z from "zod";
import { recipeFormSchema, recipeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { detailsSchema } from "../actions";

const Details = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
  });
  return <div>Details</div>;
};

export default Details;
