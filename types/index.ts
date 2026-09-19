export type AnimeStatus = "ongoing" | "completed" | "announced";

export type WatchlistStatus = "watching" | "completed" | "plan_to_watch";

export interface ExternalLink {
  id: string;
  label: string;
  url: string;
  type: "streaming" | "reading";
}

export interface AnimeSummary {
  id: string;
  slug: string;
  title: string;
  posterUrl: string;
  genres: string[];
  status: AnimeStatus;
  episodeCount: number | null;
  communityRating: number;
  isFavorite?: boolean;
}

export interface AnimeDetail extends AnimeSummary {
  description: string;
  releaseDate: string;
  studio: string;
  ratingCount: number;
  userRating: number | null;
  watchlistStatus: WatchlistStatus | null;
  externalLinks: ExternalLink[];
}

export interface Comment {
  id: string;
  animeId: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl: string | null;
  content: string;
  createdAt: string;
  isOwn: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface AnimeListParams {
  search?: string;
  genre?: string;
  status?: AnimeStatus | "";
  page?: number;
  pageSize?: number;
  sort?: "rating" | "recent" | "";
}

export interface ProfileStats {
  favoritesCount: number;
  watchlistCount: number;
  commentsCount: number;
}

export interface ApiError {
  message: string;
  status?: number;
  fieldErrors?: Record<string, string>;
}
