import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-me-32chars-minimum');
export const COOKIE_NAME = 'rq_session';

export type SessionPayload = { userId: string; role: string; email: string; name: string };

export async function signToken(payload: SessionPayload) {
  return await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export async function requireAuth(): Promise<SessionPayload | null> {
  return await getSession();
}

export async function requireAdmin(): Promise<SessionPayload | null> {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') return null;
  return s;
}
