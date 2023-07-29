import RecipeService from '@/src/common/lib/services/RecipeService';
import { NextResponse } from 'next/server';

export async function GET() {
  const recipe = RecipeService.getRecipeById('test-recipe');

  return NextResponse.json({ recipe });
}
