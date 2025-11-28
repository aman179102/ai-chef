'use client';

import { useState, useTransition } from 'react';
import {
  Clock,
  Timer,
  HeartPulse,
  BookOpen,
  StickyNote,
  Lightbulb,
  Loader2,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { suggestIngredientsAction } from '@/app/actions';
import type { GenerateRecipesFromIngredientsOutput } from '@/ai/flows/generate-recipes-from-ingredients';

interface RecipeCardProps {
  recipe: GenerateRecipesFromIngredientsOutput;
  ingredients: string[];
}

export default function RecipeCard({ recipe, ingredients }: RecipeCardProps) {
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [isSuggesting, startSuggestingTransition] = useTransition();
  const { toast } = useToast();

  const handleSuggestIngredients = () => {
    startSuggestingTransition(async () => {
      const result = await suggestIngredientsAction(ingredients);
      if (result.error) {
        toast({
          title: 'Error suggesting ingredients',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.suggestions) {
        setSuggestions(result.suggestions.suggestedIngredients);
      }
    });
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-headline">
          {recipe.recipeName}
        </CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Prep: {recipe.prepTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Timer className="h-4 w-4 text-muted-foreground" />
            Cook: {recipe.cookTime}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator />
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Instructions
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-2">
            {recipe.instructions
              .split('\n')
              .filter((line) => line.trim() !== '')
              .map((step, i) => (
                <li key={i} className="pl-2">
                  {step.replace(/^\d+\.\s*/, '')}
                </li>
              ))}
          </ol>
        </div>
        <Separator />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-primary" />
              Nutritional Information
            </h4>
            <p className="text-sm text-muted-foreground">
              {recipe.nutritionalInformation}
            </p>
          </div>
          {recipe.additionalNotes && (
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <StickyNote className="h-5 w-5 text-primary" />
                Chef&apos;s Notes
              </h4>
              <p className="text-sm text-muted-foreground">
                {recipe.additionalNotes}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 pt-4">
        <Separator />
        <div className="pt-2">
          {!suggestions && !isSuggesting && (
            <Button
              onClick={handleSuggestIngredients}
              disabled={isSuggesting}
              variant="ghost"
              className="text-primary hover:text-primary"
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              Suggest ingredients to add
            </Button>
          )}
          {isSuggesting && (
            <div className="flex items-center text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking of tasty additions...
            </div>
          )}
          {suggestions && (
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Ingredient Suggestions
              </h4>
              <p className="text-sm text-muted-foreground">
                Consider adding these for even more flavor:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <Badge key={s} variant="outline" className="capitalize">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
