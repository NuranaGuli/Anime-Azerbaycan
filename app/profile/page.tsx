"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageSquare, Bookmark } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";
import { useProfileFavorites, useProfileWatchlist, useProfileStats } from "@/hooks/useFavorites";
import { AnimeCard } from "@/components/anime/AnimeCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn, WATCHLIST_STATUS_LABELS } from "@/lib/utils";
import type { WatchlistStatus } from "@/types";

type TopTab = "favorites" | "watchlist";

const WATCHLIST_SUB_TABS: WatchlistStatus[] = ["watching", "completed", "plan_to_watch"];

function StatBlock({ value, label }: { value: number | undefined; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
        {value === undefined ? <Skeleton className="h-8 w-10" /> : value}
      </span>
      <span className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</span>
    </div>
  );
}

function ProfileHeader() {
  const { user } = useAuthStore();
  const statsQuery = useProfileStats(true);

  if (!user) return null;

  return (
    <div className="mb-8 flex flex-wrap items-center gap-6 sm:gap-10">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-2xl font-bold text-bg sm:h-20 sm:w-20 sm:text-3xl">
        {user.username.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-[180px]">
        <h1 className="font-display text-xl font-bold text-text-primary sm:text-2xl">{user.username}</h1>
        <p className="text-sm text-primary">@{user.username.toLowerCase()}</p>
      </div>

      <div className="ml-auto flex gap-8 sm:gap-12">
        <StatBlock value={statsQuery.data?.favoritesCount} label="Favorites" />
        <StatBlock value={statsQuery.data?.watchlistCount} label="Watchlist" />
        <StatBlock value={statsQuery.data?.commentsCount} label="Comment" />
      </div>
    </div>
  );
}

function FavoritesGrid() {
  const favoritesQuery = useProfileFavorites(true);

  if (favoritesQuery.isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3] w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!favoritesQuery.data || favoritesQuery.data.items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-surface/50 p-6 text-center text-sm text-text-secondary">
        Favorilərinizdə hələ anime yoxdur.{" "}
        <Link href="/anime" className="text-primary hover:underline">
          Kataloqa bax
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {favoritesQuery.data.items.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}

function WatchlistGrid() {
  const [subTab, setSubTab] = useState<WatchlistStatus>("watching");
  const watchlistQuery = useProfileWatchlist(subTab, true);

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {WATCHLIST_SUB_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            aria-current={subTab === tab ? "page" : undefined}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
              subTab === tab
                ? "bg-primary/15 text-primary ring-1 ring-primary/40"
                : "bg-surface text-text-secondary ring-1 ring-border hover:text-text-primary"
            )}
          >
            {WATCHLIST_STATUS_LABELS[tab]}
          </button>
        ))}
      </div>

      {watchlistQuery.isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] w-full rounded-2xl" />
          ))}
        </div>
      ) : watchlistQuery.data && watchlistQuery.data.items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {watchlistQuery.data.items.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border bg-surface/50 p-6 text-center text-sm text-text-secondary">
          Bu kateqoriyada hələ anime yoxdur.
        </p>
      )}
    </div>
  );
}

function ProfileContent() {
  const [topTab, setTopTab] = useState<TopTab>("favorites");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <ProfileHeader />

      <div className="mb-6 flex gap-6 border-b border-border">
        <button
          onClick={() => setTopTab("favorites")}
          aria-current={topTab === "favorites" ? "page" : undefined}
          className={cn(
            "flex items-center gap-1.5 border-b-2 pb-3 text-sm font-medium transition-colors",
            topTab === "favorites"
              ? "border-primary text-text-primary"
              : "border-transparent text-text-secondary hover:text-text-primary"
          )}
        >
          <Heart className="h-4 w-4" />
          Favorilər
        </button>
        <button
          onClick={() => setTopTab("watchlist")}
          aria-current={topTab === "watchlist" ? "page" : undefined}
          className={cn(
            "flex items-center gap-1.5 border-b-2 pb-3 text-sm font-medium transition-colors",
            topTab === "watchlist"
              ? "border-primary text-text-primary"
              : "border-transparent text-text-secondary hover:text-text-primary"
          )}
        >
          <Bookmark className="h-4 w-4" />
          Watchlist
        </button>
      </div>

      {topTab === "favorites" ? <FavoritesGrid /> : <WatchlistGrid />}

      <div className="mt-10 flex items-center gap-2 text-xs text-text-muted">
        <MessageSquare className="h-3.5 w-3.5" />
        Şərh tarixçəniz hər anime səhifəsində öz adınızla görünür.
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
