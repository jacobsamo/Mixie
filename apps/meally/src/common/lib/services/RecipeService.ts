import * as puppeteer from 'puppeteer';
import { recipeId } from '../utils';
import { db } from '@/src/db';
import { NewRecipe } from '@/src/db/types';

import { authOptions } from '@/src/db/next-auth-adapter';
import { getServerSession } from 'next-auth/next';
import { recipes } from '@/src/db/schemas';
import * as z from 'zod';
import { recipeFormSchema } from '@components/templates/RecipeForm/form';

class RecipeService {
  //   async getRatingByRecipeId(id: string) {
  //     const rating = await prisma.rating.findMany({
  //       where: {
  //         recipeId: id,
  //       },
  //     });
  //     return rating;
  //   }

  async getRecipes() {
    return;
  }

  async getRecipeById(id: string) {
    return;
  }

  async EditRecipe(recipe: z.infer<typeof recipeFormSchema>) {
    await fetch(`/api/recipes/${recipe.id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    return { status: 451, message: 'Not yet implemented' };
  }

  async createRecipeFromTitle(title: string) {
    const fetchedRecipe = fetch('/api/recipes/create', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
    return (await fetchedRecipe).json();
  }

  async createRecipeFormUrl(url: string) {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto(url);

    // const recipe = await page.$eval(
    //   'application/ld+json',
    //   (el) => el.textContent
    // );

    // await browser.close();
    return { status: 451, message: 'Not yet implemented' };
  }

  async updateRecipe(id: string, data: any) {}

  async deleteRecipe(id: string) {}
}

const recipeService = new RecipeService();

export default recipeService;
