import { Recipe as SchemaRecipe } from "schema-dts";

/**
 * Finds the recipe schema in a given json array or object
 * @param {any} jsonString this is the json to find the recipe schema in
 */
function findRecipeSchema(jsonString: any) {
  try {
    let data = jsonString;
    if (typeof jsonString === "string") {
      data = JSON.parse(jsonString);
    }

    function findRecipe(obj: any) {
      if (Array.isArray(obj["@type"]) && obj["@type"].includes("Recipe")) {
        return obj;
      }
      if (typeof obj === "object" && obj !== null) {
        for (let key in obj) {
          const result: any = findRecipe(obj[key]);
          if (result) return result;
        }
      }
      return null;
    }

    return findRecipe(data);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

/**
 * This function extracts the recipe json-ld from the given html content using regex
 * @param {string} html the html content to parse
 * @returns {SchemaRecipe | null} the recipe object or null if the recipe could not be parsed
 */
function extractUsingRegex(html: string): SchemaRecipe | null {
  // thank you claude
  const regex =
    /{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*"@type"\s*:\s*(?:"Recipe"|\[(?:[^\[\]]*"Recipe"[^\[\]]*)\])(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/g;

  const matches = html.match(regex);
  if (matches) {
    const recipe = JSON.parse(matches[0]);
    return recipe as SchemaRecipe;
  }

  return null;
}

/**
 * Gets the recipe json-ld from a given link
 * @param link the url of the recipe
 * @returns {SchemaRecipe | null} the recipe object or null if the recipe could not be parsed
 */
export const getRecipeJsonLd = async (
  link: string
): Promise<SchemaRecipe | null> => {
  try {
    let recipe: SchemaRecipe | null = null;
    const res = await fetch(link);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    const html = await res.text();

    // const recipe = extractRecipeSchema(html);
    recipe = extractUsingRegex(html);

    if (!recipe) {
      const parse = (await import("node-html-parser")).parse;
      const doc = parse(html);
      const scripts = doc.querySelectorAll(
        'script[type="application/ld+json"]'
      );

      scripts.forEach((script) => {
        if (script.textContent) {
          try {
            const jsonLdObject = JSON.parse(script.textContent);
            const foundRecipe = findRecipeSchema(jsonLdObject);
            if (foundRecipe) {
              recipe = foundRecipe;
            }
          } catch (error) {
            console.error(`Error parsing JSON-LD: ${error}`);
          }
        }
      });
    }

    return recipe;
  } catch (error) {
    console.error(`Error fetching or parsing data: ${error}`);
    return null;
  }
};
