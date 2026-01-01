import type { Locale } from "../routes";

export type ClusterKey = "roadside" | "buying" | "selling" | "logistics" | "mobility";

export const BLOG_META: Record<Locale, { title: string; description: string }> = {
    de: {
        title: "Mobilitäts-Ratgeber Pablo e.U. | Abschleppdienst & Autohandel Blog",
        description:
            "Experten-Tipps zur Pannenhilfe auf der A2, Gebrauchtwagenmarkt in Niederösterreich und Autoankauf. Ihr Mobilitätspartner in Sollenau.",
    },
    pl: {
        title: "Pablo e.U. | Porady, pomoc drogowa i rynek aut w Austrii",
        description:
            "Ekspercka wiedza o pomocy drogowej 24/7 na A2, zakupie aut używanych i przepisach drogowych w Austrii. Dowiedz się, jak bezpiecznie podróżować i mądrze kupować.",
    },
    en: {
        title: "Pablo e.U. Blog | Roadside assistance, cars & transport in Austria",
        description:
            "Expert guides on 24/7 roadside assistance (A2), buying/selling used cars, and transport/logistics in Austria.",
    },
};

export const CATEGORY_NAMES: Record<Locale, Record<ClusterKey, string>> = {
    de: {
        roadside: "24/7 Abschlepp- & Pannenhilfe-Ratgeber",
        buying: "Gebrauchtwagen-Markt & Trends",
        selling: "Autoankauf & Wertermittlung",
        logistics: "Logistik & Grenzüberschreitender Transport (AT–PL)",
        mobility: "Mobilität & Mietwagen",
    },
    pl: {
        roadside: "Pomoc Drogowa",
        buying: "Poradnik Kupującego",
        selling: "Sprzedaż Aut",
        logistics: "Logistyka i Prawo",
        mobility: "Mobilność",
    },
    en: {
        roadside: "Roadside Assistance",
        buying: "Buying Guide",
        selling: "Car Selling",
        logistics: "Logistics & Law",
        mobility: "Mobility & Service",
    },
};

export const CATEGORY_SLUG: Record<Locale, Record<ClusterKey, string>> = {
    de: {
        roadside: "pannenhilfe",
        buying: "ratgeber-kauf",
        selling: "autoankauf",
        logistics: "logistik-recht",
        mobility: "mobilitaet",
    },
    pl: {
        roadside: "pomoc-drogowa",
        buying: "poradnik-kupujacy",
        selling: "sprzedaz-skup",
        logistics: "logistyka-przepisy",
        mobility: "wynajem-mobilnosc",
    },
    en: {
        roadside: "roadside-assistance",
        buying: "buying-guide",
        selling: "car-selling",
        logistics: "logistics-law",
        mobility: "mobility-rental",
    },
};

export function getAllCategorySlugs(locale: Locale): string[] {
    return Object.values(CATEGORY_SLUG[locale]);
}

export function getClusterFromCategorySlug(locale: Locale, categorySlug: string): ClusterKey | null {
    const entry = Object.entries(CATEGORY_SLUG[locale]).find(([, slug]) => slug === categorySlug);
    return entry ? (entry[0] as ClusterKey) : null;
}

export function getCategorySlug(locale: Locale, cluster: ClusterKey): string {
    return CATEGORY_SLUG[locale][cluster];
}

export function getCategoryAlternates(currentLocale: Locale, categorySlug: string) {
    const cluster = getClusterFromCategorySlug(currentLocale, categorySlug);
    if (!cluster) return {};

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pablo-auto.at';
    const languages: Record<string, string> = {};

    // Helper to build URL
    const getUrl = (loc: Locale, slug: string) => {
        const prefix = loc === 'de' ? '/ratgeber/kategorie' :
            loc === 'pl' ? '/pl/poradnik/kategoria' :
                '/en/guides/category';
        return `${siteUrl}${prefix}/${slug}`;
    };

    languages.de = getUrl('de', CATEGORY_SLUG.de[cluster]);
    languages.pl = getUrl('pl', CATEGORY_SLUG.pl[cluster]);
    languages.en = getUrl('en', CATEGORY_SLUG.en[cluster]);
    languages['x-default'] = languages.de;

    return {
        canonical: languages[currentLocale],
        languages
    };
}
