'use server';

import {
  generateRecipesFromIngredients,
  type GenerateRecipesFromIngredientsOutput,
} from '@/ai/flows/generate-recipes-from-ingredients';
import {
  suggestAdditionalIngredients,
  type SuggestAdditionalIngredientsOutput,
} from '@/ai/flows/suggest-additional-ingredients';
import { z } from 'zod';

const ingredientsSchema = z
  .array(z.string())
  .min(1, 'Please add at least one ingredient.');

export async function generateRecipeAction(
  ingredients: string[]
): Promise<{ recipe?: GenerateRecipesFromIngredientsOutput; error?: string }> {
  const validatedIngredients = ingredientsSchema.safeParse(ingredients);
  if (!validatedIngredients.success) {
    return { error: validatedIngredients.error.errors[0].message };
  }

  try {
    const recipe = await generateRecipesFromIngredients({
      ingredients: validatedIngredients.data.join(', '),
    });
    return { recipe };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate recipe. Please try again.' };
  }
}

export async function suggestIngredientsAction(
  ingredients: string[]
): Promise<{
  suggestions?: SuggestAdditionalIngredientsOutput;
  error?: string;
}> {
  const validatedIngredients = ingredientsSchema.safeParse(ingredients);
  if (!validatedIngredients.success) {
    return { error: validatedIngredients.error.errors[0].message };
  }

  try {
    const suggestions = await suggestAdditionalIngredients({
      ingredients: validatedIngredients.data,
    });
    return { suggestions };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to suggest ingredients. Please try again.' };
  }
}
