'use server';

/**
 * @fileOverview Generates recipes based on user-provided ingredients.
 *
 * - generateRecipesFromIngredients - A function that generates a recipe based on the given ingredients.
 * - GenerateRecipesFromIngredientsInput - The input type for the generateRecipesFromIngredients function.
 * - GenerateRecipesFromIngredientsOutput - The return type for the generateRecipesFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipesFromIngredientsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma separated list of ingredients the user has available.'),
});
export type GenerateRecipesFromIngredientsInput = z.infer<
  typeof GenerateRecipesFromIngredientsInputSchema
>;

const GenerateRecipesFromIngredientsOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  instructions: z.string().describe('The cooking instructions for the recipe.'),
  prepTime: z.string().describe('The estimated preparation time for the recipe.'),
  cookTime: z.string().describe('The estimated cooking time for the recipe.'),
  nutritionalInformation: z
    .string()
    .describe('The nutritional information for the recipe.'),
  additionalNotes: z
    .string()
    .optional()
    .describe('Any additional notes or suggestions for the recipe.'),
});
export type GenerateRecipesFromIngredientsOutput = z.infer<
  typeof GenerateRecipesFromIngredientsOutputSchema
>;

export async function generateRecipesFromIngredients(
  input: GenerateRecipesFromIngredientsInput
): Promise<GenerateRecipesFromIngredientsOutput> {
  return generateRecipesFromIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipesFromIngredientsPrompt',
  input: {schema: GenerateRecipesFromIngredientsInputSchema},
  output: {schema: GenerateRecipesFromIngredientsOutputSchema},
  prompt: `You are a world-class chef, skilled at creating delicious recipes based on a limited set of ingredients.

  The user will provide you with a list of ingredients they have on hand. You should generate a complete recipe using primarily those ingredients.

  Ingredients: {{{ingredients}}}

  Consider common cooking techniques, ingredient pairings, and nutritional balance when creating the recipe.
  Specify the recipe name, cooking instructions, preparation time, cooking time, nutritional information, and any additional notes or suggestions.
  Do not suggest ingredients that the user did not list in their available ingredients.
  Be concise.`,
});

const generateRecipesFromIngredientsFlow = ai.defineFlow(
  {
    name: 'generateRecipesFromIngredientsFlow',
    inputSchema: GenerateRecipesFromIngredientsInputSchema,
    outputSchema: GenerateRecipesFromIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
