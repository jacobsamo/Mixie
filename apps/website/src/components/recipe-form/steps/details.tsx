"use client";
import { submitDetails } from "@/actions/recipe-form/submit-details";
import { detailsSchema } from "@/actions/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectComponent } from "@/components/ui/SelectComponent";
import { useStepper } from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import { sweet_savoury } from "@/lib/services/data";
import { Recipe } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRecipeContext } from "../recipe-form-provider";
import { StepperFormActions } from "./shared";

const Details = () => {
  const { nextStep, resetSteps } = useStepper();
  const { recipe, setRecipe } = useRecipeContext();
  const router = useRouter();

  const setDetails = useAction(submitDetails, {
    onError: () => {
      toast.error("Something went wrong pleaase try again.");
    },
    onSuccess: ({ data }) => {
      if (!data) return;
      setRecipe(data as Recipe);
      resetSteps();
      router.push(`/recipes/preview/${data.recipe_id}`);
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
    watch,
    formState: { errors, isDirty },
  } = form;

  useEffect(() => {
    console.log("errors: ", errors);
  }, [errors]);

  const isPublic = watch("public");

  const isPublicSubmitting =
    setDetails.status !== "idle" &&
    setDetails.status !== "hasErrored" &&
    isPublic == true;

  const isDraftSubmitting =
    setDetails.status !== "idle" &&
    setDetails.status !== "hasErrored" &&
    isPublic == false;

  const onSubmit = (data: z.infer<typeof detailsSchema>) => {
    setDetails.execute(data);
  };

  return (
    <Form {...form}>
      <form
        id="recipe-form"
        className="w-full md:w-1/2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={control}
          name="sweet_savoury"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sweet or Savoury</FormLabel>
              <FormControl className="w-full">
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={control}
          name="meal_time"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal Time</FormLabel>
              <FormControl className="w-full">
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
                      typeof field.value === "string" &&
                      field.value === item.value
                  )}
                  placeholder="Meal time"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <div className="pb-2">
          <TagInput
            name="keywords"
            control={control}
            placeholder="Keywords (separated by a comma)"
          />
          <p className="text-step--3 text-muted-foreground">
            Keywords will be used to help users find your recipe.
          </p>
        </div> */}

        <FormField
          control={control}
          name="notes"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes, Tips or Suggestions</FormLabel>
              <FormControl className="w-full">
                <Textarea {...field} value={field.value ?? undefined} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <StepperFormActions
          isSubmitting={isDraftSubmitting}
          isPublicSubmitting={isPublicSubmitting}
          onPublish={() => {
            setValue("public", true);
          }}
          onSaveDraft={() => {
            setValue("public", false);
          }}
        />
      </form>
    </Form>
  );
};

export default Details;
