import { Metadata } from 'next';
import { getRoute, Locale, RouteKey, routes } from './routes';
import { company } from './siteConfig';

const SITE_URL = 'https://pablo-auto.at';

type ConstructMetadataParams = {
    title: string;
    description: string;
    key?: RouteKey;
    locale: Locale;
    image?: string;
    noIndex?: boolean;
    // For blog posts (dynamic), separate from standard routes
    canonicalUrl?: string;
    alternateUrls?: Record<string, string>;
};

export function constructMetadata({
    title,
    description,
    key,
    locale,
    image = '/opengraph-image.png',
    noIndex = false,
    canonicalUrl,
    alternateUrls,
}: ConstructMetadataParams): Metadata {
    if (noIndex) {
        return {
            title,
            description,
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    // Determine Canonical & Alternates
    let canonical = canonicalUrl;
    let alternates: Record<string, string> = alternateUrls || {};

    if (key) {
        // Standard Route Logic
        // Normalize: if path ends with slash (and not root), strip it? 
        // Our routes.ts usually returns paths.
        // We enforce canonical to be clean.

        // Get all variants from routes.ts
        const paths = {
            de: getAbsoluteUrl(getRoute(key as RouteKey, 'de')),
            pl: getAbsoluteUrl(getRoute(key as RouteKey, 'pl')),
            en: getAbsoluteUrl(getRoute(key as RouteKey, 'en')),
        };

        canonical = paths[locale]; // Self referencing

        alternates = {
            de: paths.de,
            pl: paths.pl,
            en: paths.en,
            'x-default': paths.de,
        };
    } else if (!canonical) {
        // Fallback: if no key and no canonicalUrl provided (should not happen in strict mode)
        // Ensure we don't break build, but log error or default to self if we could know self
        // In server components, we don't easily know "self" without headers/middleware passing it.
        // We assume usage provides one of the two.
        throw new Error('constructMetadata requires either "key" or "canonicalUrl".');
    }

    return {
        title,
        description,
        metadataBase: new URL(SITE_URL),
        alternates: {
            canonical,
            languages: alternates,
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: company.name,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: locale === 'de' ? 'de_AT' : locale === 'pl' ? 'pl_PL' : 'en_GB',
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

function getAbsoluteUrl(path: string): string {
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    // If root, don't add slash?
    if (cleanPath === '/') return SITE_URL;
    return `${SITE_URL}${cleanPath}`;
}
