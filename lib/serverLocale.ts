import { cookies, headers } from 'next/headers';
import { detectLocaleFromPath, defaultLocale, localeCookieName, type Locale } from './i18n';
import { LOCATION_PAGES } from './data/location-pages';

function resolveLocale(pathname: string, cookieLocale?: string | null): Locale {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const firstSegment = normalizedPath.split('/').filter(Boolean)[0];
  const matchedLocation = LOCATION_PAGES.find((page) => page.slug === firstSegment);

  if (matchedLocation) {
    return matchedLocation.language;
  }

  return detectLocaleFromPath(normalizedPath, cookieLocale);
}

export function getServerLocale(): Locale {
  const headerList = headers();
  const path =
    headerList.get('x-invoke-path') ??
    headerList.get('next-url') ??
    headerList.get('x-next-url') ??
    '/';
  const cookieLocale = cookies().get(localeCookieName)?.value;
  return resolveLocale(path, cookieLocale) ?? defaultLocale;
}

export { resolveLocale as resolveLocaleFromPath };
