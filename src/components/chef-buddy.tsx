'use client';

import { useState, useTransition, useRef, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, Plus, ChefHat, Loader2 } from 'lucide-react';
import { generateRecipeAction } from '@/app/actions';
import { type GenerateRecipesFromIngredientsOutput } from '@/ai/flows/generate-recipes-from-ingredients';
import RecipeCard from './recipe-card';
import { Card, CardContent } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { RecipeCardSkeleton } from './recipe-card-skeleton';

export default function ChefBuddy() {
  const [ingredients, setIngredients] = useState<string[]>([
    'Tomatoes',
    'Basil',
    'Garlic',
    'Olive Oil',
  ]);
  const [recipe, setRecipe] =
    useState<GenerateRecipesFromIngredientsOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddIngredient = (e: FormEvent) => {
    e.preventDefault();
    const newIngredient = inputRef.current?.value.trim();
    if (newIngredient) {
      if (
        !ingredients.find(
          (i) => i.toLowerCase() === newIngredient.toLowerCase()
        )
      ) {
        setIngredients([...ingredients, newIngredient]);
      }
      inputRef.current!.value = '';
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredientToRemove));
  };

  const handleGenerateRecipe = () => {
    if (ingredients.length === 0) {
      toast({
        title: 'No ingredients!',
        description: 'Please add some ingredients before generating a recipe.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      setRecipe(null);
      const result = await generateRecipeAction(ingredients);
      if (result.error) {
        toast({
          title: 'Error generating recipe',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.recipe) {
        setRecipe(result.recipe);
      }
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card className="shadow-lg border-primary/20">
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label
                htmlFor="ingredient-input"
                className="font-medium text-foreground flex items-center gap-2"
              >
                <ChefHat className="h-5 w-5 text-primary" />
                Your Ingredients
              </label>
              <p className="text-sm text-muted-foreground">
                Add what you have. What&apos;s in your fridge?
              </p>
            </div>
            <form onSubmit={handleAddIngredient} className="flex gap-2">
              <Input
                id="ingredient-input"
                ref={inputRef}
                placeholder="e.g., Chicken breast, broccoli..."
                className="flex-grow"
              />
              <Button type="submit" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </form>
            <div className="flex flex-wrap gap-2 min-h-[2.5rem] items-center">
              {ingredients.length === 0 ? (
                <p className="text-sm text-muted-foreground px-2">
                  No ingredients yet. Add some above!
                </p>
              ) : (
                ingredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="secondary"
                    className="text-base py-1 px-3 bg-accent/20 border border-accent/50 hover:bg-accent/30 capitalize"
                  >
                    {ingredient}
                    <button
                      onClick={() => handleRemoveIngredient(ingredient)}
                      className="ml-2 rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
                      aria-label={`Remove ${ingredient}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
            <Button
              onClick={handleGenerateRecipe}
              disabled={isPending || ingredients.length === 0}
              size="lg"
              className="w-full font-bold text-lg"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Recipe
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isPending && <RecipeCardSkeleton />}

      {recipe && (
        <div className="animate-in fade-in-50 duration-500">
          <RecipeCard recipe={recipe} ingredients={ingredients} />
        </div>
      )}
    </div>
  );
}
