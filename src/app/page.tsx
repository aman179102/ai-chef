import ChefBuddy from '@/components/chef-buddy';
import { ChefHat } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-bg');

  return (
    <main className="min-h-screen w-full">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      <div className="absolute top-0 left-0 w-full h-[50vh] -z-10">
        {heroImage && (
          <>
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              style={{ objectFit: 'cover' }}
              className="opacity-20"
              data-ai-hint={heroImage.imageHint}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </>
        )}
      </div>
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <header className="text-center mb-8 md:mb-12">
          <div className="inline-block p-4 bg-primary/20 rounded-full mb-4 border border-primary/30">
            <ChefHat className="h-10 w-10 md:h-12 md:w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground tracking-tight">
            AI Chef Buddy
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Got ingredients? Get a recipe. It&apos;s that simple.
          </p>
        </header>

        <ChefBuddy />
      </div>
    </main>
  );
}
