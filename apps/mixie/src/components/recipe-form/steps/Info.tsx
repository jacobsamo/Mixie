import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { SharedProps } from "./shared";
import * as z from "zod";
import { recipeFormSchema, recipeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

export interface InfoProps extends SharedProps {}

const infoSchema = recipeSchema.pick({
  title: true,
  source: true,
  prep_time: true,
  cook_time: true,
  yield: true,
  description: true,
});

type InfoForm = z.infer<typeof infoSchema>;

const Info = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<InfoForm>({
    resolver: zodResolver(infoSchema),
  });

  return (
    <div className="flex flex-col gap-2">
      <Input
        {...register("title", {
          required: true,
        })}
        error={errors.title}
        required
        label="Title"
      />
      <Textarea id="description" label="Description" control={control} />
      <Input
        {...register("source")}
        label="Source"
        tooltip="Where you got the recipe from if you got it from another website"
      />
      <Input
        {...register("prep_time", {
          pattern: {
            value: /^(\d{1,2}[hms]\s?)+$/i,
            message:
              "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
          },
        })}
        error={errors.prep_time}
        label="Prep Time"
        hint="Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds"
      />
      <Input
        {...register("cook_time", {
          pattern: {
            value: /^(\d{1,2}[hms]\s?)+$/i,
            message:
              "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
          },
        })}
        error={errors.cook_time}
        label="Cook Time"
        hint="Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds"
      />
      <Input
        {...register("yield", { valueAsNumber: true })}
        error={errors.yield}
        label="Serves"
        type="number"
      />
    </div>
  );
};

export default Info;
