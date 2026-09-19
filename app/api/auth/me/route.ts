import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { getCurrentUserId } from "@/lib/server/helpers";

export async function GET(req: NextRequest) {
  const userId = getCurrentUserId(req);
  if (!userId) return NextResponse.json({ user: null }, { status: 200 });

  const user = db.users.find((u) => u.id === userId);
  if (!user) return NextResponse.json({ user: null }, { status: 200 });

  return NextResponse.json({
    user: { id: user.id, username: user.username, email: user.email, avatarUrl: user.avatarUrl, createdAt: user.createdAt },
  });
}
