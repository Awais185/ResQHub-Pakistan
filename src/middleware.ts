import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-me-32chars-minimum');
const PROTECTED = ['/dashboard', '/alerts', '/report', '/my-reports', '/verified-hub', '/needs', '/ngo', '/map', '/profile', '/admin'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = PROTECTED.some(p => path.startsWith(p));

  if (isProtected) {
    const token = req.cookies.get('rq_session')?.value;
    if (!token) return NextResponse.redirect(new URL('/login', req.url));
    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (path.startsWith('/admin') && payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
