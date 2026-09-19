"use client";

import Link from "next/link";
import { ArrowRight, Flame, Clock } from "lucide-react";
import { useAnimeList } from "@/hooks/useAnimeList";
import { useToggleFavoriteAny } from "@/hooks/useAnimeDetail";
import { AnimeGrid } from "@/components/anime/AnimeGrid";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

function HomeSection({ title, icon, sort }: { title: string; icon: React.ReactNode; sort: "rating" | "recent" }) {
  const { data, isLoading } = useAnimeList({ page: 1, pageSize: 5, sort });
  const toggleFavorite = useToggleFavoriteAny();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const handleToggleFavorite = (slug: string) => {
    if (!isAuthenticated) {
      toast.error("Favorilərə əlavə etmək üçün daxil olun.");
      return;
    }
    toggleFavorite.mutate(slug);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-text-primary">
          {icon}
          {title}
        </h2>
        <Link href="/anime" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Hamısına bax
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <AnimeGrid
        items={data?.items ?? []}
        isLoading={isLoading}
        onToggleFavorite={handleToggleFavorite}
        favoriteLoadingSlug={toggleFavorite.isPending ? (toggleFavorite.variables as string) : null}
      />
    </section>
  );
}

export function PopularSection() {
  return <HomeSection title="Populyar anime-lər" icon={<Flame className="h-6 w-6 text-accent" />} sort="rating" />;
}

export function RecentSection() {
  return <HomeSection title="Yeni əlavə olunanlar" icon={<Clock className="h-6 w-6 text-secondary" />} sort="recent" />;
}
