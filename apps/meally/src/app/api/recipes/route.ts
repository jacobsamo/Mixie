import { db } from '@/src/db';
import { recipes } from '@/src/db/schemas';
import { desc, asc } from 'drizzle-orm';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log('Search: ', searchParams);
  const limit = parseInt(searchParams.get('limit') || '10');
  console.log('Limit: ', limit);
  const offset = parseInt(searchParams.get('offset') || '0');
  console.log('Offest: ', offset);

  // const recipe = await db.query.info.findMany({
  //   limit: limit,
  //   offset: offset,
  //   orderBy: [asc(recipes.lastUpdated)],
  // });
  
  // return NextResponse.json({ recipes: recipe });
}
