
import { LocationPageConfig } from '../../lib/data/location-pages';
import CTASection from '../CTASection';
import JsonLd from '../JsonLd';
import { getRoute } from '../../lib/routes';
import { getTranslations } from '../../lib/i18n';
import type { Locale } from '../../lib/i18n';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../Button';

interface Props {
    config: LocationPageConfig;
}

export default function LocationPageTemplate({ config }: Props) {
    // If the page forces a specific language (like PL or EN), use that locale for translations.
    // Otherwise, fallback to 'de' or detect from context (but here we treat config.language as the source of truth for THIS page's content).
    const locale = config.language;
    const t = getTranslations(locale);

    // Map category to a proper CTA route
    const ctaRoute = config.serviceCategory === 'towing' ? getRoute('contact', locale) // Urgency -> Contact/Call
        : config.serviceCategory === 'carSales' ? getRoute('carSales', locale)
            : config.serviceCategory === 'rental' ? getRoute('rental', locale)
                : getRoute('transport', locale);

    return (
        <div className="flex flex-col min-h-screen">
            {/* HERO SECTION */}
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-gray-50/50 to-white -z-10" />

                <div className="relative mx-auto max-w-4xl text-center space-y-6">
                    <span className="inline-block bg-brand-primary/10 backdrop-blur border border-brand-primary/20 text-brand-primary px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
                        {config.geoEntity}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-brand-primary">
                        {config.h1}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto">
                        {config.seoDescription}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        {config.trustSignals.map((signal, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-slate-200 shadow-sm text-slate-700">
                                <span className="text-green-500">✓</span>
                                <span className="font-medium text-sm">{signal}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            href={config.serviceCategory === 'towing' ? `tel:+436641261735` : ctaRoute}
                            variant="primary"
                            className="text-lg py-4 px-8 h-auto shadow-brand-accent/20"
                        >
                            {config.serviceCategory === 'towing' ? (locale === 'pl' ? 'Zadzwoń 24/7' : 'Notruf 24/7 wählen') : t.common.detailsCta}
                        </Button>
                        <Button
                            href="/"
                            variant="secondary"
                            className="text-lg py-4 px-8 h-auto border-slate-200 hover:bg-slate-50 text-brand-primary shadow-sm"
                        >
                            {locale === 'pl' ? 'Wróć na stronę główną' : (locale === 'en' ? 'Back to Home' : 'Zur Startseite')}
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT FOCUS SECTION */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="prose prose-lg text-gray-700">
                            <h2 className="text-3xl font-bold text-brand-primary mb-6">
                                {locale === 'pl' ? 'Dlaczego my?' : (locale === 'en' ? 'Why choose us?' : `Warum Pablo e.U. in ${config.geoEntity}?`)}
                            </h2>
                            <p className="lead text-xl font-medium text-brand-secondary mb-4">
                                {config.contentFocus}
                            </p>
                            <p>
                                {locale === 'pl'
                                    ? 'Jako lokalna firma z siedzibą w Sollenau, jesteśmy Twoim zaufanym partnerem w regionie. Oferujemy szybki dojazd, uczciwe ceny i obsługę w Twoim języku.'
                                    : (locale === 'en'
                                        ? 'As a local company based in Sollenau, we are your trusted partner in the region. We offer fast response times, fair prices, and support in English.'
                                        : 'Als lokales Unternehmen mit Basis in Sollenau sind wir Ihr verlässlicher Partner für die Region. Wir bieten kurze Anfahrtswege, faire Pauschalpreise und Handschlagqualität.')
                                }
                            </p>
                            <ul className="not-prose space-y-3 mt-6">
                                <li className="flex gap-3">
                                    <span className="text-brand-accent font-bold">➢</span>
                                    <span>{locale === 'pl' ? 'Bez ukrytych kosztów' : (locale === 'en' ? 'No hidden costs' : 'Keine versteckten Kosten')}</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-brand-accent font-bold">➢</span>
                                    <span>{locale === 'pl' ? 'Dojazd w 30 minut (Sollenau/A2)' : (locale === 'en' ? 'Arrival in 30 mins (Sollenau/A2)' : 'Anfahrt in 30 Min (Sollenau/A2)')}</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-brand-accent font-bold">➢</span>
                                    <span>{locale === 'pl' ? 'Płatność kartą lub gotówką' : (locale === 'en' ? 'Card or cash payment' : 'Bar- oder Kartenzahlung')}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-100 p-8 rounded-2xl border-4 border-white shadow-xl relative transform rotate-2 hover:rotate-0 transition-transform">
                            {/* Map Placeholder or Generic Image */}
                            <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                                <div className="text-center p-6 z-10">
                                    <span className="text-4xl block mb-2">📍</span>
                                    <span className="font-bold text-gray-400 block">{config.geoEntity}</span>
                                </div>
                                {/* Interactive Map Embed could go here */}
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                Service Area
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <CTASection
                title={t.common.callNow}
                description={t.common.supporting}
                primary={{ label: config.serviceCategory === 'towing' ? t.header.callCta : t.common.detailsCta, href: config.serviceCategory === 'towing' ? `tel:+436641261735` : ctaRoute }}
                secondary={{ label: "WhatsApp", href: "https://wa.me/436641261735" }}
            />

            {/* CONTEXT AWARE SCHEMA */}
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': config.serviceCategory === 'carSales' ? 'AutoDealer' : 'AutoRepair',
                'name': config.h1,
                'description': config.seoDescription,
                'url': `https://pablo-auto.at/${config.slug}`,
                'telephone': '+436641261735',
                'address': {
                    '@type': 'PostalAddress',
                    'streetAddress': 'Industriestraße 1',
                    'addressLocality': 'Sollenau',
                    'postalCode': '2601',
                    'addressCountry': 'AT'
                },
                'geo': {
                    '@type': 'GeoCoordinates',
                    'latitude': 47.8988,
                    'longitude': 16.2427
                },
                'areaServed': config.geoEntity,
                'priceRange': config.serviceCategory === 'carSales' ? '€€' : '€',
                'image': 'https://pablo-auto.at/opengraph-image.png'
            }} />
        </div>
    );
}
