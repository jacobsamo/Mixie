import { calculateTotalTime } from "@/src/common/lib/utils/utils";
import type { Ingredient } from "@db/types";
import { recipeFormSchema } from "@db/zodSchemas";
import * as z from "zod";
import { toast } from "../../ui/use-toast";
import { stepSchema, ingredientSchema } from "@db/zodSchemas";

const selectValues = z.object({
  value: z.string(),
  label: z.string(),
});

const infoSchema = z.object({
  recipeId: z.string(),
  id: z.string(),
  title: z.string(),
  imgUrl: z.string().url().optional(),
  imgAlt: z.string().optional().nullable(),
  total: z.string().optional().nullable(),
  prep: z
    .string()
    .regex(/^(\d{1,2}[hms]\s?)+$/i, {
      message:
        "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
    })
    .optional(),
  cook: z
    .string()
    .regex(/^(\d{1,2}[hms]\s?)+$/i, {
      message:
        "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
    })
    .optional(),
  serves: z.number().optional().nullable(),
  keywords: z.object({ value: z.string() }).array().optional(),
  ingredients: z.string().array().optional().nullable(),
  isPublic: z.boolean().default(false),
  rating: z.number().default(0),

  createdAt: z.date(),
  createdBy: z.string(),
  createByName: z.string(),
  lastUpdated: z.date(),
  lastUpdatedBy: z.string(),
  lastUpdatedByName: z.string(),
});

export const recipeSchema = z.object({
  uid: z.string(),
  id: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  steps: stepSchema.array().optional(),
  ingredients: ingredientSchema.array().optional(),
  mealTime: selectValues.array().optional(),
  version: z.number().default(1.0),
  source: z.string().optional().nullable(),

  info: infoSchema.optional(),

  // little extras for searching
  dietary: selectValues.array().optional(),
  allergens: selectValues.array().optional(),
  sweet_savoury: selectValues.array().optional(),
  difficulty_level: selectValues.array().optional(),
  cuisine: selectValues.array().optional(),
  isPublic: z.boolean().default(false),

  // users
  createdAt: z.date(),
  createdBy: z.string(),
  createByName: z.string(),
  lastUpdated: z.date(),
  lastUpdatedBy: z.string(),
  lastUpdatedByName: z.string(),
});

export const onSubmit = async (recipe: z.infer<typeof recipeFormSchema>) => {
  console.log("recipe: ", recipe);
  if (!recipe) return;

  const totalTime =
    recipe.info && recipe.info.prep && recipe?.info.cook
      ? await calculateTotalTime(recipe.info.prep, recipe.info.cook)
      : null;

  const ingredients = recipe?.ingredients?.map((ingredient: Ingredient) => {
    if (!["cup", "tbsp", "tsp"].includes(ingredient.unit.value || "")) {
      ingredient.amount = {
        value: "not_set",
        label: "not_set",
      };
    }
    // check if the quantity is a number if not then set the value to null
    if (typeof ingredient?.quantity != "number") {
      ingredient.quantity = null;
    }

    return ingredient;
  }) as Ingredient[];

  const data = {
    ...recipe,
    info: {
      ...recipe.info,
      total: totalTime,
    },
    ingredients,
  };

  // send data to edit the recipe in the db
  fetch(`/api/recipes/${recipe.id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_TOKEN}`,
    },
    body: JSON.stringify(recipe),
  }).then((res) => {
    if (res.status === 200) {
      toast({
        title: "Recipe created.",
        description: "Your recipe has been created.",
      });
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was an error while creating your recipe.",
        variant: "destructive",
      });
    }
  });
};
