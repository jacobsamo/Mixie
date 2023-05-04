// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import RecipeService from '@lib/service/RecipeService';
import { Recipe } from 'libs/types';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  // res
  //   .status(418)
  //   .send(
  //     "Sorry at this point in time we don't accept any API calls. this will be changed in the future"
  //   );
  const recipe = await RecipeService.getAllRecipes();
  res.send(recipe)
};

export default handler;
