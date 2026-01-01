import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import { Phone, MapPin } from 'lucide-react';
import { getServerLocale } from '../../lib/serverLocale';
import { Button } from '../../components/Button';
import { getTranslations } from '../../lib/i18n';
import { seoConfig } from '../../lib/seoConfig';
import { generatePageAlternates } from '../../lib/seo/metadataUtils';
import { company } from '../../lib/siteConfig';
import { getAllPosts } from '../../lib/blog/posts';
import BlogTeaserBox from '../../components/blog/BlogTeaserBox';

export function generateMetadata(): Metadata {
  const locale = getServerLocale();
  const entry = seoConfig.abschleppdienst;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pablo-auto.at';
  const canonicalUrl = `${siteUrl}${locale === 'de' ? '' : '/' + locale}/abschleppdienst-wien-niederoesterreich`; // Simplified canonical logic or use util if available

  return {
    title: entry.title[locale],
    description: entry.description[locale],
    alternates: generatePageAlternates('towing', locale),
    openGraph: {
      title: entry.title[locale],
      description: entry.description[locale],
      url: canonicalUrl,
      type: 'website',
      images: [`${siteUrl}/images/abschleppdienst-pablo-sollenau-a2-einsatz.webp`]
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title[locale],
      description: entry.description[locale],
      images: [`${siteUrl}/images/abschleppdienst-pablo-sollenau-a2-einsatz.webp`]
    }
  };
}

export default function AbschleppdienstPage() {
  const locale = getServerLocale();
  const t = getTranslations(locale);

  // Exact JSON-LD snippet as requested (byte-identical content)
  // Exact JSON-LD snippet as requested (byte-identical content)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EmergencyService",
        "name": "Autohandel & Abschleppdienst Pablo e.U.",
        "description": t.towing.intro, // Use translated intro or specific description if available
        "image": "https://pablo-auto.at/assets/logo-pablo-autohandel-abschleppdienst.png",
        "telePresence": "+43 664 1261735",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Industriestraße 1",
          "addressLocality": "Sollenau",
          "postalCode": "2601",
          "addressCountry": "AT"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "47.9015",
          "longitude": "16.2483"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "areaServed": ["Wiener Neustadt", "Sollenau", "A2 Südautobahn", "Baden", "Neunkirchen"],
        "priceRange": "$$",
        "inLanguage": locale === 'de' ? 'de-AT' : locale === 'pl' ? 'pl-PL' : 'en-GB'
      }
    ]
  };

  return (
    <div className="pb-24">
      <Script
        id={`towing-schema-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-bg-light pt-8 md:pt-16 lg:pt-24 pb-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-8">
              <h1 className="text-3xl font-bold leading-tight text-brand-primary md:text-4xl lg:text-5xl">
                {t.towing.title}
              </h1>
              <p className="text-lg text-gray-700 md:text-xl">
                {t.towing.intro}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  href="tel:+436641261735"
                  variant="primary"
                  className="py-4 px-6 text-lg"
                  icon={Phone}
                >
                  {t.towing.heroPrimary}
                </Button>
                <Button
                  href={`https://wa.me/436641261735?text=${encodeURIComponent('Hallo! Ich brauche Hilfe. Mein Standort: ')}`}
                  variant="primary-blue"
                  className="py-4 px-6 text-lg"
                  icon={MapPin}
                >
                  {t.towing.heroSecondary}
                </Button>
              </div>
            </div>
            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/abschleppdienst-pablo-sollenau-a2-einsatz.webp"
                  alt="Roter Abschleppwagen von Pablo e.U. im Einsatz auf der A2 Südautobahn bei Wiener Neustadt."
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white" aria-labelledby="steps-heading">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="steps-heading" className="text-center text-2xl font-bold text-brand-primary md:text-3xl mb-12">
            {t.towing.stepsTitle}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {t.towing.steps.map((step, index) => (
              <div key={index} className="rounded-xl border border-gray-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 text-4xl font-black text-gray-200">0{index + 1}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="services-heading">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="services-heading" className="text-3xl font-bold text-brand-primary mb-12">
            {t.towing.servicesTitle}
          </h2>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="grid gap-6">
              {t.towing.services.map((service, index) => (
                <article key={index} className="flex gap-4 rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="shrink-0 text-brand-accent">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </article>
              ))}
              <p className="mt-4 text-sm text-gray-500 italic border-l-4 border-brand-accent pl-4">
                {t.towing.note}
              </p>
            </div>
            {/* Service Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/pannenhilfe-starthilfe-reifenwechsel-sollenau.webp"
                alt="Pannendienst-Mitarbeiter leistet Starthilfe in Sollenau, Bezirk Wiener Neustadt-Land."
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Us / EEAT Section */}
      <section className="py-16 bg-white" aria-labelledby="eeat-heading">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="eeat-heading" className="text-2xl font-bold text-brand-primary md:text-3xl mb-12 text-center">
            {t.towing.whyUs.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.towing.whyUs.items.map((item, index) => (
              <div key={index} className="bg-bg-light rounded-xl p-6 text-center">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Teaser Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <BlogTeaserBox
            post={getAllPosts(locale).find(p => p.cluster === 'roadside') || getAllPosts(locale)[0]}
            categoryLabel={locale === 'de' ? 'Ratgeber: Pannenhilfe' : locale === 'pl' ? 'Poradnik: Pomoc Drogowa' : 'Guide: Roadside'}
            locale={locale}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl px-4">
          <h2 id="faq-heading" className="text-center text-3xl font-bold text-brand-primary mb-12">
            {t.towing.faq.title}
          </h2>
          <div className="space-y-4">
            {t.towing.faq.items.map((item, index) => (
              <details key={index} className="group rounded-xl bg-white shadow-sm [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900">
                  <h3 className="font-bold">{item.question}</h3>
                  <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
        <a
          href="tel:+436641261735"
          className="flex w-full items-center justify-center rounded-xl bg-[#CC0000] px-4 py-3 text-lg font-bold text-white shadow-md active:scale-95"
        >
          <span className="mr-2">📞</span>
          {t.header.callShort || '24/7 Notruf'}
        </a>
      </div>
    </div>
  );
}
