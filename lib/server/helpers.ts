import { NextRequest, NextResponse } from "next/server";
import { db, type DbAnime } from "./db";
import { AUTH_COOKIE_NAME, verifyToken } from "./jwt";
import type { AnimeDetail, AnimeSummary, Comment } from "@/types";

export function getCurrentUserId(req: NextRequest): string | null {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = verifyToken(token);
  return payload?.sub ?? null;
}

export function requireAuth(req: NextRequest) {
  const userId = getCurrentUserId(req);
  if (!userId) {
    return { userId: null, errorResponse: NextResponse.json({ message: "Giriş tələb olunur." }, { status: 401 }) };
  }
  return { userId, errorResponse: null };
}

export function computeCommunityRating(animeId: string): { rating: number; count: number } {
  const ratingsForAnime = db.ratings.filter((r) => r.animeId === animeId);
  if (ratingsForAnime.length === 0) return { rating: 0, count: 0 };
  const sum = ratingsForAnime.reduce((acc, r) => acc + r.value, 0);
  return { rating: Math.round((sum / ratingsForAnime.length) * 10) / 10, count: ratingsForAnime.length };
}

export function toAnimeSummary(anime: DbAnime, userId: string | null): AnimeSummary {
  const { rating } = computeCommunityRating(anime.id);
  const isFavorite = userId ? db.favorites.some((f) => f.animeId === anime.id && f.userId === userId) : false;
  return {
    id: anime.id,
    slug: anime.slug,
    title: anime.title,
    posterUrl: anime.posterUrl,
    genres: anime.genres,
    status: anime.status,
    episodeCount: anime.episodeCount,
    communityRating: rating,
    isFavorite,
  };
}

export function toAnimeDetail(anime: DbAnime, userId: string | null): AnimeDetail {
  const { rating, count } = computeCommunityRating(anime.id);
  const isFavorite = userId ? db.favorites.some((f) => f.animeId === anime.id && f.userId === userId) : false;
  const userRatingEntry = userId ? db.ratings.find((r) => r.animeId === anime.id && r.userId === userId) : undefined;
  const watchlistEntry = userId
    ? db.watchlist.find((w) => w.animeId === anime.id && w.userId === userId)
    : undefined;

  return {
    id: anime.id,
    slug: anime.slug,
    title: anime.title,
    posterUrl: anime.posterUrl,
    genres: anime.genres,
    status: anime.status,
    episodeCount: anime.episodeCount,
    communityRating: rating,
    ratingCount: count,
    isFavorite,
    description: anime.description,
    releaseDate: anime.releaseDate,
    studio: anime.studio,
    userRating: userRatingEntry?.value ?? null,
    watchlistStatus: watchlistEntry?.status ?? null,
    externalLinks: anime.externalLinks,
  };
}

export function toCommentDto(comment: { id: string; animeId: string; userId: string; content: string; createdAt: string }, currentUserId: string | null): Comment {
  const author = db.users.find((u) => u.id === comment.userId);
  return {
    id: comment.id,
    animeId: comment.animeId,
    authorId: comment.userId,
    authorName: author?.username ?? "Silinmiş istifadəçi",
    authorAvatarUrl: author?.avatarUrl ?? null,
    content: comment.content,
    createdAt: comment.createdAt,
    isOwn: currentUserId !== null && currentUserId === comment.userId,
  };
}

export function simulateLatency() {
}
