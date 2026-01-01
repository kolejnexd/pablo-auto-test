'use client';

import { MapPin, Phone, Mail, MessageCircle, Navigation } from 'lucide-react';
import ContactForm from './ContactForm';
import { company } from '../lib/siteConfig';
import { Translations, Locale } from '../lib/i18n';

type Props = {
    t: Translations;
    locale: Locale;
};

export default function ContactPageContent({ t, locale }: Props) {
    const contactDetails = [
        {
            icon: Phone,
            label: t.contact.labels.hotline,
            value: company.phone,
            href: `tel:${company.phone.replace(/[^0-9+]/g, '')}`,
            color: 'text-red-600',
            bg: 'bg-red-50'
        },
        {
            icon: MessageCircle,
            label: t.contact.labels.whatsapp,
            value: t.common.whatsappAction || 'WhatsApp',
            href: `https://wa.me/${company.phone.replace(/[^0-9]/g, '')}`,
            color: 'text-green-600',
            bg: 'bg-green-50'
        },
        {
            icon: Mail,
            label: t.contact.labels.inquiries,
            value: company.email,
            href: `mailto:${company.email}`,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            icon: MapPin,
            label: t.contact.labels.address,
            value: company.address,
            href: 'https://maps.app.goo.gl/xLm1jcrFjqwCca767',
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        }
    ];

    return (
        <div className="min-h-screen pb-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-brand-primary py-20 text-white lg:py-28">
                <div className="absolute inset-0 bg-[url('/abschleppdienst-muster.svg')] opacity-10"></div>
                <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-blue-500 blur-3xl opacity-20"></div>
                <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-purple-500 blur-3xl opacity-20"></div>

                <div className="relative mx-auto max-w-6xl px-4 text-center">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in-up">
                        {t.contact.title}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg font-medium text-blue-100 sm:text-xl animate-fade-in-up delay-100">
                        {t.contact.intro}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="relative z-10 -mt-12 px-4 sm:px-6">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-12">
                        {/* Left Column: Contact Info & Map */}
                        <div className="space-y-8 lg:col-span-5">
                            {/* Contact Cards */}
                            <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-1">
                                {contactDetails.map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        target={item.icon === MapPin ? '_blank' : undefined}
                                        className="group relative flex items-center overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-md"
                                    >
                                        <div className={`mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{item.label}</p>
                                            <p className="font-semibold text-gray-900">{item.value}</p>
                                        </div>
                                        <div className="absolute right-4 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Navigation className="h-5 w-5 text-gray-300" />
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Map Card */}
                            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 h-[300px] lg:h-auto lg:min-h-[400px] relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.666498064977!2d16.249778076892348!3d47.9045616712177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476db78cbea5c227%3A0x32697abfb9c1d933!2sAutohandel%20%26%20Abschleppdienst%20Pablo%20e.U.!5e0!3m2!1sen!2sat!4v1715694300000!5m2!1sen!2sat"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location"
                                ></iframe>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="h-full rounded-2xl bg-white p-6 shadow-xl shadow-brand-primary/5 ring-1 ring-gray-100 sm:p-10">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">{t.contact.formTitle}</h2>
                                    <p className="mt-2 text-gray-600">{t.contact.formDescription}</p>
                                </div>
                                <ContactForm initialLocale={locale} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Decorative Bottom */}
            <div className="mt-12 text-center text-sm text-gray-400">
                <p>A2 Südautobahn • Sollenau • Wiener Neustadt</p>
            </div>
        </div>
    );
}
