import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import type { WatchlistStatusDb } from "@/lib/server/db";
import { requireAuth, toAnimeSummary } from "@/lib/server/helpers";

export async function GET(req: NextRequest) {
  const { userId, errorResponse } = requireAuth(req);
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as WatchlistStatusDb | null;

  let entries = db.watchlist.filter((w) => w.userId === userId);
  if (status) entries = entries.filter((w) => w.status === status);

  const items = entries
    .map((entry) => {
      const anime = db.anime.find((a) => a.id === entry.animeId);
      if (!anime) return null;
      return { ...toAnimeSummary(anime, userId), watchlistStatus: entry.status };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return NextResponse.json({ items });
}
