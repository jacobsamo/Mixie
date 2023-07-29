import { recipeId } from '@/src/common/lib/utils';
import { db } from '@/src/db';
import { authOptions } from '@/src/db/next-auth-adapter';
import { recipes } from '@/src/db/schemas';
import { NewRecipe } from '@/src/db/types';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';

const createRecipeSchema = z.object({
  title: z.string().optional(),
  link: z.string().url().optional(),
});

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json('Unauthorized', { status: 403 });
  }
  const { user } = session;

  const json = await req.json();

  const { title, link } = createRecipeSchema.parse(json);
  const uid = uuidv4();

  if (title) {
    const id = recipeId(title);
    const recipe: NewRecipe = {
      uid: uid,
      id,
      title,
      createdBy: user.id,
      lastUpdatedBy: user.id,
    };
    const setRecipe = await db.insert(recipes).values(recipe);
    console.log('Created Recipe', setRecipe);
    return NextResponse.json(`Recipe succuflly created, ${setRecipe}`, {
      status: 200,
    });
  }
}
