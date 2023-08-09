import { recipeId } from '@/src/common/lib/utils';
import { db } from '@/src/db';
import { authOptions } from '@/src/db/next-auth-adapter';
import { recipes, info } from '@/src/db/schemas';
import { NewInfo, NewPartialRecipe, NewRecipe } from '@/src/db/types';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';

const createRecipeSchema = z.object({
  title: z.string().optional(),
  link: z.string().url().optional(),
});

export async function POST(req: Request) {
  // try {
  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     return NextResponse.json('Unauthorized', { status: 403 });
  //   }

  //   const { user } = session;
  //   console.log('user: ', user);
  //   const json = await req.json();
  //   console.log(json);
  //   console.log(createRecipeSchema.parse(json));
  //   const { title, link } = createRecipeSchema.parse(json);

  //   if (title) {
  //     const id = recipeId(title);
  //     const recipe: NewRecipe = {
  //       id,
  //       title,
  //       createdBy: user.id,
  //       lastUpdatedBy: user.id,
  //     };
  //     const setRecipe = await db.insert(recipes).values(recipe);
  //     console.log('Created Recipe', setRecipe);
  //     return NextResponse.json(`Recipe succuflly created, ${setRecipe}`, {
  //       status: 200,
  //     });
  //   }
  // } catch (error) {
  //   if (error instanceof z.ZodError) {
  //     return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
  //   }

  //   return NextResponse.json(null, { status: 500 });
  // }
  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     return NextResponse.json('Unauthorized', { status: 403 });
  //   }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json('Unauthorized', { status: 403 });
  }
  const { user } = session;
  console.log('user: ', user);
  const json = await req.json();
  console.log(json);
  console.log(createRecipeSchema.parse(json));
  const { title, link } = createRecipeSchema.parse(json);
  const uid = uuidv4();

  if (title) {
    const id = recipeId(title);
    // general info about the recipe
    const newInfo: NewInfo = {
      recipeId: uid,
      id,
      title,
    };
    // the recipe itself
    const recipe: NewPartialRecipe = {
      uid: uid,
      id,
      title,
      createByName: user.name,
      createdBy: user.id,
      lastUpdatedBy: user.id,
      lastUpdatedByName: user.name,
    };
    const setInfo = await db.insert(info).values(newInfo);
    const setRecipe = await db.insert(recipes).values(recipe);

    return NextResponse.json(
      { message: `Recipe succuflly created, ${setRecipe}`, id: uid },
      {
        status: 200,
      }
    );
  }
}
