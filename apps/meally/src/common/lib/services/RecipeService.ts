import { Info } from "@/src/db/types";
import React from "react";
import { Request } from "./apiHandle";

class RecipeService {
  async getAllRecipeCards(
    limit: number = 9,
    offset: number = 0
  ): Promise<Info[]> {
    // const recipes = await db.query.info.findMany({
    //   offset: offset,
    //   limit: limit,
    // });

    const recipes = await Request<Info[]>(`api/recipes`);

    return recipes as Info[];
  }

  //   async getRatingByRecipeId(id: string) {
  //     const rating = await prisma.rating.findMany({
  //       where: {
  //         recipeId: id,
  //       },
  //     });
  //     return rating;
  //   }

  // /**
  //  * Gets all recipes in the database
  //  * @param {boolean} getRatings - Whether to get the ratings for the recipe
  //  * @param {boolean} getInfo - Whether to get the info for the recipe
  //  * @returns {Promise<Recipe[]>} - An array of recipe objects
  //  */
  // async getRecipes(
  //   getRatings: boolean = false,
  //   getInfo: boolean = true
  // ): Promise<Recipe[]> {
  //   const recipes = await db.query.recipes.findMany({
  //     with: {
  //       info: true,
  //       // ratings: getRatings
  //     },
  //   });
  //   return recipes;
  // }

  // /**
  //  * @param {string} id - The id or uid of the recipe to fetch
  //  * @param {boolean} getRatings - Whether to get the ratings for the recipe
  //  * @param {boolean} getInfo - Whether to get the info for the recipe
  //  * @returns {Promise<Recipe[] | null>} - All recipes that match the id or uid
  //  */
  // async getRecipeById(
  //   recipeId: string,
  //   getRatings: boolean = false,
  //   getInfo: boolean = true
  // ): Promise<Recipe[] | null> {
  //   const recipe = await db.query.recipes.findMany({
  //     where: or(eq(recipes.id, recipeId), eq(recipes.uid, recipeId)),
  //     with: {
  //       info: getInfo,
  //       ratings: getRatings,
  //     },
  //   });
  //   // .where(sql`${recipes.id} = ${recipeId} or ${recipes.uid} = ${recipeId}`);
  //   return recipe || null;
  // }

  // async EditRecipe(recipe: z.infer<typeof recipeFormSchema>) {
  //   await fetch(`/api/recipes/${recipe.id}/edit`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(recipe),
  //   });
  //   return { status: 451, message: 'Not yet implemented' };
  // }

  // async createRecipeFromTitle(title: string): Promise<string> {
  //   const fetchedRecipe = fetch('/api/recipes/create', {
  //     method: 'POST',
  //     body: JSON.stringify({ title }),
  //   }).then((res) => {
  //     if (res.status === 200) {
  //       return res.json().then((data) => data.id);
  //     } else {
  //       return '';
  //     }
  //   });

  //   return '';
  // }

  // async createRecipeFormUrl(url: string) {
  //   // const browser = await puppeteer.launch();
  //   // const page = await browser.newPage();
  //   // await page.goto(url);

  //   // const recipe = await page.$eval(
  //   //   'application/ld+json',
  //   //   (el) => el.textContent
  //   // );

  //   // await browser.close();
  //   return { status: 451, message: 'Not yet implemented' };
  // }

  // async updateRecipe(id: string, data: any) {}

  // async deleteRecipe(id: string) {}
}

const recipeService = new RecipeService();

export default recipeService;

export const useFetchAllRecipe = () => {
  const [recipes, setRecipes] = React.useState<Info[] | undefined>([]);

  React.useEffect(() => {
    const fetchRecipes = async () => {
      recipeService.getAllRecipeCards().then((data) => {
        setRecipes(data);
      });
    };

    if (recipes?.length === 0) {
      fetchRecipes();
    }
  }, [recipes]);

  return {
    recipes,
  };
};
