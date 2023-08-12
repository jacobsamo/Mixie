import { db } from '@/src/db';
import { recipes } from '@/src/db/schemas';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const recipe = await db.query.recipes.findMany({
    with: {
      info: true,
    },
  });
  console.log('Recipe: ', recipe);
  return NextResponse.json({ recipe });
}
