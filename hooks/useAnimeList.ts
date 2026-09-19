"use client";

import { useQuery } from "@tanstack/react-query";
import { animeService } from "@/lib/services/animeService";
import type { AnimeListParams } from "@/types";

export function useAnimeList(params: AnimeListParams) {
  return useQuery({
    queryKey: ["anime-list", params],
    queryFn: ({ signal }) => animeService.list(params, signal),
    placeholderData: (previousData) => previousData,
  });
}
