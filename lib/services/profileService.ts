import { apiClient } from "@/lib/apiClient";
import type { AnimeSummary, ProfileStats, WatchlistStatus } from "@/types";

export const profileService = {
  favorites: (signal?: AbortSignal) => apiClient.get<{ items: AnimeSummary[] }>("/api/profile/favorites", signal),

  watchlist: (status?: WatchlistStatus, signal?: AbortSignal) =>
    apiClient.get<{ items: (AnimeSummary & { watchlistStatus: WatchlistStatus })[] }>(
      `/api/profile/watchlist${status ? `?status=${status}` : ""}`,
      signal
    ),

  stats: (signal?: AbortSignal) => apiClient.get<ProfileStats>("/api/profile/stats", signal),
};
