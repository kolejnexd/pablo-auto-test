import { Locale } from '../i18n';

export interface LocationPageConfig {
    slug: string;
    serviceCategory: 'towing' | 'carSales' | 'rental' | 'transport';
    language: Locale;
    geoEntity: string;
    seoTitle: string;
    seoDescription: string;
    h1: string;
    contentFocus: string;
    trustSignals: string[];
}

export const LOCATION_PAGES: LocationPageConfig[] = [
    // ZONE A: Home Base
    {
        slug: 'abschleppdienst-sollenau',
        serviceCategory: 'towing',
        language: 'de',
        geoEntity: 'Sollenau',
        seoTitle: 'Abschleppdienst Sollenau 24/7 | Pannenhilfe in 15 Min.',
        seoDescription: 'Ihr lokaler Abschleppdienst in Sollenau. 24h Notruf, Pannenhilfe & Bergung. Schnell vor Ort in der Industriestraße & Umgebung.',
        h1: 'Abschleppdienst & Pannenhilfe in Sollenau',
        contentFocus: 'Wir sind direkt in Sollenau stationiert (Industriestraße 1). Das garantiert die schnellste Anfahrt im ganzen Ort.',
        trustSignals: ['15 Min. Anfahrt', 'Lokal vor Ort', 'Faire Fixpreise']
    },
    {
        slug: 'autohandel-wiener-neustadt',
        serviceCategory: 'carSales',
        language: 'de',
        geoEntity: 'Wiener Neustadt',
        seoTitle: 'Gebrauchtwagen Wiener Neustadt | Autoankauf & Verkauf',
        seoDescription: 'Zertifizierte Gebrauchtwagen für Wiener Neustadt. Ankauf aller Marken gegen Barzahlung. Besuchen Sie uns (nur 10 Min. entfernt).',
        h1: 'Gebrauchtwagen & Autoankauf bei Wiener Neustadt',
        contentFocus: 'Ihre Alternative zu teuren Händlern in der Stadt. Nur eine kurze Fahrt nach Sollenau für geprüfte Qualität und bessere Preise.',
        trustSignals: ['Sofort Bargeld', 'Österreichische Papiere', 'Gewährleistung']
    },
    {
        slug: 'mietwagen-baden-bei-wien',
        serviceCategory: 'rental',
        language: 'de',
        geoEntity: 'Baden bei Wien',
        seoTitle: 'Mietwagen Baden bei Wien | Ohne Kreditkarte möglich',
        seoDescription: 'Günstige Mietwagen & Transporter für Baden bei Wien. Auch ohne Kreditkarte. Ideal als Unfallersatzwagen oder für Umzüge.',
        h1: 'Mietwagen & Transporter Verleih für Baden',
        contentFocus: 'Flexible Mobilität für den Bezirk Baden. Wir liefern das Fahrzeug auf Wunsch oder bieten einen schnellen Shuttle-Service.',
        trustSignals: ['Keine Kreditkarte nötig', 'Kaution in Bar möglich', 'Top gewartete Flotte']
    },
    {
        slug: 'transport-leobersdorf',
        serviceCategory: 'transport',
        language: 'de',
        geoEntity: 'Leobersdorf',
        seoTitle: 'Transport & Umzug Leobersdorf | Logistik A2 Zentrum',
        seoDescription: 'Ihr Partner für Umzüge und Transporte in Leobersdorf. Zentral am A2 Knotenpunkt. Firmenumzüge, Privatumzüge & Eiltransporte.',
        h1: 'Transport- & Umzugsservice Leobersdorf',
        contentFocus: 'Leobersdorf ist unser Logistik-Nachbar. Wir bieten spezielle Konditionen für Firmen im Ared Park und Privathaushalte.',
        trustSignals: ['Fixpreis-Garantie', 'Verpackungsservice', 'Termintreue']
    },

    // ZONE B: Attack (Vienna & A2)
    {
        slug: 'abschleppdienst-wien-23-liesing',
        serviceCategory: 'towing',
        language: 'de',
        geoEntity: 'Wien 23 (Liesing)',
        seoTitle: 'Abschleppdienst Wien 23 Liesing | Schnell vor Ort',
        seoDescription: 'Pannenhilfe in Wien Liesing (23. Bezirk). Günstiger als Wiener Anbieter. Wir schleppen Sie sicher nach Hause oder in die Werkstatt.',
        h1: 'Abschleppdienst Wien 23 (Liesing)',
        contentFocus: 'Über die S1 sind wir blitzschnell in Liesing. Sparen Sie sich die teuren Anfahrtskosten der innerstädtischen Dienste.',
        trustSignals: ['S1 Schnellanbindung', 'Pauschale Anfahrt', 'Wien-Spezialisten']
    },
    {
        slug: 'abschleppdienst-a2-suedautobahn',
        serviceCategory: 'towing',
        language: 'de',
        geoEntity: 'A2 Südautobahn',
        seoTitle: 'Abschleppdienst A2 Südautobahn | Notruf 24h',
        seoDescription: 'Panne auf der A2? Wir sind der schnelle Abschleppdienst zwischen Wien und Wr. Neustadt. Soforthilfe bei Unfall & Defekt.',
        h1: 'Pannenhilfe & Abschleppdienst A2 Südautobahn',
        contentFocus: 'Unsere Basis liegt direkt an der A2. Niemand ist schneller bei Ihnen zwischen Leobersdorf und Traiskirchen.',
        trustSignals: ['Direkt an der A2', 'Polizei-Kooperation', 'Spezialfahrzeuge']
    },
    {
        slug: 'umzug-wien-nach-niederoesterreich',
        serviceCategory: 'transport',
        language: 'de',
        geoEntity: 'Wien & NÖ',
        seoTitle: 'Umzug Wien nach Niederösterreich | Stressfrei & Günstig',
        seoDescription: 'Planen Sie den Umzug von Wien aufs Land? Wir sind die Spezialisten für Umzüge von Wien nach Niederösterreich (Baden, Wr. Neustadt).',
        h1: 'Umzugsservice: Von Wien nach Niederösterreich',
        contentFocus: 'Der Trend geht aufs Land. Wir begleiten Ihren Umzug von der Wiener Wohnung in Ihr neues Haus im Süden von Wien.',
        trustSignals: ['Kein Stockwerkzuschlag', 'Montageservice', 'Kostenlose Besichtigung']
    },
    {
        slug: 'autoankauf-wien-10-favoriten',
        serviceCategory: 'carSales',
        language: 'de',
        geoEntity: 'Wien 10 (Favoriten)',
        seoTitle: 'Autoankauf Wien 10 Favoriten | Bargeld für Ihr Auto',
        seoDescription: 'Wir kaufen Ihr Auto in Wien Favoriten. Sofortige Barzahlung, Abmeldung & Abholung. Egal welcher Zustand.',
        h1: 'Autoankauf Wien 10 (Favoriten) - Sofort Bargeld',
        contentFocus: 'Favoriten ist unser stärkster Bezirk in Wien. Wir holen Ihr Fahrzeug direkt bei Ihnen ab – egal ob fahrtüchtig oder nicht.',
        trustSignals: ['Kostenlose Abholung', 'Sofortige Abmeldung', 'Bestpreis-Garantie']
    },

    // ZONE C: Niche / Language Specific
    {
        slug: 'pomoc-drogowa-austria-a2',
        serviceCategory: 'towing',
        language: 'pl',
        geoEntity: 'Austria / A2',
        seoTitle: 'Pomoc Drogowa Austria A2 | Polska Laweta Wiedeń',
        seoDescription: 'Polska pomoc drogowa w Austrii (A2, Wiedeń, Graz). Mówimy po polsku i angielsku. Holowanie do Polski, auto zastępcze, mechanik.',
        h1: 'Polska Pomoc Drogowa w Austrii (Autostrada A2)',
        contentFocus: 'Awaria w Austrii? Nie martw się barierą językową. Obsługujemy rodaków na trasie A2 od Wiednia do Grazu. Oferujemy holowanie do Polski.',
        trustSignals: ['Mówimy po polsku i angielsku', 'Transport do PL', 'Auto zastępcze']
    },
    {
        slug: 'car-rental-vienna-no-credit-card',
        serviceCategory: 'rental',
        language: 'en',
        geoEntity: 'Vienna',
        seoTitle: 'Car Rental Vienna No Credit Card | Cheap Car Hire',
        seoDescription: 'Rent a car in Vienna and surroundings without a credit card. Cash deposit accepted. Affordable rates, reliable cars.',
        h1: 'Car Rental Vienna Area - No Credit Card Needed',
        contentFocus: 'Visiting Vienna or just landed? We offer hassle-free car rental where a debit card or cash deposit is perfectly fine.',
        trustSignals: ['No Credit Card', 'Cash Deposit', 'English/German Support']
    }
];
