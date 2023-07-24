import { recipeId } from '@/src/common/lib/utils';
import { db } from '@/src/db';
import { authOptions } from '@/src/db/next-auth-adapter';
import { recipes } from '@/src/db/schemas';
import { NewRecipe } from '@/src/db/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(res: NextApiResponse, req: Request) {
  console.log(req.headers);

  // const session = await getServerSession( authOptions);
  // if (!session?.user) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }
  console.log('Req: ', req);
  console.log('Req body: ', req.body);
  // console.log('Res: ', res);

  const recipe = '';
  // const id = recipeId(title);
  // const recipe: NewRecipe = {
  //   id,
  //   title,
  //   createdBy: 'test',
  //   lastUpdatedBy: 'test',
  // };

  // await db.insert(recipes).values(recipe);
  console.log(recipe);

  return NextResponse.json({ recipe });
}
