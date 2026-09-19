"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { ANIME_STATUS_LABELS } from "@/lib/utils";
import { posterFocus } from "@/lib/posterFocus";
import type { AnimeSummary } from "@/types";

interface AnimeCardProps {
  anime: AnimeSummary;
  onToggleFavorite?: (slug: string) => void;
  isFavoriteLoading?: boolean;
}

export function AnimeCard({ anime, onToggleFavorite, isFavoriteLoading }: AnimeCardProps) {
  return (
    <Link
      href={`/anime/${anime.slug}`}
      className="group relative block aspect-[2/3] w-full overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 hover:ring-primary/50 hover:shadow-xl hover:shadow-primary/10"
    >
      <Image
        src={anime.posterUrl}
        alt={anime.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        quality={90}
        style={{ objectPosition: posterFocus(anime.slug) }}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
      />

      {}
      <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-xs font-semibold text-warning backdrop-blur-md">
        <Star className="h-3 w-3 fill-warning" aria-hidden="true" />
        {anime.communityRating.toFixed(1)}
      </div>

      {}
      {onToggleFavorite && (
        <div className="absolute right-2.5 top-2.5">
          <FavoriteButton
            isFavorite={!!anime.isFavorite}
            onToggle={() => onToggleFavorite(anime.slug)}
            isLoading={isFavoriteLoading}
            size="sm"
            className="bg-black/55 backdrop-blur-md hover:bg-black/70"
          />
        </div>
      )}

      {}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/95 via-black/55 to-transparent px-3 pb-3 pt-10">
        {anime.status === "ongoing" && (
          <span className="mb-0.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-success/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
            <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-success" aria-hidden="true" />
            Davam edir
          </span>
        )}
        <h3 className="line-clamp-1 font-display text-sm font-bold text-white sm:text-[15px]">{anime.title}</h3>
        <p className="line-clamp-1 text-xs text-white/65">
          {anime.genres.slice(0, 2).join(" · ")}
          {anime.episodeCount ? ` · ${anime.episodeCount} seriya` : ` · ${ANIME_STATUS_LABELS[anime.status]}`}
        </p>
      </div>
    </Link>
  );
}
