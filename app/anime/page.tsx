"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useAnimeList } from "@/hooks/useAnimeList";
import { useToggleFavoriteAny } from "@/hooks/useAnimeDetail";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useAuthStore } from "@/store/authStore";
import { GenreFilter } from "@/components/anime/GenreFilter";
import { AnimeGrid } from "@/components/anime/AnimeGrid";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import type { AnimeStatus } from "@/types";

export default function AnimeCatalogPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState<AnimeStatus | "">("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedValue(search, 400);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const toggleFavorite = useToggleFavoriteAny();

  const { data, isLoading, isError, refetch, isFetching } = useAnimeList({
    search: debouncedSearch,
    genre,
    status,
    page,
    pageSize: 10,
  });

  const handleFilterChange = (updater: () => void) => {
    updater();
    setPage(1);
  };

  const handleToggleFavorite = (slug: string) => {
    if (!isAuthenticated) {
      toast.error("Favorilərə əlavə etmək üçün daxil olun.");
      return;
    }
    toggleFavorite.mutate(slug);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-display text-3xl font-bold text-text-primary">Anime kataloqu</h1>

      <div className="mb-6">
        <GenreFilter
          search={search}
          onSearchChange={(v) => handleFilterChange(() => setSearch(v))}
          genre={genre}
          onGenreChange={(v) => handleFilterChange(() => setGenre(v))}
          status={status}
          onStatusChange={(v) => handleFilterChange(() => setStatus(v))}
        />
      </div>

      {isError ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-error/30 bg-error/5 px-6 py-16 text-center">
          <AlertTriangle className="h-10 w-10 text-error" aria-hidden="true" />
          <p className="text-text-secondary">Anime siyahısı yüklənərkən xəta baş verdi.</p>
          <Button variant="outline" onClick={() => refetch()}>
            Yenidən cəhd et
          </Button>
        </div>
      ) : (
        <>
          <AnimeGrid
            items={data?.items ?? []}
             priorityCount={4}
            isLoading={isLoading || (isFetching && !data)}
            onToggleFavorite={handleToggleFavorite}
            favoriteLoadingSlug={toggleFavorite.isPending ? (toggleFavorite.variables as string) : null}
            emptyMessage="Bu axtarış/filtr üzrə anime tapılmadı. Başqa açar söz və ya filtr sınayın."
          />
          {data && (
            <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
          )}
        </>
      )}
    </div>
  );
}
