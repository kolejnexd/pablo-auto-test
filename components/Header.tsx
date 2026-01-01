'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './Button';
import { company } from '../lib/siteConfig';
import LanguageSwitcher from './LanguageSwitcher';
import { useCurrentLocale } from '../hooks/useCurrentLocale';
import { Locale, getHomeHref } from '../lib/i18n';

interface Props {
  initialLocale?: Locale;
}

export default function Header({ initialLocale }: Props) {
  const [open, setOpen] = useState(false);
  const { t, locale } = useCurrentLocale(initialLocale);
  const homeHref = getHomeHref(locale);
  const menuItems = t.header.menu.filter((item) => item.href !== homeHref && item.href !== '/');

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="relative flex items-center justify-between px-4 py-3 lg:grid lg:grid-cols-[auto,1fr,auto] lg:px-6 lg:py-4">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            className="inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-gray-700"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Menü öffnen"
          >
            ☰
          </button>
        </div>

        {/* Logo - Centered on Mobile (Absolute), Left on Desktop (Static) */}
        <Link
          href={locale === 'de' ? '/' : `/${locale}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center lg:static lg:translate-x-0 lg:translate-y-0 lg:justify-start"
          prefetch={false}
        >
          {/* Mobile Logo: Enlarged */}
          <Image
            src="/assets/logo-pablo-autohandel-abschleppdienst-mobile.png"
            alt="Autohandel & Abschleppdienst Pablo e.U."
            width={280}
            height={80}
            className="h-14 w-auto max-w-[60vw] sm:h-16 lg:hidden"
            priority
          />
          {/* Desktop Logo */}
          <Image
            src="/assets/logo-pablo-autohandel-abschleppdienst.png"
            alt="Autohandel & Abschleppdienst Pablo e.U."
            width={320}
            height={90}
            className="hidden h-14 w-auto lg:block"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-gray-700 lg:flex">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-primary" prefetch={false}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <LanguageSwitcher initialLocale={locale} />
          <Button
            href={`tel:${company.phone.replace(/[^0-9+]/g, '')}`}
            variant="primary"
            className="text-sm"
          >
            {t.header.callCta}
          </Button>
        </div>

        {/* Mobile Call CTA */}
        <div className="lg:hidden">
          <Button
            href={`tel:${company.phone.replace(/[^0-9+]/g, '')}`}
            variant="primary"
            className="px-4 py-2 text-xs"
          >
            {t.header.callShort}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-sm">
            <nav className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-brand-primary"
                  onClick={() => setOpen(false)}
                  prefetch={false}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <LanguageSwitcher initialLocale={locale} />

            <div className="grid grid-cols-2 gap-3 text-center">
              <Button
                href={`tel:${company.phone.replace(/[^0-9+]/g, '')}`}
                variant="primary"
                className="text-sm"
              >
                {t.header.callShort}
              </Button>
              <Button
                href={`https://wa.me/${company.phone.replace(/[^0-9]/g, '')}`}
                variant="primary"
                className="text-sm bg-[#25D366] hover:bg-[#1ebe5d] shadow-[#25D366]/20 hover:shadow-[#25D366]/40 text-white"
              >
                {t.common.whatsapp}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>

  );
}
