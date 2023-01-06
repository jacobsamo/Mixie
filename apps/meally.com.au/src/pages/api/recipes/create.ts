// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Recipe } from 'libs/types'
import RecipeService from '@lib/service/RecipeService'
import { auth } from '@lib/config/firebase';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const recipe = req.body
      // RecipeService.createRecipe(recipe)
      res.status(201).send('data is valid')
    }
    catch (err: any) {
      res.status(400).send(`An error occurred: ${err.message}`)
    }
  } else {
    res.status(405).send(`Does not accept ${req.method} only supports POST`)
  }
}

