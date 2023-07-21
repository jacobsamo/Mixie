import * as puppeteer from 'puppeteer';
import { recipeId } from '../utils';
import { db } from '@/src/db';
import { NewRecipe } from '@/src/db/types';

import { authOptions } from '@/src/db/next-auth-adapter';
import { getServerSession } from 'next-auth/next';
import { recipes } from '@/src/db/schemas';

interface MockApiReturnTypes {
  status:
    | 100
    | 101
    | 102
    | 103
    | 200
    | 201
    | 202
    | 203
    | 204
    | 205
    | 206
    | 207
    | 208
    | 226
    | 300
    | 301
    | 302
    | 303
    | 304
    | 307
    | 308
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 407
    | 408
    | 409
    | 410
    | 411
    | 412
    | 413
    | 414
    | 415
    | 416
    | 417
    | 421
    | 422
    | 423
    | 424
    | 425
    | 426
    | 428
    | 429
    | 431
    | 451
    | 500
    | 501
    | 502
    | 503
    | 504
    | 505
    | 506
    | 507
    | 508
    | 511;
  message: string;
}

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

  async createRecipe(data: any) {
    return { status: 451, message: 'Not yet implemented' };
  }

  async createRecipeFromTitle(title: string) {
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return { status: 401, message: 'Not authorized' };
    // }
    // const id = recipeId(title);

    // const recipe: NewRecipe = {
    //   id,
    //   title,
    //   createdBy: session.user.id,
    //   lastUpdatedBy: session.user.id,
    // };

    // await db.insert(recipes).values(recipe);

    return { status: 200, message: 'Successfully sent' };
  }

  async createRecipeFormUrl(url: string): Promise<MockApiReturnTypes> {
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
