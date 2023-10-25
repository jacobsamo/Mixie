"use client";
import { NewRecipe, Recipe } from "@db/types";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "../../ui/textarea";

import { recipeFormSchema } from "@db/zodSchemas";
import {
  dietaryRequirements,
  meal_times,
  sweet_savoury,
} from "@lib/services/data";
import { SelectComponent } from "../../ui/SelectComponent";
import TagInput from "../../ui/taginput";
import RecipePageComponent from "../RecipePage/RecipePageComponent";
import ImageUpload from "./ImageUpload";
import { IngredientContainer } from "./IngredientContainer";
import Overlay from "./Overlay";
import { StepContainer } from "./StepContainer";
import { onSubmit } from "./form";

interface RecipeFormProps {
  recipe: any | Recipe | NewRecipe; //TODO: fix this type to represent the correct type of recipe (not a huge deal but would be useful)
}

/**
 * The form for creating and editing recipes, must take in a initial recipe with the default values set
 * @param {Recipe | NewRecipe} recipe - the recipe to be edited
 * @returns {React.JSX.Element} - the recipe form
 */
const RecipeForm = ({ recipe }: RecipeFormProps) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [publishDialog, setPublishDialog] = useState(false);

  const methods = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      // apply the recipe values if they exist using something like ...recipe
      ...recipe,
      ingredients: recipe?.ingredients || [
        {
          title: "",
          unit: "grams",
          quantity: null,
          isHeading: false,
          amount: "not_set",
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
    formState: { errors, isDirty, isValid },
  } = methods;

  const gotRecipe = getValues() as Recipe;

  return (
    <>
      <FormProvider {...methods}>
        <Overlay
          onPreview={() => setPreview(!preview)}
          onSave={() => {}}
          onPublish={() => setPublishDialog(true)}
        />
        {preview && <RecipePageComponent recipe={gotRecipe} />}
        {!preview && (
          <form
            className="relative z-0 mx-auto mb-[20%] flex w-full flex-col p-2 md:p-0 lg:w-1/2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              {...register("title", {
                required: true,
              })}
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
              {...register("info.prep", {
                pattern: {
                  value: /^(\d{1,2}[hms]\s?)+$/i,
                  message:
                    "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
                },
              })}
              error={errors.info?.prep}
              label="Prep Time"
              hint="Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds"
            />
            <Input
              {...register("info.cook", {
                pattern: {
                  value: /^(\d{1,2}[hms]\s?)+$/i,
                  message:
                    "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
                },
              })}
              error={errors.info?.cook}
              label="Cook Time"
              hint="Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds"
            />
            <Input
              {...register("info.serves", { valueAsNumber: true })}
              error={errors.info?.serves}
              label="Serves"
              type="number"
            />

            <Controller
              control={control}
              name="dietary"
              render={({ field }) => (
                <>
                  <label
                    htmlFor="dietary"
                    className="block text-step--3 font-medium"
                  >
                    Dietary Requirements
                  </label>
                  <SelectComponent
                    options={dietaryRequirements}
                    createAble
                    isMulti
                    onChange={field.onChange}
                    value={field.value || undefined}
                    placeholder="Dietary Requirements"
                  />
                </>
              )}
            />

            <TagInput
              control={control}
              name="contains"
              // label='Contains'
              placeholder="E.g gluten, dairy, nuts"
              hint="Allergens (separated by a comma)"
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
                    onChange={field.onChange}
                    value={field.value || undefined}
                    placeholder="Sweet or Savoury"
                  />
                </>
              )}
            />

            <ImageUpload />

            <Controller
              control={control}
              name="mealTime"
              render={({ field }) => (
                <>
                  <label
                    htmlFor="mealTime"
                    className="block text-step--3 font-medium"
                  >
                    Meal Time
                  </label>
                  <SelectComponent
                    options={meal_times}
                    createAble
                    isMulti
                    onChange={field.onChange}
                    value={field.value || undefined}
                    placeholder="Meal time"
                  />
                </>
              )}
            />

            <TagInput
              name="info.keywords"
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
          </form>
        )}
      </FormProvider>
    </>
  );
};

export default RecipeForm;
