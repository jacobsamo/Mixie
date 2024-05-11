"use client";
import { SelectComponent } from "@/components/ui/SelectComponent";
import { Input } from "@/components/ui/input";
import TagInput from "@/components/ui/taginput";
import { Textarea } from "@/components/ui/textarea";
import {
  meal_times,
  sweet_savoury
} from "@/lib/services/data";
import { NewRecipe, Recipe } from "@/types";
import { recipeClientFormSchema } from "@/types/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { env } from "process";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import RecipePageComponent from "../recipe-page/recipe-page";
import Overlay from "./overlay";
// import  StepContainer  from "./StepContainer";
import FeedbackDialog from "@/components/modals/feedback-modal";
import Error from "@/components/ui/Error";
import { onSubmit } from "./form";
import LoadingImageUpload from "./loadingstates/loading-image-upload";

const IngredientContainer = dynamic(() => import("./ingredient-container"));
const StepContainer = dynamic(() => import("./step-container"));
const ImageUpload = dynamic(() => import("./image-upload"), {
  loading: () => <LoadingImageUpload />,
});

interface RecipeFormProps {
  recipe: any | Recipe | NewRecipe; //TODO: fix this type to represent the correct type of recipe (not a huge deal but would be useful)
}

/**
 * The form for creating and editing recipes, must take in a initial recipe with the default values set
 * @param {Recipe | NewRecipe} recipe - the recipe to be edited
 * @returns {React.JSX.Element} - the recipe form
 */
const RecipeForm = ({ recipe }: RecipeFormProps) => {
  const [preview, setPreview] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [initialTitle, setInitialTitle] = useState(recipe.title);

  const methods = useForm<z.infer<typeof recipeClientFormSchema>>({
    resolver: zodResolver(recipeClientFormSchema),
    defaultValues: {
      // apply the recipe values if they exist using something like ...recipe
      ...recipe,
      keywords: recipe?.keywords.map((keyword) => ({ value: keyword })) || [],
      ingredients: recipe?.ingredients || [
        {
          title: "",
          unit: {
            label: "grams",
            value: "grams",
          },
          quantity: null,
          isHeading: false,
          amount: null,
        },
      ],
      steps: recipe?.steps || [{ step_body: "" }],
    },
  });

  const {
    handleSubmit,
    register,
    control,
    getValues,
    setError,
    watch,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitted },
  } = methods;

  useEffect(() => {
    if (errors)
      console.log("Errors: ", {
        errors: errors,
        values: getValues(),
      });
  }, [errors]);

  // show alert if user tries refreshing or closing the page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting && !isSubmitted) {
        e.preventDefault();
        e.returnValue =
          "Are you sure you want to refresh? You will lose your data if you close this page.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  useEffect(() => {
    const recipeValue = getValues();
    if (initialTitle !== recipeValue.title && recipeValue.public) {
      fetch(`/api/recipes/checkTitle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
        body: JSON.stringify({ title: recipeValue.title }),
      }).then((res) => {
        if (res.status == 400) {
          console.log("name already exists");
          setError("title", {
            message: "Recipe with this title already exists",
          });
          toast.error("Recipe with this title already exists");
        }
      });
    }
  }, [watch("title"), watch("public")]);

  const gotRecipe = getValues() as Recipe;

  return (
    <FormProvider {...methods}>
      {preview && <RecipePageComponent recipe={gotRecipe} />}

      <form
        className="relative z-0 mx-auto mb-[20%] flex w-full flex-col p-2 md:p-0 lg:w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Overlay
          onPreview={() => setPreview(!preview)}
          isDisabled={isDisabled}
        />

        {!preview && (
          <>
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
                      sweet_savoury.find(
                        (item) => item.value === field.value
                      ) || undefined
                    }
                    placeholder="Sweet or Savoury"
                  />
                </>
              )}
            />

            <ImageUpload />

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
                      console.log("Value: ", {
                        value: JSON.stringify(value),
                        field: value.value,
                        newValue: JSON.stringify(newMealTime),
                      });

                      setValue("meal_time", newMealTime);
                    }}
                    value={meal_times.find(
                      (item) =>
                        typeof field.value === "string" &&
                        field.value === item.value
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

            <section className="mb-8 flex flex-row flex-wrap gap-4">
              <IngredientContainer />
              <StepContainer />
            </section>
            <Textarea
              id="notes"
              control={control}
              label="Notes, Tips or Suggestions"
            />
          </>
        )}
      </form>
      <FeedbackDialog className=" mx-auto mb-2 mt-0 flex  lg:w-1/2" />
    </FormProvider>
  );
};

export default RecipeForm;
