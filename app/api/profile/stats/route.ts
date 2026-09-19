import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { requireAuth } from "@/lib/server/helpers";
import type { ProfileStats } from "@/types";

export async function GET(req: NextRequest) {
  const { userId, errorResponse } = requireAuth(req);
  if (errorResponse) return errorResponse;

  const stats: ProfileStats = {
    favoritesCount: db.favorites.filter((f) => f.userId === userId).length,
    watchlistCount: db.watchlist.filter((w) => w.userId === userId).length,
    commentsCount: db.comments.filter((c) => c.userId === userId).length,
  };

  return NextResponse.json(stats);
}
