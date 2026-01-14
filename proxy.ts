import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, isValidLocale } from './i18n.config';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy for:
  // - Static files (images, fonts, etc.)
  // - API routes
  // - Next.js internals (_next)
  // - Files with extensions
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(
      /\.(ico|png|jpg|jpeg|svg|webp|gif|css|js|woff|woff2|ttf|eot)$/
    )
  ) {
    return NextResponse.next();
  }

  // Extract locale from pathname
  const pathnameSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathnameSegments[0];

  let locale: string = DEFAULT_LOCALE;
  let pathWithoutLocale = pathname;

  // Check if first segment is a valid locale
  if (firstSegment && isValidLocale(firstSegment)) {
    locale = firstSegment;
    // Remove locale from path for internal routing
    const remainingSegments = pathnameSegments.slice(1);
    pathWithoutLocale =
      remainingSegments.length > 0 ? `/${remainingSegments.join('/')}` : '/';
  } else {
    // No locale prefix found, use default locale
    // The pathname is already the path without locale
    locale = DEFAULT_LOCALE;
    pathWithoutLocale = pathname;
  }

  // For root path '/', ensure it's handled correctly
  if (pathname === '/') {
    locale = DEFAULT_LOCALE;
    pathWithoutLocale = '/';
  }

  // Clone the request URL and modify it for internal routing
  const url = request.nextUrl.clone();

  // Rewrite to include locale in pathname so Next.js can match [locale] dynamic segment
  // For default locale: / -> /en, /contact -> /en/contact
  // For other locales: /fr -> /fr, /fr/contact -> /fr/contact
  if (pathWithoutLocale === '/') {
    url.pathname = `/${locale}`;
  } else {
    url.pathname = `/${locale}${pathWithoutLocale}`;
  }

  // Create response with locale header
  const response = NextResponse.rewrite(url);
  response.headers.set('x-locale', locale);
  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Files with extensions (static assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
