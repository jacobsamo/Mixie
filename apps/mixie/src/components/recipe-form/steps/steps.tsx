import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { SharedProps } from "./shared";
import * as z from "zod";
import { recipeFormSchema, recipeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { stepsSchema } from "../actions";

export interface StepsProps extends SharedProps {}

const Steps = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof stepsSchema>>({
    resolver: zodResolver(stepsSchema),
  });
  return <div>Steps</div>;
};

export default Steps;
