import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { requireAuth } from "@/lib/server/helpers";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId, errorResponse } = requireAuth(req);
  if (errorResponse) return errorResponse;

  const comment = db.comments.find((c) => c.id === params.id);
  if (!comment) return NextResponse.json({ message: "Şərh tapılmadı." }, { status: 404 });

  if (comment.userId !== userId) {
    return NextResponse.json({ message: "Yalnız öz şərhinizi silə bilərsiniz." }, { status: 403 });
  }

  db.comments = db.comments.filter((c) => c.id !== params.id);
  return NextResponse.json({ ok: true });
}
