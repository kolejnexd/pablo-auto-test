export type Locale = 'de' | 'en' | 'pl';

export const routes = {
    de: {
        home: '/',
        vehicles: '/autohandel-gebrauchtwagen',
        carSales: '/autohandel-gebrauchtwagen',
        towing: '/abschleppdienst-wien-niederoesterreich',
        about: '/ueber-uns',
        contact: '/kontakt',
        imprint: '/impressum',
        privacy: '/datenschutz',
        rental: '/vermietung-service',
        transport: '/transport-umzug-logistik',
        faq: '/faq',
        blog: '/blog',
        blogRss: '/blog/rss.xml',
    },
    en: {
        home: '/',
        vehicles: '/car-sales',
        carSales: '/car-sales',
        towing: '/towing-service',
        about: '/about-us',
        contact: '/contact',
        imprint: '/imprint',
        privacy: '/privacy-policy',
        rental: '/rental-service',
        transport: '/transport-logistics',
        faq: '/faq',
        blog: '/blog',
        blogRss: '/blog/rss.xml',
    },
    pl: {
        home: '/',
        vehicles: '/skup-aut-handel',
        carSales: '/skup-aut-handel',
        towing: '/pomoc-drogowa',
        about: '/o-nas',
        contact: '/kontakt',
        imprint: '/impressum',
        privacy: '/polityka-prywatnosci',
        rental: '/wynajem-service',
        transport: '/transport-przeprowadzki',
        faq: '/faq',
        blog: '/blog',
        blogRss: '/blog/rss.xml',
    }
} as const;

export type RouteKey = keyof typeof routes.de;

export function getRoute(key: RouteKey, locale: Locale): string {
    const path = routes[locale][key];
    if (locale === 'de') return path;

    // Clean slash to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    if (!cleanPath) return `/${locale}`;

    return `/${locale}/${cleanPath}`;
}
