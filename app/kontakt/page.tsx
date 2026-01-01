import type { Metadata } from 'next';
import Script from 'next/script';
import ContactPageContent from '../../components/ContactPageContent';
import { getServerLocale } from '../../lib/serverLocale';
import { getTranslations } from '../../lib/i18n';
import { seoConfig } from '../../lib/seoConfig';
import { company } from '../../lib/siteConfig';

import { generateSeoMetadata } from '../../lib/seo/metadataUtils';

import { constructMetadata } from '@/lib/metadata';

export function generateMetadata(): Metadata {
  const locale = getServerLocale();
  const entry = seoConfig.kontakt;
  return constructMetadata({
    title: entry.title[locale],
    description: entry.description[locale],
    key: 'contact',
    locale,
  });
}

export default function KontaktPage() {
  const locale = getServerLocale();
  const t = getTranslations(locale);

  // ContactPage Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t.contact.title,
    description: t.contact.intro,
    inLanguage: locale === 'de' ? 'de-AT' : locale === 'pl' ? 'pl-PL' : 'en-GB',
    mainEntity: {
      '@type': ['AutoTowingService', 'AutoDealer'],
      name: company.name,
      telephone: company.phone,
      email: company.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Industriestraße 1',
        addressLocality: 'Sollenau',
        postalCode: '2601',
        addressCountry: 'AT'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 47.9045617,
        longitude: 16.252353
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageContent t={t} locale={locale} />
    </>
  );
}
