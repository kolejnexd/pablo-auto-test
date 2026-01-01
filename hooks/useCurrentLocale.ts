'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { detectLocaleFromPath, getTranslations, readLocaleCookie, normalizeLocale, localeCookieName, type Locale } from '../lib/i18n';

export function useCurrentLocale(initialLocale?: Locale): { locale: Locale; t: ReturnType<typeof getTranslations> } {
  const pathname = usePathname() || '/';
  const cookieLocale = readLocaleCookie(typeof document !== 'undefined' ? document.cookie : undefined);
  const htmlLangLocale = normalizeLocale(typeof document !== 'undefined' ? document.documentElement.lang : undefined);
  const preferredLocale = initialLocale ?? htmlLangLocale ?? cookieLocale;
  const locale = detectLocaleFromPath(pathname, preferredLocale);
  const t = getTranslations(locale);

  useEffect(() => {
    const maxAge = 60 * 60 * 24 * 180; // ~6 months
    document.cookie = `${localeCookieName}=${locale}; path=/; max-age=${maxAge}`;
    document.documentElement.lang = locale;
  }, [locale]);

  return { locale, t };
}
