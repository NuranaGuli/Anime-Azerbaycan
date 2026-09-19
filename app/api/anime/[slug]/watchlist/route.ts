import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import type { WatchlistStatusDb } from "@/lib/server/db";
import { requireAuth, toAnimeDetail } from "@/lib/server/helpers";

const VALID_STATUSES: WatchlistStatusDb[] = ["watching", "completed", "plan_to_watch"];

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const { userId, errorResponse } = requireAuth(req);
  if (errorResponse) return errorResponse;

  const anime = db.anime.find((a) => a.slug === params.slug);
  if (!anime) return NextResponse.json({ message: "Anime tapılmadı." }, { status: 404 });

  const body = await req.json().catch(() => null);
  const status = body?.status as WatchlistStatusDb | null | undefined;

  if (status === null) {
    db.watchlist = db.watchlist.filter((w) => !(w.animeId === anime.id && w.userId === userId));
    return NextResponse.json(toAnimeDetail(anime, userId));
  }

  if (!status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ message: "Yanlış watchlist statusu." }, { status: 400 });
  }

  const existing = db.watchlist.find((w) => w.animeId === anime.id && w.userId === userId);
  if (existing) {
    existing.status = status;
  } else {
    db.watchlist.push({ animeId: anime.id, userId: userId as string, status });
  }

  return NextResponse.json(toAnimeDetail(anime, userId));
}
