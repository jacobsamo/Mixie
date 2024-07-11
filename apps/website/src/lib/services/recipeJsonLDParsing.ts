import { recipeId } from "@/lib/utils";
import { Ingredient, NewRecipe } from "@/types";
import { Recipe as SchemaRecipe } from "schema-dts";

/**
 * Converts a time format string to minutes
 * @param {string} time - time format string e.g. `PT1H30M` or `30M`
 * @returns {number} - the time in minutes
 */
export function parseDuration(time: string): number {
  const hoursRegex = /(\d+)H/;
  const minutesRegex = /(\d+)M/;
  let totalMinutes = 0;

  const hoursMatch = time.match(hoursRegex);
  if (hoursMatch) {
    const hours = parseInt(hoursMatch[1]);
    totalMinutes += hours * 60;
  }

  const minutesMatch = time.match(minutesRegex);
  if (minutesMatch) {
    const minutes = parseInt(minutesMatch[1]);
    totalMinutes += minutes;
  }

  return totalMinutes;
}

/**
 * Gets the recipe json-ld from a given link
 * @param link the url of the recipe
 * @returns {SchemaRecipe | null} the recipe object or null if the recipe could not be parsed
 */
export const getRecipeJsonLd = async (link: string) => {
  const res = await fetch(link);
  const html = await res.text();

  const parse = (await import("node-html-parser")).parse;
  const doc = parse(html);
  const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
  let recipe = null;

  scripts.forEach((script) => {
    if (script.textContent) {
      try {
        const jsonLdObject = JSON.parse(script.textContent);

        const extractRecipe = (obj: any): any => {
          if (Array.isArray(obj)) {
            for (let item of obj) {
              const foundRecipe = extractRecipe(item);
              if (foundRecipe) {
                return foundRecipe;
              }
            }
          } else if (obj && typeof obj === "object") {
            if (obj["@type"] && obj["@context"] === "https://schema.org") {
              if (
                (Array.isArray(obj["@type"]) &&
                  obj["@type"].includes("Recipe")) ||
                obj["@type"] === "Recipe"
              ) {
                return obj;
              }
            }
            if (obj["@graph"]) {
              const foundRecipe = extractRecipe(obj["@graph"]);
              if (foundRecipe) {
                return foundRecipe;
              }
            }
            for (let key of Object.keys(obj)) {
              if (key !== "@type" && key !== "@graph") {
                const foundRecipe = extractRecipe(obj[key]);
                if (foundRecipe) {
                  return foundRecipe;
                }
              }
            }
          }
          return null;
        };

        const foundRecipe = extractRecipe(jsonLdObject);
        if (foundRecipe) {
          recipe = foundRecipe;
        }
      } catch (error) {
        console.error(`Error parsing JSON-LD: ${error}`);
      }
    }
  });


  return recipe;
};

/**
 *
 * @param {string | string[] | { text: string }}  ingredients
 * @returns {text: string}
 */
function parseIngredients(
  ingredients: string | string[] | { text: string }
): Ingredient[] {
  if (typeof ingredients === "string") {
    return [{ text: ingredients }];
  } else if (Array.isArray(ingredients)) {
    return ingredients.map((ingredient) => ({ text: ingredient }));
  } else {
    return [{ text: ingredients.text }];
  }
}

function parseSteps(
  steps: any
): Array<{ text: string; image?: string | null; url?: string | null }> {
  if (typeof steps === "string") {
    return [{ text: steps }];
  } else if (Array.isArray(steps)) {
    return steps
      .map((step) => {
        if (typeof step === "string") {
          return { text: step };
        } else if (
          step["@type"] === "HowToStep" ||
          step["@type"] === "CreativeWork"
        ) {
          return {
            text: step.text,
            image: step.image || null,
            url: step.url || null,
          };
        } else if (step["@type"] === "HowToSection") {
          return step.itemListElement.map((subStep: any) => ({
            text: subStep.text,
            image: subStep.image || null,
            url: subStep.url || null,
          }));
        }
      })
      .flat();
  } else {
    return [{ text: steps.text }];
  }
}

function parseImage(image: any): {
  image: NewRecipe["image_url"];
  attributes: NewRecipe["image_attributes"];
} {
  let foundImage: string | null = null;
  let attributes: NewRecipe["image_attributes"] | null = null;

  if (typeof image === "string") {
    foundImage = image;
  } else if (Array.isArray(image)) {
    foundImage = image[0];
  } else if (typeof image === "object" && image["@type"] === "ImageObject") {
    foundImage = image.url || null;
    attributes = {
      alt: image.caption || null,
      source: "other",
      height: image.height || null,
      width: image.width || null,
    };
  }

  return {
    image: foundImage,
    attributes,
  };
}

type TransformRecipe = Omit<NewRecipe, "created_by">;

/**
 * Transforms a recipe from json-ld to a new recipe object
 * @param recipe the recipe object from json-ld
 * @returns {TransformRecipe} the transformed recipe object
 */
export const transformRecipe = (recipe: any): TransformRecipe => {
  const prep = recipe.prepTime
    ? parseDuration(recipe.prepTime.toString())
    : null;
  const cook = recipe.cookTime
    ? parseDuration(recipe.cookTime.toString())
    : null;
  const total = prep && cook ? prep + cook : null;

  const { attributes, image } = parseImage(recipe.image);

  const title = recipe.name || "";

  return {
    id: recipeId(title),
    title: title,
    version: "1.0",
    category: recipe?.recipeCategory ? [recipe.recipeCategory] : null,
    cuisine: recipe?.recipeCuisine ? [recipe.recipeCuisine] : null,
    description: recipe.description || null,
    image_attributes: {
      ...attributes,
      alt: attributes?.alt ?? title,
    },
    image_url: image,
    ingredients: recipe?.recipeIngredient
      ? parseIngredients(recipe.recipeIngredient)
      : [{ text: "" }],
    keywords:
      typeof recipe?.keywords === "string" ? recipe.keywords.split(", ") : null,
    nutrition: recipe.nutrition
      ? [
          `Calories: ${recipe.nutrition.calories}`,
          `Carbohydrate Content: ${recipe.nutrition.carbohydrateContent}`,
          `Protein Content: ${recipe.nutrition.proteinContent}`,
          `Fat Content: ${recipe.nutrition.fatContent}`,
          `Saturated Fat Content: ${recipe.nutrition.saturatedFatContent}`,
          `Cholesterol Content: ${recipe.nutrition.cholesterolContent}`,
          `Sodium Content: ${recipe.nutrition.sodiumContent}`,
          `Fiber Content: ${recipe.nutrition.fiberContent}`,
          `Sugar Content: ${recipe.nutrition.sugarContent}`,
        ]
      : null,
    public: false,
    rating: recipe.aggregateRating
      ? recipe.aggregateRating.ratingValue
        ? parseInt(recipe.aggregateRating.ratingValue)
        : null
      : null,
    steps: parseSteps(recipe.recipeInstructions),
    suitable_for_diet: recipe.suitableForDiet || null,
    total_time: total,
    prep_time: prep,
    cook_time: cook,
    yield: recipe.recipeYield
      ? Array.isArray(recipe.recipeYield)
        ? parseInt(recipe.recipeYield[0], 10)
        : parseInt(recipe.recipeYield)
      : null,
  };
};
