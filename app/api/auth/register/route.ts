import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db, hashPasswordValue } from "@/lib/server/db";
import { signToken, AUTH_COOKIE_NAME } from "@/lib/server/jwt";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ message: "Yanlış sorğu." }, { status: 400 });

  const { username, email, password } = body as { username?: string; email?: string; password?: string };

  if (!username || !email || !password) {
    return NextResponse.json({ message: "Bütün sahələr tələb olunur." }, { status: 400 });
  }

  if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return NextResponse.json(
      { message: "Bu email artıq qeydiyyatdan keçib.", fieldErrors: { email: "Bu email artıq istifadə olunur" } },
      { status: 409 }
    );
  }

  if (db.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return NextResponse.json(
      { message: "Bu istifadəçi adı artıq mövcuddur.", fieldErrors: { username: "Bu istifadəçi adı tutulub" } },
      { status: 409 }
    );
  }

  const user = {
    id: crypto.randomUUID(),
    username,
    email,
    passwordHash: hashPasswordValue(password),
    avatarUrl: null,
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);

  const token = signToken(user.id);
  const res = NextResponse.json({
    user: { id: user.id, username: user.username, email: user.email, avatarUrl: user.avatarUrl, createdAt: user.createdAt },
  });
  res.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
