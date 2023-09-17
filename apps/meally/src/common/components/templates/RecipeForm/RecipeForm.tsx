"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Input } from "@components/ui/input";
import { Ingredient, NewRecipe, Recipe } from "@/src/db/types";
import { Textarea } from "../../ui/textarea";

import {
  dietaryRequirements,
  meal_times,
  sweet_savoury,
} from "@lib/services/data";
import { IngredientContainer } from "./IngredientContainer";
import { StepContainer } from "./StepContainer";
import { recipeFormSchema } from "@/src/db/zodSchemas";
import TagInput from "../../ui/taginput";
import ImageUpload from "./ImageUpload";
import Overlay from "./Overlay";
import { onSubmit } from "./form";
import RecipePageComponent from "../RecipePage/RecipePageComponent";

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
                  <Select
                    name="dietary"
                    defaultValue={field.value || undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-2/3 text-step--2">
                      <SelectValue placeholder="Dietary Requirements" />
                    </SelectTrigger>
                    <SelectContent>
                      {dietaryRequirements.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select
                    name="sweet_savoury"
                    defaultValue={field.value || undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-2/3 text-step--2">
                      <SelectValue placeholder="Sweet or Savoury" />
                    </SelectTrigger>
                    <SelectContent>
                      {sweet_savoury.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select
                    name="mealTime"
                    defaultValue={field.value || undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-2/3 text-step--2">
                      <SelectValue placeholder="Meal time" />
                    </SelectTrigger>
                    <SelectContent>
                      {meal_times.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
