"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { AlertTriangle, Calendar, Clapperboard, Film, ExternalLink as ExternalLinkIcon } from "lucide-react";
import { useAnimeDetail, useRateAnime, useToggleFavorite, useSetWatchlistStatus } from "@/hooks/useAnimeDetail";
import { useAuthStore } from "@/store/authStore";
import { RatingBadge, InteractiveRating } from "@/components/anime/RatingStars";
import { FavoriteButton } from "@/components/anime/FavoriteButton";
import { WatchlistButton } from "@/components/anime/WatchlistButton";
import { CommentList } from "@/components/comment/CommentList";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { ANIME_STATUS_LABELS, formatDate } from "@/lib/utils";
import { posterFocus } from "@/lib/posterFocus";
import { toast } from "sonner";

export default function AnimeDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: anime, isLoading, isError, refetch } = useAnimeDetail(slug);
  const rateAnime = useRateAnime(slug);
  const toggleFavorite = useToggleFavorite(slug);
  const setWatchlistStatus = useSetWatchlistStatus(slug);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const requireAuthOr = (action: () => void) => {
    if (!isAuthenticated) {
      toast.error("Bu əməliyyat üçün daxil olmalısınız.");
      return;
    }
    action();
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <Skeleton className="h-[420px] w-full sm:w-64 shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !anime) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-20 text-center">
        <AlertTriangle className="h-10 w-10 text-error" />
        <p className="text-text-secondary">Anime yüklənərkən xəta baş verdi və ya tapılmadı.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Yenidən cəhd et
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-[280px] shrink-0 overflow-hidden rounded-xl border border-border shadow-xl shadow-black/30 sm:mx-0 sm:w-64">
          <Image
            src={anime.posterUrl}
            alt={anime.title}
            fill
            sizes="(max-width: 640px) 80vw, 256px"
            quality={95}
            priority
            style={{ objectPosition: posterFocus(anime.slug) }}
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={anime.status === "ongoing" ? "success" : "default"}>
              {ANIME_STATUS_LABELS[anime.status]}
            </Badge>
            {anime.genres.map((g) => (
              <Badge key={g}>{g}</Badge>
            ))}
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-text-primary sm:text-4xl">{anime.title}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <RatingBadge value={anime.communityRating} size="md" />
            <span>({anime.ratingCount} qiymətləndirmə)</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(anime.releaseDate)}
            </span>
            <span className="flex items-center gap-1">
              <Film className="h-4 w-4" />
              {anime.episodeCount ? `${anime.episodeCount} seriya` : "Elan olunub"}
            </span>
            <span className="flex items-center gap-1">
              <Clapperboard className="h-4 w-4" />
              {anime.studio}
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-text-secondary">{anime.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <FavoriteButton
              isFavorite={anime.isFavorite ?? false}
              onToggle={() => requireAuthOr(() => toggleFavorite.mutate())}
              isLoading={toggleFavorite.isPending}
            />
            <WatchlistButton
              status={anime.watchlistStatus}
              onChange={(status) => requireAuthOr(() => setWatchlistStatus.mutate(status))}
              isLoading={setWatchlistStatus.isPending}
            />
          </div>

          {anime.externalLinks.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {anime.externalLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-text-primary transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  {link.label}
                </a>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-xl border border-border bg-surface p-4">
            <p className="mb-2 text-sm font-medium text-text-secondary">Sənin reytinqin</p>
            {isAuthenticated ? (
              <InteractiveRating
                currentRating={anime.userRating}
                onSubmit={(value) => rateAnime.mutate(value)}
                isSubmitting={rateAnime.isPending}
              />
            ) : (
              <p className="text-sm text-text-muted">Reytinq vermək üçün daxil olun.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <CommentList slug={slug} />
      </div>
    </div>
  );
}
