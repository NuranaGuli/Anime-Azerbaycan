import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { requireAuth, toAnimeSummary } from "@/lib/server/helpers";

export async function GET(req: NextRequest) {
  const { userId, errorResponse } = requireAuth(req);
  if (errorResponse) return errorResponse;

  const favoriteAnimeIds = db.favorites.filter((f) => f.userId === userId).map((f) => f.animeId);
  const items = db.anime.filter((a) => favoriteAnimeIds.includes(a.id)).map((a) => toAnimeSummary(a, userId));

  return NextResponse.json({ items });
}
