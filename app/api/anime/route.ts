import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { getCurrentUserId, toAnimeSummary } from "@/lib/server/helpers";

export async function GET(req: NextRequest) {
  const userId = getCurrentUserId(req);
  const { searchParams } = new URL(req.url);

  const search = (searchParams.get("search") || "").trim().toLowerCase();
  const genre = searchParams.get("genre") || "";
  const status = searchParams.get("status") || "";
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = Math.min(24, Math.max(1, Number(searchParams.get("pageSize") || 8)));
  const sort = searchParams.get("sort") || "";

  let filtered = db.anime.slice();

  if (search) {
    filtered = filtered.filter((a) => a.title.toLowerCase().includes(search));
  }
  if (genre) {
    filtered = filtered.filter((a) => a.genres.includes(genre));
  }
  if (status) {
    filtered = filtered.filter((a) => a.status === status);
  }

  if (sort === "rating") {
    filtered = filtered
      .map((a) => ({ anime: a, summary: toAnimeSummary(a, userId) }))
      .sort((x, y) => y.summary.communityRating - x.summary.communityRating)
      .map((x) => x.anime);
  } else if (sort === "recent") {
    filtered = filtered.sort(
      (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
  }

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    items: pageItems.map((a) => toAnimeSummary(a, userId)),
    page,
    pageSize,
    totalItems,
    totalPages,
  });
}
