import { Ghost } from "lucide-react";
import { AnimeCard } from "./AnimeCard";
import { Skeleton } from "@/components/ui/Skeleton";
import type { AnimeSummary } from "@/types";

interface AnimeGridProps {
  items: AnimeSummary[];
  isLoading?: boolean;
  onToggleFavorite?: (slug: string) => void;
  favoriteLoadingSlug?: string | null;
  emptyMessage?: string;
}

export function AnimeGrid({
  items,
  isLoading,
  onToggleFavorite,
  favoriteLoadingSlug,
  emptyMessage = "Heç bir anime tapılmadı.",
}: AnimeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3] w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
        <Ghost className="h-10 w-10 text-text-muted" aria-hidden="true" />
        <p className="text-text-secondary">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((anime, index) => (
        <div
          key={anime.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}
        >
          <AnimeCard
            anime={anime}
            onToggleFavorite={onToggleFavorite}
            isFavoriteLoading={favoriteLoadingSlug === anime.slug}
          />
        </div>
      ))}
    </div>
  );
}
