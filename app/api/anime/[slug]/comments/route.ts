import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/server/db";
import { getCurrentUserId, requireAuth, toCommentDto } from "@/lib/server/helpers";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const userId = getCurrentUserId(req);
  const anime = db.anime.find((a) => a.slug === params.slug);
  if (!anime) return NextResponse.json({ message: "Anime tapılmadı." }, { status: 404 });

  const all = db.comments
    .filter((c) => c.animeId === anime.id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((c) => toCommentDto(c, userId));

  const byId = new Map(all.map((c) => [c.id, c]));
  const roots: typeof all = [];

  for (const comment of all) {
    if (comment.parentId && byId.has(comment.parentId)) {
      byId.get(comment.parentId)!.replies.push(comment);
    } else {
      roots.push(comment);
    }
  }

  roots.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ items: roots, total: all.length });
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

let parentId: string | null = null;
if (body?.parentId) {
  const parent = db.comments.find((c) => c.id === body.parentId);
  if (!parent || parent.animeId !== anime.id) {
    return NextResponse.json({ message: "Cavab verilən şərh tapılmadı." }, { status: 400 });
  }
  parentId = parent.id;
}

  const comment = {
    id: crypto.randomUUID(),
    animeId: anime.id,
    userId: userId as string,
    content,
    createdAt: new Date().toISOString(),
    parentId,
  };
  db.comments.push(comment);

  return NextResponse.json(toCommentDto(comment, userId), { status: 201 });
}
