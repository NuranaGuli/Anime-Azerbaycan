import crypto from "crypto";

const SECRET = process.env.AUTH_SECRET || "anime-azerbaycan-dev-secret-change-me";

function base64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export interface TokenPayload {
  sub: string; 
  iat: number;
  exp: number;
}

export function signToken(userId: string, expiresInSeconds = 60 * 60 * 24 * 7): string {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = { sub: userId, iat: now, exp: now + expiresInSeconds };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyToken(token: string | undefined | null): TokenPayload | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [encodedHeader, encodedPayload, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  if (signature !== expectedSignature) return null;

  try {
    const payload: TokenPayload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export const AUTH_COOKIE_NAME = "anime_az_token";
