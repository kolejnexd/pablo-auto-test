import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import FaqAccordion from '../components/FaqAccordion';
import MobileStickyBar from '../components/MobileStickyBar';
import HeroVideo from '../components/HeroVideo';
import { Button } from '../components/Button';
import { Phone, Car } from 'lucide-react';
import { getServerLocale } from '../lib/serverLocale';
import { company } from '../lib/siteConfig';
import { getAllPosts } from '../lib/blog/posts';
import PostCard from '../components/blog/PostCard';
import { getTranslations } from '../lib/i18n';
import { seoConfig } from '../lib/seoConfig';
import { getRoute } from '../lib/routes';
import { FAQ_SNIPPETS } from '../lib/data/seo-snippets';
import { generateFaqSchema } from '../lib/seo/schemaUtils';
import { getHomepageSchema } from '../lib/seo/homepageSchema';
import { constructMetadata } from '@/lib/metadata';

export function generateMetadata(): Metadata {
  const locale = getServerLocale();
  const entry = seoConfig.home;

  return constructMetadata({
    title: entry.title[locale],
    description: entry.description[locale],
    key: 'home',
    locale: locale,
  });
}

export default function HomePage() {
  const locale = getServerLocale();
  const t = getTranslations(locale);
  // prefix is no longer needed for links, but removing it might be invasive if used elsewhere. 
  // Scanning file: prefix used in line 33, 120, 185. We will replace usages.

  return (
    <div className="flex flex-col">

      {/* SECTION 1: HERO */}
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-white pb-16 pt-12 md:pt-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 xl:max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">

            {/* Text Column */}
            <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
              <div className="flex items-center gap-3">
                {/* Badges */}
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 ring-1 ring-inset ring-blue-700/10">
                  {t.home.hero.badges}
                </span>
              </div>

              <h1 className="max-w-[18ch] text-3xl font-extrabold leading-[1.1] text-brand-primary md:text-4xl lg:text-5xl lg:leading-[1.05]">
                {t.home.hero.title}
              </h1>

              <p className="max-w-prose text-base leading-relaxed text-gray-600 lg:text-lg">
                {t.home.hero.subtitle}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  href={`tel:${company.phone.replace(/[^0-9+]/g, '')}`}
                  variant="primary"
                >
                  📞 {t.home.hero.primaryCta.replace(/^.*: /, '')}
                </Button>
                <Button
                  href={getRoute('vehicles', locale)}
                  variant="secondary"
                  icon={Car}
                >
                  {t.home.hero.secondaryCta}
                </Button>
              </div>
            </div>

            {/* Video Column - Smaller, Horizontal, Right Aligned */}
            <div className="relative mx-auto w-full max-w-[560px] self-center justify-self-end lg:ml-auto lg:mr-0">
              <div className="aspect-[16/10] w-full lg:translate-x-4">
                <HeroVideo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SILOS NAVIGATOR */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-brand-primary">
              {t.common.supporting} {/* Using existing tagline or generic header. Strategy says H1 covers it. H2 can be Services. */}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {locale === 'pl' ? 'Wybierz usługę, której potrzebujesz:' : 'Wählen Sie die Dienstleistung, die Sie benötigen:'}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Silo 1: Abschleppdienst */}
            <a href={getRoute('towing', locale)} className="group flex flex-col rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow ring-1 ring-gray-100">
              <div className="mb-4 text-4xl">🚨</div>
              <h3 className="mb-2 text-xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                {t.header.menu.find(m => m.href?.includes('bschlepp') || m.href?.includes('owing') || m.href?.includes('omoc'))?.label || 'Abschleppdienst'}
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {locale === 'pl' ? 'Pomoc drogowa A2 & Sollenau.' : 'Pannenhilfe A2 & Sollenau.'}
              </p>
              <span className="text-brand-accent font-medium text-sm">{t.common.detailsCta}</span>
            </a>

            {/* Silo 2: Autohandel */}
            <a href={getRoute('carSales', locale)} className="group flex flex-col rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow ring-1 ring-gray-100">
              <div className="mb-4 text-4xl">🚗</div>
              <h3 className="mb-2 text-xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                {t.header.menu.find(m => m.href?.includes('uto') || m.href?.includes('sales') || m.href?.includes('kup'))?.label || 'Autohandel'}
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {locale === 'pl' ? 'Sprzedaż i skup aut.' : 'Verkauf & Ankauf.'}
              </p>
              <span className="text-brand-accent font-medium text-sm">{t.common.detailsCta}</span>
            </a>

            {/* Silo 3: Vermietung */}
            <a href={getRoute('rental', locale)} className="group flex flex-col rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow ring-1 ring-gray-100">
              <div className="mb-4 text-4xl">🗝️</div>
              <h3 className="mb-2 text-xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                {t.header.menu.find(m => m.href?.includes('ermietung') || m.href?.includes('ental') || m.href?.includes('ynajem'))?.label || 'Vermietung'}
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {locale === 'pl' ? 'Auta zastępcze i busy.' : 'Mietwagen & Transporter.'}
              </p>
              <span className="text-brand-accent font-medium text-sm">{t.common.detailsCta}</span>
            </a>

            {/* Silo 4: Transport */}
            <a href={getRoute('transport', locale)} className="group flex flex-col rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow ring-1 ring-gray-100">
              <div className="mb-4 text-4xl">📦</div>
              <h3 className="mb-2 text-xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                {t.header.menu.find(m => m.href?.includes('ransport'))?.label || 'Transport'}
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {locale === 'pl' ? 'Przeprowadzki & Logistyka PL-AT.' : 'Umzüge & Logistik PL-AT.'}
              </p>
              <span className="text-brand-accent font-medium text-sm">{t.common.detailsCta}</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: TRADE & DETAILS (Simplified) */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* About short */}
            <div>
              <h2 className="text-2xl font-bold text-brand-primary mb-4">{t.home.whyUs.title}</h2>
              <ul className="space-y-4">
                {t.home.whyUs.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <div>
                      <strong className="block text-gray-900">{item.title}</strong>
                      <span className="text-gray-600 text-sm">{item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a href={getRoute('about', locale)} className="text-brand-primary font-semibold">
                  {t.common.readMore} →
                </a>
              </div>
            </div>

            {/* Image or CTA */}
            <div className="bg-brand-primary rounded-2xl p-8 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">{t.home.hero.title}</h3>
              <p className="mb-6 opacity-90">{t.home.hero.subtitle}</p>
              <div className="flex flex-col gap-3">
                <Button
                  href={`tel:${company.phone.replace(/[^0-9+]/g, '')}`}
                  variant="primary"
                  className="text-center"
                >
                  {t.header.callCta}
                </Button>
                <a href={getRoute('contact', locale)} className="text-center opacity-80 hover:opacity-100">{t.header.menu.find(m => m.href?.includes('ontact'))?.label || 'Kontakt'}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY US */}
      <section className="bg-brand-primary py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold">
            {t.home.whyUs.title}
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {t.home.whyUs.items.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  {/* Reusing generic icons based on index since we are in a loop */}
                  {idx === 0 && <span className="text-2xl">⚡</span>}
                  {idx === 1 && <span className="text-2xl">🗣️</span>}
                  {idx === 2 && <span className="text-2xl">🤝</span>}
                </div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-blue-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: LATEST BLOG POSTS */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-primary mb-4">{t.home.blog.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.home.blog.subtitle}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {getAllPosts(locale).slice(0, 3).map(post => (
              <PostCard key={post.url} post={post} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href={getRoute('blog', locale)} variant="secondary">
              {t.home.blog.cta} →
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-primary">
            {t.home.faq.title}
          </h2>
          <FaqAccordion items={FAQ_SNIPPETS.map(item => ({
            question: item.question[locale],
            answer: item.answer[locale]
          }))} />
        </div>
      </section>

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqSchema(FAQ_SNIPPETS, locale))
        }}
      />
      <Script
        id="organization-hybrid-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHomepageSchema())
        }}
      />

      {/* Mobile Sticky Bar */}
      <MobileStickyBar />
    </div>
  );
}
