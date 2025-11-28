import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function RecipeCardSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 rounded-md" />
        <div className="flex gap-4 mt-2">
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-5 w-24 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        <Skeleton className="h-px w-full" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/4 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
        </div>
        <Skeleton className="h-px w-full" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/3 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
