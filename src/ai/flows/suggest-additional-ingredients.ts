'use server';

/**
 * @fileOverview A flow that suggests additional ingredients to complement the user's available ingredients.
 *
 * @exports suggestAdditionalIngredients - A function that takes available ingredients as input and returns suggestions for additional ingredients.
 * @exports SuggestAdditionalIngredientsInput - The input type for the suggestAdditionalIngredients function.
 * @exports SuggestAdditionalIngredientsOutput - The output type for the suggestAdditionalIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAdditionalIngredientsInputSchema = z.object({
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients the user has available.'),
});
export type SuggestAdditionalIngredientsInput = z.infer<
  typeof SuggestAdditionalIngredientsInputSchema
>;

const SuggestAdditionalIngredientsOutputSchema = z.object({
  suggestedIngredients: z
    .array(z.string())
    .describe('A list of ingredients suggested to complement the available ingredients.'),
});
export type SuggestAdditionalIngredientsOutput = z.infer<
  typeof SuggestAdditionalIngredientsOutputSchema
>;

export async function suggestAdditionalIngredients(
  input: SuggestAdditionalIngredientsInput
): Promise<SuggestAdditionalIngredientsOutput> {
  return suggestAdditionalIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAdditionalIngredientsPrompt',
  input: {schema: SuggestAdditionalIngredientsInputSchema},
  output: {schema: SuggestAdditionalIngredientsOutputSchema},
  prompt: `You are a recipe suggestion AI.

  The user will provide you with a list of ingredients they have available.
  You will respond with a list of ingredients that would complement their ingredients, in order to make complete and flavorful recipes.

  Available Ingredients: {{{ingredients}}}

  Suggest some additional ingredients:
  `,
});

const suggestAdditionalIngredientsFlow = ai.defineFlow(
  {
    name: 'suggestAdditionalIngredientsFlow',
    inputSchema: SuggestAdditionalIngredientsInputSchema,
    outputSchema: SuggestAdditionalIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
