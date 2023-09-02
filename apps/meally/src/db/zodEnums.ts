import { z } from 'zod';

export const unit = z
  .enum([
    'not_set',
    'grams',
    'kg',
    'cup',
    'ml',
    'litre',
    'tsp',
    'tbsp',
    'pinch',
    'item',
    'handful',
    'slice',
    'piece',
    'can',
    'bunch',
    'bottle',
  ])
  .default('not_set');

export const amount = z
  .enum(['not_set', '1/8', '1/2', '1/3', '2/3', '1/4', '3/4'])
  .default('not_set');

export const difficulty_level = z
  .enum(['not_set', 'easy', 'medium', 'hard'])
  .default('not_set');

export const sweet_savoury = z
  .enum(['not_set', 'sweet', 'savoury', 'both'])
  .default('not_set');

export const dietary = z
  .enum([
    'none',
    'vegetarian',
    'vegan',
    'pescatarian',
    'gluten_free',
    'dairy_free',
    'nut_free',
    'egg_free',
  ])
  .default('none');

export const mealTime = z
  .enum(['not_set', 'breakfast', 'lunch', 'dinner', 'snack', 'dessert'])
  .default('not_set');

// auth

export const theme = z.enum(['system', 'light', 'dark']).default('system');
export const fonts = z
  .enum(['default', 'open_dyslexic', 'monospace', 'serif', 'sans_serif'])
  .default('default');
export const diet = z
  .enum([
    'none',
    'vegetarian',
    'vegan',
    'pescatarian',
    'gluten_free',
    'dairy_free',
    'nut_free',
    'egg_free',
  ])
  .default('none');

export const allergens = z
  .enum([
    'none',
    'gluten',
    'dairy',
    'nuts',
    'eggs',
    'soya',
    'fish',
    'shellfish',
    'sesame',
    'celery',
    'mustard',
    'lupin',
    'molluscs',
  ])
  .default('none');

export const loveCooking = z
  .enum(['not_set', 'hate_it', 'dislike_it', 'neutral', 'like_it', 'love_it'])
  .default('not_set');

export const averageTimeToCook = z
  .enum([
    'not_set',
    'less_than_15',
    '15_to_30',
    '30_to_45',
    '45_to_60',
    '60_to_90',
    '90_to_120',
    'more_than_120',
  ])
  .default('not_set');
