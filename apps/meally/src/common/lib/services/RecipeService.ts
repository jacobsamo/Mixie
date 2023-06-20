import { prisma } from '@lib/config/db';

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
    const recipes = await prisma.recipe.findMany();
    return recipes;
  }

  async getRecipeById(id: string) {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
    });
    return recipe;
  }

  async createRecipe(data: any) {
    const recipe = await prisma.recipe.create({
      data,
    });
    return recipe;
  }

  async updateRecipe(id: string, data: any) {
    const recipe = await prisma.recipe.update({
      where: {
        id,
      },
      data,
    });
    return recipe;
  }

  async deleteRecipe(id: string) {
    const recipe = await prisma.recipe.delete({
      where: {
        id,
      },
    });
    return recipe;
  }
}

const recipeService = new RecipeService();

export default recipeService;