import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  
  // Redirect www.thrive-fl.org to thrive-fl.org (non-www)
  if (host === 'www.thrive-fl.org') {
    const url = request.nextUrl.clone();
    url.host = 'thrive-fl.org';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Run proxy on all routes except static files and api
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

