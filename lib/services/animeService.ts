import { apiClient } from "@/lib/apiClient";
import type { AnimeDetail, AnimeListParams, AnimeSummary, PaginatedResult } from "@/types";

function buildQuery(params: AnimeListParams): string {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("search", params.search);
  if (params.genre) searchParams.set("genre", params.genre);
  if (params.status) searchParams.set("status", params.status);
  if (params.sort) searchParams.set("sort", params.sort);
  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("pageSize", String(params.pageSize ?? 8));
  return searchParams.toString();
}

export const animeService = {
  list: (params: AnimeListParams, signal?: AbortSignal) =>
    apiClient.get<PaginatedResult<AnimeSummary>>(`/api/anime?${buildQuery(params)}`, signal),

  detail: (slug: string, signal?: AbortSignal) =>
    apiClient.get<AnimeDetail>(`/api/anime/${slug}`, signal),

  rate: (slug: string, value: number) =>
    apiClient.post<AnimeDetail>(`/api/anime/${slug}/rating`, { value }),

  toggleFavorite: (slug: string) => apiClient.post<AnimeDetail>(`/api/anime/${slug}/favorite`),

  setWatchlistStatus: (slug: string, status: AnimeDetail["watchlistStatus"]) =>
    apiClient.post<AnimeDetail>(`/api/anime/${slug}/watchlist`, { status }),
};
