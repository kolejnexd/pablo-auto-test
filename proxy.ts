import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { localeCookieName } from "./lib/i18n";
import { resolveLocaleFromPath } from "./lib/serverLocale";

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|apple-touch-icon.png|.*\\..*).*)",
    ],
};

const CANONICAL_HOST = "pablo-auto.at";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // ~6 months

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const host = (
        request.headers.get("x-forwarded-host") ??
        request.headers.get("host") ??
        ""
    ).toLowerCase();

    // 1. WWW Redirect
    if (host === `www.${CANONICAL_HOST}`) {
        const target = new URL(pathname + request.nextUrl.search, CANONICAL_ORIGIN);
        return NextResponse.redirect(target, 301);
    }

    // 2. Redirect /de/... -> /...
    if (pathname.startsWith("/de/") || pathname === "/de") {
        const newPath = pathname === "/de" ? "/" : pathname.replace(/^\/de/, "");
        const target = new URL(newPath + request.nextUrl.search, request.url);
        return NextResponse.redirect(target, 301);
    }

    // 3. Locale Detection & Cookie
    const localeCookie = request.cookies.get(localeCookieName)?.value;
    const locale = resolveLocaleFromPath(pathname, localeCookie);

    // 4. Set cookie if needed
    const response = NextResponse.next();
    if (localeCookie !== locale) {
        response.cookies.set(localeCookieName, locale, {
            path: "/",
            maxAge: LOCALE_COOKIE_MAX_AGE,
        });
    }

    return response;
}
