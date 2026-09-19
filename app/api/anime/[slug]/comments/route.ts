import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/server/db";
import { getCurrentUserId, requireAuth, toCommentDto } from "@/lib/server/helpers";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const userId = getCurrentUserId(req);
  const anime = db.anime.find((a) => a.slug === params.slug);
  if (!anime) return NextResponse.json({ message: "Anime tapılmadı." }, { status: 404 });

  const comments = db.comments
    .filter((c) => c.animeId === anime.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((c) => toCommentDto(c, userId));

  return NextResponse.json({ items: comments });
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const { userId, errorResponse } = requireAuth(req);
  if (errorResponse) return errorResponse;

  const anime = db.anime.find((a) => a.slug === params.slug);
  if (!anime) return NextResponse.json({ message: "Anime tapılmadı." }, { status: 404 });

  const body = await req.json().catch(() => null);
  const content = (body?.content || "").trim();
  if (!content || content.length < 2) {
    return NextResponse.json({ message: "Şərh ən azı 2 simvol olmalıdır." }, { status: 400 });
  }
  if (content.length > 1000) {
    return NextResponse.json({ message: "Şərh maksimum 1000 simvol ola bilər." }, { status: 400 });
  }

  const comment = {
    id: crypto.randomUUID(),
    animeId: anime.id,
    userId: userId as string,
    content,
    createdAt: new Date().toISOString(),
  };
  db.comments.push(comment);

  return NextResponse.json(toCommentDto(comment, userId), { status: 201 });
}
