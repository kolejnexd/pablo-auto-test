import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { localeCookieName } from './lib/i18n';
import { resolveLocaleFromPath } from './lib/serverLocale';

const CANONICAL_HOST = 'pablo-auto.at';
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // ~6 months

export function middleware(request: NextRequest) {
    const host = (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '').toLowerCase();
    const locale = resolveLocaleFromPath(request.nextUrl.pathname, request.cookies.get(localeCookieName)?.value);

    // Redirect only for www host (exact match)
    if (host === `www.${CANONICAL_HOST}`) {
        const target = new URL(request.nextUrl.pathname + request.nextUrl.search, CANONICAL_ORIGIN);
        const response = NextResponse.redirect(target, 301);
        response.cookies.set(localeCookieName, locale, { path: '/', maxAge: LOCALE_COOKIE_MAX_AGE });
        return response;
    }

    const response = NextResponse.next();
    if (request.cookies.get(localeCookieName)?.value !== locale) {
        response.cookies.set(localeCookieName, locale, { path: '/', maxAge: LOCALE_COOKIE_MAX_AGE });
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|apple-touch-icon.png|.*\\..*).*)',
    ],
};

