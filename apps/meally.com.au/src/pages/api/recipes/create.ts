// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Recipe } from 'libs/types';
import RecipeService from '@lib/service/RecipeService';
import { auth } from '@lib/config/firebase';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(418)
    .send(
      "Sorry at this point in time we don't accept any API calls. this will be changed in the future"
    );
  // if (req.method === 'POST') {
  //   try {
  //     const recipe = JSON.parse(req.body);
  //     console.log(recipe);
  //     RecipeService.createRecipe(recipe[0]);
  //     res.status(201).send('data is valid');
  //   } catch (err: any) {
  //     res.status(400).send(`An error occurred: ${err.message}`);
  //   }
  // } else {
  //   res.status(405).send(`Does not accept ${req.method} only supports POST`);
  // }
}
