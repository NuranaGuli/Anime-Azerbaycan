import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { requireAuth, toAnimeDetail } from "@/lib/server/helpers";

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const { userId, errorResponse } = requireAuth(req);
  if (errorResponse) return errorResponse;

  const anime = db.anime.find((a) => a.slug === params.slug);
  if (!anime) return NextResponse.json({ message: "Anime tapılmadı." }, { status: 404 });

  const alreadyFavorite = db.favorites.some((f) => f.animeId === anime.id && f.userId === userId);
  if (alreadyFavorite) {
    db.favorites = db.favorites.filter((f) => !(f.animeId === anime.id && f.userId === userId));
  } else {
    db.favorites.push({ animeId: anime.id, userId: userId as string });
  }

  return NextResponse.json(toAnimeDetail(anime, userId));
}
