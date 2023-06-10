import { NextResponse } from 'next/server';
import { prisma } from '@lib/config/db';

export async function GET() {
  const res = await prisma.recipes.findMany();
  const data = await res.json();

  return NextResponse.json({ data });
}
