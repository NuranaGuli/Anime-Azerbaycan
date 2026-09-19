"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { animeService } from "@/lib/services/animeService";
import { ApiRequestError } from "@/lib/apiClient";
import type { AnimeDetail, WatchlistStatus } from "@/types";

export function useAnimeDetail(slug: string) {
  return useQuery({
    queryKey: ["anime-detail", slug],
    queryFn: ({ signal }) => animeService.detail(slug, signal),
    enabled: !!slug,
  });
}

export function useRateAnime(slug: string) {
  const queryClient = useQueryClient();
  return useMutation<AnimeDetail, ApiRequestError, number>({
    mutationFn: (value) => animeService.rate(slug, value),
    onSuccess: (data) => {
      queryClient.setQueryData(["anime-detail", slug], data);
      queryClient.invalidateQueries({ queryKey: ["anime-list"] });
      toast.success("Reytinginiz qeydə alındı.");
    },
    onError: (error) => {
      toast.error(error.message || "Reytinq verilə bilmədi.");
    },
  });
}

export function useToggleFavorite(slug: string) {
  const queryClient = useQueryClient();
  return useMutation<AnimeDetail, ApiRequestError, void>({
    mutationFn: () => animeService.toggleFavorite(slug),
    onSuccess: (data) => {
      queryClient.setQueryData(["anime-detail", slug], data);
      queryClient.invalidateQueries({ queryKey: ["anime-list"] });
      queryClient.invalidateQueries({ queryKey: ["profile-favorites"] });
      queryClient.invalidateQueries({ queryKey: ["profile-stats"] });
      toast.success(data.isFavorite ? "Favorilərə əlavə edildi." : "Favorilərdən çıxarıldı.");
    },
    onError: (error) => {
      toast.error(error.message || "Əməliyyat uğursuz oldu.");
    },
  });
}

export function useToggleFavoriteAny() {
  const queryClient = useQueryClient();
  return useMutation<AnimeDetail, ApiRequestError, string>({
    mutationFn: (slug) => animeService.toggleFavorite(slug),
    onSuccess: (data, slug) => {
      queryClient.setQueryData(["anime-detail", slug], data);
      queryClient.invalidateQueries({ queryKey: ["anime-list"] });
      queryClient.invalidateQueries({ queryKey: ["profile-favorites"] });
      queryClient.invalidateQueries({ queryKey: ["profile-stats"] });
      toast.success(data.isFavorite ? "Favorilərə əlavə edildi." : "Favorilərdən çıxarıldı.");
    },
    onError: (error) => {
      toast.error(error.message || "Əməliyyat uğursuz oldu.");
    },
  });
}

export function useSetWatchlistStatus(slug: string) {
  const queryClient = useQueryClient();
  return useMutation<AnimeDetail, ApiRequestError, WatchlistStatus | null>({
    mutationFn: (status) => animeService.setWatchlistStatus(slug, status),
    onSuccess: (data) => {
      queryClient.setQueryData(["anime-detail", slug], data);
      queryClient.invalidateQueries({ queryKey: ["profile-watchlist"] });
      queryClient.invalidateQueries({ queryKey: ["profile-stats"] });
      toast.success("Watchlist yeniləndi.");
    },
    onError: (error) => {
      toast.error(error.message || "Watchlist yenilənmədi.");
    },
  });
}
