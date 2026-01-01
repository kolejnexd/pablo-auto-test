import { Metadata } from 'next';
import { languages, company } from '../siteConfig';
import { seoConfig } from '../seoConfig';
import { getRoute, RouteKey, Locale } from '../routes';

const SITE_URL = company.website;

/**
 * Generuje alternates (canonical + hreflang) dla strony na podstawie RouteKey
 */
export function generatePageAlternates(routeKey: RouteKey, currentLocale: Locale) {
    const deUrl = `${SITE_URL}${getRoute(routeKey, 'de')}`;
    const plUrl = `${SITE_URL}${getRoute(routeKey, 'pl')}`;
    const enUrl = `${SITE_URL}${getRoute(routeKey, 'en')}`;

    const canonical = currentLocale === 'de' ? deUrl
        : currentLocale === 'pl' ? plUrl
            : enUrl;

    return {
        canonical,
        languages: {
            'de': deUrl,
            'pl': plUrl,
            'en': enUrl,
            'x-default': deUrl
        }
    };
}

/**
 * Generuje alternates dla homepage (specjalny przypadek - root)
 */
export function generateHomepageAlternates() {
    return {
        canonical: SITE_URL,
        languages: {
            'de': SITE_URL,
            'pl': `${SITE_URL}/pl`,
            'en': `${SITE_URL}/en`,
            'x-default': SITE_URL
        }
    };
}

/**
 * Generuje alternates dla strony pojazdu
 */
export function generateVehicleAlternates(slug: string, currentLocale: Locale) {
    const deRoute = getRoute('vehicles', 'de');
    const plRoute = getRoute('vehicles', 'pl');
    const enRoute = getRoute('vehicles', 'en');

    // We assumed getRoute returns path with leading slash, e.g. /autohandel-gebrauchtwagen
    // So we just append /slug
    const deUrl = `${SITE_URL}${deRoute}/${slug}`;
    const plUrl = `${SITE_URL}${plRoute}/${slug}`;
    const enUrl = `${SITE_URL}${enRoute}/${slug}`;

    const canonical = currentLocale === 'de' ? deUrl
        : currentLocale === 'pl' ? plUrl
            : enUrl;

    return {
        canonical,
        languages: {
            'de': deUrl,
            'pl': plUrl,
            'en': enUrl,
            'x-default': deUrl
        }
    };
}

interface SeoProps {
    title: string;
    description?: string;
    image?: string;
    slug?: string;
    locale: string;
    type?: 'website' | 'article' | 'product';
    pathMap?: Record<string, string>;
}

export function generateSeoMetadata({ title, description, image, slug, locale, type = 'website', pathMap }: SeoProps): Metadata {
    const siteUrl = company.website;

    let languagesAlt: Record<string, string> = {};
    let fullUrl = siteUrl;

    if (pathMap) {
        languagesAlt = pathMap;
        fullUrl = languagesAlt[locale] || siteUrl;
    } else {
        // Default fallback if no specific pathMap provided
        fullUrl = siteUrl;
    }

    return {
        title: {
            default: title,
            template: `%s | ${company.name}`
        },
        description: description || seoConfig.home.description[locale as Locale] || seoConfig.home.description['de'],
        metadataBase: new URL(siteUrl),
        // We expect pages to provide alternates explicitly via the new helpers.
        // If not provided here in props (which aren't extended yet), they are missing in this generic function.
        // This function is kept for backward compatibility and basic metadata generation.
        // Pages should add alternates: generatePageAlternates(...) themselves.
        openGraph: {
            title,
            description: description || seoConfig.home.description[locale as Locale] || seoConfig.home.description['de'],
            url: fullUrl,
            siteName: company.name,
            images: image ? [{ url: image, width: 1200, height: 630 }] : [],
            locale: locale === 'de' ? 'de_AT' : locale === 'pl' ? 'pl_PL' : 'en_US',
            type: type === 'product' ? 'website' : 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: description || seoConfig.home.description[locale as Locale] || seoConfig.home.description['de'],
            images: image ? [image] : [],
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
        }
    };
}
