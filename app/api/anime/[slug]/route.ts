import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { getCurrentUserId, toAnimeDetail } from "@/lib/server/helpers";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const userId = getCurrentUserId(req);
  const anime = db.anime.find((a) => a.slug === params.slug);
  if (!anime) return NextResponse.json({ message: "Anime tapılmadı." }, { status: 404 });

  return NextResponse.json(toAnimeDetail(anime, userId));
}
