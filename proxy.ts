import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const isProduction = host === 'thrive-fl.org' || host === 'www.thrive-fl.org';

  // Redirect www.thrive-fl.org to thrive-fl.org (non-www)
  if (host === 'www.thrive-fl.org') {
    const url = request.nextUrl.clone();
    url.host = 'thrive-fl.org';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  // Add noindex header for non-production environments (dev, staging, amplifyapp.com)
  if (!isProduction) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Run proxy on all routes except static files and api
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

