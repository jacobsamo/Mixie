import { Input } from "@/components/ui/advanced-components/input";
import { Textarea } from "@/components/ui/advanced-components/textarea";
import { recipeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { env } from "env";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createApi } from "unsplash-js";
import { Photos } from "unsplash-js/src/methods/search/types/response";
import * as z from "zod";
import { SharedProps } from "./shared";
import { infoSchema } from "@/actions/schema";

export interface InfoProps extends SharedProps {}

const Info = () => {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
  });

  return (
    <form className="flex flex-col gap-2">
      <Input
        {...register("title", {
          required: true,
        })}
        error={errors.title}
        required
        label="Recipe name"
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
    </form>
  );
};

export default Info;
