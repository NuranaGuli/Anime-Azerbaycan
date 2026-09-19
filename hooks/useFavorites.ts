"use client";

import { useQuery } from "@tanstack/react-query";
import { profileService } from "@/lib/services/profileService";
import type { WatchlistStatus } from "@/types";

export function useProfileFavorites(enabled: boolean) {
  return useQuery({
    queryKey: ["profile-favorites"],
    queryFn: ({ signal }) => profileService.favorites(signal),
    enabled,
  });
}

export function useProfileWatchlist(status: WatchlistStatus | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ["profile-watchlist", status],
    queryFn: ({ signal }) => profileService.watchlist(status, signal),
    enabled,
  });
}

export function useProfileStats(enabled: boolean) {
  return useQuery({
    queryKey: ["profile-stats"],
    queryFn: ({ signal }) => profileService.stats(signal),
    enabled,
  });
}
