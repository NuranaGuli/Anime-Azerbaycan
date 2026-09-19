import { NextRequest, NextResponse } from "next/server";
import { db, hashPasswordValue } from "@/lib/server/db";
import { signToken, AUTH_COOKIE_NAME } from "@/lib/server/jwt";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ message: "Yanlış sorğu." }, { status: 400 });

  const { email, password } = body as { email?: string; password?: string };
  if (!email || !password) {
    return NextResponse.json({ message: "Email və şifrə tələb olunur." }, { status: 400 });
  }

  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.passwordHash !== hashPasswordValue(password)) {
    return NextResponse.json({ message: "Email və ya şifrə yanlışdır." }, { status: 401 });
  }

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
