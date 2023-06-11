import { NextResponse } from 'next/server';
import { prisma } from '@lib/config/db';

export async function GET() {
  const res = await prisma.recipe.findMany();

  return NextResponse.json({ res });
}
