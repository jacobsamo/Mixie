// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import RecipeService from '@lib/service/RecipeService'
import { Recipe } from 'libs/types'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method === 'GET') {
    const data = await RecipeService.getAllRecipes()
    res.status(200).json(data);
  }
}


export default handler