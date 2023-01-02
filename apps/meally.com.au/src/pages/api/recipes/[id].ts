import type { NextApiRequest, NextApiResponse } from 'next'
import RecipeService from '@lib/service/RecipeService'
import { Recipe } from 'libs/types'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method === 'GET') {
    const { id } = req.query
    const recipeData = await RecipeService.getRecipe(id?.toString() ?? '')
    if (recipeData == undefined) {
      res.status(404).send({ error: 'Error, Recipe not found' })
    }
    if (recipeData != undefined) {
      res.status(200).json(recipeData)
    }
  }
}


export default handler