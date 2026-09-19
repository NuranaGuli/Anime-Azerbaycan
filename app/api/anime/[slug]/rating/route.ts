import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { requireAuth, toAnimeDetail } from "@/lib/server/helpers";

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const { userId, errorResponse } = requireAuth(req);
  if (errorResponse) return errorResponse;

  const anime = db.anime.find((a) => a.slug === params.slug);
  if (!anime) return NextResponse.json({ message: "Anime tapılmadı." }, { status: 404 });

  const body = await req.json().catch(() => null);
  const value = Number(body?.value);
  if (!Number.isInteger(value) || value < 1 || value > 10) {
    return NextResponse.json({ message: "Rating 1-10 arasında olmalıdır." }, { status: 400 });
  }

  const existing = db.ratings.find((r) => r.animeId === anime.id && r.userId === userId);
  if (existing) {
    existing.value = value;
  } else {
    db.ratings.push({ animeId: anime.id, userId: userId as string, value });
  }

  return NextResponse.json(toAnimeDetail(anime, userId));
}
