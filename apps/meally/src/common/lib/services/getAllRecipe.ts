'use server';
import { cache } from 'react';
import { db } from '@/src/db';
import { env } from '@/env.mjs';
import { Info } from '@/src/db/types';

export const revalidate = 60 * 60 * 24; // revalidate the data at most every hour

export const getAllRecipes = cache(async () => {
  const items = await db.query.info.findMany();
  return items as Info[];
});
