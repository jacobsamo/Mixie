"use client";
import { submitDetails } from "@/actions/recipe-form/submit-details";
import { detailsSchema } from "@/actions/schema";
import Error from "@/components/ui/Error";
import { SelectComponent } from "@/components/ui/SelectComponent";
import { Textarea } from "@/components/ui/advanced-components/textarea";
import { useStepper } from "@/components/ui/stepper";
import TagInput from "@/components/ui/taginput";
import { meal_times, sweet_savoury } from "@/lib/services/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRecipeContext } from "../recipe-form-provider";
import { StepperFormActions } from "./shared";

const Details = () => {
  const { nextStep, resetSteps } = useStepper();
  const { recipe, setRecipe } = useRecipeContext();

  const setDetails = useAction(submitDetails, {
    onError: () => {
      toast.error("Something went wrong pleaase try again.");
    },
    onSuccess: (data) => {
      setRecipe(data);
      resetSteps();
    },
  });

  const form = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      recipe_id: recipe?.recipe_id ?? undefined,
      difficulty_level: recipe?.difficulty_level ?? "not_set",
      public: recipe?.public ?? false,
      sweet_savoury: recipe?.sweet_savoury ?? "not_set",
      meal_time: recipe?.meal_time ?? null,
      keywords: recipe?.keywords ?? null,
      notes: recipe?.notes ?? null,
    },
  });
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    console.log("errors: ", errors);
  }, [errors]);

  const isSubmitting =
    setDetails.status !== "idle" && setDetails.status !== "hasErrored";

  return (
    <form
      onSubmit={form.handleSubmit(setDetails.execute)}
      className="w-full md:w-1/2"
    >
      <Controller
        control={control}
        name="sweet_savoury"
        render={({ field }) => (
          <>
            <label
              htmlFor="sweet_savoury"
              className="block text-step--3 font-medium"
            >
              Sweet or Savoury
            </label>
            <SelectComponent
              options={sweet_savoury}
              clearable={false}
              onChange={(value) => setValue("sweet_savoury", value.value)}
              value={
                sweet_savoury.find((item) => item.value === field.value) ||
                undefined
              }
              placeholder="Sweet or Savoury"
            />
          </>
        )}
      />

      <Controller
        control={control}
        name="meal_time"
        render={({ field }) => (
          <>
            <label
              htmlFor="meal_time"
              className="block text-step--3 font-medium"
            >
              Meal Time
            </label>
            <Error error={errors?.meal_time?.message ?? null} />
            <SelectComponent
              options={meal_times}
              isMulti
              onChange={(value: any) => {
                const newMealTime = field!!.value
                  ? [...field.value, value[0]]
                  : value;

                setValue("meal_time", newMealTime);
              }}
              value={meal_times.find(
                (item) =>
                  typeof field.value === "string" && field.value === item.value
              )}
              placeholder="Meal time"
            />
          </>
        )}
      />

      <TagInput
        name="keywords"
        control={control}
        placeholder="Keywords (separated by a comma)"
        hint="Keywords will be used to help users find your recipe."
      />

      <Textarea
        id="notes"
        control={control}
        label="Notes, Tips or Suggestions"
      />

      <StepperFormActions isSubmitting={isSubmitting} />
    </form>
  );
};

export default Details;
