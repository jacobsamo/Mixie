import { Recipe as SchemaRecipe } from "schema-dts";
import logger from "../logger";

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
    logger.error("Error parsing JSON:", {
      message: JSON.stringify(error),
    });
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

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)\
   Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)\
   Version/14.0.3 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)\
   Chrome/90.0.4430.93 Safari/537.36",
];

const getRandomUserAgent = (): string => {
  return (
    userAgents[Math.floor(Math.random() * userAgents.length)] ??
    (userAgents[0] as string)
  );
};

const fetchWithRetry = async (
  url: string,
  retries = 3,
  backoff = 300
): Promise<Response> => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": getRandomUserAgent(),
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch: ${res}`);
    return await res;
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, backoff));
    return fetchWithRetry(url, retries - 1, backoff * 2);
  }
};

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
    const res = await fetchWithRetry(link);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res}`);
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
            logger.error(`Error parsing JSON-LD: ${error}`);
          }
        }
      });
    }

    return recipe;
  } catch (error) {
    logger.error(`Error fetching or parsing data: ${error}`, {
      level: "error",
      location: "find-schema.ts",
      message: JSON.stringify(error),
    });
    return null;
  }
};
